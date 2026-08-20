// ponytail: Hybrid Function Study Question component (checkpoints + solution reveal + SVG plot). Zero bloat.
import React, { useState, useEffect } from 'react';
import styles from './StudioFunzioneQuestion.module.css';
import { renderMarkdown, renderMarkdownInline } from '../../utils/markdown';
import { FunctionPlotSVG } from '../common/FunctionPlotSVG';

export function StudioFunzioneQuestion({ question, savedAnswer, onAnswer }) {
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
      rispostaUtente: `Studio: ${correctCount}/${tot} passaggi corretti (${pct}%)`,
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
        <span>📝 <strong>Studio di Funzione</strong>: Svolgi i passaggi sul tuo foglio di calcolo, quindi seleziona i checkpoint per verificare ciascun passaggio analitico e visualizzare il grafico finale.</span>
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
                      type="button"
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

      {/* Confirmation bar */}
      {!isConfirmed && (
        <div className={styles.actionsBar}>
          <button
            className="btn btn--primary"
            onClick={handleConfirm}
            disabled={!allAnswered}
          >
            Verifica Studio di Funzione →
          </button>
        </div>
      )}

      {/* Revealed Solution & Plot */}
      {isConfirmed && (
        <div className={styles.solutionAccordion}>
          <div
            className={styles.solutionHeader}
            onClick={() => setShowSolution(!showSolution)}
          >
            <span>📊 Grafico della Funzione e Svolgimento Ufficiale</span>
            <span>{showSolution ? '▲ Chiudi' : '▼ Mostra'}</span>
          </div>

          {showSolution && (
            <div className={styles.solutionBody}>
              {question.plot && (
                <FunctionPlotSVG plot={question.plot} />
              )}

              {question.svolgimento_completo && (
                <div
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(question.svolgimento_completo) }}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
