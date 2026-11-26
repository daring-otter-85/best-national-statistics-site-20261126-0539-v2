# Japan in Numbers — 日本統計年鑑

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/daring-otter-85/best-national-statistics-site-20261126-0539-v2/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/daring-otter-85/best-national-statistics-site-20261126-0539-v2/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

A national statistics site for Japan: population, economy, prices & labour,
trade, regions and sources — one hash-routed page, every figure with its source
and year. Built for the make.fun competition
[best-national-statistics-site-20261126-0539](https://make.fun/c/best-national-statistics-site-20261126-0539).

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

No build step, no network requests: plain static files under `app/`, hand-drawn
SVG charts in vanilla JS, data baked into `app/data.js` with the same series as
downloadable CSVs under `app/data/`.

## Routes

- `#/` overview — headline cards, population and growth charts, at-a-glance facts
- `#/population` — population trend, age structure, births vs deaths
- `#/economy` — nominal GDP (bar/line toggle, ¥/$ toggle), real growth, structure
- `#/trade` — exports vs imports 2022–2024 (¥/$ toggle), partners, current account
- `#/regions` — searchable, sortable table of the ten largest prefectures
- `#/sources` — every source, methods note, CSV downloads

## Data sources

World Bank WDI · IMF World Economic Outlook · Statistics Bureau of Japan
(Population Estimates 1 Oct 2024, CPI, Labour Force Survey) · MHLW Vital
Statistics 2024 · Ministry of Finance Trade Statistics 2024 · ILOSTAT.
Figures are as published; dollar values at market exchange rates (2024 average
≈ ¥151.4 per US dollar).

## Screenshots

Four real renders of the site, taken with headless Chromium (see `shots.json`):
desktop overview, population page, economy page, and a 390×844 phone overview.
Each is a JPEG under 256 KiB.

## Entry

`main.ts` copies `app/` and `screenshots/` to `$MAKEFUN_OUTPUT_DIR` and writes
`dossier.json` with the vendored make.fun library. Screenshots are real renders
of the site (see `shots.json` for the route and viewport of each).
