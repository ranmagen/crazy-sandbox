export interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: 'ground' | 'ramp' | 'rail' | 'wall';
  friction?: number; // override friction for this segment
}

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'box' | 'stair' | 'rail_platform';
}

export interface Collectible {
  x: number;
  y: number;
  radius: number;
  collected: boolean;
  points: number;
}

export interface Level {
  id: number;
  name: string;
  nameHe: string;
  description: string;
  width: number;
  spawnX: number;
  spawnY: number;
  segments: Segment[];
  obstacles: Obstacle[];
  collectibles: Collectible[];
  goalX: number;
  gravity: number;
  airResistance: number;
  baseFriction: number;
  tips: string[];
}

function buildLevel1(): Level {
  const segs: Segment[] = [
    // flat start
    { x1: 0, y1: 500, x2: 300, y2: 500, type: 'ground' },
    // small ramp up
    { x1: 300, y1: 500, x2: 450, y2: 420, type: 'ramp' },
    // flat top
    { x1: 450, y1: 420, x2: 600, y2: 420, type: 'ground' },
    // ramp down
    { x1: 600, y1: 420, x2: 750, y2: 500, type: 'ramp' },
    // flat section
    { x1: 750, y1: 500, x2: 1100, y2: 500, type: 'ground' },
    // second ramp up
    { x1: 1100, y1: 500, x2: 1300, y2: 360, type: 'ramp' },
    // flat top
    { x1: 1300, y1: 360, x2: 1450, y2: 360, type: 'ground' },
    // ramp down
    { x1: 1450, y1: 360, x2: 1650, y2: 500, type: 'ground' },
    // finish area
    { x1: 1650, y1: 500, x2: 2000, y2: 500, type: 'ground' },
  ];

  const collectibles: Collectible[] = [
    { x: 200, y: 460, radius: 12, collected: false, points: 10 },
    { x: 520, y: 380, radius: 12, collected: false, points: 20 },
    { x: 900, y: 460, radius: 12, collected: false, points: 10 },
    { x: 1370, y: 320, radius: 12, collected: false, points: 20 },
    { x: 1750, y: 460, radius: 12, collected: false, points: 10 },
  ];

  return {
    id: 1,
    name: 'Beginners Park',
    nameHe: 'פארק מתחילים',
    description: 'Learn the basics: push, jump, and ride ramps!',
    width: 2000,
    spawnX: 80,
    spawnY: 460,
    segments: segs,
    obstacles: [],
    collectibles,
    goalX: 1900,
    gravity: 1500,
    airResistance: 0.01,
    baseFriction: 0.25,
    tips: [
      '← → to move',
      'Space or ↑ to jump',
      'Collect all coins for bonus',
    ],
  };
}

function buildLevel2(): Level {
  const segs: Segment[] = [
    // flat start
    { x1: 0, y1: 520, x2: 200, y2: 520, type: 'ground' },
    // half-pipe left wall
    { x1: 200, y1: 520, x2: 280, y2: 320, type: 'ramp' },
    { x1: 280, y1: 320, x2: 300, y2: 280, type: 'ramp' }, // near-vertical top
    // half-pipe bottom
    { x1: 300, y1: 280, x2: 300, y2: 520, type: 'wall' },
    { x1: 200, y1: 520, x2: 700, y2: 520, type: 'ground' },
    // half-pipe right
    { x1: 620, y1: 520, x2: 700, y2: 320, type: 'ramp' },
    { x1: 700, y1: 320, x2: 720, y2: 280, type: 'ramp' },
    // between pipes flat
    { x1: 720, y1: 520, x2: 1200, y2: 520, type: 'ground' },
    // big ramp
    { x1: 1200, y1: 520, x2: 1500, y2: 280, type: 'ramp' },
    { x1: 1500, y1: 280, x2: 1700, y2: 280, type: 'ground' },
    { x1: 1700, y1: 280, x2: 1900, y2: 520, type: 'ramp' },
    { x1: 1900, y1: 520, x2: 2400, y2: 520, type: 'ground' },
  ];

  const collectibles: Collectible[] = [
    { x: 100, y: 480, radius: 12, collected: false, points: 10 },
    { x: 450, y: 280, radius: 14, collected: false, points: 30 }, // airborne
    { x: 950, y: 480, radius: 12, collected: false, points: 10 },
    { x: 1350, y: 400, radius: 14, collected: false, points: 25 },
    { x: 1600, y: 240, radius: 16, collected: false, points: 50 }, // top bonus
    { x: 2100, y: 480, radius: 12, collected: false, points: 10 },
  ];

  return {
    id: 2,
    name: 'Half-Pipe Heaven',
    nameHe: 'גן חצי הצינור',
    description: 'Master the half-pipe and gain air! Energy conservation in action.',
    width: 2400,
    spawnX: 80,
    spawnY: 480,
    segments: segs,
    obstacles: [],
    collectibles,
    goalX: 2300,
    gravity: 1500,
    airResistance: 0.008,
    baseFriction: 0.2,
    tips: [
      'Pump for speed going down',
      'Watch KE convert to PE on ramps',
      'Hit the air coins!',
    ],
  };
}

