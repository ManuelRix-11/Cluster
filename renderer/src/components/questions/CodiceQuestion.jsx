import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import styles from './CodiceQuestion.module.css';

const STARTER_C = `#include <stdio.h>

int main() {
    
    return 0;
}`;

const STARTER_JAVA = `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
    }
}`;

function normalizzaOutput(s) {
  return (s ?? '').replace(/\r\n/g, '\n').trimEnd();
}

function getFileLanguage(fileName, defaultLang) {
  if (!fileName) return defaultLang;
  if (fileName.endsWith('.java')) return 'java';
  if (fileName.endsWith('.c') || fileName.endsWith('.h')) return 'c';
  return defaultLang;
}

export function CodiceQuestion({ question, savedAnswer, onAnswer }) {
  const isJava = question.tipo === 'java';
  const hasFiles = Array.isArray(question.files) && question.files.length > 0;

  // Stato per file multipli
  const [filesState, setFilesState] = useState(() => {
    if (hasFiles) {
      return savedAnswer?.filesState ?? question.files;
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState(() => {
    if (hasFiles) {
      const files = savedAnswer?.filesState ?? question.files;
      const defaultEditable = files.find(f => !f.readOnly);
      return question.activeFile || defaultEditable?.name || files[0]?.name || 'main.c';
    }
    return null;
  });

  // Stato per file singolo (legacy / standard)
  const defaultStarter = question.starter || (isJava ? STARTER_JAVA : STARTER_C);
  const [singleCode, setSingleCode] = useState(savedAnswer?.codice ?? defaultStarter);

  const [status, setStatus] = useState('idle'); // idle | running
  const [result, setResult] = useState(savedAnswer?.risultato ?? null);

  const currentFile = hasFiles ? (filesState.find(f => f.name === activeTab) || filesState[0]) : null;
  const isReadOnly = Boolean(currentFile?.readOnly);

  const currentCode = hasFiles ? (currentFile?.content || '') : singleCode;
  const currentLang = hasFiles ? getFileLanguage(currentFile?.name, isJava ? 'java' : 'c') : (isJava ? 'java' : 'c');

  const handleCodeChange = (newVal) => {
    const val = newVal || '';
    if (hasFiles) {
      if (isReadOnly) return;
      setFilesState(prev => prev.map(f => f.name === activeTab ? { ...f, content: val } : f));
    } else {
      setSingleCode(val);
    }
  };

  const handleRun = async () => {
    if (hasFiles) {
      const mainFile = filesState.find(f => !f.readOnly) || filesState[0];
      if (!mainFile?.content?.trim()) return;
    } else {
      if (!singleCode.trim()) return;
    }

    setStatus('running');
    setResult(null);

    const testCases = question.test_cases ?? [];
    const results = [];
    let allOk = true;

    try {
      for (const tc of testCases) {
        let res;
        if (isJava) {
          res = await window.electronAPI.compileAndRunJava(singleCode, tc.stdin);
        } else if (hasFiles) {
          res = await window.electronAPI.compileAndRun(filesState, tc.stdin);
        } else {
          res = await window.electronAPI.compileAndRun(singleCode, tc.stdin);
        }

        const ok = res.ok && normalizzaOutput(res.stdout) === normalizzaOutput(tc.expected);
        if (!ok) allOk = false;
        results.push({ stdin: tc.stdin, expected: tc.expected, got: res.stdout, ok, stderr: res.stderr });
      }

      const outcome = { allOk, results };
      setResult(outcome);
      
      const editableFile = hasFiles ? (filesState.find(f => !f.readOnly) || filesState[0]) : null;

      onAnswer({
        domanda: question.domanda,
        rispostaUtente: allOk ? '✅ corretta' : '❌ sbagliata',
        rispostaCorretta: '(compilazione test cases)',
        esito: allOk ? 'corretta' : 'sbagliata',
        codice: hasFiles ? editableFile?.content : singleCode,
        filesState: hasFiles ? filesState : undefined,
        risultato: outcome,
      });

    } catch (err) {
      console.error("Run error", err);
    } finally {
      setStatus('idle');
    }
  };

  const hasGlobalError = result?.results?.find(r => r.stderr);

  return (
    <div className={styles.wrap}>
      <div className={styles.editorWrap}>
        {hasFiles && (
          <div className={styles.tabBar}>
            {filesState.map((f) => {
              const isActive = f.name === activeTab;
              return (
                <button
                  key={f.name}
                  type="button"
                  className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(f.name)}
                >
                  <span>{f.name}</span>
                </button>
              );
            })}
          </div>
        )}

        <Editor
          key={hasFiles ? activeTab : 'single'}
          path={hasFiles ? activeTab : (isJava ? 'Main.java' : 'main.c')}
          height="480px"
          language={currentLang}
          theme="vs-dark"
          value={currentCode}
          onChange={handleCodeChange}
          options={{
            fontSize: 13,
            readOnly: isReadOnly,
            domReadOnly: isReadOnly,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: 'on',
            renderLineHighlight: isReadOnly ? 'none' : 'gutter',
            fontFamily: "'Fira Code', 'Cascadia Code', monospace",
            fontLigatures: true,
            padding: { top: 10, bottom: 10 },
          }}
        />
      </div>

      <button 
        className={`btn btn--primary ${styles.runBtn}`}
        onClick={handleRun}
        disabled={status === 'running'}
      >
        {status === 'running' ? '⏳ Compilazione…' : (savedAnswer ? 'Riesegui →' : '▶ Esegui & Verifica')}
      </button>

      {(result || status === 'running') && (
        <div className={`${styles.output} ${result ? (result.allOk ? styles.success : styles.error) : styles.running}`}>
          {status === 'running' && 'Compilazione in corso…'}
          
          {hasGlobalError && (
            <div className={styles.compileError}>
              Errore di compilazione:
              {'\n'}{hasGlobalError.stderr}
            </div>
          )}

          {!hasGlobalError && result && (
            <div className={styles.grid}>
              {result.results.map((r, i) => (
                <div key={i} className={`${styles.card} ${r.ok ? styles.cardOk : styles.cardFail}`}>
                  <div className={styles.cardHeader}>
                    {r.ok ? `✓ Test ${i + 1} — Corretto` : `✗ Test ${i + 1} — Sbagliato`}
                  </div>
                  <div className={styles.cardBody} style={{ gridTemplateColumns: r.ok ? '1fr 1fr' : '1fr 1fr 1fr' }}>
                    <div className={styles.col}>
                      <div className={styles.colLabel}>Input</div>
                      <div className={styles.colValue}>{r.stdin || <em style={{ opacity: 0.5 }}>vuoto</em>}</div>
                    </div>
                    
                    {!r.ok && (
                      <div className={styles.col}>
                        <div className={styles.colLabel}>Atteso</div>
                        <div className={`${styles.colValue} ${styles.valOk}`}>{r.expected}</div>
                      </div>
                    )}
                    
                    <div className={styles.col}>
                      <div className={styles.colLabel}>Output</div>
                      <div className={`${styles.colValue} ${r.ok ? styles.valOk : styles.valFail}`}>
                        {r.got || <em style={{ opacity: 0.5 }}>nessun output</em>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

