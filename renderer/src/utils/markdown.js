/**
 * Copyright (c) 2026 Emanuele Ragozzini
 * Cluster - Hub di studio e simulatore d'esami per Informatica Unisa
 * Licensed under the PolyForm Strict License 1.0.0.
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 */

import { marked } from 'marked';
import katex from 'katex';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

let activeMathTokens = [];

export function slugify(text) {
  let s = String(text);
  if (activeMathTokens && activeMathTokens.length > 0) {
    s = s.replace(/%%%KATEX_(?:INLINE|BLOCK)_(\d+)%%%/g, (_, idx) => {
      const item = activeMathTokens[parseInt(idx, 10)];
      return item ? item.math : '';
    });
  }
  return s
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, '')
    .replace(/[\s\u2013\u2014_\/]+/g, '-')
    .replace(/[^\w\u00C0-\u017F-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const renderer = new marked.Renderer();

renderer.heading = function({ tokens, depth, raw }) {
  const text = this.parser.parseInline(tokens);
  const id = slugify(raw);
  return `<h${depth} id="${id}">${text}</h${depth}>\n`;
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

renderer.code = function({ text, lang }) {
  const cleanLang = (lang || '').trim().toLowerCase();
  
  if (cleanLang === 'mermaid') {
    return `<div class="mermaid">${text.trim()}</div>\n`;
  }

  const validLang = (cleanLang && cleanLang !== 'text' && cleanLang !== 'plaintext' && cleanLang !== 'ascii' && hljs.getLanguage(cleanLang)) ? cleanLang : null;
  
  if (validLang) {
    const highlighted = hljs.highlight(text, { language: validLang }).value;
    return `<pre><code class="hljs language-${validLang}">${highlighted}</code></pre>\n`;
  }
  
  // Per diagrammi ASCII, schemi testuali o blocchi senza linguaggio: nessun auto-highlighting scorretto
  return `<pre><code class="plaintext">${escapeHtml(text)}</code></pre>\n`;
};

marked.use({ renderer });

function processAlertCallouts(srcText) {
  const icons = {
    NOTE: 'ℹ️',
    TIP: '💡',
    IMPORTANT: '📌',
    WARNING: '⚠️',
    CAUTION: '🛑'
  };
  const defaultTitles = {
    NOTE: 'Nota',
    TIP: 'Suggerimento',
    IMPORTANT: 'Importante',
    WARNING: 'Attenzione',
    CAUTION: 'Cautela'
  };

  const lines = srcText.split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Detect the first line of an alert callout: "> [!TYPE]"
    const startMatch = line.match(/^>[ ]*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ ]*(.*)/i);
    if (startMatch) {
      const type = startMatch[1].toUpperCase();
      const firstLineText = startMatch[2].trim();
      i++;

      // Collect all consecutive "> ..." lines as the body
      const bodyLines = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        bodyLines.push(lines[i].replace(/^>[ ]?/, ''));
        i++;
      }

      const title = firstLineText || defaultTitles[type];
      const bodyMarkdown = bodyLines.join('\n');
      const parsedBody = marked.parse(bodyMarkdown);

      out.push(`<div class="callout callout-${type.toLowerCase()}">
  <div class="callout-header">
    <span class="callout-icon">${icons[type]}</span>
    <span class="callout-title">${title}</span>
  </div>
  <div class="callout-body">
    ${parsedBody}
  </div>
</div>`);
    } else {
      out.push(line);
      i++;
    }
  }

  return out.join('\n');
}

/**
 * Render Markdown and KaTeX math ($...$ inline and $$...$$ block)
 */
