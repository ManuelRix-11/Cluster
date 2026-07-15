# Specifiche Progetto: Quiz App con GUI Moderna

## Obiettivo
Creare un'applicazione desktop leggera con interfaccia grafica (GUI) per gestire quiz a risposta multipla e a risposta aperta. L'app deve essere "click-to-go" e facile da avviare.

## Tecnologie Consigliate
- **Linguaggio**: Python
- **GUI Framework**: `customtkinter` (libreria basata su Tkinter ma che offre componenti UI moderni, supporto nativo a temi dark/light, angoli arrotondati e un look and feel molto più accattivante e professionale rispetto al Tkinter classico).
- **Gestione Dati**: Modulo `json` integrato in Python.

## Requisiti dell'Interfaccia Grafica (GUI)
- **Stile**: L'interfaccia deve essere moderna, pulita e minimale. Sfruttare le potenzialità di `customtkinter` per creare bottoni e frame accattivanti.
- **Avvio**: L'app deve leggere automaticamente un file chiamato `quiz.json` (situato nella stessa cartella dell'eseguibile/script), oppure presentare un tasto "Carica Quiz" all'avvio.
- **Visualizzazione Domande**:
  - Un'area di testo chiara in alto per la domanda.
  - **Se a Risposta Multipla**: Mostrare 4 bottoni cliccabili per le opzioni (risposta 1, 2, 3 e 4).
  - **Se a Risposta Aperta**: Mostrare un campo di input testuale (Entry/Textbox) e un bottone "Conferma".
- **Feedback & Punteggio**: 
  - Dopo aver risposto, l'app deve far capire all'utente se ha fatto bene o male (es. cambiando colore, o mostrando un breve popup).
  - Tenere traccia del punteggio (es. "Punteggio: 3/10").
  - Alla fine del JSON, mostrare una schermata di riepilogo finale.

## Struttura Dati (JSON)
L'app deve poter leggere un array JSON. Il codice dovrà capire se si tratta di una domanda a risposta multipla o aperta controllando la presenza delle chiavi.

**Esempio di struttura interna per Risposta Multipla:**
```json
{
  "domanda": "Qual è la capitale dell'Italia?",
  "risposta1": "Milano",
  "risposta2": "Roma",
  "risposta3": "Napoli",
  "risposta4": "Torino",
  "corretta": "Roma"
}
```

**Esempio di struttura interna per Risposta Aperta:**
```json
{
  "domanda": "Chi ha dipinto la Gioconda?",
  "risposta": "Leonardo da Vinci"
}
```

## Requisiti di Sviluppo per il Coding Agent
1. Mantieni tutto il codice preferibilmente in un unico file `main.py` o `app.py` per semplicità di distribuzione.
2. Scrivi codice robusto per la gestione degli errori (es. se il file `quiz.json` non viene trovato).
3. Aggiungi commenti chiari per spiegare come installare la dipendenza necessaria (basterà un semplice `pip install customtkinter`).
4. (Opzionale ma consigliato) Spiega come impacchettare il progetto in un `.exe` o `.app` usando `PyInstaller`, nel caso l'utente volesse rendere l'app un VERO eseguibile "click-to-go" senza nemmeno bisogno di Python sul pc di destinazione.
