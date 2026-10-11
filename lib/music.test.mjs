import test from "node:test";
import assert from "node:assert/strict";
import { SONGS, getVoicing, parseChord, normalizeImportedSong, JazzEngine, techniqueFor, getPadInfo, padLabels, DIFFICULTY_KEYS, midiName, getHarmonyAtBeat, getArrangementInfo } from "./music.ts";

test("rootless voicings retain the guide tones and leave the root to bass", () => {
  for (const chord of ["Cmaj7", "Dm7", "G7", "Bbdim7", "F#m", "Eb"]) {
    const { root, intervals } = parseChord(chord);
    const voicing = getVoicing(chord, true).map(midi => midi % 12);
    assert.equal(voicing.includes(root), false, chord);
    assert.ok(voicing.includes((root + intervals[1]) % 12), `${chord} third`);
    if (intervals.length === 4) assert.ok(voicing.includes((root + intervals[3]) % 12), `${chord} seventh`);
    assert.ok(getVoicing(chord, false).some(midi => midi % 12 === root), `${chord} root`);
  }
});

test("every original song has valid harmony and a complete melody grid", () => {
  for (const song of SONGS) {
    song.chords.forEach(parseChord);
    assert.equal(song.melody.length, song.chords.length * 4);
    assert.ok(song.melody.every(note => note === -1 || (note >= 48 && note <= 88)));
  }
});

test("imports accept supported chords and reject invalid or oversized input", () => {
  const source = { title: "My original study", chords: ["Dm7", "G7", "Cmaj7"], bpm: 88 };
  assert.deepEqual(normalizeImportedSong(JSON.stringify(source)).chords, source.chords);
  assert.equal(normalizeImportedSong(source).id, normalizeImportedSong(source).id);
  for (const input of [null, [], "not json", { ...source, bpm: Infinity }, { ...source, bpm: 0 },
    { ...source, chords: ["C13b9#5"] }, { ...source, chords: [] }, { ...source, chords: Array(257).fill("C7") },
    { ...source, melody: [12] }, { ...source, melody: [72.5] }, { ...source, title: "" }]) {
    assert.throws(() => normalizeImportedSong(input));
  }
});

function recordArrangement(band, player = null, options = {}) {
  const engine = new JazzEngine();
  const notes = [], chords = [], drums = [];
  engine.note = (...args) => notes.push(args);
  engine.chord = (...args) => chords.push(args);
  engine.percussion = (...args) => drums.push(args);
  engine.update({ song: SONGS[0], band, player, ...options });
  for (let i = 0; i < 8; i++) engine.scheduleStep(i, 0);
  engine.stop();
  return { notes, chords, drums };
}

test("piano supplies low notes on beats one and three only when bass is absent", () => {
  const trio = recordArrangement(["piano", "drums", "sax"]);
  assert.deepEqual(trio.notes.filter(([instrument]) => instrument === "piano").map(([, midi]) => midi), [41, 48]);
  const quartet = recordArrangement(["piano", "bass", "drums", "sax"]);
  assert.equal(quartet.notes.filter(([instrument]) => instrument === "piano").length, 0);
  assert.equal(quartet.notes.filter(([instrument]) => instrument === "bass").length, 4);
  assert.ok(quartet.chords.filter(([instrument]) => instrument === "piano").every(([, notes]) => notes.every(midi => midi % 12 !== 5)));
});

test("human player replaces their automatic part without stopping the ensemble", () => {
  const result = recordArrangement(["piano", "bass", "drums", "sax"], "sax");
  assert.equal(result.notes.filter(([instrument]) => instrument === "sax").length, 0);
  assert.equal(result.notes.filter(([instrument]) => instrument === "bass").length, 4);
  assert.ok(result.chords.length > 0);
  assert.ok(result.drums.length > 0);
  const drummer = recordArrangement(["piano", "drums"], "drums");
  assert.equal(drummer.drums.length, 0);
});

test("tap feedback comes from measured audio time rather than random scores", () => {
  const engine = new JazzEngine();
  engine.update({ band: ["sax"], player: "sax", bpm: 120 });
  engine.note = () => {};
  engine.context = { currentTime: 1.34 };
  engine.running = true;
  engine.quarterBeats = [{ time: 0.8, id: 0 }, { time: 1.3, id: 1 }, { time: 1.8, id: 2 }];
  engine.step = 6;
  engine.nextStepTime = 2.3;
  assert.deepEqual(engine.hit("sax", 0), { timingMs: 40, onBeat: true, beatId: 1 });
  engine.context.currentTime = 1.53;
  assert.deepEqual(engine.hit("sax", 0), { timingMs: 230, onBeat: false, beatId: 1 });
  engine.stop();
  assert.deepEqual(engine.hit("sax", 0), { timingMs: 0, onBeat: false, beatId: null });
});

