import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { getEngine } from '../physics/engine';
import { syncBodiesToSprites } from '../rendering/bodyRenderer';
import { drawVectors, setXRayVisible } from '../rendering/vectorOverlay';
import { evaluateRules } from '../physics/ruleEvaluator';
import { applyMagneticForces, applyBlowerForces } from '../physics/forceApplicator';
import { useRuleStore } from '../store/ruleStore';
import { useSimulationStore } from '../store/simulationStore';

export function useSimulationLoop() {
  const rules = useRuleStore((s) => s.rules);
  const isXRayMode = useSimulationStore((s) => s.isXRayMode);
  const rulesRef = useRef(rules);

  useEffect(() => {
    rulesRef.current = rules;
  }, [rules]);

  useEffect(() => {
    setXRayVisible(isXRayMode);
  }, [isXRayMode]);

  useEffect(() => {
    const engine = getEngine();

    const handler = () => {
      applyMagneticForces();
      applyBlowerForces();
      evaluateRules(rulesRef.current);
      syncBodiesToSprites();
      if (isXRayMode) drawVectors();
    };

    Matter.Events.on(engine, 'afterUpdate', handler);
    return () => {
      Matter.Events.off(engine, 'afterUpdate', handler);
    };
  }, [isXRayMode]);
}
