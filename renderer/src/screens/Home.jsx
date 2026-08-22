/**
 * Copyright (c) 2026 Emanuele Ragozzini
 * Cluster - Hub di studio e simulatore d'esami per Informatica Unisa
 * Licensed under the PolyForm Strict License 1.0.0.
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 */

import React from 'react';
import logoSrc from '../assets/logoIUE.png';
import studyIcon from '../assets/study.png';
import examsIcon from '../assets/exams.png';

export function Home({ onNavigate, onGoStudy, onGoEsami }) {
  const handleStudy = onGoStudy || (() => onNavigate && onNavigate('study'));
  const handleEsami = onGoEsami || (() => onNavigate && onNavigate('esami'));

  return (
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
        <button className="anno-btn home-nav-btn" onClick={handleStudy}>
          <img src={studyIcon} alt="Appunti" style={{ height: '5rem', marginBottom: '8px', objectFit: 'contain' }} />
          <span className="anno-nome">Appunti</span>
        </button>
        <button className="anno-btn home-nav-btn" onClick={handleEsami}>
          <img src={examsIcon} alt="Esami" style={{ height: '5rem', marginBottom: '8px', objectFit: 'contain' }} />
          <span className="anno-nome">Esami</span>
        </button>
      </div>
    </div>
  );
}
