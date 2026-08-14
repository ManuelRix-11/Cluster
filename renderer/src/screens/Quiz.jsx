import React, { useState } from 'react';
import styles from './Quiz.module.css';
import { Multipla } from '../components/questions/Multipla';
import { Aperta } from '../components/questions/Aperta';
import { CanvasQuestion } from '../components/questions/CanvasQuestion';
import { CodiceQuestion } from '../components/questions/CodiceQuestion';
import { MatematicaQuestion } from '../components/questions/MatematicaQuestion';
import { getTags } from '../utils/tags';

// ponytail: Minimum Viable Quiz. Shuffle basic arrays, track answers, no unrequested abstractions.
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function Quiz({ quizData, quizName, onFinish }) {
  // Init state only once
  const [questions] = useState(() => {
    const canvasQs = shuffle(quizData.filter(d => d.tipo === 'canvas'));
    const altre = shuffle(quizData.filter(d => d.tipo !== 'canvas'));
    
    let pool = [];
    if (canvasQs.length > 0) pool.push(...canvasQs.slice(0, 2));
    
    const remainingSlots = 30 - pool.length; // max 30 as in original
    if (remainingSlots > 0) pool.push(...altre.slice(0, remainingSlots));
    
    return shuffle(pool);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));

  const currentQ = questions[currentIndex];
  const currentTags = getTags(currentQ);

  const handleAnswer = (ans) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = ans;
    setAnswers(newAnswers);
  };

  const next = () => setCurrentIndex(i => Math.min(i + 1, questions.length - 1));
  const prev = () => setCurrentIndex(i => Math.max(i - 1, 0));
  const finish = () => onFinish(questions, answers, quizName);

  const answeredCount = answers.filter(Boolean).length;

  if (!currentQ) return <div className="screen-body">Nessuna domanda trovata nel quiz.</div>;

  return (
    <div className={`${styles.quizLayout} ${currentQ.tipo === 'canvas' ? styles.quizLayoutCanvas : ''}`}>
      {/* Card domanda */}
      <div className={`card ${styles.cardQuiz} ${currentQ.tipo === 'canvas' ? styles.cardQuizCanvas : ''}`}>
        {currentTags.length > 0 && (
          <div className={styles.header}>
            <div className={styles.tags}>
              {currentTags.map(t => <span key={t} className={styles.tag}>#{t}</span>)}
            </div>
          </div>
        )}

        <div className={styles.body}>
          <div className={styles.text}>{currentQ.domanda}</div>
          
          {currentQ.immagine && window.electronAPI && (
            <img 
              src={`quiz-local:///images/${encodeURIComponent(quizName.split(' · ')[0])}/${encodeURIComponent(currentQ.immagine)}`} 
              alt="Domanda" 
              className={styles.image} 
            />
          )}

          <div className={styles.answers}>
            {currentQ.tipo === 'canvas' ? (
              <CanvasQuestion key={currentIndex} question={currentQ} savedAnswer={answers[currentIndex]} onAnswer={handleAnswer} />
            ) : (currentQ.tipo === 'codice' || currentQ.tipo === 'java') ? (
              <CodiceQuestion key={currentIndex} question={currentQ} savedAnswer={answers[currentIndex]} onAnswer={handleAnswer} />
            ) : currentQ.tipo === 'matematica' ? (
              <MatematicaQuestion key={currentIndex} question={currentQ} savedAnswer={answers[currentIndex]} onAnswer={handleAnswer} />
            ) : currentQ.risposta1 !== undefined ? (
              <Multipla key={currentIndex} question={currentQ} savedAnswer={answers[currentIndex]} onAnswer={handleAnswer} />
            ) : (
              <Aperta key={currentIndex} question={currentQ} savedAnswer={answers[currentIndex]} onAnswer={handleAnswer} />
            )}
          </div>
        </div>

        <div className={styles.nav}>
          <button className="btn btn--ghost" onClick={prev} disabled={currentIndex === 0}>← Precedente</button>
          {currentIndex === questions.length - 1 ? (
            <button className="btn btn--primary" onClick={finish}>Consegna Quiz ✨</button>
          ) : (
            <button className="btn btn--ghost" onClick={next}>Successiva →</button>
          )}
        </div>
      </div>

      {/* Sidebar con lista domande (a destra) */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span className={styles.sidebarTitle}>Domande</span>
          <span className={styles.sidebarCount}>{answeredCount}/{questions.length}</span>
        </div>

        <div className={styles.qGrid}>
          {questions.map((_, idx) => {
            const isAnswered = answers[idx] !== null && answers[idx] !== undefined;
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={idx}
                type="button"
                className={`${styles.qItem} ${isCurrent ? styles.qItemCurrent : ''} ${isAnswered ? styles.qItemAnswered : ''}`}
                onClick={() => setCurrentIndex(idx)}
                title={`Vai alla domanda ${idx + 1}${isAnswered ? ' (Risposta)' : ''}`}
              >
                <span className={styles.qNum}>{idx + 1}</span>
                <span className={`${styles.qBar} ${isAnswered ? styles.qBarAnswered : ''}`} />
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
