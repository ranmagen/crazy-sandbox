import type { MaterialDefinition } from '../../types/material.types';

export const woodMaterial: MaterialDefinition = {
  id: 'wood',
  label: 'Wood',
  density: 0.003,
  restitution: 0.15,
  friction: 0.6,
  frictionAir: 0.01,
  frictionStatic: 0.7,
  isStatic: false,
  isConductive: false,
  isFlammable: true,
  ignitionTemperatureC: 230,
  isMagnetic: false,
  shockAbsorption: 0.1,
  fillColor: 0xC8A46E,
  strokeColor: 0x8B6914,
  texture: null,
};
