/**
 * Copyright (c) 2026 Emanuele Ragozzini
 * Cluster - Hub di studio e simulatore d'esami per Informatica Unisa
 * Licensed under the PolyForm Strict License 1.0.0.
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 */

// ponytail: Dedicated Structural Induction Question Component (checkpoints + step feedback + official proof accordion).
import React, { useState, useEffect } from 'react';
import styles from './InduzioneStrutturaleQuestion.module.css';
import { renderMarkdown, renderMarkdownInline } from '../../utils/markdown';

export function InduzioneStrutturaleQuestion({ question, savedAnswer, onAnswer }) {
  const checkpoints = question.checkpoints || [];
  
  // Initial state from savedAnswer if available
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    return savedAnswer?.checkpointAnswers || new Array(checkpoints.length).fill(null);
  });
  const [isConfirmed, setIsConfirmed] = useState(Boolean(savedAnswer));
  const [showSolution, setShowSolution] = useState(Boolean(savedAnswer));

  useEffect(() => {
    if (savedAnswer) {
      setSelectedAnswers(savedAnswer.checkpointAnswers || new Array(checkpoints.length).fill(null));
      setIsConfirmed(true);
    } else {
      setSelectedAnswers(new Array(checkpoints.length).fill(null));
      setIsConfirmed(false);
      setShowSolution(false);
    }
  }, [question, savedAnswer]);

  const handleSelectOption = (stepIdx, opt) => {
    if (isConfirmed) return; // Locked after confirming
    const next = [...selectedAnswers];
    next[stepIdx] = opt;
    setSelectedAnswers(next);
  };

  const handleConfirm = () => {
    // Count correct steps
    let correctCount = 0;
    checkpoints.forEach((cp, idx) => {
      if (selectedAnswers[idx] === cp.corretta) {
        correctCount++;
      }
    });

    const tot = Math.max(1, checkpoints.length);
    const pct = Math.round((correctCount / tot) * 100);
    const esito = pct >= 80 ? 'corretta' : pct >= 50 ? 'simile' : 'sbagliata';

    setIsConfirmed(true);
    setShowSolution(true);

    onAnswer({
      domanda: question.domanda,
      rispostaUtente: `Induzione Strutturale: ${correctCount}/${tot} passaggi corretti (${pct}%)`,
      rispostaCorretta: `${tot}/${tot} passaggi corretti`,
      esito,
      checkpointAnswers: selectedAnswers,
      correctCount,
      totalCheckpoints: tot
    });
  };

  const allAnswered = checkpoints.length > 0 && selectedAnswers.every(ans => ans !== null && ans !== undefined);

  return (
    <div className={styles.container}>
      <div className={styles.instructionCard}>
        <span>
          📝 <strong>Induzione Strutturale & Dimostrazione</strong>:{' '}
          {question.istruzioni || 'Imposta la dimostrazione formale sul tuo foglio, quindi seleziona i checkpoint per verificare ciascun passaggio (Definizione ricorsiva, Passo base, Ipotesi e Passo induttivo).'}
        </span>
      </div>

      <div className={styles.checkpointsList}>
        {checkpoints.map((cp, stepIdx) => {
          const userChoice = selectedAnswers[stepIdx];
          const isCorrect = userChoice === cp.corretta;

          return (
            <div key={stepIdx} className={styles.checkpointItem}>
              <div className={styles.checkpointHeader}>
                <span className={styles.checkpointTitle}>{cp.titolo || `Passo ${stepIdx + 1}`}</span>
                {isConfirmed && userChoice && (
                  <span className={`${styles.badgeResult} ${isCorrect ? styles.badgeOk : styles.badgeFail}`}>
                    {isCorrect ? '✓ Corretto' : '✗ Errato'}
                  </span>
                )}
              </div>

              {cp.domanda && (
                <div
                  className={styles.checkpointQuestion}
                  dangerouslySetInnerHTML={{ __html: renderMarkdownInline(cp.domanda) }}
                />
              )}

              <div className={styles.optionsGrid}>
                {cp.opzioni?.map((opt, optIdx) => {
                  const label = String.fromCharCode(65 + optIdx); // A, B, C, D
                  const isSelected = userChoice === opt;
                  let optStyle = styles.optionBtn;

                  if (isSelected) optStyle += ` ${styles.optionSelected}`;
                  if (isConfirmed) {
                    if (opt === cp.corretta) {
                      optStyle += ` ${styles.optionCorrect}`;
                    } else if (isSelected && !isCorrect) {
                      optStyle += ` ${styles.optionWrong}`;
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      className={optStyle}
                      onClick={() => handleSelectOption(stepIdx, opt)}
                      disabled={isConfirmed}
                    >
                      <span className={styles.optLabel}>{label}.</span>
                      <span
                        className={styles.optText}
                        dangerouslySetInnerHTML={{ __html: renderMarkdownInline(opt) }}
                      />
                    </button>
                  );
                })}
              </div>

              {isConfirmed && cp.spiegazione && (
                <div
                  className={styles.explanationBox}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(cp.spiegazione) }}
                />
              )}
            </div>
          );
        })}
      </div>

      {!isConfirmed && (
        <div className={styles.actionsBar}>
          <button
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={!allAnswered}
          >
            Verifica Dimostrazione
          </button>
        </div>
      )}

      {isConfirmed && question.svolgimento_completo && (
        <div className={styles.solutionAccordion}>
          <div
            className={styles.solutionHeader}
            onClick={() => setShowSolution(prev => !prev)}
          >
            <span>📖 Dimostrazione Formale Ufficiale</span>
            <span>{showSolution ? '▲ Chiudi' : '▼ Mostra Svolgimento'}</span>
          </div>

          {showSolution && (
            <div
              className={styles.solutionBody}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(question.svolgimento_completo) }}
            />
          )}
        </div>
      )}
    </div>
  );
}
