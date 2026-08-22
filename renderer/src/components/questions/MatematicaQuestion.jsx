/**
 * Copyright (c) 2026 Emanuele Ragozzini
 * Cluster - Hub di studio e simulatore d'esami per Informatica Unisa
 * Licensed under the PolyForm Strict License 1.0.0.
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 */

import React, { useState, useEffect, useRef } from 'react';
import styles from './MatematicaQuestion.module.css';
import { compareMathAnswers, parseMath } from '../../utils/mathEval';

export function MatematicaQuestion({ question, savedAnswer, onAnswer }) {
  const [value, setValue] = useState(savedAnswer?.rispostaUtente || '');
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(savedAnswer?.rispostaUtente || '');
  }, [question, savedAnswer]);

  const handleConfirm = () => {
    if (!value.trim()) return;
    const { isCorrect } = compareMathAnswers(value, question.corretta, question.tolleranza);

    onAnswer({
      domanda: question.domanda,
      rispostaUtente: value,
      rispostaCorretta: String(question.corretta),
      esito: isCorrect ? 'corretta' : 'sbagliata'
    });
  };

  const insertSymbol = (sym) => {
    const input = inputRef.current;
    if (!input) {
      setValue(prev => prev + sym);
      return;
    }
    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? value.length;
    const newVal = value.slice(0, start) + sym + value.slice(end);
    setValue(newVal);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + sym.length, start + sym.length);
    }, 10);
  };

  // Preview numeric interpretation if possible
  const parsedVal = value.trim() ? parseMath(value) : NaN;
  const showPreview = !Number.isNaN(parsedVal) && String(value).trim() !== String(parsedVal);

  const symbols = ['/', '√', 'π', '^', '(', ')', '+', '-', 'sqrt(', 'e'];

  return (
    <div className={styles.container}>
      <div className={styles.hintBanner}>
        <span className={styles.hintIcon}>📝</span>
        <span>Svolgi l'esercizio su carta e inserisci qui il tuo <strong>risultato finale</strong> (es. <code>3/2</code>, <code>1.5</code>, <code>sqrt(2)</code>, <code>-4</code>).</span>
      </div>

      <div className={styles.inputWrap}>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder="Es: 3/2 oppure 1.5…"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleConfirm()}
          autoFocus
        />
        <button
          className={`btn btn--primary ${styles.btn}`}
          onClick={handleConfirm}
        >
          {savedAnswer ? 'Aggiorna →' : 'Conferma →'}
        </button>
      </div>

      <div className={styles.toolbar}>
        <span className={styles.toolbarLabel}>Simboli:</span>
        {symbols.map(sym => (
          <button
            key={sym}
            type="button"
            className={styles.symbolBtn}
            onClick={() => insertSymbol(sym === '√' ? 'sqrt(' : sym)}
            tabIndex={-1}
          >
            {sym}
          </button>
        ))}
      </div>

      {showPreview && (
        <div className={styles.preview}>
          <span>Valore calcolato:</span>
          <span className={styles.previewVal}>≈ {Number.isInteger(parsedVal) ? parsedVal : parsedVal.toFixed(4).replace(/\.?0+$/, '')}</span>
        </div>
      )}

      {savedAnswer && (
        <div className={styles.savedBadge}>
          <span>Risposta salvata: <strong>{savedAnswer.rispostaUtente}</strong></span>
        </div>
      )}
    </div>
  );
}
