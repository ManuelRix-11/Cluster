/**
 * Copyright (c) 2026 Emanuele Ragozzini
 * Cluster - Hub di studio e simulatore d'esami per Informatica Unisa
 * Licensed under the PolyForm Strict License 1.0.0.
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 */

const fs = require('fs');
const { marked } = require('./node_modules/marked/lib/marked.umd.js');

const md = fs.readFileSync('Notes/Primo anno/Primo semestre/Architettura degli Elaboratori.md', 'utf8');
const html = marked.parse(md);

const indice = (html.match(/Indice dei Contenuti/g) || []).length;
const autore = (html.match(/Autore/g) || []).length;

console.log('Indice dei Contenuti occurrences:', indice);
console.log('Autore occurrences:', autore);
console.log('HTML length:', html.length);

// Find Autore position and show surrounding context
const autorePos = html.indexOf('Autore');
if (autorePos !== -1) {
  console.log('\nAround "Autore" in HTML:');
  console.log(html.slice(Math.max(0, autorePos - 100), autorePos + 200));
}
