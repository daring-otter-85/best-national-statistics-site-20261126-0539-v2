// Japan in Numbers — all figures verified 2026-11-26 against the sources named
// beside each series. Population and GDP series: World Bank WDI. Prefectures:
// Statistics Bureau of Japan, Population Estimates, 1 Oct 2024. Vital statistics:
// MHLW (2024 preliminary, incl. foreign residents; fertility is the final
// Japanese-nationals figure). CPI / unemployment: Statistics Bureau of Japan.
// Trade: Ministry of Finance, Trade Statistics (calendar years).

export const FX_2024 = 151.4; // average yen per US dollar in 2024, for the ¥/$ toggle

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Total population, millions (World Bank WDI). Peaked at 128.5m in 2010.
export const POPULATION = [127.1, 127.0, 126.8, 126.5, 126.3, 126.2, 125.7, 125.1, 124.5, 124.0];

// Age structure, % of population, 2024 (World Bank WDI).
export const AGE_2024 = [
  { group: '0–14', share: 11.4 },
  { group: '15–64', share: 58.8 },
  { group: '65+', share: 29.8 },
];

// Vital statistics, 2024 (MHLW). Births and deaths are preliminary figures
// including foreign residents; fertility is the final figure for Japanese nationals.
export const VITAL_2024 = {
  births: 720988,
  deaths: 1618684,
  naturalChange: -897696,
  fertility: 1.15,
  fertilityPrev: 1.2,
};

// GDP, nominal, US$ trillion (World Bank WDI). The $ fall after 2021 is the weak yen.
export const GDP_NOMINAL = [4.44, 5.0, 4.93, 5.04, 5.12, 5.04, 5.03, 4.26, 4.22, 4.02];

// Real GDP growth, % year on year (World Bank WDI).
export const GDP_GROWTH = [1.6, 0.8, 1.7, 0.6, -0.4, -4.2, 2.7, 1.0, 1.7, 0.1];

// CPI inflation, % (Statistics Bureau of Japan, all items, less imputed rent basis).
export const CPI = [0.8, -0.1, 0.5, 1.0, 0.5, 0.0, -0.2, 2.5, 3.3, 2.7];

// Unemployment rate, % (Statistics Bureau of Japan, Labour Force Survey).
export const UNEMPLOYMENT = [3.4, 3.1, 2.8, 2.4, 2.4, 2.8, 2.8, 2.6, 2.6, 2.5];

// Trade, ¥ trillion (Ministry of Finance, calendar years).
export const TRADE_YEARS = [2022, 2023, 2024];
export const TRADE_EXPORTS = [98.2, 100.9, 107.9];
export const TRADE_IMPORTS = [118.2, 110.2, 113.2];
export const TRADE_DEFICIT = [20.0, 9.3, 5.3];

// Ten largest prefectures, 1 Oct 2024 estimates, millions (Statistics Bureau).
// Shares are of the national total of 123.8m on the same date.
export const PREFECTURES = [
  { name: 'Tokyo', jp: '東京', pop: 14.18, share: 11.5 },
  { name: 'Kanagawa', jp: '神奈川', pop: 9.22, share: 7.4 },
  { name: 'Osaka', jp: '大阪', pop: 8.76, share: 7.1 },
  { name: 'Aichi', jp: '愛知', pop: 7.46, share: 6.0 },
  { name: 'Saitama', jp: '埼玉', pop: 7.33, share: 5.9 },
  { name: 'Chiba', jp: '千葉', pop: 6.28, share: 5.1 },
  { name: 'Hyogo', jp: '兵庫', pop: 5.37, share: 4.3 },
  { name: 'Hokkaido', jp: '北海道', pop: 5.11, share: 4.1 },
  { name: 'Fukuoka', jp: '福岡', pop: 5.1, share: 4.1 },
  { name: 'Shizuoka', jp: '静岡', pop: 3.53, share: 2.9 },
];

// Headline facts for the overview dashboard.
export const HEADLINES = [
  { label: 'Population', value: '124.0m', sub: '2024 · World Bank', detail: 'Down from a 128.5m peak in 2010' },
  { label: 'GDP (nominal)', value: '$4.02trn', sub: '2024 · IMF', detail: 'GDP per capita $32,443' },
  { label: 'CPI inflation', value: '+2.7%', sub: '2024 · Statistics Bureau', detail: 'After +3.3% in 2023' },
  { label: 'Unemployment', value: '2.5%', sub: '2024 · Statistics Bureau', detail: 'Labour force 69.3m' },
  { label: 'Life expectancy', value: '84.0 yrs', sub: '2024 · World Bank', detail: 'Among the longest in the world' },
  { label: 'Fertility rate', value: '1.15', sub: '2024 · MHLW', detail: 'Down from 1.20 in 2023' },
];

// At-a-glance facts (overview).
export const GLANCE = [
  { k: 'Capital', v: 'Tokyo' },
  { k: 'Currency', v: 'Yen (¥)' },
  { k: 'Land area', v: '377,975 km²' },
  { k: 'Population density', v: '≈328 people / km²' },
  { k: 'Urban population', v: '92.2% (2024)' },
  { k: 'Largest metro area', v: 'Greater Tokyo, ≈37m people' },
];

// Economy facts (economy page).
export const ECONOMY_FACTS = [
  { k: 'Employment shares, 2024', v: 'Agriculture 2.9% · Industry 23.3% · Services 73.8% (ILOSTAT)' },
  { k: 'R&D spending', v: '3.4% of GDP (2023)' },
  { k: 'Government gross debt', v: '≈230% of GDP (IMF, 2025)' },
  { k: 'GDP per capita', v: '$32,443 (2024, IMF)' },
];

// Labour facts (prices & labour page).
export const LABOUR_FACTS = [
  { k: 'Labour force', v: '69.3m people (2024)' },
  { k: 'Participation rate', v: '63.2–63.4% (2024/25)' },
  { k: 'Youth unemployment', v: '3.9% (2025)' },
];

// Trade facts (trade page).
export const TRADE_FACTS = [
  { k: 'Exports, 2024', v: '¥107.9trn — a record (MOF)' },
  { k: 'Imports, 2024', v: '¥113.2trn (MOF)' },
  { k: 'Goods trade deficit', v: '¥5.3trn — 4th straight year, down from ¥9.5trn in 2023' },
  { k: 'Goods exports / imports, $', v: '$707.4bn / $742.7bn (2024)' },
  { k: 'Current-account surplus', v: '¥30.38trn in FY2024 — a record (MOF)' },
  { k: 'Top partners', v: 'China largest (exports ¥18.9trn, imports ¥25.9trn, FY2024); United States second' },
  { k: 'Foreign reserves', v: '≈$1.37trn (2025)' },
];

export function fmt(n, decimals = 1) {
  return Number(n).toFixed(decimals);
}
