/**
 * canvas-quiz.js  —  Interactive SVG drag-and-drop canvas for ADE circuit/datapath exercises.
 *
 * Usage:
 *   const cq = new CanvasQuiz(mountElement, exerciseData, (score, max, details) => { ... });
 *   cq.destroy();   // when navigating away
 */

export class CanvasQuiz {
  static NS = 'http://www.w3.org/2000/svg';

  constructor(mountEl, data, onChange, savedConns = null) {
    this.mount    = mountEl;
    this.data     = data;
    this.onChange = onChange;   // callback(details)

    // Design-space (SVG viewBox)
    this.VW = data.viewBox?.[0] ?? 1000;
    this.VH = data.viewBox?.[1] ?? 550;

    // Runtime state
    this.comps         = {};  // id → component
    this.userConns     = [];  // user-drawn connections
    this.selectedPort  = null;
    this.dragging      = null;

    // ponytail: zoom/pan state — single viewport <g> transform
    this._vp = { x: 0, y: 0, scale: 1 };
    this._panning = null;  // {startX, startY, origVX, origVY}

    this._init(savedConns);
  }

  // ─────────────────────────────────── BUILD ────────────────────────────────

  _init(savedConns) {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'cq-wrapper';

    const area = document.createElement('div');
    area.className = 'cq-canvas-area';
    this.canvasArea = area;

    this.svg = this._buildSVG();
    area.appendChild(this.svg);

    this.wrapper.appendChild(area);
    this.wrapper.appendChild(this._buildLegend());
    this.wrapper.appendChild(this._buildToolbar());
    this.mount.appendChild(this.wrapper);

    this._initComponents();

    // Ripristina connessioni precedenti se ci sono
    if (savedConns) {
      for (const c of savedConns) {
        this.userConns.push({ id: c.id, from: c.from, to: c.to });
        this._drawWire(this.userConns[this.userConns.length - 1], this.userConnLayer, true);
      }
    }

    // Responsive height — must set size before computing zoom
    this._ro = new ResizeObserver(() => this._adjustHeight());
    this._ro.observe(area);
    this._adjustHeight();

    // ponytail: start at readable zoom (1.6x fit), not at "see everything tiny"
    this._initialZoom();
  }

  // ─────────────────────────────────── SVG SETUP ───────────────────────────

