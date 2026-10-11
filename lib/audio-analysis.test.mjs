import test from 'node:test';
import assert from 'node:assert/strict';
import { detectPitch, analyzeFrame, analysisFrameSize, detectOnsets, segmentNotes, summarizePerformance, signalLevel } from './audio-analysis.ts';

function tone(frequency, sampleRate = 48000, amplitude = 0.3, harmonics = false) {
  return Float32Array.from({ length: 4096 }, (_, i) => amplitude * (Math.sin(2 * Math.PI * frequency * i / sampleRate) + (harmonics ? 1.8 * Math.sin(4 * Math.PI * frequency * i / sampleRate) + 0.6 * Math.sin(6 * Math.PI * frequency * i / sampleRate) : 0)));
}
test('single tones map to actual concert MIDI pitches from bass E1 to C6', () => {
  for (const [frequency, midi] of [[41.2034, 28], [65.4064, 36], [130.8128, 48], [261.6256, 60], [440, 69], [1046.502, 84]]) {
    const pitch = detectPitch(tone(frequency), 48000);
    assert.ok(pitch, String(frequency));
    assert.equal(pitch.midi, midi);
    assert.ok(Math.abs(pitch.cents) < 6, `${frequency}: ${pitch.cents}`);
    assert.ok(pitch.confidence > 0.95);
  }
});
test('detuning uses cents and detection also handles a 44.1 kHz source', () => {
  const frequency = 440 * 2 ** (25 / 1200);
  const pitch = detectPitch(tone(frequency, 44100), 44100);
  assert.equal(pitch.midi, 69);
  assert.ok(Math.abs(pitch.cents - 25) < 5);
});
test('high-sample-rate interfaces receive enough evidence for a low bass fundamental', () => {
  for (const sampleRate of [96000, 192000]) {
    const input = Float32Array.from({ length: analysisFrameSize(sampleRate) }, (_, i) => 0.4 * Math.sin(2 * Math.PI * 41.2034 * i / sampleRate));
    assert.equal(detectPitch(input, sampleRate).midi, 28);
  }
});
test('a strong second harmonic does not systematically transpose a note up an octave', () => {
  const pitch = detectPitch(tone(110, 48000, 0.2, true), 48000);
  assert.equal(pitch.midi, 45);
  assert.ok(Math.abs(pitch.cents) < 5);
});
test('silence, sub-gate input and broadband noise are not fabricated notes', () => {
  assert.equal(detectPitch(new Float32Array(4096), 48000), null);
  assert.equal(detectPitch(tone(440, 48000, 0.002), 48000), null);
  let seed = 1729;
  const noise = Float32Array.from({ length: 4096 }, () => { seed = (seed * 1664525 + 1013904223) >>> 0; return (seed / 4294967296 - 0.5) * 0.5; });
  assert.equal(detectPitch(noise, 48000), null);
  assert.equal(detectPitch(tone(440), NaN), null);
  assert.deepEqual(signalLevel([]), { rms: 0, peak: 0 });
});
test('reported notes require sustained evidence and omit brief wrong-pitch transients', () => {
  const a = detectPitch(tone(440), 48000), c = detectPitch(tone(261.6256), 48000);
  const frames = [a, a, a, null, c, null, c, c, c, c].map((pitch, index) => ({ time: index * 0.05, rms: pitch ? 0.2 : 0, peak: 0.3, pitch }));
  const notes = segmentNotes(frames, 0.5);
  assert.deepEqual(notes.map(note => note.midi), [69, 60]);
  assert.equal(notes[0].start, 0);
  assert.equal(notes[1].start, 0.275);
  assert.ok(notes.every(note => note.end > note.start && note.confidence > 0.95));
});
test('energy attacks detect repeated separated beats, not the sustained tail', () => {
  const frames = Array.from({ length: 32 }, (_, i) => ({ time: i * 0.05, rms: i % 10 < 5 ? 0.2 : 0, peak: 0.3, pitch: null }));
  assert.deepEqual(detectOnsets(frames), [0, 0.5, 1, 1.5]);
  const report = summarizePerformance(frames, { duration: 1.6, mode: 'rhythm', source: 'file', referenceBpm: 120, referenceChord: 'C7', role: 'piano' });
  assert.equal(report.medianOnsetInterval, 0.5);
  assert.equal(report.voicedCoverage, 0);
  assert.deepEqual(report.notes, []);
  assert.equal('score' in report, false);
});
test('rhythm/chord mode never presents an arbitrary chord fundamental as a transcription', () => {
  const input = tone(440);
  const frame = analyzeFrame(input, 48000, 0.5, 'rhythm');
  assert.equal(frame.pitch, null);
  assert.ok(frame.rms > 0.1);
  const report = summarizePerformance([], { duration: 0, mode: 'notes', source: 'microphone', referenceBpm: 120, referenceChord: 'G7', role: 'sax' });
  assert.deepEqual(report.notes, []);
  assert.equal(report.medianOnsetInterval, null);
  assert.equal(report.voicedCoverage, 0);
});
