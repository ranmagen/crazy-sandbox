import { create } from 'zustand';
import type { PartInstance } from '../types/part.types';

interface SimulationState {
  isPlaying: boolean;
  isXRayMode: boolean;
  tickCount: number;
  placedInstances: PartInstance[];
  gaugedInstanceIds: Set<string>;

  play: () => void;
  pause: () => void;
  reset: () => void;
  toggleXRay: () => void;
  incrementTick: () => void;
  addInstance: (instance: PartInstance) => void;
  removeInstance: (instanceId: string) => void;
  updateInstance: (instanceId: string, updates: Partial<PartInstance>) => void;
  toggleGauge: (instanceId: string) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  isPlaying: false,
  isXRayMode: false,
  tickCount: 0,
  placedInstances: [],
  gaugedInstanceIds: new Set(),

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  reset: () =>
    set({ isPlaying: false, tickCount: 0, placedInstances: [], gaugedInstanceIds: new Set() }),
  toggleXRay: () => set((s) => ({ isXRayMode: !s.isXRayMode })),
  incrementTick: () => set((s) => ({ tickCount: s.tickCount + 1 })),

  addInstance: (instance) =>
    set((s) => ({ placedInstances: [...s.placedInstances, instance] })),

  removeInstance: (instanceId) =>
    set((s) => ({
      placedInstances: s.placedInstances.filter((i) => i.instanceId !== instanceId),
    })),

  updateInstance: (instanceId, updates) =>
    set((s) => ({
      placedInstances: s.placedInstances.map((i) =>
        i.instanceId === instanceId ? { ...i, ...updates } : i
      ),
    })),

  toggleGauge: (instanceId) =>
    set((s) => {
      const next = new Set(s.gaugedInstanceIds);
      if (next.has(instanceId)) next.delete(instanceId);
      else next.add(instanceId);
      return { gaugedInstanceIds: next };
    }),
}));
