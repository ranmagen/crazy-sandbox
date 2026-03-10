import type { PartDefinition } from '../../types/part.types';
import { getMaterial } from '../../data/materialRegistry';
import './PartCard.css';

interface Props {
  part: PartDefinition;
}

const MATERIAL_PROPS: Record<string, string> = {
  wood: 'Flammable',
  rubber: 'High Bounce',
  steel: 'Magnetic',
  ice: 'Zero Friction',
  glass: 'Low Friction',
};

export function PartCard({ part }: Props) {
  const mat = getMaterial(part.materialId);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('application/crazy-sandbox-part', part.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const colorHex = '#' + mat.fillColor.toString(16).padStart(6, '0');
  const strokeHex = '#' + mat.strokeColor.toString(16).padStart(6, '0');

  return (
    <div
      className="part-card"
      draggable
      onDragStart={handleDragStart}
      title={part.description}
    >
      <div
        className="part-icon"
        style={{
          background: colorHex,
          border: `2px solid ${strokeHex}`,
          borderRadius: part.shape === 'circle' ? '50%' : '4px',
        }}
      />
      <div className="part-info">
        <span className="part-name">{part.label}</span>
        <span className="part-material">{mat.label}</span>
        {MATERIAL_PROPS[part.materialId] && (
          <span className="part-prop-badge">{MATERIAL_PROPS[part.materialId]}</span>
        )}
      </div>
    </div>
  );
}
