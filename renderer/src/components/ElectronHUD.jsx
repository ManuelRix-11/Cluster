import React, { useEffect, useState } from 'react';

export function ElectronHUD({ showDragStrip = true }) {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    if (window.electronAPI) {
      setIsElectron(true);
    }
  }, []);

  if (!isElectron) return null;

  return (
    <>
      {showDragStrip && (
        <div 
          id="drag-strip" 
          style={{
          display: 'block',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '24px',
          zIndex: 200,
          WebkitAppRegion: 'drag'
        }}
      ></div>
      )}
      <div className="electron-hud">
        <button 
          className="hud-btn hud-min" 
          onClick={() => window.electronAPI.minimize()} 
          title="Minimizza"
        >
          &#8211;
        </button>
        <button 
          className="hud-btn hud-close" 
          onClick={() => window.electronAPI.close()} 
          title="Chiudi"
        >
          &#10005;
        </button>
      </div>
    </>
  );
}
