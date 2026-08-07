import React from 'react';
import logoSrc from '../assets/logoIUE.png';

export function Home({ onNavigate }) {
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', flex: 1 }}>
      <div className="screen-body" style={{ flex: 1, paddingBottom: '52px' }}>
        <div className="card card--anni">
          <div className="logo">
            <img src={logoSrc} alt="Cluster Logo" className="logo-img" style={{ height: '128px', width: 'auto' }} />
          </div>
          <div className="title-wrapper">
            <h1 className="home-title">
              <span className="brand-gradient">Cluster</span>
              <span className="title-dot">.</span>
            </h1>
            <div className="title-glow" aria-hidden="true" />
          </div>
          <p className="home-tagline">Hub di studio & simulatore d'esami · Informatica UNISA</p>

          <div id="anni-list">
            <button className="anno-btn" onClick={() => onNavigate('study')}>
              <span style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📖</span>
              <span className="anno-nome">Appunti</span>
            </button>
            <button className="anno-btn" onClick={() => onNavigate('esami')}>
              <span style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎓</span>
              <span className="anno-nome">Esami</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
