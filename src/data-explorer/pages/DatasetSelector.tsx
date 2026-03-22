import type { Dataset } from '../data/datasets';
import { ALL_DATASETS } from '../data/datasets';
import './DatasetSelector.css';

interface Props {
  onSelect: (dataset: Dataset) => void;
}

const TAG_LABELS: Record<string, string> = {
  geography: '🗺️ גיאוגרפיה',
  economics: '💰 כלכלה',
  health: '❤️ בריאות',
  climate: '🌱 אקלים',
  environment: '🌿 סביבה',
  'time-series': '📈 סדרת זמן',
  sports: '🏆 ספורט',
  statistics: '📊 סטטיסטיקה',
  space: '🚀 חלל',
  science: '🔬 מדע',
  history: '📜 היסטוריה',
  education: '📚 חינוך',
};

export function DatasetSelector({ onSelect }: Props) {
  return (
    <div className="selector-page" dir="rtl">
      <div className="selector-hero">
        <h1 className="selector-title">מה תרצה לחקור היום?</h1>
        <p className="selector-subtitle">
          בחר נושא ותתחיל לגלות דפוסים ותובנות מנתונים אמיתיים
        </p>
      </div>

      <div className="dataset-grid">
        {ALL_DATASETS.map((ds) => (
          <button
            key={ds.id}
            className="dataset-card"
            onClick={() => onSelect(ds)}
          >
            <div className="card-emoji">{ds.emoji}</div>
            <div className="card-body">
              <h2 className="card-title">{ds.titleHe}</h2>
              <p className="card-desc">{ds.descriptionHe}</p>

              <div className="card-tags">
                {ds.tags.map((t) => (
                  <span key={t} className="tag">
                    {TAG_LABELS[t] ?? t}
                  </span>
                ))}
              </div>

              <div className="card-meta">
                <span className="meta-item">
                  📋 {ds.columns.length} פרמטרים
                </span>
                <span className="meta-item">
                  🔢 {ds.rows.length} רשומות
                </span>
              </div>

              <div className="card-source">
                מקור: {ds.source}
              </div>
            </div>

            <div className="card-arrow">←</div>
          </button>
        ))}
      </div>
    </div>
  );
}
