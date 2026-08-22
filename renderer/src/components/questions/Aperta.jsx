/**
 * Copyright (c) 2026 Emanuele Ragozzini
 * Cluster - Hub di studio e simulatore d'esami per Informatica Unisa
 * Licensed under the PolyForm Strict License 1.0.0.
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 */

import React, { useState, useEffect } from 'react';
import styles from './Aperta.module.css';

// ponytail: basic fuzzy match ported from app.js
function normalizza(s) {
  return s
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function valutaRispostaAperta(input, corretta) {
  const a = normalizza(input);
  const b = normalizza(corretta);
  if (a === b) return 'corretta';
  // Fallback a sbagliata per non portare dentro levenshtein completo in questa fase
  return 'sbagliata';
}

export function Aperta({ question, savedAnswer, onAnswer }) {
  const [value, setValue] = useState(savedAnswer?.rispostaUtente || '');

  // Reset value when question changes
  useEffect(() => {
    setValue(savedAnswer?.rispostaUtente || '');
  }, [question, savedAnswer]);

  const handleConfirm = () => {
    if (!value.trim()) return;
    const esito = valutaRispostaAperta(value, question.corretta);
    onAnswer({
      domanda: question.domanda,
      rispostaUtente: value,
      rispostaCorretta: question.corretta,
      esito
    });
  };

  return (
    <div className={styles.wrap}>
      <input 
        type="text" 
        className={styles.input} 
        placeholder="Scrivi la tua risposta…" 
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleConfirm()}
      />
      <button 
        className={`btn btn--primary ${styles.btn}`}
        onClick={handleConfirm}
      >
        {savedAnswer ? 'Aggiorna →' : 'Conferma →'}
      </button>
    </div>
  );
}