function buildLevel3(): Level {
  const segs: Segment[] = [
    { x1: 0, y1: 480, x2: 400, y2: 480, type: 'ground' },
    // stairs section (simulated as descending steps)
    { x1: 400, y1: 480, x2: 450, y2: 480, type: 'ground' },
    { x1: 450, y1: 480, x2: 450, y2: 520, type: 'wall' },
    { x1: 450, y1: 520, x2: 500, y2: 520, type: 'ground' },
    { x1: 500, y1: 520, x2: 500, y2: 560, type: 'wall' },
    { x1: 500, y1: 560, x2: 550, y2: 560, type: 'ground' },
    { x1: 550, y1: 560, x2: 550, y2: 600, type: 'wall' },
    { x1: 550, y1: 600, x2: 700, y2: 600, type: 'ground' },
    // icy section (low friction)
    { x1: 700, y1: 600, x2: 1000, y2: 600, type: 'ground', friction: 0.05 },
    // uphill
    { x1: 1000, y1: 600, x2: 1200, y2: 420, type: 'ramp' },
    { x1: 1200, y1: 420, x2: 1500, y2: 420, type: 'ground' },
    // rail section (very low friction, fast)
    { x1: 1500, y1: 420, x2: 1800, y2: 350, type: 'rail', friction: 0.02 },
    { x1: 1800, y1: 350, x2: 1900, y2: 420, type: 'ramp' },
    { x1: 1900, y1: 420, x2: 2500, y2: 420, type: 'ground' },
  ];

  const collectibles: Collectible[] = [
    { x: 200, y: 440, radius: 12, collected: false, points: 10 },
    { x: 470, y: 440, radius: 14, collected: false, points: 20 },
    { x: 850, y: 560, radius: 14, collected: false, points: 25 },
    { x: 1100, y: 380, radius: 14, collected: false, points: 25 },
    { x: 1650, y: 300, radius: 16, collected: false, points: 40 },
    { x: 2200, y: 380, radius: 12, collected: false, points: 10 },
  ];

  return {
    id: 3,
    name: 'Street Chaos',
    nameHe: 'כאוס ברחוב',
    description: 'Stairs, ice, and rails! Friction changes everything.',
    width: 2500,
    spawnX: 80,
    spawnY: 440,
    segments: segs,
    obstacles: [],
    collectibles,
    goalX: 2400,
    gravity: 1600,
    airResistance: 0.012,
    baseFriction: 0.3,
    tips: [
      'Ice section: barely any friction!',
      'Rail grinding: super fast',
      'Stairs cost speed',
    ],
  };
}

