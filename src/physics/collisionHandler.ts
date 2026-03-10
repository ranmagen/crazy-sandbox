import Matter from 'matter-js';
import { getEngine } from './engine';
import { getBodyPlugin } from './bodyFactory';

const HEAT_TRANSFER_RATE = 0.5; // degrees per collision
const IGNITE_TEMP = 230;

// instanceId -> current temperature
const temperatureMap = new Map<string, number>();

export function initCollisionHandler(): void {
  const engine = getEngine();

  Matter.Events.on(engine, 'collisionStart', (event) => {
    for (const pair of event.pairs) {
      const plugA = getBodyPlugin(pair.bodyA);
      const plugB = getBodyPlugin(pair.bodyB);

      // Rubber shock absorption: damp velocity on contact
      if (plugA?.materialId === 'rubber' || plugB?.materialId === 'rubber') {
        const targetBody = plugA?.materialId === 'rubber' ? pair.bodyB : pair.bodyA;
        Matter.Body.setVelocity(targetBody, {
          x: targetBody.velocity.x * 0.7,
          y: targetBody.velocity.y * 0.7,
        });
      }

      // Heat transfer from ignited bodies
      if (plugA?.isIgnited) transferHeat(pair.bodyB, plugB);
      if (plugB?.isIgnited) transferHeat(pair.bodyA, plugA);
    }
  });
}

function transferHeat(_body: Matter.Body, plugin: ReturnType<typeof getBodyPlugin>): void {
  if (!plugin) return;
  const current = temperatureMap.get(plugin.instanceId) ?? 20;
  const next = Math.min(current + HEAT_TRANSFER_RATE * 60, 1000);
  temperatureMap.set(plugin.instanceId, next);

  if (plugin.materialId === 'wood' && next >= IGNITE_TEMP && !plugin.isIgnited) {
    plugin.isIgnited = true;
  }
}

export function getBodyTemperature(instanceId: string): number {
  return temperatureMap.get(instanceId) ?? 20;
}

export function setBodyTemperature(instanceId: string, temp: number): void {
  temperatureMap.set(instanceId, temp);
}

export function clearTemperatures(): void {
  temperatureMap.clear();
}
