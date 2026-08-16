import { marked } from 'marked';
import katex from 'katex';

/**
 * Render Markdown and KaTeX math ($...$ inline and $$...$$ block)
 */
export function renderMarkdown(content) {
  if (!content) return '';

  // 1. Process $$ display math $$
  let text = String(content).replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: true, throwOnError: false });
    } catch (e) {
      return math;
    }
  });

  // 2. Process $ inline math $
  text = text.replace(/(?<!\\)\$([^\$\n]+?)(?<!\\)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
    } catch (e) {
      return math;
    }
  });

  return marked.parse(text);
}

/**
 * Render inline Markdown and KaTeX math without wrapping in <p>...</p>
 */
export function renderMarkdownInline(content) {
  if (!content) return '';

  // 1. Process $$ display math $$
  let text = String(content).replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: true, throwOnError: false });
    } catch (e) {
      return math;
    }
  });

  // 2. Process $ inline math $
  text = text.replace(/(?<!\\)\$([^\$\n]+?)(?<!\\)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
    } catch (e) {
      return math;
    }
  });

  return marked.parseInline(text);
}
