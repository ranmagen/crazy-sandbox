import type { Challenge } from '../types/simulation.types';

export const challenges: Challenge[] = [
  {
    id: 'challenge-001',
    title: 'The Bouncy Ball',
    description:
      'Drop a rubber chunk from the top of the screen and make it bounce at least 3 times before coming to rest.',
    objectives: [
      { id: 'obj-place-rubber', description: 'Place a Rubber Chunk on the canvas', completed: false },
      { id: 'obj-play', description: 'Press Play and let the simulation run', completed: false },
      { id: 'obj-bounce', description: 'Observe 3+ bounces', completed: false },
    ],
    hint: 'Rubber has very high restitution (elasticity). Drop it from a height!',
  },
  {
    id: 'challenge-002',
    title: 'Magnetic Attraction',
    description:
      'Use a magnet to lift an iron ingot off the floor without touching it manually.',
    objectives: [
      { id: 'obj-place-ingot', description: 'Place an Iron Ingot on the floor', completed: false },
      { id: 'obj-place-magnet', description: 'Place a Magnet above the ingot', completed: false },
      { id: 'obj-attract', description: 'The magnet pulls the ingot upward', completed: false },
    ],
    hint: 'Steel is magnetic! Position the magnet directly above the ingot within 200 units.',
  },
  {
    id: 'challenge-003',
    title: 'The Slippery Slope',
    description:
      'Build a ramp using an ice block and see how a wood block slides down compared to a rubber chunk.',
    objectives: [
      { id: 'obj-ice-ramp', description: 'Place an Ice Block at an angle', completed: false },
      { id: 'obj-wood-slide', description: 'Drop a Wood Block onto the ice ramp', completed: false },
      { id: 'obj-compare', description: 'Try a Rubber Chunk — notice the difference!', completed: false },
    ],
    hint: 'Ice has near-zero friction. Rubber has very high friction — watch how differently they behave!',
  },
  {
    id: 'challenge-004',
    title: 'Rube Goldberg Starter',
    description:
      'Build a machine that uses at least 3 different part types to move a ball from left to right.',
    objectives: [
      { id: 'obj-three-parts', description: 'Use at least 3 different part types', completed: false },
      { id: 'obj-ball-moves', description: 'A rubber ball starts on the left side', completed: false },
      { id: 'obj-right-side', description: 'The ball reaches the right half of the canvas', completed: false },
    ],
    hint: 'Try using a wood ramp, a spring, and an air blower together!',
  },
  {
    id: 'challenge-005',
    title: 'X-Ray Inspector',
    description:
      'Use X-Ray mode to observe the forces acting on 3 different materials and write your findings in the Inventor\'s Log.',
    objectives: [
      { id: 'obj-xray', description: 'Toggle X-Ray mode on', completed: false },
      { id: 'obj-observe', description: 'Observe velocity vectors on moving parts', completed: false },
      { id: 'obj-log', description: 'Write an entry in the Inventor\'s Log', completed: false },
    ],
    hint: 'X-Ray mode shows green arrows for velocity and red arrows for applied forces.',
  },
];
