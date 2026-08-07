import React, { useEffect, useState } from 'react';

export function Esami({ onYearSelect, onStats }) {
  const [years, setYears] = useState([]);

  useEffect(() => {
    // Carica gli anni usando l'IPC
    if (window.electronAPI) {
      window.electronAPI.listQuizzes().then(dirs => {
        setYears(dirs || []);
      });
    } else {
      // Fallback per browser/dev senza electron
      setYears([{ name: 'Primo anno' }, { name: 'Secondo anno' }, { name: 'Terzo anno' }]);
    }
  }, []);

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', flex: 1 }}>
      <div className="screen-body" style={{ flex: 1, paddingBottom: '52px' }}>
        <div className="card card--anni">
          <p style={{ color: 'var(--text-dim)', marginBottom: '16px', fontSize: '1.1rem' }}>
            Seleziona l'anno
          </p>
          <div id="anni-list">
            {years.length === 0 ? (
              <div style={{ color: 'var(--text-dim)' }}>Nessun anno trovato in Quizzes/</div>
            ) : (
              years.map(y => (
                <button 
                  key={y.name} 
                  className="anno-btn" 
                  onClick={() => onYearSelect(y.name)}
                >
                  <span className="anno-nome">{y.name}</span>
                </button>
              ))
            )}
          </div>
          
          <div style={{ marginTop: '24px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <label className="btn btn--ghost btn--sm" style={{cursor:'pointer'}}>
              📂 &nbsp;Carica quiz personalizzato
              <input type="file" accept=".json" hidden onChange={(e) => {
                // TODO implement custom load
              }} />
            </label>
            <button className="btn btn--ghost btn--sm" onClick={onStats}>📊 &nbsp;Storico</button>
          </div>
        </div>
      </div>
    </div>
  );
}
