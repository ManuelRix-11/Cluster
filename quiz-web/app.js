// ── Quiz di esempio (fallback se non si carica un JSON) ──────────────────────
const DEMO = [
  {
    domanda: "Qual è la capitale dell'Italia?",
    risposta1: "Milano", risposta2: "Roma", risposta3: "Napoli", risposta4: "Torino",
    corretta: "Roma"
  },
  {
    domanda: "Chi ha dipinto la Gioconda?",
    corretta: "Leonardo da Vinci"
  },
  {
    domanda: "Quanti continenti ci sono sulla Terra?",
    risposta1: "5", risposta2: "6", risposta3: "7", risposta4: "8",
    corretta: "7"
  },
  {
    domanda: "In che anno è caduto il Muro di Berlino?",
    corretta: "1989"
  },
  {
    domanda: "Qual è il pianeta più grande del sistema solare?",
    risposta1: "Saturno", risposta2: "Nettuno", risposta3: "Giove", risposta4: "Urano",
    corretta: "Giove"
  }
];

// ── Stato ─────────────────────────────────────────────────────────────────────
let domande = [], indice = 0;
let risposte = [];  // risposte[i] = null | { domanda, rispostaUtente, rispostaCorretta, esito }
let currentQuizName = null; // nome del quiz attivo (per percorso immagini)
let statsRows = [];     // righe CSV in memoria (solo durante la sessione Electron)

// ── DOM refs ──────────────────────────────────────────────────────────────────
function $(id) { return document.getElementById(id); }

const screens = { anni: $('screen-anni'), welcome: $('screen-welcome'), quiz: $('screen-quiz'), result: $('screen-result'), stats: $('screen-stats') };
const ui = {
  progressFill: $('progress-fill'),
  progressWrap: $('progress-bar-wrap'),
  meta: $('question-meta'),
  text: $('question-text'),
  questionImage: $('question-image'),
  answers: $('answers'),
  feedback: $('feedback'),
  quizCard: $('quiz-card'),
  resultIcon: $('result-icon'),
  resultTitle: $('result-title'),
  resultScore: $('result-score'),
  resultBarFill: $('result-bar-fill'),
  resultPct: $('result-pct'),
  cCompilerWarning: $('c-compiler-warning'),
};


// ── File loading ──────────────────────────────────────────────────────────────
function bindFileInput(inputId) {
  $(inputId).addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!Array.isArray(data) || data.length === 0) throw new Error('Array JSON vuoto o non valido.');
        avvia(data);
      } catch (err) {
        alert('Errore nel file JSON:\n' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset per ricaricare lo stesso file
  });
}

bindFileInput('file-input');
bindFileInput('file-input-result');

$('btn-demo').addEventListener('click', () => avvia(DEMO));
$('btn-restart').addEventListener('click', () => avvia(domande));
$('btn-home').addEventListener('click', tornaHome);
$('btn-home-quiz').addEventListener('click', tornaHome);
$('btn-home-quiz').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') tornaHome(); });
$('btn-home-stats')?.addEventListener('click', () => showScreen('anni'));
$('btn-home-stats')?.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') showScreen('anni'); });

// ── Navigazione domande ───────────────────────────────────────────────────────
$('btn-prev').addEventListener('click', () => {
  if (indice > 0) { indice--; mostraDomanda(); }
});
$('btn-next').addEventListener('click', () => {
  if (indice < domande.length - 1) {
    indice++;
    mostraDomanda();
  } else {
    mostraRisultato(); // confirm() bloccato in Electron — il recap mostra già le saltate
  }
});

// ── Navigazione schermate ─────────────────────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  if (window.electronAPI) {
    $('electron-hud').classList.toggle('show-score', name === 'quiz');
  }
}

// ── Avvio quiz ────────────────────────────────────────────────────────────────
const MAX_DOMANDE = 30;

