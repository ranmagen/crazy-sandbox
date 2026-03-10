import type { MaterialDefinition } from '../../types/material.types';

export const rubberMaterial: MaterialDefinition = {
  id: 'rubber',
  label: 'Rubber',
  density: 0.0015,
  restitution: 0.85,
  friction: 0.8,
  frictionAir: 0.015,
  frictionStatic: 0.9,
  isStatic: false,
  isConductive: false,
  isFlammable: false,
  ignitionTemperatureC: null,
  isMagnetic: false,
  shockAbsorption: 0.8,
  fillColor: 0x2D2D2D,
  strokeColor: 0x111111,
  texture: null,
};
