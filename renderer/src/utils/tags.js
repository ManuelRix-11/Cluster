// ponytail: safe single-line tag extractor supporting array, string, or undefined
export const getTags = (q) => [q?.tag ?? q?.tags ?? []].flat().filter(Boolean);