/** Fisher-Yates shuffle — mescola l'array in-place e lo restituisce */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function avvia(data) {
  // Separa le domande canvas dalle altre
  const canvasQs = data.filter(d => d.tipo === 'canvas');
  const otherQs = data.filter(d => d.tipo !== 'canvas');

  shuffle(canvasQs);
  shuffle(otherQs);

  let pool = [];

  // Seleziona esattamente 2 domande canvas (o meno se ce ne sono di meno)
  if (canvasQs.length > 0) {
    const numCanvas = Math.min(2, canvasQs.length);
    pool.push(...canvasQs.slice(0, numCanvas));
  }

  // Riempi il resto con le altre domande
  const remainingSlots = MAX_DOMANDE - pool.length;
  if (remainingSlots > 0) {
    pool.push(...otherQs.slice(0, remainingSlots));
  }

  // Mescola il pool finale per non avere le canvas sempre all'inizio
  shuffle(pool);

  domande = pool;
  indice = 0;
  risposte = new Array(pool.length).fill(null);
  // Mostra warning se c'è almeno una domanda di tipo codice
  const hasCodice = pool.some(d => d.tipo === 'codice');
  ui.cCompilerWarning.hidden = !hasCodice;
  mostraDomanda();
  showScreen('quiz');
}

function tornaHome() {
  domande = [];
  indice = 0;
  risposte = [];
  currentQuizName = null;
  // ponytail: in Electron torna agli anni, in browser alla welcome
  showScreen(window.electronAPI ? 'anni' : 'welcome');
}

// ── Mostra domanda ────────────────────────────────────────────────────────────
function mostraDomanda() {
  const d = domande[indice];
  const tot = domande.length;
  const n = indice + 1;

  ui.meta.textContent = `Domanda ${n} / ${tot}`;
  ui.text.textContent = d.domanda;
  ui.answers.innerHTML = '';
  hideFeedback();
  resetCardState();
  updateProgressFromAnswered();

  // Distruggi eventuale canvas precedente
  if (activeCanvas) { activeCanvas.destroy(); activeCanvas = null; }

  // Immagine domanda (opzionale)
  if (d.immagine && window.electronAPI && currentQuizName) {
    ui.questionImage.src = `quiz-local:///images/${encodeURIComponent(currentQuizName)}/${encodeURIComponent(d.immagine)}`;
    ui.questionImage.removeAttribute('hidden');
  } else {
    ui.questionImage.hidden = true;
  }

  if (d.risposta1 !== undefined) {
    buildMultipla(d);
  } else if (d.tipo === 'codice') {
    buildCodice(d);
  } else if (d.tipo === 'canvas') {
    buildCanvas(d);
  } else {
    buildAperta(d);
  }

  aggiornaPulsanti();
}

function updateProgress(done, tot) {
  const pct = (done / tot) * 100;
  ui.progressFill.style.width = pct + '%';
  ui.progressWrap.setAttribute('aria-valuenow', pct);
}

function updateProgressFromAnswered() {
  updateProgress(risposte.filter(Boolean).length, domande.length);
}

// ── Risposta multipla ─────────────────────────────────────────────────────────
function buildMultipla(d) {
  const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
  const rispSalvata = risposte[indice];
  let i = 1;
  while (d[`risposta${i}`] !== undefined) {
    const op = d[`risposta${i}`];
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.id = `option-${i - 1}`;
    // Ripristina selezione precedente (cambiabile)
    if (rispSalvata && rispSalvata.rispostaUtente === op) btn.classList.add('selected');
    btn.innerHTML = `
      <span class="option-label">${labels[i - 1] ?? i}</span>
      <span class="option-text">${op}</span>
    `;
    btn.addEventListener('click', () => selezionaOpzione(op, d.corretta, btn));
    ui.answers.appendChild(btn);
    i++;
  }
}

function selezionaOpzione(scelta, corretta, clickedEl) {
  // Rimuove selezione da tutti, marca il cliccato
  ui.answers.querySelectorAll('.option').forEach(el => el.classList.remove('selected'));
  clickedEl.classList.add('selected');
  // Salva (sovrascrive eventuale risposta precedente)
  const ok = scelta.trim().toLowerCase() === corretta.trim().toLowerCase();
  risposte[indice] = {
    domanda: domande[indice].domanda,
    rispostaUtente: scelta,
    rispostaCorretta: corretta,
    esito: ok ? 'corretta' : 'sbagliata'
  };
  updateProgressFromAnswered();
  aggiornaPulsanti();
}

// ── Fuzzy matching per risposte aperte ──────────────────────────────────────

/**
 * Normalizza una stringa: minuscolo, rimuove accenti, punteggiatura e spazi multipli.
 */
