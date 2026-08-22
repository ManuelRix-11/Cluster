/**
 * Copyright (c) 2026 Emanuele Ragozzini
 * Cluster - Hub di studio e simulatore d'esami per Informatica Unisa
 * Licensed under the PolyForm Strict License 1.0.0.
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 */

import React, { useState } from 'react';
import { Mermaid } from '../common/Mermaid';
import styles from './GraphTracerQuestion.module.css';

function generateMermaidFromEdges(edges) {
  if (!edges || edges.length === 0) return null;
  let chart = 'graph LR\n';
  edges.forEach(e => {
    const name = e.name || e;
    const match = String(name).match(/\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)/);
    if (match) {
      const u = match[1];
      const v = match[2];
      const wMatch = (e.label || '').match(/peso\s*(\d+)/i) || (name.match(/peso\s*(\d+)/i));
      const w = e.weight ?? (wMatch ? wMatch[1] : '');
      if (w) {
        chart += `    ${u}((${u})) ---|${w}| ${v}((${v}))\n`;
      } else {
        chart += `    ${u}((${u})) --- ${v}((${v}))\n`;
      }
    }
  });
  return chart;
}

export function GraphTracerQuestion({ question, savedAnswer, onAnswer }) {
  const availableEdges = question.available_edges || [];
  const expectedSteps = question.expected_steps || [];
  const totalStepsExpected = expectedSteps.length;

  const mermaidChart = question.mermaid || question.grafo_mermaid || generateMermaidFromEdges(availableEdges);

  const [steps, setSteps] = useState(() => {
    if (savedAnswer?.userSteps) return savedAnswer.userSteps;
    return Array.from({ length: totalStepsExpected }, () => ({
      edge: '',
      action: 'ACCETTA' // ACCETTA | SCARTA
    }));
  });

  const [totalCost, setTotalCost] = useState(savedAnswer?.userCost ?? '');

  const handleStepChange = (index, field, value) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  const handleConfirm = () => {
    let correctStepsCount = 0;

    steps.forEach((st, i) => {
      const exp = expectedSteps[i];
      if (exp) {
        const edgeMatch = String(st.edge).trim().toLowerCase() === String(exp.edge).trim().toLowerCase();
        const actionMatch = String(st.action).trim().toUpperCase() === String(exp.action).trim().toUpperCase();
        if (edgeMatch && actionMatch) {
          correctStepsCount++;
        }
      }
    });

    const costMatch = String(totalCost).trim() === String(question.expected_total_cost).trim();
    const stepsAccuracy = totalStepsExpected > 0 ? correctStepsCount / totalStepsExpected : 1;
    const isOk = stepsAccuracy === 1 && costMatch;
    const isPartial = stepsAccuracy >= 0.6 || costMatch;

    onAnswer({
      domanda: question.domanda,
      userSteps: steps,
      userCost: totalCost,
      rispostaUtente: `Passi corretti: ${correctStepsCount}/${totalStepsExpected}, Costo totale: ${totalCost}`,
      rispostaCorretta: `Costo totale: ${question.expected_total_cost}`,
      esito: isOk ? 'corretta' : isPartial ? 'simile' : 'sbagliata'
    });
  };

  const filledSteps = steps.filter(s => s.edge !== '').length;

  return (
    <div className={styles.container}>
      <div className={styles.instructions}>
        <span className={styles.icon}>🌲</span>
        <span>
          Esegui l'algoritmo passo per passo: seleziona l'arco esaminato in ciascun passaggio, scegli se viene <strong>ACCETTATO</strong> o <strong>SCARTATO</strong> (perché forma un ciclo), e inserisci il costo totale finale.
        </span>
      </div>

      <div className={styles.tracerTableWrapper}>
        <table className={styles.tracerTable}>
          <thead>
            <tr>
              <th className={styles.stepNumCol}>Passo</th>
              <th>Arco Esaminato</th>
              <th>Azione</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((st, idx) => (
              <tr key={idx}>
                <td className={styles.stepNumCol}>#{idx + 1}</td>
                <td>
                  <select
                    className={styles.select}
                    value={st.edge}
                    onChange={(e) => handleStepChange(idx, 'edge', e.target.value)}
                  >
                    <option value="">-- Seleziona Arco --</option>
                    {availableEdges.map((e, ei) => (
                      <option key={ei} value={e.name || e}>
                        {e.label || e.name || e}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className={styles.actionToggle}>
                    <button
                      type="button"
                      className={`${styles.actionBtn} ${styles.actionAccept} ${st.action === 'ACCETTA' ? styles.actionActiveAccept : ''}`}
                      onClick={() => handleStepChange(idx, 'action', 'ACCETTA')}
                    >
                      ✓ Accetta
                    </button>
                    <button
                      type="button"
                      className={`${styles.actionBtn} ${styles.actionReject} ${st.action === 'SCARTA' ? styles.actionActiveReject : ''}`}
                      onClick={() => handleStepChange(idx, 'action', 'SCARTA')}
                    >
                      ✕ Scarta (ciclo)
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.costRow}>
        <label className={styles.costLabel}>
          Costo Totale Finale:
          <input
            type="text"
            inputMode="numeric"
            className={styles.costInput}
            value={totalCost}
            onChange={(e) => setTotalCost(e.target.value)}
            placeholder="Es. 15"
          />
        </label>
      </div>

      <div className={styles.footer}>
        <div className={styles.progress}>
          Passi configurati: <strong>{filledSteps} / {totalStepsExpected}</strong>
        </div>

        <button
          className="btn btn--primary"
          onClick={handleConfirm}
          disabled={filledSteps === 0 || !totalCost.trim()}
        >
          {savedAnswer ? 'Aggiorna Tracciamento ✓' : 'Conferma Tracciamento ✓'}
        </button>
      </div>
    </div>
  );
}
