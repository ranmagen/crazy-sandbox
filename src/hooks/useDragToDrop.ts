import { useCallback } from 'react';
import { createBodyFromInstance, addBodyToWorld } from '../physics/bodyFactory';
import { addBodySprite } from '../rendering/bodyRenderer';
import { snapToGrid } from '../rendering/snapGrid';
import { useSimulationStore } from '../store/simulationStore';
import type { PartInstance } from '../types/part.types';
import { getPartDefinition } from '../data/partRegistry';
import { getMaterial } from '../data/materialRegistry';

export function useDragToDrop(canvasRect: React.RefObject<DOMRect | null>) {
  const addInstance = useSimulationStore((s) => s.addInstance);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const definitionId = e.dataTransfer.getData('application/crazy-sandbox-part');
      if (!definitionId) return;

      const rect = canvasRect.current;
      if (!rect) return;

      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;
      const { x, y } = snapToGrid(rawX, rawY);

      try {
        const def = getPartDefinition(definitionId);
        const mat = getMaterial(def.materialId);

        const instance: PartInstance = {
          instanceId: crypto.randomUUID(),
          definitionId,
          position: { x, y },
          angle: 0,
          propertyOverrides: {},
          matterBodyId: null,
          temperature: 20,
          isIgnited: false,
        };

        const body = createBodyFromInstance(instance);
        instance.matterBodyId = body.id;
        addBodyToWorld(body);
        addBodySprite(body, definitionId);
        addInstance(instance);

        // Suppress unused variable warning for mat
        void mat;
      } catch (err) {
        console.warn('Failed to drop part:', err);
      }
    },
    [canvasRect, addInstance]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  return { handleDrop, handleDragOver };
}
