// HTML for each page, built from the data in data.js. Every value is escaped
// before it goes into the page. Controls are plain links, buttons and selects;
// main.js wires them up, so every control on every page works.

import {
  AGE_2024,
  CPI,
  ECONOMY_FACTS,
  FX_2024,
  GDP_GROWTH,
  GDP_NOMINAL,
  GLANCE,
  HEADLINES,
  LABOUR_FACTS,
  POPULATION,
  PREFECTURES,
  TRADE_DEFICIT,
  TRADE_EXPORTS,
  TRADE_FACTS,
  TRADE_IMPORTS,
  TRADE_YEARS,
  UNEMPLOYMENT,
  VITAL_2024,
  YEARS,
  fmt,
} from './data.js';
import { barChart, groupedBarChart, hbarChart, lineChart } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

function srcNote(text) {
  return `<p class="src">Source: ${esc(text)}</p>`;
}

function yearSelect(state) {
  const opts = [2015, 2016, 2017, 2018, 2019, 2020]
    .map((y) => `<option value="${y}"${state.fromYear === y ? ' selected' : ''}>from ${y}</option>`)
    .join('');
  return `<label class="control">Show series <select data-control="from-year">${opts}</select></label>`;
}

function sliced(state) {
  const i = YEARS.indexOf(state.fromYear);
  return { years: YEARS.slice(i), idx: i };
}

export function overview(state) {
  const cards = HEADLINES.map(
    (h) => `<div class="card"><div class="card-label">${esc(h.label)}</div>
      <div class="card-value">${esc(h.value)}</div>
      <div class="card-sub">${esc(h.sub)}</div>
      <div class="card-detail">${esc(h.detail)}</div></div>`,
  ).join('');
  const glance = GLANCE.map((g) => `<li><span>${esc(g.k)}</span><b>${esc(g.v)}</b></li>`).join('');
  return `
  <section class="hero">
    <p class="eyebrow">日本統計年鑑 · Japan Statistics</p>
    <h1>Japan in Numbers</h1>
    <p class="lede">The key facts about Japan — population, economy, prices, work,
    trade and regions — in one place, every figure with its source and year.</p>
  </section>
  <div class="cards">${cards}</div>
  ${srcNote('Headline figures: World Bank WDI, IMF World Economic Outlook, Statistics Bureau of Japan, MHLW — all 2024 unless noted.')}
  <div class="grid2">
    <section class="panel">
      <h2>Population is shrinking</h2>
      ${lineChart({ labels: YEARS.map(String), values: POPULATION, unit: 'm', color: '#1f3a5f', decimals: 1 })}
      <p class="panel-note">Total population, millions. Down every year since the 128.5m peak in 2010.</p>
      ${srcNote('World Bank, World Development Indicators, 2015–2024.')}
      <p><a class="btn" href="#/population">Population in detail →</a></p>
    </section>
    <section class="panel">
      <h2>Growth is slow, prices are up</h2>
      ${barChart({ labels: YEARS.map(String), values: GDP_GROWTH, unit: '%', color: '#1f3a5f', decimals: 1 })}
      <p class="panel-note">Real GDP growth, % per year. 2020 is the pandemic crash (−4.2%).</p>
      ${srcNote('World Bank, World Development Indicators, 2015–2024.')}
      <p><a class="btn" href="#/economy">Economy in detail →</a></p>
    </section>
  </div>
  <section class="panel">
    <h2>Japan at a glance</h2>
    <ul class="glance">${glance}</ul>
  </section>
  <nav class="tiles">
    <a href="#/population"><b>Population</b><span>Shrinking, ageing, regionally concentrated</span></a>
    <a href="#/economy"><b>Economy</b><span>$4.02trn GDP, services-led, high public debt</span></a>
    <a href="#/prices-labour"><b>Prices &amp; labour</b><span>Inflation back, unemployment at 2.5%</span></a>
    <a href="#/trade"><b>Trade</b><span>Record exports, a 4th straight deficit</span></a>
    <a href="#/regions"><b>Regions</b><span>47 prefectures, Tokyo on top</span></a>
    <a href="#/sources"><b>Sources &amp; data</b><span>Where every number comes from, plus CSVs</span></a>
  </nav>`;
}

