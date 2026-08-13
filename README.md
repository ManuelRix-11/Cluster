<p align="center">
  <img src="assets/logoIUE.png" width="180" alt="Logo Cluster"/>
</p>
<h1 align="center">Cluster<span style="color: #c084fc; display: inline-block; vertical-align: 0.13em; margin-left: 2px;">.</span></h1>

<p align="center">
  <b>Hub di studio all-in-one e simulatore d'esami desktop per il corso di laurea in Informatica dell'Università degli Studi di Salerno (UNISA).</b>
</p>

---

## 👤 Autore & Licenza

**Emanuele Ragozzini** — *Progetto creato per gli studenti del Dipartimento di Informatica (UNISA).*

Questo progetto è rilasciato sotto licenza [PolyForm Strict 1.0.0](LICENSE). È utilizzabile liberamente solo per scopi personali e non commerciali; la modifica e la ridistribuzione non sono consentite.

Fatto con ❤️ e caffè. © 2026 Tutti i diritti riservati.

---

## 📸 Anteprima

<img src="design/screenshots/homescreen.png" width="100%" alt="Home screen"/>
<div style="display: flex; flex-direction:row">
  <img src="design/screenshots/screen_quiz.png" width="49.8%" alt="Schermata quiz"/><img src="design/screenshots/screen_result.png" width="49.8%" alt="Schermata risultato"/>
</div>

---

## ✨ Funzionalità Principali

### 📖 Sezione Appunti & Studio
- **Viewer Markdown Integrato** — Consulta appunti e dispense organizzate per anno e materia direttamente nell'app, con rendering completo.
- **Rendering KaTeX** — Le formule matematiche LaTeX (inline `$...$` e blocco `$$...$$`) vengono renderizzate tipograficamente in tempo reale.
- **Rendering Mermaid** — I blocchi di codice `mermaid` nei file Markdown vengono renderizzati come diagrammi e grafici interattivi.
- **Navigazione Laterale** — Struttura ad albero con ricerca per filtrare rapidamente le note per nome.
- **Cerca nel documento (Ctrl+F)** — Barra di ricerca fluttuante attivabile con `Ctrl+F` che evidenzia tutte le occorrenze del testo nel documento aperto e permette la navigazione tra i risultati.
- **Indice Navigabile** — I link dell'indice presenti nei documenti Markdown eseguono uno scroll fluido alla sezione corrispondente all'interno del viewer.
- **Scrollbar Indipendenti** — La sidebar e il contenuto della nota hanno scroll separati e indipendenti.

### 📝 Quiz e Simulatore d'Esame
- **Quiz a Scelta Multipla** — Modalità esame con selezione randomizzata delle domande, navigazione libera tra le domande e valutazione finale alla consegna.
- **Quiz a Risposta Aperta** — Con sistema di valutazione adattivo e fuzzy matching per confrontare le risposte scritte.
- **Quiz di Programmazione C** — Scrivi, compila ed esegui codice C in tempo reale grazie all'integrazione con Monaco Editor (stesso motore di VS Code) e compilatore GCC nativo.
- **Domande Matematiche** — Tipologia dedicata con rendering KaTeX per quesiti con formule e notazione matematica.
- **Esercizi Interattivi Canvas** — Risolvi quesiti di Architettura degli Elaboratori manipolando graficamente schemi di circuiti e datapath SVG con drag & drop.
- **Navigazione Flessibile** — Salta le domande, modifica le risposte prima di consegnare e monitora il progresso con la barra di avanzamento.
- **Valutazione Finale** — Schermata risultato con punteggio, riepilogo delle risposte corrette/errate e possibilità di rivedere ogni risposta.

### 📊 Dashboard & Statistiche
- **Media Voti Calcolata** — Monitora la tua media espressa in trentesimi in tempo reale.
- **Grafico di Andamento (Trend SVG)** — Grafico a linee vettoriale nativo per visualizzare i progressi nelle ultime 15 sessioni.
- **Filtri e Ordinamento** — Filtra lo storico per materia specifica o ordina per data e votazione.
- **Reset Dati** — Ripristina lo storico in qualsiasi momento con un semplice click.

