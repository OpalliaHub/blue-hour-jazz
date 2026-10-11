/** Local, conservative monophonic analysis. Confidence measures periodicity, not accuracy. */
export type AnalysisMode = 'notes' | 'rhythm';
export interface DetectedPitch { frequency: number; midi: number; cents: number; confidence: number; }
export interface AnalysisFrame { time: number; rms: number; peak: number; pitch: DetectedPitch | null; }
export interface NoteSegment { start: number; end: number; midi: number; note: string; cents: number; confidence: number; }
export interface PerformanceReport {
  version: 1; source: 'microphone' | 'file'; mode: AnalysisMode; duration: number;
  referenceBpm: number; referenceChord: string; role: string; createdAt: string;
  analysis: 'YIN monophonic; energy attacks; concert pitch A4=440 Hz';
  frameCount: number; voicedCoverage: number; clippingFrames: number;
  notes: NoteSegment[]; onsets: number[]; medianOnsetInterval: number | null;
}
export const ANALYSIS_HOP_SECONDS = 0.05;
export const MAX_RECORD_SECONDS = 120;
export const MAX_AUDIO_BYTES = 8 * 1024 * 1024;
/** Keep roughly 85 ms of evidence even with a 96/192 kHz audio interface. */
export function analysisFrameSize(sampleRate: number): number {
  return Math.max(2048, Math.min(32768, 2 ** Math.ceil(Math.log2(sampleRate * 0.085))));
}

export function noteName(midi: number): string {
  return ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'][((midi % 12) + 12) % 12] + (Math.floor(midi / 12) - 1);
}
export function signalLevel(input: ArrayLike<number>): { rms: number; peak: number } {
  let sum = 0, peak = 0;
  for (let i = 0; i < input.length; i++) { const value = input[i]; sum += value * value; peak = Math.max(peak, Math.abs(value)); }
  return { rms: input.length ? Math.sqrt(sum / input.length) : 0, peak };
}

/** YIN cumulative mean-normalized difference, a first-dip threshold and parabolic refinement.
 * Box-filter decimation bounds cost; it is not a polyphonic transcription algorithm.
 * Original method: de Cheveigné & Kawahara, JASA 111(4), 2002, doi:10.1121/1.1458024.
 */
export function detectPitch(input: ArrayLike<number>, sampleRate: number): DetectedPitch | null {
  if (!Number.isFinite(sampleRate) || sampleRate < 8000 || input.length < 256) return null;
  const { rms, peak } = signalLevel(input);
  if (!Number.isFinite(rms) || rms < 0.007 || peak >= 1.05) return null;
  const factor = Math.max(1, Math.floor(sampleRate / 12000));
  const count = Math.floor(input.length / factor);
  const samples = new Float64Array(count);
  let mean = 0;
  for (let i = 0; i < count; i++) {
    let value = 0;
    for (let j = 0; j < factor; j++) value += input[i * factor + j];
    samples[i] = value / factor; mean += samples[i];
  }
  mean /= count;
  for (let i = 0; i < count; i++) samples[i] -= mean;
  const rate = sampleRate / factor;
  const window = Math.floor(count / 2);
  const minLag = Math.max(2, Math.floor(rate / 1500));
  const maxLag = Math.min(window - 1, Math.ceil(rate / 40));
  if (maxLag <= minLag) return null;
  const normalized = new Float64Array(maxLag + 1);
  normalized[0] = 1;
  let cumulative = 0;
  for (let lag = 1; lag <= maxLag; lag++) {
    let difference = 0;
    for (let j = 0; j < window; j++) { const delta = samples[j] - samples[j + lag]; difference += delta * delta; }
    cumulative += difference;
    normalized[lag] = cumulative > 1e-14 ? difference * lag / cumulative : 1;
  }
  let lag = minLag;
  while (lag < maxLag && normalized[lag] >= 0.13) lag++;
  if (lag >= maxLag) return null;
  while (lag + 1 <= maxLag && normalized[lag + 1] < normalized[lag]) lag++;
  const confidence = Math.max(0, Math.min(1, 1 - normalized[lag]));
  if (confidence < 0.88) return null;
  let refined = lag;
  if (lag > 1 && lag < maxLag) {
    const a = normalized[lag - 1], b = normalized[lag], c = normalized[lag + 1];
    const denominator = 2 * (2 * b - a - c);
    if (Math.abs(denominator) > 1e-12) refined += (c - a) / denominator;
  }
  const frequency = rate / refined;
  if (frequency < 40 || frequency > 1500) return null;
  const exactMidi = 69 + 12 * Math.log2(frequency / 440);
  const midi = Math.round(exactMidi);
  return { frequency, midi, cents: (exactMidi - midi) * 100, confidence };
}

