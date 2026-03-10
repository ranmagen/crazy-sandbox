import type { PartDefinition } from '../types/part.types';
import { rawMaterialParts } from './parts/raw-materials.parts';
import { mechanicalParts } from './parts/mechanical.parts';
import { energyParts } from './parts/energy.parts';
import { wackyParts } from './parts/wacky.parts';

const allParts: PartDefinition[] = [
  ...rawMaterialParts,
  ...mechanicalParts,
  ...energyParts,
  ...wackyParts,
];

export const PartRegistry = new Map<string, PartDefinition>(
  allParts.map((p) => [p.id, p])
);

export function getPartDefinition(id: string): PartDefinition {
  const part = PartRegistry.get(id);
  if (!part) throw new Error(`Unknown part: ${id}`);
  return part;
}

export { rawMaterialParts, mechanicalParts, energyParts, wackyParts };
