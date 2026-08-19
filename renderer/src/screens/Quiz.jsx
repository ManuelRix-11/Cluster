import React, { useState } from 'react';
import { renderMarkdown } from '../utils/markdown';
import styles from './Quiz.module.css';
import { Multipla } from '../components/questions/Multipla';
import { Aperta } from '../components/questions/Aperta';
import { CanvasQuestion } from '../components/questions/CanvasQuestion';
import { CodiceQuestion } from '../components/questions/CodiceQuestion';
import { MatematicaQuestion } from '../components/questions/MatematicaQuestion';
import { DPMatrixQuestion } from '../components/questions/DPMatrixQuestion';
import { GraphTracerQuestion } from '../components/questions/GraphTracerQuestion';
import { DPRecurrenceQuestion } from '../components/questions/DPRecurrenceQuestion';
import { Mermaid } from '../components/common/Mermaid';
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

function isCodeQuestion(d) {
  return d?.tipo === 'codice' || d?.tipo === 'java' || d?.tipo === 'c' || d?.tipo === 'cpp' || d?.tipo === 'python';
}

function isTreeQuestion(q) {
  const tags = (Array.isArray(q.tag) ? q.tag : []).map(t => String(t).toLowerCase());
  const files = (Array.isArray(q.files) ? q.files : []).map(f => f.name.toLowerCase());
  const text = (q.domanda || '').toLowerCase();
  return tags.includes('alberi') || tags.includes('btree') || tags.includes('albero') ||
    files.some(f => f.includes('btree')) || text.includes('btree') || text.includes('albero');
}

function isStackQueueQuestion(q) {
  const tags = (Array.isArray(q.tag) ? q.tag : []).map(t => String(t).toLowerCase());
  const files = (Array.isArray(q.files) ? q.files : []).map(f => f.name.toLowerCase());
  const text = (q.domanda || '').toLowerCase();
  return tags.includes('pile') || tags.includes('code') || tags.includes('stack') || tags.includes('queue') ||
    files.some(f => f.includes('stack') || f.includes('queue')) ||
    text.includes('stack') || text.includes('queue') || text.includes('coda');
}

function isListQuestion(q) {
  const tags = (Array.isArray(q.tag) ? q.tag : []).map(t => String(t).toLowerCase());
  const files = (Array.isArray(q.files) ? q.files : []).map(f => f.name.toLowerCase());
  const text = (q.domanda || '').toLowerCase();
  return tags.includes('liste') || tags.includes('lista') || tags.includes('list') ||
    files.some(f => f.includes('list')) || text.includes('adt list') || text.includes('lista');
}

// ponytail: PSD code exams require exactly 3 exercises: 1 on Binary Trees, 1 on Stacks/Queues, 1 on Lists
function selectPSDCodeQuestions(quizData) {
  const selected = [];
  const used = new Set();

  const lists = shuffle(quizData.filter(isListQuestion));
  const stackQueue = shuffle(quizData.filter(isStackQueueQuestion));
  const trees = shuffle(quizData.filter(isTreeQuestion));

  // 1. Uno sulle liste
  const listQ = lists.find(q => !used.has(q));
  if (listQ) {
    selected.push(listQ);
    used.add(listQ);
  }

  // 2. Uno su stack e/o code
  const sqQ = stackQueue.find(q => !used.has(q));
  if (sqQ) {
    selected.push(sqQ);
    used.add(sqQ);
  }

  // 3. Uno sugli alberi binari
  const treeQ = trees.find(q => !used.has(q));
  if (treeQ) {
    selected.push(treeQ);
    used.add(treeQ);
  }

  // Fallback se necessario
  if (selected.length < 3) {
    const remaining = shuffle(quizData.filter(q => !used.has(q)));
    for (const q of remaining) {
      if (selected.length >= 3) break;
      selected.push(q);
      used.add(q);
    }
  }

  return shuffle(selected);
}

export function Quiz({ quizData, quizName, onFinish }) {
  // Init state only once
  const [questions] = useState(() => {
    const isPSD = 
      /programmazione e strutture dati|\bpsd\b/i.test(quizName || '') ||
      quizData.some(d => Array.isArray(d.tag) && d.tag.some(t => /psd/i.test(t)));

    const isCodeQuiz = quizData.length > 0 && quizData.every(isCodeQuestion);

    if (isCodeQuiz && isPSD) {
      return selectPSDCodeQuestions(quizData);
    }

    if (isCodeQuiz) {
      return shuffle(quizData).slice(0, 5);
    }

    const canvasQs = shuffle(quizData.filter(d => d.tipo === 'canvas'));
    const codeQs = shuffle(quizData.filter(isCodeQuestion));
    const altre = shuffle(quizData.filter(d => d.tipo !== 'canvas' && !isCodeQuestion(d)));
    
    let pool = [];
    if (canvasQs.length > 0) pool.push(...canvasQs.slice(0, 2));
    if (codeQs.length > 0) pool.push(...(isPSD ? selectPSDCodeQuestions(codeQs) : codeQs.slice(0, 5)));
    
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
    <div className={`${styles.quizLayout} ${currentQ.tipo === 'canvas' ? styles.quizLayoutCanvas : ''} ${currentQ.mermaid ? styles.quizLayoutWide : ''}`}>
      {/* Card domanda */}
      <div className={`card ${styles.cardQuiz} ${currentQ.tipo === 'canvas' ? styles.cardQuizCanvas : ''} ${currentQ.mermaid ? styles.cardQuizWide : ''}`}>
        {currentTags.length > 0 && (
          <div className={styles.header}>
            <div className={styles.tags}>
              {currentTags.map(t => <span key={t} className={styles.tag}>#{t}</span>)}
            </div>
          </div>
        )}

        <div className={styles.body}>
          {currentQ.mermaid ? (
            <div className={styles.splitQuestionLayout}>
              <div className={styles.textContent}>
                <div 
                  className={styles.text} 
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(currentQ.domanda || '') }} 
                />
              </div>
              <div className={styles.diagramWrapper}>
                <Mermaid chart={currentQ.mermaid} />
              </div>
            </div>
          ) : (
            <div 
              className={styles.text} 
              dangerouslySetInnerHTML={{ __html: renderMarkdown(currentQ.domanda || '') }} 
            />
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
            ) : (currentQ.tipo === 'dp_matrix' || currentQ.tipo === 'matrice_dp') ? (
              <DPMatrixQuestion key={currentIndex} question={currentQ} savedAnswer={answers[currentIndex]} onAnswer={handleAnswer} />
            ) : (currentQ.tipo === 'graph_tracer' || currentQ.tipo === 'kruskal_tracer' || currentQ.tipo === 'tracer') ? (
              <GraphTracerQuestion key={currentIndex} question={currentQ} savedAnswer={answers[currentIndex]} onAnswer={handleAnswer} />
            ) : (currentQ.tipo === 'dp_recurrence' || currentQ.tipo === 'ricorrenza_dp') ? (
              <DPRecurrenceQuestion key={currentIndex} question={currentQ} savedAnswer={answers[currentIndex]} onAnswer={handleAnswer} />
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