test("early and late taps identify the same beat regardless of the UI counter", () => {
  const engine = new JazzEngine();
  engine.update({ band: ["sax"], player: "sax", bpm: 120, swing: 0.62 });
  engine.note = () => {};
  engine.context = { currentTime: 1.22 };
  engine.running = true;
  engine.quarterBeats = [{ time: 0.8, id: 0 }, { time: 1.3, id: 1 }];
  engine.step = 3;
  engine.nextStepTime = 1.61; // Swung offbeat; next quarter is 1.80.
  const early = engine.hit("sax", 0);
  engine.context.currentTime = 1.36;
  engine.audibleBeatId = 1; // A UI callback occurring between the taps changes nothing.
  const late = engine.hit("sax", 1);
  assert.ok(early.onBeat && late.onBeat);
  assert.equal(early.beatId, 1);
  assert.equal(late.beatId, 1);
  assert.equal(new Set([early.beatId, late.beatId]).size, 1);
  engine.context.currentTime = 1.72;
  assert.deepEqual(engine.hit("sax", 2), { timingMs: -80, onBeat: true, beatId: 2 });
  engine.stop();
});

test("tap harmony follows the target beat at a barline even if the UI is late", () => {
  const engine = new JazzEngine();
  engine.update({ song: SONGS[0], band: ["bass"], player: "bass", bpm: 120 });
  const played = [];
  engine.note = (...args) => played.push(args);
  engine.context = { currentTime: 2.72 };
  engine.running = true;
  engine.quarterBeats = [{ time: 2.3, id: 3 }, { time: 2.8, id: 4 }];
  engine.step = 10;
  engine.nextStepTime = 3.3;
  engine.audibleBar = 0;
  const early = engine.hit("bass", 0);
  engine.context.currentTime = 2.84;
  const late = engine.hit("bass", 0);
  assert.equal(early.beatId, 4);
  assert.equal(late.beatId, 4);
  assert.deepEqual(played.map(([, midi]) => midi), [46, 46]); // Bb, not the outgoing F.
  engine.stop();
});

test("beat IDs remain unique across a song loop and bound a 32-beat challenge", () => {
  const engine = new JazzEngine();
  engine.update({ song: SONGS[1], band: ["sax"], player: "sax", bpm: 120 });
  engine.note = () => {};
  engine.context = { currentTime: 16.34 };
  engine.running = true;
  engine.quarterBeats = [{ time: 16.3, id: 31 }, { time: 16.8, id: 32 }];
  engine.step = 66;
  engine.nextStepTime = 17.3;
  const finalTarget = engine.hit("sax", 0);
  engine.context.currentTime = 16.72;
  const nextLoop = engine.hit("sax", 0);
  assert.equal(finalTarget.beatId, 31);
  assert.equal(nextLoop.beatId, 32);
  const accepted = [finalTarget, nextLoop].filter(hit => hit.onBeat && hit.beatId >= 0 && hit.beatId < 32);
  assert.equal(accepted.length, 1);
  engine.stop();
});

test("the advertised ±120 ms window stays constant at fast beginner tempos", () => {
  const engine = new JazzEngine();
  engine.update({ band: ["sax"], player: "sax", bpm: 160 });
  engine.note = () => {};
  engine.context = { currentTime: 1.105 };
  engine.running = true;
  engine.quarterBeats = [{ time: 1, id: 0 }];
  engine.step = 2;
  engine.nextStepTime = 1.375;
  assert.deepEqual(engine.hit("sax", 0), { timingMs: 105, onBeat: true, beatId: 0 });
  engine.stop();
});

