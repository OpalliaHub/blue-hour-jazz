/** Original teaching material and a small, client-only Web Audio jazz ensemble. */
export type Instrument = "piano" | "bass" | "drums" | "sax" | "guitar";
export type Difficulty = "beginner" | "intermediate" | "bebop";
export type MusicLocale = "zh-CN" | "zh-TW" | "en";
export type PartMode = "comping" | "solo";
export type PianoVoicing = "auto" | "rooted" | "rootless";
export interface PerformanceOptions {
  featuredSolo?: Instrument | null;
  pianoVoicing?: PianoVoicing;
  band?: Instrument[];
  player?: Instrument | null;
}
export const DIFFICULTY_KEYS: Record<Difficulty, string[]> = {
  beginner: ["A", "S", "D"], intermediate: ["A", "S", "D", "F", "J", "K"],
  bebop: ["A", "S", "D", "F", "J", "K", "L", ";"],
};

export interface Song {
  id: string;
  title: string;
  subtitle: string;
  key: string;
  bpm: number;
  /** One chord per 4/4 bar. */
  chords: string[];
  /** Optional exact harmonic changes in absolute quarter units within the form. */
  chordEvents?: { beat: number; chord: string }[];
  /** Optional original MIDI melody: one note per quarter note; -1 is a rest. */
  melody?: number[];
  /** Score-derived melody events. Absolute quarter-note units; rests have no event. */
  melodyEvents?: { beat: number; midi: number; duration: number }[];
}

export const SONGS: Song[] = [
  {
    id: "midnight-blues", title: "午夜蓝调", subtitle: "原创练习 · 12 小节 Blues", key: "F", bpm: 88,
    chords: ["F7", "Bb7", "F7", "F7", "Bb7", "Bb7", "F7", "D7", "Gm7", "C7", "F7", "C7"],
    melody: [72, 75, 77, -1, 77, 75, 72, -1, 72, 69, 65, -1, 68, 69, 72, -1, 74, 77, 80, -1, 77, 74, 72, -1, 72, 69, 65, -1, 66, 69, 72, -1, 70, 74, 77, -1, 76, 74, 70, -1, 69, 72, 65, -1, 70, 69, 67, -1],
  },
  {
    id: "sunny-corners", title: "转角晴天", subtitle: "原创练习 · ii–V–I 对话", key: "C", bpm: 92,
    chords: ["Dm7", "G7", "Cmaj7", "Cmaj7", "Dm7", "G7", "Cmaj7", "A7"],
    melody: [69, 72, 74, -1, 71, 69, 67, -1, 64, 67, 71, 72, 74, 72, 67, -1, 65, 69, 72, -1, 74, 71, 67, -1, 64, 67, 72, -1, 73, 76, 79, -1],
  },
  {
    id: "velvet-loop", title: "天鹅绒回声", subtitle: "原创练习 · 小调循环", key: "D minor", bpm: 84,
    chords: ["Dm7", "Dm7", "Gm7", "A7", "Dm7", "Dm7", "Bbmaj7", "A7"],
    melody: [69, -1, 72, 74, 77, 74, 72, -1, 74, 77, 79, -1, 76, 73, 69, -1, 69, 72, 74, -1, 77, 76, 74, -1, 77, 74, 70, -1, 73, 76, 69, -1],
  },
  {
    id: "tension-home", title: "张力与归途", subtitle: "原创练习 · 旋律小调与 altered", key: "D minor", bpm: 88,
    chords: ["Dm6", "DmMaj7", "G7#11", "G7#11", "Em7b5", "A7alt", "Dm6", "A7alt"],
    // Original head: D melodic-minor colors, G Lydian dominant, then altered A
    // resolving to the F in Dm6; the final C# leads back to the opening D.
    melody: [74, 71, 73, 69, 77, 76, 73, -1, 71, 73, 74, -1, 76, 74, 71, -1, 70, 74, 76, -1, 70, 72, 73, 67, 77, 76, 74, -1, 72, 70, 67, 73],
  },
  {
    id: "rhythm-changes", title: "Rhythm Changes 实验室", subtitle: "原创练习 · 32 小节 AABA · 降 B 调", key: "Bb", bpm: 104,
    chords: ["Bb6", "Cm7", "Dm7", "Cm7", "Fm7", "Eb6", "Bb6/F", "Cm7", "Bb6", "Cm7", "Dm7", "Cm7", "Fm7", "Eb6", "Bb6/F", "Bb6", "D7", "D7", "G7", "G7", "C7", "C7", "F7", "F7", "Bb6", "Cm7", "Dm7", "Cm7", "Fm7", "Eb6", "Bb6/F", "Bb6"],
    chordEvents: [
      ["Bb6", "G7"], ["Cm7", "F7"], ["Dm7", "G7"], ["Cm7", "F7"], ["Fm7", "Bb7"], ["Eb6", "Edim7"], ["Bb6/F", "G7"], ["Cm7", "F7"],
      ["Bb6", "G7"], ["Cm7", "F7"], ["Dm7", "G7"], ["Cm7", "F7"], ["Fm7", "Bb7"], ["Eb6", "Edim7"], ["Bb6/F", "F7"], ["Bb6", "Bb7"],
      ["D7"], ["D7"], ["G7"], ["G7"], ["C7"], ["C7"], ["F7"], ["F7"],
      ["Bb6", "G7"], ["Cm7", "F7"], ["Dm7", "G7"], ["Cm7", "F7"], ["Fm7", "Bb7"], ["Eb6", "Edim7"], ["Bb6/F", "F7"], ["Bb6", "F7"],
    ].flatMap((changes, bar) => changes.map((chord, index) => ({ beat: bar * 4 + index * 2, chord }))),
    // Original teaching head on a conventional harmonic form; not the melody of
    // I Got Rhythm or a quotation from any existing Rhythm Changes composition.
    melody: [
      74, 77, 71, -1, 75, 79, 69, 72, 77, 74, 71, -1, 75, 72, 69, -1,
      68, 72, 74, 77, 79, 75, 76, -1, 77, 74, 71, 69, 75, 79, 77, -1,
      77, 74, 71, 74, 79, 75, 72, -1, 74, 77, 79, 71, 72, 75, 77, -1,
      72, 68, 70, 74, 75, 79, 76, -1, 74, 70, 69, 72, 74, 77, 68, -1,
      78, 81, 84, 81, 79, 78, 76, -1, 71, 74, 77, 81, 79, 77, 74, -1,
      76, 79, 82, 79, 77, 76, 74, -1, 69, 72, 75, 79, 77, 75, 72, -1,
      74, 77, 79, 71, 75, 79, 77, 69, 77, 74, 71, 74, 75, 72, 69, -1,
      68, 72, 77, 74, 79, 75, 76, 79, 77, 74, 72, 69, 70, 74, 75, -1,
    ],
  },
];

export interface HarmonyPosition { chord: string; nextChord: string; changeBeat: number; nextChangeBeat: number }
export function getHarmonyAtBeat(song: Song, absoluteQuarterBeat: number): HarmonyPosition {
  const length = song.chords.length * 4;
  if (!length) throw new Error("Song requires at least one bar.");
  const absolute = Number.isFinite(absoluteQuarterBeat) ? Math.max(0, absoluteQuarterBeat) : 0;
  const cycle = Math.floor(absolute / length), local = absolute - cycle * length;
  const events = song.chordEvents?.length ? song.chordEvents : song.chords.map((chord, bar) => ({ beat: bar * 4, chord }));
  let index = 0;
  for (let i = 1; i < events.length && events[i].beat <= local + 1e-8; i++) index = i;
  const nextIndex = (index + 1) % events.length;
  return { chord: events[index].chord, nextChord: events[nextIndex].chord,
    changeBeat: cycle * length + events[index].beat,
    nextChangeBeat: (cycle + (nextIndex === 0 ? 1 : 0)) * length + events[nextIndex].beat };
}

export const INSTRUMENTS: Instrument[] = ["piano", "bass", "drums", "sax", "guitar"];
const PITCH_CLASSES: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
export type ChordQuality = "maj7" | "m7" | "7" | "m" | "dim7" | "major"
  | "m7b5" | "m6" | "6" | "9" | "13" | "7b9" | "7#9" | "7alt" | "mMaj7" | "sus4" | "7sus4"
  | "maj9" | "m9" | "7#11" | "7b13" | "m11" | "7#5" | "maj7#11" | "9sus4" | "7#9#5" | "dim"
  | "7b5" | "13b9" | "9#11" | "7b9b5" | "6/9" | "m6/9";
export interface ParsedChord { root: number; bass: number; quality: ChordQuality; intervals: number[] }
const CHORD_INTERVALS: Record<ChordQuality, number[]> = {
  maj7: [0, 4, 7, 11], m7: [0, 3, 7, 10], "7": [0, 4, 7, 10], m: [0, 3, 7],
  dim7: [0, 3, 6, 9], major: [0, 4, 7], m7b5: [0, 3, 6, 10], m6: [0, 3, 7, 9], "6": [0, 4, 7, 9],
  "9": [0, 4, 7, 10, 14], "13": [0, 4, 7, 10, 14, 21], "7b9": [0, 4, 7, 10, 13],
  "7#9": [0, 4, 7, 10, 15], "7alt": [0, 4, 6, 10, 13, 15, 20], mMaj7: [0, 3, 7, 11],
  sus4: [0, 5, 7], "7sus4": [0, 5, 7, 10], maj9: [0, 4, 7, 11, 14], m9: [0, 3, 7, 10, 14], "7#11": [0, 4, 7, 10, 14, 18],
  "7b13": [0, 4, 7, 10, 20], m11: [0, 3, 7, 10, 14, 17], "7#5": [0, 4, 8, 10], "maj7#11": [0, 4, 7, 11, 18],
  "9sus4": [0, 5, 7, 10, 14], "7#9#5": [0, 4, 8, 10, 15], dim: [0, 3, 6], "7b5": [0, 4, 6, 10],
  "13b9": [0, 4, 7, 10, 13, 21], "9#11": [0, 4, 7, 10, 14, 18], "7b9b5": [0, 4, 6, 10, 13], "6/9": [0, 4, 7, 9, 14], "m6/9": [0, 3, 7, 9, 14],
};
const SUFFIXES: Record<string, ChordQuality> = {
  "": "major", maj: "major", maj7: "maj7", M7: "maj7", "Δ7": "maj7", m7: "m7", min7: "m7", "-7": "m7",
  m: "m", min: "m", "-": "m", dim7: "dim7", "°7": "dim7", "7": "7", m7b5: "m7b5", "ø7": "m7b5", "ø": "m7b5",
  m6: "m6", "6": "6", "9": "9", "13": "13", "7b9": "7b9", "7#9": "7#9", "7alt": "7alt", alt: "7alt",
  mMaj7: "mMaj7", mmaj7: "mMaj7", mM7: "mMaj7", sus4: "sus4", sus: "sus4", "7sus4": "7sus4", "7sus": "7sus4",
  maj9: "maj9", M9: "maj9", m9: "m9", "7#11": "7#11",
  "7b13": "7b13", m11: "m11", "7#5": "7#5", "7+": "7#5", "maj7#11": "maj7#11", "9sus4": "9sus4", "9sus": "9sus4",
  "7#9#5": "7#9#5", "7#5#9": "7#9#5", dim: "dim", "°": "dim", "7b5": "7b5", "13b9": "13b9", "9#11": "9#11", "7b9b5": "7b9b5", "7b5b9": "7b9b5", "69": "6/9", m69: "m6/9",
};
const pitchClass = (letter: string, accidental = "") => (PITCH_CLASSES[letter.toUpperCase()] + (accidental === "b" ? -1 : accidental === "#" ? 1 : 0) + 12) % 12;