function buildLevel4(): Level {
  const segs: Segment[] = [
    { x1: 0, y1: 560, x2: 100, y2: 560, type: 'ground' },
    // mega ramp
    { x1: 100, y1: 560, x2: 600, y2: 200, type: 'ramp' },
    { x1: 600, y1: 200, x2: 800, y2: 200, type: 'ground' },
    // gap (no floor - must jump!)
    // landing
    { x1: 1100, y1: 300, x2: 1400, y2: 300, type: 'ground' },
    { x1: 1400, y1: 300, x2: 1600, y2: 500, type: 'ramp' },
    { x1: 1600, y1: 500, x2: 1900, y2: 500, type: 'ground' },
    { x1: 1900, y1: 500, x2: 2100, y2: 200, type: 'ramp' },
    { x1: 2100, y1: 200, x2: 2400, y2: 200, type: 'ground' },
    { x1: 2400, y1: 200, x2: 2600, y2: 500, type: 'ramp' },
    { x1: 2600, y1: 500, x2: 3000, y2: 500, type: 'ground' },
  ];

  const collectibles: Collectible[] = [
    { x: 300, y: 380, radius: 14, collected: false, points: 20 },
    { x: 700, y: 160, radius: 16, collected: false, points: 40 },
    { x: 950, y: 200, radius: 20, collected: false, points: 100 }, // airborne!
    { x: 1250, y: 260, radius: 14, collected: false, points: 30 },
    { x: 2000, y: 160, radius: 16, collected: false, points: 40 },
    { x: 2800, y: 460, radius: 14, collected: false, points: 20 },
  ];

  return {
    id: 4,
    name: 'Big Air',
    nameHe: 'אוויר גדול',
    description: 'Mega ramps and huge jumps! Watch your speed.',
    width: 3000,
    spawnX: 50,
    spawnY: 520,
    segments: segs,
    obstacles: [],
    collectibles,
    goalX: 2900,
    gravity: 1800,
    airResistance: 0.008,
    baseFriction: 0.2,
    tips: [
      'Build speed on the mega ramp',
      'Time your jump over the gap',
      'KE → PE → KE on loops',
    ],
  };
}

function buildLevel5(): Level {
  const segs: Segment[] = [
    { x1: 0, y1: 500, x2: 150, y2: 500, type: 'ground' },
    { x1: 150, y1: 500, x2: 350, y2: 300, type: 'ramp' },
    { x1: 350, y1: 300, x2: 500, y2: 300, type: 'ground' },
    { x1: 500, y1: 300, x2: 700, y2: 500, type: 'ramp' },
    { x1: 700, y1: 500, x2: 900, y2: 500, type: 'ground', friction: 0.05 },
    { x1: 900, y1: 500, x2: 1000, y2: 340, type: 'ramp' },
    { x1: 1000, y1: 340, x2: 1200, y2: 340, type: 'rail', friction: 0.02 },
    { x1: 1200, y1: 340, x2: 1350, y2: 500, type: 'ramp' },
    { x1: 1350, y1: 500, x2: 1500, y2: 500, type: 'ground' },
    { x1: 1500, y1: 500, x2: 1700, y2: 180, type: 'ramp' },
    { x1: 1700, y1: 180, x2: 1900, y2: 180, type: 'ground' },
    // gap
    { x1: 2100, y1: 280, x2: 2400, y2: 280, type: 'ground' },
    { x1: 2400, y1: 280, x2: 2600, y2: 500, type: 'ramp' },
    { x1: 2600, y1: 500, x2: 2800, y2: 500, type: 'ground', friction: 0.05 },
    { x1: 2800, y1: 500, x2: 3000, y2: 300, type: 'ramp' },
    { x1: 3000, y1: 300, x2: 3500, y2: 300, type: 'ground' },
  ];

  const collectibles: Collectible[] = [
    { x: 250, y: 400, radius: 12, collected: false, points: 15 },
    { x: 425, y: 260, radius: 14, collected: false, points: 30 },
    { x: 800, y: 460, radius: 14, collected: false, points: 25 },
    { x: 1100, y: 300, radius: 16, collected: false, points: 40 },
    { x: 1800, y: 140, radius: 18, collected: false, points: 60 },
    { x: 2000, y: 200, radius: 20, collected: false, points: 100 }, // gap coin
    { x: 2900, y: 460, radius: 14, collected: false, points: 25 },
    { x: 3200, y: 260, radius: 16, collected: false, points: 40 },
  ];

  return {
    id: 5,
    name: 'Pro Circuit',
    nameHe: 'מסלול פרו',
    description: 'Everything combined. Only the pros survive!',
    width: 3500,
    spawnX: 60,
    spawnY: 460,
    segments: segs,
    obstacles: [],
    collectibles,
    goalX: 3400,
    gravity: 1600,
    airResistance: 0.01,
    baseFriction: 0.22,
    tips: [
      'Mix all your skills',
      'Gap coin = high risk, high reward',
      'Manage your energy wisely',
    ],
  };
}

export const LEVELS: Level[] = [
  buildLevel1(),
  buildLevel2(),
  buildLevel3(),
  buildLevel4(),
  buildLevel5(),
];
