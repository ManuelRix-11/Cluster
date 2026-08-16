// Processo principale Electron
const { app, BrowserWindow, ipcMain, protocol, net, shell } = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('path')
const fs   = require('fs')
const os   = require('os')
const { execSync } = require('child_process')

// Deve essere chiamato PRIMA di app.ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'quiz-local', privileges: { standard: true, secure: true, supportFetchAPI: true } }
])

app.name = 'Cluster'

let mainWindow = null

function createWindow() {
  const win = new BrowserWindow({
    title:    'Cluster — Informatica UNISA',
    width:    1280,
    height:   860,
    minWidth: 520,
    minHeight:460,
    frame:    false,
    backgroundColor: '#09090f',
    icon:     path.join(__dirname, 'assets', 'logoIUE.png'),
    webPreferences: {
      preload:          path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration:  false,
    },
  })

  mainWindow = win
  win.on('closed', () => { mainWindow = null })

  if (app.isPackaged) {
    win.loadFile('renderer/dist/index.html')
  } else {
    // try to load the vite dev server, catch is needed if we restart electron too fast
    win.loadURL('http://localhost:5173').catch(() => {
      win.loadFile('renderer/dist/index.html')
    })
  }
}

// ── Controlli finestra ─────────────────────────────────────────────────────────
ipcMain.handle('window:minimize', e => BrowserWindow.fromWebContents(e.sender).minimize())
ipcMain.handle('window:maximize', e => {
  const win = BrowserWindow.fromWebContents(e.sender)
  win.isMaximized() ? win.unmaximize() : win.maximize()
})
ipcMain.handle('window:close', e => BrowserWindow.fromWebContents(e.sender).close())
ipcMain.handle('window:openExternal', (_, url) => shell.openExternal(url))

// ── Lista quiz dalla cartella Quizzes/ ────────────────────────────────────────
ipcMain.handle('quizzes:list', (_, subpath) => {
  const root = path.join(app.getAppPath(), 'Quizzes')
  const dir  = subpath ? path.join(root, subpath) : root
  if (!fs.existsSync(dir)) return []

  function readQuizEntry(full, entry, prefix) {
    let count = 0
    try {
      const content = fs.readFileSync(full, 'utf-8').trim()
      if (content) {
        const data = JSON.parse(content)
        count = Array.isArray(data) ? data.length : 0
      }
    } catch {}
    const filename = prefix ? `${prefix}/${entry}` : entry
    return { filename, name: entry.replace(/\.json$/i, ''), count, hasLivelli: false }
  }

  function scanSemesterDir(semDir, prefix) {
    return fs.readdirSync(semDir).flatMap(entry => {
      const full = path.join(semDir, entry)
      const stat = fs.statSync(full)

      if (stat.isDirectory()) {
        const ORDER = { facile: 0, medio: 1, difficile: 2 }
        const livelli = fs.readdirSync(full)
          .filter(f => f.endsWith('.json'))
          .map(f => {
            let count = 0
            try {
              const content = fs.readFileSync(path.join(full, f), 'utf-8').trim()
              if (content) {
                const data = JSON.parse(content)
                count = Array.isArray(data) ? data.length : 0
              }
            } catch {}
            const rawName = f.replace(/\.json$/i, '')
            const nome = rawName.includes('_') ? rawName.replace(/^[^_]+_/, '') : rawName
            const filename = prefix ? `${prefix}/${entry}/${f}` : `${entry}/${f}`
            return { filename, nome, count }
          })
          .sort((a, b) => (ORDER[a.nome.toLowerCase()] ?? 99) - (ORDER[b.nome.toLowerCase()] ?? 99) || a.nome.localeCompare(b.nome))

        return [{ name: entry, hasLivelli: true, livelli }]
      }

      if (entry.endsWith('.json')) return [readQuizEntry(full, entry, prefix)]
      return []
    })
  }

  if (subpath) {
    // Cartella di un anno (es. "Primo anno") -> ricerca cartelle semestre e file diretti (es. Inglese.json)
    const entries = fs.readdirSync(dir)
    const semesterDirs = entries.filter(e => {
      const full = path.join(dir, e)
      return fs.statSync(full).isDirectory() && /semestre/i.test(e)
    })

    const standaloneEntries = entries.filter(e => !/semestre/i.test(e)).flatMap(entry => {
      const full = path.join(dir, entry)
      const stat = fs.statSync(full)
      if (stat.isDirectory()) {
        const ORDER = { facile: 0, medio: 1, difficile: 2 }
        const livelli = fs.readdirSync(full)
          .filter(f => f.endsWith('.json'))
          .map(f => {
            let count = 0
            try {
              const content = fs.readFileSync(path.join(full, f), 'utf-8').trim()
              if (content) {
                const data = JSON.parse(content)
                count = Array.isArray(data) ? data.length : 0
              }
            } catch {}
            const rawName = f.replace(/\.json$/i, '')
            const nome = rawName.includes('_') ? rawName.replace(/^[^_]+_/, '') : rawName
            const filename = `${subpath}/${entry}/${f}`
            return { filename, nome, count }
          })
          .sort((a, b) => (ORDER[a.nome.toLowerCase()] ?? 99) - (ORDER[b.nome.toLowerCase()] ?? 99) || a.nome.localeCompare(b.nome))
        return [{ name: entry, hasLivelli: true, livelli }]
      }
      if (entry.endsWith('.json')) return [readQuizEntry(full, entry, subpath)]
      return []
    })

    if (semesterDirs.length > 0) {
      const SEM_ORDER = { 'primo semestre': 1, 'secondo semestre': 2 }
      semesterDirs.sort((a, b) => (SEM_ORDER[a.toLowerCase()] ?? 99) - (SEM_ORDER[b.toLowerCase()] ?? 99))

      const semestri = semesterDirs.map(semName => {
        const semPath = path.join(dir, semName)
        const prefix = `${subpath}/${semName}`
        return {
          semestre: semName,
          quizzes: scanSemesterDir(semPath, prefix)
        }
      })

      return {
        standalone: standaloneEntries,
        semestri
      }
    }

    return {
      standalone: [],
      semestri: [{
        semestre: 'Quiz',
        quizzes: standaloneEntries
      }]
    }
  }

  // Root: directory = anni, file .json = quiz diretti
  return fs.readdirSync(dir).flatMap(entry => {
    const full = path.join(dir, entry)
    if (fs.statSync(full).isDirectory()) return [{ type: 'anno', name: entry }]
    if (entry.endsWith('.json')) return [readQuizEntry(full, entry)]
    return []
  })
})


