import React, { useEffect, useState, useRef } from 'react';
import { marked } from 'marked';
import mermaid from 'mermaid';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import styles from './Study.module.css';

// Inizializza mermaid con tema scuro integrato al design dell'app
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    darkMode: true,
    background: '#13151c',
    primaryColor: '#6c63ff',
    primaryTextColor: '#f3f4f6',
    primaryBorderColor: '#6c63ff',
    lineColor: '#8b80f9',
    secondaryColor: '#1e2130',
    tertiaryColor: '#181b26'
  },
  securityLevel: 'loose',
  fontFamily: 'Inter, system-ui, sans-serif'
});

// Estensione KaTeX per formule in blocco ($$ ... $$ e \[ ... \])
const blockMath = {
  name: 'blockMath',
  level: 'block',
  start(src) {
    const idxDollar = src.indexOf('$$');
    const idxBracket = src.indexOf('\\[');
    if (idxDollar === -1) return idxBracket;
    if (idxBracket === -1) return idxDollar;
    return Math.min(idxDollar, idxBracket);
  },
  tokenizer(src) {
    const matchDollar = src.match(/^\$\$([\s\S]+?)\$\$/);
    if (matchDollar) {
      return {
        type: 'blockMath',
        raw: matchDollar[0],
        text: matchDollar[1].trim()
      };
    }
    const matchBracket = src.match(/^\\\[([\s\S]+?)\\\]/);
    if (matchBracket) {
      return {
        type: 'blockMath',
        raw: matchBracket[0],
        text: matchBracket[1].trim()
      };
    }
  },
  renderer(token) {
    try {
      return `<div class="katex-display">${katex.renderToString(token.text, { displayMode: true, throwOnError: false })}</div>`;
    } catch (e) {
      return `<div class="katex-display katex-error">${token.raw}</div>`;
    }
  }
};

// Estensione KaTeX per formule inline ($ ... $ e \( ... \))
const inlineMath = {
  name: 'inlineMath',
  level: 'inline',
  start(src) {
    const idxDollar = src.indexOf('$');
    const idxParen = src.indexOf('\\(');
    if (idxDollar === -1) return idxParen;
    if (idxParen === -1) return idxDollar;
    return Math.min(idxDollar, idxParen);
  },
  tokenizer(src) {
    const matchParen = src.match(/^\\\(([\s\S]+?)\\\)/);
    if (matchParen) {
      return {
        type: 'inlineMath',
        raw: matchParen[0],
        text: matchParen[1].trim()
      };
    }
    const matchDollar = src.match(/^\$([^$\n\r]+?)\$/);
    if (matchDollar) {
      return {
        type: 'inlineMath',
        raw: matchDollar[0],
        text: matchDollar[1].trim()
      };
    }
  },
  renderer(token) {
    try {
      return katex.renderToString(token.text, { displayMode: false, throwOnError: false });
    } catch (e) {
      return token.raw;
    }
  }
};

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-');
}

// Configura marked per produrre container dedicati ai grafici mermaid e ID per i titoli
const renderer = {
  code(token) {
    const text = typeof token === 'object' ? token.text : token;
    const lang = typeof token === 'object' ? token.lang : arguments[1];
    if (lang === 'mermaid') {
      return `<div class="mermaid">${text}</div>`;
    }
    return false;
  },
  heading(token) {
    const text = typeof token === 'object' ? token.text : token;
    const depth = typeof token === 'object' ? token.depth : arguments[1];
    const plain = text.replace(/<[^>]+>/g, '');
    const id = slugify(plain);
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  }
};

marked.use({ 
  renderer,
  extensions: [blockMath, inlineMath]
});

