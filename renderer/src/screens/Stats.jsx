import React, { useEffect, useState, useMemo } from 'react';

export function Stats({ onNavigate }) {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState('Tutti');
  const [sortMode, setSortMode] = useState('recent');

  const loadStats = () => {
    setLoading(true);
    if (window.electronAPI) {
      window.electronAPI.readStats()
        .then(csv => {
          if (!csv) { setStats([]); setLoading(false); return; }
          const lines = csv.trim().split('\n');
          // Start from 1 to skip header (header is handled by parts.length < 9 check, but let's be safe)
          const parsed = lines.map((line, idx) => {
            const parts = line.split(',');
            if (parts.length < 9 || parts[0] === 'data') return null;
            return {
              id: idx,
              date: parts[0],
              name: parts[1].replace(/^"|"$/g, ''),
              tot: parseInt(parts[2]),
              ok: parseInt(parts[3]),
              simili: parseInt(parts[4]),
              err: parseInt(parts[5]),
              saltate: parseInt(parts[6]),
              score30: parseFloat(parts[7]),
              pct: parseInt(parts[8])
            };
          }).filter(Boolean);
          setStats(parsed);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleClear = () => {
    if (window.confirm("Sei sicuro di voler azzerare lo storico? L'azione è irreversibile.")) {
      if (window.electronAPI) {
        window.electronAPI.clearStats().then(() => loadStats());
      }
    }
  };

  const uniqueNames = useMemo(() => {
    const names = new Set(stats.map(s => s.name));
    return ['Tutti', ...Array.from(names).sort()];
  }, [stats]);

  const filteredStats = useMemo(() => {
    let res = stats.slice();
    if (filterName !== 'Tutti') {
      res = res.filter(s => s.name === filterName);
    }
    if (sortMode === 'recent') res.reverse();
    else if (sortMode === 'oldest') { /* chronological */ }
    else if (sortMode === 'best') res.sort((a,b) => b.score30 - a.score30);
    else if (sortMode === 'worst') res.sort((a,b) => a.score30 - b.score30);
    return res;
  }, [stats, filterName, sortMode]);

  const mediaVoti = useMemo(() => {
    if (filteredStats.length === 0) return 0;
    const sum = filteredStats.reduce((acc, s) => acc + s.score30, 0);
    return (sum / filteredStats.length).toFixed(1);
  }, [filteredStats]);

  const chartData = useMemo(() => {
    let res = stats.slice();
    if (filterName !== 'Tutti') res = res.filter(s => s.name === filterName);
    return res.slice(-15);
  }, [stats, filterName]);

  const renderChart = () => {
    if (chartData.length < 2) return <div style={{color:'var(--text-muted)', fontSize:'0.85rem', marginTop:'20px'}}>Servono almeno 2 sessioni.</div>;
    
    const w = 260;
    const h = 60;
    const pts = chartData.map((d, i) => {
      const x = (i / (chartData.length - 1)) * w;
      const y = h - ((d.score30 / 30) * h);
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="100%" height="70px" viewBox={`-5 -5 ${w + 10} ${h + 10}`} style={{ overflow: 'visible', marginTop:'10px' }}>
        <polyline points={pts} fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {chartData.map((d, i) => {
          const x = (i / (chartData.length - 1)) * w;
          const y = h - ((d.score30 / 30) * h);
          const color = d.score30 >= 18 ? '#43d98c' : d.score30 >= 15 ? '#ffc400' : '#ff5c6e';
          return <circle key={i} cx={x} cy={y} r="4" fill={color} stroke="var(--surface)" strokeWidth="2" />;
        })}
      </svg>
    );
  };

  const getBadge = (score) => {
    if (score >= 28) return <span className="badge badge-fire">🔥 Perfetto</span>;
    if (score >= 18) return <span className="badge badge-good">✅ Superato</span>;
    if (score >= 15) return <span className="badge badge-ok">⚠️ Limite</span>;
    return <span className="badge badge-bad">❌ Insuff.</span>;
  };

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', flex: 1, alignItems: 'center' }}>
      <div className="stats-main">
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '10px' }}>
          <button className="btn btn--ghost btn--sm" style={{color: '#ff5c6e', padding: '6px 12px', fontSize:'0.85rem'}} onClick={handleClear}>🗑️ Resetta</button>
        </div>
        
        {loading ? (
          <p style={{textAlign: 'center', color: 'var(--muted)'}}>Caricamento...</p>
        ) : stats.length === 0 ? (
          <div style={{background:'rgba(255,255,255,0.03)', padding:'40px 20px', borderRadius:'14px', textAlign:'center', marginTop:'20px'}}>
            <p style={{color: 'var(--muted)', margin:0}}>Nessuna simulazione registrata.</p>
            <p style={{fontSize:'0.9rem', opacity:0.6, marginTop:'8px'}}>Completa un esame per popolare la dashboard.</p>
          </div>
        ) : (
          <>
            <div className="stats-kpi-row">
              <div className="stats-kpi-card">
                <div className="kpi-label">Media Voti</div>
                <div className={`kpi-value ${mediaVoti >= 18 ? 'good' : mediaVoti >= 15 ? 'ok' : 'bad'}`}>
                  {mediaVoti} <span style={{fontSize:'0.45em', opacity: 0.6}}>/ 30</span>
                </div>
              </div>
              <div className="stats-kpi-card stats-kpi-card--chart">
                <div className="kpi-label">Trend (Ultimi 15)</div>
                {renderChart()}
              </div>
            </div>

            <div className="stats-controls">
              <select className="input-select" value={filterName} onChange={e => setFilterName(e.target.value)}>
                {uniqueNames.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <select className="input-select" value={sortMode} onChange={e => setSortMode(e.target.value)}>
                <option value="recent">Più recenti</option>
                <option value="oldest">Più vecchi</option>
                <option value="best">Migliori</option>
                <option value="worst">Peggiori</option>
              </select>
            </div>

            {filteredStats.length === 0 ? (
              <p style={{textAlign: 'center', color: 'var(--muted)', marginTop:'20px'}}>Nessun risultato con questi filtri.</p>
            ) : (
              <div className="stats-history">
                {filteredStats.map((s) => (
                  <div key={s.id} className="stats-row">
                    <div className="stats-row-body">
                      <div className="stats-idx">#{s.id}</div>
                      <div className="stats-name">{s.name}</div>
                      <div className="stats-badges">{getBadge(s.score30)}</div>
                      <div className="stats-meta">
                        <div className="stats-date">{s.date}</div>
                        <div className={`stats-score ${s.score30 >= 18 ? 'stats-score--good' : s.score30 >= 15 ? 'stats-score--ok' : 'stats-score--bad'}`}>
                          {s.score30} <span style={{fontSize: '0.7em', opacity: 0.6}}>/ 30</span>
                        </div>
                      </div>
                    </div>
                    <div className="mini-progress">
                      <div style={{width: `${(s.ok / s.tot)*100}%`, background: '#43d98c'}} />
                      <div style={{width: `${(s.simili / s.tot)*100}%`, background: '#ffc400'}} />
                      <div style={{width: `${(s.err / s.tot)*100}%`, background: '#ff5c6e'}} />
                      <div style={{width: `${(s.saltate / s.tot)*100}%`, background: 'rgba(255,255,255,0.06)'}} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
