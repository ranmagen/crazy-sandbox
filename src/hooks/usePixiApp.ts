import { useEffect, useRef } from 'react';
import { initPixiApp, destroyPixiApp } from '../rendering/pixiApp';
import { initBodyRenderer } from '../rendering/bodyRenderer';
import { initVectorOverlay } from '../rendering/vectorOverlay';

export function usePixiApp(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!canvasRef.current || initialized.current) return;

    initialized.current = true;

    initPixiApp(canvasRef.current).then(() => {
      initBodyRenderer();
      initVectorOverlay();
    });

    return () => {
      destroyPixiApp();
      initialized.current = false;
    };
  }, [canvasRef]);
}
