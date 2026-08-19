import React, { useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';
import { renderMarkdown } from '../utils/markdown';
import styles from './Study.module.css';

let isMermaidInitialized = false;
function initMermaidTheme() {
  if (!isMermaidInitialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        darkMode: true,
        background: 'transparent',
        primaryColor: '#6c63ff',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#8b5cf6',
        lineColor: '#a78bfa',
        secondaryColor: '#1e2137',
        tertiaryColor: '#0f172a',
        edgeLabelBackground: '#1e1b4b'
      },
      securityLevel: 'loose'
    });
    isMermaidInitialized = true;
  }
}

function getTextNodes(root) {
  const nodes = [];
  function traverse(el) {
    if (!el) return;
    if (el.nodeType === Node.TEXT_NODE) {
      if (el.nodeValue && el.nodeValue.length > 0) {
        nodes.push(el);
      }
      return;
    }
    if (el.nodeType === Node.ELEMENT_NODE) {
      const tag = el.tagName.toLowerCase();
      if (
        tag === 'script' ||
        tag === 'style' ||
        tag === 'svg' ||
        el.classList?.contains('mermaid') ||
        el.classList?.contains('katex-mathml')
      ) {
        return;
      }
      for (let i = 0; i < el.childNodes.length; i++) {
        traverse(el.childNodes[i]);
      }
    }
  }
  traverse(root);
  return nodes;
}

function removeHighlights(container) {
  if (!container) return;
  const marks = container.querySelectorAll('mark.study-search-match');
  marks.forEach(mark => {
    const text = document.createTextNode(mark.textContent || '');
    mark.replaceWith(text);
  });
  container.normalize();
}

function highlightMatches(container, query) {
  removeHighlights(container);
  if (!container || !query || !query.trim()) return [];

  const cleanQuery = query.trim().toLowerCase();
  const textNodes = getTextNodes(container);
  const matches = [];

  for (const node of textNodes) {
    const text = node.nodeValue;
    if (!text) continue;
    const lowerText = text.toLowerCase();
    if (!lowerText.includes(cleanQuery)) continue;

    const parent = node.parentNode;
    if (!parent) continue;

    const fragment = document.createDocumentFragment();
    let lastIdx = 0;
    let idx = lowerText.indexOf(cleanQuery, lastIdx);

    while (idx !== -1) {
      if (idx > lastIdx) {
        fragment.appendChild(document.createTextNode(text.substring(lastIdx, idx)));
      }

      const mark = document.createElement('mark');
      mark.className = 'study-search-match';
      mark.textContent = text.substring(idx, idx + cleanQuery.length);

      fragment.appendChild(mark);
      matches.push(mark);

      lastIdx = idx + cleanQuery.length;
      idx = lowerText.indexOf(cleanQuery, lastIdx);
    }

    if (lastIdx < text.length) {
      fragment.appendChild(document.createTextNode(text.substring(lastIdx)));
    }

    parent.replaceChild(fragment, node);
  }

  return matches;
}

function scrollToMark(mark, viewer) {
  if (!mark) return;

  // Apri eventuali sezioni <details> collassate
  let p = mark.parentElement;
  while (p && p !== document.body) {
    if (p.tagName && p.tagName.toLowerCase() === 'details') {
      p.open = true;
    }
    p = p.parentElement;
  }

  // 1. Scroll nativo con scrollIntoView
  try {
    mark.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  } catch (e) {
    console.warn(e);
  }

  // 2. Scroll esplicito calcolato sul container viewer
  if (viewer) {
    try {
      const viewerRect = viewer.getBoundingClientRect();
      const markRect = mark.getBoundingClientRect();
      const relativeTop = markRect.top - viewerRect.top + viewer.scrollTop;
      const targetTop = relativeTop - (viewer.clientHeight / 2) + (markRect.height / 2);

      viewer.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth'
      });
    } catch (e) {
      console.warn(e);
    }
  }
}