test("standard chord extensions and slash bass are explicit, with no unknown fallback", () => {
  const supported = ["Cm7b5", "Cm6", "C6", "C9", "C13", "C7b9", "C7#9", "C7alt", "CmMaj7", "Csus4", "C7sus4", "Cmaj9", "Cm9", "C7#11", "Bb6/F"];
  supported.forEach(chord => { assert.ok(parseChord(chord).intervals.length >= 3); assert.ok(getVoicing(chord, true).length >= 3); });
  assert.deepEqual(parseChord("F#m7b5").intervals, [0, 3, 6, 10]);
  assert.equal(parseChord("Bb6/F").root, 10);
  assert.equal(parseChord("Bb6/F").bass, 5);
  assert.deepEqual(parseChord("G7(b9)").intervals, [0, 4, 7, 10, 13]);
  assert.throws(() => parseChord("C13b9#11"));
  assert.throws(() => parseChord("Cgarbage"));
});

test("difficulties expose matching 3/6/8 keys and distinct actual techniques", () => {
  for (const [difficulty, count] of [["beginner", 3], ["intermediate", 6], ["bebop", 8]]) {
    assert.equal(DIFFICULTY_KEYS[difficulty].length, count);
    for (const instrument of ["piano", "bass", "drums", "sax", "guitar"]) {
      assert.equal(padLabels(instrument, difficulty, "en").length, count);
      for (let i = 0; i < count; i++) {
        const info = techniqueFor("G7", "Cmaj7", instrument, difficulty, i);
        assert.ok(info.notes.length > 0 && info.description && info.scale);
      }
      if (count > 3) {
        const advanced = Array.from({ length: count - 3 }, (_, i) => JSON.stringify(techniqueFor("G7", "Cmaj7", instrument, difficulty, i + 3).notes));
        assert.equal(new Set(advanced).size, advanced.length);
      }
      assert.throws(() => techniqueFor("G7", "Cmaj7", instrument, difficulty, count));
    }
  }
  assert.notDeepEqual(techniqueFor("C7", "Fmaj7", "piano", "intermediate", 3).notes, techniqueFor("C7", "Fmaj7", "piano", "beginner", 1).notes);
  assert.deepEqual(DIFFICULTY_KEYS.bebop, ["A", "S", "D", "F", "J", "K", "L", ";"]);
  assert.equal(midiName(60), "C4");
});

test("altered, Lydian dominant and minor-tonic palettes respect their contexts", () => {
  const altered = techniqueFor("G7", "Cmaj7", "sax", "bebop", 6, "en");
  assert.match(altered.scale, /G altered.*Ab melodic minor VII/);
  const alteredSet = new Set([7, 8, 10, 11, 1, 3, 5]);
  assert.ok(altered.notes.slice(0, -1).every(midi => alteredSet.has(midi % 12)));
  assert.ok(altered.notes.some(midi => midi % 12 === 8)); // Ab: b9
  assert.ok(altered.notes.some(midi => midi % 12 === 10)); // Bb: #9
  assert.ok(altered.notes.some(midi => midi % 12 === 1)); // Db: b5
  assert.ok(altered.notes.some(midi => midi % 12 === 3)); // Eb: b13
  assert.equal(altered.notes.at(-1) % 12, 4); // E, third of Cmaj7.
  const lydian = techniqueFor("C7", "Dmaj7", "sax", "bebop", 6, "en");
  assert.match(lydian.scale, /Lydian dominant.*G melodic minor IV/);
  assert.ok(lydian.notes.some(midi => midi % 12 === 6));
  assert.match(techniqueFor("CmMaj7", "Dm7b5", "sax", "bebop", 6, "en").scale, /C melodic minor/);
  const dorian = techniqueFor("Cm7", "F7", "sax", "bebop", 6, "en");
  assert.equal(dorian.scale, "C Dorian");
  assert.doesNotMatch(dorian.scale, /melodic minor/);
  assert.match(dorian.description, /not impose/);
  assert.match(techniqueFor("Bm7b5", "E7b9", "sax", "bebop", 6, "en").scale, /Locrian natural 2/);
  const drums = getPadInfo("drums", 7, "G7", "Cmaj7", "bebop", "en");
  assert.ok(drums.notes.includes("Snare") && drums.notes.includes("Kick"));
  assert.doesNotMatch(drums.scale, /minor|altered|Dorian/);
});

function readyPlayer(instrument, difficulty = "bebop") {
  const engine = new JazzEngine();
  engine.update({ song: { id: "resolution", title: "Resolution", subtitle: "Original", key: "C", bpm: 120, chords: ["G7", "Cmaj7"] }, band: [instrument], player: instrument, bpm: 120, difficulty });
  engine.context = { currentTime: 1.04 };
  engine.running = true;
  engine.quarterBeats = [{ time: 1, id: 0 }];
  engine.step = 2;
  engine.nextStepTime = 1.5;
  return engine;
}

