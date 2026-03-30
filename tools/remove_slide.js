/**
 * remove_slide.js — Remove a slide from the timeline
 *
 * Usage:
 *   node tools/remove_slide.js <id>
 *   node tools/remove_slide.js 700
 */
const fs = require('fs');

const id = parseInt(process.argv[2]);

if (!id) {
  console.log('Usage: node tools/remove_slide.js <id>');
  process.exit(1);
}

const slides = JSON.parse(fs.readFileSync('data/slides.json', 'utf-8'));
const idx = slides.findIndex(s => s.id === id);

if (idx === -1) {
  console.error(`S${id} not found in slides.json`);
  process.exit(1);
}

const removed = slides.splice(idx, 1)[0];
fs.writeFileSync('data/slides.json', JSON.stringify(slides, null, 2));
console.log(`Removed S${id} @ ${removed.time.toFixed(2)}s (remaining: ${slides.length} slides)`);

// Also check stacks
const stacks = JSON.parse(fs.readFileSync('data/stacks.json', 'utf-8'));
const stackIdx = stacks.findIndex(s => s.slide === id);
if (stackIdx !== -1) {
  console.warn(`WARNING: S${id} has a stack entry in stacks.json — remove it manually if needed`);
}

console.log('\nRun: node build.js');
