import type { MaterialDefinition } from '../../types/material.types';

export const glassMaterial: MaterialDefinition = {
  id: 'glass',
  label: 'Glass',
  density: 0.004,
  restitution: 0.2,
  friction: 0.1,
  frictionAir: 0.01,
  frictionStatic: 0.15,
  isStatic: false,
  isConductive: false,
  isFlammable: false,
  ignitionTemperatureC: null,
  isMagnetic: false,
  shockAbsorption: 0,
  fillColor: 0xB2EBF2,
  strokeColor: 0x80DEEA,
  texture: null,
};
