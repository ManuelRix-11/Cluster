import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

let isMermaidInitialized = false;

function initMermaid() {
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

export function Mermaid({ chart, className = '', style = {} }) {
  const [svgContent, setSvgContent] = useState('');
  const chartId = useRef(`mermaid-svg-${Math.random().toString(36).substring(2, 10)}`);

  useEffect(() => {
    initMermaid();

    if (!chart || !chart.trim()) {
      setSvgContent('');
      return;
    }

    let isMounted = true;

    try {
      mermaid.render(chartId.current, chart.trim())
        .then(({ svg }) => {
          if (isMounted) {
            setSvgContent(svg);
          }
        })
        .catch((err) => {
          console.warn('Mermaid rendering error:', err);
          if (isMounted) setSvgContent('');
        });
    } catch (err) {
      console.warn('Mermaid synchronous error:', err);
    }

    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (!svgContent) return null;

  return (
    <div
      className={`mermaid-diagram ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        ...style
      }}
    />
  );
}
