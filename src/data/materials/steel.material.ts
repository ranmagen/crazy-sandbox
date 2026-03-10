import type { MaterialDefinition } from '../../types/material.types';

export const steelMaterial: MaterialDefinition = {
  id: 'steel',
  label: 'Steel',
  density: 0.008,
  restitution: 0.1,
  friction: 0.4,
  frictionAir: 0.01,
  frictionStatic: 0.5,
  isStatic: false,
  isConductive: true,
  isFlammable: false,
  ignitionTemperatureC: null,
  isMagnetic: true,
  shockAbsorption: 0,
  fillColor: 0x8C8C8C,
  strokeColor: 0x5A5A5A,
  texture: null,
};