function normalizza(s) {
  return s
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // rimuove accenti
    .replace(/[^a-z0-9\s]/g, ' ')                     // punteggiatura → spazio
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Distanza di Levenshtein tra due stringhe.
 * Restituisce il numero minimo di inserimenti/cancellazioni/sostituzioni.
 */
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (__, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

/**
 * Similarità di Jaccard sui token (parole) di due stringhe normalizzate.
 * Restituisce un valore tra 0 (nessuna parola in comune) e 1 (identiche).
 */
function jaccardToken(a, b) {
  const setA = new Set(a.split(' '));
  const setB = new Set(b.split(' '));
  const intersect = [...setA].filter(w => setB.has(w)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 1 : intersect / union;
}

/**
 * Confronto "intelligente" tra la risposta dell'utente e quella corretta.
 * Restituisce 'corretta' | 'simile' | 'sbagliata'.
 *
 * - 'corretta' : match esatto dopo normalizzazione
 * - 'simile'   : typo tollerabile (Levenshtein) OPPURE alta sovrapposizione di parole (Jaccard)
 * - 'sbagliata': nessun criterio soddisfatto
 */
function valutaRispostaAperta(input, corretta) {
  const a = normalizza(input);
  const b = normalizza(corretta);

  if (a === b) return 'corretta';

  // Soglia Levenshtein: tolleranza del 30% sulla stringa più corta (min 2 edit)
  const sogliaDist = Math.max(2, Math.floor(Math.min(a.length, b.length) * 0.30));
  if (levenshtein(a, b) <= sogliaDist) return 'simile';

  // Soglia Jaccard: almeno il 60% di parole in comune
  if (jaccardToken(a, b) >= 0.60) return 'simile';

  return 'sbagliata';
}

// ── Risposta aperta ───────────────────────────────────────────────────────────
function buildAperta(d) {
  const wrap = document.createElement('div');
  wrap.className = 'open-answer-wrap';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'open-input';
  input.placeholder = 'Scrivi la tua risposta…';
  input.id = 'open-input';

  const btn = document.createElement('button');
  btn.className = 'btn btn--primary btn--confirm';

  // Ripristina risposta precedente se esiste (modificabile)
  const rispSalvata = risposte[indice];
  if (rispSalvata) {
    input.value = rispSalvata.rispostaUtente;
    btn.textContent = 'Aggiorna →';
  } else {
    btn.textContent = 'Conferma →';
  }

  const conferma = () => {
    const v = input.value.trim();
    if (!v) return;
    const esito = valutaRispostaAperta(v, d.corretta);
    risposte[indice] = {
      domanda: d.domanda,
      rispostaUtente: v,
      rispostaCorretta: d.corretta,
      esito
    };
    btn.textContent = 'Aggiorna →';
    updateProgressFromAnswered();
    aggiornaPulsanti();
  };

  btn.addEventListener('click', conferma);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') conferma(); });

  wrap.appendChild(input);
  wrap.appendChild(btn);
  ui.answers.appendChild(wrap);
  if (!rispSalvata) input.focus();
}

// ── Canvas drag-and-drop (domande tipo canvas) ────────────────────────────────
let activeCanvas = null;

function buildCanvas(d) {
  // Nascondi il testo domanda classico (è nel JSON domanda, già mostrato in ui.text)
  // Il canvas si monta dentro #answers
  const rispSalvata = risposte[indice];

  activeCanvas = new CanvasQuiz(ui.answers, d, (details) => {
    const pct = details.pct;
    const esito = pct >= 80 ? 'corretta' : pct >= 50 ? 'simile' : 'sbagliata';
    risposte[indice] = {
      domanda: d.domanda,
      rispostaUtente: `Canvas: ${details.correctCount}/${details.maxScore} conn. corrette${details.extraCount > 0 ? `, ${details.extraCount} superflue` : ''}`,
      rispostaCorretta: `${details.maxScore}/${details.maxScore} connessioni corrette`,
      esito,
      pctCanvas: pct,
      userConns: details.userConns // salva le connessioni per poterle ricaricare!
    };
    updateProgressFromAnswered();
    aggiornaPulsanti();
  }, rispSalvata?.userConns);
}

// ── Monaco editor (domande tipo codice) ───────────────────────────────────
let monacoEditor = null;

const STARTER_C = `#include <stdio.h>

int main() {
    
    return 0;
}`;

function buildCodice(d) {
  // Wrapper editor
  const editorWrap = document.createElement('div');
  editorWrap.className = 'code-editor-wrap';
  const editorDiv = document.createElement('div');
  editorDiv.id = 'code-editor';
  editorWrap.appendChild(editorDiv);

  // Pulsante esegui
  const btn = document.createElement('button');
  btn.className = 'btn btn--run btn--confirm';
  btn.textContent = '▶ Esegui & Verifica';
  btn.id = 'btn-run-code';

  // Output panel
  const output = document.createElement('div');
  output.className = 'code-output';
  output.id = 'code-output';
  output.textContent = 'Il risultato apparirà qui…';

  ui.answers.appendChild(editorWrap);
  ui.answers.appendChild(btn);
  ui.answers.appendChild(output);

  // Ripristina codice salvato
  const rispSalvata = risposte[indice];
  const valoreSalvato = rispSalvata?.codice ?? STARTER_C;

  // Inizializza Monaco (sincrono grazie al loader già caricato)
  require(['vs/editor/editor.main'], () => {
    // Distruggi istanza precedente se esiste
    if (monacoEditor) { monacoEditor.dispose(); monacoEditor = null; }

    monacoEditor = monaco.editor.create(editorDiv, {
      value: valoreSalvato,
      language: 'c',
      theme: 'vs-dark',
      fontSize: 13,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      lineNumbers: 'on',
      renderLineHighlight: 'gutter',
      fontFamily: "'Fira Code', 'Cascadia Code', monospace",
      fontLigatures: true,
      padding: { top: 10, bottom: 10 },
    });

    // Ripristina stato pulsante se già inviato
    if (rispSalvata) {
      btn.textContent = 'Riesegui →';
      renderOutput(output, rispSalvata.risultato);
    }
  });

  // Esegui e verifica
  btn.addEventListener('click', async () => {
    if (!monacoEditor) return;
    const code = monacoEditor.getValue();
    if (!code.trim()) return;

    btn.disabled = true;
    btn.textContent = '⏳ Compilazione…';
    output.className = 'code-output running';
    output.textContent = 'Compilazione in corso…';

    // Esegui tutti i test case
    const testCases = d.test_cases ?? [];
    const results = [];
    let allOk = true;

    for (const tc of testCases) {
      const res = await window.electronAPI.compileAndRun(code, tc.stdin);
      const ok = res.ok && normalizzaOutput(res.stdout) === normalizzaOutput(tc.expected);
      if (!ok) allOk = false;
      results.push({ stdin: tc.stdin, expected: tc.expected, got: res.stdout, ok, stderr: res.stderr });
    }

    const risultato = { allOk, results };
    const codice = monacoEditor.getValue();

    risposte[indice] = {
      domanda: d.domanda,
      rispostaUtente: allOk ? '✅ corretta' : '❌ sbagliata',
      rispostaCorretta: '(compilazione)',
      esito: allOk ? 'corretta' : 'sbagliata',
      codice,
      risultato,
    };

    renderOutput(output, risultato);
    btn.disabled = false;
    btn.textContent = 'Riesegui →';
    updateProgressFromAnswered();
    aggiornaPulsanti();
  });
}

function normalizzaOutput(s) {
  return (s ?? '').replace(/\r\n/g, '\n').trimEnd();
}

function renderOutput(el, risultato) {
  if (!risultato) return;
  el.innerHTML = '';
  el.className = 'code-output ' + (risultato.allOk ? 'success' : 'error');

  // Se c'e' un errore di compilazione globale, mostralo subito
  const erroreCompilazione = risultato.results.find(r => r.stderr);
  if (erroreCompilazione) {
    const errDiv = document.createElement('div');
    errDiv.style.cssText = 'font-family: monospace; font-size: 0.8rem; white-space: pre-wrap; word-break: break-all;';
    errDiv.textContent = 'Errore di compilazione:\n' + erroreCompilazione.stderr;
    el.appendChild(errDiv);
    return;
  }

  // Card per ogni test case
  const grid = document.createElement('div');
  grid.className = 'test-cases-grid';

  risultato.results.forEach((r, i) => {
    const card = document.createElement('div');
    const stato = r.ok ? 'ok' : 'fail';
    card.className = `test-case-card test-case-card--${stato}`;

    const header = document.createElement('div');
    header.className = 'test-case-header';
    header.innerHTML = r.ok ? `&#10003; Test ${i + 1} &mdash; Corretto` : `&#10007; Test ${i + 1} &mdash; Sbagliato`;
    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'test-case-body';

    const colIn = document.createElement('div');
    colIn.className = 'test-case-col';
    colIn.innerHTML = `<div class="test-case-col-label">Input</div><div class="test-case-col-value">${escHtml(r.stdin)}</div>`;

    if (r.ok) {
      const colOut = document.createElement('div');
      colOut.className = 'test-case-col';
      colOut.innerHTML = `<div class="test-case-col-label">Output</div><div class="test-case-col-value test-case-col-value--ok">${escHtml(r.got)}</div>`;
      body.appendChild(colIn);
      body.appendChild(colOut);
    } else {
      body.style.gridTemplateColumns = '1fr 1fr 1fr';
      const colAtteso = document.createElement('div');
      colAtteso.className = 'test-case-col';
      colAtteso.innerHTML = `<div class="test-case-col-label">Atteso</div><div class="test-case-col-value test-case-col-value--ok">${escHtml(r.expected)}</div>`;
      const colGot = document.createElement('div');
      colGot.className = 'test-case-col';
      colGot.innerHTML = `<div class="test-case-col-label">Ottenuto</div><div class="test-case-col-value test-case-col-value--fail">${escHtml(r.got) || '<em style="opacity:.5">nessun output</em>'}</div>`;
      body.appendChild(colIn);
      body.appendChild(colAtteso);
      body.appendChild(colGot);
    }
    card.appendChild(body);
    grid.appendChild(card);
  });

  el.appendChild(grid);
}

function escHtml(s) {
  return (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}


// ── Navigazione e stato pulsanti ─────────────────────────────────────────────
function aggiornaPulsanti() {
  const btnPrev = $('btn-prev');
  const btnNext = $('btn-next');
  if (!btnPrev || !btnNext) return;
  btnPrev.disabled = indice === 0;
  if (indice === domande.length - 1) {
    const nSaltate = risposte.filter(r => r === null).length;
    btnNext.textContent = nSaltate > 0 ? `Consegna ⚠️ (${nSaltate})` : 'Consegna ✓';
  } else {
    btnNext.textContent = 'Avanti →';
  }
}

function hideFeedback() {
  ui.feedback.textContent = '';
  ui.feedback.className = 'feedback';
}
function resetCardState() {
  ui.quizCard.classList.remove('correct', 'wrong');
}

// ── Integrazione Electron (no-op in browser normale) ─────────────────────────
if (window.electronAPI) {
  document.body.classList.add('electron')
  $('electron-hud').removeAttribute('hidden')
  $('drag-strip').removeAttribute('hidden')

  $('btn-hud-min').addEventListener('click', () => window.electronAPI.minimize())
  $('btn-hud-close').addEventListener('click', () => window.electronAPI.close())

  $('quiz-list-section').removeAttribute('hidden')
  $('welcome-actions').hidden = true

  // Pulsante ← Anni nella schermata lista quiz
  $('btn-back-anni').addEventListener('click', () => showScreen('anni'))

  caricaAnni()
  caricaStats()
  $('btn-stats').addEventListener('click', apriStats)
}

// ── Statistiche CSV ───────────────────────────────────────────────────────────
async function caricaStats() {
  const csv = await window.electronAPI.readStats()
  const righe = csv.trim().split('\n').slice(1).filter(Boolean)
  statsRows = righe.map(r => {
    const [data, quiz_name_raw, n_domande, n_corrette, n_simili, n_sbagliate, punteggio_30] = r.split(',')
    const quiz_name = (quiz_name_raw ?? '').replace(/^"|"$/g, '') // strip virgolette (bug 4)
    return {
      data, quiz_name, n_domande: +n_domande, n_corrette: +n_corrette,
      n_simili: +n_simili, n_sbagliate: +n_sbagliate, punteggio_30: +punteggio_30
    }
  }).filter(r => !isNaN(r.punteggio_30)) // scarta righe corrotte (bug 5)
  if (statsRows.length > 0) $('btn-stats').removeAttribute('hidden')
}

async function salvaStats(riga) {
  statsRows.push(riga)
  const header = 'data,quiz_name,n_domande,n_corrette,n_simili,n_sbagliate,punteggio_30\n'
  const corpo = statsRows.map(r =>
    [r.data, `"${r.quiz_name}"`, r.n_domande, r.n_corrette, r.n_simili, r.n_sbagliate, r.punteggio_30].join(',') // quiz_name quotato (bug 4)
  ).join('\n')
  await window.electronAPI.writeStats(header + corpo + '\n')
  if (statsRows.length > 0) $('btn-stats').removeAttribute('hidden')
}

function apriStats() {
  if (statsRows.length === 0) return
  const tot = statsRows.length
  const media = statsRows.reduce((s, r) => s + r.punteggio_30, 0) / tot
  const best = Math.max(...statsRows.map(r => r.punteggio_30))
  const freq = {}
  statsRows.forEach(r => freq[r.quiz_name] = (freq[r.quiz_name] || 0) + 1)
  const topQuiz = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0]
  const fmt = n => Number.isInteger(n) ? String(n) : n.toFixed(2)

  $('stat-cards').innerHTML = [
    { icon: '🎯', value: tot, label: 'Sessioni' },
    { icon: '📈', value: fmt(media) + '/30', label: 'Voto medio' },
    { icon: '🏆', value: fmt(best) + '/30', label: 'Miglior voto' },
    { icon: '📚', value: topQuiz, label: 'Più studiato' },
  ].map(c => `<div class="stat-card">
    <span class="stat-card-icon">${c.icon}</span>
    <span class="stat-card-value">${c.value}</span>
    <span class="stat-card-label">${c.label}</span>
  </div>`).join('')

  $('stats-history').innerHTML = [...statsRows].reverse().map((r, i) => {
    const voto = fmt(r.punteggio_30)
    const cls = r.punteggio_30 >= 24 ? 'good' : r.punteggio_30 >= 18 ? 'ok' : 'bad'
    const simili = r.n_simili > 0 ? ` ${r.n_simili}🟡` : ''
    return `<div class="stats-row">
      <span class="stats-idx">${statsRows.length - i}</span>
      <span class="stats-name">${r.quiz_name}</span>
      <span class="stats-meta">${r.n_corrette}✅${simili} ${r.n_sbagliate}❌ / ${r.n_domande}</span>
      <span class="stats-date">${r.data}</span>
      <span class="stats-score stats-score--${cls}">${voto}/30</span>
    </div>`
  }).join('')

  showScreen('stats')
  requestAnimationFrame(drawChart)
}

function drawChart() {
  const canvas = $('stats-chart')
  if (!canvas || statsRows.length === 0) return
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  const W = rect.width, H = rect.height
  canvas.width = W * dpr
  canvas.height = H * dpr
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)

  const data = statsRows.slice(-15)
  const pad = { top: 32, right: 20, bottom: 52, left: 44 }
  const cW = W - pad.left - pad.right
  const cH = H - pad.top - pad.bottom

    // Linee griglia orizzontali
    ;[0, 18, 24, 30].forEach(score => {
      const y = pad.top + cH - (score / 30) * cH
      ctx.strokeStyle = score === 18 ? 'rgba(255,196,0,0.25)' : 'rgba(255,255,255,0.07)'
      ctx.lineWidth = 1
      ctx.setLineDash(score === 18 ? [4, 3] : [])
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = score === 18 ? 'rgba(255,196,0,0.6)' : 'rgba(255,255,255,0.3)'
      ctx.font = '11px Inter, system-ui, sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText(score, pad.left - 6, y + 4)
    })

  // Barre
  const slotW = cW / data.length
  const barW = Math.min(42, slotW * 0.62)
  data.forEach((r, i) => {
    const barH = (r.punteggio_30 / 30) * cH
    const x = pad.left + i * slotW + (slotW - barW) / 2
    const y = pad.top + cH - barH
    const color = r.punteggio_30 >= 24 ? '#43d98c' : r.punteggio_30 >= 18 ? '#ffc400' : '#ff5c6e'
    const grad = ctx.createLinearGradient(0, y, 0, pad.top + cH)
    grad.addColorStop(0, color + 'cc')
    grad.addColorStop(1, color + '22')
    ctx.fillStyle = grad
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0])
    else ctx.rect(x, y, barW, barH)
    ctx.fill()
    // Voto sopra la barra
    const label = r.punteggio_30 % 1 === 0 ? String(r.punteggio_30) : r.punteggio_30.toFixed(1)
    ctx.fillStyle = color
    ctx.font = 'bold 10px Inter, system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(label, x + barW / 2, Math.max(y - 5, pad.top + 11))
    // Data
    ctx.fillStyle = 'rgba(255,255,255,0.3)'
    ctx.font = '10px Inter, system-ui, sans-serif'
    ctx.fillText(r.data.slice(5), x + barW / 2, H - pad.bottom + 14)
    // Nome quiz (tronco)
    const nm = r.quiz_name.length > 5 ? r.quiz_name.slice(0, 5) + '…' : r.quiz_name
    ctx.fillStyle = 'rgba(255,255,255,0.2)'
    ctx.font = '9px Inter, system-ui, sans-serif'
    ctx.fillText(nm, x + barW / 2, H - pad.bottom + 26)
  })
}

