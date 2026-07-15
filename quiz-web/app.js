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
let storico = [];       // { domanda, rispostaUtente, rispostaCorretta, esito }
let currentQuizName = null; // nome del quiz attivo (per percorso immagini)

// ── DOM refs ──────────────────────────────────────────────────────────────────
const screens      = { welcome: $('screen-welcome'), quiz: $('screen-quiz'), result: $('screen-result') };
const ui = {
  scorechip:     $('score-chip'),
  progressFill:  $('progress-fill'),
  progressWrap:  $('progress-bar-wrap'),
  meta:          $('question-meta'),
  text:          $('question-text'),
  questionImage: $('question-image'),
  answers:       $('answers'),
  feedback:      $('feedback'),
  quizCard:      $('quiz-card'),
  resultIcon:    $('result-icon'),
  resultTitle:   $('result-title'),
  resultScore:   $('result-score'),
  resultBarFill: $('result-bar-fill'),
  resultPct:     $('result-pct'),
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
  // Seleziona casualmente fino a MAX_DOMANDE domande
  const pool = shuffle([...data]).slice(0, MAX_DOMANDE);
  domande   = pool;
  indice    = 0;
  punteggio = 0;
  storico   = [];
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
  aggiornaPunteggiochip();
  ui.answers.innerHTML = '';
  hideFeedback();
  resetCardState();
  updateProgress(indice, tot);

  // Immagine domanda (opzionale)
  if (d.immagine && window.electronAPI && currentQuizName) {
    ui.questionImage.src = `quiz-local:///images/${encodeURIComponent(currentQuizName)}/${encodeURIComponent(d.immagine)}`;
    ui.questionImage.removeAttribute('hidden');
  } else {
    ui.questionImage.hidden = true;
  }

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
  // Blocca tutti i bottoni dopo la scelta
  ui.answers.querySelectorAll('.option').forEach(el => {
    el.classList.add('disabled');
    el.style.pointerEvents = 'none';
  });
  // Registra la risposta nello storico
  storico.push({
    domanda: domande[indice].domanda,
    rispostaUtente: scelta,
    rispostaCorretta: corretta,
    esito: ok ? 'corretta' : 'sbagliata'
  });
  avanzaDopoFeedback(ok);
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
    // Registra la risposta nello storico
    storico.push({
      domanda: d.domanda,
      rispostaUtente: v,
      rispostaCorretta: d.risposta,
      esito: ok ? 'corretta' : 'sbagliata'
    });
    avanzaDopoFeedback(ok);
  };

  btn.addEventListener('click', conferma);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') conferma(); });

  wrap.appendChild(input);
  wrap.appendChild(btn);
  ui.answers.appendChild(wrap);
  input.focus();
}

