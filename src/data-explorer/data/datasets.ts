export type ColumnType = 'number' | 'category' | 'year';

export interface Column {
  key: string;
  label: string;
  type: ColumnType;
  unit?: string;
  description: string;
}

export interface Dataset {
  id: string;
  title: string;
  titleHe: string;
  description: string;
  descriptionHe: string;
  emoji: string;
  source: string;
  sourceUrl: string;
  columns: Column[];
  rows: Record<string, string | number>[];
  tags: string[];
}

// ─── Dataset 1: World Development Indicators ───────────────────────────────
const worldData: Dataset = {
  id: 'world-development',
  title: 'World Development Indicators',
  titleHe: 'מדדי פיתוח עולמיים',
  description: 'Key development indicators across countries',
  descriptionHe: 'מדדי פיתוח מרכזיים לפי מדינות - אוכלוסייה, תמ"ג, תוחלת חיים ועוד',
  emoji: '🌍',
  source: 'World Bank – World Development Indicators (2022)',
  sourceUrl: 'https://data.worldbank.org/indicator',
  tags: ['geography', 'economics', 'health'],
  columns: [
    { key: 'country', label: 'מדינה', type: 'category', description: 'שם המדינה' },
    { key: 'population_m', label: 'אוכלוסייה (מיליון)', type: 'number', unit: 'מיליון', description: 'גודל האוכלוסייה במיליונים' },
    { key: 'gdp_per_capita', label: 'תמ"ג לנפש (דולר)', type: 'number', unit: '$', description: 'תוצר מקומי גולמי לנפש בדולרים' },
    { key: 'life_expectancy', label: 'תוחלת חיים (שנים)', type: 'number', unit: 'שנים', description: 'תוחלת חיים בלידה' },
    { key: 'co2_per_capita', label: 'פליטות CO₂ לנפש', type: 'number', unit: 'טון', description: 'פליטות דו-תחמוצת הפחמן לנפש בטון' },
    { key: 'literacy_rate', label: 'שיעור אוריינות (%)', type: 'number', unit: '%', description: 'שיעור האוכלוסייה המבוגרת היודעת קרוא וכתוב' },
    { key: 'internet_access', label: 'גישה לאינטרנט (%)', type: 'number', unit: '%', description: 'שיעור האוכלוסייה עם גישה לאינטרנט' },
    { key: 'urban_population', label: 'אוכלוסייה עירונית (%)', type: 'number', unit: '%', description: 'שיעור האוכלוסייה בערים' },
  ],
  rows: [
    { country: 'ארה"ב', population_m: 333, gdp_per_capita: 76399, life_expectancy: 77.2, co2_per_capita: 14.7, literacy_rate: 99, internet_access: 91, urban_population: 83 },
    { country: 'סין', population_m: 1412, gdp_per_capita: 12720, life_expectancy: 78.2, co2_per_capita: 8.0, literacy_rate: 97, internet_access: 73, urban_population: 63 },
    { country: 'הודו', population_m: 1417, gdp_per_capita: 2389, life_expectancy: 70.0, co2_per_capita: 1.9, literacy_rate: 74, internet_access: 52, urban_population: 36 },
    { country: 'גרמניה', population_m: 84, gdp_per_capita: 48717, life_expectancy: 80.6, co2_per_capita: 8.1, literacy_rate: 99, internet_access: 92, urban_population: 77 },
    { country: 'ברזיל', population_m: 215, gdp_per_capita: 9073, life_expectancy: 72.4, co2_per_capita: 2.3, literacy_rate: 94, internet_access: 81, urban_population: 87 },
    { country: 'יפן', population_m: 125, gdp_per_capita: 42226, life_expectancy: 84.3, co2_per_capita: 8.7, literacy_rate: 99, internet_access: 93, urban_population: 92 },
    { country: 'ניגריה', population_m: 218, gdp_per_capita: 2184, life_expectancy: 53.0, co2_per_capita: 0.6, literacy_rate: 62, internet_access: 55, urban_population: 54 },
    { country: 'ישראל', population_m: 9.6, gdp_per_capita: 52170, life_expectancy: 82.0, co2_per_capita: 6.7, literacy_rate: 99, internet_access: 90, urban_population: 93 },
    { country: 'נורווגיה', population_m: 5.4, gdp_per_capita: 106149, life_expectancy: 83.2, co2_per_capita: 7.5, literacy_rate: 99, internet_access: 97, urban_population: 83 },
    { country: 'אתיופיה', population_m: 123, gdp_per_capita: 936, life_expectancy: 65.5, co2_per_capita: 0.15, literacy_rate: 52, internet_access: 24, urban_population: 22 },
    { country: 'מקסיקו', population_m: 128, gdp_per_capita: 10046, life_expectancy: 70.2, co2_per_capita: 3.4, literacy_rate: 95, internet_access: 76, urban_population: 81 },
    { country: 'אינדונזיה', population_m: 275, gdp_per_capita: 4788, life_expectancy: 71.7, co2_per_capita: 2.3, literacy_rate: 96, internet_access: 73, urban_population: 58 },
    { country: 'פקיסטן', population_m: 231, gdp_per_capita: 1505, life_expectancy: 67.3, co2_per_capita: 1.0, literacy_rate: 58, internet_access: 48, urban_population: 37 },
    { country: 'דנמרק', population_m: 5.9, gdp_per_capita: 68007, life_expectancy: 81.6, co2_per_capita: 5.1, literacy_rate: 99, internet_access: 98, urban_population: 88 },
    { country: 'דרום אפריקה', population_m: 60, gdp_per_capita: 6994, life_expectancy: 62.3, co2_per_capita: 7.3, literacy_rate: 95, internet_access: 72, urban_population: 68 },
    { country: 'ארגנטינה', population_m: 45, gdp_per_capita: 13327, life_expectancy: 76.0, co2_per_capita: 3.9, literacy_rate: 99, internet_access: 88, urban_population: 93 },
    { country: 'קנדה', population_m: 38, gdp_per_capita: 55522, life_expectancy: 82.3, co2_per_capita: 14.3, literacy_rate: 99, internet_access: 94, urban_population: 82 },
    { country: 'ויאטנם', population_m: 98, gdp_per_capita: 4163, life_expectancy: 73.6, co2_per_capita: 3.7, literacy_rate: 95, internet_access: 79, urban_population: 38 },
    { country: 'פולין', population_m: 38, gdp_per_capita: 18000, life_expectancy: 76.9, co2_per_capita: 8.3, literacy_rate: 99, internet_access: 86, urban_population: 60 },
    { country: 'סינגפור', population_m: 5.6, gdp_per_capita: 82808, life_expectancy: 83.6, co2_per_capita: 8.6, literacy_rate: 98, internet_access: 95, urban_population: 100 },
  ],
};

