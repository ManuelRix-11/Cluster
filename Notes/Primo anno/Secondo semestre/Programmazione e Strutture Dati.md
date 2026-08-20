# Programmazione e Strutture Dati

> **Autore:** Emanuele Ragozzini

## Indice dei Contenuti

- [1. Fasi di Sviluppo](#1-fasi-di-sviluppo)
  - [1.1 Analisi](#11-analisi)
  - [1.2 Progettazione](#12-progettazione)
  - [1.3 Implementazione](#13-implementazione)
  - [Sunto: Fasi di Sviluppo](#sunto-fasi-di-sviluppo)
- [2. Testing del Software](#2-testing-del-software)
  - [2.1 Black-Box Testing e White-Box Testing](#21-black-box-testing-e-white-box-testing)
  - [2.2 Strategie di Testing: Big-Bang e Incrementale](#22-strategie-di-testing-big-bang-e-incrementale)
  - [2.3 Approccio Bottom-Up](#23-approccio-bottom-up)
  - [2.4 Il Testing in Pratica](#24-il-testing-in-pratica)
  - [Sunto: Il Testing](#sunto-il-testing)
- [3. ADT (Tipi di Dati Astratti)](#3-adt-tipi-di-dati-astratti)
  - [3.1 Analisi Specifica](#31-analisi-specifica)
  - [3.2 Esempio: ADT Punto](#32-esempio-adt-punto)
  - [3.3 Implementazione in C (Information Hiding)](#33-implementazione-in-c-information-hiding)
  - [Sunto: ADT](#sunto-adt)
- [4. Strutture Dati](#4-strutture-dati)
  - [4.1 Categorie Principali](#41-categorie-principali)
  - [4.2 Caratteristiche di Classificazione](#42-caratteristiche-di-classificazione)
  - [Sunto: Strutture Dati](#sunto-strutture-dati)
- [5. Generics (Tipo Item)](#5-generics-tipo-item)
  - [5.1 Interfaccia Pubblica dell'Item](#51-interfaccia-pubblica-dellitem)
  - [5.2 Implementazione Concreta con Interi](#52-implementazione-concreta-con-interi)
  - [5.3 Implementazione Concreta con Stringhe](#53-implementazione-concreta-con-stringhe)
  - [Sunto: Tipo Item](#sunto-tipo-item)
- [6. ADT Lista](#6-adt-lista)
  - [6.1 Lista VS Array](#61-lista-vs-array)
  - [6.2 Struttura del Nodo](#62-struttura-del-nodo)
  - [6.3 Specifica Formale (Sintattica e Semantica)](#63-specifica-formale-sintattica-e-semantica)
  - [6.4 Operazione: Inserimento in testa (addHead)](#64-operazione-inserimento-in-testa-addhead)
  - [6.5 Operazione: Rimozione in testa (removeHead)](#65-operazione-rimozione-in-testa-removehead)
  - [6.6 Operazione: Inserimento in posizione (addListPos)](#66-operazione-inserimento-in-posizione-addlistpos)
  - [6.7 Operazione: Rimozione in posizione (removeListPos)](#67-operazione-rimozione-in-posizione-removelistpos)
  - [6.8 Implementazione Completa](#68-implementazione-completa)
  - [Sunto: ADT Lista](#sunto-adt-lista)
- [7. ADT Stack](#7-adt-stack)
  - [7.1 Operazioni Base (Specifica Sintattica e Semantica)](#71-operazioni-base-specifica-sintattica-e-semantica)
  - [7.2 Operazione: Push](#72-operazione-push)
  - [7.3 Operazione: Pop](#73-operazione-pop)
  - [7.4 Implementazione tramite ADT Lista](#74-implementazione-tramite-adt-lista)
  - [7.5 Implementazione tramite Array](#75-implementazione-tramite-array)
  - [Sunto: ADT Stack](#sunto-adt-stack)
- [8. ADT Queue](#8-adt-queue)
  - [8.1 Operazioni Base (Specifica Sintattica e Semantica)](#81-operazioni-base-specifica-sintattica-e-semantica)
  - [8.2 Operazione: Enqueue](#82-operazione-enqueue)
  - [8.3 Operazione: Dequeue](#83-operazione-dequeue)
  - [8.4 Implementazione tramite ADT Lista](#84-implementazione-tramite-adt-lista)
  - [8.5 Implementazione tramite Array Circolare](#85-implementazione-tramite-array-circolare)
  - [Sunto: ADT Queue](#sunto-adt-queue)
- [9. ADT BTree (o Alberi binari)](#9-adt-btree-o-alberi-binari)
  - [9.1 Proprietà fondamentali degli alberi](#91-proprieta-fondamentali-degli-alberi)
  - [9.2 Specifica Formale (Sintattica e Semantica)](#92-specifica-formale-sintattica-e-semantica)
  - [9.3 Visite degli Alberi](#93-visite-degli-alberi)
  - [9.4 Costruzione dell'Albero](#94-costruzione-dellalbero)
  - [9.5 Implementazione Completa](#95-implementazione-completa)
  - [Sunto: ADT BTree](#sunto-adt-btree)
- [10. ADT BST (o Alberi Binari di Ricerca)](#10-adt-bst-o-alberi-binari-di-ricerca)
  - [10.1 Caratteristiche Principali](#101-caratteristiche-principali)
  - [10.2 Specifica Formale (Sintattica e Semantica)](#102-specifica-formale-sintattica-e-semantica)
  - [10.3 Ricerca di un elemento (search)](#103-ricerca-di-un-elemento-search)
  - [10.4 Inserimento di un elemento (insert)](#104-inserimento-di-un-elemento-insert)
  - [10.5 Eliminazione di un elemento (delete)](#105-eliminazione-di-un-elemento-delete)
  - [10.6 Implementazione Completa](#106-implementazione-completa)
  - [Sunto: ADT BST](#sunto-adt-bst)
- [11. ADT HashTable (o Tabelle Hash)](#11-adt-hashtable-o-tabelle-hash)
  - [11.1 Definizioni Fondamentali](#111-definizioni-fondamentali)
  - [11.2 HT ad Indirizzamento Diretto](#112-ht-ad-indirizzamento-diretto)
  - [11.3 Metodo Hash e Collisioni](#113-metodo-hash-e-collisioni)
  - [11.4 Come si risolvono le collisioni?](#114-come-si-risolvono-le-collisioni)
  - [11.5 Le Funzioni Hash](#115-le-funzioni-hash)
  - [11.6 Operazioni di Base](#116-operazioni-di-base)
  - [11.7 Implementazione in C](#117-implementazione-in-c)
  - [Sunto: ADT HashTable](#sunto-adt-hashtable)
- [12. Bubble Sort](#12-bubble-sort)
  - [Sunto: Bubble Sort](#sunto-bubble-sort)
- [13. Selection Sort](#13-selection-sort)
  - [Sunto: Selection Sort](#sunto-selection-sort)
- [14. Insertion Sort](#14-insertion-sort)
  - [14.1 Esempio di esecuzione](#141-esempio-di-esecuzione)
  - [Sunto: Insertion Sort](#sunto-insertion-sort)
- [15. Merge Sort](#15-merge-sort)
  - [15.1 Esempio di esecuzione: Fase di Divisione](#151-esempio-di-esecuzione-fase-di-divisione)
  - [15.2 Esempio di esecuzione: Fase di Unione (Merge)](#152-esempio-di-esecuzione-fase-di-unione-merge)
  - [Sunto: Merge Sort](#sunto-merge-sort)
- [16. Quick Sort](#16-quick-sort)
  - [16.1 La Funzione di Partizionamento](#161-la-funzione-di-partizionamento)
  - [Sunto: Quick Sort](#sunto-quick-sort)
- [17. Complessità Computazionale](#17-complessita-computazionale)
  - [Sunto: Complessità Computazionale](#sunto-complessita-computazionale)
- [18. Tabella Comparativa Finale](#18-tabella-comparativa-finale)

---

# 1. Fasi di Sviluppo

Lo sviluppo di un Software si divide in diverse fasi, ognuna di esse importanti e con caratteristiche diverse.

![Figura 1: Schema del flusso di sviluppo software](images/psd/figura_01.png)

## 1.1 Analisi
Nella fase di analisi ci si concentra su COSA il programma deve compiere e quale problema deve risolvere. Si formalizzano:
* **Dati in ingresso (Input) e relativi vincoli**
* **Dati in uscita (Output) e relativi vincoli**
* **PreCondizioni (Pre):** Condizioni che devono essere rigorosamente soddisfatte prima dell'esecuzione del programma.
* **PostCondizioni (Post):** Condizioni che devono essere garantite dopo l'esecuzione del programma.

## 1.2 Progettazione
Nella fase di progettazione ci si sposta su COME il programma effettuerà le operazioni. Si procede a:
1. Scegliere la strategia algoritmica più adatta.
2. Definire l'algoritmo dettagliato (step-by-step).
3. Valutare la complessità computazionale dell'algoritmo.

## 1.3 Implementazione
Nella fase di implementazione si traduce l'algoritmo in un programma eseguibile utilizzando un linguaggio di programmazione (in questo caso C). Comprende:
* **Codifica:** Scrittura del codice sorgente.
* **Testing:** Esecuzione del programma per individuare difetti.
* **Debugging:** Individuazione e correzione degli errori (bugs).
* **Esecuzione:** Esecuzione del software sui dati reali.

> [!NOTE]
> **Sunto: Fasi di Sviluppo**  
> Per creare un programma si segue un percorso logico diviso in 4 fasi: prima capisci bene il problema e stabilisci cosa entra e cosa esce (Analisi), poi pianifichi la sequenza dei passaggi logici per risolverlo (Progettazione), poi lo scrivi concretamente in codice C correggendo eventuali errori e testandolo (Implementazione), e infine lo metti in funzione per usarlo davvero (Esecuzione).

---

# 2. Testing del Software

Il testing è il processo di esecuzione di un programma con lo scopo esplicito di trovare difetti o anomalie.

## 2.1 Black-Box Testing e White-Box Testing
* **Black-Box Testing (o Funzionale):** Si testa il codice senza conoscerne la struttura interna. Si definiscono solo i casi di prova su Input e Output.
* **White-Box Testing (o Strutturale):** Si definiscono i test avendo piena conoscenza del codice sorgente (flusso, rami if/else, cicli).

## 2.2 Strategie di Testing: Big-Bang e Incrementale
* **Big-Bang Testing:** Si collegano tutti i moduli contemporaneamente e si testa l'intero sistema in blocco. Sconsigliato perché se si verifica un errore è difficile localizzarlo.
* **Testing Incrementale:** Si testa un modulo alla volta, integrandoli gradualmente.

## 2.3 Approccio Bottom-Up
Nel testing Bottom-Up si testano prima i moduli di livello più basso (le foglie), per poi risalire verso i moduli di livello superiore.
* **Driver:** Un programma ausiliario che simula il chiamante di livello superiore per fornire input al modulo in esame.
* **Stub:** Un programma fittizio che simula un modulo chiamato che non è ancora stato implementato.

![Figura 2: Schema delle dipendenze per il testing Bottom-Up](images/psd/figura_02.png)

## 2.4 Il Testing in Pratica
Nella pratica a lezione il collaudo si divide in 4 file:
1. `file.h`: L'interfaccia pubblica (prototipi di funzioni).
2. `file.c`: L'implementazione reale delle funzioni.
3. `test_file.c`: Il modulo di test (Driver) che contiene i casi di prova.
4. `main.c`: Il programma principale che include ed esegue il test.

> [!NOTE]
> **Sunto: Il Testing**  
> Testare significa far girare il programma per scovare gli errori. Puoi farlo "al buio" controllando solo cosa entra e cosa esce (Black-Box) oppure guardando il codice riga per riga (White-Box). Invece di testare tutto insieme alla fine rischiando di non capire dove sta il guasto (Big-Bang), conviene testare pezzo per pezzo partendo dai moduli più piccoli (Bottom-Up), usando piccoli programmi finti (Driver e Stub) per simulare i pezzi mancanti.

---

# 3. ADT (Tipi di Dati Astratti)

Un **ADT** (*Abstract Data Type*) è un modello matematico composto da una collezione di dati e da un insieme di operazioni definite su tali dati, specificate indipendentemente dalla loro implementazione concreta.

## 3.1 Analisi Specifica
La definizione formale di un ADT si articola in:
1. **Specifica Sintattica:** Definisce l'intestazione dell'operazione, il nome, i tipi degli argomenti in ingresso e il tipo del valore restituito.
2. **Specifica Semantica:** Definisce il comportamento logico dell'operazione attraverso PreCondizioni ($Pre$) e PostCondizioni ($Post$).

## 3.2 Esempio: ADT Punto

* **Nome del tipo:** `Punto`
* **Tipi usati:** `float`, `boolean`
* **Dominio:** Insieme delle coppie di numeri reali $(x, y)$, dove $x$ è l'ascissa e $y$ l'ordinata, più l'elemento $\text{nil}$.

| Sintattica | Semantica |
|---|---|
| `creaPunto(float, float) -> Punto` | `creaPunto(ascissa, ordinata) -> P`<br>**Post:** $P = (ascissa, ordinata)$ |
| `ascissa(Punto) -> float` | `ascissa(P) -> a`<br>**Pre:** $P \neq \text{nil}$<br>**Post:** $a = x$, dove $(x, y) = P$ |
| `ordinata(Punto) -> float` | `ordinata(P) -> o`<br>**Pre:** $P \neq \text{nil}$<br>**Post:** $o = y$, dove $(x, y) = P$ |
| `distanza(Punto, Punto) -> float` | `distanza(P1, P2) -> d`<br>**Pre:** $P_1 \neq \text{nil}, P_2 \neq \text{nil}$<br>**Post:** $d = \sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}$, dove $P_1 = (x_1, y_1)$ e $P_2 = (x_2, y_2)$ |
| `distruggiPunto(Punto) -> void` | `distruggiPunto(P) -> void`<br>**Pre:** $P \neq \text{nil}$<br>**Post:** La memoria allocata per $P$ viene rilasciata |

## 3.3 Implementazione in C (Information Hiding)
Per realizzare l'occultamento dell'informazione (*Information Hiding*):
* Nel file `.h` si dichiara un puntatore opaco a una struttura incompleta (`typedef struct punto *Punto;`).
* Nel file `.c` si definisce la struttura concreta (`struct punto { float x; float y; };`) e i corpi delle funzioni.

### File: `punto.h`
```c
#ifndef PUNTO_H
#define PUNTO_H

typedef struct punto *Punto;

Punto creaPunto(float x, float y);
float ascissa(Punto p);
float ordinata(Punto p);
float distanza(Punto p1, Punto p2);
void distruggiPunto(Punto p);

#endif
```

### File: `punto.c`
```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "punto.h"

struct punto {
    float x;
    float y;
};

Punto creaPunto(float x, float y) {
    Punto p = malloc(sizeof(struct punto));
    if (p == NULL) return NULL;
    p->x = x;
    p->y = y;
    return p;
}

float ascissa(Punto p) {
    if (p == NULL) return 0;
    return p->x;
}

float ordinata(Punto p) {
    if (p == NULL) return 0;
    return p->y;
}

float distanza(Punto p1, Punto p2) {
    if (p1 == NULL || p2 == NULL) return -1;
    float dx = p1->x - p2->x;
    float dy = p1->y - p2->y;
    return sqrt(dx * dx + dy * dy);
}

void distruggiPunto(Punto p) {
    if (p != NULL) {
        free(p);
    }
}
```

> [!NOTE]
> **Sunto: ADT**  
> Un ADT (Tipo di Dato Astratto) serve a definire una struttura dati dicendo "cosa fa" ma nascondendo "come lo fa". L'Analisi Specifica definisce le regole del gioco (Sintattica, Semantica, Precondizioni e Postcondizioni), mentre l'Implementazione concreta viene nascosta (Information Hiding). In C questo si fa separando il codice: nel file .h metti solo le definizioni astratte dei puntatori e i prototipi (pubblici), mentre nel file .c metti la struct reale e i corpi delle funzioni (nascosti).

---

# 4. Strutture Dati

Le Strutture Dati sono insiemi di dati collegati in maniera strutturata (Definizione importante). Possiamo dividerle in più categorie fondamentali:

![Figura 3: Classificazione tassonomica delle Strutture Dati](images/psd/figura_03.png)

## 4.1 Categorie Principali
* **Lineari:** I dati sono espressi in maniera sequenziale. La loro dimensione varia dinamicamente. È possibile accedere/aggiungere/togliere elementi in determinate posizioni. Nota bene: non significa essere sempre ad accesso diretto, ma lo vedremo più avanti.
* **Non Lineari:** I dati sono espressi in maniera NON sequenziale. La loro dimensione varia spesso dinamicamente. È possibile accedere/aggiungere/togliere elementi in determinate posizioni. Nota bene: non significa essere sempre ad accesso diretto, ma lo vedremo più avanti.

## 4.2 Caratteristiche di Classificazione
Dalle definizioni scritte sopra, possiamo identificare diverse caratteristiche intrinseche:
* **Lineari / Non Lineari:** a seconda che la disposizione sia sequenziale o meno.
* **Statiche / Dinamiche:** in base alla variazione o meno della dimensione in memoria durante l'esecuzione.
* **Omogenee / Disomogenee:** rispetto all'omogeneità dei tipi di dati in esse contenuti.

> [!NOTE]
> **Sunto: Strutture Dati**  
> Una struttura dati non è altro che un modo organizzato di raggruppare e collegare i dati tra loro. Si dividono principalmente in due famiglie: quelle Lineari (sequenziali, come vagoni di un treno: liste, pile e code) e quelle Non Lineari (non sequenziali, ramificate come alberi binari). Possono poi espandersi da sole (Dinamiche) o avere una dimensione fissa (Statiche), e contenere dati dello stesso tipo (Omogenee) o di tipo diverso (Disomogenee).

---

# 5. Generics (Tipo Item)

Il tipo `Item` è un tipo di dato "artificiale", è quel tipo di dato che in altri linguaggi di programmazione viene definito come **Generics**.  
Ovvero, viene definito il tipo di dato astratto come generico e viene esplicitato successivamente, in fase di compilazione (o linkaggio), il tipo effettivo in base all'utilizzo. Questo è molto comodo perché permette di eseguire e riutilizzare gli stessi algoritmi con tipi di dati diversi. Di seguito viene mostrato come definiamo e implementiamo gli Item nel linguaggio C.

## 5.1 Interfaccia Pubblica dell'Item
### File: `item.h`
```c
typedef void* Item;

Item inputItem();
void outputItem(Item item);
int cmpItem(Item itemA, Item itemB);
Item cloneItem(Item e);
```

## 5.2 Implementazione Concreta con Interi
### File: `item_int.c`
```c
#include <stdio.h>
#include <stdlib.h>
#include "item.h"

Item inputItem() {
    int *p = malloc(sizeof(int));
    scanf("%d", p);
    return p;
}

void outputItem(Item item) {
    int *p = item;
    printf("%d ", *p);
}

int cmpItem(Item itemA, Item itemB) {
    int *pA = itemA;
    int *pB = itemB;
    return (*pA - *pB);
}

Item cloneItem(Item e) {
    int *val = e;
    int *p = malloc(sizeof(int));
    *p = *val;
    return p;
}
```

## 5.3 Implementazione Concreta con Stringhe
### File: `item_string.c`
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "item.h"

#define MAXSTRING 100

Item inputItem() {
    char *p = malloc(sizeof(char) * MAXSTRING);
    scanf("%s", p);
    return p;
}

void outputItem(Item item) {
    char *p = item;
    printf("%s ", p);
}

int cmpItem(Item itemA, Item itemB) {
    char *pA = itemA;
    char *pB = itemB;
    return strcmp(pA, pB);
}

Item cloneItem(Item e) {
    char *val = e;
    char *p = malloc(strlen(val) + 1);
    strcpy(p, val);
    return p;
}
```

> [!NOTE]
> **Sunto: Tipo Item**  
> L'Item è il trucco del C per creare tipi Generici: invece di scrivere una lista separata per gli interi, una per le stringhe e una per i float, crei una struttura che accetta un puntatore generico (void* Item). Poi, con due file separati (item_int.c o item_string.c), decidi se quell'Item deve comportarsi da numero o da testo, lasciando intatta e riutilizzabile tutta la struttura dati sottostante.

---

# 6. ADT Lista

Una Lista Concatenata (*Linked List*) è una struttura dati dinamica e lineare composta da una sequenza di nodi, dove ciascun nodo contiene un dato informativo (`value`) e un puntatore al nodo successivo (`next`).

![Figura 4: Struttura logica di una Lista Concatenata e dei suoi Nodi](images/psd/figura_04.png)

## 6.1 Lista VS Array
* **Array:** Dimensione fissa a compile-time, celle di memoria contigue, accesso diretto $O(1)$ tramite indice, inserimento e cancellazione costosi $O(n)$ a causa dello slittamento degli elementi.
* **Lista:** Dimensione variabile a runtime, allocazione non contigua nello Heap, inserimento e cancellazione immediati $O(1)$ in testa tramite manipolazione dei puntatori, accesso sequenziale $O(n)$.

## 6.2 Struttura del Nodo
```c
struct node {
    Item value;
    struct node *next;
};
```

## 6.3 Specifica Formale (Sintattica e Semantica)

* **Nome del tipo:** `List`
* **Tipi usati:** `Item`, `boolean`, `int`
* **Dominio:** Insieme delle sequenze $L = \langle a_1, a_2, \dots, a_n \rangle$ di tipo `Item` con $n \ge 0$. Se $n = 0$, la lista è vuota ($\text{nil}$).

| Sintattica | Semantica |
|---|---|
| `newList() -> List` | `newList() -> L`<br>**Post:** $L = \text{nil}$ ($L$ è la lista vuota) |
| `isEmpty(List) -> boolean` | `isEmpty(L) -> b`<br>**Post:** se $L = \text{nil}$ allora $b = \text{true}$, altrimenti $b = \text{false}$ |
| `addHead(List, Item) -> List` | `addHead(L, e) -> L'`<br>**Post:** $L' = \langle e, a_1, a_2, \dots, a_n \rangle$ ($L'$ è ottenuta aggiungendo $e$ in testa a $L$) |
| `removeHead(List) -> List` | `removeHead(L) -> L'`<br>**Pre:** $L \neq \text{nil}$<br>**Post:** $L' = \langle a_2, a_3, \dots, a_n \rangle$ ($L'$ è ottenuta rimuovendo il primo elemento da $L$) |
| `getHead(List) -> Item` | `getHead(L) -> e`<br>**Pre:** $L \neq \text{nil}$<br>**Post:** $e = a_1$ ($e$ è il primo elemento di $L$) |
| `sizeList(List) -> int` | `sizeList(L) -> n`<br>**Post:** $n$ è il numero di elementi contenuti in $L$ |

## 6.4 Operazione: Inserimento in testa (addHead)
I passi operativi per l'inserimento in testa sono i seguenti:
1. Allocare un nuovo nodo $N$.
2. Collegare il campo `next` di $N$ alla vecchia testa della lista.
3. Aggiornare il riferimento della lista in modo che la testa diventi $N$.

![Figura 5: Meccanismo di inserimento in testa (addHead)](images/psd/figura_05.png)

## 6.5 Operazione: Rimozione in testa (removeHead)
1. Salvare il puntatore al primo nodo in una variabile temporanea $T$.
2. Far puntare la testa della lista al secondo nodo (`head = head->next`).
3. Estrarre il valore di $T$ e deallocare la memoria del nodo con `free(T)`.

![Figura 6: Spostamento dei puntatori durante la rimozione in testa (removeHead)](images/psd/figura_06.png)

## 6.6 Operazione: Inserimento in posizione (addListPos)
1. Scorrere la lista fino alla posizione `pos - 1` con un puntatore ausiliario `prev`.
2. Allocare il nuovo nodo $N$.
3. Impostare `N->next = prev->next`.
4. Impostare `prev->next = N`.

![Figura 7: Inserimento di un nodo in mezzo a due elementi esistenti (addListPos)](images/psd/figura_07.png)

## 6.7 Operazione: Rimozione in posizione (removeListPos)
1. Scorrere la lista con `prev` fino al nodo che precede quello da eliminare.
2. Salvare il nodo bersaglio: `t = prev->next`.
3. Bypasare il nodo: `prev->next = t->next`.
4. Deallocare la memoria del nodo isolato con `free(t)`.

![Figura 8: Bypassing e rimozione di un nodo intermedio (removeListPos)](images/psd/figura_08.png)

## 6.8 Implementazione Completa

### File: `list.h`
```c
#ifndef LIST_H
#define LIST_H

#include "item.h"

typedef struct list *List;

List newList(void);
int isEmpty(List l);
void addHead(List l, Item elem);
Item removeHead(List l);
Item getHead(List l);
int sizeList(List l);
void printList(List l);
Item searchListItem(List l, Item elem, int *pos);
int addListPos(List l, Item elem, int pos);
Item removeListPos(List l, int pos);

#endif
```

### File: `list.c`
```c
#include <stdio.h>
#include <stdlib.h>
#include "list.h"
#include "item.h"

struct node {
    Item value;
    struct node *next;
};

struct list {
    struct node *head;
    int size;
};

List newList(void) {
    List l = malloc(sizeof(struct list));
    l->head = NULL;
    l->size = 0;
    return l;
}

int isEmpty(List l) {
    if (l->size == 0) return 1;
    return 0;
}

void addHead(List l, Item elem) {
    struct node *n = malloc(sizeof(struct node));
    n->value = elem;
    n->next = l->head;
    l->head = n;
    l->size++;
}

Item removeHead(List l) {
    if (isEmpty(l)) return NULL;
    struct node *t = l->head;
    l->head = t->next;
    Item elem = t->value;
    free(t);
    l->size--;
    return elem;
}

Item getHead(List l) {
    if (isEmpty(l)) return NULL;
    return l->head->value;
}

int sizeList(List l) {
    return l->size;
}

void printList(List l) {
    struct node *p = l->head;
    while (p != NULL) {
        outputItem(p->value);
        p = p->next;
    }
    printf("
");
}

Item searchListItem(List l, Item elem, int *pos) {
    struct node *p = l->head;
    *pos = 0;
    while (p != NULL) {
        if (cmpItem(p->value, elem) == 0) {
            return p->value;
        }
        p = p->next;
        (*pos)++;
    }
    *pos = -1;
    return NULL;
}

int addListPos(List l, Item elem, int pos) {
    if (pos < 0 || pos > l->size) return 0;
    if (pos == 0) {
        addHead(l, elem);
        return 1;
    }
    struct node *prev = l->head;
    for (int i = 0; i < pos - 1; i++) {
        prev = prev->next;
    }
    struct node *n = malloc(sizeof(struct node));
    n->value = elem;
    n->next = prev->next;
    prev->next = n;
    l->size++;
    return 1;
}

Item removeListPos(List l, int pos) {
    if (pos < 0 || pos >= l->size || isEmpty(l)) return NULL;
    if (pos == 0) {
        return removeHead(l);
    }
    struct node *prev = l->head;
    for (int i = 0; i < pos - 1; i++) {
        prev = prev->next;
    }
    struct node *t = prev->next;
    Item elem = t->value;
    prev->next = t->next;
    free(t);
    l->size--;
    return elem;
}
```

> [!NOTE]
> **Sunto: ADT Lista**  
> La lista è come un treno dove ogni vagone (il Nodo) contiene un passeggero (il Valore) e un gancio per il vagone successivo (il Puntatore). A differenza degli array non puoi saltare direttamente al vagone 5, devi sempre partire dalla locomotiva (la Testa) e scorrere i vagoni uno a uno. Aggiungere e togliere in testa è facilissimo (basta spostare la locomotiva); farlo in mezzo richiede due controllori (puntatori PREV e T) per non perdere i vagoni successivi durante lo sgancio.

---

# 7. ADT Stack

Lo Stack (o Pila) è una struttura dati lineare sequenziale che implementa la disciplina di accesso **LIFO** (*Last In, First Out*): l'ultimo elemento inserito è il primo a essere estratto.

![Figura 9: Struttura logica di uno Stack](images/psd/figura_09.png)

## 7.1 Operazioni Base (Specifica Sintattica e Semantica)

* **Nome del tipo:** `Stack`
* **Tipi usati:** `Item`, `boolean`
* **Dominio:** Insieme delle sequenze $S$ di tipo `Item`. L'accesso avviene secondo la disciplina LIFO (*Last In First Out*).

| Sintattica | Semantica |
|---|---|
| `newStack() -> Stack` | `newStack() -> S`<br>**Post:** $S = \text{nil}$ (lo Stack è vuoto) |
| `isEmptyStack(Stack) -> boolean` | `isEmptyStack(S) -> b`<br>**Post:** se $S = \text{nil}$ allora $b = \text{true}$, altrimenti $b = \text{false}$ |
| `push(Stack, Item) -> Stack` | `push(S, e) -> S'`<br>**Post:** $S'$ è lo Stack ottenuto inserendo $e$ in cima a $S$ |
| `pop(Stack) -> Stack` | `pop(S) -> S'`<br>**Pre:** $S \neq \text{nil}$<br>**Post:** $S'$ è lo Stack ottenuto rimuovendo l'elemento in cima a $S$ |
| `top(Stack) -> Item` | `top(S) -> e`<br>**Pre:** $S \neq \text{nil}$<br>**Post:** $e$ è l'elemento attualmente in cima a $S$ |

## 7.2 Operazione: Push
L'inserimento (Push) aggiunge un nuovo nodo in cima allo stack:
1. Allocazione del nodo $N$.
2. Collegamento di $N$ alla cima attuale (`Top`).
3. Aggiornamento del puntatore `Top = N`.

![Figura 10: Inserimento del primo elemento N in uno Stack (Push)](images/psd/figura_10.png)
![Figura 11: Inserimento in testa di un secondo elemento P (Push)](images/psd/figura_11.png)

## 7.3 Operazione: Pop
La rimozione (Pop) estrae il nodo in cima allo stack:
1. Puntatore ausiliario al nodo `Top`.
2. Aggiornamento `Top = Top->next`.
3. Deallocazione del nodo rimosso.

![Figura 12: Rimozione (Pop) dell’elemento in Top](images/psd/figura_12.png)

## 7.4 Implementazione tramite ADT Lista

### File: `stack.h`
```c
#ifndef STACK_H
#define STACK_H

#include "item.h"

typedef struct stack *Stack;

Stack newStack(void);
int isEmptyStack(Stack s);
int push(Stack s, Item el);
int pop(Stack s);
Item top(Stack s);
void printStack(Stack s);

#endif
```

### File: `stackList.c`
```c
#include <stdio.h>
#include <stdlib.h>
#include "stack.h"
#include "list.h"

struct stack {
    List elements;
};

Stack newStack(void) {
    Stack s = malloc(sizeof(struct stack));
    s->elements = newList();
    return s;
}

int isEmptyStack(Stack s) {
    return isEmpty(s->elements);
}

int push(Stack s, Item el) {
    addHead(s->elements, el);
    return 1;
}

int pop(Stack s) {
    if (isEmptyStack(s)) return 0;
    removeHead(s->elements);
    return 1;
}

Item top(Stack s) {
    return getHead(s->elements);
}

void printStack(Stack s) {
    printList(s->elements);
}
```

## 7.5 Implementazione tramite Array

### File: `stackArray.c`
```c
#include <stdio.h>
#include <stdlib.h>
#include "stack.h"

#define MAXSTACK 50

struct stack {
    Item elements[MAXSTACK];
    int top;
};

Stack newStack(void) {
    Stack s = malloc(sizeof(struct stack));
    s->top = 0;
    return s;
}

int isEmptyStack(Stack s) {
    if (s->top == 0) return 1;
    return 0;
}

int push(Stack s, Item el) {
    if (s->top < MAXSTACK) {
        s->elements[s->top] = el;
        (s->top)++;
        return 1;
    }
    return 0;
}

int pop(Stack s) {
    if (isEmptyStack(s)) return 0;
    (s->top)--;
    return 1;
}

Item top(Stack s) {
    if (isEmptyStack(s)) return NULL;
    return s->elements[s->top - 1];
}
```

> [!NOTE]
> **Sunto: ADT Stack**  
> Lo Stack è una struttura dati che funziona come una pila di piatti: l'ultimo piatto che appoggi sopra (Top) è il primo che prendi quando devi usarne uno. La logica è detta LIFO (Last In, First Out). Per programmarla senza fatica, si usa sotto traccia una Lista: inserire un dato (Push) non è altro che un addHead, mentre togliere un dato (Pop) è semplicemente un removeHead.

---

# 8. ADT Queue

La Queue (o Coda) è una struttura dati lineare che segue la disciplina **FIFO** (*First In, First Out*): il primo elemento inserito è il primo a essere rimosso.

![Figura 13: Rappresentazione logica di una Coda (Queue)](images/psd/figura_13.png)

## 8.1 Operazioni Base (Specifica Sintattica e Semantica)

* **Nome del tipo:** `Queue`
* **Tipi usati:** `Item`, `boolean`
* **Dominio:** Insieme delle sequenze $Q$ di tipo `Item`. L'accesso avviene secondo la disciplina FIFO (*First In First Out*).

| Sintattica | Semantica |
|---|---|
| `newQueue() -> Queue` | `newQueue() -> Q`<br>**Post:** $Q = \text{nil}$ (la Coda è vuota) |
| `isEmptyQueue(Queue) -> boolean` | `isEmptyQueue(Q) -> b`<br>**Post:** se $Q = \text{nil}$ allora $b = \text{true}$, altrimenti $b = \text{false}$ |
| `enqueue(Queue, Item) -> Queue` | `enqueue(Q, e) -> Q'`<br>**Post:** $Q'$ è la Coda ottenuta inserendo $e$ in fondo a $Q$ |
| `dequeue(Queue) -> Queue` | `dequeue(Q) -> Q'`<br>**Pre:** $Q \neq \text{nil}$<br>**Post:** $Q'$ è la Coda ottenuta rimuovendo il primo elemento inserito in $Q$ |
| `frontQueue(Queue) -> Item` | `frontQueue(Q) -> e`<br>**Pre:** $Q \neq \text{nil}$<br>**Post:** $e$ è il primo elemento inserito in $Q$ |

## 8.2 Operazione: Enqueue
L'inserimento (Enqueue) avviene esclusivamente in coda (`Tail`/`IN`).

![Figura 14: Inserimento del primo elemento N in Coda (Enqueue)](images/psd/figura_14.png)
![Figura 15: Inserimento di un secondo elemento P in Coda (Enqueue)](images/psd/figura_15.png)

## 8.3 Operazione: Dequeue
L'estrazione (Dequeue) avviene esclusivamente in testa (`Head`/`OUT`).

![Figura 16: Estrazione (Dequeue) dell’elemento in Testa alla Coda](images/psd/figura_16.png)

## 8.4 Implementazione tramite ADT Lista

### File: `queue.h`
```c
#ifndef QUEUE_H
#define QUEUE_H

#include "item.h"

typedef struct queue *Queue;

Queue newQueue(void);
int isEmptyQueue(Queue q);
int enqueue(Queue q, Item el);
Item dequeue(Queue q);
void printQueue(Queue q);

#endif
```

### File: `queueList.c`
```c
#include <stdio.h>
#include <stdlib.h>
#include "queue.h"
#include "list.h"

struct queue {
    List elements;
};

Queue newQueue(void) {
    Queue q = malloc(sizeof(struct queue));
    q->elements = newList();
    return q;
}

int isEmptyQueue(Queue q) {
    return isEmpty(q->elements);
}

int enqueue(Queue q, Item el) {
    return addListPos(q->elements, el, sizeList(q->elements));
}

Item dequeue(Queue q) {
    return removeHead(q->elements);
}

void printQueue(Queue q) {
    printList(q->elements);
}
```

## 8.5 Implementazione tramite Array Circolare

### File: `queueArray.c`
```c
#include <stdio.h>
#include <stdlib.h>
#include "queue.h"

#define MAXQUEUE 50

struct queue {
    Item elements[MAXQUEUE];
    int head;
    int tail;
};

Queue newQueue(void) {
    Queue q = malloc(sizeof(struct queue));
    q->head = 0;
    q->tail = 0;
    return q;
}

int isEmptyQueue(Queue q) {
    return (q->head == q->tail);
}

int enqueue(Queue q, Item el) {
    if ((q->tail + 1) % MAXQUEUE == q->head) {
        return 0; // Coda piena
    }
    q->elements[q->tail] = el;
    q->tail = (q->tail + 1) % MAXQUEUE;
    return 1;
}

Item dequeue(Queue q) {
    if (isEmptyQueue(q)) return NULL;
    Item tmp = q->elements[q->head];
    q->head = (q->head + 1) % MAXQUEUE;
    return tmp;
}
```

> [!NOTE]
> **Sunto: ADT Queue**  
> La Coda (Queue) funziona esattamente come la fila alla posta: il primo che arriva è il primo ad essere servito. In gergo si dice FIFO (First In, First Out). Gli inserimenti si fanno solo sul fondo (Coda/IN), mentre le estrazioni si fanno solo dall'inizio (Testa/OUT). Nel codice tramite lista, significa agganciare un elemento sempre in fondo (addListTail) e pescarlo eliminando il primo (removeHead).

---

# 9. ADT BTree (o Alberi binari)

Un grafo è una coppia $\langle N, A 
angle$ dove:
* $N$ è l'insieme dei nodi che compongono il grafo.
* $A$ è l'insieme degli archi che collegano due nodi.

Un albero è un grafo non orientato, connesso e aciclico.

## 9.1 Proprietà fondamentali degli alberi
* Ogni nodo ha un arco entrante, tranne la radice.
* Ogni nodo può avere 0 o più archi uscenti. I nodi senza archi uscenti sono detti foglie.
* A ciascun nodo viene associato un valore, detto etichetta.

Nel nostro caso, andremo a concentrarci sugli **Alberi Binari**, ovvero una tipologia di albero dove ogni nodo ha al più due nodi figli. All'interno dell'ADT BTree, ogni nodo ha esclusivamente accesso a se stesso e ai suoi figli diretti.

Di conseguenza, possiamo definire un albero binario (BTree) in modo ricorsivo:
* O è vuoto ($	ext{nil}$).
* O è una terna $\langle s, r, d 
angle$ dove $r$ è il nodo radice, mentre $s$ e $d$ rappresentano rispettivamente la radice del sottoalbero sinistro e la radice del sottoalbero destro.

La maggior parte delle operazioni sull'albero ricorrono all'uso della ricorsione. Il metodo di creazione dell'albero che vediamo a lezione segue un approccio Bottom-Up, ovvero si inizia la costruzione partendo dalle foglie fino ad arrivare alla radice principale.

## 9.2 Specifica Formale (Sintattica e Semantica)

* **Nome del tipo:** `BTree`
* **Tipi usati:** `Item`, `boolean`
* **Dominio:** Insieme degli alberi binari $T$. Un albero binario $T$ è vuoto ($\text{nil}$) o è una terna $\langle s, r, d \rangle$ dove $r$ è la radice e $s, d$ sono rispettivamente il sottoalbero sinistro e destro.

| Sintattica | Semantica |
|---|---|
| `newBTree() -> BTree` | `newBTree() -> T`<br>**Post:** $T = \text{nil}$ (l'albero è vuoto) |
| `isEmpty(BTree) -> boolean` | `isEmpty(T) -> b`<br>**Post:** se $T = \text{nil}$ allora $b = \text{true}$, altrimenti $b = \text{false}$ |
| `buildTree(BTree, Item, BTree) -> BTree` | `buildTree(T1, e, T2) -> T`<br>**Post:** $T$ è l'albero $\langle T1, e, T2 \rangle$ avente radice $e$, sottoalbero sinistro $T1$ e destro $T2$ |
| `getBTreeRoot(BTree) -> Item` | `getBTreeRoot(T) -> e`<br>**Pre:** $T \neq \text{nil}$<br>**Post:** $e$ è l'etichetta del nodo radice di $T$ |
| `getLeft(BTree) -> BTree` | `getLeft(T) -> T'`<br>**Pre:** $T \neq \text{nil}$<br>**Post:** $T'$ è il sottoalbero sinistro di $T$ |
| `getRight(BTree) -> BTree` | `getRight(T) -> T'`<br>**Pre:** $T \neq \text{nil}$<br>**Post:** $T'$ è il sottoalbero destro di $T$ |

## 9.3 Visite degli Alberi
Esistono due macro-famiglie di visite per esplorare tutti i nodi di un albero:
1. **Visite in Profondità (DFS):**
   * **Pre-Order (Anticipata / Prefissa):** Radice $	o$ Sinistra $	o$ Destra
   * **In-Order (Simmetrica / Infissa):** Sinistra $	o$ Radice $	o$ Destra
   * **Post-Order (Posticipata / Suffissa):** Sinistra $	o$ Destra $	o$ Radice
2. **Visite in Ampiezza (BFS):**
   * Esplorazione livello per livello (dall'alto verso il basso e da sinistra verso destra), implementata tramite una Coda ausiliaria.

## 9.4 Costruzione dell'Albero
A lezione la costruzione avviene con l'approccio Bottom-Up tramite `buildTree`:

![Figura 17: Fase 1: Allocazione delle foglie elementari](images/psd/figura_17.png)
![Figura 18: Fase 2: Connessione dei sottoalberi intermedi](images/psd/figura_18.png)
![Figura 19: Fase 3: Albero binario completo](images/psd/figura_19.png)

## 9.5 Implementazione Completa

### File: `BTree.h`
```c
#ifndef BTREE_H
#define BTREE_H

#include "item.h"

typedef struct node *BTree;

BTree newBTree(void);
int isEmpty(BTree t);
BTree buildTree(BTree l, Item val, BTree r);
Item getBTreeRoot(BTree t);
BTree getLeft(BTree t);
BTree getRight(BTree t);
void preOrder(BTree t);
void inOrder(BTree t);
void postOrder(BTree t);

#endif
```

### File: `BTree.c`
```c
#include <stdio.h>
#include <stdlib.h>
#include "BTree.h"

struct node {
    Item value;
    struct node *left;
    struct node *right;
};

BTree newBTree(void) {
    return NULL;
}

int isEmpty(BTree t) {
    return (t == NULL);
}

BTree buildTree(BTree l, Item val, BTree r) {
    struct node *n = malloc(sizeof(struct node));
    n->value = val;
    n->left = l;
    n->right = r;
    return n;
}

Item getBTreeRoot(BTree t) {
    if (isEmpty(t)) return NULL;
    return t->value;
}

BTree getLeft(BTree t) {
    if (isEmpty(t)) return NULL;
    return t->left;
}

BTree getRight(BTree t) {
    if (isEmpty(t)) return NULL;
    return t->right;
}

void preOrder(BTree t) {
    if (!isEmpty(t)) {
        outputItem(t->value);
        preOrder(t->left);
        preOrder(t->right);
    }
}

void inOrder(BTree t) {
    if (!isEmpty(t)) {
        inOrder(t->left);
        outputItem(t->value);
        inOrder(t->right);
    }
}

void postOrder(BTree t) {
    if (!isEmpty(t)) {
        postOrder(t->left);
        postOrder(t->right);
        outputItem(t->value);
    }
}
```

> [!NOTE]
> **Sunto: ADT BTree**  
> Un albero binario è una struttura non sequenziale ramificata. Ogni elemento si collega al massimo a due nodi sottostanti: il figlio sinistro e il figlio destro. Per costruirlo via codice in modo sicuro, si segue una logica Bottom-Up: si parte creando le foglie di base e poi, salendo di livello, si usa la funzione buildTree per agganciare i pezzi intermedi fino a convergere nell'unica radice in alto. La lettura totale dei nodi si affida alla ricorsione, declinata in tre varianti (pre, post e in-order) a seconda di quando si decide di elaborare il valore del nodo padre rispetto ai suoi figli.

---

# 10. ADT BST (o Alberi Binari di Ricerca)

Un BST (*Binary Search Tree*), o Albero binario di ricerca è un albero binario ordinato in base all'etichetta dei nodi.

![Figura 20: Esempio di un BST](images/psd/figura_20.png)

## 10.1 Caratteristiche Principali
* Ogni elemento del sottoalbero sinistro è più piccolo della radice.
* Ogni elemento del sottoalbero destro è più grande della radice.
* Ogni sottoalbero è a sua volta un BST.
* Oltre a queste elencate, il BST possiede tutte le proprietà dei BTree.

Il BST è molto efficiente nelle operazioni di ricerca, inserimento e cancellazione.

## 10.2 Specifica Formale (Sintattica e Semantica)

* **Nome del tipo:** `BST`
* **Tipi usati:** `Item`, `boolean`
* **Dominio:** $T = \text{nil} \mid T = \langle N, T1, T2 \rangle$, dove $T1$ e $T2$ sono a loro volta BST.

| Sintattica | Semantica |
|---|---|
| `newBST() -> BST` | `newBST() -> T`<br>**Post:** $T = \text{nil}$ |
| `isEmpty(BST) -> boolean` | `isEmpty(T) -> b`<br>**Post:** se $T = \text{nil}$ allora $b = \text{true}$, altrimenti $b = \text{false}$ |
| `getLeft(BST) -> BST` | `getLeft(T) -> T'`<br>**Pre:** $T$ non è vuoto<br>**Post:** $T'$ è il sottoalbero sinistro |
| `getRight(BST) -> BST` | `getRight(T) -> T'`<br>**Pre:** $T$ non è vuoto<br>**Post:** $T'$ è il sottoalbero destro |
| `search(BST, Item) -> Item` | `search(T, e) -> e'`<br>**Pre:** $e \neq \text{nil}$<br>**Post:** $e' = e$ se $e \in T$; $e' = \text{nil}$ altrimenti |
| `min(BST) -> Item` | **Pre:** $T$ non è vuoto<br>**Post:** Restituisce l'Item con valore minimo o massimo nell'albero |
| `max(BST) -> Item` | **Pre:** $T$ non è vuoto<br>**Post:** Restituisce l'Item con valore minimo o massimo nell'albero |
| `insert(BST, Item) -> BST` | `insert(T, e) -> T'`<br>**Post:** $T'$ contiene i nodi di $T$ con l'aggiunta di $e$ |
| `delete(BST, Item) -> BST` | `delete(T, e) -> T'`<br>**Pre:** $T$ non è vuoto<br>**Post:** $T' = T - \{e\}$ |

## 10.3 Ricerca di un elemento (search)
Il BST è ottimo per effettuare ricerche per via della sua natura ordinata. Facciamo un esempio: vogliamo cercare l'elemento 12. Partendo dalla radice: 12 è più piccolo di 35, quindi prendiamo il cammino a sinistra (nodo 10). Successivamente, 12 è più grande di 10, quindi prendiamo il cammino a destra. Siccome 12 è uguale a 12, abbiamo trovato l'elemento.

![Figura 21: Percorso di ricerca per l’elemento 12](images/psd/figura_21.png)

## 10.4 Inserimento di un elemento (insert)
Vogliamo inserire un nuovo nodo con etichetta 23. Il procedimento è simile alla ricerca: si scende lungo l'albero confrontando il valore fino a trovare una posizione foglia vuota ($	ext{nil}$) dove agganciare il nuovo nodo. Nel nostro caso, 23 andrà ad agganciarsi come figlio destro del nodo 12.

![Figura 22: Inserimento del nodo 23 come figlio destro di 12 (insertNode)](images/psd/figura_22.png)

## 10.5 Eliminazione di un elemento (delete)
L'eliminazione prevede 3 casi distinti:
1. **Caso 1: Il nodo da eliminare è una foglia (0 figli):** Si dealloca semplicemente il nodo e si imposta il puntatore del padre a `NULL`.
2. **Caso 2: Il nodo ha 1 solo figlio:** Si scavalca il nodo collegando direttamente il padre al figlio del nodo da eliminare.
3. **Caso 3: Il nodo ha 2 figli:** Si sostituisce il valore del nodo con il suo predecessore (massimo del sottoalbero sinistro) o con il suo successore (minimo del sottoalbero destro), ed è quindi eliminato il nodo duplicato che ora si troverà in una posizione più semplice (caso 1 o 2).

![Figura 23: Albero risultante dopo l’eliminazione del nodo foglia 40](images/psd/figura_23.png)

## 10.6 Implementazione Completa

### File: `bst.h`
```c
#ifndef BST_H
#define BST_H

#include "item.h"

typedef struct node *BST;

BST newBST(void);
int isEmpty(BST t);
BST getLeft(BST t);
BST getRight(BST t);
Item getItem(BST t);
Item search(BST t, Item elem);
Item min(BST t);
Item max(BST t);
void insert(BST *t, Item elem);
void deleteNode(BST *t, Item elem);

#endif
```

### File: `bst.c`
```c
#include <stdio.h>
#include <stdlib.h>
#include "bst.h"

struct node {
    Item value;
    struct node *left;
    struct node *right;
};

BST newBST(void) {
    return NULL;
}

int isEmpty(BST t) {
    return (t == NULL);
}

BST getLeft(BST t) {
    if (isEmpty(t)) return NULL;
    return t->left;
}

BST getRight(BST t) {
    if (isEmpty(t)) return NULL;
    return t->right;
}

Item getItem(BST t) {
    if (isEmpty(t)) return NULL;
    return t->value;
}

Item search(BST t, Item elem) {
    if (isEmpty(t)) return NULL;
    int res = cmpItem(elem, t->value);
    if (res == 0) return t->value;
    if (res < 0) return search(t->left, elem);
    return search(t->right, elem);
}

Item min(BST t) {
    if (isEmpty(t)) return NULL;
    while (t->left != NULL) {
        t = t->left;
    }
    return t->value;
}

Item max(BST t) {
    if (isEmpty(t)) return NULL;
    while (t->right != NULL) {
        t = t->right;
    }
    return t->value;
}

void insert(BST *t, Item elem) {
    if (isEmpty(*t)) {
        *t = malloc(sizeof(struct node));
        (*t)->value = elem;
        (*t)->left = NULL;
        (*t)->right = NULL;
        return;
    }
    int res = cmpItem(elem, (*t)->value);
    if (res < 0) insert(&((*t)->left), elem);
    else if (res > 0) insert(&((*t)->right), elem);
}

static struct node* deleteMin(struct node *n, Item *minVal) {
    if (n->left == NULL) {
        *minVal = n->value;
        struct node *r = n->right;
        free(n);
        return r;
    }
    n->left = deleteMin(n->left, minVal);
    return n;
}

void deleteNode(BST *t, Item elem) {
    if (isEmpty(*t)) return;
    int res = cmpItem(elem, (*t)->value);
    if (res < 0) {
        deleteNode(&((*t)->left), elem);
    } else if (res > 0) {
        deleteNode(&((*t)->right), elem);
    } else {
        struct node *curr = *t;
        if (curr->left == NULL) {
            *t = curr->right;
            free(curr);
        } else if (curr->right == NULL) {
            *t = curr->left;
            free(curr);
        } else {
            Item minVal;
            curr->right = deleteMin(curr->right, &minVal);
            curr->value = minVal;
        }
    }
}
```

> [!NOTE]
> **Sunto: ADT BST**  
> Un Albero Binario di Ricerca (BST) è strutturalmente identico a un BTree, ma ha una regola ferrea per la disposizione dei nodi: tutti i valori minori della radice vanno nel ramo di sinistra, tutti i valori maggiori vanno nel ramo di destra. Questo lo rende velocissimo per cercare dati, perché ad ogni passo si dimezzano le opzioni (come quando si cerca una parola sul vocabolario aprendolo a metà). L'unica operazione insidiosa è l'eliminazione di un nodo che ha dei figli: non potendo lasciare un "buco" in mezzo all'albero, si deve far salire al suo posto o il nodo più grande tra quelli a sinistra, oppure il nodo più piccolo tra quelli a destra.

---

# 11. ADT HashTable (o Tabelle Hash)

Una HashTable non è altro che una tabella composta da 2 campi: il campo chiave e il campo valore. Ogni riga è una coppia di chiave-valore, dove la chiave è UNIVOCA ed è associata ad un valore (o a più valori in caso di collisioni gestite). Ogni coppia chiave-valore viene chiamata Entry.

## 11.1 Definizioni Fondamentali
* $U$: universo di tutte le possibili chiavi.
* $K$: insieme delle chiavi effettivamente memorizzate.

## 11.2 HT ad Indirizzamento Diretto
Quando $U$ è piccolo e le chiavi sono intere, allora possiamo utilizzare questo tipo di HT. Questo tipo corrisponde di fatto al concetto di Array:
* Ad ogni chiave corrisponde una posizione esatta nella tabella.
* Una tabella restituisce il dato in quello slot con quella specifica chiave.

Tuttavia, se le chiavi non sono intere e/o se $U$ è troppo grande, questo approccio non conviene. Utilizziamo quindi il Metodo Hash.

## 11.3 Metodo Hash e Collisioni
Con il metodo hash, ogni chiave associata ad un elemento verrà sottoposta alla funzione hash (o funzione di hashing). Lo scopo della funzione è definire una corrispondenza tra l'universo $U$ delle chiavi e le posizioni (indici) nella HT.  
Tuttavia, utilizzando la funzione di hash potremmo incorrere in chiavi diverse che producono lo stesso risultato, e quindi avremo una collisione.

![Figura 24: Flusso di inserimento in una HashTable e rilevamento collisione](images/psd/figura_24.png)

## 11.4 Come si risolvono le collisioni?
Ci sono due modi principali per risolvere le collisioni:
* **Metodo di concatenazione:** Nel momento in cui abbiamo una collisione in una chiave $K$, il valore associato a $K$ non è più un singolo valore $V$, ma diventa una lista concatenata di valori.
* **Metodo di Indirizzamento Aperto:** In caso di collisione si memorizza l'elemento nella posizione successiva. Ovvero, viene generato un nuovo valore hash fino a trovare una posizione vuota dove inserire l'elemento (richiede una enorme modifica alla funzione di hash).

## 11.5 Le Funzioni Hash
Le funzioni Hash devono avere delle caratteristiche ben precise:
* Il loro risultato, quindi una chiave "hash-ata", deve essere equiprobabile.
* Dovrebbero utilizzare tutte le cifre della chiave per produrre un valore hash.

Come funziona la funzione Hash in pratica?
* **Se lavoriamo con gli interi:** il valore hash è il resto della divisione $k$ per $m$ ($h(k) = k \bmod m$).
* **Se lavoriamo con le stringhe:** Si converte la stringa in un numero in base 128 (codifica ASCII) e si fa una somma.

## 11.6 Operazioni di Base

Questa volta dobbiamo definire 3 tabelle, poiché sia la chiave "Key", che la coppia chiave-valore "Entry", che la "Hashtable" stessa, sono ADT a parte.

### 1. ADT Key

* **Nome del tipo:** `Key`
* **Tipi usati:** `int`, `boolean`
* **Dominio:** $k \in U$

| Sintattica | Semantica |
|---|---|
| `equals(Key, Key) -> boolean` | `equals(k1, k2) -> b`<br>**Post:** $b = \text{true}$ se $k1 = k2$, altrimenti $b = \text{false}$ |
| `hashValue(Key, int) -> int` | `hashValue(k, size) -> index`<br>**Pre:** $k \neq \text{nil}, \text{size} > 0$<br>**Post:** $0 \le index < \text{size}$ |
| `inputKey() -> Key` | // Input manuale della chiave |
| `outputKey(Key)` | // Stampa della chiave |

### 2. ADT Entry

* **Nome del tipo:** `Entry`
* **Tipi usati:** `Item`, `Key`
* **Dominio:** Coppia (chiave, valore). La chiave è di tipo `Key`, il valore è di tipo `Item`.

| Sintattica | Semantica |
|---|---|
| `newEntry(Key, Item) -> Entry` | `newEntry(key, value) -> e`<br>**Post:** $e = (key, value)$ |
| `getKey(Entry) -> Key` | `getKey(e) -> key`<br>**Post:** $e = (key, value)$ |
| `getValue(Entry) -> Item` | `getValue(e) -> value`<br>**Post:** $e = (key, value)$ |

### 3. ADT HashTable

* **Nome del tipo:** `Hashtable`
* **Tipi usati:** `Entry`, `boolean`, `Key`
* **Dominio:** Insieme di elementi $T$ di tipo `Entry`.

| Sintattica | Semantica |
|---|---|
| `newHashtable() -> Hashtable` | `newHashtable() -> t`<br>**Post:** $t = \emptyset$ |
| `insertHash(Hashtable, Entry) -> Hashtable` | `insertHash(t, e) -> t'`<br>**Post:** $t'$ include l'aggiunta di $e$ |
| `searchHash(Hashtable, Key) -> Entry` | `searchHash(t, k) -> e`<br>**Pre:** $t$ con $n > 0$<br>**Post:** $e$ è l'Entry associata alla chiave $k$ |
| `deleteHash(Hashtable, Key) -> Hashtable` | `deleteHash(t, k) -> t'`<br>**Pre:** $t$ con $n > 0$ e $k$ presente<br>**Post:** $t'$ non contiene più la Entry di $k$ |

## 11.7 Implementazione in C

### File: `key.h`
```c
typedef void *Key;

int equals(Key k1, Key k2);
int hashValue(Key k, int size);
Key inputKey();
void outputKey(Key k);
```

### File: `key.c`
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "key.h"

int equals(Key k1, Key k2) {
    char *s1 = k1;
    char *s2 = k2;
    return (strcmp(s1, s2) == 0);
}

int hashValue(Key k, int size) {
    char *s = k;
    int h = 0;
    for (int i = 0; s[i] != ' '; i++) {
        h = (h * 128 + s[i]) % size;
    }
    return h;
}
```

### File: `entry.h`
```c
#include "key.h"
#include "item.h"

typedef struct entry *Entry;

Entry newEntry(Key k, Item v);
Key getKey(Entry e);
Item getValue(Entry e);
```

### File: `entry.c`
```c
#include <stdlib.h>
#include "entry.h"

struct entry {
    Key key;
    Item value;
};

Entry newEntry(Key k, Item v) {
    Entry e = malloc(sizeof(struct entry));
    e->key = k;
    e->value = v;
    return e;
}

Key getKey(Entry e) {
    if (e == NULL) return NULL;
    return e->key;
}

Item getValue(Entry e) {
    if (e == NULL) return NULL;
    return e->value;
}
```

### File: `hashtable.h`
```c
#include "entry.h"
#include "key.h"

typedef struct hashtable *HashTable;

HashTable newHashtable(int size);
int insertHash(HashTable h, Entry e);
Entry searchHash(HashTable h, Key k);
Entry deleteHash(HashTable h, Key k);
```

### File: `hashtable.c`
```c
#include <stdio.h>
#include <stdlib.h>
#include "hashtable.h"
#include "list.h"

struct hashtable {
    int size;
    List *entries;
};

HashTable newHashtable(int size) {
    HashTable h = malloc(sizeof(struct hashtable));
    h->size = size;
    h->entries = malloc(sizeof(List) * size);
    for (int i = 0; i < size; i++) {
        h->entries[i] = newList();
    }
    return h;
}

int insertHash(HashTable h, Entry e) {
    int pos = hashValue(getKey(e), h->size);
    addHead(h->entries[pos], e);
    return 1;
}

Entry searchHash(HashTable h, Key k) {
    int pos = hashValue(k, h->size);
    List l = h->entries[pos];
    int p;
    // Cerca all'interno della lista
    return searchListItem(l, k, &p);
}
```

> [!NOTE]
> **Sunto: ADT HashTable**  
> Una HashTable è come una gigantesca cassettiera dove ogni cassetto ha un numero. Quando vuoi salvare una coppia chiave-valore (ad esempio nome e numero di telefono), passi il nome a una "Funzione Hash" che calcola all'istante il numero del cassetto giusto in cui infilare il dato. Se due nomi finiscono per puro caso nello stesso cassetto (Collisione), nel metodo a concatenazione si trasforma quel cassetto in una piccola lista e si appendono uno dietro l'altro.

---

# 12. Bubble Sort

L'algoritmo **Bubble Sort** ordina un array confrontando ripetutamente coppie di elementi adiacenti e scambiandoli se non sono nell'ordine corretto.

### Implementazione in C:
```c
void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

void bubbleSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                swap(&a[j], &a[j + 1]);
            }
        }
    }
}
```

### Versione Ottimizzata (con flag swapped):
```c
void bubbleSortAdaptive(int a[], int n) {
    int swapped = 1;
    for (int i = 0; i < n - 1 && swapped; i++) {
        swapped = 0;
        for (int j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                swap(&a[j], &a[j + 1]);
                swapped = 1;
            }
        }
    }
}
```

> [!NOTE]
> **Sunto: Bubble Sort**  
> Il Bubble Sort (o "ordinamento a bolla") è il metodo più intuitivo ma meno efficiente per ordinare un array. Il suo funzionamento si basa su una regola semplicissima: scorre l'array dall'inizio alla fine confrontando gli elementi a due a due; se una coppia è nell'ordine sbagliato, scambia i due elementi. Ad ogni giro completo, il numero più grande "galleggia" verso la fine dell'array come una bolla nell'acqua.

---

# 13. Selection Sort

Il **Selection Sort** cerca iterativamente il valore minimo nella porzione non ordinata dell'array e lo scambia con il primo elemento non ordinato.

![Figura 25: Array iniziale (completamente non ordinato)](images/psd/figura_25.png)

All'inizio non abbiamo la parte ordinata, quindi cerchiamo il minimo in tutto l'array: il minimo è **1**. Lo scambiamo con l'8.  
Continuiamo: prendiamo il minimo successivo che è **2**, si trova già in seconda posizione, non facciamo alcuno scambio.  
Ora prendiamo il **6** e lo scambiamo con il **12**.  
E così via, fino a quando non otterremo il nostro array ordinato:

![Figura 26: Array finale (completamente ordinato)](images/psd/figura_26.png)

### Implementazione in C:
```c
void selectionSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_pos = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[min_pos]) {
                min_pos = j;
            }
        }
        if (min_pos != i) {
            swap(&a[i], &a[min_pos]);
        }
    }
}
```

> [!NOTE]
> **Sunto: Selection Sort**  
> Il Selection Sort funziona dividendo idealmente l'array in due blocchi: uno ordinato (all'inizio) e uno disordinato. Ad ogni passaggio, l'algoritmo cerca il numero più piccolo in assoluto tra quelli ancora disordinati e lo posiziona in coda alla parte ordinata, scambiandolo con l'elemento che occupava quel posto. L'array cresce ordinatamente da sinistra verso destra, selezionando sempre il minimo rimanente.

---

# 14. Insertion Sort

L'**Insertion Sort** inserisce ogni elemento al suo posto corretto facendolo scorrere a ritroso all'interno della porzione di array già ordinata.

## 14.1 Esempio di esecuzione
Array iniziale: `[12, 6, 1, 20, 2, 8]`
* **Passo 1:** Si parte dal primo elemento (12) che forma la sottosequenza ordinata iniziale.
* **Passo 2:** Si prende il 6. È minore di 12, quindi 12 scala a destra e 6 si inserisce all'inizio: `[6, 12, 1, 20, 2, 8]`.
* **Passo 3:** Si prende l'1. Lo confrontiamo con 12 e con 6, entrambi scalano e l'1 si inserisce all'inizio: `[1, 6, 12, 20, 2, 8]`.
* **Passo 4:** Si prende il 20. È maggiore di 12, quindi resta nella sua posizione: `[1, 6, 12, 20, 2, 8]`.
* **Passo 5:** Si prende il 2. È minore di 20, di 12 e di 6; scala fino a posizionarsi dopo l'1: `[1, 2, 6, 12, 20, 8]`.
* **Passo 6:** Si finisce prendendo l'8. È minore di 20 e di 12 ma maggiore di 6, quindi si posiziona tra 6 e 12: `[1, 2, 6, 8, 12, 20]`.

![Figura 27: Array finale completamente ordinato](images/psd/figura_27.png)

### Implementazione in C:
```c
void insertionSort(int a[], int n) {
    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
}
```

> [!NOTE]
> **Sunto: Insertion Sort**  
> L'Insertion Sort ordina i dati nello stesso modo in cui ordiniamo le carte da gioco in mano: consideri la prima carta come già ordinata, poi prendi una carta alla volta da quelle rimanenti e la inserisci nella posizione corretta facendola scorrere all'indietro tra le carte già sistemate finché non trovi quella più piccola. È rapidissimo se l'array è già quasi ordinato.

---

# 15. Merge Sort

Il **Merge Sort** è un algoritmo ricorsivo basato sul paradigma **Divide et Impera**: divide l'array a metà, ordina ricorsivamente le due metà e poi le unisce (*merge*).

## 15.1 Esempio di esecuzione: Fase di Divisione

![Figura 28: Fase di Divisione (Top-Down)](images/psd/figura_28.png)

## 15.2 Esempio di esecuzione: Fase di Unione (Merge)
Ora l'algoritmo deve risolvere i sottoproblemi: unisce i sottoarray ordinandoli gradualmente dal basso verso l'alto.

![Figura 29: Fase di Unione e Ordinamento (Bottom-Up)](images/psd/figura_29.png)

### Implementazione in C:
```c
void merge(int a[], int left, int center, int right) {
    int i = left;
    int j = center + 1;
    int k = 0;
    int *b = malloc((right - left + 1) * sizeof(int));

    while (i <= center && j <= right) {
        if (a[i] <= a[j]) {
            b[k++] = a[i++];
        } else {
            b[k++] = a[j++];
        }
    }
    while (i <= center) b[k++] = a[i++];
    while (j <= right) b[k++] = a[j++];

    for (k = left; k <= right; k++) {
        a[k] = b[k - left];
    }
    free(b);
}

void mergeSort(int a[], int left, int right) {
    if (left < right) {
        int center = (left + right) / 2;
        mergeSort(a, left, center);
        mergeSort(a, center + 1, right);
        merge(a, left, center, right);
    }
}
```

> [!NOTE]
> **Sunto: Merge Sort**  
> Il Merge Sort applica la strategia "Divide et Impera": spacca a metà l'array ricorsivamente fino a ridurlo in tanti piccoli pezzettini da un solo elemento (che per forza di cose sono già ordinati). Poi, risalendo, unisce a due a due questi pezzetti mettendoli in ordine (operazione di Merge). È garantito che sia velocissimo ($O(n \log n)$ sempre), ma richiede memoria extra per l'array di appoggio durante la fusione.

---

# 16. Quick Sort

Il **Quick Sort** si basa sul paradigma Divide et Impera ma, a differenza del Merge Sort, la maggior parte del lavoro computazionale avviene durante la fase di divisione (**Partizionamento**).

## 16.1 La Funzione di Partizionamento
La funzione sceglie un elemento detto **Pivot** e riorganizza l'array in modo che tutti gli elementi minori del pivot finiscano a sinistra e tutti quelli maggiori a destra.

### Implementazione in C:
```c
int partition(int a[], int left, int right) {
    int pivot = a[right];
    int i = left - 1;
    for (int j = left; j < right; j++) {
        if (a[j] <= pivot) {
            i++;
            swap(&a[i], &a[j]);
        }
    }
    swap(&a[i + 1], &a[right]);
    return (i + 1);
}

void quickSort(int a[], int left, int right) {
    if (left < right) {
        int q = partition(a, left, right);
        quickSort(a, left, q - 1);
        quickSort(a, q + 1, right);
    }
}
```

> [!NOTE]
> **Sunto: Quick Sort**  
> Il Quick Sort sceglie un elemento come perno (Pivot) e smazza l'array spostando tutti i numeri più piccoli a sinistra del pivot e tutti quelli più grandi a destra. A questo punto il pivot è definitivamente nella sua posizione finale corretta! Si ripete poi la stessa procedura separatamente sulla metà sinistra e sulla metà destra. In media è il più veloce di tutti perché ordina direttamente sul posto senza sprecare memoria aggiuntiva.

---

# 17. Complessità Computazionale

La complessità computazionale valuta l'efficienza di un algoritmo misurando il tempo di esecuzione e lo spazio di memoria occupato al variare della dimensione dell'input $n$.

A lezione si utilizza il **Modello RAM** (*Random Access Machine*):
* Ogni operazione elementare ha costo unitario costante $O(1)$.
* Il costo totale è dato dalla somma delle operazioni eseguite nel caso peggiore.

### Notazioni Asintotiche:
* **$O$ (O-grande / Upper Bound):** Limite superiore asintotico ($f(n) \le c \cdot g(n)$).
* **$\Omega$ (Omega / Lower Bound):** Limite inferiore asintotico ($f(n) \ge c \cdot g(n)$).
* **$\Theta$ (Theta / Tight Bound):** Limite asintotico stretto ($c_1 \cdot g(n) \le f(n) \le c_2 \cdot g(n)$).

> [!NOTE]
> **Sunto: Complessità Computazionale**  
> La complessità serve a misurare quanto un algoritmo è "pesante" in termini di tempo e memoria all'aumentare dei dati. Si usano i simboli asintotici per dare un voto: l'O-grande ($O$) indica il caso peggiore (la garanzia che non farà mai peggio di così), l'Omega ($\Omega$) indica il caso migliore, e il Theta ($\Theta$) indica che il comportamento è esattamente quello in ogni situazione.

---

# 18. Tabella Comparativa Finale

| Algoritmo | Caso Migliore ($Best$) | Caso Medio ($Average$) | Caso Peggiore ($Worst$) | Memoria Ausiliaria | In Loco (*In-Place*) | Stabile | Paradigma |
|---|---|---|---|---|---|---|---|
| **Selection Sort** | $\Theta(n^2)$ | $\Theta(n^2)$ | $\Theta(n^2)$ | $O(1)$ | **Sì** | **No** | Incrementale / Selezione del minimo |
| **Insertion Sort** | $\Theta(n)$ | $\Theta(n^2)$ | $\Theta(n^2)$ | $O(1)$ | **Sì** | **Sì** | Incrementale / Inserimento ordinato |
| **Bubble Sort** | $\Theta(n)$ | $\Theta(n^2)$ | $\Theta(n^2)$ | $O(1)$ | **Sì** | **Sì** | Incrementale / Scambi adiacenti |
| **Quick Sort** | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n^2)$ | $O(\log n)$ | **Sì** | **No** | Divide et Impera |
| **Merge Sort** | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $O(n)$ | **No** | **Sì** | Divide et Impera |