/** Deliberately small grammar: reject unsupported harmony instead of guessing. */
export function parseChord(symbol: string): ParsedChord {
  const normalized = symbol.trim().replace(/♭/g, "b").replace(/♯/g, "#").replace(/−/g, "-").replace(/[()]/g, "").replace("6/9", "69");
  const match = /^([A-Ga-g])([b#]?)([^/]*)(?:\/([A-Ga-g])([b#]?))?$/.exec(normalized);
  if (!match || !Object.prototype.hasOwnProperty.call(SUFFIXES, match[3])) throw new Error(`暂不支持和弦「${symbol}」。请检查和弦拼写或使用支持的基本／扩展和弦。`);
  const root = pitchClass(match[1], match[2]);
  const quality = SUFFIXES[match[3]];
  return { root, bass: match[4] ? pitchClass(match[4], match[5]) : root, quality, intervals: [...CHORD_INTERVALS[quality]] };
}

/** Midrange piano voicing. The separate arrangement supplies the low register. */
export function getVoicing(chord: string, hasBass: boolean): number[] {
  const { root, quality, intervals } = parseChord(chord);
  const rootless: Record<ChordQuality, number[]> = {
    maj7: [4, 7, 11, 14], m7: [3, 10, 14, 17], "7": [4, 10, 14, 21],
    m: [3, 7, 14], dim7: [3, 6, 9], major: [4, 7, 14],
    m7b5: [3, 6, 10, 14], m6: [3, 7, 9, 14], "6": [4, 7, 9, 14],
    "9": [4, 10, 14, 19], "13": [4, 10, 14, 21], "7b9": [4, 10, 13, 19],
    "7#9": [4, 10, 15, 19], "7alt": [4, 10, 13, 20], mMaj7: [3, 7, 11, 14],
    sus4: [5, 7, 14], "7sus4": [5, 10, 14, 19], maj9: [4, 7, 11, 14], m9: [3, 10, 14, 17], "7#11": [4, 10, 14, 18],
    "7b13": [4, 10, 14, 20], m11: [3, 10, 14, 17], "7#5": [4, 8, 10, 14], "maj7#11": [4, 11, 14, 18],
    "9sus4": [5, 10, 14, 19], "7#9#5": [4, 10, 15, 20], dim: [3, 6], "7b5": [4, 6, 10, 14],
    "13b9": [4, 10, 13, 21], "9#11": [4, 10, 14, 18], "7b9b5": [4, 6, 10, 13], "6/9": [4, 7, 9, 14], "m6/9": [3, 7, 9, 14],
  };
  // Keep the voicing clear of the bass and the highest melody register.
  const base = 48 + root;
  return (hasBass ? rootless[quality] : intervals).map(interval => base + interval);
}

export function getRoleDescription(instrument: Instrument, band: Instrument[], locale: MusicLocale = "zh-CN", options?: PerformanceOptions): string {
  if (options) return getArrangementInfo(band, options, locale).parts[instrument].role;
  const hasBass = band.includes("bass");
  if (locale === "en") {
    const descriptions: Record<Instrument, string> = {
      piano: hasBass ? "Bass holds the low register. Piano uses rootless voicings with guide tones and colors, leaving room for the ensemble." : "Without a bassist, piano supplies low notes on beats 1 and 3 while comping above.",
      bass: "Connect roots and chord tones with a steady quarter-note walk. Chromatic approaches point toward the next harmony.",
      drums: "Keep a swung ride pulse and light snare on 2 and 4. Advanced pads add rhythmic fills, not pitched scales.",
      sax: "Shape short questions and answers. Advanced phrases explore tension and resolve to a target in the next chord.",
      guitar: band.includes("piano") ? "Answer piano with short chords and leave space. Avoid filling every beat together." : "Use light guide-tone chords to connect melody and bass.",
    };
    return descriptions[instrument];
  }
  if (locale === "zh-TW") {
    const descriptions: Record<Instrument, string> = {
      piano: hasBass ? "貝斯負責低音。鋼琴用去根音和弦呈現導向音與色彩音，在中音區留出空間。" : "目前沒有貝斯：鋼琴在第 1、3 拍補充低音，同時用和弦支持旋律。",
      bass: "用根音、和弦音與半音連接保持四拍脈動，讓大家聽見下一個和弦的方向。",
      drums: "用 ride 鈸保持 swing 脈動，在第 2、4 拍輕點小鼓；進階按鍵是節奏加花，不是音階。",
      sax: "用短旋律提問、回應並留出呼吸；進階樂句探索張力，再收束到下一和弦。",
      guitar: band.includes("piano") ? "與鋼琴交替填入輕巧和弦，避免擠滿同一節拍；聆聽彼此留下的空間。" : "用輕巧的導向音和弦節奏，連接旋律與低音。",
    };
    return descriptions[instrument];
  }
  switch (instrument) {
    case "piano": return hasBass
      ? "贝斯负责低音。钢琴用去根音和弦表现三音、七音与色彩音，在中音区留出空间。"
      : "当前没有贝斯：钢琴在第 1、3 拍补充低音，同时用和弦支持旋律。";
    case "bass": return "用根音、和弦音与走向下一和弦的连接音维持四拍脉动；让大家听见和声的方向。";
    case "drums": return "用 ride 镲保持 swing 脉动，在第 2、4 拍轻点军鼓；用留白和力度回应独奏。";
    case "sax": return "用短旋律提问、回应并留出呼吸；音符少也可以形成清晰的爵士乐句。";
    case "guitar": return band.includes("piano")
      ? "与钢琴交替填入轻巧和弦，避免挤满同一节拍；聆听彼此留下的空间。"
      : "用三音、七音组成轻巧的和弦节奏，连接旋律与低音。";
  }
}

export function padLabels(instrument: Instrument, difficulty: Difficulty = "beginner", locale: MusicLocale = "zh-CN", options: PerformanceOptions = {}): string[] {
  const labels: Record<MusicLocale, Record<Instrument, string[]>> = {
    "zh-CN": {
      piano: ["低音支撑", "和弦回应", "轻巧色彩", "九音扩展", "半音趋近", "围绕三音", "音阶张力", "跨小节收束"],
      bass: ["根音", "五音", "连接音", "八度行走", "半音趋近", "围绕三音", "张力行走", "双重包围"],
      drums: ["Ride 镲", "军鼓", "底鼓", "切分回应", "三连音", "四音加花", "Bebop 爆点", "跨拍滚奏"],
      sax: ["起句", "上行", "回应", "九音色彩", "半音趋近", "Bebop 乐句", "音阶张力", "双重包围"],
      guitar: ["短和弦", "切分回应", "色彩音", "九音扩展", "半音趋近", "围绕三音", "音阶张力", "跨小节收束"],
    },
    "zh-TW": {
      piano: ["低音支撐", "和弦回應", "輕巧色彩", "九音擴展", "半音趨近", "圍繞三音", "音階張力", "跨小節收束"],
      bass: ["根音", "五音", "連接音", "八度行走", "半音趨近", "圍繞三音", "張力行走", "雙重包圍"],
      drums: ["Ride 鈸", "小鼓", "大鼓", "切分回應", "三連音", "四音加花", "Bebop 爆點", "跨拍滾奏"],
      sax: ["起句", "上行", "回應", "九音色彩", "半音趨近", "Bebop 樂句", "音階張力", "雙重包圍"],
      guitar: ["短和弦", "切分回應", "色彩音", "九音擴展", "半音趨近", "圍繞三音", "音階張力", "跨小節收束"],
    },
    en: {
      piano: ["Low anchor", "Comp", "Color", "Add ninth", "Approach", "Enclosure", "Scale tension", "Across the bar"],
      bass: ["Root", "Fifth", "Connection", "Octave walk", "Approach", "Enclosure", "Tension walk", "Double enclosure"],
      drums: ["Ride", "Snare", "Kick", "Syncopation", "Triplet", "Four-note fill", "Bebop bombs", "Across-beat roll"],
      sax: ["Question", "Rise", "Answer", "Ninth color", "Approach", "Bebop phrase", "Scale tension", "Double enclosure"],
      guitar: ["Short chord", "Syncopate", "Color", "Add ninth", "Approach", "Enclosure", "Scale tension", "Across the bar"],
    },
  };
  const output = [...labels[locale][instrument]];
  const solo = options.featuredSolo === instrument;
  if ((instrument === "piano" || instrument === "bass" || instrument === "guitar") && solo) {
    const soloLabels: Record<MusicLocale, string[]> = {
      "zh-CN": ["旋律起句", "两音回答", "上行短句", "九音旋律", "趋向目标", "旋律包围", "音阶张力", "双重包围"],
      "zh-TW": ["旋律起句", "兩音回答", "上行短句", "九音旋律", "趨向目標", "旋律包圍", "音階張力", "雙重包圍"],
      en: ["Melodic start", "Two-note reply", "Rising phrase", "Ninth melody", "Target approach", "Enclosure", "Scale tension", "Double enclosure"],
    };
    return soloLabels[locale].slice(0, DIFFICULTY_KEYS[difficulty].length);
  }
  if (instrument === "piano") {
    const supportingBass = (options.band?.includes("bass") ?? true) && options.featuredSolo !== "bass";
    output[0] = supportingBass ? tr(locale, options.pianoVoicing === "rooted" ? "含根音壳" : "导向音壳", options.pianoVoicing === "rooted" ? "含根音殼" : "導向音殼", options.pianoVoicing === "rooted" ? "Rooted shell" : "Guide-tone shell") : output[0];
    output[5] = tr(locale, "切分和弦", "切分和弦", "Syncopated chords");
    output[6] = tr(locale, "张力配音", "張力配音", "Tension voicing");
    output[7] = tr(locale, "导向音连接", "導向音連接", "Guide-tone connection");
  }
  return output.slice(0, DIFFICULTY_KEYS[difficulty].length);
}

const NOTE_NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
export function midiName(midi: number): string {
  return `${NOTE_NAMES[((Math.round(midi) % 12) + 12) % 12]}${Math.floor(Math.round(midi) / 12) - 1}`;
}
const noteClassName = (midi: number) => NOTE_NAMES[((midi % 12) + 12) % 12];
const tr = (locale: MusicLocale, cn: string, tw: string, en: string) => locale === "en" ? en : locale === "zh-TW" ? tw : cn;
const nearPitch = (pitch: number, reference: number) => ((pitch % 12) + 12) % 12 + 12 * Math.round((reference - ((pitch % 12) + 12) % 12) / 12);
const isDominant = (quality: ChordQuality) => ["7", "9", "13", "7b9", "7#9", "7alt", "7#11", "7b13", "7#5", "7#9#5", "7b5", "13b9", "9#11", "7b9b5"].includes(quality);

function arrangementPlan(band: Instrument[], options: PerformanceOptions = {}) {
  const featuredSolo = options.featuredSolo && band.includes(options.featuredSolo) ? options.featuredSolo : null;
  const supportingBass = band.includes("bass") && featuredSolo !== "bass";
  const foundation: Instrument | null = supportingBass ? "bass" : band.includes("piano") ? "piano" : band.includes("guitar") ? "guitar" : null;
  const melody: Instrument | null = featuredSolo && featuredSolo !== "drums" ? featuredSolo : featuredSolo === "drums" ? null
    : band.includes("sax") ? "sax" : (["piano", "guitar"] as Instrument[]).find(i => band.includes(i) && options.player !== i) ?? null;
  const hasDrums = band.includes("drums"), hasGuitar = band.includes("guitar");
  const rootless = options.pianoVoicing === "rootless" || (options.pianoVoicing !== "rooted" && supportingBass);
  const pianoPattern = !hasDrums ? [0, 2, 4, 6] : featuredSolo === "bass" ? [0, 4] : hasGuitar ? [0, 5] : [0, 3, 6];
  return { featuredSolo, supportingBass, foundation, melody, hasDrums, hasGuitar, rootless, pianoPattern };
}

export interface ArrangementPart { mode: PartMode; role: string; register: string; density: string; padSummary: string }
export function getArrangementInfo(band: Instrument[], options: PerformanceOptions = {}, locale: MusicLocale = "zh-CN"): { summary: string; featuredSolo: Instrument | null; parts: Record<Instrument, ArrangementPart> } {
  const plan = arrangementPlan(band, options);
  const names: Record<Instrument, string> = locale === "en" ? { piano: "piano", bass: "bass", drums: "drums", sax: "saxophone", guitar: "guitar" }
    : locale === "zh-TW" ? { piano: "鋼琴", bass: "貝斯", drums: "鼓", sax: "薩克斯", guitar: "吉他" } : { piano: "钢琴", bass: "贝斯", drums: "鼓", sax: "萨克斯", guitar: "吉他" };
  const parts = {} as Record<Instrument, ArrangementPart>;
  for (const instrument of INSTRUMENTS) {
    const solo = plan.featuredSolo === instrument;
    let role = "", register = "", density = "";
    if (!band.includes(instrument)) {
      role = tr(locale, "当前未在场。", "目前未在場。", "Not in the current ensemble.");
      register = "—"; density = "—";
    } else if (instrument === "piano") {
      role = solo ? tr(locale, "右手改奏上方单音旋律与短句；缺少低音支撑时，系统保留轻量左手低音。", "右手改奏上方單音旋律與短句；缺少低音支撐時，系統保留輕量左手低音。", "Play upper-register melodic single notes and phrases; the engine keeps a light left-hand foundation when needed.")
        : tr(locale, "用和弦节奏伴奏，旋律独奏留给当前主奏。", "用和弦節奏伴奏，旋律獨奏留給目前主奏。", "Comp with harmonic rhythms and leave melodic soloing to the featured player.");
      if (plan.foundation === "piano") role += " " + tr(locale, plan.featuredSolo === "bass" ? "贝斯在高音区独奏，钢琴接手低音基础。" : "没有伴奏贝斯，钢琴在第 1、3 拍补充低音。", plan.featuredSolo === "bass" ? "貝斯在高音區獨奏，鋼琴接手低音基礎。" : "沒有伴奏貝斯，鋼琴在第 1、3 拍補充低音。", plan.featuredSolo === "bass" ? "Bass is soloing higher, so piano takes the low foundation." : "With no accompanying bassist, piano supplies low notes on 1 and 3.");
      if (!solo) role += " " + tr(locale, plan.rootless ? "中音区采用去根音配音。" : "中音区采用含根音配音。", plan.rootless ? "中音區採用去根音配音。" : "中音區採用含根音配音。", plan.rootless ? "Midrange voicings omit the root." : "Midrange voicings include the root.");
      register = solo ? "C4–C6" : plan.foundation === "piano" ? "C2–C5" : "C3–C5";
      density = solo ? tr(locale, "有呼吸的上方单音乐句", "有呼吸的上方單音樂句", "Upper single-note phrases with breathing space") : plan.featuredSolo === "bass" && plan.hasDrums ? tr(locale, "为贝斯独奏减少和弦密度", "為貝斯獨奏減少和弦密度", "Sparse chords around the bass solo") : tr(locale, !plan.hasDrums ? "无鼓：增加四拍短和弦脉搏" : !plan.hasGuitar ? "无吉他：增加一次和弦回应" : "与吉他交替，减少重叠", !plan.hasDrums ? "無鼓：增加四拍短和弦脈搏" : !plan.hasGuitar ? "無吉他：增加一次和弦回應" : "與吉他交替，減少重疊", !plan.hasDrums ? "No drums: four-beat comping pulse" : !plan.hasGuitar ? "No guitar: one extra chord response" : "Alternate with guitar and reduce overlap");
    } else if (instrument === "bass") {
      role = solo ? tr(locale, "离开连续低音行走，转到高一组的单音乐句与切分节奏。", "離開連續低音行走，轉到高一組的單音樂句與切分節奏。", "Leave the continuous low walk for higher melodic phrases and syncopation.") : tr(locale, "用低音根音、和弦音与半音连接提供行走基础，先听和弦何时改变。", "用低音根音、和弦音與半音連接提供行走基礎，先聽和弦何時改變。", "Walk low roots, chord tones and chromatic connections, tracking the actual harmonic changes.");
      if (solo && plan.foundation) role += " " + tr(locale, `${names[plan.foundation]}接手低音基础。`, `${names[plan.foundation]}接手低音基礎。`, `${names[plan.foundation]} carries the low foundation.`);
      register = solo ? "C3–C5" : "C2–C4";
      if (solo && !plan.foundation) role += " " + tr(locale, "当前没有其他低音基础；加入钢琴或吉他可补充支持。", "目前沒有其他低音基礎；加入鋼琴或吉他可補充支持。", "No other foundation is present; add piano or guitar for support.");
      density = tr(locale, solo ? "有留白的八分音乐句" : plan.hasDrums ? "稳定四分音符" : "无鼓：增强四拍重音", solo ? "有留白的八分音樂句" : plan.hasDrums ? "穩定四分音符" : "無鼓：增強四拍重音", solo ? "Eighth-note phrases with space" : plan.hasDrums ? "Steady quarter-note walk" : "No drums: stronger quarter-note accents");
    } else if (instrument === "guitar") {
      role = tr(locale, plan.foundation === "guitar" ? "没有低音伴奏与钢琴：用低弦根音和短和弦支持合奏。" : "以短和弦回应钢琴，为独奏保留空间。", plan.foundation === "guitar" ? "沒有低音伴奏與鋼琴：用低弦根音和短和弦支持合奏。" : "以短和弦回應鋼琴，為獨奏保留空間。", plan.foundation === "guitar" ? "With no low accompaniment or piano, supply low-string roots and short chords." : "Answer piano with short chords and leave space for the soloist.");
      register = plan.foundation === "guitar" ? "E2–C5" : "C3–C5";
      density = tr(locale, plan.hasDrums ? "第 2、4 拍轻巧回应" : "无鼓：加强短促四拍脉搏", plan.hasDrums ? "第 2、4 拍輕巧回應" : "無鼓：加強短促四拍脈搏", plan.hasDrums ? "Light answers on 2 and 4" : "No drums: stronger four-beat comping");
      if (solo) { role = tr(locale, "以高音区单音短句独奏，钢琴与低音让出空间。", "以高音區單音短句獨奏，鋼琴與低音讓出空間。", "Solo in higher single-note phrases while piano and bass leave space."); register = "C4–C6"; density = tr(locale, "有留白的旋律短句", "有留白的旋律短句", "Melodic phrases with space"); }
    } else if (instrument === "sax") {
      role = plan.featuredSolo && !solo ? tr(locale, "其他乐器独奏时暂时休息，留出旋律空间。", "其他樂器獨奏時暫時休息，留出旋律空間。", "Rest while another instrument solos, leaving melodic space.") : tr(locale, "演奏曲目主题；无原谱旋律的和声练习使用原创和弦音示范。", "演奏曲目主題；無原譜旋律的和聲練習使用原創和弦音示範。", "Play the head; harmony-only studies use an original chord-tone demonstration.");
      register = "C4–C6"; density = tr(locale, "按旋律呼吸与休止", "按旋律呼吸與休止", "Follow melodic breaths and rests");
    } else {
      role = tr(locale, solo ? "用 ride、小鼓与底鼓的加花成为节奏主角。" : "维持 swing 脉搏；有独奏时降低密度与力度。", solo ? "用 ride、小鼓與大鼓的加花成為節奏主角。" : "維持 swing 脈搏；有獨奏時降低密度與力度。", solo ? "Lead with ride, snare and kick fills." : "Keep the swing pulse; reduce density and level around a soloist.");
      register = tr(locale, "无固定音高", "無固定音高", "Unpitched"); density = tr(locale, solo ? "节奏加花" : "Ride + 轻拍 2、4", solo ? "節奏加花" : "Ride + 輕拍 2、4", solo ? "Rhythmic fills" : "Ride + light 2 and 4");
    }
    if (!plan.featuredSolo && !band.includes("sax") && plan.melody === instrument) role += " " + tr(locale, "萨克斯缺席：同时接过上方主题线。", "薩克斯缺席：同時接過上方主題線。", "Sax is absent: also carry the upper head line.");
    if (options.player === instrument && band.includes(instrument)) role += " " + tr(locale, "你已接管这个声部。", "你已接管這個聲部。", "You have taken over this part.");
    parts[instrument] = { mode: solo ? "solo" : "comping", role, register, density, padSummary: padLabels(instrument, "beginner", locale, { ...options, band }).join(" · ") };
  }
  const summary = plan.featuredSolo ? tr(locale, `${names[plan.featuredSolo]}独奏，其余声部让出旋律空间。`, `${names[plan.featuredSolo]}獨奏，其餘聲部讓出旋律空間。`, `${names[plan.featuredSolo]} is featured; other parts leave melodic space.`)
    : tr(locale, "合奏伴奏模式：低音、和弦、脉搏与主题分工会随编制变化。", "合奏伴奏模式：低音、和弦、脈搏與主題分工會隨編制變化。", "Ensemble mode: foundation, chords, pulse and head adapt to the players present.");
  return { summary, featuredSolo: plan.featuredSolo, parts };
}

export interface Technique { title: string; notes: number[]; description: string; scale: string }
interface PlayableTechnique extends Technique {
  kind: "note" | "chord" | "phrase" | "chord-phrase" | "drums";
  voicings?: number[][];
  offsets: number[];
  resolveNext: boolean;
  straight?: boolean;
  durationBeats?: number;
}

/**
 * Teaching references for our original generated exercises (no copied solo lines):
 * Gary Burton, Berklee: https://online.berklee.edu/takenote/jazz-improvisation-10-scales/
 * Jazzadvice: https://www.jazzadvice.com/lessons/how-to-effectively-use-enclosure/
 * https://www.jazzadvice.com/lessons/mastering-the-bebop-scale-and-jazz-improvisation/
 * Marc-Andre Seguin: https://www.jazzguitarlessons.net/blog/jazz-guitar-toolbox-melodic-minor
 * A scale is a contextual palette; none of these options is a universal chord rule.
 */
function buildTechnique(chord: string, nextChord: string, instrument: Instrument, difficulty: Difficulty, pad: number, locale: MusicLocale, hasBass = true, options: PerformanceOptions = {}): PlayableTechnique {
  if (!Number.isInteger(pad) || pad < 0 || pad >= DIFFICULTY_KEYS[difficulty].length) throw new Error("Pad is unavailable at this difficulty.");
  const harmony = parseChord(chord), next = parseChord(nextChord);
  const solo = options.featuredSolo === instrument;
  const supportingBass = (options.band?.includes("bass") ?? hasBass) && options.featuredSolo !== "bass";
  const rootless = options.pianoVoicing === "rootless" || (options.pianoVoicing !== "rooted" && supportingBass);
  const base = (instrument === "bass" ? solo ? 48 : 36 : 60) + harmony.root;
  const third = base + harmony.intervals[1];
  const target = nearPitch(next.root + next.intervals[1], base + 5);
  const targetText = `${nextChord} · ${midiName(target)}`;
  const title = padLabels(instrument, difficulty, locale, { ...options, band: options.band ?? (hasBass ? ["piano", "bass", "drums", "sax"] : ["piano", "drums", "sax"]) })[pad];
  const caution = tr(locale, "音阶是听觉选择，不是适用于所有同名和弦的规则。", "音階是聽覺選擇，不是適用於所有同名和弦的規則。", "A scale is a listening choice, not a universal rule for every chord of this type.");
  const resolution = tr(locale,
    `尾音将在下一次和弦变化时收束到 ${targetText}；挂留和弦以四音作为导向音。`,
    `尾音將在下一次和弦變化時收束到 ${targetText}；掛留和弦以四音作為導向音。`,
    `The final note resolves at the next chord change to ${targetText}; a suspended chord uses its fourth as the guide tone.`);
  const result = (notes: number[], description: string, scale: string, kind: PlayableTechnique["kind"] = "phrase", resolveNext = false, offsets = notes.map((_, i) => i * 0.5)): PlayableTechnique =>
    ({ title, notes, description, scale, kind, resolveNext, offsets });

  if (instrument === "drums") {
    const patterns = [[51], [38], [36], [51, 38, 51], [38, 38, 36], [38, 38, 36, 51], [51, 36, 38, 51, 36], [38, 38, 38, 36, 38, 38, 36, 51]];
    const rhythms = [[0], [0], [0], [0, 0.5, 1.5], [0, 1 / 3, 2 / 3], [0, 0.5, 1, 1.5], [0, 0.75, 1, 1.5, 2.5], [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2]];
    return { ...result(patterns[pad], tr(locale,
      pad < 3 ? "先听四拍脉搏，再选择轻重与留白。" : "此键触发实际的多击节奏加花。聆听 ride、小鼓与底鼓的交替；音阶概念不适用于这些无固定音高的鼓击。",
      pad < 3 ? "先聽四拍脈搏，再選擇輕重與留白。" : "此鍵觸發實際的多擊節奏加花。聆聽 ride、小鼓與大鼓的交替；音階概念不適用於這些無固定音高的鼓擊。",
      pad < 3 ? "Hear the four-beat pulse, then choose dynamics and space." : "This pad plays a real multi-hit rhythmic fill. Listen to the ride, snare and kick exchange; pitched scales do not apply to these drum hits."),
    tr(locale, pad === 4 ? "三连音" : "节奏与重音", pad === 4 ? "三連音" : "節奏與重音", pad === 4 ? "Triplets" : "Rhythm and accents"), "drums", false, rhythms[pad]), straight: pad === 4 };
  }
  if (pad < 3) {
    if (solo && ["piano", "bass", "guitar"].includes(instrument)) {
      const fifth = base + harmony.intervals[2];
      const line = [[third], [fifth, third], [third, fifth, base + 12]][pad];
      return result(line, tr(locale, "这是单音独奏材料：在更高音区用短句与留白表达旋律，不触发伴奏块状和弦。", "這是單音獨奏材料：在更高音區用短句與留白表達旋律，不觸發伴奏塊狀和弦。", "These are melodic solo notes: shape short higher-register phrases and rests instead of triggering comping chord blocks."), chord, line.length === 1 ? "note" : "phrase");
    }
    const voicing = getVoicing(chord, instrument === "guitar" ? true : rootless);
    const shell = [48 + harmony.root + harmony.intervals[1], 48 + harmony.root + (harmony.intervals[3] ?? harmony.intervals[2])];
    const pianoAnchor = !supportingBass ? [36 + harmony.bass] : rootless ? shell : [48 + harmony.root, shell[0]];
    const notes = instrument === "bass" ? [[36 + harmony.bass], [36 + harmony.root + harmony.intervals[2]], [35 + next.bass]][pad]
      : instrument === "piano" ? [pianoAnchor, voicing, voicing.slice(1).map(n => n + 12)][pad]
      : instrument === "guitar" ? [voicing.slice(0, 3), voicing.slice(0, 3), voicing.slice(-2).map(n => n + 12)][pad]
      : [[third], [base + harmony.intervals[2]], [base + 12]][pad];
    return { ...result(notes, tr(locale,
      instrument === "piano" ? "伴奏模式用和弦节奏支持别人。有伴奏贝斯时 A 键默认弹中音导向音壳；无低音基础时才补低音，也可手动选择含根音配音。" : "用简短声音建立问答，先找到节拍和声部位置。",
      instrument === "piano" ? "伴奏模式用和弦節奏支持別人。有伴奏貝斯時 A 鍵預設彈中音導向音殼；無低音基礎時才補低音，也可手動選擇含根音配音。" : "用簡短聲音建立問答，先找到節拍和聲部位置。",
      instrument === "piano" ? "Comping supports others with chord rhythms. With an accompanying bass, A plays a midrange guide-tone shell; without a foundation it adds low notes. Rooted voicings can also be selected explicitly." : "Build a short question and answer. Find your pulse and register."),
    chord, notes.length > 1 ? "chord" : "note", false, notes.map(() => 0)), durationBeats: instrument === "guitar" && pad === 1 ? 0.35 : 0.8 };
  }
  if (instrument === "piano" && !solo && pad >= 4) {
    const shell = (symbol: string) => {
      const parsed = parseChord(symbol);
      return [...(rootless ? [] : [48 + parsed.root]), 48 + parsed.root + parsed.intervals[1], 48 + parsed.root + (parsed.intervals[3] ?? parsed.intervals[2])];
    };
    const current = shell(chord), goal = shell(nextChord);
    let voicings: number[][], description: string, scale = `${chord} → ${nextChord}`, resolve = true, offsets: number[];
    if (pad === 4) {
      voicings = [goal.map(n => n - 1), goal]; offsets = [0, 0.5];
      description = tr(locale, "把下一和弦的导向音壳从下方半音移入，让和弦声部同时解决。", "把下一和弦的導向音殼從下方半音移入，讓和弦聲部同時解決。", "Slide a guide-tone shell up a semitone into the next chord.");
    } else if (pad === 5) {
      voicings = [current, [...current].reverse().map((n, i) => n + (i === 1 ? 12 : 0)), current]; offsets = [0, 0.5, 1.5]; resolve = false;
      description = tr(locale, "用三次短和弦制造切分回应；这是伴奏节奏，不是旋律跑句。", "用三次短和弦製造切分回應；這是伴奏節奏，不是旋律跑句。", "Answer with three short syncopated chord stabs; this is comping, not a melodic run.");
    } else if (pad === 6) {
      const palette = buildTechnique(chord, nextChord, "sax", difficulty, 6, locale, hasBass, { ...options, featuredSolo: "sax" });
      const colors = palette.notes.slice(1, 3).map(n => nearPitch(n, 72));
      voicings = [[...current, ...colors], goal]; offsets = [0, 1]; scale = palette.scale;
      description = tr(locale, "把语境音阶中的色彩音加在导向音之上，先听张力和弦，再落到下一和弦的稀疏音壳。", "把語境音階中的色彩音加在導向音之上，先聽張力和弦，再落到下一和弦的稀疏音殼。", "Voice contextual scale colors above the guide tones, then release into the next sparse shell.");
    } else {
      voicings = [current, current.map(n => n + 12), goal.map(n => n - 1), goal]; offsets = [0, 0.75, 1.5, 2];
      description = tr(locale, "用音区交换与半音和弦连接到下一和弦；保留伴奏角色，不与主奏争抢旋律。", "用音區交換與半音和弦連接到下一和弦；保留伴奏角色，不與主奏爭搶旋律。", "Connect the next harmony with register shifts and a chromatic shell while remaining in the accompanying role.");
    }
    return { ...result(voicings.flat(), description + (resolve ? " " + resolution : ""), scale, "chord-phrase", resolve, offsets), voicings };
  }
  if (pad === 3) {
    if (instrument === "bass" && !solo) return result([base, base + 12, base + harmony.intervals[2], base], tr(locale, "在根音与八度之间行走，再回到低音位置。", "在根音與八度之間行走，再回到低音位置。", "Walk from root to octave and back to the low register."), chord);
    const ninth = harmony.intervals.includes(13) ? 13 : harmony.intervals.includes(15) ? 15 : 14;
    if (instrument === "sax" || solo) return result([base + harmony.intervals[2], base + ninth, base + 12], tr(locale, "跳向九音色彩，再回到根音；听见张力的变化。", "跳向九音色彩，再回到根音；聽見張力的變化。", "Leap to the ninth color, then return to the root and hear the tension change."), `${chord} · 9`);
    const extension = harmony.quality === "7alt" ? 20 : harmony.quality === "7#11" || harmony.quality === "dim7" ? 18 : harmony.quality.startsWith("m") ? 17 : 21;
    return result([...new Set([...(instrument === "piano" && !rootless ? [48 + harmony.root] : []), 48 + harmony.root + harmony.intervals[1], 48 + harmony.root + (harmony.intervals[3] ?? 7), 60 + harmony.root + ninth, 48 + harmony.root + extension])], tr(locale, "实际弹奏上移八度的九音及上方色彩，比较开放配音与原来的密集和弦。", "實際彈奏上移八度的九音及上方色彩，比較開放配音與原來的密集和弦。", "Raise the ninth by an octave and add an upper color; compare the open voicing with the closer basic chord."), `${chord} · 9 / color`, "chord");
  }
  if (pad === 4) return result([target - 2, target - 1, target], tr(locale, "用连续半音靠近目标三音。", "用連續半音靠近目標三音。", "Approach the target guide tone through consecutive semitones.") + " " + resolution, tr(locale, "半音趋近", "半音趨近", "Chromatic approach"), "phrase", true);
  if (pad === 5) {
    if (instrument === "sax" && ["7", "9", "13"].includes(harmony.quality)) return result([base + 12, base + 11, base + 10, base + 9, base + 7, base + 5, third, target],
      tr(locale, "属 Bebop 音阶在降七音与根音之间加入大七度经过音；连续下降后收束。", "屬 Bebop 音階在降七音與根音之間加入大七度經過音；連續下降後收束。", "The dominant bebop scale adds a major-seventh passing tone between flat seven and the root. Descend, then resolve.") + " " + resolution,
      `${noteClassName(harmony.root)} dominant bebop · 1 2 3 4 5 6 b7 7`, "phrase", true);
    return result([third + 1, third - 1, third], tr(locale, "先从上方、再从下方包围当前和弦的三音；不必把经过音停留很久。", "先從上方、再從下方包圍目前和弦的三音；不必把經過音停留很久。", "Enclose the current third from above and below; let passing tones move rather than linger."), tr(locale, "半音包围", "半音包圍", "Chromatic enclosure"));
  }
  if (pad === 7) return result([third, third + 12, target + 2, target + 1, target - 2, target - 1, target + 12, target],
    tr(locale, "八度位移与双重包围组合成夸张的原创 Bebop 乐句。", "八度位移與雙重包圍組合成誇張的原創 Bebop 樂句。", "Octave displacement and a double enclosure create an exaggerated original bebop gesture.") + " " + resolution,
    tr(locale, "八度位移 + 双重包围", "八度位移 + 雙重包圍", "Octave displacement + double enclosure"), "phrase", true, [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2]);

  let scaleIntervals: number[], scale: string, explanation: string;
  if (isDominant(harmony.quality)) {
    const resolvingFifth = next.root === (harmony.root + 5) % 12;
    const altered = !["7#11", "9#11"].includes(harmony.quality) && (resolvingFifth || ["7alt", "7b9", "7#9", "7b13", "7#5", "7#9#5", "7b5", "7b9b5"].includes(harmony.quality));
    if (harmony.quality === "13b9") {
      scaleIntervals = [0, 1, 3, 4, 6, 7, 9, 10];
      scale = `${noteClassName(harmony.root)} half–whole diminished`;
      explanation = tr(locale, "此属和弦明确保留自然十三音与降九音，使用半全减音阶色彩，不强行改成含降十三音的 altered。", "此屬和弦明確保留自然十三音與降九音，使用半全減音階色彩，不強行改成含降十三音的 altered。", "This dominant explicitly keeps natural thirteen and flat nine; try half–whole diminished rather than imposing altered's flat thirteen.");
    } else if (altered) {
      scaleIntervals = [0, 1, 3, 4, 6, 8, 10];
      scale = `${noteClassName(harmony.root)} altered · ${noteClassName(harmony.root + 1)} melodic minor VII`;
      explanation = tr(locale, "这里用根音上方半音的旋律小调第七模式，产生 b9、#9、b5、b13，再解决到下一和弦。", "這裡用根音上方半音的旋律小調第七模式，產生 b9、#9、b5、b13，再解決到下一和弦。", "Use mode VII of melodic minor a semitone above this dominant: b9, #9, b5 and b13, then resolve.");
    } else {
      scaleIntervals = [0, 2, 4, 6, 7, 9, 10];
      scale = `${noteClassName(harmony.root)} Lydian dominant · ${noteClassName(harmony.root + 7)} melodic minor IV`;
      explanation = tr(locale, "当前属和弦没有典型五度解决，或明确标示 #11：试听旋律小调第四模式的 #11 色彩，并检查是否与旋律相容。", "目前屬和弦沒有典型五度解決，或明確標示 #11：試聽旋律小調第四模式的 #11 色彩，並檢查是否與旋律相容。", "For this non-fifth-resolving or explicit #11 dominant, try mode IV of melodic minor and check its #11 against the melody.");
    }
  } else if (["m", "m6", "mMaj7", "m6/9"].includes(harmony.quality)) {
    scaleIntervals = [0, 2, 3, 5, 7, 9, 11];
    scale = `${noteClassName(harmony.root)} melodic minor · 1 2 b3 4 5 6 7`;
    explanation = tr(locale, "把这个小和弦暂时听作小调主和弦，试用升六、升七的旋律小调；不是所有 m7 都适用。", "把這個小和弦暫時聽作小調主和弦，試用升六、升七的旋律小調；不是所有 m7 都適用。", "Temporarily hear this minor chord as a minor tonic and try melodic minor's natural sixth and seventh; this is not a rule for all m7 chords.");
  } else if (harmony.quality === "m7b5") {
    scaleIntervals = [0, 2, 3, 5, 6, 8, 10];
    scale = `${noteClassName(harmony.root)} Locrian natural 2`;
    explanation = tr(locale, "半减和弦保留降五音与降七音；自然二音只是此练习的色彩选择。", "半減和弦保留降五音與降七音；自然二音只是此練習的色彩選擇。", "Keep the half-diminished chord's flat fifth and seventh; natural two is this exercise's contextual color choice.");
  } else if (["m7", "m9", "m11"].includes(harmony.quality)) {
    scaleIntervals = [0, 2, 3, 5, 7, 9, 10];
    scale = `${noteClassName(harmony.root)} Dorian`;
    explanation = tr(locale, "当前 m7 保留降七音，使用 Dorian 练习；不把旋律小调的大七度套到每个小七和弦。", "目前 m7 保留降七音，使用 Dorian 練習；不把旋律小調的大七度套到每個小七和弦。", "Keep the flat seventh of this m7 and practice Dorian; do not impose melodic minor's major seventh on every minor-seventh chord.");
  } else if (["dim7", "dim"].includes(harmony.quality)) {
    scaleIntervals = [0, 2, 3, 5, 6, 8, 9, 11];
    scale = `${noteClassName(harmony.root)} whole–half diminished`;
    explanation = tr(locale, "减七和弦使用全半交替的减音阶练习，最后仍要听见目标。", "減七和弦使用全半交替的減音階練習，最後仍要聽見目標。", "Try whole–half diminished over the diminished-seventh chord, while keeping a clear target.");
  } else {
    const suspended = ["sus4", "7sus4", "9sus4"].includes(harmony.quality), lydian = harmony.quality === "maj7#11";
    scaleIntervals = suspended ? [0, 2, 5, 7, 9, 10] : lydian ? [0, 2, 4, 6, 7, 9, 11] : [0, 2, 4, 5, 7, 9, 11];
    scale = `${noteClassName(harmony.root)} ${suspended ? "suspended palette" : lydian ? "Lydian" : "Ionian"}`;
    explanation = tr(locale, "先用与当前和弦相容的音集走出轮廓，再听旋律和下一和弦决定色彩。", "先用與目前和弦相容的音集走出輪廓，再聽旋律和下一和弦決定色彩。", "Outline a palette compatible with the current chord, then let melody and the next harmony guide the color.");
  }
  const line = [scaleIntervals[2], scaleIntervals[4], scaleIntervals[5], scaleIntervals[3], scaleIntervals[1], scaleIntervals[0]].map(n => base + n);
  return result([...line, target], `${explanation} ${resolution} ${caution}`, scale, "phrase", true);
}

export function techniqueFor(chord: string, nextChord: string, instrument: Instrument, difficulty: Difficulty, pad: number, locale: MusicLocale = "zh-CN", hasBass = true, options: PerformanceOptions = {}): Technique {
  const { title, notes, description, scale } = buildTechnique(chord, nextChord, instrument, difficulty, pad, locale, hasBass, options);
  return { title, notes, description, scale };
}

export function getPadInfo(instrument: Instrument, pad: number, chord: string, nextChord: string, difficulty: Difficulty, locale: MusicLocale = "zh-CN", hasBass = true, options: PerformanceOptions = {}): { title: string; notes: string[]; description: string; scale: string } {
  const info = techniqueFor(chord, nextChord, instrument, difficulty, pad, locale, hasBass, options);
  return { ...info, notes: info.notes.map(midi => instrument !== "drums" ? midiName(midi) : midi === 51 ? "Ride" : midi === 38 ? tr(locale, "军鼓", "小鼓", "Snare") : tr(locale, "底鼓", "大鼓", "Kick")) };
}

/** Import a user's own/licensed chord grid, never execute code or accept remote URLs. */
export function normalizeImportedSong(input: unknown): Song {
  let candidate: unknown = input;
  if (typeof candidate === "string") {
    if (candidate.length > 32_000) throw new Error("曲目文件过大，请控制在 32 KB 以内。");
    try { candidate = JSON.parse(candidate); }
    catch { throw new Error("请导入有效的 JSON 曲目文件。"); }
  }
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) throw new Error("曲目内容必须是 JSON 对象。");
  const item = candidate as Record<string, unknown>;
  if (typeof item.title !== "string" || !item.title.trim() || item.title.length > 80) throw new Error("请填写 1–80 个字符的曲目名称 title。");
  if (!Array.isArray(item.chords) || item.chords.length < 1 || item.chords.length > 256) throw new Error("chords 需要包含 1–256 小节的首和弦摘要。");
  const chords = item.chords.map((chord, index) => {
    if (typeof chord !== "string" || chord.length > 12) throw new Error(`第 ${index + 1} 小节不是有效的和弦。`);
    parseChord(chord);
    return chord.trim();
  });
  let chordEvents: Song["chordEvents"];
  if (item.chordEvents !== undefined) {
    if (!Array.isArray(item.chordEvents) || item.chordEvents.length < 1 || item.chordEvents.length > 2048) throw new Error("chordEvents 需要包含 1–2048 个和弦变化。");
    chordEvents = item.chordEvents.map(event => {
      if (!event || typeof event !== "object" || typeof event.beat !== "number" || !Number.isFinite(event.beat) || event.beat < 0 || event.beat >= chords.length * 4 || Math.abs(event.beat * 2 - Math.round(event.beat * 2)) > 1e-7 || typeof event.chord !== "string") throw new Error("和弦变化需要有效的 beat（落在八分音符拍点）与 chord。");
      parseChord(event.chord);
      return { beat: event.beat as number, chord: event.chord as string };
    }).sort((a, b) => a.beat - b.beat);
    if (chordEvents[0].beat !== 0 || chordEvents.some((event, index) => index > 0 && event.beat === chordEvents![index - 1].beat)) throw new Error("和弦变化须从第 0 拍开始，且拍点不能重复。");
  }
  const bpm = item.bpm === undefined ? 90 : item.bpm;
  if (typeof bpm !== "number" || !Number.isFinite(bpm) || bpm < 50 || bpm > 240) throw new Error("bpm 必须是 50–240 之间的数字。");
  if (item.key !== undefined && (typeof item.key !== "string" || item.key.length > 24)) throw new Error("key 应为不超过 24 个字符的调性文字。");
  let melody: number[] | undefined;
  if (item.melody !== undefined) {
    if (!Array.isArray(item.melody) || item.melody.length < 1 || item.melody.length > 1024
      || item.melody.some(n => typeof n !== "number" || !Number.isInteger(n) || (n !== -1 && (n < 48 || n > 88)))) {
      throw new Error("melody 可包含 1–1024 个 MIDI 音高（48–88），用 -1 表示休止。");
    }
    melody = [...item.melody] as number[];
  }
  let melodyEvents: Song["melodyEvents"];
  if (item.melodyEvents !== undefined) {
    if (!Array.isArray(item.melodyEvents) || item.melodyEvents.length > 2048) throw new Error("melodyEvents 最多可包含 2048 个音符事件。");
    melodyEvents = item.melodyEvents.map(event => {
      if (!event || typeof event !== "object" || typeof event.beat !== "number" || !Number.isFinite(event.beat) || event.beat < 0 || event.beat >= chords.length * 4
        || !Number.isInteger(event.midi) || event.midi < 36 || event.midi > 96 || typeof event.duration !== "number" || !Number.isFinite(event.duration) || event.duration <= 0 || event.duration > 16) {
        throw new Error("旋律事件需要有效的 beat（曲目内拍数）、midi（36–96）与 duration（0–16 拍）。");
      }
      return { beat: event.beat as number, midi: event.midi as number, duration: event.duration as number };
    }).sort((a, b) => a.beat - b.beat);
  }
  // A content hash makes imported IDs stable and avoids collisions on repeated titles.
  const content = JSON.stringify([item.title, chords, chordEvents, melody, melodyEvents]);
  let hash = 2166136261;
  for (let i = 0; i < content.length; i++) hash = Math.imul(hash ^ content.charCodeAt(i), 16777619);
  return {
    id: `import-${(hash >>> 0).toString(36)}`, title: item.title.trim(),
    subtitle: "自带授权素材 · 和弦练习", key: typeof item.key === "string" ? item.key.trim() : "自定义",
    bpm: Math.round(bpm), chords, ...(chordEvents ? { chordEvents } : {}), ...(melody ? { melody } : {}), ...(melodyEvents ? { melodyEvents } : {}),
  };
}

export interface EngineConfig {
  song: Song;
  bpm: number;
  /** Offbeat location in a beat; accepts .50–.75 or 50–75. */
  swing: number;
  band: Instrument[];
  player: Instrument | null;
  /** Linear master level, 0–1. */
  volume: number;
  difficulty?: Difficulty;
  featuredSolo?: Instrument | null;
  pianoVoicing?: PianoVoicing;
}

export interface EngineSnapshot {
  playing: boolean;
  bar: number;
  beat: number;
  /** Monotonic, zero-based quarter-note index since this start. */
  beatId: number;
  chord: string;
  bpm: number;
  band: Instrument[];
  player: Instrument | null;
  featuredSolo: Instrument | null;
  pianoVoicing: PianoVoicing;
  nextChord: string;
}

export interface HitResult {
  timingMs: number;
  onBeat: boolean;
  /** Nearest quarter note, independent of delayed UI callbacks or song loops. */
  beatId: number | null;
}

interface ScheduledBeat { time: number; id: number }

const DEFAULT_CONFIG: EngineConfig = {
  song: SONGS[0], bpm: 88, swing: 0.62, band: ["piano", "bass", "drums", "sax"], player: null, volume: 0.65, difficulty: "beginner", featuredSolo: null, pianoVoicing: "auto",
};
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const finite = (value: number, fallback: number) => Number.isFinite(value) ? value : fallback;
const frequency = (midi: number) => 440 * 2 ** ((midi - 69) / 12);
const swingPosition = (beat: number, swing: number) => {
  const whole = Math.floor(beat), fraction = beat - whole;
  return whole + (fraction <= 0.5 ? fraction * 2 * swing : swing + (fraction - 0.5) * 2 * (1 - swing));
};
// Swing remaps binary subdivisions, not explicitly notated tuplets. Testing both
// onset and duration also catches a sextuplet that happens to begin on an eighth.
const isBinarySubdivision = (beat: number) => Math.abs(beat * 4 - Math.round(beat * 4)) < 1e-7;

/**
 * Lookahead scheduler: source.start() uses the audio clock, while UI notifications
 * happen at the audible beat. All oscillators, noise and callbacks are cancelled
 * on stop. Synthesized timbres are teaching approximations, not sampled instruments.
 */
export class JazzEngine {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private noise: AudioBuffer | null = null;
  private config: EngineConfig = { ...DEFAULT_CONFIG, band: [...DEFAULT_CONFIG.band] };
  private running = false;
  private generation = 0;
  private interval: ReturnType<typeof setInterval> | null = null;
  private callbacks = new Set<ReturnType<typeof setTimeout>>();
  private sources = new Set<AudioScheduledSourceNode>();
  private sourceInstruments = new Map<AudioScheduledSourceNode, Instrument>();
  private nextStepTime = 0;
  private step = 0;
  private audibleBar = 0;
  private audibleBeat = 0;
  private audibleBeatId = 0;
  private quarterBeats: ScheduledBeat[] = [];
  private onBeat: (bar: number, beat: number, beatId: number) => void;

  constructor(onBeat: (bar: number, beat: number, beatId: number) => void = () => {}) { this.onBeat = onBeat; }

  private ensureAudio(): AudioContext {
    if (this.context && this.context.state !== "closed") return this.context;
    if (typeof window === "undefined") throw new Error("音频只能在浏览器中播放。");
    const AudioCtor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) throw new Error("浏览器不支持 Web Audio，请使用最新版 Chrome、Safari 或 Edge。");
    const context = new AudioCtor();
    this.context = context;
    this.master = context.createGain();
    this.master.gain.value = this.config.volume * 0.55;
    this.compressor = context.createDynamicsCompressor();
    this.compressor.threshold.value = -17;
    this.compressor.knee.value = 12;
    this.compressor.ratio.value = 5;
    this.compressor.attack.value = 0.005;
    this.compressor.release.value = 0.15;
    this.master.connect(this.compressor);
    this.compressor.connect(context.destination);
    this.noise = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const values = this.noise.getChannelData(0);
    // Reproducible white noise, used only as a percussion timbre.
    let seed = 19331;
    for (let i = 0; i < values.length; i++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      values[i] = seed / 2147483648 - 1;
    }
    return context;
  }

  async start(config: EngineConfig): Promise<void> {
    this.stop();
    this.update(config);
    const generation = this.generation;
    const context = this.ensureAudio();
    await context.resume();
    if (generation !== this.generation) return;
    if (context.state !== "running") throw new Error("浏览器音频尚未启动，请点击播放后重试。");
    this.running = true;
    this.step = 0;
    this.audibleBar = 0;
    this.audibleBeat = 0;
    this.audibleBeatId = 0;
    this.quarterBeats = [];
    this.nextStepTime = context.currentTime + 0.075;
    this.schedule();
    this.interval = setInterval(() => this.schedule(), 25);
  }

  update(partial: Partial<EngineConfig>): void {
    const song = partial.song ?? this.config.song;
    // Protect the scheduler even when a caller supplies an unvalidated object.
    if (!song.chords.length) throw new Error("曲目至少需要一个和弦。");
    song.chords.forEach(parseChord);
    song.chordEvents?.forEach(event => parseChord(event.chord));
    const rawSwing = partial.swing ?? this.config.swing;
    const swing = rawSwing > 1 ? rawSwing / 100 : rawSwing;
    const nextSwing = clamp(finite(swing, 0.62), 0.5, 0.75);
    const nextBpm = clamp(finite(partial.bpm ?? this.config.bpm, 88), 50, 240);
    const difficulty = partial.difficulty ?? this.config.difficulty ?? "beginner";
    const band = partial.band ? [...new Set(partial.band.filter(i => INSTRUMENTS.includes(i)))] : this.config.band;
    const player = partial.player === undefined ? this.config.player : partial.player;
    const requestedSolo = partial.featuredSolo === undefined ? this.config.featuredSolo : partial.featuredSolo;
    const featuredSolo = requestedSolo && band.includes(requestedSolo) ? requestedSolo : null;
    const pianoVoicing = partial.pianoVoicing ?? this.config.pianoVoicing ?? "auto";
    const arrangementChanged = featuredSolo !== (this.config.featuredSolo ?? null) || pianoVoicing !== (this.config.pianoVoicing ?? "auto") || band.join() !== this.config.band.join();
    // Generated phrases can be scheduled several beats ahead. Their pitches,
    // target barline and rhythmic grid belong to the pre-update configuration.
    // Cancel the player's queued voices before replacing that configuration.
    const phraseContextChanged = difficulty !== (this.config.difficulty ?? "beginner")
      || nextBpm !== this.config.bpm || nextSwing !== this.config.swing || song !== this.config.song || arrangementChanged;
    const newlySilent = INSTRUMENTS.filter(instrument => arrangementChanged || !band.includes(instrument)
      || (player === instrument && this.config.player !== instrument)
      || (this.config.player === instrument && (player !== instrument || phraseContextChanged)));
    for (const [source, instrument] of this.sourceInstruments) {
      if (newlySilent.includes(instrument)) {
        try { source.stop(); } catch { /* already ended */ }
      }
    }
    this.config = {
      song, band, player, featuredSolo, pianoVoicing,
      difficulty,
      bpm: nextBpm,
      swing: nextSwing,
      volume: clamp(finite(partial.volume ?? this.config.volume, 0.65), 0, 1),
    };
    if (this.context && this.master) this.master.gain.setTargetAtTime(this.config.volume * 0.55, this.context.currentTime, 0.025);
    this.audibleBar %= song.chords.length;
  }

  stop(): void {
    this.generation++;
    this.running = false;
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
    this.callbacks.forEach(clearTimeout);
    this.callbacks.clear();
    this.sources.forEach(source => {
      try { source.stop(); } catch { /* already ended */ }
    });
    this.sources.clear();
    this.sourceInstruments.clear();
    this.quarterBeats = [];
  }

  dispose(): void {
    this.stop();
    this.master?.disconnect();
    this.compressor?.disconnect();
    if (this.context && this.context.state !== "closed") void this.context.close();
    this.context = null;
    this.master = null;
    this.compressor = null;
    this.noise = null;
  }

  getSnapshot(): EngineSnapshot {
    const harmony = getHarmonyAtBeat(this.config.song, this.audibleBeatId);
    return {
      playing: this.running, bar: this.audibleBar, beat: this.audibleBeat, beatId: this.audibleBeatId,
      chord: harmony.chord, nextChord: harmony.nextChord,
      bpm: this.config.bpm, band: [...this.config.band], player: this.config.player,
      featuredSolo: this.config.featuredSolo ?? null, pianoVoicing: this.config.pianoVoicing ?? "auto",
    };
  }

  private schedule(): void {
    const context = this.context;
    if (!context || !this.running) return;
    // Background tabs should resume with a fresh pulse, not a burst of overdue notes.
    if (this.nextStepTime < context.currentTime - 0.25) this.nextStepTime = context.currentTime + 0.035;
    while (this.nextStepTime < context.currentTime + 0.12) {
      this.scheduleStep(this.step, this.nextStepTime);
      const eighth = this.step % 2;
      this.nextStepTime += 60 / this.config.bpm * (eighth === 0 ? this.config.swing : 1 - this.config.swing);
      this.step++;
    }
    this.quarterBeats = this.quarterBeats.filter(beat => beat.time > context.currentTime - 8);
  }

  private scheduleStep(step: number, time: number): void {
    const { song, band, player, bpm } = this.config;
    const bar = Math.floor(step / 8) % song.chords.length;
    const subdivision = step % 8;
    const beat = Math.floor(subdivision / 2);
    const down = subdivision % 2 === 0;
    const quarter = 60 / bpm;
    const position = getHarmonyAtBeat(song, step / 2);
    const chord = position.chord;
    const harmony = parseChord(chord);
    const plan = arrangementPlan(band, this.config);
    const hasBass = plan.supportingBass;
    const absoluteBeat = step / 2;
    const localBeat = Math.floor(absoluteBeat - position.changeBeat);
    const newHarmony = Math.abs(absoluteBeat - position.changeBeat) < 1e-8;
    const plays = (instrument: Instrument) => band.includes(instrument) && player !== instrument;
    if (down) {
      const beatId = Math.floor(step / 2);
      this.quarterBeats.push({ time, id: beatId });
      const generation = this.generation;
      const timeout = setTimeout(() => {
        this.callbacks.delete(timeout);
        if (this.running && generation === this.generation) {
          this.audibleBar = bar;
          this.audibleBeat = beat;
          this.audibleBeatId = beatId;
          this.onBeat(bar, beat, beatId);
        }
      }, Math.max(0, (time - (this.context?.currentTime ?? time)) * 1000));
      this.callbacks.add(timeout);
    }
    if (plays("bass") && plan.featuredSolo !== "bass" && down) {
      const nextRoot = parseChord(position.nextChord).bass;
      const walk = [36 + harmony.bass, 36 + harmony.root + harmony.intervals[1], 36 + harmony.root + harmony.intervals[2], 36 + nextRoot - 1];
      const midi = absoluteBeat + 1 >= position.nextChangeBeat ? 36 + nextRoot - 1 : walk[localBeat % 4];
      this.note("bass", midi, time, quarter * 0.82, plan.hasDrums ? 0.72 : beat % 2 ? 0.9 : 0.78);
    }
    // The soloist's low scaffold is explicit: a human piano solo can retain a
    // light automatic left hand only when there is no accompanying bass.
    if (plan.foundation === "piano" && (plays("piano") || (player === "piano" && plan.featuredSolo === "piano")) && down && (beat === 0 || beat === 2 || newHarmony)) {
      this.note("piano", 36 + (beat === 2 && !newHarmony ? harmony.root + harmony.intervals[2] : harmony.bass), time, quarter * 1.3, plan.featuredSolo === "piano" ? 0.34 : 0.56);
    }
    if (plays("piano") && plan.featuredSolo !== "piano" && (plan.pianoPattern.includes(subdivision) || newHarmony)) {
      this.chord("piano", getVoicing(chord, plan.rootless), time, quarter * (plan.hasDrums ? 0.7 : 0.4), plan.featuredSolo ? 0.27 : 0.4);
    }
    if (plays("guitar") && plan.featuredSolo !== "guitar") {
      if (plan.foundation === "guitar" && down && (beat === 0 || beat === 2 || newHarmony)) {
        const low = 36 + harmony.bass;
        this.note("guitar", low < 40 ? low + 12 : low, time, quarter * 1.1, 0.5);
      }
      if ((!plan.hasDrums && down) || subdivision === 2 || subdivision === 6) {
        this.chord("guitar", getVoicing(chord, true).slice(0, 3), time, quarter * (plan.hasDrums ? 0.52 : 0.35), plan.featuredSolo ? 0.24 : 0.36);
      }
    }
    if (plays("drums")) {
      const scale = plan.featuredSolo && plan.featuredSolo !== "drums" ? 0.65 : 1;
      if (down) this.percussion("ride", time, (beat === 0 ? 0.33 : 0.26) * scale);
      if (!plan.featuredSolo && (subdivision === 3 || subdivision === 7)) this.percussion("ride", time, 0.17);
      if (subdivision === 2 || subdivision === 6) this.percussion("snare", time, 0.21 * scale);
      if (subdivision === 0 || subdivision === 4) this.percussion("kick", time, 0.3 * scale);
      if (plan.featuredSolo === "drums" && !down) this.percussion(subdivision === 7 ? "kick" : "snare", time, 0.42);
    }
    const solo = plan.featuredSolo;
    if (solo && solo !== "drums" && solo !== "sax" && plays(solo) && [0, 2, 3, 4, 6, 7].includes(subdivision)) {
      const base = (solo === "bass" ? 48 : 60) + harmony.root;
      const target = nearPitch(parseChord(position.nextChord).root + parseChord(position.nextChord).intervals[1], base + 5);
      const ninth = harmony.intervals.includes(13) ? 13 : harmony.intervals.includes(15) ? 15 : 14;
      const pool = [harmony.intervals[1], harmony.intervals[2], (harmony.intervals[3] ?? 12), ninth, harmony.intervals[2], harmony.intervals[1]];
      const approaching = position.nextChangeBeat - absoluteBeat <= 1;
      const midi = approaching ? target + (down ? -1 : 0) : base + pool[Math.floor((absoluteBeat - position.changeBeat) * 2) % pool.length];
      this.note(solo, midi, time, quarter * (down ? 0.55 : 0.3), solo === "bass" ? 0.7 : 0.45);
    }
    const headInstrument = !solo || solo === "sax" ? plan.melody : null;
    if (headInstrument && headInstrument !== "drums" && plays(headInstrument) && down) {
      if (song.melodyEvents) {
        const formBeat = bar * 4 + beat;
        for (const event of song.melodyEvents) {
          if (event.beat < formBeat || event.beat >= formBeat + 1) continue;
          const offset = event.beat - formBeat;
          const eventSwing = isBinarySubdivision(event.beat) && isBinarySubdivision(event.duration) ? this.config.swing : 0.5;
          const from = swingPosition(offset, eventSwing);
          const to = swingPosition(offset + event.duration, eventSwing);
          this.note(headInstrument, event.midi, time + from * quarter, Math.max(0.06, (to - from) * quarter * 0.88), headInstrument === "sax" ? 0.35 : 0.3);
        }
      } else {
        const generated = [harmony.root + 60 + harmony.intervals[1], harmony.root + 60 + harmony.intervals[2], harmony.root + 72, -1];
        const midi = song.melody?.[(bar * 4 + beat) % song.melody.length] ?? generated[beat];
        if (midi >= 0) this.note(headInstrument, midi, time, quarter * (beat === 2 ? 0.82 : 0.66), headInstrument === "sax" ? 0.35 : 0.3);
      }
    }
  }

  hit(instrument: Instrument, pad: number): HitResult {
    if (!this.running || !this.context || !this.config.band.includes(instrument)) return { timingMs: 0, onBeat: false, beatId: null };
    const now = this.context.currentTime;
    const difficulty = this.config.difficulty ?? "beginner";
    if (!Number.isInteger(pad) || pad < 0 || pad >= DIFFICULTY_KEYS[difficulty].length) return { timingMs: 0, onBeat: false, beatId: null };
    const index = pad;
    const quarter = 60 / this.config.bpm;
    // The next quarter may lie beyond the 120 ms lookahead. Its identity and time
    // come from the actual scheduler cursor, including a pending swung offbeat.
    const upcoming: ScheduledBeat = {
      id: Math.ceil(this.step / 2),
      time: this.nextStepTime + (this.step % 2 === 1 ? quarter * (1 - this.config.swing) : 0),
    };
    const candidates = this.quarterBeats.length ? [...this.quarterBeats, upcoming] : [];
    const closest = candidates.length
      ? candidates.reduce((best, value) => Math.abs(value.time - now) < Math.abs(best.time - now) ? value : best)
      : null;
    const timingMs = closest ? Math.round((now - closest.time) * 1000) : 0;
    // Even at 240 BPM, ±120 ms leaves a small gap between quarter-note windows.
    const onBeat = closest !== null && Math.abs(timingMs) <= 120;
    const soundingBeat = [...this.quarterBeats].reverse().find(beat => beat.time <= now);
    // A slightly early tap at a barline uses the upcoming harmony. Late taps use
    // the audio clock's chord, even when the browser hasn't delivered its UI tick.
    const harmonicBeat = onBeat ? closest?.id : soundingBeat?.id;
    const harmony = getHarmonyAtBeat(this.config.song, harmonicBeat ?? this.audibleBeatId);
    const harmonicBar = Math.floor((harmonicBeat ?? this.audibleBeatId) / 4);
    const technique = buildTechnique(harmony.chord, harmony.nextChord, instrument, difficulty, index, "zh-CN", this.config.band.includes("bass"), this.config);
    this.playTechnique(instrument, technique, now, soundingBeat ?? closest, harmonicBar, harmony.nextChangeBeat);
    return { timingMs, onBeat, beatId: closest?.id ?? null };
  }

  private playTechnique(instrument: Instrument, technique: PlayableTechnique, now: number, reference: ScheduledBeat | null | undefined, harmonicBar: number, nextChangeBeat = harmonicBar * 4 + 4): void {
    const quarter = 60 / this.config.bpm, swing = this.config.swing;
    if (technique.kind === "note" && instrument !== "drums") {
      this.note(instrument, technique.notes[0], now, quarter * (technique.durationBeats ?? 0.75), instrument === "bass" ? 0.95 : 0.55);
      return;
    }
    if (technique.kind === "drums" && technique.notes.length === 1) {
      const midi = technique.notes[0];
      this.percussion(midi === 51 ? "ride" : midi === 38 ? "snare" : "kick", now, 0.56);
      return;
    }
    if (technique.kind === "chord" && (instrument === "piano" || instrument === "guitar")) {
      this.chord(instrument, technique.notes, now, quarter * (technique.durationBeats ?? 0.8), 0.52);
      return;
    }
    const ref = reference ?? { time: now, id: harmonicBar * 4 };
    const elapsed = (now - ref.time) / quarter;
    // Quantize generated phrases to the next swung eighth; the tap itself is
    // still scored at its actual time and never earns credit for generated notes.
    const half = elapsed < -0.015 ? 0 : elapsed < swing - 0.015 ? 0.5 : 1;
    const barStart = ref.time - (ref.id - harmonicBar * 4) * quarter;
    const startBeat = ref.id - harmonicBar * 4 + half;
    const anchor = barStart + swingPosition(startBeat, swing) * quarter;
    const offsets = technique.offsets;
    const groups = technique.voicings ?? technique.notes.map(midi => [midi]);
    const last = groups.length - 1;
    // Back-anchor target phrases at the upcoming chord change, retaining their actual
    // eighth/sixteenth rhythm. A late trigger plays the remaining suffix rather
    // than squeezing overdue notes into an unmusical burst.
    const phraseStart = technique.resolveNext ? nextChangeBeat - harmonicBar * 4 - offsets[last] : startBeat;
    groups.forEach((notes, i) => {
      const planned = technique.straight ? anchor + offsets[i] * quarter : barStart + swingPosition(phraseStart + offsets[i], swing) * quarter;
      if (planned < anchor - 0.001 || planned < now - 0.015) return;
      const time = Math.max(now + 0.003, planned);
      if (technique.kind === "chord-phrase" && (instrument === "piano" || instrument === "guitar")) this.chord(instrument, notes, time, quarter * 0.42, 0.44);
      else if (instrument === "drums") this.percussion(notes[0] === 51 ? "ride" : notes[0] === 38 ? "snare" : "kick", time, i === last ? 0.6 : 0.39 + (i % 2) * 0.1);
      else this.note(instrument, notes[0], time, Math.max(0.065, quarter * (i === last ? 0.8 : 0.3)), instrument === "bass" ? 0.82 : 0.46);
    });
  }

  private track(source: AudioScheduledSourceNode, cleanup: () => void, instrument: Instrument): void {
    this.sources.add(source);
    this.sourceInstruments.set(source, instrument);
    source.onended = () => { this.sources.delete(source); this.sourceInstruments.delete(source); source.disconnect(); cleanup(); };
  }

  private chord(instrument: "piano" | "guitar", notes: number[], time: number, duration: number, velocity: number): void {
    notes.forEach((midi, i) => this.note(instrument, midi, time + i * (instrument === "guitar" ? 0.008 : 0.003), duration, velocity / Math.sqrt(notes.length)));
  }

  private note(instrument: Exclude<Instrument, "drums">, midi: number, time: number, duration: number, velocity: number): void {
    const context = this.context;
    if (!context || !this.master) return;
    const voice = context.createGain();
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.Q.value = 0.45;
    filter.frequency.setValueAtTime(instrument === "bass" ? 700 : instrument === "sax" ? 2200 : instrument === "guitar" ? 1800 : 3400, time);
    voice.connect(filter);
    filter.connect(this.master);
    const length = Math.max(0.08, duration);
    const level = velocity * (instrument === "bass" ? 0.7 : instrument === "sax" ? 0.27 : 0.5);
    const attack = instrument === "sax" ? 0.035 : 0.006;
    voice.gain.setValueAtTime(0.0001, time);
    voice.gain.exponentialRampToValueAtTime(Math.max(0.0002, level), time + attack);
    voice.gain.exponentialRampToValueAtTime(Math.max(0.0001, level * (instrument === "sax" ? 0.72 : 0.24)), time + length * 0.7);
    voice.gain.exponentialRampToValueAtTime(0.0001, time + length + 0.08);
    const fundamental = frequency(midi);
    const oscillator = context.createOscillator();
    oscillator.type = instrument === "bass" ? "triangle" : instrument === "sax" ? "sawtooth" : "triangle";
    oscillator.frequency.setValueAtTime(fundamental, time);
    if (instrument === "sax") {
      oscillator.frequency.setValueAtTime(fundamental * 0.985, time);
      oscillator.frequency.exponentialRampToValueAtTime(fundamental, time + 0.04);
    }
    oscillator.connect(voice);
    this.track(oscillator, () => { voice.disconnect(); filter.disconnect(); }, instrument);
    oscillator.start(time);
    oscillator.stop(time + length + 0.1);
    if (instrument === "piano" || instrument === "guitar") {
      // A quieter, quickly decaying partial gives these two voices a plucked attack.
      const partial = context.createOscillator();
      const partialGain = context.createGain();
      partial.type = "sine";
      partial.frequency.value = fundamental * (instrument === "piano" ? 2.002 : 3);
      partialGain.gain.setValueAtTime(level * 0.28, time);
      partialGain.gain.exponentialRampToValueAtTime(0.0001, time + length * 0.55);
      partial.connect(partialGain);
      partialGain.connect(filter);
      this.track(partial, () => partialGain.disconnect(), instrument);
      partial.start(time);
      partial.stop(time + length * 0.55 + 0.01);
    }
  }

  private percussion(kind: "ride" | "snare" | "kick", time: number, velocity: number): void {
    const context = this.context;
    if (!context || !this.master) return;
    if (kind === "kick") {
      const oscillator = context.createOscillator();
      const envelope = context.createGain();
      oscillator.frequency.setValueAtTime(125, time);
      oscillator.frequency.exponentialRampToValueAtTime(42, time + 0.12);
      envelope.gain.setValueAtTime(velocity * 0.65, time);
      envelope.gain.exponentialRampToValueAtTime(0.0001, time + 0.22);
      oscillator.connect(envelope);
      envelope.connect(this.master);
      this.track(oscillator, () => envelope.disconnect(), "drums");
      oscillator.start(time);
      oscillator.stop(time + 0.24);
      return;
    }
    if (!this.noise) return;
    const source = context.createBufferSource();
    source.buffer = this.noise;
    const filter = context.createBiquadFilter();
    filter.type = kind === "ride" ? "highpass" : "bandpass";
    filter.frequency.value = kind === "ride" ? 6500 : 2200;
    filter.Q.value = kind === "ride" ? 0.6 : 0.8;
    const envelope = context.createGain();
    const duration = kind === "ride" ? 0.2 : 0.13;
    envelope.gain.setValueAtTime(velocity * (kind === "ride" ? 0.19 : 0.4), time);
    envelope.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    source.connect(filter);
    filter.connect(envelope);
    envelope.connect(this.master);
    this.track(source, () => { filter.disconnect(); envelope.disconnect(); }, "drums");
    source.start(time, (time * 0.317) % 1);
    source.stop(time + duration + 0.01);
  }
}
