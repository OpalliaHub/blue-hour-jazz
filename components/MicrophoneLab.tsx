'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Mic, Square, Upload, Download, Headphones, ShieldCheck } from 'lucide-react';
import { analyzeFrame, analysisFrameSize, summarizePerformance, noteName, MAX_AUDIO_BYTES, MAX_RECORD_SECONDS, ANALYSIS_HOP_SECONDS } from '../lib/audio-analysis';
import type { AnalysisFrame, AnalysisMode, PerformanceReport } from '../lib/audio-analysis';
import '../app/microphone.css';
export type { PerformanceReport } from '../lib/audio-analysis';

type Locale = 'zh-CN' | 'zh-TW' | 'en';
type Phase = 'idle' | 'requesting' | 'recording' | 'finishing' | 'analyzing';
const copy = {
  'zh-CN': {
    eyebrow: 'ACOUSTIC PRACTICE', title: '让真实乐器加入练习', intro: '打开麦克风，弹奏一小段，再听见和看见自己的音乐。',
    privacy: '本地录音 · 不上传音频 · 不发送给 AI', mode: '识别模式', notes: '单音旋律', rhythm: '节奏 / 和弦',
    noteHelp: '适合钢琴单音、贝斯、萨克斯或哼唱。连续可信的基频才会记为音符；不支持完整多声部钢琴扒谱。',
    rhythmHelp: '适合 comping、鼓点和和弦演奏。只检测能量起音与强弱，不把和弦中的某个泛音当成完整和弦。',
    prep: '开始前会暂停应用伴奏。用安静环境或耳机，避免扬声器声音进入麦克风；钢琴先松开延音踏板，一次弹一个音。',
    start: '打开麦克风并录音', stop: '停止并查看结果', cancel: '取消', waiting: '请在浏览器中允许麦克风…', saving: '正在整理录音…', analyzing: '正在本地分析',
    limit: '每次最多 120 秒 / 8 MiB；切换页面或隐藏标签页会停止录音。', upload: '导入本地录音', fileHelp: '也可导入浏览器支持的 WAV、MP3、M4A 等音频（≤120 秒、≤8 MiB）。',
    input: '输入设备', defaultInput: '系统默认麦克风 / 音频接口', inputHelp: '首次授权后可在这里选择输入设备。',
    signal: '输入强度', listening: '正在聆听', quiet: '等待声音', uncertain: '音高不稳定 / 多声部', rhythmLive: '检测起音与强弱', waveform: '输入音频波形',
    confidence: '周期性', cents: '音分', concert: '显示实音 · A4 = 440 Hz；萨克斯的移调谱记音可能不同。',
    duration: '时长', segments: '稳定音符片段', attacks: '能量起音', coverage: '可信音高帧', result: '这一次，听见了什么？',
    empty: '还没有录音。试着吹、唱或弹一个长音，再弹四个分开的音。', noNotes: '没有足够稳定的单音片段。试着靠近麦克风、减少噪音和延音，或切换到节奏 / 和弦模式。',
    rhythmResult: '节奏模式不生成音符表。起音时间帮助观察停顿与密度，不代表是否“弹对”。', replay: '回放你的录音', downloadAudio: '保存录音', downloadData: '保存分析 JSON',
    first: '开始', end: '结束', note: '实音', pitchDev: '相对十二平均律', onsetTimes: '检测到的起音时间（秒）', noAttacks: '没有检测到清楚的能量起音。',
    interval: '起音间隔中位数', seconds: '秒', approximation: '约 50 ms 采样一步；环境噪音、泛音、踏板与设备延迟会影响结果。周期性并非正确率；这些数据不作为演奏评分。',
    clipping: '检测到过强输入，部分音可能削波。请降低音频接口增益或离麦克风远一点。', rows: '音符表最多显示前 120 个片段；完整结果在 JSON 中。',
    unsupported: '此浏览器无法使用麦克风分析。请用支持 Web Audio 的 Chrome、Edge 或 Safari，并通过 HTTPS 打开。',
    denied: '麦克风权限未开启。请在浏览器网站权限或系统设置中允许访问，再重试；也可以导入本地录音。',
    missing: '未找到可用的麦克风或音频接口。连接设备后重试，或导入录音。', deviceError: '音频设备无法读取或录音已中断。请检查其他应用是否占用设备，再重试。',
    recorderMissing: '浏览器不支持录音文件保存，本次仍可进行实时分析。', fileError: '无法解码这个音频文件。请改用 WAV、MP3 或浏览器支持的格式。',
    tooLarge: '文件超过 8 MiB，或时长超过 120 秒。请先截取较短的一段。', recordingTooLarge: '录音达到大小上限，已停止。分析结果保留，但本次录音文件未保存。',
    localFile: '本地文件', microphone: '麦克风', reference: '练习参考', notGraded: '无自动评分', noRecording: '仅有分析结果，没有可保存的录音文件。',
  },
  'zh-TW': {
    eyebrow: 'ACOUSTIC PRACTICE', title: '讓真實樂器加入練習', intro: '打開麥克風，彈奏一小段，再聽見和看見自己的音樂。',
    privacy: '本機錄音 · 不上傳音訊 · 不傳送給 AI', mode: '辨識模式', notes: '單音旋律', rhythm: '節奏 / 和弦',
    noteHelp: '適合鋼琴單音、貝斯、薩克斯風或哼唱。連續可信的基頻才會記為音符；不支援完整多聲部鋼琴採譜。',
    rhythmHelp: '適合 comping、鼓點和和弦演奏。只偵測能量起音與強弱，不把和弦中的某個泛音當成完整和弦。',
    prep: '開始前會暫停應用程式伴奏。使用安靜環境或耳機，避免喇叭聲音進入麥克風；鋼琴先鬆開延音踏板，一次彈一個音。',
    start: '打開麥克風並錄音', stop: '停止並查看結果', cancel: '取消', waiting: '請在瀏覽器中允許麥克風…', saving: '正在整理錄音…', analyzing: '正在本機分析',
    limit: '每次最多 120 秒 / 8 MiB；切換頁面或隱藏分頁會停止錄音。', upload: '匯入本機錄音', fileHelp: '也可匯入瀏覽器支援的 WAV、MP3、M4A 等音訊（≤120 秒、≤8 MiB）。',
    input: '輸入裝置', defaultInput: '系統預設麥克風 / 音訊介面', inputHelp: '首次授權後可在這裡選擇輸入裝置。',
    signal: '輸入強度', listening: '正在聆聽', quiet: '等待聲音', uncertain: '音高不穩定 / 多聲部', rhythmLive: '偵測起音與強弱', waveform: '輸入音訊波形',
    confidence: '週期性', cents: '音分', concert: '顯示實音 · A4 = 440 Hz；薩克斯風的移調譜記音可能不同。',
    duration: '時長', segments: '穩定音符片段', attacks: '能量起音', coverage: '可信音高幀', result: '這一次，聽見了什麼？',
    empty: '還沒有錄音。試著吹、唱或彈一個長音，再彈四個分開的音。', noNotes: '沒有足夠穩定的單音片段。試著靠近麥克風、減少噪音和延音，或切換到節奏 / 和弦模式。',
    rhythmResult: '節奏模式不產生音符表。起音時間幫助觀察停頓與密度，不代表是否「彈對」。', replay: '回放你的錄音', downloadAudio: '儲存錄音', downloadData: '儲存分析 JSON',
    first: '開始', end: '結束', note: '實音', pitchDev: '相對十二平均律', onsetTimes: '偵測到的起音時間（秒）', noAttacks: '沒有偵測到清楚的能量起音。',
    interval: '起音間隔中位數', seconds: '秒', approximation: '約 50 ms 取樣一步；環境噪音、泛音、踏板與裝置延遲會影響結果。週期性並非正確率；這些資料不作為演奏評分。',
    clipping: '偵測到過強輸入，部分音可能削波。請降低音訊介面增益或離麥克風遠一點。', rows: '音符表最多顯示前 120 個片段；完整結果在 JSON 中。',
    unsupported: '此瀏覽器無法使用麥克風分析。請使用支援 Web Audio 的 Chrome、Edge 或 Safari，並透過 HTTPS 開啟。',
    denied: '麥克風權限未開啟。請在瀏覽器網站權限或系統設定中允許存取，再重試；也可以匯入本機錄音。',
    missing: '未找到可用的麥克風或音訊介面。連接裝置後重試，或匯入錄音。', deviceError: '音訊裝置無法讀取或錄音已中斷。請檢查其他應用程式是否佔用裝置，再重試。',
    recorderMissing: '瀏覽器不支援錄音檔案儲存，本次仍可進行即時分析。', fileError: '無法解碼這個音訊檔案。請改用 WAV、MP3 或瀏覽器支援的格式。',
    tooLarge: '檔案超過 8 MiB，或時長超過 120 秒。請先截取較短的一段。', recordingTooLarge: '錄音達到大小上限，已停止。分析結果保留，但本次錄音檔案未儲存。',
    localFile: '本機檔案', microphone: '麥克風', reference: '練習參考', notGraded: '無自動評分', noRecording: '僅有分析結果，沒有可儲存的錄音檔案。',
  },
  en: {
    eyebrow: 'ACOUSTIC PRACTICE', title: 'Bring your real instrument', intro: 'Record a short phrase, then hear and see what you played.',
    privacy: 'Local recording · No audio uploads · Not sent to AI', mode: 'Analysis mode', notes: 'Single-note melody', rhythm: 'Rhythm / chords',
    noteHelp: 'For single piano notes, bass, saxophone or humming. Only sustained, reliable fundamentals become notes. Full polyphonic piano transcription is not supported.',
    rhythmHelp: 'For comping, drums and chords. Detects energy attacks and dynamics only; a chord harmonic is not presented as a complete chord transcription.',
    prep: 'Starting pauses the app’s backing band. Use a quiet room or headphones to keep speaker audio out of the microphone. Start piano practice without the sustain pedal, one note at a time.',
    start: 'Enable microphone & record', stop: 'Stop & review', cancel: 'Cancel', waiting: 'Allow microphone access in your browser…', saving: 'Preparing your recording…', analyzing: 'Analyzing locally',
    limit: 'Up to 120 seconds / 8 MiB per take. Leaving this page or hiding the tab stops recording.', upload: 'Import a local recording', fileHelp: 'Browser-supported WAV, MP3, M4A and other audio files (≤120 seconds, ≤8 MiB).',
    input: 'Input device', defaultInput: 'Default microphone / audio interface', inputHelp: 'Input choices become available after the first permission grant.',
    signal: 'Input level', listening: 'Listening', quiet: 'Waiting for sound', uncertain: 'Unstable pitch / multiple notes', rhythmLive: 'Listening for attacks & dynamics', waveform: 'Input audio waveform',
    confidence: 'Periodicity', cents: 'cents', concert: 'Concert pitch · A4 = 440 Hz. Written notes for a transposing saxophone may differ.',
    duration: 'Duration', segments: 'Stable note segments', attacks: 'Energy attacks', coverage: 'Voiced frames', result: 'What did this take reveal?',
    empty: 'No recording yet. Play, sing or blow one long note, followed by four separated notes.', noNotes: 'Not enough stable single-note evidence. Move closer, reduce noise and sustain, or choose Rhythm / chords.',
    rhythmResult: 'Rhythm mode does not produce a note table. Onset times help you inspect space and density; they do not determine whether the performance is correct.', replay: 'Replay your take', downloadAudio: 'Save recording', downloadData: 'Save analysis JSON',
    first: 'Start', end: 'End', note: 'Concert note', pitchDev: 'From equal temperament', onsetTimes: 'Detected onset times (seconds)', noAttacks: 'No clear energy attacks were detected.',
    interval: 'Median onset interval', seconds: 's', approximation: 'Analysis steps are about 50 ms. Noise, harmonics, pedals and device latency affect results. Periodicity is not an accuracy probability. These measurements are not a performance grade.',
    clipping: 'Strong input may be clipping. Lower your interface gain or move a little farther from the microphone.', rows: 'The table shows the first 120 segments. The JSON contains the full result.',
    unsupported: 'Microphone analysis is unavailable in this browser. Open the HTTPS site in a Web Audio-capable Chrome, Edge or Safari browser.',
    denied: 'Microphone access is blocked. Allow this site in browser or system permissions and retry, or import a local recording.',
    missing: 'No microphone or audio interface was found. Connect a device and retry, or import a recording.', deviceError: 'The audio device could not be read or recording was interrupted. Check whether another app is using it, then retry.',
    recorderMissing: 'This browser cannot save a recording file; live analysis is still available.', fileError: 'This audio file could not be decoded. Try WAV, MP3 or another browser-supported format.',
    tooLarge: 'The file exceeds 8 MiB or 120 seconds. Trim a shorter excerpt first.', recordingTooLarge: 'Recording reached the size limit and stopped. Analysis remains available, but the audio file was not saved.',
    localFile: 'Local file', microphone: 'Microphone', reference: 'Practice reference', notGraded: 'No automatic grade', noRecording: 'Analysis is available, but there is no recording file to save.',
  },
};
type CopyKey = keyof typeof copy.en;
interface Props { locale: Locale; bpm: number; chord: string; role: string; onBeforeRecord?: () => void | Promise<void>; onReport?: (report: PerformanceReport) => void; }
interface Session {
  token: number; context: AudioContext; stream: MediaStream; source: MediaStreamAudioSourceNode; analyser: AnalyserNode;
  recorder: MediaRecorder | null; frames: AnalysisFrame[]; chunks: Blob[]; bytes: number; start: number; lastFrame: number;
  raf: number; timer: ReturnType<typeof setTimeout>; stopping: boolean; finished: boolean; oversized: boolean;
  mode: AnalysisMode; bpm: number; chord: string; role: string; duration: number;
}

