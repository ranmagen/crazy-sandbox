import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { DataExplorer } from './data-explorer/DataExplorer';
import './App.css';

type AppMode = 'physics' | 'data';

export default function App() {
  const [mode, setMode] = useState<AppMode>('physics');

  return (
    <div className="app-root">
      <nav className="app-nav" dir="rtl">
        <div className="nav-brand">
          <span className="nav-logo">🔬</span>
          <span className="nav-name">Crazy Sandbox</span>
        </div>
        <div className="nav-tabs">
          <button
            className={`nav-tab ${mode === 'physics' ? 'active' : ''}`}
            onClick={() => setMode('physics')}
          >
            ⚗️ פיזיקה
          </button>
          <button
            className={`nav-tab ${mode === 'data' ? 'active' : ''}`}
            onClick={() => setMode('data')}
          >
            📊 חקר נתונים
          </button>
        </div>
      </nav>

      <div className="app-content">
        {mode === 'physics' ? <AppLayout /> : <DataExplorer />}
      </div>
    </div>
  );
}
