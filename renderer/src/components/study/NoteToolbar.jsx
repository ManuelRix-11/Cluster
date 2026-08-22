/**
 * Copyright (c) 2026 Emanuele Ragozzini
 * Cluster - Hub di studio e simulatore d'esami per Informatica Unisa
 * Licensed under the PolyForm Strict License 1.0.0.
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 */

import React, { useState, useRef, useEffect, useMemo } from 'react';
import styles from './NoteToolbar.module.css';

// ponytail: Native clipboard helper with robust fallback for unfocused window
export async function copyToClipboard(text) {
  if (!text) return false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('navigator.clipboard failed, attempting textarea fallback:', err);
  }
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  } catch (err) {
    console.warn('execCommand copy fallback failed:', err);
    return false;
  }
}

/**
 * Responsive Note Toolbar for Study Viewer
 * Adheres to Ponytail FULL: Native browser APIs, zero extra packages, modular CSS.
 */
export function NoteToolbar({
  noteTitle = '',
  notePath = '',
  rawMarkdown = '',
  headings = [],
  getPlainText = null,
  onSelectHeading,
  onScrollTop,
  onScrollBottom,
  isSidebarOpen = true,
  onToggleSidebar,
  fontScale = 100,
  onChangeFontScale,
  isFindOpen = false,
  findQuery = '',
  matchesCount = 0,
  activeMatchIndex = 0,
  findFocusTrigger = 0,
  onOpenFind,
  onCloseFind,
  onFindChange,
  onPrevMatch,
  onNextMatch,
  onExportPDF,
  isExportingPDF = false,
  isExportPDFSuccess = false,
  onOpenKatexModal,
  isExpanded: isExpandedProp,
  onToggleExpanded
}) {
  // ponytail: Barra collassabile di default (pulsante in alto a destra)
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = isExpandedProp !== undefined ? isExpandedProp : internalExpanded;
  const setExpanded = (val) => {
    if (typeof onToggleExpanded === 'function') onToggleExpanded(val);
    else setInternalExpanded(val);
  };

  const [isTocOpen, setIsTocOpen] = useState(false);
  const [tocFilter, setTocFilter] = useState('');
  const [isCopyMenuOpen, setIsCopyMenuOpen] = useState(false);
  const [copiedState, setCopiedState] = useState(null); // 'md' | 'text' | null

  const tocRef = useRef(null);
  const copyMenuRef = useRef(null);
  const findInputRef = useRef(null);

  // Auto-espandi se viene aperta la ricerca (es. da Ctrl+F)
  useEffect(() => {
    if (isFindOpen) {
      setExpanded(true);
    }
  }, [isFindOpen]);

  // ponytail: calcolo statistiche di lettura (parole e minuti) senza parser pesanti
  const { wordCount, readingMins } = useMemo(() => {
    if (!rawMarkdown) return { wordCount: 0, readingMins: 1 };
    // Rimuovi blocchi di codice e link per una stima accurata del testo di lettura
    const textOnly = rawMarkdown
      .replace(/```[\s\S]*?```/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '');
    const words = textOnly.trim().split(/\s+/).filter(Boolean).length;
    const mins = Math.max(1, Math.ceil(words / 200));
    return { wordCount: words, readingMins: mins };
  }, [rawMarkdown]);

  // Filtro capitoli TOC
  const filteredHeadings = useMemo(() => {
    if (!tocFilter.trim()) return headings;
    const q = tocFilter.toLowerCase();
    return headings.filter(h => h.text.toLowerCase().includes(q));
  }, [headings, tocFilter]);

  // Chiudi popover al click esterno o su tasto Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tocRef.current && !tocRef.current.contains(e.target)) {
        setIsTocOpen(false);
      }
      if (copyMenuRef.current && !copyMenuRef.current.contains(e.target)) {
        setIsCopyMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isTocOpen) setIsTocOpen(false);
        if (isCopyMenuOpen) setIsCopyMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTocOpen, isCopyMenuOpen]);

  // Autofocus e selezione su input cerca all'apertura o su scorciatoia Ctrl+F
  useEffect(() => {
    if (isFindOpen && findInputRef.current) {
      findInputRef.current.focus();
      findInputRef.current.select();
    }
  }, [isFindOpen, findFocusTrigger]);

  // ponytail: Copia sorgente Markdown negli appunti via helper robusto
  const handleCopyMarkdown = async () => {
    if (!rawMarkdown) return;
    const ok = await copyToClipboard(rawMarkdown);
    if (ok) {
      setCopiedState('md');
      setIsCopyMenuOpen(false);
      setTimeout(() => setCopiedState(null), 2000);
    }
  };

  // ponytail: Estrai testo pulito e copia
  const handleCopyPlainText = async () => {
    let cleanText = '';
    if (typeof getPlainText === 'function') {
      try {
        cleanText = getPlainText() || '';
      } catch { }
    }
    if (!cleanText && rawMarkdown) {
      cleanText = rawMarkdown
        .replace(/^>[ \t]*\[![A-Z]+\][ \t]*/gmi, '')
        .replace(/^>[ \t]*/gm, '')
        .replace(/^#+\s+/gm, '')
        .replace(/(\*\*|__)(.*?)\1/g, '$2')
        .replace(/(\*|_)(.*?)\1/g, '$2')
        .replace(/`{1,3}([\s\S]*?)`{1,3}/g, '$1')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .replace(/\${1,2}([\s\S]*?)\${1,2}/g, '$1')
        .replace(/\|[^\n]+\|/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    }
    if (!cleanText) return;
    const ok = await copyToClipboard(cleanText);
    if (ok) {
      setCopiedState('text');
      setIsCopyMenuOpen(false);
      setTimeout(() => setCopiedState(null), 2000);
    }
  };

  // ponytail: Download file .md con Blob e createObjectURL senza backend aggiuntivo
  const handleDownloadMarkdown = () => {
    if (!rawMarkdown) return;
    try {
      const blob = new Blob([rawMarkdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const safeName = (noteTitle || 'Appunto').replace(/[\\/:*?"<>|]/g, '_');
      link.href = url;
      link.download = `${safeName}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.warn('Download markdown failed:', err);
    }
  };

  const handleKeyDownFind = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (e.shiftKey) {
        onPrevMatch();
      } else {
        onNextMatch();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onCloseFind();
    }
  };

  if (!isExpanded) {
    return (
      <div className={styles.collapsedTriggerWrap}>
        <button
          type="button"
          className={styles.expandTriggerBtn}
          onClick={() => setExpanded(true)}
          title="Mostra barra strumenti (Indice, Ricerca, Dimensione testo, Copia, PDF)"
          aria-label="Mostra barra strumenti"
        >
          <span className={styles.expandTriggerIcon}>🛠️</span>
          <span className={styles.expandTriggerLabel}>Strumenti</span>
        </button>
      </div>
    );
  }

  return (
    <header className={styles.toolbar} role="toolbar" aria-label="Strumenti appunto">
      {/* ── Gruppo Sinistro: Navigazione & Layout ── */}
      <div className={styles.groupLeft}>
        {/* Se la barra laterale è chiusa, mostra il pulsante per riaprirla direttamente nella toolbar senza sovrapposizioni */}
        {!isSidebarOpen && (
          <>
            <button
              type="button"
              className={styles.toolBtn}
              onClick={onToggleSidebar}
              title="Mostra barra laterale (Dispense & Note)"
              aria-label="Mostra barra laterale"
            >
              <span className={styles.btnIcon}>⇥</span>
              <span className={styles.btnLabel}>Dispense</span>
            </button>
            <div className={styles.divider} />
          </>
        )}

        {/* Indice dei Contenuti (TOC) Popover */}
        <div className={styles.relativeWrap} ref={tocRef}>
          <button
            type="button"
            className={`${styles.toolBtn} ${isTocOpen ? styles.toolBtnActive : ''}`}
            onClick={() => {
              setIsTocOpen(prev => !prev);
              setTocFilter('');
            }}
            title="Indice dei capitoli e sezioni"
            aria-expanded={isTocOpen}
            aria-haspopup="true"
          >
            <span className={styles.btnIcon}>📑</span>
            <span className={styles.btnLabel}>Indice</span>
            {headings.length > 0 && (
              <span className={styles.badgeCount}>{headings.length}</span>
            )}
          </button>

          {isTocOpen && (
            <div className={styles.popoverMenu} role="menu">
              <div className={styles.popoverHeader}>
                <span className={styles.popoverTitle}>📑 Indice dei Capitoli</span>
                <span className={styles.popoverBadge}>{headings.length} sezioni</span>
              </div>

              <div className={styles.popoverSearchBox}>
                <input
                  type="text"
                  className={styles.popoverSearchInput}
                  placeholder="Filtra capitoli..."
                  value={tocFilter}
                  onChange={e => setTocFilter(e.target.value)}
                  autoFocus
                />
                {tocFilter && (
                  <button
                    type="button"
                    className={styles.popoverClearBtn}
                    onClick={() => setTocFilter('')}
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className={styles.tocList}>
                {filteredHeadings.length === 0 ? (
                  <div className={styles.popoverEmpty}>
                    {headings.length === 0 ? 'Nessun capitolo trovato nella nota' : 'Nessuna sezione corrispondente'}
                  </div>
                ) : (
                  filteredHeadings.map((h, i) => (
                    <button
                      key={`${h.id || h.text}-${i}`}
                      type="button"
                      className={`${styles.tocItem} ${styles[`tocLevel${Math.min(h.level, 6)}`] || styles.tocLevel4}`}
                      onClick={() => {
                        onSelectHeading(h);
                        setIsTocOpen(false);
                      }}
                      title={h.text}
                    >
                      <span className={styles.tocBullet}>
                        {h.level === 1 ? '◆' : h.level === 2 ? '▸' : h.level === 3 ? '•' : h.level === 4 ? '–' : '·'}
                      </span>
                      <span className={styles.tocText}>{h.text}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.divider} />

        {/* Font Scaling Controls */}
        <div className={styles.fontControls} title="Dimensione testo di lettura">
          <button
            type="button"
            className={styles.fontBtn}
            onClick={() => onChangeFontScale && onChangeFontScale(Math.max(80, fontScale - 10))}
            disabled={fontScale <= 80}
            title="Rimpicciolisci testo (A-)"
          >
            A-
          </button>
          <span
            className={styles.fontScaleLabel}
            onClick={() => onChangeFontScale && onChangeFontScale(100)}
            title="Clicca per ripristinare 100%"
          >
            {fontScale}%
          </span>
          <button
            type="button"
            className={styles.fontBtn}
            onClick={() => onChangeFontScale && onChangeFontScale(Math.min(140, fontScale + 10))}
            disabled={fontScale >= 140}
            title="Ingrandisci testo (A+)"
          >
            A+
          </button>
        </div>
      </div>

      {/* ── Gruppo Centrale: Ricerca nel Testo ── */}
      <div className={styles.groupCenter}>
        {isFindOpen ? (
          <div className={styles.inlineFindBox}>
            <span className={styles.findIcon} aria-hidden="true">🔍</span>
            <input
              ref={findInputRef}
              type="text"
              className={styles.inlineFindInput}
              placeholder="Cerca nella nota..."
              value={findQuery}
              onChange={e => onFindChange(e.target.value)}
              onKeyDown={handleKeyDownFind}
            />
            {findQuery.trim() && (
              <span className={styles.inlineFindCount}>
                {matchesCount === 0 ? '0/0' : `${activeMatchIndex + 1}/${matchesCount}`}
              </span>
            )}
            <div className={styles.inlineFindActions}>
              <button
                type="button"
                className={styles.findActionBtn}
                onMouseDown={e => e.preventDefault()}
                onClick={onPrevMatch}
                disabled={matchesCount === 0}
                title="Precedente (Shift+Enter / F3)"
              >
                ▲
              </button>
              <button
                type="button"
                className={styles.findActionBtn}
                onMouseDown={e => e.preventDefault()}
                onClick={onNextMatch}
                disabled={matchesCount === 0}
                title="Successivo (Enter / F3)"
              >
                ▼
              </button>
              <button
                type="button"
                className={styles.findCloseBtn}
                onClick={onCloseFind}
                title="Chiudi ricerca (Esc)"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className={styles.toolBtn}
            onClick={onOpenFind}
            title="Cerca nel testo della dispensa (Ctrl+F)"
          >
            <span className={styles.btnIcon}>🔍</span>
            <span className={styles.btnLabel}>Cerca</span>
            <kbd className={styles.kbd}>Ctrl+F</kbd>
          </button>
        )}
      </div>

      {/* ── Gruppo Destro: Utility, KaTeX, Copia & Export ── */}
      <div className={styles.groupRight}>

        {/* Menu Copia (Markdown / Testo) */}
        <div className={styles.relativeWrap} ref={copyMenuRef}>
          <button
            type="button"
            className={`${styles.toolBtn} ${copiedState ? styles.copiedSuccess : ''}`}
            onClick={() => setIsCopyMenuOpen(prev => !prev)}
            title="Copia negli appunti"
            aria-expanded={isCopyMenuOpen}
          >
            <span className={styles.btnIcon}>
              {copiedState ? '✅' : '📋'}
            </span>
            <span className={styles.btnLabel}>
              {copiedState === 'md'
                ? 'MD Copiato!'
                : copiedState === 'text'
                  ? 'Testo Copiato!'
                  : 'Copia'}
            </span>
            <span className={styles.arrowSmall}>▾</span>
          </button>

          {isCopyMenuOpen && (
            <div className={styles.dropdownMenu} role="menu">
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={handleCopyMarkdown}
              >
                <span className={styles.dropdownIcon}>📝</span>
                <div className={styles.dropdownTextWrap}>
                  <span className={styles.dropdownItemTitle}>Copia Markdown</span>
                  <span className={styles.dropdownItemDesc}>Sorgente con sintassi e formule</span>
                </div>
              </button>
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={handleCopyPlainText}
              >
                <span className={styles.dropdownIcon}>📄</span>
                <div className={styles.dropdownTextWrap}>
                  <span className={styles.dropdownItemTitle}>Copia Testo Semplice</span>
                  <span className={styles.dropdownItemDesc}>Testo pulito senza marcatori</span>
                </div>
              </button>
              <div className={styles.dropdownDivider} />
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  handleDownloadMarkdown();
                  setIsCopyMenuOpen(false);
                }}
              >
                <span className={styles.dropdownIcon}>💾</span>
                <div className={styles.dropdownTextWrap}>
                  <span className={styles.dropdownItemTitle}>Salva file .md</span>
                  <span className={styles.dropdownItemDesc}>Scarica file markdown locale</span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Esportazione PDF */}
        <button
          type="button"
          className={`${styles.toolBtn} ${styles.exportPdfBtn} ${isExportingPDF ? styles.exporting : ''}`}
          onClick={onExportPDF}
          disabled={isExportingPDF}
          title="Esporta e salva la dispensa in formato PDF A4 stampabile"
        >
          {isExportingPDF ? (
            <>
              <span className={styles.btnSpinner} aria-hidden="true" />
              <span className={styles.btnLabel}>Esportazione…</span>
            </>
          ) : isExportPDFSuccess ? (
            <>
              <span className={styles.btnIcon}>✅</span>
              <span className={styles.btnLabel}>PDF Salvato!</span>
            </>
          ) : (
            <>
              <span className={styles.btnIcon}>📥</span>
              <span className={styles.btnLabel}>PDF</span>
            </>
          )}
        </button>

        <div className={styles.divider} />

        {/* Toggle per ricollassare la barra */}
        <button
          type="button"
          className={`${styles.toolBtn} ${styles.collapseBtn}`}
          onClick={() => {
            setExpanded(false);
            if (isTocOpen) setIsTocOpen(false);
            if (isCopyMenuOpen) setIsCopyMenuOpen(false);
          }}
          title="Comprimi barra strumenti"
          aria-label="Comprimi barra strumenti"
        >
          <span className={styles.btnIcon}>✕</span>
          <span className={styles.btnLabel}>Chiudi</span>
        </button>
      </div>
    </header>
  );
}
