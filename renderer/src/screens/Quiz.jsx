import React, { useState } from 'react';
import styles from './Quiz.module.css';
import { Multipla } from '../components/questions/Multipla';
import { Aperta } from '../components/questions/Aperta';
import { CanvasQuestion } from '../components/questions/CanvasQuestion';
import { CodiceQuestion } from '../components/questions/CodiceQuestion';
import { MatematicaQuestion } from '../components/questions/MatematicaQuestion';

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
  const progressPct = (answers.filter(Boolean).length / questions.length) * 100;

  const currentTags = currentQ ? (Array.isArray(currentQ.tag) ? currentQ.tag : (currentQ.tag ? [currentQ.tag] : (Array.isArray(currentQ.tags) ? currentQ.tags : []))) : [];

  const handleAnswer = (ans) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = ans;
    setAnswers(newAnswers);
  };

  const next = () => setCurrentIndex(i => Math.min(i + 1, questions.length - 1));
  const prev = () => setCurrentIndex(i => Math.max(i - 1, 0));
  const finish = () => onFinish(questions, answers, quizName);

  if (!currentQ) return <div className="screen-body">Nessuna domanda trovata nel quiz.</div>;

  return (
    <div className={`card ${styles.cardQuiz} ${currentQ.tipo === 'canvas' ? styles.cardQuizCanvas : ''}`}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.meta}>Domanda {currentIndex + 1} / {questions.length}</div>
          {currentTags.length > 0 && (
            <div className={styles.tags}>
              {currentTags.map(t => <span key={t} className={styles.tag}>#{t}</span>)}
            </div>
          )}
        </div>
        <div className={styles.progressWrap}>
          <div className={styles.progressFill} style={{ width: `${progressPct}%` }}></div>
        </div>
      </div>

      <div className={styles.body}>
        {currentQ.tipo !== 'canvas' && (
          <div className={styles.text}>{currentQ.domanda}</div>
        )}
        
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
  );
}
