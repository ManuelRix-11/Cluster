import React, { useEffect, useState } from 'react';
import { renderMarkdown } from '../utils/markdown';
import styles from './Study.module.css';

export function Study() {
  const [tree, setTree] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (window.electronAPI?.listNotes) {
      window.electronAPI.listNotes().then(setTree);
    }
  }, []);

  const loadNote = async (relpath, name) => {
    setActiveNote(relpath);
    if (window.electronAPI?.loadNote) {
      const md = await window.electronAPI.loadNote(relpath);
      setHtmlContent(renderMarkdown(md));
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
          <article 
            className={`markdown-body ${styles.article}`} 
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        )}
      </main>
    </div>
  );
}