async function caricaAnni() {
  const voci = await window.electronAPI.listQuizzes()   // senza subpath → root
  const anni = voci.filter(v => v.type === 'anno')
  const listEl = $('anni-list')
  listEl.innerHTML = ''

  anni.forEach(a => {
    const btn = document.createElement('button')
    btn.className = 'anno-btn'
    btn.innerHTML = `<span class="anno-nome">${a.name}</span>`
    btn.addEventListener('click', async () => {
      $('anno-title').textContent = a.name
      await caricaListaQuiz(a.name)
      showScreen('welcome')
    })
    listEl.appendChild(btn)
  })
}

async function caricaListaQuiz(subpath) {
  const quizzes = await window.electronAPI.listQuizzes(subpath)
  const listEl = $('quiz-list')
  listEl.innerHTML = ''

  if (quizzes.length === 0) {
    listEl.innerHTML = '<p class="quiz-list-empty">Nessun quiz trovato in <code>Quizzes/</code></p>'
    return
  }

  quizzes.forEach(q => {
    if (!q.hasLivelli) {
      // Quiz normale (invariato)
      const btn = document.createElement('button')
      btn.className = 'quiz-item'
      btn.innerHTML = `
        <span class="quiz-item-name">${q.name}</span>
        <span class="quiz-item-count">${q.count} domande</span>
        <span class="quiz-item-arrow">→</span>
      `
      btn.addEventListener('click', async () => {
        currentQuizName = q.name
        const content = await window.electronAPI.loadQuiz(q.filename)
        avvia(JSON.parse(content))
      })
      listEl.appendChild(btn)
      return
    }

    // Quiz con livelli: accordion inline
    const wrap = document.createElement('div')
    wrap.className = 'quiz-item-group'

    const header = document.createElement('button')
    header.className = 'quiz-item quiz-item--has-livelli'
    header.innerHTML = `
      <span class="quiz-item-name">${q.name}</span>
      <span class="livelli-badge">Livelli</span>
      <span class="quiz-item-arrow quiz-item-arrow--toggle">▾</span>
    `

    const panel = document.createElement('div')
    panel.className = 'livelli-panel'

    const livelloClass = { facile: 'livello--facile', medio: 'livello--medio', difficile: 'livello--difficile' }

    q.livelli.forEach(lv => {
      const cls = livelloClass[lv.nome.toLowerCase()] ?? ''
      const lvBtn = document.createElement('button')
      lvBtn.className = 'livello-btn ' + cls
      lvBtn.disabled = lv.count === 0
      lvBtn.innerHTML = `<span class="livello-nome">${lv.nome}</span><span class="livello-count">${lv.count} domande</span>`
      lvBtn.addEventListener('click', async () => {
        currentQuizName = q.name + ' · ' + lv.nome
        const content = await window.electronAPI.loadQuiz(lv.filename)
        avvia(JSON.parse(content))
      })
      panel.appendChild(lvBtn)
    })

    header.addEventListener('click', () => {
      const opening = !panel.classList.contains('livelli-panel--open')
      panel.classList.toggle('livelli-panel--open', opening)
      header.querySelector('.quiz-item-arrow--toggle').textContent = opening ? '▴' : '▾'
      header.classList.toggle('quiz-item--open', opening)
    })

    wrap.appendChild(header)
    wrap.appendChild(panel)
    listEl.appendChild(wrap)
  })
}



