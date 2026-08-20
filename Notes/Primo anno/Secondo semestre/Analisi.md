# Analisi Matematica

> **Autore:** Emanuele Ragozzini

## Indice dei Contenuti

- [1. Principio di Induzione e Disuguaglianza di Bernoulli](#1-principio-di-induzione-e-disuguaglianza-di-bernoulli)
  - [1.1 Principio di Induzione](#11-principio-di-induzione)
  - [1.2 Disuguaglianza di Bernoulli](#12-disuguaglianza-di-bernoulli)
  - [1.3 Dimostrazione per Induzione](#13-dimostrazione-per-induzione)
- [2. Irrazionalità di Radice di 2](#2-irrazionalità-di-radice-di-2)
  - [2.1 Enunciato](#21-enunciato)
  - [2.2 Dimostrazione per Assurdo](#22-dimostrazione-per-assurdo)
- [3. Assioma di Dedekind e Incompletezza di Q](#3-assioma-di-dedekind-e-incompletezza-di-q)
  - [3.1 Enunciato dell'Assioma di Dedekind](#31-enunciato-dellassioma-di-dedekind)
  - [3.2 Dimostrazione della non completezza di Q](#32-dimostrazione-della-non-completezza-di-q)
- [4. Teorema di Unicità del Limite](#4-teorema-di-unicità-del-limite)
  - [4.1 Enunciato](#41-enunciato)
  - [4.2 Dimostrazione per Assurdo](#42-dimostrazione-per-assurdo)
- [5. Teorema della Permanenza del Segno](#5-teorema-della-permanenza-del-segno)
  - [5.1 Enunciato](#51-enunciato)
  - [5.2 Dimostrazione](#52-dimostrazione)
- [6. Teorema del Confronto (dei Due Carabinieri)](#6-teorema-del-confronto-dei-due-carabinieri)
  - [6.1 Enunciato](#61-enunciato)
  - [6.2 Dimostrazione](#62-dimostrazione)
- [7. Teorema degli Zeri (Bolzano)](#7-teorema-degli-zeri-bolzano)
  - [7.1 Enunciato](#71-enunciato)
  - [7.2 Dimostrazione](#72-dimostrazione)
- [8. Teorema dei Valori Intermedi (Bolzano)](#8-teorema-dei-valori-intermedi-bolzano)
  - [8.1 Enunciato](#81-enunciato)
  - [8.2 Dimostrazione](#82-dimostrazione)
- [9. Teorema di Fermat (sui Punti Stazionari)](#9-teorema-di-fermat-sui-punti-stazionari)
  - [9.1 Enunciato](#91-enunciato)
  - [9.2 Dimostrazione](#92-dimostrazione)
- [10. Teorema di Rolle](#10-teorema-di-rolle)
  - [10.1 Enunciato](#101-enunciato)
  - [10.2 Dimostrazione](#102-dimostrazione)
  - [10.3 Significato Geometrico](#103-significato-geometrico)
- [11. Teorema di Cauchy](#11-teorema-di-cauchy)
  - [11.1 Enunciato](#111-enunciato)
  - [11.2 Dimostrazione](#112-dimostrazione)
- [12. Teorema di Lagrange (del Valor Medio)](#12-teorema-di-lagrange-del-valor-medio)
  - [12.1 Enunciato](#121-enunciato)
  - [12.2 Dimostrazione](#122-dimostrazione)
  - [12.3 Significato Geometrico](#123-significato-geometrico)
- [13. Teorema della Media Integrale](#13-teorema-della-media-integrale)
  - [13.1 Enunciato](#131-enunciato)
  - [13.2 Dimostrazione](#132-dimostrazione)
  - [13.3 Significato Geometrico](#133-significato-geometrico)
- [14. Teorema Fondamentale del Calcolo Integrale (Torricelli-Barrow)](#14-teorema-fondamentale-del-calcolo-integrale-torricelli-barrow)
  - [14.1 Definizione della Funzione Integrale](#141-definizione-della-funzione-integrale)
  - [14.2 Enunciato del Teorema](#142-enunciato-del-teorema)
  - [14.3 Dimostrazione](#143-dimostrazione)
- [15. Formula Fondamentale del Calcolo Integrale](#15-formula-fondamentale-del-calcolo-integrale)
  - [15.1 Enunciato e Dimostrazione](#151-enunciato-e-dimostrazione)
    - [Dimostrazione:](#dimostrazione)
- [16. Criterio di Monotonia](#16-criterio-di-monotonia)
  - [16.1 Enunciato](#161-enunciato)
  - [16.2 Dimostrazione](#162-dimostrazione)
    - [($\implies$) Condizione Necessaria:](#implies-condizione-necessaria)
    - [($\impliedby$) Condizione Sufficiente:](#impliedby-condizione-sufficiente)
- [17. Teorema: Derivabilità implica Continuità](#17-teorema-derivabilità-implica-continuità)
  - [17.1 Enunciato](#171-enunciato)
  - [17.2 Dimostrazione](#172-dimostrazione)
- [18. Teorema di Invertibilità delle Funzioni Strettamente Monotone](#18-teorema-di-invertibilità-delle-funzioni-strettamente-monotone)
  - [18.1 Enunciato](#181-enunciato)
  - [18.2 Dimostrazione](#182-dimostrazione)

---

# 1. Principio di Induzione e Disuguaglianza di Bernoulli

## 1.1 Principio di Induzione
> [!NOTE]
> Se una proprietà $P(\mathbb{N})$ vale per $n = 1$ e, se supposta vera per $n$, risulta vera per $n + 1$, allora $P(\mathbb{N})$ risulta vera per ogni $n \in \mathbb{N}$.

---

## 1.2 Disuguaglianza di Bernoulli
$$(1 + a)^n \ge 1 + na \quad \text{per } a \ge -1$$

---

## 1.3 Dimostrazione per Induzione

1. **Base dell'induzione ($n = 1$):**
   $$1 + a \ge 1 + a$$
   La relazione è identica e quindi è banalmente **vera**.

2. **Passo induttivo:**
   Supponiamola vera per $n$ (ipotesi induttiva) e dimostriamo che è vera anche per $n + 1$, cioè che vale:
   $$(1 + a)^{n+1} \ge 1 + (n + 1)a$$

   Abbiamo supposto vera la relazione per un generico $n$:
   $$(1 + a)^n \ge 1 + na$$

   Siccome $a \ge -1$, allora $1 + a \ge 0$. Moltiplichiamo entrambi i membri della precedente disuguaglianza per la quantità non negativa $(1 + a)$:
   $$(1 + a)(1 + a)^n \ge (1 + a)(1 + na)$$

   Dalla proprietà additiva degli esponenti al primo membro:
   $$(1 + a)^{n+1} \ge (1 + a)(1 + na)$$

   Sviluppando il prodotto al secondo membro:
   $$(1 + a)^{n+1} \ge 1 + na + a + na^2 = 1 + (n + 1)a + na^2$$

   Poiché $n \ge 1$ e $a^2 \ge 0$, il termine $na^2 \ge 0$, da cui consegue che:
   $$1 + (n + 1)a + na^2 \ge 1 + (n + 1)a$$

   Pertanto:
   $$(1 + a)^{n+1} \ge 1 + (n + 1)a$$

Per il principio di induzione, la disuguaglianza di Bernoulli è vera $\forall n \in \mathbb{N}$. $\blacksquare$

---

# 2. Irrazionalità di Radice di 2

## 2.1 Enunciato
$$\sqrt{2} \notin \mathbb{Q} \quad (\sqrt{2} \text{ non è un numero razionale})$$

---

## 2.2 Dimostrazione per Assurdo

Supponiamo per assurdo che esista una frazione che rappresenta la radice quadrata di $2$:
$$\sqrt{2} = \frac{p}{q}$$
con la frazione ridotta ai minimi termini (ovvero $\gcd(p, q) = 1$, con $p, q \in \mathbb{N}^+$ primi tra loro).

Elevando entrambi i membri al quadrato:
$$2 = \frac{p^2}{q^2} \implies p^2 = 2q^2$$

Dall’ultima relazione notiamo che $p^2$ è un numero pari e, di conseguenza, è pari anche $p$ (il quadrato di un numero dispari è sempre dispari).

Essendo $p$ pari, possiamo scriverlo come:
$$p = 2k \quad \text{per qualche intero } k$$

Sostituendo $p = 2k$ nella relazione precedente:
$$(2k)^2 = 2q^2 \implies 4k^2 = 2q^2 \implies q^2 = 2k^2$$

Quindi anche $q^2$ è pari e, di conseguenza, è pari anche $q$.

> [!CAUTION]
> **Assurdo:** Abbiamo ottenuto che sia $p$ sia $q$ sono entrambi numeri pari, e quindi divisibili per $2$. Questo contraddice l'ipotesi iniziale che la frazione $\frac{p}{q}$ fosse ridotta ai minimi termini.

Pertanto, l'innocua radice quadrata di due non può essere espressa come rapporto di interi: è un nuovo numero che chiamiamo **irrazionale**. $\blacksquare$

---

# 3. Assioma di Dedekind e Incompletezza di Q

## 3.1 Enunciato dell'Assioma di Dedekind
> [!IMPORTANT]
> **Assioma di Dedekind (Continuità dei Reali):**  
> Per ogni sezione $(A, B)$ di $\mathbb{R}$, esiste un unico elemento separatore $L \in \mathbb{R}$ tale che:
> $$a \le L \le b \quad \forall a \in A, \; \forall b \in B$$
> Il numero $L$ è detto **elemento separatore** e appartiene ad $A$ oppure a $B$.

Questo assioma esplicita formalmente la proprietà di continuità dei numeri reali, ovvero che $\mathbb{R}$ è privo di "buchi".

---

## 3.2 Dimostrazione della non completezza di Q

Mostriamo che l'insieme dei numeri razionali $\mathbb{Q}$ **non verifica** l'assioma di Dedekind.

Definiamo la coppia di insiemi:
$$A = \{x \in \mathbb{Q} : x < 0\} \cup \{x \in \mathbb{Q} : x \ge 0, \; x^2 < 2\}$$
$$B = \{x \in \mathbb{Q} : x \ge 0, \; x^2 \ge 2\}$$

È immediato verificare che $(A, B)$ costituisce una partizione/sezione di $\mathbb{Q}$.

Supponiamo per assurdo che esista un elemento separatore razionale $L \in \mathbb{Q}$ e che $L \in A$.  
Dunque $L$ è un numero positivo tale che $L^2 < 2$.

Sia $N$ un intero sufficientemente grande tale che:
$$N > \frac{2L + 1}{2 - L^2}$$

Moltiplicando per la quantità positiva $(2 - L^2)$:
$$N(2 - L^2) > 2L + 1 \implies 2 - L^2 > \frac{2L + 1}{N} \implies 2 > L^2 + \frac{2L + 1}{N}$$

Leggendola al contrario:
$$L^2 + \frac{2L + 1}{N} < 2$$

Valutiamo ora il quadrato di $\left(L + \frac{1}{N}\right)$:
$$\left(L + \frac{1}{N}\right)^2 = L^2 + \frac{2L}{N} + \frac{1}{N^2} < L^2 + \frac{2L}{N} + \frac{1}{N} = L^2 + \frac{2L + 1}{N} < 2$$

Questo risultato dimostra che:
$$L + \frac{1}{N} \in A$$

Tuttavia, $L + \frac{1}{N} > L$, il che contraddice il fatto che $L$ sia l'elemento separatore (maggiorante di $A$).

In modo del tutto analogo si esclude il caso in cui $L \in B$ (dimostrando che esisterebbe un elemento $L - \frac{1}{N} \in B$ minore di $L$).

Dato che non esiste alcun elemento separatore razionale, $\mathbb{Q}$ non è completo. $\blacksquare$

---

# 4. Teorema di Unicità del Limite

## 4.1 Enunciato
> [!IMPORTANT]
> Se il limite di una funzione in un punto esiste, **esso è unico**:
> $$\lim_{x \to x_0} f(x) = l$$

---

## 4.2 Dimostrazione per Assurdo

Supponiamo per assurdo che esistano due limiti distinti:
$$\lim_{x \to x_0} f(x) = l_1 \quad \text{e} \quad \lim_{x \to x_0} f(x) = l_2 \quad \text{con } l_1 \ne l_2$$

Supponiamo, senza perdita di generalità, che $l_1 < l_2$.  
Scegliamo un valore di $\varepsilon$ positivo tale che gli intorni di $l_1$ e $l_2$ siano disgiunti:
$$\varepsilon < \frac{l_2 - l_1}{2}$$

Dalla definizione di limite applicata a $l_1$ ed $l_2$:
- $\exists r_1 > 0$ tale che $|f(x) - l_1| < \varepsilon, \quad \forall x \in I(x_0, r_1) \setminus \{x_0\}$
- $\exists r_2 > 0$ tale che $|f(x) - l_2| < \varepsilon, \quad \forall x \in I(x_0, r_2) \setminus \{x_0\}$

Consideriamo l'intorno intersezione $I(x_0, r)$ con $r = \min(r_1, r_2)$. In tale intorno valgono contemporaneamente entrambe le disuguaglianze:
$$\begin{cases} l_1 - \varepsilon < f(x) < l_1 + \varepsilon \\ l_2 - \varepsilon < f(x) < l_2 + \varepsilon \end{cases}$$

Dal precedente sistema osserviamo che:
$$l_2 - \varepsilon < f(x) < l_1 + \varepsilon$$

Quindi:
$$l_2 - \varepsilon < l_1 + \varepsilon \implies l_2 - l_1 < 2\varepsilon \implies \varepsilon > \frac{l_2 - l_1}{2}$$

> [!CAUTION]
> **Contraddizione:** Siamo giunti a $\varepsilon > \frac{l_2 - l_1}{2}$, in palese contraddizione con la scelta iniziale $\varepsilon < \frac{l_2 - l_1}{2}$.

L'assurdo deriva dall'aver ipotizzato l'esistenza di due limiti distinti. Dunque il limite, se esiste, è **unico**. $\blacksquare$

---

# 5. Teorema della Permanenza del Segno

## 5.1 Enunciato
> [!NOTE]
> Se $\lim_{x \to x_0} f(x) = l \ne 0$, allora la funzione è **localmente concorde** con il segno del suo limite (cioè esiste un intorno di $x_0$ in cui $f(x)$ ha lo stesso segno di $l$).

---

## 5.2 Dimostrazione

Dalla definizione di limite:
$$\forall \varepsilon > 0, \quad \exists I(x_0, r) \text{ tale che } l - \varepsilon < f(x) < l + \varepsilon, \quad \forall x \in I(x_0, r) \setminus \{x_0\}$$

Scegliamo arbitrariamente $\varepsilon = |l| > 0$. Sostituendo nella catena di disuguaglianze:
$$l - |l| < f(x) < l + |l|$$

Distinguiamo i due casi possibili:
1. **Se $l > 0$:** allora $|l| = l$.  
   $$l - l < f(x) < l + l \implies 0 < f(x) < 2l$$
   Quindi la funzione $f(x)$ è **strettamente positiva** nell'intorno considerato.

2. **Se $l < 0$:** allora $|l| = -l$.  
   $$l - (-l) < f(x) < l + (-l) \implies 2l < f(x) < 0$$
   Quindi la funzione $f(x)$ è **strettamente negativa** nell'intorno considerato.

In entrambi i casi la funzione assume localmente lo stesso segno del limite $l$. $\blacksquare$

---

# 6. Teorema del Confronto (dei Due Carabinieri)

## 6.1 Enunciato
> [!IMPORTANT]
> Siano $h(x)$, $f(x)$, $g(x)$ tre funzioni definite in un intorno $I(x_0, r)$ tali che:
> $$h(x) \le f(x) \le g(x) \quad \forall x \in I(x_0, r) \setminus \{x_0\}$$
> Se:
> $$\lim_{x \to x_0} h(x) = \lim_{x \to x_0} g(x) = l$$
> Allora anche:
> $$\lim_{x \to x_0} f(x) = l$$

---

## 6.2 Dimostrazione

Fissato un qualsiasi $\varepsilon > 0$, dalla definizione di limite per $h(x)$ e $g(x)$ si ha che:
- $\exists r_1 > 0$ tale che $|h(x) - l| < \varepsilon, \quad \forall x \in I(x_0, r_1) \setminus \{x_0\}$
- $\exists r_2 > 0$ tale che $|g(x) - l| < \varepsilon, \quad \forall x \in I(x_0, r_2) \setminus \{x_0\}$

Esplicitando i valori assoluti:
$$l - \varepsilon < h(x) < l + \varepsilon \quad \forall x \in I(x_0, r_1)$$
$$l - \varepsilon < g(x) < l + \varepsilon \quad \forall x \in I(x_0, r_2)$$

Considerando l'intorno intersezione con raggio $r^* = \min(r, r_1, r_2)$, le relazioni valgono contemporaneamente:
$$l - \varepsilon < h(x) \le f(x) \le g(x) < l + \varepsilon$$

Prendendo il primo e l'ultimo termine della catena:
$$l - \varepsilon < f(x) < l + \varepsilon \iff |f(x) - l| < \varepsilon \quad \forall x \in I(x_0, r^*)$$

Ciò corrisponde esattamente alla definizione di limite:
$$\lim_{x \to x_0} f(x) = l \quad \blacksquare$$

---

# 7. Teorema degli Zeri (Bolzano)

## 7.1 Enunciato
> [!IMPORTANT]
> Sia $f: [a, b] \to \mathbb{R}$ una funzione continua nell'intervallo chiuso e limitato $[a, b]$.  
> Se $f(a) \cdot f(b) < 0$ (ovvero la funzione assume valori di segno opposto agli estremi), allora esiste almeno un punto interno $x_0 \in (a, b)$ tale che:
> $$f(x_0) = 0$$

---

## 7.2 Dimostrazione

Supponiamo, senza perdita di generalità, che $f(a) < 0$ e $f(b) > 0$.  
Supponiamo per assurdo che $f(x) \ne 0, \forall x \in [a, b]$.

Definiamo l'insieme:
$$A = \{x \in [a, b] : f(x) < 0\}$$

1. $A \ne \emptyset$ poiché contiene almeno $a$ (essendo $f(a) < 0$).
2. $A$ è limitato superiormente da $b$.

Per l'assioma di completezza dei numeri reali, esiste l'estremo superiore:
$$x_0 = \sup A \le b$$

Dato che $f(b) > 0$, certamente $x_0 < b$.  
Per l'ipotesi di assurdo, $f(x_0) \ne 0$. Analizziamo le due possibilità:

- **Se $f(x_0) < 0$:**  
  Per il teorema della permanenza del segno, esiste un intorno $I(x_0, r)$ in cui $f(x) < 0$.  
  Dunque in tutto l'intervallo $(x_0, x_0 + r)$ si avrebbe $f(x) < 0$, il che implica che in $(x_0, x_0 + r)$ ci sono elementi di $A$. Ma questo contraddice il fatto che $x_0$ sia un maggiorante di $A$.

- **Se $f(x_0) > 0$:**  
  Sempre per la permanenza del segno, esiste un intorno $I(x_0, r)$ in cui $f(x) > 0$.  
  Quindi nell'intervallo $(x_0 - r, x_0]$ la funzione è strettamente positiva, il che significa che nessun punto di $A$ appartiene a $(x_0 - r, x_0]$. Ma allora $x_0 - r$ sarebbe un maggiorante di $A$ strettamente minore di $x_0$, contraddicendo la definizione di $x_0$ come *minimo dei maggioranti* ($\sup A$).

Entrambe le ipotesi portano a una contraddizione: deve quindi necessariamente valere $f(x_0) = 0$. $\blacksquare$

---

# 8. Teorema dei Valori Intermedi (Bolzano)

## 8.1 Enunciato
> [!NOTE]
> Sia $f: [a, b] \to \mathbb{R}$ una funzione continua con $f(a) < f(b)$.  
> Allora la funzione assume tutti i valori compresi tra $f(a)$ e $f(b)$, cioè per ogni $y \in (f(a), f(b))$ esiste almeno un $x_0 \in (a, b)$ tale che $f(x_0) = y$ (la funzione è suriettiva su $[f(a), f(b)]$).

---

## 8.2 Dimostrazione

Fissiamo un generico valore $y$ tale che $f(a) < y < f(b)$.  
Costruiamo la funzione ausiliaria $g: [a, b] \to \mathbb{R}$ definita da:
$$g(x) = f(x) - y$$

Essendo $f(x)$ continua e $y$ una costante, $g(x)$ è una funzione continua in $[a, b]$.  
Valutiamo $g(x)$ agli estremi dell'intervallo:
- $g(a) = f(a) - y < 0 \quad (\text{poiché } f(a) < y)$
- $g(b) = f(b) - y > 0 \quad (\text{poiché } y < f(b))$

Dunque $g(a) \cdot g(b) < 0$.  
La funzione $g(x)$ soddisfa tutte le ipotesi del **Teorema degli Zeri**, pertanto esiste almeno un punto $x_0 \in (a, b)$ tale che:
$$g(x_0) = 0 \iff f(x_0) - y = 0 \iff f(x_0) = y \quad \blacksquare$$

---

# 9. Teorema di Fermat (sui Punti Stazionari)

## 9.1 Enunciato
> [!IMPORTANT]
> Sia $f: A \to \mathbb{R}$ e sia $x_0$ un punto di massimo o di minimo relativo **interno** ad $A$.  
> Se $f$ è **derivabile** in $x_0$, allora la derivata prima in quel punto è nulla:
> $$f'(x_0) = 0$$
> Un punto in cui la derivata prima si annulla è detto **punto stazionario**.

---

## 9.2 Dimostrazione

Supponiamo che $x_0$ sia un punto di massimo relativo interno.  
Per definizione di massimo relativo, esiste un intorno $I(x_0) \subseteq A$ tale che:
$$f(x) \le f(x_0) \quad \forall x \in I(x_0)$$

Ciò significa che per ogni incremento $h \in \mathbb{R}$ sufficientemente piccolo ($x_0 + h \in I(x_0)$):
$$f(x_0 + h) - f(x_0) \le 0$$

Valutiamo il rapporto incrementale:
- **Per $h > 0$ (incremento destro):**
  $$\frac{f(x_0 + h) - f(x_0)}{h} \le 0$$
- **Per $h < 0$ (incremento sinistro):**
  $$\frac{f(x_0 + h) - f(x_0)}{h} \ge 0$$

Poiché $f$ è derivabile in $x_0$ per ipotesi, il limite del rapporto incrementale esiste ed è unico (derivata destra e sinistra coincidono).  
Applicando il teorema della permanenza del segno:
$$f'(x_0) = \lim_{h \to 0^+} \frac{f(x_0 + h) - f(x_0)}{h} \le 0$$
$$f'(x_0) = \lim_{h \to 0^-} \frac{f(x_0 + h) - f(x_0)}{h} \ge 0$$

Dovendo essere contemporaneamente $f'(x_0) \le 0$ e $f'(x_0) \ge 0$, l'unica possibilità è:
$$f'(x_0) = 0$$

Con ragionamento del tutto analogo (invertendo il segno delle disuguaglianze) si dimostra il caso in cui $x_0$ è un punto di minimo relativo interno. $\blacksquare$

---

# 10. Teorema di Rolle

## 10.1 Enunciato
> [!IMPORTANT]
> Sia $f(x)$ una funzione:
> 1. Continua nell'intervallo chiuso e limitato $[a, b]$
> 2. Derivabile nell'intervallo aperto $(a, b)$
> 3. Tale che $f(a) = f(b)$
> 
> Allora esiste almeno un punto $c \in (a, b)$ tale che:
> $$f'(c) = 0$$

---

## 10.2 Dimostrazione

Essendo $f(x)$ continua su un intervallo chiuso e limitato $[a, b]$, per il **Teorema di Weierstrass** essa ammette un punto di massimo assoluto $M$ e un punto di minimo assoluto $m$ in $[a, b]$.

Distinguiamo due casi:
1. **Il massimo e il minimo si trovano entrambi agli estremi dell'intervallo:**  
   Poiché per la terza ipotesi $f(a) = f(b)$, si avrebbe $M = m$. Una funzione in cui il valore massimo coincide con il minimo è necessariamente **costante** in $[a, b]$. La derivata di una funzione costante è nulla in ogni punto:
   $$f'(x) = 0 \quad \forall x \in (a, b)$$

2. **Almeno uno tra il massimo o il minimo è raggiunto in un punto interno $c \in (a, b)$:**  
   Essendo $c$ un punto di estremo relativo interno al dominio e poiché la funzione è derivabile in $(a, b)$, il **Teorema di Fermat** ci garantisce direttamente che:
   $$f'(c) = 0$$

In tutti i casi, esiste almeno un punto $c \in (a, b)$ con derivata nulla. $\blacksquare$

---

## 10.3 Significato Geometrico

Geometricamente il Teorema di Rolle afferma che, se il grafico di una funzione continua e derivabile assume la stessa quota agli estremi $a$ e $b$, allora esiste almeno un punto $c$ interno all'intervallo in cui la **retta tangente al grafico è orizzontale** (coefficiente angolare nullo).

![Figura 1: Interpretazione geometrica del Teorema di Rolle](images/analisi/teorema_rolle.png)

---

# 11. Teorema di Cauchy

## 11.1 Enunciato
> [!IMPORTANT]
> Siano $f(x)$ e $g(x)$ due funzioni:
> 1. Continue in $[a, b]$
> 2. Derivabili in $(a, b)$
> 
> Allora esiste almeno un punto $c \in (a, b)$ tale che:
> $$[f(b) - f(a)] g'(c) = [g(b) - g(a)] f'(c)$$

---

## 11.2 Dimostrazione

Costruiamo la seguente funzione ausiliaria $h: [a, b] \to \mathbb{R}$:
$$h(x) = [f(b) - f(a)] g(x) - [g(b) - g(a)] f(x)$$

Verifichiamo le ipotesi del Teorema di Rolle su $h(x)$:
- $h(x)$ è continua in $[a, b]$ in quanto combinazione lineare di funzioni continue.
- $h(x)$ è derivabile in $(a, b)$ in quanto combinazione lineare di funzioni derivabili.
- Valutiamo $h(x)$ agli estremi $a$ e $b$:
  $$h(a) = [f(b) - f(a)] g(a) - [g(b) - g(a)] f(a) = f(b)g(a) - f(a)g(a) - g(b)f(a) + g(a)f(a) = f(b)g(a) - g(b)f(a)$$
  $$h(b) = [f(b) - f(a)] g(b) - [g(b) - g(a)] f(b) = f(b)g(b) - f(a)g(b) - g(b)f(b) + g(a)f(b) = -f(a)g(b) + g(a)f(b) = f(b)g(a) - g(b)f(a)$$

Quindi $h(a) = h(b)$.

La funzione $h(x)$ soddisfa tutte le ipotesi del **Teorema di Rolle**, pertanto esiste almeno un punto $c \in (a, b)$ tale che:
$$h'(c) = 0$$

Calcolando la derivata prima di $h(x)$:
$$h'(c) = [f(b) - f(a)] g'(c) - [g(b) - g(a)] f'(c) = 0$$

Portando il secondo termine al secondo membro otteniamo la tesi:
$$[f(b) - f(a)] g'(c) = [g(b) - g(a)] f'(c) \quad \blacksquare$$

---

# 12. Teorema di Lagrange (del Valor Medio)

## 12.1 Enunciato
> [!IMPORTANT]
> Sia $f(x)$ una funzione continua in $[a, b]$ e derivabile in $(a, b)$.  
> Allora esiste almeno un punto $c \in (a, b)$ tale che:
> $$f'(c) = \frac{f(b) - f(a)}{b - a}$$

---

## 12.2 Dimostrazione

Consideriamo la funzione ausiliaria $g(x) = x$, che è continua in $[a, b]$ e derivabile in $(a, b)$ con derivata costante:
$$g'(x) = 1 \quad \forall x$$

Applichiamo il **Teorema di Cauchy** alle funzioni $f(x)$ e $g(x)$ nell'intervallo $[a, b]$:
$$[f(b) - f(a)] g'(c) = [g(b) - g(a)] f'(c)$$

Sostituendo $g(b) = b$, $g(a) = a$ e $g'(c) = 1$:
$$[f(b) - f(a)] \cdot 1 = [b - a] \cdot f'(c)$$

Dividendo entrambi i membri per $(b - a) \ne 0$:
$$f'(c) = \frac{f(b) - f(a)}{b - a} \quad \blacksquare$$

---

## 12.3 Significato Geometrico

Il rapporto $\frac{f(b) - f(a)}{b - a}$ rappresenta il coefficiente angolare della retta secante passante per i punti estremi del grafico $A(a, f(a))$ e $B(b, f(b))$.  
Il Teorema di Lagrange afferma che esiste almeno un punto $c \in (a, b)$ in cui la **retta tangente al grafico è parallela alla corda congiungente gli estremi**.

![Figura 2: Interpretazione geometrica del Teorema di Lagrange](images/analisi/teorema_lagrange.png)

---

# 13. Teorema della Media Integrale

## 13.1 Enunciato
> [!IMPORTANT]
> Sia $f: [a, b] \to \mathbb{R}$ una funzione integrabile secondo Riemann. Allora:
> $$\inf f \cdot (b - a) \le \int_a^b f(x)\,dx \le \sup f \cdot (b - a)$$
> 
> Se inoltre $f$ è **continua** in $[a, b]$, esiste almeno un punto $c \in [a, b]$ tale che:
> $$\int_a^b f(x)\,dx = f(c) \cdot (b - a) \iff f(c) = \frac{1}{b - a} \int_a^b f(x)\,dx$$

---

## 13.2 Dimostrazione

Per definizione di estremo inferiore e superiore, per ogni $x \in [a, b]$ si ha:
$$\inf f \le f(x) \le \sup f$$

Integrando ciascun membro sull'intervallo $[a, b]$ (proprietà di monotonia dell'integrale):
$$\int_a^b \inf f \, dx \le \int_a^b f(x)\,dx \le \int_a^b \sup f \, dx$$
$$\inf f \cdot (b - a) \le \int_a^b f(x)\,dx \le \sup f \cdot (b - a)$$

Se la funzione è continua nell'intervallo chiuso e limitato $[a, b]$, per il **Teorema di Weierstrass** essa ammette minimo assoluto $m$ e massimo assoluto $M$. Possiamo quindi sostituire $\inf f$ con $m$ e $\sup f$ con $M$:
$$m \cdot (b - a) \le \int_a^b f(x)\,dx \le M \cdot (b - a)$$

Dividendo per la quantità strettamente positiva $(b - a)$:
$$m \le \frac{1}{b - a} \int_a^b f(x)\,dx \le M$$

Il valore numerico $\mu = \frac{1}{b - a} \int_a^b f(x)\,dx$ è un valore compreso tra il minimo $m$ e il massimo $M$.  
Per il **Teorema dei Valori Intermedi**, la funzione continua $f(x)$ assume tutti i valori compresi tra $m$ ed $M$. Per tale motivo esisterà almeno un $c \in [a, b]$ tale che:
$$f(c) = \frac{1}{b - a} \int_a^b f(x)\,dx \iff \int_a^b f(x)\,dx = f(c) \cdot (b - a) \quad \blacksquare$$

---

## 13.3 Significato Geometrico

Geometricamente il teorema afferma che l'area sottesa dal grafico della funzione positiva $f(x)$ nell'intervallo $[a, b]$ è esattamente equivalente all'area di un **rettangolo avente per base la lunghezza dell'intervallo $(b - a)$ e per altezza il valore medio $f(c)$**.

---

# 14. Teorema Fondamentale del Calcolo Integrale (Torricelli-Barrow)

## 14.1 Definizione della Funzione Integrale
> [!NOTE]
> Se $f(x)$ è una funzione integrabile secondo Riemann in $[a, b]$, si definisce **funzione integrale** $F: [a, b] \to \mathbb{R}$:
> $$F(x) = \int_a^x f(t)\,dt \quad \text{al variare di } x \in [a, b]$$
> Lo studio delle relazioni che intercorrono tra la funzione integrale $F(x)$ e la funzione integranda $f(x)$ è alla base del calcolo integrale.

---

## 14.2 Enunciato del Teorema
> [!IMPORTANT]
> Se $f(x)$ è continua in $[a, b]$, allora la sua funzione integrale $F(x)$ è derivabile in ogni punto di $[a, b]$ e la sua derivata coincide con la funzione integranda stessa:
> $$F'(x) = f(x)$$
> Si dice che $F(x)$ è una **primitiva** di $f(x)$.

---

## 14.3 Dimostrazione

Consideriamo il rapporto incrementale della funzione integrale $F(x)$ per un incremento $\Delta x \ne 0$:
$$\frac{F(x + \Delta x) - F(x)}{\Delta x} = \frac{\int_a^{x + \Delta x} f(t)\,dt - \int_a^x f(t)\,dt}{\Delta x}$$

Dalla proprietà di additività dell'intervallo di integrazione:
$$\int_a^{x + \Delta x} f(t)\,dt = \int_a^x f(t)\,dt + \int_x^{x + \Delta x} f(t)\,dt$$

Sostituendo nel rapporto incrementale:
$$\frac{F(x + \Delta x) - F(x)}{\Delta x} = \frac{\int_a^x f(t)\,dt + \int_x^{x + \Delta x} f(t)\,dt - \int_a^x f(t)\,dt}{\Delta x} = \frac{\int_x^{x + \Delta x} f(t)\,dt}{\Delta x}$$

Applichiamo il **Teorema della Media Integrale** all'integrale $\int_x^{x + \Delta x} f(t)\,dt$: esiste un punto $z \in [x, x + \Delta x]$ (oppure $[x + \Delta x, x]$ se $\Delta x < 0$) tale che:
$$\int_x^{x + \Delta x} f(t)\,dt = f(z) \cdot \Delta x$$

Pertanto:
$$\frac{F(x + \Delta x) - F(x)}{\Delta x} = \frac{f(z) \cdot \Delta x}{\Delta x} = f(z)$$

Calcoliamo il limite per $\Delta x \to 0$.  
Quando l'ampiezza dell'intervallo tende a zero ($\Delta x \to 0$), il punto compreso $z$ tende a $x$ ($z \to x$).  
Essendo $f$ continua per ipotesi:
$$\lim_{\Delta x \to 0} \frac{F(x + \Delta x) - F(x)}{\Delta x} = \lim_{z \to x} f(z) = f(x)$$

Dunque il limite del rapporto incrementale esiste ed è finito, dimostrando che:
$$F'(x) = f(x) \quad \blacksquare$$

---

# 15. Formula Fondamentale del Calcolo Integrale

## 15.1 Enunciato e Dimostrazione

> [!IMPORTANT]
> **Formula Fondamentale del Calcolo Integrale:**  
> Se $G(x)$ è una qualsiasi primitiva di una funzione continua $f(x)$ su $[a, b]$, allora:
> $$\int_a^b f(t)\,dt = G(b) - G(a)$$

### Dimostrazione:
1. Sappiamo che la funzione integrale $F(x) = \int_a^x f(t)\,dt$ è una primitiva di $f(x)$ (Teorema di Torricelli-Barrow).
2. Se $G(x)$ è un'altra primitiva di $f(x)$, le due funzioni differiscono unicamente per una costante $c \in \mathbb{R}$:
   $$\int_a^x f(t)\,dt = G(x) + c$$
3. Ponendo $x = a$:
   $$\int_a^a f(t)\,dt = G(a) + c \implies 0 = G(a) + c \implies c = -G(a)$$
4. Sostituendo il valore della costante $c$ ottenuto:
   $$\int_a^x f(t)\,dt = G(x) - G(a)$$
5. Valutando infine per $x = b$, si ottiene:
   $$\int_a^b f(t)\,dt = G(b) - G(a) \quad \blacksquare$$

---

# 16. Criterio di Monotonia

## 16.1 Enunciato
> [!IMPORTANT]
> Sia $f(x)$ una funzione continua in $[a, b]$ e derivabile in $(a, b)$.  
> $f(x)$ è **crescente** in $[a, b]$ se e solo se la sua derivata prima è non negativa in $(a, b)$:
> $$f \text{ crescente} \iff f'(x) \ge 0 \quad \forall x \in (a, b)$$
> Analogamente, $f(x)$ è **decrescente** in $[a, b]$ se e solo se $f'(x) \le 0, \forall x \in (a, b)$.

---

## 16.2 Dimostrazione

### ($\implies$) Condizione Necessaria:
Osserviamo che la funzione $f(x)$ è crescente se e solo se per ogni coppia di punti distinti $x, x_0 \in (a, b)$:
$$\frac{f(x) - f(x_0)}{x - x_0} \ge 0$$

Infatti:
- Se $x > x_0 \implies f(x) \ge f(x_0)$, quindi numeratore e denominatore sono entrambi positivi ($\ge 0$).
- Se $x < x_0 \implies f(x) \le f(x_0)$, quindi numeratore e denominatore sono entrambi negativi ($\ge 0$).

In ogni caso numeratore e denominatore hanno lo stesso segno.  
Per il **Teorema della Permanenza del Segno** applicato al limite del rapporto incrementale:
$$f'(x_0) = \lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0} \ge 0$$

Data l'arbitrarietà del punto $x_0 \in (a, b)$, si ha $f'(x) \ge 0, \forall x \in (a, b)$. In questa prima implicazione l'ipotesi che il dominio sia un intervallo è superflua.

### ($\impliedby$) Condizione Sufficiente:
Viceversa, supponiamo che si abbia $f'(x) \ge 0, \forall x \in (a, b)$.  
Siano $x_1, x_2 \in [a, b]$ con $x_1 < x_2$.

Nell'intervallo $[x_1, x_2]$, la funzione $f$ soddisfa le ipotesi del **Teorema di Lagrange**. Esiste quindi un punto $c \in (x_1, x_2)$ tale che:
$$\frac{f(x_2) - f(x_1)}{x_2 - x_1} = f'(c)$$

Poiché per ipotesi $f'(c) \ge 0$ e $x_2 - x_1 > 0$:
$$f(x_2) - f(x_1) = f'(c)(x_2 - x_1) \ge 0 \implies f(x_2) \ge f(x_1)$$

Quindi la funzione è crescente in $[a, b]$. $\blacksquare$

> [!NOTE]
> In modo perfettamente analogo si dimostra che una funzione derivabile in un intervallo è decrescente se e solo se $f'(x) \le 0$.  
> **Importante:** Nell'implicazione $f'(x) \ge 0 \implies f \text{ crescente}$ è fondamentale l'ipotesi che il dominio sia un **intervallo** (se il dominio fosse formato dall'unione di intervalli disgiunti, come per $f(x) = -1/x$ su $\mathbb{R} \setminus \{0\}$, la proprietà non sarebbe valida globalmente).

---

# 17. Teorema: Derivabilità implica Continuità

## 17.1 Enunciato
> [!IMPORTANT]
> Se una funzione $f(x)$ è **derivabile** in un punto $x_0$, allora la funzione è in quel punto anche **continua**.
> $$f \text{ derivabile in } x_0 \implies f \text{ continua in } x_0$$

---

## 17.2 Dimostrazione

Consideriamo l'uguaglianza algebrica valida per qualsiasi incremento $\Delta x \ne 0$:
$$f(x_0 + \Delta x) = f(x_0) + f(x_0 + \Delta x) - f(x_0)$$

Possiamo riscriverla moltiplicando e dividendo per $\Delta x$:
$$f(x_0 + \Delta x) = f(x_0) + \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x} \cdot \Delta x$$

Facciamo tendere $\Delta x$ a zero applicando il teorema sul limite della somma e del prodotto:
$$\lim_{\Delta x \to 0} f(x_0 + \Delta x) = \lim_{\Delta x \to 0} f(x_0) + \lim_{\Delta x \to 0} \left[ \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x} \cdot \Delta x \right]$$

1. Il primo limite al secondo membro è il limite di una costante (non dipende da $\Delta x$):
   $$\lim_{\Delta x \to 0} f(x_0) = f(x_0)$$
2. La funzione è derivabile in $x_0$ per ipotesi, quindi il limite del rapporto incrementale esiste ed è un numero finito $f'(x_0) \in \mathbb{R}$:
   $$\lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x} = f'(x_0)$$

Pertanto:
$$\lim_{\Delta x \to 0} f(x_0 + \Delta x) = f(x_0) + \lim_{\Delta x \to 0} [f'(x_0) \cdot \Delta x] = f(x_0) + f'(x_0) \cdot 0 = f(x_0)$$

Ponendo $x = x_0 + \Delta x$, notiamo che $\Delta x \to 0 \iff x \to x_0$, per cui:
$$\lim_{x \to x_0} f(x) = f(x_0)$$

Il limite della funzione coincide con il valore della funzione nel punto, il che per definizione significa che la **funzione è continua in $x_0$**. $\blacksquare$

> [!WARNING]
> Non vale il viceversa: una funzione continua in un punto non è necessariamente derivabile in tale punto (classico controesempio: $f(x) = |x|$ in $x_0 = 0$, punto angoloso).

---

# 18. Teorema di Invertibilità delle Funzioni Strettamente Monotone

## 18.1 Enunciato
> [!IMPORTANT]
> Una funzione **strettamente monotona** è **invertibile** e la sua funzione inversa è a sua volta strettamente monotona (con lo stesso tipo di monotonia).

---

## 18.2 Dimostrazione

Sia $f: A \to B$ una funzione strettamente monotona.  
Per ogni coppia di elementi distinti $x_1, x_2 \in A$ (con $x_1 \ne x_2$):
- Se $f$ è strettamente crescente: $x_1 < x_2 \implies f(x_1) < f(x_2)$
- Se $f$ è strettamente decrescente: $x_1 < x_2 \implies f(x_1) > f(x_2)$

In entrambi i casi, per ogni $x_1, x_2 \in A$ con $x_1 \ne x_2$, risulta:
$$f(x_1) \ne f(x_2)$$

La funzione $f$ è dunque **iniettiva** e, considerando come codominio l'immagine $B = f(A)$, è **biiettiva** e pertanto **invertibile**.

Sia ora $f$ strettamente crescente; proviamo che anche l'inversa $f^{-1}: B \to A$ è strettamente crescente, cioè che:
$$y_1 < y_2 \implies f^{-1}(y_1) < f^{-1}(y_2)$$

Dimostriamo questa implicazione per assurdo:  
Supponiamo che per due valori $y_1 < y_2$ si abbia:
$$f^{-1}(y_1) \ge f^{-1}(y_2)$$

Poniamo $x_1 = f^{-1}(y_1)$ e $x_2 = f^{-1}(y_2)$. Allora avremmo $x_1 \ge x_2$.  
Poiché $f$ è strettamente crescente, risulterebbe:
$$x_1 \ge x_2 \implies f(x_1) \ge f(x_2) \implies y_1 \ge y_2$$

> [!CAUTION]
> **Contraddizione:** Siamo giunti a $y_1 \ge y_2$, contraddicendo l'ipotesi di partenza $y_1 < y_2$.

Dunque deve necessariamente valere $f^{-1}(y_1) < f^{-1}(y_2)$, provando che $f^{-1}$ è strettamente crescente. $\blacksquare$

> [!NOTE]
> **La stretta monotonia implica l'invertibilità, ma non è vera l'implicazione inversa:** una funzione invertibile non è detto che debba essere strettamente monotona (può essere invertibile pur non essendo monotona, se ad esempio non è definita su un intervallo connesso o presenta discontinuità).
