import type { Segment, Level } from './levels';

export interface Skater {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  onGround: boolean;
  grindingSegIdx: number | null;
  dead: boolean;
  facingRight: boolean;
  trickTimer: number;
  currentTrick: string;
  jumpCooldown: number;
}

export interface PhysicsState {
  speed: number;          // m/s equivalent
  height: number;         // units above lowest point
  kineticEnergy: number;  // 0.5 * m * v^2 (m=1 for simplicity)
  potentialEnergy: number; // m * g * h
  totalEnergy: number;
  frictionForce: number;
  airResistance: number;
  slopeAngle: number;     // degrees
  momentum: number;
  distanceTraveled: number;
  airTime: number;
  maxSpeed: number;
  maxHeight: number;
}

const GROUND_Y_REF = 600; // reference y for height calc
const MASS = 1;
const SKATER_WIDTH = 28;
const SKATER_HEIGHT = 36;

export function createSkater(x: number, y: number): Skater {
  return {
    x, y,
    vx: 0, vy: 0,
    width: SKATER_WIDTH,
    height: SKATER_HEIGHT,
    onGround: false,
    grindingSegIdx: null,
    dead: false,
    facingRight: true,
    trickTimer: 0,
    currentTrick: '',
    jumpCooldown: 0,
  };
}

function segmentAngle(s: Segment) {
  return Math.atan2(s.y2 - s.y1, s.x2 - s.x1);
}

/** Project point onto segment, return {t, px, py, dist} */
function projectOntoSegment(px: number, py: number, s: Segment) {
  const dx = s.x2 - s.x1;
  const dy = s.y2 - s.y1;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return null;
  const t = Math.max(0, Math.min(1, ((px - s.x1) * dx + (py - s.y1) * dy) / len2));
  const cx = s.x1 + t * dx;
  const cy = s.y1 + t * dy;
  const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);
  return { t, px: cx, py: cy, dist };
}