  _buildSVG() {
    const svg = document.createElementNS(CanvasQuiz.NS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${this.VW} ${this.VH}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.className.baseVal = 'cq-svg';

    // ── Defs ──
    const defs = document.createElementNS(CanvasQuiz.NS, 'defs');

    // Arrowhead
    const mkr = this._el('marker', { id: 'cq-arrow', markerWidth: '9', markerHeight: '9', refX: '8', refY: '3.5', orient: 'auto' });
    mkr.appendChild(this._el('polygon', { points: '0 0, 9 3.5, 0 7', fill: '#38bdf8' }));
    defs.appendChild(mkr);

    // Arrowhead for pre-wired
    const mkrPre = this._el('marker', { id: 'cq-arrow-pre', markerWidth: '9', markerHeight: '9', refX: '8', refY: '3.5', orient: 'auto' });
    mkrPre.appendChild(this._el('polygon', { points: '0 0, 9 3.5, 0 7', fill: '#64748b' }));
    defs.appendChild(mkrPre);

    // Glow filter for selected port
    const flt = this._el('filter', { id: 'cq-glow', x: '-40%', y: '-40%', width: '180%', height: '180%' });
    flt.appendChild(this._el('feGaussianBlur', { stdDeviation: '3', result: 'blur' }));
    const merge = document.createElementNS(CanvasQuiz.NS, 'feMerge');
    merge.appendChild(this._el('feMergeNode', { in: 'blur' }));
    merge.appendChild(this._el('feMergeNode', { in: 'SourceGraphic' }));
    flt.appendChild(merge);
    defs.appendChild(flt);

    svg.appendChild(defs);

    // ── Layers (back → front) wrapped in a pannable/zoomable viewport group ──
    this.viewport = this._el('g', { class: 'cq-viewport' });
    this.preConnLayer  = this._el('g', { class: 'cq-layer cq-layer-pre' });
    this.userConnLayer = this._el('g', { class: 'cq-layer cq-layer-user' });
    this.compLayer     = this._el('g', { class: 'cq-layer cq-layer-comps' });
    this.viewport.appendChild(this.preConnLayer);
    this.viewport.appendChild(this.userConnLayer);
    this.viewport.appendChild(this.compLayer);
    svg.appendChild(this.viewport);

    // ── Global SVG events ──
    svg.addEventListener('mousemove',  e => this._onMouseMove(e));
    svg.addEventListener('mouseup',    e => this._onMouseUp(e));
    svg.addEventListener('mouseleave', () => this._onMouseLeave());
    // Zoom with scroll wheel
    svg.addEventListener('wheel', e => this._onWheel(e), { passive: false });
    // Pan: mousedown on the SVG background (not on a component or port)
    svg.addEventListener('mousedown', e => {
      if (e.target === svg || e.target === this.viewport ||
          e.target.classList.contains('cq-layer')) {
        this._startPan(e);
      }
    });
    svg.addEventListener('click', e => {
      if (e.target === svg) this._cancelPortSel();
    });

    return svg;
  }

  // ─────────────────────────────── TOOLBAR / LEGEND ─────────────────────────

  _buildLegend() {
    const leg = document.createElement('div');
    leg.className = 'cq-legend';

    const item = (cls, label) => {
      const i = document.createElement('div');
      i.className = 'cq-legend-item';
      const dot = document.createElement('div');
      dot.className = `cq-legend-dot cq-legend-dot--${cls}`;
      const txt = document.createElement('span');
      txt.textContent = label;
      i.append(dot, txt);
      return i;
    };

    leg.append(
      item('out', 'Porta uscita (viola) — clicca per iniziare'),
      item('in',  'Porta ingresso (blu) — clicca per collegare'),
    );

    const preNote = document.createElement('span');
    preNote.style.cssText = 'color:#64748b;font-size:0.73rem;margin-left:auto';
    preNote.textContent = 'Scroll = zoom | Trascina sfondo = pan | Clicca filo per eliminarlo';
    leg.appendChild(preNote);

    return leg;
  }

  _buildToolbar() {
    const bar = document.createElement('div');
    bar.className = 'cq-toolbar';

    this.statusEl = document.createElement('div');
    this.statusEl.className = 'cq-status';
    this._setStatus('🔌 Clicca su una porta di uscita (viola), poi su una di ingresso (blu) per collegarle. Clicca su un filo per eliminarlo.');

    const actions = document.createElement('div');
    actions.className = 'cq-actions';

    const btn = (text, cls, fn) => {
      const b = document.createElement('button');
      b.className = `btn btn--sm ${cls}`;
      b.textContent = text;
      b.addEventListener('click', fn);
      return b;
    };

    const undoBtn  = btn('↩ Annulla', 'btn--ghost', () => this._undo());
    const resetBtn = btn('🔄 Reset',  'btn--ghost', () => this._reset());
    const zoomResetBtn = btn('⊙ Fit', 'btn--ghost', () => this._fitToView());
    
    actions.append(undoBtn, resetBtn, zoomResetBtn);
    bar.append(this.statusEl, actions);
    return bar;
  }

  // ─────────────────────────────── COMPONENTS ───────────────────────────────

  _initComponents() {
    for (const def of this.data.componenti) {
      const comp = {
        id:  def.id,
        label: def.label,
        x: def.x, y: def.y,
        w: def.w ?? 120, h: def.h ?? 70,
        portsDef: def.ports,
        portPos: {},   // portId → {x, y, type}
        el: null
      };
      this.comps[comp.id] = comp;
      this._renderComp(comp);
    }
  }

  _renderComp(comp) {
    comp.el?.remove();

    const g = this._el('g', { class: 'cq-comp', transform: `translate(${comp.x},${comp.y})`, 'data-comp': comp.id });

    // Body rect
    const rect = this._el('rect', { width: comp.w, height: comp.h, rx: 8, class: 'cq-comp-rect' });
    g.appendChild(rect);

    // Label(s)
    const lines = comp.label.split('\n');
    const lineH = 15;
    const startY = comp.h / 2 - (lines.length - 1) * lineH / 2 + 5;
    lines.forEach((ln, i) => {
      const t = this._el('text', { x: comp.w / 2, y: startY + i * lineH, class: 'cq-comp-label', 'text-anchor': 'middle', 'dominant-baseline': 'central' });
      t.textContent = ln;
      g.appendChild(t);
    });

    // Drag handle on rect
    rect.style.cursor = 'grab';
    rect.addEventListener('mousedown', e => { e.stopPropagation(); this._startDrag(comp.id, e); });

    // Ports
    this._buildPorts(g, comp);

    this.compLayer.appendChild(g);
    comp.el = g;
  }

  _buildPorts(g, comp) {
    const { in: ins = [], out: outs = [] } = comp.portsDef;

    const addPort = (pid, type, side, frac) => {
      let px, py;
      switch (side) {
        case 'left':   px = 0;       py = comp.h * frac; break;
        case 'right':  px = comp.w;  py = comp.h * frac; break;
        case 'top':    px = comp.w * frac; py = 0;       break;
        case 'bottom': px = comp.w * frac; py = comp.h;  break;
      }
      comp.portPos[pid] = { x: px, y: py, type };

      // Circle
      const c = this._el('circle', { cx: px, cy: py, r: 7, class: `cq-port cq-port-${type}`, 'data-comp': comp.id, 'data-port': pid, 'data-ptype': type });
      const tt = document.createElementNS(CanvasQuiz.NS, 'title');
      tt.textContent = pid;
      c.appendChild(tt);
      c.addEventListener('click', e => { e.stopPropagation(); this._onPortClick(comp.id, pid, type); });
      g.appendChild(c);

      // Label
      const OFFSET = 11;
      const lx = side === 'right' ? px - OFFSET : px + OFFSET;
      const ly = py - 1;
      const anchor = side === 'right' ? 'end' : 'start';
      const lbl = this._el('text', { x: lx, y: ly, class: 'cq-port-label', 'text-anchor': anchor, 'dominant-baseline': 'central' });
      lbl.textContent = pid;
      g.appendChild(lbl);
    };

    ins.forEach( (pid, i) => addPort(pid, 'in',  'left',  (i + 1) / (ins.length  + 1)));
    outs.forEach((pid, i) => addPort(pid, 'out', 'right', (i + 1) / (outs.length + 1)));
  }

  // ─────────────────────────────── PORT CLICKS ──────────────────────────────

  _onPortClick(compId, portId, portType) {
    if (this.verified) return;

    if (!this.selectedPort) {
      // Phase 1: pick an output port
      if (portType !== 'out') {
        this._flashPort(compId, portId, 'error');
        this._setStatus('⚠️ Clicca prima su una porta di uscita (bordo destro, viola).');
        return;
      }
      const abs = this._portAbs(compId, portId);
      this.selectedPort = { compId, portId, x: abs.x, y: abs.y };
      this._portCls(compId, portId, 'cq-port-selected', true);
      this._setStatus(`📌 Porta "${portId}" di "${this.comps[compId].label}" selezionata. Clicca su una porta di ingresso (blu).`);

    } else {
      // Phase 2: pick an input port to complete the connection
      if (portType !== 'in') { this._cancelPortSel(); return; }
      if (compId === this.selectedPort.compId) { this._cancelPortSel(); return; }

      const dup = this.userConns.some(c =>
        c.from.compId === this.selectedPort.compId && c.from.portId === this.selectedPort.portId &&
        c.to.compId   === compId                   && c.to.portId   === portId
      );
      if (dup) {
        this._setStatus('⚠️ Questa connessione esiste già.');
        this._cancelPortSel();
        return;
      }

      const conn = { id: `uc-${Date.now()}`, from: { compId: this.selectedPort.compId, portId: this.selectedPort.portId }, to: { compId, portId } };
      this.userConns.push(conn);
      this._drawWire(conn, this.userConnLayer, true);

      this._portCls(this.selectedPort.compId, this.selectedPort.portId, 'cq-port-selected', false);
      this.selectedPort = null;
      this._setStatus('✅ Connessione aggiunta.');
      this._emitChange();
    }
  }

  _cancelPortSel() {
    if (!this.selectedPort) return;
    this._portCls(this.selectedPort.compId, this.selectedPort.portId, 'cq-port-selected', false);
    this.selectedPort = null;
    this._setStatus('🔌 Clicca su una porta di uscita, poi su una di ingresso per collegarle.');
  }

  // ─────────────────────────────── WIRES ────────────────────────────────────

  _drawWire(conn, layer, removable, extraClass) {
    const fp = this._portAbs(conn.from.compId, conn.from.portId);
    const tp = this._portAbs(conn.to.compId,   conn.to.portId);
    const isPre = !removable;
    const cls = `cq-wire${isPre ? ' cq-wire-pre' : ''}${extraClass ? ' ' + extraClass : ''}`;
    const marker = isPre ? 'url(#cq-arrow-pre)' : 'url(#cq-arrow)';

    const path = this._el('path', {
      d: this._bezier(fp.x, fp.y, tp.x, tp.y),
      class: cls,
      'marker-end': marker
    });

    if (removable) {
      path.style.cursor = 'pointer';
      path.addEventListener('click', e => { e.stopPropagation(); this._removeWire(conn.id); });
    }

    conn.el = path;
    layer.appendChild(path);
  }

  _bezier(x1, y1, x2, y2) {
    // Horizontal distance drives control-point spread; minimum 60px for short distances
    const dx = Math.max(Math.abs(x2 - x1) * 0.55, 60);
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  }

  _removeWire(id) {
    const idx = this.userConns.findIndex(c => c.id === id);
    if (idx === -1) return;
    this.userConns[idx].el?.remove();
    this.userConns.splice(idx, 1);
    this._emitChange();
  }

  _redrawAllWires() {
    const redo = conn => {
      if (!conn.el) return;
      const fp = this._portAbs(conn.from.compId, conn.from.portId);
      const tp = this._portAbs(conn.to.compId,   conn.to.portId);
      conn.el.setAttribute('d', this._bezier(fp.x, fp.y, tp.x, tp.y));
    };
    this.userConns.forEach(redo);
    this.preConns.forEach(redo);
  }

  // ─────────────────────────────── DRAG ─────────────────────────────────────

  _startDrag(compId, e) {
    if (this.selectedPort) return;  // don't drag while connecting
    const pt = this._svgPt(e);
    const c = this.comps[compId];
    this.dragging = { compId, mx: pt.x, my: pt.y, ox: c.x, oy: c.y };
    c.el.querySelector('.cq-comp-rect').style.cursor = 'grabbing';
    e.preventDefault();
  }

  _onMouseMove(e) {
    if (this._panning) {
      const pt = this._rawSVGPt(e);
      this._vp.x = this._panning.origVX + pt.x - this._panning.startX;
      this._vp.y = this._panning.origVY + pt.y - this._panning.startY;
      this._applyVP();
      return;
    }
    if (!this.dragging) return;
    const pt  = this._svgPt(e);
    const c   = this.comps[this.dragging.compId];
    c.x = Math.max(0, Math.min(this.VW - c.w, this.dragging.ox + pt.x - this.dragging.mx));
    c.y = Math.max(0, Math.min(this.VH - c.h, this.dragging.oy + pt.y - this.dragging.my));
    c.el.setAttribute('transform', `translate(${c.x},${c.y})`);
    this._redrawAllWires();
  }

  _onMouseUp(e) {
    if (this._panning) { this._panning = null; this.svg.style.cursor = 'default'; return; }
    if (!this.dragging) return;
    this.comps[this.dragging.compId].el.querySelector('.cq-comp-rect').style.cursor = 'grab';
    this.dragging = null;
  }

  _onMouseLeave() {
    if (this._panning) { this._panning = null; this.svg.style.cursor = 'default'; }
    if (this.dragging) {
      this.comps[this.dragging.compId].el.querySelector('.cq-comp-rect').style.cursor = 'grab';
      this.dragging = null;
    }
  }

  // ── Zoom & Pan ────────────────────────────────────────────────────────────

  _onWheel(e) {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    const newScale = Math.max(0.25, Math.min(4, this._vp.scale * factor));
    // Zoom toward the cursor position
    const pt = this._rawSVGPt(e);
    this._vp.x = pt.x - (pt.x - this._vp.x) * (newScale / this._vp.scale);
    this._vp.y = pt.y - (pt.y - this._vp.y) * (newScale / this._vp.scale);
    this._vp.scale = newScale;
    this._applyVP();
  }

  _startPan(e) {
    if (this.selectedPort || this.dragging) return;
    const pt = this._rawSVGPt(e);
    this._panning = { startX: pt.x, startY: pt.y, origVX: this._vp.x, origVY: this._vp.y };
    this.svg.style.cursor = 'grabbing';
    e.preventDefault();
  }

  _applyVP() {
    this.viewport.setAttribute('transform', `translate(${this._vp.x},${this._vp.y}) scale(${this._vp.scale})`);
  }

  // ponytail: fit-to-view — button shows all components at once
  _fitToView() {
    const PAD = 30;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const c of Object.values(this.comps)) {
      minX = Math.min(minX, c.x);       minY = Math.min(minY, c.y);
      maxX = Math.max(maxX, c.x + c.w); maxY = Math.max(maxY, c.y + c.h);
    }
    const contentW = maxX - minX + PAD * 2;
    const contentH = maxY - minY + PAD * 2;
    const scale = Math.min(this.VW / contentW, this.VH / contentH);
    this._vp.scale = scale;
    this._vp.x = (this.VW - contentW * scale) / 2 - (minX - PAD) * scale;
    this._vp.y = (this.VH - contentH * scale) / 2 - (minY - PAD) * scale;
    this._applyVP();
  }