export function renderMarkdown(content) {
  if (!content) return '';

  const codeTokens = [];
  const mathTokens = [];

  // 0. Protect fenced code blocks (```...```) and inline code (`...`)
  let text = String(content).replace(/(```[\s\S]*?```|`[^`\n]+?`)/g, (match) => {
    const idx = codeTokens.length;
    codeTokens.push(match);
    return `%%%CODE_TOKEN_${idx}%%%`;
  });

  // 1. Extract $$ display math $$ with safe placeholders
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    const idx = mathTokens.length;
    mathTokens.push({ math: math.trim(), display: true });
    return `%%%KATEX_BLOCK_${idx}%%%`;
  });

  // 2. Extract $ inline math $ with safe placeholders
  text = text.replace(/(?<!\\)\$([^\$\n]+?)(?<!\\)\$/g, (_, math) => {
    const idx = mathTokens.length;
    mathTokens.push({ math: math.trim(), display: false });
    return `%%%KATEX_INLINE_${idx}%%%`;
  });

  // 3. Restore code blocks before marked parsing (using function callback to prevent '$`' dollar pattern expansion)
  codeTokens.forEach((match, idx) => {
    text = text.replaceAll(`%%%CODE_TOKEN_${idx}%%%`, () => match);
  });

  // 4. Rewrite relative image paths to quiz-local protocol
  text = text.replace(/!\[(.*?)\]\(((?!https?:\/\/|quiz-local:\/\/)(.*?))\)/g, (_, alt, src) => {
    const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
    return `![${alt}](quiz-local:///${cleanSrc})`;
  });

  // 5. Process GitHub-style Alert Callouts ([!NOTE], [!IMPORTANT], [!TIP], [!WARNING], [!CAUTION]) & Parse Markdown
  activeMathTokens = mathTokens;
  let html;
  try {
    text = processAlertCallouts(text);
    html = marked.parse(text);
  } finally {
    activeMathTokens = [];
  }

  // 7. Inject rendered KaTeX HTML back into placeholders (using function callback to prevent '$`' dollar pattern expansion)
  mathTokens.forEach((item, idx) => {
    const token = item.display ? `%%%KATEX_BLOCK_${idx}%%%` : `%%%KATEX_INLINE_${idx}%%%`;
    try {
      const rendered = katex.renderToString(item.math, { displayMode: item.display, throwOnError: false });
      html = html.replaceAll(token, () => rendered);
    } catch (e) {
      html = html.replaceAll(token, () => item.math);
    }
  });

  return html;
}

/**
 * Render inline Markdown and KaTeX math without wrapping in <p>...</p>
 */
export function renderMarkdownInline(content) {
  if (!content) return '';

  const codeTokens = [];
  const mathTokens = [];

  // 0. Protect code blocks and inline code
  let text = String(content).replace(/(```[\s\S]*?```|`[^`\n]+?`)/g, (match) => {
    const idx = codeTokens.length;
    codeTokens.push(match);
    return `%%%CODE_TOKEN_${idx}%%%`;
  });

  // 1. Extract $$ display math $$
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    const idx = mathTokens.length;
    mathTokens.push({ math: math.trim(), display: true });
    return `%%%KATEX_BLOCK_${idx}%%%`;
  });

  // 2. Extract $ inline math $
  text = text.replace(/(?<!\\)\$([^\$\n]+?)(?<!\\)\$/g, (_, math) => {
    const idx = mathTokens.length;
    mathTokens.push({ math: math.trim(), display: false });
    return `%%%KATEX_INLINE_${idx}%%%`;
  });

  // 3. Restore code blocks (using function callback)
  codeTokens.forEach((match, idx) => {
    text = text.replaceAll(`%%%CODE_TOKEN_${idx}%%%`, () => match);
  });

  activeMathTokens = mathTokens;
  let html;
  try {
    html = marked.parseInline(text);
  } finally {
    activeMathTokens = [];
  }

  mathTokens.forEach((item, idx) => {
    const token = item.display ? `%%%KATEX_BLOCK_${idx}%%%` : `%%%KATEX_INLINE_${idx}%%%`;
    try {
      const rendered = katex.renderToString(item.math, { displayMode: item.display, throwOnError: false });
      html = html.replaceAll(token, () => rendered);
    } catch (e) {
      html = html.replaceAll(token, () => item.math);
    }
  });

  return html;
}