// ─── Dataset 2: Climate Change over Time ────────────────────────────────────
const climateData: Dataset = {
  id: 'climate-change',
  title: 'Climate Change Data',
  titleHe: 'שינויי אקלים לאורך השנים',
  description: 'Global temperature anomalies, CO₂ and sea level since 1880',
  descriptionHe: 'טמפרטורה עולמית, ריכוז CO₂ ועלייה בגובה פני הים מאז 1880',
  emoji: '🌡️',
  source: 'NASA GISS Surface Temperature Analysis & NOAA Global Monitoring Lab (2023)',
  sourceUrl: 'https://climate.nasa.gov/vital-signs/global-temperature/',
  tags: ['climate', 'environment', 'time-series'],
  columns: [
    { key: 'year', label: 'שנה', type: 'year', description: 'שנת המדידה' },
    { key: 'temp_anomaly', label: 'חריגת טמפרטורה (°C)', type: 'number', unit: '°C', description: 'חריגת הטמפרטורה הממוצעת מהבסיס (1951–1980)' },
    { key: 'co2_ppm', label: 'CO₂ (חלקים למיליון)', type: 'number', unit: 'ppm', description: 'ריכוז דו-תחמוצת הפחמן באטמוספרה' },
    { key: 'sea_level_mm', label: 'עלייה בגובה הים (מ"מ)', type: 'number', unit: 'מ"מ', description: 'עלייה בגובה פני הים ביחס ל-1993' },
    { key: 'arctic_ice_km2', label: 'קרח ארקטי (מ׳ קמ"ר)', type: 'number', unit: 'מיל. קמ"ר', description: 'שטח הקרח הארקטי בקיץ' },
  ],
  rows: [
    { year: 1880, temp_anomaly: -0.16, co2_ppm: 291, sea_level_mm: -150, arctic_ice_km2: 7.9 },
    { year: 1890, temp_anomaly: -0.09, co2_ppm: 295, sea_level_mm: -140, arctic_ice_km2: 7.8 },
    { year: 1900, temp_anomaly: -0.08, co2_ppm: 298, sea_level_mm: -130, arctic_ice_km2: 7.7 },
    { year: 1910, temp_anomaly: -0.36, co2_ppm: 300, sea_level_mm: -120, arctic_ice_km2: 7.7 },
    { year: 1920, temp_anomaly: -0.27, co2_ppm: 303, sea_level_mm: -100, arctic_ice_km2: 7.6 },
    { year: 1930, temp_anomaly: -0.09, co2_ppm: 307, sea_level_mm: -80, arctic_ice_km2: 7.5 },
    { year: 1940, temp_anomaly: 0.09, co2_ppm: 310, sea_level_mm: -60, arctic_ice_km2: 7.5 },
    { year: 1950, temp_anomaly: -0.01, co2_ppm: 311, sea_level_mm: -40, arctic_ice_km2: 7.4 },
    { year: 1960, temp_anomaly: -0.02, co2_ppm: 317, sea_level_mm: -20, arctic_ice_km2: 7.4 },
    { year: 1970, temp_anomaly: 0.02, co2_ppm: 326, sea_level_mm: -10, arctic_ice_km2: 7.3 },
    { year: 1980, temp_anomaly: 0.26, co2_ppm: 339, sea_level_mm: 0, arctic_ice_km2: 7.2 },
    { year: 1985, temp_anomaly: 0.12, co2_ppm: 346, sea_level_mm: 5, arctic_ice_km2: 7.1 },
    { year: 1990, temp_anomaly: 0.44, co2_ppm: 354, sea_level_mm: 10, arctic_ice_km2: 6.9 },
    { year: 1995, temp_anomaly: 0.38, co2_ppm: 361, sea_level_mm: 25, arctic_ice_km2: 6.7 },
    { year: 2000, temp_anomaly: 0.42, co2_ppm: 370, sea_level_mm: 40, arctic_ice_km2: 6.5 },
    { year: 2005, temp_anomaly: 0.67, co2_ppm: 380, sea_level_mm: 55, arctic_ice_km2: 6.3 },
    { year: 2010, temp_anomaly: 0.72, co2_ppm: 390, sea_level_mm: 70, arctic_ice_km2: 6.1 },
    { year: 2015, temp_anomaly: 0.87, co2_ppm: 401, sea_level_mm: 90, arctic_ice_km2: 5.5 },
    { year: 2016, temp_anomaly: 1.01, co2_ppm: 404, sea_level_mm: 95, arctic_ice_km2: 5.2 },
    { year: 2017, temp_anomaly: 0.92, co2_ppm: 407, sea_level_mm: 98, arctic_ice_km2: 5.1 },
    { year: 2018, temp_anomaly: 0.85, co2_ppm: 409, sea_level_mm: 102, arctic_ice_km2: 5.0 },
    { year: 2019, temp_anomaly: 0.98, co2_ppm: 412, sea_level_mm: 108, arctic_ice_km2: 4.9 },
    { year: 2020, temp_anomaly: 1.02, co2_ppm: 414, sea_level_mm: 115, arctic_ice_km2: 4.7 },
    { year: 2021, temp_anomaly: 0.85, co2_ppm: 416, sea_level_mm: 121, arctic_ice_km2: 4.8 },
    { year: 2022, temp_anomaly: 0.89, co2_ppm: 419, sea_level_mm: 128, arctic_ice_km2: 4.7 },
    { year: 2023, temp_anomaly: 1.17, co2_ppm: 422, sea_level_mm: 136, arctic_ice_km2: 4.6 },
  ],
};

