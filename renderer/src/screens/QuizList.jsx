/**
 * Copyright (c) 2026 Emanuele Ragozzini
 * Cluster - Hub di studio e simulatore d'esami per Informatica Unisa
 * Licensed under the PolyForm Strict License 1.0.0.
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 */

import React, { useEffect, useState } from 'react';

// ponytail: Minimum Viable Quiz List with Standalone (e.g. Inglese) and Semester Grouping.
function normalizeQuizData(res, year) {
  if (!res) return { standalone: [], semestri: [] };

  // Formato 1: Oggetto { standalone: [...], semestri: [...] }
  if (res.semestri && Array.isArray(res.semestri)) {
    return {
      standalone: Array.isArray(res.standalone) ? res.standalone : [],
      semestri: res.semestri
    };
  }

  // Formato 2: Array di semestri [ { semestre: "...", quizzes: [...] } ]
  if (Array.isArray(res) && res.length > 0 && res[0].semestre) {
    return {
      standalone: [],
      semestri: res
    };
  }

  // Formato 3: Fallback per versioni con cartelle semester in flat array
  if (Array.isArray(res)) {
    const standalone = [];
    const semestri = [];

    res.forEach(item => {
      if (/semestre/i.test(item.name) && item.hasLivelli && Array.isArray(item.livelli)) {
        semestri.push({
          semestre: item.name,
          quizzes: item.livelli.map(lv => ({
            name: lv.nome,
            filename: lv.filename,
            count: lv.count,
            hasLivelli: false
          }))
        });
      } else {
        standalone.push(item);
      }
    });

    return { standalone, semestri };
  }

  return { standalone: [], semestri: [] };
}

export function QuizList({ year, onStartQuiz, onStats }) {
  const [data, setData] = useState({ standalone: [], semestri: [] });
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.listQuizzes(year).then(res => {
        setData(normalizeQuizData(res, year));
      });
    } else {
      // Dummy data for web dev
      setData({
        standalone: [
          { name: 'Inglese', filename: 'inglese.json', count: 129, hasLivelli: false }
        ],
        semestri: [
          {
            semestre: 'Primo semestre',
            quizzes: [
              { name: 'ADE', filename: 'demo.json', count: 218, hasLivelli: false },
              { name: 'MD', filename: 'md.json', count: 0, hasLivelli: false },
              { 
                name: 'P1', hasLivelli: true, 
                livelli: [
                  { nome: 'Facile', count: 15, filename: 'facile.json' },
                  { nome: 'Medio', count: 16, filename: 'medio.json' },
                  { nome: 'Difficile', count: 26, filename: 'difficile.json' }
                ]
              }
            ]
          },
          {
            semestre: 'Secondo semestre',
            quizzes: [
              { name: 'ANALISI', filename: 'analisi.json', count: 10, hasLivelli: false },
              { name: 'MMI', filename: 'mmi.json', count: 0, hasLivelli: false },
              { 
                name: 'PSD', hasLivelli: true, 
                livelli: [
                  { nome: 'codice', count: 0, filename: 'psd_c.json' },
                  { nome: 'teoria', count: 83, filename: 'psd_t.json' }
                ]
              }
            ]
          }
        ]
      });
    }
  }, [year]);

  const loadFile = async (filename, quizName) => {
    if (window.electronAPI) {
      const content = await window.electronAPI.loadQuiz(filename);
      onStartQuiz(JSON.parse(content), quizName);
    }
  };

  const renderQuizItem = (q) => {
    if (!q.hasLivelli) {
      return (
        <button key={q.name} className="quiz-item" onClick={() => loadFile(q.filename, q.name)}>
          <span className="quiz-item-name">{q.name}</span>
          <span className="quiz-item-count">{q.count} domande</span>
          <span className="quiz-item-arrow">→</span>
        </button>
      );
    }

    return (
      <div key={q.name} className="quiz-item-group">
        <button 
          className={`quiz-item ${openAccordion === q.name ? 'quiz-item--open' : ''}`}
          onClick={() => setOpenAccordion(openAccordion === q.name ? null : q.name)}
        >
          <span className="quiz-item-name">{q.name}</span>
          <span className="livelli-badge">Livelli</span>
          <span className={`quiz-item-arrow quiz-item-arrow--toggle ${openAccordion === q.name ? 'open' : ''}`}>▾</span>
        </button>
        {openAccordion === q.name && (
          <div className="livelli-panel livelli-panel--open">
            {q.livelli.map(lv => {
              const lvlName = lv.nome.toLowerCase();
              const lvlClass = lvlName === 'facile' ? 'livello--facile' : 
                               lvlName === 'medio' ? 'livello--medio' : 
                               lvlName === 'difficile' ? 'livello--difficile' : '';
              return (
                <button 
                  key={lv.nome}
                  className={`livello-btn ${lvlClass}`}
                  disabled={lv.count === 0}
                  onClick={() => loadFile(lv.filename, `${q.name} · ${lv.nome}`)}
                >
                  <span className="livello-nome">{lv.nome}</span>
                  <span className="livello-count">{lv.count} domande</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const totalQuizzes = data.standalone.length + data.semestri.reduce((acc, s) => acc + (s.quizzes?.length || 0), 0);

  return (
    <div className="card card--quiz-list">
      {totalQuizzes === 0 ? (
        <p className="quiz-list-empty">Nessun quiz trovato in <code>Quizzes/{year}</code></p>
      ) : (
        <div id="quiz-list">
          {/* Quiz Standalone (es. Inglese) in alto senza intestazione */}
          {data.standalone.length > 0 && (
            <div className="standalone-quiz-section" style={{ marginBottom: '16px' }}>
              {data.standalone.map(q => renderQuizItem(q))}
            </div>
          )}

          {/* Quiz divisi per semestre */}
          {data.semestri.map((sem, sIdx) => {
            const semQuizzes = sem.quizzes || [];
            const semLabel = sem.semestre.toLowerCase().startsWith('primo') || sem.semestre.toLowerCase().startsWith('secondo')
              ? `Quiz disponibili per il ${sem.semestre.toLowerCase()}`
              : `Quiz disponibili per ${sem.semestre}`;

            return (
              <div 
                key={sem.semestre} 
                className={`semester-section ${sIdx > 0 || data.standalone.length > 0 ? 'semester-section--next' : ''}`}
              >
                <p className="quiz-list-label">{semLabel}</p>
                {semQuizzes.length === 0 ? (
                  <p className="quiz-list-empty-inline">Nessun quiz disponibile</p>
                ) : (
                  semQuizzes.map(q => renderQuizItem(q))
                )}
              </div>
            );
          })}
        </div>
      )}
      
      <div className="quiz-list-footer">
        <button id="btn-stats" className="btn btn--ghost" onClick={onStats}>
          📊 Storico Sessioni
        </button>
      </div>
    </div>
  );
}
