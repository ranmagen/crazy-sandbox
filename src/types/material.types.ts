export type MaterialId = 'wood' | 'rubber' | 'steel' | 'ice' | 'glass';

export interface MaterialDefinition {
  id: MaterialId;
  label: string;
  // Matter.js body properties
  density: number;
  restitution: number;
  friction: number;
  frictionAir: number;
  frictionStatic: number;
  isStatic: boolean;
  // Electrical
  isConductive: boolean;
  // Special physics flags
  isFlammable: boolean;
  ignitionTemperatureC: number | null;
  isMagnetic: boolean;
  shockAbsorption: number; // 0–1, rubber damping coefficient
  // Rendering
  fillColor: number; // PixiJS hex
  strokeColor: number;
  texture: string | null;
}
