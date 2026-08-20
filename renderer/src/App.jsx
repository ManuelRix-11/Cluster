import React, { useState } from 'react';
import './styles/global.css';
import { Home } from './screens/Home';
import { Esami } from './screens/Esami';
import { QuizList } from './screens/QuizList';
import { Study } from './screens/Study';
import { Quiz } from './screens/Quiz';
import { Result } from './screens/Result';
import { Stats } from './screens/Stats';
import { AppHeader } from './components/AppHeader';
import { ElectronHUD } from './components/ElectronHUD';
import { UpdateNotification } from './components/UpdateNotification';
import lmLogo from './assets/lm.png';
import lmLogoFull from './assets/lm_full.png';
import assLogo from './assets/ass_logo.png';

// ponytail: Minimum router con stato. Niente React Router.
export default function App() {
  const [screen, setScreen] = useState('home'); // home | esami | quiz-list | quiz | result | stats | study
  const [nav, setNav] = useState({ year: null, quiz: null, mode: null, result: null });

  const goHome = () => {
    setScreen('home');
    setNav({ year: null, quiz: null, mode: null, result: null });
  };

  const goEsami = () => {
    setScreen('esami');
    setNav({ ...nav, quiz: null, result: null });
  };

  const breadcrumbs = [];
  if (screen !== 'home') breadcrumbs.push({ label: 'Home', onClick: goHome });
  if (screen === 'quiz-list' || screen === 'stats' || (screen === 'quiz' && nav.mode === 'esami') || (screen === 'result' && nav.mode === 'esami')) {
    breadcrumbs.push({ label: '🎓 Esami', onClick: goEsami });
  }

  let currentLabel = '';
  if (screen === 'esami') currentLabel = '🎓 Esami';
  else if (screen === 'study') currentLabel = '📖 Appunti';
  else if (screen === 'stats') currentLabel = '📊 Storico';
  else if (screen === 'quiz-list') currentLabel = nav.year;
  else if (screen === 'quiz') currentLabel = nav.quiz?.nome || nav.quiz;
  else if (screen === 'result') currentLabel = 'Risultati: ' + (nav.result?.name || '');

  return (
    <>
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>

      {screen !== 'home' && (
        <AppHeader
          breadcrumbs={breadcrumbs}
          current={currentLabel}
          onHome={goHome}
        />
      )}

      <main className={screen === 'study' ? 'study-main-wrap' : 'screen-body'}>
        {screen === 'home' && (
          <Home
            onNavigate={(dest) => {
              if (dest === 'study') {
                setScreen('study');
                setNav({ year: null, quiz: null, mode: null, result: null });
              } else if (dest === 'esami') {
                goEsami();
              } else {
                setScreen(dest);
              }
            }}
          />
        )}
        {screen === 'esami' && (
          <Esami
            onYearSelect={(y) => {
              setNav({ ...nav, year: y, mode: 'esami' });
              setScreen('quiz-list');
            }}
            onStats={() => setScreen('stats')}
          />
        )}
        {screen === 'quiz-list' && (
          <QuizList
            year={nav.year}
            onStartQuiz={(data, name) => {
              setNav({ ...nav, quiz: { nome: name, data } });
              setScreen('quiz');
            }}
            onStats={() => setScreen('stats')}
          />
        )}
        {screen === 'study' && <Study />}
        {screen === 'stats' && <Stats onNavigate={setScreen} />}
        {screen === 'quiz' && (
          <Quiz
            quizData={nav.quiz?.data || []}
            quizName={nav.quiz?.nome || ''}
            onFinish={(questions, answers, name) => {
              setNav({ ...nav, result: { questions, answers, name } });
              setScreen('result');
            }}
          />
        )}
        {screen === 'result' && (
          <Result
            questions={nav.result?.questions || []}
            answers={nav.result?.answers || []}
            quizName={nav.result?.name || ''}
            onHome={goHome}
          />
        )}
      </main>

      {screen !== 'study' && screen !== 'quiz' && (
        <footer className="app-footer">
          <div className="footer-brand">
            <a
              href="https://emanuele-ragozzini.netlify.app/"
              onClick={(e) => {
                if (window.electronAPI) {
                  e.preventDefault();
                  window.electronAPI.openExternal('https://emanuele-ragozzini.netlify.app/');
                }
              }}
              className="footer-author-link"
              title="Emanuele Ragozzini"
            >
              ER<span className="dot">.</span>
            </a>
            <span className="collab-x" aria-hidden="true">✕</span>

            <div className="footer-collab-wrap">
              <img
                src={lmLogo}
                alt="Libera Mente"
                className="footer-collab-logo"
              />
              <div className="footer-collab-preview" role="tooltip">
                <img src={lmLogoFull} alt="Logo Libera Mente" className="footer-collab-preview-img" />
                <span className="footer-collab-preview-text">In collaborazione con <strong>Libera Mente</strong></span>
              </div>
            </div>

            <span className="collab-x" aria-hidden="true">✕</span>

            <div className="footer-collab-wrap">
              <img
                src={assLogo}
                alt="A.S.S. 1972"
                className="footer-collab-logo footer-collab-logo-round"
              />
              <div className="footer-collab-preview" role="tooltip">
                <img src={assLogo} alt="Logo A.S.S. 1972" className="footer-collab-preview-img footer-collab-preview-img-round" />
                <span className="footer-collab-preview-text">In collaborazione con <strong>A.S.S. 1972</strong></span>
              </div>
            </div>
          </div>
          <div className="footer-copy">Fatto con ❤️ e caffè &middot; &copy; 2026 Emanuele Ragozzini &middot; Tutti i diritti riservati.</div>
        </footer>
      )}

      <ElectronHUD showDragStrip={screen === 'home'} />
      <UpdateNotification />
    </>
  );
}