test("advanced hit schedules actual pitches and resolves exactly on the next bar", () => {
  const engine = readyPlayer("sax");
  const notes = [];
  engine.note = (...args) => notes.push(args);
  const result = engine.hit("sax", 6);
  assert.equal(result.beatId, 0); // One human trigger, not seven generated hits.
  assert.equal(notes.length, 7);
  assert.equal(notes.at(-1)[1] % 12, 4);
  assert.equal(notes.at(-1)[2], 3); // Audio beat zero = 1s; next bar at 3s.
  assert.ok(notes.every((note, i) => i === 0 || note[2] > notes[i - 1][2]));
  assert.deepEqual(notes.map(([, midi]) => midi), techniqueFor("G7", "Cmaj7", "sax", "bebop", 6).notes);
  engine.stop();
});

test("unavailable pads do not silently replay another key and fills create multiple hits", () => {
  const engine = readyPlayer("drums", "intermediate");
  const hits = [];
  engine.percussion = (...args) => hits.push(args);
  assert.deepEqual(engine.hit("drums", 6), { timingMs: 0, onBeat: false, beatId: null });
  assert.deepEqual(engine.hit("drums", -1), { timingMs: 0, onBeat: false, beatId: null });
  assert.equal(hits.length, 0);
  engine.hit("drums", 4);
  assert.equal(hits.length, 3);
  assert.ok(Math.abs(hits[1][1] - hits[0][1] - 1 / 6) < 0.00001); // True triplet, not swing eighths.
  engine.update({ difficulty: "bebop" });
  hits.length = 0;
  engine.hit("drums", 7);
  assert.equal(hits.length, 8);
  engine.stop();
});

test("score melody events preserve pitch, durations, rests and eighth-note onsets", () => {
  const song = { id: "events", title: "Events", subtitle: "Original test", key: "C", bpm: 120, chords: ["Cmaj7"],
    melodyEvents: [{ beat: 0, midi: 72, duration: 0.5 }, { beat: 0.5, midi: 74, duration: 0.5 }, { beat: 1.5, midi: 76, duration: 1 }] };
  const engine = new JazzEngine();
  const notes = [];
  engine.note = (...args) => notes.push(args);
  engine.update({ song, band: ["sax"], bpm: 120, swing: 0.62 });
  engine.scheduleStep(0, 10);
  engine.scheduleStep(2, 10.5);
  engine.scheduleStep(4, 11); // Rest: no fabricated fallback sax note.
  assert.deepEqual(notes.map(([, midi]) => midi), [72, 74, 76]);
  assert.deepEqual(notes.map(([, , time]) => time), [10, 10.31, 10.81]);
  assert.ok(notes[0][3] > notes[1][3]);
  assert.ok(Math.abs(notes[2][3] - 0.44) < 0.00001);
  engine.stop();
  assert.equal(normalizeImportedSong(song).melodyEvents.length, 3);
  assert.throws(() => normalizeImportedSong({ ...song, melodyEvents: [{ beat: 4, midi: 72, duration: 1 }] }));
  assert.throws(() => normalizeImportedSong({ ...song, melodyEvents: [{ beat: 0, midi: 72, duration: 0 }] }));
  assert.equal(normalizeImportedSong({ ...song, bpm: 240 }).bpm, 240);
  assert.throws(() => normalizeImportedSong({ ...song, bpm: 241 }));
});

test("taking over a role and stopping cancel its already scheduled voices", () => {
  const engine = new JazzEngine();
  let saxStops = 0, bassStops = 0;
  const sax = { stop: () => saxStops++, disconnect: () => {} };
  const bass = { stop: () => bassStops++, disconnect: () => {} };
  engine.track(sax, () => {}, "sax");
  engine.track(bass, () => {}, "bass");
  engine.update({ player: "sax" });
  assert.equal(saxStops, 1);
  assert.equal(bassStops, 0);
  engine.stop();
  assert.equal(bassStops, 1);
  assert.equal(engine.sourceInstruments.size, 0);
  assert.equal(engine.sources.size, 0);
});

