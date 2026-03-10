import Matter from 'matter-js';
import { getEngine } from './engine';
import { getBodyPlugin } from './bodyFactory';

const MAGNET_RANGE = 200;
const MAGNET_STRENGTH = 0.00015;
const BLOWER_FORCE = 0.0005;

export function applyMagneticForces(): void {
  const engine = getEngine();
  const bodies = Matter.Composite.allBodies(engine.world);

  const magnets = bodies.filter((b) => {
    const plugin = getBodyPlugin(b);
    return plugin?.tags.includes('magnet');
  });

  const magnetic = bodies.filter((b) => {
    const plugin = getBodyPlugin(b);
    return plugin?.materialId === 'steel' && !plugin?.tags.includes('magnet');
  });

  for (const magnet of magnets) {
    for (const target of magnetic) {
      const dx = magnet.position.x - target.position.x;
      const dy = magnet.position.y - target.position.y;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq);

      if (dist < MAGNET_RANGE && dist > 1) {
        // Inverse-square attraction
        const forceMag = MAGNET_STRENGTH / distSq;
        const fx = (dx / dist) * forceMag;
        const fy = (dy / dist) * forceMag;
        Matter.Body.applyForce(target, target.position, { x: fx, y: fy });
      }
    }
  }
}

export function applyBlowerForces(): void {
  const engine = getEngine();
  const bodies = Matter.Composite.allBodies(engine.world);

  const blowers = bodies.filter((b) => {
    const plugin = getBodyPlugin(b);
    return plugin?.tags.includes('blower');
  });

  for (const blower of blowers) {
    // Blower emits force upward from its position
    const blowerAngle = blower.angle - Math.PI / 2; // face "up" relative to rotation
    const forceDir = { x: Math.cos(blowerAngle), y: Math.sin(blowerAngle) };
    const blowerRange = 150;

    for (const body of bodies) {
      if (body === blower || body.isStatic) continue;
      const dx = body.position.x - blower.position.x;
      const dy = body.position.y - blower.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < blowerRange) {
        const falloff = 1 - dist / blowerRange;
        Matter.Body.applyForce(body, body.position, {
          x: forceDir.x * BLOWER_FORCE * falloff,
          y: forceDir.y * BLOWER_FORCE * falloff,
        });
      }
    }
  }
}
