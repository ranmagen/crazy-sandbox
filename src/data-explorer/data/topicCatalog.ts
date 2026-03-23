export interface TopicEntry {
  id: number;
  title: string;
  category: TopicCategory;
  url: string;
}

export type TopicCategory =
  | 'סביבה'
  | 'חברה'
  | 'מדע'
  | 'כלכלה'
  | 'בריאות'
  | 'טכנולוגיה'
  | 'גיאוגרפיה';

export const CATEGORY_EMOJI: Record<TopicCategory, string> = {
  'סביבה': '🌿',
  'חברה': '👥',
  'מדע': '🔬',
  'כלכלה': '💰',
  'בריאות': '❤️',
  'טכנולוגיה': '💻',
  'גיאוגרפיה': '🗺️',
};

export const TOPIC_CATALOG: TopicEntry[] = [
  { id: 1,  title: 'טמפרטורות כדור הארץ (1880–היום)',    category: 'סביבה',     url: 'https://data.giss.nasa.gov/gistemp/' },
  { id: 2,  title: 'פליטות CO2 לפי מדינה',               category: 'סביבה',     url: 'https://ourworldindata.org/co2-emissions' },
  { id: 3,  title: 'עליית מפלס הים',                     category: 'סביבה',     url: 'https://sealevel.nasa.gov/data/dataportal/' },
  { id: 4,  title: 'כריתת יערות — שינוי שטח היערות',    category: 'סביבה',     url: 'https://ourworldindata.org/forests' },
  { id: 5,  title: 'איכות אוויר בערים ברחבי העולם',     category: 'סביבה',     url: 'https://openaq.org/' },
  { id: 6,  title: 'מינים בסכנת הכחדה',                 category: 'סביבה',     url: 'https://www.iucnredlist.org/resources/summary-statistics' },
  { id: 7,  title: 'אינדקס אושר עולמי',                  category: 'חברה',      url: 'https://worldhappiness.report/data/' },
  { id: 8,  title: 'אי-שוויון הכנסות (מדד ג\'יני)',      category: 'חברה',      url: 'https://data.worldbank.org/indicator/SI.POV.GINI' },
  { id: 9,  title: 'אוריינות ורמת השכלה עולמית',         category: 'חברה',      url: 'https://data.uis.unesco.org/' },
  { id: 10, title: 'נישואי ילדות בעולם',                 category: 'חברה',      url: 'https://data.unicef.org/topic/child-protection/child-marriage/' },
  { id: 11, title: 'נתוני NBA — סטטיסטיקות שחקנים',     category: 'חברה',      url: 'https://www.kaggle.com/datasets/justinas/nba-players-data' },
  { id: 12, title: 'תוצאות מונדיאל — כל הגביעים',       category: 'חברה',      url: 'https://www.kaggle.com/datasets/abecklas/fifa-world-cup' },
  { id: 13, title: 'גירושים ונישואים לפי מדינה',        category: 'חברה',      url: 'https://ourworldindata.org/marriages-and-divorces' },
  { id: 14, title: 'רעידות אדמה ברחבי העולם',           category: 'מדע',       url: 'https://earthquake.usgs.gov/earthquakes/search/' },
  { id: 15, title: 'אקסופלנטות — כוכבי לכת מחוץ למערכת השמש', category: 'מדע', url: 'https://exoplanetarchive.ipac.caltech.edu/' },
  { id: 16, title: 'מאובנים ומינים פרהיסטוריים',        category: 'מדע',       url: 'https://paleobiodb.org/' },
  { id: 17, title: 'הרי געש — פעילות ואירועים',         category: 'מדע',       url: 'https://volcano.si.edu/volcanolist_eruptions.cfm' },
  { id: 18, title: 'מטאוריטים שנפלו על כדור הארץ',     category: 'מדע',       url: 'https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh' },
  { id: 19, title: 'מזג אוויר היסטורי עולמי',           category: 'מדע',       url: 'https://open-meteo.com/' },
  { id: 20, title: 'גנום אנושי — נתוני DNA',            category: 'מדע',       url: 'https://www.ncbi.nlm.nih.gov/genome/' },
  { id: 21, title: 'GDP — תוצר לאומי גולמי לפי מדינה', category: 'כלכלה',     url: 'https://data.worldbank.org/indicator/NY.GDP.MKTP.CD' },
  { id: 22, title: 'שכר מינימום לפי מדינה',             category: 'כלכלה',     url: 'https://stats.oecd.org/Index.aspx?DataSetCode=RMW' },
  { id: 23, title: 'מחירי נפט גולמי — היסטוריה',       category: 'כלכלה',     url: 'https://datahub.io/core/oil-prices' },
  { id: 24, title: 'מדד מחירים לצרכן (אינפלציה)',       category: 'כלכלה',     url: 'https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG' },
  { id: 25, title: 'מניות ושווקים פיננסיים',            category: 'כלכלה',     url: 'https://finance.yahoo.com/' },
  { id: 26, title: 'תוחלת חיים עולמית',                 category: 'בריאות',    url: 'https://ourworldindata.org/life-expectancy' },
  { id: 27, title: 'נתוני קורונה גלובליים',             category: 'בריאות',    url: 'https://ourworldindata.org/coronavirus' },
  { id: 28, title: 'עישון ומחלות — שכיחות עולמית',     category: 'בריאות',    url: 'https://ourworldindata.org/smoking' },
  { id: 29, title: 'סרטן — שכיחות ותמותה לפי מדינה',   category: 'בריאות',    url: 'https://www.who.int/data/gho/data/themes/cancer' },
  { id: 30, title: 'השמנת יתר ותזונה',                  category: 'בריאות',    url: 'https://ourworldindata.org/obesity' },
  { id: 31, title: 'נתוני חיסונים עולמיים',             category: 'בריאות',    url: 'https://ourworldindata.org/vaccination' },
  { id: 32, title: 'שימוש באינטרנט לפי מדינה',         category: 'טכנולוגיה', url: 'https://data.worldbank.org/indicator/IT.NET.USER.ZS' },
  { id: 33, title: 'סדרות ב-Netflix — ז\'אנר שנה דירוג', category: 'טכנולוגיה', url: 'https://www.kaggle.com/datasets/shivamb/netflix-shows' },
  { id: 34, title: 'אפליקציות Google Play — מיליוני נתונים', category: 'טכנולוגיה', url: 'https://www.kaggle.com/datasets/gauthamp10/google-playstore-apps' },
  { id: 35, title: 'כלי AI — סקר שימוש ומגמות',        category: 'טכנולוגיה', url: 'https://ourworldindata.org/artificial-intelligence' },
  { id: 36, title: 'ספאם ופישינג — נתוני אבטחת סייבר', category: 'טכנולוגיה', url: 'https://www.kaggle.com/datasets/uciml/sms-spam-collection-dataset' },
  { id: 37, title: 'צפיפות אוכלוסין לפי מדינה',        category: 'גיאוגרפיה', url: 'https://data.worldbank.org/indicator/EN.POP.DNST' },
  { id: 38, title: 'הגירה ופליטים — תנועת אוכלוסיות',  category: 'גיאוגרפיה', url: 'https://www.unhcr.org/refugee-statistics/' },
  { id: 39, title: 'ערים גדולות — גודל גובה מיקום',    category: 'גיאוגרפיה', url: 'https://simplemaps.com/data/world-cities' },
  { id: 40, title: 'מפת עוני עולמית',                   category: 'גיאוגרפיה', url: 'https://data.worldbank.org/topic/poverty' },
];

export const TOPICS_BY_CATEGORY = TOPIC_CATALOG.reduce<Record<TopicCategory, TopicEntry[]>>(
  (acc, topic) => {
    if (!acc[topic.category]) acc[topic.category] = [];
    acc[topic.category].push(topic);
    return acc;
  },
  {} as Record<TopicCategory, TopicEntry[]>
);
