import { useState, useMemo } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart,
  Area, Cell,
} from 'recharts';
import type { Dataset } from '../data/datasets';
import { selectChartType, canBeXAxis, canBeYAxis } from '../utils/chartSelector';
import './DataPlayground.css';

interface Props {
  dataset: Dataset;
  onBack: () => void;
}

const CHART_COLORS = ['#4455dd', '#8844ee', '#44aadd', '#44ddaa', '#ddaa44', '#dd4488'];

const CHART_TYPE_LABELS: Record<string, string> = {
  scatter: '⬡ גרף פיזור',
  bar: '▦ גרף עמודות',
  line: '↗ גרף קווי',
  area: '◼ גרף שטח',
};

// Custom tooltip label formatter
function formatValue(value: number | string, unit?: string) {
  if (typeof value === 'number') {
    const formatted = Math.abs(value) >= 1000
      ? value.toLocaleString('he-IL', { maximumFractionDigits: 1 })
      : value.toLocaleString('he-IL', { maximumFractionDigits: 2 });
    return unit ? `${formatted} ${unit}` : formatted;
  }
  return String(value);
}

export function DataPlayground({ dataset, onBack }: Props) {
  const xCols = dataset.columns.filter(canBeXAxis);
  const yCols = dataset.columns.filter(canBeYAxis);

  const [xKey, setXKey] = useState<string>(xCols[0]?.key ?? '');
  const [yKey, setYKey] = useState<string>(yCols[0]?.key ?? '');
  const [insights, setInsights] = useState('');
  const [savedInsights, setSavedInsights] = useState<string[]>([]);

  const xCol = dataset.columns.find((c) => c.key === xKey)!;
  const yCol = dataset.columns.find((c) => c.key === yKey)!;

  const chartSuggestion = useMemo(() => {
    if (!xCol || !yCol) return null;
    return selectChartType(xCol, yCol, dataset.rows.length);
  }, [xCol, yCol, dataset.rows.length]);

  const chartData = useMemo(() => {
    return dataset.rows.map((row) => ({
      x: row[xKey],
      y: row[yKey],
      label: String(row[xKey]),
      // Keep all row data for tooltip
      ...row,
    }));
  }, [dataset.rows, xKey, yKey]);

  const handleSaveInsight = () => {
    const trimmed = insights.trim();
    if (!trimmed) return;
    setSavedInsights((prev) => [...prev, trimmed]);
    setInsights('');
  };

  const renderChart = () => {
    if (!chartSuggestion || !xCol || !yCol) return null;

    const commonAxis = {
      tick: { fill: '#889', fontSize: 11 },
      axisLine: { stroke: '#2a2a4a' },
      tickLine: { stroke: '#2a2a4a' },
    };

    const tooltipStyle = {
      backgroundColor: '#12122a',
      border: '1px solid #2a2a5a',
      borderRadius: 8,
      color: '#dde',
      fontSize: 12,
    };

    const gridProps = { stroke: '#1a1a3a', strokeDasharray: '3 3' };

    if (chartSuggestion.type === 'scatter') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 40, left: 20 }}>
            <CartesianGrid {...gridProps} />
            <XAxis
              dataKey="x"
              type="number"
              name={xCol.label}
              label={{ value: xCol.label, position: 'bottom', fill: '#667', fontSize: 12 }}
              {...commonAxis}
            />
            <YAxis
              dataKey="y"
              type="number"
              name={yCol.label}
              label={{ value: yCol.label, angle: -90, position: 'insideLeft', fill: '#667', fontSize: 12 }}
              {...commonAxis}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3', stroke: '#4455dd' }}
              contentStyle={tooltipStyle}
              formatter={(val, name) => {
                const col = dataset.columns.find((c) => c.label === String(name));
                return [formatValue(Number(val), col?.unit), String(name)];
              }}
              labelFormatter={(_, payload) => {
                if (payload?.[0]) {
                  const row = payload[0].payload;
                  const nameKey = dataset.columns.find((c) => c.type === 'category')?.key;
                  return nameKey ? String(row[nameKey]) : '';
                }
                return '';
              }}
            />
            <Scatter name={dataset.titleHe} data={chartData} fill="#4455dd" opacity={0.85}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      );
    }

    if (chartSuggestion.type === 'area') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 20, bottom: 40, left: 20 }}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4455dd" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#4455dd" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid {...gridProps} />
            <XAxis
              dataKey="x"
              label={{ value: xCol.label, position: 'bottom', fill: '#667', fontSize: 12 }}
              {...commonAxis}
            />
            <YAxis
              label={{ value: yCol.label, angle: -90, position: 'insideLeft', fill: '#667', fontSize: 12 }}
              {...commonAxis}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(val) => [formatValue(Number(val), yCol.unit), yCol.label]}
              labelFormatter={(label) => `${xCol.label}: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="y"
              stroke="#4455dd"
              strokeWidth={2}
              fill="url(#areaGrad)"
              dot={{ fill: '#4455dd', r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (chartSuggestion.type === 'line') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 40, left: 20 }}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="x" {...commonAxis} />
            <YAxis {...commonAxis} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="y" stroke="#4455dd" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    // Bar chart (default)
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 20, bottom: 60, left: 20 }}>
          <CartesianGrid {...gridProps} />
          <XAxis
            dataKey="x"
            tick={{ fill: '#889', fontSize: 10 }}
            angle={-35}
            textAnchor="end"
            interval={0}
            label={{ value: xCol.label, position: 'bottom', offset: 45, fill: '#667', fontSize: 12 }}
            axisLine={{ stroke: '#2a2a4a' }}
            tickLine={{ stroke: '#2a2a4a' }}
          />
          <YAxis
            label={{ value: yCol.label, angle: -90, position: 'insideLeft', fill: '#667', fontSize: 12 }}
            {...commonAxis}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(val) => [formatValue(Number(val), yCol.unit), yCol.label]}
          />
          <Bar dataKey="y" radius={[4, 4, 0, 0]}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="playground" dir="rtl">
      {/* Header */}
      <div className="playground-header">
        <button className="back-btn" onClick={onBack}>
          ← חזרה לנושאים
        </button>
        <div className="playground-title-group">
          <span className="pg-emoji">{dataset.emoji}</span>
          <div>
            <h1 className="pg-title">{dataset.titleHe}</h1>
            <a
              className="pg-source"
              href={dataset.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              מקור: {dataset.source} ↗
            </a>
          </div>
        </div>
      </div>

      <div className="playground-body">
        {/* Left: controls + insights */}
        <aside className="pg-sidebar">
          {/* Axis Selectors */}
          <section className="sidebar-section">
            <h2 className="sidebar-heading">בחר פרמטרים</h2>

            <div className="axis-selector">
              <label className="axis-label">
                <span className="axis-badge x-badge">X</span>
                ציר אופקי
              </label>
              <select
                className="axis-select"
                value={xKey}
                onChange={(e) => setXKey(e.target.value)}
              >
                {xCols.map((col) => (
                  <option key={col.key} value={col.key}>
                    {col.label}
                  </option>
                ))}
              </select>
              {xCol && <p className="axis-desc">{xCol.description}</p>}
            </div>

            <div className="axis-selector">
              <label className="axis-label">
                <span className="axis-badge y-badge">Y</span>
                ציר אנכי
              </label>
              <select
                className="axis-select"
                value={yKey}
                onChange={(e) => setYKey(e.target.value)}
              >
                {yCols.map((col) => (
                  <option key={col.key} value={col.key}>
                    {col.label}
                  </option>
                ))}
              </select>
              {yCol && <p className="axis-desc">{yCol.description}</p>}
            </div>
          </section>

          {/* Chart type info */}
          {chartSuggestion && (
            <section className="sidebar-section chart-type-section">
              <h2 className="sidebar-heading">סוג גרף</h2>
              <div className="chart-type-badge">
                {CHART_TYPE_LABELS[chartSuggestion.type]}
              </div>
              <p className="chart-type-reason">{chartSuggestion.reasonHe}</p>
            </section>
          )}

          {/* Columns reference */}
          <section className="sidebar-section">
            <h2 className="sidebar-heading">כל הפרמטרים</h2>
            <div className="columns-list">
              {dataset.columns.map((col) => (
                <div key={col.key} className="col-item">
                  <span className={`col-type-dot type-${col.type}`} />
                  <span className="col-name">{col.label}</span>
                  {col.unit && <span className="col-unit">{col.unit}</span>}
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Center: chart */}
        <main className="pg-main">
          <div className="chart-container">
            {renderChart()}
          </div>

          {/* Insights section */}
          <div className="insights-panel">
            <h2 className="insights-heading">
              💡 מה למדת מהנתונים?
            </h2>
            <p className="insights-hint">
              כתב תובנה אחת – מה מעניין ראית? האם יש קשר בין הפרמטרים?
            </p>
            <div className="insights-input-row">
              <textarea
                className="insights-textarea"
                placeholder="לדוגמה: ראיתי שמדינות עם תמ&quot;ג גבוה יותר נוטות לפלוט יותר CO₂ לנפש, אבל יש יוצאי דופן כמו נורווגיה..."
                value={insights}
                onChange={(e) => setInsights(e.target.value)}
                rows={3}
              />
              <button
                className="save-insight-btn"
                onClick={handleSaveInsight}
                disabled={!insights.trim()}
              >
                שמור תובנה ✓
              </button>
            </div>

            {savedInsights.length > 0 && (
              <div className="saved-insights">
                <h3 className="saved-title">התובנות שלי:</h3>
                {savedInsights.map((s, i) => (
                  <div key={i} className="saved-item">
                    <span className="saved-num">{i + 1}</span>
                    <p className="saved-text">{s}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
