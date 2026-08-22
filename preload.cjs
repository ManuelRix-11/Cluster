/**
 * Copyright (c) 2026 Emanuele Ragozzini
 * Cluster - Hub di studio e simulatore d'esami per Informatica Unisa
 * Licensed under the PolyForm Strict License 1.0.0.
 * SPDX-License-Identifier: PolyForm-Strict-1.0.0
 */

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  minimize:       () => ipcRenderer.invoke('window:minimize'),
  maximize:       () => ipcRenderer.invoke('window:maximize'),
  close:          () => ipcRenderer.invoke('window:close'),
  listQuizzes:    (subpath) => ipcRenderer.invoke('quizzes:list', subpath),
  loadQuiz:       (filename) => ipcRenderer.invoke('quizzes:load', filename),
  readStats:      () => ipcRenderer.invoke('stats:read'),
  writeStats:     (csv) => ipcRenderer.invoke('stats:write', csv),
  clearStats:     () => ipcRenderer.invoke('stats:clear'),
  readTagStats:   () => ipcRenderer.invoke('stats:tags:read'),
  recordTagStats: (tagResults) => ipcRenderer.invoke('stats:tags:record', tagResults),
  compileAndRun:     (codeOrFiles, stdin) => {
    if (Array.isArray(codeOrFiles)) {
      return ipcRenderer.invoke('c:run', { files: codeOrFiles, stdin })
    }
    if (typeof codeOrFiles === 'object' && codeOrFiles !== null) {
      return ipcRenderer.invoke('c:run', codeOrFiles)
    }
    return ipcRenderer.invoke('c:run', { code: codeOrFiles, stdin })
  },
  compileAndRunJava: (code, stdin) => ipcRenderer.invoke('java:run', { code, stdin }),
  listNotes:      () => ipcRenderer.invoke('notes:list'),
  loadNote:       (relpath) => ipcRenderer.invoke('notes:load', relpath),
  exportNotePDF:  (payload) => ipcRenderer.invoke('notes:exportPDF', payload),
  openExternal:   (url) => ipcRenderer.invoke('window:openExternal', url),
  // Auto Updater
  checkForUpdates: () => ipcRenderer.invoke('updater:check'),
  installUpdate:   () => ipcRenderer.invoke('updater:install'),
  getVersion:      () => ipcRenderer.invoke('app:version'),
  onUpdaterStatus: (callback) => {
    const handler = (_, data) => callback(data)
    ipcRenderer.on('updater:status', handler)
    return () => ipcRenderer.removeListener('updater:status', handler)
  }
})

