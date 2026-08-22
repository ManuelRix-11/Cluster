/**
 * Copyright (c) 2026 Emanuele Ragozzini
 * Cluster - Hub di studio e simulatore d'esami per Informatica Unisa
 * Licensed under the PolyForm Strict License 1.0.0.
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 */

import React from 'react';
import { renderMarkdownInline } from '../../utils/markdown';
import styles from './Multipla.module.css';

export function Multipla({ question, savedAnswer, onAnswer }) {
  const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  // Extract risposte (supports both array 'opzioni' and 'risposta1..N' keys)
  const options = Array.isArray(question.opzioni) && question.opzioni.length > 0
    ? question.opzioni
    : [];
  if (options.length === 0) {
    for (let i = 1; i <= 6; i++) {
      const val = question[`risposta${i}`];
      if (val !== undefined) {
        options.push(val);
      }
    }
  }

  const handleSelect = (scelta) => {
    const corretta = question.corretta;
    const ok = scelta.trim().toLowerCase() === corretta.trim().toLowerCase();
    
    onAnswer({
      domanda: question.domanda,
      rispostaUtente: scelta,
      rispostaCorretta: corretta,
      esito: ok ? 'corretta' : 'sbagliata'
    });
  };

  return (
    <>
      {options.map((op, i) => {
        const isSelected = savedAnswer?.rispostaUtente === op;
        return (
          <button 
            key={i} 
            className={`${styles.option} ${isSelected ? styles.selected : ''}`}
            onClick={() => handleSelect(op)}
          >
            <span className={styles.label}>{labels[i] ?? (i + 1)}</span>
            <span 
              className={styles.text} 
              dangerouslySetInnerHTML={{ __html: renderMarkdownInline(op) }} 
            />
          </button>
        );
      })}
    </>
  );
}
