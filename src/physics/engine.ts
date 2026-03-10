import Matter from 'matter-js';

let _engine: Matter.Engine | null = null;
let _runner: Matter.Runner | null = null;

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 580;

export function getEngine(): Matter.Engine {
  if (!_engine) {
    _engine = Matter.Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 },
      constraintIterations: 4,
    });
  }
  return _engine;
}

export function getRunner(): Matter.Runner {
  if (!_runner) {
    _runner = Matter.Runner.create({ delta: 1000 / 60 });
  }
  return _runner;
}

export function startSimulation(): void {
  const engine = getEngine();
  const runner = getRunner();
  Matter.Runner.run(runner, engine);
}

export function stopSimulation(): void {
  const runner = getRunner();
  Matter.Runner.stop(runner);
}

export function resetWorld(): void {
  const engine = getEngine();
  Matter.Composite.clear(engine.world, false);
  addBoundaries();
}

export function addBoundaries(): void {
  const engine = getEngine();
  const thickness = 40;
  const walls = [
    // floor
    Matter.Bodies.rectangle(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT + thickness / 2,
      CANVAS_WIDTH + thickness * 2,
      thickness,
      { isStatic: true, label: 'boundary', friction: 0.4, restitution: 0.2 }
    ),
    // left wall
    Matter.Bodies.rectangle(
      -thickness / 2,
      CANVAS_HEIGHT / 2,
      thickness,
      CANVAS_HEIGHT + thickness * 2,
      { isStatic: true, label: 'boundary', friction: 0.4, restitution: 0.2 }
    ),
    // right wall
    Matter.Bodies.rectangle(
      CANVAS_WIDTH + thickness / 2,
      CANVAS_HEIGHT / 2,
      thickness,
      CANVAS_HEIGHT + thickness * 2,
      { isStatic: true, label: 'boundary', friction: 0.4, restitution: 0.2 }
    ),
  ];
  Matter.Composite.add(engine.world, walls);
}

export function destroyEngine(): void {
  if (_runner) {
    Matter.Runner.stop(_runner);
    _runner = null;
  }
  if (_engine) {
    Matter.Engine.clear(_engine);
    _engine = null;
  }
}

export { CANVAS_WIDTH, CANVAS_HEIGHT };
