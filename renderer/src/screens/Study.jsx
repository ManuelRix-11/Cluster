import React, { useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';
import { renderMarkdown, slugify } from '../utils/markdown';
import { NoteToolbar } from '../components/study/NoteToolbar';
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

  // Scroll sul container viewer centrando il match
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
  } else {
    try {
      mark.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    } catch (e) {
      console.warn(e);
    }
  }
}

export function Study() {
  const [tree, setTree] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [activeNoteName, setActiveNoteName] = useState('');
  const [rawMarkdown, setRawMarkdown] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [headings, setHeadings] = useState([]);
  const [search, setSearch] = useState('');
  // ponytail: minimal boolean state for loading screen without heavy libraries
  const [isLoading, setIsLoading] = useState(false);

  // Layout & Toolbar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [fontScale, setFontScale] = useState(100);

  // In-note search state
  const [isFindOpen, setIsFindOpen] = useState(false);
  const [findQuery, setFindQuery] = useState('');
  const [matchesCount, setMatchesCount] = useState(0);
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);
  const [findFocusTrigger, setFindFocusTrigger] = useState(0);

  // PDF export state
  const [exportingPath, setExportingPath] = useState(null);
  const [exportedSuccessPath, setExportedSuccessPath] = useState(null);

  const findQueryRef = useRef('');
  const activeMatchIndexRef = useRef(0);
  const articleRef = useRef(null);
  const viewerRef = useRef(null);
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

      // ponytail: Estrai capitoli (h1-h6) per l'indice interattivo (TOC) escludendo MathML duplicato
      try {
        const headingEls = articleRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const extracted = Array.from(headingEls)
          .map(el => ({
            id: el.id,
            text: (el.innerText || el.textContent || '').trim(),
            level: parseInt(el.tagName[1], 10),
            el
          }))
          .filter(h => h.text.length > 0);
        setHeadings(extracted);
      } catch (err) {
        console.warn('Headings extraction error:', err);
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

  // Global keyboard shortcut Ctrl+F / Cmd+F / Esc / F3 / Alt+Z / Ctrl+B
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        if (activeNote) {
          setIsFindOpen(true);
          setFindFocusTrigger(t => t + 1);
        } else {
          sidebarSearchInputRef.current?.focus();
          sidebarSearchInputRef.current?.select();
        }
      } else if ((e.altKey && e.key.toLowerCase() === 'z') || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b')) {
        e.preventDefault();
        setIsSidebarOpen(prev => !prev);
      } else if (e.key === 'F3' && isFindOpen) {
        e.preventDefault();
        if (e.shiftKey) {
          handlePrevMatch();
        } else {
          handleNextMatch();
        }
      } else if (e.key === 'Escape') {
        if (isFindOpen) {
          closeFind();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeNote, isFindOpen]);

  const loadNote = async (relpath, name) => {
    setActiveNote(relpath);
    setActiveNoteName(name);
    setMatchesCount(0);
    setActiveMatchIndex(0);
    activeMatchIndexRef.current = 0;
    setIsLoading(true);
    // ponytail: setTimeout allows immediate frame paint of loading screen before CPU-heavy parsing
    await new Promise(resolve => setTimeout(resolve, 20));
    if (window.electronAPI?.loadNote) {
      try {
        const md = await window.electronAPI.loadNote(relpath);
        setRawMarkdown(md);
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
    if (!window.electronAPI?.exportNotePDF) {
      // Fallback per browser / web preview
      window.print();
      return;
    }
    try {
      setExportingPath(relpath);

      // Always render from the source file to avoid exporting stale DOM content
      const md = await window.electronAPI.loadNote(relpath);
      const htmlToExport = renderMarkdown(md);

      const res = await window.electronAPI.exportNotePDF({
        title: name || 'Appunto',
        htmlContent: htmlToExport
      });

      if (res?.success) {
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

  const handleSelectHeading = (heading) => {
    if (!heading?.el || !viewerRef.current) return;

    // Apri eventuali sezioni <details> antenate
    let p = heading.el.parentElement;
    while (p && p !== document.body) {
      if (p.tagName && p.tagName.toLowerCase() === 'details') {
        p.open = true;
      }
      p = p.parentElement;
    }

    const viewer = viewerRef.current;
    const viewerRect = viewer.getBoundingClientRect();
    const elRect = heading.el.getBoundingClientRect();
    const offsetTop = elRect.top - viewerRect.top + viewer.scrollTop;
    viewer.scrollTo({ top: Math.max(0, offsetTop - 18), behavior: 'smooth' });
  };

  const handleScrollTop = () => {
    viewerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollBottom = () => {
    if (viewerRef.current) {
      viewerRef.current.scrollTo({ top: viewerRef.current.scrollHeight, behavior: 'smooth' });
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
        targetEl = document.getElementById(slugify(rawTarget));
      }
      if (!targetEl) {
        const unaccented = rawTarget.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        targetEl = document.getElementById(slugify(unaccented));
      }
      if (!targetEl && headings.length > 0) {
        const targetSlug = slugify(rawTarget);
        const unaccentedSlug = slugify(rawTarget.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
        const found = headings.find(h => {
          const hSlug = slugify(h.text);
          const hUnaccented = slugify(h.text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
          return (
            h.id === rawTarget ||
            hSlug === targetSlug ||
            hSlug === unaccentedSlug ||
            hUnaccented === targetSlug ||
            hUnaccented === unaccentedSlug ||
            hSlug.startsWith(targetSlug) ||
            targetSlug.startsWith(hSlug) ||
            hUnaccented.startsWith(unaccentedSlug) ||
            unaccentedSlug.startsWith(hUnaccented)
          );
        });
        if (found?.el) {
          targetEl = found.el;
        }
      }
      if (!targetEl && articleRef.current) {
        // Fallback per sezioni di riepilogo o ancore non-heading (es. "> **Sunto: ...**" o elementi strong/dt/summary)
        const targetSlug = slugify(rawTarget);
        const unaccentedSlug = slugify(rawTarget.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
        const candidates = articleRef.current.querySelectorAll('strong, b, summary, dt, h1, h2, h3, h4, h5, h6, blockquote, p');
        for (const el of candidates) {
          const text = (el.innerText || el.textContent || '').trim();
          if (text.length > 2 && text.length < 120) {
            const elSlug = slugify(text);
            const elUnaccented = slugify(text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
            if (
              elSlug === targetSlug ||
              elSlug === unaccentedSlug ||
              elUnaccented === targetSlug ||
              elUnaccented === unaccentedSlug ||
              elSlug.startsWith(targetSlug) ||
              targetSlug.startsWith(elSlug) ||
              elUnaccented.startsWith(unaccentedSlug) ||
              unaccentedSlug.startsWith(elUnaccented)
            ) {
              targetEl = el;
              break;
            }
          }
        }
      }
      if (targetEl && viewerRef.current) {
        let p = targetEl.parentElement;
        while (p && p !== document.body) {
          if (p.tagName && p.tagName.toLowerCase() === 'details') {
            p.open = true;
          }
          p = p.parentElement;
        }
        const viewer = viewerRef.current;
        const viewerRect = viewer.getBoundingClientRect();
        const elRect = targetEl.getBoundingClientRect();
        const offsetTop = elRect.top - viewerRect.top + viewer.scrollTop;
        viewer.scrollTo({ top: Math.max(0, offsetTop - 18), behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* ── Sidebar Dispense & Note ── */}
      <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarHeaderTop}>
            <span className={styles.sidebarTitle}>📚 Dispense & Note</span>
            <button
              type="button"
              className={styles.sidebarFocusBtn}
              onClick={() => setIsSidebarOpen(false)}
              title="Nascondi barra laterale (Modalità Focus)"
              aria-label="Modalità Focus"
            >
              <span className={styles.sidebarFocusIcon}>⇤</span>
              <span className={styles.sidebarFocusText}>Focus</span>
            </button>
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

      {/* ── Visualizzatore Note & Toolbar Avanzata ── */}
      <div className={styles.viewerWrapper}>
        {!isSidebarOpen && !isToolbarOpen && (
          <button
            type="button"
            className={styles.sidebarRestoreBtn}
            onClick={() => setIsSidebarOpen(true)}
            title="Mostra barra laterale (Dispense & Note)"
            aria-label="Mostra barra laterale"
          >
            <span className={styles.sidebarRestoreIcon}>⇥</span>
            <span className={styles.sidebarRestoreText}>Dispense</span>
          </button>
        )}

        {activeNote && (
          <NoteToolbar
            noteTitle={activeNoteName}
            notePath={activeNote}
            rawMarkdown={rawMarkdown}
            headings={headings}
            getPlainText={() => articleRef.current?.innerText || ''}
            onSelectHeading={handleSelectHeading}
            onScrollTop={handleScrollTop}
            onScrollBottom={handleScrollBottom}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
            isExpanded={isToolbarOpen}
            onToggleExpanded={setIsToolbarOpen}
            fontScale={fontScale}
            onChangeFontScale={setFontScale}
            isFindOpen={isFindOpen}
            findQuery={findQuery}
            matchesCount={matchesCount}
            activeMatchIndex={activeMatchIndex}
            findFocusTrigger={findFocusTrigger}
            onOpenFind={() => {
              setIsFindOpen(true);
              setIsToolbarOpen(true);
              setFindFocusTrigger(t => t + 1);
            }}
            onCloseFind={closeFind}
            onFindChange={handleFindChange}
            onPrevMatch={handlePrevMatch}
            onNextMatch={handleNextMatch}
            onExportPDF={() => exportNoteToPDF(activeNote, activeNoteName)}
            isExportingPDF={exportingPath === activeNote}
            isExportPDFSuccess={exportedSuccessPath === activeNote}
          />
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
              style={{ fontSize: `${fontScale}%` }}
              onClick={handleArticleClick}
            />
          )}
        </main>
      </div>
    </div>
  );
}