export function population(state) {
  const { years, idx } = sliced(state);
  const pop = POPULATION.slice(idx);
  const vital = [
    { k: 'Births, 2024', v: '720,988', s: 'Lowest since records began in 1899 (MHLW, preliminary)' },
    { k: 'Deaths, 2024', v: '1,618,684', s: 'A new high; more than twice the births (MHLW, preliminary)' },
    { k: 'Natural change, 2024', v: '−897,696', s: 'Deaths minus births (MHLW)' },
    { k: 'Fertility rate, 2024', v: '1.15', s: 'Record low, down from 1.20 in 2023 (MHLW, final)' },
  ];
  const cards = vital.map((c) => `<div class="card"><div class="card-label">${esc(c.k)}</div>
    <div class="card-value">${esc(c.v)}</div><div class="card-detail">${esc(c.s)}</div></div>`).join('');
  const ageRows = AGE_2024.map((a, i) => ({
    label: a.group,
    value: a.share,
    color: ['#7ba7d9', '#1f3a5f', '#b91c1c'][i],
  }));
  return `
  <h1>Population</h1>
  <p class="lede">Japan is shrinking by about half a million people a year — and getting older fast.</p>
  <div class="controls">${yearSelect(state)}</div>
  <section class="panel">
    <h2>Total population, 2015–2024</h2>
    ${lineChart({ labels: years.map(String), values: pop, unit: 'm', color: '#1f3a5f', decimals: 1 })}
    ${srcNote('World Bank, World Development Indicators. Total population 124.0m in 2024; the 2010 peak was 128.5m.')}
  </section>
  <section class="panel">
    <h2>Age structure, 2024</h2>
    ${hbarChart({ rows: ageRows, unit: '%' })}
    <p class="panel-note">Nearly three in ten people are 65 or older — the second-oldest population in the world, after Monaco.</p>
    ${srcNote('World Bank, World Development Indicators, 2024.')}
  </section>
  <div class="cards">${cards}</div>
  <section class="panel">
    <h2>Why it matters</h2>
    <p>With 721,000 births against 1.62 million deaths in 2024, the natural decrease
    reached almost 900,000 people — the 18th straight year of decline. The working-age
    share (15–64) has fallen to 58.8%, which is why labour shortages and the push for
    automation and foreign workers dominate Japan's policy debate.</p>
    ${srcNote('MHLW, Vital Statistics (preliminary 2024, incl. foreign residents; fertility final, Japanese nationals).')}
  </section>`;
}

export function economy(state) {
  const { years, idx } = sliced(state);
  const gdp = GDP_NOMINAL.slice(idx);
  const growth = GDP_GROWTH.slice(idx);
  const useYen = state.currency === 'JPY';
  const gdpValues = useYen ? gdp.map((v) => v * FX_2024) : gdp;
  const gdpUnit = useYen ? '¥trn' : '$trn';
  const gdpDecimals = useYen ? 0 : 2;
  const chart =
    state.gdpChart === 'line'
      ? lineChart({ labels: years.map(String), values: gdpValues, unit: useYen ? '' : '', color: '#1f3a5f', decimals: gdpDecimals })
      : barChart({ labels: years.map(String), values: gdpValues, unit: useYen ? '' : '', color: '#1f3a5f', decimals: gdpDecimals });
  const facts = ECONOMY_FACTS.map((f) => `<li><span>${esc(f.k)}</span><b>${esc(f.v)}</b></li>`).join('');
  return `
  <h1>Economy</h1>
  <p class="lede">The world's fourth-largest economy by nominal GDP — services-led, export-driven, and carrying the heaviest public debt load in the developed world.</p>
  <div class="controls">
    ${yearSelect(state)}
    <span class="control">Chart
      <button data-control="chart-type" data-value="bar" class="${state.gdpChart === 'bar' ? 'active' : ''}">Bars</button>
      <button data-control="chart-type" data-value="line" class="${state.gdpChart === 'line' ? 'active' : ''}">Line</button>
    </span>
    <span class="control">Currency
      <button data-control="currency">${useYen ? 'Show in $' : 'Show in ¥'}</button>
    </span>
  </div>
  <section class="panel">
    <h2>GDP, nominal, ${useYen ? '¥ trillion' : 'US$ trillion'}</h2>
    ${chart}
    <p class="panel-note">${useYen ? 'Converted at ¥151.4 per $ (2024 average).' : 'The fall after 2021 is mostly the weak yen, not a smaller economy in yen terms.'}</p>
    ${srcNote('World Bank, World Development Indicators, 2015–2024.')}
  </section>
  <section class="panel">
    <h2>Real GDP growth, % per year</h2>
    ${lineChart({ labels: years.map(String), values: growth, unit: '%', color: '#b91c1c', decimals: 1 })}
    ${srcNote('World Bank, World Development Indicators, 2015–2024.')}
  </section>
  <section class="panel">
    <h2>Structure of the economy</h2>
    <ul class="glance">${facts}</ul>
    <p>Industry still matters — cars, electronics, machinery and chemicals anchor exports — but
    almost three-quarters of workers are in services, and agriculture employs under 3%.</p>
    ${srcNote('Employment shares: ILOSTAT, 2024. R&D: OECD, 2023. Government debt: IMF, 2025.')}
  </section>`;
}

