# Programmazione 1

> **Autore:** Emanuele Ragozzini

## Indice dei Contenuti

- [Capitolo 0 — Installazione del Compilatore C](#capitolo-0-installazione-del-compilatore-c)
  - [Windows](#windows)
    - [CygWin](#cygwin)
    - [MinGW](#mingw)
  - [Linux](#linux)
- [Capitolo 1 — Introduzione a C, Variabili e Tipi Base](#capitolo-1-introduzione-a-c-variabili-e-tipi-base)
  - [Variabili](#variabili)
    - [Tipi di Variabili](#tipi-di-variabili)
  - [Operazioni](#operazioni)
  - [Main](#main)
- [Capitolo 2 — Conversioni di Tipo (Casting)](#capitolo-2-conversioni-di-tipo-casting)
  - [Torniamo seri](#torniamo-seri)
  - [Detto questo](#detto-questo)
- [Capitolo 3 — Librerie e Strutture Condizionali](#capitolo-3-librerie-e-strutture-condizionali)
  - [Librerie essenziali](#librerie-essenziali)
  - [Condizioni](#condizioni)
  - [Operatori Logici](#operatori-logici)
- [Capitolo 4 — Operatore Ternario](#capitolo-4-operatore-ternario)
  - [Quindi? Come funonzia questo coso?](#quindi-come-funonzia-questo-coso)
  - [Ma nel caso avessi più if-else annidati?](#ma-nel-caso-avessi-più-if-else-annidati)
- [Capitolo 5 — Strutture Iterative e Cicli](#capitolo-5-strutture-iterative-e-cicli)
  - [Cicli indefiniti](#cicli-indefiniti)
    - [Ciclo do-while](#ciclo-do-while)
    - [Ciclo while](#ciclo-while)
  - [Cicli definiti](#cicli-definiti)
  - [Due istruzioni particolari per i cicli](#due-istruzioni-particolari-per-i-cicli)
- [Capitolo 6 — Notazione e Best Practice per i Cicli](#capitolo-6-notazione-e-best-practice-per-i-cicli)
- [Capitolo 7 — Input da Tastiera e Gestione del Buffer](#capitolo-7-input-da-tastiera-e-gestione-del-buffer)
  - [Scanf per prendere input](#scanf-per-prendere-input)
  - [Printf per stampare](#printf-per-stampare)
- [Capitolo 8 — Array Monodimensionali (Vettori)](#capitolo-8-array-monodimensionali-vettori)
  - [Abbiamo diversi modi per definire un vettore:](#abbiamo-diversi-modi-per-definire-un-vettore)
    - [Definirlo e riempirlo al momento della dichiarazione](#definirlo-e-riempirlo-al-momento-della-dichiarazione)
    - [Definire solo la grandezza massima in maniera statica](#definire-solo-la-grandezza-massima-in-maniera-statica)
    - [Definire la grandezza massima grazie alla DEFINE](#definire-la-grandezza-massima-grazie-alla-define)
  - [Cosa intendiamo per accesso diretto?](#cosa-intendiamo-per-accesso-diretto)
  - [Scorrere un intero vettore](#scorrere-un-intero-vettore)
- [Capitolo 9 — Matrici e Array Multidimensionali](#capitolo-9-matrici-e-array-multidimensionali)
    - [Rappresentazione Grafica: Array vs Matrice](#rappresentazione-grafica-array-vs-matrice)
- [Capitolo 10 — Stringhe e Libreria string.h](#capitolo-10-stringhe-e-libreria-stringh)
  - [Quindi una stringa...](#quindi-una-stringa)
  - [C'è una cosa importante da ricordare](#cè-una-cosa-importante-da-ricordare)
  - [Prendere in input una stringa](#prendere-in-input-una-stringa)
  - [Librerie per le stringhe](#librerie-per-le-stringhe)
- [Capitolo 11 — Funzioni e Modularizzazione](#capitolo-11-funzioni-e-modularizzazione)
  - [Funzioni e passaggi a funzione](#funzioni-e-passaggi-a-funzione)
    - [Iniziamo quindi a modularizzare il codice...](#iniziamo-quindi-a-modularizzare-il-codice)
  - [Passare le variabili ad una funzione](#passare-le-variabili-ad-una-funzione)
    - [Passaggio per valore](#passaggio-per-valore)
    - [Passaggio per riferimento](#passaggio-per-riferimento)
  - [Diversi metodi di modularizzazione](#diversi-metodi-di-modularizzazione)
    - [1. Funzione pre-invocazione](#1-funzione-pre-invocazione)
    - [2. Dichiarazione del prototipo della funzione](#2-dichiarazione-del-prototipo-della-funzione)
- [Capitolo 12 — Notazione e Convenzioni per le Funzioni](#capitolo-12-notazione-e-convenzioni-per-le-funzioni)
  - [Notazioni per Funzioni](#notazioni-per-funzioni)
    - [Come funziona?](#come-funziona)
- [Capitolo 13 — Introduzione ai Puntatori](#capitolo-13-introduzione-ai-puntatori)
  - [I puntatori](#i-puntatori)
  - [Le variabili](#le-variabili)
  - [Che cazzo è un puntatore?!](#che-cazzo-è-un-puntatore)
    - [Come si fa?](#come-si-fa)
    - [Perché?](#perché)
  - [Notazioni importanti](#notazioni-importanti)
- [Capitolo 14 — Puntatori Avanzati e Passaggio per Riferimento](#capitolo-14-puntatori-avanzati-e-passaggio-per-riferimento)
  - [Puntatori 2 — Gestione della memoria](#puntatori-2-gestione-della-memoria)
    - [A cosa serve la gestione della memoria?](#a-cosa-serve-la-gestione-della-memoria)
    - [Perché `sizeof(int)`?](#perché-sizeofint)
    - [Cosa è la `malloc()`?](#cosa-è-la-malloc)
    - [Qual è la differenza tra `malloc()`, `calloc()`, `realloc()` e `free()`?](#qual-è-la-differenza-tra-malloc-calloc-realloc-e-free)
  - [Utilizzo dei puntatori per le stringhe](#utilizzo-dei-puntatori-per-le-stringhe)
    - [Quick Tip: Acquisizione dinamica di stringhe da tastiera](#quick-tip-acquisizione-dinamica-di-stringhe-da-tastiera)
- [Capitolo 15 — Parametri da Riga di Comando (argc, argv)](#capitolo-15-parametri-da-riga-di-comando-argc-argv)
  - [`argc` e `*argv[]`](#argc-e-argv)
    - [Non è solo così!](#non-è-solo-così)
    - [Che cazzo so sti mostri?](#che-cazzo-so-sti-mostri)
    - [Ok, ma a che pro?](#ok-ma-a-che-pro)
- [Capitolo 16 — Strutture Dati (struct)](#capitolo-16-strutture-dati-struct)
  - [Strutture](#strutture)
  - [Come si definisce una struttura](#come-si-definisce-una-struttura)
    - [Perché succede questo?](#perché-succede-questo)
  - [Come accedere e utilizzare una struttura](#come-accedere-e-utilizzare-una-struttura)
  - [Cosa succede se abbiamo un puntatore a struttura?](#cosa-succede-se-abbiamo-un-puntatore-a-struttura)
  - [Cosa succede se all'interno di una struttura abbiamo dei puntatori?](#cosa-succede-se-allinterno-di-una-struttura-abbiamo-dei-puntatori)
  - [Struttura con array interno allocato dinamicamente](#struttura-con-array-interno-allocato-dinamicamente)
  - [Array di strutture allocate dinamicamente](#array-di-strutture-allocate-dinamicamente)
- [Capitolo 17 — Gestione dei File in C](#capitolo-17-gestione-dei-file-in-c)
  - [Che cazzo è un file?](#che-cazzo-è-un-file)
  - [Apertura e chiusura dei file in C](#apertura-e-chiusura-dei-file-in-c)
    - [Tabella delle modalità di apertura](#tabella-delle-modalità-di-apertura)
    - [Chiusura del file con `fclose()`](#chiusura-del-file-con-fclose)
  - [Scrivere in un file](#scrivere-in-un-file)
    - [1. Scrivere su un file di testo (`fprintf`)](#1-scrivere-su-un-file-di-testo-fprintf)
    - [2. Scrivere su un file binario (`fwrite`)](#2-scrivere-su-un-file-binario-fwrite)
  - [Leggere da un file](#leggere-da-un-file)
    - [1. Leggere da un file di testo (`fscanf`)](#1-leggere-da-un-file-di-testo-fscanf)
    - [2. Leggere da un file binario (`fread`)](#2-leggere-da-un-file-binario-fread)
- [Capitolo 18 — Allocazione Dinamica della Memoria e Argomenti Avanzati](#capitolo-18-allocazione-dinamica-della-memoria-e-argomenti-avanzati)
  - [Puntatori Avanzati](#puntatori-avanzati)
  - [Notazione puntatore per vettori](#notazione-puntatore-per-vettori)
    - [Quindi cosa è questa notazione? Perché si usa?](#quindi-cosa-è-questa-notazione-perché-si-usa)
    - [Come funziona sotto il cofano?](#come-funziona-sotto-il-cofano)
  - [Puntatori a puntatori (`tipo **`)](#puntatori-a-puntatori-tipo)
    - [Un array che contiene altri array? 🤔](#un-array-che-contiene-altri-array)
  - [Array di stringhe dinamico (`char **`)](#array-di-stringhe-dinamico-char)
  - [Array di puntatori a struttura](#array-di-puntatori-a-struttura)
  - [Una piccola precisazione sul tipo `*array[]`](#una-piccola-precisazione-sul-tipo-array)
- [Capitolo 19 — Commenti e Documentazione](#capitolo-19-commenti-e-documentazione)
  - [Commenti per "Documentare"](#commenti-per-documentare)

---

# Capitolo 0 — Installazione del Compilatore C

> [!NOTE]
> Per poter creare dei programmi in C abbiamo bisogno di un compilatore.
> Abbiamo diverse opzioni.

## Windows

### CygWin
- Installare l'installer di CigWin da: https://www.cygwin.com
- Avviato l'installer, scegliere l'opzione **"Install from Internet"**
- Lasciare sia la Root Directory che la Local Package Directory di default
- Alla pagina "Select Your Internet Connection" scegliere **"Direct Connection"**
- Scegliere un server per il download
- Alla pagina "Select Packages" scegliere i seguenti pacchetti:
  - `gcc-core`
  - `gdb`: The GNU Debugger
  - `make`: The GNU version of the 'make' utility
- Conclusa l'installazione, aggiungere la variabile d'ambiente PATH:
  ```text
  C:\cygwin64\bin
  ```

### MinGW
- Installare l'installer di MinGW da: http://sourceforge.net/projects/mingw
- Lasciare la cartella di destinazione quella di default (`C:\MinGW`)
- Installare le componenti:
  - `C`
  - `C++`
  - `MSYS Basic System`
  - `MinGW Developer Toolkit`
- Finita l'installazione, bisognerà solo aggiungere 2 variabili d'ambiente PATH:
  - `C:\MinGW\bin;`
  - `C:\MinGW\MSYS\1.0\bin;`

---

## Linux

- Digitare sul terminale:
  ```bash
  sudo apt install clang
  ```
  *(oppure `gcc` a seconda della distro)*

---

# Capitolo 1 — Introduzione a C, Variabili e Tipi Base

> [!NOTE]
> In questa pagina faremo una veloce introduzione al concetto di variabili e operazioni.
> Se sei già più avanti, skippa bro 😁👍

## Variabili

Iniziamo con il concetto di variabile.

> Possiamo considerare una variabile come un piccolo cassetto che contiene un dato.
> Proprio perché ci sono diversi tipi di dati, ogni variabile può essere di tipo diverso

### Tipi di Variabili

Vediamo rapidamente i tipi di dati che abbiamo in C (o comunque quelli che usiamo al corso):

| Tipo | Contenuto | Peso in byte |
| :--- | :--- | :--- |
| `int` | Numeri interi (coprono un range che parte da -32,767 a 32,767) | 2 |
| `long` | Numeri interi (coprono un range da -2,147,483,647 a 2,147,483,647) | 4 |
| `float` | Numeri a virgola mobile con precisione singola | 4 |
| `double` | Numeri a virgola mobile con doppia precisione | 8 |
| `char` | Caratteri | 1 |

Nel linguaggio C la creazione di variabili non è troppo complessa, e finché rispetti il contenuto che possono contenere non ci saranno problemi.
Ecco un esempio di come dichiarare le variabili in C:

```c
int numero = 10; //Dichiarato un numero intero
char carattere = 'e'; //Dichiarato un carattere
float numeroVirgola = 1.5; //Dichiarato un numero con la virgola

//I doppi slash sono per i commenti
//Tutto quello inserito all'interno dei commenti non viene letto dal codice
//È solo per magari segnarsi qualche appunto o per spiegare le cose
//Come sto facendo ora
//Ah, una cosa importante...I PUNTI E VIRGOLA, NON DIMENTICATELI
//ALLA FINE DI OGNI ISTRUZIONE
```


## Operazioni

Ora che abbiamo riempito i cassetti con le cose che ci servono, dobbiamo imparare a farne effettivamente qualcosa.

E iniziamo dai numeri (le operazioni le vedremo più avanti):

```c
int numero = 10;
int altroNumero = 10; //Ora abbiamo 2 numeri, possiamo effettivamente farci quello che vogliamo

//Quindi possiamo farci una somma, mettiamola anche in una nuova variabile
int somma = numero + altroNumero;

//Oppure la differenza
int diff = numero - altroNumero;

//Gli unici operatori che effettivamente cambiano sono quello della moltiplicazione
int prodotto = numero * altroNumero;

//E quello della divisione
int divisione = numero / altroNumero;

//NOTA BENE: L'operatore del modulo (restituisce il resto della divisione)
int modulo = numero % 2; //Restituisce il resto della divisione di numero diviso 2
```

## Main

Per eseguire effettivamente un programma in C, abbiamo bisogno di una funzione chiamata `main`.
Al suo interno faremo qualsiasi tipo di operazione.

```c
int main() {
    int numero = 10;
    int altroNumero = 10;
    int somma = numero + altroNumero;
    int diff = numero - altroNumero;
    int prodotto = numero * altroNumero;
    int divisione = numero / altroNumero;
    int modulo = numero % 2;
}
```

L’unica cosa che per il momento ci interessa sapere sul main è che, *una volta completata l'esecuzione con successo, verrà restituito il codice 0.*

Direi che per il momento va bene così, prossima lezione vedremo le funzioni fondamentali di C.

---


# Capitolo 2 — Conversioni di Tipo (Casting)

*No, non sono aperti casting per nessuna serie TV...*
*Ringraziate la regia che mi ha suggerito la battuta.*

## Torniamo seri

> [!NOTE]
> ☕ Quando si lavora con tipi di dati diversi tra loro può essere necessario convertire valori da un tipo ad un altro.
> Questa operazione si chiama *casting*.

In C, *per convertire esplicitamente* un tipo ad un altro tipo si usa l'operatore `()`, queste parentesi tonde prendono il nome di *operatore di cast*; *all'interno delle parentesi bisogna mettere il nuovo tipo al quale vogliamo passare*, e fuori il valore che si vuole modificare.

Facciamo un esempio:

```c
float peppeVirgola = 4.4;
//Trasformiamo peppeVirgola in un int
int peppe = (int)peppeVirgola;
```

Queste operazioni possono essere fatte anche su un output di un calcolo, tipo:

```c
int num1 = 2, num2 = 3;
int ris = (int)(num1 / num2);
```

Oppure su ogni valore di un calcolo:

```c
float num1 = 2.5, num2 = 3.4;
float ris = ((int)num1 / (int)num2);
```

E anche, convertire dei caratteri nel loro valore ASCII e viceversa:

```c
char a = 'a';
int asciiA = (int)a;

// O il contrario
char a = (char)asciiA;
```

## Detto questo

I casting *non devono per forza essere espliciti*, *alcuni* tipi di casting infatti *sono riconosciuti da C autonomamente* e pertanto possono non essere esplicitati (*come quello da ASCII a intero e viceversa*).

---


# Capitolo 3 — Librerie e Strutture Condizionali

> [!NOTE]
> Le "operazioni" fatte nella lezione precedente erano delle semplici operazioni aritmetiche.
> Adesso vediamo delle librerie di C essenziali, che ci permettono di fare anche altro.

> Una libreria è un insieme di funzioni/operazioni/procedure già implementate, che devono solo essere richiamate

## Librerie essenziali

Iniziamo dalle librerie *ESSENZIALI* di C:

```c
//stdio.h contiene funzioni e tipi per le operazioni di input e di output
#include <stdio.h>

//stdlib.h contiene MOLTE funzioni e costanti MOLTO importanti e di utilità generale
//Specialmente per la gestione della memoria (che vedremo più avanti)
#include <stdlib.h>

//string.h contiene funzioni per gestire e manipolare le stringhe (la vedremo più avanti quando vedremo le stringhe, però la accenno già da ora)
#include <string.h>

int main() {
    //Codice del main
}
```

Queste sono le librerie principali per il corso di Programmazione I, ognuna importante per un motivo.

> [!IMPORTANT]
> *Tutte le librerie vanno incluse PRIMA della funzione main*

---

## Condizioni

Esistono dei momenti dove, tramite i dati che abbiamo all'interno del programma o che esso genererà, dovremmo prendere delle scelte.

Per questo motivo esistono le condizioni.

Per esempio, nel caso un numero sia pari deve fare una cosa e nel caso sia dispari un'altra.

```c
int numero = 7; //definiamo un numero

//controlliamo se è pari grazie al modulo, quindi se la divisione per 2 ha resto 0
//è pari
if(numero % 2 == 0) {
    printf("Pari"); //La printf serve per stampare sulla linea comandi
}
//nel caso in cui sia dispari usiamo un else, ovvero "in qualsiasi altro caso non
//definito" fai questo
else {
    printf("Dispari");
}
//Quindi il programma stamperà pari, se un numero è pari, altrimenti dispari.
```

Se io avessi voluto definire più condizioni, la sintassi è più o meno la stessa:

```c
if(numero == 0) {
    printf("Zero");
} else if(numero % 2 == 0) {
    printf("Pari");
} else {
    printf("Dispari");
}
```

Prima di passare avanti vorrei puntualizzare la differenza tra `=` e `==` :
- Utilizziamo `=` per *ASSEGNARE* un valore ad una variabile per esempio.
- Utilizziamo `==` per *CONFRONTARE* 2 valori o 2 variabili.

> [!IMPORTANT]
> Ultimissima cosa giuro, ma è importante.
> Gli `if`, ovvero le clausole di condizione, funzionano attraverso dei meccanismi di vero e falso. Dove vero è 1 e falso è 0.
> Ricorda perché ci servirà tra poco.

---

## Operatori Logici

Gli operatori logici non sono altro che operatori, appunto 😅, che ci permettono di semplificarci il lavoro quando ci ritroviamo davanti ad una sfilza di condizioni che devono essere rispettate.

Abbiamo diversi operatori logici, ma vediamo solo i principali:

- **`AND`**: *restituisce vero (oppure 1) solo se tutte le condizioni prese in considerazioni sono vere*
- **`OR`**: *restituisce vero se anche solo una delle condizioni è vera*
- **`NOT`**: *restituisce l'opposto della condizione (quindi se la condizione è vera, restituirà falso e viceversa)*

```c
int numero = 10;

//Entra nell'if perché entrambe le condizioni sono vere
if(numero == 10 && numero % 2 == 0) //AND indicato con &&
{
    printf("Condizione AND");
}

//Entra nell'if perché ALMENO UNA delle condizioni è vera
if(numero == 10 || numero == 5) //OR indicato con ||
{
    printf("Condizione OR");
}

//Entra nell'if perché numero non è uguale a 5
if(numero != 5) //NOT indicato con !
{
    printf("Condizione NOT");
}
```

Gli operatori logici sono concatenabili anche ad altri operatori logici:

```c
int numero = 10;

//State attenti alle parentesi 😅
//Entrerà nell'if perché la prima condizione (quella con l'AND) è vera
if((numero == 10 && numero % 2 == 0) || numero == 5) {
    printf("Condizione mista");
}
```

---

# Capitolo 4 — Operatore Ternario

Soffermiamoci un attimo su questo essere mistico.

> [!NOTE]
> 👨‍💻 L'*Operatore Ternario* è un'espressione che usiamo per *accorciare i nostri blocchi di espressioni if-else.*
> 
> Serve per prendere rapide decisioni e ora vediamo come usarlo

```c
//Vediamo una decisione presa con un if-else
int a = 2, b = 5;
if(a < b) return 1;
else return 0;

//Vediamo invece la stessa decisione con un operatore ternario
int a = 2, b = 5;
return (a < b) ? 1 : 0;

//Oppure
int a = 2, b = 5, c;
if(a < b) c = a + b;
else c = a - b;

//Trasformato con operatore ternario
int a = 2, b = 5, c;
c = (a < b) ? (a + b) : (a - b);
```

---

## Quindi? Come funonzia questo coso?

Funonzia così.
Dividiamo l'espressione in *due parti*:

- La *parte prima del `?`* indica la *condizione da verificare*
- La *parte dopo del `?`* rappresenta i *nostri output*.
  Quindi, se la condizione sarà *vera*, restituirà il *valore a sinistra del `:`*, *altrimenti quella a destra*

---

## Ma nel caso avessi più if-else annidati?

Possono essere annidati anche loro (*abbastanza sconsigliato perché diventa nu burdell da leggere, però se ci si prende la mano è comunque comodo*).

```c
//If-else
int a = 1, b = 2, c;
if (a == 1) {
    if (b == 2) {
        c = 3;
    } else {
        c = 5;
    }
} else {
    c = 0;
}

//Operatore ternario
int a = 1, b = 2, c;
c = (a == 1 ? (b == 2 ? 3 : 5) : 0);
```

Decisamente un po' più complesso da scrivere o leggere.
Però, *trucchetto*, iniziare a *pensare (o leggere)*, dal blocco *più interno* (che nel nostro caso sarebbe `b == 2 ? 3 : 5`) e poi sviluppare l'esterno.

---


# Capitolo 5 — Strutture Iterative e Cicli

> [!NOTE]
> Abbiamo visto le condizioni nella lezione precedente, ora vediamo come effettuare più volte (iterare più volte) su una serie di operazioni.

> Definiamo un ciclo come una sequenza di operazioni da effettuare un numero, *definito o meno*, di volte.

---

## Cicli indefiniti

Abbastanza semplicemente sono i cicli di cui non conosciamo il numero esatto di iterazioni da effettuare.

Ne abbiamo 2 tipi:
- *Il ciclo do-while*
- *Il ciclo while*

### Ciclo do-while

Questo ciclo è un caso di *ciclo indefinito* in cui, è vero che non conosciamo il numero di iterazioni, tuttavia sappiamo per certo che verrà eseguito **ALMENO UNA VOLTA**.

```c
int numero = 5;
do // Iniziamo il ciclo
{
    numero++; // All'interno del ciclo il numero viene incrementato di 1 ad ogni iterazione
} while(condizione); // Fino a quando la condizione sarà vera, il ciclo continuerà
```

### Ciclo while

A differenza della controparte, il ciclo while *può anche non ciclare affatto*. Infatti la condizione viene verificata **PRIMA di iniziare il ciclo**.

```c
int numero = 5;
while(condizione) // Iniziamo il ciclo SE la condizione è verificata
{
    numero--; // Il numero viene decrementato di 1 ad ogni iterazione
}
```

---

## Cicli definiti

Come intuibile dal nome, in questo caso *conosciamo il numero di iterazioni da effettuare*.  
In questo caso non utilizziamo i cicli che includono il `while`, ma utilizziamo il *ciclo FOR*.  
*I cicli FOR sono strutturati in modo da effettuare un numero definito di operazioni e poi terminare.*

```c
int iterazioni = 5; // Numero massimo di iterazioni
int numero = 10;
int i; // Questo è il nostro contatore di iterazioni

// Scandiamo il ciclo for in 3 parti:
// La prima parte imposta il numero di iterazioni a 0
// La seconda è la condizione di permanenza del ciclo, quindi fino a quando i < iterazioni
// La terza è l'aumento del nostro contatore di iterazioni
for(i = 0; i < iterazioni; i++) {
    numero++;
}
```

Quindi ad ogni iterazione, il contatore (`i`) aumenterà fino a quando non sarà uguale alla nostra variabile `iterazioni` e poi uscirà.

---

## Due istruzioni particolari per i cicli

Abbiamo due istruzioni particolari che ci sono molto utili per i cicli:

- `break`, l'istruzione `break` *interrompe il ciclo* ed esegue ciò che c'è dopo il ciclo;
- `continue`, l'istruzione `continue` *salta un'iterazione del ciclo* e fa partire direttamente la prossima;

> [!WARNING]
> ### ATTENZIONE:
> Attenti alle condizioni dei cicli, *possono andare in loop*, nulla di grave (per ora) però poi bisogna chiudere la shell e riaprirla.

<br>

---

# Capitolo 6 — Notazione e Best Practice per i Cicli

> [!NOTE]
> Quando creiamo un blocco interno di istruzioni, che sia di una condizione o di un ciclo, tendiamo ad inserire le `{ }` per indicarne l'inizio o fine di un blocco.  
> Ciò è ovviamente utile per indicare appunto l'appartenenza di un'istruzione in un blocco, tuttavia nelle notazioni della buona programmazione c'è un caso particolare che bisogna tenere a mente:  
> *Nel caso in cui all'interno di una Condizione o di un Ciclo ci sia una sola istruzione, le `{ }` possono essere omesse.*

Facciamo un esempio:

```c
int main() {
    int var = 8, i;
    
    // Giusto
    if(var == 8)
        printf("Eh si, è proprio 8");
        
    // Giusto
    for(i = 0; i < var; i--)
        printf("Proprio un ciclo");
        
    // Giusto
    while(var < 10)
        printf("Proprio un ciclo while");
}
```

<br>

---


# Capitolo 7 — Input da Tastiera e Gestione del Buffer

> [!NOTE]
> Durante un programma, potrebbe esserci l'esigenza di chiedere dei valori all'utente che sta eseguendo il programma. Quindi in questa lezione vediamo come fare.

---

## Scanf per prendere input

Come dice il titolo, per prendere in input da tastiera utilizziamo la funzione `scanf()`, a cui dobbiamo dire il tipo di dato che deve leggere (intero, carattere, numero con la virgola, ecc.) e in quale variabile dobbiamo mettere il valore che leggiamo.

```c
#include <stdio.h> // Per utilizzare la scanf e la printf ci serve includere stdio.h

int main() {
    int variabile;
    scanf("%d", &variabile); // Così leggiamo un intero
}
```

Però partiamo con calma e spieghiamo il **PERCHÉ** di quella riga strana a primo impatto.  
*Il linguaggio C, identifica i tipi di variabili con diversi caratteri:*

| Tipo | Carattere |
| :--- | :--- |
| `int` | `%d` |
| `char` | `%c` |
| `float` | `%f` |
| `double` | `%lf` *(è una L minuscola)* |
| `long` | `%ld` *(è una L minuscola)* |

Quindi ora conosce il tipo di variabile che deve leggere, *ma perché vicino al nome della variabile utilizziamo il "&"?*

> [!IMPORTANT]
> ### ‼️ ‼️ ‼️ ‼️ ‼️ ‼️ ‼️
> ### IMPORTANTE (ma per adesso riassumiamo, lo rivedremo):
> Utilizzando il `&variabile` stiamo dicendo al compilatore di *salvare il valore* che stiamo leggendo all'interno dello *slot di memoria riservato alla variabile*.

---

## Printf per stampare

Per stampare su linea di comando usiamo la funzione `printf()`, che ha bisogno della stringa che vogliamo stampare.

```c
#include <stdio.h> // Per utilizzare la scanf e la printf ci serve includere stdio.h

int main() {
    printf("Questa è una printf"); // Stampa la stringa
}
```

Tutto molto semplice... *ma se dovessimo stampare il contenuto di una variabile?*  
Se dobbiamo stampare il contenuto di una variabile, ci basta tornare alla spiegazione dei tipi di variabili. Poiché abbiamo bisogno di un carattere per le variabili in base a quello che dobbiamo stampare.

```c
#include <stdio.h> // Per utilizzare la scanf e la printf ci serve includere stdio.h

int main() {
    int variabile = 10;
    int variabile2 = 'c';
    
    // Mettiamo come segnaposto, all'interno della print il carattere della variabile
    // da stampare, successivamente bisognerà indicare la variabile che dovrà prendere il
    // suo posto
    printf("Stampa della variabile %d numerica", variabile);
    
    // È possibile mettere anche più segnaposto, bisogna quindi impostare 2 variabili
    printf("Variabile 1: %d - Variabile 2: %c", variabile, variabile2);
}
```

<br>

---

# Capitolo 8 — Array Monodimensionali (Vettori)

> Un Vettore (o Array) è un insieme di dati omogenei a cui è possibile accedere in maniera diretta.

> [!NOTE]
> Quindi, se prima consideravamo le variabili come dei cassetti, ora possiamo considerare gli array come delle cassettiere piene di variabili.  
> Dire che un array è un insieme di dati omogenei vuol dire che tutti i dati sono dello stesso tipo.

---

## Abbiamo diversi modi per definire un vettore:

### Definirlo e riempirlo al momento della dichiarazione

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Dichiariamo un array di interi e lo riempiamo appena fatta la dichiarazione
    int array[] = {4, 3, 2, 1};
}
```
In questo modo la dimensione del vettore è automaticamente impostata al numero di elementi inseriti.

### Definire solo la grandezza massima in maniera statica

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Dichiariamo un array di interi e impostiamo la sua grandezza massima a 4
    int array[4];
}
```

### Definire la grandezza massima grazie alla DEFINE

```c
#include <stdio.h>
#include <stdlib.h>
#define MAX 4

int main() {
    // Dichiariamo un array di interi e impostiamo la sua grandezza massima
    // al valore di MAX
    int array[MAX];
}
```

---

## Cosa intendiamo per accesso diretto?

Definiamo gli array come delle strutture ad accesso diretto poiché è possibile accedere alle singole posizioni dell'array senza dover scorrere l'intero array.

> [!IMPORTANT]
> ### COSA IMPORTANTE: LE POSIZIONI DEI VETTORI PARTONO DA 0.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int array[] = {4, 3, 2, 1};
    int numero = array[3];
}
```

In questo esempio la variabile `numero` conterrà il valore contenuto nella terza posizione (*partendo da 0, quindi in questo caso nell'ultima posizione*) che conterrà il valore 1.

---

## Scorrere un intero vettore

In alcuni casi (molto più spesso di quanto si pensi) potremmo aver bisogno di scorrere un array per compiere diverse operazioni.  
Per fare ciò usiamo il *ciclo FOR* che abbiamo introdotto nella lezione sui CICLI.  
Facciamo un esempio dove, per ogni elemento del nostro array ne aumentiamo il valore di uno.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int i;
    int array[] = {4, 3, 2, 1};
    
    // Partendo dalla posizione 0 del vettore fino all'ultima posizione
    for(i = 0; i < 4; i++) {
        array[i]++; // Il valore dell'array nella posizione indicata con i, quindi in posizione i, viene incrementato di uno
    }
}
```

Scorrere un array viene usato per diverse operazioni, tra le più importanti possiamo citare la ricerca di un valore specifico o l'ordinamento e altre che vedremo più avanti.

<br>

---


# Capitolo 9 — Matrici e Array Multidimensionali

> Le matrici, esattamente come i vettori, sono un insieme di valori omogenei... *ma a 2 dimensioni*

Infatti, se prima consideravamo i vettori come delle cassettiere sviluppate in lungo, allora possiamo immaginare una matrice come tanti vettori messi uno di fianco all'altro.  
Di fatto, possiamo anche vedere una matrice come un vettore di vettori, ma di questo ne parleremo più avanti quindi per il momento concentriamoci sul disegno.

### Rappresentazione Grafica: Array vs Matrice

```
ARRAY / VETTORE               MATRICE
                              0     1     2
   +---+                   +-----+-----+-----+
0: |   |                0: |     |     |     |
   +---+                   +-----+-----+-----+
1: |   |                1: |     |     |     |
   +---+                   +-----+-----+-----+
2: |   |                2: |     |     |     |
   +---+                   +-----+-----+-----+
3: |   |                3: |     |     |     |
   +---+                   +-----+-----+-----+
4: |   |                4: |     |     |     |
   +---+                   +-----+-----+-----+
5: |   |                5: |     |     |     |
   +---+                   +-----+-----+-----+
```

Proprio come l'indice che usiamo per accedere al vettore (la nostra `i`, che indica la i-esima posizione), la matrice ha bisogno di ben 2 indici.  
Indichiamoli con `i` e `j`, dove:
- `i` = è la i-esima riga
- `j` = è la j-esima colonna

```c
/* Dichiariamo una matrice con 6 righe e 3 colonne */
/* Come quella nel disegno sopra */
int matrice[6][3];
int i, j;

/* Riempiamo la nostra matrice con valori presi in input */
/* Si parte facendo un ciclo per riempire riga per riga */
for(i = 0; i < 6; i++) {
    /* Dove all'interno ci sarà un ciclo per riempire le colonne di ogni riga */
    for(j = 0; j < 3; j++) {
        /* Andiamo a mettere il valore nello slot della riga i nella colonna j */
        scanf("%d", &matrice[i][j]);
    }
}
```

Questo è il funzionamento base delle matrici, non c'è molto altro da dire... Per ora.

<br>

---

# Capitolo 10 — Stringhe e Libreria string.h

> [!NOTE]
> Abbiamo già visto nelle sezioni scorse i tipi di dati e anche come raggrupparli grazie agli Array. Adesso vediamo perché tutto questo ci è utile per le stringhe.

Quindi diamo una piccola definizione di Stringhe e come si usano:

> Le stringhe, o nel senso più comune le parole, sono un insieme di lettere.  
> Infatti, proprio per questo motivo, in C le stringhe vengono definite come **Array di caratteri**.

---

## Quindi una stringa...

A differenza di un singolo carattere che veniva definito con:

```c
char carattere;
carattere = 'a';
```

Una stringa viene definita con:

```c
char stringa[20]; // Dove 20 è la GRANDEZZA MASSIMA DELLA STRINGA
stringa = "asdrubale";
```

---

## C'è una cosa importante da ricordare

Le stringhe, proprio come gli Array, possono essere immaginate come dei cassetti. Alla fine di questi cassetti vi è un carattere speciale definito da C come `\0` (*backslash zero*) che serve ad indicare la fine della stringa.

> [!IMPORTANT]
> ### IMPORTANTE:
> Quando parliamo di `\0` non intendiamo il carattere `"0"` ma il primo carattere del codice ASCII, quello con codice numerico uguale a zero.

---

## Prendere in input una stringa

Una stringa, come già detto, viene considerata un Array. In quanto tale, quando chiamiamo la `scanf()` non ci sarà necessità di specificare l'indirizzo di memoria della variabile ma solo il suo nome (*ne parleremo meglio in un capitolo successivo riguardante la gestione della memoria*).

```c
char stringa[50];

scanf("%s", &stringa); // SBAGLIATISSIMO
scanf("%s", stringa);  // CORRETTO
```

---

## Librerie per le stringhe

Le stringhe non possono essere trattate come variabili normali.  
Infatti non possiamo confrontare due stringhe semplicemente con l'uso dell'`==`, né possiamo sapere se una è più grande dell'altra con gli altri operatori visti in precedenza.  
È qui che ci viene in aiuto la libreria `<string.h>` che contiene funzioni già pronte per poter lavorare con le stringhe.

Per esempio abbiamo la funzione `strcmp(stringa1, stringa2)` (*funzione string compare*), che date 2 stringhe le confronta e restituisce *0 se le due stringhe sono uguali, >0 se la stringa1 è più grande della stringa2, oppure <0 se la stringa2 è più grande della stringa1*.

```c
#include <string.h>

char stringa1[20] = "Peppe";
char stringa2[20] = "Peppe";

// Per rendere più snello potremmo anche scrivere if(!strcmp(stringa1, stringa2))
if(strcmp(stringa1, stringa2) == 0) {
    printf("Sono uguali");
}
```

Ci sono molte altre funzioni in `string.h`, ti lascio l'arduo compito di guardare la tabella che ti lascio qui.

| Funzione | Descrizione |
| :--- | :--- |
| `int strlen(stringa1)` | Restituisce il numero di caratteri di `stringa1` |
| `char *strcpy(stringa1, stringa2)` | Copia la `stringa2` e la inserisce all'interno di `stringa1` |
| `int strcmp(stringa1, stringa2)` | *L'abbiamo detto sopra, leggi sopra 😑* |
| `char *strcat(stringa1, stringa2)` | Concatena la `stringa2` alla `stringa1` |

Ce ne sarebbero altre, tuttavia non vengono utilizzate all'interno del corso. Se ti interessano puoi comunque cercarle online.

> [!TIP]
> ### Piccolo reminder
> Voglio dare per scontato che, avendolo ripetuto parecchie volte, si sia capito che le stringhe sono array.  
> In quanto tali, possono essere esplorate grazie ad un ciclo FOR.

---

# Capitolo 11 — Funzioni e Modularizzazione

## Funzioni e passaggi a funzione

> [!NOTE]
> Modularizzare il codice in diverse funzioni, ovvero non scrivere tutto nel `main` (come farebbero le bestie di Satana) e quindi creare delle funzioni apposite per fare le operazioni, è una *best practice* nella programmazione in generale (nonché un requisito d'esame 😅).

---

### Iniziamo quindi a modularizzare il codice...

Tutte le operazioni che prima mettevamo nel `main` e che potenzialmente rendevano il `main` un gigantesco ammasso di codice pesante da leggere devono sparire.  
In più questa operazione rende più leggibile e modificabile il codice senza dover toccare troppe linee di codice.

Facciamo un semplice esempio:

#### Codice da bestia di Satana
```c
#include <stdio.h>

int main() {
    int num1 = 0, num2 = 0;
    
    printf("Inserire primo numero: ");
    scanf("%d", &num1);
    
    printf("Inserire secondo numero: ");
    scanf("%d", &num2);
    
    int somma = num1 + num2;
    int differenza = num1 - num2;
    int prodotto = num1 * num2;
    float divisione = (float)num1 / num2;
    
    printf("Somma %d, Differenza %d, Prodotto %d, Divisione %f", somma, differenza, prodotto, divisione);
    
    return 0;
}
```

---

#### Codice modulare da brava persona

A primo impatto (e soprattutto con questo esempio, pessima scelta ma era per farvi capire) vi sembrerà che sia una cosa più lunga e scomoda, ma vi posso assicurare che questa (oltre ad essere una best practice) è una cosa che, con codici lunghi e complessi, vi renderà la vita più facile.

```c
#include <stdio.h>

// Definiamo le funzioni per dividere le operazioni
// La funzione che si occuperà della somma:
// int = il tipo che restituisce
// somma = il nome della funzione
// all'interno delle parentesi vanno indicati i tipi ed i nomi delle variabili che gli passiamo
int somma(int num1, int num2) {
    return num1 + num2;
}

int differenze(int num1, int num2) {
    return num1 - num2;
}

int prodotto(int num1, int num2) {
    return num1 * num2;
}

float divisione(int num1, int num2) {
    return (float)num1 / num2;
}

int main() {
    int num1 = 0, num2 = 0;
    
    printf("Inserire primo numero: ");
    scanf("%d", &num1);
    
    printf("Inserire secondo numero: ");
    scanf("%d", &num2);
    
    // Non dobbiamo per forza salvare i risultati delle funzioni all'interno delle variabili:
    // dato che le funzioni restituiscono i risultati, li stampiamo direttamente.
    // (Avremmo anche potuto fare: int sum = somma(num1, num2); salvandolo in una variabile)
    printf("Somma %d, Differenza %d, Prodotto %d, Divisione %f", 
           somma(num1, num2), 
           differenze(num1, num2), 
           prodotto(num1, num2), 
           divisione(num1, num2));
           
    return 0;
}
```

---

## Passare le variabili ad una funzione

### Passaggio per valore

Si dice **passaggio per valore** quando ad una funzione passiamo una variabile semplice:

```c
// Questo è un passaggio per valore
int sum(int num1, int num2) {
    return num1 + num2;
}

int main() {
    int num1 = 0, num2 = 0;
    // Questo è un passaggio per valore
    int somma = sum(num1, num2);
}
```

Quando passiamo per valore una variabile ad una funzione, in realtà stiamo passando una **copia del valore**.  
Infatti, nel caso in cui nella funzione una variabile venga modificata, tornando al `main` la variabile originale **rimarrà invariata**.

```c
void modifica(int numero) {
    numero = 1;
}

int main() {
    int num1 = 3;
    // Abbiamo passato per valore num1 che è uguale a 3
    modifica(num1);
    // Tornando al main, num1 sarà sempre uguale a 3
}
```

---

### Passaggio per riferimento

Si dice **passaggio per riferimento** quando ad una funzione passiamo l'**indirizzo** di una variabile.  
A differenza del passaggio per valore, quando passiamo una variabile per riferimento ad una funzione, tornando al `main` la variabile **verrà modificata effettivamente**.

```c
void modifica(int *numero) {
    (*numero) = 1;
}

int main() {
    int num1 = 3;
    // Abbiamo passato per riferimento num1 (quindi il suo indirizzo)
    // Valore attuale di num1 = 3
    modifica(&num1);
    // Tornando al main, num1 sarà uguale ad 1!
}
```

> [!IMPORTANT]
> **IMPORTANTE: Per passare un array ad una funzione, ne passiamo l'indirizzo della prima posizione.**

```c
void stampaVettore(int *array) {
    int i;
    for (i = 0; i < 5; i++) {
        printf("%d ", array[i]);
    }
}

int main() {
    int array[5];
    // Zona di codice per riempire l'array...
    
    // Passiamo alla funzione l'indirizzo della prima posizione dell'array in questo modo:
    stampaVettore(array);
}
```

---

## Diversi metodi di modularizzazione

Abbiamo **2 metodi di modularizzazione** (almeno nel corso di Programmazione I ne vediamo solo 2):

### 1. Funzione pre-invocazione
È lo stesso modo che abbiamo usato nell'esempio precedente (non fatemelo riscrivere vi prego 😅).  
Ovvero tutte le funzioni vanno poste **prima** della funzione che le richiama: quindi `stampaMax` va sopra il `main` e `max` va sopra `stampaMax`.

### 2. Dichiarazione del prototipo della funzione
Il prototipo della funzione viene dichiarato **prima di tutto il resto** (in pratica subito dopo le `#include` delle librerie) e successivamente le funzioni vengono implementate **SEGUENDO il prototipo dichiarato**.

```c
#include <stdio.h>

// Dichiarazione delle librerie QUI

// Questi sono i prototipi delle funzioni: definiscono unicamente il tipo del valore
// di ritorno e che tipo di dati va in input alla funzione... e ovviamente il nome della funzione
int max(int num1, int num2);
void stampaMax(int *array);

int main() {
    int array[10] = {1, 2, 3, 9, 12, 65, 8, 22, 34, 0};
    stampaMax(array);
    return 0;
}

// Implementazione delle funzioni dopo il main:

int max(int num1, int num2) {
    if (num1 > num2)
        return num1;
    else
        return num2;
}

void stampaMax(int *array) {
    int i, massimo = 0;
    for (i = 0; i < 10; i++) {
        massimo = max(massimo, array[i]);
    }
    printf("Massimo: %d\n", massimo);
}
```

> [!WARNING]
> ### MODULARIZZARE È IMPORTANTE, VI PREGO FATELO!

---


# Capitolo 12 — Notazione e Convenzioni per le Funzioni

## Notazioni per Funzioni

> [!NOTE]
> 💁‍♂️ Parliamo di funzioni.  
> Ma siccome è troppo strano spiegarlo a parole... ***ESEMPIO MOMENTO***

```c
#include <stdio.h>

// Creo il prototipo di trovaMinimo
int trovaMinimo(int *array, int grandezza);

int main() {
    int vettore[10];
    // Saltiamo la parte di riempimento del vettore...
    
    int min = trovaMinimo(vettore, 10);
    printf("Minimo: %d", min);
    
    return 0;
}

int trovaMinimo(int *array, int grandezza) {
    // Implementazione di trovaMinimo
}
```

Come visto nell'esempio, nel prototipo e nell'implementazione della funzione abbiamo dato un nome diverso alla nostra variabile (`array` invece di `vettore`).

### Come funziona?

1. Dal `main` noi passiamo la nostra variabile `vettore`, che nella nostra funzione (e solo durante tutta la sua esecuzione) verrà ***rinominata*** in `array`.
2. Allo stesso tempo, dal `main` ho passato un valore fisso (sarebbe quel `10`) che all'interno della funzione verrà chiamato `grandezza`.

> [!TIP]
> **Quindi volendo dal `main` potrei passare una variabile chiamata *gianpaolo* e riceverla come *peppe* nei parametri della funzione!**

---

# Capitolo 13 — Introduzione ai Puntatori

Ora entriamo nel vivo della programmazione in C.

## I puntatori

Sono uno degli argomenti che spaventa e confonde di più gli studenti.  
Quindi non c'è modo migliore di spiegarlo se non con... i disegnini (e un pochino di teoria).

Per definirlo bene partiamo da una cosa di cui abbiamo già parlato...

---

## Le variabili

Abbiamo già visto come si crea una variabile (di un tipo qualsiasi):

```c
int variabileBella = 5;
```

#### *Ma cosa succede quando facciamo questa cosa?*
Beh, in realtà molte cose:
1. Prima di tutto, in memoria viene creato un **blocchetto di memoria** in cui viene conservato il valore della variabile (in questo caso `5`).
2. Tutte le variabili che andiamo a creare hanno un proprio cassetto in memoria e ognuna di queste occupa un certo spazio (dipendentemente dal suo tipo: `int`, `char`, `float`, ecc.).
3. Quindi effettivamente, quando chiamiamo una variabile per fare le nostre operazioni, stiamo facendo riferimento ad un blocchetto di memoria.

```
+---------------------------+
|          MEMORIA          |
+---------------------------+
| VAR A                     |
+---------------------------+
| VAR B                     |
+---------------------------+
| VAR C                     |
+---------------------------+
| variabileBella  [  5  ]   |
+---------------------------+
| VAR D                     |
+---------------------------+
```

Persino quando abbiamo visto la funzione `scanf()`, anche se ho detto che lo avrei spiegato più avanti (più avanti è adesso!), inconsapevolmente stavamo sfruttando questo meccanismo della memoria:

```c
scanf("%d", &variabileBella);
```

Quando utilizziamo il `&` stiamo dicendo al C di conservare il valore, che prendiamo da tastiera, ***all'interno dell'indirizzo di memoria di quella variabile***.

---

## Che cazzo è un puntatore?!

Possiamo definirlo in una maniera molto semplice:

> [!IMPORTANT]
> **Un *puntatore* è un tipo di variabile che punta *all'indirizzo* di un'altra variabile.**

Ok, quindi diciamo che vogliamo creare la nostra variabile puntatore e chiamarla `puntatoreEsempio` (sì, avrei potuto usare un nome più corto).

Per adesso è vuota, ma diciamo di volerle dire che da adesso in poi lei deve puntare alla variabile `varC`...

```
+---------------------------+
|          MEMORIA          |
+---------------------------+
| VAR A = 1                 |
+---------------------------+
| VAR B = 2                 |
+---------------------------+
| VAR C = 3       <---------+---\
+---------------------------+   |
| variabileBella = 5        |   | (punta a VAR C)
+---------------------------+   |
| VAR D = 9                 |   |
+---------------------------+   |
| puntatoreEsempio [ &varC ]----+/
+---------------------------+
```

### Come si fa?

```c
// Creiamo la nostra VAR C
int varC = 3;

// Creiamo il nostro puntatore (indicato dal simbolo *)
int *puntatoreEsempio;
```

Ora che abbiamo dichiarato il nostro puntatore e gli abbiamo detto: *"Guarda, tu devi puntare ad una variabile di tipo int"*.  
Ma come gli diciamo **a quale** variabile puntare?

```c
// Creiamo la nostra VAR C
int varC = 3;

// Creiamo il nostro puntatore
int *puntatoreEsempio;

// Diciamo al puntatore di puntare all'indirizzo di varC tramite l'operatore &
puntatoreEsempio = &varC;
```

Fatto questo, il nostro puntatore starà puntando all'indirizzo di memoria di `varC`.  
Questo significa che:

```c
// Creiamo la nostra VAR C
int varC = 3;

// Creiamo il nostro puntatore
int *puntatoreEsempio;

// Diciamo al puntatore di puntare a varC
puntatoreEsempio = &varC;

// Stampiamo varC
printf("%d\n", varC);              // Stamperà 3

// Stampiamo puntatoreEsempio
printf("%p\n", puntatoreEsempio);  // Stamperà L'INDIRIZZO DI MEMORIA di varC
```

Ma non è finita qui! Perché possiamo fare anche questo:

```c
printf("%d\n", *puntatoreEsempio); // Stamperà il VALORE di varC (ovvero 3)
```

Quindi abbiamo già una delle utilità fondamentali dei puntatori: possiamo accedere ad un'altra variabile da un suo puntatore e ogni volta che `varC` cambierà valore, il valore accessibile tramite `*puntatoreEsempio` si aggiornerà.

### Perché?
Perché adesso il nostro `puntatoreEsempio` è, detto in maniera terra terra, collegato allo spazio di memoria di `varC`.  
***Quindi cambiando l'uno, cambierà anche l'altro.***

> [!TIP]
> Quindi sì: se cambiamo il valore puntato (`*puntatoreEsempio = 10;`), allora anche il valore della variabile originale `varC` diventerà `10`!

---

## Notazioni importanti

Come hai potuto leggere prima, ho associato dei simboli e delle parole particolari al linguaggio C. Ecco la tabella di riepilogo fondamentale:

| A parole | Notazione | Utilizzo |
| :--- | :---: | :--- |
| **Indirizzo di una variabile** | `&variabile` | Serve per ottenere / accedere all'indirizzo di memoria di una variabile. |
| **Valore puntato da un puntatore** (dereferenziazione) | `*puntatore` | Serve per ottenere/modificare il **VALORE** della variabile a cui sta puntando il puntatore (nel caso precedente sarebbe il valore `3` di `varC`). |
| **Indirizzo a cui punta il puntatore** | `puntatore` | Serve per ottenere l'**INDIRIZZO** di memoria della variabile a cui sta puntando il puntatore. |
| **Indirizzo del puntatore stesso** | `&puntatore` | Esattamente come l'indirizzo di una variabile normale, serve per ottenere l'indirizzo di memoria occupato **DAL PUNTATORE STESSO** nello Stack. |

---
---


# Capitolo 14 — Puntatori Avanzati e Passaggio per Riferimento

## Puntatori 2 — Gestione della memoria

### A cosa serve la gestione della memoria?

Come abbiamo visto nella sezione precedente, i puntatori ci permettono di puntare a delle variabili.  
Ma iniziamo ad essere un pochino più specifici: *in realtà i puntatori puntano ad uno spazio di memoria*.

Quindi cosa succede se permettessi alla memoria di espandersi in modo da ospitare il contenuto di un puntatore?  
È più o meno il motivo per cui la gestione dinamica della memoria ci è così utile con i puntatori. Vediamo un esempio pratico:

- Mettiamo caso di dover utilizzare un array.
- Però **non sappiamo quanto sarà grande l'array** fino a quando non ce lo dirà l'utente a runtime.
- E **non abbiamo una grandezza massima fissata a priori**.

Allora dovremo dire al sistema operativo di darci il giusto quantitativo di memoria in modo da contenere l'esatto numero di dati inseriti.  
***Questo meccanismo è detto allocazione dinamica.***

```c
// 1. Dichiariamo il nostro array come un puntatore ad intero
int *array;

// 2. Chiediamo all'utente la grandezza
int grandezza = 0;
printf("Inserisci la dimensione dell'array: ");
scanf("%d", &grandezza);

// 3. Allocazione dinamica della memoria
array = (int *)malloc(grandezza * sizeof(int));
```

Ora il nostro array ha lo spazio contiguo necessario per poter conservare i nostri dati.

---

### Perché `sizeof(int)`?

Perché dobbiamo **specificare alla funzione di allocazione che tipo di dato stiamo andando ad allocare**.  
Il motivo è molto semplice: ogni tipo di dato ha un peso differente in byte nella memoria (un `char` pesa 1 byte, un `int` di solito 4 byte, un `double` 8 byte).  
Quindi quando allochiamo dobbiamo specificare non solo **quanti elementi** vogliamo allocare, ma anche **la dimensione in byte del singolo elemento** (`grandezza * sizeof(tipo)`).

---

### Cosa è la `malloc()`?

La `malloc()` (*Memory Allocation*) è una funzione della libreria standard `<stdlib.h>` che, insieme a `calloc()`, `realloc()` e `free()`, si occupa della gestione della memoria heap in C.

---

### Qual è la differenza tra `malloc()`, `calloc()`, `realloc()` e `free()`?

#### 1. `malloc()`
Prende in input la grandezza totale in byte (numero elementi moltiplicato per il peso del tipo di dato).  
*Non inizializza la memoria allocata* (i byte contengono valori spazzatura preesistenti).

```c
int *cose = malloc(grandezza * sizeof(int));
```

#### 2. `calloc()`
Prende in input due parametri separati: il numero di elementi e la dimensione del singolo tipo. Non richiede l'esplicitazione della moltiplicazione con `*`.  
*La differenza più importante:* la `calloc()` **INIZIALIZZA TUTTI I BYTE A ZERO**.

```c
int *cose = calloc(grandezza, sizeof(int)); // È la virgola che ti fotte 😉
```

#### 3. `realloc()`
Viene utilizzata per **ridimensionare** (espandere o ridurre) un blocco di memoria precedentemente allocato.  
Prende in input il puntatore alla memoria da riallocare e la nuova dimensione totale in byte.

```c
int *cose = malloc(10 * sizeof(int));

// Mi rendo conto che mi serve uno slot in più:
cose = realloc(cose, 11 * sizeof(int));
```

#### 4. `free()`
Viene utilizzata per **liberare lo spazio in memoria** heap occupato dalla variabile allocata quando non serve più. Prende in input il puntatore.

> [!IMPORTANT]
> **IMPORTANTE:** È fondamentale usare `free()` appena abbiamo finito di usare la memoria allocata per evitare *Memory Leak* che rallentano l'esecuzione e saturano la RAM.

```c
int *cose = malloc(10 * sizeof(int));

// Ho finito di usare 'cose', lo libero:
free(cose);
```

---

## Utilizzo dei puntatori per le stringhe

L'allocazione dinamica accoppiata ai puntatori porta enormi vantaggi nella gestione delle stringhe (che in C sono array di caratteri terminati da `\0`).  
Possiamo definire e allocare l'esatta quantità di memoria per ogni stringa in modo dinamico:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // Alloca dinamicamente una stringa di 20 caratteri
    char *stringa = malloc(20 * sizeof(char));
    
    // Inseriamo la stringa all'interno della memoria allocata
    strcpy(stringa, "Esempio");
    
    printf("%s\n", stringa);
    
    free(stringa);
    return 0;
}
```

---

### Quick Tip: Acquisizione dinamica di stringhe da tastiera

Nel caso in cui dobbiamo prendere in input da tastiera stringhe di lunghezza variabile e vogliamo allocarle dinamicamente con l'esatta dimensione, possiamo sfruttare un buffer statico temporaneo:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // Usiamo una stringa temporanea allocata staticamente come buffer d'appoggio
    char temp[100];
    char *nome, *cognome, *nickname;
    
    // 1. Acquisizione Nome
    printf("Inserisci nome: ");
    scanf("%s", temp);
    // strlen(temp) + 1 serve per includere anche il terminatore '\0'
    nome = malloc((strlen(temp) + 1) * sizeof(char));
    strcpy(nome, temp);
    
    // 2. Acquisizione Cognome
    printf("Inserisci cognome: ");
    scanf("%s", temp);
    cognome = malloc((strlen(temp) + 1) * sizeof(char));
    strcpy(cognome, temp);
    
    // 3. Acquisizione Nickname
    printf("Inserisci nickname: ");
    scanf("%s", temp);
    nickname = malloc((strlen(temp) + 1) * sizeof(char));
    strcpy(nickname, temp);
    
    printf("Dati: %s %s (%s)\n", nome, cognome, nickname);
    
    // Liberiamo la memoria alla fine
    free(nome);
    free(cognome);
    free(nickname);
    
    return 0;
}
```

> [!IMPORTANT]
> ### IMPORTANTE: Memoria contigua
> Quando viene allocato un blocco di memoria con `malloc` o `calloc`, lo spazio viene riservato in maniera **strettamente contigua** (consecutiva).  
> Quindi in un array di 5 elementi, tutti gli elementi si trovano fisicamente uno dopo l'altro in RAM.

---
---

# Capitolo 15 — Parametri da Riga di Comando (argc, argv)

## `argc` e `*argv[]`

Avete presente quando negli esempi scritti fino ad ora dichiaravamo il `main` semplicemente così?

```c
int main() {
    // Implementazione
    return 0;
}
```

Perfetto...

### Non è solo così!

Perché, in realtà, la firma completa dello standard C prevede:

```c
int main(int argc, char *argv[]) {
    // Implementazione
    return 0;
}
```

Mo...

### Che cazzo so sti mostri?

Una cosa alla volta:
- `int argc` (*Argument Count*): è, detto terra terra, il **numero di parametri** passati al programma da riga di comando (incluso il nome dell'eseguibile stesso, quindi `argc >= 1`).
- `char *argv[]` (*Argument Vector*): è un **array di stringhe** contenente i singoli parametri passati in input.

Entrambi i valori vengono passati dalla shell / riga di comando al momento del lancio dell'eseguibile:
```bash
./mioProgramma parametro1 parametro2 file.txt
```
In questo esempio:
- `argc` vale `4`
- `argv[0]` = `"./mioProgramma"`
- `argv[1]` = `"parametro1"`
- `argv[2]` = `"parametro2"`
- `argv[3]` = `"file.txt"`

---

### Ok, ma a che pro?

Questa funzionalità è fondamentale quando vogliamo passare parametri di configurazione al programma **sin dall'avvio**, ad esempio:
- Il nome o il percorso di un file da aprire ed elaborare.
- Flag e opzioni di esecuzione (`-v`, `-h`, `--output`).
- Dati iniziali su cui lavorare senza dover fare delle `scanf()` interattive.

> [!NOTE]
> Ci torneremo presto nel capitolo dedicato ai file e alle utility avanzate... *per ora sappiate che esistono!* 😈

---

# Capitolo 16 — Strutture Dati (struct)

## Strutture

> [!NOTE]
> **Una *struttura* è un insieme di dati *non omogeneo*.**  
> Al contrario degli array (che contengono dati tutti dello stesso tipo), le strutture possono raggruppare variabili di tipi differenti (`int`, `char`, `float`, puntatori, array, ecc.).

---

## Come si definisce una struttura

Una struttura può essere definita principalmente in **2 modi**:

```c
// Metodo 1: Definizione classica con tag struct
struct Persona {
    char nome[50];
    char cognome[50];
    int anni;
};

// Metodo 2: Definizione con typedef (creazione di un alias di tipo)
typedef struct Persona {
    char nome[50];
    char cognome[50];
    int anni;
} Persona;
```

Come possiamo vedere sono molto simili, ma hanno una differenza sostanziale nell'utilizzo:

#### Con il Metodo 1:
Per istanziare una variabile di tipo struttura nel `main` dobbiamo ripetere la parola chiave `struct`:
```c
struct Persona {
    char nome[50];
    char cognome[50];
    int anni;
};

int main() {
    struct Persona struttura;
}
```

#### Con il Metodo 2 (`typedef`):
Possiamo usare direttamente l'identificatore `Persona` come un vero e proprio tipo nativo:
```c
typedef struct Persona {
    char nome[50];
    char cognome[50];
    int anni;
} Persona;

int main() {
    Persona struttura; // Molto più comodo e pulito!
}
```

### Perché succede questo?
Utilizzando la parola chiave `typedef`, stiamo dicendo al compilatore C di associare un nuovo nome di tipo (`Persona`) a quella specifica definizione. In questo modo non dobbiamo più anteporre `struct` ad ogni dichiarazione di variabile.

---

## Come accedere e utilizzare una struttura

Per accedere ai singoli campi di una variabile struttura istanziata staticamente si utilizza la **notazione punto (`.`)**:

```c
#include <stdio.h>
#include <string.h>

typedef struct Persona {
    char nome[50];
    char cognome[50];
    int anni;
} Persona;

int main() {
    Persona peppe;
    
    strcpy(peppe.nome, "Peppe");
    strcpy(peppe.cognome, "P");
    peppe.anni = 6;
    
    printf("%s %s %d\n", peppe.nome, peppe.cognome, peppe.anni);
    return 0;
}
```

---

## Cosa succede se abbiamo un puntatore a struttura?

Quando lavoriamo con un **puntatore ad una struttura**, dobbiamo:
1. Allocare la memoria per la struttura stessa tramite `malloc()`.
2. Utilizzare l'operatore freccia (`->`) al posto del punto (`.`) per accedere ai campi!

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Persona {
    char nome[50];
    char cognome[50];
    int anni;
} Persona;

int main() {
    // 1. Dichiarazione puntatore a struttura
    Persona *peppe;
    
    // 2. Allocazione dinamica della memoria per l'intera struttura
    peppe = malloc(sizeof(Persona));
    
    // 3. Accesso ai campi tramite l'operatore freccia (->)
    strcpy(peppe->nome, "Peppe");
    strcpy(peppe->cognome, "P");
    peppe->anni = 6;
    
    printf("%s %s %d\n", peppe->nome, peppe->cognome, peppe->anni);
    
    // 4. Liberazione della memoria
    free(peppe);
    
    return 0;
}
```

> [!IMPORTANT]
> **Ricordate sempre di de-allocare (`free`) la struttura allocata dinamicamente alla fine del programma!**

---

## Cosa succede se all'interno di una struttura abbiamo dei puntatori?

Se i campi interni della struttura sono a loro volta dei puntatori (ad esempio stringhe dinamiche), l'ordine di allocazione e deallocazione è fondamentale:
- **Allocazione:** prima si alloca la struttura principale, poi si allocano i singoli puntatori interni.
- **Deallocazione:** prima si liberano i campi puntatore interni, e per ultimo si libera la struttura contenitore!

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Persona {
    char *nome;
    char *cognome;
    int anni;
} Persona;

int main() {
    Persona *peppe;
    
    // 1. Allocazione della struttura contenitore
    peppe = malloc(sizeof(Persona));
    
    // 2. Allocazione dei singoli campi puntatore interni
    peppe->nome = malloc(sizeof(char) * 50);
    peppe->cognome = malloc(sizeof(char) * 50);
    
    strcpy(peppe->nome, "Peppe");
    strcpy(peppe->cognome, "P");
    peppe->anni = 6;
    
    printf("%s %s %d\n", peppe->nome, peppe->cognome, peppe->anni);
    
    // 3. Deallocazione nell'ordine corretto (prima l'interno, poi l'esterno)
    free(peppe->nome);
    free(peppe->cognome);
    free(peppe);
    
    return 0;
}
```

---

## Struttura con array interno allocato dinamicamente

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Persona {
    char nome[50];
    char cognome[50];
    int *array;
} Persona;

int main() {
    Persona *peppe;
    int i;
    
    peppe = malloc(sizeof(Persona));
    peppe->array = malloc(sizeof(int) * 10);
    
    peppe->array[0] = 15; // Aggiunta in posizione 0
    peppe->array[1] = 12; // Aggiunta in posizione 1
    peppe->array[2] = 19; // Aggiunta in posizione 2
    
    strcpy(peppe->nome, "Peppe");
    strcpy(peppe->cognome, "P");
    
    printf("%s %s\n", peppe->nome, peppe->cognome);
    for (i = 0; i < 3; i++) {
        printf("Array[%d] = %d\n", i, peppe->array[i]);
    }
    
    free(peppe->array);
    free(peppe);
    return 0;
}
```

---

## Array di strutture allocate dinamicamente

Ultimo caso poi la smetto, giuro 😅

Quando vogliamo gestire una collezione di strutture (un vero e proprio database in memoria):

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Persona {
    char nome[50];
    char cognome[50];
    int array[10];
} Persona;

int main() {
    Persona *peppe; // peppe è un puntatore che farà da array dinamico di strutture
    int i, j;
    
    // Allochiamo memoria per 10 strutture Persona contigue
    peppe = malloc(sizeof(Persona) * 10);
    
    for (i = 0; i < 10; i++) {
        strcpy(peppe[i].nome, "Peppe");
        strcpy(peppe[i].cognome, "P");
        for (j = 0; j < 10; j++) {
            peppe[i].array[j] = j * 2;
        }
    }
    
    // Utilizzo dei dati...
    
    free(peppe);
    return 0;
}
```

---

# Capitolo 17 — Gestione dei File in C

Prima di tutto, impariamo:

## Che cazzo è un file?

> [!NOTE]
> 📝 Un file è letteralmente un "contenitore" di dati persistente memorizzato su disco. Dall'accesso a questi file possiamo leggere e scrivere informazioni che rimangono salvate anche dopo la chiusura del programma.

Volendo essere un pochino più tecnici, introduciamo la definizione di **stream (flussi)**:

> ‼️ *Un file è un tipo di stream, ma (SPOILER) lo vedrai in PSD* ‼️

> [!NOTE]
> 🔍 In C, uno **stream** (o una stream, come cazzo la vuoi chiamare tu) è una **sorgente di input** o una **destinazione di output**.  
> Gli stream rappresentano canali di comunicazione verso dispositivi fisici o file memorizzati su memoria di massa.
> 
> Abbiamo già visto come la `scanf()` accedeva allo standard input stream (`stdin`, da tastiera) e la `printf()` stampava a video tramite lo standard output stream (`stdout`).

---

## Apertura e chiusura dei file in C

La gestione dei file in C è uniforme: i file vengono aperti con la funzione `fopen()` che restituisce un puntatore a struttura `FILE *`.

```c
FILE *f = fopen("nomefile", "modalità_di_apertura");
```

Dobbiamo distinguere **2 tipologie di file**:
1. **File di testo** (`.txt`, `.csv`, ecc.)
2. **File binari** (`.bin`, `.dat`, o senza estensione)

---

### Tabella delle modalità di apertura

#### File di Testo:
| Modalità | Significato | Comportamento se il file esiste | Comportamento se non esiste |
| :---: | :--- | :--- | :--- |
| `r` | Sola lettura | Apre per leggere dall'inizio | **ERRORE** (restituisce `NULL`) |
| `r+` | Lettura e Scrittura | Apre senza cancellare il contenuto | **ERRORE** (restituisce `NULL`) |
| `w` | Sola scrittura | **Cancella tutto il contenuto preesistente** | **Crea un nuovo file** |
| `w+` | Lettura e Scrittura | **Cancella tutto il contenuto preesistente** | **Crea un nuovo file** |
| `a` | Scrittura in accodamento (*append*) | Scrive solo alla fine del file | **Crea un nuovo file** |
| `a+` | Lettura e Accodamento | Scrive alla fine, legge dall'inizio | **Crea un nuovo file** |

#### File Binari:
Per i file binari le modalità sono identiche, basta aggiungere una **`b`** alla modalità:
`rb`, `wb`, `ab`, `r+b` (o `rb+`), `w+b` (o `wb+`), `a+b` (o `ab+`).

> *Quindi, nella pratica, sono quasi uguali ma nei binari ci vuole la `b` vicino* 🤣

---

### Chiusura del file con `fclose()`

```c
FILE *peppe = fopen("peppe.txt", "r");
// Operazioni sul file...
fclose(peppe);
```

> [!WARNING]
> Così come per la memoria dinamica (`free`), ogni volta che terminiamo di operare con un file **è obbligatorio chiuderlo con `fclose()`** per flushare i buffer su disco e rilasciare il descrittore di file al sistema operativo.

---

## Scrivere in un file

### 1. Scrivere su un file di testo (`fprintf`)
La funzione `fprintf()` funziona esattamente come `printf()`, ma accetta come primo parametro il puntatore al file (`FILE *`):

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int num;
    
    // Apriamo il file in sola scrittura
    FILE *f = fopen("percorsoDelFile.txt", "w");
    
    // Controllo obbligatorio sull'apertura del file
    if (f == NULL) {
        printf("ERRORE nell'apertura del file!\n");
        return 1;
    }
    
    printf("Dammi il numero da scrivere sul file: ");
    scanf("%d", &num);
    
    // Scriviamo sul file f
    fprintf(f, "%d\n", num);
    
    // CHIUDIAMO IL FILE
    fclose(f);
    return 0;
}
```

---

### 2. Scrivere su un file binario (`fwrite`)
La funzione `fwrite()` scrive blocchi di byte raw direttamente in memoria di massa.  
Parametri di `fwrite()`:
1. Indirizzo della variabile da scrivere (`&variabile`)
2. `sizeof()` del singolo elemento
3. Numero di elementi da scrivere
4. Puntatore al file `FILE *`

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int num;
    
    // Apriamo il file in scrittura binaria
    FILE *f = fopen("percorsoDelFile.bin", "wb");
    
    if (f == NULL) {
        printf("ERRORE\n");
        return 1;
    }
    
    printf("Dammi il numero da scrivere sul file: ");
    scanf("%d", &num);
    
    // Scrittura binaria diretta dei byte
    fwrite(&num, sizeof(int), 1, f);
    
    fclose(f);
    return 0;
}
```

---

## Leggere da un file

> [!NOTE]
> Quando si legge un file in C, possiamo immaginare che la posizione corrente sia indicata da una **puntina / cursore interno**.  
> Man mano che leggiamo, la puntina avanza fino ad arrivare alla fine del file (**`EOF` - End Of File**).  
> Per riportare la puntina all'inizio del file si può usare la funzione `rewind(filePtr);`.

---

### 1. Leggere da un file di testo (`fscanf`)

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int num;
    FILE *peppe;
    
    if ((peppe = fopen("percorsoDelFile.txt", "r")) == NULL) {
        printf("Errore nell'apertura del file\n");
        return 1;
    }
    
    // Leggiamo un intero formattato dal file
    fscanf(peppe, "%d", &num);
    printf("Value of n = %d\n", num);
    
    fclose(peppe);
    return 0;
}
```

---

### 2. Leggere da un file binario (`fread`)

Parametri di `fread()`:
1. Indirizzo del buffer dove salvare i dati letti (`&variabile`)
2. `sizeof()` del tipo di dato
3. Quantità di elementi da leggere
4. Puntatore al file `FILE *`

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int numero;
    FILE *peppe;
    
    if ((peppe = fopen("percorsoDelFile.bin", "rb")) == NULL) {
        printf("ERRORE nell'apertura del file binario\n");
        return 1;
    }
    
    // Lettura del blocco binario
    fread(&numero, sizeof(int), 1, peppe);
    printf("Numero letto: %d\n", numero);
    
    fclose(peppe);
    return 0;
}
```

---

# Capitolo 18 — Allocazione Dinamica della Memoria e Argomenti Avanzati

## Puntatori Avanzati

Per quanto riguarda i puntatori... **NON ABBIAMO ANCORA FINITO.**  
Ora vedremo una notazione particolare e dei casi specifici di livello avanzato.

---

## Notazione puntatore per vettori

Quando abbiamo un caso come questo:

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Utilizziamo malloc per definire un vettore di interi come puntatore
    int *vettore = malloc(5 * sizeof(int));
    int i;
    
    // Vogliamo inserire nel nostro vettore gli elementi: 4 - 9 - 1 - 5 - 3
    // Usiamo la NOTAZIONE PUNTATORE per l'acquisizione:
    for (i = 0; i < 5; i++) {
        scanf("%d", (vettore + i)); // Equivalente a scrivere &vettore[i]
    }
    
    // E per la stampa:
    for (i = 0; i < 5; i++) {
        printf("%d ", *(vettore + i)); // Equivalente a scrivere vettore[i]
    }
    
    free(vettore);
    return 0;
}
```

### Quindi cosa è questa notazione? Perché si usa?
Questa sintassi è detta **notazione puntatore** (o aritmetica dei puntatori).  
La differenza rispetto alla classica notazione con parentesi quadre `vettore[i]` è... ***Nessuna! Sono perfettamente equivalenti.***

*(Devo spiegarlo al solo fine dell'esame, in quanto potrebbe essere espressamente richiesto dal professore di usare la notazione puntatore al posto di quella con parentesi quadre).*

### Come funziona sotto il cofano?
Poiché la memoria allocata è **strettamente contigua**:
- `vettore` rappresenta l'indirizzo base del primo elemento (posizione 0).
- `(vettore + i)` calcola l'indirizzo di memoria dell'elemento all'indice `i` (spostandosi di `i * sizeof(tipo)` byte in memoria).
- `*(vettore + i)` accede al valore memorizzato a quell'indirizzo.

---

## Puntatori a puntatori (`tipo **`)

Ebbene sì, esistono anche questi mostri. Sono difficili da gestire? Un pochino, ma ora li vediamo passo dopo passo.

Il caso più comune è quello di un **array dinamico di puntatori** (es. matrici dinamiche frastagliate o array di stringhe):

```c
// Dichiariamo il nostro array di puntatori ad intero
int **array;

// Allochiamo al nostro array lo spazio per 10 PUNTATORI di interi
// N.B. All'interno della sizeof() bisogna specificare sizeof(int*) perché
// un puntatore ha una dimensione in byte diversa rispetto a un semplice intero!
array = malloc(10 * sizeof(int*));
```

---

### Un array che contiene altri array? 🤔

***SFORTUNATAMENTE SÌ.***  
Ogni cassetto della nostra cassettiera principale conterrà al suo interno un'altra cassettiera.  
*Inception spostati.*

```
Array Principale (int**)
+---------+---------+---------+---------+---------+
| array[0]| array[1]| array[2]| array[3]| array[4]|
+----+----+----+----+----+----+----+----+----+----+
     |         |         |         |         |
     v         v         v         v         v
   +---+     +---+     +---+     +---+     +---+
   | * |     | * |     | * |     | * |     | * |
   +---+     +---+     +---+     +---+     +---+
   | * |     | * |     | * |     | * |     | * |
   +---+     +---+     +---+     +---+     +---+
             | * |     | * |     | * |
             +---+     +---+     +---+
                                 | * |
                                 +---+
```

Ogni sotto-array può avere una dimensione differente (matrice irregolare o *ragged array*).  
L'unico vincolo è che tutti gli elementi finali devono essere dello stesso tipo base.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int **inception;
    int righe = 10;
    int colonne = 5;
    int i, j;
    
    // 1. Alloco l'array di puntatori
    inception = malloc(righe * sizeof(int*));
    
    // 2. Per ogni riga, alloco il relativo sotto-array di interi
    for (i = 0; i < righe; i++) {
        inception[i] = malloc(colonne * sizeof(int));
    }
    
    // 3. Accesso come una classica matrice bidimensionale
    for (i = 0; i < righe; i++) {
        for (j = 0; j < colonne; j++) {
            inception[i][j] = i + j;
            printf("%d\t", inception[i][j]);
        }
        printf("\n");
    }
    
    // 4. Deallocazione: prima i sotto-array, poi l'array principale!
    for (i = 0; i < righe; i++) {
        free(inception[i]);
    }
    free(inception);
    
    return 0;
}
```

---

## Array di stringhe dinamico (`char **`)

Un caso pratico tipico è un array di stringhe, dove ogni cella contiene una parola di lunghezza arbitraria:

```
+-----------+-----------+-----------+-----------+-----------+
|  array[0] |  array[1] |  array[2] |  array[3] |  array[4] |
+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
      |           |           |           |           |
      v           v           v           v           v
    "RE"      "CIALDA"     "PALLA"      "NEO"      "PESTO"
```

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    char **array;
    // (Ipotizziamo che l'array sia già allocato e riempito...)
    
    // 1. Valore del primo carattere della terza parola (indice 2):
    char primoCarattere = *array[2];     // Conterrà 'P' (di "PALLA")
    
    // 2. Puntatore all'intera terza parola:
    char *terzaStringa = array[2];       // Conterrà "PALLA"
    
    // 3. Terzo carattere della terza parola:
    char terzoCarattere = array[2][2];   // Conterrà 'L' (il terzo carattere di "PALLA")
    
    return 0;
}
```

---

## Array di puntatori a struttura

Mettiamo caso di avere una struttura persona e un array di puntatori a struttura:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Persona {
    char *nome;
    char *cognome;
    int eta;
} Persona;

int main() {
    // Array statico di 20 puntatori a Persona
    Persona *array[20];
    
    // Allochiamo la singola persona per la prima cella
    array[0] = malloc(sizeof(Persona));
    array[0]->nome = malloc(50 * sizeof(char));
    array[0]->cognome = malloc(50 * sizeof(char));
    
    strcpy(array[0]->nome, "Peppe");
    strcpy(array[0]->cognome, "P");
    array[0]->eta = 22;
    
    // Accesso con l'operatore freccia ->
    printf("%s %s %d\n", array[0]->nome, array[0]->cognome, array[0]->eta);
    
    // Deallocazione
    free(array[0]->nome);
    free(array[0]->cognome);
    free(array[0]);
    
    return 0;
}
```

---

## Una piccola precisazione sul tipo `*array[]`

Quando scriviamo `*array[]` nei parametri o nelle dichiarazioni ci possiamo riferire a:
1. Un **array di puntatori** (come nell'esempio precedente `Persona *array[]`).
2. Un **vettore di vettori** (dove il `*` rappresenta l'allocazione dinamica di ciascuna riga).

> [!TIP]
> E volendo potremmo anche scrivere `**array`: ha i medesimi significati operativi, **MA in più gli viene associato il significato formale di puntatore a puntatore di variabile.**

---

# Capitolo 19 — Commenti e Documentazione

## Commenti per "Documentare"

> [!NOTE]
> 👨‍💻 Quando si scrive un codice di grandi dimensioni è molto facile perdersi tra le funzioni e le variabili.
> 
> Un buon modo per non perdersi nel codice è quello di *commentare blocchi di linee di codice in modo da riassumere cosa si sta facendo e perché.*
> 
> Oltre a questo, commentare il codice in una maniera chiara e spiegando i passi logici *aiuta se stessi, e gli altri* che leggono il nostro codice, *ad una comprensione maggiore del problema e alle soluzioni trovate/alle possibili soluzioni.*
> 
> Senza esagerare ovviamente, non vogliamo che ci siano 60 righe di commento in una funzione di 3 righe 😅

Ovviamente, in ambito universitario o comunque nell'ambito di un esame non ci si aspetta di "Documentare" il codice (scanso esplicita richiesta del professore).
Nonostante ciò, in ambiti progettuali o comunque in ambiti di esercitazione è buona norma "Documentare".

E utilizzo " $\leftarrow$ i doppi apici per dire documentare perché vedrete più avanti la vera documentazione come è strutturata...non mi veniva una parola migliore di documentazione 🥱.

Facciamo un esempio di quanto detto:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Funzione ricercaMinimo: cerca l'elemento minimo all'interno di un array
   Input: un array e la sua grandezza
   Output: il minimo nell'array */
int ricercaMinimo(int *array, int grandezza) {
    /* Dichiaro il minimo come min e lo inizializzo alla prima posizione dell'array */
    int i, min = array[0];

    /* Cerco il minimo scorrendo l'array */
    for(i = 0; i < grandezza; i++) {
        //Se il valore nella posizione corrente è minore di quello di min lo sostituisce
        if(array[i] < min) {
            min = array[i];
        }
    }
    return min;
}

int main() {
    //Dichiaro un array di massimo 10 posizioni
    int array[10], i;

    printf("Riempire l'array");

    //Scorro tutto l'array per riempirlo
    for(i = 0; i < 10; i++) {
        scanf("%d", &array[i]);
    }

    //Stampo il risultato della funzione minimo
    printf("Il minimo dell'array è -> %d", ricercaMinimo(array, 10));

    return 0;
}
```

---