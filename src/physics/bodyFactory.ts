import Matter from 'matter-js';
import type { PartInstance } from '../types/part.types';
import { getMaterial } from '../data/materialRegistry';
import { getPartDefinition } from '../data/partRegistry';
import { getEngine } from './engine';

export interface BodyPlugin {
  instanceId: string;
  materialId: string;
  tags: string[];
  temperature: number;
  isIgnited: boolean;
}

export function createBodyFromInstance(instance: PartInstance): Matter.Body {
  const def = getPartDefinition(instance.definitionId);
  const mat = getMaterial(def.materialId);
  const overrides = instance.propertyOverrides;

  const bodyOptions = {
    density: overrides.density ?? mat.density,
    restitution: overrides.restitution ?? mat.restitution,
    friction: overrides.friction ?? mat.friction,
    frictionAir: overrides.frictionAir ?? mat.frictionAir,
    frictionStatic: overrides.frictionStatic ?? mat.frictionStatic,
    isStatic: overrides.isStatic ?? mat.isStatic,
    label: instance.instanceId,
    plugin: {
      instanceId: instance.instanceId,
      materialId: overrides.id ?? def.materialId,
      tags: def.tags,
      temperature: instance.temperature,
      isIgnited: instance.isIgnited,
    } satisfies BodyPlugin,
  };

  let body: Matter.Body;
  if (def.shape === 'circle' && def.radius) {
    body = Matter.Bodies.circle(
      instance.position.x,
      instance.position.y,
      def.radius,
      bodyOptions
    );
  } else {
    body = Matter.Bodies.rectangle(
      instance.position.x,
      instance.position.y,
      def.width,
      def.height,
      bodyOptions
    );
  }

  Matter.Body.setAngle(body, instance.angle);
  return body;
}

export function addBodyToWorld(body: Matter.Body): void {
  Matter.Composite.add(getEngine().world, body);
}

export function removeBodyFromWorld(body: Matter.Body): void {
  Matter.Composite.remove(getEngine().world, body);
}

export function getBodyPlugin(body: Matter.Body): BodyPlugin | null {
  return (body.plugin as BodyPlugin) ?? null;
}
