import React, { useEffect, useState } from 'react';
import styles from './Result.module.css';

export function Result({ questions, answers, quizName, onHome }) {
  const tot = questions.length;
  const nCorrette = answers.filter(r => r?.esito === 'corretta').length;
  const nSimili = answers.filter(r => r?.esito === 'simile').length;
  const nSbagliate = answers.filter(r => r?.esito === 'sbagliata').length;
  const nSaltate = answers.filter(r => r === null).length;

  const nOk = nCorrette + nSimili;
  const puntiGrezzi = nOk * 1 - nSbagliate * 0.25;
  const punteggio30 = Math.max(0, (puntiGrezzi / tot) * 30);
  const pct = Math.round((nOk / tot) * 100);

  let icon, titolo;
  if (pct >= 80) { icon = '🏆'; titolo = 'Ottimo lavoro!'; }
  else if (pct >= 60) { icon = '💪'; titolo = 'Quasi — riprova!'; }
  else if (pct >= 40) { icon = '📖'; titolo = 'Continua a studiare!'; }
  else { icon = '📚'; titolo = "Studia ancora un po'!"; }

  const punteggio30Str = Number.isInteger(punteggio30) ? punteggio30 : punteggio30.toFixed(2);

  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // Save stats
    if (window.electronAPI && quizName) {
      const oggi = new Date().toISOString().slice(0, 10);
      const csvLine = `${oggi},"${quizName}",${tot},${nCorrette},${nSimili},${nSbagliate},${nSaltate},${punteggio30Str},${pct}\n`;
      window.electronAPI.writeStats(csvLine).catch(console.error);
    }
    // Animate bar
    requestAnimationFrame(() => requestAnimationFrame(() => setBarWidth(pct)));
  }, []);

  return (
    <div className={`card ${styles.cardResult}`}>
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        <h1 className={styles.title}>{titolo}</h1>
        
        <div className={styles.scoreWrap}>
          <div className={styles.score}>{punteggio30Str} <span className={styles.scoreTotal}>/ 30</span></div>
          <div className={styles.pct}>
            {[
              `${nCorrette} corrette`,
              nSimili > 0 && `${nSimili} simili`,
              `${nSbagliate} sbagliate`,
              nSaltate > 0 && `${nSaltate} saltate`
            ].filter(Boolean).join(' · ')}
          </div>
        </div>
      </div>

      <div className={styles.barWrap}>
        <div className={styles.barFill} style={{ width: `${barWidth}%` }}></div>
      </div>

      <div className={styles.recap}>
        {answers.map((item, i) => {
          if (!item) {
            return (
              <div key={i} className={`${styles.row} ${styles.saltata}`}>
                <div className={styles.num}>{i + 1}</div>
                <div className={styles.content}>
                  <div className={styles.domanda}>{questions[i].domanda}</div>
                  <div className={styles.risposta}>⏭️ <span className={styles.label}>Non risposta</span></div>
                </div>
              </div>
            );
          }
          
          const isOk = item.esito === 'corretta';
          const isSimile = item.esito === 'simile';
          const icona = isOk ? '✅' : isSimile ? '🟡' : '❌';
          const rowClass = isOk ? styles.corretta : isSimile ? styles.simile : styles.sbagliata;

          return (
            <div key={i} className={`${styles.row} ${rowClass}`}>
              <div className={styles.num}>{i + 1}</div>
              <div className={styles.content}>
                <div className={styles.domanda}>{item.domanda}</div>
                <div className={styles.risposta}>
                  {icona} <span className={styles.label}>La tua risposta:</span> <strong>{item.rispostaUtente}</strong>
                  {!isOk && (
                    <span className={styles.rispostaCorretta}> — Corretta: <strong>{item.rispostaCorretta}</strong></span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.actions}>
        <button className="btn btn--primary" onClick={onHome}>Torna alla Home</button>
      </div>
    </div>
  );
}