// ── Carica un singolo quiz per filename (supporta sottocartelle) ──────────────
ipcMain.handle('quizzes:load', (_, filename) => {
  const parts = filename.split('/').filter(Boolean)
  const p = path.join(app.getAppPath(), 'Quizzes', ...parts)
  if (!fs.existsSync(p)) throw new Error('File non trovato: ' + filename)
  return fs.readFileSync(p, 'utf-8')
})


// ── Statistiche (stats.csv & tags_stats.json) ──────────────────────────────────
const STATS_PATH = () => path.join(app.getPath('userData'), 'stats.csv')
const TAGS_PATH = () => path.join(app.getPath('userData'), 'tags_stats.json')
const STATS_HEADER = 'data,quiz_name,n_domande,n_corrette,n_simili,n_sbagliate,punteggio_30\n'

ipcMain.handle('stats:read', () => {
  const p = STATS_PATH()
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf-8') : STATS_HEADER
})

ipcMain.handle('stats:write', (_, csv) => {
  const p = STATS_PATH()
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, STATS_HEADER, 'utf-8')
  }
  fs.appendFileSync(p, csv, 'utf-8')
})

ipcMain.handle('stats:tags:read', () => {
  const p = TAGS_PATH()
  try {
    return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf-8')) : {}
  } catch {
    return {}
  }
})

ipcMain.handle('stats:tags:record', (_, tagResults) => {
  const p = TAGS_PATH()
  let current = {}
  try {
    if (fs.existsSync(p)) current = JSON.parse(fs.readFileSync(p, 'utf-8'))
  } catch {}

  if (Array.isArray(tagResults)) {
    for (const item of tagResults) {
      const tag = String(item.tag || '').trim().toLowerCase()
      if (!tag) continue
      if (!current[tag]) current[tag] = { ok: 0, total: 0 }
      current[tag].total += 1
      if (item.ok) current[tag].ok += 1
    }
  }
  fs.writeFileSync(p, JSON.stringify(current, null, 2), 'utf-8')
  return current
})