// ─── Dataset 3: Summer Olympics Medals (Tokyo 2020 + Paris 2024) ────────────
const olympicsData: Dataset = {
  id: 'olympics',
  title: 'Summer Olympics Medals (Paris 2024)',
  titleHe: 'מדליות אולימפיאדת קיץ (פריז 2024)',
  description: 'Medal counts and country data from the Paris 2024 Olympics',
  descriptionHe: 'מדליות לפי מדינה באולימפיאדת פריז 2024, ואוכלוסייה ותמ"ג',
  emoji: '🏅',
  source: 'International Olympic Committee – Official Paris 2024 Results',
  sourceUrl: 'https://olympics.com/en/paris-2024/medals',
  tags: ['sports', 'geography', 'statistics'],
  columns: [
    { key: 'country', label: 'מדינה', type: 'category', description: 'שם המדינה' },
    { key: 'gold', label: 'זהב', type: 'number', unit: 'מדליות', description: 'מספר מדליות הזהב' },
    { key: 'silver', label: 'כסף', type: 'number', unit: 'מדליות', description: 'מספר מדליות הכסף' },
    { key: 'bronze', label: 'ארד', type: 'number', unit: 'מדליות', description: 'מספר מדליות הארד' },
    { key: 'total', label: 'סה"כ מדליות', type: 'number', unit: 'מדליות', description: 'סך כל המדליות' },
    { key: 'athletes', label: 'ספורטאים', type: 'number', unit: 'אנשים', description: 'מספר ספורטאים ששתתפו' },
    { key: 'population_m', label: 'אוכלוסייה (מיליון)', type: 'number', unit: 'מיליון', description: 'אוכלוסיית המדינה' },
    { key: 'gdp_per_capita', label: 'תמ"ג לנפש ($)', type: 'number', unit: '$', description: 'תמ"ג לנפש בדולרים' },
  ],
  rows: [
    { country: 'ארה"ב', gold: 40, silver: 44, bronze: 42, total: 126, athletes: 592, population_m: 333, gdp_per_capita: 76399 },
    { country: 'סין', gold: 40, silver: 27, bronze: 24, total: 91, athletes: 388, population_m: 1412, gdp_per_capita: 12720 },
    { country: 'בריטניה', gold: 20, silver: 12, bronze: 13, total: 45, athletes: 327, population_m: 67, gdp_per_capita: 46125 },
    { country: 'אוסטרליה', gold: 18, silver: 19, bronze: 16, total: 53, athletes: 460, population_m: 26, gdp_per_capita: 65366 },
    { country: 'צרפת', gold: 16, silver: 26, bronze: 22, total: 64, athletes: 572, population_m: 68, gdp_per_capita: 43659 },
    { country: 'הולנד', gold: 15, silver: 7, bronze: 12, total: 34, athletes: 264, population_m: 17.9, gdp_per_capita: 57768 },
    { country: 'גרמניה', gold: 12, silver: 13, bronze: 8, total: 33, athletes: 428, population_m: 84, gdp_per_capita: 48717 },
    { country: 'יפן', gold: 20, silver: 12, bronze: 13, total: 45, athletes: 403, population_m: 125, gdp_per_capita: 42226 },
    { country: 'דרום קוריאה', gold: 13, silver: 9, bronze: 10, total: 32, athletes: 143, population_m: 51.7, gdp_per_capita: 33591 },
    { country: 'איטליה', gold: 12, silver: 13, bronze: 15, total: 40, athletes: 403, population_m: 60.4, gdp_per_capita: 34776 },
    { country: 'ניו זילנד', gold: 10, silver: 7, bronze: 3, total: 20, athletes: 211, population_m: 5.1, gdp_per_capita: 48350 },
    { country: 'קנדה', gold: 9, silver: 7, bronze: 11, total: 27, athletes: 315, population_m: 38, gdp_per_capita: 55522 },
    { country: 'ברזיל', gold: 3, silver: 7, bronze: 10, total: 20, athletes: 276, population_m: 215, gdp_per_capita: 9073 },
    { country: 'ישראל', gold: 1, silver: 5, bronze: 1, total: 7, athletes: 88, population_m: 9.6, gdp_per_capita: 52170 },
    { country: 'קניה', gold: 4, silver: 2, bronze: 5, total: 11, athletes: 85, population_m: 55, gdp_per_capita: 2082 },
    { country: 'ספרד', gold: 5, silver: 4, bronze: 9, total: 18, athletes: 381, population_m: 47.4, gdp_per_capita: 30103 },
    { country: 'הונגריה', gold: 6, silver: 7, bronze: 6, total: 19, athletes: 176, population_m: 9.7, gdp_per_capita: 21368 },
    { country: 'אתיופיה', gold: 3, silver: 3, bronze: 0, total: 6, athletes: 44, population_m: 123, gdp_per_capita: 936 },
  ],
};