export function pricesLabour(state) {
  const { years, idx } = sliced(state);
  const cpi = CPI.slice(idx);
  const unemp = UNEMPLOYMENT.slice(idx);
  const facts = LABOUR_FACTS.map((f) => `<li><span>${esc(f.k)}</span><b>${esc(f.v)}</b></li>`).join('');
  return `
  <h1>Prices &amp; labour</h1>
  <p class="lede">After decades of flat prices, inflation is back above 2% — while unemployment stays among the lowest in the developed world.</p>
  <div class="controls">${yearSelect(state)}</div>
  <section class="panel">
    <h2>CPI inflation, % per year</h2>
    ${lineChart({ labels: years.map(String), values: cpi, unit: '%', color: '#b91c1c', decimals: 1 })}
    <p class="panel-note">Prices were flat or falling until 2021; 2023's +3.3% was the fastest in four decades.</p>
    ${srcNote('Statistics Bureau of Japan, Consumer Price Index, 2015–2024.')}
  </section>
  <section class="panel">
    <h2>Unemployment rate, %</h2>
    ${lineChart({ labels: years.map(String), values: unemp, unit: '%', color: '#1f3a5f', decimals: 1 })}
    <p class="panel-note">Unemployment never topped 3.4% in the last decade — 2.5% in 2024, with chronic labour shortages.</p>
    ${srcNote('Statistics Bureau of Japan, Labour Force Survey, 2015–2024.')}
  </section>
  <section class="panel">
    <h2>Labour market</h2>
    <ul class="glance">${facts}</ul>
    ${srcNote('Statistics Bureau of Japan, Labour Force Survey; ILOSTAT.')}
  </section>`;
}

export function trade(state) {
  const useUsd = state.currency === 'USD';
  const conv = (v) => (useUsd ? v / FX_2024 : v);
  const unit = useUsd ? '$trn' : '¥trn';
  const decimals = useUsd ? 2 : 1;
  const exp = TRADE_EXPORTS.map(conv);
  const imp = TRADE_IMPORTS.map(conv);
  const facts = TRADE_FACTS.map((f) => `<li><span>${esc(f.k)}</span><b>${esc(f.v)}</b></li>`).join('');
  return `
  <h1>Trade</h1>
  <p class="lede">Exports hit a record ¥107.9 trillion in 2024 — but imports were bigger still, leaving a fourth straight goods deficit.</p>
  <div class="controls">
    <span class="control">Currency
      <button data-control="currency">${useUsd ? 'Show in ¥' : 'Show in $'}</button>
    </span>
  </div>
  <section class="panel">
    <h2>Goods exports vs imports, ${unit}</h2>
    ${groupedBarChart({
      labels: TRADE_YEARS.map(String),
      series: [
        { label: 'Exports', values: exp, color: '#1f3a5f' },
        { label: 'Imports', values: imp, color: '#b91c1c' },
      ],
      unit: '',
      decimals,
    })}
    <p class="panel-note">${useUsd ? 'Converted at ¥151.4 per $ (2024 average).' : 'The deficit narrowed from ¥20.0trn in 2022 to ¥5.3trn in 2024.'}</p>
    ${srcNote('Ministry of Finance, Trade Statistics of Japan, calendar years 2022–2024.')}
  </section>
  <section class="panel">
    <h2>Trade in 2024</h2>
    <ul class="glance">${facts}</ul>
    <p>Japan runs a goods deficit but a large current-account surplus — income from its
    overseas investments (¥30.38 trillion in FY2024) more than covers the trade gap.
    China is the largest trading partner on both sides; the United States is second.</p>
    ${srcNote('Ministry of Finance, Trade Statistics and Balance of Payments, 2024 / FY2024.')}
  </section>`;
}

