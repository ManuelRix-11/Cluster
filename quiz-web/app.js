// ── Quiz di esempio (fallback se non si carica un JSON) ──────────────────────
const DEMO = [
  {
    domanda: "Qual è la capitale dell'Italia?",
    risposta1: "Milano", risposta2: "Roma", risposta3: "Napoli", risposta4: "Torino",
    corretta: "Roma"
  },
  {
    domanda: "Chi ha dipinto la Gioconda?",
    risposta: "Leonardo da Vinci"
  },
  {
    domanda: "Quanti continenti ci sono sulla Terra?",
    risposta1: "5", risposta2: "6", risposta3: "7", risposta4: "8",
    corretta: "7"
  },
  {
    domanda: "In che anno è caduto il Muro di Berlino?",
    risposta: "1989"
  },
  {
    domanda: "Qual è il pianeta più grande del sistema solare?",
    risposta1: "Saturno", risposta2: "Nettuno", risposta3: "Giove", risposta4: "Urano",
    corretta: "Giove"
  }
];

// ── Stato ─────────────────────────────────────────────────────────────────────
let domande = [], indice = 0, punteggio = 0;

// ── DOM refs ──────────────────────────────────────────────────────────────────
const screens      = { welcome: $('screen-welcome'), quiz: $('screen-quiz'), result: $('screen-result') };
const ui = {
  scorechip:    $('score-chip'),
  progressFill: $('progress-fill'),
  progressWrap: $('progress-bar-wrap'),
  meta:         $('question-meta'),
  text:         $('question-text'),
  answers:      $('answers'),
  feedback:     $('feedback'),
  quizCard:     $('quiz-card'),
  resultIcon:   $('result-icon'),
  resultTitle:  $('result-title'),
  resultScore:  $('result-score'),
  resultBarFill:$('result-bar-fill'),
  resultPct:    $('result-pct'),
};

function $(id) { return document.getElementById(id); }

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
$('btn-restart').addEventListener('click', () => { indice = 0; punteggio = 0; mostraDomanda(); showScreen('quiz'); });

// ── Navigazione schermate ─────────────────────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── Avvio quiz ────────────────────────────────────────────────────────────────
function avvia(data) {
  domande   = data;
  indice    = 0;
  punteggio = 0;
  mostraDomanda();
  showScreen('quiz');
}

// ── Mostra domanda ────────────────────────────────────────────────────────────
function mostraDomanda() {
  const d   = domande[indice];
  const tot = domande.length;
  const n   = indice + 1;

  ui.meta.textContent = `Domanda ${n} / ${tot}`;
  ui.text.textContent = d.domanda;
  ui.scorechip.textContent = `⭐ ${punteggio} / ${tot}`;
  ui.answers.innerHTML = '';
  hideFeedback();
  resetCardState();
  updateProgress(indice, tot);

  if (d.risposta1 !== undefined) {
    buildMultipla(d);
  } else {
    buildAperta(d);
  }
}

function updateProgress(done, tot) {
  const pct = (done / tot) * 100;
  ui.progressFill.style.width = pct + '%';
  ui.progressWrap.setAttribute('aria-valuenow', pct);
}

// ── Risposta multipla ─────────────────────────────────────────────────────────
function buildMultipla(d) {
  const opzioni = [d.risposta1, d.risposta2, d.risposta3, d.risposta4];
  const labels  = ['A', 'B', 'C', 'D'];
  opzioni.forEach((op, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.id = `option-${i}`;
    btn.innerHTML = `
      <span class="option-label">${labels[i]}</span>
      <span class="option-text">${op}</span>
    `;
    btn.addEventListener('click', () => valutaMultipla(op, d.corretta, btn));
    ui.answers.appendChild(btn);
  });
}

function valutaMultipla(scelta, corretta, clickedEl) {
  const ok = scelta.trim().toLowerCase() === corretta.trim().toLowerCase();
  // colora le opzioni
  ui.answers.querySelectorAll('.option').forEach(el => {
    const txt = el.querySelector('.option-text').textContent;
    if (txt.trim().toLowerCase() === corretta.trim().toLowerCase()) {
      el.classList.add('correct-ans');
    } else if (el === clickedEl && !ok) {
      el.classList.add('wrong-ans');
    } else {
      el.classList.add('disabled');
    }
  });
  avanzaDopoFeedback(ok, corretta);
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
  btn.textContent = 'Conferma →';

  const conferma = () => {
    const v = input.value.trim();
    if (!v) return;
    const ok = v.toLowerCase() === d.risposta.trim().toLowerCase();
    input.disabled = true;
    btn.disabled   = true;
    avanzaDopoFeedback(ok, d.risposta);
  };

  btn.addEventListener('click', conferma);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') conferma(); });

  wrap.appendChild(input);
  wrap.appendChild(btn);
  ui.answers.appendChild(wrap);
  input.focus();
}

// ── Feedback e avanzamento ────────────────────────────────────────────────────
function avanzaDopoFeedback(ok, corretta) {
  if (ok) {
    punteggio++;
    showFeedback('ok', '✅ Corretto!');
    ui.quizCard.classList.add('correct');
  } else {
    showFeedback('err', `❌ Sbagliato — risposta: ${corretta}`);
    ui.quizCard.classList.add('wrong');
  }
  ui.scorechip.textContent = `⭐ ${punteggio} / ${domande.length}`;
  setTimeout(avanza, 1500);
}

function avanza() {
  indice++;
  if (indice < domande.length) {
    mostraDomanda();
  } else {
    mostraRisultato();
  }
}

function showFeedback(type, msg) {
  ui.feedback.textContent = msg;
  ui.feedback.className = `feedback show ${type}`;
}
function hideFeedback() {
  ui.feedback.textContent = '';
  ui.feedback.className = 'feedback';
}
function resetCardState() {
  ui.quizCard.classList.remove('correct', 'wrong');
}

// ── Schermata risultato ───────────────────────────────────────────────────────
function mostraRisultato() {
  const tot = domande.length;
  const pct = Math.round((punteggio / tot) * 100);

  let icon, titolo;
  if (pct >= 80)      { icon = '🏆'; titolo = 'Ottimo lavoro!'; }
  else if (pct >= 50) { icon = '💪'; titolo = 'Quasi — riprova!'; }
  else                { icon = '📚'; titolo = 'Studia ancora un po\'!'; }

  ui.resultIcon.textContent  = icon;
  ui.resultTitle.textContent = titolo;
  ui.resultScore.textContent = `${punteggio} / ${tot}`;
  ui.resultPct.textContent   = `${pct}%`;
  ui.resultBarFill.style.width = '0%'; // reset per animazione

  showScreen('result');
  // trigger animazione barra con piccolo delay
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ui.resultBarFill.style.width = pct + '%';
    });
  });

  updateProgress(tot, tot);
}
