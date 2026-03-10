import Matter from 'matter-js';
import type { BlocklyRule } from '../types/rule.types';
import { getEngine } from './engine';
import { getBodyPlugin } from './bodyFactory';
import { getBodyTemperature, setBodyTemperature } from './collisionHandler';

export function evaluateRules(rules: BlocklyRule[]): void {
  if (rules.length === 0) return;

  const engine = getEngine();
  const bodies = Matter.Composite.allBodies(engine.world);

  for (const body of bodies) {
    if (body.isStatic || body.label === 'boundary') continue;

    for (const rule of rules) {
      if (evaluateConditions(body, rule, engine)) {
        applyActions(body, rule, engine);
      }
    }
  }
}

function evaluateConditions(
  body: Matter.Body,
  rule: BlocklyRule,
  engine: Matter.Engine
): boolean {
  const plugin = getBodyPlugin(body);

  return rule.conditions.every((cond) => {
    switch (cond.type) {
      case 'material-equals':
        return plugin?.materialId === cond.value;

      case 'touching-tag':
        return isBodyTouchingTag(body, cond.value, engine);

      case 'velocity-above': {
        const speed = Matter.Body.getSpeed(body);
        return speed > Number(cond.value);
      }

      case 'temperature-above': {
        const temp = plugin ? getBodyTemperature(plugin.instanceId) : 20;
        return temp > Number(cond.value);
      }

      case 'is-ignited':
        return plugin?.isIgnited === true;

      default:
        return false;
    }
  });
}

function isBodyTouchingTag(
  body: Matter.Body,
  tag: string,
  engine: Matter.Engine
): boolean {
  const pairs = engine.pairs as unknown as { list: Matter.Pair[] };
  const activePairs = pairs?.list ?? [];

  return activePairs.some((pair) => {
    const isA = pair.bodyA === body;
    const isB = pair.bodyB === body;
    if (!isA && !isB) return false;

    const other = isA ? pair.bodyB : pair.bodyA;
    const otherPlugin = getBodyPlugin(other);
    return otherPlugin?.tags.includes(tag) ?? false;
  });
}

function applyActions(
  body: Matter.Body,
  rule: BlocklyRule,
  _engine: Matter.Engine
): void {
  const plugin = getBodyPlugin(body);

  for (const action of rule.actions) {
    switch (action.type) {
      case 'apply-force':
        Matter.Body.applyForce(body, body.position, {
          x: Number(action.params.fx ?? 0),
          y: Number(action.params.fy ?? 0),
        });
        break;

      case 'set-friction':
        body.friction = Number(action.params.value ?? 0.1);
        break;

      case 'set-velocity':
        Matter.Body.setVelocity(body, {
          x: Number(action.params.vx ?? 0),
          y: Number(action.params.vy ?? 0),
        });
        break;

      case 'add-temperature':
        if (plugin) {
          const current = getBodyTemperature(plugin.instanceId);
          setBodyTemperature(plugin.instanceId, current + Number(action.params.amount ?? 1));
        }
        break;

      case 'ignite':
        if (plugin) {
          plugin.isIgnited = true;
        }
        break;

      case 'set-property':
        if (action.params.key === 'friction') {
          body.friction = Number(action.params.value);
        } else if (action.params.key === 'restitution') {
          body.restitution = Number(action.params.value);
        }
        break;
    }
  }
}
