import type { MaterialId, MaterialDefinition } from './material.types';

export type PartCategory = 'raw-materials' | 'mechanical' | 'energy' | 'wacky';
export type PartShape = 'rectangle' | 'circle' | 'polygon' | 'compound';

export interface PartDefinition {
  id: string;
  label: string;
  category: PartCategory;
  materialId: MaterialId;
  shape: PartShape;
  width: number;
  height: number;
  radius?: number;
  vertices?: Array<{ x: number; y: number }>;
  tags: string[]; // e.g. ['gear'], ['magnet'], ['blower']
  description: string;
  iconColor: number; // fallback color for inventory card
}

export interface PartInstance {
  instanceId: string;
  definitionId: string;
  position: { x: number; y: number };
  angle: number;
  propertyOverrides: Partial<MaterialDefinition>;
  matterBodyId: number | null;
  // Runtime simulation state stored on the instance
  temperature: number; // degrees C, starts at 20
  isIgnited: boolean;
}
