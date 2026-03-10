import { useEffect } from 'react';
import { getEngine, addBoundaries, startSimulation, stopSimulation, resetWorld } from '../physics/engine';
import { initCollisionHandler } from '../physics/collisionHandler';
import { useSimulationStore } from '../store/simulationStore';

let engineInitialized = false;

export function usePhysicsEngine() {
  const isPlaying = useSimulationStore((s) => s.isPlaying);

  useEffect(() => {
    if (!engineInitialized) {
      getEngine(); // init singleton
      addBoundaries();
      initCollisionHandler();
      engineInitialized = true;
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      startSimulation();
    } else {
      stopSimulation();
    }
  }, [isPlaying]);

  const handleReset = () => {
    stopSimulation();
    resetWorld();
    useSimulationStore.getState().reset();
  };

  return { handleReset };
}
