/**
 * Copyright (c) 2026 Emanuele Ragozzini
 * Cluster - Hub di studio e simulatore d'esami per Informatica Unisa
 * Licensed under the PolyForm Strict License 1.0.0.
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 */

// ponytail: Lightweight pure SVG Cartesian plotter with smart label collision avoidance and crisp rendering. Zero dependencies.
import React from 'react';

// Generates clean, well-spaced tick marks without stacking numbers
function getNiceTicks(min, max, targetCount = 7) {
  const span = max - min;
  if (span <= 0) return [];
  const rawStep = span / targetCount;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const norm = rawStep / magnitude;
  let step = 1 * magnitude;
  if (norm > 1.5 && norm <= 3.5) step = 2 * magnitude;
  else if (norm > 3.5 && norm <= 7.5) step = 5 * magnitude;
  else if (norm > 7.5) step = 10 * magnitude;

  const ticks = [];
  const start = Math.ceil(min / step) * step;
  for (let v = start; v <= max + 1e-9; v += step) {
    const cleanV = Math.round(v * 1000) / 1000;
    if (cleanV !== 0 && cleanV >= min && cleanV <= max) {
      ticks.push(cleanV);
    }
  }
  return ticks;
}

export function FunctionPlotSVG({ plot, width = 640, height = 380 }) {
  if (!plot) return null;

  // ViewBox settings: default centered or custom bounds
  const xMin = plot.xMin ?? -6;
  const xMax = plot.xMax ?? 6;
  const yMin = plot.yMin ?? -4;
  const yMax = plot.yMax ?? 6;

  const padLeft = 60;
  const padRight = 50;
  const padTop = 40;
  const padBottom = 40;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  // Coordinate transforms
  const toSvgX = (x) => padLeft + ((x - xMin) / (xMax - xMin)) * plotW;
  const toSvgY = (y) => height - padBottom - ((y - yMin) / (yMax - yMin)) * plotH;

  const rawOriginX = toSvgX(0);
  const rawOriginY = toSvgY(0);

  // Clamp origin line so axes are always visible inside plot area
  const originX = Math.max(padLeft, Math.min(width - padRight, rawOriginX));
  const originY = Math.max(padTop, Math.min(height - padBottom, rawOriginY));

  // Generate smart spaced ticks
  const xTicks = getNiceTicks(xMin, xMax, 8);
  const yTicks = getNiceTicks(yMin, yMax, 6);

  // Calculate non-overlapping positions for critical point labels
  const rawPoints = (plot.points || []).map((pt, idx) => {
    const px = toSvgX(pt.x);
    const py = toSvgY(pt.y);
    const label = pt.label || '';
    const approxW = label.length * 6.5 + 8;
    const isMax = pt.type === 'max';
    const isMin = pt.type === 'min';

    // Default vertical bias
    let initialYOffset = isMax ? -12 : isMin ? 18 : (pt.valign === 'top' ? -12 : 18);
    let initialXOffset = pt.align === 'left' ? -8 : 8;

    return {
      ...pt,
      idx,
      px,
      py,
      approxW,
      approxH: 16,
      xOffset: initialXOffset,
      yOffset: initialYOffset
    };
  });

  // Collision detection and resolution between point labels
  for (let i = 0; i < rawPoints.length; i++) {
    for (let j = i + 1; j < rawPoints.length; j++) {
      const p1 = rawPoints[i];
      const p2 = rawPoints[j];
      const distPx = Math.abs(p1.px - p2.px);
      const distPy = Math.abs((p1.py + p1.yOffset) - (p2.py + p2.yOffset));

      // If dots or labels are physically overlapping in SVG space
      if (distPx < 85 && distPy < 24) {
        // Place one strictly above and one strictly below
        if (p1.type === 'max' || p1.py < p2.py) {
          p1.yOffset = -14;
          p2.yOffset = 20;
        } else {
          p1.yOffset = 20;
          p2.yOffset = -14;
        }
      }
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0', width: '100%', overflowX: 'auto' }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          background: 'rgba(11, 19, 38, 0.85)',
          borderRadius: '14px',
          border: '1px solid rgba(56, 189, 248, 0.18)',
          maxWidth: '100%',
          height: 'auto',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}
      >
        <defs>
          <marker id="axisArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M 1 1.5 L 7 4 L 1 6.5 Z" fill="#94a3b8" />
          </marker>
          <clipPath id="plotClip">
            <rect x={padLeft} y={padTop} width={plotW} height={plotH} />
          </clipPath>
        </defs>

        {/* Grid lines */}
        {xTicks.map(x => (
          <line
            key={`gx-${x}`}
            x1={toSvgX(x)}
            y1={padTop}
            x2={toSvgX(x)}
            y2={height - padBottom}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeDasharray="2,2"
          />
        ))}
        {yTicks.map(y => (
          <line
            key={`gy-${y}`}
            x1={padLeft}
            y1={toSvgY(y)}
            x2={width - padRight}
            y2={toSvgY(y)}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeDasharray="2,2"
          />
        ))}

        {/* X and Y axes */}
        <line
          x1={padLeft / 2}
          y1={originY}
          x2={width - padRight / 2 + 10}
          y2={originY}
          stroke="#94a3b8"
          strokeWidth="1.5"
          markerEnd="url(#axisArrow)"
        />
        <line
          x1={originX}
          y1={height - padBottom / 2 + 10}
          x2={originX}
          y2={padTop / 2 - 5}
          stroke="#94a3b8"
          strokeWidth="1.5"
          markerEnd="url(#axisArrow)"
        />

        {/* Axis labels */}
        <text x={width - padRight / 2 + 18} y={originY + 4} fill="#94a3b8" fontSize="13" fontWeight="bold" fontFamily="sans-serif">x</text>
        <text x={originX - 16} y={padTop / 2 + 2} fill="#94a3b8" fontSize="13" fontWeight="bold" fontFamily="sans-serif">y</text>
        {originX >= padLeft && originX <= width - padRight && originY >= padTop && originY <= height - padBottom && (
          <text x={originX - 12} y={originY + 15} fill="#64748b" fontSize="10" fontFamily="sans-serif">0</text>
        )}

        {/* Tick numbers */}
        {xTicks.map(x => (
          <text key={`tx-${x}`} x={toSvgX(x)} y={originY + 16} fill="#64748b" fontSize="10" textAnchor="middle">
            {x}
          </text>
        ))}
        {yTicks.map(y => (
          <text key={`ty-${y}`} x={originX - 10} y={toSvgY(y) + 4} fill="#64748b" fontSize="10" textAnchor="end">
            {y}
          </text>
        ))}

        {/* Asymptotes */}
        {plot.asymptotes?.map((asymp, i) => {
          if (asymp.type === 'v') {
            const vx = typeof asymp.x === 'number' ? asymp.x : parseFloat(asymp.x);
            const asympX = toSvgX(vx);
            const labelAnchor = asympX > width - padRight - 50 ? 'end' : 'start';
            const labelX = asympX > width - padRight - 50 ? asympX - 6 : asympX + 6;

            return (
              <g key={`asymp-v-${i}`}>
                <line
                  x1={asympX}
                  y1={padTop}
                  x2={asympX}
                  y2={height - padBottom}
                  stroke="#f43f5e"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                />
                {asymp.label && (
                  <text
                    x={labelX}
                    y={padTop + 16}
                    fill="#f43f5e"
                    stroke="#0b1326"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                    style={{ paintOrder: 'stroke fill' }}
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor={labelAnchor}
                  >
                    {asymp.label}
                  </text>
                )}
              </g>
            );
          }
          if (asymp.type === 'h') {
            const hy = typeof asymp.y === 'number' ? asymp.y : parseFloat(asymp.y);
            const asympY = toSvgY(hy);
            return (
              <g key={`asymp-h-${i}`}>
                <line
                  x1={padLeft}
                  y1={asympY}
                  x2={width - padRight}
                  y2={asympY}
                  stroke="#f43f5e"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                />
                {asymp.label && (
                  <text
                    x={width - padRight - 6}
                    y={asympY - 6}
                    fill="#f43f5e"
                    stroke="#0b1326"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                    style={{ paintOrder: 'stroke fill' }}
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="end"
                  >
                    {asymp.label}
                  </text>
                )}
              </g>
            );
          }
          if (asymp.type === 'oblique') {
            const m = asymp.m ?? 1;
            const q = asymp.q ?? 0;
            const x1 = xMin;
            const y1 = m * x1 + q;
            const x2 = xMax;
            const y2 = m * x2 + q;
            return (
              <g key={`asymp-ob-${i}`}>
                <line
                  x1={toSvgX(x1)}
                  y1={toSvgY(y1)}
                  x2={toSvgX(x2)}
                  y2={toSvgY(y2)}
                  stroke="#f43f5e"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                />
                {asymp.label && (
                  <text
                    x={toSvgX(x2) - 10}
                    y={toSvgY(y2) - 6}
                    fill="#f43f5e"
                    stroke="#0b1326"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                    style={{ paintOrder: 'stroke fill' }}
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {asymp.label}
                  </text>
                )}
              </g>
            );
          }
          return null;
        })}

        {/* Function curves with clipping to plot area */}
        <g clipPath="url(#plotClip)">
          {plot.curves?.map((pts, cIdx) => {
            if (!pts || pts.length === 0) return null;
            const d = pts.reduce((acc, p, idx) => {
              const sx = toSvgX(p[0]);
              const sy = toSvgY(p[1]);
              return idx === 0 ? `M ${sx} ${sy}` : `${acc} L ${sx} ${sy}`;
            }, '');

            return (
              <path
                key={`curve-${cIdx}`}
                d={d}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}

          {plot.paths?.map((pathD, pIdx) => (
            <path
              key={`raw-path-${pIdx}`}
              d={pathD}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* Critical / Noteworthy Points (with anti-overlap and dark halo) */}
        {rawPoints.map((pt) => {
          const color = pt.type === 'max' ? '#fbbf24' : pt.type === 'min' ? '#34d399' : pt.type === 'flesso' ? '#c084fc' : '#38bdf8';

          // Prevent labels from clipping on horizontal edges
          const isNearLeft = pt.px < padLeft + 30;
          const isNearRight = pt.px > width - padRight - 30;
          const textAnchor = isNearLeft ? 'start' : isNearRight ? 'end' : (pt.xOffset < 0 ? 'end' : 'start');
          const textX = isNearLeft ? pt.px + 8 : isNearRight ? pt.px - 8 : pt.px + pt.xOffset;
          const textY = pt.py + pt.yOffset;

          return (
            <g key={`pt-${pt.idx}`}>
              <circle cx={pt.px} cy={pt.py} r="5" fill={color} stroke="#0f172a" strokeWidth="2" />
              {pt.label && (
                <text
                  x={textX}
                  y={textY}
                  fill={color}
                  stroke="#0b1326"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  style={{ paintOrder: 'stroke fill' }}
                  fontSize="11"
                  fontWeight="700"
                  textAnchor={textAnchor}
                >
                  {pt.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