ipcMain.handle('stats:clear', () => {
  fs.writeFileSync(STATS_PATH(), STATS_HEADER, 'utf-8')
  try {
    const tp = TAGS_PATH()
    if (fs.existsSync(tp)) fs.unlinkSync(tp)
  } catch {}
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

// ── Compilazione Java con javac / java ─────────────────────────────────────────
ipcMain.handle('java:run', (_, { code, stdin }) => {
  // ponytail: estrai nome classe pubblica o prima classe dichiarata
  const classMatch = code.match(/public\s+(?:final\s+)?class\s+([A-Za-z_][A-Za-z0-9_]*)/) ||
                     code.match(/class\s+([A-Za-z_][A-Za-z0-9_]*)/)
  const className = classMatch ? classMatch[1] : 'Main'
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cluster_java_'))
  const src = path.join(tempDir, `${className}.java`)

  try {
    fs.writeFileSync(src, code, 'utf-8')
    execSync(`javac "${src}"`, { timeout: 10000, cwd: tempDir, encoding: 'utf-8' })
    const out = execSync(`java "${className}"`, {
      input: stdin ?? '',
      timeout: 5000,
      encoding: 'utf-8',
      cwd: tempDir
    })
    return { ok: true, stdout: out, stderr: '' }
  } catch (err) {
    const errMsg = err.stderr?.toString() || err.stdout?.toString() || err.message || 'Errore di compilazione o esecuzione Java'
    return { ok: false, stdout: '', stderr: errMsg }
  } finally {
    try { fs.rmSync(tempDir, { recursive: true, force: true }) } catch {}
  }
})

// ── Note Markdown ─────────────────────────────────────────────────────────────
ipcMain.handle('notes:list', () => {
  const root = path.join(app.getAppPath(), 'Notes')
  if (!fs.existsSync(root)) return []
  // ponytail: flat scan — cartelle = sezioni, .md dentro = note
  function scan(dir, prefix) {
    return fs.readdirSync(dir).flatMap(entry => {
      const full = path.join(dir, entry)
      if (fs.statSync(full).isDirectory()) {
        return [{ type: 'section', name: entry, children: scan(full, entry) }]
      }
      if (entry.endsWith('.md') && entry !== 'README.md') {
        const rel = prefix ? `${prefix}/${entry}` : entry
        return [{ type: 'note', name: entry.replace(/\.md$/i, ''), path: rel }]
      }
      return []
    })
  }
  return scan(root, '')
})

ipcMain.handle('notes:load', (_, relpath) => {
  const p = path.join(app.getAppPath(), 'Notes', ...relpath.split('/').map(s => path.basename(s)))
  if (!fs.existsSync(p)) throw new Error('Nota non trovata: ' + relpath)
  return fs.readFileSync(p, 'utf-8')
})

// ── Auto Updater ─────────────────────────────────────────────────────────────
autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = true

function sendUpdaterStatus(payload) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('updater:status', payload)
  }
}

autoUpdater.on('checking-for-update', () => {
  sendUpdaterStatus({ status: 'checking' })
})

autoUpdater.on('update-available', info => {
  sendUpdaterStatus({ status: 'available', version: info.version })
})

autoUpdater.on('update-not-available', () => {
  sendUpdaterStatus({ status: 'not-available' })
})

autoUpdater.on('download-progress', progress => {
  sendUpdaterStatus({
    status: 'downloading',
    percent: Math.round(progress.percent),
    transferred: progress.transferred,
    total: progress.total
  })
})

autoUpdater.on('update-downloaded', info => {
  sendUpdaterStatus({ status: 'downloaded', version: info.version })
})

autoUpdater.on('error', err => {
  sendUpdaterStatus({ status: 'error', error: err?.message || 'Errore durante la ricerca di aggiornamenti' })
})

ipcMain.handle('updater:check', async () => {
  if (!app.isPackaged) {
    return { ok: false, message: 'Disponibile solo nella versione installata (.exe)' }
  }
  try {
    const result = await autoUpdater.checkForUpdates()
    return { ok: true, result }
  } catch (err) {
    return { ok: false, error: err.message }
  }
})

ipcMain.handle('updater:install', () => {
  autoUpdater.quitAndInstall()
})

ipcMain.handle('app:version', () => app.getVersion())

app.whenReady().then(() => {
  // Protocollo quiz-local:// — serve file da images/ in modo sicuro
  protocol.handle('quiz-local', request => {
    const relPath = decodeURIComponent(new URL(request.url).pathname.substring(1))
    const absPath = path.join(app.getAppPath(), relPath)
    return net.fetch('file:///' + absPath.replace(/\\/g, '/'))
  })
  createWindow()

  // Controllo aggiornamenti in background all'avvio (solo in produzione)
  if (app.isPackaged) {
    setTimeout(() => {
      autoUpdater.checkForUpdates().catch(() => {})
    }, 4000)
  }
})

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
