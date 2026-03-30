/**
 * list_slides.js — List slides in a time range
 *
 * Usage:
 *   node tools/list_slides.js                → all slides
 *   node tools/list_slides.js 300 400        → slides between 300s and 400s
 *   node tools/list_slides.js 5:00 7:00      → slides between 5min and 7min
 */
const fs = require('fs');

function parseTime(s) {
  if (!s) return null;
  if (s.includes(':')) {
    const [m, sec] = s.split(':');
    return parseInt(m) * 60 + parseFloat(sec);
  }
  return parseFloat(s);
}

function fmt(t) {
  const m = Math.floor(t / 60);
  const s = (t % 60).toFixed(2).padStart(5, '0');
  return `${m}:${s}`;
}

const from = parseTime(process.argv[2]) || 0;
const to = parseTime(process.argv[3]) || 99999;

const slides = JSON.parse(fs.readFileSync('data/slides.json', 'utf-8'));
const filtered = slides.filter(s => s.time >= from && s.time <= to);

console.log(`Slides ${fmt(from)} → ${fmt(to)} (${filtered.length} of ${slides.length}):\n`);

for (let i = 0; i < filtered.length; i++) {
  const s = filtered[i];
  const globalIdx = slides.indexOf(s);
  const next = globalIdx < slides.length - 1 ? slides[globalIdx + 1] : null;
  const dur = next ? (next.time - s.time).toFixed(1) : '-';
  const gap = next && next.time - s.time > 7 ? ' ⚠️ GAP' : '';
  console.log(`  S${String(s.id).padEnd(4)} @ ${fmt(s.time).padEnd(10)} (${dur}s)${gap}`);
}
