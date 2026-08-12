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

export function CodiceQuestion({ question, savedAnswer, onAnswer }) {
  const isJava = question.tipo === 'java';
  const defaultStarter = question.starter || (isJava ? STARTER_JAVA : STARTER_C);
  const [code, setCode] = useState(savedAnswer?.codice ?? defaultStarter);
  const [status, setStatus] = useState(savedAnswer ? 'idle' : 'idle'); // idle | running
  const [result, setResult] = useState(savedAnswer?.risultato ?? null);

  const handleRun = async () => {
    if (!code.trim()) return;

    setStatus('running');
    setResult(null);

    const testCases = question.test_cases ?? [];
    const results = [];
    let allOk = true;

    try {
      for (const tc of testCases) {
        const res = isJava
          ? await window.electronAPI.compileAndRunJava(code, tc.stdin)
          : await window.electronAPI.compileAndRun(code, tc.stdin);
        const ok = res.ok && normalizzaOutput(res.stdout) === normalizzaOutput(tc.expected);
        if (!ok) allOk = false;
        results.push({ stdin: tc.stdin, expected: tc.expected, got: res.stdout, ok, stderr: res.stderr });
      }

      const outcome = { allOk, results };
      setResult(outcome);
      
      onAnswer({
        domanda: question.domanda,
        rispostaUtente: allOk ? '✅ corretta' : '❌ sbagliata',
        rispostaCorretta: '(compilazione test cases)',
        esito: allOk ? 'corretta' : 'sbagliata',
        codice: code,
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
        <Editor
          height="300px"
          language={isJava ? 'java' : 'c'}
          theme="vs-dark"
          value={code}
          onChange={(v) => setCode(v || '')}
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: 'on',
            renderLineHighlight: 'gutter',
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
                      <div className={styles.colValue}>{r.stdin}</div>
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