test("difficulty, tempo and swing changes cancel pending player phrases before updating", () => {
  for (const change of [{ difficulty: "beginner" }, { bpm: 144 }, { swing: 70 }]) {
    const engine = new JazzEngine();
    engine.update({ player: "sax", difficulty: "bebop", bpm: 100, swing: 62 });
    let saxStops = 0, bassStops = 0, configAtStop;
    const sax = { stop() { saxStops++; configAtStop = { ...engine.config }; this.onended?.(); }, disconnect() {} };
    const bass = { stop() { bassStops++; this.onended?.(); }, disconnect() {} };
    engine.track(sax, () => {}, "sax");
    engine.track(bass, () => {}, "bass");
    engine.update(change);
    assert.equal(saxStops, 1);
    assert.equal(bassStops, 0); // Backing ensemble keeps going.
    assert.equal(configAtStop.difficulty, "bebop");
    assert.equal(configAtStop.bpm, 100);
    assert.equal(configAtStop.swing, 0.62);
    assert.equal(engine.sourceInstruments.has(sax), false);
    engine.stop();
  }
  const engine = new JazzEngine();
  engine.update({ player: "sax", difficulty: "bebop", bpm: 100, swing: 62 });
  let stops = 0;
  engine.track({ stop: () => stops++, disconnect() {} }, () => {}, "sax");
  engine.update({ volume: 0.4, bpm: 100, swing: 0.62, difficulty: "bebop" });
  assert.equal(stops, 0); // Equivalent swing notation and volume do not cancel a phrase.
  engine.stop();
});

test("score tuplets remain evenly spaced with swing enabled and preserve duration ends", () => {
  const song = { id: "tuplets", title: "Tuplets", subtitle: "Original test", key: "C", bpm: 120, chords: ["Cmaj7"],
    melodyEvents: [{ beat: 0, midi: 74, duration: 2 / 3 }, { beat: 2 / 3, midi: 71, duration: 2 / 3 }, { beat: 4 / 3, midi: 67, duration: 2 / 3 }, { beat: 2.5, midi: 72, duration: 1 / 6 }] };
  const engine = new JazzEngine(), notes = [];
  engine.update({ song, band: ["sax"], bpm: 120, swing: 70 });
  engine.note = (...args) => notes.push(args);
  for (let i = 0; i < 3; i++) engine.scheduleStep(i * 2, i * 0.5);
  assert.equal(notes.length, 4);
  for (let i = 0; i < 3; i++) {
    assert.ok(Math.abs(notes[i][2] - i / 3) < 1e-8);
    assert.ok(Math.abs(notes[i][3] - (1 / 3) * 0.88) < 1e-8);
  }
  assert.equal(notes[3][2], 1.25); // Sextuplet on an eighth stays straight too.
  assert.ok(Math.abs(notes[3][3] - (1 / 12) * 0.88) < 1e-8);
  engine.stop();
});

test("piano comping pads respect the bass and differ from actual solo phrases", () => {
  const band = ["piano", "bass", "drums", "sax"];
  const comp = { band, featuredSolo: null, pianoVoicing: "auto" };
  const shell = techniqueFor("C7", "Fmaj7", "piano", "beginner", 0, "en", true, comp);
  assert.deepEqual(shell.notes, [52, 58]); // E3 / Bb3: neither a low root nor a solo melody.
  assert.deepEqual(techniqueFor("C7", "Fmaj7", "piano", "beginner", 0, "en", true, { ...comp, pianoVoicing: "rooted" }).notes, [48, 52]);
  assert.deepEqual(techniqueFor("C7", "Fmaj7", "piano", "beginner", 0, "en", false, { band: ["piano", "sax"] }).notes, [36]);
  const solo = { ...comp, featuredSolo: "piano" };
  assert.deepEqual(techniqueFor("C7", "Fmaj7", "piano", "beginner", 0, "en", true, solo).notes, [64]);
  assert.notEqual(padLabels("piano", "beginner", "en", comp)[0], padLabels("piano", "beginner", "en", solo)[0]);
  const engine = readyPlayer("piano", "beginner"), notes = [], chords = [];
  engine.update({ band, featuredSolo: null });
  engine.note = (...args) => notes.push(args);
  engine.chord = (...args) => chords.push(args);
  engine.hit("piano", 1);
  assert.equal(chords.length, 1);
  assert.equal(notes.length, 0);
  engine.update({ featuredSolo: "piano" });
  engine.hit("piano", 1);
  assert.equal(chords.length, 1);
  assert.equal(notes.length, 2);
  assert.ok(notes[1][2] > notes[0][2]);
  engine.stop();
});

