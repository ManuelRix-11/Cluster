// Processo principale Electron
const { app, BrowserWindow, ipcMain, protocol, net } = require('electron')
const path = require('path')
const fs   = require('fs')
const os   = require('os')
const { execSync } = require('child_process')

// Deve essere chiamato PRIMA di app.ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'quiz-local', privileges: { standard: true, secure: true, supportFetchAPI: true } }
])

function createWindow() {
  const win = new BrowserWindow({
    width:    1280,
    height:   860,
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
ipcMain.handle('quizzes:list', (_, subpath) => {
  const root = path.join(app.getAppPath(), 'Quizzes')
  const dir  = subpath ? path.join(root, subpath) : root
  if (!fs.existsSync(dir)) return []

  // ponytail: helper che scansiona una dir e restituisce quiz+livelli (logica precedente)
  function scanQuizDir(base, prefix) {
    return fs.readdirSync(base).flatMap(entry => {
      const full = path.join(base, entry)
      const stat = fs.statSync(full)

      if (stat.isDirectory()) {
        const livelli = fs.readdirSync(full)
          .filter(f => f.endsWith('.json'))
          .map(f => {
            try {
              const data = JSON.parse(fs.readFileSync(path.join(full, f), 'utf-8'))
              const rawName = f.replace(/\.json$/i, '').replace(/^[^_]+_/, '')
              const nome = rawName.charAt(0).toUpperCase() + rawName.slice(1)
              const filename = prefix ? `${prefix}/${entry}/${f}` : `${entry}/${f}`
              return { filename, nome, count: Array.isArray(data) ? data.length : 0 }
            } catch { return null }
          })
          .filter(Boolean)
        // ponytail: sort by difficulty, unknown names go last
        const ORDER = { facile: 0, medio: 1, difficile: 2 }
        livelli.sort((a, b) => {
          const oa = ORDER[a.nome.toLowerCase()] ?? 99
          const ob = ORDER[b.nome.toLowerCase()] ?? 99
          return oa - ob || a.nome.localeCompare(b.nome)
        })
        return [{ name: entry, hasLivelli: true, livelli }]
      }

      if (entry.endsWith('.json')) {
        try {
          const data = JSON.parse(fs.readFileSync(full, 'utf-8'))
          const filename = prefix ? `${prefix}/${entry}` : entry
          return [{ filename, name: entry.replace(/\.json$/i, ''), count: Array.isArray(data) ? data.length : 0, hasLivelli: false }]
        } catch {
          const filename = prefix ? `${prefix}/${entry}` : entry
          return [{ filename, name: entry.replace(/\.json$/i, ''), count: 0, hasLivelli: false }]
        }
      }

      return []
    })
  }

  if (subpath) {
    // Richiesta esplicita di un anno: restituisce i quiz in quella cartella
    return scanQuizDir(dir, subpath)
  }

  // Root: alla root tutte le directory sono anni (ponytail: struttura fissa)
  return fs.readdirSync(dir).flatMap(entry => {
    const full = path.join(dir, entry)
    const stat = fs.statSync(full)

    if (stat.isDirectory()) {
      return [{ type: 'anno', name: entry }]
    }

    if (entry.endsWith('.json')) {
      try {
        const data = JSON.parse(fs.readFileSync(full, 'utf-8'))
        return [{ filename: entry, name: entry.replace(/\.json$/i, ''), count: Array.isArray(data) ? data.length : 0, hasLivelli: false }]
      } catch {
        return [{ filename: entry, name: entry.replace(/\.json$/i, ''), count: 0, hasLivelli: false }]
      }
    }

    return []
  })
})


// ── Carica un singolo quiz per filename (supporta sottocartelle) ──────────────
ipcMain.handle('quizzes:load', (_, filename) => {
  const p = path.join(app.getAppPath(), 'Quizzes', ...filename.split('/').map(s => path.basename(s)))
  if (!fs.existsSync(p)) throw new Error('File non trovato: ' + filename)
  return fs.readFileSync(p, 'utf-8')
})


// ── Statistiche (stats.csv) ────────────────────────────────────────────────────
const STATS_PATH = () => path.join(app.getPath('userData'), 'stats.csv')
const STATS_HEADER = 'data,quiz_name,n_domande,n_corrette,n_simili,n_sbagliate,punteggio_30\n'

ipcMain.handle('stats:read', () => {
  const p = STATS_PATH()
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf-8') : STATS_HEADER
})

ipcMain.handle('stats:write', (_, csv) => {
  fs.writeFileSync(STATS_PATH(), csv, 'utf-8')
})

// ── Compilazione C con gcc ────────────────────────────────────────────────────
ipcMain.handle('c:run', (_, { code, stdin }) => {
  const id  = Date.now()
  const src = path.join(os.tmpdir(), `iue_${id}.c`)
  const bin = path.join(os.tmpdir(), `iue_${id}`)
  try {
    fs.writeFileSync(src, code, 'utf-8')
    execSync(`gcc "${src}" -o "${bin}" -lm`, { timeout: 10000 })
    const out = execSync(`"${bin}"`, {
      input: stdin ?? '',
      timeout: 5000,
      encoding: 'utf-8'
    })
    return { ok: true, stdout: out, stderr: '' }
  } catch (err) {
    return { ok: false, stdout: '', stderr: err.stderr?.toString() || err.message }
  } finally {
    try { fs.unlinkSync(src) } catch {}
    try { fs.unlinkSync(bin) } catch {}
  }
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