  // ponytail: start at 1.6x fit, centered on diagram center — text is readable
  _initialZoom() {
    const PAD = 30;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const c of Object.values(this.comps)) {
      minX = Math.min(minX, c.x);       minY = Math.min(minY, c.y);
      maxX = Math.max(maxX, c.x + c.w); maxY = Math.max(maxY, c.y + c.h);
    }
    const contentW = maxX - minX + PAD * 2;
    const contentH = maxY - minY + PAD * 2;
    const fitScale  = Math.min(this.VW / contentW, this.VH / contentH);
    const startScale = fitScale * 1.6;  // zoom in to make text readable
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    this._vp.scale = startScale;
    // Center the diagram's center point on the SVG's center
    this._vp.x = this.VW / 2 - cx * startScale;
    this._vp.y = this.VH / 2 - cy * startScale;
    this._applyVP();
  }

  // ─────────────────────────────── SCORING ──────────────────────────────────

  _emitChange() {
    const correct    = this.data.connessioni_corrette ?? [];
    const correctSet = new Set(correct.map(c => c.from + '->' + c.to));

    let correctCount = 0, extraCount = 0;

    for (const uc of this.userConns) {
      const key = `${uc.from.compId}.${uc.from.portId}->${uc.to.compId}.${uc.to.portId}`;
      if (correctSet.has(key)) correctCount++;
      else extraCount++;
    }

    const maxScore = correct.length;
    const rawScore = Math.max(0, correctCount - extraCount);
    const pct      = maxScore > 0 ? Math.round(rawScore / maxScore * 100) : 100;

    if (this.onChange) {
      // Create a clean copy of userConns without DOM elements to pass back
      const cleanConns = this.userConns.map(c => ({ id: c.id, from: c.from, to: c.to }));
      this.onChange({ correctCount, extraCount, maxScore, pct, userConns: cleanConns });
    }
  }

  // ─────────────────────────────── CONTROLS ─────────────────────────────────

  _undo() {
    if (this.userConns.length === 0) return;
    this._removeWire(this.userConns[this.userConns.length - 1].id);
  }

  _reset() {
    for (const c of [...this.userConns]) c.el?.remove();
    this.userConns = [];
    this._cancelPortSel();
    this._emitChange();

    // Restore original positions and viewport
    for (const def of this.data.componenti) {
      const c = this.comps[def.id];
      if (!c) continue;
      c.x = def.x; c.y = def.y;
      c.el.setAttribute('transform', `translate(${c.x},${c.y})`);
    }
    this._initialZoom();
    this._redrawAllWires();
    this._setStatus('🔌 Clicca su una porta di uscita, poi su una di ingresso per collegarle.');
  }

  // ─────────────────────────────── HELPERS ──────────────────────────────────

  _el(tag, attrs = {}) {
    const el = document.createElementNS(CanvasQuiz.NS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
    return el;
  }

  _portAbs(compId, portId) {
    const c  = this.comps[compId];
    const pp = c?.portPos[portId];
    if (!c || !pp) return { x: 0, y: 0 };
    return { x: c.x + pp.x, y: c.y + pp.y };
  }

  _svgPt(e) {
    // Returns SVG point in viewport (component) space, accounting for zoom/pan
    const pt = this.svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const svgSpace = pt.matrixTransform(this.svg.getScreenCTM().inverse());
    // Undo the viewport transform to get component-space coords
    return {
      x: (svgSpace.x - this._vp.x) / this._vp.scale,
      y: (svgSpace.y - this._vp.y) / this._vp.scale,
    };
  }

  _rawSVGPt(e) {
    // Returns SVG point in raw viewBox space (before viewport transform)
    const pt = this.svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    return pt.matrixTransform(this.svg.getScreenCTM().inverse());
  }

  _portCls(compId, portId, cls, on) {
    const c = this.comps[compId];
    c?.el?.querySelector(`[data-port="${portId}"]`)?.classList.toggle(cls, on);
  }

  _flashPort(compId, portId, suffix) {
    this._portCls(compId, portId, `cq-port-${suffix}`, true);
    setTimeout(() => this._portCls(compId, portId, `cq-port-${suffix}`, false), 500);
  }

  _setStatus(text) {
    this.statusEl.textContent = text;
  }

  _adjustHeight() {
    const w = this.canvasArea.clientWidth;
    // Rendi il canvas compatto (max 350px / 44vh) per evitare lo scroll della finestra
    const natural = Math.round(w * this.VH / this.VW);
    const maxH    = Math.min(350, Math.round(window.innerHeight * 0.44));
    this.svg.style.height = Math.max(260, Math.min(natural, maxH)) + 'px';
  }

  destroy() {
    this._ro?.disconnect();
    this.wrapper.remove();
  }
}