// ── Feedback e avanzamento ────────────────────────────────────────────────
// ok: true = risposta corretta, false = sbagliata
function avanzaDopoFeedback(ok) {
  if (ok) {
    punteggio++;
  }
  // Nessun feedback visivo immediato (rimosso per requisito todo)
  aggiornaPunteggiochip();
  setTimeout(avanza, 600);
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

// ── Integrazione Electron (no-op in browser normale) ─────────────────────────
if (window.electronAPI) {
  document.body.classList.add('electron')
  $('electron-hud').removeAttribute('hidden')
  $('drag-strip').removeAttribute('hidden')

  $('btn-win-min').addEventListener('click',   () => window.electronAPI.minimize())
  $('btn-win-close').addEventListener('click', () => window.electronAPI.close())

  $('quiz-list-section').removeAttribute('hidden')
  $('welcome-actions').hidden = true

  caricaListaQuiz()
}

async function caricaListaQuiz() {
  const quizzes = await window.electronAPI.listQuizzes()
  const listEl  = $('quiz-list')
  listEl.innerHTML = ''

  if (quizzes.length === 0) {
    listEl.innerHTML = '<p class="quiz-list-empty">Nessun quiz trovato in <code>Quizzes/</code></p>'
    return
  }

  quizzes.forEach(q => {
    const btn = document.createElement('button')
    btn.className = 'quiz-item'
    btn.innerHTML = `
      <span class="quiz-item-name">${q.name}</span>
      <span class="quiz-item-count">${q.count} domande</span>
      <span class="quiz-item-arrow">→</span>
    `
    btn.addEventListener('click', async () => {
      currentQuizName = q.name  // per il percorso immagini
      const content = await window.electronAPI.loadQuiz(q.filename)
      avvia(JSON.parse(content))
    })
    listEl.appendChild(btn)
  })
}


// Aggiorna il chip del punteggio nella barra header
function aggiornaPunteggiochip() {
  const txt = `📊 ${punteggio} / ${domande.length}`;
  ui.scorechip.textContent = txt;
  const fixed = $('score-fixed');
  if (fixed) fixed.textContent = txt;
}

// ── Schermata risultato ───────────────────────────────────────────────────
function mostraRisultato() {
  const tot = domande.length;
  const nCorrette  = storico.filter(r => r.esito === 'corretta').length;
  const nSbagliate = storico.filter(r => r.esito === 'sbagliata').length;
  const nSaltate   = tot - storico.length; // domande non risposte (skip futuro)

  // Calcolo punteggio in 30esimi: +1 corretta, -0.25 sbagliata, +0 saltata
  const puntiGrezzi = nCorrette * 1 - nSbagliate * 0.25;
  const punteggio30 = Math.max(0, (puntiGrezzi / tot) * 30);
  const pct = Math.round((nCorrette / tot) * 100);

  let icon, titolo;
  if (pct >= 80)      { icon = '🏆'; titolo = 'Ottimo lavoro!'; }
  else if (pct >= 60) { icon = '💪'; titolo = 'Quasi — riprova!'; }
  else if (pct >= 40) { icon = '📖'; titolo = 'Continua a studiare!'; }
  else                { icon = '📚'; titolo = 'Studia ancora un po\'!'; }

  ui.resultIcon.textContent  = icon;
  ui.resultTitle.textContent = titolo;
  // Mostra punteggio in 30esimi
  const punteggio30Str = Number.isInteger(punteggio30) ? punteggio30 : punteggio30.toFixed(2);
  ui.resultScore.textContent = `${punteggio30Str} / 30`;
  ui.resultPct.textContent   = `${nCorrette} corrette · ${nSbagliate} sbagliate · ${nSaltate} saltate`;
  ui.resultBarFill.style.width = '0%'; // reset per animazione

  // ── Resoconto dettagliato ────────────────────────────────────────────────
  const recap = $('result-recap');
  recap.innerHTML = '';
  storico.forEach((item, i) => {
    const row = document.createElement('div');
    row.className = `recap-row recap-${item.esito}`;
    const icona = item.esito === 'corretta' ? '✅' : '❌';
    row.innerHTML = `
      <div class="recap-num">${i + 1}</div>
      <div class="recap-content">
        <div class="recap-domanda">${item.domanda}</div>
        <div class="recap-risposta">
          ${icona} <span class="recap-label">La tua risposta:</span> <strong>${item.rispostaUtente}</strong>
          ${item.esito === 'sbagliata' ? `<span class="recap-risposta-corretta"> — Corretta: <strong>${item.rispostaCorretta}</strong></span>` : ''}
        </div>
      </div>
    `;
    recap.appendChild(row);
  });
  // Domande saltate (se presenti)
  domande.slice(storico.length).forEach((d, i) => {
    const row = document.createElement('div');
    row.className = 'recap-row recap-saltata';
    row.innerHTML = `
      <div class="recap-num">${storico.length + i + 1}</div>
      <div class="recap-content">
        <div class="recap-domanda">${d.domanda}</div>
        <div class="recap-risposta">⏭️ <span class="recap-label">Non risposta</span></div>
      </div>
    `;
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
}
