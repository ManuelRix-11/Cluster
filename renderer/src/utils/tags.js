/**
 * Copyright (c) 2026 Emanuele Ragozzini
 * Cluster - Hub di studio e simulatore d'esami per Informatica Unisa
 * Licensed under the PolyForm Strict License 1.0.0.
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 */

// ponytail: safe single-line tag extractor supporting array, string, or undefined
export const getTags = (q) => [q?.tag ?? q?.tags ?? []].flat().filter(Boolean);
