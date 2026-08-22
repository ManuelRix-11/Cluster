/**
 * Copyright (c) 2026 Emanuele Ragozzini
 * Cluster - Hub di studio e simulatore d'esami per Informatica Unisa
 * Licensed under the PolyForm Strict License 1.0.0.
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 */

import React, { useState } from 'react';
import { renderMarkdown } from '../../utils/markdown';
import styles from './DPRecurrenceQuestion.module.css';

export function DPRecurrenceQuestion({ question, savedAnswer, onAnswer }) {
  const funcName = question.function_name || 'OPT(i, w)';

  const [baseVal, setBaseVal] = useState(savedAnswer?.baseVal ?? (question.initial_base_val || '0'));
  const [baseCond, setBaseCond] = useState(savedAnswer?.baseCond ?? (question.initial_base_cond || 'i = 0 \\lor w = 0'));
  const [excludeExpr, setExcludeExpr] = useState(savedAnswer?.excludeExpr ?? '');
  const [includeExpr, setIncludeExpr] = useState(savedAnswer?.includeExpr ?? '');
  const [guardCond, setGuardCond] = useState(savedAnswer?.guardCond ?? 'w_i \\le w');
  const [combiner, setCombiner] = useState(savedAnswer?.combiner ?? (question.combiner || '\\max'));

  // Build the live LaTeX piecewise formula
  const liveLatex = `$$
${funcName} = \\begin{cases}
${baseVal.trim() || '?'} & \\text{se } ${baseCond.trim() || '?'} \\\\[6pt]
${excludeExpr.trim() || '?'} & \\text{se } w_i > w \\\\[6pt]
${combiner}\\left( ${excludeExpr.trim() || '?'}, \\; ${includeExpr.trim() || '?'} \\right) & \\text{se } ${guardCond.trim() || 'altrimenti'}
\\end{cases}
$$`;

  const handleConfirm = () => {
    const exp = question.expected_recurrence || {};
    
    // Normalize and check
    const norm = (s) => (s || '').replace(/\s+/g, '').toLowerCase();

    const baseValOk = !exp.baseVal || norm(baseVal) === norm(exp.baseVal);
    const excludeOk = !exp.excludeExpr || norm(excludeExpr) === norm(exp.excludeExpr);
    const includeOk = !exp.includeExpr || norm(includeExpr) === norm(exp.includeExpr);
    const combinerOk = !exp.combiner || norm(combiner) === norm(exp.combiner);

    const isOk = baseValOk && excludeOk && includeOk && combinerOk;
    const isPartial = (baseValOk && excludeOk) || (includeOk && combinerOk);

    onAnswer({
      domanda: question.domanda,
      baseVal,
      baseCond,
      excludeExpr,
      includeExpr,
      guardCond,
      combiner,
      rispostaUtente: `${funcName} = ${combiner}(${excludeExpr}, ${includeExpr}) con base ${baseVal}`,
      rispostaCorretta: question.correct_formula_display || 'Formula ricorsiva corretta',
      esito: isOk ? 'corretta' : isPartial ? 'simile' : 'sbagliata'
    });
  };

  const isFormValid = excludeExpr.trim() && includeExpr.trim();

  return (
    <div className={styles.container}>
      <div className={styles.instructions}>
        <span className={styles.icon}>📐</span>
        <span>
          Formula la relazione di ricorrenza di Programmazione Dinamica compilando i casi base, i rami di scelta (esclusione/inclusione) e l'operatore di ottimizzazione.
        </span>
      </div>

      {/* Formula Display Card */}
      <div className={styles.previewCard}>
        <div 
          className={styles.formulaDisplay}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(liveLatex) }}
        />
      </div>

      <div className={styles.formGrid}>
        {/* Caso Base */}
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>1. Caso Base</div>
          <div className={styles.fieldRow}>
            <label>
              Valore Caso Base:
              <input
                type="text"
                className={styles.input}
                value={baseVal}
                onChange={(e) => setBaseVal(e.target.value)}
                placeholder="Es. 0"
              />
            </label>
            <label>
              Condizione Base:
              <input
                type="text"
                className={styles.input}
                value={baseCond}
                onChange={(e) => setBaseCond(e.target.value)}
                placeholder="Es. i = 0 \lor w = 0"
              />
            </label>
          </div>
        </div>

        {/* Ramo Esclusione */}
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>2. Ramo Esclusione (Oggetto $i$ non selezionato)</div>
          <div className={styles.fieldRow}>
            <label className={styles.fullWidth}>
              Espressione sottoproblema:
              <input
                type="text"
                className={styles.input}
                value={excludeExpr}
                onChange={(e) => setExcludeExpr(e.target.value)}
                placeholder="Es. OPT(i-1, w)"
              />
            </label>
          </div>
        </div>

        {/* Ramo Inclusione */}
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>3. Ramo Inclusione (Oggetto $i$ selezionato)</div>
          <div className={styles.fieldRow}>
            <label className={styles.fullWidth}>
              Espressione con guadagno/costo:
              <input
                type="text"
                className={styles.input}
                value={includeExpr}
                onChange={(e) => setIncludeExpr(e.target.value)}
                placeholder="Es. v_i + OPT(i-1, w - w_i)"
              />
            </label>
          </div>
        </div>

        {/* Operatore di Combinazione */}
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>4. Operatore di Ottimizzazione</div>
          <div className={styles.combinerToggle}>
            <button
              type="button"
              className={`${styles.combBtn} ${combiner === '\\max' ? styles.combActive : ''}`}
              onClick={() => setCombiner('\\max')}
            >
              \\max (Massimizzazione)
            </button>
            <button
              type="button"
              className={`${styles.combBtn} ${combiner === '\\min' ? styles.combActive : ''}`}
              onClick={() => setCombiner('\\min')}
            >
              \\min (Minimizzazione)
            </button>
            <button
              type="button"
              className={`${styles.combBtn} ${combiner === '\\sum' ? styles.combActive : ''}`}
              onClick={() => setCombiner('\\sum')}
            >
              \\sum (Sommatoria / Conteggio)
            </button>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.hint}>
          💡 Usa la notazione standard di Bellman per i sottoproblemi.
        </div>

        <button
          className="btn btn--primary"
          onClick={handleConfirm}
          disabled={!isFormValid}
        >
          {savedAnswer ? 'Aggiorna Ricorrenza ✓' : 'Conferma Ricorrenza ✓'}
        </button>
      </div>
    </div>
  );
}
