import { useSimulationStore } from '../../store/simulationStore';
import { usePhysicsEngine } from '../../hooks/usePhysicsEngine';
import { useXRayMode } from '../../hooks/useXRayMode';
import { clearAllSprites } from '../../rendering/bodyRenderer';
import { clearTemperatures } from '../../physics/collisionHandler';
import './CanvasToolbar.css';

export function CanvasToolbar() {
  const isPlaying = useSimulationStore((s) => s.isPlaying);
  const play = useSimulationStore((s) => s.play);
  const pause = useSimulationStore((s) => s.pause);
  const { handleReset } = usePhysicsEngine();
  const { isXRayMode, toggleXRay } = useXRayMode();

  const handleReset2 = () => {
    clearAllSprites();
    clearTemperatures();
    handleReset();
  };

  return (
    <div className="canvas-toolbar">
      <div className="toolbar-left">
        <button
          className={`toolbar-btn play-btn ${isPlaying ? 'active' : ''}`}
          onClick={() => (isPlaying ? pause() : play())}
          title={isPlaying ? 'Pause simulation' : 'Play simulation'}
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          className="toolbar-btn reset-btn"
          onClick={handleReset2}
          title="Reset canvas"
        >
          ↺ Reset
        </button>
      </div>

      <div className="toolbar-center">
        <span className="toolbar-title">The Workbench</span>
      </div>

      <div className="toolbar-right">
        <button
          className={`toolbar-btn xray-btn ${isXRayMode ? 'active' : ''}`}
          onClick={toggleXRay}
          title="Toggle X-Ray force/velocity vectors"
        >
          ⚡ X-Ray
        </button>
      </div>
    </div>
  );
}
