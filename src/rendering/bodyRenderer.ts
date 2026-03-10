import { Graphics, Container, Text, TextStyle } from 'pixi.js';
import Matter from 'matter-js';
import { getEngine } from '../physics/engine';
import { getPixiApp } from './pixiApp';
import { getMaterial } from '../data/materialRegistry';
import { getPartDefinition } from '../data/partRegistry';
import { getBodyPlugin } from '../physics/bodyFactory';
import type { MaterialId } from '../types/material.types';

const spriteMap = new Map<number, Graphics>();
const labelMap = new Map<number, Text>();
let worldContainer: Container;
let initialized = false;

export function initBodyRenderer(): void {
  if (initialized) return;
  const app = getPixiApp();
  worldContainer = new Container();
  app.stage.addChild(worldContainer);
  initialized = true;
}

export function addBodySprite(body: Matter.Body, definitionId?: string): void {
  if (spriteMap.has(body.id)) return;

  const plugin = getBodyPlugin(body);
  let fillColor = 0xAAAAAA;
  let strokeColor = 0x666666;

  if (plugin?.materialId) {
    try {
      const mat = getMaterial(plugin.materialId as MaterialId);
      fillColor = mat.fillColor;
      strokeColor = mat.strokeColor;
    } catch {
      // unknown material, use defaults
    }
  }

  const g = new Graphics();
  drawBodyGraphic(g, body, fillColor, strokeColor);
  spriteMap.set(body.id, g);
  worldContainer.addChild(g);

  // Add small label
  if (definitionId) {
    try {
      const def = getPartDefinition(definitionId);
      const style = new TextStyle({ fontSize: 9, fill: 0xFFFFFF, fontWeight: 'bold' });
      const label = new Text({ text: def.label, style });
      label.anchor.set(0.5);
      labelMap.set(body.id, label);
      worldContainer.addChild(label);
    } catch {
      // ignore
    }
  }
}

function drawBodyGraphic(
  g: Graphics,
  body: Matter.Body,
  fill: number,
  stroke: number
): void {
  g.clear();

  const verts = body.vertices;
  if (!verts || verts.length === 0) return;

  // Draw relative to body center (position is set via g.position)
  g.setStrokeStyle({ width: 2, color: stroke });
  g.beginFill(fill);

  // Translate vertices relative to body position
  const cx = body.position.x;
  const cy = body.position.y;

  g.moveTo(verts[0].x - cx, verts[0].y - cy);
  for (let i = 1; i < verts.length; i++) {
    g.lineTo(verts[i].x - cx, verts[i].y - cy);
  }
  g.closePath();
  g.endFill();
}

export function removeBodySprite(bodyId: number): void {
  const g = spriteMap.get(bodyId);
  if (g) {
    worldContainer?.removeChild(g);
    g.destroy();
    spriteMap.delete(bodyId);
  }
  const label = labelMap.get(bodyId);
  if (label) {
    worldContainer?.removeChild(label);
    label.destroy();
    labelMap.delete(bodyId);
  }
}

export function syncBodiesToSprites(): void {
  const engine = getEngine();
  for (const body of Matter.Composite.allBodies(engine.world)) {
    const g = spriteMap.get(body.id);
    if (!g) continue;
    g.position.set(body.position.x, body.position.y);
    g.rotation = body.angle;

    const label = labelMap.get(body.id);
    if (label) {
      label.position.set(body.position.x, body.position.y);
      label.rotation = body.angle;
    }

    // Flash ignited bodies red
    const plugin = getBodyPlugin(body);
    if (plugin?.isIgnited) {
      const time = Date.now();
      const flash = Math.sin(time / 100) > 0;
      g.tint = flash ? 0xFF4444 : 0xFF8800;
    } else {
      g.tint = 0xFFFFFF;
    }
  }
}

export function clearAllSprites(): void {
  spriteMap.forEach((g) => g.destroy());
  spriteMap.clear();
  labelMap.forEach((l) => l.destroy());
  labelMap.clear();
  if (worldContainer) worldContainer.removeChildren();
}

export function isInitialized(): boolean {
  return initialized;
}

export function resetRenderer(): void {
  initialized = false;
}
