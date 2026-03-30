/**
 * add_slide.js — Add a slide to the timeline at the right position
 *
 * Usage:
 *   node tools/add_slide.js <id> <time>
 *   node tools/add_slide.js 700 523.50
 *
 * Also works to UPDATE an existing slide's time:
 *   node tools/add_slide.js 700 525.00   → moves S700 to new time
 */
const fs = require('fs');

const id = parseInt(process.argv[2]);
const time = parseFloat(process.argv[3]);

if (!id || isNaN(time)) {
  console.log('Usage: node tools/add_slide.js <id> <time>');
  process.exit(1);
}

const slides = JSON.parse(fs.readFileSync('data/slides.json', 'utf-8'));

// Check if updating existing
const existing = slides.findIndex(s => s.id === id);
if (existing !== -1) {
  const old = slides[existing].time;
  slides[existing].time = time;
  slides.sort((a, b) => a.time - b.time);
  fs.writeFileSync('data/slides.json', JSON.stringify(slides, null, 2));
  console.log(`Updated S${id}: ${old.toFixed(2)}s → ${time.toFixed(2)}s`);
} else {
  slides.push({ id, time });
  slides.sort((a, b) => a.time - b.time);
  fs.writeFileSync('data/slides.json', JSON.stringify(slides, null, 2));
  console.log(`Added S${id} @ ${time.toFixed(2)}s (total: ${slides.length} slides)`);
}

// Show neighbors
const idx = slides.findIndex(s => s.id === id);
const prev = idx > 0 ? slides[idx - 1] : null;
const next = idx < slides.length - 1 ? slides[idx + 1] : null;
console.log('\nContext:');
if (prev) console.log(`  prev: S${prev.id} @ ${prev.time.toFixed(2)}s`);
console.log(`  >>>   S${id} @ ${time.toFixed(2)}s`);
if (next) console.log(`  next: S${next.id} @ ${next.time.toFixed(2)}s`);

console.log('\nRun: node build.js');
