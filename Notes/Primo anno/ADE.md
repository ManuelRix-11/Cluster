# Architettura degli Elaboratori

> Appunti del corso ADE — Anno Accademico 2025/2026

## Il Datapath MIPS

Il processore MIPS a singolo ciclo esegue ogni istruzione in **un solo ciclo di clock**.

### Componenti principali

| Componente | Funzione |
|---|---|
| PC | Program Counter — indirizzo dell'istruzione corrente |
| Instruction Memory | Memoria istruzioni (sola lettura) |
| Register File | 32 registri da 32 bit |
| ALU | Unità Aritmetico-Logica |
| Data Memory | Memoria dati (lettura/scrittura) |
| MUX | Multiplexer — seleziona tra due sorgenti |

### Formato istruzioni R-type

```
| op (6) | rs (5) | rt (5) | rd (5) | shamt (5) | funct (6) |
```

- `op` = opcode (0 per R-type)
- `rs`, `rt` = registri sorgente
- `rd` = registro destinazione
- `funct` = specifica l'operazione ALU

### Formato istruzioni I-type

```
| op (6) | rs (5) | rt (5) | immediate (16) |
```

Usato da `lw`, `sw`, `beq`, `addi`.

---

## La ALU

L'ALU riceve due operandi a 32 bit e un segnale di controllo `ALUControl` (3 bit).

| ALUControl | Operazione |
|---|---|
| 000 | AND |
| 001 | OR |
| 010 | ADD |
| 110 | SUB |
| 111 | SLT |

Il bit `Zero` è attivo quando il risultato è 0 (usato da `beq`).

---

## Segnali di controllo principali

| Segnale | Descrizione |
|---|---|
| `RegDst` | 0 → rd = rt, 1 → rd = rd |
| `ALUSrc` | 0 → secondo operando da rt, 1 → da immediato sign-extended |
| `MemToReg` | 0 → dato da ALU, 1 → dato da memoria |
| `RegWrite` | Abilita scrittura nel Register File |
| `MemRead` | Abilita lettura dalla Data Memory |
| `MemWrite` | Abilita scrittura nella Data Memory |
| `Branch` | Abilita il salto condizionale |

---

## Esempio: `lw $t0, 100($s0)`

1. **IF**: Leggi istruzione da Instruction Memory[PC]
2. **ID**: Leggi `$s0` dal Register File
3. **EX**: ALU calcola `$s0 + 100` (sign-extend immediato)
4. **MEM**: Leggi Data Memory[indirizzo calcolato]
5. **WB**: Scrivi dato letto in `$t0`

`RegDst=0, ALUSrc=1, MemToReg=1, RegWrite=1, MemRead=1, MemWrite=0, Branch=0`
