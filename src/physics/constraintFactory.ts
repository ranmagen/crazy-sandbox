import Matter from 'matter-js';
import { getEngine } from './engine';

export function createSpringConstraint(
  bodyA: Matter.Body,
  bodyB: Matter.Body,
  stiffness = 0.02,
  damping = 0.1
): Matter.Constraint {
  const constraint = Matter.Constraint.create({
    bodyA,
    bodyB,
    stiffness,
    damping,
    length: Math.sqrt(
      Math.pow(bodyB.position.x - bodyA.position.x, 2) +
        Math.pow(bodyB.position.y - bodyA.position.y, 2)
    ),
  });
  Matter.Composite.add(getEngine().world, constraint);
  return constraint;
}

export function createPivotConstraint(
  body: Matter.Body,
  point: { x: number; y: number }
): Matter.Constraint {
  const constraint = Matter.Constraint.create({
    bodyA: body,
    pointB: point,
    stiffness: 1,
    length: 0,
  });
  Matter.Composite.add(getEngine().world, constraint);
  return constraint;
}

export function createFixedJoint(
  bodyA: Matter.Body,
  bodyB: Matter.Body
): Matter.Constraint {
  const constraint = Matter.Constraint.create({
    bodyA,
    bodyB,
    stiffness: 1,
    length: 0,
  });
  Matter.Composite.add(getEngine().world, constraint);
  return constraint;
}