export function Study() {
  const [tree, setTree] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [activeNoteName, setActiveNoteName] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [search, setSearch] = useState('');
  // ponytail: minimal boolean state for loading screen without heavy libraries
  const [isLoading, setIsLoading] = useState(false);

  // In-note search state
  const [isFindOpen, setIsFindOpen] = useState(false);
  const [findQuery, setFindQuery] = useState('');
  const [matchesCount, setMatchesCount] = useState(0);
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);
  
  // PDF export state
  const [exportingPath, setExportingPath] = useState(null);
  const [exportedSuccessPath, setExportedSuccessPath] = useState(null);

  const findQueryRef = useRef('');
  const activeMatchIndexRef = useRef(0);
  const articleRef = useRef(null);
  const viewerRef = useRef(null);
  const findInputRef = useRef(null);
  const sidebarSearchInputRef = useRef(null);

  useEffect(() => {
    if (window.electronAPI?.listNotes) {
      window.electronAPI.listNotes().then(setTree);
    }
  }, []);

  // Update article innerHTML directly to prevent React reconciliation from resetting DOM highlights
  useEffect(() => {
    if (activeNote && articleRef.current && !isLoading) {
      articleRef.current.innerHTML = htmlContent;
      initMermaidTheme();
      try {
        const nodes = articleRef.current.querySelectorAll('.mermaid');
        if (nodes.length > 0) {
          mermaid.run({ nodes }).catch(err => {
            console.warn('Mermaid render warning:', err);
          });
        }
      } catch (err) {
        console.warn('Mermaid execution error:', err);
      }

      if (isFindOpen && findQueryRef.current.trim()) {
        const marks = highlightMatches(articleRef.current, findQueryRef.current);
        setMatchesCount(marks.length);
        activeMatchIndexRef.current = 0;
        setActiveMatchIndex(0);
        if (marks.length > 0) {
          marks[0].classList.add('study-search-active');
          scrollToMark(marks[0], viewerRef.current);
        }
      }
    }
  }, [htmlContent, activeNote, isLoading]);

  // Global keyboard shortcut Ctrl+F / Cmd+F / Esc / F3
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        if (activeNote) {
          setIsFindOpen(true);
          setTimeout(() => {
            findInputRef.current?.focus();
            findInputRef.current?.select();
          }, 30);
        } else {
          sidebarSearchInputRef.current?.focus();
          sidebarSearchInputRef.current?.select();
        }
      } else if (e.key === 'F3' && isFindOpen) {
        e.preventDefault();
        if (e.shiftKey) {
          handlePrevMatch();
        } else {
          handleNextMatch();
        }
      } else if (e.key === 'Escape' && isFindOpen) {
        e.preventDefault();
        closeFind();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeNote, isFindOpen]);

  const loadNote = async (relpath, name) => {
    setActiveNote(relpath);
    setActiveNoteName(name);
    setIsLoading(true);
    // ponytail: setTimeout allows immediate frame paint of loading screen before CPU-heavy parsing
    await new Promise(resolve => setTimeout(resolve, 20));
    if (window.electronAPI?.loadNote) {
      try {
        const md = await window.electronAPI.loadNote(relpath);
        const html = renderMarkdown(md);
        setHtmlContent(html);
      } catch (err) {
        console.error('Failed to load note:', err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const exportNoteToPDF = async (relpath, name) => {
    if (!window.electronAPI?.exportNotePDF) return;
    try {
      setExportingPath(relpath);

      // Always render from the source file to avoid exporting stale DOM content
      const md = await window.electronAPI.loadNote(relpath);
      const htmlToExport = renderMarkdown(md);

      const res = await window.electronAPI.exportNotePDF({
        title: name || 'Appunto',
        htmlContent: htmlToExport
      });

      if (res.success) {
        setExportedSuccessPath(relpath);
        setTimeout(() => setExportedSuccessPath(null), 3000);
      }
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setExportingPath(null);
    }
  };

  const closeFind = () => {
    setIsFindOpen(false);
    setFindQuery('');
    findQueryRef.current = '';
    setMatchesCount(0);
    activeMatchIndexRef.current = 0;
    setActiveMatchIndex(0);
    if (articleRef.current) {
      removeHighlights(articleRef.current);
    }
  };

  const handleNextMatch = () => {
    if (!articleRef.current) return;
    const marks = articleRef.current.querySelectorAll('mark.study-search-match');
    if (marks.length === 0) return;

    const nextIdx = (activeMatchIndexRef.current + 1) % marks.length;
    activeMatchIndexRef.current = nextIdx;
    setActiveMatchIndex(nextIdx);

    marks.forEach((m, idx) => {
      if (idx === nextIdx) {
        m.classList.add('study-search-active');
        scrollToMark(m, viewerRef.current);
      } else {
        m.classList.remove('study-search-active');
      }
    });
  };

  const handlePrevMatch = () => {
    if (!articleRef.current) return;
    const marks = articleRef.current.querySelectorAll('mark.study-search-match');
    if (marks.length === 0) return;

    const prevIdx = (activeMatchIndexRef.current - 1 + marks.length) % marks.length;
    activeMatchIndexRef.current = prevIdx;
    setActiveMatchIndex(prevIdx);

    marks.forEach((m, idx) => {
      if (idx === prevIdx) {
        m.classList.add('study-search-active');
        scrollToMark(m, viewerRef.current);
      } else {
        m.classList.remove('study-search-active');
      }
    });
  };

  const handleFindChange = (val) => {
    setFindQuery(val);
    findQueryRef.current = val;
    if (!articleRef.current) return;
    if (!val.trim()) {
      removeHighlights(articleRef.current);
      setMatchesCount(0);
      activeMatchIndexRef.current = 0;
      setActiveMatchIndex(0);
      return;
    }
    const marks = highlightMatches(articleRef.current, val);
    setMatchesCount(marks.length);
    activeMatchIndexRef.current = 0;
    setActiveMatchIndex(0);
    if (marks.length > 0) {
      marks[0].classList.add('study-search-active');
      scrollToMark(marks[0], viewerRef.current);
    }
  };

  const handleFindKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (e.shiftKey) {
        handlePrevMatch();
      } else {
        handleNextMatch();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeFind();
    }
  };

  // Conta ricorsivamente le note presenti nell'albero
  const countNotes = (nodes) => {
    let count = 0;
    nodes.forEach(node => {
      if (node.type === 'note') count += 1;
      else if (node.children) count += countNotes(node.children);
    });
    return count;
  };

  const totalNotes = countNotes(tree);

  const renderTree = (nodes, depth = 0) => {
    return nodes.map(node => {
      if (node.type === 'section') {
        const hasVisibleChildren = search ? 
          JSON.stringify(node.children).toLowerCase().includes(search) : true;
        
        if (!hasVisibleChildren) return null;

        const sectionNotesCount = countNotes(node.children || []);

        return (
          <details key={node.name} open={search ? true : undefined} className={`${styles.details} ${depth > 0 ? styles.detailsNested : ''}`}>
            <summary className={`${styles.section} ${depth === 0 ? styles.sectionYear : styles.sectionSemester}`}>
              <div className={styles.sectionTitleWrap}>
                <span className={styles.folderIcon}>{depth === 0 ? '📁' : '📂'}</span>
                <span className={styles.sectionLabel}>{node.name}</span>
              </div>
              <span className={styles.sectionBadge}>{sectionNotesCount}</span>
            </summary>
            <ul className={styles.list}>
              {renderTree(node.children || [], depth + 1)}
            </ul>
          </details>
        );
      } else {
        const isMatch = !search || node.name.toLowerCase().includes(search);
        if (!isMatch) return null;

        const isActive = activeNote === node.path;

        return (
          <li key={node.path} className={styles.listItem}>
            <button
              className={`${styles.noteLink} ${isActive ? styles.active : ''} ${depth > 1 ? styles.noteLinkNested : ''}`}
              onClick={() => loadNote(node.path, node.name)}
              title={node.name}
            >
              <span className={styles.noteIcon}>{isActive ? '📘' : '📄'}</span>
              <span className={styles.noteName}>{node.name}</span>
              {isActive && <span className={styles.activeDot} aria-hidden="true" />}
            </button>
          </li>
        );
      }
    });
  };

  const handleArticleClick = (e) => {
    const targetLink = e.target.closest('a');
    if (!targetLink) return;

    const href = targetLink.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const rawTarget = decodeURIComponent(href.slice(1));
      let targetEl = document.getElementById(rawTarget);
      if (!targetEl) {
        const slug = rawTarget.toLowerCase().replace(/[\s\u2013\u2014_\/]+/g, '-').replace(/[^\w-]/g, '').replace(/--+/g, '-').replace(/^-+|-+$/g, '');
        targetEl = document.getElementById(slug);
      }
      if (targetEl && viewerRef.current) {
        const viewer = viewerRef.current;
        const viewerRect = viewer.getBoundingClientRect();
        const elRect = targetEl.getBoundingClientRect();
        const offsetTop = elRect.top - viewerRect.top + viewer.scrollTop;
        viewer.scrollTo({ top: offsetTop - 20, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarHeaderTop}>
            <span className={styles.sidebarTitle}>📚 Dispense & Note</span>
            {totalNotes > 0 && <span className={styles.totalBadge}>{totalNotes} totali</span>}
          </div>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon} aria-hidden="true">🔍</span>
            <input 
              ref={sidebarSearchInputRef}
              type="text" 
              placeholder="Cerca negli appunti... (Ctrl+F)" 
              value={search}
              onChange={e => setSearch(e.target.value.toLowerCase())}
              className={styles.search}
            />
            {search && (
              <button 
                type="button" 
                onClick={() => setSearch('')}
                className={styles.clearSearchBtn}
                title="Cancella ricerca"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className={styles.tree}>
          {tree.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>📂</span>
              <p>Nessun appunto trovato nella cartella <code>Notes/</code></p>
            </div>
          ) : (
            renderTree(tree)
          )}
        </div>
      </aside>
      
      <div className={styles.viewerWrapper}>
        {activeNote && (
          <div className={styles.viewerTopBar}>
            <div className={styles.viewerTopActions}>
              <button
                type="button"
                className={styles.topBarBtn}
                onClick={() => {
                  setIsFindOpen(true);
                  setTimeout(() => {
                    findInputRef.current?.focus();
                    findInputRef.current?.select();
                  }, 30);
                }}
                title="Cerca nel testo (Ctrl+F)"
              >
                🔍 Cerca <kbd className={styles.kbd}>Ctrl+F</kbd>
              </button>
              <button
                type="button"
                className={`${styles.topBarBtn} ${styles.topBarBtnPrimary} ${exportingPath === activeNote ? styles.exporting : ''}`}
                onClick={() => exportNoteToPDF(activeNote, activeNoteName)}
                disabled={exportingPath !== null}
                title="Salva questa dispensa come documento PDF"
              >
                {exportingPath === activeNote ? (
                  <>
                    <span className={styles.btnSpinner} aria-hidden="true" />
                    <span>Esportazione…</span>
                  </>
                ) : exportedSuccessPath === activeNote ? (
                  '✅ PDF Salvato!'
                ) : (
                  '📥 Esporta PDF'
                )}
              </button>
            </div>
          </div>
        )}

        {activeNote && isFindOpen && (
          <div className={styles.findBar}>
            <span className={styles.findIcon} aria-hidden="true">🔍</span>
            <input
              ref={findInputRef}
              type="text"
              className={styles.findInput}
              placeholder="Cerca nella nota..."
              value={findQuery}
              onChange={e => handleFindChange(e.target.value)}
              onKeyDown={handleFindKeyDown}
            />
            {findQuery.trim() && (
              <span className={styles.findCount}>
                {matchesCount === 0 ? '0 risultati' : `${activeMatchIndex + 1}/${matchesCount}`}
              </span>
            )}
            <div className={styles.findActions}>
              <button
                type="button"
                className={styles.findNavBtn}
                onMouseDown={e => e.preventDefault()}
                onClick={(e) => {
                  e.preventDefault();
                  handlePrevMatch();
                }}
                disabled={matchesCount === 0}
                title="Precedente (Shift+Enter / F3)"
              >
                ▲
              </button>
              <button
                type="button"
                className={styles.findNavBtn}
                onMouseDown={e => e.preventDefault()}
                onClick={(e) => {
                  e.preventDefault();
                  handleNextMatch();
                }}
                disabled={matchesCount === 0}
                title="Successivo (Enter / F3)"
              >
                ▼
              </button>
              <button
                type="button"
                className={styles.findCloseBtn}
                onClick={closeFind}
                title="Chiudi (Esc)"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <main className={styles.viewer} ref={viewerRef}>
          {!activeNote ? (
            <div className={styles.viewerEmpty}>
              <span className={styles.viewerEmptyIcon}>📖</span>
              <h2>Nessun appunto aperto</h2>
              <p>Seleziona una materia o capitolo dalla barra laterale per iniziare a studiare.</p>
            </div>
          ) : isLoading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner} />
              <h3 className={styles.loadingTitle}>Caricamento appunto…</h3>
              <p className={styles.loadingSubtitle}>{activeNoteName || 'Elaborazione formule e diagrammi'}</p>
            </div>
          ) : (
            <article 
              ref={articleRef}
              className={`markdown-body ${styles.article}`} 
              onClick={handleArticleClick}
            />
          )}
        </main>
      </div>
    </div>
  );
}
