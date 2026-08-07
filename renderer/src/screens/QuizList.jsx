import React, { useEffect, useState } from 'react';

export function QuizList({ year, onStartQuiz, onStats }) {
  const [quizzes, setQuizzes] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.listQuizzes(year).then(setQuizzes);
    } else {
      // Dummy data for web dev
      setQuizzes([
        { name: 'Quiz Demo 1', filename: 'demo.json', count: 5, hasLivelli: false },
        { 
          name: 'Quiz Livelli', hasLivelli: true, 
          livelli: [
            { nome: 'Facile', count: 2, filename: 'facile.json' },
            { nome: 'Medio', count: 3, filename: 'medio.json' }
          ]
        }
      ]);
    }
  }, [year]);

  const loadFile = async (filename, quizName) => {
    if (window.electronAPI) {
      const content = await window.electronAPI.loadQuiz(filename);
      onStartQuiz(JSON.parse(content), quizName);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', flex: 1 }}>
      <div className="screen-body" style={{ flex: 1, paddingBottom: '52px' }}>
        <div className="card card--quiz-list">
          <p className="quiz-list-label">Quiz Disponibili per {year}</p>
          
          {quizzes.length === 0 ? (
            <p className="quiz-list-empty">Nessun quiz trovato in <code>Quizzes/{year}</code></p>
          ) : (
            <div id="quiz-list">
              {quizzes.map(q => (
                <div key={q.name} className="quiz-item-group">
                  {!q.hasLivelli ? (
                    <button className="quiz-item" onClick={() => loadFile(q.filename, q.name)}>
                      <span className="quiz-item-name">{q.name}</span>
                      <span className="quiz-item-count">{q.count} domande</span>
                      <span className="quiz-item-arrow">→</span>
                    </button>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className="quiz-list-footer">
            <button id="btn-stats" className="btn btn--ghost" onClick={onStats}>
              📊 Storico Sessioni
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
