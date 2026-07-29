const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  minimize:       () => ipcRenderer.invoke('window:minimize'),
  maximize:       () => ipcRenderer.invoke('window:maximize'),
  close:          () => ipcRenderer.invoke('window:close'),
  listQuizzes:    () => ipcRenderer.invoke('quizzes:list'),
  loadQuiz:       (filename) => ipcRenderer.invoke('quizzes:load', filename),
  readStats:      () => ipcRenderer.invoke('stats:read'),
  writeStats:     (csv) => ipcRenderer.invoke('stats:write', csv),
  compileAndRun:  (code, stdin) => ipcRenderer.invoke('c:run', { code, stdin }),
})