test("automatic piano and bass solos change register, rhythm and ensemble roles", () => {
  const band = ["piano", "bass", "drums", "sax"];
  const comp = recordArrangement(band);
  const pianoSolo = recordArrangement(band, null, { featuredSolo: "piano" });
  assert.equal(pianoSolo.chords.filter(([i]) => i === "piano").length, 0);
  assert.equal(pianoSolo.notes.filter(([i]) => i === "piano").length, 6);
  assert.ok(pianoSolo.notes.filter(([i]) => i === "piano").every(([, midi]) => midi >= 60));
  assert.equal(pianoSolo.notes.filter(([i]) => i === "sax").length, 0);
  const bassSolo = recordArrangement(band, null, { featuredSolo: "bass" });
  const bassNotes = bassSolo.notes.filter(([i]) => i === "bass");
  assert.equal(bassNotes.length, 6);
  assert.ok(Math.min(...bassNotes.map(([, n]) => n)) > Math.min(...comp.notes.filter(([i]) => i === "bass").map(([, n]) => n)));
  assert.equal(bassSolo.notes.filter(([i, midi]) => i === "piano" && midi < 60).length, 2);
  assert.equal(bassSolo.notes.filter(([i]) => i === "sax").length, 0);
  assert.ok(bassSolo.chords.length < comp.chords.length);
  assert.ok(bassSolo.drums.length < comp.drums.length);
  const humanSolo = recordArrangement(["piano", "drums"], "piano", { featuredSolo: "piano" });
  assert.deepEqual(humanSolo.notes.map(([, midi]) => midi), [41, 48]); // Disclosed light left hand remains.
});

test("missing guitar, drums and sax produce actual density, pulse and head changes", () => {
  const full = recordArrangement(["piano", "bass", "drums", "sax", "guitar"]);
  const noGuitar = recordArrangement(["piano", "bass", "drums", "sax"]);
  const noDrums = recordArrangement(["piano", "bass", "sax"]);
  const pianoCount = r => r.chords.filter(([i]) => i === "piano").length;
  assert.equal(pianoCount(full), 2);
  assert.equal(pianoCount(noGuitar), 3);
  assert.equal(pianoCount(noDrums), 4);
  assert.equal(noDrums.drums.length, 0);
  assert.ok(noDrums.notes.filter(([i]) => i === "bass").every((note, n) => note[4] > noGuitar.notes.filter(([i]) => i === "bass")[n][4]));
  const noSax = recordArrangement(["piano", "bass", "drums"]);
  assert.deepEqual(noSax.notes.filter(([i]) => i === "piano").map(([, n]) => n), SONGS[0].melody.slice(0, 3));
  const onlyGuitar = recordArrangement(["guitar", "drums"]);
  assert.ok(onlyGuitar.notes.some(([i, midi]) => i === "guitar" && midi < 60));
  assert.ok(onlyGuitar.notes.some(([i, midi]) => i === "guitar" && midi >= 60));
  const info = getArrangementInfo(["piano", "bass", "sax"], { featuredSolo: "bass" }, "en");
  assert.match(info.parts.piano.role, /takes the low foundation/);
  assert.match(info.parts.piano.density, /No drums/);
  assert.match(info.parts.sax.role, /Rest/);
  assert.equal(info.parts.bass.mode, "solo");
  assert.match(getArrangementInfo(["bass"], { featuredSolo: "bass" }, "en").parts.bass.role, /No other foundation/);
});

test("Rhythm Changes preserves a complete original AABA head and split-bar harmony", () => {
  const song = SONGS.find(s => s.id === "rhythm-changes");
  assert.equal(song.chords.length, 32);
  assert.equal(song.melody.length, 128);
  assert.equal(song.chordEvents.length, 56);
  assert.deepEqual(song.chords.slice(16, 24), ["D7", "D7", "G7", "G7", "C7", "C7", "F7", "F7"]);
  assert.deepEqual(getHarmonyAtBeat(song, 1.9), { chord: "Bb6", nextChord: "G7", changeBeat: 0, nextChangeBeat: 2 });
  assert.deepEqual(getHarmonyAtBeat(song, 2), { chord: "G7", nextChord: "Cm7", changeBeat: 2, nextChangeBeat: 4 });
  assert.deepEqual(getHarmonyAtBeat(song, 128), { chord: "Bb6", nextChord: "G7", changeBeat: 128, nextChangeBeat: 130 });
  assert.deepEqual(getHarmonyAtBeat(song, 127), { chord: "F7", nextChord: "Bb6", changeBeat: 126, nextChangeBeat: 128 });
  const arrangement = recordArrangement(["piano", "bass"], "piano", { song });
  assert.deepEqual(arrangement.notes.filter(([i]) => i === "bass").map(([, n]) => n), [46, 42, 43, 35]);
});

