// Hand-drawn SVG charts, no libraries. Every chart is a plain <svg> string with a
// viewBox, so it scales to any screen and stays sharp on phones.

function niceTicks(min, max, count = 4) {
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const span = max - min;
  const stepRaw = span / count;
  const mag = 10 ** Math.floor(Math.log10(stepRaw));
  const norm = stepRaw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10) * mag;
  const start = Math.floor(min / step) * step;
  const ticks = [];
  for (let v = start; v <= max + step * 0.5; v += step) ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

// Line chart. labels: x labels, values: y values, unit: suffix for axis labels.
export function lineChart({ labels, values, unit = '', color = '#1f3a5f', w = 720, h = 280, decimals = 1, ymin = null, ymax = null }) {
  const padL = 52;
  const padR = 16;
  const padT = 18;
  const padB = 30;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  let lo = ymin ?? Math.min(...values);
  let hi = ymax ?? Math.max(...values);
  if (lo === hi) {
    lo -= 1;
    hi += 1;
  }
  const pad = (hi - lo) * 0.08;
  lo -= pad;
  hi += pad;
  const x = (i) => padL + (iw * i) / (labels.length - 1);
  const y = (v) => padT + ih - ((v - lo) / (hi - lo)) * ih;
  const ticks = niceTicks(lo, hi, 4);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Line chart" preserveAspectRatio="xMidYMid meet">`;
  for (const t of ticks) {
    s += `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="#e5e7eb" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="#6b7280">${t.toFixed(decimals)}${unit}</text>`;
  }
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  s += `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  values.forEach((v, i) => {
    s += `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="${color}"/>`;
  });
  const last = values.length - 1;
  s += `<text x="${x(last)}" y="${y(values[last]) - 10}" text-anchor="end" font-size="13" font-weight="700" fill="${color}">${values[last].toFixed(decimals)}${unit}</text>`;
  labels.forEach((lb, i) => {
    if (i % 2 === 0 || i === labels.length - 1) {
      s += `<text x="${x(i)}" y="${h - 8}" text-anchor="middle" font-size="12" fill="#6b7280">${esc(lb)}</text>`;
    }
  });
  return `${s}</svg>`;
}

// Vertical bar chart, one series. Negative values draw below the zero line.
export function barChart({ labels, values, unit = '', color = '#1f3a5f', w = 720, h = 280, decimals = 1 }) {
  const padL = 52;
  const padR = 16;
  const padT = 24;
  const padB = 30;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const lo = Math.min(0, ...values);
  const hi = Math.max(0, ...values);
  const span = hi - lo || 1;
  const y = (v) => padT + ih - ((v - lo) / span) * ih;
  const ticks = niceTicks(lo, hi, 4);
  const slot = iw / labels.length;
  const bw = Math.min(46, slot * 0.62);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Bar chart" preserveAspectRatio="xMidYMid meet">`;
  for (const t of ticks) {
    s += `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="#e5e7eb" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="#6b7280">${t.toFixed(decimals)}${unit}</text>`;
  }
  s += `<line x1="${padL}" y1="${y(0)}" x2="${w - padR}" y2="${y(0)}" stroke="#9ca3af" stroke-width="1.5"/>`;
  values.forEach((v, i) => {
    const bx = padL + slot * i + (slot - bw) / 2;
    const top = Math.min(y(0), y(v));
    const ht = Math.abs(y(v) - y(0));
    const fill = v < 0 ? '#b91c1c' : color;
    s += `<rect x="${bx.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(ht, 1).toFixed(1)}" rx="3" fill="${fill}"/>`;
    s += `<text x="${(bx + bw / 2).toFixed(1)}" y="${(v < 0 ? y(v) + 16 : top - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="#374151">${v.toFixed(decimals)}</text>`;
    s += `<text x="${(padL + slot * i + slot / 2).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="12" fill="#6b7280">${esc(labels[i])}</text>`;
  });
  return `${s}</svg>`;
}

// Grouped vertical bars: series = [{ label, values, color }].
export function groupedBarChart({ labels, series, unit = '', w = 720, h = 300, decimals = 1 }) {
  const padL = 52;
  const padR = 16;
  const padT = 28;
  const padB = 30;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const all = series.flatMap((s) => s.values);
  const lo = Math.min(0, ...all);
  const hi = Math.max(0, ...all);
  const span = hi - lo || 1;
  const y = (v) => padT + ih - ((v - lo) / span) * ih;
  const ticks = niceTicks(lo, hi, 4);
  const slot = iw / labels.length;
  const bw = Math.min(44, (slot * 0.7) / series.length);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Grouped bar chart" preserveAspectRatio="xMidYMid meet">`;
  for (const t of ticks) {
    s += `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="#e5e7eb" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="#6b7280">${t.toFixed(decimals)}${unit}</text>`;
  }
  labels.forEach((lb, i) => {
    series.forEach((ser, j) => {
      const v = ser.values[i];
      const bx = padL + slot * i + (slot - bw * series.length) / 2 + j * bw;
      s += `<rect x="${bx.toFixed(1)}" y="${y(v).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(y(0) - y(v), 1).toFixed(1)}" rx="3" fill="${ser.color}"/>`;
      s += `<text x="${(bx + bw / 2).toFixed(1)}" y="${(y(v) - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="#374151">${v.toFixed(decimals)}</text>`;
    });
    s += `<text x="${(padL + slot * i + slot / 2).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="12" fill="#6b7280">${esc(lb)}</text>`;
  });
  const legend = series.map((ser) => `<span class="legend-item"><i style="background:${ser.color}"></i>${esc(ser.label)}</span>`).join('');
  return `<div class="chart-legend">${legend}</div>${s}</svg>`;
}

// Horizontal bars for shares (e.g. age structure): rows = [{ label, value, color }].
export function hbarChart({ rows, unit = '%', w = 720, decimals = 1 }) {
  const rowH = 44;
  const h = rows.length * rowH + 12;
  const padL = 90;
  const padR = 70;
  const max = Math.max(...rows.map((r) => r.value));
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Horizontal bar chart" preserveAspectRatio="xMidYMid meet">`;
  rows.forEach((r, i) => {
    const y = 12 + i * rowH;
    const bw = ((w - padL - padR) * r.value) / max;
    s += `<text x="${padL - 10}" y="${y + 22}" text-anchor="end" font-size="14" fill="#1f2937">${esc(r.label)}</text>`;
    s += `<rect x="${padL}" y="${y + 6}" width="${Math.max(bw, 2).toFixed(1)}" height="22" rx="4" fill="${r.color}"/>`;
    s += `<text x="${(padL + bw + 8).toFixed(1)}" y="${y + 22}" font-size="14" font-weight="700" fill="#1f2937">${r.value.toFixed(decimals)}${unit}</text>`;
  });
  return `${s}</svg>`;
}
