import React, { useEffect, useState } from 'react';
import styles from './UpdateNotification.module.css';

export function UpdateNotification() {
  const [updateState, setUpdateState] = useState({
    visible: false,
    status: 'idle', // 'idle' | 'available' | 'downloading' | 'downloaded' | 'error'
    version: '',
    percent: 0,
    error: null,
  });

  useEffect(() => {
    if (!window.electronAPI?.onUpdaterStatus) return;

    const cleanup = window.electronAPI.onUpdaterStatus((data) => {
      if (!data) return;

      if (data.status === 'available') {
        setUpdateState({
          visible: true,
          status: 'available',
          version: data.version || '',
          percent: 0,
          error: null,
        });
      } else if (data.status === 'downloading') {
        setUpdateState((prev) => ({
          ...prev,
          visible: true,
          status: 'downloading',
          percent: data.percent ?? prev.percent,
        }));
      } else if (data.status === 'downloaded') {
        setUpdateState((prev) => ({
          ...prev,
          visible: true,
          status: 'downloaded',
          version: data.version || prev.version,
        }));
      } else if (data.status === 'error') {
        // Mostra errore solo se era in corso un'operazione visibile
        setUpdateState((prev) => {
          if (prev.visible && prev.status === 'downloading') {
            return { ...prev, status: 'error', error: data.error };
          }
          return prev;
        });
      }
    });

    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  if (!updateState.visible) return null;

  const handleDismiss = () => {
    setUpdateState((prev) => ({ ...prev, visible: false }));
  };

  const handleInstall = () => {
    if (window.electronAPI?.installUpdate) {
      window.electronAPI.installUpdate();
    }
  };

  return (
    <aside className={styles.updateContainer} role="alert" aria-live="polite">
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <span className={styles.icon}>
            {updateState.status === 'downloaded' ? '✨' : updateState.status === 'error' ? '⚠️' : '🚀'}
          </span>
          <span className={styles.title}>
            {updateState.status === 'downloaded' && 'Aggiornamento pronto!'}
            {updateState.status === 'downloading' && 'Download aggiornamento...'}
            {updateState.status === 'available' && 'Nuova versione trovata'}
            {updateState.status === 'error' && 'Errore aggiornamento'}
          </span>
        </div>
        <button
          className={styles.closeBtn}
          onClick={handleDismiss}
          title="Chiudi notifica"
          aria-label="Chiudi notifica"
        >
          ✕
        </button>
      </div>

      <p className={styles.description}>
        {updateState.status === 'downloaded' && (
          <>
            La versione <strong>v{updateState.version}</strong> è stata scaricata. Riavvia Cluster per applicare le modifiche.
          </>
        )}
        {updateState.status === 'downloading' && (
          <>
            Scaricamento delle modifiche in background ({updateState.percent}%)...
          </>
        )}
        {updateState.status === 'available' && (
          <>
            È disponibile la versione <strong>v{updateState.version}</strong>. Il download si avvierà automaticamente.
          </>
        )}
        {updateState.status === 'error' && (
          <>Non è stato possibile completare l'aggiornamento automatico.</>
        )}
      </p>

      {updateState.status === 'downloading' && (
        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{ width: `${Math.min(100, Math.max(0, updateState.percent))}%` }}
          />
        </div>
      )}

      {updateState.status === 'downloaded' && (
        <div className={styles.actions}>
          <button className={styles.btnSecondary} onClick={handleDismiss}>
            Più tardi
          </button>
          <button className={styles.btnPrimary} onClick={handleInstall}>
            Riavvia e aggiorna
          </button>
        </div>
      )}
    </aside>
  );
}