### 🎨 Design & Esperienza Utente
- **Estetica Dark Glassmorphism** — Interfaccia moderna con trasparenze, sfumature viola, bordi gradienti animati e micro-animazioni ad alte prestazioni.
- **Navigazione Nativa** — Breadcrumb dinamico per spostarsi facilmente tra Home, Esami, Appunti e Storico.

---

## 📥 Download Eseguibili

Non vuoi compilare il progetto? Gli eseguibili già pronti per **Windows** e **Linux** sono disponibili nella sezione [**Releases**](../../releases) di questa repository GitHub.

Scarica la versione per il tuo sistema operativo, estraila (se necessario) ed eseguila direttamente, nessuna installazione richiesta.

---

## 🚀 Guida all'Avvio

### Prerequisiti

- **Node.js** (v18 o superiore)
- **npm**
- **GCC (Compilatore C)** — Richiesto per l'esecuzione dei quiz di programmazione C (`sudo apt install build-essential` su Linux, MinGW/MSYS2 su Windows).

### 1. Installazione Dipendenze

```bash
npm install
```

### 2. Avvio in Sviluppo (Desktop Electron)

```bash
npm start
```

---

## 📦 Compilazione ed Eseguibili

Per generare l'eseguibile desktop distribuibile:

### Windows (.exe)
```bash
npm run build
```

### Linux (.tar.gz)
```bash
npm run build:linux
```

I file generati verranno salvati automaticamente nella cartella `dist/`.

---

## 🗂️ Struttura del Progetto

```text
Cluster/
├── main.cjs                # Main process Electron (IPC, compilatore C, gestione file)
├── preload.cjs             # Bridge IPC sicuro Electron-React
├── package.json
├── vite.config.js          # Configurazione Vite per il bundler React
├── Quizzes/                # Banca dati quiz divisi per anno e materia (.json)
├── Notes/                  # Appunti e dispense in formato Markdown
├── design/                 # Screenshot e risorse grafiche di presentazione
└── renderer/               # Frontend React
    ├── index.html
    └── src/
        ├── assets/         # Risorse statiche (loghi, icone)
        ├── components/     # Componenti UI (Header, HUD, tipi di domanda)
        ├── screens/        # Schermate (Home, Esami, Study, Stats, Result, Quiz, QuizList)
        ├── styles/         # Fogli di stile (global.css, canvas-quiz.css)
        └── utils/          # Helper e funzioni di supporto
```

---

## ➕ Aggiungere Nuovi Quiz

Per aggiungere una nuova materia o un nuovo test, inserisci un file `.json` nella directory `Quizzes/`.

### Formato Quiz Scelta Multipla:
```json
[
  {
    "domanda": "Qual è la complessità temporale della ricerca binaria?",
    "risposta1": "O(log n)",
    "risposta2": "O(n)",
    "risposta3": "O(n^2)",
    "corretta": "O(log n)"
  }
]
```

### Formato Quiz di Codice C (`tipo: "codice"`):
```json
[
  {
    "tipo": "codice",
    "domanda": "Scrivi una funzione che calcoli la somma dei primi N numeri naturali.",
    "test_cases": [
      { "stdin": "5\n", "expected": "15\n" }
    ]
  }
]
```

---

## 🛠️ Tecnologie Utilizzate

- **Electron** — Shell desktop nativa e cross-platform
- **React 19 + Vite** — Interfaccia utente dinamica ad alte prestazioni
- **Monaco Editor** — Editor di codice integrato (stesso motore di VS Code)
- **GCC** — Compilazione ed esecuzione nativa del codice C via IPC
- **Marked** — Parsing dinamico degli appunti Markdown con renderer personalizzato
- **KaTeX** — Rendering tipografico di formule matematiche LaTeX
- **Mermaid** — Rendering di diagrammi e grafi da blocchi Markdown
- **CSS Vanilla & Glassmorphism** — Stile custom responsive e performante senza dipendenze grafiche esterne
