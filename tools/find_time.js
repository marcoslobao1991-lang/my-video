/**
 * find_time.js — Search Whisper for a word/phrase and return exact timestamp
 *
 * Usage:
 *   node tools/find_time.js "palavra"              → all occurrences
 *   node tools/find_time.js "palavra" 120           → near 120s (±30s window)
 *   node tools/find_time.js "palavra" 120 10        → near 120s (±10s window)
 *
 * Examples:
 *   node tools/find_time.js "dopamina"
 *   node tools/find_time.js "fadiga" 350
 *   node tools/find_time.js "subconsciente" 400 15
 */
const fs = require('fs');

const WHISPER_PATH = 'C:/Users/Asus/ingles-cantado/whisper-output/vsl_full_words.json';
const words = JSON.parse(fs.readFileSync(WHISPER_PATH, 'utf-8')).words;

const query = (process.argv[2] || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const nearTime = process.argv[3] ? parseFloat(process.argv[3]) : null;
const window = process.argv[4] ? parseFloat(process.argv[4]) : 30;

if (!query) {
  console.log('Usage: node tools/find_time.js "word" [nearTime] [window]');
  process.exit(1);
}

function norm(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, '').trim();
}

function fmt(t) {
  const m = Math.floor(t / 60);
  const s = (t % 60).toFixed(2).padStart(5, '0');
  return `${m}:${s}`;
}

const queryWords = query.split(/\s+/).filter(w => w.length > 0);
const results = [];

if (queryWords.length === 1) {
  // Single word search
  for (const w of words) {
    const n = norm(w.word);
    if (n === query || (query.length >= 4 && n.startsWith(query)) || (n.length >= 4 && n === query)) {
      if (nearTime !== null && Math.abs(w.start - nearTime) > window) continue;
      results.push({ word: w.word, time: w.start, end: w.end });
    }
  }
} else {
  // Multi-word phrase search
  for (let i = 0; i <= words.length - queryWords.length; i++) {
    let match = true;
    for (let j = 0; j < queryWords.length; j++) {
      if (norm(words[i + j].word) !== queryWords[j]) { match = false; break; }
    }
    if (match) {
      if (nearTime !== null && Math.abs(words[i].start - nearTime) > window) continue;
      const phrase = words.slice(i, i + queryWords.length).map(w => w.word).join(' ');
      results.push({ word: phrase, time: words[i].start, end: words[i + queryWords.length - 1].end });
    }
  }
}

if (results.length === 0) {
  console.log(`No matches for "${query}"${nearTime !== null ? ` near ${fmt(nearTime)}` : ''}`);
  // Suggest similar
  const similar = [];
  for (const w of words) {
    const n = norm(w.word);
    if (n.length >= 4 && (n.includes(query.slice(0, 4)) || query.includes(n.slice(0, 4)))) {
      if (nearTime !== null && Math.abs(w.start - nearTime) > window * 2) continue;
      if (!similar.find(s => s.word === n)) similar.push({ word: w.word, time: w.start });
    }
  }
  if (similar.length > 0) {
    console.log('\nSimilar words:');
    similar.slice(0, 10).forEach(s => console.log(`  "${s.word}" @ ${fmt(s.time)} (${s.time.toFixed(2)}s)`));
  }
} else {
  console.log(`Found ${results.length} match(es) for "${query}":\n`);
  for (const r of results) {
    console.log(`  "${r.word}" @ ${fmt(r.time)} → ${fmt(r.end)}  (startTime: ${r.time.toFixed(2)})`);
  }
}