export function analyzeFrame(input: ArrayLike<number>, sampleRate: number, time: number, mode: AnalysisMode): AnalysisFrame {
  return { time, ...signalLevel(input), pitch: mode === 'notes' ? detectPitch(input, sampleRate) : null };
}
function median(values: number[]): number | null {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b), middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}
const rounded = (value: number) => Math.round(value * 1000) / 1000;

/** Energy attacks only: sustained notes and legato changes need not create an onset. */
export function detectOnsets(frames: AnalysisFrame[]): number[] {
  const onsets: number[] = [];
  let baseline = 0, previous = 0, last = -1;
  for (const frame of frames) {
    const attack = frame.rms >= 0.012 && frame.rms > Math.max(baseline * 1.65, previous * 1.2) && frame.rms - previous > 0.004;
    if (attack && frame.time - last >= 0.13) { onsets.push(rounded(frame.time)); last = frame.time; }
    baseline = baseline * 0.75 + frame.rms * 0.25;
    previous = frame.rms;
  }
  return onsets;
}

export function segmentNotes(frames: AnalysisFrame[], duration: number): NoteSegment[] {
  const notes: NoteSegment[] = [];
  let run: AnalysisFrame[] = [];
  const flush = () => {
    // A single noisy frame never becomes a claimed note. Keep at least ~100 ms.
    if (run.length >= 3 && run.at(-1)!.time - run[0].time >= 0.075) {
      const pitches = run.map(frame => frame.pitch!);
      const midi = pitches[0].midi;
      notes.push({ start: rounded(Math.max(0, run[0].time - 0.025)), end: rounded(Math.min(duration, run.at(-1)!.time + 0.025)),
        midi, note: noteName(midi), cents: Math.round(median(pitches.map(pitch => pitch.cents))!),
        confidence: rounded(pitches.reduce((sum, pitch) => sum + pitch.confidence, 0) / pitches.length) });
    }
    run = [];
  };
  for (const frame of frames) {
    if (!frame.pitch || frame.pitch.confidence < 0.88) { flush(); continue; }
    if (run.length && (frame.pitch.midi !== run[0].pitch!.midi || frame.time - run.at(-1)!.time > 0.12)) flush();
    run.push(frame);
  }
  flush();
  return notes;
}

export function summarizePerformance(frames: AnalysisFrame[], context: Pick<PerformanceReport, 'duration' | 'mode' | 'source' | 'referenceBpm' | 'referenceChord' | 'role'>): PerformanceReport {
  const onsets = detectOnsets(frames);
  const gaps = onsets.slice(1).map((time, index) => time - onsets[index]);
  const voiced = frames.filter(frame => frame.pitch !== null).length;
  return { version: 1, ...context, createdAt: new Date().toISOString(), analysis: 'YIN monophonic; energy attacks; concert pitch A4=440 Hz',
    frameCount: frames.length, voicedCoverage: frames.length ? rounded(voiced / frames.length) : 0,
    clippingFrames: frames.filter(frame => frame.peak >= 0.98).length,
    notes: context.mode === 'notes' ? segmentNotes(frames, context.duration) : [], onsets,
    medianOnsetInterval: gaps.length ? rounded(median(gaps)!) : null };
}
