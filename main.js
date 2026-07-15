// Processo principale Electron
const { app, BrowserWindow, ipcMain, protocol, net } = require('electron')
const path = require('path')
const fs   = require('fs')

// Deve essere chiamato PRIMA di app.ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'quiz-local', privileges: { standard: true, secure: true, supportFetchAPI: true } }
])

function createWindow() {
  const win = new BrowserWindow({
    width:    920,
    height:   720,
    minWidth: 520,
    minHeight:460,
    frame:    false,
    backgroundColor: '#09090f',
    webPreferences: {
      preload:          path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration:  false,
    },
  })
  win.loadFile('quiz-web/index.html')
}

// ── Controlli finestra ─────────────────────────────────────────────────────────
ipcMain.handle('window:minimize', e => BrowserWindow.fromWebContents(e.sender).minimize())
ipcMain.handle('window:maximize', e => {
  const win = BrowserWindow.fromWebContents(e.sender)
  win.isMaximized() ? win.unmaximize() : win.maximize()
})
ipcMain.handle('window:close', e => BrowserWindow.fromWebContents(e.sender).close())

// ── Lista quiz dalla cartella Quizzes/ ────────────────────────────────────────
ipcMain.handle('quizzes:list', () => {
  const dir = path.join(app.getAppPath(), 'Quizzes')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'))
        return {
          filename: f,
          name: f.replace(/\.json$/i, ''),
          count: Array.isArray(data) ? data.length : 0,
        }
      } catch {
        return { filename: f, name: f.replace(/\.json$/i, ''), count: 0 }
      }
    })
})

// ── Carica un singolo quiz per filename ───────────────────────────────────────
ipcMain.handle('quizzes:load', (_, filename) => {
  const p = path.join(app.getAppPath(), 'Quizzes', path.basename(filename))
  if (!fs.existsSync(p)) throw new Error('File non trovato: ' + filename)
  return fs.readFileSync(p, 'utf-8')
})

app.whenReady().then(() => {
  // Protocollo quiz-local:// — serve file da images/ in modo sicuro
  protocol.handle('quiz-local', request => {
    const relPath = decodeURIComponent(new URL(request.url).pathname.substring(1))
    const absPath = path.join(app.getAppPath(), relPath)
    return net.fetch('file:///' + absPath.replace(/\\/g, '/'))
  })
  createWindow()
})

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
