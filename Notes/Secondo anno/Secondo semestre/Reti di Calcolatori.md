# Reti di Calcolatori

> **Autore**: Carmine Federico Di Zenzo  

## Indice Generale

1. [Capitolo 1 — La Rete](#capitolo-1-la-rete)
2. [Capitolo 2 — Modello ISO/OSI](#capitolo-2-modello-iso-osi)
3. [Capitolo 3 — Livello Fisico](#capitolo-3-livello-fisico)
4. [Capitolo 4 — Livello Data Link](#capitolo-4-livello-data-link)
5. [Capitolo 5 — Data Link LAN (Basic)](#capitolo-5-data-link-lan-basic)
6. [Capitolo 6 — Data Link LAN (Ethernet)](#capitolo-6-data-link-lan-ethernet)
7. [Capitolo 7 — Data Link WLAN (Wireless LAN)](#capitolo-7-data-link-wlan-wireless-lan)
8. [Capitolo 8 — Data Link LAN (Switching)](#capitolo-8-data-link-lan-switching)
9. [Capitolo 9 — Livello di Rete (Networking Basic)](#capitolo-9-livello-di-rete-networking-basic)
10. [Capitolo 10 — Livello di Rete (Routing)](#capitolo-10-livello-di-rete-algoritmi-e-protocolli-di-routing)
11. [Capitolo 11 — Livello di Trasporto](#capitolo-11-livello-di-trasporto-livello-4)
12. [Capitolo 12 — Livello Applicazione](#capitolo-12-livello-applicazione-e-strati-sessione-presentazione)

---



<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- SEZIONE: 01 - La Rete.md -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

# Capitolo 1 — La Rete

> **Corso di Reti di Calcolatori** — Appunti completi del Capitolo 1  
> *Autore:* Carmine Federico Di Zenzo

---

## 1. Introduzione ed Evoluzione delle Reti

La materia tradizionalmente denominata **Reti di Calcolatori** oggi trova una più corretta ed esaustiva collocazione concettuale nel paradigma dell'**IoT (Internet of Things — Internet delle Cose)**. 

Nel corso dell'evoluzione tecnologica, i sistemi informatici ed elettronici hanno manifestato una crescente necessità di interconnessione reciproca. Sulla rete non sono più collegati esclusivamente mainframe o personal computer, bensì una moltitudine eterogenea di apparati (sensori, elettrodomestici, attuatori, smartphone, server).

```
   ┌─────────────────────────────────────────────────────────────┐
   │            INTERNET OF THINGS (IoT) & NETWORK               │
   │  ┌───────────┐      ┌──────────────┐      ┌──────────────┐  │
   │  │  Sensori  │◄────►│  Smartphone  │◄────►│  Calcolatori │  │
   │  └─────┬─────┘      └──────┬───────┘      └──────┬───────┘  │
   │        │                   │                     │          │
   │        └───────────────────┼─────────────────────┘          │
   │                            ▼                                │
   │                PROTOCOLLI DI COMUNICAZIONE                  │
   └─────────────────────────────────────────────────────────────┘
```

### Concetto di Protocollo
Gli apparati eterogenei comunicano tra loro attraverso un insieme condiviso e prefissato di regole sintattiche e semantiche che prende il nome di **protocollo**:
* **Definizione:** Un protocollo stabilisce la sequenza, il formato, la tempistica e le azioni da intraprendere per lo scambio di messaggi e dati tra due o più entità comunicanti.
* **Importanza:** La violazione o l'incoerenza nell'adozione del protocollo rende la comunicazione notevolmente più difficoltosa, se non del tutto impossibile.

### Mezzo Fisico e Connettività
Fisicamente la rete è costituita da supporti eterogenei:
* Cavi in rame (doppini intrecciati, coassiali);
* Fibre ottiche;
* Onde radio e propagazione elettromagnetica nello spazio libero.

Fondamentalmente, una rete è definita dalle sue **connessioni**: collegamenti *punto-a-punto* o *multipunto* tra oggetti. Oggigiorno si preferisce ancora la fibra ottica rispetto ai segnali radio poiché la velocità e la capacità trasmissiva risultano nettamente superiori.

---

## 2. Definizione Generale e Proprietà Fondamentali di una Rete

Una rete di calcolatori si compone di due elementi inscindibili:
1. **Componente Hardware:** Apparati di interconnessione, schede di rete (NIC), cavi, router, switch e dispositivi di controllo della trasmissione.
2. **Componente Software:** Protocolli, software di comunicazione e driver di basso livello aventi lo scopo di:
   * Codificare e formattare i dati;
   * Rilevare e correggere gli errori di trasmissione;
   * Controllare la congestione del traffico;
   * Garantire la qualità del servizio (QoS).

### Obiettivi Primari della Rete
* Consentire l'**accesso alle informazioni** distribuite;
* Permettere la **condivisione delle risorse** sia fisiche (stampanti, dischi) che logiche (database, file, servizi);
* Facilitare e velocizzare la **comunicazione interpersonale e tra processi**.

### Requisiti Architetturali di una Buona Rete

| Requisito | Descrizione e Funzionalità |
|:---|:---|
| **Affidabilità** | Deve garantire che il messaggio arrivi integro a destinazione. Una rete affidabile rileva e corregge gli errori introdotti dal canale. |
| **Efficienza** | I dati inviati devono pervenire a destinazione entro tempi accettabili e con il minimo overhead di risorse. |
| **Scalabilità** | L'infrastruttura deve poter crescere armoniosamente all'aumentare del numero di nodi, utenti e volumi di traffico. |
| **Eterogeneità** | Apparati hardware, architetture e sistemi operativi differenti devono poter cooperare ed interagire in modo trasparente. |
| **Instradamento (Routing)** | Capacità di individuare $n$ possibili percorsi tra sorgente e destinazione, selezionando dinamicamente il percorso migliore e preservando l'ordine originario dei pacchetti. |

---

## 3. Rete Telematica e Modello a Grafo

Una **rete telematica** è un insieme di dispositivi informatici mutuamente collegati tra loro (*tutti a tutti*).

> **Definizione Formale di Rete di Telecomunicazione:**  
> È un sistema distribuito che permette la trasmissione affidabile di informazioni da un capo all'altro della struttura, consentendo un meccanismo di **indirizzamento universale**.

Le tre funzionalità cardine sono:
1. **Trasporto:** Spostamento fisico e logico dei bit sul canale;
2. **Indirizzamento:** Identificazione univoca di sorgente e destinazione;
3. **Commutazione:** Instradamento dinamico del flusso informativo attraverso nodi intermedi.

### Rappresentazione a Grafo
Formalmente, una rete di telecomunicazione viene modellata tramite un grafo a 3 componenti fondamentali:
* **Hosts (Stazioni / End System):** Dispositivi autonomi connessi alla periferia della rete (PC, server, terminali);
* **Links (Collegamenti trasmissivi):** Canali fisici tipicamente punto-a-punto che uniscono i nodi;
* **Nodi di Commutazione (Network Switch / Routers):** Dispositivi interni aventi il compito di riconoscere le richieste di apertura di connessione e instradare i dati verso il corretto nodo di destinazione.

![Rappresentazione formale di una rete di telecomunicazione come grafo: Host, Link e Nodi di Commutazione](images/reti/fig_p1_xref158_571x251.jpeg)

---

## 4. Architettura dei Dispositivi: DTE e DCE

Nel contesto della trasmissione dati su linea, si distinguono chiaramente due figure operative:

```
 ┌───────────────┐     ┌───────────────┐                  ┌───────────────┐     ┌───────────────┐
 │     DTE A     │────►│     DCE A     │══════════════════│     DCE B     │────►│     DTE B     │
 │ (Calcolatore) │     │ (Modem/Switch)│   Canale Fisico  │ (Modem/Switch)│     │ (Calcolatore) │
 └───────────────┘     └───────────────┘                  └───────────────┘     └───────────────┘
```

### DTE (Data Terminal Equipment)
* È il complesso costituito dal sistema elaborativo, dal terminale utente e dalle relative risorse applicative (file, database, interfacce I/O) che fungono da sorgente o destinatario finale dei dati.
* Può essere un supercalcolatore, un server, un PC o un qualsiasi nodo utente finale.
* Il DTE comunica con la rete collegandosi a uno o più dispositivi DCE.

### DCE (Data Circuit-Terminating Equipment)
* Dispositivo intermedio che provvede all'adattamento del segnale tra il DTE e la linea di trasmissione fisica.
* In ambito locale o Ethernet può essere rappresentato da uno switch, da un modem o da una scheda di interfaccia di rete (NIC).
* **Esempio:** Il calcolatore A con i suoi database e periferiche I/O costituisce il DTE A; esso si interfaccia al rispettivo DCE A per immettere il segnale sulla rete e farlo recapitare al DCE B del calcolatore DTE B.

![Schema di interconnessione tra DTE e DCE attraverso la linea di trasmissione](images/reti/fig_p1_xref159_488x143.jpeg)

---

## 5. Modalità e Configurazioni di Trasmissione

I circuiti fisici possono essere realizzati secondo differenti schemi geometrici e logici:

### 1. Collegamento Punto-a-Punto (Point-to-Point)
Collega in modo dedicato due soli DTE. Il segnale trasmesso da un capo arriva direttamente ed esclusivamente all'altro. Tipico nel collegamento diretto computer-computer o computer-terminale.

* **Vantaggi:**
  * *Semplicità di gestione:* Nessuna contesa, il dato è sempre destinato all'unico interlocutore presente;
  * *Tempi di attesa nulli:* Il canale è costantemente a disposizione esclusiva della coppia.
* **Svantaggi:**
  * *Costi elevati:* Cresce linearmente con la distanza e quadraticamente con il numero di nodi;
  * *Spreco di banda:* Per collegare $10.000$ terminali ad un mainframe centrale occorrerebbero $10.000$ linee dedicate;
  * *Delicatezza strutturale.*

### 2. Circuito Multipunto (Multi-drop / Shared)
Collega più di due DTE condividendo il medesimo canale fisico.
* **Vantaggi:** Elevata scalabilità e notevole risparmio economico nel cablaggio;
* **Svantaggi:** Richiede la gestione esplicita della **contesa del canale** per evitare collisioni quando più nodi trasmettono simultaneamente.

### 3. Reti Broadcast
Nelle reti broadcast un unico canale di comunicazione è condiviso da tutti gli elaboratori dell'infrastruttura.
* I dati viaggiano sotto forma di piccoli blocchi informativi detti **pacchetti**.
* Ogni pacchetto contiene i dati utili e l'**indirizzo del destinatario**.
* Tutti i nodi in ascolto ricevono il pacchetto: ciascun elaboratore esamina l'indirizzo di destinazione; se coincide col proprio lo acquisisce e lo elabora, altrimenti lo scarta.

#### Tipologie di recapito nelle Reti Broadcast:
1. **Unicast:** Il pacchetto è indirizzato ad una singola entità univoca.
2. **Multicast:** Il pacchetto è indirizzato ad un sottoinsieme specifico di host abilitati; solo i membri del gruppo processano il dato.
3. **Broadcast:** Il pacchetto è destinato a tutti gli elaboratori della rete mediante un apposito indirizzo universale (*broadcast address*).

> **Formato dell'Indirizzamento:**  
> Per distinguere la modalità di recapito, all'interno dell'header di ciascun pacchetto è presente un bit di controllo tipologico. Pertanto, se il campo indirizzo dispone complessivamente di $N$ bit, solo $N - 1$ bit sono riservati all'indirizzamento vero e proprio del nodo.

---

## 6. Direzione del Flusso Trasmissivo

La trasmissione lungo una linea di comunicazione può realizzarsi secondo tre modalità operative:

```
Simplex:       [ Trasmettitore ] ──────────────────────────► [ Ricevitore ]

Half-Duplex:   [ Stazione A ] ◄──────── Alternato ─────────► [ Stazione B ]

Full-Duplex:   [ Stazione A ] ◄══════ Contemporaneo ═══════► [ Stazione B ]
```

### Classificazione dei Flussi

1. **Trasmissione Simplex (Unidirezionale):**
   * I dati viaggiano esclusivamente in una direzione (es. segnale televisivo o radiofonico tradizionale).
   * Non è adatta alle reti dati perché non consente l'invio di segnali di controllo o riscontri (ACK) per verificare la corretta ricezione e richiedere la ritrasmissione.

2. **Trasmissione Half-Duplex (Bidirezionale Alternata):**
   * I dati possono viaggiare in entrambe le direzioni, ma **non contemporaneamente** (prima trasmette A mentre B ascolta, poi trasmette B mentre A ascolta).
   * Tipica dei terminali conversazionali a domanda-risposta (walkie-talkie, interrogazione a database).
   * Realizzabile fisicamente con un **doppino telefonico (circuito a 2 fili)**: 1 filo per il segnale dati e 1 filo per il ritorno elettrico / massa.

3. **Trasmissione Full-Duplex (Bidirezionale Simultanea):**
   * I dati possono fluire contemporaneamente in entrambe le direzioni senza interferenze.
   * Indispensabile nelle reti multipunto complesse: ad esempio un DTE Master può ricevere una richiesta da uno slave e contemporaneamente inviare dati ad un altro slave.
   * Richiede fisicamente un **doppio doppino telefonico (circuito a 4 fili)**: 2 fili dedicati alla trasmissione in un senso e 2 fili dedicati al senso opposto (ciascuno con rispettivo ritorno di massa).

### Tabella Comparativa dei Flussi Trasmissivi

| Modalità | Direzione | Simultaneità | Circuito Fisico | Applicazione Tipica |
|:---|:---:|:---:|:---|:---|
| **Simplex** | Monodirezionale ($A \to B$) | No | Singolo conduttore / 2 fili | Broadcast TV, radio FM |
| **Half-Duplex** | Bidirezionale ($A \leftrightarrow B$) | Alternata nel tempo | Circuito a 2 fili | Sistemi a turni, ricetrasmittenti |
| **Full-Duplex** | Bidirezionale ($A \rightleftarrows B$) | Simultanea | Circuito a 4 fili (o canali FDM) | Reti Ethernet moderne, telecomunicazioni |

---

## 7. Meccanismi di Trasmissione dei Dati: La Commutazione

La **commutazione** è l'operazione che stabilisce e gestisce il percorso che le informazioni devono seguire dalla sorgente alla destinazione attraverso una sequenza di commutatori intermedi (*switch* o *router*).

```
   COMMUTAZIONE DI CIRCUITO:
   [ Sorgente ] ════════════════════════════════════════════► [ Destinazione ]
                (Canale dedicato e riservato per tutta la sessione)

   COMMUTAZIONE DI PACCHETTO:
   [ Sorgente ] ───► [ Pkt 1 ] ──► (Nodo A) ──► (Nodo C) ──┐
                ───► [ Pkt 2 ] ──► (Nodo B) ──────────────┼──► [ Destinazione ]
                ───► [ Pkt 3 ] ──► (Nodo A) ──► (Nodo D) ──┘
```

### 1. Commutazione di Circuito (Circuit Switching)
* Prevede l'instaurazione preliminare di un canale fisico/logico interamente dedicato alla comunicazione tra i due capi.
* La connessione viene mantenuta riservata ed attiva per l'intera durata della sessione, anche nei momenti di silenzio (es. la rete telefonica tradizionale PSTN).
* Non è possibile inviare contemporaneamente più flussi distinti (ad esempio una chiamata vocale e un SMS sullo stesso canale senza multiplazione).
* **Vantaggi:** 
  * Estremamente affidabile;
  * Garanzia assoluta dell'ordine di arrivo dei dati;
  * Banda costante garantita (ottima per flussi continui ad alto volume).
* **Svantaggi:**
  * Scarsa scalabilità ed inefficienza nell'uso delle risorse: il canale resta occupato anche se non transitano dati.

### 2. Commutazione di Pacchetto (Packet Switching)
* Il messaggio originario viene frammentato in blocchi indipendenti di dimensioni contenute detti **pacchetti** o **datagram**.
* Ciascun pacchetto contiene metadati di controllo (indirizzo mittente, destinatario, numero di sequenza) e viaggia autonomamente lungo la rete attraverso percorsi potenzialmente diversi.
* Il nodo destinatario ricompone i frammenti riordinandoli e, mediante protocolli di trasporto affidabili come il **TCP**, richiede la ritrasmissione degli eventuali pacchetti persi o corrotti.
* **Caratteristiche di affidabilità:** Il livello di rete sottostante è di per sé *unreliable* (non garantisce l'ordine né la consegna), ma l'architettura complessiva risulta straordinariamente robusta e scalabile grazie al **multiplexing statistico**.
* **Efficienza:** Ottimale per flussi di dati a raffica (*bursty traffic*) e pacchetti di piccole/medie dimensioni. Presenta invece complessità di scaling se applicata rigidamente a flussi continui nell'ordine di svariati Petabyte senza adeguate infrastrutture ottiche sottostanti.

### Confronto tra Commutazione di Circuito e di Pacchetto

| Parametro | Commutazione di Circuito | Commutazione di Pacchetto |
|:---|:---|:---|
| **Canale Dedicato** | Sì, riservato per tutta la sessione | No, condiviso dinamicamente |
| **Instradamento** | Fissato all'avvio (Call Setup) | Dinamico pacchetto per pacchetto |
| **Ordine di Consegna** | Sempre garantito | Non garantito alla nascita (richiede riordino) |
| **Efficienza del Mezzo** | Bassa (spreco nei periodi di inattività) | Massima (multiplexing statistico) |
| **Scalabilità** | Limitata | Elevatissima |
| **Impiego Tipico** | Telefonia classica, circuiti dedicati | Rete Internet, reti locali e geografiche |

---

## 8. DSE (Data Switching Equipment) e Nodi di Commutazione

Un **DSE (Data Switching Equipment)** è un nodo intermedio della rete (switch di dorsale o router) la cui funzione primaria consiste nel commutare e smistare il traffico dati tra due o più DTE non direttamente adiacenti.

* **Cross-Connection:** Tecnica ad elevata capacità che permette l'interconnessione e lo smistamento tra differenti interfacce ad alta velocità nelle dorsali geografiche nazionali ed internazionali.
* **Scelta del Percorso e Ridondanza:** Il DSE sceglie dinamicamente la rotta ottimale. Se il percorso diretto tra un nodo e l'altro è interrotto o degradato, il DSE instrada il traffico lungo percorsi alternativi ridondanti.
* **Controllo della Congestione:** La decisione del cammino avviene anche monitorando costantemente lo stato di carico e saturazione delle linee collegate.

![Instradamento e commutazione ridondante del traffico tramite DSE](images/reti/fig_p1_xref164_464x323.jpeg)

---

## 9. Topologie di Rete

La **topologia di rete** definisce la disposizione geometrica e le modalità di connessione logica e fisica dei nodi che compongono il grafo di comunicazione. L'obiettivo consiste nel minimizzare i costi di cablaggio massimizzando al contempo l'affidabilità, la tolleranza ai guasti e le prestazioni.

### 1. Topologia Gerarchica (ad Albero)
I nodi sono organizzati a livelli: il traffico fluisce dai nodi foglia periferici verso i nodi intermedi fino a raggiungere il nodo radice (vertice dell'albero), che risulta essere il più potente della struttura.

* **Inconvenienti:**
  * *Collo di bottiglia:* Il nodo principale radice può saturarsi rallentando i servizi per l'intera rete;
  * *Single Point of Failure (SPOF):* Il guasto della radice isola i sottoalberi. Si rimedia adottando politiche di *backup* e ridondanza dei nodi di livello superiore.

![Topologia di rete ad albero o gerarchica](images/reti/fig_p1_xref165_343x284.png)

---

### 2. Topologia a Stella (Star Topology)
Tutti i nodi periferici sono connessi direttamente ad un unico nodo centrale (hub o switch).

* **Caratteristiche:**
  * Connessione di $n$ nodi mediante esattamente $n - 1$ collegamenti;
  * Controllo e monitoraggio del traffico interamente centralizzato;
  * Se il nodo centrale si guasta, l'intera rete si arresta (SPOF);
  * Molto economica e semplice da implementare su scale contenute, ma limitata nell'espansione a grandi volumi.

![Topologia di rete a stella](images/reti/fig_p1_xref167_289x271.png)

---

### 3. Topologia a Dorsale (Bus Condiviso)
Configurazione storica adottata dalle prime reti locali Ethernet. Un unico cavo lineare dorsale (bus) connette tutti i nodi.

* **Funzionamento:** La trasmissione effettuata da una stazione si propaga su tutto il portante e viene ricevuta da tutte le altre.
* **Arbitraggio:** Poiché più stazioni potrebbero voler trasmettere contemporaneamente sul canale condiviso, è indispensabile un meccanismo di arbitraggio (centralizzato o distribuito, come il CSMA/CD) oppure una multiplazione temporale.
* **Vantaggi:** Semplicità architetturale e basso costo di cablaggio.
* **Inconvenienti:**
  * Degrado delle prestazioni all'aumentare delle stazioni collegate;
  * L'interruzione fisica del cavo dorsale disattiva l'intero segmento di rete;
  * Difficoltà nella localizzazione dei punti di guasto per assenza di centri di concentrazione.

![Topologia a dorsale o bus condiviso](images/reti/fig_p1_xref168_348x185.jpeg)

---

### 4. Topologia ad Anello (Ring Topology)
I nodi sono collegati a catena chiusa in un circuito unidirezionale in cui ciascuna stazione riceve dal nodo precedente e ritrasmette al successivo.

* **Caratteristiche:**
  * Il percorso chiuso consente a qualsiasi nodo di comunicare con qualsiasi altro;
  * Elevata tolleranza ai guasti con l'impiego di doppi anelli controrotanti (es. token ring, FDDI in fibra ottica);
  * Non è scalabile su aree geografiche immense perché la lunghezza dei percorsi e la latenza aumenterebbero eccessivamente;
  * Richiede un meccanismo di arbitraggio per l'accesso (es. passaggio del *token*).

![Topologia ad anello (ring)](images/reti/fig_p1_xref169_222x201.png)

---

### 5. Topologia a Maglia (Mesh Topology)
Collega i nodi attraverso percorsi multipli e ridondanti (completamente magliata o parzialmente magliata).
* **Vantaggi:** Prestazioni eccellenti grazie alla ripartizione del carico e massima affidabilità/resilienza ai guasti.
* **Svantaggi:** Complessità elevatissima di gestione e costi di cablaggio considerevoli.

### Struttura Reale di Internet: Preferential Attachment
Nella realtà, la topologia globale di Internet unisce ordine e dinamismo seguendo il principio del **"Preferential Attachment"** (*il ricco diventa sempre più ricco*):
* Si formano dei grandi cluster concentrati attorno a potenti **hub centrali** (i grandi Internet Exchange Point, dorsali Tier-1 e Content Delivery Network);
* L'infrastruttura globale è sostenuta da pochissimi nodi con una vastissima quantità di connessioni e una moltitudine di nodi periferici aventi pochissimi collegamenti (tipicamente una singola connessione verso il proprio ISP).

---

## 10. Protocolli e Standard di Telecomunicazione

Un **protocollo** è l'insieme formale di regole, convenzioni e tecniche che governano il formato e lo scambio dei messaggi tra apparati.

### Livelli di Protocollo
1. **Protocollo di Instradamento (Routing):** Opera a livello di rete e calcola il percorso ottimale per unire la stazione sorgente a quella di destinazione.
2. **Protocollo di Linea (Box-to-Box):** Gestisce il singolo collegamento fisico punto-a-punto tra due nodi direttamente connessi. Viene invocato tante volte quante sono le singole tratte che compongono il cammino.
3. **Protocollo di Trasporto (End-to-End):** Opera esclusivamente tra i due nodi terminali (sorgente e destinatario), effettuando il controllo di correttezza, flusso e riscontro senza coinvolgere i nodi intermedi.

```
 [ SORGENTE ] ═══════════════════════════════════════════════════► [ DESTINAZIONE ]
     │               (Protocollo di Trasporto: End-to-End)                │
     ▼                                                                    ▼
 [ DTE/Host ] ──(Protocollo di Linea)──► [ DSE 1 ] ──(Linea)──► [ DSE 2 ] ──► [ DTE/Host ]
```

### Classificazione degli Standard

* **Standard Proprietari:** Specificati da singoli produttori. Gli apparati possono dialogare solo con dispositivi dello stesso costruttore. Tendono a scomparire per favorire l'interoperabilità globale.
* **Standard di Diritto (*de jure*):** Emanati da enti ufficiali di standardizzazione internazionali (ISO, ITU-T/CCITT, IEEE, ANSI). Definiscono regole rigide e formali sia a livello hardware che architetturale (es. Modello ISO/OSI).
* **Standard di Fatto (*de facto*):** Protocolli nati dalla prassi tecnica e dal largo successo implementativo nei sistemi operativi e nel software (es. architettura TCP/IP).

---

## 11. Classificazione delle Reti per Copertura Geografica

Le reti assumono denominazioni e caratteristiche differenti in relazione alla scala dimensionale del raggio operativo:

### Tabella delle Tipologie di Rete

| Ambito | Distanza Tipica | Tipologia di Rete | Esempi e Tecnologie |
|:---|:---:|:---|:---|
| **Circuito Stampato** | $0.1\text{ m}$ | Massive Parallel | Interconnessione CPU/Bus su PCB |
| **Sistema** | $1\text{ m}$ | Multi Processor | Architetture multiprocessore |
| **Stanza** | $10\text{ m}$ | Cluster / PAN | Personal Area Network (Bluetooth, USB wireless) |
| **Edificio** | $100\text{ m}$ | Rete Locale (**LAN**) | Local Area Network (Ethernet, Wi-Fi aziendale) |
| **Comprensorio / Campus** | $1\text{ km}$ | Rete Locale Estesa (**CAN**) | Campus Area Network (università, stabilimenti) |
| **Città** | $10\text{ km}$ | Rete Metropolitana (**MAN**) | Metropolitan Area Network (anelli ottici urbani) |
| **Nazione** | $100\text{ km}$ | Rete Geografica (**WAN**) | Wide Area Network (dorsali nazionali) |
| **Continente** | $1.000\text{ km}$ | Rete Geografica (**WAN**) | Backbones continentali |
| **Pianeta** | $10.000\text{ km}$ | Rete Geografica Globale | Dorsali oceaniche, Rete Internet mondiale |

### Caratteristiche delle Principali Reti
* **PAN (Personal Area Network):** Spazio fisico alla portata di una persona ($1 - 10\text{ m}$). Esempi: Bluetooth, periferiche wireless (mouse, cuffie).
* **LAN (Local Area Network):** Rete privata confinata all'interno di un edificio o gruppo di edifici vicini (uffici, abitazioni, fabbriche). Una LAN aziendale è detta *enterprise network*. Velocità tipiche: da $10\text{ Mbps}$ a $10\text{ Gbps}$ su tecnologie a basso costo (doppini, switch).
* **MAN (Metropolitan Area Network):** Copre un'intera area cittadina ($10 - 50\text{ km}$). Spesso implementata su anelli in fibra ottica ad alta velocità (da $10$ a $100\text{ Gbps}$).
* **WAN (Wide Area Network):** Copre territori estesi (nazioni, continenti o l'intero pianeta). Connette tra loro molteplici LAN e MAN attraverso topologie a maglia gestite da operatori di telecomunicazione (Telco).

---

## 12. Servizi di Connettività: Connection-Oriented vs Connectionless

Sopra lo strato fisico e di commutazione, la rete eroga servizi di connettività secondo due filosofie distinte:

### 1. Servizio Connection-Oriented (Orientato alla Connessione)
* I due DTE verificano preventivamente la reciproca presenza e disponibilità stabilendo un canale logico prima di scambiare dati (*Handshake*).
* La connessione rimane attiva per tutto il tempo della sessione e viene terminata esplicitamente alla fine.
* **Garanzie:** Consegna certa, preservazione dell'ordine, eliminazione dei pacchetti duplicati, controllo di flusso (governo della velocità del trasmettitore rispetto al ricevitore) e controllo degli errori con ritrasmissione.
* Indispensabile su tratte lunghe e reti intrinsecamente rumorose (WAN).

### 2. Servizio Connectionless (Senza Connessione)
* I pacchetti vengono immessi direttamente sulla rete senza alcuna procedura preliminare di instaurazione del collegamento.
* Estremamente rapido, leggero ed efficiente; tipico delle reti locali (LAN).
* **Limiti:** Non governa il ritmo tra trasmettitore e ricevitore (nessun controllo di flusso intrinseco) e non effettua controlli d'errore end-to-end a livello di linea. Il recupero di eventuali errori viene demandato direttamente alle applicazioni o ai protocolli di livello superiore (es. TCP sopra IP).

### Confronto tra i Servizi di Connettività

| Caratteristica | Connection-Oriented | Connectionless |
|:---|:---|:---|
| **Fase di Setup** | Obbligatoria (Apertura $\to$ Trasferimento $\to$ Chiusura) | Assente (Invio immediato) |
| **Controllo di Flusso** | Integrato | Assente (a carico dei livelli superiori) |
| **Controllo degli Errori** | Rigoroso con riscontri (ACK) e ritrasmissioni | Minimo o assente a livello di rete |
| **Overhead di Protocollo** | Elevato | Bassissimo (molto leggero) |
| **Ambito Ideale** | Reti WAN, trasferimenti affidabili | Reti LAN, traffico a pacchetti rapidi |

---

## 13. Interconnessione di Reti (Internetwork)

Una **internetwork** si genera collegando tra loro reti disomogenee e progettualmente distinte (LAN, MAN, WAN).

```
   ┌──────────────┐                               ┌──────────────┐
   │   LAN A      │────┐                     ┌────│   LAN B      │
   │ (Ethernet)   │    │                     │    │ (Token Ring) │
   └──────────────┘    ▼                     ▼    └──────────────┘
                    ┌───────────────────────────┐
                    │    GATEWAY / ROUTER       │
                    │ (Traduzione dei Formati)  │
                    └───────────────────────────┘
                                 ▲
                                 │
                          ┌──────────────┐
                          │   WAN (IP)   │
                          └──────────────┘
```

Per rendere compatibili architetture differenti si utilizzano speciali dispositivi detti **Gateway** (o *router multiprotocollo*), che instradano i pacchetti effettuando le necessarie conversioni di formato, indirizzamento e incapsulamento.

### Chiarimento Terminologico Fondamentale
* **Sottorete (Subnet):** Sottoinsieme logico o fisico facente parte di una rete più estesa;
* **Rete (Network):** L'insieme organico costituito da una subnet e da tutti gli host collegati;
* **Internetwork / internet (con 'i' minuscola):** Qualsiasi collezione generica di reti eterogenee interconnesse tramite gateway;
* **Internet (con 'I' maiuscola):** La specifica rete geografica mondiale, pubblica e globale, basata sulla suite di protocolli **TCP/IP**.

---


<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- SEZIONE: 02 - Modello ISO-OSI.md -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

# Capitolo 2 — Modello ISO/OSI

> **Corso di Reti di Calcolatori** — Appunti completi del Capitolo 2  
> *Autore:* Carmine Federico Di Zenzo

---

## 1. Architettura a Strati e Modello ISO/OSI

La progettazione di una moderna architettura di rete si basa sul principio della **modularità** e della **stratificazione gerarchica**: il problema complessivo della comunicazione viene suddiviso in una pila di livelli (*layer*), partendo dal livello più basso a contatto con i mezzi trasmissivi fisici fino ad arrivare ai livelli superiori vicini all'utente e alle applicazioni.

```
   ┌─────────────────────────────────────────────────────────────┐
   │                    MODELLO A PILA (STACK)                   │
   │  Livello N+1  ▲  (Offre servizi di livello più astratto)    │
   │               │                                             │
   │  Livello N    │  (Utilizza i servizi del livello N-1 e      │
   │               │   fornisce funzionalità al livello N+1)     │
   │  Livello N-1  ▼  (Opera a un livello di dettaglio maggiore) │
   └─────────────────────────────────────────────────────────────┘
```

### Principi Fondamentali del Modello
* **Astrazione:** Ogni livello vede la rete a un determinato grado di astrazione, usufruendo dei servizi forniti dai livelli inferiori senza doverne conoscere i dettagli implementativi interni.
* **Standard *de jure*:** Il modello **OSI (Open Systems Interconnection)** è stato formalizzato e approvato dall'**ISO (International Organization for Standardization)** come standard ufficiale per garantire l'interoperabilità tra sistemi aperti ed eterogenei.
* **Completezza:** Ogni singolo *host* (calcolatore o apparato terminale) connesso alla rete implementa l'intera pila dei protocolli.

---

## 2. Suddivisione dei Livelli: Data Flow e Processo

Nel modello di riferimento ISO/OSI a **7 livelli**, l'architettura viene ripartita in due macro-sottoinsiemi funzionali:

```
   ┌──────────────────────────┬─────────────────────────────────┐
   │  LIVIELLI DI PROCESSO    │  7. Applicazione                │
   │  (Orientati all'Utente)  │  6. Presentazione               │
   │                          │  5. Sessione                    │
   ├──────────────────────────┼─────────────────────────────────┤
   │  LIVIELLO INTERMEDIO     │  4. Trasporto (End-to-End)      │
   ├──────────────────────────┼─────────────────────────────────┤
   │  LIVELLI DATA FLOW       │  3. Rete                        │
   │  (Infrastrutturali)      │  2. Data Link                   │
   │                          │  1. Fisico                      │
   └──────────────────────────┴─────────────────────────────────┘
```

1. **Livelli Data Flow (Livelli 1, 2, 3):**
   * Sono i livelli inferiori della pila.
   * Si occupano delle funzionalità infrastrutturali e del transito effettivo dei bit e dei pacchetti attraverso il canale di trasmissione e i nodi intermedi della rete.
2. **Livelli di Processo (Livelli 5, 6, 7):**
   * Sono i livelli superiori della pila.
   * Forniscono funzionalità e servizi direttamente utilizzabili dall'utente finale e dai processi applicativi.
3. **Livello di Trasporto (Livello 4):**
   * Funge da cerniera e anello di congiunzione tra i livelli Data Flow e i livelli di Processo, garantendo un canale logico affidabile *end-to-end*.

---

## 3. Analisi Dettagliata dei 7 Livelli ISO/OSI

![Pila dei 7 livelli del modello architetturale ISO/OSI](images/reti/fig_p1_xref174_410x279.jpeg)

### Livello 1: Livello Fisico (Physical Layer)
* **Oggetto:** Trasmissione grezza di singoli bit attraverso un mezzo fisico di comunicazione (cavo elettrico in rame, fibra ottica, onde elettromagnetiche).
* **Specifiche:**
  * Definisce i parametri elettrici (livelli di tensione per '0' e '1', durata temporale del bit);
  * Definisce le procedure meccaniche, ottiche e funzionali per attivare, mantenere e disattivare il collegamento fisico;
  * Stabilisce le modalità di interfaccia trasmissiva (*simplex*, *half-duplex*, *full-duplex*).
* **Particolarità:** È l'**unico livello che opera direttamente sull'hardware** e sulle grandezze fisiche del segnale.

---

### Livello 2: Livello Data Link (Data Link Layer)
* **Oggetto:** Organizza la sequenza di bit grezzi proveniente dal livello fisico in strutture logiche ben definite chiamate **frame (trame)**.
* **Funzionalità:**
  * Rende la linea fisica immune da errori non rilevati, trasformando un canale grezzo in una linea affidabile;
  * Gestisce il controllo d'errore (tramite checksum/CRC) e richiede l'invio di segnali di riscontro (*frame di acknowledgment* o **ACK**);
  * Esegue la ritrasmissione in caso di frame corrotti o andati perduti;
  * Regola il controllo di flusso locale tra due nodi adiacenti;
  * Nelle reti a canale condiviso (reti *broadcast*), gestisce l'accesso al mezzo (sottolivello MAC) risolvendo i conflitti e la contesa.

---

### Livello 3: Livello di Rete (Network Layer)
* **Oggetto:** Rende i livelli superiori del tutto indipendenti dalle tecnologie e dai mezzi fisici utilizzati per la trasmissione.
* **Funzionalità:**
  * **Routing (Instradamento):** Determina il cammino ottimale che i pacchetti devono percorrere attraverso i router della sottorete per raggiungere la destinazione finale;
  * **Traduzione e Adattamento:** Gestisce l'interconnessione tra reti disomogenee traducendo indirizzi e frammentando pacchetti qualora le dimensioni massime ammesse differiscano;
  * **Controllo della Congestione:** Monitora e previene colli di bottiglia sui nodi intermedi.
* **Nota:** Nelle reti puramente broadcast il problema del routing è banale, pertanto il livello di rete risulta notevolmente semplificato o assente.

---

### Livello 4: Livello di Trasporto (Transport Layer)
* **Oggetto:** Eroga una comunicazione logica **end-to-end** (da processo sorgente a processo destinatario), operando esclusivamente sugli host terminali e non sui nodi intermedi.
* **Funzionalità:**
  * Frammenta i dati provenienti dal livello superiore e garantisce che giungano a destinazione privi di errori, ordinati e senza duplicati;
  * Apre, mantiene e chiude in modo controllato la connessione di trasporto;
  * Implementa meccanismi robusti di controllo di flusso e controllo della congestione a livello globale.

---

### Livello 5: Livello di Sessione (Session Layer)
* **Oggetto:** Consente a utenti e processi residenti su elaboratori differenti di instaurare, gestire e chiudere una **sessione di dialogo**.
* **Funzionalità:**
  * **Controllo del dialogo:** Stabilisce chi ha il turno di trasmettere e chi deve ricevere (gestione half-duplex/full-duplex logica);
  * **Gestione dei Token:** Impedisce che le due parti tentino simultaneamente un'operazione critica non concorrente;
  * **Sincronizzazione e Checkpoint:** Inserisce punti di controllo nel flusso di dati per consentire la ripresa del trasferimento dal punto esatto in cui è avvenuto un crash o un'interruzione di rete, evitando di ricominciare da capo.

---

### Livello 6: Livello di Presentazione (Presentation Layer)
* **Oggetto:** Si occupa della sintassi e della semantica delle informazioni scambiate, consentendo l'interoperabilità tra sistemi che utilizzano rappresentazioni interne dei dati differenti.
* **Funzionalità:**
  * Converte i dati da formati dipendenti dall'architettura locale a formati astratti standardizzati per la trasmissione in rete, e viceversa sulla macchina ricevente;
  * Gestisce la **compressione dei dati** per ottimizzare l'occupazione di banda;
  * Esegue la **cifratura e decifratura** dei dati per garantire la sicurezza e la riservatezza delle comunicazioni.

---

### Livello 7: Livello di Applicazione (Application Layer)
* **Oggetto:** È lo strato più vicino all'utente finale e alle applicazioni software; definisce le regole con cui i programmi si interfacciano ai servizi di rete.
* **Funzionalità e Protocolli:**
  * Fornisce protocolli standard per servizi specifici distribuiti;
  * Esempi tipici: navigazione web (**HTTP/HTTPS**), posta elettronica (**SMTP**, **IMAP**, **POP3**), risoluzione dei nomi a dominio (**DNS**), trasferimento file (**FTP**).

---

### Tabella di Riepilogo dei 7 Livelli ISO/OSI

| # | Livello | Unità Dati (PDU) | Funzione Primaria | Ambito |
|:---:|:---|:---|:---|:---|
| **7** | **Applicazione** | Dati / Messaggio | Interfaccia diretta utente-rete (HTTP, DNS, SMTP) | Processo |
| **6** | **Presentazione** | Dati | Traduzione formati, compressione, cifratura | Processo |
| **5** | **Sessione** | Dati | Gestione del dialogo, token e checkpoint di ripristino | Processo |
| **4** | **Trasporto** | Segmento | Connessione affidabile end-to-end, controllo errori | Intermedio |
| **3** | **Rete** | Pacchetto / Datagram | Routing tra nodi, indirizzamento logico universale | Data Flow |
| **2** | **Data Link** | Frame (Trama) | Rilevazione errori su singolo link, framing, MAC | Data Flow |
| **1** | **Fisico** | Bit | Trasmissione segnali grezzi sul mezzo (elettrico/ottico) | Data Flow (HW) |

---

## 4. Meccanismo di Incapsulamento e Deincapsulamento

Il modello ISO/OSI struttura le trasmissioni in maniera rigorosamente modulare:

```
  TRASMETTITORE (Incapsulamento)                     RICEVITORE (Deincapsulamento)
  ┌────────────────────────────┐                     ┌────────────────────────────┐
  │ 7. Applicazione  [ Dati ]  │                     │ 7. Applicazione  [ Dati ]  │
  └──────────────┬─────────────┘                     └─────────────▲──────────────┘
                 ▼                                                 │
  ┌────────────────────────────┐                     ┌─────────────┴──────────────┐
  │ 4. Trasporto  [H4| Dati ]  │                     │ 4. Trasporto  [H4| Dati ]  │
  └──────────────┬─────────────┘                     └─────────────▲──────────────┘
                 ▼                                                 │
  ┌────────────────────────────┐                     ┌─────────────┴──────────────┐
  │ 3. Rete    [H3|H4| Dati ]  │                     │ 3. Rete    [H3|H4| Dati ]  │
  └──────────────┬─────────────┘                     └─────────────▲──────────────┘
                 ▼                                                 │
  ┌────────────────────────────┐                     ┌─────────────┴──────────────┐
  │ 2. DataLink[H2|H3|H4|Dati|T2│                     │ 2. DataLink[H2|H3|H4|Dati|T2│
  └──────────────┬─────────────┘                     └─────────────▲──────────────┘
                 ▼                                                 │
  ┌────────────────────────────┐                     ┌─────────────┴──────────────┐
  │ 1. Fisico   0110100101...  │════════════════════►│ 1. Fisico   0110100101...  │
  └────────────────────────────┘    Canale Fisico    └────────────────────────────┘
```

1. **Incapsulamento (Flusso Discendente nel Trasmettitore):**
   * Il messaggio generato dall'applicazione scende lungo la pila;
   * Ogni livello aggiunge ai dati ricevuti dal livello superiore un'intestazione propria (**Header**) e, nel caso del Data Link, una coda di controllo (**Trailer**);
   * L'insieme diventa il payload del livello immediatamente inferiore.
2. **Deincapsulamento (Flusso Ascendente nel Ricevitore):**
   * I bit ricevuti dal livello fisico vengono passati al Data Link;
   * Ciascun livello esamina e rimuove il proprio header di controllo, elabora le informazioni pertinenti e inoltra il dato pulito (*payload*) al livello superiore fino a ricostruire il messaggio originale per l'applicazione.

---

## 5. Il Modello TCP/IP (ARPANET) e Confronto con ISO/OSI

Nella pratica industriale e su scala globale, il modello di riferimento effettivo è l'architettura **TCP/IP** (originata dal progetto ARPANET).

![Confronto tra il modello ISO/OSI e lo stack TCP/IP](images/reti/fig_p1_xref176_364x312.jpeg)

### Struttura e Caratteristiche di TCP/IP
* I livelli infrastrutturali di **Data Flow** (Fisico e Data Link, spesso raggruppati in *Host-to-Network* o *Accesso alla Rete*) e il livello di **Rete (Internet / IP)** rimangono concettualmente identici.
* Gli ultimi tre livelli del modello OSI (Sessione, Presentazione e Applicazione) vengono **compattati e fusi in un unico livello Applicativo**.
* L'architettura TCP/IP elimina le sovrastrutture teoriche ritenute ridondanti o poco utilizzate nella maggioranza delle comunicazioni pratiche.

### Cause del Successo di TCP/IP su ISO/OSI
I vantaggi determinanti dell'architettura TCP/IP rispetto al modello OSI sono riconducibili a due ragioni storiche e tecniche:
1. **Semplicità di Implementazione:** Lo stack TCP/IP è enormemente più agile, lineare e leggero rispetto alla pesantezza burocratica e complessità dell'architettura OSI a 7 livelli.
2. **Tempestività Storica e Diffusione:** Quando l'organismo ISO terminò la standardizzazione formale del modello OSI, la suite TCP/IP era già ampiamente implementata, testata e consolidata nel mondo accademico e nei sistemi operativi Unix/BSD, rendendo irrinunciabile la sua adozione globale.

### Tabella di Corrispondenza: ISO/OSI vs TCP/IP

| Modello ISO/OSI (7 Livelli) | Modello TCP/IP (4/5 Livelli) | Protocolli di Riferimento |
|:---|:---|:---|
| **7. Applicazione** | \multirow{3}{*}{**Applicazione**} | HTTP, HTTPS, DNS, SMTP, SSH, FTP |
| **6. Presentazione** | | *(Funzionalità integrate nelle app)* |
| **5. Sessione** | | *(Funzionalità gestite dal software)* |
| **4. Trasporto** | **Trasporto** | TCP (orientato alla connessione), UDP (connectionless) |
| **3. Rete** | **Internet (Network)** | IP (IPv4, IPv6), ICMP, ARP |
| **2. Data Link** | **Data Link (Accesso alla Rete)** | Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11) |
| **1. Fisico** | **Fisico** | Cavi rame, Fibra ottica, Trasmissione Radio |

---


<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- SEZIONE: 03 - Livello Fisico.md -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

# Capitolo 3 — Livello Fisico

> **Corso di Reti di Calcolatori** — Appunti completi del Capitolo 3  
> *Autore:* Carmine Federico Di Zenzo

---

## 1. Natura dei Segnali nelle Telecomunicazioni

Nelle telecomunicazioni, un **segnale** è definito come la variazione nel tempo di una grandezza fisica (tensione elettrica, intensità di corrente, campo elettromagnetico, intensità luminosa, pressione acustica) utilizzata per trasportare e trasmettere informazione da una sorgente ad una o più destinazioni.

```
   ┌─────────────────────────────────────────────────────────────┐
   │                     TIPOLOGIE DI SEGNALI                    │
   │                                                             │
   │   Segnali Analogici (Continui):                             │
   │      Valori continui in [V_min, V_max]                      │
   │                                                             │
   │   Segnali Digitali (Discreti):                              │
   │      Valori discreti/quantizzati (Bit '0' e '1')            │
   └─────────────────────────────────────────────────────────────┘
```

### Classificazione Fondamentale dei Segnali Elettrici
1. **Segnali Analogici (Naturali):** Segnali che possono assumere con continuità qualsiasi valore all'interno di un intervallo continuo compreso tra un minimo ed un massimo prefissato $[V_{\min}, V_{\max}]$ consentito dal canale.
2. **Segnali Digitali (Artificiali):** Segnali che assumono solo un numero discreto e finito di livelli di ampiezza, tipicamente impiegati per rappresentare informazioni binarie (*bit*) generate dai calcolatori.

### Variazione Temporale
* **Segnali Periodici:** Il loro andamento temporale si ripete identico ad intervalli costanti di tempo. Il tempo impiegato per compiere un'oscillazione completa è detto **periodo** ($T$).
* **Segnali Aperiodici:** Variano nel tempo in modo non ripetitivo, senza una regolarità ciclica predefinita.

---

## 2. Grandezze Fondamentali del Segnale Sinusoidale

Il segnale periodico per eccellenza impiegato come riferimento nelle telecomunicazioni è l'**onda sinusoidale**:

$$s(t) = A \cdot \sin(2\pi f t + \phi)$$

```
        Ampiezza A
            ▲            _--_                  _--_
            │          /      \              /      \
            │─────────/────────\────────────/────────\────────► Tempo (t)
            │        │          \          /          │
            │        │           '--____--'           │
            ▼        │◄────────── Periodo T ─────────►│
```

### Parametri del Segnale Sinusoidale

| Grandezza | Simbolo | Formula / Unità | Descrizione |
|:---|:---:|:---:|:---|
| **Ampiezza** | $A$ | $\text{Volt } [V]$ | Valore massimo istantaneo dell'intensità del segnale rispetto allo zero. |
| **Periodo** | $T$ | $\text{secondi } [s]$ | Tempo necessario affinché il segnale compia un ciclo completo: $$T = \frac{1}{f}$$ |
| **Frequenza** | $f$ | $\text{Hertz } [Hz]$ | Numero di cicli completati in un secondo: $$f = \frac{1}{T}$$ Indica la velocità di variazione temporale. |
| **Fase** | $\phi$ | $\text{radianti } [rad] \text{ o gradi } [^\circ]$ | Posizione angolare dell'onda all'istante iniziale $t = 0$. |
| **Velocità di Propagazione** | $c$ | $\text{m/s}$ | Velocità con cui l'onda si propaga nel mezzo specifico (nel vuoto $c \approx 3 \times 10^8\text{ m/s}$). |
| **Lunghezza d'Onda** | $\lambda$ | $\text{metri } [m]$ | Distanza spaziale tra due creste consecutive dell'onda: $$\lambda = c \cdot T = \frac{c}{f}$$ |

### Segnali Digitali e Livelli
Nei segnali digitali, i valori discreti vengono generati variando bruscamente la grandezza fisica tra livelli prefissati. Se il segnale dispone di $L$ livelli discreti ammissibili, il numero di bit rappresentabili per singolo livello (*simbolo*) è pari a:

$$n = \log_2 L$$

---

## 3. Trasmissione e Fenomeni di Deterioramento del Segnale

Durante la propagazione lungo un mezzo trasmissivo, il segnale subisce alterazioni fisiche dovute alla dissipazione di energia e alle caratteristiche del canale:

```
  Segnale Trasmesso ──► [ MEZZO TRASMISSIVO ] ──► Segnale Ricevuto
                           ├── Attenuazione (Perdita di potenza)
                           ├── Distorsione (Alterazione di forma)
                           └── Rumore (Segnali spuri sovrapposti)
```

1. **Attenuazione:** Riduzione progressiva dell'ampiezza e della potenza del segnale all'aumentare della distanza percorsa. Dipende dalla natura del mezzo e cresce tipicamente all'aumentare della frequenza.
2. **Distorsione:** Alterazione della forma originaria dell'onda. Si verifica perché le diverse armoniche sinusoidali che compongono il segnale viaggiano a velocità di propagazione differenti lungo il mezzo (*distorsione di fase* o *dispersione*).
3. **Rumore:** Segnali elettromagnetici o termici indesiderati che si sommano al segnale utile.

---

## 4. Analisi Armonica di Fourier e Banda di Frequenza

La **Teoria di Fourier** stabilisce che qualsiasi segnale periodico continuo o numerico può essere espresso come la somma di una componente continua e di infinite funzioni sinusoidali (armoniche) aventi frequenza multipla intera della frequenza fondamentale:

$$s(t) = c + \sum_{n=1}^{\infty} A_n \sin(2\pi n f_0 t + \phi_n)$$

La frequenza fondamentale $f_0$ per un segnale numerico binario di durata di bit $T_{\text{bit}}$ è legata al periodo base $T = 2 T_{\text{bit}}$:

$$f_0 = \frac{1}{T} = \frac{1}{2 T_{\text{bit}}}$$

### Spettro e Densità Energetica
* **Spettro del Segnale:** Rappresenta l'insieme di tutte le frequenze che compongono il segnale e le relative ampiezze.
* I quadrati delle ampiezze $A_n^2$ sono direttamente proporzionali all'**energia trasmessa** alla frequenza $n f_0$.
* **Banda di Frequenza (Larghezza di Banda del Segnale):** È l'intervallo $[f_{\min}, f_{\max}]$ che racchiude la quasi totalità dell'energia utile del segnale.
* **Segnali Aleatori:** Nei flussi di dati reali (non periodici), lo spettro è continuo con larghezza di banda teoricamente infinita.

> **Banda Passante del Canale ($B$):**  
> È il range di frequenze che il canale fisico trasmette senza attenuarle eccessivamente. Affinché il segnale sia ricostruibile a destinazione senza distorsioni inaccettabili, la banda passante del mezzo deve essere uguale o superiore alla banda del segnale.

---

## 5. Campionamento, Quantizzazione e Teorema di Nyquist-Shannon

Per convertire un segnale analogico continuo in una sequenza digitale di bit, si eseguono due fasi sequenziali:

```
  Segnale Analogico s(t) ──► [ CAMPIONAMENTO ] ──► [ QUANTIZZAZIONE ] ──► Sequenza Binaria
                                (Nel Tempo)             (In Ampiezza)           (Bit)
```

1. **Campionamento Uniforme:** Misurazione del valore istantaneo del segnale ad intervalli temporali costanti $T_s = \frac{1}{f_s}$.
2. **Quantizzazione:** Approssimazione del valore campionato continuo al più vicino livello discreto tra gli $L$ livelli ammessi, introducendo un lieve *errore di quantizzazione*.

### Teorema del Campionamento (Criterio di Nyquist)
Per poter ricostruire esattamente e senza distorsioni (*aliasing*) un segnale continuo avente banda limitata $B$, la frequenza di campionamento $f_s$ deve essere almeno pari al doppio della massima frequenza presente nel segnale:

$$f_s \ge 2B$$

Nella pratica ingegneristica si impiega una frequenza leggermente superiore a $2B$, introducendo opportune **bande di guardia** per compensare i limiti dei filtri reali.

---

## 6. Capacità Trasmissiva del Mezzo

La capacità teorica di un canale quantifica il massimo tasso di trasferimento di bit per secondo raggiungibile.

### 1. Canale Ideale Non Rumoroso — Legge di Nyquist
Considerando un canale a banda $B$ privo di rumore, in cui il segnale può assumere $V$ livelli discreti distinti ed equiprobabili, la massima quantità di informazione per livello è $Q = \log_2 V$. La velocità massima teorica di trasmissione è:

$$I = 2B \log_2 V \quad [\text{bit/s}]$$

* Se si impiegano $V = 2$ livelli (binario standard), $I = 2B\text{ bps}$.
* Se si impiegano $V = 4$ livelli, ciascun livello trasporta $\log_2 4 = 2\text{ bit}$, raddoppiando la velocità di trasmissione a parità di velocità di modulazione (baud rate).
* **Limite fisico:** Non è possibile aumentare $V$ all'infinito perché, a parità di escursione di tensione totale, la distanza tra livelli adiacenti diventa così piccola da essere sopraffatta dal rumore.

---

### 2. Rumore nei Canali di Comunicazione
Il rumore è energia spuria che si somma al segnale degradandone il contenuto informativo.

#### Tipologie Principali di Rumore
* **Rumore Termico (Johnson-Nyquist):** Dovuto all'agitazione termica casuale degli elettroni nei conduttori. Inevitabile in qualsiasi circuito a temperatura $T > 0\text{ K}$.
* **Rumore Bianco:** Spettro di potenza uniforme e costante a tutte le frequenze.
* **Rumore di Intermodulazione:** Generato da comportamenti non lineari dei componenti attivi (amplificatori), produce frequenze spurie somma/differenza.
* **Rumore di Modo Comune / Modo Normale:** Disturbi captati simultaneamente sui conduttori rispetto a massa.
* **Rumore di Quantizzazione:** Errore intrinseco introdotto dalla discretizzazione in ampiezza del convertitore ADC.

---

### 3. Canale Reale Rumoroso — Legge di Shannon
Claude Shannon ha esteso l'analisi di Nyquist ai canali reali affetti da rumore termico gaussiano. Indicando con $S$ la potenza del segnale utile e con $N$ la potenza del rumore, la **Capacità di Canale** ($C$ o $I$) massima è data da:

$$I = B \log_2 \left(1 + \frac{S}{N}\right) \quad [\text{bit/s}]$$

Il rapporto Segnale/Rumore (*Signal-to-Noise Ratio*) viene frequentemente espresso in **Decibel (dB)**:

$$\text{SNR}_{\text{dB}} = 10 \log_{10}\left(\frac{S}{N}\right) \iff \frac{S}{N} = 10^{\frac{\text{SNR}_{\text{dB}}}{10}}$$

* La legge di Shannon stabilisce il limite teorico insuperabile al di sopra del quale è impossibile trasmettere senza errori, a prescindere dal numero di livelli impiegati.
* Per incrementare la capacità $I$ è necessario aumentare la larghezza di banda $B$ o la potenza del segnale $S$, tenendo conto che un'eccessiva potenza amplifica le non-linearità e la diafonia sui canali vicini.

---

## 7. Parametri Prestazionali e Metriche di Rete

Per valutare l'efficienza e la qualità del livello fisico si utilizzano parametri standardizzati:

```
  LATENZA TOTALE = T_trasmissione + T_propagazione + T_attesa + T_inoltro
```

| Parametro | Formula / Unità | Significato Tecnico |
|:---|:---:|:---|
| **Larghezza di Banda** | $Hz \text{ oppure bps}$ | Estensione dello spettro in frequenza o velocità nominale massima di linea. |
| **Throughput** | $\text{bit/s (bps)}$ | Quantità effettiva di dati utili correttamente recapitati nell'unità di tempo. |
| **Tempo di Trasmissione** | $T_t = \frac{\text{Dimensione Dati [bit]}}{\text{Larghezza di Banda [bps]}}$ | Tempo necessario al trasmettitore per emettere tutti i bit sul canale. |
| **Tempo di Propagazione** | $T_p = \frac{\text{Distanza [m]}}{\text{Velocità nel Mezzo [m/s]}}$ | Tempo impiegato dal fronte d'onda per viaggiare da un capo all'altro del mezzo. |
| **Tempo di Attesa** | $\text{secondi}$ | Tempo trascorso nei buffer e nelle code dei nodi intermedi. |
| **Tempo di Inoltro** | $\text{secondi}$ | Tempo impiegato dal nodo di commutazione per analizzare l'header e instradare. |
| **Prodotto Banda-Ritardo** | $r = \text{Banda} \times \text{Latenza} \quad [\text{bit}]$ | Numero massimo di bit che possono riempire e saturare il "tubo" del canale fisico. |
| **Jitter** | $\text{millisecondi } [ms]$ | Variazione statistica del ritardo di consegna dei pacchetti causata da congestione. |

### Trasmissione Analogica vs Digitale
* **Trasmissione Analogica:** Il segnale viene propagato senza interpretarne il contenuto; periodicamente viene amplificato con amplificatori che aumentano sia il segnale che il rumore accumulato.
* **Trasmissione Digitale:** Il segnale viene ricevuto, campionato, interpretato e **interamente rigenerato** da ripetitori digitali (*repeater*). Garantisce elevatissima immunità al rumore sulle lunghe distanze, sicurezza e omogeneità per dati eterogenei.

---

## 8. Modalità di Trasmissione e Codifiche di Linea

### Trasmissione Parallela vs Seriale
* **Trasmissione Parallela:** $n$ bit vengono inviati simultaneamente su $n$ fili conduttori paralleli (impiegata su distanze brevissime, es. bus interni al computer).
* **Trasmissione Seriale:** I bit vengono trasmessi in sequenza temporale uno dopo l'altro su un unico canale (standard per telecomunicazioni e reti geografiche).

![Trasmissione Parallela vs Seriale e Concetto di Codifica di Linea](images/reti/fig_p1_xref184_765x210.jpeg)

### Banda Base vs Banda Traslata (Modulata)
* **Banda Base (Baseband):** Il segnale digitale viene immesso direttamente sul canale fisico senza alterarne lo spettro originale (frequenze da $0\text{ Hz}$).
* **Banda Traslata / Modulata (Broadband):** Il segnale modifica le caratteristiche di un'onda portante ad alta frequenza per consentire la trasmissione via etere, su fibra o tramite multiplazione FDM.

---

## 9. Codifiche di Linea per Dati Numerici

La **codifica di linea** trasforma la sequenza binaria astratta in una successione di simboli fisici di tensione adatti al mezzo trasmissivo.

### Relazione tra Bit Rate ($N$) e Baud Rate ($S$)
* **Bit Rate ($N$):** Numero di bit di informazione inviati al secondo $[\text{bps}]$.
* **Baud Rate ($S$):** Numero di elementi di segnale (*simboli*) inviati al secondo $[\text{baud}]$.

$$S = c \cdot N \cdot \frac{1}{r} \quad [\text{baud}]$$

dove $c$ è un fattore legato al pattern di dati ($0 \le c \le 1$, medio $c = 0.5$) ed $r = \frac{\text{numero di bit}}{\text{elementi di segnale}}$.

### Requisiti di una Buona Codifica di Linea
1. **Spettro del Segnale:** Assenza di componente continua (DC) e concentrazione dell'energia a centro banda;
2. **Sincronizzazione di Clock:** Presenza di frequenti transizioni di tensione per permettere al ricevitore di sincronizzare il proprio clock interno;
3. **Rilevazione di Errori:** Possibilità di identificare violazioni del codice direttamente a livello fisico;
4. **Immunità al Rumore ed Economicità.**

---

### Rassegna delle Principali Codifiche di Linea

#### 1. Codifiche Unipolari: RZ e NRZ
* **Unipolare RZ (Return to Zero):** Per il bit '0' tensione nulla ($0\text{ V}$); per il bit '1' impulso positivo $+V$ di durata $T/2$ che ritorna a zero per il restante mezzo periodo.
* **Unipolare NRZ (Non Return to Zero):** Il bit '0' è a $0\text{ V}$, il bit '1' mantiene la tensione $+V$ per l'intera durata del bit $T$.
  * *Vantaggi:* Semplicità di implementazione e basso consumo di banda.
  * *Svantaggi:* Forte componente continua e perdita di sincronizzazione in presenza di lunghe sequenze di '0' o '1'.

![Codifiche Unipolari RZ (Return to Zero) e NRZ (Non-Return to Zero)](images/reti/fig_p1_xref185_613x236.jpeg)

---

#### 2. Codifiche Polari: NRZ-L e NRZI
* **NRZ-L (NRZ Level):** Il bit '0' corrisponde a tensione $+V$, il bit '1' a $-V$ (o viceversa).
* **NRZI (NRZ Invert on ones):** Codifica differenziale in cui la transizione di livello avviene in corrispondenza del bit '1', mentre non vi è alcuna transizione in presenza del bit '0'.

![Codifiche Polari NRZ-L e NRZI](images/reti/fig_p1_xref187_597x200.jpeg)

---

#### 3. Codifiche a Multilivello Binario: AMI e Pseudoternaria
* **AMI Bipolare (Alternate Mark Inversion):**
  * Il bit '0' è rappresentato da tensione nulla ($0\text{ V}$);
  * Il bit '1' è rappresentato alternativamente da impulsi $+V$ e $-V$.
* **Pseudoternaria:** Inverte la convenzione (bit '1' a $0\text{ V}$, bit '0' ad impulsi alternati).
* **Vantaggi di AMI:** Componente continua nulla per sequenze bilanciate di '1', transizioni frequenti sui bit '1' e rilevazione immediata di singoli errori come violazione di polarità alternata.
* **Svantaggi:** Sequenze prolungate di '0' causano perdita di sincronismo; richiede circa $3\text{ dB}$ in più di SNR a parità di bit rate rispetto a NRZ.

![Codifica Bipolare AMI (Alternate Mark Inversion) e Pseudoternaria](images/reti/fig_p1_xref188_512x160.jpeg)

---

#### 4. Codifiche Bifase: Manchester e Manchester Differenziale
* **Manchester:** Presenta sempre una transizione a metà del periodo di bit:
  * Bit '0': Transizione da livello alto a basso ($+V \to -V$);
  * Bit '1': Transizione da livello basso ad alto ($-V \to +V$).
  * *Vantaggi:* Componente continua totalmente assente, sincronismo perfetto e rilevazione di errore garantita.
  * *Svantaggi:* Richiede larghezza di banda e frequenza doppie (2 baud per singolo bit).
* **Manchester Differenziale:** La transizione centrale serve sempre per il sincronismo di clock; la codifica del dato è determinata dalla presenza (bit '0') o assenza (bit '1') di una transizione all'inizio dell'intervallo di bit.

![Codifica Manchester e Manchester Differenziale](images/reti/fig_p1_xref189_543x159.jpeg)

---

#### 5. Codifiche con Scrambling / Sostituzione di Zeri: B8ZS e HDB3
Per eliminare il difetto della codifica AMI (perdita di sincronismo su sequenze di zeri) senza alterare il bilanciamento in continua, si introducono apposite violazioni controllate:

```
  B8ZS (Standard Nord Americano / T1):
  Sostituisce 8 zeri consecutivi (00000000) con:
    •  0 0 0 + - 0 - +   (Se l'ultimo impulso precedente era positivo)
    •  0 0 0 - + 0 + -   (Se l'ultimo impulso precedente era negativo)

  HDB3 (Standard Europeo / E1):
  Sostituisce 4 zeri consecutivi (0000) in base al conteggio degli '1' dall'ultima sostituzione:
    •  Ultimo impulso negativo:  0 0 0 -  (se dispari)  |  + 0 0 +  (se pari)
    •  Ultimo impulso positivo:  0 0 0 +  (se dispari)  |  - 0 0 -  (se pari)
```

### Tabella Comparativa delle Codifiche di Linea

| Codifica | Livelli di Tensione | Componente Continua | Sincronizzazione | Banda Richiesta | Applicazione Tipica |
|:---|:---:|:---:|:---:|:---:|:---|
| **NRZ-L / NRZ** | 2 ($+V, -V$) | Elevata | Scarsa su sequenze uguali | Bassa ($B = N/2$) | Circuiti logici, RS-232 |
| **NRZI** | 2 | Media | Buona solo con sequenze di '1' | Bassa | USB, FDDI |
| **AMI Bipolare** | 3 ($+V, 0, -V$) | Nulla | Buona con '1', scarsa con '0' | Bassa | ISDN, linee T1 |
| **Manchester** | 2 | Assente | Perfetta (transizione a $T/2$) | Doppia ($B = N$) | Ethernet 10BASE-T |
| **B8ZS / HDB3** | 3 | Assente | Eccellente (sostituzione zeri) | Bassa | Tranche primarie T1 / E1 |

---

## 10. Tecniche di Modulazione Numerica

La **modulazione** è il processo mediante il quale il segnale modulante (dati numerici) varia uno o più parametri fondamentali di un'onda sinusoidale ad alta frequenza detta **portante**:

$$s_p(t) = A_c \cos(2\pi f_c t + \phi_c)$$

![Tecniche di modulazione numerica: ASK, FSK, PSK e costellazione QPSK](images/reti/fig_p1_xref191_609x343.jpeg)

### Tipologie di Modulazione Digitale
1. **ASK (Amplitude Shift Keying):** Varia l'ampiezza $A_c$ della portante in funzione del bit (es. $A_c$ per bit '1' e ampiezza nulla per bit '0').
2. **FSK (Frequency Shift Keying):** Modula la frequenza assegnando una frequenza $f_1$ al bit '0' e una frequenza $f_2$ al bit '1', mantenendo la continuità di fase.
3. **PSK (Phase Shift Keying):** Modula la fase $\phi_c$ della portante:
   * **BPSK (Binary PSK):** Utilizza 2 fasi opposte ($0^\circ$ e $180^\circ$) per rappresentare 1 bit/simbolo;
   * **QPSK (Quadrature PSK):** Utilizza 4 sfasamenti ($0^\circ, 90^\circ, 180^\circ, 270^\circ$), trasmettendo 2 bit per simbolo;
   * **DQPSK (Differential QPSK):** La fase varia in base alla differenza rispetto al simbolo precedente.
4. **QAM (Quadrature Amplitude Modulation):** Combina simultaneamente la modulazione di ampiezza e di fase (es. 16-QAM trasmette 4 bit/simbolo, 64-QAM trasmette 6 bit/simbolo), massimizzando la densità di informazione per unità di banda.

---

## 11. Tecniche di Multiplazione (Multiplexing)

La **multiplazione** consente di condividere un unico mezzo fisico ad alta capacità tra molteplici flussi di comunicazione indipendenti, ottimizzando i costi infrastrutturali.

```
       Flusso 1 ──┐                               ┌── Flusso 1
       Flusso 2 ──┼──► [ MULTIPLEXER ] ══════════► [ DEMUX ] ┼──► Flusso 2
       Flusso 3 ──┘       (MUX)        Canale Fisico         └── Flusso 3
```

![Schema di funzionamento del Multiplexer (MUX) e Demultiplexer (DEMUX)](images/reti/fig_p1_xref193_785x196.jpeg)

### Principali Tecniche di Multiplazione

| Tecnica | Principio di Separazione | Meccanismo Operativo |
|:---|:---|:---|
| **SDM (Space Division)** | Spaziale | Cavi o conduttori fisicamente separati per ciascun canale. |
| **FDM (Frequency Division)** | Frequenza | Spettro suddiviso in bande disgiunte assegnate a portanti diverse. |
| **TDM (Time Division)** | Tempo | L'intero canale è allocato a turno ai vari utenti per intervalli (*slot*). |
| **WDM (Wavelength Division)**| Lunghezza d'onda | FDM ottico su singola fibra mediante differenti colori di luce. |
| **CDM (Code Division)** | Codice | Codici ortogonali matematici che condividono simultaneamente tempo e banda. |

---

### Time Division Multiplexing (TDM): Deterministico vs Statistico

Un flusso TDM si organizza in **trame (frame)** composte da una sequenza di **slot temporali (timeslot)**.

![Confronto tra TDM Deterministico (Sincrono) e TDM Statistico (Asincrono)](images/reti/fig_p1_xref194_569x241.jpeg)

```
   TDM DETERMINISTICO (Sincrono):
   Frame: [ Slot A | Slot B | Slot C | Slot D ]  (Posizione fissa; invio idle se vuoto)

   TDM STATISTICO (Asincrono):
   Frame: [ Indirizzo + Dati A | Indirizzo + Dati C | ... ]  (Allocazione dinamica a richiesta)
```

#### Confronto tra TDM Deterministico e TDM Statistico

| Caratteristica | TDM Deterministico | TDM Statistico |
|:---|:---|:---|
| **Allocazione Slot** | Fissa e periodica per ogni canale | Dinamica su effettiva richiesta |
| **Gestione Inattività** | Invia sequenze *idle* (spreco di banda) | Alloca lo slot ad altri utenti attivi |
| **Dimensione Trame** | Costante e predefinita | Variabile |
| **Necessità di Indirizzi** | No (il canale è individuato dalla posizione) | Sì (ogni blocco richiede header di canale) |
| **Bufferizzazione** | Non necessaria | Indispensabile (code di accodamento) |
| **Efficienza del Canale** | Bassa | Massima |

---

### Frequency Division Multiplexing (FDM) e OFDM

Nel **FDM**, la banda complessiva del mezzo è ripartita in sottobande separate da **bande di guardia** per impedire interferenze reciproche.

![Principio della Multiplazione a Divisione di Frequenza (FDM)](images/reti/fig_p1_xref196_523x226.jpeg)

#### OFDM (Orthogonal Frequency Division Multiplexing)
Nell'OFDM, il flusso dati ad alta velocità viene frammentato in numerosi sottoflussi paralleli a basso bit rate, ciascuno modulato su una sottoportante distinta. Le frequenze delle sottoportanti sono scelte matematicamente ortogonali: **il picco di ciascuna sottoportante coincide esattamente con i passaggi per lo zero di tutte le altre**, eliminando l'interferenza intercanale e consentendo una densità spettrale straordinaria senza bande di guardia.

![Spettro di frequenza ortogonale nella modulazione OFDM](images/reti/fig_p1_xref197_400x135.png)

---

### Code Division Multiplexing (CDM / CDMA)
Nella multiplazione a divisione di codice, ciascuna sorgente trasmette contemporaneamente sulla medesima banda di frequenza moltiplicando il proprio bit per una sequenza pseudocasuale ortogonale detta **chipping code** $d[k]$ di lunghezza $m$ chip.

* In ricezione, il segnale complessivo ricevuto è la somma vettoriale di tutte le trasmissioni;
* Moltiplicando il segnale ricevuto per il codice ortogonale associato alla specifica sorgente e integrando nel tempo del bit, le altre trasmissioni si annullano per ortogonalità, estraendo con precisione il segnale desiderato.

![Architettura del codificatore CDM con Chipping Code](images/reti/fig_p1_xref198_822x194.png)

---

## 12. Mezzi Trasmissivi Guidati: Rame e Cavi Elettrici

I mezzi trasmissivi si dividono in:
* **Mezzi Guidati:** Cavi elettrici in rame, guide d'onda e fibre ottiche;
* **Mezzi Non Guidati:** Onde radio, microonde, infrarossi e laser nello spazio libero.

### Cavi in Rame e Schermatura contro le Interferenze (EMI)
I conduttori in rame sono soggetti a disturbi elettromagnetici esterni e generano essi stessi emissioni radianti. Per proteggerli si impiegano sistemi di schermatura con messa a terra:
* **Schermatura a Foglio:** Un sottile nastro di alluminio/poliestere avvolto attorno ai conduttori, accompagnato da un filo di rame nudo continuo (**drain wire**) per il collegamento di terra.
* **Schermatura a Calza:** Una treccia metallica di fili di rame che offre eccellente flessibilità e conduttività.

![Tipologie di schermatura per cavi in rame (Foglio di alluminio e Calza metallica)](images/reti/fig_p1_xref200_702x151.jpeg)

---

### Il Doppino Intrecciato (Twisted Pair)
Consiste in coppie di fili di rame isolati e strettamente ritorti su sé stessi a spirale (*twisted*). L'intreccio cancella reciprocamente le interferenze elettromagnetiche indotte e abbatte drasticamente la **diafonia (crosstalk)** tra coppie adiacenti.

```
       UTP                       FTP / F/UTP                    STP / S/FTP
  ┌───────────┐                 ┌───────────┐                 ┌───────────┐
  │  Guaina   │                 │  Guaina   │                 │  Guaina   │
  │  Coppie   │                 │  Schermo  │                 │  Calza    │
  │  nude     │                 │  Coppie   │                 │  Schermi  │
  └───────────┘                 └───────────┘                 └───────────┘
```

* **UTP (Unshielded Twisted Pair):** Non schermato, economico e flessibile (standard LAN Ethernet).
* **FTP (Foiled Twisted Pair):** Schermatura globale a foglio di alluminio attorno a tutte le coppie.
* **STP (Shielded Twisted Pair):** Schermatura individuale su ciascuna coppia più eventuale calza globale.

I cavi su doppino sono classificati per categorie di prestazione: da **Cat 1** (fonia tradizionale) fino a **Cat 6A / 7 / 8** (frequenze fino a centinaia di MHz/GHz per standard 10G/40GBASE-T).

![Struttura del doppino intrecciato (UTP, FTP, STP)](images/reti/fig_p1_xref201_407x302.jpeg)

---

### Cavo Coassiale e Power Line
* **Cavo Coassiale:** Composto da un conduttore centrale in rame (*core* rigido), uno strato dielettrico isolante, una schermatura tubolare metallica e una guaina esterna.
  * *Banda Base (50 $\Omega$):* Trasmissione digitale diretta (storici standard 10BASE5 e 10BASE2);
  * *Larga Banda (75 $\Omega$):* Trasmissione analogica e TV via cavo con modulazione FDM;
  * Prestazioni eccellenti ma soppiantato dal doppino e dalla fibra per ingombro e costi di cablaggio.
* **Power Line Communication (PLC):** Trasmette dati digitali ad alta frequenza modulando direttamente l'infrastruttura della rete elettrica a $230\text{ V}$.

---

## 13. Fibre Ottiche e Comunicazioni Fotoniche

La **fibra ottica** è una guida d'onda dielettrica cilindrica costituita da:
1. **Core (Nucleo):** Cilindro centrale in silice purissima ($\text{SiO}_2$) con indice di rifrazione $n_1$;
2. **Cladding (Mantello):** Rivestimento concentrico in vetro con indice di rifrazione inferiore $n_2 < n_1$;
3. **Rivestimento Primario (Coating/Buffer):** Guaina protettiva in polimero contro abrasioni meccaniche e umidità.

![Struttura geometrica e componenti della fibra ottica](images/reti/fig_p1_xref203_576x302.jpeg)

### Principi Fisici: Legge di Snell e Riflessione Totale Interna
Quando un raggio luminoso incide sulla superficie di separazione tra due mezzi con indici di rifrazione diversi, vale la **Legge di Snell**:

$$n_1 \sin \theta_1 = n_2 \sin \theta_2$$

```
                           Cladding (n2)
      ────────────────────────────────────────────────────────
                                 /  Riflessione Totale
                                /   se θ1 > θ_critico
                               /
      ───────► Core (n1) ─────/───────────────────────────────
             Raggio Luminoso  \
                               \
                                \
      ───────────────────────────\────────────────────────────
                           Cladding (n2)
```

* Se la luce viaggia dal mezzo più denso ($n_1$) a quello meno denso ($n_2$), superato l'**angolo critico** $\theta_c = \arcsin\left(\frac{n_2}{n_1}\right)$, la rifrazione scompare e il raggio subisce una **riflessione totale interna**.
* Il **Cono di Accettazione** (o Apertura Numerica $\text{NA} = \sin \theta_a = \sqrt{n_1^2 - n_2^2}$) definisce l'angolo massimo entro cui la luce deve entrare nel core per rimanere confinata e propagarsi lungo la fibra.

![Riflessione totale interna e legge di Snell nella fibra ottica](images/reti/fig_p1_xref204_687x207.jpeg)

---

### Tipologie di Fibre Ottiche: Multimodali e Monomodali

| Caratteristica | Fibra Multimodale | Fibra Monomodale |
|:---|:---|:---|
| **Diametro del Core** | $50 - 62.5\ \mu\text{m}$ (ampio) | $8 - 10\ \mu\text{m}$ (sottilissimo) |
| **Sorgente Ottica** | LED o VCSEL (economica) | LASER a semiconduttore (coerente e preciso) |
| **Modi di Propagazione** | Molteplici percorsi a zig-zag | Unico modo rettilineo fondamentale |
| **Dispersione Modale** | Elevata (allargamento temporale impulsi) | Assente |
| **Profilo Indice** | *Step-Index* (a gradino) o *Graded-Index* (parabolico) | *Step-Index* |
| **Distanze Tipiche** | Brevi distanze ($< 2\text{ km}$, LAN, Data Center) | Lunghissime distanze ($> 50-100\text{ km}$, WAN, sottomarine) |

---

### Finestre di Trasmissione Ottica e WDM
La propagazione ottica sfrutta specifiche bande spettrali nel vicino infrarosso dove l'attenuazione della silice è minima:
* **1ª Finestra ($850\text{ nm}$):** Storica, per fibre multimodali con LED;
* **2ª Finestra ($1310\text{ nm}$):** Minima dispersione cromatica (Standard ITU-T G.652);
* **3ª Finestra ($1550\text{ nm}$):** Minima attenuazione assoluta ($\approx 0.2\text{ dB/km}$, Standard ITU-T G.653/G.655).

#### Wavelength Division Multiplexing (WDM)
Multipla decine o centinaia di canali ottici indipendenti sulla medesima fibra assegnando a ciascuno una lunghezza d'onda (*colore*) distinta:
* **CWDM (Coarse WDM):** Spaziatura tra canali ampia ($20\text{ nm}$);
* **DWDM (Dense WDM):** Spaziatura fittissima ($\le 0.8\text{ nm}$ / $100\text{ GHz}$), permette di trasportare terabit/s per fibra su dorsali sottomarine.

![Architettura di trasmissione DWDM: Transponder, Multiplexer, Amplificatori EDFA e Demux](images/reti/fig_p1_xref206_379x188.png)

### Componenti di un Sistema Ottico
* **Transponder:** Converte i segnali elettrici standard in lunghezze d'onda DWDM calibrate;
* **Amplificatori Ottici (EDFA — Erbium-Doped Fiber Amplifier):** Amplificano direttamente i fotoni senza conversione elettro-ottica;
* **Ricevitori:** Fotodiodi **PIN** (corrente proporzionale alla potenza) o **APD** (*Avalanche PhotoDiode*, ad alto guadagno interno).

---

### Paradosso di Tanenbaum
> *"Mai sottovalutare la larghezza di banda di un furgoncino pieno di nastri magnetici che viaggia a tutta velocità sull'autostrada."*

Considerando un furgone caricato con $8\text{ PB}$ di supporti magnetici, per tragitti brevi il throughput equivalente del trasporto fisico risulta elevatissimo. Tuttavia, superati i tempi di trasferimento/viaggio oltre circa $2000\text{ s}$, la fibra ottica a regime continuo (ad esempio a $4000\text{ Gbyte/s}$) batte inesorabilmente qualsiasi vettore fisico, offrendo latenze incomparabilmente inferiori.

---

## 14. Mezzi di Trasmissione Non Guidati (Wireless)

I mezzi non guidati propagano onde elettromagnetiche nello spazio libero alla velocità della luce $c \approx 300.000\text{ km/s}$.

### Architettura del Sistema di Antenna
* **Elemento Irradiante/Ricevente:** L'antenna vera e propria che converte l'energia elettrica guidata in onde elettromagnetiche e viceversa;
* **Feeder di Antenna:** Cavo o guida d'onda che unisce il ricetrasmettitore all'antenna;
* **Circolatore / Duplexer:** Dispositivo per separare i flussi di trasmissione e ricezione sulla stessa antenna.

![Componenti del sistema trasmissivo d'antenna](images/reti/fig_p1_xref208_737x226.jpeg)

![Propagazione del campo elettromagnetico e radiazione nello spazio libero](images/reti/fig_p1_xref209_408x226.jpeg)

---

### Tecniche di Trasmissione a Spettro Espanso (Spread Spectrum)
1. **DSSS (Direct Sequence Spread Spectrum):** Ogni bit di dato viene moltiplicato per una sequenza pseudo-casuale ridondante di chip ad alta frequenza. Eccellente robustezza al rumore e ai disturbi a banda stretta (Wi-Fi 802.11b).
2. **FHSS (Frequency Hopping Spread Spectrum):** Il trasmettitore e il ricevitore concordano una sequenza pseudo-casuale di rapidi "salti" di frequenza tra molteplici sottocanali (Bluetooth).

---

### Modalità di Propagazione e Tecnologie Wireless

```
  ┌─────────────────────────────────────────────────────────────┐
  │              PROPAGAZIONE DELLE ONDE RADIO                  │
  │                                                             │
  │  Onde di Terra (Ground Waves):       f < 2 MHz              │
  │     Seguono la curvatura terrestre                          │
  │                                                             │
  │  Onde Ionosferiche (Sky Waves):      2 MHz < f < 30 MHz     │
  │     Riflesse dagli strati della ionosfera                   │
  │                                                             │
  │  Linea di Vista (Line-of-Sight LOS): f > 30 MHz             │
  │     Ponti radio, microonde, satelliti                       │
  └─────────────────────────────────────────────────────────────┘
```

1. **Ponti Radio a Microonde ($2 - 40\text{ GHz}$):**
   * Comunicazioni punto-a-punto a visibilità ottica (*Line of Sight*) mediante antenne paraboliche direttive;
   * Utilizzati per connettere sedi remote dove la posa della fibra è ostacolata da limiti orografici o costi eccessivi.
2. **Trasmissione ad Infrarossi (IR):**
   * Onde millimetriche direzionabili che non superano i muri opachi (elevata sicurezza nelle stanze, assenza di interferenze con vicini, senza licenza ministeriale);
   * *Infrarossi Diretti* (allineamento perfetto trasmettitore-ricevitore) vs *Diffusi* (riflessione diffusa su pareti e soffitti).
3. **Lightwave (Ottica in Spazio Libero — FSO):**
   * Fasci laser collimati in aria ad altissima frequenza; vastissima banda senza licenza, ma vulnerabile a nebbia, pioggia e fumo.

---

### Trasmissioni Satellitari
Il satellite funge da ripetitore orbitale (*transponder*) in quota: riceve il segnale dalla stazione di terra su una frequenza di **Uplink**, lo amplifica e lo ritrasmette a terra su una frequenza diversa di **Downlink** per evitare auto-interferenze.

```
                  ┌──────────────────────┐
                  │ SATELLITE TRANSIT    │
                  └──────────┬───────────┘
                             │
               Uplink        │        Downlink
               (f1)          │        (f2)
            ┌────────────────┴────────────────┐
            ▼                                 ▼
   [ Stazione Terra A ]              [ Stazione Terra B ]
```

#### Classificazione delle Orbite Satellitari

| Tipologia | Altitudine | Periodo Orbitale | Latenza Tipica | Caratteristiche e Utilizzo |
|:---|:---:|:---:|:---:|:---|
| **GEO** (*Geostationary Earth Orbit*) | $35.786\text{ km}$ | $24\text{ ore}$ (Fisso rispetto alla Terra) | $\approx 250 - 280\text{ ms}$ | Posizionamento immobile nel cielo; 3 satelliti coprono quasi tutto il globo; ideale per TV satellitare e meteo. |
| **MEO** (*Medium Earth Orbit*) | $\approx 10.000 - 20.000\text{ km}$ | $6 - 12\text{ ore}$ | $\approx 80 - 140\text{ ms}$ | Costellazioni per posizionamento globale (GPS, GLONASS, Galileo). |
| **LEO** (*Low Earth Orbit*) | $500 - 1.500\text{ km}$ | $90 - 120\text{ minuti}$ | $\approx 20 - 40\text{ ms}$ | Bassa potenza, orbita rapidissima, bassa latenza; richiede costellazioni fitte per copertura continua (Starlink, Iridium, OneWeb). |

#### Modalità di Interconnessione Satellitare
* **Relaying in Space (Inter-Satellite Link — ISL):** I satelliti instradano i pacchetti direttamente nello spazio tramite link laser o radio inter-satellitari senza rimbalzare a terra.
* **Relaying on the Ground:** I dati vengono scaricati a stazioni terrestri (*ground station*) interconnesse tra loro attraverso dorsali in fibra ottica ad altissima velocità.

---

## 15. Tabella Riassuntiva dei Mezzi Trasmissivi

| Mezzo Trasmissivo | Larghezza di Banda Tipica | Attenuazione Tipica | Immunità EMI / Rumore | Distanza Tipica tra Ripetitori | Costo Relativo |
|:---|:---:|:---:|:---:|:---:|:---:|
| **Doppino UTP/STP** | $10\text{ Mbps} - 10\text{ Gbps}$ | Elevata ad alte freq. | Media (bassa per UTP) | $100\text{ m}$ | Molto Basso |
| **Cavo Coassiale** | $10 - 100\text{ Mbps}$ | Media | Buona | $1 - 2\text{ km}$ | Medio |
| **Fibra Ottica SM** | $> 100\text{ Gbps} - \text{Tbps}$ | Bassissima ($0.2\text{ dB/km}$) | Totale (Immune a EMI) | $50 - 100\text{ km}$ | Alto (apparati) |
| **Ponte a Microonde** | $100\text{ Mbps} - 1\text{ Gbps}$ | Variabile con meteo | Media | $10 - 50\text{ km}$ | Medio |
| **Satelliti LEO** | $100 - 500\text{ Mbps}$ | Elevata (atmosferica) | Buona | Orbitale ($> 500\text{ km}$) | Molto Elevato |

---


<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- SEZIONE: 04 - Livello Data Link.md -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

# Capitolo 4 – Livello Data Link

> **Corso di Reti di Calcolatori** — Appunti completi sul Livello di Collegamento Dati (Data Link Layer - DLL)

---

## 1. Introduzione al Data Link Layer

Il **Data Link Layer (DLL)** — o *Livello di Collegamento Dati* — costituisce il secondo livello dello stack protocollare (subito sopra il livello fisico e immediatamente al di sotto del livello di rete). Il suo compito fondamentale è quello di organizzare e gestire il trasferimento affidabile dei dati tra due apparati direttamente adiacenti, ovvero logicamente connessi da un "canale" trasmissivo in grado di inviare e ricevere sequenze di bit preservandone l'ordine di trasmissione. Inoltre, il Data Link fornisce un'interfaccia ben definita e uniforme per consentire allo strato di rete sottostante di accedere ai servizi di trasporto offerti.

```
+--------------------------------------------------------+
|               LIVELLO DI RETE (Network)                |
|                      Datagrammi                        |
+--------------------------------------------------------+
                           |   ^
   from_network_layer()    |   |   to_network_layer()
                           v   |
+--------------------------------------------------------+
|              LIVELLO DATA LINK (Data Link)             |
|               [Header | Pacchetto | Trailer]           |
+--------------------------------------------------------+
                           |   ^
   to_physical_layer()     |   |   from_physical_layer()
                           v   |
+--------------------------------------------------------+
|                LIVELLO FISICO (Physical)               |
|                    Flusso di Bit                       |
+--------------------------------------------------------+
```

### Operazioni in Trasmissione e Ricezione

* **In fase di trasmissione:**
  1. Il Data Link Layer riceve i pacchetti (datagrammi dati) passati dallo strato di rete superiore;
  2. Li organizza in unità dati strutturate denominate **frame** (o *trame*), eventualmente suddividendo il blocco dati ricevuto dal livello di rete in più frame qualora superi la capacità massima ammessa;
  3. Aggiunge a ciascun frame un'intestazione (**header**) all'inizio e una coda (**trailer**) alla fine;
  4. Passa la sequenza di bit risultante allo strato fisico per l'effettiva trasmissione sul mezzo trasmissivo.

* **In fase di ricezione:**
  1. Il Data Link riceve il flusso di bit grezzo proveniente dallo strato fisico;
  2. Effettua tutti i controlli di integrità necessari (rilevazione di errori tramite checksum/CRC);
  3. Rimuove l'header e il trailer di controllo;
  4. Ricombina i frame e consegna i dati integri estratti allo strato di rete superiore.

---

## 2. Servizi Offerti dal Data Link Layer

Il Data Link Layer offre una ricca varietà di servizi specializzati, la cui attivazione dipende dalla tecnologia di rete e dalla qualità del canale fisico sottostante:

* **Framing (Incapsulamento in Trame):**
  * I protocolli data link incapsulano i datagrammi del livello di rete all'interno di un frame a livello di link.
  * I frame vengono passati al livello fisico con l'obiettivo di consentire il trasferimento affidabile dei dati, garantendo che le informazioni arrivino a destinazione integre, esattamente così come sono state trasmesse.
* **Accesso al Mezzo (Medium Access Control):**
  * Nei canali condivisi (broadcast), il Data Link implementa specifici protocolli di coordinamento per disciplinare l'accesso al mezzo trasmissivo, prevenendo, evitando e gestendo le possibili collisioni tra segnali concorrenti.
* **Consegna Affidabile (Reliable Delivery):**
  * Spesso è considerata **non necessaria** nei collegamenti guidati cablati che presentano un tasso intrinseco di errore sui bit estremamente basso (come fibra ottica, cavo coassiale e doppino intrecciato/UTP).
  * Viene invece sistematicamente impiegata nei collegamenti wireless o su linee rumorose, storicamente e intrinsecamente soggette a tassi di errore (BER - *Bit Error Rate*) elevati.
* **Controllo di Flusso (Flow Control):**
  * Meccanismo indispensabile per evitare che un nodo trasmittente veloce saturi la capacità di ricezione o i buffer di un nodo ricevente più lento, garantendo la perfetta sincronizzazione tra le velocità di elaborazione e trasmissione.
* **Rilevazione degli Errori (Error Detection):**
  * Gli errori di trasmissione sono generati da disturbi fisici, attenuazione del segnale, rumore elettromagnetico, diafonia o interferenze.
  * Il nodo ricevente individua la presenza di alterazioni grazie all'inserimento, da parte del trasmettitore, di bit di controllo di ridondanza (bit di parità, checksum o codici polinomiali CRC) all'interno dell'header o del trailer del frame.
* **Correzione degli Errori (Error Correction):**
  * Oltre a rilevare la corruzione del frame, il nodo ricevente è in grado di determinare l'esatta posizione del bit o dei bit alterati e di correggerli autonomamente mediante codici di correzione (ad es. codici di Hamming o FEC - *Forward Error Correction*), senza la necessità di richiedere la ritrasmissione.
* **Modalità di Trasmissione (Half-Duplex e Full-Duplex):**
  * **Full-Duplex:** Entrambi gli estremi del collegamento possono trasmettere e ricevere contemporaneamente senza interferire tra loro.
  * **Half-Duplex:** La comunicazione è bidirezionale, ma i due estremi possono trasmettere solo alternativamente, uno alla volta.

---

## 3. Classi di Servizio Fornite al Livello di Rete

La progettazione del Data Link Layer mette a disposizione dello strato di rete tre principali classi di servizio:

| Classe di Servizio | Riscontro (ACK/NAK) | Connessione | Caratteristiche e Ambiti di Utilizzo Ottimali |
|---|---|---|---|
| **Senza riscontro e senza connessione** (*Unacknowledged Connectionless*) | No | No | Le trame vengono inviate singolarmente senza instaurare una connessione e senza attendere conferme. Adatto a canali ad alta affidabilità (es. LAN Ethernet) o per traffico real-time in cui la ritrasmissione è dannosa. |
| **Affidabile senza connessione** (*Acknowledged Connectionless*) | Sì | No | Ogni frame inviato riceve una conferma individuale (ACK). Non vi è instaurazione formale di canale logico. Adatto a canali inaffidabili senza overhead di connessione (es. Wi-Fi 802.11). |
| **Affidabile con connessione** (*Acknowledged Connection-Oriented*) | Sì | Sì | Viene stabilita una connessione logica prima del trasferimento (fasi di apertura, trasferimento numerato con riscontri, e chiusura). Garantisce consegna ordinata e priva di duplicati; ideale su linee rumorose soggette a frequenti errori (es. collegamenti satellitari o WAN storiche). |

> **Principio di funzionamento dell'affidabilità:**
> Per garantire un servizio *non affidabile* è sufficiente trasmettere i frame sul canale senza preoccuparsi del loro esito. Viceversa, per garantire un servizio *affidabile*, il ricevitore deve effettuare un controllo di integrità su ciascun frame e scartare le trame corrotte. Si adotta quindi un meccanismo di riscontro esplicito:
> * **ACK (Acknowledgment):** notifica di ricezione corretta;
> * **NAK (Negative Acknowledgment):** notifica di ricezione errata o mancata.
>
> In caso di NAK o di mancato riscontro entro un tempo prefissato (timeout), interviene la **ritrasmissione**. Trasmettitore e ricevitore devono essere perfettamente sincronizzati per delimitare l'inizio e la fine dei singoli frame e devono attuare un rigoroso controllo di flusso.

---

## 4. Implementazione Tramite Adattatore di Rete (NIC)

Il protocollo a livello di link è implementato a livello hardware e firmware all'interno di una **scheda di interfaccia di rete** (**NIC** - *Network Interface Card*), nota anche come adattatore di rete. La NIC opera come un'unità **semiautonoma**:

* **Lato trasmittente:**
  1. Preleva il datagramma dallo strato di rete dell'host;
  2. Lo incapsula all'interno del frame;
  3. Calcola e inserisce i bit di controllo dell'errore (checksum/CRC);
  4. Applica le regole di accesso al mezzo, il trasferimento dati affidabile e il controllo di flusso;
  5. Emette i segnali sullo strato fisico.

* **Lato ricevente:**
  1. Cattura il segnale dal canale fisico;
  2. Identifica e riceve il frame;
  3. Rileva la presenza di eventuali errori di trasmissione;
  4. Gestisce i riscontri (ACK/NAK) e il controllo di flusso;
  5. Estrae il datagramma integro e lo passa al software dello strato di rete.

---

## 5. Problematiche Cardine del Livello Data Link

Per svolgere appieno le sue funzioni, il Data Link Layer deve affrontare e risolvere tre problematiche fondamentali:

1. **Organizzazione del flusso di bit in frame (Framing):** Sincronizzazione dei confini del frame, inserimento e rimozione di header e trailer, riordino dei frame ricevuti fuori sequenza.
2. **Gestione degli errori di trasmissione:** Utilizzo di codici di correzione e identificazione dell'errore, gestione dei timeout e delle ritrasmissioni dei pacchetti corrotti o smarriti.
3. **Controllo di flusso:** Ottimizzazione dell'uso del canale trasmissivo per impedire che un trasmettitore veloce sovraccarichi e mandi in overflow i buffer di un ricevitore lento.

---

## 6. Tecniche di Framing e Sincronizzazione

Poiché lo strato fisico non garantisce una trasmissione priva di errori né fornisce una demarcazione dei messaggi, il Data Link Layer suddivide il flusso continuo di bit in **frame** discreti e vi applica i controlli di integrità. Per consentire al ricevitore di localizzare con precisione dove inizia e dove finisce ciascun frame, si adottano specifiche tecniche di delimitazione:

```
+-------------------+--------------------------------+-------------------+
|  Header (Control) |     Dati Utili (Payload)       |  Trailer (Check)  |
+-------------------+--------------------------------+-------------------+
```

### 6.1. Conteggio dei Caratteri (Character Count)

Nel campo header viene inserito un byte iniziale che specifica il numero totale di byte/caratteri consecutivi che compongono il frame (incluso il byte di conteggio stesso).

* **Punto debole:** Questa tecnica è estremamente fragile. Se il byte di conteggio viene alterato da un errore di trasmissione sul canale, il ricevitore perde completamente il sincronismo di trama e non sarà più in grado di individuare l'inizio né la fine dei frame successivi.

### 6.2. Delimitazione con Caratteri di Escape e Byte Stuffing

Si delimitano l'inizio e la fine del frame inserendo nell'header e nel trailer apposite sequenze di caratteri ASCII di controllo:
* **Inizio frame:** sequenza `DLE STX` (*Data Link Escape* - *Start of TeXt*);
* **Fine frame:** sequenza `DLE ETX` (*Data Link Escape* - *End of TeXt*).

#### Meccanismo del Byte Stuffing (Riempimento di Byte)
Se i dati trasmessi contengono accidentalmente il carattere `DLE`, il ricevitore potrebbe erroneamente interpretarlo come l'inizio della sequenza di chiusura `DLE ETX`. Per prevenire questo errore, il trasmettitore applica il **byte stuffing**: ogni volta che incontra un carattere `DLE` all'interno del payload, inserisce automaticamente un ulteriore carattere fittizio `DLE` (duplicazione: `DLE DLE`).

* **In ricezione:** quando il ricevitore incontra un singolo `DLE`, verifica il carattere successivo:
  * Se segue `STX` o `ETX`, riconosce l'inizio o la fine del frame;
  * Se segue un secondo `DLE`, scarta il `DLE` di stuffing e memorizza il singolo `DLE` originale nei dati.

![Byte stuffing con caratteri di escape DLE STX ed ETX](images/reti/fig_p1_xref213_568x89.jpeg)

### 6.3. Delimitazione con Flag Byte e Bit Stuffing

Si inserisce un byte speciale denominato **Flag Byte** all'inizio e alla fine del frame. Il flag byte convenzionale ha il valore:

$$\text{Flag Byte} = \mathtt{01111110_2} \quad (\mathtt{0x7E})$$

I bit estremi sono posti a `0` mentre i 6 bit centrali sono posti a `1`.

#### Meccanismo del Bit Stuffing (Riempimento di Bit)
Per evitare che la sequenza `01111110` compaia casualmente all'interno del payload dei dati, il trasmettitore esamina continuamente il flusso di bit:
* Ogni volta che rileva **cinque bit `1` consecutivi** (`11111`), inserisce automaticamente un bit **`0`** subito dopo.

* **In ricezione:** il ricevitore controlla il flusso in arrivo:
  * Quando rileva cinque bit `1` consecutivi seguiti da uno `0`, rimuove (*unstuffing*) automaticamente il bit `0`, ripristinando il dato originario.
  * Se invece dopo cinque bit `1` riceve un sesto bit `1` seguito da uno `0` (`01111110`), riconosce l'indicatore di delimitazione (flag di inizio/fine).
  * Se riceve sette o più bit `1` consecutivi, segnala un errore di violazione di linea (*abort*).

![Bit stuffing con sequenza flag 01111110](images/reti/fig_p1_xref214_698x123.jpeg)

### 6.4. Violazione di Codifica dello Strato Fisico

Consiste nel segnalare l'inizio o la fine del frame introducendo deliberatamente segnali non validi nelle regole di codifica del livello fisico. Ad esempio, nella **codifica Manchester**, in cui ogni bit valido impone una transizione alto-basso o basso-alto a metà del tempo di bit, l'omissione della transizione (mantenimento del livello alto o basso per l'intero intervallo) viene riconosciuta dal circuito come delimitatore speciale di inizio o fine trama.

---

## 7. Rilevazione e Controllo degli Errori

Il canale fisico può introdurre svariate tipologie di anomalie:
* **Errori su singolo bit** (*Single-bit error*);
* **Raffica di errori** (*Burst error*);
* **Replicazione o perdita di bit**.

Per rilevare tali anomalie, il Data Link Layer calcola un valore di ridondanza sui bit del frame denominato **checksum** (o FCS - *Frame Check Sequence*), posizionandolo nell'header o nel trailer. La destinazione ripete il calcolo sui bit ricevuti e confronta il risultato ottenuto con il checksum ricevuto: se coincidono, il frame è considerato integro; in caso contrario, è corrotto.

Le principali tecniche di controllo matematico sono:

### 7.1. Controllo di Parità

Si aggiunge un bit ridondante di parità alla sequenza informativa:
* **Parità Pari:** il bit di parità è posto a `1` se il numero di bit `1` nei dati è dispari, in modo da rendere il numero complessivo di `1` sempre pari.
* **Parità Dispari:** il bit di parità è posto a `1` se il numero di bit `1` nei dati è pari, in modo da rendere il numero complessivo di `1` sempre dispari.

> **Limiti della parità semplice:**
> Il controllo a singolo bit rileva unicamente la presenza di un numero **dispari** di bit errati. Non è in grado di rilevare errori pari (due bit invertiti si annullano a vicenda) e non consente di individuare la posizione del bit errato per correggerlo.

#### Parità Bidimensionale (Two-Dimensional Parity)
I dati vengono organizzati in una matrice di $k$ righe e $k$ colonne. Si calcola il bit di parità per ciascuna riga e per ciascuna colonna, ottenendo $2k + 1$ bit di controllo.
* In questo modo, un errore su un singolo bit altera contemporaneamente la parità di una specifica riga e di una specifica colonna: l'intersezione individua le coordinate esatte del bit corrotto, consentendone l'immediata correzione (inversione del bit).
* Errori multipli possono essere rilevati con elevata affidabilità, anche se non sempre localizzabili.

### 7.2. Campi di Galois ($GF(q)$)

Un campo finito con $q$ elementi su cui sono definite le operazioni di addizione e moltiplicazione modulari (godenti delle proprietà associativa, commutativa e distributiva) è detto **Campo di Galois** e indicato con $GF(q)$. Ai dati che compongono il campo vengono associati specifici bit di controllo; ogni lettura verifica la coerenza algebrica dei dati per rilevare alterazioni con probabilità elevatissima.

![Campi di Galois: Tabelle di addizione e moltiplicazione per GF(5) e GF(2)](images/reti/fig_p1_xref216_605x302.jpeg)

### 7.3. Rappresentazione Polinomiale e Codifica CRC (Cyclic Redundancy Check)

Una sequenza binaria di $N$ bit può essere formalmente rappresentata come un polinomio $P(x)$ a coefficienti binari in $GF(2)$ di grado massimo $N - 1$:
* Il bit più a sinistra rappresenta il coefficiente del termine di grado massimo $N - 1$;
* Il bit più a destra rappresenta il termine noto ($x^0 = 1$).

**Esempio:**
$$\text{Sequenza: } \mathtt{1011011} \iff P(x) = 1 \cdot x^6 + 0 \cdot x^5 + 1 \cdot x^4 + 1 \cdot x^3 + 0 \cdot x^2 + 1 \cdot x^1 + 1 \cdot x^0 = x^6 + x^4 + x^3 + x + 1$$

Il grado del polinomio è determinato dalla posizione del primo bit `1` da sinistra.

#### Algoritmo del Cyclic Redundancy Check (CRC)
1. Il messaggio informativo di $m$ bit è rappresentato dal polinomio $M(x)$ di grado $m - 1$.
2. Trasmettitore e ricevitore concordano a priori un **polinomio generatore** $G(x)$ di grado $r$ (con il bit più significativo e il bit meno significativo posti obbligatoriamente a `1`).
3. Il trasmettitore moltiplica $M(x)$ per $x^r$, operazione corrispondente ad aggiungere $r$ zeri in coda alla sequenza di bit originaria:
   $$M(x) \cdot x^r$$
4. Esegue la divisione in aritmetica modulo 2 (operazione XOR senza riporti) tra $M(x) \cdot x^r$ e $G(x)$, ricavando il polinomio resto $R(x)$ di grado $< r$:
   $$\frac{M(x) \cdot x^r}{G(x)} = Q(x) + \frac{R(x)}{G(x)}$$
5. Il frame trasmesso $T(x)$ è ottenuto sommando (in modulo 2 / XOR) il resto $R(x)$ a $M(x) \cdot x^r$:
   $$T(x) = M(x) \cdot x^r \oplus R(x)$$
   Per costruzione, il polinomio $T(x)$ è esattamente divisibile per $G(x)$ con resto nullo.
6. **In ricezione:** il ricevitore divide il polinomio associato al frame ricevuto $T'(x)$ per $G(x)$:
   * Se il **resto è nullo** ($R'(x) = 0$), si assume che la trasmissione sia avvenuta senza errori;
   * Se il **resto è non nullo** ($R'(x) \ne 0$), viene rilevata la presenza di errori di trasmissione e il frame viene scartato.

---

## 8. Controllo di Flusso e Interfacce Software

Se una sorgente trasmette ad un tasso trasmissivo superiore alla velocità di elaborazione e ricezione della destinazione, il ricevitore esaurisce lo spazio nei propri buffer e inizia a scartare frame integri per *buffer overflow*. Il protocollo data link deve implementare meccanismi per rallentare o arrestare la sorgente finché il destinatario non invia un'autorizzazione esplicita.

### Architettura delle Procedure Software

L'implementazione software/firmware del Data Link Layer si interfaccia con i livelli adiacenti tramite procedure standardizzate:
* `from-network-layer()`: preleva il pacchetto dati dallo strato di rete superiore;
* `to-network-layer()`: consegna il pacchetto dati estratto allo strato di rete;
* `to-physical-layer()`: passa il frame pronto allo strato fisico;
* `from-physical-layer()`: legge i dati in arrivo dallo strato fisico;
* `wait-for-event()`: mette il DLL in stato di attesa finché non si verifica un evento (disponibilità di nuovi dati dallo strato di rete o arrivo di un frame dallo strato fisico).

```
        +-------------------------+
        |  Livello di Rete        |
        +-------------------------+
          | from_net    ^ to_net
          v             |
     +-------------------------------+
     |       Data Link Layer         | <--- wait_for_event()
     +-------------------------------+
          | to_phys     ^ from_phys
          v             |
        +-------------------------+
        |  Livello Fisico         |
        +-------------------------+
```

Durante l'esecuzione della procedura di elaborazione, il DLL non può rispondere istantaneamente ad altri eventi: i dati in arrivo dallo strato fisico vengono pertanto accumulati in una coda di memoria (**buffer**). Poiché il tempo di elaborazione non è nullo e varia a seconda del carico di lavoro e delle linee gestite dal nodo ricevente, il dimensionamento statico basato sul caso peggiore comporterebbe un grave spreco di banda; si adottano quindi protocolli a finestra adattivi.

---

## 9. Struttura del Frame Data Link

Il frame del livello di collegamento è composto dai seguenti campi ordinati:

| Campo | Significato e Funzione |
|---|---|
| **Start Flag** | Sequenza speciale o flag byte di inizio trama (es. `01111110`) per la sincronizzazione iniziale. |
| **Type** | Tipologia del frame (frame di dati `DATA`, riscontro positivo `ACK`, riscontro negativo `NAK`, controllo di flusso `RR`/`RNR`). |
| **Seq** | *Sequence Number*: numero progressivo identificativo del frame trasmesso. |
| **Ack** | *Acknowledgment Number*: numero del frame che viene riscontrato o atteso in ricezione. |
| **Pacchetto (Payload)** | Dati utili trasportati provenienti dal livello di rete (datagramma IP). |
| **Checksum (FCS)** | Bit di controllo di ridondanza (CRC) per la verifica dell'integrità del frame. |
| **End Flag** | Sequenza o flag byte di fine frame per la chiusura della trama. |

![Struttura del Frame Data Link](images/reti/fig_p1_xref218_801x67.jpeg)

---

## 10. Protocolli di Trasferimento Dati Affidabile (RDT)

Il protocollo **RDT (Reliable Data Transfer)** definisce formalmente i meccanismi necessari per garantire la consegna affidabile su un canale fisico sottostante intrinsecamente inaffidabile.

![Interfacce e architettura del protocollo RDT](images/reti/fig_p1_xref219_677x441.jpeg)

Le interfacce software cardine sono:
* `rdt_send()`: invocata dal livello superiore per richiedere l'invio affidabile dei dati;
* `udt_send()`: invocata da RDT per trasmettere il pacchetto sul canale inaffidabile (*Unreliable Data Transfer*);
* `rdt_rcv()`: invocata quando un pacchetto giunge dal canale fisico al lato ricevente;
* `deliver_data()`: invocata da RDT per consegnare i dati decapsulati allo strato superiore.

---

### 10.1. Protocollo RDT 1.0 (Canale Perfettamente Affidabile)

Nel caso ideale di canale sottostante privo di errori sui bit e senza perdita di pacchetti:
* **Mittente:** attende la chiamata dall'alto (`rdt_send`), crea il pacchetto (`make_pkt`) e lo spedisce nel canale (`udt_send`).
* **Ricevente:** attende l'arrivo dal basso (`rdt_rcv`), estrae i dati (`extract`) e li consegna allo strato superiore (`deliver_data`).

![Automa a stati finiti (FSM) per RDT 1.0 (mittente e ricevente)](images/reti/fig_p1_xref220_615x149.jpeg)

---

### 10.2. Protocollo RDT 2.0 e Meccanismo Stop-and-Wait

Nel modello **RDT 2.0** il canale introduce errori sui bit (corruzione), ma non perde pacchetti. Per rilevare e gestire gli errori si utilizzano:
1. **Checksum:** per rilevare la corruzione dei bit;
2. **ACK (Positive Acknowledgment):** notifica al mittente che il pacchetto è giunto integro;
3. **NAK (Negative Acknowledgment):** notifica che il pacchetto è corrotto; alla ricezione di un NAK, il mittente ritrasmette immediatamente il frame.

![FSM mittente RDT 2.0 con gestione ACK/NAK](images/reti/fig_p1_xref221_511x333.jpeg)
![FSM ricevente RDT 2.0 con invio ACK/NAK](images/reti/fig_p1_xref222_227x484.jpeg)

#### Funzionamento del Protocollo Stop-and-Wait
Nel protocollo **Stop-and-Wait**, dopo aver inviato una trama, il mittente sospende la trasmissione e si mette in attesa di un riscontro. Il ricevitore, dopo aver esaminato il frame, invia un frame di controllo: `ACK` (oppure `RR` - *Receiver Ready*) se corretto, `NAK` se errato.
* Il traffico dati applicativo è unidirezionale (*simplex*), ma poiché i frame di riscontro viaggiano in senso opposto, il canale fisico sottostante deve essere almeno **half-duplex**.

#### Il Problema della Corruzione dei Riscontri (RDT 2.1 / RDT 2.2)
Cosa accade se un pacchetto ACK o NAK viene danneggiato dal rumore sul canale?
* Il mittente non può comprendere la risposta del ricevitore; per sicurezza, ritrasmette il pacchetto dati originario.
* Questa ritrasmissione introduce però il problema dei **duplicati**: il ricevitore non saprebbe distinguere se il pacchetto in arrivo è un nuovo dato o una copia duplicata di quello precedente.

> **Soluzione (Numeri di Sequenza):**
> Si aggiunge all'header del pacchetto un campo **Numero di Sequenza (Sequence Number)**. Per un protocollo Stop-and-Wait è sufficiente **1 bit** alternato ($0$ e $1$). Se il ricevitore riceve un pacchetto con lo stesso numero di sequenza di quello appena accettato, lo riconosce come duplicato, lo scarta e re-invia l'ACK per sbloccare il mittente.

---

### 10.3. Protocollo RDT 3.0 (Canale con Errori e Perdite di Pacchetti)

Nel modello **RDT 3.0** il canale sottostante può sia corrompere che **smarrire completamente** pacchetti dati o frame di ACK.

* **Meccanismo di Timeout:** Il mittente avvia un timer di conto alla rovescia (*countdown timer*) all'invio di ogni pacchetto, impostando un tempo di attesa "ragionevole".
  * Se riceve l'ACK corretto prima dello scadere del timer $\to$ timer arrestato e invio del pacchetto successivo;
  * Se il timer scade (*timeout*) senza aver ricevuto ACK $\to$ il pacchetto viene ritrasmesso automaticamente.
  * Se il pacchetto o l'ACK erano solo in ritardo (non persi), la ritrasmissione genererà un duplicato, prontamente gestito e scartato grazie al numero di sequenza.

> **Limite di RDT 3.0:**
> RDT 3.0 è rigorosamente Stop-and-Wait: l'emittente può inviare un solo pacchetto per volta, rimanendo inattivo per l'intero tempo di andata e ritorno (**RTT** - *Round Trip Time*). Questo approccio vincola pesantemente l'utilizzo delle risorse fisiche, determinando un'efficienza di canale (*throughput*) bassissima.

---

## 11. Protocolli con Pipelining e Finestra Scorrevole (Sliding Window)

Per superare l'inefficienza dello Stop-and-Wait si ricorre al **Pipelining**: il mittente è autorizzato a trasmettere **più frame consecutivi** senza fermarsi ad attendere il riscontro di ciascuno, fino ad una dimensione massima stabilita detta **finestra** ($W$).

```
Spazio dei numeri di sequenza:
   [ 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 0 | 1 | 2 ... ]
         |----------- W -----------|
         [   Finestra attiva       ]
```

### Principi di Base della Finestra Scorrevole
* **Numerazione dei frame in modulo $2^n$:** Con $n$ bit dedicati nell'header per il campo sequenza, i frame sono numerati da $0$ a $2^n - 1$. Terminato il valore $2^n - 1$, la numerazione riparte ciclicamente da $0$:
  $$\text{Numero Frame} = k \pmod{2^n}$$
* **Dimensione massima della finestra:** Per evitare ambiguità nell'interpretazione dei riscontri, deve sempre valere $W \le 2^n$ (con vincoli più stringenti a seconda del protocollo).
* **Riscontro cumulativo:** Il ricevitore non è obbligato a riscontrare singolarmente ogni trama: può attendere e inviare un unico ACK cumulativo che conferma la ricezione corretta di tutti i frame con numero di sequenza fino a $n$.
* **Bufferizzazione:**
  * **In trasmissione:** il mittente memorizza in un buffer di dimensione $W$ tutti i frame trasmessi in attesa di riscontro per poterli ritrasmettere in caso di perdita. Alla ricezione dell'ACK, i buffer dei frame confermati vengono liberati;
  * **In ricezione:** i frame corretti vengono consegnati allo strato di rete liberando i corrispondenti buffer.
* **Finestra di Trasmissione ($W_T$):** Rappresenta l'insieme dei frame inviabili. All'invio di un frame il limite inferiore avanza di un'unità; quando la finestra si chiude (raggiunti $W$ frame in volo), la trasmissione si blocca. All'arrivo di un ACK, il limite superiore avanza, consentendo l'invio di nuovi dati.
* **Finestra di Ricezione ($W_R$):** Contiene l'intervallo dei numeri di frame accettabili dal ricevitore. Qualsiasi frame che giunga con numero di sequenza esterno alla finestra viene scartato.
  * Se $W = 1$, il protocollo a finestra scorrevole degenera nel classico Stop-and-Wait.

---

## 12. Gestione degli Errori: Go-Back-N e Selective Reject

Nei protocolli a finestra, la gestione degli errori è più complessa poiché, prima che il trasmettitore si accorga dell'errore su un frame, ha già inviato le trame successive. Esistono due strategie fondamentali:

```
                      +-----------------------------+
                      | PROTOCOLLI SLIDING WINDOW   |
                      +-----------------------------+
                                     |
                 +-------------------+-------------------+
                 v                                       v
   +---------------------------+           +---------------------------+
   |        Go-Back-N          |           |     Selective Reject      |
   |  - W_T <= 2^n - 1         |           |  - W_T = W_R <= 2^(n-1)   |
   |  - W_R = 1 (No buffer rx) |           |  - Buffer in ricezione    |
   |  - ACK cumulativi         |           |  - ACK individuali        |
   |  - Ritrasmissione in blocco|          |  - Ritrasmissione selettiva|
   +---------------------------+           +---------------------------+
```

### 12.1. Protocollo Go-Back-N (GBN)

Il protocollo **Go-Back-N** è un'istanza del paradigma ARQ con le seguenti caratteristiche:
* Il mittente trasmette fino a $W$ frame senza attendere;
* La dimensione della finestra di trasmissione deve rispettare la condizione:
  $$W \le 2^n - 1$$
* **ACK Cumulativo:** un riscontro con numero di sequenza $n$ conferma che tutti i pacchetti con numero di sequenza $\le n$ sono stati ricevuti correttamente;
* **Unico Timer:** è attivo un timer per il pacchetto più vecchio ancora non riscontrato. Se scade il timeout, il mittente **ritrasmette tutti i frame** inviati e non ancora riscontrati (torna indietro di $N$ posizioni);
* **Ricevitore senza buffer ($W_R = 1$):** il ricevitore accetta solo il pacchetto in perfetto ordine sequenziale. Non memorizza pacchetti fuori ordine; l'unica informazione conservata è il sequence number del prossimo pacchetto atteso.

#### Anomalie Gestite in Go-Back-N:
1. **Frame Danneggiato:** Se il ricevitore riceve un frame corrotto, invia un `NAK` con il relativo numero di sequenza e scarta quel frame e tutti i frame successivi che arrivano. Alla ricezione del NAK, il mittente ritrasmette il frame errato e tutti i successivi.
2. **Frame Perso:** Se un frame viene perso sul canale, i frame successivi arrivano fuori sequenza. Il ricevitore li scarta tutti, invia un NAK (o ripete l'ultimo ACK valido). Il mittente ritrasmette dal frame mancante in poi.
3. **Riscontro (ACK) Perso:** Se l'ACK viene perso o danneggiato, alla scadenza del timer il mittente ritrasmette tutti i frame privi di riscontro.

---

### 12.2. Protocollo Selective Reject / Selective Repeat (SR)

Nel protocollo **Selective Reject (Ripetizione Selettiva)**:
* Il trasmettitore ritrasmette **esclusivamente il singolo frame danneggiato o perso**, evitando di rispedire i frame successivi già correttamente pervenuti;
* Il ricevitore è dotato di buffer di ricezione ($W_R > 1$): memorizza i frame corretti anche se arrivati fuori ordine (purché interni alla finestra di ricezione) in attesa che giungano i frame mancanti;
* Quando il frame mancante viene ritrasmesso e ricevuto, il ricevitore riordina i frame, li consegna in sequenza allo strato di rete, fa avanzare la finestra e invia l'ACK relativo all'ultimo frame consecutivo corretto;
* Per evitare qualsiasi ambiguità tra vecchi e nuovi frame, la dimensione massima della finestra deve essere:
  $$W \le 2^{n-1} \quad \left(\text{ossia metà dello spazio di indirizzamento}\right)$$

### Tipologie di Frame di Controllo
* `ACK` / `RR` (*Receiver Ready*): conferma di avvenuta ricezione, autorizza l'invio di nuovi frame;
* `NAK` / `REJ` (*Reject*): richiesta esplicita di ritrasmissione per frame errato o fuori sequenza;
* `RNR` (*Receiver Not Ready*): frame di controllo di flusso che impone al mittente di sospendere immediatamente le trasmissioni fino alla successiva ricezione di un `RR` (utilizzato in situazioni di congestione o saturazione temporanea dei buffer del ricevitore).

---

## 13. Trasmissione Full-Duplex e Piggybacking

Quando il canale fisico supporta la comunicazione bidirezionale simultanea (**Full-Duplex**), i frame di dati e i frame di controllo (ACK) possono viaggiare contemporaneamente nelle due direzioni.

```
       Nodo A                                            Nodo B
         |                                                 |
         | ---- Frame Dati [Seq=0, Ack=0 (Piggybacked)] -> |
         |                                                 |
         | <- Frame Dati [Seq=0, Ack=1 (Piggybacked)] ---- |
         |                                                 |
```

### Meccanismo del Piggybacking (Riscontro a Cavalluccio)
Per ottimizzare l'efficienza e non sprecare banda inviando frame di controllo separati, si utilizza la tecnica del **piggybacking**:
* Quando un nodo deve inviare un riscontro e contemporaneamente ha dati da trasmettere nella direzione opposta, inserisce il numero di ACK direttamente all'interno dell'header del frame dati in partenza (*riscontro a cavalluccio*).
* Se il nodo non ha dati pronti da trasmettere, si avvia un **timer di piggybacking**:
  * Se entro lo scadere del timer viene generato un frame dati, l'ACK viene accodato ad esso;
  * Se il timer scade senza che vi siano dati da inviare, viene trasmesso un frame di controllo `ACK` dedicato.

---

## 14. Tabella Riassuntiva dei Protocolli Data Link

| Protocollo | Finestra Trasm. ($W_T$) | Finestra Ricez. ($W_R$) | Buffer Ricevitore | Ritrasmissione | Efficienza di Canale |
|---|---|---|---|---|---|
| **Stop-and-Wait** | $1$ | $1$ | No | Singolo frame su timeout/NAK | Bassa su canali ad alto RTT |
| **Go-Back-N** | $\le 2^n - 1$ | $1$ | No | In blocco dal frame mancante (*Go Back*) | Media (spreco su errori frequenti) |
| **Selective Repeat** | $\le 2^{n-1}$ | $\le 2^{n-1}$ | Sì | Esclusivamente il frame corrotto/perso | Massima (ottimale su linee rumorose) |

---


<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- SEZIONE: 05 - Data Link LAN (Basic).md -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

# Capitolo 5 – Data Link LAN (Basic)

> **Corso di Reti di Calcolatori** — Reti Locali (LAN) e Protocolli di Accesso Multiplo (MAC)

---

## 1. Tipologie di Collegamenti di Rete

Nelle architetture di rete, i collegamenti fisici a livello Data Link si dividono in due categorie fondamentali:

```
+-----------------------------------+-----------------------------------+
|  Collegamento Punto-Punto (P2P)   |   Collegamento Broadcast (Shared) |
+-----------------------------------+-----------------------------------+
|               Host A              |           Canale Condiviso        |
|                 |                 |      +------+-----+------+-----+  |
|                 v                 |      |      |     |      |     |  |
|               Host B              |    Nodo1  Nodo2 Nodo3  Nodo4 Nodo5|
+-----------------------------------+-----------------------------------+
```

* **Collegamento Punto-Punto (P2P - Point-to-Point):**
  * Connessione dedicata ed esclusiva tra due soli apparati terminali o nodi adiacenti;
  * Ampiamente impiegato nelle comunicazioni su lunga distanza (linee seriali, collegamenti WAN, protocolli PPP/HDLC) e nei moderni segmenti Ethernet dedicati (collegamento punto-punto tra scheda di rete host e porta dello switch).
* **Collegamento Broadcast (Mezzo Condiviso):**
  * Un unico canale o mezzo trasmissivo è condiviso simultaneamente tra centinaia o persino migliaia di nodi;
  * Esempi tipici: Ethernet tradizionale su bus coassiale (10BASE2, 10BASE5), canale HFC (*Hybrid Fiber-Coaxial*) in upstream per la televisione via cavo, e reti locali senza fili (*Wireless LAN* IEEE 802.11 / Wi-Fi).

### Il Fenomeno della Collisione e lo Slot di Contesa

Quando più nodi trasmettono contemporaneamente sul canale broadcast condiviso, i relativi segnali elettrici o radio si sovrappongono nello spazio e nel tempo, distorcendosi a vicenda. Questo evento prende il nome di **collisione** (*frame collision*), e comporta la corruzione irrimediabile dei dati trasmessi.

Un fattore determinante per la tempestiva rilevazione delle collisioni è il **ritardo di propagazione** ($t_{\text{prop}} = \tau$) del segnale lungo il mezzo trasmissivo:
* Sia $\tau$ il tempo massimo necessario affinché il segnale si propaghi tra le due stazioni fisicamente più distanti della rete;
* Il tempo massimo necessario nel caso peggiore affinché una stazione rilevi che la propria trasmissione è entrata in collisione con quella di un'altra stazione remota è pari al tempo di andata e ritorno (*round-trip propagation delay*):

$$\text{Tempo Massimo di Rilevazione} = 2\tau \quad (\text{denominato \textbf{Slot di Contesa}})$$

---

## 2. Mezzo Condiviso su Bus e Modalità di Ricezione

Nelle reti con topologia a bus o canale condiviso:
1. Quando una stazione emette una trama sul mezzo fisico, il segnale si propaga in broadcast raggiungendo indifferentemente **tutti i dispositivi connessi** al segmento di rete.
2. Ciascuna scheda di rete (NIC) riceve il segnale ed esamina il campo **Destination MAC Address** dell'intestazione:
   * **Corrispondenza esatta:** se l'indirizzo di destinazione coincide con il proprio indirizzo fisico (o con l'indirizzo di *Broadcast* / *Multicast* abilitato), la NIC accetta e copia il resto della trama, passandola allo stack di rete superiore;
   * **Nessuna corrispondenza:** la NIC scarta immediatamente e silenziosamente il frame, ignorando i dati.
3. **Modalità Promiscua (Promiscuous Mode):**
   * Se la scheda di rete viene esplicitamente configurata in modalità promiscua dal sistema operativo, essa disabilita il filtro hardware sugli indirizzi e copia indiscriminatamente **tutte le trame in transito** sul mezzo condiviso, inoltrandole al software applicativo (modalità utilizzata da analizzatori di rete e *packet sniffer* come Wireshark).

---

## 3. Protocolli di Accesso Multiplo (MAC)

I **Protocolli di Accesso Multiplo (MAC - Medium Access Control)** definiscono l'insieme di regole distribuite con cui i nodi regolano l'accesso e coordinano le trasmissioni sul canale broadcast condiviso.

> **Regola fondamentale:** La coordinazione tra le stazioni deve avvenire utilizzando **lo stesso canale trasmissivo dei dati** (non è disponibile un canale "fuori banda" (*out-of-band*) riservato al controllo).

### Requisiti del Protocollo di Accesso Ideale (Capacità $R$ bps)
Dato un canale broadcast con tasso di trasmissione complessivo pari a $R$ bit al secondo:
1. **Pieno utilizzo con singolo nodo:** Se un solo nodo ha dati da inviare, dispone dell'intero tasso trasmissivo pari a $R$ bps;
2. **Equa suddivisione con più nodi:** Quando $M$ nodi devono trasmettere dati contemporaneamente, ciascuno dispone di un tasso trasmissivo medio pari a:
   $$\text{Throughput per nodo} = \frac{R}{M} \text{ bps}$$
3. **Completamente decentralizzato:** Non devono esistere nodi master (nessun *single point of failure*), non vi è coordinazione centralizzata e non è richiesta la sincronizzazione rigida di tutti i clock interni.

### Tassonomia dei Protocolli MAC

I protocolli di accesso multiplo si classificano in tre grandi famiglie:

```
                  +-----------------------------------+
                  | PROTOCOLLI DI ACCESSO MULTIPLO   |
                  +-----------------------------------+
                                    |
        +---------------------------+---------------------------+
        v                           v                           v
+-------------------+       +-------------------+       +-------------------+
| Suddivisione      |       | Accesso Casuale   |       | A Rotazione       |
| del Canale        |       | (Random Access)   |       | (Taking Turns)    |
| (Partitioning)    |       |                   |       |                   |
| - TDMA            |       | - ALOHA / Slotted |       | - Mappa di Bit    |
| - FDMA            |       | - CSMA (1/non/p)  |       | - Token Ring      |
| - CDMA            |       | - CSMA/CD, CSMA/CA|       | - Polling         |
+-------------------+       +-------------------+       +-------------------+
```

1. **Protocolli a Suddivisione del Canale (Channel Partitioning):** Suddividono la capacità del canale in frazioni indipendenti più piccole allocate staticamente (slot temporali, bande di frequenza, codici ortogonali).
2. **Protocolli ad Accesso Casuale (Random Access):** Il canale non viene suddiviso; ogni nodo trasmette a piena velocità $R$. In caso di collisione, i nodi coinvolti gestiscono il conflitto e ritrasmettono secondo algoritmi probabilistici.
3. **Protocolli a Rotazione (Taking-Turns / Collision-Free):** Ciascun nodo trasmette a turno; i nodi con maggiori volumi di traffico possono ottenere turni più estesi o frequenti.

---

## 4. Protocolli a Suddivisione del Canale: TDMA e FDMA

### 4.1. TDMA (Time Division Multiple Access)
Nel protocollo **TDMA** l'accesso al canale condiviso è regolato mediante la suddivisione del tempo in intervalli ciclici fissi (**frame temporali**), ciascuno suddiviso a sua volta in $N$ sotto-intervalli detti **slot di tempo**:
* A ciascun nodo connesso alla rete è assegnato uno slot dedicato all'interno di ogni frame;
* Durante il proprio slot, il nodo trasmette alla massima velocità del canale;
* Gli slot assegnati a nodi inattivi (che non hanno dati da trasmettere) rimangono rigorosamente vuoti e inutilizzati.

> **Svantaggio di TDMA:** Bassa efficienza a carichi di traffico asimmetrici o ridotti. Se un solo host ha dati da trasmettere, esso è comunque vincolato a utilizzare solo la sua frazione di slot ($R/N$), dovendo attendere inutilmente durante gli slot inattivi degli altri host.

![TDMA: Suddivisione del frame temporale in slot dedicati (slot 1, 3, 4 attivi)](images/reti/fig_p1_xref227_531x79.jpeg)

*Nell'esempio in figura:* il frame è diviso in 6 slot; gli slot $1$, $3$ e $4$ contengono pacchetti attivi, mentre gli slot $2$, $5$ e $6$ rimangono inattivi e sprecati.

---

### 4.2. FDMA (Frequency Division Multiple Access)
Nel protocollo **FDMA** la larghezza di banda totale dello spettro del canale condiviso viene suddivisa in bande di frequenza indipendenti (canali logici) separate da bande di guardia:
* A ciascuna stazione viene assegnata in modo permanente o semi-permanente una specifica banda di frequenza;
* Attraverso opportuni circuiti di modulazione, il segnale in banda base della stazione viene traslato sulla frequenza portante assegnata, consentendo trasmissioni continue e simultanee;
* Analogamente al TDMA, se una stazione non ha traffico da generare, la relativa banda spettrale rimane completamente inutilizzata.

![FDMA: Canale a divisione di frequenza con bande allocate nel tempo](images/reti/fig_p1_xref228_595x193.jpeg)

*Nell'esempio in figura:* le bande di frequenza $1$, $3$ e $4$ sono attive e trasmettono dati nel dominio del tempo, mentre le bande $2$, $5$ e $6$ risultano inattive.

---

### 4.3. Protocolli Ibridi (FDMA + TDMA)
Numerosi standard di telecomunicazione (come le reti cellulari GSM) combinano entrambe le tecniche: la banda complessiva viene inizialmente suddivisa in molteplici canali di frequenza distinti (**FDMA**), e ciascun canale di frequenza viene a sua volta suddiviso nel tempo in slot ciclici (**TDMA**).

---

## 5. Protocolli ad Accesso Casuale (Random Access)

Nei protocolli ad accesso casuale:
* Quando un nodo dispone di un pacchetto, trasmette sempre alla **massima velocità consentita dal canale** ($R$ bps);
* Non vi è alcuna pianificazione o coordinamento a priori tra i nodi;
* Se due o più nodi trasmettono nello stesso intervallo, si genera inevitabilmente una collisione.

Un protocollo ad accesso casuale definisce quindi:
1. **Come rilevare la presenza di una collisione** (*Collision Detection*);
2. **Come ritrasmettere il pacchetto dopo la collisione** (*Collision Resolution & Backoff*).

Tra i principali protocolli troviamo: **Pure ALOHA**, **Slotted ALOHA**, **CSMA**, **CSMA/CD** e **CSMA/CA**.

---

## 6. Slotted ALOHA

Nel modello **Slotted ALOHA**:
* Tutti i pacchetti hanno dimensione costante pari a $L$ bit;
* Il tempo è scandito in intervalli discreti detti **slot**, ciascuno di durata $T = L/R$ (dove $T$ deve essere almeno pari al tempo di trasmissione e propagazione, $T \ge 2\tau$);
* Tutti i nodi sono perfettamente sincronizzati e possono iniziare la trasmissione **esclusivamente all'inizio di uno slot temporale**.

### Funzionamento
1. Quando a un nodo giunge un nuovo pacchetto dallo strato superiore, attende l'inizio dello slot successivo ed emette il frame;
2. **Esito positivo:** se nessun altro nodo trasmette nello stesso slot, non si verifica alcuna collisione: il frame è consegnato con successo e il nodo può trasmettere un eventuale nuovo pacchetto allo slot successivo;
3. **Collisione:** se due o più nodi trasmettono nello stesso slot, essi rilevano la collisione prima della fine dello slot. Ciascun nodo ritrasmette il pacchetto in ogni slot successivo con una probabilità $p$ (oppure attende con probabilità $1-p$) finché la trasmissione non va a buon fine.

![Slotted ALOHA: Sequenza temporale di slot con Collisione (C), Vuoti (E) e Successo (S)](images/reti/fig_p1_xref230_579x160.jpeg)

* **Vantaggi:** Un singolo nodo attivo può trasmettere continuativamente alla piena velocità $R$; architettura altamente decentralizzata e logica estremamente semplice.
* **Svantaggi:** Frazione non trascurabile di slot sprecata a causa delle collisioni, e altri slot lasciati vuoti per mancata trasmissione.

### Analisi di Efficienza di Slotted ALOHA
L'efficienza è definita come la frazione di slot temporali utili (in cui avviene una trasmissione con successo) in presenza di $N$ nodi attivi:
* La probabilità che un dato nodo trasmetta con successo è:
  $$P(\text{successo di un nodo}) = p(1-p)^{N-1}$$
* La probabilità che uno slot contenga una trasmissione riuscita tra tutti gli $N$ nodi è:
  $$P(\text{slot con successo}) = N \cdot p(1-p)^{N-1}$$
* Massimizzando l'espressione per $p = 1/N$ e calcolando il limite per un elevato numero di stazioni ($N \to \infty$):

$$\text{Efficienza Massima (Slotted ALOHA)} = \lim_{N \to \infty} \left(1 - \frac{1}{N}\right)^{N-1} = \frac{1}{e} \approx 0.368 \quad (\mathbf{37\%})$$

Nel caso migliore, al massimo il **37%** del tempo del canale compie lavoro utile.

---

## 7. Pure ALOHA (ALOHA Puro)

Il protocollo **Pure ALOHA** (sviluppato all'Università delle Hawaii da Norman Abramson) è concettualmente più semplice ma **completamente asincrono** (non sincronizzato in slot):
* Quando un nodo riceve un pacchetto, lo trasmette **immediatamente** sul canale condiviso senza attendere.
* Se un pacchetto entra in collisione, il nodo attende un tempo casuale e ritrasmette.

### Finestra di Vulnerabilità
Poiché non vi è sincronizzazione, un pacchetto trasmesso all'istante $t_0$ con durata di trasmissione $T$ subirà una collisione se qualsiasi altro nodo inizia a trasmettere nell'intervallo temporale:

$$\text{Intervallo di Vulnerabilità} = [t_0 - T, \, t_0 + T] \quad (\text{durata complessiva: } 2T)$$

Dato che la finestra di vulnerabilità è raddoppiata rispetto a Slotted ALOHA, la probabilità di collisione è molto più alta:

$$\text{Efficienza Massima (Pure ALOHA)} = \frac{1}{2e} \approx 0.184 \quad (\mathbf{18\%})$$

Nel caso ottimale, appena il **18%** della capacità del canale è effettivamente impiegato per trasmissioni riuscite.

---

## 8. Famiglia CSMA (Carrier Sense Multiple Access)

I protocolli **CSMA** introducono il principio fondamentale del **Listen Before Talk (LBT)**: *ascoltare prima di parlare*.

* Prima di iniziare a trasmettere, il nodo si pone in ascolto del canale (**Carrier Sense** / Rilevazione della portante, verificabile ad es. tramite transizioni nella codifica Manchester):
  * Se il canale è rilevato **libero**, il nodo inizia a trasmettere il pacchetto;
  * Se il canale è rilevato **occupato** (un'altra stazione sta già trasmettendo), il nodo desiste e rimanda la trasmissione.

```
       Nodo A                                            Nodo B
         |                                                 |
         | == Inizio TX (t=0) ==========================>  |
         |   Segnale in propagazione...                    |
         |                      <=== Ascolto canale (t=t1) | (Canale sembra libero!)
         |                                                 | == Inizio TX (t=t1) =>
         |                                                 |        |
         | <============ COLLISIONE SUL CAVO =============>| <======+
```

### Perché si Verificano Collisioni in CSMA?
La causa primaria delle collisioni in CSMA è il **ritardo di propagazione non nullo** del segnale sul mezzo fisico:
* Se la stazione $A$ inizia a trasmettere al tempo $t_0$, il fronte d'onda del suo segnale impiega un tempo $\tau$ per raggiungere la stazione remota $B$.
* Se la stazione $B$ intende trasmettere all'istante $t_0 + \epsilon$ (con $\epsilon < \tau$) ed effettua il carrier sense, percepirà il canale ancora ingannevolmente libero e inizierà a trasmettere.
* I due segnali collidono inevitabilmente sul canale.
* **Regola:** Maggiore è il ritardo di propagazione (cioè maggiore è la lunghezza fisica del canale), più elevata sarà la probabilità che si verifichino collisioni.
* Inoltre, se due stazioni desiderano trasmettere mentre una terza sta occupando il canale, entrambe attenderanno la fine della trasmissione corrente e tenteranno di trasmettere nello stesso istante, generando una collisione certa.

---

### 8.1. Varianti di Persistenza in CSMA

![Diagrammi di flusso comparativi tra CSMA 1-persistente e CSMA non persistente](images/reti/fig_p1_xref232_698x313.png)

#### CSMA 1-Persistente
* Se il canale è libero $\to$ trasmette immediatamente con probabilità $p = 1$;
* Se il canale è occupato $\to$ continua ad ascoltare ininterrottamente (*in loop*); non appena il canale torna libero, trasmette all'istante;
* Se si verifica una collisione $\to$ attende un tempo casuale e ricomincia da capo.
* **Vantaggi/Svantaggi:** Riduce al minimo i tempi morti a basso carico e non richiede sincronizzazione; tuttavia, se due nodi attendono la fine della stessa trasmissione, collidono sistematicamente al rilascio del mezzo.

#### CSMA Non-Persistente
* Se il canale è libero $\to$ trasmette immediatamente;
* Se il canale è occupato $\to$ **non rimane in ascolto continuo**, ma programma un'attesa casuale (*random delay*) e ricontrolla lo stato del canale solo al termine di tale intervallo;
* **Vantaggi/Svantaggi:** Aumenta notevolmente l'efficienza globale del canale ad alto carico poiché riduce drasticamente le collisioni simultanee; tuttavia, a carico elevato il tempo di attesa medio può crescere sensibilmente (*latenza variabile*).

#### CSMA $p$-Persistente
Si applica su canali suddivisi in slot temporali:
* Se il canale è rilevato libero:
  * Trasmette con probabilità $p$;
  * Rimanda l'ascolto allo slot successivo con probabilità $1 - p$;
* Se al successivo slot il canale è ancora libero, ripete il test con probabilità $p$;
* Se il canale torna occupato, si comporta come se fosse avvenuta una collisione (attende un tempo casuale).
* **Comportamento:** Per piccoli valori di $p$ cresce l'efficienza ad alto carico ma sale il ritardo; per alti valori di $p$ le prestazioni decadono rapidamente all'aumentare del numero di stazioni.

---

## 9. CSMA/CD (Carrier Sense Multiple Access with Collision Detection)

Il protocollo **CSMA/CD** (utilizzato nelle reti Ethernet su cavo coassiale e hub) perfeziona il meccanismo CSMA aggiungendo la rilevazione in tempo reale della collisione durante la trasmissione stessa.

Opera secondo tre principi cardine:
1. **Carrier Sense (*Listen Before Talking*):** La stazione ascolta il bus prima di iniziare la trasmissione e trasmette solo se il mezzo è inattivo;
2. **Collision Detection (*Listen While Talking*):** Durante l'intera durata della trasmissione, la stazione continua a campionare il segnale presente sul mezzo, confrontandolo istante per istante con il segnale emesso dal proprio trasmettitore. Se i due segnali differiscono, rileva l'avvenuta collisione;
3. **Multiple Access:** Condivisione distribuita e paritetica del canale da parte di tutti i nodi.

```
       Stazione A (TX)                                   Stazione B (TX)
             |                                                 |
             | === TX Frame ====>                     <=== TX Frame ===
             |                  \                     /        |
             |                   \=== COLLISIONE ====/         |
             |                            |                    |
             | <--- Eco Collisione -------+------- Eco Coll. ->|
             | [Rileva Collisione!]             [Rileva Coll.!] |
             | [Invia JAMMING (32/48 bit)]      [Invia JAMMING] |
             | [Interrompe TX Dati]             [Interrompe TX] |
             | [Attesa Backoff Casuale]         [Attesa Backoff]|
```

### Gestione della Collisione e Sequenza di Jamming
* Non appena una stazione rileva una collisione, **interrompe immediatamente la trasmissione dei dati utili** per non sprecare ulteriore tempo di canale.
* Emette immediatamente una **sequenza di jamming** (un segnale di disturbo deliberato di 32 o 48 bit ad alta energia) per garantire che tutte le stazioni collegate al bus percepiscano inequivocabilmente la collisione.
* Ciascuna stazione coinvolta interrompe le proprie attività, incrementa il contatore delle collisioni e programma un nuovo tentativo di trasmissione dopo un tempo casuale calcolato tramite l'algoritmo di **Binary Exponential Backoff** (fino a un massimo di 16 tentativi consecutivi).

---

## 10. Protocolli a Rotazione e Collision-Free (Senza Collisioni)

I protocolli **Collision-Free** impiegano una logica deterministica basata su prenotazione o passaggio del turno per eliminare alla radice il rischio di collisioni.

### 10.1. Protocollo a Mappa di Bit (Bit-Map Protocol)
* Il tempo è suddiviso in cicli composti da una fase di contesa/prenotazione e una fase di trasmissione dati;
* Durante la fase di contesa, ciascuna delle $N$ stazioni dispone di uno slot da 1 bit numerato da $0$ a $N-1$:
  * La stazione $i$ imposta il suo bit a `1` se desidera trasmettere un frame nel ciclo corrente, oppure a `0` se non ha dati;
* Al termine della scansione degli $N$ bit, tutti i nodi sanno esattamente quali stazioni devono trasmettere;
* I frame vengono trasmessi ordinatamente in sequenza uno alla volta senza alcuna contesa;
* **Valutazione:** A basso carico l'efficienza è modesta (ogni stazione deve attendere comunque gli $N$ bit di contesa); a carico massimo l'efficienza tende al 100% comportandosi come un TDM dinamico.

---

### 10.2. Protocollo Token Ring (Passaggio del Gettone - IEEE 802.5)
Nelle reti con topologia ad anello (*Token Ring*):
* Sull'anello circola ininterrottamente una speciale sequenza di controllo a livello di bit denominata **Token** (o *Gettone*);
* Quando tutte le stazioni sono inattive, il token circola liberamente da un nodo all'altro;
* **Trasmissione:** Quando una stazione deve trasmettere un frame:
  1. Cattura il token non appena transita sulla sua interfaccia;
  2. Modifica un bit nel byte di controllo d'accesso (*Access Control Byte*) trasformando il token in inizio di trama;
  3. Accoda i propri dati e invia il frame completo lungo l'anello;
  4. Il frame percorre l'anello: il nodo destinatario ne copia il contenuto e imposta i bit di conferma;
  5. Il frame ritorna al mittente, che lo rimuove fisicamente dall'anello e rimette in circolazione un nuovo token libero.
* **Vincolo dimensionale:** La dimensione fisica dell'anello (in termini di ritardo di propagazione e bit memorizzati nei registri delle stazioni) deve essere sufficiente a contenere l'intera sequenza di bit del token.

---

## 11. Tabella Comparativa dei Protocolli di Accesso Multiplo

| Famiglia | Protocollo | Sincronizzazione | Efficienza a Basso Carico | Efficienza ad Alto Carico | Rischio Collisioni |
|---|---|---|---|---|---|
| **Suddivisione** | **TDMA / FDMA** | Rigida (slot/frequenze) | Bassa ($R/N$) | Alta (se tutti attivi) | Nullo ($0\%$) |
| **Casuale** | **Pure ALOHA** | Nessuna (asincrono) | Bassa (rapido ma instabile) | Pessima ($\le 18\%$) | Molto Alto |
| **Casuale** | **Slotted ALOHA** | Su slot di tempo | Discreta | Bassa ($\le 37\%$) | Alto |
| **Casuale** | **CSMA 1-pers.** | Nessuna | Ottima (ritardo minimo) | Bassa (molte collisioni) | Medio |
| **Casuale** | **CSMA non-pers.**| Nessuna | Discreta | Buona | Basso |
| **Casuale** | **CSMA/CD** | Nessuna | Ottima | Molto Alta (con backoff) | Rilevate e risolte subito |
| **Rotazione** | **Token Ring** | Turno con Token | Bassa (attesa gettone) | Eccellente (senza contesa) | Nullo ($0\%$) |

---


<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- SEZIONE: 06 - Data Link LAN (Ethernet).md -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

# Capitolo 6 – Data Link LAN (Ethernet)

> **Corso di Reti di Calcolatori** — Architettura IEEE 802, Sottolivelli LLC e MAC, Standard Ethernet (IEEE 802.3)

---

## 1. Il Progetto e lo Standard IEEE 802

All'inizio degli anni '80, con la rapida diffusione e frammentazione delle prime tecnologie di rete locale (**LAN** - *Local Area Network*) e metropolitana (**MAN** - *Metropolitan Area Network*), quali ARCnet, Ethernet e Token Ring, l'istituto internazionale **IEEE** (*Institute of Electrical and Electronics Engineers*) promosse il **Progetto IEEE 802** con l'obiettivo di definire un'architettura di standardizzazione unificata per i Livelli Fisico (Livello 1) e Data Link (Livello 2).

A tal fine furono istituiti appositi comitati di studio:

| Comitato IEEE | Denominazione Ufficiale | Descrizione e Ambito Tecnologico |
|---|---|---|
| **IEEE 802.1** | *Overview, Architecture, Bridging & Management* | Architettura generale di rete, gestione del collegamento, bridging, algoritmi Spanning Tree (STP) e VLAN (802.1Q). |
| **IEEE 802.2** | *Logical Link Control (LLC)* | Controllo logico del collegamento, interfaccia universale verso lo strato di rete. |
| **IEEE 802.3** | *CSMA/CD (Ethernet)* | Standard per reti LAN ad accesso casuale con rilevazione di collisione (Ethernet su bus coassiale, doppino UTP e fibra). |
| **IEEE 802.4** | *Token Bus* | Reti a bus con passaggio del gettone (*Token*) ad anello logico (applicazioni industriali). |
| **IEEE 802.5** | *Token Ring* | Reti ad anello con passaggio deterministico del gettone (architettura IBM). |
| **IEEE 802.6** | *MAN - DQDB (Distributed Queue Dual Bus)* | Standard per reti metropolitane con doppio bus e coda distribuita. |

---

## 2. Suddivisione del Data Link: Sottolivelli LLC e MAC

L'innovazione fondamentale introdotta dal modello IEEE 802 risiede nel principio che le reti locali devono **offrire un'interfaccia uniforme e standardizzata verso il livello di rete (Network Layer - IP)**, pur poggiando su tecnologie fisiche e meccanismi di accesso al mezzo radicalmente differenti.

Per raggiungere questo scopo, il Data Link Layer è formalmente scisso in due sottolivelli gerarchici:

```
+-------------------------------------------------------------+
|                  LIVELLO DI RETE (IP, IPv6)                 |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
|   Sottolivello LLC (Logical Link Control - IEEE 802.2)      |
|   - Interfaccia unificata verso il Network Layer            |
|   - Numerazione, controllo di flusso e riscontri (opzionale)|
+-------------------------------------------------------------+
|   Sottolivello MAC (Media Access Control)                   |
|   - Specifico per ciascuna tecnologia (802.3, 802.5, 802.11)|
|   - Gestione accesso al mezzo condiviso                     |
|   - Indirizzamento fisico a 48 bit (MAC Address)            |
|   - Framing hardware e rilevazione errori (CRC)             |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
|                       LIVELLO FISICO                        |
|   (10BASE-T, 100BASE-TX, 1000BASE-T, Fibra Ottica, Radio)  |
+-------------------------------------------------------------+
```

### Funzionamento e Flusso Informativo
1. **In trasmissione:** Lo strato di rete consegna il datagramma al sottolivello **LLC**, che vi applica un proprio header contenente informazioni di controllo di flusso, numerazione e protocollo superiore. Successivamente, l'LLC passa la PDU (*Protocol Data Unit*) al sottolivello **MAC**, il quale aggiunge l'header MAC (indirizzi sorgente e destinazione), esegue il framing secondo le proprie specifiche e passa i bit al livello fisico.
2. **In ricezione:** Il sottolivello MAC cattura il frame dal mezzo, verifica l'integrità tramite CRC, ne rimuove l'header/trailer fisico e lo consegna al sottolivello LLC, che a sua volta rimuove l'header di controllo e passa il datagramma al corretto processo del livello di rete.
3. **Compito primario dell'LLC:** Mascherare integralmente allo strato di rete le differenze implementative dei sottostanti protocolli MAC (Ethernet, Wi-Fi, Token Ring), fornendo alle applicazioni uno strato astratto e uniforme.

---

## 3. Il Sottolivello MAC (Media Access Control)

Il sottolivello **MAC** è strettamente legato al livello fisico e risolve le problematiche derivanti dalla condivisione del mezzo trasmissivo di tipo broadcast.

L'operatività su canale broadcast introduce due requisiti essenziali:
1. **In fase di trasmissione (Arbitraggio del Canale):** È indispensabile verificare che il canale sia inattivo prima di trasmettere e comporre eventuali conflitti tra stazioni concorrenti. Gli algoritmi di controllo (contesa, token, round-robin, prenotazione) devono essere **completamente distribuiti**, operando su apparati autonomi e paritetici senza dipendere da un nodo master.
2. **In fase di ricezione (Indirizzamento e Filtraggio):** Poiché ogni segnale trasmesso raggiunge indistintamente tutti i nodi, occorre determinare chi sia il reale destinatario e quale nodo abbia generato la trama. Questo si ottiene tramite gli **indirizzi MAC** (inseriti nella *MAC-PDU*), trasformando la comunicazione broadcast in:
   * **Unicast (Punto-a-Punto):** L'indirizzo di destinazione fa riferimento a una singola scheda di rete specifica;
   * **Multicast (Punto-Gruppo):** L'indirizzo fa riferimento a un gruppo logico selezionato di stazioni;
   * **Broadcast:** L'indirizzo indica la totalità delle stazioni connesse al segmento di rete.

### Topologia e Modalità di Broadcast
* **Topologia a Bus:** Il broadcast avviene a livello **fisico ed elettrico** (il segnale si irradia contemporaneamente lungo l'intero cavo conduttore);
* **Topologia ad Anello (Ring):** Il broadcast è di tipo **logico** (il frame viene rigenerato e ritrasmesso punto-a-punto da ciascun nodo fino a compiere il giro completo).

> **Affidabilità nelle Reti Locali (LAN):**
> I canali fisici delle reti locali presentano tassi di errore intrinseci estremamente bassi. Per questa ragione, a livello MAC **non si implementano meccanismi di riscontro (ACK) né di ritrasmissione** (il MAC è sempre di tipo *connectionless non affidabile*). Qualora un'applicazione richieda garanzie di consegna, l'onere dell'affidabilità è delegato all'LLC o ai livelli superiori (es. protocollo TCP).

---

## 4. Indirizzamento MAC vs Indirizzamento IP

Ciascuna interfaccia di rete possiede due diversi livelli di indirizzamento:

```
+-------------------------------------------------------------------------------+
| Indirizzo MAC (Livello 2): 48 bit (6 Byte)                                    |
| [  OUI (24 bit) - Produttore  ] [  Numero Seriale Scheda (24 bit)  ]          |
| Esempio: 00:1A:2B:3C:4D:5E                                                    |
+-------------------------------------------------------------------------------+
| Indirizzo IP (Livello 3): 32 bit (IPv4)                                       |
| [     Prefisso di Rete (Network ID)     ] [     Identificativo Host     ]     |
| Esempio: 192.168.1.100                                                        |
+-------------------------------------------------------------------------------+
```

| Proprietà | Indirizzo MAC (Fisico / Livello 2) | Indirizzo IP (Logico / Livello 3) |
|---|---|---|
| **Dimensione** | **48 bit (6 byte)** | **32 bit (IPv4)** o **128 bit (IPv6)** |
| **Struttura** | **Piatta / Orizzontale** (non gerarchica) | **Gerarchica** (prefisso di rete + host ID) |
| **Assegnazione** | Hardware permanente (BIA - *Burned-In Address*) impresso nella ROM della scheda dal costruttore. | Software/dinamica (configurazione statica o DHCP) in base alla sottorete logica. |
| **Mobilità** | **Non varia** con gli spostamenti geografici o fisici del dispositivo. | **Varia e viene riassegnato** quando il dispositivo si sposta in un'altra sottorete. |
| **Univocità** | Globale a livello mondiale (gestita dall'IEEE). | Univoca all'interno del dominio di instradamento (Internet / Intranet). |

---

## 5. Risoluzione degli Indirizzi: Il Protocollo ARP

Poiché l'instradamento di livello 3 si basa sugli indirizzi IP mentre l'effettiva consegna su link locale richiede gli indirizzi MAC, si pone il problema:
> *«Come può un nodo sorgente determinare l'indirizzo MAC del destinatario $B$ se conosce soltanto il suo indirizzo IP?»*

La soluzione è affidata al protocollo **ARP (Address Resolution Protocol)**. Ciascun nodo IP (host o router) collegato alla LAN mantiene nella propria memoria una **Tabella ARP (ARP Cache)** contenente le mappature attive:

$$\text{Voce ARP} = \langle \text{Indirizzo IP}, \; \text{Indirizzo MAC}, \; \text{TTL} \rangle$$

* **TTL (Time To Live):** È il contatore temporale di scadenza associato a ciascuna voce (valore tipico: **20 minuti**). Alla scadenza del TTL, la voce viene eliminata per garantire l'aggiornamento in caso di sostituzione della scheda di rete o cambio di configurazione IP.

---

## 6. Standard IEEE 802.3 ed Evoluzione di Ethernet

Lo standard **Ethernet** nasce storicamente dalle ricerche di Robert Metcalfe al *Xerox PARC* (1973), formalizzato poi come consorzio DIX (DEC, Intel, Xerox) e standardizzato in **IEEE 802.3**.

* **Modalità di accesso originaria:** CSMA/CD con logica 1-persistente a 10 Mbps;
* **Evoluzione Topologica:**
  * **Reti Storiche (Topologia a Bus):** Mezzo passivo in cavo coassiale (10BASE5 Thicknet e 10BASE2 Thinnet) con terminatori di impedenza alle estremità;
  * **Reti Moderne (Topologia a Stella):** Collegamenti punto-punto tramite cavi a doppino intrecciato (*UTP Cat 5e/6/6a*) o fibra ottica attestati a un apparato centrale:
    * **Hub:** Ripetitore a livello fisico (L1) che replica ogni segnale su tutte le porte (unico grande dominio di collisione);
    * **Switch:** Commutatore a livello Data Link (L2) che instrada i frame selettivamente in base alla tabella MAC, isolando i domini di collisione su ciascuna porta e consentendo comunicazioni **Full-Duplex simultanee prive di collisioni**.

---

## 7. Struttura del Frame Ethernet (IEEE 802.3 / Ethernet II)

L'adattatore di rete incapsula il datagramma IP all'interno del frame Ethernet con la seguente struttura di campi:

```
+-----------+-----+-----------+-----------+------+--------------------+---------+
| Preambolo | SFD | Dest MAC  | Src MAC   | Type | Payload Dati (IP)  |   FCS   |
|  7 Byte   | 1 B |  6 Byte   |  6 Byte   | 2 B  |  46 - 1500 Byte    | 4 Byte  |
+-----------+-----+-----------+-----------+------+--------------------+---------+
|<------- 8 Byte ------->|<---------------- 64 - 1518 Byte -------------------->|
```

### Dettaglio dei Singoli Campi del Frame:

1. **Preambolo (Preamble - 7 Byte):**
   * Sequenza di 7 byte costituiti dall'alternanza regolare di bit `10101010` (`0xAA`);
   * Funzione: permette ai circuiti dell'adattatore ricevente di sincronizzare la frequenza di clock con il trasmettitore.
2. **SFD (Start of Frame Delimiter - 1 Byte):**
   * Byte con sequenza `10101011` (`0xAB`); i due bit finali `11` segnalano inequivocabilmente l'inizio dei campi effettivi del frame.
3. **Indirizzo MAC di Destinazione (Destination Address - 6 Byte):**
   * Indirizzo fisico a 48 bit della scheda ricevente (o indirizzo broadcast/multicast).
4. **Indirizzo MAC Sorgente (Source Address - 6 Byte):**
   * Indirizzo fisico a 48 bit della scheda trasmittente.
5. **Campo Tipo / Lunghezza (Type/Length - 2 Byte):**
   * **EtherType (Ethernet II):** Specifica il protocollo di livello 3 trasportato nel campo dati per effettuare il multiplexing/demultiplexing (es. `0x0800` per IPv4, `0x0806` per ARP, `0x86DD` per IPv6);
   * **Length (IEEE 802.3 originale):** Se il valore è $\le 1500$, indica la lunghezza in byte del campo dati.
6. **Campo Dati Utili (Payload - da 46 a 1500 Byte):**
   * Contiene il pacchetto di livello superiore.
   * Dimensione massima: **1500 Byte** (denominata **MTU** - *Maximum Transmission Unit* standard);
   * Dimensione minima: **46 Byte**.
7. **Riempimento (Padding - da 0 a 46 Byte):**
   * Se il pacchetto dati proveniente dal livello di rete è inferiore a 46 byte, viene accodata una sequenza di byte nulli (`0x00`) affinché la dimensione complessiva del campo dati raggiunga esattamente i 46 byte minimi richiesti.
8. **FCS / Checksum CRC (Frame Check Sequence - 4 Byte):**
   * Sequenza di controllo a 32 bit calcolata con algoritmo polinomiale **CRC-32**, che consente al ricevitore di rilevare la corruzione dei bit con elevatissima accuratezza.

### Dimensionamento Complessivo del Frame:
* **Lunghezza Minima (esclusi Preambolo e SFD):** $6 + 6 + 2 + 46 + 4 = \mathbf{64\text{ \textbf{Byte}}}$ ($512\text{ bit}$);
* **Lunghezza Massima (esclusi Preambolo e SFD):** $6 + 6 + 2 + 1500 + 4 = \mathbf{1518\text{ \textbf{Byte}}}$;
* Includendo i gli 8 byte di preambolo e SFD, la dimensione complessiva sul cavo varia tra **72 e 1526 Byte**.

> **Nota storica sulla dimensione massima (1518 Byte):**
> Il vincolo di 1500 byte di payload fu stabilito agli albori dello standard poiché i transceiver e i primi apparati dovevano memorizzare l'intero frame in memorie RAM dedicate, che all'epoca rappresentavano una componente ad altissimo costo.

---

## 8. Struttura dei Bit di Indirizzamento MAC (Bit IG e GL)

Gli indirizzi MAC sono sequenze di 48 bit (6 byte) espresse comunemente in notazione esadecimale (es. `00:50:56:C0:00:08`).

I primi 2 bit del primo byte trasmesso (ovvero i bit più significativi) definiscono le proprietà speciali dell'indirizzo:

```
Primo Byte trasmesso: [ b7 | b6 | b5 | b4 | b3 | b2 | GL | IG ]
```

* **Bit 47 (I/G - Individual / Group):**
  * `0` $\to$ **Indirizzo Individuale (Unicast):** individua un'unica specifica scheda di rete fisica;
  * `1` $\to$ **Indirizzo di Gruppo (Multicast):** individua un insieme logico di stazioni abbonate al servizio;
  * *Indirizzo Broadcast:* sequenza costituita da tutti `1` (`FF:FF:FF:FF:FF:FF`), interpretata come messaggio rivolto a tutte le stazioni del dominio di broadcast.
* **Bit 46 (G/L o U/L - Global / Local):**
  * `0` $\to$ **Indirizzo ad Amministrazione Globale (Universale):** univoco a livello mondiale, garantito dall'assegnazione da parte dell'IEEE dei primi 24 bit (**OUI** - *Organizationally Unique Identifier*) ai costruttori di hardware;
  * `1` $\to$ **Indirizzo ad Amministrazione Locale:** configurato manualmente dall'amministratore di rete locale (sovrascrivendo l'OUI di fabbrica).

---

## 9. Perché Esiste una Lunghezza Minima del Frame (64 Byte)?

La necessità di imporre una lunghezza minima di 64 byte per i frame Ethernet è una conseguenza diretta del meccanismo **CSMA/CD** (*Collision Detection*).

Per assicurare che una stazione rilevi con certezza una collisione sul cavo, essa deve **continuare a trasmettere il frame per un tempo almeno pari al tempo di andata e ritorno massimo del segnale** (**Slot Time** $= 2\tau$):

$$T_{\text{tx}} \ge 2\tau \implies \frac{L_{\text{min}}}{R} \ge 2\tau \implies L_{\text{min}} \ge 2\tau \cdot R$$

Dove:
* $R = 10\text{ Mbps} = 10^7\text{ bit/s}$ (velocità nominale di Ethernet standard);
* $2\tau = 51.2\,\mu\text{s}$ (tempo massimo di round-trip considerando la lunghezza massima del cavo coassiale di 2.5 km e 4 ripetitori).

Calcolando la dimensione minima:

$$L_{\text{min}} = (10 \times 10^6\text{ bit/s}) \times (51.2 \times 10^{-6}\text{ s}) = 512\text{ bit} = \mathbf{64\text{ \textbf{Byte}}}$$

> **Cosa accadrebbe se il frame fosse inferiore a 64 Byte?**
> Se una stazione trasmettesse un frame troppo corto, la trasmissione terminerebbe prima che il fronte d'onda riflesso della collisione possa raggiungere la stazione sorgente. La stazione riterrebbe erroneamente la trasmissione riuscita con successo, provocando la perdita irreversibile e non rilevata del pacchetto.

---

## 10. Algoritmo di Binary Exponential Back-Off

L'algoritmo di **Binary Exponential Back-Off** è il meccanismo impiegato da CSMA/CD per determinare l'intervallo di attesa pseudo-casuale che una stazione deve osservare prima di ritentare la trasmissione a seguito di una collisione.

Lo slot temporale unitario di contesa è convenzionalmente posto pari a:
$$\text{Slot Time} = 2\tau = 51.2\,\mu\text{s} \quad (512\text{ tempi di bit})$$

### Procedimento di Calcolo:
Al verificarsi dell'$k$-esima collisione consecutiva per lo stesso frame (con $1 \le k \le 16$):
1. Si calcola l'esponente di backoff:
   $$m = \min(k, 10)$$
2. Si estrae un numero intero casuale $r$ con distribuzione uniforme nell'intervallo discreto:
   $$r \in [0, \, 2^m - 1]$$
3. La stazione attende un tempo complessivo prima di ritentare il carrier sense pari a:
   $$T_{\text{wait}} = r \times \text{Slot Time} = r \times 51.2\,\mu\text{s}$$

| N. Collisione ($k$) | Esponente ($m$) | Intervallo di Scelta ($r$) | Possibili Valori di $r$ |
|---|---|---|---|
| **$1^{\text{a}}$ collisione** | $1$ | $[0, 2^1 - 1] = [0, 1]$ | $0$ oppure $1$ slot |
| **$2^{\text{a}}$ collisione** | $2$ | $[0, 2^2 - 1] = [0, 3]$ | $\{0, 1, 2, 3\}$ slot |
| **$3^{\text{a}}$ collisione** | $3$ | $[0, 2^3 - 1] = [0, 7]$ | $\{0, 1, \dots, 7\}$ slot |
| **$4^{\text{a}}$ collisione** | $4$ | $[0, 2^4 - 1] = [0, 15]$ | $\{0, 1, \dots, 15\}$ slot |
| ... | ... | ... | ... |
| **$10^{\text{a}}$ collisione** | $10$ | $[0, 2^{10} - 1] = [0, 1023]$ | $\{0, 1, \dots, 1023\}$ slot |
| **$11^{\text{a}} - 16^{\text{a}}$ coll.** | $10$ (congelato) | $[0, 1023]$ | $\{0, 1, \dots, 1023\}$ slot |

### Esito e Gestione degli Errori:
* La stazione che estrae il valore di $r$ più basso vince la contesa e trasmette per prima.
* Se si verificano **16 collisioni consecutive** ($k = 16$), il trasmettitore abbandona definitivamente il tentativo di invio e segnala un errore critico di trasmissione (*Transmission Failure*) allo strato superiore.
* In condizioni di saturazione sistematica, l'unica soluzione architetturale consiste nel **ridurre la dimensione del dominio di collisione** (es. segmentando la rete con switch dedicati).

---

## 11. Prestazioni Globali di Ethernet

Il comportamento prestazionale di Ethernet varia dinamicamente in base alle condizioni di carico:
* **A basso carico:** Ethernet opera con logica **1-persistente**: il ritardo di accesso è praticamente nullo e il canale viene acquisito istantaneamente senza attese superflue;
* **Ad alto carico:** Grazie all'algoritmo di **Exponential Back-Off**, l'intervallo temporale di estrazione si dilata progressivamente in funzione del numero di collisioni; la rete si adegua automaticamente comportandosi di fatto come un protocollo **$p$-persistente** con valore di $p$ dinamicamente decrescente all'aumentare della congestione, garantendo la stabilità complessiva del sistema.

---


<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- SEZIONE: 07 - Data Link WLAN (Wireless LAN).md -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

# Capitolo 7 – Data Link WLAN (Wireless LAN)

> **Appunti del Corso di Reti di Calcolatori**  
> Argomenti: Tecnologie Ethernet (10Base5, 10Base2, 10Base-T, 100Base-TX/FX), Wireless LAN (IEEE 802.11), Architetture BSS/ESS, Livello Fisico (FHSS, DSSS, DRS), Protocollo di Accesso al Mezzo CSMA/CA, Problemi dei Nodi Nascosti ed Esposti, Meccanismo di Riserva RTS/CTS, CSMA/CAW.

---

## 1. Tecnologie Ethernet ed Evoluzione del Mezzo Fisico

Le prestazioni e l'efficienza del protocollo Ethernet a livello Data Link dipendono fortemente da due fattori:
1. **Numero di stazioni collegate** al dominio condiviso.
2. **Dimensione media dei frame** trasmessi.

Con frame di piccole dimensioni, Ethernet tende a comportarsi bene in termini di latenza di contesa, ma produce uno scarso rendimento nell'uso del mezzo trasmissivo a causa dell'incidenza percentuale dell'overhead (preambolo, header, inter-frame gap).

### 1.1 Evoluzione degli Standard Ethernet

L'insieme dei protocolli Ethernet domina il mercato delle reti locali (LAN). La velocità di trasmissione è evoluta significativamente nel tempo, passando dai $10\text{ Mbit/s}$ originari su cavo coassiale fino a $10\text{ Gbit/s}$ (e oltre), spaziando da trasmissioni nel dominio elettrico a trasmissioni su fibra ottica, conservando tuttavia la medesima struttura logica di trama a livello MAC. L'adattabilità a diversi standard trasmissivi è stata resa possibile proprio dalla netta separazione tra il sottolivello MAC e il sottolivello fisico (PHY).

* **Codifica di linea:** lo standard Ethernet originale a $10\text{ Mb/s}$ e $100\text{ Mb/s}$ utilizza la **codifica Manchester** con segnali a $+0.85\text{ V}$ e $-0.85\text{ V}$ (altri protocolli, come Token Ring, adottano la codifica Manchester differenziale).
* **Evoluzione della topologia fisica:** nelle prime versioni a bassa velocità, la rete si basava su un **bus fisico con cavo coassiale condiviso**. Questa struttura presentava forti criticità operative: l'inserimento o la rimozione di una stazione richiedeva l'interruzione fisica del cavo, bloccando l'intera rete. Per superare tale limite, Ethernet è stata reingegnerizzata: anziché condividere un unico cavo continuo, ogni stazione è dotata di un proprio cavo dedicato collegato a un dispositivo centrale (**Hub** o **Switch**) che realizza una **topologia a stella fisica con bus logico condiviso**.

```
   Topologia a Bus (Coassiale)                  Topologia a Stella (Hub/Switch)
   
   +---+      +---+      +---+                  +---+       +---+       +---+
   | A |      | B |      | C |                  | A |       | B |       | C |
   +-+-+      +-+-+      +-+-+                  +-+-+       +-+-+       +-+-+
     |          |          |                      \           |           /
  ===+==========+==========+===                    \          |          /
         Cavo Coassiale Condiviso                 +-----------------------+
                                                  |   HUB / SWITCH (PHY)  |
                                                  +-----------------------+
```

### 1.2 Principali Standard Trasmissivi su Cavo

| Standard | Nome Comune | Mezzo Fisico | Max Distanza | Topologia | Codifica / Note |
|---|---|---|---|---|---|
| **10Base5** | *Thick Ethernet* | Cavo coassiale spesso ($50\ \Omega$) | $500\text{ m}$ | Bus | Tacche ogni $2.5\text{ m}$; transceiver a perforazione (*vampire tap*). Rischio di rottura del bus. |
| **10Base2** | *Thin Ethernet* | Cavo coassiale sottile RG-58 ($50\ \Omega$) | $185\text{ m}$ | Bus | Connettori a "T" BNC. L'aggiunta di stazioni richiede l'apertura del cavo. |
| **10Base-T** | *Twisted Pair* | 2 coppie doppino UTP Cat 3/5 | $100\text{ m}$ | Stella | Centro stella (Hub/Switch). Limite max 4 ripetitori ($2.5\text{ km}$ max LAN per $2\tau$). |
| **100Base-TX** | *Fast Ethernet* | 2 coppie doppino UTP Cat 5 | $100\text{ m}$ | Stella | Frequenza di clock $125\text{ MHz}$, codifica 4B5B + MLT-3, Full-Duplex ($100\text{ Mb/s}$). |
| **100Base-FX** | *Fast Ethernet Fibra* | 2 fibre ottiche multimodali | $2000\text{ m}$ | Stella/PTP | Una fibra per TX e una per RX; immunità elettromagnetica totale. |

#### Dettagli degli standard:

* **10Base5 (Thick Ethernet):** utilizzava un cavo coassiale rigido di colore giallo. Presentava tacche a intervalli regolari di $2.5\text{ m}$ (distanza minima calcolata per limitare le riflessioni d'onda e garantire il rilevamento affidabile delle collisioni). Il collegamento avveniva tramite *transceiver* esterni collegati con morsetti a perforazione.
* **10Base2 (Thin Ethernet):** introdotto per ridurre costi e rigidità, impiegava un cavo più flessibile e connettori BNC a T. Tuttavia, l'apertura del connettore per inserire un nodo provocava la disconnessione temporanea del segmento e il disadattamento di impedenza.
* **10Base-T e 100Base-T:** rappresentano lo standard moderno basato su **doppino intrecciato (Twisted Pair - T)** con connettori RJ-45:
  * La distanza massima tra stazione e centro stella è rigorosamente pari a $100\text{ m}$.
  * Gli **Hub** fungono da semplici ripetitori di segnale operanti a **Livello Fisico (Layer 1)**: qualsiasi frame in ingresso su una porta viene rigenerato e replicato su tutte le altre porte (*broadcast multi-access*).
  * Tutte le stazioni collegate a un hub appartengono allo **stesso dominio di collisione**.
  * Regola del diametro massimo: esiste un vincolo sul numero massimo di ripetitori in cascata (massimo 4), per non superare l'estensione complessiva di $2.5\text{ km}$ corrispondente al tempo di andata e ritorno $2\tau$; oltre tale distanza la collision detection di CSMA/CD fallisce.
* **Fast Ethernet ($100\text{ Mbit/s}$):** il tempo di bit scende a $10\text{ ns}$. In **100Base-TX** su rame, per superare i limiti di banda della codifica Manchester (che richiede il doppio della frequenza), si adotta la codifica di blocco **4B5B** (4 bit mappati su simboli di 5 bit trasmessi a $125\text{ MHz}$), garantendo transizioni sufficienti per il clock e consentendo il funzionamento in **Full-Duplex** a $100\text{ Mbit/s}$.

![Panoramica delle tecnologie e standard Ethernet (10Base5, 10Base2, 10Base-T, 100Base-TX/FX)](images/reti/fig_p1_xref238_865x550.png)

---

## 2. Wireless LAN (WLAN - IEEE 802.11)

Nelle reti locali tradizionali cablate (LAN), i nodi comunicano mediante schede di rete e cavi fisici dedicati. Le reti **WLAN (Wireless LAN - Local Area Network senza fili)** sono impiegate dove la posa del cablaggio risulta complessa, onerosa o impossibile, sfruttando la propagazione di onde elettromagnetiche su canale radio.

### 2.1 Vantaggi delle Reti WLAN

1. **Mobilità:** l'utente può spostarsi liberamente all'interno dell'area di copertura mantenendo attiva la connessione di rete e l'accesso ai servizi.
2. **Velocità e semplicità di installazione:** non occorre stendere cavi attraverso pareti, canaline o pavimenti galleggianti.
3. **Flessibilità d'installazione:** la tecnologia a radiofrequenza consente di raggiungere aree non cablabili (es. edifici storici, spazi aperti, ambienti industriali temporanei).
4. **Costi ridotti a lungo termine:** i costi di implementazione e riconfigurazione sono inferiori rispetto a una rete cablata soggetta a frequenti ristrutturazioni o spostamenti di postazioni.
5. **Scalabilità:** supportano molteplici topologie modulari, riconfigurabili rapidamente mediante l'aggiunta di Access Point o la modifica dei parametri software.

### 2.2 Spettro Elettromagnetico e Bande ISM

Le reti wireless operano nelle bande non licenziate **ISM (Industrial, Scientific and Medical)**:
* **Banda $2.4\text{ GHz}$:** compresa tra $2.400\text{ GHz}$ e $2.4835\text{ GHz}$.
* **Banda $5\text{ GHz}$:** con maggiore ampiezza di banda e minore affollamento/interferenza.

Per evitare utilizzi abusivi o saturazioni del canale non licenziato, gli organismi normativi (FCC, ETSI) impongono l'uso obbligatorio di tecniche a spettro espanso (**Spread Spectrum**: FHSS o DSSS) per limitare la densità spettrale di potenza emessa.

---

## 3. Architettura delle Reti IEEE 802.11

L'insieme fondamentale di stazioni che implementano il protocollo IEEE 802.11 costituisce un **BSS (Basic Service Set)**.

```
          [ MODALITÀ AD HOC (IBSS) ]                  [ MODALITÀ INFRASTRUTTURA (BSS / ESS) ]
          
              Host A <------> Host B                              Host A          Host B
                ^              ^                                     \              /
                |   (P2P)      |                                      \            /
                v              v                                     +--------------+
              Host C <------> Host D                                 | Access Point | (Centro Stella)
                                                                     +-------+------+
                                                                             |
                                                                   [ Distribution System ]
                                                                             |
                                                                     +-------+------+
                                                                     | Access Point |
                                                                     +--------------+
                                                                      /            \
                                                                     /              \
                                                                   Host C          Host D
```

Lo standard definisce due modalità operative:

### 3.1 Independent Basic Service Set (IBSS - Ad-Hoc Mode)
* Rete paritetica (*peer-to-peer*) priva di infrastruttura centrale: le stazioni comunicano direttamente tra loro.
* Non vi è alcun Access Point di coordinamento.
* **Limite:** una stazione può comunicare con un'altra solo se si trova all'interno del rispettivo raggio di copertura radio diretto.

### 3.2 Infrastructure Basic Service Set (Infrastructure Mode)
* È presente un'infrastruttura fissa coordinata da un centro stella denominato **Access Point (AP)**.
* Tutte le comunicazioni tra stazioni transitano obbligatoriamente attraverso l'Access Point.
* L'AP può essere interconnesso a una dorsale cablata o wireless denominata **Distribution System (DS)**.
* Più BSS interconnessi tramite un DS formano un'unica rete logica estesa denominata **ESS (Extended Service Set)**, consentendo il roaming trasparente delle stazioni mobili tra diversi AP.

---

## 4. Strato Fisico (PHY) e Tecniche Spread Spectrum

Lo strato fisico (PHY) in 802.11 assolve tre compiti principali:
1. Fornire un'interfaccia di scambio frame con il sottolivello MAC per TX e RX dati.
2. Fornire al MAC la segnalazione continua sullo stato del mezzo radio (**Clear Channel Assessment - CCA**).
3. Modulare e trasmettere fisicamente i bit all'interno della banda di frequenza assegnata.

### 4.1 Tecniche Spread Spectrum (Spettro Espanso)

Con la tecnologia *Spread Spectrum*, il segnale viene distribuito su una banda di frequenze molto più ampia di quella strettamente necessaria per la trasmissione dati. Il segnale risultante presenta una bassa densità spettrale di potenza, confondendosi con il rumore termico di fondo (elevata riservatezza e robustezza, originariamente ideata per scopi militari). Inoltre, riduce drasticamente il fenomeno del *delay spread* dovuto alla propagazione su percorsi multipli (*multipath fading*).

```
   Spettro Segnale Tradizionale                  Spettro Segnale Spread Spectrum
   Potenza                                       Potenza
      ^                                             ^
      |     ||| (Picco stretto)                     |
      |    |||||                                    | 
      |   |||||||                                   |  ~~~~~~~~~~~~~~~~~~~~~~~~~ (Segnale diffuso a
      |  |||||||||                                  |  -------------------------  bassa densità)
      +-------------------> Frequenza               +-----------------------------> Frequenza
             Banda                                              Banda Allargata
```

#### A. Frequency Hopping Spread Spectrum (FHSS)
* La trasmissione salta periodicamente tra diverse frequenze all'interno della banda ISM secondo una sequenza pseudo-casuale nota unicamente a trasmettitore e ricevitore.
* **Vantaggi:** elevata sicurezza e forte immunità al *multipath fading* (quando giunge l'eco riflessa ritardata, il ricevitore è già sintonizzato su un canale differente).
* **Svantaggi:** ampiezza di canale limitata a $1\text{ MHz}$, rendendo impossibile l'impiego per connessioni Wi-Fi ad elevato bit-rate.

#### B. Direct Sequence Spread Spectrum (DSSS)
* Ciascun bit dati da trasmettere viene combinato mediante operazione XOR logico con una sequenza di codice ad alta frequenza detta **Chipping Sequence** (es. sequenza di Barker a 11 chip).
* In ricezione, il segnale viene decodificato tramite operazione di correlazione, ricostruendo i dati originari anche in presenza di forti disturbi a banda stretta.
* **Canalizzazione:** la banda dei $2.4\text{ GHz}$ è suddivisa in **14 canali** distanziati di $5\text{ MHz}$, a partire da $2.412\text{ GHz}$ (Canale 1). Poiché ciascun canale DSSS occupa circa $22\text{ MHz}$, per evitare sovrapposizioni e interferenze si utilizzano canali non sovrapposti a distanza di 5 intervalli (tipicamente **1, 6, 11**).
* **Vantaggi:** elevata ridondanza, ottima immunità al rumore; supporta bit-rate standard fino a $11\text{ Mbps}$ (802.11b).

| Parametro | FHSS (Frequency Hopping) | DSSS (Direct Sequence) |
|---|---|---|
| **Meccanismo** | Salto temporale tra frequenze | Moltiplicazione con sequenza di chipping |
| **Banda per Canale** | $1\text{ MHz}$ | $\approx 22\text{ MHz}$ (spaziatura $5\text{ MHz}$) |
| **Sicurezza** | Elevata (sequenza pseudocasuale) | Moderata |
| **Bit-Rate Massimo** | Basso ($1 - 2\text{ Mbps}$) | Elevato ($11\text{ Mbps}$ in 802.11b) |
| **Sensibilità al rumore** | Evita le frequenze disturbate | Tolleranza diffusa tramite guadagno di processo |

### 4.2 Dynamic Rate Shifting (DRS)

Il **Dynamic Rate Shifting (DRS)** è un meccanismo implementato a livello PHY che adatta automaticamente e dinamicamente la velocità di trasmissione in funzione delle condizioni del canale radio (rapporto segnale/rumore - SNR e tasso di errore sui frame).
* All'aumentare della distanza o del rumore, la modulazione passa automaticamente a schemi più robusti ma più lenti (es. da $11\text{ Mbps}$ a $5.5$, $2$, fino a $1\text{ Mbps}$).
* Il processo è completamente trasparente all'utente e ai livelli protocollari superiori.

---

## 5. Controllo di Accesso al Mezzo: CSMA/CA

Nelle reti wireless non è possibile adottare il protocollo CSMA/CD utilizzato su Ethernet cablata per due ragioni fondamentali:
1. **Incapacità di Collision Detection simultanea:** per rilevare una collisione durante la trasmissione, una stazione dovrebbe trasmettere e ricevere contemporaneamente sulla stessa frequenza. Poiché il segnale trasmesso localmente è ordini di grandezza più potente di qualsiasi segnale ricevuto da una stazione remota, il trasmettitore saturerebbe il proprio ricevitore.
2. **Asimmetria spaziale e propagazione:** la collisione deve essere rilevata presso il *ricevitore*, non presso il trasmettitore.

Per queste ragioni, lo standard IEEE 802.11 impiega **CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)**.

### 5.1 Funzionamento del Protocollo CSMA/CA

1. **Carrier Sensing:** la stazione ascolta il canale misurando l'energia a radiofrequenza (*Physical Carrier Sense*) e leggendo la durata dichiarata nei frame (*Virtual Carrier Sense*).
2. **Attesa DIFS:** se il canale viene rilevato libero per un intervallo di tempo almeno pari a **DIFS (Distributed Inter-Frame Space)**, la stazione non trasmette all'istante, ma avvia una procedura di backoff casuale per evitare che stazioni multiple in attesa trasmettano contemporaneamente allo scadere del tempo.
3. **Canale Occupato e Backoff:** se il canale è occupato, la stazione sceglie un tempo di backoff casuale scalato in slot time. Il contatore viene decrementato solo quando il canale è libero.
4. **Riscontro (ACK) e SIFS:** alla corretta ricezione del frame, il destinatario attende un tempo brevissimo denominato **SIFS (Short Inter-Frame Space)**, con $\text{SIFS} < \text{DIFS}$, e invia un frame di riscontro esplicito (**ACK**). La priorità temporale $\text{SIFS} < \text{DIFS}$ garantisce che l'ACK abbia la precedenza assoluta su qualsiasi nuovo tentativo di trasmissione.

```
       Canale Occupato          DIFS         Contesa (Backoff)       Frame Dati
Stazione +--------------------+-------+-----------------------------+-------------------+
                                                                                        | SIFS
Ricevitore                                                                              +-----+-------+
                                                                                              |  ACK  |
                                                                                              +-------+
```

---

## 6. Anomalie del Mezzo Radio: Nodi Nascosti ed Esposti

L'accesso al mezzo condiviso via etere è affetto da problematiche topologiche legate alla portata limitata delle antenne:

### 6.1 Problema della Stazione Nascosta (Hidden Station Problem)

Si considerino tre stazioni $A$, $B$ e $C$, dove $B$ si trova nel raggio di copertura di $A$ e $C$, ma $A$ e $C$ sono reciprocamente fuori portata radio.
* Se $C$ sta trasmettendo dati a $B$, la stazione $A$ ascolta il canale e lo rileva erroneamente libero.
* $A$ inizia a trasmettere verso $B$.
* I due segnali giungono contemporaneamente a $B$, provocando una distruttiva **collisione**.

![Problema della stazione nascosta](images/reti/fig_p1_xref241_341x226.jpeg)

### 6.2 Problema della Stazione Esposta (Exposed Station Problem)

Si consideri la configurazione in cui $B$ si trova nel raggio di copertura di $A$, mentre $C$ si trova fuori dalla portata di $A$.
* Supponiamo che $A$ stia trasmettendo a un'altra stazione $D$ (fuori dalla portata di $B$).
* $B$ desidera trasmettere verso $C$. Ascoltando il canale, $B$ rileva la trasmissione di $A$ e si blocca ingiustificatamente.
* In realtà, la trasmissione da $B$ verso $C$ non creerebbe alcuna interferenza su $D$, sprecando capacità trasmissiva.

![Problema della stazione esposta](images/reti/fig_p1_xref242_346x226.jpeg)

### 6.3 Attenuazione e Fading
Stazioni distanti possono emettere segnali che risultano troppo deboli per essere rilevati reciprocamente tramite carrier sense, ma sufficientemente intensi da sommarsi e corrompere la ricezione presso una stazione intermedia $B$.

---

## 7. Meccanismo di Riserva del Canale: RTS / CTS

Per mitigare le problematiche del nodo nascosto e dell'attenuazione, 802.11 introduce il meccanismo opzionale di riserva preventiva del canale tramite frame di controllo **RTS/CTS**:

```
      Trasmittente A                       Ricevitore B                    Stazione Nascosta C
            |                                   |                                   |
            |---------- RTS (Durata) ---------->|                                   | (Non sente RTS)
            |                                   |                                   |
            |                                   |---------- CTS (Durata) ---------->| (Ascolta CTS)
            |<--------- CTS (Durata) -----------|                                   | Imposta NAV
            |                                   |                                   | [ATTESA SILENTE]
            |========== FRAME DATI =============>|                                   |
            |                                   |                                   |
            |<------------- ACK ----------------|                                   | Scade NAV
            |                                   |                                   | Torna attiva
```

1. **Request to Send (RTS):** il trasmettitore $A$ invia un frame di controllo breve RTS al ricevitore $B$, indicando nel campo *Duration* il tempo totale stimato per completare la trasmissione (RTS + CTS + Dati + ACK + SIFS relativi).
2. **Clear to Send (CTS):** se $B$ è pronto, risponde dopo un SIFS con un frame di controllo CTS, che ripete l'informazione di durata.
3. **Silenziazione dei Nodi Nascosti (NAV):**
   * Tutte le stazioni che ascoltano l'RTS sanno che $A$ trasmetterà.
   * La stazione nascosta $C$, che non ha captato l'RTS di $A$, **ascolta il CTS emesso da $B$** e aggiorna il proprio **NAV (Network Allocation Vector)**, astenendosi da qualsiasi trasmissione per l'intera durata specificata.
4. **Collisione degli RTS:** se due stazioni trasmettono un RTS simultaneamente, i frame di controllo collidono e vanno persi. Non ricevendo il CTS entro un determinato timeout, le stazioni applicano l'algoritmo di **Backoff Esponenziale Binario** e ritentano la trasmissione. Essendo l'RTS molto piccolo rispetto a un frame dati, il costo della collisione risulta trascurabile.

![Scambio di frame di controllo RTS/CTS e trasmissione dati](images/reti/fig_p1_xref243_251x158.jpeg)

---

## 8. Protocollo CSMA/CAW (CSMA per Wireless)

Il protocollo **CSMA/CAW (CSMA per Wireless)** introduce affinamenti per ottimizzare l'efficienza sui canali radio:
* **Stop-and-Wait ACK a Livello 2:** in assenza di riscontro immediato a livello Data Link, i pacchetti persi dovrebbero essere recuperati dai meccanismi di trasporto a livello 4 (TCP), introducendo ritardi elevatissimi. L'introduzione dell'ACK a livello 2 riduce drasticamente i tempi di ripristino.
* **Inibizione RTS concorrenti:** impiego del Carrier Sense per inibire l'emissione di un RTS se è già in corso un altro RTS verso la medesima cella.
* **Backoff differenziato:** applicazione di finestre di backoff indipendenti e separate per i diversi flussi di traffico.

---


<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- SEZIONE: 08 - Data Link LAN (Switching).md -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

# Capitolo 8 – Data Link LAN (Switching)

> **Appunti del Corso di Reti di Calcolatori**  
> Argomenti: Apparati di Rete (Hub, Bridge, Switch), Algoritmo di Backward Learning, Architetture Interne e Tecnologie di Switching (Shared Memory, Bus, Crossbar, MIN), Topologie Ridondanti e Anomalie dei Loop L2, Spanning Tree Protocol (STP IEEE 802.1D), Virtual LAN (VLAN), Trunking e Tagging (ISL, IEEE 802.1Q), VTP Domain, Routing Inter-VLAN (Router-on-a-Stick e Layer 3 Switching), Modello di Rete Gerarchico a Tre Livelli.

---

## 1. Apparati di Rete a Livello Fisico e Data Link

Per interconnettere un numero crescente di nodi ed estendere la copertura geografica delle reti locali si impiegano diversi apparati di interconnessione:

```
+-------------------------------------------------------------------------------+
| LIVELLO OSI           | APPARATO           | FUNZIONE PRINCIPALE              |
+-----------------------+--------------------+----------------------------------+
| Layer 3 - Network     | Router / L3 Switch | Instradamento logico IP (subnet) |
| Layer 2 - Data Link   | Switch / Bridge    | Commutazione trame MAC (filtro)  |
| Layer 1 - Physical    | Hub / Ripetitore   | Rigenerazione del segnale fisico |
+-------------------------------------------------------------------------------+
```

### 1.1 Ripetitori e Hub (Layer 1 - Livello Fisico)
* Un **ripetitore** è un apparato a 2 porte che riceve un segnale elettrico attenuato, lo amplifica, ne rigenera la forma d'onda e lo ritrasmette in modo bidirezionale.
* Un **Hub** è un ripetitore multiporta ($> 2$).
* **Caratteristiche chiave:**
  * Lavorano esclusivamente a **Livello Fisico (Layer 1)**: non analizzano né comprendono la struttura delle trame Ethernet o gli indirizzi MAC.
  * Qualsiasi segnale in ingresso su una porta viene replicato istantaneamente su tutte le altre porte (*broadcasting fisico*).
  * **Dominio di collisione:** l'interconnessione di più hub **estende lo stesso dominio di collisione**; tutte le stazioni collegate condividono la stessa banda totale (es. $10\text{ Mb/s}$).

### 1.2 Bridge (Layer 2 - Livello Data Link)
* Il **Bridge** è un apparato a due o poche porte operante a **Livello Data Link (Layer 2)**.
* **Segmentazione delle LAN:** partiziona una rete locale in più segmenti fisici distinti, **separando i domini di collisione** (riducendo drasticamente la contesa e il carico del traffico).
* **Controllo d'integrità:** riceve i frame, ne ricalcola il CRC scartando le trame corrotte o malformate, ripulendo il traffico.
* Implementazione tipicamente **software-based** (CPU generica che elabora le tabelle di inoltro).

### 1.3 Switch (Commutatori Hardware di Layer 2)
* Funzionalmente, lo **Switch** è un bridge multiporta ad alta densità (es. 24, 48 porte).
* A differenza del bridge, lo switch è implementato interamente in **hardware dedicato (ASIC / Switching Fabric)**, garantendo prestazioni di commutazione a velocità di linea (*wire-speed*).
* **Microsegmentazione:** ciascuna porta dello switch costituisce un **dominio di collisione isolato e indipendente**.
* **Supporto Full-Duplex:** se una stazione è collegata a una porta dedicata in modalità Full-Duplex, la trasmissione e la ricezione avvengono contemporaneamente su canali separati; **il fenomeno delle collisioni viene completamente eliminato** e il protocollo CSMA/CD viene disattivato.

| Caratteristica | Hub (Ripetitore) | Bridge | Switch |
|---|---|---|---|
| **Livello Operativo OSI** | Layer 1 (Fisico) | Layer 2 (Data Link) | Layer 2 (Data Link) |
| **Implementazione** | Hardware analogico/digitale | Software-based | Hardware-based (ASIC) |
| **Separazione Collision Domain** | No (unico dominio condiviso) | Sì (partiziona in 2 segmenti) | Sì (ogni porta è un dominio) |
| **Separazione Broadcast Domain** | No | No | No (tranne con VLAN) |
| **Prestazioni e Scalabilità** | Molto basse (banda condivisa) | Moderate | Altissime (wire-speed dedicato) |

---

## 2. Transparent Bridging e Algoritmo di Backward Learning

Gli switch e i bridge operano secondo il principio del **Transparent Bridging**: la loro presenza è del tutto invisibile agli host della rete, che indirizzano le trame direttamente verso il MAC di destinazione senza essere consapevoli dell'apparato intermedio.

### 2.1 Tabella di Inoltro (MAC Address Table)
Lo switch mantiene in memoria una tabella hash interna (**MAC Address Table** o *Filtering Database*) che mappa gli indirizzi MAC alle porte fisiche corrispondenti:

$$\text{MAC Address Table} = \{ \langle \text{MAC Address}, \text{Porta Fisica}, \text{TTL / Timestamp} \rangle \}$$

### 2.2 Algoritmo di Backward Learning (Auto-Apprendimento)

La costruzione e l'aggiornamento della tabella avvengono in modo totalmente dinamico e automatico (*Plug-and-Play*):

```
       Host A (MAC_A)                   SWITCH                     Host B (MAC_B)
         [Porta 1] -------------------+         +------------------- [Porta 2]
                                      |         |
                                +-----+---------+-----+
                                |  MAC Address Table  |
                                | MAC_A  --> Porta 1  | (Appreso all'arrivo)
                                | MAC_B  --> Porta 2  |
                                +---------------------+
```

1. **Stato Iniziale (Boot):** all'accensione, la tabella di inoltro dello switch è completamente vuota.
2. **Apprendimento della Sorgente:** quando un frame entra attraverso una determinata porta $P$, lo switch esamina il campo **Source MAC Address ($MAC_{src}$)** e registra la voce:
   $$\text{Associazione: } MAC_{src} \longrightarrow \text{Porta } P$$
   Se l'associazione esiste già, ne aggiorna il timer di validità (*refresh*).
3. **Decisione di Inoltro sulla Destinazione:** lo switch esamina il campo **Destination MAC Address ($MAC_{dst}$)**:
   * **Unicast Noto:** se $MAC_{dst}$ è presente in tabella sulla porta $P_{out} \neq P$, lo switch inoltra la trama **esclusivamente sulla porta $P_{out}$** (*Selective Forwarding / Cross-Connection*).
   * **Unicast Sconosciuto (Unknown Unicast):** se $MAC_{dst}$ non è ancora presente in tabella, lo switch esegue il **Flooding**, replicando la trama su **tutte le porte attive eccetto la porta di arrivo $P$**.
   * **Broadcast / Multicast:** i frame con indirizzo broadcast (`FF:FF:FF:FF:FF:FF`) o multicast vengono inoltrati su tutte le porte tranne quella di ricezione.
   * **Filtraggio (Filtering):** se $MAC_{dst}$ risiede sullo stesso segmento/porta $P$ da cui è entrata la trama, il frame viene scartato poiché già consegnato localmente.
4. **Meccanismo di Invecchiamento (Aging):** le voci nella tabella non sono permanenti. Ciascuna voce ha un tempo di vita (**Aging Timer**, tipicamente 300 secondi); se non giungono nuove trame da quel MAC entro il tempo limite, la voce viene eliminata per supportare la mobilità o la disconnessione degli host.

---

## 3. Tipologie di Switch e Modalità di Commutazione

### 3.1 Modalità di Elaborazione del Frame

1. **Cut-Through:**
   * Lo switch legge unicamente i primi $6\text{ byte}$ dell'header Ethernet contenenti il MAC di destinazione.
   * Non appena identificata la porta di uscita nella tabella, avvia immediatamente la trasmissione del frame all'esterno prima ancora di aver ricevuto l'intero pacchetto.
   * **Vantaggi:** latenza di commutazione minima (ideale per calcolo ad alte prestazioni - HPC).
   * **Svantaggi:** non può verificare il CRC a fine trama; propaga trame danneggiate, corrotte o frammenti di collisione (*runt frame* $< 64\text{ byte}$).

2. **Store-and-Forward:**
   * Lo switch riceve e memorizza l'intera trama Ethernet nel proprio buffer.
   * Esegue il calcolo del **CRC** e controlla che la lunghezza rispetti il limite minimo ($64\text{ byte}$) e massimo ($1518\text{ byte}$).
   * Se il checksum è corretto, la trama viene inoltrata; se contiene errori, viene **immediatamente scartata**.
   * **Vantaggi:** garantisce la massima affidabilità e purifica il traffico della rete.
   * **Svantaggi:** introduce una latenza proporzionale alla dimensione del frame; richiede memoria di buffer.

### 3.2 Modalità Operative delle Porte

* **Port-Based Switching:** ciascuna porta è collegata a un singolo host terminale ed è associata a un unico indirizzo MAC.
* **Segment-Based Switching:** a una singola porta dello switch è connesso un hub o un altro switch; la porta mappa molteplici indirizzi MAC corrispondenti a tutti gli host attestati su quel segmento.

---

## 4. Architetture Interne e Tecnologie di Switching

Le prestazioni di uno switch dipendono dall'architettura con cui le porte di ingresso scambiano i frame con le porte di uscita:

```
  A) Shared Memory                B) Bus Architecture              C) Crossbar Fabric
  
   In 1 ----+                      In 1 ----+                       In 1 ---+---+---+---> Out 1
   In 2 ----+-> [ MEMORIA ] -> Out In 2 ----+-> [ BUS TDM ] -> Out  In 2 ---+---+---+---> Out 2
   In 3 ----+   [ CONDIVISA ]      In 3 ----+                       In 3 ---+---+---+---> Out 3
                                                                            |   |   |
                                                                           Cross-points (ASIC)
```

### 4.1 Shared Memory (Memoria Condivisa)
* I frame in ingresso da tutte le porte vengono memorizzati in una RAM centrale comune gestita da una CPU.
* Le porte di uscita prelevano i pacchetti a loro destinati dalla memoria.
* **Limiti:** con $N$ porte, il canale di accesso alla memoria deve funzionare a una velocità $N$ volte superiore rispetto alla velocità del singolo link. Limita fortemente la scalabilità.

### 4.2 Bus Architecture (Architettura a Bus Interno)
* Le porte comunicano tramite un bus interno condiviso ad altissima velocità operante in multiplazione a divisione di tempo (**TDMA**).
* **Limiti:** la capacità complessiva dello switch è vincolata dalla banda massima del bus interno; con traffico elevato si generano colli di bottiglia.

### 4.3 Switching Matrix / Crossbar Fabric (Matrice di Commutazione)
* Rete a griglia hardware con linee orizzontali (ingressi) e verticali (uscite).
* In ogni punto di incrocio (*cross-point*) è presente uno switch elettronico controllato da ASIC.
* **Proprietà Non-Blocking:** consente trasmissioni parallele e simultanee tra coppie indipendenti di porte di ingresso e uscita a massima velocità (*wire-speed*).
* **Complessità quadratica:** per $N$ ingressi e $N$ uscite richiede $N^2$ punti di incrocio:
  $$\text{Complessità Crossbar} = \mathcal{O}(N^2)$$
  Risulta molto costosa per apparati con un numero elevato di porte.

### 4.4 Reti di Commutazione Multistadio (MIN - Multistage Interconnection Network)
* Per superare il costo quadratico $\mathcal{O}(N^2)$ dei grandi crossbar, la matrice viene decomposta in una cascata gerarchica di stadi composti da switch elementari di piccole dimensioni (es. commutatori $2 \times 2$, come nella rete di Banyan o Omega Network).
* La complessità hardware scende drasticamente a:
  $$\text{Complessità MIN} = \mathcal{O}(N \log N)$$
* **Fenomeno del Blocco Interno (Internal Blocking):** a causa della condivisione di cammini interni tra gli stadi, due comunicazioni tra coppie di porte distinte possono entrare in conflitto per l'uso di un link intermedio, richiedendo bufferizzazione interna.

### 4.5 Blocco, Contesa e Bufferizzazione
Quando due porte di ingresso desiderano trasmettere simultaneamente verso la medesima porta di uscita, si genera una **contesa (output contention)**:
* Per gestire il blocco, a ciascuna interfaccia sono associati dei **buffer di memoria**.
* **Politiche di gestione delle code:**
  * **FIFO (First-In, First-Out)**: può causare il fenomeno dell'*Head-of-Line (HoL) Blocking*, dove un frame in testa alla coda bloccato impedisce l'uscita dei frame successivi diretti a porte libere.
  * **Round-Robin (RR)** e code a priorità gestite da *shifter* hardware, preservando l'ordine relativo di arrivo.

---

## 5. Topologie Ridondanti e Problemi dei Loop a Livello 2

Nelle reti aziendali e campus, per garantire l'alta disponibilità ed eliminare i singoli punti di guasto (**Single Points of Failure - SPOF**), si introducono collegamenti fisici ridondanti tra gli switch. La topologia fisica risultante non è più un albero semplice, ma un **grafo contenente cicli (loop)**.

```
                  +-----------------------------------+
                  |             Switch A              |
                  +--------+-----------------+--------+
                           |                 |
                    Link 1 |                 | Link 2 (Ridondante)
                           |                 |
                  +--------+-----------------+--------+
                  |             Switch B              |
                  +-----------------------------------+
```

A **Livello 2 (Data Link)** i frame Ethernet **non possiedono un campo Time-to-Live (TTL)**. Di conseguenza, la presenza di percorsi chiusi (loop) provoca tre gravi anomalie:

### 5.1 Broadcast Storm (Tempesta di Broadcast)
Quando un host emette un frame di broadcast (es. ARP Request), lo Switch A lo riceve e lo inoltra su tutte le porte, incluso il link verso lo Switch B. Lo Switch B, ricevendo il broadcast, lo replica a sua volta su tutte le porte, rispedendolo allo Switch A.
Il frame continua a girare all'infinito moltiplicandosi a ogni iterazione, saturando la banda dei link e le CPU degli switch fino al totale collasso della rete.

### 5.2 Replicazione Multipla dei Frame (Multiple Frame Copies)
Se un host $X$ invia una trama unicast a un host $Y$ la cui posizione non è ancora presente nelle tabelle di inoltro (*unknown unicast*), gli switch eseguono il flooding lungo tutti i cammini ridondanti. L'host $Y$ riceverà copie multiple e duplicate della medesima trama, corrompendo le comunicazioni a livello superiore.

### 5.3 Instabilità del Database MAC (MAC Address Table Thrashing / Flapping)
Poiché le trame duplicate circolano continuamente nei due sensi attraverso porte fisiche diverse, gli switch aggiornano continuamente la posizione del MAC sorgente (es. registrandolo prima su Porta 1, poi su Porta 2, poi di nuovo su Porta 1). La tabella di inoltro diventa instabile e lo switch perde la capacità di commutare correttamente il traffico.

---

## 6. Spanning Tree Protocol (STP - IEEE 802.1D)

Lo **Spanning Tree Protocol (STP)**, standardizzato in **IEEE 802.1D** e ideato da Radia Perlman, risolve le anomalie dei loop mantenendo i benefici della ridondanza fisica.

> **Principio Fondamentale di STP:**  
> L'algoritmo calcola e mantiene dinamicamente un sottoinsieme di collegamenti attivi che forma un **albero ricoprente privo di cicli (Loop-Free Spanning Tree)** che tocca tutti i nodi. I link ridondanti vengono posti logicamente in stato di blocco (*Blocking*); in caso di guasto di un link attivo, l'algoritmo ricalcola l'albero e riattiva automaticamente i percorsi di riserva.

### 6.1 Concetti Fondamentali di STP

1. **Root Bridge (Switch Radice):**
   * È l'elemento di riferimento privilegiato dell'intera rete da cui si diramano tutti i rami dell'albero.
   * Viene eletto lo switch avente il **Bridge ID (BID)** con valore numerico più basso:
     $$\text{Bridge ID} = \langle \text{Bridge Priority (2 byte)} \mathbin{\Vert} \text{MAC Address (6 byte)} \rangle$$
   * La priorità di default è $32768$. L'amministratore può forzare l'elezione configurando una priorità inferiore sullo switch principale.

2. **Root Port (RP):**
   * Ciascuno switch non-root seleziona **un'unica Root Port**, ovvero la porta fisica che offre il percorso a costo minimo (**Lowest Path Cost**) per raggiungere il Root Bridge.

3. **Designated Port (DP):**
   * Per ciascun segmento LAN/link tra switch, viene eletta **un'unica Designated Port**, ovvero la porta che garantisce il costo di cammino più basso verso il Root Bridge per quel segmento. Tutte le porte del Root Bridge sono sempre Designated Ports.

4. **Non-Designated / Alternate Port (Porte Bloccate):**
   * Tutte le porte rimanenti che non sono né Root Port né Designated Port vengono messe in stato di **Blocking**. Esse non inoltrano il traffico dati ma restano in ascolto per intervenire in caso di guasto.

![Esempio di topologia STP: elezione del Root Bridge e calcolo dei ruoli delle porte](images/reti/fig_p1_xref247_610x226.png)

### 6.2 Bridge Protocol Data Unit (BPDU)
Gli switch scambiano continuamente messaggi di controllo dedicati denominati **BPDU (Bridge Protocol Data Unit)**:
* Vengono trasmesse ogni **2 secondi** (*Hello Time*) su indirizzo multicast Layer 2.
* Contengono informazioni su: Root Bridge ID, Root Path Cost, Sender Bridge ID, Port ID, e timer di topologia (*Message Age, Max Age, Forward Delay*).
* All'avvio, ogni switch si autoproclama Root Bridge trasmettendo BPDU con il proprio ID. Non appena riceve una BPDU con un Root ID migliore (minore), accetta il nuovo Root e aggiorna i propri costi.

### 6.3 Stati di Funzionamento delle Porte STP

Per evitare la formazione temporanea di loop durante i ricalcoli di topologia, una porta non passa immediatamente dallo stato di blocco a quello di trasmissione, ma attraversa 4 stati transitori:

```
  +------------+   Topology Change   +-------------+   Forward Delay   +------------+   Forward Delay   +--------------+
  |  BLOCKING  | ------------------> |  LISTENING  | ----------------> |  LEARNING  | ----------------> |  FORWARDING  |
  +------------+                     +-------------+     (15 sec)      +------------+     (15 sec)      +--------------+
    - No TX Dati                       - No TX Dati                      - No TX Dati                     - TX/RX Dati
    - No Appr. MAC                     - No Appr. MAC                    - SI Appr. MAC                   - SI Appr. MAC
    - Solo RX BPDU                     - RX/TX BPDU                      - RX/TX BPDU                     - RX/TX BPDU
```

| Stato Porta | Ricezione BPDU | Invio BPDU | Apprendimento MAC | Inoltro Frame Dati |
|---|---|---|---|---|
| **Blocking** | **Sì** | No | No | No |
| **Listening** | **Sì** | **Sì** | No | No (elimina loop transitori) |
| **Learning** | **Sì** | **Sì** | **Sì** (popola la MAC table) | No |
| **Forwarding** | **Sì** | **Sì** | **Sì** | **Sì** (piena operatività) |
| **Disabled** | No | No | No | No (porta spenta/amministrativa) |

![Transizione degli stati delle porte STP: da Blocking a Forwarding](images/reti/fig_p1_xref248_542x226.jpeg)

### 6.4 Ricalcolo e Gestione dei Guasti (Failover)
Se un link attivo si interrompe (es. rottura della Root Port), lo switch smette di ricevere le BPDU attese. Se non giungono BPDU per un intervallo temporale pari a **Max Age** (tipicamente $20\text{ secondi}$), lo switch dichiara invalida la topologia corrente e avvia la fase di ricalcolo:
* Le porte di backup in stato di *Blocking* transitano attraverso gli stati di *Listening* ($15\text{ s}$) e *Learning* ($15\text{ s}$).
* Dopo un tempo totale di convergenza di circa $30 - 50\text{ secondi}$, la porta di riserva passa in *Forwarding*, ripristinando la connettività senza intervento manuale.

![Riconfigurazione e ricalcolo dello Spanning Tree in seguito a guasto di un link](images/reti/fig_p1_xref249_611x226.png)

---

## 7. Virtual LAN (VLAN)

In una rete commutata tradizionale, tutti gli host attestati sugli switch appartengono a un **unico grande dominio di broadcast**. All'aumentare del numero di nodi, il traffico broadcast (es. ARP, DHCP, annunci di sistema) degrada le prestazioni e compromette la sicurezza.

La tecnologia **VLAN (Virtual Local Area Network)** consente di segmentare logicamente un'infrastruttura di switch fisica in **più domini di broadcast isolati e indipendenti**:

> **Proprietà delle VLAN:**  
> * Ciascuna VLAN logica equivale a un bridge/switch fisico separato.
> * Se un host appartenente alla VLAN 10 emette un frame di broadcast, questo viene replicato **esclusivamente verso le porte appartenenti alla VLAN 10**.
> * A Livello 2 (Data Link), host situati in VLAN differenti **non possono comunicare direttamente**, anche se collegati allo stesso switch fisico. La comunicazione inter-VLAN è possibile **solo attraverso un apparato di Livello 3 (Router o L3 Switch)**.

```
                 +-----------------------------------------------+
                 |             SWITCH FISICO (24 Porte)          |
                 +-----------------------+-----------------------+
                 |    VLAN 10 (Uffici)   |    VLAN 20 (Server)   |
                 | Porte 1 - 12          | Porte 13 - 24         |
                 +-----------+-----------+-----------+-----------+
                             |                       |
                     Host A (VLAN 10)        Host B (VLAN 20)
                             \                       /
                              [ ISOLAMENTO LAYER 2 ]
                             (Comunicazione solo via L3)
```

### 7.1 Metodi di Assegnazione delle VLAN
1. **Assegnazione Statica (Port-Based):**
   * L'amministratore associa manualmente ciascuna porta fisica dello switch a uno specifico ID di VLAN (es. Porta 1 $\to$ VLAN 10).
   * È la modalità più semplice, sicura e diffusa.
2. **Assegnazione Dinamica (MAC-Based):**
   * L'appartenenza alla VLAN è determinata dall'indirizzo MAC della scheda di rete dell'host mediante consultazione di un database centrale (VMPS / RADIUS).
   * Consente all'utente di spostarsi fisicamente su porte diverse mantenendo la propria VLAN, ma richiede maggiore complessità di gestione.

---

## 8. VLAN Tagging e Protocolli di Trunking

Quando una VLAN deve estendersi attraverso più switch interconnessi, non è conveniente dedicare un cavo fisico distinto per ciascuna VLAN. Si utilizza invece un unico collegamento ad alta velocità condiviso denominato **Trunk Port**.

### 8.1 Porte di Accesso vs Porte Trunk
* **Access Port (Porta di Accesso):** appartiene a una sola VLAN e trasmette normali frame Ethernet non modificati (*untagged*). È destinata al collegamento di dispositivi terminali (PC, stampanti).
* **Trunk Port (Porta Trunk):** trasporta simultaneamente il traffico di **molteplici VLAN** tra switch o tra switch e router. Per distinguere a quale VLAN appartenga ciascun frame durante il transito sul trunk, il frame viene modificato inserendo un'etichetta identificativa (**Tagging**).

```
   Host VLAN 10 ---> [ACCESS PORT] ---> [ SWITCH 1 ] === (TRUNK: Frame Taggato) ===> [ SWITCH 2 ] ---> [ACCESS PORT] ---> Host VLAN 10
```

### 8.2 Protocolli di Tagging

1. **Cisco ISL (Inter-Switch Link - Proprietario):**
   * Protocollo proprietario Cisco che utilizza una logica di incapsulamento completo.
   * Aggiunge un header esterno di $26\text{ byte}$ contenente il VLAN ID e un trailer di controllo CRC da $4\text{ byte}$ in coda.
   * Supporta fino a 1024 VLAN; oggi considerato obsoleto.

2. **IEEE 802.1Q (Standard Aperto Internazionale):**
   * Modifica direttamente la trama Ethernet inserendo un campo **Tag di 4 byte (32 bit)** tra il campo *Source MAC Address* e il campo *EtherType / Length*:

```
+-------------------+-------------------+-------------------+-------------------+-------------------+
| Dest MAC (6 byte) | Source MAC (6 B)  | 802.1Q Tag (4 B)  | EtherType (2 B)   | Payload + CRC     |
+-------------------+-------------------+-------------------+-------------------+-------------------+
                                        |                   |
                                        +---------+---------+
                                                  |
           +--------------------------------------+--------------------------------------+
           | TPID (16 bit) = 0x8100               | TCI (16 bit)                         |
           +--------------------------------------+--------------------------------------+
                                                  | Priority (3b) | DEI (1b) | VLAN ID (12 bit)  |
                                                  +---------------+----------+-------------------+
```

* **TPID (Tag Protocol Identifier - 16 bit):** impostato al valore esadecimale fisso `0x8100` per indicare la presenza dell'header 802.1Q.
* **TCI (Tag Control Information - 16 bit):**
  * *Priority (3 bit)*: definisce la priorità di classe di servizio per il QoS (standard IEEE 802.1p, valori da 0 a 7).
  * *DEI / CFI (1 bit)*: Drop Eligible Indicator per la gestione della congestione.
  * *VLAN ID (VID - 12 bit)*: identifica la VLAN di appartenenza del frame, consentendo di indirizzare fino a $2^{12} = 4096$ VLAN distinte.

---

## 9. VLAN Trunking Protocol (VTP)

Nelle reti con numerosi switch, la configurazione manuale delle VLAN su ciascun dispositivo è onerosa e soggetta a errori. Il protocollo **VTP (VLAN Trunking Protocol)** (proprietario Cisco) consente di gestire e sincronizzare centralmente la creazione, cancellazione e ridenominazione delle VLAN all'interno di un **VTP Domain** (un gruppo di switch L2 cooperanti).

### 9.1 Modalità Operative VTP

```
  [ VTP SERVER (Master) ]  ==============> [ VTP CLIENT (Slave) ]
   - Crea/Elimina VLAN                      - Riceve e applica configurazioni
   - Invia Annunci Multicast                - Non può modificare il DB locale
              ||
              \/
  [ VTP TRANSPARENT ]
   - Inoltra le BPDU/Annunci VTP agli altri switch
   - Mantiene un DB locale indipendente (può creare VLAN locali)
```

1. **VTP Server:** nodo master del dominio. Consente all'amministratore di creare, modificare ed eliminare le VLAN. Salva le configurazioni nella memoria non volatile (NVRAM) e propaga gli annunci di configurazione su tutti i link trunk.
2. **VTP Client:** riceve gli aggiornamenti VTP, sincronizza il proprio database VLAN e inoltra i frame. Non permette la modifica o la creazione locale delle VLAN e non memorizza la tabella in NVRAM (la apprende al boot dal Server).
3. **VTP Transparent:** non sincronizza il proprio database con gli annunci del Server, ma si limita a inoltrare in modo trasparente i frame VTP ricevuti verso gli altri switch. Permette all'amministratore di creare e gestire VLAN con valenza puramente locale.

![Architettura VTP Domain: ruoli Server, Client e Transparent](images/reti/fig_p1_xref251_397x203.jpeg)

### 9.2 VTP Advertisements
I Server VTP inviano annunci in formato frame multicast Layer 2:
* **Periodicamente:** ogni 5 minuti.
* **Su variazione:** istantaneamente ogni volta che viene creata, modificata o eliminata una VLAN.
* Ciascun annuncio include un numero di revisione di configurazione (**Configuration Revision Number**); gli apparati applicano l'aggiornamento solo se il numero di revisione ricevuto è superiore a quello corrente.

---

## 10. Routing Inter-VLAN e Layer 3 Switching

Poiché le VLAN risiedono in domini di broadcast isolati, il traffico tra host di VLAN diverse deve essere necessariamente instradato a **Livello 3 (Network Layer)**.

### 10.1 Tecniche di Instradamento Inter-VLAN

```
  A) Router Tradizionale              B) Router-on-a-Stick              C) Layer 3 Switch
  
     +--------+                          +--------+                        +-----------------------+
     | ROUTER |                          | ROUTER |                        |    LAYER 3 SWITCH     |
     +--+--+--+                          +---+----+                        | (ASIC Switching Fabric|
        |  | (1 Cavo per VLAN)               | (1 Link Trunk 802.1Q)       |  + Hardware Routing)  |
     +--+--+--+                          +---+----+                        +-----------+-----------+
     | SWITCH |                          | SWITCH |                                    |
     +--------+                          +--------+                            VLAN 10   VLAN 20
     V10    V20                          V10    V20                          (Instradamento Wire-Speed)
```

1. **Router Tradizionale (Interfacce Fisiche Multiple):**
   * Si collega un'interfaccia fisica del router a una porta di accesso per ciascuna VLAN configurata sullo switch.
   * **Limite:** scarsissima scalabilità; esaurisce rapidamente le porte fisiche del router.

2. **Router-on-a-Stick:**
   * Utilizza un'unica interfaccia fisica sul router collegata tramite un link **Trunk 802.1Q** allo switch.
   * L'interfaccia fisica del router viene suddivisa logicamente in molteplici **sottointerfacce virtuali (sub-interfaces)** (es. `eth0.10`, `eth0.20`), ciascuna associata a un VLAN ID specifico e con il proprio indirizzo IP di Default Gateway.
   * **Limite:** tutta la banda di comunicazione inter-VLAN è limitata dalla capacità dell'unico link fisico condiviso.

3. **Layer 3 Switching (Multilayer Switching):**
   * Soluzione moderna che integra le funzionalità di routing Layer 3 direttamente all'interno della matrice di commutazione hardware dello switch (**ASIC / Switching Fabric**).
   * L'instradamento tra VLAN avviene alla velocità del silicio (*wire-speed*), garantendo throughput elevatissimo, latenza trascurabile, e supporto per liste di controllo degli accessi (ACL) e QoS hardware.

---

## 11. Modello Gerarchico di Rete a Tre Livelli

Nelle architetture di rete aziendali (Cisco Enterprise Architecture), per gestire la complessità, garantire modularità, alta disponibilità e scalabilità, la topologia viene strutturata secondo un **modello gerarchico a 3 livelli**:

```
                         =============================================
                                      CORE LAYER (Dorsale)
                         Commutazione ad altissima velocità (No ACL)
                         =============================================
                                     /                   \
                                    /                     \
                   +-----------------------+       +-----------------------+
                   |  DISTRIBUTION LAYER   |       |  DISTRIBUTION LAYER   |
                   | Routing L3, ACL, QoS  |       | Routing L3, ACL, QoS  |
                   +-----------+-----------+       +-----------+-----------+
                              /         \                     /         \
                             /           \                   /           \
                     +----------+     +----------+   +----------+     +----------+
                     |  ACCESS  |     |  ACCESS  |   |  ACCESS  |     |  ACCESS  | (VLAN, Port Sec)
                     +----+-----+     +----+-----+   +----+-----+     +----+-----+
                          |                |              |                |
                        Host             Host           Host             Host
```

### 11.1 I Tre Livelli Funzionali

1. **Access Layer (Livello di Accesso):**
   * Rappresenta il punto di ingresso degli utenti e dei dispositivi terminali nella rete.
   * **Funzioni:** erogazione connettività, microsegmentazione su porte dedicate, assegnazione delle VLAN, sicurezza delle porte (*Port Security*), filtraggio su base MAC. Opera tipicamente in modalità Switched.

2. **Distribution Layer (Livello di Distribuzione):**
   * È il livello più intelligente dell'architettura; funge da cerniera tra l'accesso e la dorsale.
   * **Funzioni:** aggregazione dei flussi provenienti dagli switch di accesso, routing inter-VLAN (Layer 3), definizione dei confini dei domini di broadcast, applicazione delle policy di sicurezza e filtraggio tramite Access Control List (ACL), gestione della Qualità del Servizio (QoS).

3. **Core Layer (Livello di Core / Dorsale):**
   * Costituisce la spina dorsale ad altissima velocità della rete.
   * **Funzioni:** aggregazione del traffico tra i diversi blocchi di distribuzione e trasporto massivo di pacchetti con la minima latenza possibile. Non deve eseguire elaborazioni complesse o filtraggi pesanti (no ACL/packet inspection) per non degradare la velocità di commutazione (*wire-speed*).

### 11.2 Blocchi Architetturali e Topologie

* **Switch Block:** unità modulare fondamentale costituita da un gruppo di switch di accesso connessi a una coppia ridondante di switch di distribuzione.
* **Core Block:** blocco centrale ridondante che interconnette molteplici switch block.
* **Collapsed Core:** topologia ottimizzata per reti di medie dimensioni in cui le funzioni del livello di distribuzione e del core vengono condensate (*collassate*) su un'unica coppia di switch Layer 3 ridondanti (**Dual Core**), riducendo costi e complessità senza rinunciare all'affidabilità.

---


<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- SEZIONE: 09 - Livello di Rete (Networking Basic).md -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

# Capitolo 9 – Livello di Rete (Networking Basic)

> **Appunti del Corso di Reti di Calcolatori**  
> Argomenti: Funzioni dello Strato di Rete (Layer 3), Servizi Connection-Oriented (Circuiti Virtuali) vs Connectionless (Datagrammi), Routing vs Forwarding, Protocollo IPv4 e Struttura del Datagramma, Indirizzamento IPv4 Classful (Classi A-E) e Indirizzi Speciali/Privati (RFC 1918), Carenza di Indirizzi e Subnetting (Subnet Mask, VLSM), CIDR e Supernetting, Longest Prefix Match, Protocollo IPv6 e Transizione (Dual-Stack, Tunneling, NAT64), Protocolli di Controllo e Servizio (DHCP, ICMP, ARP, RARP), Instradamento Diretto e Indiretto.

---

## 1. Funzioni dello Strato di Rete (Layer 3)

Al **Livello 3 (Network Layer)** risiede l'intelligenza architetturale dell'infrastruttura di rete. La sua funzione primaria consiste nel fornire al livello di trasporto un servizio trasparente di consegna dati end-to-end, mascherando completamente la complessità e l'eterogeneità delle sottoreti fisiche attraversate.

```
 +-----------------------------------------------------------------------------------+
 | LIVELLO DI TRASPORTO (TCP / UDP)                                                 |
 +-----------------------------------------------------------------------------------+
                                          |
                                          v  (Consegna dati end-to-end)
 +-----------------------------------------------------------------------------------+
 | LIVELLO DI RETE (IP)                                                              |
 | - Indirizzamento Logico Universale                                                |
 | - Routing (Calcolo dei percorsi) e Forwarding (Inoltro pacchetti)                 |
 | - Risoluzione Eterogeneità (Internetworking)                                      |
 +-----------------------------------------------------------------------------------+
                                          |
                                          v
 +-----------------------------------------------------------------------------------+
 | SOTTORETI FISICHE ETEROGENEE (Ethernet, Wi-Fi, Fibra Ottica, Point-to-Point...)    |
 +-----------------------------------------------------------------------------------+
```

### 1.1 Elementi Costitutivi del Livello di Rete
* **Host (End-Node):** sistemi terminali su cui risiedono i processi applicativi e lo stack di trasporto che generano o consumano il traffico dati.
* **Router:** nodi intermedi intelligenti operanti a Livello 3 che ricevono pacchetti da un'interfaccia e li inoltrano verso la destinazione attraverso la maglia della sottorete.
* **Pacchetti (Datagrammi IP):** unità informativa di livello 3 costituita da $\text{Dati Utente} + \text{Header di Rete} + \text{Trailer opzionale}$.

### 1.2 Compiti Chiave del Livello di Rete
1. **Instradamento (Routing):** determinazione del tragitto ottimale (tra i molteplici percorsi fisici disponibili) che i dati devono seguire dalla sorgente alla destinazione mediante algoritmi di routing globali o distribuiti.
2. **Adattamento Dinamico alla Topologia:** capacità di rilevare guasti a link o nodi e apprendere tempestivamente le variazioni di topologia riconfigurando le rotte.
3. **Controllo della Congestione:** prevenzione del sovraccarico delle linee di trasmissione distribuendo il traffico su percorsi alternativi.
4. **Internetworking:** risoluzione delle incompatibilità trasmissive tra reti con tecnologie, MTU, formati di indirizzo e protocolli fisici differenti.

---

## 2. Paradigmi di Servizio: Connection-Oriented vs Connectionless

Lo strato di rete può offrire due filosofie di servizio per il trasferimento dati:

```
  A) Connectionless (Datagram Network)            B) Connection-Oriented (Virtual Circuit)
  
     Host 1          Router         Host 2           Host 1          Router         Host 2
       |               |              |                |               |              |
       |-- Pkt 1 (R1)->|              |                |-- Call Setup->|              |
       |-- Pkt 2 (R2)->|              |                |<-- Connected -|              |
       |-- Pkt 3 (R1)->|              |                |=== Pkt (VC1)=>|==============| (Percorso Fisso)
       (Pacchetti instradati singolarmente)            |-- Teardown -->|              |
```

| Parametro | Servizio Senza Connessione (Datagramma) | Servizio Con Connessione (Circuito Virtuale) |
|---|---|---|
| **Fase di Setup** | Nessuna (invio immediato) | Obbligatoria (creazione preventiva del percorso) |
| **Header del Pacchetto** | Contiene indirizzo completo di destinazione | Contiene solo il numero di Circuito Virtuale (VC ID) |
| **Percorso dei Pacchetti** | Ciascun pacchetto può seguire percorsi diversi | Tutti i pacchetti seguono lo stesso percorso prestabilito |
| **Stato nei Router** | I router memorizzano solo la tabella di routing | I router mantengono lo stato di ogni connessione attiva |
| **Affidabilità** | Modello Best-Effort (gestita a livello 4) | Spesso garantita a livello di circuito |
| **Esempi** | **Internet Protocol (IPv4, IPv6)** | ATM, X.25, Frame Relay, MPLS |

![Confronto tra commutazione a Circuito Virtuale e a Datagramma](images/reti/fig_p1_xref254_886x498.png)

---

## 3. Instradamento (Routing) ed Inoltro (Forwarding)

Il funzionamento di un router si articola in due funzioni distinte operanti su piani separati:

```
  +-----------------------------------------------------------------------------------+
  | PIANO DI CONTROLLO (Control Plane - Software / CPU)                               |
  | Algoritmi di Routing (OSPF, RIP, BGP) <---> Costruzione Tabella di Routing        |
  +-----------------------------------------------------------------------------------+
                                          | Popola / Aggiorna
                                          v
  +-----------------------------------------------------------------------------------+
  | PIANO DATI (Data Plane - Hardware / ASIC)                                         |
  | Pacchetto In Ingresso ---> [ Tabella di Inoltro (FIB) ] ---> Interfaccia di Uscita |
  +-----------------------------------------------------------------------------------+
```

1. **Inoltro (Forwarding - Data Plane):**
   * Processo locale ad altissima velocità eseguito ad ogni arrivo di un pacchetto.
   * Il router consulta la tabella di inoltro (**Forwarding Table / FIB**) per determinare l'interfaccia fisica di uscita verso cui spedire il datagramma in base all'IP di destinazione.
   * Realizzato direttamente in hardware dedicato (**ASIC**) a velocità di linea (*wire-speed*).

2. **Instradamento (Routing - Control Plane):**
   * Processo di computazione distribuito con cui i router scambiano informazioni topologiche per calcolare e mantenere aggiornate le tabelle di routing.

### 3.1 Proprietà di un Algoritmo di Routing Ideale
* **Correttezza:** i pacchetti devono raggiungere la destinazione prevista senza finire in vicoli ciechi (*black holes*).
* **Semplicità:** limitare il carico computazionale e il consumo di memoria nei router.
* **Robustezza:** capacità di convergere e funzionare correttamente anche in presenza di guasti a collegamenti, crash di nodi o congestione.
* **Stabilità:** convergenza rapida verso rotte stabili senza generare oscillazioni continue.
* **Imparzialità (Fairness):** garantire equità di trattamento a tutti i flussi senza privilegiare arbitrariamente alcune stazioni.
* **Ottimalità:** minimizzare una metrica di costo globale (ritardo, hop count, banda occupata).

---

## 4. Internet Protocol (IPv4 - RFC 791)

L'**Internet Protocol versione 4 (IPv4)** è il protocollo cardine della suite TCP/IP.

> **Principi Fondamentali di IPv4:**  
> * **Servizio Connectionless e Best-Effort:** IPv4 non offre garanzie sulla consegna dei pacchetti, non assicura l'ordine di arrivo, non implementa controllo di flusso né recupero di pacchetti persi.
> * **Scalabilità ed Efficienza:** delegando l'affidabilità e il controllo di congestione ai protocolli di trasporto di livello superiore (TCP), i router intermedi risultano estremamente semplici, veloci e infinitamente scalabili.
> * **Consegna Hop-by-Hop:** il pacchetto viene trasferito di rete in rete (*hop-by-hop*) fino al raggiungimento dell'host finale.

### 4.1 Formato del Datagramma IPv4

L'header IPv4 ha una dimensione minima fissa di **20 byte (160 bit)** e può estendersi fino a un massimo di **60 byte** mediante l'uso di opzioni:

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |Type of Service|          Total Length         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification        |Flags|     Fragment Offset     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Time to Live |    Protocol   |        Header Checksum        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source IP Address                       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination IP Address                     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (0 - 40 bytes)                     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                            Payload                            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

![Formato dell'Header del Datagramma IPv4](images/reti/fig_p1_xref256_1007x176.png)

#### Descrizione Dettagliata dei Campi:

1. **Version (4 bit):** identifica la versione del protocollo ($4$ per IPv4, $6$ per IPv6).
2. **IHL (Internet Header Length - 4 bit):** esprime la lunghezza dell'header in parole da 32 bit ($4\text{ byte}$). Il valore minimo è $5$ ($5 \times 4 = 20\text{ byte}$ senza opzioni); il massimo è $15$ ($15 \times 4 = 60\text{ byte}$).
3. **Type of Service (ToS / DiffServ - 8 bit):** specifica i requisiti di qualità del servizio (priorità, basso ritardo, elevato throughput, affidabilità).
4. **Total Length (16 bit):** lunghezza complessiva del datagramma (header + payload) in byte. Il valore massimo teorico è:
   $$\text{Max Total Length} = 2^{16} - 1 = 65535\text{ byte}$$
5. **Campi per la Frammentazione:**
   * **Identification (16 bit):** identificativo univoco assegnato dalla sorgente per raggruppare tutti i frammenti generati dal medesimo datagramma originale.
   * **Flags (3 bit):**
     * *Bit 0:* riservato (deve essere 0).
     * *Bit 1 (DF - Don't Fragment):* se posto a 1, ordina ai router di non frammentare il pacchetto; se la MTU è insufficiente, il pacchetto viene scartato e viene generato un messaggio ICMP.
     * *Bit 2 (MF - More Fragments):* posto a 1 per tutti i frammenti intermedi; posto a 0 solo sull'ultimo frammento (o sul pacchetto intero non frammentato).
   * **Fragment Offset (13 bit):** indica l'offset di inizio del frammento rispetto all'inizio del payload originale, misurato in **unità di 8 byte (64 bit)**.
6. **Time to Live (TTL - 8 bit):** contatore di hop decrementato di 1 da ciascun router attraversato. Quando il valore raggiunge 0, il pacchetto viene scartato e viene inviato un messaggio ICMP *Time Exceeded* alla sorgente, prevenendo la circolazione indefinita di pacchetti nei loop di routing.
7. **Protocol (8 bit):** identifica il protocollo di livello superiore a cui consegnare il payload:
   * `1`: **ICMP** (Internet Control Message Protocol)
   * `6`: **TCP** (Transmission Control Protocol)
   * `17`: **UDP** (User Datagram Protocol)
8. **Header Checksum (16 bit):** codice di controllo dell'integrità limitato al solo header (non copre i dati). Viene ricalcolato obbligatoriamente ad ogni hop poiché il campo TTL viene modificato.
9. **Source IP Address (32 bit):** indirizzo IP del mittente originale.
10. **Destination IP Address (32 bit):** indirizzo IP del destinatario finale.
11. **Opzioni IPv4 (0 - 40 byte):**
    * *Security:* marcatura di sicurezza (es. ambito militare).
    * *Record Route:* registra la sequenza di indirizzi IP dei router attraversati nel tragitto.
    * *Source Routing:* la sorgente specifica a priori il percorso: **Strict** (obbligo rigido di attraversare solo i nodi elencati) o **Loose** (i router specificati devono essere attraversati, ma sono ammessi nodi intermedi).

---

## 5. Indirizzamento IPv4: Struttura Gerarchica e Indirizzi Speciali

Un indirizzo IPv4 è costituito da **32 bit (4 byte)**, rappresentato convenzionalmente in notazione decimale puntata (*Dotted-Decimal Notation*), ad esempio `130.251.61.129`, dove ogni byte assume un valore compreso tra $0$ e $255$.

> **Regola Fondamentale:**  
> Un indirizzo IP **non identifica un computer fisico**, ma una specifica **interfaccia di connessione host-rete**. Se un host possiede due schede di rete (o un router possiede 4 interfacce), ciascuna interfaccia possiede un proprio indirizzo IP indipendente.

L'indirizzo presenta una struttura gerarchica a due livelli:

$$\text{Indirizzo IP (32 bit)} = \langle \text{Network ID (Prefisso di Rete)} \mathbin{\Vert} \text{Host ID (Suffisso di Host)} \rangle$$

![Struttura gerarchica dell'indirizzo IPv4 (Network ID e Host ID)](images/reti/fig_p1_xref258_847x176.jpeg)

### 5.1 Indirizzamento Classful (Classi A, B, C, D, E)

Originariamente lo spazio di indirizzamento a 32 bit ($2^{32} \approx 4.29\text{ miliardi di indirizzi}$) era suddiviso in 5 classi fisse in base ai bit più significativi del primo byte:

```
  Classe A (0...)       | 0 |    Network (7 bit)    |              Host ID (24 bit)              |
  Classe B (10...)      | 1 0 |   Network (14 bit)          |        Host ID (16 bit)        |
  Classe C (110...)     | 1 1 0 |         Network (21 bit)               |   Host ID (8 bit) |
  Classe D (1110...)    | 1 1 1 0 |                 Gruppo Multicast (28 bit)                |
  Classe E (1111...)    | 1 1 1 1 |               Riservata per Ricerca (28 bit)             |
```

| Classe | Bit Iniziali | Primo Byte (Range) | Porzione Rete / Host | Numero di Reti | Host Utili per Rete ($2^H - 2$) |
|---|---|---|---|---|---|
| **A** | `0` | $0 - 127$ | $8\text{ bit Net} / 24\text{ bit Host}$ | $128$ ($2^7$) | $2^{24} - 2 = \mathbf{16.777.214}$ |
| **B** | `10` | $128 - 191$ | $16\text{ bit Net} / 16\text{ bit Host}$ | $16.384$ ($2^{14}$) | $2^{16} - 2 = \mathbf{65.534}$ |
| **C** | `110` | $192 - 223$ | $24\text{ bit Net} / 8\text{ bit Host}$ | $2.097.152$ ($2^{21}$) | $2^8 - 2 = \mathbf{254}$ |
| **D** | `1110` | $224 - 239$ | Dedicata al Multicast | N/A | Indirizzi di Gruppo Multicast |
| **E** | `1111` | $240 - 255$ | Riservata per scopi sperimentali | N/A | Non utilizzabile per host |

### 5.2 Indirizzi Riservati e Speciali

* **Indirizzo di Rete (Host ID tutti 0):** identifica la rete stessa nel suo complesso (es. `130.90.0.0`). Non può essere assegnato a nessun dispositivo.
* **`0.0.0.0` (Questo host su questa rete):** utilizzato come sorgente temporanea durante la fase di boot quando un calcolatore non conosce ancora il proprio IP (es. richiesta DHCP).
* **`255.255.255.255` (Broadcast Limitato):** indirizzo di broadcast locale; invia il pacchetto a tutti i nodi della rete locale fisica senza essere inoltrato dai router.
* **Broadcast Diretto (Host ID tutti 1):** indirizza tutti gli host di una specifica rete remota (es. `130.90.255.255` per la rete `130.90.0.0/16`).
* **`127.0.0.0/8` (`127.0.0.1` - Loopback):** interfaccia software di loopback locale per test interni di comunicazione sull'host stesso (*localhost*).

### 5.3 Indirizzi Privati (RFC 1918)
Non sono instradabili pubblicamente sulla rete globale Internet e possono essere riutilizzati liberamente all'interno di qualsiasi rete privata:
* **Classe A:** `10.0.0.0/8` (da `10.0.0.0` a `10.255.255.255` - 1 blocco da 16 milioni di IP)
* **Classe B:** `172.16.0.0/12` (da `172.16.0.0` a `172.31.255.255` - 16 blocchi /16)
* **Classe C:** `192.168.0.0/16` (da `192.168.0.0` a `192.168.255.255` - 256 blocchi /24)

### 5.4 Altri Range Riservati
* `100.64.0.0/10` (RFC 6598): riservato alle comunicazioni tra ISP e utenti in presenza di **Carrier-Grade NAT (CGNAT)**.
* `198.18.0.0/15` (RFC 2544): riservato per i test di benchmark tra diverse reti di interconnessione.
* **Assegnazione Globale degli Indirizzi:** gestita centralmente da **ICANN/IANA**, che delega blocchi di prefissi ai registri regionali **RIR** (es. **RIPE NCC** per l'Europa), che a loro volta assegnano le subnet ai provider nazionali (es. **GARR** per la rete accademica e di ricerca italiana).

---

## 6. Carenza di Indirizzi e Subnetting

Con l'esplosione di Internet negli anni '90, l'architettura *classful* mostrò gravi limiti strutturali:
1. Lo spazio di indirizzi di Classe A ($16\text{M}$ host) e Classe B ($65\text{k}$ host) era troppo esteso e portava a un massiccio spreco di IP inutilizzati.
2. Le reti di Classe C ($254$ host) erano troppo piccole per la maggior parte delle organizzazioni.
3. I collegamenti punto-punto tra due soli router richiedevano un'intera rete, sprecando 254 indirizzi.

### 6.1 Subnetting e Subnet Mask

La tecnica del **Subnetting** consente di suddividere internamente una rete principale in più sottoreti più piccole prendendo in prestito bit dalla porzione di Host ID:

$$\text{Indirizzo IP} = \langle \text{Network ID} \mathbin{\Vert} \text{Subnet ID} \mathbin{\Vert} \text{Host ID} \rangle$$

Per definire univocamente il confine tra la parte di rete/subnet e la parte di host si introduce la **Subnet Mask (Maschera di Rete)** a 32 bit:
* Bit a **1** indicano la porzione di Rete/Subnet.
* Bit a **0** indicano la porzione di Host.

$$\text{Indirizzo di Sottorete} = \text{Indirizzo IP} \ \mathbf{AND} \ \text{Subnet Mask}$$

![Struttura della Subnet Mask e divisione dell'indirizzo in NetID, SubnetID e HostID](images/reti/fig_p1_xref261_653x242.jpeg)

### 6.2 Notazione CIDR (/x)

La notazione compatta indica in coda all'indirizzo il numero di bit a 1 presenti nella maschera:
* Classe A naturale: `255.0.0.0` $\implies$ `/8`
* Classe B naturale: `255.255.0.0` $\implies$ `/16`
* Classe C naturale: `255.255.255.0` $\implies$ `/24`
* Esempio Subnetting: rete `193.206.144.64` con maschera `255.255.255.192` $\implies$ `193.206.144.64/26` ($26\text{ bit}$ di prefisso, $6\text{ bit}$ di host $\implies 2^6 - 2 = 62\text{ host utili}$).

> **Dimensione Minima di una Sottorete:**  
> Una sottorete deve contenere almeno **2 bit di host** ($2^2 = 4\text{ indirizzi IP}$):
> 1. Un indirizzo per identificare la Sottorete (Host ID tutti 0).
> 2. Un indirizzo per il Broadcast di Sottorete (Host ID tutti 1).
> 3. Almeno 2 indirizzi validi per gli host (es. `/30` con maschera `255.255.255.252`, ideale per link punto-punto tra router).

---

## 7. CIDR (Classless Inter-Domain Routing) e Supernetting

Con l'eliminazione definitiva delle classi fisse, la IETF ha standardizzato il **CIDR (Classless Inter-Domain Routing)**: la lunghezza del prefisso di rete può assumere qualsiasi valore arbitrario compreso tra `/1` e `/32`.

### 7.1 Supernetting (Aggregazione di Rotte)
Per evitare che l'aumento esponenziale delle sottoreti facesse esplodere le dimensioni delle tabelle di routing dei router di dorsale, il CIDR introduce il **Supernetting (Aggregazione di Prefissi)**: più blocchi di reti contigue vengono accorpati in un'unica voce riassuntiva (*route aggregation*).

```
   4 Reti di Classe C /24 distinte:
   193.206.144.0/24  -> 11000001.11001110.10010000.00000000
   193.206.145.0/24  -> 11000001.11001110.10010001.00000000
   193.206.146.0/24  -> 11000001.11001110.10010010.00000000
   193.206.147.0/24  -> 11000001.11001110.10010011.00000000
   --------------------------------------------------------
   Prefisso Comune:     11000001.11001110.100100--.-------- (22 bit costanti)
   
   Supernet Aggregata:  193.206.144.0/22  (Maschera: 255.255.252.0)
```

Un'unica entry nella tabella di routing sostituisce 4 voci separate, riducendo drasticamente il carico della memoria dei router.

![Aggregazione di prefissi CIDR (Supernetting)](images/reti/fig_p1_xref262_559x135.png)

### 7.2 Instradamento con Regola del Longest Prefix Match

Quando un router riceve un pacchetto, l'IP di destinazione può corrispondere contemporaneamente a molteplici voci presenti nella tabella di inoltro con lunghezze di maschera differenti. Il router applica rigorosamente la regola del **Longest Prefix Match (Matching Prefix più lungo)**, selezionando la rotta più specifica (ossia con il maggior numero di bit a 1 nella subnet mask).

#### Esempio Pratico di Inoltro:
Si consideri un pacchetto con indirizzo di destinazione **`130.251.61.129`** e la seguente tabella di routing:

| Voce | Rete di Destinazione / Prefisso | Interfaccia di Uscita | Corrispondenza Binaria |
|---|---|---|---|
| 1 | `130.0.0.0/8` | Interfaccia 1 | `10000010` (8 bit match) $\implies$ **Match** |
| 2 | `130.251.0.0/16` | Interfaccia 2 | `10000010.11111011` (16 bit match) $\implies$ **Match** |
| 3 | `130.251.61.0/24` | Interfaccia 3 | `10000010.11111011.00111101` (24 bit match) $\implies$ **Match** |
| 4 | `130.251.61.64/26` | Interfaccia 4 | Richiede bit `01` su 25° e 26° ($129 = \mathbf{10}000001_2$) $\implies$ **No Match** |

* Analisi: l'indirizzo corrisponde alle voci 1, 2 e 3.
* **Decisione di Inoltro:** il router sceglie la **Voce 3 (`130.251.61.0/24`)** verso l'**Interfaccia 3**, poiché possiede il prefisso corrispondente più lungo ($/24 > /16 > /8$).

---

## 8. Internet Protocol versione 6 (IPv6 - RFC 8200)

Sviluppato dall'IETF per risolvere in modo definitivo l'esaurimento dello spazio di indirizzamento IPv4, **IPv6 (IP Next Generation)** introduce un'architettura a 128 bit e una sostanziale semplificazione delle operazioni di instradamento.

### 8.1 Caratteristiche Fondamentali di IPv6
1. **Spazio di Indirizzamento Quasi Illimitato:** $2^{128} \approx 3.4 \times 10^{38}$ indirizzi unici.
2. **Header a Lunghezza Fissa (40 byte):** eliminazione del campo *IHL*, rendendo l'elaborazione hardware nei router immediata e predicibile.
3. **Offloading della Frammentazione:** i router intermedi **non eseguono mai la frammentazione** dei pacchetti (se un pacchetto supera la MTU, viene scartato e viene generato un ICMPv6 *Packet Too Big*). La frammentazione è demandata esclusivamente all'host sorgente (*Path MTU Discovery*).
4. **Eliminazione del Checksum di Header:** l'integrità è già garantita dai livelli 2 (Ethernet CRC) e 4 (TCP/UDP checksum), eliminando il ricalcolo ad ogni hop.
5. **Supporto Nativo per Qualità del Servizio (QoS) e Sicurezza (IPsec integrato).**

### 8.2 Formato e Notazione degli Indirizzi IPv6

Un indirizzo IPv6 è composto da **16 byte (128 bit)**, rappresentato da 8 gruppi di 4 cifre esadecimali separati da due punti `:`:

```
  Formato Esteso:   2001:0db8:0000:0000:0008:0800:200c:417a
```

#### Regole di Compressione e Semplificazione:
1. **Omissione degli zeri iniziali:** all'interno di ciascun gruppo a 16 bit, gli zeri non significativi a sinistra possono essere rimossi (`:0008:` $\to$ `:8:`).
2. **Compressione dei blocchi di zeri contigui (`::`):** una o più serie consecutive di gruppi composti interamente da zeri possono essere compresse una sola volta in un doppio due punti `::`:
   $$2001:0\text{db}8:0000:0000:0008:0800:200c:417a \implies \mathbf{2001:db8::8:800:200c:417a}$$

### 8.3 Header del Pacchetto IPv6 (40 byte fissi)

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version| Traffic Class |           Flow Label                  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Payload Length        |  Next Header  |   Hop Limit   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                                                               |
+                     Source IPv6 Address                       +
|                          (128 bit)                            |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                                                               |
+                  Destination IPv6 Address                     +
|                          (128 bit)                            |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

* **Version (4 bit):** impostato a $6$.
* **Traffic Class (8 bit):** equivalente al ToS/DiffServ di IPv4 per la gestione delle classi di priorità.
* **Flow Label (20 bit):** identifica pacchetti appartenenti allo stesso flusso multimediale in tempo reale (audio/video), consentendo ai router di instradarli lungo lo stesso cammino senza analizzare l'header di trasporto.
* **Payload Length (16 bit):** dimensione del carico utile in byte, escludendo i 40 byte dell'header base.
* **Next Header (8 bit):** specifica il protocollo di trasporto superiore (TCP, UDP) o la presenza di un **Extension Header** successivo a catena (*Hop-by-Hop, Routing, Fragment, Security*).
* **Hop Limit (8 bit):** sostituto diretto del campo TTL di IPv4.

---

## 9. Tecniche di Transizione da IPv4 a IPv6

La migrazione globale da IPv4 a IPv6 richiede la coesistenza a lungo termine dei due protocolli:

```
  A) Dual-Stack                      B) Tunneling (IPv6 over IPv4)       C) NAT64 / Translation
  
   +---------------+                  +-----------------------------+     +--------+  NAT64  +--------+
   | Applicazione  |                  | Pacchetto IPv6 Incapsulato  |     | Rete   | ------> | Rete   |
   +-------+-------+                  | [ Header IPv4 ][ Header IPv6]|    | IPv6   | <------ | IPv4   |
   | IPv4  | IPv6  |                  +-----------------------------+     +--------+         +--------+
   +-------+-------+                           Tunnel IPv4
```

1. **Dual-Stack:**
   * Nodi e router eseguono simultaneamente entrambi gli stack protocollari IPv4 e IPv6.
   * Lo smistamento a livello Data Link avviene mediante il campo **EtherType**:
     * `0x0800`: incapsula un datagramma **IPv4**.
     * `0x86DD`: incapsula un datagramma **IPv6**.
   * *Limiti:* non risolve la scarsità di IP (ogni interfaccia necessita comunque di un indirizzo IPv4).

2. **Tunneling (Incapsulamento):**
   * Consente a due isole IPv6 di comunicare attraverso una dorsale o rete geografica solo-IPv4.
   * Il pacchetto IPv6 viene interamente incapsulato nel payload di un datagramma IPv4 (*IPv6 over IPv4*), inviato lungo il tunnel, e decapsulato all'estremità remota.

3. **Traduzione Indirizzi (NAT64 / NAT-PT):**
   * Traduce a livello di frontiera gli header e gli indirizzi da IPv6 a IPv4 e viceversa, consentendo a client solo-IPv6 di accedere a server solo-IPv4.
   * **IPv4-Mapped IPv6 Address:** notazione formata da 80 bit a 0, 16 bit a 1 e i restanti 32 bit con l'IP IPv4:
     $$\mathbf{::ffff:192.0.2.1} \quad \Longleftrightarrow \quad 0:0:0:0:0:\text{ffff}:C000:0201_{16}$$

![Schema di transizione IPv4 / IPv6 con Dual-Stack e Tunneling](images/reti/fig_p1_xref265_571x98.jpeg)

---

## 10. Protocolli di Controllo e Servizio del Livello di Rete

### 10.1 DHCP (Dynamic Host Configuration Protocol)
Consente la configurazione automatica e dinamica dei parametri IP degli host all'atto della connessione:
* **Parametri forniti:** Indirizzo IP assegnato, Subnet Mask, Default Gateway (IP del router locale), Server DNS primario e secondario.
* **Ciclo di Negoziazione DORA:**
  1. **DHCP Discover:** inviato dal client in broadcast (`255.255.255.255`, porta UDP 67).
  2. **DHCP Offer:** il server DHCP risponde proponendo un indirizzo IP disponibile.
  3. **DHCP Request:** il client richiede formalmente l'assegnazione dell'indirizzo offerto.
  4. **DHCP ACK:** il server conferma la locazione e notifica i parametri di rete.
* **Lease Time:** l'assegnazione è temporanea (locazione con scadenza a tempo); il client deve rinnovare periodicamente la richiesta prima della scadenza.

### 10.2 ICMP (Internet Control Message Protocol - RFC 792)
Protocollo ausiliario incapsulato direttamente nei datagrammi IP (Protocol ID = 1) utilizzato da router e host per la diagnostica, la segnalazione di anomalie e la notifica di errori:

| Tipo ICMP | Nome Messaggio | Descrizione e Utilizzo |
|---|---|---|
| **Type 3** | *Destination Unreachable* | Notifica alla sorgente che la rete, l'host, la porta o il protocollo di destinazione non sono raggiungibili. |
| **Type 11** | *Time Exceeded* | Segnala la scadenza del Time-to-Live ($\text{TTL} = 0$). È il meccanismo alla base dell'utility `traceroute`. |
| **Type 12** | *Parameter Problem* | Errore o inconsistenza rilevata nei campi dell'header IP. |
| **Type 4** | *Source Quench* | Storicamente usato per il controllo di congestione (ora deprecato in favore del controllo a livello TCP). |
| **Type 5** | *Redirect* | Il router informa l'host mittente dell'esistenza di un gateway locale più efficiente per quella destinazione. |
| **Type 8 / 0** | *Echo Request / Echo Reply* | Verifica bidirezionale di raggiungibilità e misurazione del Round Trip Time (utilizzato dal comando `ping`). |
| **Type 13 / 14** | *Timestamp / Timestamp Reply* | Stima della sincronizzazione temporale e del ritardo di rete. |

---

## 11. Principi di Routing e Inoltro nei Datagrammi IP

Il routing IP si basa sul modello **Hop-by-Hop** con politica **Best-Effort**: ogni router decide autonomamente la porta di inoltro in base al solo indirizzo IP di destinazione.

```
       [ HOST SORGENTE A ] (192.168.1.10)
               |
               v (Verifica Subnet: Destinazione Locale o Remota?)
       +---------------------------------------------------------------+
       | È sulla STESSA Subnet?                                        |
       |  - SI: INSTRADAMENTO DIRETTO (Risolvi MAC locale con ARP)     |
       |  - NO: INSTRADAMENTO INDIRETTO (Invia al MAC Default Gateway) |
       +---------------------------------------------------------------+
               |
               v (Attraversa router intermedi R1, R2...)
       [ ROUTER DESTINAZIONE ] ---> INSTRADAMENTO DIRETTO FINALE ---> [ HOST DESTINATARIO B ]
```

### 11.1 Instradamento Diretto
* Si verifica quando l'host mittente e l'host destinatario appartengono alla **stessa sottorete IP** (stesso dominio di broadcast Layer 2).
* Il mittente applica la propria subnet mask all'IP di destinazione; rilevando che il prefisso coincide con la propria rete, avvia direttamente la risoluzione dell'indirizzo fisico tramite **ARP** e trasmette la trama Ethernet sul link locale senza coinvolgere router intermedi.

### 11.2 Instradamento Indiretto
* Si verifica quando l'host di destinazione appartiene a una **sottorete IP diversa e remota**.
* Il mittente non può consegnare il frame direttamente:
  1. Incapsula il pacchetto IP impostando l'IP sorgente di $A$ e l'**IP di destinazione finale di $B$**.
  2. A livello Data Link, imposta come MAC di destinazione l'**indirizzo MAC del Default Gateway (Router locale)**, ottenuto tramite ARP.
  3. Il router riceve la trama, rimuove l'header Layer 2, consulta la propria tabella di routing e reincapsula il pacchetto verso il router successivo (*Next-Hop*).
  4. Il processo si ripete hop-by-hop fino al router finale, che eseguirà l'ultimo **instradamento diretto** verso l'host destinatario.

---

## 12. Address Resolution Protocol (ARP - RFC 826)

Il protocollo **ARP (Address Resolution Protocol)** opera come anello di congiunzione tra il Livello di Rete (indirizzi logici IP a 32 bit) e il Livello Data Link (indirizzi fisici MAC a 48 bit).

```
   Host Mittente A (192.168.1.10)                  Host Destinatario B (192.168.1.20)
         |                                                 |
         |======== 1. ARP Request (BROADCAST) ============>| (Ricevuto da tutti gli host)
         |  "Chi possiede l'IP 192.168.1.20? Dillo ad A"   |
         |                                                 |
         |<------- 2. ARP Reply (UNICAST) -----------------| (Inviato solo da B)
         |  "192.168.1.20 ha MAC 00:1A:2B:3C:4D:5E"        |
         |                                                 |
         +--> [ Aggiorna Tabella ARP Cache Locale ] -------+
```

### 12.1 Meccanismo di Risoluzione
1. **ARP Request (Broadcast):** quando un host deve inviare un pacchetto IP a un nodo locale di cui non conosce il MAC, emette un frame ARP in broadcast (`FF:FF:FF:FF:FF:FF`) contenente la query: *"Chi ha l'indirizzo IP X? Comunicalo all'IP Y"*.
2. **ARP Reply (Unicast):** solo l'host che possiede l'indirizzo IP richiesto risponde inviando un frame ARP unicast contenente il proprio indirizzo MAC fisico.

### 12.2 ARP Cache e Invecchiamento
* Per evitare di inviare una richiesta ARP in broadcast per ogni singolo pacchetto, ciascun host e router mantiene in memoria una **ARP Cache (Tabella ARP)**:
  $$\text{ARP Cache Entry} = \langle \text{Indirizzo IP}, \text{Indirizzo MAC}, \text{TTL (Tempo di Vita)} \rangle$$
* Le voci dinamiche hanno un tempo di scadenza tipico di $20\text{ minuti}$. Alla scadenza, la voce viene rimossa per consentire l'aggiornamento in caso di sostituzione delle schede di rete.
* È possibile configurare **voci statiche manuali** prive di scadenza per apparati che non supportano correttamente ARP o per motivi di sicurezza (prevenzione dell'*ARP Spoofing*).
* **RARP (Reverse ARP):** protocollo complementare (oggi sostituito da DHCP/BOOTP) che consentiva a macchine prive di memoria di massa (diskless workstation) di ottenere il proprio indirizzo IP a partire dal proprio MAC address all'avvio.

---


<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- SEZIONE: 10 - Livello di Rete (Routing).md -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

# Capitolo 10 – Livello di Rete: Algoritmi e Protocolli di Routing

> Appunti del corso di **Reti di Calcolatori** — Anno Accademico 2025/2026  
> Trascrizione completa, dettagliata e fedele delle lezioni su architettura di routing, algoritmi di instradamento (Distance Vector e Link-State) e protocolli gerarchici (RIP, OSPF, BGP).

---

## 1. Architettura di Interconnessione e Dispositivi di Rete

### 1.1 Differenze Fondamentali tra Modem e Router

Nel contesto delle comunicazioni di rete e dell'accesso a Internet, è essenziale distinguere i ruoli e i compiti specifici svolti da modem e router:

* **Modem (Modulatore/Demodulatore):**
  * Il termine nasce dalla fusione delle parole **MO**dulatore e **DEM**odulatore.
  * È il dispositivo hardware deputato alla conversione dei segnali tra il dominio digitale e quello analogico:
    * *In trasmissione:* converte (modula) i flussi di dati digitali generati dall'elaboratore in segnali ad impulsi analogici idonei a propagarsi sul mezzo trasmissivo fisico (es. il doppino telefonico in rame per ADSL/VDSL o fibra/cavo coassiale).
    * *In ricezione:* compie l'operazione inversa (demodulazione), estraendo il segnale digitale puro a partire dalla forma d'onda analogica ricevuta.
  * **Funzione primaria:** Fornire e stabilire il collegamento fisico e logico punto-punto verso l'Internet Service Provider (ISP).
* **Router (Instradatore):**
  * È un dispositivo intelligente operante a livello 3 (Livello di Rete) del modello OSI/ISO.
  * Si occupa di ricevere i pacchetti dati (datagrammi IP) e di **instradarli simultaneamente verso destinazioni differenti**, selezionando il percorso ottimale attraverso la topologia di rete.
  * Ha la capacità fondamentale di **interconnettere reti eterogenee** che utilizzano tecnologie fisiche e di livello di collegamento (Data Link) differenti (ad esempio collegando una LAN Ethernet IEEE 802.3 con una WLAN Wi-Fi IEEE 802.11 e una linea WAN punto-punto su fibra ottica).

| Dispositivo | Livello Operativo | Funzione Principale | Gestione Multipla Host / Reti |
| :--- | :--- | :--- | :--- |
| **Modem** | Livello 1 (Fisico) / Livello 2 | Modulazione/Demodulazione del segnale analogico/digitale | No (connette l'infrastruttura dell'operatore) |
| **Router** | Livello 3 (Rete) | Instradamento, switching di pacchetto, interconnessione di sottoreti | Sì (gestisce subnet multiple e tabelle di routing) |

---

## 2. Sistemi Autonomi (AS) e Classificazione dei Router

### 2.1 Definizione di Sistema Autonomo (Autonomous System - AS)

Un **Autonomous System (AS)** è definito come un insieme di reti di calcolatori e router gestiti sotto il controllo di un'**unica autorità tecnica e amministrativa**. All'interno di un AS viene applicata una politica di instradamento coerente e omogenea.

Internet è strutturata come una federazione gerarchica globale di decine di migliaia di Sistemi Autonomi interconnessi tra loro.

### 2.2 Classificazione Funzionale dei Router

In base al loro posizionamento topologico e al ruolo assunto rispetto ai confini del Sistema Autonomo, i router si classificano in:

1. **Interior Router (Router Interni):**
   * Instradano il traffico dati esclusivamente all'interno del medesimo Sistema Autonomo.
   * Non possiedono collegamenti diretti verso reti o AS esterni.
   * Scambiano informazioni di routing intra-dominio mediante protocolli **IGP (Interior Gateway Protocol)** come *OSPF* o *RIP*.
2. **Exterior Router (Router Esterni / Border Router):**
   * Router posizionati al confine periferico del Sistema Autonomo che collegano l'AS ad altri Sistemi Autonomi o alla dorsale Internet.
   * Vengono comunemente detti **Border Router** o **Router di Frontiera/Confine**.
   * Scambiano informazioni di raggiungibilità inter-dominio attraverso protocolli **EGP (Exterior Gateway Protocol)**, di cui lo standard globale attuale è il protocollo **BGP (Border Gateway Protocol)**.

```
       +-----------------------------------------------------+
       |               AUTONOMOUS SYSTEM (AS)                |
       |                                                     |
       |     [Interior Router] <---IGP---> [Interior Router] |
       |            ^                             ^          |
       |            | IGP                     IGP |          |
       |            v                             v          |
       |    [Interior Router] <---IGP---> [Border Router]    |
       +-----------------------------------------|-----------+
                                                 | BGP (EGP)
                                                 v
                                        +-----------------+
                                        | AS Esterno / IX |
                                        +-----------------+
```

---

## 3. Le Tabelle di Routing e l'Algoritmo di Inoltro

### 3.1 Informazioni Fondamentali del Router

Per poter instradare correttamente ed efficientemente i pacchetti nella rete, ogni router deve mantenere ed elaborare un insieme essenziale di informazioni:

1. **Indirizzo IP dell'Host di destinazione:** Estratto direttamente dall'header del datagramma IP ricevuto.
2. **Indirizzo dei router adiacenti (Vicini / Neighbors):** Da cui poter ricavare dinamicamente le informazioni sulla topologia delle reti e sottoreti remote raggiungibili.
3. **Percorsi alternativi:** L'elenco delle possibili traiettorie multi-hop per raggiungere ciascuna destinazione remota.
4. **Miglior percorso (Ottimale):** Il cammino a costo minimo verso ciascuna destinazione non direttamente connessa, calcolato in base alla metrica di routing adottata.

### 3.2 Struttura e Campi della Tabella di Routing

Le informazioni necessarie sono strutturate all'interno della **Tabella di Routing (Routing Table)**, composta dai seguenti campi:

* **Indirizzo IP di Destinazione (Network Address / Prefix):** Rappresenta il prefisso di rete o di sottorete da raggiungere. All'arrivo di un datagramma, il router ricerca se esiste una corrispondenza (entry) per tale destinazione.
* **Maschera di Sottorete (Subnet Mask $M$):** Definisce l'estensione del prefisso di rete associato.
* **Metrica (Cost / Metric):** Valore numerico assegnato dall'algoritmo di instradamento per quantificare il costo del percorso (es. numero di salti, inverso della banda, ritardo).
* **Next Hop (NH):** L'indirizzo IP del router adiacente a cui inoltrare il pacchetto per proseguire lungo il cammino ottimale.
* **Interfaccia d'Uscita (Interface $I$):** L'interfaccia fisica o logica locale del router attraverso cui trasmettere il frame contenente il pacchetto.
* **Timer:** Definisce l'intervallo temporale per l'invio e la validazione periodica degli aggiornamenti (updates) verso i router adiacenti.

### 3.3 Default Route e Risoluzione per Matching

Per impedire che la tabella di routing cresca a dismisura richiedendo la memorizzazione di ogni singolo indirizzo dell'intero pianeta, si applica la gerarchia:
* Si definisce una **Default Route** (Instradamento di Default) rappresentata convenzionalmente con il prefisso **$0.0.0.0/0$** (maschera a zero bit), che garantisce la corrispondenza con qualsiasi indirizzo IP. Il router delega così l'inoltro a router di livello gerarchico superiore quando non possiede una rotta specifica.

#### Operazione di Matching
Dato un datagramma destinato all'indirizzo $X$, per determinare se $X$ appartiene a una sottorete registrata nella tabella con indirizzo $Y$ e maschera $M$, il router esegue l'operazione logica di bitwise AND:
$$X \land M \stackrel{?}{=} Y \land M$$

#### Regola del Longest Prefix Matching (LPM)
Se durante la scansione della tabella di routing l'operazione di matching risulta positiva per più righe contemporaneamente (ad esempio una rotta più generale e una sottorete più specifica), il router applica rigorosamente la regola del **Longest Prefix Matching**:
$$\text{Scelta della entry con il maggior numero di bit a 1 nella maschera } M \text{ (prefisso più specifico / lungo).}$$

---

### 3.4 Procedura Dettagliata di Instradamento Eseguita dal Router $X$

All'arrivo di un datagramma sul router $X$, viene eseguita la seguente sequenza deterministica di passi:

```
[Arrivo Datagramma con destinazione Y]
                 │
                 ▼
      [Estrai indirizzo IP Y]
                 │
                 ▼
       È Y == X (Locale)? ──SÌ──► [Consegna dati al protocollo superiore]
                 │ NO
                 ▼
       [Decrementa TTL]
                 │
            È TTL == 0? ────SÌ──► [Scarta pacchetto e invia ICMP Time Exceeded]
                 │ NO
                 ▼
  È Y direttamente connesso? ──SÌ──► [Inoltro Diretto su LAN tramite ARP]
     (X and M == Y and M)
                 │ NO
                 ▼
[Scansione Tabella: Y and M == N and M]
                 │
  Trovate corrispondenze? ──SÌ──► [Inoltra a NH con Longest Prefix Match]
                 │ NO
                 ▼
   Esiste Default Route? ──SÌ──► [Inoltra a Default Gateway 0.0.0.0/0]
                 │ NO
                 ▼
    [Scarta Datagramma e Notifica Errore di Instradamento ICMP]
```

1. **Estrazione:** Estrae l'indirizzo IP di destinazione $Y$ dall'header IP.
2. **Verifica Locale:** Se $Y$ coincide con uno degli indirizzi del router $X$ stesso, estrae il payload (es. segmento TCP/UDP) e lo consegna localmente al protocollo di livello superiore indicato nel campo Protocol dell'header IP.
3. **Gestione TTL:** Decrementa il campo **Time To Live (TTL)** di 1. Se il valore raggiunge 0, il datagramma viene scartato e viene inviato un messaggio di notifica ICMP *Time Exceeded* all'host mittente.
4. **Consegna Diretta:** Verifica se la destinazione appartiene a una delle sottoreti direttamente connesse al router ($X \land M = Y \land M$). In caso positivo, inoltra direttamente il pacchetto all'host finale mediante risoluzione indirizzo MAC con il protocollo **ARP (Address Resolution Protocol)**.
5. **Corrispondenza Tabella:** Per tutte le righe della tabella di routing $[N, M, NH, I]$, verifica la condizione $Y \land M = N \land M$. Inoltra il datagramma verso l'interfaccia $I$ e l'indirizzo $NH$ corrispondenti alla maschera con prefisso più lungo (LPM).
6. **Default / Scarto:** Se nessuna riga soddisfa la condizione, inoltra il pacchetto verso il router di default ($0.0.0.0/0$). Se non è configurata alcuna default route, il datagramma viene scartato e viene generato un messaggio ICMP *Destination Unreachable*.

---

## 4. Strategie di Instradamento: Statico vs Dinamico

La determinazione e il popolamento dei percorsi all'interno delle tabelle di routing possono avvenire secondo due filosofie distinte:

### 4.1 Routing Statico
* **Funzionamento:** I percorsi vengono calcolati preventivamente offline dall'amministratore di rete e inseriti manualmente nella configurazione di ciascun apparato.
* **Vantaggi:** Estrema semplicità di esecuzione, nessun overhead di calcolo sulla CPU del router, nessun consumo di banda per messaggi di controllo periodici.
* **Svantaggi:** Totale assenza di flessibilità; non reagisce automaticamente a guasti, interruzioni di collegamento o variazioni del carico di traffico.
* **Ambiti di impiego ideali:** Reti di piccole dimensioni, router periferici con un'unica interfaccia di connessione verso il provider (**Stub Network**), oppure per impostare la rotta di default (*default gateway*).

### 4.2 Routing Dinamico
* **Funzionamento:** I percorsi vengono determinati e aggiornati continuamente in tempo reale mediante lo scambio cooperativo di messaggi tra i router tramite opportuni protocolli di routing.
* **Vantaggi:** Elevata resilienza e adattamento automatico a variazioni topologiche (guasti ai collegamenti, disattivazione di nodi) e a condizioni di congestione.
* **Svantaggi:** Consumo di risorse computazionali (CPU, RAM) e overhead di traffico di controllo sui canali di comunicazione.
* **Ambiti di impiego:** Reti complesse, topologie a maglia, reti aziendali distribuite e l'intera infrastruttura globale di Internet.

---

## 5. Metriche e Distanza Amministrativa

Quando un router deve selezionare il percorso migliore tra più opzioni disponibili per raggiungere la medesima destinazione, impiega due parametri fondamentali: la **Metrica** e la **Distanza Amministrativa**.

### 5.1 La Metrica
La metrica è il valore numerico quantitativo utilizzato da un algoritmo di instradamento per classificare i percorsi: un valore più basso indica un percorso preferibile ("a costo minore").

* **RIP:** Utilizza come metrica l'**Hop Count** (numero di router intermedi attraversati).
* **OSPF:** Utilizza un costo proporzionale all'inverso della **larghezza di banda (Bandwidth)** del link: $\text{Costo} = \frac{10^8}{\text{Bandwidth (bps)}}$.
* **IS-IS:** Assegna a ciascun link un costo configurabile.
* **BGP:** Utilizza una metrica vettoriale complessa basata sul numero di Sistemi Autonomi attraversati (**AS-Path length**) unita a policy amministrative (Local Preference, MED).

### 5.2 Distanza Amministrativa (Administrative Distance - AD)
Se un router riceve informazioni relative alla stessa destinazione da **fonti o protocolli diversi** (es. rotta statica, OSPF e RIP contemporaneamente), la metrica interna ai singoli protocolli non è confrontabile. Il router ricorre quindi alla **Distanza Amministrativa**, che quantifica l'affidabilità della sorgente informativa.

> **Regola fondamentale:** Minore è il valore della Distanza Amministrativa, maggiore è l'attendibilità della rotta.

| Sorgente di Routing | Distanza Amministrativa Tipica |
| :--- | :--- |
| **Interfaccia Direttamente Connessa** | **0** (Massima attendibilità) |
| **Rotta Statica** | **1** |
| **BGP Esterno (eBGP)** | **20** |
| **OSPF** | **110** |
| **IS-IS** | **115** |
| **RIP** | **120** |
| **BGP Interno (iBGP)** | **200** |

---

## 6. Modellazione della Rete come Grafo

Per formalizzare matematicamente il problema del routing, la topologia della rete viene rappresentata come un **grafo orientato e pesato**:
$$G = (V, E)$$
* $V$: Insieme dei vertici (nodi), dove ogni nodo rappresenta un **router**.
* $E$: Insieme degli archi (link), dove ogni arco $(u, v) \in E$ rappresenta un **canale di comunicazione** orientato dal router $u$ al router $v$.
* $c(u, v)$: Funzione di costo associata all'arco $(u, v)$ in base alla metrica definita.

Il costo di un cammino $P = (v_1, v_2, \dots, v_k)$ è espresso dalla sommatoria dei costi degli archi che lo compongono:
$$\text{Costo}(P) = \sum_{i=1}^{k-1} c(v_i, v_{i+1})$$

L'obiettivo dell'instradamento è individuare per ogni coppia di nodi il **cammino di costo minimo (Shortest Path)**.

---

## 7. Algoritmi Distance Vector (Bellman-Ford)

### 7.1 Principio Fondamentale

L'algoritmo **Distance Vector** è un approccio distribuito, iterativo e asincrono basato sull'equazione di ottimalità di **Bellman-Ford**.

Ogni nodo $x$ calcola la distanza minima verso ogni possibile destinazione $y$ valutando la somma tra il costo del link verso il nodo adiacente $v$ e la distanza minima annunciata da $v$ verso $y$:
$$d_x(y) = \min_{v \in \text{Vicini}(x)} \{ c(x, v) + d_v(y) \}$$

* **Complessità Computazionale:** $\mathcal{O}(|V| \cdot |E|)$, dove $|V|$ è il numero di nodi ed $|E|$ è il numero di archi del grafo.

```
       [Nodo x]
        /     \
 c(x,v)/       \ c(x,w)
      v         v
   [Nodo v]   [Nodo w]
      \         /
       \       /
        v     v
       [Destinazione y]

 dx(y) = min { c(x,v) + dv(y), c(x,w) + dw(y) }
```

### 7.2 Struttura e Aggiornamento del Distance Vector

* Ciascun router mantiene in memoria:
  1. La propria **Tabella di Instradamento**.
  2. Un vettore delle distanze (**Distance Vector**) associato a ciascun router adiacente connesso.
* Il Distance Vector inviato periodicamente ai vicini contiene le tuple:
  $$(\text{Prefisso/Indirizzo}, \text{Maschera}, \text{Costo/Distanza})$$
* **Procedura di Fusione (Merge):**
  * Quando un nodo riceve un Distance Vector da un vicino, ricalcola i costi per tutte le destinazioni.
  * Tra più entry per la medesima destinazione, viene selezionata quella a **minor costo**.
  * A parità di costo complessivo, viene selezionata l'entry con il **minor numero di salti (hops)**.
* **Caratteristica di Convergenza:** L'algoritmo reagisce molto rapidamente quando i costi migliorano ("le buone notizie viaggiano veloci"), ma è estremamente lento ad adattarsi quando i costi aumentano o i collegamenti cadono. Per questo motivo è sconsigliato su reti geografiche di vaste dimensioni.

---

## 8. L'Algoritmo di Flooding (Inondazione)

Il **Flooding** è una tecnica di instradamento in cui un router, non appena riceve un pacchetto dati su una determinata linea, lo **inoltra in copia su tutte le altre linee attive**, ad eccezione di quella da cui il pacchetto è pervenuto.

### 8.1 Meccanismi di Contenimento della Duplicazione

Senza opportuni controlli, il flooding provocherebbe una proliferazione esponenziale incontrollata di pacchetti duplicati (tempesta di broadcast). Per limitare questo fenomeno si adottano due meccanismi:

1. **Contatore di Salto (Hop Count / TTL):**
   * Nel pacchetto viene inserito un contatore che viene decrementato di 1 ad ogni passaggio di router.
   * Il valore iniziale ideale corrisponde al diametro massimo della rete (la massima distanza tra due nodi qualsiasi). Quando il contatore si azzera, il pacchetto viene scartato.
2. **Numero di Sequenza con Tracciamento:**
   * Ciascun router sorgente appone al pacchetto un identificativo univoco e un numero di sequenza progressivo.
   * I router intermedi memorizzano le coppie (Sorgente, Numero di Sequenza) già transitate. Se giunge un pacchetto con numero di sequenza già elaborato o inferiore a una soglia $k$, il pacchetto viene scartato immediatamente. Raggiunta la soglia $k$, i contatori vengono riallineati per evitare overflow.

### 8.2 Analisi di Prestazioni: Pregi e Difetti

| Aspetti Positivi del Flooding | Aspetti Negativi del Flooding |
| :--- | :--- |
| **Optimalità Temporale:** Il primo pacchetto a giungere a destinazione segue sempre il cammino minimo assoluto. | **Inefficienza di Rete:** Moltiplica i pacchetti su tutti i canali, consumando una quota enorme di banda. |
| **Resilienza Estrema:** Altamente tollerante a guasti multipli e a repentine modifiche topologiche. | **Sovraccarico dei Nodi:** Impone a tutti i router della rete l'onere di processare e scartare repliche. |
| **Assenza di Informazioni a Priori:** Non richiede la conoscenza preventiva della topologia. | Non scalabile per l'inoltro ordinario del traffico dati su larga scala. |

> **Nota di utilizzo:** Nonostante l'inefficienza per il traffico dati ordinario, il flooding è fondamentale come meccanismo di distribuzione per i pacchetti di controllo negli algoritmi Link-State (LSP/LSA).

---

## 9. Tecniche di Propagazione e Limiti di Distance Vector

### 9.1 Confronto sulla Propagazione degli Aggiornamenti

* **Distance Vector:**
  * L'intera tabella di instradamento (o il vettore riassuntivo) viene inviata **solo ai vicini direttamente connessi**.
  * Gli invii avvengono **periodicamente** (es. ogni 30 secondi in RIP) o in risposta a variazioni locali.
  * La convergenza è lenta: anche su topologie di soli 3 router, la propagazione completa può richiedere svariati minuti.
* **Link-State:**
  * Gli aggiornamenti contengono solo lo stato locale dei propri link e vengono propagati **a tutti i router del dominio** mediante **flooding**.
  * Gli annunci vengono generati **su evento** (quando si verifica una variazione di stato) e periodicamente a intervalli molto lunghi (es. ogni 30-60 minuti).

---

### 9.2 Il Problema dei Routing Loops e del Conteggio all'Infinito (Count-to-Infinity)

Consideriamo tre router $A$, $B$, $C$ in linea collegati a una rete $10.4.0.0/24$ attestata su $C$:

```
[A] <=======> [B] <=======> [C] <------ (Rete 10.4.0.0/24)
```

1. In condizioni di regime: $C$ vede $10.4.0.0$ a distanza 0, $B$ a distanza 1 (via $C$), $A$ a distanza 2 (via $B$).
2. La rete $10.4.0.0$ va improvvisamente **DOWN**. $C$ rileva il guasto e smette di annunciarla.
3. Se prima che $C$ notifichi il guasto, $B$ invia il suo aggiornamento periodico a $C$ (in cui dichiara di raggiungere $10.4.0.0$ a costo 1), $C$ registra erroneamente di poter raggiungere $10.4.0.0$ tramite $B$ a costo $1 + 1 = 2$.
4. Al ciclo successivo, $B$ riceve l'annuncio da $C$ e aggiorna il suo costo a $2 + 1 = 3$. $A$ a sua volta aggiorna il costo a 4.
5. L'informazione incoerente rimbalza tra i router e la metrica incrementa progressivamente verso l'infinito (**Count to Infinity**), creando un loop di instradamento in cui i pacchetti rimangono intrappolati.

```
Stato Iniziale:
  C -> 10.4.0.0 (costo 0)
  B -> 10.4.0.0 via C (costo 1)
  A -> 10.4.0.0 via B (costo 2)

Guasto Rete 10.4.0.0:
  Passo 1: B annuncia a C costo 1  ---> C imposta rotta via B con costo 2
  Passo 2: C annuncia a B costo 2  ---> B imposta rotta via C con costo 3
  Passo 3: B annuncia ad A costo 3  ---> A imposta rotta via B con costo 4
  Passo 4: Iterazione ciclica fino a INF (Routing Loop / Count to Infinity)
```

---

### 9.3 Tecniche di Mitigazione per Distance Vector

Per risolvere e mitigare le problematiche di loop e convergenza lenta si combinano diverse tecniche:

1. **Definizione di un Limite Massimo di Salti (Max Hop Count):**
   * Si fissa un valore limite finito che rappresenta l'infinito ($\infty$). Nel protocollo RIP, $\infty = 16$. Un costo di 16 indica destinazione irraggiungibile, arrestando il loop.
2. **Split Horizon:**
   * **Regola:** Un router $X$ non deve mai riannunciare una rotta verso una destinazione sull'interfaccia da cui ha appreso tale rotta.
3. **Route Poisoning e Poison Reverse:**
   * Quando una rete cade, il router adiacente non smette semplicemente di annunciarla, ma invia immediatamente un aggiornamento in cui assegna a quella rete una metrica pari a **infinito** ($\infty$).
   * I router che ricevono questo annuncio pongono la destinazione in uno stato speciale denominato **"Possibly Down"** e rimandano indietro un messaggio di **Poison Reverse** a conferma dell'avvenuta invalidazione.
4. **Hold-Down Timers:**
   * Per evitare gli effetti distruttivi delle fluttuazioni rapide dei canali (link flapping, ovvero un circuito che cade e risale in pochi secondi), all'atto della ricezione di un Poisoning il router avvia un timer di **Hold-Down**.
   * Durante tutto l'intervallo del timer, il router non accetta aggiornamenti che propongano percorsi con metrica peggiore o uguale per quella specifica destinazione.
5. **Triggered Updates (Aggiornamenti su Evento):**
   * Non appena un router rileva una modifica di stato, trasmette all'istante l'aggiornamento ai vicini senza attendere lo scadere del timer periodico ordinario.

---

## 10. Algoritmi Link-State e Dijkstra

Gli algoritmi **Link-State** sono stati sviluppati per superare i limiti intrinseci di convergenza e instabilità del Distance Vector.

### 10.1 Principio di Funzionamento

In un algoritmo Link-State, ogni router esegue quattro fasi fondamentali:
1. **Rilevamento dei vicini:** Invia messaggi di benvenuto (*Hello Packets*) per identificare i router direttamente adiacenti e misurarne il costo del collegamento.
2. **Generazione dei pacchetti LSP/LSA:** Crea un pacchetto denominato **Link State Packet (LSP)** o **Link State Advertisement (LSA)** contenente:
   * Identificativo univoco del router generatore.
   * Numero di sequenza (a 32 bit).
   * Age / Time to Live.
   * Elenco dei collegamenti attivi e relativo costo.
3. **Distribuzione per Flooding:** Invia il proprio LSP a tutti i router del dominio mediante flooding affidabile.
4. **Costruzione del Database Topologico:** Ogni router aggrega tutti gli LSP ricevuti, ottenendo una visione identica, completa e sincronizzata dell'intero grafo di rete ($G=(V, E)$).
5. **Calcolo dei Cammini Minimi con Dijkstra:** Ciascun router calcola in modo del tutto autonomo l'albero dei cammini minimi (**Shortest Path Tree - SPT**) ponendo se stesso come radice mediante l'algoritmo di Dijkstra, ricavando la propria tabella di routing ottimale.

### 10.2 Requisiti di Memoria e Routing Gerarchico

In una rete composta da $n$ router in cui ciascun nodo possiede mediamente $k$ vicini, la quantità di memoria necessaria in ogni nodo per rappresentare il database topologico è proporzionale a:
$$\text{Memoria} \propto k \cdot n$$

All'aumentare della dimensione della rete, il grafo topologico diventa oneroso da memorizzare e il ricalcolo di Dijkstra richiede troppa CPU. Per risolvere questo limite si suddivide la rete in **Aree Gerarchiche (Hierarchical Routing)**:
* Il flooding degli LSA rimane confinato all'interno della singola area locale.
* L'instradamento inter-area richiede solo tre informazioni:
  1. Instradamento dal nodo sorgente alla periferia dell'area di appartenenza (**Area Border Router - ABR**).
  2. Instradamento attraverso l'area dorsale (**Backbone Area**) verso l'area di destinazione.
  3. Instradamento dall'ABR di destinazione al nodo finale all'interno dell'area remota.

---

## 11. Protocolli IGP: RIP vs OSPF

All'interno di un singolo Sistema Autonomo (Intra-AS) i due protocolli IGP storicamente più rilevanti sono **RIP** e **OSPF**.

### 11.1 RIP (Routing Information Protocol)
* Derivato dalla suite originaria di ARPANET, basato interamente su **Distance Vector**.
* Metrica esclusiva: Hop Count (massimo 15 salti, 16 = infinito).
* Aggiornamenti inviati periodicamente ogni 30 secondi in broadcast/multicast.
* Adatto solo a reti di dimensioni molto ridotte e a topologie semplici.

### 11.2 OSPF (Open Shortest Path First)
OSPF è il protocollo Link-State aperto (privo di vincoli di brevetto) standard de facto per le reti enterprise e provider moderne.

#### Requisiti di Progetto e Caratteristiche Avanzate:
* **Standard Aperto ("Open"):** Specificato nelle RFC dell'IETF.
* **Metriche Flessibili:** Supporta diverse metriche di costo basate su larghezza di banda, ritardo o costi amministrativi.
* **Rapida Convergenza:** Ricalcolo immediato della topologia su variazioni di stato tramite algoritmo di Dijkstra.
* **Type of Service (TOS) Routing:** Instradamento differenziato in base ai campi di priorità/QoS dell'header IP.
* **Equal-Cost Multi-Path (ECMP):** Capacità di bilanciare il traffico dati in parallelo su più percorsi a costo uguale.
* **Routing Gerarchico a Due Livelli:** Suddivisione in Area Backbone (*Area 0*) e aree secondarie (*Stub, Totally Stubby, NSSA*).
* **Sicurezza e Autenticazione:** Tutti gli scambi di pacchetti OSPF possono essere autenticati crittograficamente (MD5 / SHA).
* **Supporto per Tunneling:** Gestione di collegamenti logici virtuali (*Virtual Links*).

#### Tipologie di Connessioni Gestite da OSPF:
1. **Punto-Punto (Point-to-Point):** Connessione diretta tra due router (es. linea seriale dedicata).
2. **Rete Locale Multiaccesso Broadcast (Broadcast Multi-Access):** Reti LAN con più router (es. Ethernet) in cui viene eletto un **Designated Router (DR)** e un **Backup Designated Router (BDR)** per ridurre il numero di adiacenze da $\mathcal{O}(n^2)$ a $\mathcal{O}(n)$.
3. **Rete Geografica Multiaccesso Non-Broadcast (NBMA):** Reti geografiche multi-nodo prive di supporto broadcast nativo (es. Frame Relay, ATM).

---

### 11.3 Tabella Comparativa Completa: RIP vs OSPF

| Caratteristica | RIP (v1 / v2) | OSPF (v2 / v3) |
| :--- | :--- | :--- |
| **Tipo di Algoritmo** | Distance Vector (Bellman-Ford) | Link-State (Dijkstra) |
| **Metrica Adottata** | Hop Count (n. di salti, max 15) | Costo inverso alla Banda ($10^8/\text{BW}$) |
| **Tempo di Convergenza** | Lento (minuti, rischio Count-to-Infinity) | Molto Rapido (pochi secondi) |
| **Consumo Banda di Controllo** | Invio periodico dell'intera tabella | Invio su evento dei soli delta (LSA) |
| **Supporto Gerarchico** | No (topologia piatta) | Sì (Aree OSPF: Backbone Area 0 + Aree periferiche) |
| **Bilanciamento Carico** | Limitato | Sì (Equal-Cost Multi-Path nativo) |
| **Scalabilità** | Reti piccole ($< 15$ salti) | Reti aziendali e provider molto grandi |
| **Complessità Computazionale** | Minima su CPU e RAM | Elevata (albero SPT calcolato da ciascun nodo) |

---

## 12. Routing Inter-Dominio e Protocollo BGP

### 12.1 La Necessità di un Protocollo Inter-AS

All'interno di Internet non è possibile utilizzare un unico algoritmo di instradamento globale per tre ragioni fondamentali:
1. **Scalabilità:** Le tabelle di un algoritmo Link-State globale richiederebbero una quantità ingestibile di memoria e CPU su scala planetaria.
2. **Autonomia Amministrativa:** Ciascun operatore/azienda deve essere libero di gestire la propria rete interna con le tecnologie, metriche e apparati preferiti.
3. **Politiche Commerciali (Policy Routing):** Le decisioni di instradamento tra operatori non dipendono solo dalla distanza geometrica o dai costi tecnici, ma da **accordi economici, contratti di transito e relazioni di peering**.

* L'antico protocollo **EGP (Exterior Gateway Protocol)** presupponeva una dorsale Internet centralizzata ad albero.
* È stato completamente rimpiazzato dallo standard **BGP (Border Gateway Protocol)**, attualmente alla versione 4 (BGP-4), che gestisce la complessa topologia a maglia globale di Internet.

---

### 12.2 Architettura del Protocollo BGP

BGP è classificato come protocollo **Path Vector (Vettore di Cammino)**. A differenza del Distance Vector puro:
* Ogni annuncio di raggiungibilità contiene non solo il costo, ma l'**intero elenco ordinato dei Sistemi Autonomi attraversati (**AS-Path**)** per raggiungere il prefisso di destinazione.
* Ciò garantisce l'**eliminazione immediata dei loop di instradamento inter-dominio**: se un router riceve un annuncio contenente il proprio numero di AS nell'AS-Path, rifiuta il messaggio all'istante.

#### Numeri di Sistema Autonomo (ASN - Autonomous System Number)
* Gli ASN sono identificativi numerici univoci a 16 bit (da 1 a 65.535) o estesi a 32 bit:
  * ASN Pubblici ($1 - 64.511$): Assegnati dagli enti di registrazione regionale (**RIR**: *RIPE NCC* in Europa, *ARIN* in Nord America, *APNIC* in Asia).
  * ASN Privati ($64.512 - 65.535$): Utilizzati internamente dalle organizzazioni per comunicare con il proprio ISP.

#### Tipi di Messaggi BGP
Le comunicazioni BGP avvengono aprendo una sessione **TCP affidabile sulla porta 179** tra i router di frontiera (**BGP Peering Session**). I messaggi scambiati sono 4:
1. **OPEN:** Inizializza la sessione di peering, negozia parametri e autentica i due endpoint.
2. **UPDATE:** Annuncia nuovi prefissi di rete raggiungibili con i relativi attributi di cammino (*Advertisement*) o revoca rotte non più valide (*Withdrawn Routes*).
3. **NOTIFICATION:** Inviato in caso di rilevamento di errori nella sessione o nell'header; provoca la chiusura immediata del peering.
4. **KEEPALIVE:** Messaggio periodico per verificare la connettività e lo stato attivo della sessione TCP in assenza di traffico UPDATE.

---

### 12.3 Attributi di Cammino BGP (Path Attributes)

Le decisioni di instradamento in BGP vengono prese valutando una sequenza rigorosa di **Path Attributes**:

* **ORIGIN:** Specifica l'origine dell'annuncio (IGP se originato internamente all'AS, EGP, o Incomplete se appreso per ridistribuzione statica).
* **AS-PATH:** Sequenza ordinata di numeri di AS attraversati dal prefisso. Un prefisso originato da un AS viene inserito in testa alla lista; ogni AS di transito pre-pende il proprio ASN.
* **NEXT-HOP:** Indirizzo IP del router di confine del salto successivo per raggiungere la destinazione.
* **LOCAL PREFERENCE (LocPrf):**
  * Attributo interno all'AS utilizzato per definire le politiche di **traffico in USCITA**.
  * Ha valore di default pari a **100**. Tra più uscite verso la medesima destinazione, il router seleziona la rotta con il **valore di Local Preference più ELEVATO**.
* **MED (Multi-Exit Discriminator):**
  * Attributo scambiato tra AS confinanti per dare un "suggerimento" all'AS esterno su quale canale preferire per il **traffico in INGRESSO**.
  * Funziona come una metrica: l'AS esterno preferisce il link con il valore di MED più **BASSO** (default = 0). Tuttavia, l'AS esterno non è obbligato a rispettarlo.
* **COMMUNITY:** Etichetta numerica facoltativa utilizzata per raggruppare prefissi e applicare policy di filtraggio uniformi.

```
+-----------------------------------------------------------------------------------+
|                        CONFRONTO TRA LOCAL PREF E MED                             |
+------------------------------------+----------------------------------------------+
| LOCAL PREFERENCE                   | MED (Multi-Exit Discriminator)               |
+------------------------------------+----------------------------------------------+
| • Controlla il traffico in USCITA  | • Suggerisce il traffico in INGRESSO         |
| • Scambiato solo all'interno dell'AS | • Scambiato tra AS confinanti              |
| • Regola: vince il valore più ALTO | • Regola: vince il valore più BASSO (costo)  |
| • Decisione categorica interna     | • Semplice "consiglio" non vincolante        |
+------------------------------------+----------------------------------------------+
```

#### La Tecnica dell'AS-Path Prepending
Un AS non può imporre categoricamente a un operatore esterno come instradare il traffico in ingresso, ma può influenzarne la scelta: duplicando artificialmente il proprio numero di AS nell'attributo AS-Path (**AS-Path Prepending**) su un link secondario, rende quel cammino apparentemente più lungo, costringendo gli altri AS a instradare il traffico sul link primario con AS-Path più breve.

---

## 13. Topologie di Connessione e Gerarchia di Internet

### 13.1 Classificazione delle Reti per Connettività

In base al numero di connessioni e di provider utilizzati, le reti aziendali si classificano in:

```
  [Stub Network]          [Multi-Homed Stub]          [Multi-Homed Network]
      +----+                   +----+                    +----+      +----+
      |Host|                   |Host|                    |Host|      |Host|
      +--+-+                   +--+-+                    +--+---+  +---+--+
         |                        |                         |      |
      [Router]             [Router1] [Router2]           [Router1] [Router2]
         |                     \     /                       |        |
      (Link1)               (Link1)(Link2)                (Link1)  (Link2)
         |                       \ /                         |        |
      [ ISP ]                  [ ISP ]                    [ISP-A]  [ISP-B]
```

1. **Stub Network:**
   * Singolo collegamento a un singolo Internet Service Provider.
   * L'instradamento statico con rotta di default ($0.0.0.0/0$) è pienamente sufficiente; non occorre BGP.
2. **Multi-Homed Stub Network:**
   * Due o più collegamenti verso il **medesimo ISP**.
   * Elimina il single-point-of-failure della linea fisica. Consente backup automatico o bilanciamento del carico tra i due link.
3. **Multi-Homed Network (Multi-Provider):**
   * Due o più collegamenti attestati su **provider (ISP) DIFFERENTI**.
   * È obbligatorio l'uso di BGP per gestire l'annuncio dei prefissi, le policy di asimmetria di traffico (il traffico può uscire da un provider ed entrare dall'altro) e il failover istantaneo in caso di guasto di un operatore.

---

### 13.2 Struttura a 3 Livelli (3-Tiers) di Internet e Punti di Interscambio (IXP)

La topologia globale di Internet non è una maglia uniforme, ma si organizza in una gerarchia commerciale a tre livelli:

* **Tier 1 (Global Transit-Free Providers):**
  * I colossi globali delle telecomunicazioni (es. Lumen, Telia, NTT, Sparkle, AT&T) che possiedono dorsali in fibra ottica intercontinentali e sottomarine.
  * Si interconnettono tra loro in modalità **Peering paritario puro** (senza scambiarsi pagamenti di transito per il traffico reciproco).
* **Tier 2 (Regional Providers):**
  * Operatori regionali e nazionali con ampia copertura che acquistano transito dai Tier 1 e si scambiano traffico localmente con altri Tier 2.
* **Tier 3 (Local Access Providers):**
  * I provider di accesso locali che forniscono connettività diretta alle utenze finali (clienti residenziali, piccole e medie imprese).

#### Internet Exchange Points (IXP / NAP)
I **Network Access Point (NAP)** o **Internet Exchange Point (IXP)** sono nodi di infrastruttura fisica neutrali costituiti da switch ad altissime prestazioni e bassissima latenza. Presso gli IXP, centinaia di ISP, Content Delivery Network (Google, Netflix, Meta) e grandi aziende si incontrano per stabilire accordi di **peering diretto pubblico**, scambiando ingenti volumi di traffico locale a costo zero senza dover transitare a pagamento sui Tier 1.

> **Esempio notevole:** In Italia, uno dei principali snodi di interscambio è il **MIX (Milan Internet Exchange)**, situato in prossimità dello Stadio San Siro a Milano, che smista una percentuale fondamentale del traffico Internet nazionale.

---


<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- SEZIONE: 11 - Livello di Trasporto.md -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

# Capitolo 11 – Livello di Trasporto (Livello 4)

> Appunti del corso di **Reti di Calcolatori** — Anno Accademico 2025/2026  
> Trascrizione completa, approfondita e fedele delle lezioni su architettura del livello di trasporto, meccanismi di multiplexing/demultiplexing, protocolli UDP e TCP, handshake di connessione/chiusura, sliding window, controllo di flusso e controllo di congestione (Tahoe / Reno).

---

## 1. Ruolo e Funzione del Livello di Trasporto

Il **Livello di Trasporto (Transport Layer - Livello 4)** ha lo scopo primario di fornire un servizio di trasferimento dati **logico, affidabile o non affidabile, da estremo a estremo (end-to-end)** direttamente tra i processi applicativi in esecuzione su host differenti.

### 1.1 Differenza Concettuale Fondamentale: Livello di Rete vs Livello di Trasporto

* **Livello di Rete (Network Layer - Livello 3):**
  * Fornisce la comunicazione logica **Host-to-Host** (tra due elaboratori fisici identificati dai loro indirizzi IP).
  * Il livello di rete trasporta i pacchetti attraverso l'infrastruttura di routing ma non ha alcuna visibilità o consapevolezza delle singole applicazioni in esecuzione sui terminali.
* **Livello di Trasporto (Transport Layer - Livello 4):**
  * Fornisce la comunicazione logica **Process-to-Process** (tra i singoli processi applicativi eseguiti sui sistemi terminali, identificati dalle porte).
  * **Mascheramento dell'infrastruttura:** Maschera completamente ai livelli superiori la natura, la tecnologia, i limiti e la complessità della sottostante rete di interconnessione.
  * Nel modello **OSI/ISO**, lo strato superiore al trasporto è il *Livello di Sessione*; nello stack **TCP/IP**, lo strato superiore è direttamente il *Livello Applicazione*.

```
+-------------------------------------------------------------------------+
|                  APPLICAZIONE (Processo Web / Mail / DNS)               |
+-------------------------------------------------------------------------+
                                    ▲  ▲
        Process-to-Process Comm.    │  │ (Socket & Porte)
                                    ▼  ▼
+-------------------------------------------------------------------------+
|                       LIVELLO DI TRASPORTO (TCP / UDP)                  |
+-------------------------------------------------------------------------+
                                    ▲  ▲
        Host-to-Host Comm.          │  │ (Segmenti in Datagrammi IP)
                                    ▼  ▼
+-------------------------------------------------------------------------+
|                       LIVELLO DI RETE (IP - Routing)                    |
+-------------------------------------------------------------------------+
```

---

## 2. Servizi del Livello di Trasporto e Primitive

### 2.1 Compiti del Trasporto lato Mittente e Ricevente

* **Lato Trasmissione (Sender):**
  * Riceve i blocchi di dati o il flusso di byte dall'applicazione.
  * Suddivide i messaggi applicativi in unità di trasporto denominate **Segmenti (TCP)** o **Datagrammi Utente (UDP)**.
  * Aggiunge l'header di livello 4 (porte, numeri di sequenza, flag, checksum) e passa i segmenti al sottostante livello di rete (IP).
* **Lato Ricezione (Receiver):**
  * Riceve i datagrammi dal livello di rete ed estrae i segmenti di trasporto.
  * Verifica l'integrità dei dati mediante il checksum.
  * Riordina i dati se necessario, invia i riscontri (ACK) e riassembla i segmenti nel messaggio originale, consegnandolo alla specifica applicazione di destinazione.

### 2.2 I Due Protocolli Fondamentali di Internet

1. **TCP (Transmission Control Protocol):**
   * Servizio **Connection-Oriented** (orientato alla connessione).
   * Fornisce un canale logico affidabile su una rete intrinsecamente inaffidabile (best-effort IP).
   * Garantisce: consegna ordinata dei byte, recupero delle perdite (ritrasmissioni), controllo degli errori (checksum), **controllo del flusso** e **controllo della congestione**.
2. **UDP (User Datagram Protocol):**
   * Servizio **Connectionless** (senza connessione) e **inaffidabile**.
   * Invia i pacchetti senza instaurare alcuna negoziazione preventiva; non garantisce né l'ordine di arrivo né la consegna a destinazione. Massimizza l'efficienza e riduce a zero il ritardo di setup.

### 2.3 Primitive di Servizio

* **Per Servizi Connection-Oriented (TCP):**
  * `LISTEN`: Il processo server dichiara di essere pronto e in attesa di ricevere richieste di connessione in ingresso.
  * `CONNECT`: Il client invia una richiesta di connessione (*Connection Request - SYN*) verso un server remoto.
  * `SEND`: Il processo passa dati allo strato di trasporto per essere incapsulati e trasmessi.
  * `RECEIVE`: Il processo richiede al trasporto di prelevare i dati in arrivo nel buffer di ricezione.
  * `DISCONNECT`: Richiesta di abbattimento della connessione (*Disconnection Request - FIN*).
* **Per Servizi Connectionless (UDP):**
  * Sono sufficienti le primitive elementari `SEND` e `RECEIVE` (invio e ricezione immediata di datagrammi atomici).

---

## 3. Indirizzamento a Livello di Trasporto: Socket e Porte

### 3.1 Identificazione Univoca della Comunicazione

Per stabilire una sessione di comunicazione tra due entità nel pianeta, lo stack protocollare deve individuare univocamente 4 parametri:
1. **Host Locale** (Indirizzo IP Locale)
2. **Processo Locale** (Numero di Porta Locale)
3. **Host Remoto** (Indirizzo IP Remoto)
4. **Processo Remoto** (Numero di Porta Remota)

$$\text{Socket Address} = \text{Indirizzo IP} + \text{Numero di Porta}$$

* **La Socket (Presa Software):** È l'interfaccia software programmabile (API) che fa da punto di contatto bidirezionale tra il codice dell'applicazione (spazio utente) e i protocolli dello stack di rete (spazio kernel).
* **Numero di Porta:** È un intero senza segno a **16 bit**, con valori compresi nell'intervallo $[1, 65.535]$ (la porta 0 è riservata).

### 3.2 Suddivisione delle Porte secondo IANA

L'autorità **IANA (Internet Assigned Numbers Authority)** suddivide lo spazio delle porte a 16 bit in tre categorie:

| Intervallo Porte | Denominazione | Utilizzo e Caratteristiche |
| :--- | :--- | :--- |
| **0 – 1023** | **Well-Known Ports** (Porte Ben Note) | Assegnate rigidamente a servizi e protocolli standard ben noti (es. `20/21` FTP, `22` SSH, `23` Telnet, `25` SMTP, `53` DNS, `80` HTTP, `110` POP3, `443` HTTPS). Richiedono privilegi di amministratore/root per il binding. |
| **1024 – 49151** | **Registered Ports** (Porte Registrate) | Registrate presso IANA da società e sviluppatori per applicazioni specifiche (es. `3306` MySQL, `5432` PostgreSQL, `8080` HTTP-Proxy/Alt). |
| **49152 – 65535** | **Dynamic / Private Ports** (Porte Effimere) | Porte dinamiche allocate temporaneamente dal sistema operativo per i processi client che avviano connessioni verso l'esterno. |

---

## 4. Meccanismi di Multiplexing e Demultiplexing

Il **Multiplexing** e il **Demultiplexing** sono le due funzioni cardine che permettono a decine di applicazioni concorrenti di condividere la medesima interfaccia di rete e lo stesso indirizzo IP.

```
       [Processo Web (Port 80)]     [Processo Mail (Port 25)]
                  \                     /
                   \                   /
             +-------------------------------+
             |     MULTIPLEXING (Sender)     |
             | Raccolta dati da socket e     |
             | aggiunta header di trasporto  |
             +-------------------------------+
                             │
                             ▼
             +-------------------------------+
             |       LIVELLO IP (Network)    |
             +-------------------------------+
                             │
                             ▼ (Rete Internet)
                             │
             +-------------------------------+
             |       LIVELLO IP (Network)    |
             +-------------------------------+
                             │
                             ▼
             +-------------------------------+
             |    DEMULTIPLEXING (Receiver)  |
             | Consegna segmento alla giusta |
             | socket in base alle porte/IP  |
             +-------------------------------+
                   /                   \
                  /                     \
       [Socket Web (Port 80)]       [Socket Mail (Port 25)]
```

### 4.1 Demultiplexing Connectionless (UDP)
* In UDP, una socket è identificata esclusivamente da una coppia a due elementi:
  $$(\text{Indirizzo IP di Destinazione}, \text{Numero di Porta di Destinazione})$$
* Quando l'host riceve un segmento UDP, controlla la porta di destinazione e instrada il payload direttamente alla socket associata.
* **Conseguenza:** Due o più client differenti che inviano datagrammi verso la medesima porta di destinazione dello stesso server verranno convogliati **nella stessa identica socket**. Se la socket o il processo server si blocca, tutte le comunicazioni dei client decadono simultaneamente.

### 4.2 Demultiplexing Connection-Oriented (TCP)
* In TCP, ogni singola connessione attiva è identificata univocamente da una **quadrupla (4-tuple)** completa:
  $$(\text{IP Sorgente}, \text{Porta Sorgente}, \text{IP Destinazione}, \text{Porta Destinazione})$$
* L'host ricevente usa tutti e quattro i parametri per smistare il segmento alla specifica socket di connessione.
* Un server web multi-thread o multi-processo crea una nuova socket dedicata per ciascun client connesso. Connessioni diverse generate da client distinti (o dallo stesso client con porte effimere diverse) afferiscono a socket separate, isolando le sessioni.

---

## 5. Ciclo di Vita della Connessione TCP: Handshake a 3 e 4 Vie

TCP è un protocollo orientato alla connessione: prima di scambiare dati applicativi, client e server eseguono una procedura di accordo preliminare (*Handshake*) per negoziare i numeri di sequenza iniziali (**ISN - Initial Sequence Number**) e allocare i rispettivi buffer di memoria.

### 5.1 Apertura della Connessione: Three-Way Handshake

```
 CLIENT (Active Open)                                 SERVER (Passive Listen)
      │                                                         │
      │  Passo 1: SYN = 1, Seq = client_isn                     │
      ├────────────────────────────────────────────────────────►│ (Alloca buffer)
      │                                                         │
      │  Passo 2: SYN = 1, ACK = 1, Seq = server_isn,           │
      │           Ack = client_isn + 1                          │
      │◄────────────────────────────────────────────────────────┤ (Stato SYN_RCVD)
      │ (Alloca buffer)                                         │
      │                                                         │
      │  Passo 3: ACK = 1, Seq = client_isn + 1,                │
      │           Ack = server_isn + 1 (Opzionale: Dati)        │
      ├────────────────────────────────────────────────────────►│
      │                                                         │
[ESTABLISHED]                                             [ESTABLISHED]
```

1. **Passo 1 (SYN del Client):** Il client invia un segmento speciale di controllo con flag `SYN = 1`, indicando il proprio numero di sequenza iniziale casuale `client_isn`. Non trasporta payload dati.
2. **Passo 2 (SYN-ACK del Server):** Il server riceve il SYN, alloca i buffer e le strutture di controllo TCP, e risponde con un segmento avente flag `SYN = 1` e `ACK = 1`. Specifica il proprio `server_isn` e valorizza il campo Acknowledgment Number con `Ack = client_isn + 1`.
3. **Passo 3 (ACK del Client):** Il client riceve il SYN-ACK, alloca i buffer e risponde con un segmento con `ACK = 1` (`Ack = server_isn + 1`). Questo terzo segmento può già contenere dati applicativi nel payload. Entrambi gli endpoint entrano nello stato `ESTABLISHED`.

* **Rifiuto Connessione (RST):** Se il server riceve un SYN su una porta in cui nessun processo locale è in ascolto (`LISTEN`), risponde immediatamente con un segmento contenente il flag **`RST = 1` (Reset)** per notificare il rifiuto della richiesta.

---

### 5.2 Chiusura della Connessione: Four-Way Handshake

Poiché una connessione TCP è **full-duplex**, i due canali monodirezionali (Client $\to$ Server e Server $\to$ Client) devono essere chiusi in modo indipendente:

```
 CLIENT (Inizia chiusura)                               SERVER
      │                                                    │
      │  Passo 1: FIN = 1, Seq = u                         │
      ├───────────────────────────────────────────────────►│ (Riceve FIN)
      │                                                    │
      │  Passo 2: ACK = 1, Ack = u + 1                     │
      │◄───────────────────────────────────────────────────┤ (Invia ACK)
      │                                                    │ [Chiuso verso Client->Server]
      │                                                    │ (Completa invio dati)
      │  Passo 3: FIN = 1, Seq = v                         │
      │◄───────────────────────────────────────────────────┤ (Invia FIN)
      │                                                    │
      │  Passo 4: ACK = 1, Ack = v + 1                     │
      ├───────────────────────────────────────────────────►│ [Chiusura Definitiva Server]
      │                                                    │
[TIME_WAIT: 2*MSL]                                         ▼
      │
[CLOSED]
```

1. **Passo 1:** Il client decide di terminare la trasmissione e invia un segmento con flag `FIN = 1`.
2. **Passo 2:** Il server riceve il `FIN` e invia un `ACK` di riscontro. La direzione Client $\to$ Server è ora chiusa, ma il server può continuare a trasmettere dati residui verso il client (*Half-Close*).
3. **Passo 3:** Terminato l'invio dei propri dati, il server invia a sua volta un segmento `FIN = 1`.
4. **Passo 4:** Il client riceve il `FIN`, risponde con un `ACK` finale ed entra nello stato di attesa temporizzata **`TIME_WAIT`**.

#### Il Timer di TIME_WAIT e Maximum Segment Lifetime (MSL)
* Il **Maximum Segment Lifetime (MSL o MLS)** è definito nello standard RFC 793 come il tempo massimo per cui un pacchetto può sopravvivere nella rete prima di essere eliminato dai router (fissato convenzionalmente a 2 minuti).
* Il client rimane nello stato `TIME_WAIT` per una durata pari a **$2 \times \text{MSL}$** (4 minuti). Questa attesa garantisce che:
  1. L'ACK finale giunga al server; in caso di perdita dell'ACK, il server ritrasmetterà il FIN e il client sarà ancora in grado di rispondergli.
  2. Tutti i vecchi segmenti duplicati circolanti nella rete decadano definitivamente, evitando che interferiscano con una successiva connessione sulle stesse porte.

![Three-Way Handshake e Chiusura Connessione TCP](images/reti/fig_p1_xref277_216x206.png)

---

## 6. Struttura del Segmento TCP e Campi dell'Header

Il protocollo TCP opera su unità dati organizzate in segmenti con dimensione massima fino a $64 \text{ KB}$ (generalmente limitati dall'MTU della rete, ad esempio $1460 \text{ byte}$ per MSS su Ethernet).

L'header TCP ha una dimensione minima di **20 byte** (senza opzioni) ed è strutturato su parole a 32 bit:

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port (16)     |       Destination Port (16)   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number (32)                   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number (32)                 |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| Data | Res.  |U|A|P|R|S|F|                                    |
|Offset| (3/6) |R|C|S|S|Y|I|            Window Size (16)        |
| (4)  |       |G|K|H|T|N|N|                                    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Checksum (16)        |       Urgent Pointer (16)     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options and Padding (0 - 40 bytes)         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                             DATA                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

### 6.1 Dettaglio dei Singoli Campi

* **Source Port (16 bit) & Destination Port (16 bit):** Identificano i processi applicativi sorgente e destinatario.
* **Sequence Number (32 bit):** Numero d'ordine associato al **primo byte di dati** trasportato nel segmento all'interno del flusso complessivo.
* **Acknowledgment Number (32 bit):** Contiene il numero di sequenza del **prossimo byte che il ricevitore si aspetta di ricevere** (ACK cumulativo).
* **Data Offset / Header Length (4 bit):** Specifica la lunghezza dell'header TCP espressa in parole da 32 bit (4 byte). Se il valore è 5, l'header misura $5 \times 4 = 20 \text{ byte}$.
* **Flag di Controllo (6 bit):**
  * `URG (Urgent):` Il campo Urgent Pointer è significativo; segnala dati da elaborare con priorità immediata.
  * `ACK (Acknowledgment):` Indica che il campo Acknowledgment Number contiene un riscontro valido.
  * `PSH (Push):` Richiede al ricevitore di consegnare immediatamente i dati all'applicazione senza attendere il riempimento del buffer.
  * `RST (Reset):` Forza l'azzeramento o l'abbattimento immediato della connessione in caso di anomalie gravi o connessione rifiutata.
  * `SYN (Synchronize):` Utilizzato durante l'handshake iniziale per sincronizzare i numeri di sequenza.
  * `FIN (Finish):` Indica che il mittente ha terminato l'invio dei dati e richiede la chiusura del proprio canale.
* **Window Size (16 bit):** Numero di byte che il ricevitore è disposto ad accettare nel proprio buffer di ricezione (**Controllo di Flusso**).
* **Checksum (16 bit):** Codice di controllo degli errori calcolato sull'header TCP, sui dati e su uno pseudo-header IP (per verificare correttezza di IP e porte).
* **Urgent Pointer (16 bit):** Offset in byte che individua l'ultimo byte dei dati urgenti rispetto al Sequence Number.

### 6.2 Opzioni TCP e Padding

Se presenti, le opzioni consentono funzionalità avanzate (fino a 40 byte addizionali):
* **MSS (Maximum Segment Size):** Negoziato nei segmenti SYN; definisce il carico utile massimo trasportabile senza frammentazione IP.
* **Window Scale:** Permette di scalare la Window Size da 16 bit fino a 30 bit (indispensabile su reti ad altissima velocità con elevato prodotto Banda $\times$ Ritardo).
* **Selective Acknowledgment (SACK):** Consente al ricevitore di riscontrare blocchi discontinui di byte ricevuti correttamente, passando dal Go-Back-N al Selective Repeat.
* **Timestamp:** Calcola in modo continuo e preciso il Round Trip Time (RTT) per l'adattamento dinamico dei timer.
* **Padding:** Byte nulli aggiunti per garantire che l'header totale sia sempre un multiplo esatto di 32 bit (4 byte).

![Formato Header TCP e Meccanismo Sliding Window](images/reti/fig_p1_xref279_700x442.png)

---

## 7. Trasferimento Affidabile, Sliding Window e Gestione Errori

### 7.1 Gestione di Pacchetti Duplicati e Numerazione a 32 Bit

I pacchetti possono essere memorizzati temporaneamente nei router congestionati e ricomparire in rete con notevole ritardo. La numerazione di sequenza a **32 bit** garantisce che, anche a frequenze di trasmissione molto elevate, lo spazio dei numeri di sequenza non si riavvolga (wrap-around) prima che i vecchi segmenti siano decaduti per Time-To-Live. Se giunge un segmento SYN duplicato di una vecchia richiesta, il mittente risponde con un messaggio di `RST`.

### 7.2 ACK Ritardati (Delayed ACK) e Piggybacking

Per ottimizzare l'uso del canale:
* Il ricevitore non invia immediatamente un ACK per ogni singolo segmento ricevuto, ma avvia un timer breve (tipicamente 50–200 ms).
* Se l'applicazione locale genera dati di risposta, l'ACK viene incorporato nell'header del segmento dati in uscita (**Piggybacking**).
* Se il timer scade prima che vi siano dati in uscita, viene spedito un segmento ACK puro. Lo standard impone di inviare un ACK al più tardi ogni 2 segmenti consecutivi non riscontrati.

### 7.3 Meccanismo a Finestra Scorrevole (Sliding Window: GBN vs Selective Repeat)

* Di base, TCP impiega una logica di **Go-Back-N (GBN)** con riscontri cumulativi: se un segmento intermedio va perduto, il ricevitore scarta o accumula i successivi e il mittente, allo scadere del timeout, ritrasmette tutti i segmenti a partire da quello non riscontrato.
* Con l'opzione **SACK (Selective ACK)**, TCP opera in modalità **Selective Repeat**, ritrasmettendo esclusivamente i singoli segmenti andati smarriti.
* **Importante:** In TCP, la dimensione della finestra e i riscontri sono **espressi rigorosamente in numero di byte**, non in numero di pacchetti.

---

## 8. Meccanismo di Controllo di Flusso (Flow Control)

Il **Controllo di Flusso** è un meccanismo end-to-end che impedisce a un mittente veloce di inondare e saturare il buffer di ricezione (`RcvBuffer`) di un ricevitore lento.

```
+--------------------------------------------------------------------+
|                         RECEIVER BUFFER                            |
| [ Byte già letti dall'App ] [ Dati in attesa nel Buffer ] [ Libero]|
+--------------------------------------------------------------------+
                               <------- RcvWindow ---------->
```

* L'applicazione ricevente estrae i dati dal buffer con la propria velocità.
* Il protocollo TCP ricevente calcola lo spazio libero disponibile nel buffer:
  $$\text{RcvWindow} = \text{RcvBuffer} - [\text{LastByteRcvd} - \text{LastByteRead}]$$
* Il ricevitore inserisce il valore di $\text{RcvWindow}$ nel campo **Window Size** di ogni segmento inviato al mittente.
* Il mittente limita l'ammontare dei dati inviati e non ancora riscontrati in modo tale che:
  $$\text{LastByteSent} - \text{LastByteAcked} \le \text{RcvWindow}$$
* Se $\text{RcvWindow} = 0$, il mittente si arresta, ma continua ad inviare periodicamente **segmenti sonda (Probe Packets)** da 1 byte per sollecitare l'invio di aggiornamenti sullo stato della finestra dal ricevitore.

---

## 9. Meccanismo di Controllo della Congestione in TCP

Mentre il controllo di flusso protegge il ricevitore, il **Controllo della Congestione** protegge l'infrastruttura di rete centrale (i router intermedi e i loro buffer) dall'essere sovraccaricata da un traffico eccessivo generato contemporaneamente da molteplici sorgenti.

### 9.1 Approcci al Controllo della Congestione
1. **Controllo End-to-End (Non Assistito):** Nessun segnale esplicito proviene dalla rete. La congestione viene desunta dai nodi terminali osservando gli eventi di perdita (packet loss) e i ritardi (aumento del RTT). Questo è l'approccio standard adottato da TCP.
2. **Controllo Assistito dalla Rete:** I router segnalano esplicitamente il sovraccarico impostando appositi bit nell'header IP (es. **ECN - Explicit Congestion Notification**).

### 9.2 Variabili di Controllo del Mittente

Il mittente modula la velocità trasmissiva mantenendo due variabili di stato:
* **$\text{cwnd}$ (Congestion Window):** Finestra di congestione stimata dal mittente in base allo stato della rete.
* **$\text{ssthresh}$ (Slow Start Threshold):** Soglia che separa la fase di crescita esponenziale da quella lineare.

L'ammontare massimo di dati non riscontrati "in volo" nella rete è limitato dalla più restrittiva tra le due finestre:
$$\text{Max In-Flight Data} = \min(\text{cwnd}, \text{RcvWindow})$$

---

### 9.3 Rilevamento della Perdita e Algoritmo TCP Congestion Control

Una perdita di pacchetti indica saturazione dei buffer dei router e viene rilevata in due modi:
1. **Timeout del Timer di Ritrasmissione:** Evento grave, indica blocco totale o congestione severa.
2. **Ricezione di 3 ACK Duplicati (Triple Duplicate ACK):** Il ricevitore riceve segmenti fuori ordine e genera ACK identici per segnalare il buco; la rete trasporta ancora pacchetti, quindi la congestione è moderata.

```
       cwnd (in MSS)
         ^
      32 |                                    /| (Timeout: cwnd -> 1)
         |                                   / |
      16 |             /--------------------/  |
         |            / (Congestion Avoidance) |
       8 |           /                         |
       4 |         /                           |
       2 |       / (Slow Start)                |
       1 |______/______________________________|_____\ Tempo (RTT)
```

#### Fasi dell'Algoritmo (TCP Reno / Tahoe):

1. **Slow Start (Partenza Lenta):**
   * All'inizio della connessione: $\text{cwnd} = 1 \text{ MSS}$.
   * Per ogni ACK ricevuto, $\text{cwnd}$ viene incrementata di $1 \text{ MSS}$. In pratica, la finestra **raddoppia ad ogni Round-Trip Time ($RTT$)**, crescendo esponenzialmente:
     $$\text{cwnd}(t + RTT) = 2 \times \text{cwnd}(t)$$
   * La fase di Slow Start termina quando $\text{cwnd} \ge \text{ssthresh}$.
2. **Congestion Avoidance (Prevenzione della Congestione - AIMD):**
   * Quando $\text{cwnd} \ge \text{ssthresh}$, la crescita diventa cauta e **lineare (Additive Increase)**:
     $$\text{cwnd} \gets \text{cwnd} + \frac{1}{\text{cwnd}} \text{ per ogni ACK ricevuto} \implies +1 \text{ MSS per ogni } RTT$$
3. **Reazione agli Eventi di Perdita:**
   * **In caso di Timeout (Grave):**
     $$\text{ssthresh} \gets \max\left(\frac{\text{cwnd}}{2}, 2\text{ MSS}\right), \quad \text{cwnd} \gets 1\text{ MSS}$$
     Il protocollo ricomincia da capo in modalità **Slow Start**.
   * **In caso di 3 ACK Duplicati (Moderato - TCP Reno / Fast Recovery):**
     * Si esegue la **Fast Retransmit** (ritrasmissione immediata del segmento mancante senza attendere lo scadere del timeout).
     * In **TCP Tahoe:** Azzera $\text{cwnd} = 1\text{ MSS}$ e torna in Slow Start.
     * In **TCP Reno (Fast Recovery):** Applica il decremento moltiplicativo senza azzerare la finestra:
       $$\text{ssthresh} \gets \frac{\text{cwnd}}{2}, \quad \text{cwnd} \gets \text{ssthresh} + 3\text{ MSS}$$
       Resta nella fase di **Congestion Avoidance**, mantenendo un throughput elevato.

---

## 10. Protocollo UDP (User Datagram Protocol)

### 10.1 Caratteristiche e Filosofia Progettuale

UDP è un protocollo di trasporto minimalista, connectionless e non affidabile definito in RFC 768.

* Non esegue alcun setup preventivo della connessione (elimina il ritardo di $1 \text{ RTT}$ dell'handshake).
* Non mantiene alcuno stato di connessione sui terminali (nessun buffer di invio/ricezione complesso, nessun timer di ritrasmissione, massima scalabilità per servire migliaia di client contemporanei).
* Non attua controllo di congestione: l'applicazione trasmette alla frequenza desiderata.
* **Orientato al Datagramma:** Preserva i confini dei messaggi generati dall'applicazione (a differenza di TCP che tratta i dati come un flusso continuo di byte indistinto).

### 10.2 Struttura dell'Header UDP

L'header UDP ha una lunghezza fissa e ridottissima di soli **8 byte (64 bit)**:

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port (16)     |       Destination Port (16)   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Length (16)        |          Checksum (16)        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                             DATA                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

* **Source Port (16 bit / 2 byte):** Porta del processo mittente (opzionale, impostata a 0 se non è attesa risposta).
* **Destination Port (16 bit / 2 byte):** Porta del processo destinatario.
* **Length (16 bit / 2 byte):** Lunghezza complessiva del datagramma UDP espressa in byte (Header + Payload dati). Valore minimo = 8.
* **Checksum (16 bit / 2 byte):** Controllo di integrità calcolato su header, dati e pseudo-header IP. In IPv4 il suo utilizzo è facoltativo (può essere impostato a 0); in IPv6 è obbligatorio.

### 10.3 Ambiti di Utilizzo e Motivazioni

UDP è la scelta ideale per:
1. **Applicazioni Real-Time (VoIP, Video Streaming, Gaming Online):** Tollerano piccole perdite di pacchetti ma non possono tollerare i ritardi variabili introdotti dalle ritrasmissioni e dalla finestra di congestione di TCP.
2. **Interrogazioni Transazionali Rapide (DNS porta 53):** È più efficiente ritrasmettere un'intera query DNS da zero piuttosto che eseguire il setup e il teardown di una sessione TCP.
3. **Comunicazioni Broadcast e Multicast:** Impossibili con TCP (che è intrinsecamente punto-a-punto tra due soli endpoint).
4. **Protocolli di Gestione e Configurazione di Rete:** *DHCP* (porte 67/68), *SNMP* (porta 161), *TFTP* (porta 69), *NTP* (porta 123).

![Formato Header UDP e Confronto Prestazionale con TCP](images/reti/fig_p1_xref282_854x187.png)

---

## 11. Tabella Comparativa Completa: TCP vs UDP

| Caratteristica | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
| :--- | :--- | :--- |
| **Tipo di Servizio** | Connection-Oriented (Richiede Handshake) | Connectionless (Nessun Setup) |
| **Affidabilità** | Garantita (Riscontri, Timeout e Ritrasmissioni) | Non Garantita (Best-effort, Nessun recupero) |
| **Ordinamento dei Dati** | Flusso ordinato e garantito per byte | Consegna non ordinata dei datagrammi |
| **Dimensione Header** | 20 – 60 Byte (Variabile con Opzioni) | 8 Byte (Fisso e leggero) |
| **Controllo del Flusso** | Sì (Sliding Window basata su `RcvWindow`) | No |
| **Controllo della Congestione** | Sì (AIMD, Slow Start, Congestion Avoidance) | No (Spedisce al ritmo dell'applicazione) |
| **Tipologia di Flusso** | Stream di Byte Continuo | Datagrammi a blocchi discreti |
| **Modalità di Trasmissione** | Esclusivamente Punto-a-Punto (Unicast) | Unicast, Broadcast e Multicast |
| **Overhead e Velocità** | Overhead più alto, velocità condizionata da ACK | Overhead minimo, massima rapidità di invio |
| **Protocolli Applicativi Tipici** | HTTP/HTTPS, FTP, SMTP/IMAP, SSH, Telnet | DNS, DHCP, VoIP/SIP, RTP, SNMP, TFTP |

---


<!-- ═══════════════════════════════════════════════════════════════════ -->
<!-- SEZIONE: 12 - Livello Applicazione.md -->
<!-- ═══════════════════════════════════════════════════════════════════ -->

# Capitolo 12 – Livello Applicazione (e Strati Sessione / Presentazione)

> Appunti del corso di **Reti di Calcolatori** — Anno Accademico 2025/2026  
> Trascrizione completa, dettagliata e fedele delle lezioni su architettura delle applicazioni di rete (Client-Server e P2P), Domain Name System (DNS), Posta Elettronica (SMTP, POP3, IMAP, MIME), World Wide Web (WWW, URL, HTML), protocollo HTTP (1.0, 1.1, HTTP/2, Cookie e Proxy) e concetti di Socket Programming.

---

## 1. I Livelli Superiori del Modello ISO-OSI: Sessione e Presentazione

Prima di analizzare i protocolli applicativi moderni, è opportuno inquadrare i compiti che il modello di riferimento **ISO-OSI** assegna ai livelli 5 e 6, le cui funzionalità nello stack **TCP/IP** sono state completamente assorbite e integrate direttamente all'interno dello strato applicativo (Livello 7).

### 1.1 Livello di Sessione (Livello 5 OSI)

Il **Livello di Sessione** consente a utenti o processi residenti su macchine differenti di instaurare, gestire e terminare una **sessione di comunicazione** (dialogo temporaneo e interattivo).

* **Funzionalità Fondamentali:**
  1. **Controllo del Dialogo (Dialog Control):** Stabilisce se la comunicazione debba avvenire in modalità *half-duplex* o *full-duplex*.
  2. **Gestione dei Token (Token Management):** Regola quale dei due interlocutori abbia il diritto di eseguire determinate operazioni critiche su canali condivisi.
  3. **Sincronizzazione e Check-pointing:** Inserisce dei punti di controllo (*checkpoint*) all'interno di flussi di dati molto lunghi; in caso di guasto o caduta della linea, il trasferimento può riprendere dall'ultimo checkpoint valido senza dover ricominciare da capo.
* **Gestione dello Stato:** Una sessione è caratterizzata da uno **stato**: almeno una delle parti comunicanti deve conservare e aggiornare le informazioni contestuali relative allo stato corrente dell'interazione.
* **Esempi Comparativi sui Diversi Livelli:**
  * *Livello Applicazione:* **Sessioni HTTP** (mantenute tramite *Cookie* o token *JWT* per associare carrelli della spesa o autenticazioni ai singoli utenti).
  * *Livello di Sessione:* Una chiamata VoIP via Internet basata su protocollo **SIP (Session Initiation Protocol)**.
  * *Livello di Trasporto:* Una sessione/connessione **TCP** o un socket stream stabilito.

---

### 1.2 Livello di Presentazione (Livello 6 OSI)

Mentre i livelli inferiori trasferiscono sequenze grezze di byte senza conoscerne il significato, il **Livello di Presentazione** si occupa della **sintassi** e della **semantica** delle informazioni scambiate, trasformando i dati in formati standard interoperabili tra architetture hardware eterogenee.

* **Le Tre Tipologie di Sintassi:**
  1. **Sintassi Astratta:** Definizione formale e concettuale delle strutture dati scambiate tra gli applicativi (es. definizioni ASN.1, XML Schema, JSON Schema).
  2. **Sintassi Concreta Locale:** Il modo in cui i dati sono fisicamente memorizzati nella memoria del singolo elaboratore (es. ordine dei byte *Big-Endian* vs *Little-Endian*, allineamento a 32/64 bit, codifiche proprietarie).
  3. **Sintassi di Trasferimento:** La codifica standard utilizzata per la trasmissione sul canale di comunicazione (es. *ASCII*, *UTF-8*, *Base64*, stringhe JSON o XML compresse e crittografate con TLS/SSL).

---

## 2. Architettura delle Applicazioni di Rete e Protocolli Applicativi

Per creare un'applicazione di rete è necessario sviluppare programmi software eseguiti su **sistemi terminali eterogenei (End Systems / Host)** che comunicano tra loro scambiandosi messaggi attraverso la rete. Gli apparati interni al nucleo della rete (router e switch) non eseguono codice applicativo.

### 2.1 Elementi Definiti da un Protocollo Applicativo
Un protocollo di livello applicazione stabilisce con precisione:
* **Tipi di messaggi scambiati:** Ad esempio messaggi di richiesta (*Request*) e messaggi di risposta (*Response*).
* **Sintassi dei messaggi:** La disposizione, la formattazione e la delimitazione dei vari campi.
* **Semantica dei campi:** Il significato operativo attribuito a ciascuna sequenza di bit o stringa contenuta nel messaggio.
* **Regole di interazione (Macchina a Stati):** Le procedure che stabiliscono quando e come un processo invia messaggi, attende risposte o reagisce a condizioni di errore.

---

### 2.2 I Modelli Architetturali: Client-Server vs Peer-to-Peer (P2P)

```
  ARCHITETTURA CLIENT-SERVER                    ARCHITETTURA PEER-TO-PEER (P2P)

         [ Server ]                                 [ Peer A ] <======> [ Peer B ]
        (IP Fisso /                                     ^                   ^
         Always-On)                                     │   (Scambio Diretto)│
       /     │     \                                    │                   │
      /      │      \                                   v                   v
     v       v       v                              [ Peer C ] <======> [ Peer D ]
  [Client] [Client] [Client]
  (IP Dinamici / Richieste On-Demand)
```

1. **Architettura Client-Server:**
   * **Server:** Host centrale **sempre attivo (Always-On)**, dotato di un **indirizzo IP statico/fisso e noto** e in ascolto permanente su porte standard. Gestisce richieste concorrenti provenienti da molteplici client.
   * **Client:** Terminali che avviano le comunicazioni su richiesta; possono avere indirizzi IP dinamici e intermittenti. I client **non comunicano mai direttamente tra loro**, ma sempre ed esclusivamente tramite il server.
   * *Esempi:* Il Web (HTTP), la posta elettronica (SMTP/IMAP), i file server (FTP).
2. **Architettura Peer-to-Peer (P2P):**
   * Non esiste un server centrale sempre attivo.
   * La comunicazione avviene **direttamente tra coppie arbitrarie di host paritari (**Peer**)**.
   * I peer sono computer di utenti finali con indirizzi IP dinamici che possono connettersi e disconnettersi in qualsiasi istante.
   * Ciascun peer agisce contemporaneamente da client (quando richiede dati) e da server (quando li fornisce agli altri).
   * **Proprietà chiave (Auto-Scalabilità):** All'aumentare dei nodi che richiedono contenuti cresce proporzionalmente anche la capacità complessiva di servizio della rete.
   * *Esempi:* BitTorrent, reti blockchain/Bitcoin.
3. **Architetture Ibride (Client-Server + P2P):**
   * Combinano i due paradigmi per ottimizzare ricerca e trasferimento.
   * *Esempio storico (Napster):* Un server centrale gestiva l'indice e la localizzazione dei file (directory centralizzata), mentre l'effettivo download dei file musicali avveniva in modo distribuito e diretto tra i singoli peer.

![Architetture Client-Server e Peer-to-Peer a confronto](images/reti/fig_p1_xref284_328x393.jpeg)

---

## 3. Comunicazione tra Processi e Socket API

Un **processo** è un programma in esecuzione all'interno di un elaboratore.
* All'interno dello **stesso host**, due processi comunicano sfruttando i meccanismi di **Inter-Process Communication (IPC)** messi a disposizione dal sistema operativo (pipe, memoria condivisa, semafori).
* Su **host differenti**, i processi comunicano attraverso lo **scambio di messaggi su socket di rete**.

### 3.1 Il Concetto di Socket
La socket è l'interfaccia/porta software attraverso cui un processo applicativo trasmette e riceve messaggi dalla rete. Per recapitare un messaggio a un processo specifico occorre la combinazione:
$$\text{Indirizzo IP (Identifica l'Host)} + \text{Numero di Porta (Identifica il Processo)}$$

### 3.2 Requisiti dell'Applicazione e Scelta del Protocollo di Trasporto

| Requisito Applicativo | Protocollo Scelto | Motivazione |
| :--- | :--- | :--- |
| **Integrità dei Dati e Affidabilità Totale** | **TCP** | Nessun byte può essere perso o corrotto (es. pagine Web, trasferimento file, email, transazioni bancarie). |
| **Bassa Latenza e Tolleranza alle Perdite** | **UDP** | Si privilegia l'immediatezza della trasmissione rispetto al recupero dei pacchetti persi (es. streaming audio/video realtime, VoIP, gaming online, query DNS). |

---

## 4. Il Sistema dei Nomi di Dominio (Domain Name System - DNS)

Gli utenti umani memorizzano facilmente identificativi mnemonici e testuali (*Hostname*, es. `www.google.it` o `di.unisa.it`), mentre i router e i protocolli di rete elaborano esclusivamente indirizzi IP numerici a 32 bit (IPv4) o 128 bit (IPv6).

Il **DNS (Domain Name System)** è il servizio di directory fondamentale di Internet: un **database distribuito e gerarchico** che traduce i nomi simbolici degli host nei corrispondenti indirizzi IP.

### 4.1 Servizi Forniti dal DNS
1. **Risoluzione dei Nomi (Hostname-to-IP Translation):** Mappatura diretta da FQDN a indirizzo IP.
2. **Host Aliasing:** Un host con un nome canonico complesso (es. `server-01.us-east.aws.amazon.com`) può avere uno o più alias semplici e mnemonici (es. `www.amazon.com`).
3. **Mail Server Aliasing:** Identifica il nome e l'indirizzo del server di posta incaricato di ricevere messaggi per uno specifico dominio (tramite record MX).
4. **Distribuzione del Carico (Load Balancing):** Per siti ad altissimo traffico, a un singolo nome simbolico viene associato un insieme di indirizzi IP differenti (server replicati). Il DNS ruota ciclicamente l'ordine degli IP restituiti nelle risposte (*Round-Robin DNS*), ripartendo le richieste tra i server.

---

### 4.2 Struttura Gerarchica dello Spazio dei Nomi

Lo spazio dei nomi DNS è organizzato ad **albero invertito**:

```
                                  [ . ] (Root Zone)
                                    /   |   \
                                   /    |    \
                                  /     |     \
                              [it]    [com]   [org]   (Top-Level Domains - TLD)
                              /         |
                             /          |
                        [unisa]      [google]         (Second-Level Domains)
                         /   \          |
                        /     \         |
                     [di]    [dia]    [www]           (Third-Level / Subdomains)
                      |
                    [www]                             (Host: www.di.unisa.it.)
```

* **Sintassi delle Etichette:**
  * Ogni segmento/etichetta può contenere fino a 63 caratteri alfanumerici ed è **case-insensitive**.
  * La lunghezza massima del percorso completo non può superare i **255 caratteri**.
* **FQDN (Fully Qualified Domain Name):** Nome assoluto e non ambiguo che specifica l'intera gerarchia e termina idealmente con un punto finale che rappresenta la radice (es. `www.di.unisa.it.`).
* **PQDN (Partially Qualified Domain Name):** Specifica solo una parte del percorso (es. `www.di`), lasciando al resolver il compito di aggiungere il suffisso di dominio locale predefinito.

---

### 4.3 I Livelli dei Server dei Nomi

1. **Root Name Server (Server Radice):**
   * Sono posti al vertice della gerarchia. Esistono **13 indirizzi IP logici radice** a livello mondiale (denominati da `a.root-servers.net` a `m.root-servers.net`), replicati su centinaia di server fisici mediante instradamento *Anycast*.
   * Restituiscono gli indirizzi IP dei server competenti per i domini di primo livello (TLD).
2. **Top-Level Domain (TLD) Server:**
   * Gestiscono i domini generici di primo livello (**gTLD**: `.com`, `.org`, `.net`, `.edu`) e i domini nazionali (**ccTLD**: `.it`, `.uk`, `.de`, `.fr`, `.jp`).
3. **Authoritative Name Server (Server di Competenza / Autoritativo):**
   * Server ufficiali mantenuti dalle organizzazioni o dai loro provider che contengono i record DNS ufficiali e vincolanti per gli host dell'organizzazione.
4. **Local DNS Server (Server DNS Locale / Default Resolver):**
   * Non appartiene strettamente alla gerarchia globale. Ogni ISP o rete aziendale ne mette a disposizione uno per i propri utenti. Riceve le richieste dei client e agisce da **proxy intermediario**, interrogando la gerarchia globale e memorizzando le risposte in **cache locale**.

---

### 4.4 Modalità di Risoluzione: Query Iterativa vs Ricorsiva

```
      QUERY ITERATIVA                              QUERY RICORSIVA

    [Host]                                       [Host]
      │ ▲ (1) Query: www.unisa.it                  │ ▲ (1) Query
      │ │ (8) Risposta: IP                         │ │ (8) Risposta finale
      ▼ │                                          ▼ │
  [DNS Locale] ──(2) Query──► [Root Server]    [DNS Locale]
      ▲    │   ◄─(3) Ref TLD─┘                     │ ▲
      │    │                                       │ │ (2) Interroga Root
      │    ├─────(4) Query──► [TLD Server (.it)]   │ │ (3) Risposta Root
      │    │   ◄─(5) Ref Auth┘                     ▼ │
      │    │                                   [Root Server]
      │    └─────(6) Query──► [Auth Server]        │ ▲
      │        ◄─(7) IP─────┘                      │ │ (4) Interroga TLD
                                                   ▼ │
                                               [TLD Server]
                                                   │ ▲
                                                   │ │ (6) Interroga Auth
                                                   ▼ │
                                               [Auth Server]
```

* **Query Ricorsiva:** Il server interrogato si assume il carico totale di risolvere il nome, inoltrando a sua volta la richiesta ai livelli superiori e restituendo al richiedente la risposta definitiva.
* **Query Iterativa:** Il server interrogato, se non possiede la risposta esatta, restituisce al client l'indirizzo IP del server di livello inferiore da contattare direttamente nel passo successivo.
* **DNS Caching e TTL:** Quando un server DNS locale apprende una mappatura, la memorizza nella propria memoria cache per un intervallo temporale specificato dal **TTL (Time To Live)**, riducendo drasticamente il carico sui server radice.

![Gerarchia DNS e Risoluzione Query Iterativa e Ricorsiva](images/reti/fig_p1_xref287_317x252.jpeg)

---

### 4.5 Record di Risorsa (Resource Record - RR) e Formato dei Messaggi

I database DNS memorizzano le informazioni sotto forma di tuple denominate **Resource Record (RR)** con formato:
$$(\text{Name}, \text{Value}, \text{Type}, \text{TTL})$$

| Tipo Record | Significato di `Name` | Significato di `Value` | Esempio Pratico |
| :--- | :--- | :--- | :--- |
| **A** | Hostname | Indirizzo IPv4 a 32 bit | `(server1.unisa.it, 193.205.160.20, A, 3600)` |
| **AAAA** | Hostname | Indirizzo IPv6 a 128 bit | `(server1.unisa.it, 2001:db8::1, AAAA, 3600)` |
| **NS** | Dominio | Hostname del Name Server Autoritativo | `(unisa.it, dns.unisa.it, NS, 86400)` |
| **CNAME** | Nome Alias | Nome Canonico Reale dell'Host | `(www.unisa.it, server-web01.unisa.it, CNAME, 3600)` |
| **MX** | Dominio | Hostname del Mail Server | `(unisa.it, mail.unisa.it, MX, 3600)` |

#### Struttura del Messaggio DNS (Header a 12 Byte):
I messaggi DNS viaggiano su **UDP sulla porta 53** (usano TCP solo per risposte superiori a 512 byte o per il trasferimento di zona *Zone Transfer* tra name server primari e secondari).
* **Identification (16 bit):** Identificativo univoco della query, copiato nella risposta per consentire l'accoppiamento asincrono richiesta-risposta.
* **Flags (16 bit):** Bit `QR` (0=Query, 1=Response), `AA` (Authoritative Answer), `TC` (Truncated), `RD` (Recursion Desired), `RA` (Recursion Available), `RCODE` (codice esito errore).
* **Contatori di Sezione (4 parole da 16 bit):** Numero di domande (*Questions*), risposte (*Answer RRs*), record di autorità (*Authority RRs*) e record addizionali (*Additional RRs*).

---

## 5. Il Sistema di Posta Elettronica

L'architettura della posta elettronica su Internet è composta da tre elementi principali:

1. **User Agent (MUA - Mail User Agent):** L'applicazione client utilizzata dall'utente per comporre, leggere e organizzare i messaggi (es. Thunderbird, Outlook o interfaccia Webmail).
2. **Mail Server:** Il server sempre attivo che mantiene la casella di posta dell'utente (**Mailbox**) e la coda dei messaggi in uscita da trasmettere (**Message Queue**).
3. **Protocolli di Comunicazione:**
   * **SMTP (Simple Mail Transfer Protocol):** Protocollo di tipo **Push** per il trasferimento dei messaggi dal client al server e tra server di posta intermedi.
   * **POP3 / IMAP:** Protocolli di tipo **Pull** utilizzati dall'agente utente per accedere, scaricare e manipolare i messaggi memorizzati sul server.

```
 [User Agent Mittente]
          │
          │ SMTP (Push) [Porta 25/587]
          ▼
   [Mail Server Mittente]
          │
          │ SMTP (Push su TCP) [Porta 25] (Risoluzione DNS record MX)
          ▼
   [Mail Server Destinatario] ──(Salva in Mailbox)
          ▲
          │ POP3 [Porta 110/995] o IMAP [Porta 143/993] (Pull)
          │
 [User Agent Destinatario]
```

![Architettura del Sistema di Posta Elettronica e Protocolli SMTP, POP3, IMAP](images/reti/fig_p1_xref289_435x322.png)

---

### 5.1 Protocollo SMTP e Formato RFC 822 / MIME

* **Funzionamento di SMTP:**
  * Opera su **TCP sulla porta 25**.
  * I comandi e i testi scambiati sono rigorosamente in formato testo **ASCII a 7 bit**.
  * Sequenza tipica di comandi:
    * `HELO / EHLO <client_domain>`: Inizializza la sessione e saluta il server.
    * `MAIL FROM: <mittente@dominio.it>`: Specifica l'indirizzo del mittente.
    * `RCPT TO: <destinatario@dominio.it>`: Specifica l'indirizzo del destinatario.
    * `DATA`: Avvia l'inserimento del corpo del messaggio, terminato da una riga contenente un singolo punto (`\r\n.\r\n`).
    * `QUIT`: Chiude la connessione TCP.
* **Standard MIME (Multipurpose Internet Mail Extensions):**
  * Per consentire l'invio di caratteri non ASCII (lettere accentate, alfabeti non latini) e file binari multimediali (immagini, PDF, audio), MIME definisce appositi campi di intestazione:
    * `MIME-Version:` Versione dello standard utilizzata (es. 1.0).
    * `Content-Type:` Tipologia del contenuto (es. `text/html`, `image/jpeg`, `multipart/mixed`).
    * `Content-Transfer-Encoding:` Metodo di codifica impiegato per mappare i dati binari in caratteri ASCII stampabili a 7 bit (es. `base64` o `quoted-printable`).
    * `Content-ID` e `Content-Description`.

### 5.2 Protocolli di Accesso: POP3 vs IMAP

| Caratteristica | POP3 (Post Office Protocol v3) | IMAP (Internet Mail Access Protocol) |
| :--- | :--- | :--- |
| **Porta Standard** | 110 (In chiaro) / 995 (POP3S con SSL/TLS) | 143 (In chiaro) / 993 (IMAPS con SSL/TLS) |
| **Modalità Operativa** | Tipicamente "Scarica ed Elimina" (*Download and Delete*) | "Accesso Remoto Interattivo" (*Download and Keep*) |
| **Gestione dello Stato** | Stateless: non memorizza lo stato delle letture sul server | Stateful: mantiene flag di stato (letto, risposto, bozza, eliminato) |
| **Cartelle e Organizzazione** | Cartelle gestite esclusivamente in locale sul client | Cartelle e directory create e sincronizzate sul server |
| **Accesso Multi-Dispositivo** | Problematico (messaggi dispersi su dispositivi diversi) | Perfettamente sincronizzato su tutti i terminali |

---

## 6. Il World Wide Web (WWW) e il Protocollo HTTP

Il **World Wide Web (WWW)** è nato nel 1989 al CERN di Ginevra su proposta di **Tim Berners-Lee** come sistema di condivisione di documenti ipertestuali distribuiti su scala mondiale.

$$\text{WWW} = \text{URL (Identificazione)} + \text{HTTP (Trasferimento)} + \text{HTML (Rappresentazione)}$$

* **Differenza tra Internet e Web:**
  * *Internet:* L'infrastruttura globale hardware e software di telecomunicazione basata sul protocollo TCP/IP.
  * *Web:* Uno dei molteplici servizi applicativi operanti al di sopra di Internet per la navigazione ipertestuale di contenuti multimediali.

### 6.1 Struttura Sintattica dell'URL (Uniform Resource Locator)
Ogni risorsa presente sul Web è individuata in modo univoco da un URL strutturato in 6 parti:
$$\text{schema://[username:password@]hostname[:porta][/percorso][?querystring][\#frammento]}$$

* **Protocol (Schema):** Specifica il protocollo applicativo (es. `http`, `https`, `ftp`).
* **Credenziali (Opzionali):** Username e password per l'accesso autenticato.
* **Namehost:** Nome di dominio simbolico o indirizzo IP del web server.
* **Port (Opzionale):** Porta TCP del servizio (default: `80` per HTTP, `443` per HTTPS).
* **Percorso (Path):** Posizione gerarchica della risorsa nel file system logico del server.
* **Querystring (Opzionale):** Sequenza di parametri chiave-valore separati da `&` e preceduti da `?` per passare input dinamici al server.

---

### 6.2 Ciclo di Vita della Transazione HTTP

HTTP è un protocollo del livello applicativo **stateless (senza memoria)**: ogni coppia di richiesta e risposta viene gestita in modo completamente indipendente, senza che il server mantenga memoria delle richieste precedenti.

```
 CLIENT (Browser)                                    SERVER WEB (Porta 80)
      │                                                         │
      │  1. Apertura Connessione TCP (Three-Way Handshake)       │
      ├────────────────────────────────────────────────────────►│
      │◄────────────────────────────────────────────────────────┤
      │                                                         │
      │  2. Invio Richiesta HTTP (HTTP Request: GET /index.html)│
      ├────────────────────────────────────────────────────────►│
      │                                                         │ (Elabora risorsa)
      │  3. Invio Risposta HTTP (HTTP Response: 200 OK + Body)  │
      │◄────────────────────────────────────────────────────────┤
      │                                                         │
      │  4. Chiusura Connessione TCP (o riutilizzo Keep-Alive)  │
      ┴                                                         ┴
```

![Ciclo di Transazione HTTP Request-Response](images/reti/fig_p1_xref291_582x202.jpeg)

---

### 6.3 Struttura dei Messaggi HTTP: Request e Response

```
   STRUTTURA HTTP REQUEST                       STRUTTURA HTTP RESPONSE

+-------------------------------------+      +-------------------------------------+
| METODO  URL  VERSIONE_HTTP  \r\n    |      | VERSIONE_HTTP  STATUS_CODE  TESTO   | (Status Line)
+-------------------------------------+      +-------------------------------------+
| Host: www.unisa.it \r\n             |      | Date: Sun, 16 Aug 2026 12:00:00 GMT |
| User-Agent: Mozilla/5.0... \r\n     |      | Server: Apache/2.4.41 \r\n          |
| Accept: text/html \r\n              |      | Content-Type: text/html \r\n        | (Header Lines)
| Connection: keep-alive \r\n         |      | Content-Length: 2048 \r\n           |
| \r\n (Riga Vuota)                   |      | \r\n (Riga Vuota)                   |
+-------------------------------------+      +-------------------------------------+
| ENTITY BODY (Dati POST/PUT)         |      | ENTITY BODY (HTML / Immagine / Dati)|
+-------------------------------------+      +-------------------------------------+
```

![Formato dei Messaggi HTTP Request e Response](images/reti/fig_p1_xref293_591x177.jpeg)

---

### 6.4 Codici di Stato HTTP (Status Codes)

La prima riga della risposta HTTP (*Status Line*) contiene un codice numerico a tre cifre:

| Classe | Denominazione | Descrizione e Principali Esempi |
| :--- | :--- | :--- |
| **1xx** | **Informational** | Richiesta ricevuta, elaborazione in corso (es. `100 Continue`). |
| **2xx** | **Success** | L'azione richiesta è stata ricevuta, compresa e accettata con successo.<br>• `200 OK`: Richiesta soddisfatta, payload presente.<br>• `201 Created`: Risorsa creata con successo.<br>• `204 No Content`: Elaborato con successo, nessun body restituito. |
| **3xx** | **Redirection** | Sono necessarie ulteriori azioni per completare la richiesta.<br>• `301 Moved Permanently`: La risorsa ha cambiato URL in via definitiva.<br>• `302 Found`: Reindirizzamento temporaneo.<br>• `304 Not Modified`: La risorsa nella cache del client è ancora valida (*Conditional GET*). |
| **4xx** | **Client Error** | Errore generato da una richiesta non corretta o non autorizzata del client.<br>• `400 Bad Request`: Sintassi della richiesta errata.<br>• `401 Unauthorized`: Richiesta autenticazione.<br>• `403 Forbidden`: Accesso vietato dal server.<br>• `404 Not Found`: Risorsa non esistente all'URI specificato. |
| **5xx** | **Server Error** | Il server ha riscontrato un errore interno e non può soddisfare la richiesta.<br>• `500 Internal Server Error`: Errore generico nel codice/script del server.<br>• `502 Bad Gateway`: Risposta non valida da un server a monte.<br>• `503 Service Unavailable`: Server temporaneamente sovraccarico o in manutenzione. |

---

### 6.5 Metodi di Richiesta HTTP

* **`GET`:** Richiede una rappresentazione della risorsa specificata. I parametri vengono accodati nell'URL all'interno della *querystring*. È un metodo **idempotente e sicuro**. La lunghezza totale dell'URL è generalmente limitata a circa 2048 caratteri. **Non deve mai essere usato per dati riservati** (es. password) poiché i parametri rimangono visibili nella cronologia del browser e nei file di log del server.
* **`POST`:** Trasmette un'entità di dati verso il server (es. dati di form, file caricati). I parametri sono contenuti interamente nell'**Entity Body** della richiesta, senza limiti rigidi di dimensione. Non è un metodo idempotente.
* **`PUT`:** Carica o sostituisce completamente la risorsa presente all'URI specificato con il contenuto inviato nel body. È un metodo idempotente.
* **`DELETE`:** Rimuove la risorsa associata all'URI specificato.
* **`HEAD`:** Identico a `GET`, ma richiede al server di restituire **esclusivamente gli header di risposta**, omettendo il corpo del messaggio. Utilizzato per testare la validità della risorsa, la sua dimensione (`Content-Length`) o la data di ultima modifica senza scaricare l'intero file.

![Metodi HTTP, Codici di Stato e Pipelining](images/reti/fig_p1_xref294_588x341.png)

---

## 7. Meccanismi di Caching, Cookie e Server Proxy

### 7.1 Server Proxy HTTP
Un **Proxy HTTP** è un intermediario di rete configurato tra il browser del client e i server web di destinazione. Riceve le richieste dei client locali e le inoltra ai server remoti, memorizzando le risposte nella propria cache. Consente:
* **Riduzione del traffico di rete e tempi di caricamento istantanei** per risorse condivise da più utenti su una LAN.
* **Filtraggio dei contenuti e controllo degli accessi** all'interno delle reti aziendali e universitarie.

### 7.2 I Cookie e la Gestione dello Stato
Poiché HTTP è intrinsecamente stateless, i **Cookie** consentono di associare uno stato alle sessioni utente attraverso quattro componenti:
1. Header di risposta del server: `Set-Cookie: ID_Utente=12345; Expires=...; Path=/`
2. Memorizzazione del file del cookie nel browser del client.
3. Header inviato dal client nelle richieste successive verso lo stesso dominio: `Cookie: ID_Utente=12345`
4. Database di backend sul server che correla l'ID alla sessione specifica (carrello acquisti, autenticazione, preferenze).

---

## 8. Evoluzione del Protocollo: HTTP/1.0, HTTP/1.1 e HTTP/2

```
 HTTP/1.0 (Non Persistente)       HTTP/1.1 (Persistente + Pipeline)      HTTP/2 (Multiplexed Streams)

  [TCP Setup]                      [TCP Setup]                          [TCP Setup]
  ┌─────────┐                      ┌─────────┐                          ┌─────────┐
  │ GET obj1│                      │ GET obj1│                          │Stream 1: Req 1 (HTML)
  │◄────────┤                      │ GET obj2│ (Pipelining)             │Stream 2: Req 2 (CSS)
  │ Rsp obj1│                      │ GET obj3│                          │Stream 3: Req 3 (IMG)
  └─────────┘ [TCP Close]          ├─────────┤                          ├─────────┤
                                   │ Rsp obj1│                          │Rsp frame 1 (interleaved)
  [TCP Setup]                      │ Rsp obj2│ (Ordine FIFO obbligato)  │Rsp frame 3 (interleaved)
  ┌─────────┐                      │ Rsp obj3│                          │Rsp frame 2 (interleaved)
  │ GET obj2│                      └─────────┘                          └─────────┘
  │◄────────┤                      [TCP Keep-Alive]                     [Singola Connessione TCP]
  │ Rsp obj2│
  └─────────┘ [TCP Close]
```

### 8.1 HTTP/1.0 (Connessioni Non Persistenti)
* Per ogni singolo oggetto incorporato nella pagina (file HTML, fogli di stile CSS, immagini), viene aperta e chiusa una distinta connessione TCP.
* Ciascun oggetto impone un overhead temporale minimo pari a:
  $$\text{Tempo Totale per Oggetto} = 2 \times \text{RTT} + \text{Tempo di Trasmissione}$$

### 8.2 HTTP/1.1 (Connessioni Persistenti e Pipelining)
* **Connessione Persistente (Default `Connection: keep-alive`):** Il server lascia aperta la connessione TCP dopo l'invio della risposta, consentendo il trasferimento sequenziale di più oggetti sulla medesima connessione.
* **Pipelining:** Il client invia molteplici richieste in successione senza attendere le risposte precedenti.
* **Limite di HTTP/1.1 (Head-of-Line Blocking applicativo):** Il server è obbligato a restituire le risposte rigorosamente nello **stesso ordine sequenziale delle richieste**. Se la generazione della prima risorsa richiede molto tempo, tutte le risposte successive rimangono bloccate in coda.

### 8.3 HTTP/2 (Multiplexing Binario e Ottimizzazioni Avanzate)
HTTP/2 rivoluziona lo strato di trasporto preservando la semantica ad alto livello di HTTP/1.1 (metodi, codici di stato, header):
* **Binary Framing Layer:** I messaggi non sono più testo ASCII, ma sono suddivisi in piccoli frame binari tipizzati.
* **Request/Response Multiplexing:** Su un'**unica connessione TCP** vengono aperti molteplici stream logici indipendenti e bidirezionali. I frame di risorse diverse viaggiano intercalati (*interleaved*), eliminando completamente l'Head-of-Line Blocking a livello applicativo.
* **Header Compression (HPACK):** Comprime gli header HTTP eliminando le ridondanze trasmissive tra richieste consecutive.
* **Server Push:** Il server può inviare proattivamente al browser risorse correlate (es. CSS o JavaScript) prima ancora che il client ne effettui la richiesta esplicita (*prefetching*).

![Confronto tra Connessioni HTTP 1.0 Non Persistenti, 1.1 Persistenti con Pipelining e HTTP/2 Multiplexing](images/reti/fig_p1_xref296_597x346.jpeg)

---

## 9. Cenni su HTML (HyperText Markup Language)

L'**HTML** è il linguaggio di formattazione standard a marcatori (tag) utilizzato per definire la struttura e il contenuto dei documenti Web interpretati dal browser.

* **Struttura degli Elementi:** Un elemento HTML standard è racchiuso tra un tag di apertura e un tag di chiusura:
  ```html
  <tagname attributo="valore">Contenuto visualizzato</tagname>
  ```
* **Elementi Vuoti (Void Elements):** Elementi privi di contenuto e privi di tag di chiusura (es. `<img src="..." />`, `<br>`, `<hr>`).
* **Compito del Browser:** Analizzare (*parsing*) la struttura ad albero degli elementi HTML (**DOM - Document Object Model**) e visualizzare graficamente la pagina applicando gli stili CSS e l'esecuzione degli script JavaScript.

---

## 10. Paradigma di Socket Programming: Client-Server TCP e UDP

A livello di programmazione applicativa, le comunicazioni di rete si realizzano mediante le chiamate di sistema (**Socket API**).

```
   FLUSSO SOCKET STREAM (TCP)                     FLUSSO DATAGRAM (UDP)

      SERVER               CLIENT                    SERVER               CLIENT
        │                    │                         │                    │
     socket()             socket()                  socket()             socket()
        │                    │                         │                    │
      bind()                 │                       bind()                 │
        │                    │                         │                    │
     listen()                │                         │                    │
        │                    │                         │                    │
     accept() ◄──connect()───┤                      recvfrom() ◄──sendto()──┤
     (Bloccato)              │                      (Bloccato)              │
        │                    │                         │                    │
     read()  ◄───write()─────┤                      sendto()   ──recvfrom()─►
        │                    │                         │                    │
     write() ────read()─────►│                      close()              close()
        │                    │
     close()              close()
```

* **Socket TCP (Stream):** Richiede una sequenza rigorosa (`socket` $\to$ `bind` $\to$ `listen` $\to$ `accept` sul server; `socket` $\to$ `connect` sul client). Garantisce un canale continuo e bidirezionale privo di errori.
* **Socket UDP (Datagram):** Non richiede `listen` né `connect`; le entità comunicano immediatamente tramite primitive `sendto()` e `recvfrom()` specificando ogni volta l'indirizzo e la porta dell'interlocutore.

---