function drawWave(canvas: HTMLCanvasElement | null, samples: Float32Array) {
  const context = canvas?.getContext('2d');
  if (!context || !canvas) return;
  const width = canvas.width, height = canvas.height;
  context.clearRect(0, 0, width, height);
  context.strokeStyle = '#d7ded1'; context.lineWidth = 1; context.beginPath(); context.moveTo(0, height / 2); context.lineTo(width, height / 2); context.stroke();
  context.strokeStyle = '#426651'; context.lineWidth = 1.8; context.beginPath();
  for (let i = 0; i < 240; i++) {
    const x = i / 239 * width, y = height / 2 - samples[Math.floor(i / 240 * samples.length)] * height * 0.45;
    if (!i) context.moveTo(x, y); else context.lineTo(x, y);
  }
  context.stroke();
}
function releaseSession(session: Session) {
  cancelAnimationFrame(session.raf); clearTimeout(session.timer);
  session.stream.getTracks().forEach(track => { track.onended = null; track.stop(); });
  session.source.disconnect(); session.analyser.disconnect();
  if (session.context.state !== 'closed') void session.context.close().catch(() => {});
}
function audioExtension(type: string) { return type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : type.includes('wav') ? 'wav' : type.includes('mpeg') ? 'mp3' : 'webm'; }