export function stepPhysics(
  skater: Skater,
  keys: Record<string, boolean>,
  level: Level,
  dt: number,
  physState: PhysicsState
): { skater: Skater; phys: PhysicsState } {
  let { x, y, vx, vy, onGround, grindingSegIdx, dead, facingRight, trickTimer, currentTrick, jumpCooldown } = { ...skater };

  if (dead) return { skater, phys: physState };

  const g = level.gravity;
  const airDrag = level.airResistance;
  const baseFriction = level.baseFriction;

  // Push force
  const pushForce = 600;
  const maxSpeed = 700;

  if (keys['ArrowRight'] || keys['d']) {
    if (onGround && vx < maxSpeed) vx += pushForce * dt;
    facingRight = true;
  }
  if (keys['ArrowLeft'] || keys['a']) {
    if (onGround && vx > -maxSpeed * 0.7) vx -= pushForce * dt;
    facingRight = false;
  }

  // Jump
  if ((keys[' '] || keys['ArrowUp'] || keys['w']) && onGround && jumpCooldown <= 0) {
    vy = -620;
    onGround = false;
    jumpCooldown = 0.3;
    grindingSegIdx = null;
  }

  jumpCooldown = Math.max(0, jumpCooldown - dt);

  // Gravity
  if (!onGround) {
    vy += g * dt;
  }

  // Air drag
  vx *= (1 - airDrag * dt * 60);
  if (!onGround) {
    vy *= (1 - airDrag * 0.3 * dt * 60);
  }

  // Integrate position
  x += vx * dt;
  y += vy * dt;

  // --- Collision with segments ---
  let bestDist = Infinity;
  let bestSeg: Segment | null = null;
  let bestProj: { t: number; px: number; py: number; dist: number } | null = null;
  let bestIdx = -1;

  const footX = x;
  const footY = y + skater.height / 2 + 4; // foot point

  for (let i = 0; i < level.segments.length; i++) {
    const seg = level.segments[i];
    if (seg.type === 'wall') continue; // skip walls for now
    const proj = projectOntoSegment(footX, footY, seg);
    if (!proj) continue;
    if (proj.dist < bestDist) {
      bestDist = proj.dist;
      bestSeg = seg;
      bestProj = proj;
      bestIdx = i;
    }
  }

  const snapDist = 20;
  onGround = false;
  grindingSegIdx = null;

  if (bestSeg && bestProj && bestDist < snapDist && vy >= -50) {
    // Snap to surface
    const angle = segmentAngle(bestSeg);
    const nx = -Math.sin(angle); // normal x
    const ny = Math.cos(angle);  // normal y (pointing up)

    // Place skater on surface
    y = bestProj.py - ny * (skater.height / 2 + 4) - nx * 0;
    x = bestProj.px - nx * (skater.height / 2 + 4);
    // Actually just correct y based on surface
    y = bestProj.py - skater.height / 2 - 4;

    // Slope physics: decompose velocity along slope
    const tx = Math.cos(angle);
    const ty = Math.sin(angle);
    const vDotN = vx * nx + vy * ny; // velocity into surface

    // Remove normal component (collision response)
    if (vDotN < 0) {
      vx -= vDotN * nx;
      vy -= vDotN * ny;
    }

    // Gravity component along slope
    const gravSlope = g * Math.sin(angle);
    vx += gravSlope * tx * dt * 0.8;
    vy += gravSlope * ty * dt * 0.8;

    // Friction
    const segFriction = bestSeg.friction ?? baseFriction;
    const frictionMag = segFriction * MASS * g * Math.abs(Math.cos(angle));
    const speed = Math.sqrt(vx * vx + vy * vy);
    if (speed > 1) {
      const fx = -(vx / speed) * frictionMag * dt;
      const fy = -(vy / speed) * frictionMag * dt;
      // Only apply friction along slope
      const fDotT = fx * tx + fy * ty;
      vx += fDotT * tx;
      vy += fDotT * ty;
    }

    onGround = true;
    if (bestSeg.type === 'rail') {
      grindingSegIdx = bestIdx;
    }

    // Update physics state friction display
    physState.frictionForce = (bestSeg.friction ?? baseFriction) * MASS * g;
    physState.slopeAngle = angle * (180 / Math.PI);
  } else {
    physState.frictionForce = 0;
    physState.slopeAngle = 0;
  }

  // Boundary: don't go off left
  if (x < skater.width / 2) {
    x = skater.width / 2;
    vx = Math.abs(vx) * 0.3;
  }

  // Fall death
  if (y > 800) {
    dead = true;
  }

  // Trick detection
  if (trickTimer > 0) {
    trickTimer -= dt;
    if (trickTimer <= 0) currentTrick = '';
  }
  if (!onGround && Math.abs(vx) > 200 && Math.abs(vy) < 100 && trickTimer <= 0) {
    const tricks = ['Kickflip', 'Heelflip', 'Ollie', '360 Flip', 'Grind', 'Nollie'];
    currentTrick = tricks[Math.floor(Math.random() * tricks.length)];
    trickTimer = 1.2;
  }

  // Update physics display state
  const speed = Math.sqrt(vx * vx + vy * vy);
  const height = Math.max(0, GROUND_Y_REF - (y + skater.height / 2));
  const ke = 0.5 * MASS * speed * speed / 1000; // normalized
  const pe = MASS * (g / 100) * (height / 100) * 0.5; // normalized
  physState.speed = speed / 100; // to m/s equivalent
  physState.height = height / 100;
  physState.kineticEnergy = ke;
  physState.potentialEnergy = pe;
  physState.totalEnergy = ke + pe;
  physState.airResistance = airDrag * speed * speed / 100;
  physState.momentum = MASS * speed / 100;
  physState.maxSpeed = Math.max(physState.maxSpeed, physState.speed);
  physState.maxHeight = Math.max(physState.maxHeight, physState.height);
  if (!onGround) {
    physState.airTime += dt;
    physState.distanceTraveled += speed * dt / 100;
  }
  physState.distanceTraveled += onGround ? speed * dt / 100 : 0;

  return {
    skater: {
      x, y, vx, vy, onGround, grindingSegIdx, dead, facingRight,
      trickTimer, currentTrick, jumpCooldown,
      width: skater.width, height: skater.height,
    },
    phys: { ...physState },
  };
}

export function createPhysicsState(): PhysicsState {
  return {
    speed: 0,
    height: 0,
    kineticEnergy: 0,
    potentialEnergy: 0,
    totalEnergy: 0,
    frictionForce: 0,
    airResistance: 0,
    slopeAngle: 0,
    momentum: 0,
    distanceTraveled: 0,
    airTime: 0,
    maxSpeed: 0,
    maxHeight: 0,
  };
}
