import { useSimulationStore } from '../store/simulationStore';

export function useXRayMode() {
  const isXRayMode = useSimulationStore((s) => s.isXRayMode);
  const toggleXRay = useSimulationStore((s) => s.toggleXRay);
  return { isXRayMode, toggleXRay };
}
