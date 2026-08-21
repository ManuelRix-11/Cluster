// Processo principale Electron
const { app, BrowserWindow, ipcMain, protocol, net, shell, dialog } = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('path')
const fs   = require('fs')
const os   = require('os')
const { pathToFileURL } = require('url')
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
ipcMain.handle('c:run', (_, payload) => {
  const code = payload?.code
  const stdin = payload?.stdin
  const files = payload?.files
  const id = Date.now() + '_' + Math.random().toString(36).substring(2, 7)
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cluster_c_'))
  const bin = path.join(tempDir, `prog_${id}.exe`)

  try {
    if (files && Array.isArray(files) && files.length > 0) {
      const cFiles = []
      for (const f of files) {
        const filePath = path.join(tempDir, f.name)
        fs.writeFileSync(filePath, f.content || '', 'utf-8')
        if (f.name.endsWith('.c')) {
          cFiles.push(`"${filePath}"`)
        }
      }
      execSync(`gcc ${cFiles.join(' ')} -o "${bin}" -lm`, { timeout: 10000, cwd: tempDir })
    } else {
      const src = path.join(tempDir, `main.c`)
      fs.writeFileSync(src, code || '', 'utf-8')
      execSync(`gcc "${src}" -o "${bin}" -lm`, { timeout: 10000, cwd: tempDir })
    }

    const out = execSync(`"${bin}"`, {
      input: stdin ?? '',
      timeout: 5000,
      encoding: 'utf-8',
      cwd: tempDir
    })
    return { ok: true, stdout: out, stderr: '' }
  } catch (err) {
    const errMsg = err.stderr?.toString() || err.stdout?.toString() || err.message || 'Errore di compilazione o esecuzione C'
    return { ok: false, stdout: '', stderr: errMsg }
  } finally {
    try { fs.rmSync(tempDir, { recursive: true, force: true }) } catch {}
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
  // ponytail: recursive scan con accumulo corretto del prefisso rel
  function scan(dir, prefix) {
    return fs.readdirSync(dir).flatMap(entry => {
      const full = path.join(dir, entry)
      const rel = prefix ? `${prefix}/${entry}` : entry
      if (fs.statSync(full).isDirectory()) {
        return [{ type: 'section', name: entry, children: scan(full, rel) }]
      }
      if (entry.endsWith('.md') && entry !== 'README.md') {
        return [{ type: 'note', name: entry.replace(/\.md$/i, ''), path: rel }]
      }
      return []
    })
  }
  return scan(root, '')
})

ipcMain.handle('notes:load', (_, relpath) => {
  const segments = relpath.split(/[\/\\]/).filter(Boolean).map(s => path.basename(s))
  const p = path.join(app.getAppPath(), 'Notes', ...segments)
  if (!fs.existsSync(p)) throw new Error('Nota non trovata: ' + relpath)
  return fs.readFileSync(p, 'utf-8')
})

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// ── Esportazione Note in PDF ──────────────────────────────────────────────────
ipcMain.handle('notes:exportPDF', async (_, { title, htmlContent }) => {
  try {
    const safeTitle = (title || 'Appunto').replace(/[\\/:*?"<>|]/g, '_').trim()
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      title: 'Esporta appunto in PDF',
      defaultPath: `${safeTitle}.pdf`,
      filters: [{ name: 'Documenti PDF (*.pdf)', extensions: ['pdf'] }]
    })

    if (canceled || !filePath) return { canceled: true }

    const printWin = new BrowserWindow({
      show: false,
      width: 1200,
      height: 900,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      }
    })

    let katexCssTag = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">'
    let hljsCssTag = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.12.0/styles/github.min.css">'

    try {
      const localKatexCssPath = path.join(app.getAppPath(), 'node_modules', 'katex', 'dist', 'katex.min.css')
      if (fs.existsSync(localKatexCssPath)) {
        const katexCssContent = fs.readFileSync(localKatexCssPath, 'utf-8')
        katexCssTag = `<style>${katexCssContent}</style>`
      }
    } catch {}

    try {
      const localHljsCssPath = path.join(app.getAppPath(), 'node_modules', 'highlight.js', 'styles', 'github.min.css')
      if (fs.existsSync(localHljsCssPath)) {
        const hljsCssContent = fs.readFileSync(localHljsCssPath, 'utf-8')
        hljsCssTag = `<style>${hljsCssContent}</style>`
      }
    } catch {}

    const fullHtml = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title || 'Appunto')}</title>
  ${katexCssTag}
  ${hljsCssTag}
  <style>
    @page {
      size: A4;
      margin: 16mm 14mm 18mm 14mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 13px;
      line-height: 1.6;
      color: #1a1a1a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .pdf-header {
      border-bottom: 2px solid #6c63ff;
      padding-bottom: 10px;
      margin-bottom: 22px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .pdf-header-title {
      font-size: 20px;
      font-weight: 700;
      color: #1e1b4b;
      margin: 0;
    }
    .pdf-header-meta {
      font-size: 11px;
      color: #6b7280;
    }
    h1, h2, h3, h4, h5, h6 {
      color: #111827;
      font-weight: 700;
      page-break-after: avoid;
      break-after: avoid;
    }
    h1 {
      font-size: 22px;
      margin-top: 24px;
      margin-bottom: 12px;
      border-bottom: 1.5px solid #e5e7eb;
      padding-bottom: 6px;
    }
    h2 {
      font-size: 17px;
      margin-top: 20px;
      margin-bottom: 10px;
      border-bottom: 1px solid #f3f4f6;
      padding-bottom: 4px;
    }
    h3 {
      font-size: 15px;
      margin-top: 16px;
      margin-bottom: 8px;
    }
    h4 {
      font-size: 13.5px;
      margin-top: 14px;
      margin-bottom: 6px;
    }
    p {
      margin-top: 0;
      margin-bottom: 10px;
      text-align: justify;
    }
    a {
      color: #4f46e5;
      text-decoration: none;
    }
    blockquote {
      margin: 12px 0;
      padding: 8px 14px;
      border-left: 3.5px solid #6c63ff;
      background: #f8f9ff;
      color: #374151;
      font-style: normal;
      border-radius: 0 6px 6px 0;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .callout {
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      margin: 14px 0;
      padding: 10px 14px;
      background: #f9fafb;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .callout-header {
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 6px;
    }
    pre {
      background: #f6f8fa;
      border: 1px solid #e1e4e8;
      border-radius: 6px;
      padding: 10px 14px;
      font-family: "Fira Code", "Consolas", "Courier New", monospace;
      font-size: 11.5px;
      line-height: 1.45;
      white-space: pre-wrap;
      word-break: break-all;
      page-break-inside: avoid;
      break-inside: avoid;
      margin: 12px 0;
    }
    code:not(pre code) {
      font-family: "Fira Code", "Consolas", "Courier New", monospace;
      font-size: 11.5px;
      background: #f1f3f5;
      padding: 2px 4px;
      border-radius: 4px;
      color: #c7254e;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 12px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    th, td {
      border: 1px solid #d1d5db;
      padding: 6px 8px;
      text-align: left;
    }
    th {
      background: #f3f4f6;
      font-weight: 600;
    }
    tr:nth-child(even) {
      background: #f9fafb;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 14px auto;
      border-radius: 6px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    ul, ol {
      margin-top: 0;
      margin-bottom: 10px;
      padding-left: 22px;
    }
    li {
      margin-bottom: 3px;
    }
    hr {
      border: none;
      border-top: 1px solid #e5e7eb;
      margin: 18px 0;
    }
    .katex-display {
      margin: 10px 0;
    }
    .mermaid {
      text-align: center;
      margin: 14px 0;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .mermaid svg {
      max-width: 100%;
      height: auto;
    }
    .pdf-footer {
      margin-top: 30px;
      border-top: 1px solid #e5e7eb;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #9ca3af;
    }
  </style>
</head>
<body>
  <div class="pdf-header">
    <div>
      <div class="pdf-header-title">${escapeHtml(title || 'Appunto di Studio')}</div>
      <div class="pdf-header-meta">Cluster — Informatica UNISA</div>
    </div>
    <div class="pdf-header-meta">Esportato il ${new Date().toLocaleDateString('it-IT')}</div>
  </div>
  <div class="markdown-content">
    ${htmlContent}
  </div>
  <div class="pdf-footer">
    <span>Cluster — Informatica UNISA</span>
    <span>Pagina generata automaticamente</span>
  </div>
</body>
</html>`

    const tempFilePath = path.join(app.getPath('temp'), `cluster_pdf_${Date.now()}_${Math.random().toString(36).slice(2)}.html`)
    fs.writeFileSync(tempFilePath, fullHtml, 'utf-8')

    try {
      await printWin.loadFile(tempFilePath)
      
      // Attendiamo che il DOM e le risorse siano caricate
      await new Promise(r => setTimeout(r, 600))

      const pdfBuffer = await printWin.webContents.printToPDF({
        printBackground: true,
        pageSize: 'A4',
        margins: {
          marginType: 'default'
        }
      })

      fs.writeFileSync(filePath, pdfBuffer)
      return { success: true, filePath }
    } finally {
      if (fs.existsSync(tempFilePath)) {
        try { fs.unlinkSync(tempFilePath) } catch {}
      }
      if (printWin && !printWin.isDestroyed()) {
        printWin.destroy()
      }
    }
  } catch (err) {
    console.error('PDF export error:', err)
    return { success: false, error: err.message }
  }
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
  protocol.handle('quiz-local', async request => {
    let relPath = decodeURIComponent(request.url.replace(/^quiz-local:\/*(local\/)?/i, ''))
    
    const candidates = [
      path.join(app.getAppPath(), relPath),
      path.join(app.getAppPath(), 'images', relPath),
      path.join(process.cwd(), relPath),
      path.join(process.cwd(), 'images', relPath)
    ]
    
    for (const p of candidates) {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        return net.fetch(pathToFileURL(p).href)
      }
    }
    
    return new Response('File not found', { status: 404 })
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
