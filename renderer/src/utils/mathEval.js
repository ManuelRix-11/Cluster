/**
 * Copyright (c) 2026 Emanuele Ragozzini
 * Cluster - Hub di studio e simulatore d'esami per Informatica Unisa
 * Licensed under the PolyForm Strict License 1.0.0.
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 */

// ponytail: mini safe math evaluator for numeric / fractional / simple algebraic checks
// No dependencies, no eval()

export function parseMath(exprStr) {
  if (exprStr === null || exprStr === undefined) return NaN;
  let s = String(exprStr).trim()
    .replace(/,/g, '.')
    .replace(/[−–—]/g, '-')
    .replace(/[×·]/g, '*')
    .replace(/[÷:]/g, '/')
    .replace(/π/g, 'pi')
    .replace(/\s+/g, '');

  if (!s) return NaN;

  // Insert implicit multiplication: e.g. 2pi -> 2*pi, 2( -> 2*(, )pi -> )*pi, )( -> )*(
  s = s.replace(/(\d)(pi|e|sqrt|sin|cos|tan|ln|log|abs|\()/gi, '$1*$2');
  s = s.replace(/(\))(pi|e|sqrt|sin|cos|tan|ln|log|abs|\(|\d)/gi, '$1*$2');

  let pos = 0;

  function peek() { return s[pos]; }
  function get() { return s[pos++]; }

  function parsePrimary() {
    if (pos >= s.length) return NaN;
    if (peek() === '(') {
      get(); // consume '('
      const val = parseExpression();
      if (peek() === ')') get();
      return val;
    }
    if (peek() === '-') {
      get();
      return -parsePrimary();
    }
    if (peek() === '+') {
      get();
      return parsePrimary();
    }

    // Check functions or constants
    const nameMatch = s.slice(pos).match(/^(sqrt|sin|cos|tan|ln|log|abs|pi|e)/i);
    if (nameMatch) {
      const name = nameMatch[1].toLowerCase();
      pos += name.length;
      if (name === 'pi') return Math.PI;
      if (name === 'e') return Math.E;

      // Function call with '(' or direct argument
      let arg;
      if (peek() === '(') {
        get();
        arg = parseExpression();
        if (peek() === ')') get();
      } else {
        arg = parsePrimary();
      }

      switch (name) {
        case 'sqrt': return Math.sqrt(arg);
        case 'sin':  return Math.sin(arg);
        case 'cos':  return Math.cos(arg);
        case 'tan':  return Math.tan(arg);
        case 'ln':   return Math.log(arg);
        case 'log':  return Math.log10 ? Math.log10(arg) : Math.log(arg) / Math.LN10;
        case 'abs':  return Math.abs(arg);
        default:     return NaN;
      }
    }

    // Numbers (integers, floats, scientific notation)
    const numMatch = s.slice(pos).match(/^(\d+(?:\.\d+)?(?:e[+-]?\d+)?)/i);
    if (numMatch) {
      pos += numMatch[1].length;
      return parseFloat(numMatch[1]);
    }

    return NaN;
  }

  function parseExponent() {
    let left = parsePrimary();
    while (pos < s.length && (peek() === '^' || s.slice(pos, pos + 2) === '**')) {
      if (s.slice(pos, pos + 2) === '**') pos += 2;
      else pos += 1;
      const right = parseExponent(); // right associative
      left = Math.pow(left, right);
    }
    return left;
  }

  function parseFactor() {
    let left = parseExponent();
    while (pos < s.length && (peek() === '*' || peek() === '/')) {
      const op = get();
      const right = parseExponent();
      if (op === '*') left = left * right;
      else left = left / right;
    }
    return left;
  }

  function parseExpression() {
    let left = parseFactor();
    while (pos < s.length && (peek() === '+' || peek() === '-')) {
      const op = get();
      const right = parseFactor();
      if (op === '+') left = left + right;
      else left = left - right;
    }
    return left;
  }

  const result = parseExpression();
  return (pos === s.length && !Number.isNaN(result) && Number.isFinite(result)) ? result : NaN;
}

/**
 * Valuta e confronta la risposta inserita dall'utente con la soluzione attesa.
 * Supporta frazioni (es. 3/2 == 1.5), notazione virgola o punto, funzioni elementari e tolleranza floating point.
 */
export function compareMathAnswers(userInput, correctAnswer, customTolerance) {
  if (userInput === undefined || userInput === null || correctAnswer === undefined || correctAnswer === null) {
    return { isCorrect: false, userVal: NaN, expectedVal: NaN };
  }

  const normUser = String(userInput).trim().toLowerCase().replace(/\s+/g, '');
  const normCorrect = String(correctAnswer).trim().toLowerCase().replace(/\s+/g, '');

  // 1. Uguaglianza testuale diretta
  if (normUser === normCorrect) {
    return { isCorrect: true, userVal: normUser, expectedVal: normCorrect };
  }

  // 2. Valutazione numerica ed equivalenza algebrica/frazionaria
  const uVal = parseMath(normUser);
  const cVal = parseMath(normCorrect);

  const tolerance = (customTolerance !== undefined && !Number.isNaN(Number(customTolerance)))
    ? Number(customTolerance)
    : 1e-4;

  if (!Number.isNaN(uVal) && !Number.isNaN(cVal)) {
    const diff = Math.abs(uVal - cVal);
    const isClose = diff <= tolerance || (Math.abs(cVal) > 1e-7 && (diff / Math.abs(cVal)) <= tolerance);
    return { isCorrect: isClose, userVal: uVal, expectedVal: cVal };
  }

  return { isCorrect: false, userVal: uVal, expectedVal: cVal };
}
