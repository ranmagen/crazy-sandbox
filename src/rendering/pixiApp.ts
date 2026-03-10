import { Application } from 'pixi.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../physics/engine';

let _app: Application | null = null;

export async function initPixiApp(canvas: HTMLCanvasElement): Promise<Application> {
  if (_app) return _app;

  _app = new Application();
  await _app.init({
    canvas,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    backgroundColor: 0xF5F5F0,
    antialias: true,
    resolution: window.devicePixelRatio ?? 1,
    autoDensity: true,
  });

  return _app;
}

export function getPixiApp(): Application {
  if (!_app) throw new Error('PixiJS not initialized');
  return _app;
}

export function destroyPixiApp(): void {
  if (_app) {
    _app.destroy(false, { children: true });
    _app = null;
  }
}