// ─── Dataset 4: Space Missions ────────────────────────────────────────────────
const spaceData: Dataset = {
  id: 'space-missions',
  title: 'Space Missions Database',
  titleHe: 'משימות חלל',
  description: 'Major crewed and robotic space missions since 1957',
  descriptionHe: 'משימות חלל מרכזיות מאז 1957 – עלות, משך, ויעד',
  emoji: '🚀',
  source: 'NASA – Space Mission Archives & ESA Mission Database (2023)',
  sourceUrl: 'https://nssdc.gsfc.nasa.gov/planetary/chronology.html',
  tags: ['space', 'science', 'history'],
  columns: [
    { key: 'mission', label: 'שם המשימה', type: 'category', description: 'שם המשימה' },
    { key: 'year', label: 'שנה', type: 'year', description: 'שנת השיגור' },
    { key: 'cost_billion', label: 'עלות (מיליארד $)', type: 'number', unit: 'מיליארד $', description: 'עלות המשימה במיליארדי דולרים' },
    { key: 'duration_days', label: 'משך (ימים)', type: 'number', unit: 'ימים', description: 'משך המשימה בימים' },
    { key: 'distance_km_m', label: 'מרחק (מיל. ק"מ)', type: 'number', unit: 'מיל. ק"מ', description: 'מרחק היעד מכדור הארץ במיליוני ק"מ' },
    { key: 'crew_size', label: 'צוות', type: 'number', unit: 'אנשים', description: 'מספר אנשי הצוות (0 = רובוטי)' },
    { key: 'success_score', label: 'ציון הצלחה (1-10)', type: 'number', unit: '', description: 'ציון הצלחת המשימה' },
  ],
  rows: [
    { mission: 'Sputnik 1', year: 1957, cost_billion: 0.05, duration_days: 92, distance_km_m: 0.0006, crew_size: 0, success_score: 10 },
    { mission: 'Apollo 11', year: 1969, cost_billion: 25.4, duration_days: 8, distance_km_m: 0.384, crew_size: 3, success_score: 10 },
    { mission: 'Voyager 1', year: 1977, cost_billion: 0.9, duration_days: 17000, distance_km_m: 22000, crew_size: 0, success_score: 10 },
    { mission: 'Hubble Telescope', year: 1990, cost_billion: 2.5, duration_days: 12410, distance_km_m: 0.00059, crew_size: 0, success_score: 10 },
    { mission: 'Mars Pathfinder', year: 1997, cost_billion: 0.27, duration_days: 83, distance_km_m: 78, crew_size: 0, success_score: 9 },
    { mission: 'ISS Construction', year: 1998, cost_billion: 150, duration_days: 8000, distance_km_m: 0.0004, crew_size: 3, success_score: 9 },
    { mission: 'Mars Spirit Rover', year: 2004, cost_billion: 0.4, duration_days: 2208, distance_km_m: 78, crew_size: 0, success_score: 10 },
    { mission: 'New Horizons (Pluto)', year: 2006, cost_billion: 0.72, duration_days: 3462, distance_km_m: 5906, crew_size: 0, success_score: 10 },
    { mission: 'Curiosity Rover', year: 2012, cost_billion: 2.5, duration_days: 4300, distance_km_m: 78, crew_size: 0, success_score: 10 },
    { mission: 'SpaceX Crew Dragon Demo', year: 2020, cost_billion: 3.1, duration_days: 2, distance_km_m: 0.0004, crew_size: 2, success_score: 10 },
    { mission: 'James Webb Telescope', year: 2021, cost_billion: 10.0, duration_days: 1200, distance_km_m: 1.5, crew_size: 0, success_score: 10 },
    { mission: 'Artemis I (Moon)', year: 2022, cost_billion: 4.1, duration_days: 25, distance_km_m: 0.384, crew_size: 0, success_score: 9 },
    { mission: 'Mars Perseverance', year: 2021, cost_billion: 2.9, duration_days: 1400, distance_km_m: 78, crew_size: 0, success_score: 10 },
    { mission: 'Chandrayaan-3 (India)', year: 2023, cost_billion: 0.075, duration_days: 40, distance_km_m: 0.384, crew_size: 0, success_score: 10 },
  ],
};

