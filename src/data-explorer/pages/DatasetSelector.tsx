import type { Dataset } from '../data/datasets';
import { ALL_DATASETS } from '../data/datasets';
import { TOPICS_BY_CATEGORY, CATEGORY_EMOJI } from '../data/topicCatalog';
import type { TopicCategory } from '../data/topicCatalog';
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

      <h2 className="section-heading">📊 נסה עכשיו — נתונים מוכנים לחקירה</h2>

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

      <div className="topic-catalog">
        <h2 className="section-heading">🔍 עוד נושאים לחקירה — מקורות נתונים פתוחים</h2>
        <p className="section-subtitle">
          מצאת נושא מעניין? לחץ על הקישור, הורד את הנתונים ובוא לחקור!
        </p>

        <div className="topic-categories">
          {(Object.keys(TOPICS_BY_CATEGORY) as TopicCategory[]).map((cat) => (
            <div key={cat} className="topic-category">
              <h3 className="category-heading">
                {CATEGORY_EMOJI[cat]} {cat}
              </h3>
              <ul className="topic-list">
                {TOPICS_BY_CATEGORY[cat].map((topic) => (
                  <li key={topic.id} className="topic-item">
                    <span className="topic-number">{topic.id}</span>
                    <a
                      href={topic.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="topic-link"
                    >
                      {topic.title}
                      <span className="topic-link-icon">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