export function Study() {
  const [tree, setTree] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [search, setSearch] = useState('');
  const [showFind, setShowFind] = useState(false);
  const [findQuery, setFindQuery] = useState('');
  const [findMatches, setFindMatches] = useState([]);
  const [findIdx, setFindIdx] = useState(0);

  const articleRef = useRef(null);
  const findInputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (window.electronAPI?.listNotes) {
      window.electronAPI.listNotes().then(setTree);
    }
  }, []);

  useEffect(() => {
    if (htmlContent && articleRef.current) {
      const nodes = articleRef.current.querySelectorAll('.mermaid');
      if (nodes.length > 0) {
        mermaid.run({
          nodes: Array.from(nodes)
        }).catch(err => {
          console.warn('Errore rendering diagramma Mermaid:', err);
        });
      }
      if (showFind && findQuery) {
        performSearch(findQuery);
      }
    }
  }, [htmlContent]);

  // Gestione shortcut Ctrl + F / Cmd + F ed Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setShowFind(true);
        setTimeout(() => {
          findInputRef.current?.focus();
          findInputRef.current?.select();
        }, 40);
      } else if (e.key === 'Escape' && showFind) {
        e.preventDefault();
        closeFind();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFind, findMatches, findIdx]);

  // Gestione click sui link interni dell'Indice (TOC) con scroll fluido nel viewer
  const handleArticleClick = (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const rawTarget = decodeURIComponent(href.substring(1));
      let targetEl = articleRef.current?.querySelector(`[id="${CSS.escape(rawTarget)}"]`);
      
      if (!targetEl) {
        // Fallback: cerca titoli che contengono il testo
        const headings = articleRef.current?.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings) {
          const cleanTarget = rawTarget.replace(/^\d+-/, '').replace(/-/g, ' ').toLowerCase();
          for (const h of headings) {
            const hSlug = slugify(h.textContent);
            const hText = h.textContent.toLowerCase();
            if (hSlug === rawTarget || hSlug.includes(rawTarget) || hText.includes(cleanTarget)) {
              targetEl = h;
              break;
            }
          }
        }
      }

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const clearMarks = () => {
    if (!articleRef.current) return;
    const marks = articleRef.current.querySelectorAll('mark.study-find-match');
    marks.forEach(m => {
      const parent = m.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(m.textContent), m);
        parent.normalize();
      }
    });
  };

  const performSearch = (query) => {
    clearMarks();
    if (!articleRef.current || !query || query.trim().length < 2) {
      setFindMatches([]);
      setFindIdx(0);
      return;
    }

    const safeQuery = query.toLowerCase();
    const walker = document.createTreeWalker(
      articleRef.current,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.textContent || !node.textContent.toLowerCase().includes(safeQuery)) {
            return NodeFilter.FILTER_REJECT;
          }
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          // Prestazioni: salta formule KaTeX, diagrammi Mermaid, SVG e script
          if (
            parent.closest('.katex') ||
            parent.closest('.mermaid') ||
            parent.closest('svg') ||
            parent.tagName === 'SCRIPT' ||
            parent.tagName === 'STYLE'
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    const newMatches = [];
    for (const node of textNodes) {
      const text = node.textContent;
      const lower = text.toLowerCase();
      let index = 0;
      let lastIndex = 0;
      const frag = document.createDocumentFragment();

      while ((index = lower.indexOf(safeQuery, lastIndex)) !== -1) {
        if (index > lastIndex) {
          frag.appendChild(document.createTextNode(text.substring(lastIndex, index)));
        }
        const mark = document.createElement('mark');
        mark.className = 'study-find-match';
        mark.textContent = text.substring(index, index + safeQuery.length);
        frag.appendChild(mark);
        newMatches.push(mark);
        lastIndex = index + safeQuery.length;
      }

      if (lastIndex < text.length) {
        frag.appendChild(document.createTextNode(text.substring(lastIndex)));
      }

      if (node.parentNode) {
        node.parentNode.replaceChild(frag, node);
      }
    }

    setFindMatches(newMatches);
    setFindIdx(newMatches.length > 0 ? 0 : 0);
    if (newMatches.length > 0) {
      updateActiveMatch(newMatches, 0);
    }
  };

  const updateActiveMatch = (matchesList, targetIdx) => {
    matchesList.forEach((m, i) => {
      if (i === targetIdx) {
        m.classList.add('study-find-active');
        m.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        m.classList.remove('study-find-active');
      }
    });
  };

  const nextMatch = () => {
    if (findMatches.length === 0) return;
    const next = (findIdx + 1) % findMatches.length;
    setFindIdx(next);
    updateActiveMatch(findMatches, next);
  };

  const prevMatch = () => {
    if (findMatches.length === 0) return;
    const prev = (findIdx - 1 + findMatches.length) % findMatches.length;
    setFindIdx(prev);
    updateActiveMatch(findMatches, prev);
  };

  const closeFind = () => {
    setShowFind(false);
    setFindQuery('');
    setFindMatches([]);
    setFindIdx(0);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    clearMarks();
  };

  const onQueryChange = (val) => {
    setFindQuery(val);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (!val || val.trim().length < 2) {
      clearMarks();
      setFindMatches([]);
      setFindIdx(0);
      return;
    }
    // Debounce a 120ms per digitazione fluida senza blocchi
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(val);
    }, 120);
  };

  const loadNote = async (relpath, name) => {
    setActiveNote(relpath);
    closeFind();
    if (window.electronAPI?.loadNote) {
      const md = await window.electronAPI.loadNote(relpath);
      setHtmlContent(marked(md));
    }
  };

  const renderTree = (nodes) => {
    return nodes.map(node => {
      if (node.type === 'section') {
        const hasVisibleChildren = search ? 
          JSON.stringify(node.children).toLowerCase().includes(search) : true;
        
        if (!hasVisibleChildren) return null;

        return (
          <details key={node.name} open className={styles.details}>
            <summary className={styles.section}>{node.name}</summary>
            <ul className={styles.list}>
              {renderTree(node.children || [])}
            </ul>
          </details>
        );
      } else {
        const isMatch = !search || node.name.toLowerCase().includes(search);
        if (!isMatch) return null;

        return (
          <li key={node.path} className={styles.listItem}>
            <button
              className={`${styles.noteLink} ${activeNote === node.path ? styles.active : ''}`}
              onClick={() => loadNote(node.path, node.name)}
            >
              {node.name}
            </button>
          </li>
        );
      }
    });
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.searchWrap}>
          <input 
            type="text" 
            placeholder="Cerca appunti..." 
            value={search}
            onChange={e => setSearch(e.target.value.toLowerCase())}
            className={styles.search}
          />
        </div>
        <div className={styles.tree}>
          {tree.length === 0 ? (
            <p className={styles.empty}>Nessuna nota trovata in <code>Notes/</code></p>
          ) : (
            renderTree(tree)
          )}
        </div>
      </aside>
      
      <main className={styles.viewer}>
        {!activeNote ? (
          <div className={styles.viewerEmpty}>
            <p>Seleziona un appunto dalla barra laterale per iniziare a studiare.</p>
          </div>
        ) : (
          <>
            {showFind && (
              <div className={styles.findToolbar} role="search" aria-label="Cerca nel documento">
                <input
                  ref={findInputRef}
                  type="text"
                  placeholder="Trova nella pagina..."
                  value={findQuery}
                  onChange={e => onQueryChange(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (e.shiftKey) prevMatch();
                      else nextMatch();
                    } else if (e.key === 'Escape') {
                      e.preventDefault();
                      closeFind();
                    }
                  }}
                  className={styles.findInput}
                />
                <span className={styles.findCounter}>
                  {findQuery ? (findMatches.length > 0 ? `${findIdx + 1} di ${findMatches.length}` : '0 di 0') : ''}
                </span>
                <button 
                  type="button" 
                  title="Precedente (Shift+Enter)" 
                  onClick={prevMatch}
                  disabled={findMatches.length === 0}
                  className={styles.findBtn}
                >
                  ▲
                </button>
                <button 
                  type="button" 
                  title="Successivo (Enter)" 
                  onClick={nextMatch}
                  disabled={findMatches.length === 0}
                  className={styles.findBtn}
                >
                  ▼
                </button>
                <button 
                  type="button" 
                  title="Chiudi (Esc)" 
                  onClick={closeFind}
                  className={styles.findClose}
                >
                  ✕
                </button>
              </div>
            )}
            <article 
              ref={articleRef}
              onClick={handleArticleClick}
              className={`markdown-body ${styles.article}`} 
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
          </>
        )}
      </main>
    </div>
  );
}
