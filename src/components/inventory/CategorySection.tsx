import { useState } from 'react';
import type { PartDefinition } from '../../types/part.types';
import { PartCard } from './PartCard';
import './CategorySection.css';

interface Props {
  title: string;
  icon: string;
  parts: PartDefinition[];
  defaultOpen?: boolean;
}

export function CategorySection({ title, icon, parts, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="category-section">
      <button className="category-header" onClick={() => setOpen((o) => !o)}>
        <span className="category-icon">{icon}</span>
        <span className="category-title">{title}</span>
        <span className="category-count">{parts.length}</span>
        <span className="category-chevron">{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div className="category-parts">
          {parts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      )}
    </div>
  );
}