test("target phrases and tap harmony follow a midbar change instead of the next bar", () => {
  const engine = readyPlayer("sax"), notes = [];
  engine.update({ song: { id: "split", title: "Split", subtitle: "Original", key: "C", bpm: 120, chords: ["G7"], chordEvents: [{ beat: 0, chord: "G7" }, { beat: 2, chord: "Cmaj7" }] } });
  engine.note = (...args) => notes.push(args);
  engine.hit("sax", 6);
  assert.ok(notes.length > 1);
  assert.equal(notes.at(-1)[1] % 12, 4);
  assert.equal(notes.at(-1)[2], 2); // Beat 2, not the next bar at 3 seconds.
  assert.ok(notes.every(([, , time]) => time <= 2 && time >= engine.context.currentTime));
  notes.length = 0;
  engine.context.currentTime = 1.94;
  engine.quarterBeats = [{ time: 1.5, id: 1 }, { time: 2, id: 2 }];
  engine.step = 6;
  engine.nextStepTime = 2.5;
  engine.update({ difficulty: "beginner" });
  assert.equal(engine.hit("sax", 0).beatId, 2);
  assert.equal(notes[0][1], 64);
  engine.stop();
});

test("expanded annotated harmony preserves each quality and validates exact changes", () => {
  for (const quality of ["7b13", "m11", "7#5", "maj7#11", "9sus4", "7#9#5", "dim", "7b5", "13b9", "9#11", "7b9b5", "6/9", "m6/9"]) {
    assert.equal(parseChord(`C${quality}`).quality, quality);
    assert.ok(getVoicing(`C${quality}`, true).every(Number.isFinite));
  }
  assert.equal(parseChord("C6/9/G").bass, 7);
  assert.equal(parseChord("Cm6/9/G").quality, "m6/9");
  assert.deepEqual(parseChord("C13b9").intervals, [0, 4, 7, 10, 13, 21]);
  assert.match(techniqueFor("C13b9", "F6", "sax", "bebop", 6, "en").scale, /half–whole/);
  assert.match(techniqueFor("C9#11", "F6", "sax", "bebop", 6, "en").scale, /Lydian dominant/);
  assert.ok(techniqueFor("C13b9", "F6", "sax", "intermediate", 3).notes.includes(73));
  const source = { title: "Exact", chords: ["G7", "Cmaj7"], chordEvents: [{ beat: 0, chord: "G7" }, { beat: 2, chord: "Cmaj7" }] };
  assert.deepEqual(normalizeImportedSong(source).chordEvents, source.chordEvents);
  assert.equal(normalizeImportedSong({ ...source, chords: Array(100).fill("C7") }).chords.length, 100);
  for (const events of [[], [{ beat: 1, chord: "C7" }], [{ beat: 0, chord: "C7" }, { beat: 0, chord: "F7" }], [{ beat: 0, chord: "C7" }, { beat: 8, chord: "F7" }], [{ beat: 0, chord: "Unknown" }]]) {
    assert.throws(() => normalizeImportedSong({ ...source, chordEvents: events }));
  }
});

test("solo and voicing switches cancel queued parts and removing the soloist restores ensemble mode", () => {
  for (const change of [{ featuredSolo: "bass" }, { pianoVoicing: "rooted" }]) {
    const engine = new JazzEngine();
    let stops = 0, prior;
    engine.track({ stop() { stops++; prior = engine.config.featuredSolo; }, disconnect() {} }, () => {}, "sax");
    engine.track({ stop() { stops++; }, disconnect() {} }, () => {}, "piano");
    engine.update(change);
    assert.equal(stops, 2);
    assert.equal(prior, null);
    engine.stop();
  }
  const engine = new JazzEngine();
  engine.update({ featuredSolo: "bass" });
  assert.equal(engine.getSnapshot().featuredSolo, "bass");
  engine.update({ band: ["piano", "drums"] });
  assert.equal(engine.getSnapshot().featuredSolo, null);
  engine.stop();
});
