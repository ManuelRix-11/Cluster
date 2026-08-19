# Matematica Discreta

> **Autore:** Prof. C. Delizia

---

## Indice dei Contenuti

1. [Insiemi](#1-insiemi)
   - [1.1 Concetti di base](#11-concetti-di-base)
   - [1.2 Modi di rappresentare un insieme](#12-modi-di-rappresentare-un-insieme)
   - [1.3 Logica: implicazione, quantificatori, negazione](#13-logica-implicazione-quantificatori-negazione)
   - [1.4 Sottoinsiemi](#14-sottoinsiemi)
   - [1.5 Insiemi numerici notevoli](#15-insiemi-numerici-notevoli)
   - [1.6 Dimostrazioni: dirette, indirette, controesempi](#16-dimostrazioni-dirette-indirette-controesempi)
   - [1.7 Operazioni tra insiemi](#17-operazioni-tra-insiemi)
   - [1.8 Formule di De Morgan](#18-formule-di-de-morgan)
   - [1.9 Insieme delle parti](#19-insieme-delle-parti)
   - [1.10 Coppie ordinate, prodotto cartesiano, n-uple](#110-coppie-ordinate-prodotto-cartesiano-n-uple)
   - [1.11 Principio di induzione](#111-principio-di-induzione)
2. [Corrispondenze e applicazioni](#2-corrispondenze-e-applicazioni)
   - [2.1 Corrispondenze](#21-corrispondenze)
   - [2.2 Applicazioni](#22-applicazioni)
   - [2.3 Iniettività, suriettività, biettività](#23-iniettività-suriettività-biettività)
   - [2.4 Immagine e controimmagine di un sottoinsieme](#24-immagine-e-controimmagine-di-un-sottoinsieme)
   - [2.5 Composizione di applicazioni](#25-composizione-di-applicazioni)
   - [2.6 Applicazione inversa](#26-applicazione-inversa)
3. [Matrici](#3-matrici)
   - [3.1 Definizioni di base](#31-definizioni-di-base)
   - [3.2 Operazioni tra matrici](#32-operazioni-tra-matrici)
   - [3.3 Riduzione a scala](#33-riduzione-a-scala)
   - [3.4 Determinante](#34-determinante)
   - [3.5 Matrici invertibili](#35-matrici-invertibili)
   - [3.6 Sottomatrici, minori, rango](#36-sottomatrici-minori-rango)
4. [Relazioni di equivalenza](#4-relazioni-di-equivalenza)
   - [4.1 Relazioni in un insieme](#41-relazioni-in-un-insieme)
   - [4.2 Classi di equivalenza](#42-classi-di-equivalenza)
   - [4.3 Insieme quoziente](#43-insieme-quoziente)
   - [4.4 Partizioni](#44-partizioni)
   - [4.5 Teorema fondamentale delle relazioni di equivalenza](#45-teorema-fondamentale-delle-relazioni-di-equivalenza)
5. [Aritmetica](#5-aritmetica)
   - [5.1 Divisibilità in $\mathbb{Z}$](#51-divisibilità-in-mathbbz)
   - [5.2 Numeri primi](#52-numeri-primi)
   - [5.3 Divisione euclidea](#53-divisione-euclidea)
   - [5.4 Massimo comun divisore](#54-massimo-comun-divisore)
   - [5.5 Minimo comune multiplo](#55-minimo-comune-multiplo)
   - [5.6 Rappresentazione in base $b$](#56-rappresentazione-in-base-b)
   - [5.7 Due lemmi utili](#57-due-lemmi-utili)
   - [5.8 Congruenze modulo $n$](#58-congruenze-modulo-n)
   - [5.9 Equazioni congruenziali lineari](#59-equazioni-congruenziali-lineari)
   - [5.10 Sistemi di equazioni congruenziali e Teorema Cinese del Resto](#510-sistemi-di-equazioni-congruenziali-e-teorema-cinese-del-resto)
6. [Calcolo combinatorio](#6-calcolo-combinatorio)
   - [6.1 Principi di addizione e di inclusione-esclusione](#61-principi-di-addizione-e-di-inclusione-esclusione)
   - [6.2 Principio di moltiplicazione](#62-principio-di-moltiplicazione)
   - [6.3 Fattoriale e coefficienti binomiali](#63-fattoriale-e-coefficienti-binomiali)
   - [6.4 Applicazioni tra insiemi finiti: conteggio](#64-applicazioni-tra-insiemi-finiti-conteggio)
   - [6.5 Permutazioni](#65-permutazioni)
   - [6.6 Combinazioni](#66-combinazioni)
   - [6.7 Permutazioni con ripetizione](#67-permutazioni-con-ripetizione)
7. [Relazioni d'ordine](#7-relazioni-dordine)
   - [7.1 Relazioni asimmetriche e relazioni d'ordine](#71-relazioni-asimmetriche-e-relazioni-dordine)
   - [7.2 Minore stretto e diagramma di Hasse](#72-minore-stretto-e-diagramma-di-hasse)
   - [7.3 Ordine totale](#73-ordine-totale)
   - [7.4 Minimo, massimo, elementi minimali e massimali](#74-minimo-massimo-elementi-minimali-e-massimali)
   - [7.5 Minoranti, maggioranti, estremo inferiore e superiore](#75-minoranti-maggioranti-estremo-inferiore-e-superiore)
   - [7.6 Reticoli](#76-reticoli)
   - [7.7 Buon ordinamento](#77-buon-ordinamento)
8. [Strutture algebriche](#8-strutture-algebriche)
   - [8.1 Operazioni binarie e strutture algebriche](#81-operazioni-binarie-e-strutture-algebriche)
   - [8.2 Le operazioni in $\mathbb{Z}_n$](#82-le-operazioni-in-mathbbz_n)
   - [8.3 Proprietà delle operazioni](#83-proprietà-delle-operazioni)
   - [8.4 Elemento neutro ed elementi simmetrizzabili](#84-elemento-neutro-ed-elementi-simmetrizzabili)
   - [8.5 Sottostrutture](#85-sottostrutture)
   - [8.6 Semigruppi, monoidi, gruppi](#86-semigruppi-monoidi-gruppi)
   - [8.7 Anelli e campi](#87-anelli-e-campi)
   - [8.8 Divisori dello zero e domini d'integrità](#88-divisori-dello-zero-e-domini-dintegrità)
   - [8.9 Matrici a elementi in un anello](#89-matrici-a-elementi-in-un-anello)
   - [8.10 Determinante su un anello](#810-determinante-su-un-anello)
   - [8.11 Rango su un campo](#811-rango-su-un-campo)
9. [Sistemi lineari](#9-sistemi-lineari)
   - [9.1 Definizioni di base](#91-definizioni-di-base)
   - [9.2 Teorema di Cramer](#92-teorema-di-cramer)
   - [9.3 Metodo generale (Gauss-Jordan)](#93-metodo-generale-gauss-jordan)
10. [Spazi vettoriali](#10-spazi-vettoriali)
    - [10.1 La struttura $K^n$](#101-la-struttura-kn)
    - [10.2 Spazi vettoriali e sottospazi](#102-spazi-vettoriali-e-sottospazi)
    - [10.3 Combinazioni lineari](#103-combinazioni-lineari)
    - [10.4 Insiemi di generatori](#104-insiemi-di-generatori)
    - [10.5 Indipendenza lineare](#105-indipendenza-lineare)
    - [10.6 Basi e dimensione](#106-basi-e-dimensione)
    - [10.7 Metodo pratico: rango e basi](#107-metodo-pratico-rango-e-basi)
    - [10.8 Applicazioni lineari](#108-applicazioni-lineari)
    - [10.9 Nucleo e immagine](#109-nucleo-e-immagine)
11. [Diagonalizzazione](#11-diagonalizzazione)
    - [11.1 Autovalori e autovettori](#111-autovalori-e-autovettori)
    - [11.2 Autospazi](#112-autospazi)
    - [11.3 Matrici diagonalizzabili e teorema spettrale](#113-matrici-diagonalizzabili-e-teorema-spettrale)
12. [Geometria analitica](#12-geometria-analitica)
    - [12.1 Il piano cartesiano](#121-il-piano-cartesiano)
    - [12.2 Rette nel piano](#122-rette-nel-piano)
    - [12.3 Lo spazio euclideo tridimensionale](#123-lo-spazio-euclideo-tridimensionale)
    - [12.4 Mutua posizione di rette](#124-mutua-posizione-di-rette)
    - [12.5 Piani nello spazio](#125-piani-nello-spazio)
    - [12.6 Mutua posizione di retta e piano](#126-mutua-posizione-di-retta-e-piano)
    - [12.7 Mutua posizione di due piani](#127-mutua-posizione-di-due-piani)
    - [12.8 Equazione cartesiana del piano](#128-equazione-cartesiana-del-piano)
    - [12.9 Equazioni cartesiane della retta nello spazio](#129-equazioni-cartesiane-della-retta-nello-spazio)

---

## 1. Insiemi

### 1.1 Concetti di base

> [!NOTE]
> **Definizione di Insieme**  
> Un **insieme** è una qualunque collezione di oggetti, detti **elementi** dell'insieme.

**Esempi:**
- $A = \{1, 2, 3, 4, 5\}$
- $B = \{m, a, t, e, i, c\}$
- $C = \{\text{Giuseppe, Mario, Lucia, Valeria}, \dots\}$
- $D = \{1, b, \square, \bigstar\}$

> [!TIP]
> Negli insiemi è **irrilevante l'ordine** in cui gli elementi sono scritti, e **non conta se un elemento compare più volte**:
> $$\{3, 1, 5, 4, 1, 3, 2\} = \{1, 2, 3, 4, 5\}$$

- **Appartenenza:**  
  Per indicare che un oggetto $x$ è elemento di un insieme $S$ si scrive $x \in S$ (*"appartiene"*); se non lo è, si scrive $x \notin S$ (*"non appartiene"*).

- **Cardinalità e Ordine:**  
  Dato un insieme $S$, si denota con $|S|$ l'**ordine** (o cardinalità) di $S$, cioè il numero dei suoi elementi.
  - Un insieme si dice **finito** se il suo ordine è finito, altrimenti **infinito** (es. $\mathbb{Z}$).
  - Un insieme di ordine $0$ si dice **insieme vuoto**, denotato con $\emptyset$.
  - Gli insiemi di ordine $1$ si dicono **singoletoni** (es. $F = \{5\}$).

---

### 1.2 Modi di rappresentare un insieme

1. **Per elencazione** degli elementi: es. $A = \{1, 2, 3, 4, 5\}$.
2. **Per proprietà caratteristica**:
   $$A = \{x : x \text{ è un numero reale positivo } < 6\}$$
   *(il simbolo "$:$" si legge "tale che")*.
3. **Mediante diagramma di Venn**.

---

### 1.3 Logica: implicazione, quantificatori, negazione

- $P \Rightarrow Q$ (*"P implica Q"*): se $P$ è vera allora $Q$ è vera.
- $P \Leftrightarrow Q$ (*"P equivale a Q"*): $P \Rightarrow Q$ e $Q \Rightarrow P$, cioè $P$ e $Q$ hanno lo stesso valore di verità.
- **Definizione per doppia implicazione:** si usa il simbolo $\overset{def}{\Leftrightarrow}$.

#### Quantificatori
- $\forall$ — *"per ogni"* (quantificatore universale)
- $\exists$ — *"esiste almeno un"* (quantificatore esistenziale)
- $\exists!$ — *"esiste ed è unico"*

**Esempio con $A = \{1, 2, 3, 4, 5\}$:**
- $\forall x \in A,\ x < 6$ — **VERO**
- $\exists x \in A : x > 2$ — **VERO**
- $\exists! x \in A : x > 2$ — **FALSO** *(ne esistono diversi: 3, 4, 5)*
- $\exists! x \in A : x > 4$ — **VERO** *(solo 5)*

#### Negazione
Se $P$ è una proposizione, $\lnot P$ ne denota la negazione.
- In particolare, la negazione di $\exists! x \in A : P(x)$ è:
  > *"$\forall x,y \in A$ con $x,y$ che verificano $P$, oppure $\nexists x \in A$ che verifica $P$"* (nessuno o più di uno verificano la proprietà).

> [!NOTE]
> **Regola generale di negazione dei quantificatori annidati:**  
> Se $P \equiv \forall x \in T,\ \exists y \in S : x + y = 4$, allora:
> $$\lnot P \equiv \exists x \in T : \forall y \in S,\ x + y \neq 4$$
> *(ogni $\forall$ diventa $\exists$, ogni $\exists$ diventa $\forall$, e la proposizione conclusiva si nega)*.

---

### 1.4 Sottoinsiemi

> [!NOTE]
> **Definizione di Sottoinsieme**  
> Sia $A$ un insieme. Un insieme $B$ si dice **sottoinsieme** di $A$ se e solo se ogni elemento di $B$ appartiene ad $A$:
> $$B \subseteq A \overset{def}{\Leftrightarrow} \forall b \in B,\ b \in A$$

- **Principio della doppia inclusione:**
  $$A \subseteq B \land B \subseteq A \iff A = B$$

- **Inclusione stretta (sottoinsieme proprio):**
  $$B \subsetneq A \overset{def}{\Leftrightarrow} B \subseteq A \land B \neq A \iff (B \subseteq A \land \exists a \in A : a \notin B)$$
  Un sottoinsieme $T \subsetneq S$ si dice **sottoinsieme proprio** di $S$.

**Esempio:**  
Per $A = \{1, 2, 3, 4, 5\}$, i sottoinsiemi banali sono $\emptyset$ e $A$; vi sono poi i singoletoni, le coppie, le terne, le quaterne — in totale $2^5 = 32$ sottoinsiemi.

> [!IMPORTANT]
> **Teorema sul numero di sottoinsiemi**  
> Se $A$ è un insieme finito con $|A| = n$, allora $A$ possiede esattamente $2^n$ sottoinsiemi.

---

### 1.5 Insiemi numerici notevoli

$$\mathbb{N} = \{1, 2, 3, 4, 5, \dots\} \qquad \mathbb{N}_0 = \{0, 1, 2, 3, \dots\} \qquad \mathbb{Z} = \{\dots, -2, -1, 0, 1, 2, \dots\}$$

$$\mathbb{Q} = \left\{\frac{a}{b} : a \in \mathbb{Z}, b \in \mathbb{Z}, b \neq 0\right\} \qquad \mathbb{R} = \{x : x \text{ è un numero reale}\}$$

$$\mathbb{N}_p = \{0, 2, 4, 6, \dots\} = \{2x : x \in \mathbb{N}_0\} \quad \text{(pari non negativi)}$$

$$\mathbb{N}_d = \{1, 3, 5, \dots\} = \{2x + 1 : x \in \mathbb{N}_0\} \quad \text{(dispari)}$$

- **Notazione generale dei multipli:**  
  $\forall t \in \mathbb{Z},\ t\mathbb{Z} = \{tx : x \in \mathbb{Z}\}$ (multipli di $t$); analogamente $t\mathbb{N}_0 = \{tx : x \in \mathbb{N}_0\}$.

---

### 1.6 Dimostrazioni: dirette, indirette, controesempi

- **Dimostrazione diretta:** si assume vera l'ipotesi e si deduce logicamente la tesi passo dopo passo.
- **Dimostrazione indiretta (per assurdo):** per dimostrare $P \Rightarrow Q$, si dimostra la proposizione contronominale equivalente $\lnot Q \Rightarrow \lnot P$.
- **Controesempio:** per dimostrare che una proposizione universale $\forall x,\ P(x)$ è **falsa**, è sufficiente esibire un singolo elemento $x$ per cui $P(x)$ non è verificata.

**Esempio di confronto (dimostrazione diretta vs indiretta):**  
Dimostrare che $x \in \mathbb{N}_p \Rightarrow x + 1 \in \mathbb{N}_d$.
- *Dimostrazione diretta:*  
  $$x \in \mathbb{N}_p \implies \exists t \in \mathbb{N}_0 : x = 2t \implies x + 1 = 2t + 1 \implies x + 1 \in \mathbb{N}_d$$
- *Dimostrazione indiretta:*  
  Si suppone per assurdo $x + 1 \in \mathbb{N}_p \implies \exists t \in \mathbb{N}_0 : x + 1 = 2t \implies x = 2(t - 1) + 1 \in \mathbb{N}_d$, il che contraddice l'ipotesi iniziale $x \in \mathbb{N}_p$. $\blacksquare$

---

### 1.7 Operazioni tra insiemi

#### 1. Unione
$$A \cup B \overset{def}{=} \{x : x \in A \text{ oppure } x \in B\}$$

**Proprietà dell'unione:**
1. $A \cup B = B \cup A$ *(commutativa)*
2. $A \cup \emptyset = A$
3. $A \cup A = A$ *(idempotente / iterativa)*
4. $(A \cup B) \cup C = A \cup (B \cup C)$ *(associativa)*
5. $A \subseteq A \cup B$
6. $A \cup B = A \iff B \subseteq A$

#### 2. Intersezione
$$A \cap B \overset{def}{=} \{x : x \in A \text{ e } x \in B\}$$

**Proprietà dell'intersezione:**
1. $A \cap B = B \cap A$ *(commutativa)*
2. $A \cap \emptyset = \emptyset$
3. $A \cap A = A$ *(idempotente / iterativa)*
4. $(A \cap B) \cap C = A \cap (B \cap C)$ *(associativa)*
5. $A \cap B \subseteq A$
6. $A \cap B = A \iff A \subseteq B$

#### 3. Differenza
$$A \setminus B \overset{def}{=} \{x : x \in A \text{ e } x \notin B\}$$

**Proprietà della differenza:**
1. In generale $A \setminus B \neq B \setminus A$ *(non commutativa)*  
   *(es. $A = \{1, 2, 3\}, B = \{3, 4\} \implies A \setminus B = \{1, 2\},\ B \setminus A = \{4\}$)*
2. $A \setminus \emptyset = A \quad \text{e} \quad \emptyset \setminus A = \emptyset$
3. $A \setminus A = \emptyset$
4. In generale $(A \setminus B) \setminus C \neq A \setminus (B \setminus C)$ *(non associativa)*  
   *(es. $A = \{1, 2, 3\}, B = \{3, 4\}, C = \{1, 4, 5\} \implies (A \setminus B) \setminus C = \{2\}$ mentre $A \setminus (B \setminus C) = \{1, 2\}$)*
5. $A \setminus B \subseteq A$
6. $A \setminus B = A \iff A \cap B = \emptyset$

**Esempio di dimostrazione completa (Proprietà 6):**
- **$(\Rightarrow)$:** Per ipotesi $A \setminus B = A$. Se per assurdo $A \cap B \neq \emptyset$, allora esiste $x \in A \cap B \implies x \in A \land x \in B$. Ma da $x \in A = A \setminus B$ segue $x \notin B$, contraddizione. Dunque $A \cap B = \emptyset$.
- **$(\Leftarrow)$:** Per ipotesi $A \cap B = \emptyset$. L'inclusione $A \setminus B \subseteq A$ vale sempre (prop. 5). Proviamo $A \subseteq A \setminus B$: per ogni $x \in A$, se per assurdo $x \notin A \setminus B$, allora $x \notin A \lor x \in B$. Essendo $x \in A$, deve essere $x \in B$, da cui $x \in A \cap B = \emptyset$, assurdo. Dunque $x \in A \setminus B$. $\blacksquare$

#### 4. Unione Disgiunta e Differenza Simmetrica
- **Unione disgiunta:**
  $$A \mathbin{\dot\cup} B \overset{def}{=} (A \cup B) \setminus (A \cap B)$$
- **Differenza simmetrica:**
  $$A \triangle B \overset{def}{=} (A \setminus B) \cup (B \setminus A)$$

> [!IMPORTANT]
> **Teorema sull'equivalenza**  
> $$A \mathbin{\dot\cup} B = A \triangle B$$
>
> **Dimostrazione:** Analizzando i 4 casi possibili di appartenenza di un elemento $x$ ad $A$ e $B$, solo due sono compatibili con la definizione di $A \mathbin{\dot\cup} B$ ($x \in A \land x \notin B$ oppure $x \in B \land x \notin A$), che coincide esattamente con la definizione di $A \triangle B$. L'altra inclusione è speculare. $\blacksquare$

- **Proprietà dell'unione disgiunta:** è commutativa, associativa, $A \mathbin{\dot\cup} A = \emptyset$, $A \mathbin{\dot\cup} \emptyset = A$.
- **Osservazione:** se $B \subseteq A$, allora $A \mathbin{\dot\cup} B = A \setminus B$.

---

### 1.8 Formule di De Morgan

> [!IMPORTANT]
> Siano $A, B, C$ insiemi. Allora valgono le **leggi di De Morgan**:
> 1. $$A \setminus (B \cup C) = (A \setminus B) \cap (A \setminus C)$$
> 2. $$A \setminus (B \cap C) = (A \setminus B) \cup (A \setminus C)$$

**Traccia della dimostrazione per la formula (1):**
$$x \in A \setminus (B \cup C) \iff x \in A \land x \notin (B \cup C) \iff x \in A \land (x \notin B \land x \notin C)$$
$$\iff (x \in A \land x \notin B) \land (x \in A \land x \notin C) \iff x \in (A \setminus B) \cap (A \setminus C) \quad \blacksquare$$

---

### 1.9 Insieme delle parti

> [!NOTE]
> **Definizione di Insieme delle Parti**  
> Sia $A$ un insieme. Si definisce **insieme delle parti** (o insieme potenza) di $A$ l'insieme formato da tutti i sottoinsiemi di $A$:
> $$\mathcal{P}(A) \overset{def}{=} \{B : B \subseteq A\}$$

| $|A|$ | $|\mathcal{P}(A)|$ |
| :---: | :---: |
| 0 | $1 = 2^0$ |
| 1 | $2 = 2^1$ |
| 2 | $4 = 2^2$ |
| 3 | $8 = 2^3$ |

> [!IMPORTANT]
> **Teorema sulla cardinalità delle parti**  
> Per ogni intero $n \ge 0$:
> $$|A| = n \implies |\mathcal{P}(A)| = 2^n$$
>
> **Dimostrazione per induzione su $n$:**
> - **Base induttiva ($n = 0$):**  
>   $|A| = 0 \implies A = \emptyset \implies \mathcal{P}(A) = \{\emptyset\} \implies |\mathcal{P}(A)| = 1 = 2^0$.
> - **Passo induttivo:**  
>   Supponiamo il teorema vero per $|A| = n$ e dimostriamolo per un insieme $B$ con $|B| = n + 1$.  
>   Poiché $|B| \ge 1$, scegliamo un elemento $\bar{x} \in B$. I sottoinsiemi di $B$ si ripartiscono in due famiglie disgiunte:
>   1. Sottoinsiemi che **non contengono** $\bar{x}$: sono tutti e soli i sottoinsiemi di $B \setminus \{\bar{x}\}$, che per ipotesi induttiva sono $2^n$.
>   2. Sottoinsiemi che **contengono** $\bar{x}$: ciascuno si ottiene aggiungendo $\bar{x}$ a uno dei sottoinsiemi di $B \setminus \{\bar{x}\}$, quindi sono anch'essi $2^n$.
>   
>   In totale:
>   $$|\mathcal{P}(B)| = 2^n + 2^n = 2 \cdot 2^n = 2^{n+1} \quad \blacksquare$$

---

### 1.10 Coppie ordinate, prodotto cartesiano, n-uple

- **Coppia ordinata $(a, b)$:** ha $a$ come prima componente e $b$ come seconda. Per definizione:
  $$(a, b) = (c, d) \overset{def}{\iff} a = c \land b = d$$
  In particolare, $(a, b) = (b, a) \iff a = b$.

- **Prodotto cartesiano:**
  $$A \times B \overset{def}{=} \{(a, b) : a \in A, b \in B\}$$

**Esempio:**  
Se $A = \{1, 2\}$ e $B = \{a, b, c\}$, allora:
$$A \times B = \{(1, a), (1, b), (1, c), (2, a), (2, b), (2, c)\}$$

**Osservazioni utili:**
- $\emptyset \times A = A \times \emptyset = \emptyset$
- $A \times A = \{(x, y) : x \in A, y \in A\}$
- Se $C = \{x\}$ è un singoletto, $C \times \mathbb{N} = \{(x, y) : y \in \mathbb{N}\}$

- **$n$-upla e Prodotto cartesiano generalizzato:**  
  Per $n \ge 2$, una $n$-upla è una scrittura $(a_1, a_2, \dots, a_n)$ con $a_i \in A_i$. Il prodotto cartesiano è:
  $$A_1 \times A_2 \times \cdots \times A_n \overset{def}{=} \{(a_1, a_2, \dots, a_n) : a_i \in A_i,\ \forall i = 1, \dots, n\}$$
  Se esiste almeno un $i$ tale che $A_i = \emptyset$, allora $A_1 \times \cdots \times A_n = \emptyset$.

---

### 1.11 Principio di induzione

> [!NOTE]
> **Principio di Induzione Matematica**  
> Data una successione infinita di proposizioni $\{P_n\}_{n \ge \bar{n}}$ indicizzate in $\mathbb{N}_0$, per dimostrare che $P_n$ è vera per ogni $n \ge \bar{n}$ è sufficiente provare che:
> 1. **Base dell'induzione:** $P_{\bar{n}}$ è vera.
> 2. **Passo induttivo:** $\forall n \ge \bar{n},\ P_n \text{ vera} \implies P_{n+1} \text{ vera}$  
>    *(assumendo vera $P_n$, detta **ipotesi induttiva**)*.

#### Esempi svolti

- **Esempio 1: Somma dei primi $n$ interi**
  $$1 + 2 + 3 + \cdots + n = \frac{n(n + 1)}{2} \quad \forall n \ge 1$$
  - *Base ($n = 1$):* $1 = \frac{1 \cdot 2}{2} = 1$ (Vera).
  - *Passo induttivo:* Assumendo $1 + \dots + n = \frac{n(n+1)}{2}$, valutiamo:
    $$(1 + \dots + n) + (n + 1) = \frac{n(n + 1)}{2} + (n + 1) = \frac{n(n + 1) + 2(n + 1)}{2} = \frac{(n + 1)(n + 2)}{2} \quad \checkmark$$

- **Esempio 2: Somma dei primi $n$ numeri dispari**
  $$1 + 3 + 5 + \cdots + (2n - 1) = n^2 \quad \forall n \ge 1$$
  - *Base ($n = 1$):* $1 = 1^2$ (Vera).
  - *Passo induttivo:* Assumendo $1 + \dots + (2n - 1) = n^2$:
    $$(1 + \dots + (2n - 1)) + (2n + 1) = n^2 + 2n + 1 = (n + 1)^2 \quad \checkmark$$

- **Esempio 3: Prodotto notevole**
  $$\left(1 - \frac{1}{2}\right)\left(1 - \frac{1}{3}\right)\cdots\left(1 - \frac{1}{n}\right) = \frac{1}{n} \quad \forall n \ge 2$$
  - *Base ($n = 2$):* $1 - \frac{1}{2} = \frac{1}{2}$ (Vera).
  - *Passo induttivo:* Moltiplicando l'ipotesi induttiva per $\left(1 - \frac{1}{n+1}\right) = \frac{n}{n+1}$:
    $$\frac{1}{n} \cdot \frac{n}{n + 1} = \frac{1}{n + 1} \quad \checkmark$$

> [!WARNING]
> **Nota metodologica:** Nel passo induttivo **non si sceglie** un valore numerico particolare di $n$, ma si dimostra l'implicazione $P_n \implies P_{n+1}$ in forma generale per ogni $n \ge \bar{n}$.

---

## 2. Corrispondenze e applicazioni

### 2.1 Corrispondenze

> [!NOTE]
> **Definizione di Corrispondenza**  
> Dati due insiemi $A$ e $B$, un qualunque sottoinsieme $R \subseteq A \times B$ è detto una **corrispondenza tra $A$ e $B$**.  
> Le coppie $(a, b) \in R$ sono dette coppie di elementi in corrispondenza. L'insieme delle corrispondenze coincide con $\mathcal{P}(A \times B)$, il cui numero è $2^{|A||B|}$.

- **Corrispondenze banali:** $\emptyset = R_0$ (corrispondenza vuota) e $A \times B = R_T$ (corrispondenza totale).
- **Notazione:** se $(a, b) \in R$ si scrive $aRb$; se $(a, b) \notin R$ si scrive $a\cancel{R}b$.

**Esempi:**
- $R_1 = \{(x, y) \in \mathbb{Q} \times \mathbb{Q} : x = 2y\}$: ad esempio $\left(\frac{2}{3}, \frac{4}{3}\right) \notin R_1$ mentre $\left(\frac{4}{3}, \frac{2}{3}\right) \in R_1$.
- $R_2 = \{(x, y) \in \mathbb{N}_0 \times \mathbb{Z} : x = -y\}$
- $R_3 = \{(x, y) \in \mathbb{Z} \times \mathbb{N}_0 : |x| = y\}$
- $R_4 = \{(x, y) \in \mathbb{Z} \times \mathbb{Z} : x = |y|\}$
- $R_5 = \{(x, y) \in \mathbb{Z} \times \mathbb{N}_0 : y = |x| + 2\}$
- $R_6 = \{(x, y) \in \mathbb{Z} \times \mathbb{Q} : y = \frac{1}{x}\}$ *(non definita per $x = 0$)*
- $R_7 = \left\{\left(\frac{a}{b}, y\right) \in \mathbb{Q} \times \mathbb{Z} : y = a + b\right\}$ *(non ben definita: $\frac{2}{3} = \frac{4}{6}$ ma $2+3=5 \neq 4+6=10$)*

---

### 2.2 Applicazioni

> [!NOTE]
> **Definizione di Applicazione (Funzione)**  
> Una corrispondenza $R \subseteq A \times B$ si dice **applicazione** (o funzione) da $A$ a $B$ se:
> $$\forall a \in A,\ \exists! b \in B : aRb$$
> In tal caso si scrive $f: A \to B$ oppure $R: A \to B$.

- L'unico elemento $b \in B$ associato ad $a$ si dice **immagine di $a$** e si denota con $f(a)$.
- L'insieme $A$ è detto **dominio**, l'insieme $B$ è detto **codominio**.

**Esempi di verifica:**
- $R_1$ è un'applicazione ben definita: $f_1: \mathbb{Q} \to \mathbb{Q},\quad x \mapsto \frac{x}{2}$.
- $R_2, R_3, R_4, R_5$ sono tutte applicazioni ($f_2, f_3, f_4, f_5$).
- $R_6, R_7$ **non sono applicazioni** (mancanza di definizione su $0$ o ambiguità di rappresentazione).

---

### 2.3 Iniettività, suriettività, biettività

> [!IMPORTANT]
> Sia $f: A \to B$ un'applicazione:
> 1. **Iniettiva:**
>    $$\forall a_1, a_2 \in A,\ a_1 \neq a_2 \implies f(a_1) \neq f(a_2) \iff (f(a_1) = f(a_2) \implies a_1 = a_2)$$
> 2. **Suriettiva:**
>    $$\forall b \in B,\ \exists a \in A : f(a) = b$$
> 3. **Biettiva (o biunivoca):**
>    $f$ è contemporaneamente **iniettiva** e **suriettiva**.

> [!TIP]
> **Iniettività e suriettività sono proprietà indipendenti tra loro:**
> - $f_1(x) = \frac{x}{2}$ su $\mathbb{Q} \to \mathbb{Q}$ è **iniettiva e suriettiva** (biettiva).
> - $f_2(x) = -x$ su $\mathbb{N}_0 \to \mathbb{Z}$ è **iniettiva ma non suriettiva** (le immagini sono solo $\le 0$).
> - $f_3(x) = |x|$ su $\mathbb{Z} \to \mathbb{N}_0$ è **suriettiva ma non iniettiva** (es. $f(2) = f(-2) = 2$).
> - $f_4(x) = |x|$ su $\mathbb{Z} \to \mathbb{Z}$ **non è né iniettiva né suriettiva**.

- **Applicazione identica:**  
  Per ogni insieme $A$, l'applicazione $i_A: A \to A,\ x \mapsto x$ è sempre biettiva. Come sottoinsieme di $A \times A$, coincide con la **diagonale di $A$**:
  $$\Delta_A = \{(x, y) \in A \times A : x = y\}$$

---

### 2.4 Immagine e controimmagine di un sottoinsieme

- **Immagine di un sottoinsieme $A_1 \subseteq A$:**
  $$f(A_1) \overset{def}{=} \{f(a) : a \in A_1\} \subseteq B \iff (b \in f(A_1) \iff \exists a \in A_1 : f(a) = b)$$

> [!NOTE]
> **Proposizione:** $f: A \to B$ è suriettiva $\iff f(A) = B$.

- **Controimmagine (o antimmagine) di un sottoinsieme $B_1 \subseteq B$:**
  $$f^{-1}(B_1) \overset{def}{=} \{a \in A : f(a) \in B_1\} \subseteq A \iff (a \in f^{-1}(B_1) \iff f(a) \in B_1)$$

> [!NOTE]
> **Proposizioni:**
> 1. $f^{-1}(B) = A$
> 2. $f$ è suriettiva $\iff \forall b \in B,\ f^{-1}(\{b\}) \neq \emptyset$
> 3. $\forall A_1, A_2 \subseteq A,\ f(A_1 \cup A_2) = f(A_1) \cup f(A_2)$

---

### 2.5 Composizione di applicazioni

> [!NOTE]
> **Definizione di Composizione**  
> Siano $f: A \to B$ e $g: B \to C$ due applicazioni. Si definisce **applicazione composta** $g \circ f$ (*"g composto f"*):
> $$g \circ f : A \to C, \qquad a \mapsto g(f(a))$$

- **Proprietà con l'identità:** $f \circ i_A = f$ e $i_B \circ f = f$.
- **Non commutatività:** In generale $g \circ f \neq f \circ g$.  
  *(Controesempio: $f(x) = x + 1$, $g(x) = x^2$ su $\mathbb{N}_0 \implies (g \circ f)(2) = 9 \neq 5 = (f \circ g)(2)$)*.
- **Associatività:** Date $f: A \to B,\ g: B \to C,\ h: C \to D$, si ha:
  $$h \circ (g \circ f) = (h \circ g) \circ f$$

> [!IMPORTANT]
> **Teorema sulla composizione**  
> Siano $f: A \to B$ e $g: B \to C$:
> 1. $f, g$ iniettive $\implies g \circ f$ iniettiva.
> 2. $f, g$ suriettive $\implies g \circ f$ suriettiva.
> 3. $f, g$ biettive $\implies g \circ f$ biettiva.
>
> **Teorema sulle implicazioni parziali inverse:**  
> Data $g \circ f: A \to C$:
> 1. $g \circ f$ iniettiva $\implies f$ iniettiva *(ma $g$ può non esserlo)*.
> 2. $g \circ f$ suriettiva $\implies g$ suriettiva *(ma $f$ può non esserlo)*.
> 3. $g \circ f$ biettiva $\implies f$ iniettiva e $g$ suriettiva.

---

### 2.6 Applicazione inversa

> [!NOTE]
> **Definizione di Applicazione Inversa**  
> Sia $f: A \to B$. Un'applicazione $g: B \to A$ si dice **inversa** di $f$ se:
> $$g \circ f = i_A \quad \text{e} \quad f \circ g = i_B$$

> [!IMPORTANT]
> **Teorema di Unicità e Caratterizzazione**  
> 1. Se $f: A \to B$ ammette inversa, tale inversa è **unica** e si denota con $f^{-1}: B \to A$.
> 2. Un'applicazione $f: A \to B$ è **invertibile** se e solo se è **biettiva**.
>
> **Dimostrazione:**
> - **$(\Rightarrow)$:** Se $f$ è invertibile, da $f^{-1} \circ f = i_A$ (biettiva) segue che $f$ è iniettiva; da $f \circ f^{-1} = i_B$ segue che $f$ è suriettiva. Dunque $f$ è biettiva.
> - **$(\Leftarrow)$:** Se $f$ è biettiva, per ogni $b \in B$ esiste un unico $a \in A$ tale che $f(a) = b$. Ponendo $g(b) = a$, si verifica direttamente che $g \circ f = i_A$ e $f \circ g = i_B$, dunque $g = f^{-1}$. $\blacksquare$

**Esempio:**  
$f_1: \mathbb{Q} \to \mathbb{Q},\ x \mapsto \frac{x}{2}$ è biettiva $\implies f_1^{-1}: \mathbb{Q} \to \mathbb{Q},\ x \mapsto 2x$.

---

## 3. Matrici

### 3.1 Definizioni di base

> [!NOTE]
> Una **matrice reale di tipo $s \times t$** ($s, t \in \mathbb{N}$) è una tabella rettangolare contenente $s \cdot t$ numeri reali disposti su $s$ righe e $t$ colonne:
> $$A = (a_{ij})_{\substack{i=1,\dots,s \\ j=1,\dots,t}} \in \mathcal{M}_{s,t}(\mathbb{R})$$
> Se $s = t$, la matrice si dice **quadrata di ordine $s$**, e l'insieme si denota con $\mathcal{M}_s(\mathbb{R})$.

- **Diagonali:** Gli elementi $a_{11}, a_{22}, \dots, a_{ss}$ formano la **diagonale principale**; $a_{1s}, a_{2,s-1}, \dots, a_{s1}$ formano la **diagonale secondaria**.
- **Tipologie notevoli:**
  - **Diagonale:** $a_{ij} = 0$ per ogni $i \neq j$.
  - **Triangolare superiore:** $a_{ij} = 0$ per ogni $i > j$ (zeri sotto la diagonale principale).
  - **Triangolare inferiore:** $a_{ij} = 0$ per ogni $i < j$ (zeri sopra la diagonale principale).
  - Una matrice è diagonale $\iff$ è simultaneamente triangolare superiore e inferiore.
  - **Matrice identità $I_n$:** matrice diagonale con $i_{kk} = 1$ e $i_{hk} = 0$ ($h \neq k$).
  - **Matrice nulla $O_{s,t}$:** tutte le entrate sono nulle.
  - **Matrice trasposta $A^T$:** ottenuta scambiando righe con colonne; $A \in \mathcal{M}_{s,t}(\mathbb{R}) \iff A^T \in \mathcal{M}_{t,s}(\mathbb{R})$.

---

### 3.2 Operazioni tra matrici

#### 1. Somma
Date $A, B \in \mathcal{M}_{s,t}(\mathbb{R})$, $A + B = (a_{ij} + b_{ij}) \in \mathcal{M}_{s,t}(\mathbb{R})$.
- $A + B = B + A$ *(commutativa)*
- $(A + B) + C = A + (B + C)$ *(associativa)*
- $A + O_{s,t} = A$ *(elemento neutro)*
- $A + (-A) = O_{s,t}$ *(opposto $-A = (-a_{ij})$)*

#### 2. Prodotto per uno scalare
Dati $A \in \mathcal{M}_{s,t}(\mathbb{R})$ e $\alpha \in \mathbb{R}$, $\alpha A = (\alpha a_{ij}) \in \mathcal{M}_{s,t}(\mathbb{R})$.
- $0A = O_{s,t}, \quad 1A = A, \quad (-1)A = -A$

#### 3. Prodotto righe per colonne
Siano $A \in \mathcal{M}_{s,t}(\mathbb{R})$ e $B \in \mathcal{M}_{t,u}(\mathbb{R})$. Si definisce $AB = (c_{ij}) \in \mathcal{M}_{s,u}(\mathbb{R})$ con:
$$c_{ij} \overset{def}{=} \sum_{h=1}^{t} a_{ih} b_{hj} \qquad \forall 1 \le i \le s,\ 1 \le j \le u$$

> [!IMPORTANT]
> **Proprietà del prodotto matriciale:**
> 1. $A(BC) = (AB)C$ *(associativa)*
> 2. $AI_s = A = I_sA$ *(elemento neutro moltiplicativo)*
> 3. **Non commutativo in generale ($AB \neq BA$):**  
>    Ad esempio, con $A = \begin{pmatrix}1 & 0 \\ 1 & 1\end{pmatrix}$ e $B = \begin{pmatrix}1 & 1 \\ 0 & 0\end{pmatrix}$:
>    $$AB = \begin{pmatrix}1 & 1 \\ 1 & 1\end{pmatrix} \neq BA = \begin{pmatrix}2 & 1 \\ 0 & 0\end{pmatrix}$$

---

### 3.3 Riduzione a scala

> [!NOTE]
> Una matrice $A \in \mathcal{M}_{s,t}(\mathbb{R})$ si dice **a scala** se:
> 1. Le eventuali righe nulle si trovano tutte al di sotto delle righe non nulle.
> 2. Il **pivot** (primo elemento non nullo) di ciascuna riga si trova strettamente più a destra del pivot della riga precedente.

- **Operazioni elementari sulle righe:**
  1. Scambio di due righe: $R_h \leftrightarrow R_k$
  2. Prodotto di una riga per uno scalare non nullo: $R_h \to \alpha R_h \quad (\alpha \neq 0)$
  3. Sostituzione di una riga con la somma di sé stessa e un multiplo di un'altra: $R_h \to R_h + \alpha R_k$

> [!IMPORTANT]
> **Teorema:** Per ogni matrice $A$ esiste almeno una matrice a scala $B$ equivalente per righe ad $A$.

---

### 3.4 Determinante

> [!NOTE]
> Sia $A \in \mathcal{M}_s(\mathbb{R})$. Il **determinante** $|A|$ (o $\det(A)$) è definito ricorsivamente dallo **sviluppo di Laplace lungo la prima riga**:
> $$|A| = \begin{cases} a_{11} & \text{se } s = 1 \\ \displaystyle\sum_{j=1}^{s} (-1)^{1+j} a_{1j} |A_{1j}| & \text{se } s > 1 \end{cases}$$
> dove $A_{1j}$ è la sottomatrice complementare ottenuta eliminando la riga 1 e la colonna $j$.

- **Caso $2 \times 2$:**
  $$\begin{vmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}$$

> [!IMPORTANT]
> **Teorema (Sviluppo di Laplace generale):**  
> Il determinante può essere calcolato lungo una qualunque riga $i$ o colonna $j$:
> $$|A| = \sum_{j=1}^s (-1)^{i+j} a_{ij} |A_{ij}| \quad \text{(riga } i) \qquad = \sum_{i=1}^s (-1)^{i+j} a_{ij} |A_{ij}| \quad \text{(colonna } j)$$

**Proprietà fondamentali del determinante:**
1. Una riga (o colonna) di tutti zeri $\implies |A| = 0$.
2. Due righe (o colonne) uguali $\implies |A| = 0$.
3. Scambiando due righe (o colonne), il determinante cambia di segno ($|B| = -|A|$).
4. Moltiplicando una riga per $\alpha \in \mathbb{R}$, il determinante risulta $\alpha |A|$.
5. L'operazione $R_h \to R_h + \alpha R_k$ **non altera** il determinante ($|B| = |A|$).
6. Se $A$ è triangolare o diagonale, $|A| = a_{11} a_{22} \cdots a_{ss}$ (prodotto degli elementi diagonali).
7. $|A^T| = |A|$.
8. **Teorema di Binet:** $|AB| = |A| \cdot |B|$.

---

### 3.5 Matrici invertibili

> [!NOTE]
> Una matrice quadrata $A \in \mathcal{M}_s(\mathbb{R})$ si dice **invertibile** se esiste una matrice $B \in \mathcal{M}_s(\mathbb{R})$ tale che $AB = I_s = BA$. Tale matrice è unica, si denota $A^{-1}$ ed è detta **inversa** di $A$.

- **Complemento algebrico:** L'elemento $a_{ij}^* = (-1)^{i+j} |A_{ij}|$.
- **Matrice dei complementi algebrici:** $A^* = (a_{ij}^*)$.

> [!IMPORTANT]
> **Teorema di Invertibilità**  
> Una matrice $A \in \mathcal{M}_s(\mathbb{R})$ è invertibile $\iff |A| \neq 0$. In tal caso:
> $$A^{-1} = \frac{1}{|A|} (A^*)^T$$

**Esempio:**  
Sia $A = \begin{pmatrix} 2 & 1 \\ 0 & 1 \end{pmatrix}$: $|A| = 2 \neq 0$.
$$A^* = \begin{pmatrix} 1 & 0 \\ -1 & 2 \end{pmatrix}, \quad (A^*)^T = \begin{pmatrix} 1 & -1 \\ 0 & 2 \end{pmatrix} \implies A^{-1} = \frac{1}{2} \begin{pmatrix} 1 & -1 \\ 0 & 2 \end{pmatrix} = \begin{pmatrix} 1/2 & -1/2 \\ 0 & 1 \end{pmatrix}$$

---

### 3.6 Sottomatrici, minori, rango

- **Sottomatrice:** Matrice $B \in \mathcal{M}_{u,v}(\mathbb{R})$ ottenuta selezionando $u$ righe e $v$ colonne di $A$.
- **Minore di ordine $k$:** Il determinante di una sottomatrice quadrata di ordine $k$.
- **Rango ($\text{rk}(A)$):** Il massimo ordine di un minore non nullo di $A$. Risulta $0 \le \text{rk}(A) \le \min\{s, t\}$.

> [!IMPORTANT]
> **Teoremi sul calcolo del rango:**
> 1. **Teorema dei minori:** $\text{rk}(A) = h \iff$ esiste un minore non nullo di ordine $h$ e tutti i minori di ordine $h + 1$ sono nulli.
> 2. **Teorema degli orlati:** $\text{rk}(A) = h \iff$ esiste un minore non nullo di ordine $h$ e tutti i suoi orlati di ordine $h + 1$ sono nulli.
> 3. **Metodo di Gauss:** Il rango di $A$ è uguale al **numero di pivot (righe non nulle)** di una qualunque matrice a scala equivalente ad $A$.

---

## 4. Relazioni di equivalenza

### 4.1 Relazioni in un insieme

> [!NOTE]
> Sia $A \neq \emptyset$. Una relazione $R \subseteq A \times A$ si dice:
> - **Riflessiva:** $\forall a \in A,\ aRa$
> - **Simmetrica:** $\forall a, b \in A,\ aRb \implies bRa$
> - **Transitiva:** $\forall a, b, c \in A,\ aRb \land bRc \implies aRc$
>
> Una relazione $R$ che verifica tutte e tre le proprietà si dice **relazione di equivalenza**.

**Esempio notevole:**  
La relazione $R_8 = \{(x, y) \in \mathbb{N}_0 \times \mathbb{N}_0 : x + y \in \mathbb{N}_p\}$ è una relazione di equivalenza:
- *Riflessività:* $a + a = 2a \in \mathbb{N}_p \implies aR_8a$.
- *Simmetria:* $a + b \in \mathbb{N}_p \implies b + a \in \mathbb{N}_p \implies bR_8a$.
- *Transitività:* se $a + b \in \mathbb{N}_p$ e $b + c \in \mathbb{N}_p$, allora $(a + b) + (b + c) = (a + c) + 2b \in \mathbb{N}_p \implies a + c \in \mathbb{N}_p \implies aR_8c$.

---

### 4.2 Classi di equivalenza

> [!NOTE]
> Data una relazione di equivalenza $R$ su $A$, per ogni $a \in A$ si definisce la **classe di equivalenza** di $a$:
> $$[a]_R \overset{def}{=} \{x \in A : aRx\} \subseteq A$$

> [!IMPORTANT]
> **Teorema sulle classi di equivalenza:**
> 1. $[a]_R \neq \emptyset \quad \forall a \in A$ *(poiché $a \in [a]_R$)*
> 2. $aRb \iff [a]_R = [b]_R$
> 3. $[a]_R \neq [b]_R \iff [a]_R \cap [b]_R = \emptyset$ *(classi distinte sono disgiunte)*
> 4. $\displaystyle\bigcup_{a \in A} [a]_R = A$

---

### 4.3 Insieme quoziente

> [!NOTE]
> L'**insieme quoziente** di $A$ rispetto a $R$ è l'insieme avente per elementi tutte le distinte classi di equivalenza:
> $$A/R \overset{def}{=} \{[a]_R : a \in A\} \subseteq \mathcal{P}(A)$$

**Esempi:**
- $\mathbb{N}_0/R_8 = \{\mathbb{N}_p, \mathbb{N}_d\}$
- Relazione totale $R_T = A \times A \implies A/R_T = \{A\}$
- Relazione di uguaglianza $\Delta = \{(a, a) : a \in A\} \implies A/\Delta = \{\{a\} : a \in A\}$

---

### 4.4 Partizioni

> [!NOTE]
> Una famiglia $F \subseteq \mathcal{P}(A)$ di sottoinsiemi di $A$ si dice **partizione di $A$** se:
> 1. $\emptyset \notin F$ *(nessun blocco è vuoto)*
> 2. $\forall X, Y \in F,\ X \neq Y \implies X \cap Y = \emptyset$ *(blocchi distinti sono a due a due disgiunti)*
> 3. $\displaystyle\bigcup_{X \in F} X = A$ *(l'unione di tutti i blocchi ricopre $A$)*

| $|A|$ | Numero di partizioni (Numeri di Bell) |
| :---: | :---: |
| 1 | 1 |
| 2 | 2 |
| 3 | 5 |
| 4 | 15 |
| 5 | 52 |

---

### 4.5 Teorema fondamentale delle relazioni di equivalenza

> [!IMPORTANT]
> **Teorema Fondamentale**  
> Sia $A$ un insieme non vuoto:
> 1. Se $R$ è una relazione di equivalenza su $A$, allora $A/R$ è una **partizione** di $A$.
> 2. Se $F$ è una partizione di $A$, allora esiste un'**unica** relazione di equivalenza $R_F$ su $A$ tale che $A/R_F = F$, definita da:
>    $$aR_Fb \overset{def}{\iff} \exists X \in F : a \in X \land b \in X$$
>
> **Corollario:** Esiste una corrispondenza biunivoca tra l'insieme delle partizioni di $A$ e l'insieme delle relazioni di equivalenza su $A$. Pertanto, **contare le relazioni di equivalenza su un insieme finito equivale a calcolarne il numero di partizioni**.

---

## 5. Aritmetica

### 5.1 Divisibilità in $\mathbb{Z}$

> [!NOTE]
> **Definizione di Divisibilità**  
> Dati $a, b \in \mathbb{Z}$, si dice che **$a$ divide $b$** (in simboli $a \mid b$) se:
> $$a \mid b \overset{def}{\iff} \exists q \in \mathbb{Z} : b = aq$$

**Proprietà fondamentali della divisibilità:**
1. $a \mid a$ *(riflessiva)*
2. $a \mid b \iff a \mid -b \iff -a \mid b \iff -a \mid -b$ *(definita a meno del segno)*
3. $1 \mid a$ e $a \mid 0$ per ogni $a \in \mathbb{Z}$
4. $a \mid b \land a \mid c \implies a \mid (b + c)$ e $a \mid (b - c)$
5. $a \mid b \land a \mid c \implies a \mid bc$

- **Divisori:** $D(a) = \{m \in \mathbb{Z} : m \mid a\}$. Per ogni $a \in \mathbb{Z}$, $\pm 1, \pm a$ sono detti **divisori banali**.

---

### 5.2 Numeri primi

> [!NOTE]
> Un intero $p \in \mathbb{Z}$ si dice **primo** se $|D(p)| = 4$ (ovvero $p \neq \pm 1$ e possiede esclusivamente i divisori banali).

> [!IMPORTANT]
> **Teorema Fondamentale dell'Aritmetica**  
> Ogni intero $a \in \mathbb{Z} \setminus \{0, 1, -1\}$ si scompone in modo unico (a meno del segno e dell'ordine dei fattori) come prodotto di numeri primi:
> $$a = p_1 p_2 \cdots p_n$$

> [!IMPORTANT]
> **Teorema di Euclide (Infinità dei numeri primi)**  
> I numeri primi sono infiniti.
>
> **Dimostrazione per assurdo:**  
> Se l'insieme dei primi fosse finito, $P = \{p_1, p_2, \dots, p_n\}$, consideriamo $a = (p_1 p_2 \cdots p_n) + 1$. Per il teorema fondamentale, $a$ deve avere almeno un divisore primo $p \in P$, da cui $p \mid a$. Poiché $p \in P$, $p$ divide anche il prodotto $p_1 \dots p_n$. Ma allora $p \mid [a - (p_1 \dots p_n)] = 1$, il che implicherebbe $p = \pm 1$, contraddicendo la primalità di $p$. $\blacksquare$

---

### 5.3 Divisione euclidea

> [!IMPORTANT]
> **Teorema della Divisione Euclidea**  
> Dati $a, b \in \mathbb{Z}$ con $b \neq 0$, esistono e sono univocamente determinati due interi $q$ (**quoziente**) e $r$ (**resto**) tali che:
> $$a = bq + r \quad \text{con } 0 \le r < |b|$$
> Si denota il resto con $R(a, b)$. Risulta $b \mid a \iff R(a, b) = 0$.

---

### 5.4 Massimo comun divisore

> [!NOTE]
> Dati $a, b \in \mathbb{Z}$, un intero $d$ si dice **massimo comun divisore** se:
> $$d \mid a \land d \mid b \quad \text{e} \quad (c \mid a \land c \mid b \implies c \mid d)$$
> L'unico massimo comun divisore positivo si denota con $\text{MCD}(a, b)$. Se $(a, b) = (0, 0)$, si pone $\text{MCD}(0, 0) = 0$.

#### Algoritmo Euclideo delle divisioni successive
Per calcolare $\text{MCD}(a, b)$ con $a, b > 0$, si effettuano divisioni a catena:
$$a = bq_1 + r_1, \quad b = r_1q_2 + r_2, \quad r_1 = r_2q_3 + r_3, \quad \dots, \quad r_{m-1} = r_m q_{m+1} + 0$$
L'**ultimo resto non nullo** $r_m$ coincide esattamente con $\text{MCD}(a, b)$.

> [!IMPORTANT]
> **Identità di Bézout**  
> Dati $a, b \in \mathbb{Z}$ e $d = \text{MCD}(a, b)$, esistono $\alpha, \beta \in \mathbb{Z}$ tali che:
> $$d = \alpha a + \beta b$$
> La coppia $(\alpha, \beta)$ è detta **coppia di coefficienti di Bézout** e si determina risalendo all'indietro l'algoritmo euclideo.

**Esempio:** $\text{MCD}(100, 45) = 5$.
$$100 = 45 \cdot 2 + 10 \implies 10 = 100 - 45 \cdot 2$$
$$45 = 10 \cdot 4 + 5 \implies 5 = 45 - 10 \cdot 4 = 45 - (100 - 45 \cdot 2) \cdot 4 = 45 \cdot 9 + 100 \cdot (-4)$$
Dunque $(-4, 9)$ è una coppia di coefficienti di Bézout.

---

### 5.5 Minimo comune multiplo

> [!NOTE]
> Dati $a, b \in \mathbb{Z} \setminus \{0\}$, l'unico multiplo comune positivo minimale si denota $\text{mcm}(a, b)$.

> [!IMPORTANT]
> **Relazione fondamentale tra MCD e mcm:**
> $$\text{mcm}(a, b) = \frac{|ab|}{\text{MCD}(a, b)}$$

---

### 5.6 Rappresentazione in base $b$

> [!IMPORTANT]
> **Teorema della base:**  
> Dati $a \in \mathbb{N}$ e una base intera $b \ge 2$, esistono e sono univoci i coefficienti $c_0, c_1, \dots, c_t \in \{0, 1, \dots, b - 1\}$ con $c_t \neq 0$ tali che:
> $$a = c_t b^t + c_{t-1} b^{t-1} + \cdots + c_1 b^1 + c_0 b^0 \quad \implies \quad a = (c_t c_{t-1} \dots c_1 c_0)_b$$

**Esempio di conversione:**
$$(12034)_5 = 4 \cdot 5^0 + 3 \cdot 5^1 + 0 \cdot 5^2 + 2 \cdot 5^3 + 1 \cdot 5^4 = 4 + 15 + 0 + 250 + 625 = 894 = (894)_{10}$$
Dividendo ripetutamente per $8$: $894 = (1576)_8$.

---

### 5.7 Due lemmi utili

> [!IMPORTANT]
> **Lemma 1 (di Euclide):**  
> $$n \mid ab \quad \land \quad \text{MCD}(n, a) = 1 \implies n \mid b$$
>
> **Lemma 2:**  
> $$n \mid a \quad \land \quad m \mid a \quad \land \quad \text{MCD}(n, m) = 1 \implies nm \mid a$$

---

### 5.8 Congruenze modulo $n$

> [!NOTE]
> Dati $a, b, n \in \mathbb{Z}$, diciamo che **$a$ è congruo a $b$ modulo $n$** se $n$ divide la loro differenza:
> $$a \equiv b \pmod n \iff a \equiv_n b \overset{def}{\iff} n \mid (a - b)$$

- $\equiv_n$ è una **relazione di equivalenza** su $\mathbb{Z}$.
- **Classi di resto modulo $n$:**
  $$[a]_n = \{a + nq : q \in \mathbb{Z}\}$$
- **Insieme quoziente:**
  $$\mathbb{Z}_n = \{[0]_n, [1]_n, [2]_n, \dots, [n-1]_n\}, \qquad |\mathbb{Z}_n| = n \quad (n > 0)$$

> [!NOTE]
> **Compatibilità con le operazioni:**  
> Se $a \equiv b \pmod n$ e $c \equiv d \pmod n$, allora:
> $$a + c \equiv b + d \pmod n \qquad \text{e} \qquad ac \equiv bd \pmod n$$

---

### 5.9 Equazioni congruenziali lineari

Un'equazione congruenziale lineare ha la forma:
$$ax \equiv b \pmod n$$

> [!IMPORTANT]
> **Criterio di Risolubilità e Struttura delle Soluzioni:**
> 1. L'equazione ammette soluzioni $\iff d = \text{MCD}(a, n) \mid b$.
> 2. Se $d \mid b$, l'equazione è equivalente all'equazione ridotta:
>    $$\frac{a}{d}x \equiv \frac{b}{d} \pmod{\frac{n}{d}} \quad \text{con } \text{MCD}\left(\frac{a}{d}, \frac{n}{d}\right) = 1$$
> 3. Se $c$ è una soluzione particolare, la totalità delle soluzioni è data dall'intera classe $[c]_{n/d}$.

**Esempio svolto:** Risolvere $121x \equiv 77 \pmod{22}$.
1. Calcolo $\text{MCD}(121, 22) = 11$. Poiché $11 \mid 77$, l'equazione è compatibile.
2. Divido per $11$:
   $$11x \equiv 7 \pmod 2 \iff 1x \equiv 1 \pmod 2$$
3. La soluzione è la classe $[1]_2$ (tutti gli interi dispari).

---

### 5.10 Sistemi di equazioni congruenziali e Teorema Cinese del Resto

> [!IMPORTANT]
> **Teorema Cinese del Resto**  
> Consideriamo il sistema di congruenze lineari:
> $$\begin{cases} x \equiv b_1 \pmod{n_1} \\ x \equiv b_2 \pmod{n_2} \\ \quad \vdots \\ x \equiv b_t \pmod{n_t} \end{cases}$$
> Se i moduli sono a due a due coprimi ($\text{MCD}(n_i, n_j) = 1$ per ogni $i \neq j$), allora il sistema **ammette sempre soluzioni**. Inoltre, se $c$ è una soluzione particolare, l'insieme delle soluzioni coincide con la classe:
> $$[c]_{n_1 n_2 \cdots n_t}$$

**Esempio:**  
$$\begin{cases} x \equiv 2 \pmod 3 \\ x \equiv 3 \pmod 5 \end{cases}$$
Dalla prima equazione: $x = 2 + 3k$. Sostituendo nella seconda:
$$2 + 3k \equiv 3 \pmod 5 \implies 3k \equiv 1 \pmod 5 \implies k \equiv 2 \pmod 5$$
Dunque $x = 2 + 3(2) = 8$. La soluzione generale è $[8]_{15} = \{8 + 15q : q \in \mathbb{Z}\}$.

---

## 6. Calcolo combinatorio

### 6.1 Principi di addizione e di inclusione-esclusione

> [!IMPORTANT]
> **Principio di Addizione:**  
> Se $A$ e $B$ sono insiemi finiti **disgiunti** ($A \cap B = \emptyset$), allora:
> $$|A \cup B| = |A| + |B|$$
>
> **Principio di Inclusione-Esclusione:**  
> Per due insiemi finiti qualsiasi:
> $$|A \cup B| = |A| + |B| - |A \cap B|$$
>
> Per tre insiemi finiti:
> $$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|$$

---

### 6.2 Principio di moltiplicazione

> [!IMPORTANT]
> **Principio di Moltiplicazione:**  
> Se una procedura è composta da $k$ scelte indipendenti successive, dove la scelta $i$-esima può essere effettuata in $n_i$ modi, il numero totale di configurazioni possibili è:
> $$|A_1 \times A_2 \times \cdots \times A_k| = |A_1| \cdot |A_2| \cdots |A_k| = n_1 \cdot n_2 \cdots n_k$$

---

### 6.3 Fattoriale e coefficienti binomiali

- **Fattoriale:** $n! = 1 \cdot 2 \cdot 3 \cdots n$, con la convenzione $0! = 1$.
- **Coefficiente binomiale:**
  $$\binom{n}{k} \overset{def}{=} \frac{n!}{k!(n - k)!} \qquad (0 \le k \le n)$$

> [!NOTE]
> **Proprietà dei coefficienti binomiali:**
> 1. $\binom{n}{0} = \binom{n}{n} = 1$
> 2. Simmetria: $\binom{n}{k} = \binom{n}{n - k}$
> 3. **Formula di Stifel:**
>    $$\binom{n}{k} + \binom{n}{k + 1} = \binom{n + 1}{k + 1}$$

---

### 6.4 Applicazioni tra insiemi finiti: conteggio

Siano $A, B$ insiemi finiti con $|A| = \alpha$ e $|B| = \beta$:

1. **Numero totale di applicazioni $f: A \to B$ (Disposizioni con ripetizione):**
   $$D'_{\beta, \alpha} = \beta^\alpha$$

2. **Numero di applicazioni iniettive $f: A \to B$ (Disposizioni semplici):**
   $$d_{\beta, \alpha} = \begin{cases} 0 & \text{se } \beta < \alpha \\ \beta(\beta - 1)(\beta - 2)\cdots(\beta - \alpha + 1) = \dfrac{\beta!}{(\beta - \alpha)!} & \text{se } \alpha \le \beta \end{cases}$$

---

### 6.5 Permutazioni

> [!IMPORTANT]
> Sia $|A| = |B| = n$. Per un'applicazione $f: A \to B$ sono equivalenti:
> 1. $f$ è iniettiva
> 2. $f$ è suriettiva
> 3. $f$ è biettiva
>
> Il numero di **permutazioni semplici** di $n$ oggetti distinti (applicazioni biettive $f: A \to A$) è:
> $$P_n = n!$$

---

### 6.6 Combinazioni

> [!IMPORTANT]
> Il numero di **combinazioni semplici** di $n$ oggetti presi a $k$ a $k$ (sottoinsiemi di ordine $k$ di un insieme di ordine $n$) è:
> $$C_{n, k} = \binom{n}{k} = \frac{n!}{k!(n - k)!}$$
>
> **Somma delle combinazioni:**
> $$\sum_{k=0}^n \binom{n}{k} = \binom{n}{0} + \binom{n}{1} + \cdots + \binom{n}{n} = 2^n = |\mathcal{P}(A)|$$

#### Triangolo di Tartaglia
```text
            1
          1   1
        1   2   1
      1   3   3   1
    1   4   6   4   1
  1   5  10  10   5  1
1   6  15  20  15   6  1
```

---

### 6.7 Permutazioni con ripetizione

> [!IMPORTANT]
> Dati $n$ oggetti di cui $n_1$ identici di tipo 1, $n_2$ di tipo 2, $\dots$, $n_k$ di tipo $k$ (con $n_1 + \dots + n_k = n$), il numero di permutazioni distinte è:
> $$P_n^{(n_1, n_2, \dots, n_k)} = \frac{n!}{n_1!\, n_2! \cdots n_k!}$$

**Esempio:**  
Anagrammi della parola "MATEMATICA" ($n = 10$, $M \times 2, A \times 3, T \times 2, E \times 1, I \times 1, C \times 1$):
$$\frac{10!}{2! \, 3! \, 2! \, 1! \, 1! \, 1!} = \frac{3628800}{24} = 151200$$

---

## 7. Relazioni d'ordine

### 7.1 Relazioni asimmetriche e relazioni d'ordine

> [!NOTE]
> Sia $A \neq \emptyset$. Una relazione $R \subseteq A \times A$ si dice:
> - **Antisimmetrica (o Asimmetrica in senso debole):**  
>   $$\forall a, b \in A,\ aRb \land bRa \implies a = b$$
> - **Relazione d'ordine (largo):**  
>   Se è contemporaneamente **riflessiva**, **asimmetrica** e **transitiva**.

- Una coppia $(A, \sqsubseteq)$ costituita da un insieme e una relazione d'ordine si dice **insieme ordinato** (o poset).
- **Esempi:** $(\mathbb{N}_0, \le)$, $(\mathbb{Z}, \le)$, $(\mathbb{N}_0, \mid)$, $(\mathcal{P}(A), \subseteq)$.

---

### 7.2 Minore stretto e diagramma di Hasse

- **Minore stretto:** $a \sqsubset b \overset{def}{\iff} a \sqsubseteq b \land a \neq b \iff a \sqsubseteq b \land b \not\sqsubseteq a$.
- **Diagramma di Hasse:** Rappresentazione grafica sul piano in cui:
  1. Se $a \sqsubset b$, il vertice $a$ è disegnato più in basso del vertice $b$.
  2. Si traccia un segmento diretto tra $a$ e $b$ se e solo se $b$ **copre** $a$ (ovvero non esistono elementi intermedi $c$ tali che $a \sqsubset c \sqsubset b$).

---

### 7.3 Ordine totale

> [!NOTE]
> Due elementi $a, b \in A$ si dicono **confrontabili** se $a \sqsubseteq b \lor b \sqsubseteq a$.  
> Un ordine $\sqsubseteq$ si dice **ordine totale** se ogni coppia di elementi è confrontabile.

- $(\mathbb{N}_0, \le)$ e $(\mathbb{Z}, \le)$ sono totalmente ordinati (catene lineari).
- $(\mathbb{N}_0, \mid)$ e $(\mathcal{P}(A), \subseteq)$ con $|A| \ge 2$ **non** sono totalmente ordinati.

---

### 7.4 Minimo, massimo, elementi minimali e massimali

> [!IMPORTANT]
> Sia $(A, \sqsubseteq)$ un insieme ordinato:
> - **Minimo ($m = \min A$):** $m \sqsubseteq a \quad \forall a \in A$ *(se esiste, è unico)*.
> - **Massimo ($M = \max A$):** $a \sqsubseteq M \quad \forall a \in A$ *(se esiste, è unico)*.
> - **Elemento minimale ($x$):** $\nexists a \in A : a \sqsubset x$.
> - **Elemento massimale ($y$):** $\nexists a \in A : y \sqsubset a$.

> [!TIP]
> - Minimo $\implies$ minimale (ma minimale $\centernot\implies$ minimo).
> - Se $A$ possiede più elementi minimali distinti, allora $\nexists \min A$.

---

### 7.5 Minoranti, maggioranti, estremo inferiore e superiore

Sia $(A, \sqsubseteq)$ ordinato e $B \subseteq A$:
- **Minorante di $B$:** $a \in A$ tale che $a \sqsubseteq b \quad \forall b \in B$.
- **Maggiorante di $B$:** $a \in A$ tale che $b \sqsubseteq a \quad \forall b \in B$.
- **Estremo inferiore ($\inf_A B$):** Il **massimo** dell'insieme dei minoranti di $B$.
- **Estremo superiore ($\sup_A B$):** Il **minimo** dell'insieme dei maggioranti di $B$.

---

### 7.6 Reticoli

> [!NOTE]
> Un insieme ordinato $(A, \sqsubseteq)$ si dice un **reticolo** se per ogni coppia di elementi $a, b \in A$ esistono sempre sia $\inf_A\{a, b\}$ che $\sup_A\{a, b\}$.

- Ogni insieme totalmente ordinato è un reticolo ($\inf\{a, b\} = \min\{a, b\}$, $\sup\{a, b\} = \max\{a, b\}$).
- $(\mathcal{P}(A), \subseteq)$ è un reticolo con $\inf\{X, Y\} = X \cap Y$ e $\sup\{X, Y\} = X \cup Y$.
- $(\mathbb{N}_0, \mid)$ è un reticolo con $\inf\{a, b\} = \text{MCD}(a, b)$ e $\sup\{a, b\} = \text{mcm}(a, b)$.

---

### 7.7 Buon ordinamento

> [!IMPORTANT]
> Un insieme ordinato $(A, \sqsubseteq)$ si dice **ben ordinato** se ogni suo sottoinsieme non vuoto ammette minimo:
> $$\forall B \subseteq A,\ B \neq \emptyset \implies \exists \min B$$
>
> - $(\mathbb{N}_0, \le)$ è ben ordinato.
> - Ogni insieme ben ordinato è totalmente ordinato.
> - $(\mathbb{Z}, \le)$ è totalmente ordinato ma **non** ben ordinato ($\mathbb{Z}$ stesso non ha minimo).

---

## 8. Strutture algebriche

### 8.1 Operazioni binarie e strutture algebriche

> [!NOTE]
> Sia $A \neq \emptyset$. Un'**operazione binaria interna** su $A$ è un'applicazione:
> $$f: A \times A \to A, \qquad (a, b) \mapsto a \ast b$$
> La coppia $(A, \ast)$ costituisce una **struttura algebrica**.

---

### 8.2 Le operazioni in $\mathbb{Z}_n$

In $\mathbb{Z}_n = \{[0]_n, [1]_n, \dots, [n-1]_n\}$ si definiscono:
- **Somma:** $[a]_n + [b]_n \overset{def}{=} [a + b]_n$
- **Prodotto:** $[a]_n \cdot [b]_n \overset{def}{=} [ab]_n$

Entrambe sono ben definite (indipendenti dalla scelta dei rappresentanti di classe).

---

### 8.3 Proprietà delle operazioni

Data una struttura $(A, \ast)$:
- **Commutativa:** $a \ast b = b \ast a \quad \forall a, b \in A$
- **Associativa:** $a \ast (b \ast c) = (a \ast b) \ast c \quad \forall a, b, c \in A$

---

### 8.4 Elemento neutro ed elementi simmetrizzabili

- **Elemento neutro:** $e \in A$ tale che $a \ast e = a = e \ast a \quad \forall a \in A$ *(se esiste, è unico)*.
- **Elemento simmetrico:** $b \in A$ è simmetrico di $a$ se $a \ast b = e = b \ast a$.
- **Elementi simmetrizzabili ($U(A)$):** L'insieme degli elementi di $A$ che ammettono simmetrico.

| Struttura | Elemento neutro | Insieme simmetrizzabili $U(A)$ |
| :--- | :---: | :--- |
| $(\mathbb{N}_0, +)$ | $0$ | $\{0\}$ |
| $(\mathbb{N}, +)$ | $\nexists$ | — |
| $(\mathbb{Z}, +)$ | $0$ | $\mathbb{Z}$ *(simmetrico: $-a$)* |
| $(\mathbb{Z}_n, +)$ | $[0]_n$ | $\mathbb{Z}_n$ *(simmetrico: $[n - a]_n$)* |
| $(\mathbb{N}_0, \cdot)$ | $1$ | $\{1\}$ |
| $(\mathbb{Z}, \cdot)$ | $1$ | $\{1, -1\}$ |
| $(\mathbb{Z}_n, \cdot)$ | $[1]_n$ | $\{[a]_n : \text{MCD}(a, n) = 1\}$ |
| $(\mathcal{M}_n(\mathbb{R}), +)$ | $O_n$ | $\mathcal{M}_n(\mathbb{R})$ |
| $(\mathcal{M}_n(\mathbb{R}), \cdot)$ | $I_n$ | $\{A \in \mathcal{M}_n(\mathbb{R}) : \|A\| \neq 0\}$ |
| $(A^A, \circ)$ | $i_A$ | $\{f: A \to A : f \text{ biettiva}\}$ |
| $(\mathcal{P}(A), \cup)$ | $\emptyset$ | $\{\emptyset\}$ |
| $(\mathcal{P}(A), \cap)$ | $A$ | $\{A\}$ |
| $(\mathcal{P}(A), \mathbin{\dot\cup})$ | $\emptyset$ | $\mathcal{P}(A)$ *(ogni insieme è simmetrico di sé stesso)* |
| $(\mathbb{Q}, \cdot)$ | $1$ | $\mathbb{Q} \setminus \{0\}$ |

> [!IMPORTANT]
> **Teorema:** In $(\mathbb{Z}_n, \cdot)$, $U(\mathbb{Z}_n) = \mathbb{Z}_n \setminus \{[0]_n\} \iff n$ è primo.

---

### 8.5 Sottostrutture

Un sottoinsieme non vuoto $B \subseteq A$ si dice **stabile** rispetto a $\ast$ se $\forall x, y \in B,\ x \ast y \in B$. In tal caso $(B, \ast)$ è una **sottostruttura** di $(A, \ast)$.

---

### 8.6 Semigruppi, monoidi, gruppi

> [!NOTE]
> Una struttura $(A, \ast)$ si definisce:
> - **Semigruppo:** $\ast$ è associativa.
> - **Monoide:** $\ast$ è associativa e possiede elemento neutro.
> - **Gruppo:** $\ast$ è associativa, possiede elemento neutro, e ogni elemento è simmetrizzabile ($U(A) = A$).
> - Se $\ast$ è anche commutativa, si dice **gruppo abeliano**.

> [!IMPORTANT]
> **Teorema:** Se $(A, \ast)$ è un monoide, allora $(U(A), \ast)$ è un **gruppo** (detto gruppo degli invertibili).

---

### 8.7 Anelli e campi

> [!NOTE]
> Una struttura algebrica con due operazioni $(A, +, \cdot)$ si dice:
> - **Anello:** $(A, +)$ è un gruppo abeliano, $(A, \cdot)$ è un semigruppo, e $\cdot$ è distributiva rispetto a $+$:
>   $$a(b + c) = ab + ac \quad \text{e} \quad (a + b)c = ac + bc$$
> - **Anello commutativo unitario:** $(A, \cdot)$ è un monoide commutativo (esiste l'unità $1$).
> - **Campo:** Un anello commutativo unitario in cui ogni elemento non nullo è invertibile:
>   $$U(A, \cdot) = A \setminus \{0\}$$

> [!IMPORTANT]
> $\mathbb{Z}_n$ è un **campo** $\iff n$ è un numero primo.

---

### 8.8 Divisori dello zero e domini d'integrità

- **Divisore dello zero:** Un elemento $a \neq 0$ tale che $\exists b \neq 0 : ab = 0$.
- **Dominio d'integrità:** Anello commutativo unitario privo di divisori dello zero (vale la legge di annullamento del prodotto: $ab = 0 \iff a = 0 \lor b = 0$).

> [!IMPORTANT]
> **Teorema:** Ogni campo è un dominio d'integrità *(il viceversa non vale: $\mathbb{Z}$ è un dominio ma non un campo)*.

---

### 8.9 Matrici a elementi in un anello

Sia $A$ un anello commutativo unitario. L'insieme $\mathcal{M}_{s,t}(A)$ eredita le usuali operazioni:
- $(\mathcal{M}_{s,t}(A), +)$ è un gruppo abeliano.
- $(\mathcal{M}_s(A), +, \cdot)$ è un anello unitario (non commutativo per $s > 1$).

---

### 8.10 Determinante su un anello

Il determinante di $B \in \mathcal{M}_s(A)$ si calcola con la formula di Laplace.

> [!WARNING]
> Una matrice $B \in \mathcal{M}_s(A)$ è invertibile $\iff |B| \in U(A)$ (il determinante deve essere un'unità dell'anello).  
> In $\mathcal{M}_2(\mathbb{Z}_6)$, $B = \begin{pmatrix}4 & 5 \\ 1 & 2\end{pmatrix}$ ha $|B| = 3 \neq 0$, ma poiché $\text{MCD}(3, 6) \neq 1$, $3 \notin U(\mathbb{Z}_6)$, quindi $B$ **non è invertibile**.

---

### 8.11 Rango su un campo

Se $K$ è un campo, il rango di $A \in \mathcal{M}_{s,t}(K)$ si calcola equivalentemente come:
1. Numero di pivot della matrice ridotta a scala.
2. Massimo ordine di un minore con determinante non nullo (tramite teorema degli orlati).

---

## 9. Sistemi lineari

### 9.1 Definizioni di base

> [!NOTE]
> Un sistema di $m$ equazioni lineari in $n$ incognite su un campo $K$ è della forma:
> $$\begin{cases} a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = y_1 \\ a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = y_2 \\ \quad \vdots \\ a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = y_m \end{cases}$$
> - **Matrice incompleta:** $A = (a_{ij}) \in \mathcal{M}_{m,n}(K)$
> - **Matrice completa:** $A' = (A \mid Y) \in \mathcal{M}_{m, n+1}(K)$

---

### 9.2 Teorema di Cramer

> [!IMPORTANT]
> **Teorema di Cramer**  
> Sia $AX = Y$ un sistema quadrato ($m = n$).  
> Il sistema ammette **un'unica soluzione** $\iff |A| \neq 0$. In tal caso:
> $$x_i = \frac{|B_i|}{|A|} \qquad \forall i = 1, \dots, n$$
> dove $B_i$ è la matrice ottenuta sostituendo la colonna $i$-esima di $A$ con la colonna dei termini noti $Y$.

---

### 9.3 Metodo generale (Gauss-Jordan)

Sia $A'$ la matrice completa e sia $Q$ la sua forma a scala con $P$ matrice incompleta a scala:

> [!IMPORTANT]
> **Teorema di Rouché-Capelli:**
> 1. **Incompatibile:** $\text{rk}(Q) = \text{rk}(P) + 1 \iff$ compare una riga del tipo $(0\ 0 \dots 0 \mid y_i)$ con $y_i \neq 0$. Nessuna soluzione.
> 2. **Compatibile:** $\text{rk}(Q) = \text{rk}(P) = t$. Il sistema ammette soluzioni dipendenti da $n - t$ parametri liberi:
>    - Su campi finiti: $|K|^{n - t}$ soluzioni distinte.
>    - Su $\mathbb{R}$ o $\mathbb{Q}$: $\infty^{n - t}$ soluzioni.

---

## 10. Spazi vettoriali

### 10.1 La struttura $K^n$

$K^n = \{(a_1, \dots, a_n) : a_i \in K\}$ è uno spazio vettoriale su $K$ con le operazioni:
- Somma tra vettori: $\underline{u} + \underline{v} = (u_1 + v_1, \dots, u_n + v_n)$
- Prodotto per scalare: $\alpha \underline{u} = (\alpha u_1, \dots, \alpha u_n)$

---

### 10.2 Spazi vettoriali e sottospazi

> [!NOTE]
> Un sottoinsieme non vuoto $V \subseteq K^n$ è un **sottospazio vettoriale** se:
> 1. $\forall \underline{u}, \underline{v} \in V \implies \underline{u} + \underline{v} \in V$
> 2. $\forall \alpha \in K, \forall \underline{u} \in V \implies \alpha \underline{u} \in V$
>
> *(Ogni sottospazio contiene necessariamente il vettore nullo $\underline{0}$)*.

---

### 10.3 Combinazioni lineari e sottospazio generato

- **Combinazione lineare:** $\underline{v} = \alpha_1 \underline{u}_1 + \cdots + \alpha_m \underline{u}_m$.
- **Sottospazio generato:** L'insieme di tutte le combinazioni lineari di $\{\underline{u}_1, \dots, \underline{u}_m\}$ si denota con $\langle \underline{u}_1, \dots, \underline{u}_m \rangle$ ed è il più piccolo sottospazio contenente tali vettori.

---

### 10.4 Insiemi di generatori

Un insieme $\{\underline{u}_1, \dots, \underline{u}_m\}$ è un **insieme di generatori** per $V$ se $\langle \underline{u}_1, \dots, \underline{u}_m \rangle = V$. Si dice **minimale** se eliminando un qualunque vettore il generato si riduce strettamente.

---

### 10.5 Indipendenza lineare

> [!NOTE]
> I vettori $\underline{u}_1, \dots, \underline{u}_m$ si dicono **linearmente indipendenti** se:
> $$\alpha_1 \underline{u}_1 + \cdots + \alpha_m \underline{u}_m = \underline{0} \implies \alpha_1 = \alpha_2 = \cdots = \alpha_m = 0$$

> [!IMPORTANT]
> Un insieme di vettori è linearmente indipendente $\iff$ nessun vettore è combinazione lineare dei rimanenti.

---

### 10.6 Basi e dimensione

> [!IMPORTANT]
> Un insieme $B = \{\underline{b}_1, \dots, \underline{b}_m\}$ è una **base** di $V$ se è contemporaneamente:
> 1. Un insieme di vettori linearmente indipendenti.
> 2. Un insieme di generatori di $V$.
>
> **Proprietà della dimensione:**
> - Tutte le basi di $V$ hanno lo stesso numero di elementi, detto **dimensione** ($\dim(V)$).
> - Base $\iff$ Insieme di generatori minimale $\iff$ Insieme linearmente indipendente massimale.

---

### 10.7 Metodo pratico: rango e basi

Data una famiglia di generatori, disponendoli come righe di una matrice $A$:
$$\text{Numero massimo di vettori linearmente indipendenti} = \text{rk}(A) = \dim(V)$$

---

### 10.8 Applicazioni lineari

> [!NOTE]
> Un'applicazione $f: V \to W$ tra spazi vettoriali sullo stesso campo $K$ è **lineare** se:
> 1. $f(\underline{u} + \underline{v}) = f(\underline{u}) + f(\underline{v}) \quad \forall \underline{u}, \underline{v} \in V$
> 2. $f(\alpha \underline{u}) = \alpha f(\underline{u}) \quad \forall \alpha \in K, \forall \underline{u} \in V$
>
> *(Risulta sempre $f(\underline{0}_V) = \underline{0}_W$)*.

---

### 10.9 Nucleo e immagine

- **Nucleo ($\text{Ker}(f)$):**
  $$\text{Ker}(f) \overset{def}{=} \{\underline{v} \in V : f(\underline{v}) = \underline{0}_W\} \subseteq V$$
- **Immagine ($\text{Im}(f)$):**
  $$\text{Im}(f) \overset{def}{=} \{f(\underline{v}) : \underline{v} \in V\} \subseteq W$$

> [!IMPORTANT]
> **Teoremi su Nucleo e Immagine:**
> 1. $f$ è iniettiva $\iff \text{Ker}(f) = \{\underline{0}_V\}$ (ovvero $\dim(\text{Ker}(f)) = 0$).
> 2. $f$ è suriettiva $\iff \text{Im}(f) = W$ (ovvero $\dim(\text{Im}(f)) = \dim(W)$).
> 3. **Teorema della Dimensione (del Rango e Nullità):**
>    $$\dim(\text{Ker}(f)) + \dim(\text{Im}(f)) = \dim(V)$$

---

## 11. Diagonalizzazione

### 11.1 Autovalori e autovettori

> [!NOTE]
> Sia $A \in \mathcal{M}_n(K)$. Uno scalare $\lambda \in K$ si dice **autovalore** di $A$ relativo all'**autovettore** $\underline{v} \in K^n \setminus \{\underline{0}\}$ se:
> $$A\underline{v} = \lambda \underline{v}$$

- **Polinomio caratteristico:** $p_A(x) \overset{def}{=} |A - xI_n|$.
- $\lambda$ è autovalore di $A \iff p_A(\lambda) = 0$ (le radici del polinomio caratteristico).
- **Molteplicità algebrica ($\nu_\lambda$):** La molteplicità di $\lambda$ come radice di $p_A(x)$.

---

### 11.2 Autospazi

> [!NOTE]
> L'insieme degli autovettori associati a $\lambda$, unitamente al vettore nullo, forma l'**autospazio** $W_\lambda$:
> $$W_\lambda \overset{def}{=} \{\underline{v} \in K^n : A\underline{v} = \lambda \underline{v}\} = \text{Ker}(A - \lambda I_n)$$
> - **Molteplicità geometrica ($\mu_\lambda$):** $\mu_\lambda \overset{def}{=} \dim(W_\lambda)$.
> - Vale sempre: $1 \le \mu_\lambda \le \nu_\lambda \le n$.

---

### 11.3 Matrici diagonalizzabili e teorema spettrale

> [!NOTE]
> Una matrice $A \in \mathcal{M}_n(K)$ si dice **diagonalizzabile** se esistono una matrice invertibile $C$ e una matrice diagonale $D$ tali che:
> $$D = C^{-1} A C \iff A = C D C^{-1}$$

> [!IMPORTANT]
> **Teorema Spettrale (Criterio di Diagonalizzabilità)**  
> $A \in \mathcal{M}_n(K)$ è diagonalizzabile se e solo se:
> 1. $\displaystyle\sum_{\lambda} \nu_\lambda = n$ *(tutte le radici di $p_A(x)$ appartengono a $K$)*.
> 2. $\mu_\lambda = \nu_\lambda$ per ogni autovalore $\lambda$.
>
> In tal caso:
> - $D$ ha sulla diagonale principale gli autovalori ripetuti secondo la loro molteplicità.
> - $C$ ha per colonne i corrispondenti autovettori che formano le basi dei relativi autospazi.

> [!TIP]
> **Corollario:** Se $A$ possiede $n$ autovalori distinti in $K$, allora $A$ è **automaticamente diagonalizzabile**.

---

## 12. Geometria analitica

### 12.1 Il piano cartesiano

Fissato un riferimento cartesiano monometrico ortogonale $(O, \vec{x}, \vec{y}, u)$, ogni punto è individuato da $P \equiv (x, y)$.
- Asse $\vec{x}$: $y = 0$
- Asse $\vec{y}$: $x = 0$
- Bisettrice I e III quadrante: $y = x$
- Bisettrice II e IV quadrante: $y = -x$

---

### 12.2 Rette nel piano

- **Forma parametrica:**
  $$\begin{cases} x = x_0 + t\ell \\ y = y_0 + tm \end{cases} \qquad t \in \mathbb{R}$$
  con parametri direttori $(\ell, m) \neq (0, 0)$.

- **Parallelismo:** Due direzioni $(\ell, m)$ e $(\ell_1, m_1)$ sono parallele $\iff \text{rk}\begin{pmatrix}\ell & m \\ \ell_1 & m_1\end{pmatrix} = 1 \iff \ell m_1 = m \ell_1$.

- **Forma cartesiana:** $ax + by + c = 0$, con parametri direttori $(-b, a)$.
  Data da due punti $(x_0, y_0), (x_1, y_1)$:
  $$\begin{vmatrix} x - x_0 & x_1 - x_0 \\ y - y_0 & y_1 - y_0 \end{vmatrix} = 0$$

---

### 12.3 Lo spazio euclideo tridimensionale

Fissato un riferimento cartesiano $(O, \vec{x}, \vec{y}, \vec{z}, u)$, ogni punto è $P \equiv (x, y, z)$.
- **Retta parametrica nello spazio:**
  $$\begin{cases} x = x_0 + t\ell \\ y = y_0 + tm \\ z = z_0 + tn \end{cases} \qquad t \in \mathbb{R}$$
  con parametri direttori $(\ell, m, n) \neq (0, 0, 0)$.

---

### 12.4 Mutua posizione di rette nello spazio

Siano $r$ con direzione $(\ell, m, n)$ e $s$ con direzione $(\ell_1, m_1, n_1)$:
- $\text{rk}\begin{pmatrix}\ell & m & n \\ \ell_1 & m_1 & n_1\end{pmatrix} = 1 \implies r \parallel s$ (**parallele**).
- $\text{rk} = 2 \implies r \nparallel s$:
  - Se il sistema ha soluzione $\implies$ **incidenti** in un punto.
  - Se il sistema è incompatibile $\implies$ **sghembe** (non complanari).

---

### 12.5 Piani nello spazio

- **Forma parametrica:**
  $$\begin{cases} x = x_0 + \alpha\ell_1 + \beta\ell_2 \\ y = y_0 + \alpha m_1 + \beta m_2 \\ z = z_0 + \alpha n_1 + \beta n_2 \end{cases} \qquad \alpha, \beta \in \mathbb{R}$$
  con vettori di giacitura $(\ell_1, m_1, n_1), (\ell_2, m_2, n_2)$ linearmente indipendenti ($\text{rk} = 2$).

---

### 12.6 Mutua posizione di retta e piano

Data una retta con direzione $(\ell, m, n)$ e un piano con giacitura $(\ell_1, m_1, n_1), (\ell_2, m_2, n_2)$, sia $A = \begin{pmatrix}\ell & m & n \\ \ell_1 & m_1 & n_1 \\ \ell_2 & m_2 & n_2\end{pmatrix}$:
- $\text{rk}(A) = 3 \implies |A| \neq 0$: Retta e piano sono **incidenti** in un unico punto.
- $\text{rk}(A) = 2 \implies$ Retta **parallela** al piano ($r \subseteq \pi$ se appartiene, oppure $r \cap \pi = \emptyset$).

---

### 12.7 Mutua posizione di due piani

Costruendo la matrice $A \in \mathcal{M}_{4,3}(\mathbb{R})$ con i vettori di giacitura di entrambi i piani:
- $\text{rk}(A) = 2 \implies \pi \parallel \pi'$ (**piani paralleli** o coincidenti).
- $\text{rk}(A) = 3 \implies \pi \nparallel \pi'$ (**piani incidenti**, la loro intersezione è una retta).

---

### 12.8 Equazione cartesiana del piano

Forma generale: $ax + by + cz + d = 0$.  
Piano passante per 3 punti non allineati $P(x_0, y_0, z_0), Q(x_1, y_1, z_1), R(x_2, y_2, z_2)$:
$$\begin{vmatrix} x - x_0 & y - y_0 & z - z_0 \\ x_1 - x_0 & y_1 - y_0 & z_1 - z_0 \\ x_2 - x_0 & y_2 - y_0 & z_2 - z_0 \end{vmatrix} = 0$$

---

### 12.9 Equazioni cartesiane della retta nello spazio

La retta per $P(x_0, y_0, z_0)$ e $Q(x_1, y_1, z_1)$ si ottiene imponendo rango 1:
$$\begin{vmatrix} x - x_0 & y - y_0 \\ x_1 - x_0 & y_1 - y_0 \end{vmatrix} = 0 = \begin{vmatrix} y - y_0 & z - z_0 \\ y_1 - y_0 & z_1 - z_0 \end{vmatrix} = \begin{vmatrix} x - x_0 & z - z_0 \\ x_1 - x_0 & z_1 - z_0 \end{vmatrix}$$
che si riduce al sistema di **due equazioni cartesiane di piani non paralleli**:
$$\begin{cases} a_1 x + b_1 y + c_1 z + d_1 = 0 \\ a_2 x + b_2 y + c_2 z + d_2 = 0 \end{cases}$$
rappresentando la retta come **intersezione di due piani**.