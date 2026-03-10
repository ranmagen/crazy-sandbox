import Matter from 'matter-js';
import { getEngine } from '../physics/engine';
import { getBodyPlugin } from '../physics/bodyFactory';
import { getBodyTemperature } from '../physics/collisionHandler';
import type { GaugeReading } from '../types/simulation.types';

export function readAllGauges(): GaugeReading[] {
  const engine = getEngine();
  const readings: GaugeReading[] = [];

  for (const body of Matter.Composite.allBodies(engine.world)) {
    const plugin = getBodyPlugin(body);
    if (!plugin || body.label === 'boundary') continue;

    const speed = Matter.Body.getSpeed(body);
    const temperature = getBodyTemperature(plugin.instanceId);

    readings.push({
      instanceId: plugin.instanceId,
      speed,
      temperature,
      force: { x: body.force.x, y: body.force.y },
    });
  }

  return readings;
}

export function readGaugeForBody(body: Matter.Body): GaugeReading | null {
  const plugin = getBodyPlugin(body);
  if (!plugin) return null;

  return {
    instanceId: plugin.instanceId,
    speed: Matter.Body.getSpeed(body),
    temperature: getBodyTemperature(plugin.instanceId),
    force: { x: body.force.x, y: body.force.y },
  };
}

export function getBodyScreenPosition(
  body: Matter.Body
): { x: number; y: number } {
  return { x: body.position.x, y: body.position.y };
}
