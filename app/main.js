// Japan in Numbers: hash-routed single page. Routes:
//   #/                overview
//   #/population      population & ageing
//   #/economy         GDP, growth, structure
//   #/prices-labour   CPI inflation & unemployment
//   #/trade           exports, imports, partners
//   #/regions         prefectures table
//   #/sources         sources, methods, CSV downloads
//
// State lives here (currency, chart type, year range, table sort). Every control
// on every page works: year selector, bar/line toggle, ¥/$ toggle, table sort and
// prefecture search. window.__shotReady is false while a page renders and true
// once it is on screen, so a screenshot script knows when to capture.

import { economy, missing, overview, population, pricesLabour, regions, sources, trade } from './views.js';

const app = document.getElementById('app');

const state = {
  currency: 'JPY', // 'JPY' | 'USD'
  fromYear: 2015,
  gdpChart: 'bar', // 'bar' | 'line'
  prefQuery: '',
  prefSort: { key: 'pop', dir: -1 },
};

const ROUTES = {
  '': overview,
  population,
  economy,
  'prices-labour': pricesLabour,
  trade,
  regions,
  sources,
};

const TITLES = {
  '': 'Japan in Numbers',
  population: 'Population | Japan in Numbers',
  economy: 'Economy | Japan in Numbers',
  'prices-labour': 'Prices & labour | Japan in Numbers',
  trade: 'Trade | Japan in Numbers',
  regions: 'Regions | Japan in Numbers',
  sources: 'Sources & data | Japan in Numbers',
};

function render() {
  window.__shotReady = false;
  const route = location.hash.replace(/^#\/?/, '').split('/')[0];
  const view = ROUTES[route] ?? missing;
  document.title = TITLES[route] ?? 'Not found | Japan in Numbers';
  app.innerHTML = view(state);
  document.querySelectorAll('nav.main a').forEach((a) => {
    const r = a.getAttribute('href').replace(/^#\/?/, '');
    a.classList.toggle('current', r === route);
  });
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-control]');
  if (!btn) return;
  const control = btn.dataset.control;
  if (control === 'currency') {
    state.currency = state.currency === 'JPY' ? 'USD' : 'JPY';
    render();
  } else if (control === 'chart-type') {
    state.gdpChart = btn.dataset.value;
    render();
  } else if (control === 'pref-sort') {
    const key = btn.dataset.key;
    if (state.prefSort.key === key) {
      state.prefSort.dir *= -1;
    } else {
      state.prefSort = { key, dir: key === 'name' ? 1 : -1 };
    }
    render();
  }
});

document.addEventListener('change', (e) => {
  const el = e.target.closest('[data-control]');
  if (!el) return;
  if (el.dataset.control === 'from-year') {
    state.fromYear = Number(el.value);
    render();
  }
});

// Prefecture search filters the table rows in place (no full re-render, so the
// search box keeps focus while typing).
document.addEventListener('input', (e) => {
  const el = e.target.closest('[data-control="pref-search"]');
  if (!el) return;
  state.prefQuery = el.value;
  const q = el.value.trim().toLowerCase();
  document.querySelectorAll('#pref-table tbody tr').forEach((tr) => {
    tr.style.display = q === '' || tr.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
});

render();
