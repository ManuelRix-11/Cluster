# Architettura degli Elaboratori

> **Autore:** Emanuele Ragozzini

## Indice dei Contenuti

- [Capitolo 1 — Introduzione e Sistemi di Numerazione](#capitolo-1-introduzione-e-sistemi-di-numerazione)
  - [1.1 Introduzione all'Architettura degli Elaboratori](#11-introduzione-allarchitettura-degli-elaboratori)
  - [1.2 Segnali Analogici, Digitali e Discretizzazione](#12-segnali-analogici-digitali-e-discretizzazione)
  - [1.3 Notazione Posizionale Pesata e Conversioni di Base](#13-notazione-posizionale-pesata-e-conversioni-di-base)
  - [1.4 Rappresentazione dei Numeri Interi con Segno](#14-rappresentazione-dei-numeri-interi-con-segno)
  - [1.5 Operazioni in Complemento a 2, Estensione del Segno e Overflow](#15-operazioni-in-complemento-a-2-estensione-del-segno-e-overflow)
  - [1.6 Rappresentazione in Virgola Mobile (Standard IEEE 754)](#16-rappresentazione-in-virgola-mobile-standard-ieee-754)
  - [1.7 Somma di Potenze Consecutive di 2](#17-somma-di-potenze-consecutive-di-2)
- [Capitolo 2 — Algebra di Boole e Reti Combinatorie](#capitolo-2-algebra-di-boole-e-reti-combinatorie)
  - [2.1 Blocchi Logici: Combinatori e Sequenziali](#21-blocchi-logici-combinatori-e-sequenziali)
  - [2.2 Operatori Booleani e Porte Logiche Fondamentali](#22-operatori-booleani-e-porte-logiche-fondamentali)
  - [2.3 Forme Canoniche: SOP (Sum of Products) e POS (Product of Sums)](#23-forme-canoniche-sop-sum-of-products-e-pos-product-of-sums)
  - [2.4 Analisi e Sintesi di Reti Logiche a Due Livelli](#24-analisi-e-sintesi-di-reti-logiche-a-due-livelli)
  - [2.5 Prestazioni e Costo di una Rete Logica](#25-prestazioni-e-costo-di-una-rete-logica)
  - [2.6 Teoremi dell'Algebra Booleana e Minimizzazione](#26-teoremi-dellalgebra-booleana-e-minimizzazione)
  - [2.7 Condizioni di Indifferenza (Don't Care)](#27-condizioni-di-indifferenza-dont-care)
  - [2.8 Circuiti Integrati (IC) e Livelli di Integrazione](#28-circuiti-integrati-ic-e-livelli-di-integrazione)
- [Capitolo 3 — Moduli Combinatori Standard](#capitolo-3-moduli-combinatori-standard)
  - [3.1 Multiplexer (MUX)](#31-multiplexer-mux)
  - [3.2 Demultiplexer (DEMUX)](#32-demultiplexer-demux)
  - [3.3 Decoder (Decodificatore)](#33-decoder-decodificatore)
  - [3.4 Priority Encoder (Codificatore con Priorità)](#34-priority-encoder-codificatore-con-priorità)
  - [3.5 ROM (Read Only Memory) come Rete Combinatoria](#35-rom-read-only-memory-come-rete-combinatoria)
- [Capitolo 4 — L'ALU (Arithmetic Logic Unit)](#capitolo-4-lalu-arithmetic-logic-unit)
  - [4.1 Ruolo e Funzionalità dell'ALU](#41-ruolo-e-funzionalità-dellalu)
  - [4.2 Progettazione del Sommatore a 1 Bit (Full Adder)](#42-progettazione-del-sommatore-a-1-bit-full-adder)
  - [4.3 Implementazione della Sottrazione (Sub)](#43-implementazione-della-sottrazione-sub)
  - [4.4 Istruzione di Confronto (slt — Set on Less Than)](#44-istruzione-di-confronto-slt-set-on-less-than)
  - [4.5 Gestione dell'Overflow e Bit di Segno (ALU 31)](#45-gestione-delloverflow-e-bit-di-segno-alu-31)
  - [4.6 Rilevamento dello Zero (Zero Output)](#46-rilevamento-dello-zero-zero-output)
  - [4.7 Implementazione dell'Operazione NOR e Segnale Bnegate](#47-implementazione-delloperazione-nor-e-segnale-bnegate)
  - [4.8 Schema Finale dell'ALU a 32 Bit e Segnali di Controllo](#48-schema-finale-dellalu-a-32-bit-e-segnali-di-controllo)
- [Capitolo 5 — Architettura MIPS e Linguaggio Macchina](#capitolo-5-architettura-mips-e-linguaggio-macchina)
  - [5.1 Principi di Progettazione dell'Architettura MIPS](#51-principi-di-progettazione-dellarchitettura-mips)
  - [5.2 Il Banco dei Registri MIPS e la Costante 0](#52-il-banco-dei-registri-mips-e-la-costante-0)
  - [5.3 Organizzazione della Memoria, Allineamento ed Endianness](#53-organizzazione-della-memoria-allineamento-ed-endianness)
  - [5.4 Formati delle Istruzioni MIPS (R, I, J)](#54-formati-delle-istruzioni-mips-r-i-j)
  - [5.5 Istruzioni di Trasferimento Dati: lw e sw](#55-istruzioni-di-trasferimento-dati-lw-e-sw)
  - [5.6 Operazioni con Costanti Immediate e Istruzione lui](#56-operazioni-con-costanti-immediate-e-istruzione-lui)
  - [5.7 Operazioni di Shift: Logico e Aritmetico](#57-operazioni-di-shift-logico-e-aritmetico)
  - [5.8 Operazioni Logiche a Livello di Bit (AND, OR, NOR, XOR)](#58-operazioni-logiche-a-livello-di-bit-and-or-nor-xor)
  - [5.9 Salti Condizionati e Confronti con Segno / Senza Segno](#59-salti-condizionati-e-confronti-con-segno-senza-segno)
  - [5.10 Strutture di Controllo (If-Then-Else e Cicli While)](#510-strutture-di-controllo-if-then-else-e-cicli-while)
  - [5.11 Modi di Indirizzamento nel MIPS](#511-modi-di-indirizzamento-nel-mips)
  - [5.12 Chiamate a Funzione e Procedure (jal, jr $ra)](#512-chiamate-a-funzione-e-procedure-jal-jr-ra)
  - [5.13 Gestione dello Stack e Stack Pointer ($sp)](#513-gestione-dello-stack-e-stack-pointer-sp)
  - [5.14 Fasi di Traduzione ed Esecuzione: Compilatore, Assemblatore, Linker, Loader](#514-fasi-di-traduzione-ed-esecuzione-compilatore-assemblatore-linker-loader)
- [Capitolo 6 — Costruzione della CPU: Datapath e Controllo](#capitolo-6-costruzione-della-cpu-datapath-e-controllo)
  - [6.1 Architettura della CPU e Segnale di Clock](#61-architettura-della-cpu-e-segnale-di-clock)
  - [6.2 Datapath per l'Instruction Fetch (Prelievo Istruzione)](#62-datapath-per-linstruction-fetch-prelievo-istruzione)
  - [6.3 Datapath per le Istruzioni di Tipo R](#63-datapath-per-le-istruzioni-di-tipo-r)
  - [6.4 Datapath per le Istruzioni di Trasferimento Memoria (lw / sw)](#64-datapath-per-le-istruzioni-di-trasferimento-memoria-lw-sw)
  - [6.5 Datapath per i Salti Condizionati (beq)](#65-datapath-per-i-salti-condizionati-beq)
  - [6.6 Datapath Unificato a Singolo Ciclo](#66-datapath-unificato-a-singolo-ciclo)
  - [6.7 Datapath Completo con Istruzione di Salto Incondizionato (j)](#67-datapath-completo-con-istruzione-di-salto-incondizionato-j)
  - [6.8 Progettazione dell'Unità di Controllo](#68-progettazione-dellunità-di-controllo)
  - [6.9 Controllo dell'ALU a Due Livelli](#69-controllo-dellalu-a-due-livelli)
  - [6.10 Tabella dei Segnali di Controllo](#610-tabella-dei-segnali-di-controllo)
- [Capitolo 7 — Prestazioni del Processore e Pipelining](#capitolo-7-prestazioni-del-processore-e-pipelining)
  - [7.1 Misurazione delle Prestazioni della CPU](#71-misurazione-delle-prestazioni-della-cpu)
  - [7.2 Fattori che Influenzano le Prestazioni e Speedup](#72-fattori-che-influenzano-le-prestazioni-e-speedup)
  - [7.3 Concetto Fondamentale del Pipelining](#73-concetto-fondamentale-del-pipelining)
  - [7.4 La Pipeline MIPS a 5 Stadi (IF, ID, EX, MEM, WB)](#74-la-pipeline-mips-a-5-stadi-if-id-ex-mem-wb)
  - [7.5 Confronto Prestazionale: Singolo Ciclo vs Pipeline](#75-confronto-prestazionale-singolo-ciclo-vs-pipeline)
  - [7.6 Registri di Pipeline e Propagazione dei Segnali](#76-registri-di-pipeline-e-propagazione-dei-segnali)
  - [7.7 Criticità della Pipeline (Hazard)](#77-criticità-della-pipeline-hazard)
    - [7.7.1 Hazard Strutturali](#771-hazard-strutturali)
    - [7.7.2 Hazard sui Dati (Data Hazards)](#772-hazard-sui-dati-data-hazards)
    - [7.7.3 Hazard di Tipo Load-Use](#773-hazard-di-tipo-load-use)
    - [7.7.4 Hazard di Controllo (Branch Hazards)](#774-hazard-di-controllo-branch-hazards)
- [Capitolo 8 — Reti Sequenziali e Dispositivi di Memoria](#capitolo-8-reti-sequenziali-e-dispositivi-di-memoria)
  - [8.1 Modello delle Reti Sequenziali e Concetto di Stato](#81-modello-delle-reti-sequenziali-e-concetto-di-stato)
  - [8.2 Latch SR con Porte NOR](#82-latch-sr-con-porte-nor)
  - [8.3 Latch SR Sincronizzato con Clock](#83-latch-sr-sincronizzato-con-clock)
  - [8.4 Latch D Trasparente](#84-latch-d-trasparente)
  - [8.5 Flip-Flop D Master-Slave (Edge-Triggered)](#85-flip-flop-d-master-slave-edge-triggered)
  - [8.6 Struttura Interna del Banco dei Registri (Register File)](#86-struttura-interna-del-banco-dei-registri-register-file)
  - [8.7 Tecnologie di Memoria: SRAM vs DRAM](#87-tecnologie-di-memoria-sram-vs-dram)
  - [8.8 Struttura di una Memoria SRAM 4x2](#88-struttura-di-una-memoria-sram-4x2)
  - [8.9 Confronto tra Tecnologie di Memoria](#89-confronto-tra-tecnologie-di-memoria)
- [Capitolo 9 — Gerarchia di Memoria e Memorie Cache](#capitolo-9-gerarchia-di-memoria-e-memorie-cache)
  - [9.1 Il Principio di Località (Spaziale e Temporale)](#91-il-principio-di-località-spaziale-e-temporale)
  - [9.2 La Gerarchia di Memoria e Terminologia (Hit, Miss, Penalty)](#92-la-gerarchia-di-memoria-e-terminologia-hit-miss-penalty)
  - [9.3 Cache ad Indirizzamento Diretto (Direct Mapped Cache)](#93-cache-ad-indirizzamento-diretto-direct-mapped-cache)
  - [9.4 Struttura dell'Indirizzo di Memoria: Tag, Index, Offset](#94-struttura-dellindirizzo-di-memoria-tag-index-offset)
  - [9.5 Struttura della Linea di Cache e Dimensionamento del Tag](#95-struttura-della-linea-di-cache-e-dimensionamento-del-tag)
  - [9.6 Architettura di una Cache da 4 KB](#96-architettura-di-una-cache-da-4-kb)
  - [9.7 Gestione dei Miss nella Cache e Impatto sulla Pipeline](#97-gestione-dei-miss-nella-cache-e-impatto-sulla-pipeline)
  - [9.8 Politiche di Scrittura: Write-Through e Write-Back](#98-politiche-di-scrittura-write-through-e-write-back)

---
## Capitolo 1 — Introduzione e Sistemi di Numerazione

### 1.1 Introduzione all'Architettura degli Elaboratori

L'**Architettura (informatica)** è l'insieme dei criteri in base ai quali è progettato e realizzato un sistema informatico. 
L'**Elaboratore** (o calcolatore, o computer) è una macchina in grado di eseguire autonomamente sequenze di operazioni logico-aritmetiche, programmate per risolvere problemi specifici.

Un elaboratore è organizzato su più livelli di astrazione:
- **Linguaggio di alto livello (C, Java, Python):** orientato alla comprensione umana e alla produttività del programmatore.
- **Linguaggio Assembly:** rappresentazione simbolica leggibile delle istruzioni macchina.
- **Linguaggio Macchina:** sequenze binarie (stringhe di 0 e 1) direttamente comprensibili ed eseguibili dall'hardware.
- **Microarchitettura e Reti Logiche:** insieme di circuiti elettronici (porte logiche, registri, ALU, multiplexer, memorie) che implementano le istruzioni.

Il **Bit** (*binary digit* = cifra binaria) è l'unità elementare di informazione e può assumere solo due stati: $0$ o $1$.
Un raggruppamento di $8$ bit costituisce un **Byte**.

---

### 1.2 Segnali Analogici, Digitali e Discretizzazione

In natura la maggior parte dei fenomeni fisici si presenta in forma **continua** (segnali analogici, come la voce, la temperatura, la tensione continua).
I calcolatori digitali, invece, possono trattare esclusivamente informazioni **discrete** (segnali digitali).

Il processo di conversione da analogico a digitale si articola in tre fasi fondamentali:
1. **Campionamento:** il segnale continuo viene misurato a intervalli regolari di tempo (tempo discreto).
2. **Quantizzazione:** il valore misurato viene approssimato al livello discreto più vicino tra quelli disponibili.
3. **Codifica:** i livelli discreti quantizzati vengono trasformati in sequenze di simboli binari ($0$ e $1$) trasmissibili ed elaborabili dai circuiti digitali.

---

### 1.3 Notazione Posizionale Pesata e Conversioni di Base

Nel sistema posizionale pesato, il valore di un numero $N$ espresso in base $r$ con $n$ cifre intere è dato dalla sommatoria dei prodotti tra ciascuna cifra $d_i$ e il peso della sua posizione $r^i$:

$$N = \sum_{i=0}^{n-1} d_i \cdot r^i = d_{n-1} r^{n-1} + d_{n-2} r^{n-2} + \dots + d_1 r^1 + d_0 r^0$$

#### Esempio in Base 10 (Decimale):
$$153_{10} = 1 \cdot 10^2 + 5 \cdot 10^1 + 3 \cdot 10^0 = 100 + 50 + 3 = 153$$

#### Esempio in Base 2 (Binario):
$$1011_2 = 1 \cdot 2^3 + 0 \cdot 2^2 + 1 \cdot 2^1 + 1 \cdot 2^0 = 8 + 0 + 2 + 1 = 11_{10}$$

#### Esempio in Base 16 (Esadecimale):
I simboli utilizzati sono le cifre da $0$ a $9$ e le lettere da $A$ ($=10$) a $F$ ($=15$):
$$3F_{16} = 3 \cdot 16^1 + 15 \cdot 16^0 = 48 + 15 = 63_{10}$$

#### Tabella delle Corrispondenze tra Basi (0 - 15)

| Decimale (Base 10) | Binario (Base 2) | Esadecimale (Base 16) |
| :---: | :---: | :---: |
| 0 | 0000 | 0 |
| 1 | 0001 | 1 |
| 2 | 0010 | 2 |
| 3 | 0011 | 3 |
| 4 | 0100 | 4 |
| 5 | 0101 | 5 |
| 6 | 0110 | 6 |
| 7 | 0111 | 7 |
| 8 | 1000 | 8 |
| 9 | 1001 | 9 |
| 10 | 1010 | A |
| 11 | 1011 | B |
| 12 | 1100 | C |
| 13 | 1101 | D |
| 14 | 1110 | E |
| 15 | 1111 | F |

#### Algoritmo delle Divisioni Successive (Da Base 10 a Base $r$)
Per convertire un numero intero decimale in binario (o in un'altra base $r$), si divide ripetutamente il numero per $r$, registrando i resti, finché il quoziente non diventa $0$. Le cifre del numero convertito corrispondono ai resti letti in ordine inverso (dall'ultimo ottenuto al primo):

**Esempio:** Conversione di $153_{10}$ in binario:
- $153 / 2 = 76$ con resto **1** (LSB — Least Significant Bit)
- $76 / 2 = 38$ con resto **0**
- $38 / 2 = 19$ con resto **0**
- $19 / 2 = 9$ con resto **1**
- $9 / 2 = 4$ con resto **1**
- $4 / 2 = 2$ con resto **0**
- $2 / 2 = 1$ con resto **0**
- $1 / 2 = 0$ con resto **1** (MSB — Most Significant Bit)

Risultato: $153_{10} = 10011001_2$.

---

### 1.4 Rappresentazione dei Numeri Interi con Segno

Su $n$ bit, possiamo rappresentare numeri interi relativi utilizzando diverse convenzioni:

1. **Modulo e Segno:**
   - Il bit più significativo (MSB, bit $n-1$) è il bit di segno: $0$ per positivo, $1$ per negativo.
   - I restanti $n-1$ bit rappresentano il valore assoluto (modulo) del numero.
   - *Svantaggi:* Doppia rappresentazione dello zero ($+0$ e $-0$), circuiteria aritmetica complessa.
   - Intervallo: $[-(2^{n-1}-1), +(2^{n-1}-1)]$.

2. **Complemento a 1 (C1):**
   - I numeri positivi si rappresentano come in binario puro.
   - I numeri negativi si ottengono invertendo (negando) tutti i singoli bit della rappresentazione positiva.
   - *Svantaggi:* Presenta ancora la doppia rappresentazione dello zero ($0000_2 = +0$, $1111_2 = -0$).
   - Intervallo: $[-(2^{n-1}-1), +(2^{n-1}-1)]$.

3. **Complemento a 2 (C2):**
   - È lo standard universale impiegato in tutte le CPU moderne.
   - Il bit più significativo ha peso negativo: $-d_{n-1} \cdot 2^{n-1} + \sum_{i=0}^{n-2} d_i 2^i$.
   - **Regola di calcolo:** Per calcolare il negativo $-A$ a partire da $A$:
     1. Si invertono tutti i bit (si calcola il complemento a 1);
     2. Si somma $1$ al risultato: $\text{C2}(A) = \bar{A} + 1$.
   - **Proprietà fondamentali del Complemento a 2:**
     - Esiste un'unica rappresentazione per lo zero ($0000\dots0$).
     - Intervallo asimmetrico: $[-2^{n-1}, +2^{n-1}-1]$. Per $n=4$ bit: $[-8, +7]$; per $n=32$ bit: $[-2^{31}, +2^{31}-1]$.

---

### 1.5 Operazioni in Complemento a 2, Estensione del Segno e Overflow

#### Somma e Sottrazione
In complemento a 2 la sottrazione $A - B$ si esegue semplicemente come una somma con il valore negato: $A + (-B) = A + (\bar{B} + 1)$. Il circuito hardware del sommatore non necessita di logica separata per la sottrazione.

#### Estensione del Segno (Sign Extension)
Quando si converte un numero da $n$ bit a $m$ bit (con $m > n$), è sufficiente replicare il bit di segno (MSB) nelle posizioni più significative aggiunte:
- $+5$ su 4 bit: `0101` $\to$ su 8 bit: `00000101`
- $-3$ su 4 bit: `1101` $\to$ su 8 bit: `11111101`

#### Overflow Aritmetico
L'overflow si verifica quando il risultato di un'operazione non può essere rappresentato nel numero di bit a disposizione.
Nell'addizione in complemento a 2, si ha **overflow** se e solo se:
1. La somma di due numeri positivi produce un risultato negativo;
2. La somma di due numeri negativi produce un risultato positivo.

> [!NOTE]
> La somma tra un numero positivo e uno negativo non può mai generare overflow.

**Esempio 1 (Nessun Overflow):**
$4 + (-3) = 1$ su $n=4$ bit:
```text
  1101  (-3) +
  0100  (+4) =
 10001  -> Il riporto oltre il 4° bit viene scartato, risultato = 0001 (+1) [CORRETTO]
```

**Esempio 2 (Con Overflow):**
$5 + 4 = 9$ su $n=4$ bit (intervallo $[-8, +7]$):
```text
  0101  (+5) +
  0100  (+4) =
  1001  -> Risultato = -7 in complemento a 2 [OVERFLOW RILEVATO]
```

---

### 1.6 Rappresentazione in Virgola Mobile (Standard IEEE 754)

Per rappresentare numeri reali frazionari o con ordini di grandezza molto ampi, si adotta la notazione a virgola mobile (*floating point*) in base 2:

$$N = (-1)^s \cdot M \cdot 2^E$$

- $s$: Bit di segno ($0$ per positivo, $1$ per negativo).
- $M$: Mantissa (o significando), normalizzata nella forma $1.f$ (con bit implicito a 1).
- $E$: Esponente con polarizzazione (*bias*): $E = e - \text{Bias}$.

#### Formato Singola Precisione a 32 Bit (IEEE 754)
- **1 bit di segno ($s$):** bit 31
- **8 bit di esponente ($e$):** bit 30–23 ($\text{Bias} = 127$)
- **23 bit di frazione ($f$):** bit 22–0 ($\text{Mantissa } M = 1 + f$)

```text
 31 30         23 22                                  0
+--+-------------+-------------------------------------+
|s |  esponente  |              frazione               |
+--+-------------+-------------------------------------+
 1b     8 bit                     23 bit
```

- Con 8 bit di esponente si hanno 256 configurazioni:
  - $e = 0$ ed $e = 255$ sono riservati per valori speciali (zero, numeri denormalizzati, $\pm\infty$, $\text{NaN}$ — *Not a Number*).
  - Gli esponenti normalizzati vanno da $e = 1$ ($E = 1 - 127 = -126$) a $e = 254$ ($E = 254 - 127 = +127$).
- **Overflow:** si verifica quando l'esponente positivo è troppo grande per essere rappresentato.
- **Underflow:** si verifica quando l'esponente negativo è troppo piccolo (in valore assoluto) per essere rappresentato.

---

### 1.7 Somma di Potenze Consecutive di 2

Una formula notevole utilizzata nell'analisi delle memorie e degli indirizzi binari è la somma di potenze di 2:

$$\sum_{i=h}^{k} 2^i = 2^{k+1} - 2^h$$

Se $h = 0$, la somma delle prime $k$ potenze di 2 vale:
$$\sum_{i=0}^{k} 2^i = 2^{k+1} - 1$$

---
## Capitolo 2 — Algebra di Boole e Reti Combinatorie

### 2.1 Blocchi Logici: Combinatori e Sequenziali

All'interno di un processore si distinguono due grandi categorie di componenti:
1. **Circuiti Combinatori (senza memoria):** l'uscita in un dato istante dipende esclusivamente dai valori correnti presenti sugli ingressi.
2. **Circuiti Sequenziali (con memoria):** l'uscita dipende sia dagli ingressi correnti sia dallo **stato interno** memorizzato (storia passata del circuito).

![Figura 1: Modello astratto di un blocco logico combinatorio con m ingressi ed n uscite](images/ade/fig_01_blocco_logico.png)

Un blocco combinatorio con $m$ fili di ingresso e $n$ fili di uscita realizza una o più funzioni logiche $f: \{0,1\}^m \to \{0,1\}^n$. 
Poiché il dominio è finito, ogni funzione logica può essere definita in modo esaustivo tramite una **Tavola di Verità** costituita da $2^m$ righe.

---

### 2.2 Operatori Booleani e Porte Logiche Fondamentali

L'**Algebra di Boole** modella il comportamento dei circuiti digitali su variabili binarie ($0$ e $1$). I tre operatori booleani primari sono:
- **AND (Prodotto logico):** $f(x, y) = x \cdot y$ — Vero solo se entrambi gli ingressi sono 1.
- **OR (Somma logica):** $f(x, y) = x + y$ — Vero se almeno uno degli ingressi è 1.
- **NOT (Negazione / Inversione):** $f(x) = \bar{x}$ — Inverte il valore d'ingresso.

A partire da questi si definiscono operatori derivati essenziali:
- **XOR (OR esclusivo):** $x \oplus y = x\bar{y} + \bar{x}y$ — Vero se e solo se i due ingressi sono diversi.
- **NAND:** $\overline{x \cdot y}$ — Porta universale.
- **NOR:** $\overline{x + y}$ — Porta universale.
- **XNOR:** $\overline{x \oplus y} = xy + \bar{x}\bar{y}$ — Operatore di equivalenza/coincidenza.

#### Tavole di Verità degli Operatori Fondamentali

| $x$ | $y$ | AND ($x \cdot y$) | OR ($x + y$) | XOR ($x \oplus y$) | NAND ($\overline{x \cdot y}$) | NOR ($\overline{x + y}$) | XNOR ($\overline{x \oplus y}$) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 |
| 0 | 1 | 0 | 1 | 1 | 1 | 0 | 0 |
| 1 | 0 | 0 | 1 | 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 | 1 |

| $x$ | NOT ($\bar{x}$) |
| :---: | :---: |
| 0 | 1 |
| 1 | 0 |

![Figura 2: Rappresentazione standard delle porte logiche più comuni](images/ade/fig_02_porte_logiche_standard.png)

![Figura 3: Simboli grafici di tutte le porte logiche (OR, AND, NOT, NOR, NAND, XOR, XNOR)](images/ade/fig_03_simboli_porte_tutte.png)

#### Negazione degli Ingressi e Convenzione a Pallino (*Bubble*)
È uso frequente rappresentare la negazione di un ingresso mediante un pallino posto all'estremità dell'ingresso della porta logica, anziché disegnare una porta NOT separata:

![Figura 4: Rappresentazione della negazione degli ingressi con pallino](images/ade/fig_04_negazione_ingressi.png)

![Figura 5: Teorema di De Morgan e circuito equivalente con porte a ingressi negati](images/ade/fig_05_demorgan_circuito.png)

---

### 2.3 Forme Canoniche: SOP (Sum of Products) e POS (Product of Sums)

Ogni funzione booleana può essere espressa in due forme canoniche standard:

1. **Forma Canonica SOP (Somma di Prodotti):**
   - Un **Mintermine** è un prodotto (AND) logico che contiene tutte le variabili della funzione, ciascuna in forma diretta (se nella riga della tavola vale 1) o negata (se vale 0).
   - L'espressione SOP canonica è l'OR di tutti i mintermini corrispondenti alle righe della tavola di verità in cui l'uscita $f = 1$.
   - *Esempio SOP:* $f(x_1, x_2, x_3) = x_1\bar{x}_2x_3 + x_1x_2\bar{x}_3 + x_1x_2x_3$

2. **Forma Canonica POS (Prodotto di Somme):**
   - Un **Maxtermine** è una somma (OR) logica che contiene tutte le variabili della funzione, in forma diretta (se nella riga vale 0) o negata (se vale 1).
   - L'espressione POS canonica è l'AND di tutti i maxtermini corrispondenti alle righe della tavola di verità in cui l'uscita $f = 0$.
   - *Esempio POS:* $f(x_1, x_2, x_3) = (x_1 + \bar{x}_2 + \bar{x}_3)(\bar{x}_1 + x_2 + \bar{x}_3)$

---

### 2.4 Analisi e Sintesi di Reti Logiche a Due Livelli

- **Analisi:** Data una rete logica (interconnessione di porte), determinare la funzione booleana calcolata all'uscita propagando le espressioni dagli ingressi alle uscite.
- **Sintesi:** Data una specifica o tavola di verità, progettare la rete logica ottimale che la realizza.
  - **Procedimento di Sintesi a Due Livelli (AND-to-OR):**
    1. Ricavare la tavola di verità della funzione $f$;
    2. Estrarre l'espressione canonica SOP;
    3. Minimizzare l'espressione SOP;
    4. Mappare l'espressione su una rete a due stadi: primo livello di porte AND (prodotti) e secondo livello con una porta OR (somma).

---

### 2.5 Prestazioni e Costo di una Rete Logica

Le prestazioni e l'efficienza di una rete logica si valutano in base a due criteri:
1. **Velocità (Tempo di propagazione):** misurata dal ritardo massimo (*critical path*) che un segnale impiega per viaggiare dagli ingressi all'uscita. Le reti a due livelli sono le più veloci possibili per realizzare funzioni arbitrarie.
   - **Fan-in:** numero massimo di ingressi collegati a una singola porta.
   - **Fan-out:** numero massimo di ingressi di altre porte che possono essere pilotati dall'uscita di una porta.
2. **Costo:** dipende dal numero di porte logiche e dal numero complessivo di linee di ingresso (*letterali*).

Un'espressione SOP è **minimale** se:
- Contiene il minor numero possibile di termini prodotto (porte AND);
- A parità di termini prodotto, contiene il minor numero di letterali (ingressi alle porte).

---

### 2.6 Teoremi dell'Algebra Booleana e Minimizzazione

#### Tabella delle Proprietà dell'Algebra Booleana

| Proprietà | Forma AND (Prodotto) | Forma OR (Somma) |
| :--- | :--- | :--- |
| **Elemento Neutro (Identità)** | $x \cdot 1 = x$ | $x + 0 = x$ |
| **Elemento Nullo (Assorbimento zero)** | $x \cdot 0 = 0$ | $x + 1 = 1$ |
| **Idempotenza** | $x \cdot x = x$ | $x + x = x$ |
| **Complementarità (Inverso)** | $x \cdot \bar{x} = 0$ | $x + \bar{x} = 1$ |
| **Involuzione (Doppia negazione)** | $\overline{\overline{x}} = x$ | $\overline{\overline{x}} = x$ |
| **Commutatività** | $x \cdot y = y \cdot x$ | $x + y = y + x$ |
| **Associatività** | $x \cdot (y \cdot z) = (x \cdot y) \cdot z$ | $x + (y + z) = (x + y) + z$ |
| **Distributività** | $x \cdot (y + z) = (x \cdot y) + (x \cdot z)$ | $x + (y \cdot z) = (x + y) \cdot (x + z)$ |
| **Assorbimento** | $x \cdot (x + y) = x$ | $x + (x \cdot y) = x$ |
| **Consenso** | $x \cdot y + \bar{x} \cdot z + y \cdot z = x \cdot y + \bar{x} \cdot z$ | $(x + y)(\bar{x} + z)(y + z) = (x + y)(\bar{x} + z)$ |
| **Teoremi di De Morgan** | $\overline{x \cdot y} = \bar{x} + \bar{y}$ | $\overline{x + y} = \bar{x} \cdot \bar{y}$ |

#### Mappe di Karnaugh
Per funzioni fino a 4 variabili si impiegano le Mappe di Karnaugh: una matrice in cui le celle adiacenti differiscono per un solo bit (codice Gray). Raggruppando le celle con valore $1$ in potenze di 2 ($1, 2, 4, 8, 16$), si eliminano le variabili che cambiano stato, ottenendo l'espressione minimale.

![Figura 6: Esempio di minimizzazione con Mappa di Karnaugh a 4 variabili](images/ade/fig_06_mappa_karnaugh.png)

---

### 2.7 Condizioni di Indifferenza (Don't Care)

Le condizioni di indifferenza (*Don't Care*, indicate con $X$ o $d$) sono configurazioni degli ingressi che non possono mai verificarsi o per le quali il valore dell'uscita è irrilevante.
Nelle Mappe di Karnaugh, il progettista può assegnare a ciascun don't care il valore $0$ o $1$ a seconda di cosa consente di formare raggruppamenti più ampi, semplificando ulteriormente il circuito.

---

### 2.8 Circuiti Integrati (IC) e Livelli di Integrazione

Un **Circuito Integrato (IC)** è un chip di silicio su cui sono integrati transistor e porte logiche, racchiuso in un contenitore protettivo (*package*) come il **DIP** (*Dual In-Line Package*, con due file parallele di piedini/pin).

![Figura 7: Chip di silicio all'interno di un package DIP a 14 pin](images/ade/fig_07_package_dip.png)

I circuiti integrati vengono classificati in base alla densità di integrazione:
- **SSI (Small Scale Integration):** da 1 a 10 porte logiche per chip.
- **MSI (Medium Scale Integration):** da 10 a 100 porte logiche.
- **LSI (Large Scale Integration):** da 100 a 100.000 porte logiche.
- **VLSI (Very Large Scale Integration):** oltre 100.000 porte logiche (processori moderni).

---
## Capitolo 3 — Moduli Combinatori Standard

### 3.1 Multiplexer (MUX)

Il **Multiplexer** (o selettore di linea) è un circuito combinatorio che riceve $2^n$ ingressi dati, $n$ linee di selezione ($S$), e convoglia sull'unica uscita il dato selezionato.

#### MUX 2-a-1
Ha 2 ingressi dati ($A, B$), 1 linea di selezione ($S$) e 1 uscita ($Y$):
- Se $S = 0 \implies Y = A$
- Se $S = 1 \implies Y = B$
- **Equazione logica:** $Y = A\bar{S} + BS$

| $S$ | Uscita $Y$ |
| :---: | :---: |
| 0 | $A$ |
| 1 | $B$ |

![Figura 8: Schema circuitale interno di un Multiplexer 2-a-1](images/ade/fig_08_mux_2a1_schema.png)

![Figura 9: Simbolo logico del Multiplexer 2-a-1](images/ade/fig_09_mux_2a1_simbolo.png)

#### MUX 4-a-1
Ha 4 ingressi dati ($I_0, I_1, I_2, I_3$), 2 linee di selezione ($S_1, S_0$) e 1 uscita ($Y$):
- **Equazione logica:** $Y = I_0\bar{S}_1\bar{S}_0 + I_1\bar{S}_1S_0 + I_2S_1\bar{S}_0 + I_3S_1S_0$

| $S_1$ | $S_0$ | Uscita $Y$ |
| :---: | :---: | :---: |
| 0 | 0 | $I_0$ |
| 0 | 1 | $I_1$ |
| 1 | 0 | $I_2$ |
| 1 | 1 | $I_3$ |

![Figura 10: Schema circuitale interno di un Multiplexer 4-a-1](images/ade/fig_10_mux_4a1_schema.png)

---

### 3.2 Demultiplexer (DEMUX)

Il **Demultiplexer** compie l'operazione inversa del multiplexer: riceve un unico ingresso dati $D$, $n$ linee di selezione, e instrada il dato $D$ su una delle $2^n$ uscite, lasciando le altre a 0.

#### DEMUX 1-a-4
- Ingressi: $D$, selettori $S_1, S_0$.
- Uscite: $Y_0 = D\bar{S}_1\bar{S}_0$, $Y_1 = D\bar{S}_1S_0$, $Y_2 = DS_1\bar{S}_0$, $Y_3 = DS_1S_0$.

| $S_1$ | $S_0$ | $Y_3$ | $Y_2$ | $Y_1$ | $Y_0$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | 0 | 0 | 0 | 0 | $D$ |
| 0 | 1 | 0 | 0 | $D$ | 0 |
| 1 | 0 | 0 | $D$ | 0 | 0 |
| 1 | 1 | $D$ | 0 | 0 | 0 |

![Figura 11: Schema circuitale interno di un Demultiplexer 1-a-4](images/ade/fig_11_demux_1a4_schema.png)

---

### 3.3 Decoder (Decodificatore)

Un **Decoder $n \to 2^n$** riceve un codice binario di $n$ bit in ingresso e attiva esattamente una delle sue $2^n$ uscite (quella corrispondente al numero binario in ingresso). Spesso è presente un segnale di abilitazione (*Enable* $E$).

#### Decoder 3-a-8 con Enable

| $E$ | $A$ | $B$ | $C$ | $Y_7$ | $Y_6$ | $Y_5$ | $Y_4$ | $Y_3$ | $Y_2$ | $Y_1$ | $Y_0$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | X | X | X | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
| 1 | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
| 1 | 1 | 0 | 1 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

![Figura 12: Schema logico di un Decoder 3-a-8](images/ade/fig_12_decoder_3a8.png)

---

### 3.4 Priority Encoder (Codificatore con Priorità)

L'**Encoder** esegue l'operazione opposta al decoder: avendo $2^n$ ingressi, genera all'uscita il codice binario a $n$ bit corrispondente all'ingresso attivo.
Nel **Priority Encoder (8-a-3)**, qualora più ingressi siano contemporaneamente attivi a 1, il circuito codifica l'indice dell'ingresso attivo a priorità più alta (solitamente il bit più significativo).

| $D_7$ | $D_6$ | $D_5$ | $D_4$ | $D_3$ | $D_2$ | $D_1$ | $D_0$ | $A_2$ | $A_1$ | $A_0$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 0 | 0 | 0 | 0 | 0 | 1 | X | 0 | 0 | 1 |
| 0 | 0 | 0 | 0 | 0 | 1 | X | X | 0 | 1 | 0 |
| 0 | 0 | 0 | 0 | 1 | X | X | X | 0 | 1 | 1 |
| 0 | 0 | 0 | 1 | X | X | X | X | 1 | 0 | 0 |
| 0 | 0 | 1 | X | X | X | X | X | 1 | 0 | 1 |
| 0 | 1 | X | X | X | X | X | X | 1 | 1 | 0 |
| 1 | X | X | X | X | X | X | X | 1 | 1 | 1 |

![Figura 13: Schema logico di un Priority Encoder 8-a-3](images/ade/fig_13_priority_encoder.png)

---

### 3.5 ROM (Read Only Memory) come Rete Combinatoria

Una **ROM** può essere interpretata come un modulo combinatorio universale a più uscite:
- Riceve in ingresso un indirizzo di $n$ bit;
- Un decoder interno $n \to 2^n$ seleziona una delle $2^n$ righe di memoria;
- Ciascuna riga fornisce in uscita una parola di $m$ bit memorizzata tramite connessioni con diodi o transistor.
- Una ROM con $n$ bit di indirizzo e parole di $m$ bit memorizza $2^n \times m$ bit.

![Figura 14: Architettura interna di una ROM con decoder e matrice a diodi/transistor](images/ade/fig_14_rom_architettura.png)

#### Vantaggi delle ROM:
- **Non volatile:** i dati permangono anche in assenza di alimentazione;
- **Protezione:** i dati non possono essere modificati accidentalmente;
- **Economica ed affidabile:** struttura semplice e testabile;
- **Statica:** non necessita di cicli di refresh.

---
## Capitolo 4 — L'ALU (Arithmetic Logic Unit)

### 4.1 Ruolo e Funzionalità dell'ALU

L'**ALU (Arithmetic Logic Unit)** è il circuito combinatorio all'interno del processore deputato all'esecuzione di tutte le operazioni aritmetiche e logiche richieste dalle istruzioni macchina:
- Operazioni Logiche: `AND`, `OR`, `NOR`
- Operazioni Aritmetiche: Addizione (`add`), Sottrazione (`sub`)
- Operazioni di Confronto: Set on Less Than (`slt`), Uguaglianza per branch (`beq`, `bne`)

La progettazione segue un approccio modulare: si costruisce una **ALU a 1 bit** e se ne collegano $32$ copie in cascata (*ripple*) per elaborare parole a 32 bit.

![Figura 15: Struttura base di una ALU a 1 bit per operazioni AND e OR con multiplexer](images/ade/fig_15_alu_1bit_and_or.png)

![Figura 16: ALU a 32 bit ottenuta collegando in cascata 32 copie della ALU a 1 bit](images/ade/fig_16_alu_32bit_cascata.png)

---

### 4.2 Progettazione del Sommatore a 1 Bit (Full Adder)

Il **Full Adder (Sommatore Completo a 1 bit)** riceve due bit di operando $a$ e $b$, e un riporto in ingresso $CarryIn$, producendo la somma $Sum$ e il riporto in uscita $CarryOut$.

#### Tavola di Verità del Full Adder

| $a$ | $b$ | $CarryIn$ | $CarryOut$ | $Sum$ |
| :---: | :---: | :---: | :---: | :---: |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 |
| 0 | 1 | 1 | 1 | 0 |
| 1 | 0 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 | 0 |
| 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 1 |

#### Equazioni Booleane:
- **CarryOut (maggioranza):** $CarryOut = b \cdot CarryIn + a \cdot CarryIn + a \cdot b$
- **Sum (parità dispari):** $Sum = a \oplus b \oplus CarryIn$

![Figura 17: Tavola di verità e schema logico a blocchi del Full Adder](images/ade/fig_17_full_adder_tabella_schema.png)

![Figura 18: Schema circuitale del Full Adder con porte AND, OR e XOR](images/ade/fig_18_full_adder_porte.png)

![Figura 19: ALU a 1 bit con supporto alle operazioni AND, OR e ADD](images/ade/fig_19_alu_1bit_and_or_add.png)

![Figura 20: Circuito logico per la generazione del CarryOut a due livelli](images/ade/fig_20_carryout_circuito.png)

---

### 4.3 Implementazione della Sottrazione (Sub)

Sfruttando il complemento a 2, la sottrazione $A - B = A + (-B) = A + \bar{B} + 1$ si realizza aggiungendo:
1. Un multiplexer 2-a-1 sull'ingresso $B$ controllato dal segnale **Binvert**: se $\text{Binvert}=1$, si seleziona l'ingresso invertito $\bar{b}$;
2. Ponendo il riporto iniziale $CarryIn = 1$ nella ALU del bit meno significativo (ALU 0).

![Figura 21: ALU a 1 bit con multiplexer per l'inversione di B (sottrazione)](images/ade/fig_21_alu_1bit_sub.png)

---

### 4.4 Istruzione di Confronto (slt — Set on Less Than)

L'istruzione `slt` confronta due registri e imposta il registro destinazione a $1$ se $a < b$, altrimenti a $0$.
Il confronto $a < b$ equivale a verificare se la differenza $a - b < 0$.
In complemento a 2, un numero è negativo se il suo bit più significativo (bit 31, bit di segno) vale $1$.

- La ALU del bit 31 genera un'uscita speciale chiamata **Set**, pari al bit di somma (risultato) della sottrazione su 32 bit:
  - Se $a < b \implies a - b < 0 \implies Set = 1$;
  - Se $a \ge b \implies a - b \ge 0 \implies Set = 0$.
- Ciascuna ALU a 1 bit riceve un ingresso **Less**:
  - In ALU 0, l'ingresso Less è collegato direttamente all'uscita **Set** della ALU 31;
  - In tutte le altre ALU (da 1 a 31), l'ingresso Less è costantemente cablato a $0$.
- In questo modo, se $a < b$, il risultato a 32 bit prodotto sarà $0000\dots0001_2$ ($1$); se $a \ge b$, sarà $0000\dots0000_2$ ($0$).

![Figura 22: ALU a 1 bit con ingresso Less e operazione di confronto slt](images/ade/fig_22_alu_1bit_slt.png)

---

### 4.5 Gestione dell'Overflow e Bit di Segno (ALU 31)

La ALU a 1 bit per il bit più significativo (ALU 31) differisce dalle altre ALU intermedie perché deve:
1. Rilevare l'overflow aritmetico:
   $$\text{Overflow} = CarryIn_{31} \oplus CarryOut_{31}$$
2. Fornire l'uscita **Set** per l'istruzione `slt`. In presenza di overflow, il bit di segno effettivo è corretto tenendo conto del segno del riporto: $\text{Set} = \text{Sum}_{31} \oplus \text{Overflow}$.

![Figura 23: Struttura dettagliata della ALU 31 con rilevamento di Overflow e uscita Set](images/ade/fig_23_alu_bit31_overflow_set.png)

---

### 4.6 Rilevamento dello Zero (Zero Output)

Per implementare le istruzioni di salto condizionato `beq` (*branch if equal*) e `bne` (*branch if not equal*), l'ALU genera un'uscita a 1 bit denominata **Zero**:
- $\text{Zero} = 1$ se tutti i 32 bit del risultato sono uguali a 0 ($a - b = 0 \iff a = b$);
- $\text{Zero} = 0$ altrimenti.

Si realizza con una porta **NOR a 32 ingressi** che riceve tutte le uscite $Result_0, \dots, Result_{31}$:

$$\text{Zero} = \overline{Result_0 + Result_1 + \dots + Result_{31}}$$

![Figura 24: Circuito di rilevamento dello Zero tramite porta NOR a 32 ingressi](images/ade/fig_24_zero_detection_nor.png)

---

### 4.7 Implementazione dell'Operazione NOR e Segnale Bnegate

Per il secondo teorema di De Morgan:

$$\text{NOR}(a, b) = \overline{a + b} = \bar{a} \cdot \bar{b}$$

Aggiungendo un segnale **Ainvert** sull'ingresso $a$ e ponendo $\text{Operation} = \text{AND}$ ($00_2$), la ALU calcola $\bar{a} \cdot \bar{b} = \text{NOR}(a,b)$.

Per ottimizzare le linee di controllo:
- Poiché nella sottrazione $\text{Binvert} = 1$ e $CarryIn_0 = 1$, mentre nelle operazioni logiche $\text{Binvert} = 0$ e $CarryIn_0 = 0$, i due segnali vengono fusi in un'unica linea di controllo denominata **Bnegate**.

![Figura 25: Schema della ALU a 1 bit con ingressi Ainvert, Bnegate e 4 operazioni](images/ade/fig_25_alu_1bit_nor_ainvert.png)

![Figura 26: Simbolo logico della ALU completa a 32 bit con segnali di controllo e uscite di stato](images/ade/fig_26_alu_32bit_simbolo.png)

---

### 4.8 Schema Finale dell'ALU a 32 Bit e Segnali di Controllo

![Figura 27: Schema circuitale completo dell'ALU a 32 bit interconnessa](images/ade/fig_27_alu_32bit_schema_completo.png)

![Figura 28: Tabella delle codifiche dei segnali di controllo dell'ALU](images/ade/fig_28_alu_segnali_controllo.png)

#### Tabella dei Segnali di Controllo dell'ALU (ALU Control a 4 Bit)

| ALU Control Line (`Ainvert`, `Bnegate`, `Op1`, `Op0`) | Funzione Eseguita | Descrizione |
| :---: | :---: | :--- |
| `0000` | AND | $a \cdot b$ |
| `0001` | OR | $a + b$ |
| `0010` | ADD | $a + b$ (Addizione) |
| `0110` | SUB | $a - b$ (Sottrazione) |
| `0111` | SLT | $a < b$ (Set on Less Than) |
| `1100` | NOR | $\overline{a + b} = \bar{a} \cdot \bar{b}$ |

---
## Capitolo 5 — Architettura MIPS e Linguaggio Macchina

### 5.1 Principi di Progettazione dell'Architettura MIPS

Il MIPS (*Microprocessor without Interlocked Pipeline Stages*) è un'architettura **RISC** (*Reduced Instruction Set Computer*) basata su 4 principi guida fondamentali:
1. **La semplicità favorisce la regolarità:** tutte le istruzioni hanno la stessa lunghezza ($32$ bit) e formati uniformi.
2. **Più piccolo è più veloce:** un numero limitato di registri ($32$) consente tempi di accesso rapidi.
3. **Rendere veloce il caso frequente:** istruzioni immediate con costanti integrate nel formato.
4. **Un buon compromesso richiede buone scelte:** mantenere istruzioni di lunghezza fissa con pochi formati distinti.

---

### 5.2 Il Banco dei Registri MIPS e la Costante 0

Il MIPS dispone di **32 registri a 32 bit** (da `$0` a `$31`), ciascuno con un nome convenzionale:

| Registro | Nome | Utilizzo Convenzionale | Preservato nelle chiamate? |
| :---: | :---: | :--- | :---: |
| `$0` | `$zero` | Costante fissa $0$ (cablato a massa, non modificabile) | N/A |
| `$1` | `$at` | Riservato all'assemblatore (*Assembler Temporary*) | No |
| `$2 - $3` | `$v0 - $v1` | Valori restituiti dalle funzioni e risultati di espressioni | No |
| `$4 - $7` | `$a0 - $a3` | Argomenti / parametri passati alle funzioni | No |
| `$8 - $15` | `$t0 - $t7` | Registri temporanei (non salvati dal chiamato) | No |
| `$16 - $23` | `$s0 - $s7` | Registri salvati (salvati dal chiamato) | **Sì** |
| `$24 - $25` | `$t8 - $t9` | Ulteriori registri temporanei | No |
| `$26 - $27` | `$k0 - $k1` | Riservati al kernel del sistema operativo / handler interrupt | No |
| `$28` | `$gp` | Global Pointer (puntatore all'area dati globali) | **Sì** |
| `$29` | `$sp` | Stack Pointer (puntatore alla cima dello stack) | **Sì** |
| `$30` | `$fp` | Frame Pointer (puntatore al frame di attivazione) | **Sì** |
| `$31` | `$ra` | Return Address (indirizzo di ritorno dalla funzione) | **Sì** |

#### Il Registro Costante 0 (`$zero`)
Il registro `$zero` ha sempre valore $0$. Viene utilizzato per semplificare numerose operazioni:
- **Istruzione `move`:** `move $t0, $s1` viene tradotta come `add $t0, $s1, $zero`
- **Istruzione `nop`:** `add $zero, $zero, $zero`
- **Operazione `NOT`:** `nor $t0, $s1, $zero`

---

### 5.3 Organizzazione della Memoria, Allineamento ed Endianness

La memoria è un array lineare di byte a 8 bit. Poiché il MIPS opera su parole (*word*) di 32 bit ($4$ byte):
- **Allineamento a parola:** L'indirizzo di ogni parola in memoria deve essere un **multiplo di 4** (i 2 bit meno significativi dell'indirizzo sono sempre `00`: indirizzi $0, 4, 8, 12, 16 \dots$).

![Figura 29: Indirizzamento dei byte e allineamento a parole di 32 bit](images/ade/fig_30_allineamento_memoria.png)

#### Big Endian vs Little Endian
- **Big Endian:** Il byte più significativo (MSB) è memorizzato all'indirizzo più basso (utilizzato da SPARC, MIPS tradizionale, TCP/IP).
- **Little Endian:** Il byte meno significativo (LSB) è memorizzato all'indirizzo più basso (utilizzato da architetture x86, ARM moderno).

![Figura 30: Confronto tra ordinamento Big Endian e Little Endian](images/ade/fig_31_endianness.png)

---

### 5.4 Formati delle Istruzioni MIPS (R, I, J)

Tutte le istruzioni MIPS sono lunghe esattamente **32 bit** e appartengono a uno dei tre formati:

#### 1. Formato R (Register)
Utilizzato per operazioni aritmetico-logiche tra registri (`add`, `sub`, `and`, `or`, `slt`, `sll`, `srl`):

```text
 31      26 25      21 20      16 15      11 10       6 5        0
+----------+----------+----------+----------+----------+----------+
|  opcode  |    rs    |    rt    |    rd    |  shamt   |  funct   |
+----------+----------+----------+----------+----------+----------+
   6 bit      5 bit      5 bit      5 bit      5 bit      6 bit
```

- `opcode` (6 bit): Codice operativo (vale `000000` per tutte le istruzioni di tipo R).
- `rs` (5 bit): Primo registro sorgente (*Source*).
- `rt` (5 bit): Secondo registro sorgente (*Target*).
- `rd` (5 bit): Registro di destinazione (*Destination*).
- `shamt` (5 bit): Quantità di shift (*Shift Amount*, usata da `sll`/`srl`).
- `funct` (6 bit): Specifica l'operazione esatta da eseguire (`add`=32, `sub`=34, `and`=36, `or`=37, `slt`=42).

![Figura 31: Campi di bit del Formato R nel MIPS](images/ade/fig_29_mips_formato_r.png)

#### 2. Formato I (Immediate / Transfer)
Utilizzato per istruzioni con costanti immediate, trasferimenti di memoria (`lw`, `sw`) e salti condizionati (`beq`, `bne`):

```text
 31      26 25      21 20      16 15                                  0
+----------+----------+----------+-------------------------------------+
|  opcode  |    rs    |    rt    |          immediate / offset         |
+----------+----------+----------+-------------------------------------+
   6 bit      5 bit      5 bit                    16 bit
```

- `opcode` (6 bit): Codice operativo (`lw`=35, `sw`=43, `addi`=8, `beq`=4, `bne`=5).
- `rs` (5 bit): Registro base per indirizzamento o primo operando di confronto.
- `rt` (5 bit): Registro destinazione (per `lw`, `addi`) o registro da salvare (per `sw`).
- `immediate / offset` (16 bit): Costante numerica con segno o offset di memoria in complemento a 2.

![Figura 32: Campi di bit del Formato I nel MIPS](images/ade/fig_32_mips_formato_i.png)

#### 3. Formato J (Jump)
Utilizzato per salti incondizionati lunghi (`j`, `jal`):

```text
 31      26 25                                                        0
+----------+----------------------------------------------------------+
|  opcode  |                      target address                      |
+----------+----------------------------------------------------------+
   6 bit                             26 bit
```

- `opcode` (6 bit): `j` = 2, `jal` = 3.
- `target address` (26 bit): Indirizzo di destinazione della parola da raggiungere.

![Figura 33: Campi di bit del Formato J nel MIPS](images/ade/fig_38_mips_formato_j.png)

![Figura 34: Confronto sinottico tra i tre formati di istruzione R, I, J](images/ade/fig_39_confronto_formati_istruzioni.png)

---

### 5.5 Istruzioni di Trasferimento Dati: lw e sw

Poiché l'architettura MIPS è di tipo **Load/Store**, le operazioni aritmetiche possono essere eseguite solo sui registri. Per accedere ai dati in memoria si usano:
- `lw $rt, offset($rs)`: Carica la parola (32 bit) dall'indirizzo $\text{Indirizzo} = \text{Valore}(\$rs) + \text{offset}$ nel registro `$rt`.
- `sw $rt, offset($rs)`: Scrive la parola contenuta nel registro `$rt` nella locazione di memoria $\text{Indirizzo} = \text{Valore}(\$rs) + \text{offset}$.

![Figura 35: Calcolo dell'indirizzo effettivo di memoria come Base + Offset](images/ade/fig_33_calcolo_indirizzo_memoria.png)

**Esempio in C:**
```c
A[8] = h + A[8];
```
Supponendo che il vettore `A` abbia l'indirizzo base in `$s3` e la variabile `h` sia in `$s2`:
Poiché ogni elemento intero occupa 4 byte, l'offset per `A[8]` è $8 \times 4 = 32$ byte:
```assembly
lw  $t0, 32($s3)      # $t0 = A[8]
add $t0, $s2, $t0      # $t0 = h + A[8]
sw  $t0, 32($s3)      # A[8] = $t0
```

---

### 5.6 Operazioni con Costanti Immediate e Istruzione lui

Spesso uno degli operandi di un'operazione è una costante numerica. Invece di caricarla dalla memoria, si usano istruzioni immediate:
```assembly
addi $s0, $s0, 4      # $s0 = $s0 + 4
```

#### Caricamento di Costanti a 32 Bit con `lui` e `ori`
Il campo immediato delle istruzioni di tipo I ha una dimensione limitata a 16 bit (può rappresentare solo costanti tra $-32768$ e $+32767$).
Per caricare una costante a 32 bit (es. `0x003D0900`):
1. Si carica la parte alta (16 bit più significativi) con `lui` (*Load Upper Immediate*);
2. Si unisce la parte bassa (16 bit meno significativi) tramite `ori` (*OR Immediate*):

```assembly
lui $s0, 0x003D       # $s0 = 0x003D0000
ori $s0, $s0, 0x0900  # $s0 = 0x003D0900
```

![Figura 36: Funzionamento dell'istruzione lui sui 16 bit superiori](images/ade/fig_34_istruzione_lui.png)

![Figura 37: Combinazione di lui e ori per caricare una costante a 32 bit](images/ade/fig_35_costante_32bit_lui_ori.png)

---

### 5.7 Operazioni di Shift: Logico e Aritmetico

Le istruzioni di shift spostano i bit di un registro a sinistra o a destra di un numero di posizioni specificato nel campo `shamt` (o in un registro):

1. **`sll` (Shift Left Logical):** sposta i bit a sinistra inserendo 0 a destra. Equivale a moltiplicare per $2^{\text{shamt}}$.
   ```assembly
   sll $t2, $s0, 4    # $t2 = $s0 << 4 (moltiplica per 16)
   ```
2. **`srl` (Shift Right Logical):** sposta i bit a destra inserendo 0 a sinistra. Utilizzato per numeri senza segno.
   ```assembly
   srl $t2, $s0, 4    # $t2 = $s0 >> 4 (divisione logica per 16)
   ```
3. **`sra` (Shift Right Arithmetic):** sposta i bit a destra replicando il bit di segno (MSB) a sinistra. Mantiene il segno per numeri in complemento a 2 (divisione intera con segno per $2^{\text{shamt}}$).

![Figura 38: Operazioni di Shift Logico a Sinistra (sll) e a Destra (srl)](images/ade/fig_36_shift_logico.png)

![Figura 39: Operazione di Shift Aritmetico a Destra (sra) con estensione del segno](images/ade/fig_37_shift_aritmetico.png)

---

### 5.8 Operazioni Logiche a Livello di Bit (AND, OR, NOR, XOR)

Le operazioni logiche operano bit a bit (*bitwise*) su registri a 32 bit:

- **AND (`and`, `andi`):** Usato per mascherare ed estrarre specifici bit ponendo a 0 i bit non desiderati.
  ![Figura 40: Operazione di mascheramento bit a bit con AND](images/ade/fig_43_operazione_and.png)

- **OR (`or`, `ori`):** Usato per impostare specifici bit a 1 (*set bit*).
  ![Figura 41: Operazione di impostazione bit con OR](images/ade/fig_44_operazione_or.png)

- **NOR (`nor`):** Calcola $\overline{x + y}$. Permette di implementare il NOT unario:
  ```assembly
  nor $t0, $t1, $zero   # $t0 = NOT($t1)
  ```
  ![Figura 42: Operazione NOR e implementazione del NOT](images/ade/fig_45_operazione_nor.png)

- **XOR (`xor`, `xori`):** Calcola $x \oplus y$. Proprietà utili:
  - $x \oplus 0 = x$
  - $x \oplus 1 = \bar{x}$ (inversione)
  - $x \oplus x = 0$ (azzeramento veloce del registro)
  ![Figura 43: Operazione XOR bit a bit](images/ade/fig_46_operazione_xor.png)

---

### 5.9 Salti Condizionati e Confronti con Segno / Senza Segno

I salti condizionati alterano il flusso di esecuzione se una data condizione è verificata:
- `beq $s0, $s1, Label`: Salta a `Label` se `$s0 == $s1` (*Branch if Equal*).
- `bne $s0, $s1, Label`: Salta a `Label` se `$s0 != $s1` (*Branch if Not Equal*).

![Figura 44: Flusso di decisione per i salti condizionati beq e bne](images/ade/fig_47_flusso_branch_beq_bne.png)

#### Confronto Signed vs Unsigned
- `slt $rd, $rs, $rt` / `slti $rt, $rs, imm`: Confronto con segno (complemento a 2).
- `sltu $rd, $rs, $rt` / `sltiu $rt, $rs, imm`: Confronto tra numeri senza segno (*unsigned*).

**Esempio:**
Siano `$s0 = 1111...1111_2 = -1_{10}$` e `$s1 = 0000...0001_2 = +1_{10}`:
- `slt $t0, $s0, $s1` $\implies \$t0 = 1$ (poiché $-1 < 1$ con segno).
- `sltu $t0, $s0, $s1` $\implies \$t0 = 0$ (poiché $4.294.967.295 > 1$ senza segno).

---

### 5.10 Strutture di Controllo (If-Then-Else e Cicli While)

#### 1. Struttura If-Then-Else
```c
if (i == j)
    f = g + h;
else
    f = g - h;
```
Traduzione in MIPS (con `f` in `$s0`, `g` in `$s1`, `h` in `$s2`, `i` in `$s3`, `j` in `$s4`):
```assembly
        bne  $s3, $s4, Else
        add  $s0, $s1, $s2
        j    Exit
Else:   sub  $s0, $s1, $s2
Exit:
```
![Figura 45: Mappatura del costrutto If-Then-Else in istruzioni di salto MIPS](images/ade/fig_48_controllo_if_else.png)

#### 2. Ciclo While
```c
while (save[i] == k)
    i += 1;
```
Traduzione in MIPS (con `i` in `$s3`, `k` in `$s5`, base di `save` in `$s6`):
```assembly
Loop:   sll  $t1, $s3, 2       # $t1 = i * 4 (offset in byte)
        add  $t1, $t1, $s6     # $t1 = indirizzo di save[i]
        lw   $t0, 0($t1)       # $t0 = save[i]
        bne  $t0, $s5, Exit    # if (save[i] != k) esci dal ciclo
        addi $s3, $s3, 1       # i = i + 1
        j    Loop              # ripeti il ciclo
Exit:
```
![Figura 46: Mappatura del ciclo While in istruzioni MIPS](images/ade/fig_49_controllo_while.png)

---

### 5.11 Modi di Indirizzamento nel MIPS

Il MIPS supporta 5 modalità di indirizzamento:
1. **Indirizzamento Immediato:** L'operando è una costante contenuta nell'istruzione stessa (es. `addi $t0, $s1, 4`).
2. **Indirizzamento tramite Registro:** L'operando è contenuto in un registro (es. `add $rd, $rs, $rt`).
3. **Indirizzamento alla Base (Displacement):** L'indirizzo di memoria è la somma di un registro base e di un offset a 16 bit (es. `lw $rt, 100($rs)`).
4. **Indirizzamento Relativo al Program Counter (PC-Relative):** Usato nei branch (`beq`, `bne`). L'indirizzo di destinazione è dato da:
   $$\text{Target Address} = (\text{PC} + 4) + (\text{offset} \times 4)$$
   ![Figura 47: Schema di calcolo dell'indirizzo di salto relativo al PC](images/ade/fig_40_indirizzamento_relativo_pc.png)
5. **Indirizzamento Pseudo-Diretto:** Usato nei jump (`j`, `jal`). L'indirizzo a 32 bit è formato concatenando i 4 bit più significativi di $(\text{PC}+4)$ con i 26 bit del campo target scalati a sinistra di 2 posizioni:
   $$\text{Target Address} = (\text{PC}+4)[31:28] \mid (\text{target} \ll 2)$$
   ![Figura 48: Schema dell'indirizzamento pseudo-diretto per istruzioni Jump](images/ade/fig_41_indirizzamento_pseudo_diretto.png)

![Figura 49: Quadro riassuntivo dei modi di indirizzamento del MIPS](images/ade/fig_42_modi_indirizzamento_mips.png)

---

### 5.12 Chiamate a Funzione e Procedure (jal, jr $ra)

Una procedura interrompe il flusso sequenziale del programma. La chiamata a funzione richiede due meccanismi:
1. **Linkage (Collegamento):** salvare l'indirizzo di ritorno e saltare alla funzione;
2. **Passaggio dei Parametri:** scambiare argomenti e valori di ritorno tramite registri convenzionali.

- **`jal Label` (Jump and Link):**
  1. Salva l'indirizzo della prossima istruzione ($\text{PC} + 4$) nel registro `$ra` (`$31`);
  2. Salta all'indirizzo dell'etichetta `Label`.
- **`jr $ra` (Jump Register):**
  - Ricarica nel Program Counter (`PC`) l'indirizzo salvato in `$ra`, riprendendo l'esecuzione subito dopo la chiamata `jal`.

**Esempio di Funzione:**
```c
int sum(int a, int b) {
    return a + b;
}
```
Traduzione in Assembly:
```assembly
# Chiamante:
    addi $a0, $zero, 3    # parametro a = 3
    addi $a1, $zero, 4    # parametro b = 4
    jal  sum              # chiama sum, salva PC+4 in $ra
    add  $s2, $v0, $zero  # salva il valore restituito z = $v0

# Funzione Chiamata:
sum:
    add  $v0, $a0, $a1    # $v0 = a + b
    jr   $ra              # ritorna al chiamante
```

---

### 5.13 Gestione dello Stack e Stack Pointer ($sp)

I registri della CPU sono in numero limitato (32). Quando una procedura deve chiamare altre procedure (*chiamate annidate*) o ha bisogno di più variabili locali, alloca memoria nello **Stack** (Pila LIFO):
- Lo stack cresce verso il basso (verso indirizzi di memoria decrescenti).
- Il registro `$sp` (*Stack Pointer*, `$29`) punta all'ultimo elemento inserito in cima alla pila.
- **Push (Inserimento):** si decrementa `$sp` e si salva il registro con `sw`:
  ```assembly
  addi $sp, $sp, -4     # alloca 1 parola nello stack
  sw   $s0, 0($sp)      # salva $s0 nello stack
  ```
- **Pop (Estrazione):** si recupera il valore con `lw` e si incrementa `$sp`:
  ```assembly
  lw   $s0, 0($sp)      # ripristina $s0 dallo stack
  addi $sp, $sp, 4      # dealloca 1 parola
  ```

![Figura 50: Movimento dello Stack Pointer durante il salvataggio e ripristino di registri](images/ade/fig_50_stack_pointer_procedura.png)

---

### 5.14 Fasi di Traduzione ed Esecuzione: Compilatore, Assemblatore, Linker, Loader

Il processo di generazione di un programma eseguibile da codice sorgente C si compone di 4 stadi:
1. **Compilatore:** Traduce il codice sorgente C in un programma in linguaggio assembly (`.s`).
2. **Assemblatore:**
   - Traduce le istruzioni assembly in istruzioni macchina in codice binario, generando un file oggetto rilocabile (`.o`).
   - Converte le **pseudo-istruzioni** (es. `move`, `la`, `bgt`, `nop`) in istruzioni macchina reali.
   - Costruisce la **Tabella dei Simboli** che associa a ogni etichetta il relativo offset/indirizzo.
3. **Linker:**
   - "Cuce" insieme più file oggetto compilati separatamente e le funzioni di libreria in un unico **file eseguibile**.
   - Risolve tutti i riferimenti a simboli ed etichette esterne e determina gli indirizzi di memoria assoluti.
4. **Loader:**
   - Carica il file eseguibile dalla memoria secondaria (disco) alla memoria principale (RAM);
   - Inizializza i registri (incluso `$sp`), copia eventuali argomenti nello stack e imposta il Program Counter all'indirizzo della procedura di avvio (*startup routine*).

---
## Capitolo 6 — Costruzione della CPU: Datapath e Controllo

### 6.1 Architettura della CPU e Segnale di Clock

L'architettura classica della CPU è basata sul modello **Harvard** (separazione fisica tra Memoria Istruzioni e Memoria Dati) o **Von Neumann** (memoria unificata):

![Figura 51: Schema a blocchi dell'architettura Harvard con memoria istruzioni e memoria dati separate](images/ade/fig_51_architettura_harvard.png)

La CPU è costituita da due moduli interconnessi:
1. **Datapath (Unità di Elaborazione):** contiene tutti gli elementi funzionali che memorizzano ed elaborano i dati: il Program Counter (PC), il Banco dei Registri (*Register File*), l'ALU, la memoria dati e i sommatori.
2. **Unità di Controllo (Control Unit):** circuito combinatorio che riceve il codice operativo dell'istruzione ed emette i segnali di controllo per configurare il datapath.

#### Il Segnale di Clock
Il segnale di clock sincronizza le operazioni hardware.
- **Periodo di clock ($T_c$):** tempo per completare un intero ciclo di oscillazione.
- **Frequenza di clock ($f = 1/T_c$):** numero di cicli al secondo (GHz).

![Figura 52: Segnale periodico di clock e periodo di clock](images/ade/fig_71_segnale_clock.png)

- **Processore a Singolo Ciclo:** ogni istruzione viene completata in esattamente $1$ ciclo di clock. Il periodo di clock è determinato dall'istruzione più lenta (`lw`).
- **Processore Multi-Ciclo:** suddivide l'istruzione in più passi, eseguendo un passo per ciclo.
- **Processore con Pipelining:** sovrappone l'esecuzione di più istruzioni consecutive in parallelo.

---

### 6.2 Datapath per l'Instruction Fetch (Prelievo Istruzione)

Il blocco di prelievo dell'istruzione (*Fetch*) è costituito da:
1. **Program Counter (PC):** registro a 32 bit contenente l'indirizzo dell'istruzione corrente.
2. **Memoria Istruzioni:** riceve l'indirizzo da PC ed emette la parola di istruzione a 32 bit.
3. **Sommatore dedicato (+4):** calcola in parallelo $\text{PC} + 4$ (indirizzo dell'istruzione successiva sequenziale).

![Figura 53: Datapath per il prelievo dell'istruzione e l'incremento di PC a PC+4](images/ade/fig_52_datapath_fetch.png)

---

### 6.3 Datapath per le Istruzioni di Tipo R

Per le istruzioni aritmetico-logiche (`add`, `sub`, `and`, `or`, `slt`):
- Il **Register File** legge contemporaneamente due registri sorgente specificati dai campi `rs` (bit 25–21) e `rt` (bit 20–16);
- L'**ALU** esegue l'operazione sui due dati letti;
- Il risultato dell'ALU viene scritto nel registro di destinazione specificato da `rd` (bit 15–11) sul fronte di salita del clock se il segnale **RegWrite** è asserito.

![Figura 54: Datapath per l'esecuzione delle istruzioni di Tipo R](images/ade/fig_53_datapath_tipo_r.png)

![Figura 55: Dettaglio del Banco dei Registri a 32 bit con porte di lettura e scrittura](images/ade/fig_54_banco_registri_dettaglio.png)

---

### 6.4 Datapath per le Istruzioni di Trasferimento Memoria (lw / sw)

Per eseguire `lw $rt, offset($rs)` e `sw $rt, offset($rs)`:
1. L'offset a 16 bit viene esteso con segno a 32 bit dal modulo **Sign-Extend**;
2. L'**ALU** calcola l'indirizzo sommando il valore letto da `$rs` e l'offset esteso;
3. La **Memoria Dati**:
   - Per `lw`: legge la parola all'indirizzo calcolato ($\text{MemRead}=1$) e la scrive nel registro `$rt`;
   - Per `sw`: scrive il valore letto da `$rt` nella memoria all'indirizzo calcolato ($\text{MemWrite}=1$).

![Figura 56: Datapath per le istruzioni di accesso alla memoria dati](images/ade/fig_55_datapath_memoria_dati.png)

![Figura 57: Cammino dei dati attivo durante l'esecuzione dell'istruzione lw](images/ade/fig_56_cammino_dati_lw.png)

![Figura 58: Cammino dei dati attivo durante l'esecuzione dell'istruzione sw](images/ade/fig_57_cammino_dati_sw.png)

---

### 6.5 Datapath per i Salti Condizionati (beq)

Per l'istruzione `beq $rs, $rt, offset`:
1. L'**ALU principale** calcola la differenza tra `$rs` e `$rt`. Se sono uguali, l'uscita **Zero** vale 1;
2. In parallelo, l'offset a 16 bit viene esteso con segno e traslato a sinistra di 2 bit dal modulo **Shift Left 2** (moltiplicazione per 4);
3. Un **sommatore dedicato** calcola l'indirizzo di salto $\text{Target} = (\text{PC} + 4) + (\text{offset} \ll 2)$;
4. Una porta **AND** verifica se $\text{Branch} = 1$ e $\text{Zero} = 1$:
   - Se vero, il multiplexer del PC seleziona l'indirizzo Target;
   - Altrimenti, il PC riceve $\text{PC} + 4$.

![Figura 59: Datapath per il calcolo e l'esecuzione del salto condizionato beq](images/ade/fig_58_datapath_branch.png)

![Figura 60: Cammino dei dati attivo durante l'istruzione di branch beq](images/ade/fig_59_cammino_dati_beq.png)

---

### 6.6 Datapath Unificato a Singolo Ciclo

Unendo i blocchi funzionali e inserendo opportuni Multiplexer per condividere le risorse:
- **MUX RegDst:** sceglie se il registro di destinazione per la scrittura è specificato da `rt` (Formato I) o `rd` (Formato R).
- **MUX ALUSrc:** sceglie se il secondo operando dell'ALU proviene dal secondo registro (`rt`) o dal valore immediato esteso a 32 bit.
- **MUX MemtoReg:** sceglie se il dato da scrivere nel registro proviene dall'uscita dell'ALU o dalla memoria dati.
- **MUX PCSrc:** controllato da $\text{Branch} \cdot \text{Zero}$, sceglie tra $\text{PC} + 4$ e l'indirizzo di salto calcolato.

![Figura 61: Datapath unificato a singolo ciclo con multiplexer di configurazione](images/ade/fig_60_datapath_unificato.png)

![Figura 62: Datapath completo a singolo ciclo con Unità di Controllo e linee di segnale](images/ade/fig_61_datapath_controllo_completo.png)

#### Dettaglio dei Cammini Attivi per le Singole Istruzioni

![Figura 63: Cammino dati attivo per l'istruzione di tipo R (add)](images/ade/fig_62_cammino_dati_add_dettaglio.png)

![Figura 64: Cammino dati attivo per l'istruzione lw (load word)](images/ade/fig_63_cammino_dati_lw_dettaglio.png)

![Figura 65: Cammino dati attivo per l'istruzione sw (store word)](images/ade/fig_65_cammino_dati_sw_dettaglio.png)

![Figura 66: Cammino dati attivo per l'istruzione beq (branch if equal)](images/ade/fig_64_cammino_dati_beq_dettaglio.png)

---

### 6.7 Datapath Completo con Istruzione di Salto Incondizionato (j)

Per integrare l'istruzione di salto incondizionato `j target`:
1. I 26 bit del campo target dell'istruzione vengono traslati a sinistra di 2 posizioni tramite **Shift Left 2** (diventando 28 bit);
2. Vengono concatenati ai 4 bit più significativi di $\text{PC} + 4$ per formare l'indirizzo a 32 bit:
   $$\text{Jump Address} = (\text{PC} + 4)[31:28] \mid (\text{target} \ll 2)$$
3. Viene aggiunto un ulteriore Multiplexer all'ingresso del PC controllato dal segnale **Jump**.

![Figura 67: Datapath completo esteso con supporto all'istruzione Jump (j)](images/ade/fig_67_datapath_con_jump.png)

---

### 6.8 Progettazione dell'Unità di Controllo

L'Unità di Controllo è una rete combinatoria che riceve in ingresso i 6 bit del campo `opcode` dell'istruzione ($Instruction[31:26]$) e genera tutti i segnali di controllo per i multiplexer e i moduli di memoria:

![Figura 68: Connessione dei campi dell'istruzione all'Unità di Controllo e al Datapath](images/ade/fig_66_controllo_campi_istruzione.png)

---

### 6.9 Controllo dell'ALU a Due Livelli

Per mantenere l'unità di controllo principale semplice e veloce, il controllo dell'ALU è organizzato su due livelli:
1. L'**Unità di Controllo Principale** genera un segnale a 2 bit denominato **`ALUOp`**:
   - `00`: l'ALU deve eseguire una somma (usato da `lw` e `sw` per il calcolo dell'indirizzo);
   - `01`: l'ALU deve eseguire una sottrazione (usato da `beq` per il confronto di uguaglianza);
   - `10`: l'operazione dipende dal campo `funct` a 6 bit dell'istruzione (istruzioni di Tipo R).
2. L'**ALU Control Unit** riceve `ALUOp` e il campo `funct` ($Instruction[5:0]$) e genera i 4 bit di comando effettivo per l'ALU.

![Figura 69: Schema di controllo gerarchico a due livelli per l'ALU](images/ade/fig_68_controllo_a_due_livelli.png)

![Figura 70: Modulo combinatorio ALU Control](images/ade/fig_69_alu_control_unita.png)

#### Tabella di Decodifica di ALU Control

| Istruzione | `ALUOp` | Campo `funct` | Codice Operazione Funct | Controllo ALU (4 bit) | Operazione ALU |
| :---: | :---: | :---: | :---: | :---: | :---: |
| `lw` | `00` | XXXXXX | X | `0010` | ADD |
| `sw` | `00` | XXXXXX | X | `0010` | ADD |
| `beq` | `01` | XXXXXX | X | `0110` | SUB |
| Tipo R (`add`) | `10` | `100000` | 32 | `0010` | ADD |
| Tipo R (`sub`) | `10` | `100010` | 34 | `0110` | SUB |
| Tipo R (`and`) | `10` | `100100` | 36 | `0000` | AND |
| Tipo R (`or`) | `10` | `100101` | 37 | `0001` | OR |
| Tipo R (`slt`) | `10` | `101010` | 42 | `0111` | SLT |

---

### 6.10 Tabella dei Segnali di Controllo

![Figura 71: Tavola di verità complessiva dei segnali di controllo per le istruzioni base](images/ade/fig_70_tabella_segnali_controllo.png)

#### Tavola di Verità dei Segnali di Controllo Principali

| Istruzione | `RegDst` | `ALUSrc` | `MemtoReg` | `RegWrite` | `MemRead` | `MemWrite` | `Branch` | `ALUOp1` | `ALUOp0` | `Jump` |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Tipo R** | 1 | 0 | 0 | 1 | 0 | 0 | 0 | 1 | 0 | 0 |
| **`lw`** | 0 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 |
| **`sw`** | X | 1 | X | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
| **`beq`** | X | 0 | X | 0 | 0 | 0 | 1 | 0 | 1 | 0 |
| **`j`** | X | X | X | 0 | 0 | 0 | X | X | X | 1 |

---
## Capitolo 7 — Prestazioni del Processore e Pipelining

### 7.1 Misurazione delle Prestazioni della CPU

Le prestazioni di un computer sono determinate dal tempo necessario a completare un programma: il **Tempo di Esecuzione della CPU (CPU Time)**.

#### L'Equazione Fondamentale delle Prestazioni:

$$\text{Tempo CPU} = \text{Numero di Istruzioni (IC)} \times \text{CPI} \times T_c = \frac{\text{IC} \times \text{CPI}}{f_{clock}}$$

- **IC (Instruction Count):** numero di istruzioni macchina eseguite dal programma.
- **CPI (Cycles Per Instruction):** numero medio di cicli di clock necessari per eseguire un'istruzione.
- **$T_c$ (Periodo di Clock):** durata temporale di un ciclo di clock.
- **$f_{clock}$ (Frequenza di Clock):** frequenza del clock di sistema ($1/T_c$).

---

### 7.2 Fattori che Influenzano le Prestazioni e Speedup

Le prestazioni complessive dipendono da tutti i livelli architetturali:
1. **Algoritmo:** determina il numero di operazioni logiche da eseguire (riduce IC).
2. **Linguaggio di Programmazione e Compilatore:** determinano l'efficienza della traduzione in istruzioni macchina (influenzano IC e CPI).
3. **Architettura dell'Insieme di Istruzioni (ISA):** determina la complessità delle istruzioni disponibili (influenza IC e CPI).
4. **Microarchitettura e Tecnologia del Silicio:** determinano l'organizzazione della pipeline e la frequenza di clock massima (influenzano CPI e $T_c$).

#### Confronto tra Prestazioni (Speedup / Velocizzazione)
Per confrontare le prestazioni di due macchine (o di due versioni dello stesso processore):

$$\text{Speedup} = \frac{\text{Prestazioni}_X}{\text{Prestazioni}_Y} = \frac{\text{Tempo di Esecuzione}_Y}{\text{Tempo di Esecuzione}_X}$$

---

### 7.3 Concetto Fondamentale del Pipelining

Il **Pipelining** è una tecnica di implementazione in cui più istruzioni vengono elaborate contemporaneamente in fasi diverse, analogamente a una catena di montaggio industriale.

- **Latenza:** tempo richiesto per completare una singola istruzione dal prelievo alla fine. Il pipelining non riduce la latenza della singola istruzione (anzi può aumentarla leggermente a causa dell'overhead dei registri di stadio).
- **Throughput (Produttività):** numero di istruzioni completate per unità di tempo. Il pipelining aumenta drasticamente il throughput.

$$\text{Tempo tra istruzioni con pipeline} = \frac{\text{Tempo senza pipeline}}{\text{Numero di stadi}}$$

---

### 7.4 La Pipeline MIPS a 5 Stadi (IF, ID, EX, MEM, WB)

L'esecuzione di ogni istruzione MIPS viene suddivisa in **5 stadi temporali**:
1. **IF (Instruction Fetch):** Prelievo dell'istruzione dalla memoria istruzioni e incremento di PC ($\text{PC} \leftarrow \text{PC} + 4$).
2. **ID (Instruction Decode & Register Read):** Decodifica dell'istruzione e lettura contemporanea dei registri sorgente dal Register File.
3. **EX (Execution & Address Calculation):** Esecuzione dell'operazione aritmetico-logica nella ALU o calcolo dell'indirizzo effettivo di memoria.
4. **MEM (Memory Access):** Accesso in lettura (`lw`) o in scrittura (`sw`) alla memoria dati.
5. **WB (Write Back):** Scrittura del risultato o del dato letto nel registro di destinazione del Register File.

---

### 7.5 Confronto Prestazionale: Singolo Ciclo vs Pipeline

Considerando i tempi tipici di ritardo delle unità funzionali:
- Lettura Memoria Istruzioni: $200\text{ ps}$
- Lettura Register File: $100\text{ ps}$
- Operazione ALU: $200\text{ ps}$
- Accesso Memoria Dati: $200\text{ ps}$
- Scrittura Register File: $100\text{ ps}$

#### Tabella dei Tempi di Esecuzione per Istruzione

| Istruzione | IF (Fetch) | ID (Decode/Reg) | EX (ALU) | MEM (Data Mem) | WB (Write Reg) | Tempo Totale |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **`lw` (Load Word)** | 200 ps | 100 ps | 200 ps | 200 ps | 100 ps | **800 ps** |
| **`sw` (Store Word)** | 200 ps | 100 ps | 200 ps | 200 ps | — | **700 ps** |
| **Tipo R (`add`, `sub`, ...)** | 200 ps | 100 ps | 200 ps | — | 100 ps | **600 ps** |
| **`beq` (Branch)** | 200 ps | 100 ps | 200 ps | — | — | **500 ps** |

- **Nel processore a singolo ciclo:** il periodo di clock deve essere pari al caso peggiore: $T_{clock} = 800\text{ ps}$.
- **Nel processore con pipeline a 5 stadi:** il periodo di clock è pari allo stadio più lungo: $T_{clock} = 200\text{ ps}$.
- A regime, la pipeline completa **una nuova istruzione ogni 200 ps** anziché ogni 800 ps, ottenendo un incremento di velocità teorico pari a $4\times$.

![Figura 72: Confronto temporale tra processore a singolo ciclo e processore con pipeline](images/ade/fig_72_pipeline_vs_singolo_ciclo.png)

![Figura 73: Diagramma temporale di esecuzione della pipeline a 5 stadi nel tempo](images/ade/fig_73_pipeline_diagramma_temporale.png)

---

### 7.6 Registri di Pipeline e Propagazione dei Segnali

Per consentire a ogni stadio di operare in modo indipendente su istruzioni diverse nello stesso ciclo di clock, vengono inseriti 4 **Registri di Pipeline** tra gli stadi:
1. **IF/ID:** memorizza la parola di istruzione prelevata e il valore $\text{PC} + 4$.
2. **ID/EX:** memorizza i dati letti dai registri, l'offset esteso a 32 bit, i numeri dei registri sorgente/destinazione e i segnali di controllo per gli stadi EX, MEM e WB.
3. **EX/MEM:** memorizza il risultato dell'ALU, il dato da scrivere in memoria per `sw`, il registro di destinazione e i segnali di controllo per MEM e WB.
4. **MEM/WB:** memorizza il dato letto dalla memoria (per `lw`) o il risultato dell'ALU, il numero del registro di destinazione e i segnali di controllo per WB.

![Figura 74: Struttura del Datapath con i 4 registri di separazione della pipeline](images/ade/fig_74_registri_pipeline_schema.png)

![Figura 75: Flusso delle informazioni e dei dati attraverso i registri di pipeline](images/ade/fig_75_flusso_dati_registri_pipeline.png)

#### Convenzione di Lettura e Scrittura nei Registri di Pipeline
Per convenzione grafica, nei registri di pipeline la metà sinistra rappresenta la fase di scrittura (scritta dallo stadio precedente alla fine del ciclo), mentre la metà destra rappresenta la lettura (letta dallo stadio successivo all'inizio del nuovo ciclo).

![Figura 76: Convenzione grafica di lettura/scrittura nei registri di pipeline](images/ade/fig_76_convenzione_lettura_scrittura.png)

#### Propagazione dei Segnali di Controllo
Tutti i segnali di controllo vengono generati durante lo stadio ID dall'Unità di Controllo Principale e viaggiano all'interno dei registri di pipeline insieme all'istruzione, venendo utilizzati solo nello stadio di competenza:

![Figura 77: Distribuzione e propagazione dei segnali di controllo lungo gli stadi](images/ade/fig_77_controllo_pipeline.png)

---

### 7.7 Criticità della Pipeline (Hazard)

Gli **Hazard (Criticità)** sono situazioni che impediscono alla successiva istruzione nel flusso di essere eseguita nel ciclo di clock immediatamente successivo. Si dividono in 3 categorie:

---

#### 7.7.1 Hazard Strutturali
Si verificano quando due istruzioni in stadi diversi richiedono l'uso contemporaneo della stessa risorsa hardware.
- **Esempio:** Accesso simultaneo alla memoria per il Fetch dell'istruzione (IF) e per la lettura/scrittura dei dati (MEM).
  - *Soluzione:* Architettura Harvard con memorie separate (o cache L1 separate per Istruzioni e Dati).
- **Accesso al Register File:** Un'istruzione in WB scrive nel registro mentre un'altra in ID legge i registri.
  - *Soluzione (Split Register Access):* La scrittura avviene sempre nella **prima metà del ciclo di clock**, mentre la lettura avviene nella **seconda metà del ciclo**.

![Figura 78: Soluzione all'hazard strutturale del Register File con accesso a ciclo diviso](images/ade/fig_78_hazard_strutturale_registri.png)

---

#### 7.7.2 Hazard sui Dati (Data Hazards)
Si verificano quando un'istruzione dipende dal risultato di un'istruzione precedente che si trova ancora nella pipeline (dipendenza *Read After Write* — RAW):

```assembly
add $s0, $t0, $t1    # $s0 viene scritto nello stadio WB (ciclo 5)
sub $t2, $s0, $t3    # legge $s0 nello stadio ID (ciclo 2) -> DATO NON AGGIORNATO!
```

![Figura 79: Esempio di dipendenza sui dati RAW tra istruzioni consecutive](images/ade/fig_79_hazard_dati_raw.png)

#### Tecniche di Risoluzione per i Data Hazard:
1. **Stallo Hardware (Bolla / Bubble):** blocca l'avanzamento degli stadi precedenti inserendo cicli a vuoto finché il dato non viene scritto. Riduce il throughput.
   ![Figura 80: Inserimento di stalli hardware (bolle) nella pipeline](images/ade/fig_81_inserimento_bolla_stallo.png)

2. **Istruzioni NOP (Software):** il compilatore inserisce istruzioni nulle `nop` per distanziare le istruzioni dipendenti.
   ```assembly
   add $s0, $t0, $t1
   nop
   nop
   sub $t2, $s0, $t3
   ```

3. **Riordinamento delle Istruzioni (*Instruction Scheduling*):** il compilatore sposta istruzioni indipendenti tra le due istruzioni in conflitto, eliminando i tempi morti senza alterare la logica del programma.
   ![Figura 81: Riordinamento del codice da parte del compilatore per eliminare le dipendenze](images/ade/fig_80_riordino_istruzioni.png)

4. **Propagazione o Scavalcamento (Forwarding / Bypassing):**
   - Poiché il risultato dell'istruzione `add` è già disponibile all'uscita della ALU alla fine dello stadio EX (ciclo 3), non è necessario attendere la scrittura nello stadio WB.
   - Si collegano linee di bypass dirette dall'uscita dei registri EX/MEM e MEM/WB direttamente agli ingressi della ALU nello stadio EX.

![Figura 82: Principio del Forwarding dei dati direttamente all'ingresso della ALU](images/ade/fig_82_forwarding_concetto.png)

![Figura 83: Datapath completo con Forwarding Unit e multiplexer di inoltro](images/ade/fig_83_datapath_con_forwarding.png)

---

#### 7.7.3 Hazard di Tipo Load-Use
Quando un'istruzione usa un dato caricato da una `lw` immediatamente precedente:
- Il dato proveniente dalla memoria dati è disponibile solo alla fine dello stadio MEM (ciclo 4), mentre l'istruzione successiva ne ha bisogno all'inizio dello stadio EX (ciclo 3).
- **Il forwarding da solo non è sufficiente:** è obbligatorio inserire **1 ciclo di stallo** (bolla).
- La **Hazard Detection Unit** rileva questa condizione durante lo stadio ID, blocca l'aggiornamento di PC e del registro IF/ID per 1 ciclo e azzera i segnali di controllo dello stadio ID/EX (trasformando l'istruzione in una NOP).

![Figura 84: Hazard Load-Use che richiede 1 ciclo di stallo gestito dall'Hazard Detection Unit](images/ade/fig_84_hazard_load_use_stallo.png)

---

#### 7.7.4 Hazard di Controllo (Branch Hazards)
Si verificano con le istruzioni di salto (`beq`, `bne`), poiché la decisione sul salto e il calcolo del nuovo PC avvengono dopo che le istruzioni successive sono già state prelevate.

- **Tecniche di Mitigazione:**
  1. **Risoluzione Anticipata del Branch nello stadio ID:** spostando il confronto e il sommatore nello stadio ID, il costo del salto si riduce a $1$ solo ciclo di penalità.
  2. **Branch Prediction (Predizione dei Salti):**
     - *Statica:* predire sempre che il salto non venga effettuato (*predict not taken*). Se la predizione è corretta non c'è stallo; se errata, le istruzioni prelevate vengono annullate (*flush*).
     - *Dinamica:* memorizzare la storia dei salti (*Branch History Table* / *Branch Target Buffer*) per prevedere i cicli successivi.
  3. **Delayed Branch (Salto Ritardato):** l'istruzione situata immediatamente dopo il salto (*Branch Delay Slot*) viene **sempre eseguita**, sia che il salto venga effettuato o meno. Il compilatore vi posiziona un'istruzione utile.

---
## Capitolo 8 — Reti Sequenziali e Dispositivi di Memoria

### 8.1 Modello delle Reti Sequenziali e Concetto di Stato

A differenza delle reti combinatorie, una **Rete Sequenziale** contiene elementi di memoria in grado di conservare informazioni nel tempo.
L'uscita del circuito dipende sia dagli ingressi attuali sia dallo **stato interno presente**, e la transizione al nuovo stato avviene al colpo di clock.

![Figura 85: Modello generale di una rete sequenziale sincrona con retroazione](images/ade/fig_85_modello_rete_sequenziale.png)

---

### 8.2 Latch SR con Porte NOR

Il **Latch SR (Set-Reset)** è il circuito bistabile elementare asincrono realizzato collegando a croce due porte NOR:

![Figura 86: Schema circuitale del Latch SR a porte NOR](images/ade/fig_86_latch_sr_nor.png)

![Figura 87: Tavola di verità e stati del Latch SR](images/ade/fig_87_latch_sr_tabella.png)

![Figura 88: Simbolo grafico a blocchi del Latch SR](images/ade/fig_88_latch_sr_simbolo.png)

#### Analisi degli Stati di Funzionamento:

1. **Stato di Memorizzazione ($S = 0, R = 0$):**
   - Se $Q = 1 \implies \bar{Q} = 0$: la porta NOR inferiore riceve $(S=0, Q=1) \implies \text{out}=0$ ($\bar{Q}=0$), la porta superiore riceve $(R=0, \bar{Q}=0) \implies \text{out}=1$ ($Q=1$). Lo stato si automantiene stabile.
   - Analogamente se $Q = 0$, lo stato $0$ rimane memorizzato.
   ![Figura 89: Analisi dello stato di memorizzazione (S=0, R=0)](images/ade/fig_89_latch_sr_stato_memorizzazione.png)

2. **Stato di Reset ($S = 0, R = 1$):**
   - L'ingresso $R=1$ forza l'uscita della porta superiore $Q = 0$.
   - La porta inferiore riceve $(S=0, Q=0) \implies \bar{Q} = 1$. L'uscita si porta a $0$.
   ![Figura 90: Analisi dello stato di Reset (S=0, R=1 -> Q=0)](images/ade/fig_90_latch_sr_stato_reset.png)

3. **Stato di Set ($S = 1, R = 0$):**
   - L'ingresso $S=1$ forza l'uscita della porta inferiore $\bar{Q} = 0$.
   - La porta superiore riceve $(R=0, \bar{Q}=0) \implies Q = 1$. L'uscita si porta a $1$.
   ![Figura 91: Analisi dello stato di Set (S=1, R=0 -> Q=1)](images/ade/fig_91_latch_sr_stato_set.png)

4. **Stato Proibito / Indeterminato ($S = 1, R = 1$):**
   - Entrambe le porte NOR producono $Q = 0$ e $\bar{Q} = 0$, violando la complementarità $Q = \overline{\bar{Q}}$.
   - Se entrambi gli ingressi tornano contemporaneamente a $0$, lo stato finale diventa imprevedibile (*corsa critica*). Questa configurazione è **proibita**.
   ![Figura 92: Stato proibito del Latch SR (S=1, R=1)](images/ade/fig_92_latch_sr_stato_proibito.png)

---

### 8.3 Latch SR Sincronizzato con Clock

Per controllare il momento esatto in cui il latch può cambiare stato, si antepongono due porte AND pilotate dal segnale di **Clock (Enable)**:
- Quando $\text{Clock} = 0$: gli ingressi interni alle porte NOR sono forzati a $0$, mantenendo lo stato memorizzato.
- Quando $\text{Clock} = 1$: gli ingressi $S$ ed $R$ possono modificare lo stato.

![Figura 93: Schema del Latch SR sincronizzato con abilitazione a Clock](images/ade/fig_93_latch_sr_sincronizzato_clock.png)

---

### 8.4 Latch D Trasparente

Il **Latch D (Data Latch)** elimina la condizione proibita collegando l'ingresso $R$ al negato di $S$ tramite un invertitore ($S = D, R = \bar{D}$):
- Quando $\text{Clock} = 1$: il latch è **trasparente**, l'uscita $Q$ segue fedelmente l'ingresso $D$.
- Quando $\text{Clock} = 0$: il latch è **chiuso**, conservando l'ultimo valore memorizzato all'istante della transizione del clock.

![Figura 94: Schema circuitale del Latch D](images/ade/fig_94_latch_d_schema.png)

![Figura 95: Diagramma temporale del comportamento del Latch D trasparente](images/ade/fig_95_latch_d_diagramma_temporale.png)

---

### 8.5 Flip-Flop D Master-Slave (Edge-Triggered)

Per evitare che il circuito rimanga trasparente per l'intera durata del livello alto del clock, si collegano in cascata due Latch D pilotati da clock invertiti: la struttura **Master-Slave**:
- Quando $\text{Clock} = 1$: il Master è trasparente e acquisisce l'ingresso $D$, mentre lo Slave è chiuso.
- Quando $\text{Clock}$ transita da $1 \to 0$ (**fronte di discesa**): il Master si chiude memorizzando il dato, e lo Slave diventa trasparente, trasferendo il dato sull'uscita $Q$.
- Il Flip-Flop campiona il dato solo sull'istante del **fronte di commutazione del clock** (*edge-triggered*).

![Figura 96: Schema del Flip-Flop D Master-Slave controllato sul fronte](images/ade/fig_96_flipflop_d_master_slave.png)

![Figura 97: Forme d'onda e campionamento sul fronte del Flip-Flop D](images/ade/fig_97_flipflop_d_fronti_clock.png)

---

### 8.6 Struttura Interna del Banco dei Registri (Register File)

Il Register File contiene 32 registri a 32 bit e dispone di due porte di lettura e una porta di scrittura:
1. **Circuito di Scrittura:** un decoder $5 \to 32$ decodifica il numero del registro di destinazione (`Write Register`) e abilita il segnale di *Clock Enable* solo per il registro selezionato quando $\text{RegWrite} = 1$.
2. **Circuito di Lettura:** due banchi di multiplexer $32 \to 1$ (ciascuno a 32 bit) selezionano i registri specificati da `Read Register 1` e `Read Register 2` senza ritardi di clock (accesso combinatorio).

![Figura 98: Circuito interno di scrittura del Register File con decoder 5-a-32](images/ade/fig_98_banco_registri_scrittura.png)

![Figura 99: Circuito interno di lettura del Register File con banchi di Multiplexer](images/ade/fig_99_banco_registri_lettura.png)

---

### 8.7 Tecnologie di Memoria: SRAM vs DRAM

Le memorie a semiconduttore si dividono in due grandi famiglie:

1. **SRAM (Static RAM):**
   - Ciascuna cella è costituita da un circuito bistabile a **6 transistor (6T)**.
   - Non richiede cicli di rinfresco: il dato permane indefinitamente finché è presente l'alimentazione.
   - **Caratteristiche:** Estremamente veloce ($0.5 - 2.5\text{ ns}$), bassa densità di integrazione, elevato consumo e costo per bit elevato.
   - **Utilizzo:** Memorie Cache (L1, L2, L3).

   ![Figura 100: Schema circuitale della cella SRAM a 6 transistor (6T)](images/ade/fig_100_cella_sram_6t.png)

2. **DRAM (Dynamic RAM):**
   - Ciascuna cella è costituita da **1 solo transistor e 1 condensatore (1T-1C)**.
   - L'informazione è memorizzata come carica elettrica nel condensatore. Poiché la carica si disperde nel tempo, richiede **cicli periodici di rinfresco (*refresh*)** ogni pochi millisecondi.
   - **Caratteristiche:** Alta densità di integrazione, basso costo per gigabyte, tempo di accesso più elevato ($50 - 70\text{ ns}$).
   - **Utilizzo:** Memoria Principale (RAM di sistema).

---

### 8.8 Struttura di una Memoria SRAM 4x2

Una memoria SRAM organizzata a matrice comprende:
- Un decoder di indirizzo che attiva una sola **Word Line** (riga);
- Le celle della riga abilitata si connettono alle **Bit Lines** (colonne);
- Gli amplificatori di lettura (*Sense Amplifiers*) rilevano le variazioni di tensione sulle colonne e generano i dati in uscita.

![Figura 101: Organizzazione strutturale interna di una matrice SRAM 4x2](images/ade/fig_101_struttura_sram_4x2.png)

---

### 8.9 Confronto tra Tecnologie di Memoria

| Tecnologia | Tempo di Accesso Tipico | Costo per GB (USD) | Tipo di Memoria | Caratteristiche Principali |
| :--- | :---: | :---: | :---: | :--- |
| **SRAM (Static RAM)** | $0.5 - 2.5\text{ ns}$ | Molto Alto ($500 - 1000$) | Volatile | Cella 6T, velocissima, usata per Cache L1/L2/L3 |
| **DRAM (Dynamic RAM)** | $50 - 70\text{ ns}$ | Basso ($5 - 10$) | Volatile | Cella 1T-1C, necessita di refresh, usata per RAM |
| **Flash (SSD/NAND)** | $5 - 50\ \mu\text{s}$ | Bassissimo ($0.05 - 0.1$) | Non Volatile | A blocchi, usata per memoria di massa a stato solido |
| **Disco Magnetico (HDD)** | $5 - 20\text{ ms}$ | Minimo ($0.01 - 0.02$) | Non Volatile | Meccanico ad accesso sequenziale/casuale lento |

---
## Capitolo 9 — Gerarchia di Memoria e Memorie Cache

### 9.1 Il Principio di Località (Spaziale e Temporale)

I programmi eseguono solo una piccola porzione del loro spazio di indirizzi in un dato intervallo di tempo. Questo comportamento è descritto dal **Principio di Località**:

1. **Località Temporale:** Se un dato o un'istruzione è stato referenziato di recente, è molto probabile che venga referenziato di nuovo a breve (es. variabili all'interno di un ciclo, contatori, puntatori allo stack).
2. **Località Spaziale:** Se un elemento di memoria è stato referenziato, è molto probabile che gli elementi con indirizzi vicini vengano referenziati a breve (es. istruzioni eseguite sequenzialmente, scorrimento di array e matrici).

---

### 9.2 La Gerarchia di Memoria e Terminologia (Hit, Miss, Penalty)

Per combinare la velocità delle memorie più rapide con la capienza di quelle più economiche, la memoria è organizzata come una **gerarchia a piramide**:

![Figura 102: Piramide della gerarchia di memoria (velocità, capacità e costo)](images/ade/fig_102_piramide_gerarchia_memoria.png)

![Figura 103: Livelli della gerarchia e flusso di migrazione dei dati (Hit e Miss)](images/ade/fig_103_livelli_gerarchia_hit_miss.png)

- **Blocco (o Linea):** unità minima di informazione scambiata tra due livelli adiacenti della gerarchia.
- **Hit (Successo):** il dato richiesto dalla CPU è presente nel livello superiore della gerarchia.
  - **Hit Rate:** frazione di accessi alla memoria che si risolvono con un Hit ($\text{Hit Rate} + \text{Miss Rate} = 1$).
  - **Hit Time:** tempo necessario per accedere al dato nel livello superiore (incluso il tempo per determinare se è un Hit).
- **Miss (Fallimento):** il dato richiesto non è presente nel livello superiore e deve essere recuperato dal livello inferiore.
  - **Miss Rate:** frazione di accessi che generano un Miss.
  - **Miss Penalty:** tempo necessario per trasferire il blocco dal livello inferiore al livello superiore e servirlo alla CPU.

---

### 9.3 Cache ad Indirizzamento Diretto (Direct Mapped Cache)

Nella **Cache ad Indirizzamento Diretto**, ogni blocco della memoria principale può essere allocato in **una sola specifica linea di cache**.

La corrispondenza è data dalla funzione modulo:

$$\text{Indice Blocco Cache} = (\text{Indirizzo Blocco Memoria}) \bmod N_b$$

Poiché $N_b = 2^n$ è una potenza di 2, l'indice della cache corrisponde semplicemente agli $n = \log_2(N_b)$ bit meno significativi dell'indirizzo del blocco.

**Esempio:** Cache con 8 blocchi ($N_b = 8 \implies \log_2 8 = 3\text{ bit}$):
I blocchi di memoria con indirizzi `00001`, `01001`, `10001`, `11001` hanno tutti gli ultimi 3 bit pari a `001` e vengono mappati tutti sulla **linea 1** della cache.

![Figura 104: Mappatura ad indirizzamento diretto di 32 blocchi di memoria su 8 blocchi di cache](images/ade/fig_104_mappatura_cache_diretta.png)

---

### 9.4 Struttura dell'Indirizzo di Memoria: Tag, Index, Offset

Poiché più blocchi di memoria condividono la stessa linea di cache, l'indirizzo a 32 bit viene suddiviso in tre campi:

```text
 31                        n+m+2 n+m+1              m+2 m+1       2 1      0
+-------------------------------+----------------------+-----------+--------+
|              TAG              |        INDEX         |   BLOCK   |  BYTE  |
|                               |                      |  OFFSET   | OFFSET |
+-------------------------------+----------------------+-----------+--------+
```

1. **Tag (Etichetta):** i bit più significativi dell'indirizzo. Identificano in modo univoco quale specifico blocco di memoria è attualmente ospitato nella linea di cache.
2. **Index (Indice):** seleziona la linea di cache da accedere ($n = \log_2(\text{Numero Linee})$).
3. **Offset:**
   - **Block Offset ($m$ bit):** se il blocco contiene $2^m$ parole, seleziona la parola desiderata all'interno del blocco.
   - **Byte Offset (2 bit):** seleziona il singolo byte all'interno della parola da 32 bit (allineamento a 4 byte).

---

### 9.5 Struttura della Linea di Cache e Dimensionamento del Tag

Ogni linea di cache memorizza:
1. **Bit di Validità ($V$):** 1 bit che indica se il dato contenuto nella linea è valido ($1$) o privo di significato/non inizializzato ($0$). All'avvio del sistema tutte le linee hanno $V=0$ (*Compulsory Miss*).
2. **Campo Tag:** memorizza il tag del blocco attualmente caricato.
3. **Data Block:** i dati veri e propri (una o più parole).

![Figura 105: Meccanismo di verifica Hit/Miss e lettura dati in una cache ad indirizzamento diretto](images/ade/fig_105_funzionamento_cache_diretta.png)

![Figura 106: Struttura dei campi di una linea di cache (Valid, Tag, Data)](images/ade/fig_106_linea_cache_formato.png)

#### Formula per la Dimensione del Campo Tag:
Per un indirizzo a 32 bit, con cache di $2^n$ linee e blocchi da $2^m$ parole ($2^{m+2}$ byte):

$$\text{Dimensione Tag (bit)} = 32 - (n + m + 2)$$

#### Esempio di Dimensionamento (Cache con 1024 Linee, Blocchi da 1 Parola)
- Indirizzi su 32 bit;
- Blocco dati da 1 parola (4 byte $\implies m=0$, Byte Offset = 2 bit);
- Cache con $1\text{K} = 1024 = 2^{10}$ linee $\implies n = 10\text{ bit}$ di Index;
- $\text{Tag} = 32 - (10 + 0 + 2) = 20\text{ bit}$.

![Figura 107: Suddivisione dei campi dell'indirizzo per una cache da 1K blocchi](images/ade/fig_107_struttura_indirizzo_cache_1k.png)

---

### 9.6 Architettura di una Cache da 4 KB

Per una cache a indirizzamento diretto di dimensione dati pari a $4\text{ KB}$ ($1024$ parole da 32 bit, 1 parola per blocco):
- Index: 10 bit (seleziona una delle 1024 linee);
- Tag: 20 bit;
- Byte Offset: 2 bit;
- Un comparatore a 20 bit confronta il Tag memorizzato nella linea con il Tag dell'indirizzo;
- Se il comparatore rileva uguaglianza e il bit di validità $V=1$, l'uscita **Hit** vale 1 e il dato a 32 bit viene inoltrato alla CPU.

![Figura 108: Architettura circuitale completa di una Cache ad Indirizzamento Diretto da 4 KB](images/ade/fig_108_architettura_cache_4kb.png)

---

### 9.7 Gestione dei Miss nella Cache e Impatto sulla Pipeline

In presenza di un **Cache Miss**, la pipeline della CPU deve essere sospesa:
1. Viene inviato uno stallo (*stall*) all'intera pipeline;
2. L'indirizzo del blocco mancante viene inviato alla memoria principale (per una miss sulla memoria istruzioni si invia $\text{PC} - 4$);
3. La memoria principale esegue la lettura dell'intero blocco (impiegando decine o centinaia di cicli di clock);
4. Il blocco viene scritto nella linea di cache designata, impostando il bit di validità $V=1$ e aggiornando il campo Tag;
5. La pipeline viene riavviata ripetendo l'istruzione che aveva generato il miss, che questa volta troverà il dato in cache (*Hit*).

---

### 9.8 Politiche di Scrittura: Write-Through e Write-Back

Quando la CPU deve eseguire una scrittura in memoria (`sw`), possono essere adottate due strategie:

1. **Write-Through:**
   - Il dato viene scritto **contemporaneamente** sia nella linea di cache sia nella memoria principale DRAM.
   - *Vantaggi:* Semplicità e coerenza garantita tra cache e memoria.
   - *Svantaggi:* Le scritture in memoria principale sono lente e penalizzano le prestazioni.
   - *Ottimizzazione:* Si interpone un **Write Buffer** (coda FIFO) in cui la CPU deposita la scrittura e prosegue immediatamente l'esecuzione mentre il buffer scrive in DRAM in background.

2. **Write-Back:**
   - Il dato viene scritto **esclusivamente nella cache**.
   - Ciascuna linea possiede un bit aggiuntivo denominato **Dirty Bit** (bit di modifica):
     - Se il blocco è stato modificato in cache, $\text{Dirty} = 1$.
     - La scrittura in memoria principale avviene **solo quando il blocco modificato deve essere rimpiazzato** per fare spazio a un nuovo blocco.
   - *Vantaggi:* Riduce drasticamente il traffico sul bus di memoria ed è molto efficiente quando vi sono scritture ripetute alle stesse locazioni.

---
