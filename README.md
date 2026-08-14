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

## ✨ Funzionalità in Breve

- 📖 **Appunti & Dispense (Markdown)** — Viewer integrato con rendering tipografico di formule LaTeX/KaTeX, diagrammi Mermaid, ricerca rapida e navigazione per capitoli.
- 📝 **Simulatore d'Esame Multi-tipologia**: 
  - **A scelta multipla & risposta aperta** con correzione istantanea e tag per argomento.
  - **Programmazione C e Java** con editor Monaco integrato e compilazione/esecuzione locale con test-case.
  - **Matematica** con validatore algebrico e tolleranza numerica.
  - **Esercizi interattivi Canvas** per circuiti logici e datapath MIPS.
- 🧭 **Navigazione & Griglia Domande** — Griglia laterale a 5 colonne con indicatori visivi di completamento, salto domande e calcolo del voto in trentesimi.
- 📊 **Dashboard & Statistiche** — Tracciamento dei progressi per sessione e analisi dettagliata delle competenze per tag per individuare subito i punti deboli.
- 🎨 **Design Moderno** — Tema scuro glassmorphism, animazioni fluide e reattività completa.

---

## 📥 Download Eseguibili

Non vuoi compilare il progetto? Gli eseguibili già pronti per **Windows** e **Linux** sono disponibili nella sezione [**Releases**](../../releases). Non è richiesta alcuna installazione: basta scaricare ed eseguire.

---

## 🚀 Avvio da Sorgente

### Prerequisiti
- **Node.js** (v18 o superiore)
- **GCC / Java** (per eseguire i quiz di programmazione C o Java)

```bash
# 1. Installa le dipendenze
npm install

# 2. Avvia l'app in modalità sviluppo
npm run dev
```

---

## 📦 Compilazione ed Eseguibili

Per generare l'eseguibile desktop distribuibile:

```bash
npm run build        # Windows (.exe)
npm run build:linux  # Linux (.tar.gz)
```

---

## 🛠️ Stack Tecnologico

- **Shell Desktop**: Electron (Main & Preload sicuri via IPC)
- **Frontend**: React 19, Vite, CSS Vanilla Glassmorphism
- **Strumenti**: Monaco Editor, GCC / Java SDK, Marked, KaTeX, Mermaid