// ── Schermata risultato ───────────────────────────────────────────────────
function mostraRisultato() {
  const tot = domande.length;
  const nCorrette = risposte.filter(r => r?.esito === 'corretta').length;
  const nSimili = risposte.filter(r => r?.esito === 'simile').length;
  const nSbagliate = risposte.filter(r => r?.esito === 'sbagliata').length;
  const nSaltate = risposte.filter(r => r === null).length;

  // Calcolo punteggio in 30esimi: +1 corretta/simile, -0.25 sbagliata, +0 saltata
  const nOk = nCorrette + nSimili;
  const puntiGrezzi = nOk * 1 - nSbagliate * 0.25;
  const punteggio30 = Math.max(0, (puntiGrezzi / tot) * 30);
  const pct = Math.round((nOk / tot) * 100);

  let icon, titolo;
  if (pct >= 80) { icon = '🏆'; titolo = 'Ottimo lavoro!'; }
  else if (pct >= 60) { icon = '💪'; titolo = 'Quasi — riprova!'; }
  else if (pct >= 40) { icon = '📖'; titolo = 'Continua a studiare!'; }
  else { icon = '📚'; titolo = "Studia ancora un po'!"; }

  ui.resultIcon.textContent = icon;
  ui.resultTitle.textContent = titolo;
  const punteggio30Str = Number.isInteger(punteggio30) ? punteggio30 : punteggio30.toFixed(2);
  ui.resultScore.textContent = `${punteggio30Str} / 30`;
  ui.resultPct.textContent = [
    `${nCorrette} corrette`,
    nSimili > 0 ? `${nSimili} simili` : null,
    `${nSbagliate} sbagliate`,
    nSaltate > 0 ? `${nSaltate} saltate` : null
  ].filter(Boolean).join(' · ');
  ui.resultBarFill.style.width = '0%';

  // ── Resoconto dettagliato ──────────────────────────────────────────
  const recap = $('result-recap');
  recap.innerHTML = '';
  risposte.forEach((item, i) => {
    const row = document.createElement('div');
    if (item === null) {
      row.className = 'recap-row recap-saltata';
      row.innerHTML = `
        <div class="recap-num">${i + 1}</div>
        <div class="recap-content">
          <div class="recap-domanda">${domande[i].domanda}</div>
          <div class="recap-risposta">⏭️ <span class="recap-label">Non risposta</span></div>
        </div>
      `;
    } else {
      row.className = `recap-row recap-${item.esito}`;
      const icona = item.esito === 'corretta' ? '✅' : item.esito === 'simile' ? '🟡' : '❌';
      const mostraCorretta = item.esito === 'sbagliata' || item.esito === 'simile';
      row.innerHTML = `
        <div class="recap-num">${i + 1}</div>
        <div class="recap-content">
          <div class="recap-domanda">${item.domanda}</div>
          <div class="recap-risposta">
            ${icona} <span class="recap-label">La tua risposta:</span> <strong>${item.rispostaUtente}</strong>
            ${mostraCorretta ? `<span class="recap-risposta-corretta"> — Corretta: <strong>${item.rispostaCorretta}</strong></span>` : ''}
          </div>
        </div>
      `;
    }
    recap.appendChild(row);
  });


  showScreen('result');
  // trigger animazione barra con piccolo delay
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ui.resultBarFill.style.width = pct + '%';
    });
  });

  updateProgress(tot, tot);

  // ── Salva stats (solo Electron) ──────────────────────────────────────────
  if (window.electronAPI && currentQuizName) {
    const oggi = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
    salvaStats({
      data: oggi,
      quiz_name: currentQuizName,
      n_domande: tot,
      n_corrette: nCorrette,
      n_simili: nSimili,
      n_sbagliate: nSbagliate,
      punteggio_30: +punteggio30.toFixed(2)
    })
  }
}
