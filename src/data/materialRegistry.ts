import type { MaterialId, MaterialDefinition } from '../types/material.types';
import { woodMaterial } from './materials/wood.material';
import { rubberMaterial } from './materials/rubber.material';
import { steelMaterial } from './materials/steel.material';
import { iceMaterial } from './materials/ice.material';
import { glassMaterial } from './materials/glass.material';

export const MaterialRegistry = new Map<MaterialId, MaterialDefinition>([
  ['wood', woodMaterial],
  ['rubber', rubberMaterial],
  ['steel', steelMaterial],
  ['ice', iceMaterial],
  ['glass', glassMaterial],
]);

export function getMaterial(id: MaterialId): MaterialDefinition {
  const mat = MaterialRegistry.get(id);
  if (!mat) throw new Error(`Unknown material: ${id}`);
  return mat;
}