export function regions(state) {
  const key = state.prefSort.key;
  const dir = state.prefSort.dir;
  const rows = [...PREFECTURES].sort((a, b) => {
    if (key === 'name') return dir * a.name.localeCompare(b.name);
    return dir * (a[key] - b[key]);
  });
  const arrow = (k) => (key === k ? (dir === 1 ? ' ▲' : ' ▼') : '');
  const body = rows
    .map(
      (p, i) => `<tr><td>${i + 1}</td><td>${esc(p.name)}</td><td>${esc(p.jp)}</td>
        <td class="num">${fmt(p.pop, 2)}</td><td class="num">${fmt(p.share, 1)}%</td></tr>`,
    )
    .join('');
  return `
  <h1>Regions</h1>
  <p class="lede">More than half of Japan lives in ten prefectures — and Greater Tokyo alone holds about 37 million people.</p>
  <section class="panel">
    <h2>Ten largest prefectures, 2024</h2>
    <p><label class="control">Search <input type="search" data-control="pref-search" placeholder="Type a prefecture…" value="${esc(state.prefQuery)}"></label></p>
    <div class="table-wrap"><table id="pref-table">
      <thead><tr>
        <th>#</th>
        <th><button data-control="pref-sort" data-key="name">Prefecture${arrow('name')}</button></th>
        <th>日本語</th>
        <th><button data-control="pref-sort" data-key="pop">Population (m)${arrow('pop')}</button></th>
        <th><button data-control="pref-sort" data-key="share">Share${arrow('share')}</button></th>
      </tr></thead>
      <tbody>${body}</tbody>
    </table></div>
    <p class="panel-note">Click a column heading to sort; type in the search box to filter. The top five prefectures hold 37.9% of the country.</p>
    ${srcNote('Statistics Bureau of Japan, Population Estimates, 1 October 2024 (incl. foreign residents).')}
  </section>
  <section class="panel">
    <h2>Tokyo and the rest</h2>
    <p>Tokyo (14.18m) is the only prefecture still growing. The other 46 all shrank in 2024,
    and the smallest — Tottori (0.53m) — has fewer people than a single Tokyo ward.
    Greater Tokyo, the world's largest metropolitan area at roughly 37 million, holds
    about three in ten Japanese.</p>
    ${srcNote('Statistics Bureau of Japan, Population Estimates, 1 October 2024.')}
  </section>`;
}

export function sources() {
  return `
  <h1>Sources &amp; data</h1>
  <p class="lede">Every figure on this site comes from an official source. Download the data and check it yourself.</p>
  <section class="panel">
    <h2>Sources</h2>
    <ul class="sources">
      <li><b>World Bank, World Development Indicators</b> — population, GDP, life expectancy, age structure (2024 vintage).</li>
      <li><b>IMF, World Economic Outlook</b> — nominal GDP and GDP per capita, government debt (2024/2025).</li>
      <li><b>Statistics Bureau of Japan</b> — Population Estimates, 1 October 2024; Consumer Price Index; Labour Force Survey.</li>
      <li><b>Ministry of Health, Labour and Welfare</b> — Vital Statistics 2024 (births, deaths, fertility).</li>
      <li><b>Ministry of Finance, Japan</b> — Trade Statistics (calendar 2024) and Balance of Payments (FY2024).</li>
      <li><b>ILOSTAT</b> — employment by sector, 2024.</li>
    </ul>
    <h2>Methods &amp; vintage</h2>
    <p>Figures are as published. Dollar values are at market exchange rates; the 2024
    average was about ¥151.4 per US dollar. Population is the World Bank series unless
    a prefecture table says otherwise (Statistics Bureau estimates, 1 October 2024,
    including foreign residents). Vital-statistics births and deaths are the MHLW
    preliminary counts including foreign residents; the fertility rate is the final
    figure for Japanese nationals. Trade is calendar-year unless a fiscal year (FY) is stated.</p>
    <h2>Download the data (CSV)</h2>
    <ul class="downloads">
      <li><a href="data/population.csv" download>population.csv</a> — total population and age structure, 2015–2024</li>
      <li><a href="data/gdp.csv" download>gdp.csv</a> — nominal GDP and real growth, 2015–2024</li>
      <li><a href="data/cpi-unemployment.csv" download>cpi-unemployment.csv</a> — CPI inflation and unemployment, 2015–2024</li>
      <li><a href="data/trade.csv" download>trade.csv</a> — exports, imports and deficit, 2022–2024</li>
      <li><a href="data/prefectures.csv" download>prefectures.csv</a> — ten largest prefectures, 2024</li>
    </ul>
  </section>`;
}

export function missing() {
  return `<h1>Not found</h1>
  <p>There is no page at this address. <a href="#/">Back to the overview</a>.</p>`;
}
