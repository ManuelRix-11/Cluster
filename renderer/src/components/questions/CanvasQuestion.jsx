import React, { useEffect, useRef } from 'react';
import styles from './CanvasQuestion.module.css';
import '../../styles/canvas-quiz.css'; // global canvas css
import { CanvasQuiz } from '../../utils/canvas-quiz.js';

export function CanvasQuestion({ question, savedAnswer, onAnswer }) {
  const mountRef = useRef(null);
  const quizInst = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Cleanup previous if strict mode double fires
    if (quizInst.current) {
      quizInst.current.destroy();
    }

    quizInst.current = new CanvasQuiz(
        mountRef.current, 
        question, 
        (details) => {
          const pct = details.pct;
          const esito = pct >= 80 ? 'corretta' : pct >= 50 ? 'simile' : 'sbagliata';
          onAnswer({
            domanda: question.domanda,
            rispostaUtente: `Canvas: ${details.correctCount}/${details.maxScore} conn. corrette${details.extraCount > 0 ? `, ${details.extraCount} superflue` : ''}`,
            rispostaCorretta: `${details.maxScore}/${details.maxScore} connessioni corrette`,
            esito,
            pctCanvas: pct,
            userConns: details.userConns
          });
        }, 
        savedAnswer?.userConns
      );

    return () => {
      if (quizInst.current) {
        quizInst.current.destroy();
        quizInst.current = null;
      }
    };
  }, [question, savedAnswer]); // re-run if question changes (rare in a single instance)

  return (
    <div className={styles.wrap} ref={mountRef}>
    </div>
  );
}
