import type { Column, ColumnType } from '../data/datasets';

export type ChartType = 'line' | 'bar' | 'scatter' | 'area';

export interface ChartSuggestion {
  type: ChartType;
  reason: string;
  reasonHe: string;
}

export function selectChartType(
  xCol: Column,
  yCol: Column,
  rowCount: number
): ChartSuggestion {
  // Time series → Line or Area
  if (xCol.type === 'year') {
    return {
      type: 'area',
      reason: 'Time series data is best shown as an area chart to highlight trends over time.',
      reasonHe: 'נתוני סדרת זמן מוצגים בצורה הטובה ביותר כגרף שטח – מודגשים מגמות לאורך הזמן.',
    };
  }

  // Both numeric → Scatter
  if (xCol.type === 'number' && yCol.type === 'number') {
    return {
      type: 'scatter',
      reason: 'Two numeric axes → scatter plot shows correlation between the variables.',
      reasonHe: 'שני צירים מספריים → גרף פיזור מציג קשר (קורלציה) בין המשתנים.',
    };
  }

  // Category on X, number on Y → Bar
  if (xCol.type === 'category' && yCol.type === 'number') {
    if (rowCount <= 8) {
      return {
        type: 'bar',
        reason: 'Categorical X axis with few items → bar chart for easy comparison.',
        reasonHe: 'ציר X קטגורי עם מעט פריטים → גרף עמודות להשוואה נוחה.',
      };
    }
    return {
      type: 'bar',
      reason: 'Categorical X axis → horizontal bar chart for many categories.',
      reasonHe: 'ציר X קטגורי עם הרבה פריטים → גרף עמודות אופקי.',
    };
  }

  // Default
  return {
    type: 'bar',
    reason: 'Bar chart as default for this combination.',
    reasonHe: 'גרף עמודות כברירת מחדל לצירוף זה.',
  };
}

export function getColumnRole(type: ColumnType): string {
  switch (type) {
    case 'year': return 'זמן';
    case 'number': return 'מספרי';
    case 'category': return 'קטגוריה';
  }
}

export function canBeXAxis(col: Column): boolean {
  return col.type === 'category' || col.type === 'year' || col.type === 'number';
}

export function canBeYAxis(col: Column): boolean {
  return col.type === 'number';
}
