import { InventoryPanel } from '../inventory/InventoryPanel';
import { SimulationCanvas } from '../canvas/SimulationCanvas';
import { CanvasToolbar } from '../canvas/CanvasToolbar';
import { GaugeOverlay } from '../canvas/GaugeWidget';
import { ControlPanel } from '../controls/ControlPanel';
import './AppLayout.css';

export function AppLayout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <span className="app-logo">⚗️</span>
        <span className="app-name">Crazy Sandbox</span>
        <span className="app-tagline">Physics Lab for Curious Minds</span>
      </header>

      <div className="app-body">
        <aside className="panel panel-left">
          <InventoryPanel />
        </aside>

        <main className="panel panel-center">
          <CanvasToolbar />
          <div className="canvas-area">
            <SimulationCanvas />
            <GaugeOverlay />
          </div>
        </main>

        <aside className="panel panel-right">
          <ControlPanel />
        </aside>
      </div>
    </div>
  );
}