export default function MicrophoneLab({ locale, bpm, chord, role, onBeforeRecord, onReport }: Props) {
  const t = copy[locale];
  const [mode, setMode] = useState<AnalysisMode>('notes');
  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState<CopyKey | null>(null);
  const [notice, setNotice] = useState<CopyKey | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [progress, setProgress] = useState(0);
  const [live, setLive] = useState<AnalysisFrame | null>(null);
  const [report, setReport] = useState<PerformanceReport | null>(null);
  const [recording, setRecording] = useState<{ url: string; type: string } | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState('');
  const canvas = useRef<HTMLCanvasElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const session = useRef<Session | null>(null);
  const generation = useRef(0);
  const mounted = useRef(false);
  const currentUrl = useRef<string | null>(null);
  const pendingContext = useRef<AudioContext | null>(null);
  const callback = useRef(onReport); callback.current = onReport;
  const beforeRecord = useRef(onBeforeRecord); beforeRecord.current = onBeforeRecord;

  const replaceAudio = useCallback((blob: Blob | null) => {
    if (currentUrl.current) URL.revokeObjectURL(currentUrl.current);
    const url = blob ? URL.createObjectURL(blob) : null;
    currentUrl.current = url;
    setRecording(url && blob ? { url, type: blob.type } : null);
  }, []);
  const finish = useCallback((active: Session) => {
    if (active.finished) return;
    active.finished = true;
    if (!mounted.current || active.token !== generation.current) return;
    const result = summarizePerformance(active.frames, { source: 'microphone', mode: active.mode, duration: Math.round(active.duration * 100) / 100,
      referenceBpm: active.bpm, referenceChord: active.chord, role: active.role });
    const blob = !active.oversized && active.chunks.length ? new Blob(active.chunks, { type: active.recorder?.mimeType || active.chunks[0].type || 'audio/webm' }) : null;
    replaceAudio(blob); setReport(result); setLive(null); setPhase('idle'); session.current = null;
    if (active.oversized) setError('recordingTooLarge');
    callback.current?.(result);
  }, [replaceAudio]);
  const stop = useCallback(() => {
    const active = session.current;
    if (!active) {
      generation.current++;
      if (pendingContext.current?.state !== 'closed') void pendingContext.current?.close().catch(() => {});
      pendingContext.current = null;
      if (mounted.current) setPhase('idle');
      return;
    }
    if (active.stopping) return;
    active.stopping = true;
    active.duration = Math.min(MAX_RECORD_SECONDS, (performance.now() - active.start) / 1000);
    if (mounted.current) setPhase('finishing');
    // Stop the recorder before its stream tracks; its final chunk arrives before onstop.
    try {
      if (active.recorder?.state === 'recording') active.recorder.stop(); else finish(active);
    } catch { finish(active); }
    releaseSession(active);
  }, [finish]);

  useEffect(() => {
    mounted.current = true;
    const hide = () => { if (document.hidden) stop(); };
    document.addEventListener('visibilitychange', hide);
    return () => {
      mounted.current = false; generation.current++;
      document.removeEventListener('visibilitychange', hide);
      const active = session.current;
      if (active) {
        if (active.recorder) { active.recorder.ondataavailable = null; active.recorder.onstop = null; active.recorder.onerror = null; if (active.recorder.state !== 'inactive') active.recorder.stop(); }
        releaseSession(active); session.current = null;
      }
      if (pendingContext.current?.state !== 'closed') void pendingContext.current?.close().catch(() => {});
      pendingContext.current = null;
      if (currentUrl.current) URL.revokeObjectURL(currentUrl.current);
    };
  }, [stop]);

  async function start() {
    if (session.current || phase !== 'idle') return;
    setError(null); setNotice(null); setLive(null); setElapsed(0);
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia || !window.AudioContext) { setError('unsupported'); return; }
    const token = ++generation.current;
    setPhase('requesting');
    let stream: MediaStream | null = null;
    let context: AudioContext | null = null;
    try {
      context = new AudioContext(); pendingContext.current = context;
      await context.resume();
      await beforeRecord.current?.();
      if (!mounted.current || token !== generation.current) { await context.close().catch(() => {}); return; }
      stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: false, noiseSuppression: false, autoGainControl: false,
        ...(deviceId ? { deviceId: { exact: deviceId } } : {}) }, video: false });
      if (!mounted.current || token !== generation.current) { stream.getTracks().forEach(track => track.stop()); await context.close().catch(() => {}); return; }
      const analyser = context.createAnalyser(); analyser.fftSize = analysisFrameSize(context.sampleRate); analyser.smoothingTimeConstant = 0;
      const source = context.createMediaStreamSource(stream); source.connect(analyser); // Never connect microphone audio to speakers.
      let recorder: MediaRecorder | null = null;
      if (typeof MediaRecorder !== 'undefined') {
        const mimeType = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus'].find(type => MediaRecorder.isTypeSupported(type));
        try { recorder = new MediaRecorder(stream, { ...(mimeType ? { mimeType } : {}), audioBitsPerSecond: 96000 }); } catch { setNotice('recorderMissing'); }
      } else setNotice('recorderMissing');
      const active: Session = { token, context, stream, source, analyser, recorder, frames: [], chunks: [], bytes: 0, start: performance.now(), lastFrame: -100,
        raf: 0, timer: setTimeout(() => stop(), MAX_RECORD_SECONDS * 1000), stopping: false, finished: false, oversized: false, mode, bpm, chord, role, duration: 0 };
      session.current = active; pendingContext.current = null;
      stream.getTracks().forEach(track => { track.onended = () => { if (mounted.current) setError('deviceError'); stop(); }; });
      if (recorder) {
        recorder.ondataavailable = event => {
          if (!event.data.size || active.oversized) return;
          active.bytes += event.data.size;
          if (active.bytes > MAX_AUDIO_BYTES) { active.oversized = true; active.chunks = []; stop(); return; }
          active.chunks.push(event.data);
        };
        recorder.onstop = () => { if (!active.stopping) stop(); finish(active); };
        recorder.onerror = () => { if (mounted.current) setError('deviceError'); stop(); };
        recorder.start(250);
      }
      setPhase('recording');
      void navigator.mediaDevices.enumerateDevices().then(list => { if (mounted.current && token === generation.current) setDevices(list.filter(device => device.kind === 'audioinput')); }).catch(() => {});
      const samples = new Float32Array(analyser.fftSize);
      const sample = () => {
        if (active.stopping || token !== generation.current) return;
        const now = performance.now(), seconds = (now - active.start) / 1000;
        if (now - active.lastFrame >= ANALYSIS_HOP_SECONDS * 1000) {
          analyser.getFloatTimeDomainData(samples);
          const frame = analyzeFrame(samples, context!.sampleRate, Math.max(0, seconds - samples.length / context!.sampleRate / 2), mode);
          active.frames.push(frame); active.lastFrame = now;
          setLive(frame); setElapsed(seconds); drawWave(canvas.current, samples);
        }
        if (seconds >= MAX_RECORD_SECONDS) stop(); else active.raf = requestAnimationFrame(sample);
      };
      active.raf = requestAnimationFrame(sample);
    } catch (reason) {
      stream?.getTracks().forEach(track => track.stop());
      if (context?.state !== 'closed') void context?.close().catch(() => {});
      if (pendingContext.current === context) pendingContext.current = null;
      if (token !== generation.current || !mounted.current) return;
      const name = reason instanceof DOMException ? reason.name : '';
      setError(name === 'NotAllowedError' || name === 'SecurityError' ? 'denied' : name === 'NotFoundError' || name === 'OverconstrainedError' ? 'missing' : 'deviceError');
      const active = session.current;
      if (active) { releaseSession(active); session.current = null; }
      setPhase('idle');
    }
  }

  async function importAudio(file: File) {
    if (phase !== 'idle') return;
    setError(null); setNotice(null); setLive(null);
    if (file.size > MAX_AUDIO_BYTES) { setError('tooLarge'); return; }
    if (!window.AudioContext) { setError('unsupported'); return; }
    const token = ++generation.current;
    let context: AudioContext | null = null;
    setPhase('analyzing'); setProgress(0);
    try {
      context = new AudioContext(); pendingContext.current = context;
      await beforeRecord.current?.();
      const audio = await context.decodeAudioData(await file.arrayBuffer());
      if (!mounted.current || token !== generation.current) return;
      if (audio.duration > MAX_RECORD_SECONDS || !audio.length) { setError('tooLarge'); setPhase('idle'); return; }
      const input = new Float32Array(audio.length);
      for (let channel = 0; channel < audio.numberOfChannels; channel++) {
        const values = audio.getChannelData(channel);
        for (let i = 0; i < input.length; i++) input[i] += values[i] / audio.numberOfChannels;
      }
      const hop = Math.round(audio.sampleRate * ANALYSIS_HOP_SECONDS), frameSize = analysisFrameSize(audio.sampleRate);
      const frames: AnalysisFrame[] = [];
      for (let offset = 0, step = 0; offset + frameSize <= input.length; offset += hop, step++) {
        if (!mounted.current || token !== generation.current) return;
        const samples = input.subarray(offset, offset + frameSize);
        frames.push(analyzeFrame(samples, audio.sampleRate, (offset + frameSize / 2) / audio.sampleRate, mode));
        if (step % 24 === 0) { setProgress(Math.round(offset / input.length * 100)); drawWave(canvas.current, samples); await new Promise(resolve => setTimeout(resolve, 0)); }
      }
      if (!mounted.current || token !== generation.current) return;
      const result = summarizePerformance(frames, { source: 'file', mode, duration: Math.round(audio.duration * 100) / 100, referenceBpm: bpm, referenceChord: chord, role });
      replaceAudio(file); setReport(result); setElapsed(audio.duration); setProgress(100); setPhase('idle'); callback.current?.(result);
    } catch {
      if (mounted.current && token === generation.current) { setError('fileError'); setPhase('idle'); }
    } finally {
      if (context?.state !== 'closed') await context?.close().catch(() => {});
      if (pendingContext.current === context) pendingContext.current = null;
    }
  }

  function downloadReport() {
    if (!report) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'blue-hour-performance.json'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const busy = phase !== 'idle';
  const pitch = live?.pitch;
  return <section className="microphone-lab" aria-labelledby="mic-title">
    <header className="mic-heading"><span className="eyebrow">{t.eyebrow}</span><h2 id="mic-title">{t.title}</h2><p>{t.intro}</p><span className="mic-privacy"><ShieldCheck size={14}/>{t.privacy}</span></header>
    <div className="mic-console">
      <div className="mic-mode-row"><span>{t.mode}</span><div role="group" aria-label={t.mode} className="mic-mode-switch">
        <button disabled={busy} aria-pressed={mode === 'notes'} onClick={() => setMode('notes')}>{t.notes}</button><button disabled={busy} aria-pressed={mode === 'rhythm'} onClick={() => setMode('rhythm')}>{t.rhythm}</button>
      </div></div>
      <p className="mic-explanation">{mode === 'notes' ? t.noteHelp : t.rhythmHelp}</p>
      <div className="mic-prep"><Headphones size={18}/><p>{t.prep}</p></div>
      <label className="mic-input-label">{t.input}<select value={deviceId} onChange={event => setDeviceId(event.target.value)} disabled={busy}>
        <option value="">{t.defaultInput}</option>{devices.filter(device => device.deviceId !== 'default').map((device, index) => <option key={device.deviceId || index} value={device.deviceId}>{device.label || `${t.input} ${index + 1}`}</option>)}
      </select></label><small className="mic-small">{t.inputHelp}</small>
      <div className={`mic-monitor ${phase === 'recording' ? 'recording' : ''}`}>
        <div className="mic-monitor-top"><span><i/>{phase === 'recording' ? t.listening : t.signal}</span><span>{Math.floor(elapsed / 60)}:{String(Math.floor(elapsed % 60)).padStart(2, '0')} / 2:00</span></div>
        <div className="mic-live-pitch"><strong>{phase === 'recording' && pitch ? noteName(pitch.midi) : '—'}</strong><div>{phase === 'recording' ? mode === 'rhythm' ? t.rhythmLive : pitch ? `${pitch.frequency.toFixed(1)} Hz · ${pitch.cents >= 0 ? '+' : ''}${Math.round(pitch.cents)} ${t.cents}` : (live?.rms || 0) > 0.007 ? t.uncertain : t.quiet : t.quiet}<small>{pitch ? `${t.confidence} ${Math.round(pitch.confidence * 100)}%` : t.concert}</small></div></div>
        <canvas ref={canvas} width={720} height={80} aria-label={t.waveform} role="img"/>
        <div className="mic-meter" role="meter" aria-label={t.signal} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(Math.min(1, (live?.rms || 0) * 4) * 100)}><i style={{ width: `${Math.min(1, (live?.rms || 0) * 4) * 100}%` }}/></div>
      </div>
      <div className="mic-actions">
        {phase === 'recording' ? <button className="mic-primary mic-stop" onClick={stop}><Square size={15}/>{t.stop}</button> : phase === 'requesting' || phase === 'analyzing' ? <button className="mic-primary" onClick={stop}>{t.cancel}</button> : <button className="mic-primary" disabled={busy} onClick={start}><Mic size={17}/>{t.start}</button>}
        <button className="mic-secondary" disabled={busy} onClick={() => fileInput.current?.click()}><Upload size={16}/>{t.upload}</button>
        <input ref={fileInput} type="file" accept="audio/*,.wav,.mp3,.m4a,.ogg,.webm" hidden onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; if (file) void importAudio(file); }}/>
      </div>
      <p className="mic-small">{t.limit}</p><p className="mic-small">{t.fileHelp}</p>
      <p className="mic-status" role="status">{phase === 'requesting' ? t.waiting : phase === 'finishing' ? t.saving : phase === 'analyzing' ? `${t.analyzing} · ${progress}%` : notice ? t[notice] : ''}</p>
      {error && <p className="mic-error" role="alert">{t[error]}</p>}
    </div>
    <section className="mic-results" aria-labelledby="mic-result-title"><div className="mic-results-heading"><h2 id="mic-result-title">{t.result}</h2><span>{t.notGraded}</span></div>
      {!report ? <p className="mic-empty">{t.empty}</p> : <>
        <p className="mic-report-reference">{report.source === 'file' ? t.localFile : t.microphone} · {t.reference}: {report.referenceBpm} BPM / {report.referenceChord} · {report.mode === 'notes' ? t.notes : t.rhythm}</p>
        <div className="mic-stats"><div><strong>{report.duration.toFixed(1)}<small> {t.seconds}</small></strong><span>{t.duration}</span></div><div><strong>{report.notes.length}</strong><span>{t.segments}</span></div><div><strong>{report.onsets.length}</strong><span>{t.attacks}</span></div>{report.mode === 'notes' && <div><strong>{Math.round(report.voicedCoverage * 100)}%</strong><span>{t.coverage}</span></div>}</div>
        {recording ? <div className="mic-replay"><label htmlFor="mic-audio">{t.replay}</label><audio id="mic-audio" aria-label={t.replay} key={recording.url} src={recording.url} controls preload="metadata"/><a href={recording.url} download={`blue-hour-take.${audioExtension(recording.type)}`}><Download size={14}/>{t.downloadAudio}</a></div> : <p className="mic-small">{t.noRecording}</p>}
        {report.clippingFrames > 0 && <p className="mic-error">{t.clipping}</p>}
        {report.mode === 'notes' ? report.notes.length ? <div className="mic-table-wrap"><table><thead><tr><th>{t.first} (s)</th><th>{t.end} (s)</th><th>{t.note}</th><th>{t.pitchDev}</th><th>{t.confidence}</th></tr></thead><tbody>{report.notes.slice(0, 120).map((note, index) => <tr key={index}><td>{note.start.toFixed(2)}</td><td>{note.end.toFixed(2)}</td><td><b>{note.note}</b></td><td>{note.cents >= 0 ? '+' : ''}{note.cents} {t.cents}</td><td>{Math.round(note.confidence * 100)}%</td></tr>)}</tbody></table></div> : <p className="mic-no-notes">{t.noNotes}</p> : <p className="mic-no-notes">{t.rhythmResult}</p>}
        {report.notes.length > 120 && <p className="mic-small">{t.rows}</p>}
        <details className="mic-onsets"><summary>{t.onsetTimes}{report.medianOnsetInterval !== null ? ` · ${t.interval}: ${report.medianOnsetInterval.toFixed(2)} ${t.seconds}` : ''}</summary><p>{report.onsets.length ? report.onsets.map(time => time.toFixed(2)).join(' · ') : t.noAttacks}</p></details>
        <button className="mic-secondary" onClick={downloadReport}><Download size={14}/>{t.downloadData}</button>
      </>}
      <p className="mic-analysis-note">{t.approximation}</p>
    </section>
  </section>;
}
