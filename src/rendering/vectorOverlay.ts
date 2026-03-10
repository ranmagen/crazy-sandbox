import { Graphics, Container } from 'pixi.js';
import Matter from 'matter-js';
import { getEngine } from '../physics/engine';
import { getPixiApp } from './pixiApp';

let overlayContainer: Container | null = null;
let overlayGraphics: Graphics | null = null;

export function initVectorOverlay(): void {
  const app = getPixiApp();
  overlayContainer = new Container();
  overlayGraphics = new Graphics();
  overlayContainer.addChild(overlayGraphics);
  app.stage.addChild(overlayContainer);
  overlayContainer.visible = false;
}

export function setXRayVisible(visible: boolean): void {
  if (overlayContainer) overlayContainer.visible = visible;
}

export function drawVectors(): void {
  if (!overlayGraphics || !overlayContainer?.visible) return;

  overlayGraphics.clear();
  const engine = getEngine();
  const bodies = Matter.Composite.allBodies(engine.world);

  for (const body of bodies) {
    if (body.isStatic || body.label === 'boundary') continue;

    const { x, y } = body.position;
    const vx = body.velocity.x;
    const vy = body.velocity.y;
    const speed = Math.sqrt(vx * vx + vy * vy);

    if (speed > 0.1) {
      drawArrow(overlayGraphics, x, y, x + vx * 8, y + vy * 8, 0x00E676); // velocity = green
    }

    // Force arrow (approximated from acceleration)
    const fx = body.force.x * 1e6;
    const fy = body.force.y * 1e6;
    const fmag = Math.sqrt(fx * fx + fy * fy);
    if (fmag > 0.5) {
      drawArrow(overlayGraphics, x, y, x + fx, y + fy, 0xFF5252); // force = red
    }
  }
}

function drawArrow(
  g: Graphics,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: number
): void {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return;

  g.setStrokeStyle({ width: 2, color });
  g.moveTo(x1, y1);
  g.lineTo(x2, y2);
  g.stroke();

  // Arrowhead
  const angle = Math.atan2(dy, dx);
  const headLen = 8;
  g.beginFill(color);
  g.moveTo(x2, y2);
  g.lineTo(
    x2 - headLen * Math.cos(angle - 0.4),
    y2 - headLen * Math.sin(angle - 0.4)
  );
  g.lineTo(
    x2 - headLen * Math.cos(angle + 0.4),
    y2 - headLen * Math.sin(angle + 0.4)
  );
  g.closePath();
  g.endFill();
}