// ─── Dataset 5: Global Education Indicators ──────────────────────────────────
const educationData: Dataset = {
  id: 'education',
  title: 'Global Education Indicators',
  titleHe: 'מדדי חינוך עולמיים',
  description: 'Education spending, enrollment, and outcomes by country',
  descriptionHe: 'הוצאות חינוך, אחוזי רישום ותוצאות חינוכיות לפי מדינה',
  emoji: '📚',
  source: 'UNESCO Institute for Statistics & OECD Education at a Glance (2022)',
  sourceUrl: 'https://uis.unesco.org/',
  tags: ['education', 'economics', 'geography'],
  columns: [
    { key: 'country', label: 'מדינה', type: 'category', description: 'שם המדינה' },
    { key: 'edu_spending_pct', label: 'הוצאות חינוך (% מתמ"ג)', type: 'number', unit: '%', description: 'הוצאות ממשלתיות על חינוך כאחוז מהתמ"ג' },
    { key: 'primary_enrollment', label: 'רישום לחינוך יסודי (%)', type: 'number', unit: '%', description: 'שיעור הרישום לחינוך יסודי' },
    { key: 'secondary_enrollment', label: 'רישום לחינוך תיכוני (%)', type: 'number', unit: '%', description: 'שיעור הרישום לחינוך תיכוני' },
    { key: 'tertiary_enrollment', label: 'רישום להשכלה גבוהה (%)', type: 'number', unit: '%', description: 'שיעור הרישום להשכלה גבוהה' },
    { key: 'pisa_score', label: 'ציון PISA', type: 'number', unit: 'נקודות', description: 'ציון PISA הממוצע במתמטיקה וקריאה' },
    { key: 'teachers_per_100', label: 'מורים לכל 100 תלמידים', type: 'number', unit: 'מורים', description: 'יחס מורים-תלמידים' },
    { key: 'gdp_per_capita', label: 'תמ"ג לנפש ($)', type: 'number', unit: '$', description: 'תמ"ג לנפש' },
  ],
  rows: [
    { country: 'פינלנד', edu_spending_pct: 6.8, primary_enrollment: 99, secondary_enrollment: 98, tertiary_enrollment: 89, pisa_score: 520, teachers_per_100: 7.5, gdp_per_capita: 54330 },
    { country: 'דרום קוריאה', edu_spending_pct: 5.1, primary_enrollment: 99, secondary_enrollment: 99, tertiary_enrollment: 94, pisa_score: 527, teachers_per_100: 5.8, gdp_per_capita: 33591 },
    { country: 'יפן', edu_spending_pct: 3.7, primary_enrollment: 99, secondary_enrollment: 99, tertiary_enrollment: 64, pisa_score: 516, teachers_per_100: 5.9, gdp_per_capita: 42226 },
    { country: 'גרמניה', edu_spending_pct: 4.7, primary_enrollment: 99, secondary_enrollment: 97, tertiary_enrollment: 70, pisa_score: 497, teachers_per_100: 6.3, gdp_per_capita: 48717 },
    { country: 'ישראל', edu_spending_pct: 7.1, primary_enrollment: 99, secondary_enrollment: 96, tertiary_enrollment: 66, pisa_score: 470, teachers_per_100: 7.1, gdp_per_capita: 52170 },
    { country: 'ארה"ב', edu_spending_pct: 6.0, primary_enrollment: 99, secondary_enrollment: 95, tertiary_enrollment: 88, pisa_score: 478, teachers_per_100: 6.1, gdp_per_capita: 76399 },
    { country: 'קנדה', edu_spending_pct: 5.4, primary_enrollment: 99, secondary_enrollment: 98, tertiary_enrollment: 68, pisa_score: 512, teachers_per_100: 6.4, gdp_per_capita: 55522 },
    { country: 'הודו', edu_spending_pct: 4.5, primary_enrollment: 93, secondary_enrollment: 66, tertiary_enrollment: 28, pisa_score: 412, teachers_per_100: 3.1, gdp_per_capita: 2389 },
    { country: 'ברזיל', edu_spending_pct: 6.0, primary_enrollment: 95, secondary_enrollment: 84, tertiary_enrollment: 51, pisa_score: 413, teachers_per_100: 4.0, gdp_per_capita: 9073 },
    { country: 'אתיופיה', edu_spending_pct: 4.7, primary_enrollment: 90, secondary_enrollment: 40, tertiary_enrollment: 10, pisa_score: 350, teachers_per_100: 2.0, gdp_per_capita: 936 },
    { country: 'פולין', edu_spending_pct: 5.0, primary_enrollment: 99, secondary_enrollment: 94, tertiary_enrollment: 65, pisa_score: 514, teachers_per_100: 6.0, gdp_per_capita: 18000 },
    { country: 'סינגפור', edu_spending_pct: 2.9, primary_enrollment: 99, secondary_enrollment: 99, tertiary_enrollment: 91, pisa_score: 564, teachers_per_100: 6.8, gdp_per_capita: 82808 },
    { country: 'אינדונזיה', edu_spending_pct: 3.5, primary_enrollment: 99, secondary_enrollment: 83, tertiary_enrollment: 38, pisa_score: 382, teachers_per_100: 4.5, gdp_per_capita: 4788 },
    { country: 'מקסיקו', edu_spending_pct: 4.3, primary_enrollment: 99, secondary_enrollment: 83, tertiary_enrollment: 40, pisa_score: 415, teachers_per_100: 4.2, gdp_per_capita: 10046 },
  ],
};

export const ALL_DATASETS: Dataset[] = [
  worldData,
  climateData,
  olympicsData,
  spaceData,
  educationData,
];
