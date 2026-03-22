import { useState } from 'react';
import type { Dataset } from './data/datasets';
import { DatasetSelector } from './pages/DatasetSelector';
import { DataPlayground } from './pages/DataPlayground';

export function DataExplorer() {
  const [activeDataset, setActiveDataset] = useState<Dataset | null>(null);

  if (activeDataset) {
    return (
      <DataPlayground
        dataset={activeDataset}
        onBack={() => setActiveDataset(null)}
      />
    );
  }

  return <DatasetSelector onSelect={setActiveDataset} />;
}
