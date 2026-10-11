import test from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';

// Match the app's bundler resolution for the native Node TypeScript test runner.
registerHooks({ resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('./') && !/\.[a-z]+$/i.test(specifier)) {
    return nextResolve(specifier + '.ts', context);
  }
  return nextResolve(specifier, context);
} });
const { REPERTOIRE } = await import('./repertoire.ts');
const { STANDARD_CORPUS, STANDARD_CHARTS, standardTitleKey } = await import('./standard-catalog.ts');
const { STANDARD_CHART_DATA } = await import('./standard-catalog-data.ts');
const { parseChord, normalizeImportedSong, getHarmonyAtBeat } = await import('./music.ts');

test('the selectable library contains at least 220 different playable standards without duplicate title variants', () => {
  const playable = REPERTOIRE.filter(entry => entry.song);
  assert.ok(playable.length >= 220);
  assert.equal(new Set(playable.map(entry => standardTitleKey(entry.title))).size, playable.length);
  assert.equal(new Set(REPERTOIRE.map(entry => entry.id)).size, REPERTOIRE.length);
  assert.ok(playable.some(entry => entry.title === 'All The Things You Are'));
  assert.ok(playable.some(entry => entry.title === 'Blue Bossa'));
  assert.ok(playable.some(entry => entry.title === 'Giant Steps'));
  assert.equal(REPERTOIRE.find(entry => entry.title === 'Take Five').song, undefined);
});

test('source changes cover complete 4/4 charts and survive app import without dropping within-bar changes', () => {
  assert.equal(STANDARD_CHART_DATA.length, STANDARD_CHARTS.length);
  for (let i = 0; i < STANDARD_CHART_DATA.length; i++) {
    const data = STANDARD_CHART_DATA[i], entry = STANDARD_CHARTS[i], song = entry.song;
    assert.ok(data.bars > 0 && data.bars <= 256, entry.title);
    assert.equal(song.chords.length, data.bars, entry.title);
    assert.equal(data.changes[0][0], 0, entry.title);
    for (let j = 0; j < data.changes.length; j++) {
      const [beat, chord, duration] = data.changes[j];
      assert.ok(Number.isInteger(beat) && Number.isInteger(duration) && duration > 0, entry.title);
      assert.doesNotThrow(() => parseChord(chord), `${entry.title}: ${chord}`);
      assert.equal(beat + duration, data.changes[j + 1]?.[0] ?? data.bars * 4, entry.title);
      assert.equal(getHarmonyAtBeat(song, beat).chord, chord, `${entry.title} at beat ${beat}`);
    }
    for (let bar = 0; bar < data.bars; bar++) {
      assert.equal(song.chords[bar], getHarmonyAtBeat(song, bar * 4).chord, entry.title);
    }
    assert.deepEqual(normalizeImportedSong(song).chordEvents, song.chordEvents, entry.title);
    assert.equal(song.melody, undefined, entry.title);
    assert.equal(song.melodyEvents, undefined, entry.title);
  }
  assert.ok(STANDARD_CHART_DATA.some(data => data.changes.some(([beat]) => beat % 4 === 2)));
});

test('every new chord chart retains attribution, a pinned source and an auditable source checksum', () => {
  assert.equal(STANDARD_CORPUS.license, 'CC BY 4.0');
  assert.match(STANDARD_CORPUS.licenseUrl, /creativecommons\.org\/licenses\/by\/4\.0/);
  for (let i = 0; i < STANDARD_CHARTS.length; i++) {
    const entry = STANDARD_CHARTS[i], data = STANDARD_CHART_DATA[i];
    assert.equal(entry.kind, 'changes');
    assert.ok(entry.sourceCredit);
    assert.equal(entry.year, undefined, 'Do not invent publication dates absent from the dataset.');
    assert.ok(entry.sourceUrl.includes(STANDARD_CORPUS.commit));
    assert.ok(entry.sourceUrl.endsWith(data.id + '.jams'));
    assert.match(data.sourceSha256, /^[a-f0-9]{64}$/);
    for (const locale of ['zh-CN', 'zh-TW', 'en']) {
      assert.match(entry.rights[locale], /CC BY 4\.0/);
      assert.ok(entry.description[locale] && entry.style[locale]);
    }
  }
});

test('the original four sourced melodies and fourteen verified listening recommendations remain available', () => {
  assert.equal(REPERTOIRE.filter(entry => entry.kind === 'score' && entry.song?.melodyEvents?.length).length, 4);
  assert.equal(REPERTOIRE.reduce((count, entry) => count + entry.recordings.length, 0), 14);
  assert.ok(REPERTOIRE.find(entry => entry.title === 'Autumn Leaves').song);
  assert.ok(REPERTOIRE.find(entry => entry.title === 'So What').song);
});
