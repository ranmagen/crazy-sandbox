import { useEffect, useState } from 'react';
import Matter from 'matter-js';
import { getEngine } from '../../physics/engine';
import { readAllGauges } from '../../rendering/gaugeReader';
import { useSimulationStore } from '../../store/simulationStore';
import './GaugeWidget.css';

interface GaugeData {
  instanceId: string;
  speed: number;
  temperature: number;
  x: number;
  y: number;
}

export function GaugeOverlay() {
  const isPlaying = useSimulationStore((s) => s.isPlaying);
  const gaugedIds = useSimulationStore((s) => s.gaugedInstanceIds);
  const [gauges, setGauges] = useState<GaugeData[]>([]);

  useEffect(() => {
    if (!isPlaying || gaugedIds.size === 0) {
      setGauges([]);
      return;
    }

    const engine = getEngine();
    const handler = () => {
      const readings = readAllGauges();
      const bodies = Matter.Composite.allBodies(engine.world);

      const next: GaugeData[] = readings
        .filter((r) => gaugedIds.has(r.instanceId))
        .map((r) => {
          const body = bodies.find((b) => {
            const p = b.plugin as { instanceId?: string };
            return p?.instanceId === r.instanceId;
          });
          return {
            instanceId: r.instanceId,
            speed: r.speed,
            temperature: r.temperature,
            x: body?.position.x ?? 0,
            y: body?.position.y ?? 0,
          };
        });

      setGauges(next);
    };

    Matter.Events.on(engine, 'afterUpdate', handler);
    return () => Matter.Events.off(engine, 'afterUpdate', handler);
  }, [isPlaying, gaugedIds]);

  return (
    <div className="gauge-overlay">
      {gauges.map((g) => (
        <div
          key={g.instanceId}
          className="gauge-widget"
          style={{ left: g.x, top: g.y - 70 }}
        >
          <div className="gauge-row">
            <span className="gauge-label">Speed</span>
            <span className="gauge-value">{g.speed.toFixed(1)}</span>
          </div>
          <div className="gauge-row">
            <span className="gauge-label">Temp</span>
            <span className="gauge-value">{g.temperature.toFixed(0)}°C</span>
          </div>
        </div>
      ))}
    </div>
  );
}
