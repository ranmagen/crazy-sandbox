import { useRef, useEffect } from 'react';
import { usePixiApp } from '../../hooks/usePixiApp';
import { useSimulationLoop } from '../../hooks/useSimulationLoop';
import { useDragToDrop } from '../../hooks/useDragToDrop';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../physics/engine';
import './SimulationCanvas.css';

export function SimulationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRectRef = useRef<DOMRect | null>(null);

  usePixiApp(canvasRef);
  useSimulationLoop();

  const { handleDrop, handleDragOver } = useDragToDrop(canvasRectRef);

  useEffect(() => {
    const updateRect = () => {
      if (canvasRef.current) {
        canvasRectRef.current = canvasRef.current.getBoundingClientRect();
      }
    };
    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, []);

  return (
    <div
      className="simulation-canvas-wrapper"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="simulation-canvas"
      />
    </div>
  );
}
