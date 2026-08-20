import React, { useState, useEffect } from 'react';
import { renderMarkdownInline } from '../../utils/markdown';
import styles from './DPMatrixQuestion.module.css';

export function DPMatrixQuestion({ question, savedAnswer, onAnswer }) {
  const rowLabels = question.row_labels || [];
  const colLabels = question.col_labels || [];
  const numRows = rowLabels.length;
  const numCols = colLabels.length;

  const getInitialState = () => {
    if (savedAnswer?.userGrid) return savedAnswer.userGrid;
    if (question.initial_grid) {
      return question.initial_grid.map(row => row.map(cell => (cell !== null && cell !== undefined ? String(cell) : '')));
    }
    return Array.from({ length: numRows }, () => Array(numCols).fill(''));
  };

  const [grid, setGrid] = useState(getInitialState);
  const [highlighted, setHighlighted] = useState(savedAnswer?.highlightedPath || []);
  const [isLocked, setIsLocked] = useState(false);

  // Check which cells are initially fixed / locked by the question definition
  const isCellFixed = (r, c) => {
    if (!question.initial_grid) return false;
    const val = question.initial_grid[r]?.[c];
    return val !== null && val !== undefined && val !== '';
  };

  const handleCellChange = (r, c, val) => {
    if (isCellFixed(r, c)) return;
    const newGrid = grid.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? val : cell))
    );
    setGrid(newGrid);
  };

  const handleCellClick = (r, c) => {
    if (!question.require_backtracking) return;
    const key = `${r},${c}`;
    setHighlighted(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleConfirm = () => {
    const expected = question.expected_matrix;
    if (!expected) return;

    let correctCount = 0;
    let totalToFill = 0;

    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        if (!isCellFixed(r, c)) {
          totalToFill++;
          const userVal = String(grid[r]?.[c] ?? '').trim();
          const expVal = String(expected[r]?.[c] ?? '').trim();
          if (userVal === expVal) {
            correctCount++;
          }
        }
      }
    }

    const accuracy = totalToFill > 0 ? correctCount / totalToFill : 1;
    const isOk = accuracy === 1;
    const isPartial = accuracy >= 0.6 && !isOk;

    setIsLocked(true);

    onAnswer({
      domanda: question.domanda,
      userGrid: grid,
      highlightedPath: highlighted,
      rispostaUtente: `Compilate ${correctCount}/${totalToFill} celle corrette (${Math.round(accuracy * 100)}%)`,
      rispostaCorretta: 'Tabella di Programmazione Dinamica completa',
      esito: isOk ? 'corretta' : isPartial ? 'simile' : 'sbagliata'
    });
  };

  // Count filled editable cells
  let filledCount = 0;
  let editableCount = 0;
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (!isCellFixed(r, c)) {
        editableCount++;
        if (grid[r]?.[c] !== '') filledCount++;
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.instructions}>
        <span className={styles.icon}>📊</span>
        <span>
          Compila i valori numerici della tabella di Programmazione Dinamica nelle celle modificabili.
          {question.require_backtracking && ' Fai clic sulle celle per evidenziare il cammino di backtracking ottimale.'}
        </span>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.matrixTable}>
          <thead>
            <tr>
              <th className={styles.cornerCell}>i \ j</th>
              {colLabels.map((colHeader, c) => (
                <th key={c} className={styles.colHeader}>
                  <div className={styles.headerIdx}>{c}</div>
                  <div 
                    className={styles.headerLabel}
                    dangerouslySetInnerHTML={{ __html: renderMarkdownInline(colHeader) }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowLabels.map((rowHeader, r) => (
              <tr key={r}>
                <th className={styles.rowHeader}>
                  <span className={styles.headerIdx}>{r}</span>
                  <span 
                    className={styles.headerLabel}
                    dangerouslySetInnerHTML={{ __html: renderMarkdownInline(rowHeader) }}
                  />
                </th>
                {colLabels.map((_, c) => {
                  const fixed = isCellFixed(r, c);
                  const isHighlighted = highlighted.includes(`${r},${c}`);
                  const val = grid[r]?.[c] ?? '';

                  return (
                    <td
                      key={c}
                      className={`${styles.cell} ${fixed ? styles.fixedCell : ''} ${isHighlighted ? styles.highlightedCell : ''}`}
                      onClick={() => handleCellClick(r, c)}
                    >
                      {fixed ? (
                        <span className={styles.fixedValue}>{val}</span>
                      ) : (
                        <input
                          type="text"
                          inputMode="numeric"
                          className={styles.cellInput}
                          value={val}
                          onChange={(e) => handleCellChange(r, c, e.target.value)}
                          placeholder="-"
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <div className={styles.progress}>
          Celle compilate: <strong>{filledCount} / {editableCount}</strong>
        </div>

        <button 
          className="btn btn--primary" 
          onClick={handleConfirm}
          disabled={filledCount === 0}
        >
          {savedAnswer ? 'Aggiorna Tabella ✓' : 'Conferma Tabella ✓'}
        </button>
      </div>
    </div>
  );
}
