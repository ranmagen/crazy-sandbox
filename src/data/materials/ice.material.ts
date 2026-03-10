import type { MaterialDefinition } from '../../types/material.types';

export const iceMaterial: MaterialDefinition = {
  id: 'ice',
  label: 'Ice',
  density: 0.0025,
  restitution: 0.05,
  friction: 0.01,       // near-zero friction
  frictionAir: 0.005,
  frictionStatic: 0.01, // slippery
  isStatic: false,
  isConductive: false,
  isFlammable: false,
  ignitionTemperatureC: null,
  isMagnetic: false,
  shockAbsorption: 0,
  fillColor: 0xB3E5FC,
  strokeColor: 0x4FC3F7,
  texture: null,
};
