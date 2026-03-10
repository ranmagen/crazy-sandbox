import { CategorySection } from './CategorySection';
import { rawMaterialParts, mechanicalParts, energyParts, wackyParts } from '../../data/partRegistry';
import './InventoryPanel.css';

export function InventoryPanel() {
  return (
    <div className="inventory-panel">
      <div className="inventory-header">
        <span className="inventory-title">Inventory</span>
        <span className="inventory-hint">Drag parts to the canvas</span>
      </div>
      <div className="inventory-scroll">
        <CategorySection
          title="Raw Materials"
          icon="🪨"
          parts={rawMaterialParts}
          defaultOpen
        />
        <CategorySection
          title="Mechanical"
          icon="⚙️"
          parts={mechanicalParts}
          defaultOpen
        />
        <CategorySection
          title="Energy"
          icon="⚡"
          parts={energyParts}
          defaultOpen={false}
        />
        <CategorySection
          title="Wacky Parts"
          icon="🎭"
          parts={wackyParts}
          defaultOpen={false}
        />
      </div>
    </div>
  );
}
