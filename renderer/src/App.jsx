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
  else if (screen === 'quiz') currentLabel = nav.quiz?.nome;
  else if (screen === 'result') currentLabel = 'Risultati: ' + nav.quiz?.nome;

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

      <main className={screen === 'study' ? 'study-main' : (screen === 'home' ? '' : 'screen-body')}>
        {screen === 'home' && <Home onNavigate={setScreen} />}
        {screen === 'esami' && <Esami onYearSelect={(y) => { setNav({...nav, year: y, mode: 'esami'}); setScreen('quiz-list'); }} onStats={() => setScreen('stats')} />}
        {screen === 'quiz-list' && <QuizList year={nav.year} onStartQuiz={(data, name) => { setNav({...nav, quiz: {nome: name, data}}); setScreen('quiz'); }} onStats={() => setScreen('stats')} />}
        {screen === 'study' && <Study />}
        {screen === 'stats' && <Stats onNavigate={setScreen} />}
        {screen === 'quiz' && <Quiz quizData={nav.quiz.data} quizName={nav.quiz.nome} onFinish={(questions, answers, name) => {
          setNav({...nav, result: { questions, answers, name }});
          setScreen('result');
        }} />}
        {screen === 'result' && <Result questions={nav.result.questions} answers={nav.result.answers} quizName={nav.result.name} onHome={goHome} />}
      </main>
      
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
            style={{textDecoration: 'none', color: 'inherit'}}
          >
            ER<span className="dot">.</span>
          </a>
        </div>
        <div className="footer-copy">Fatto con ❤️ e caffè &middot; &copy; 2026 Emanuele Ragozzini &middot; Tutti i diritti riservati.</div>
      </footer>
      
      <ElectronHUD showDragStrip={screen === 'home'} />
    </>
  );
}
