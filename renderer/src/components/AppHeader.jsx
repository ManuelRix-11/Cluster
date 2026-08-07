import React from 'react';
import styles from './AppHeader.module.css';
import logoSrc from '../assets/logoIUE.png';

// ponytail: Minimum viable header con breadcrumb dinamico.
export function AppHeader({ breadcrumbs = [], current = '', onHome }) {
  return (
    <header className={styles.header}>
      <span 
        className={styles.brand} 
        onClick={onHome} 
        title="Home"
        role="button"
        tabIndex={0}
      >
        <img src={logoSrc} alt="" className={styles.logo} /> Cluster
      </span>
      
      {(breadcrumbs.length > 0 || current) && (
        <nav className={styles.breadcrumb} aria-label="Navigazione">
          {breadcrumbs.map((bc, i) => (
            <React.Fragment key={i}>
              <span className={styles.bcItem} onClick={bc.onClick}>
                {bc.label}
              </span>
              <span className={styles.bcSep}>/</span>
            </React.Fragment>
          ))}
          {current && (
            <span className={styles.bcCurrent}>{current}</span>
          )}
        </nav>
      )}
    </header>
  );
}
