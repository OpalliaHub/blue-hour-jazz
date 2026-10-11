'use client';
import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Music2, Library, Headphones, BookOpen, SlidersHorizontal, ArrowUpRight, ArrowRight, Check, Plus, Minus, Download, Send, Volume2, Sparkles, RotateCcw, ChevronRight, Disc3, Mic2, Upload, Menu } from 'lucide-react';
import JazzStage from '../components/JazzStage';
import RepertoirePanel from '../components/RepertoirePanel';
import MicrophoneLab from '../components/MicrophoneLab';
import './arrangement.css';
import { createTranslator, translateError, isLocale, type Locale } from '../lib/i18n';
import { JazzEngine, SONGS, Instrument, Song, normalizeImportedSong, padLabels, getPadInfo, DIFFICULTY_KEYS, Difficulty, getHarmonyAtBeat, getArrangementInfo, type PianoVoicing } from '../lib/music';
import { PRE_QUIZ, POST_QUIZ, REFERENCES } from '../lib/learning';
type Tab = 'studio' | 'learn' | 'notes' | 'catalog' | 'microphone';
type Chat = {
    role: 'user' | 'assistant';
    content: string;
    action?: string | null;
    offline?: boolean;
};
type Result = {
    hits: number;
    attempts: number;
    coverage: number;
    tempo: number;
    role: string;
    at: string;
    song: string;
    band: Instrument[];
    swing: number;
    difficulty?: Difficulty;
};
type Saved = {
    pre: number[];
    post: number[];
    reflection: string;
    observation: string;
    partner: string;
    results: Result[];
    experiments: string[];
    preDone: boolean;
    postDone: boolean;
};
const empty: Saved = { pre: [], post: [], reflection: '', observation: '', partner: '', results: [], experiments: [], preDone: false, postDone: false };
const names: Record<Instrument, string> = { piano: '钢琴', bass: '低音提琴', drums: '爵士鼓', sax: '萨克斯', guitar: '吉他' };
const nicks: Record<Instrument, string> = { piano: 'Mika', bass: 'Ren', drums: 'Jo', sax: 'Luna', guitar: 'Kai' };
const all: Instrument[] = ['piano', 'bass', 'drums', 'sax', 'guitar'];
const sceneNames = { club: '午夜俱乐部', rooftop: '天台暮色', studio: '排练工作室' };
export default function Home() {
    const [locale, setLocale] = useState<Locale>('zh-CN'), [difficulty, setDifficulty] = useState<Difficulty>('beginner');
    const t = createTranslator(locale);
    const keys = DIFFICULTY_KEYS[difficulty];
    const [selectedPad, setSelectedPad] = useState(0);
    const difficultyNames: Record<Difficulty, string> = { beginner: t("入门"), intermediate: t("进阶"), bebop: 'Bebop' };
    const difficultyHints: Record<Difficulty, string> = { beginner: t("3 个按键 · 先听四拍，再用少量声音回应。"), intermediate: t("6 个按键 · 探索导向音、经过音与更丰富的和声。"), bebop: t("8 个按键 · 练习音阶、半音趋近、包围与解决。先慢练，再提速。") };
    useEffect(() => { try {
        const l = localStorage.getItem('bluehour-locale');
        if (isLocale(l))
            setLocale(l);
        const d = localStorage.getItem('bluehour-difficulty');
        if (d === 'beginner' || d === 'intermediate' || d === 'bebop')
            setDifficulty(d);
    }
    catch { } }, []);
    const [tab, setTab] = useState<Tab>('studio'), [scene, setScene] = useState<'club' | 'rooftop' | 'studio'>('club');
    const [songs, setSongs] = useState<Song[]>(SONGS), [songId, setSongId] = useState(SONGS[0].id);
    const song = songs.find(s => s.id === songId) || songs[0];
    const [featuredSolo, setFeaturedSolo] = useState<Instrument | null>(null), [pianoVoicing, setPianoVoicing] = useState<PianoVoicing>('auto');
    const [band, setBand] = useState<Instrument[]>(['piano', 'bass', 'drums', 'sax']);
    const [player, setPlayer] = useState<Instrument | null>(null), [bpm, setBpm] = useState(song.bpm), [swing, setSwing] = useState(62), [volume, setVolume] = useState(.48);
    const [playing, setPlaying] = useState(false), [bar, setBar] = useState(0), [beat, setBeat] = useState(0), [notice, setNotice] = useState(''), [feedback, setFeedbackState] = useState<{
        key: string;
        params?: Record<string, string | number>;
    }>({ key: t("选择一个角色，用键盘或触屏加入合奏。") });
    const [activePad, setActivePad] = useState(-1), [challenge, setChallenge] = useState(false), [challengeBeat, setChallengeBeat] = useState(0), [hitCount, setHitCount] = useState(0);
    const engine = useRef<JazzEngine | null>(null), challengeRef = useRef(false), counter = useRef(0), stats = useRef({ hits: 0, attempts: 0, beats: new Set<number>() }), finishRef = useRef<() => void>(() => { });
    const [saved, setSaved] = useState<Saved>(empty), [loaded, setLoaded] = useState(false);
    useEffect(() => { if (loaded) {
        try {
            localStorage.setItem('bluehour-locale', locale);
            localStorage.setItem('bluehour-difficulty', difficulty);
        }
        catch { }
        document.documentElement.lang = locale;
    } }, [locale, difficulty, loaded]);
    const [chat, setChat] = useState<Chat[]>([{ role: 'assistant', content: t("欢迎来到 Blue Hour。我是你的合奏教练。先听一轮，再把贝斯请下台：你觉得钢琴需要照顾哪一片音区？"), offline: true }]);
    const [question, setQuestion] = useState(''), [busy, setBusy] = useState(false), [coachOpen, setCoachOpen] = useState(true), [importOpen, setImportOpen] = useState(false);
    const [importText, setImportText] = useState(''), [rights, setRights] = useState(false), [mobileNav, setMobileNav] = useState(false);
    const fileInput = useRef<HTMLInputElement>(null), chatEnd = useRef<HTMLDivElement>(null);
    function setFeedback(key: string, params?: Record<string, string | number>) { setFeedbackState({ key, params }); }
    function patch(change: Partial<Saved>) { setSaved(s => ({ ...s, ...change })); }
    useEffect(() => { try {
        const raw = localStorage.getItem('bluehour-learning-v1');
        if (raw) {
            const v = JSON.parse(raw);
            if (v && Array.isArray(v.pre) && Array.isArray(v.post) && Array.isArray(v.results) && Array.isArray(v.experiments))
                setSaved({ ...empty, ...v });
        }
    }
    catch { } setLoaded(true); }, []);
    useEffect(() => { if (loaded)
        try {
            localStorage.setItem('bluehour-learning-v1', JSON.stringify(saved));
        }
        catch {
            setNotice(t("浏览器无法保存，离开前请导出学习记录。"));
        } }, [saved, loaded]);
    useEffect(() => { engine.current = new JazzEngine((b, t, id) => { setBar(b); setBeat(t); if (challengeRef.current) {
        counter.current = id + 1;
        setChallengeBeat(Math.min(32, id + 1));
        if (id >= 32)
            finishRef.current();
    } }); return () => engine.current?.dispose(); }, []);
    useEffect(() => { engine.current?.update({ song, bpm, swing, band, player, volume, difficulty, featuredSolo, pianoVoicing }); }, [song, bpm, swing, band, player, volume, difficulty, featuredSolo, pianoVoicing]);
    useEffect(() => { const onHide = () => { if (document.hidden) {
        engine.current?.stop();
        setPlaying(false);
        challengeRef.current = false;
        setChallenge(false);
    } }; document.addEventListener('visibilitychange', onHide); return () => document.removeEventListener('visibilitychange', onHide); }, []);
    useEffect(() => { chatEnd.current?.parentElement?.scrollTo({ top: chatEnd.current.parentElement.scrollHeight, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }, [chat, busy]);
    useEffect(() => { window.scrollTo({top:0}); }, [tab]);
    const {chord, nextChord} = getHarmonyAtBeat(song, bar * 4 + beat);
    const performanceOptions = { featuredSolo, pianoVoicing, band, player };
    const arrangement = getArrangementInfo(band, performanceOptions, locale);
    const padInfo = player ? getPadInfo(player, Math.min(selectedPad, keys.length - 1), chord, nextChord, difficulty, locale, band.includes('bass'), performanceOptions) : null;
    function changeDifficulty(next: Difficulty) { if (challenge)
        return; setDifficulty(next); setSelectedPad(0); setBpm(v => Math.min(v, next === 'beginner' ? 160 : 240)); setFeedback('已切换练习难度。速度不会自动提高，请按自己的节奏探索。'); }
    function playCatalogSong(next: Song) { stop(); setSongs(current => current.some(s => s.id === next.id) ? current : [...current, next]); setSongId(next.id); setBpm(Math.min(next.bpm, difficulty === 'beginner' ? 160 : 240)); setBar(0); setBeat(0); setTab('studio'); }
    async function start() { try {
        const e = engine.current;
        if (!e)
            return false;
        await e.start({ song, bpm, swing, band, player, volume, difficulty, featuredSolo, pianoVoicing });
        const ok = e.getSnapshot().playing;
        setPlaying(ok);
        setNotice('');
        return ok;
    }
    catch {
        setNotice(t("声音未能启动，请检查浏览器音频权限后重试。"));
        return false;
    } }
    function stop() { engine.current?.stop(); setPlaying(false); challengeRef.current = false; setChallenge(false); setChallengeBeat(0); }
    function selectSong(id: string) { stop(); const next = songs.find(s => s.id === id)!; setSongId(id); setBpm(Math.min(next.bpm, difficulty === 'beginner' ? 160 : 240)); setBar(0); setBeat(0); }
    function toggle(i: Instrument) { if (challenge)
        return; setBand(b => b.includes(i) ? b.filter(x => x !== i) : [...b, i]); if (player === i)
        setPlayer(null); if (featuredSolo === i) setFeaturedSolo(null); }
    function choosePlayer(i: Instrument | null) { if (challenge)
        return; setPlayer(i); if (i)
        setBand(b => b.includes(i) ? b : [...b, i]); setSelectedPad(0); if (i)
        setFeedback('你现在扮演{instrument}。先听一拍，再用 {count} 个按键回应伙伴。', { instrument: names[i], count: keys.length });
    else
        setFeedback('聆听模式：所有在场乐手自动演奏。'); }
    function experiment(bass: boolean) { if (challenge)
        return; stop(); setBar(0); setBeat(0); setFeaturedSolo(null); setPianoVoicing('auto'); setBand(bass ? ['piano', 'bass', 'drums', 'sax'] : ['piano', 'drums', 'sax']); setPlayer(null); setSaved(s => ({ ...s, experiments: Array.from(new Set([...s.experiments, bass ? 'bass-on' : 'bass-off'])) })); setNotice(bass ? t("B 编制：贝斯承担低音，钢琴示范中音区去根音配音。") : t("A 编制：没有贝斯，钢琴增加低音支撑。点击播放，比较同一首练习。")); }
    async function startChallenge() { if (!player) {
        setNotice(t("先在下方选择你想扮演的乐手。"));
        return;
    } stop(); stats.current = { hits: 0, attempts: 0, beats: new Set() }; counter.current = 0; setHitCount(0); setChallengeBeat(0); const started = await start(); if (started && engine.current) {
        challengeRef.current = true;
        setChallenge(true);
        setFeedback('8 小节挑战：每拍最多计一次命中，先稳定，再尝试留白。');
    } }
    finishRef.current = () => { challengeRef.current = false; setChallenge(false); engine.current?.stop(); setPlaying(false); const s = stats.current; const result: Result = { hits: s.hits, attempts: s.attempts, coverage: Math.min(32, s.beats.size), tempo: bpm, role: player || 'piano', at: new Date().toISOString(), song: song.title, band: [...band], swing, difficulty }; setSaved(x => ({ ...x, results: [...x.results, result].slice(-20) })); setFeedback(result.coverage >= 20 ? t("完成！32 拍中有 {count} 拍合拍。下一轮试着听着伙伴留出空间。") : t("完成！32 拍中有 {count} 拍合拍。放慢速度，先感受四拍脉搏。"), { count: result.coverage }); };
    function hit(pad: number) { setSelectedPad(pad); if (!player || !playing) {
        setFeedback('先选择角色并点击「开始合奏」，再使用下方按键。');
        return;
    } const result = engine.current!.hit(player, pad); setActivePad(pad); setTimeout(() => setActivePad(-1), 160); if (challengeRef.current && result.beatId !== null && result.beatId >= 0 && result.beatId < 32) {
        stats.current.attempts++;
        if (result.onBeat && !stats.current.beats.has(result.beatId)) {
            stats.current.hits++;
            stats.current.beats.add(result.beatId);
            setHitCount(stats.current.hits);
        }
    } if (result.onBeat)
        setFeedback('合拍 · 这一下和乐队的脉搏在一起。');
    else
        setFeedback(result.timingMs < 0 ? t("偏早 {ms} ms · 听下一拍，再轻轻加入。") : t("偏晚 {ms} ms · 听下一拍，再轻轻加入。"), { ms: Math.abs(Math.round(result.timingMs)) }); }
    const hitRef = useRef(hit);
    hitRef.current = hit;
    useEffect(() => { const fn = (e: KeyboardEvent) => { if (tab !== 'studio' || e.metaKey || e.ctrlKey || e.altKey || e.isComposing || (e.target instanceof Element && e.target.closest('input,textarea,select,[contenteditable]')) || e.repeat)
        return; const n = keys.map(k => k.toLowerCase()).indexOf(e.key.toLowerCase()); if (n >= 0) {
        e.preventDefault();
        hitRef.current(n);
    } }; window.addEventListener('keydown', fn); return () => window.removeEventListener('keydown', fn); }, [difficulty, tab]);
    function exportRecord() { const payload = { project: 'Blue Hour', exportedAt: new Date().toISOString(), ...saved, locale, currentSession: { song: song.title, band, role: player, bpm, difficulty, swing, featuredSolo, pianoVoicing }, limitations: t("本地按键与自述记录；真实录音分析另行导出，不等于器乐能力评分。") }; download('Blue-Hour-learning.json', JSON.stringify(payload, null, 2), 'application/json'); }
    function download(name: string, text: string, type: string) { const url = URL.createObjectURL(new Blob([text], { type })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
    async function ask(text = question) { if (busy || !text.trim())
        return; setQuestion(''); setBusy(true); setChat(c => [...c, { role: 'user', content: text }]); try {
        const res = await fetch('/api/coach', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Blue-Hour-Locale': locale }, body: JSON.stringify({ locale, message: text, history: chat.slice(-6), context: { locale, difficulty, padInfo, song: song.title, chord, nextChord, band, role: player, bpm, featuredSolo, pianoVoicing, arrangement, lastResult: saved.results.at(-1), observation: saved.observation } }) });
        const data = await res.json() as {
            error?: string;
            content: string;
            action?: string;
        };
        if (!res.ok)
            throw Error(data.error || t("暂时无法连接"));
        setChat(c => [...c, { role: 'assistant', content: data.content, action: data.action }]);
    }
    catch (e) {
        setChat(c => [...c, { role: 'assistant', content: translateError(locale, e instanceof Error ? e.message : t("AI 暂时离线")) + '\n' + t('离线练习：保持曲目和速度相同，比较 A / B 编制。低音由谁承担？用一句话解释听到的变化。'), offline: true }]);
    }
    finally {
        setBusy(false);
    } }
    function applyAction(action: string) { if (action === 'slow') {
        setBpm(x => Math.max(50, x - 12));
        setNotice(t("已放慢 12 BPM，请再试一轮。"));
    }
    else
        experiment(action === 'bass-on'); }
    function importSong() { try {
        if (!rights)
            throw Error(t("请先确认你有权使用此素材。"));
        const s = normalizeImportedSong(JSON.parse(importText));
        const imported = { ...s, id: `import-${Date.now()}` };
        setSongs(x => [...x, imported]);
        stop();
        setSongId(imported.id);
        setBpm(Math.min(imported.bpm, difficulty === 'beginner' ? 160 : 240));
        setBar(0);
        setImportOpen(false);
        setNotice(t("曲目已导入当前会话。请保留原始 JSON 以便下次使用。"));
    }
    catch (e) {
        setNotice(e instanceof SyntaxError ? t('JSON 格式无效，请检查括号、引号和逗号。') : translateError(locale, e instanceof Error ? e.message : t("导入失败")));
    } }
    const progress = [saved.preDone, saved.experiments.length >= 2 && saved.observation.trim().length >= 10, saved.results.length > 0, saved.postDone && saved.reflection.trim().length >= 20].filter(Boolean).length;
    return <div className="app-shell" lang={locale}>
  <aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
   <a className="brand" href="/" aria-label={t("Blue Hour 首页")}><span className="brand-symbol"><Music2 size={25}/></span><span>blue hour<small>JAZZ LEARNING CLUB</small></span></a>
   <div className="nav-label">{t("你的爵士旅程")}</div>
   <nav>{([{ id: 'studio', icon: Headphones, title: t("合奏实验室"), sub: 'Jam studio' }, { id: 'learn', icon: BookOpen, title: t("学习路线"), sub: 'Learning path' }, { id: 'catalog', icon: Library, title: t("曲库与大师"), sub: 'Repertoire & listening' }, { id: 'microphone', icon: Mic2, title: t("真实演奏"), sub: 'Record & reflect' }, { id: 'notes', icon: Disc3, title: t("我的演奏手记"), sub: 'Session notes' }] as const).map(n => <button key={n.id} className={`nav-item ${tab === n.id ? 'selected' : ''}`} onClick={() => { setTab(n.id); setMobileNav(false); }}><n.icon size={19}/><span>{t(n.title)}<small>{t(n.sub)}</small></span>{tab === n.id && <span className="nav-dot"/>}</button>)}</nav>
   <div className="sidebar-line"/><div className="nav-label">{t("今晚的歌单")}<span>{songs.length.toString().padStart(2, '0')}</span></div>
   <div className="song-list">{songs.map((s, i) => <button key={s.id} disabled={challenge} className={`song-item ${songId === s.id ? 'active' : ''}`} onClick={() => { selectSong(s.id); setTab('studio'); }}><span className="song-number">{songId === s.id && playing ? '♫' : String(i + 1).padStart(2, '0')}</span><span>{t(s.title)}<small>{s.id.startsWith('standard-') ? t('标准曲 · {count} 小节教学版', {count:s.chords.length}) : t(s.subtitle)}</small></span>{songId === s.id && <span className="equalizer"><i /><i /><i /></span>}</button>)}</div>
   <button className="text-button import-button" onClick={() => setImportOpen(true)}><Plus size={15}/>{t("导入我的曲目")}</button>
   <div className="sidebar-bottom"><div className="session-progress"><span>{t("你的学习进度")}</span><b>{progress} / 4</b></div><div className="progress-track"><i style={{ width: progress * 25 + '%' }}/></div><p>{t("从第一拍，走进爵士。")}</p><a href={'/teaching-guide.html?lang=' + locale} target="_blank" rel="noreferrer">{t("教师指南与设计依据")}<ArrowUpRight size={14}/></a><small>INT6066 · edushoegazers</small></div>
  </aside>
  <div className="workspace">
   <header className="topbar"><button className="mobile-menu icon-button" aria-label={t("展开导航")} onClick={() => setMobileNav(!mobileNav)}><Menu size={22}/></button><div className="breadcrumb">{t("THE CLUB")}<ChevronRight size={13}/><span>{tab === 'studio' ? t("合奏实验室") : tab === 'learn' ? t("学习路线") : tab === 'catalog' ? t("曲库与大师") : tab === 'microphone' ? t("真实演奏") : t("演奏手记")}</span></div><div className="top-actions"><label className="language-select"><span className="sr-only">{t("界面语言")}</span><select aria-label={t("界面语言")} value={locale} onChange={e => setLocale(e.target.value as Locale)}><option value="zh-CN">简体中文</option><option value="zh-TW">繁體中文</option><option value="en">English</option></select></label><span className="beginner-mark"><i />{t("初学者友好")}</span><button className="coach-toggle" onClick={() => setCoachOpen(!coachOpen)}><Sparkles size={15}/>{t("合奏教练")}</button><span className="user-avatar">YOU</span></div></header>
   <div className={`workspace-body ${coachOpen ? 'with-coach' : ''}`}><main>
   <div className="page-heading"><div><div className="eyebrow">{t("LISTEN. PLAY. BELONG.")}</div><h1>{tab === 'studio' ? t("听见彼此，找到你的声部。") : tab === 'learn' ? t("每一次合奏，都是一次发现。") : tab === 'catalog' ? t("从标准曲出发，听见爵士的来路。") : tab === 'microphone' ? t("让真实的乐器，加入你的学习。") : t("把听到的，变成自己的理解。")}</h1><p>{tab === 'studio' ? t("不必读懂乐谱。选一个角色，让你的第一拍和乐队相遇。") : tab === 'learn' ? t("60 分钟，从聆听到共同创造。按自己的节奏，完成四站探索。") : tab === 'catalog' ? t("把标准曲、历史人物与耳朵里的声音连接起来。") : tab === 'microphone' ? t("录下一句，观察音高与起音，再用耳朵判断。") : t("练习记录保存在此浏览器中。导出后可作为课堂讨论与反思的素材。")}</p></div><div className="heading-note">{t("VOL. 01")}<br /><b>{t("THE FIRST JAM")}</b></div></div>
   {notice && <div className="notice" role="status">{translateError(locale, notice)}<button aria-label={t("关闭提示")} onClick={() => setNotice('')}>×</button></div>}
   {tab === 'studio' && <>
    <section className="stage-panel" aria-label={t("爵士合奏舞台")}><div className="stage-toolbar"><div><span className={`live-dot ${playing ? 'on' : ''}`}/>{t(playing ? 'LIVE SESSION' : 'READY WHEN YOU ARE')}<span className="stage-separator">/</span><span>{t(sceneNames[scene])}</span></div><select aria-label={t("选择场景")} value={scene} onChange={e => setScene(e.target.value as typeof scene)}>{Object.entries(sceneNames).map(([v, label]) => <option value={v} key={v}>{t(label)}</option>)}</select></div><JazzStage locale={locale} band={band} playing={playing} beat={beat} scene={scene} player={player} onSelect={choosePlayer}/>
     <div className="transport"><button className="play-button" aria-label={playing ? t("暂停合奏") : t("开始合奏")} onClick={() => playing ? stop() : start()}>{playing ? <Pause size={21} fill="currentColor"/> : <Play size={21} fill="currentColor"/>}</button><div className="now-playing"><strong>{t(song.title)}</strong><span>{song.key} · {song.id.startsWith('import-') ? t("自有／授权素材") : song.id.startsWith('standard-') ? t("标准曲 · 教学版") : t("原创教学练习")} · {t('{count} 小节', { count: song.chords.length })}</span></div><div className="beat-meter" aria-label={t('第 {bar} 小节，第 {beat} 拍', { bar: bar + 1, beat: beat + 1 })}>{[0, 1, 2, 3].map(n => <span className={playing && beat === n ? 'active' : ''} key={n}>{n + 1}</span>)}</div><label className="volume"><Volume2 size={17}/><input aria-label={t("音量")} type="range" min="0" max="0.8" step="0.01" value={volume} onChange={e => setVolume(+e.target.value)}/></label></div>
    </section>
    <div className="studio-controls"><label className="tempo-control"><span>{t("速度")}<small>BPM</small></span><button aria-label={t("减慢速度")} disabled={challenge} onClick={() => setBpm(v => Math.max(50, v - 4))}><Minus size={13}/></button><strong>{bpm}</strong><button aria-label={t("加快速度")} disabled={challenge} onClick={() => setBpm(v => Math.min(difficulty === 'beginner' ? 160 : 240, v + 4))}><Plus size={13}/></button></label><label className="swing-control">{t("摇摆感")}<input aria-label={t("摇摆比例")} disabled={challenge} type="range" min="50" max="70" value={swing} onChange={e => setSwing(+e.target.value)}/><span>{swing}%</span></label><span className="control-hint">{t("四拍一小节 · 点击乐手也可加入")}</span></div>
    <section className="difficulty-panel" aria-label={t("练习难度")}><div className="difficulty-heading"><strong>{t("选择你的探索深度")}</strong><span>{t("改变材料，不替你加速")}</span></div><div className="difficulty-switch" role="group" aria-label={t("练习难度")}>{(['beginner', 'intermediate', 'bebop'] as const).map(d => <button key={d} disabled={challenge} className={difficulty === d ? 'active' : ''} aria-pressed={difficulty === d} onClick={() => changeDifficulty(d)}><span>{t(difficultyNames[d])}</span><small>{DIFFICULTY_KEYS[d].length} {t('个演奏垫')}</small></button>)}</div><p>{t(difficultyHints[difficulty])}</p></section>
    <section className="band-section"><div className="section-title"><h2>{t("今晚，和谁一起演奏？")}</h2><span>{t("切换编制，听见分工的变化")}</span></div><div className="instrument-list">{all.map(i => <div key={i} className={`instrument ${band.includes(i) ? 'enabled' : ''} ${player === i ? 'is-player' : ''}`}><div className="instrument-top"><span className={`instrument-icon ${i}`}>{i === 'piano' ? '▥' : i === 'bass' ? '♩' : i === 'drums' ? '◉' : i === 'sax' ? '♫' : '♬'}</span><button disabled={challenge} className={`toggle ${band.includes(i) ? 'checked' : ''}`} role="switch" aria-checked={band.includes(i)} aria-label={t(band.includes(i) ? t("让{instrument}离场") : t("让{instrument}加入"), { instrument: t(names[i]) })} onClick={() => toggle(i)}><span /></button></div><strong>{t(names[i])}<small>{nicks[i]}</small></strong><p>{featuredSolo === i ? t("旋律前景 · Solo") : t(i === "piano" ? "和声回应 · Comping" : i === "bass" ? "低音根基 · Comping" : i === "drums" ? "律动 · 摇摆脉搏" : i === "sax" ? "旋律 · 呼吸留白" : "和声 · 节奏回应")}</p>{i !== "drums" && <div className="part-mode" role="group" aria-label={t("{instrument}演奏模式", {instrument:t(names[i])})}>{(["comping","solo"] as const).map(mode => <button key={mode} disabled={challenge || !band.includes(i)} aria-pressed={(featuredSolo===i)===(mode==="solo")} onClick={() => {setFeaturedSolo(mode === "solo" ? i : featuredSolo === i ? null : featuredSolo); setSelectedPad(0);}}>{mode === "solo" ? "Solo" : t("伴奏")}</button>)}</div>}<button disabled={challenge} className="role-button" onClick={() => choosePlayer(player === i ? null : i)}>{player === i ? <><Check size={13}/>{t("你正在演奏")}</> : <>{t("扮演此角色")}<ArrowUpRight size={12}/></>}</button></div>)}</div></section>
    <section className="arrangement-panel" aria-label={t("当前编配")}> <div className="arrangement-heading"><div><span className="eyebrow">ARRANGE → LISTEN → COMPARE</span><h2>{t("每个声部，都有自己的任务。")}</h2></div><label>{t("钢琴配音")}<select aria-label={t("钢琴配音")} disabled={challenge} value={pianoVoicing} onChange={e=>setPianoVoicing(e.target.value as PianoVoicing)}><option value="auto">{t("自动随编制")}</option><option value="rooted">{t("含根音")}</option><option value="rootless">{t("去根音")}</option></select></label></div><p>{arrangement.summary}</p><div className="arrangement-parts">{band.map(i=><div key={i}><strong>{t(names[i])}<span>{featuredSolo===i?'Solo':t("伴奏")}</span></strong><p>{arrangement.parts[i].role}</p><small>{arrangement.parts[i].register} · {arrangement.parts[i].density}</small></div>)}</div><p className="small-note">{t("每次一位主奏。切换 Solo 后，其他声部减少密度；选择扮演角色后，由你的演奏垫接管该声部。")}</p></section>
    <div className="ab-experiment"><span className="experiment-icon"><SlidersHorizontal size={22}/></span><div><strong>{t("一个小实验：贝斯离场之后呢？")}</strong><p>{t("保持同一曲目和速度，比较钢琴的低音与和弦。")}<a href="#" onClick={e => { e.preventDefault(); setTab('learn'); }}>{t("记录发现")}<ArrowRight size={12}/></a></p></div><div className="ab-buttons"><button disabled={challenge} onClick={() => experiment(false)}>{t("A 无贝斯")}</button><button disabled={challenge} onClick={() => experiment(true)}>{t("B 有贝斯")}</button></div></div>
    <section className="playground"><div className="section-title"><h2>{player ? t('轮到你了：{instrument}。', { instrument: t(names[player]) }) : t("把一个声部，留给自己。")}</h2><button className="text-button" disabled={challenge} onClick={() => choosePlayer(null)}><Headphones size={14}/>{t("只听乐队")}</button></div><p className="player-description">{player ? arrangement.parts[player].role + " · " + arrangement.parts[player].padSummary : t("选择上方的乐手角色，乐队会把这个声部交给你。按键材料随当前和声与难度变化。")}</p><div className="chord-timeline" aria-label={t("和弦进行")}>{song.chords.map((c, i) => <span key={i} className={i === bar % song.chords.length ? 'current' : ''}><small>{i + 1}</small>{song.chordEvents?.filter(e=>e.beat>=i*4&&e.beat<(i+1)*4).map(e=>e.chord).join(' · ') || c}</span>)}</div><div className={`pad-row ${difficulty !== 'beginner' ? 'expanded-pads' : ''}`}>{keys.map((key, i) => { const info = player ? getPadInfo(player, i, chord, nextChord, difficulty, locale, band.includes('bass'), performanceOptions) : null; return <button key={key} disabled={!player} className={`music-pad ${activePad === i ? 'pressed' : ''} ${selectedPad === i ? 'selected-pad' : ''}`} aria-label={info ? `${key}: ${info.title}; ${info.notes.join(', ')}` : t('选择一个角色')} onFocus={() => setSelectedPad(i)} onPointerDown={() => hit(i)} onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
            e.preventDefault();
            hit(i);
        } }}><kbd>{key.toUpperCase()}</kbd><span>{player ? padLabels(player, difficulty, locale, performanceOptions)[i] : t(i === 0 ? t("选择一个角色") : i === 1 ? t("先听四拍") : t("轻轻加入"))}<small className="pad-notes">{info?.notes.join(' · ')}</small></span><small className="pad-index">{String(i + 1).padStart(2, '0')}</small></button>; })}</div>{padInfo && <div className="pad-explanation"><div><span>{t('当前按键材料')} / {keys[Math.min(selectedPad, keys.length - 1)].toUpperCase()}</span><strong>{padInfo.title}</strong><b>{padInfo.notes.join(' · ')}</b></div><p>{padInfo.description}</p><small>{t('音阶 / 音高材料')} · {padInfo.scale}</small></div>}{difficulty!=='beginner'&&<p className="small-note advanced-note">{t('多音乐句会吸附到节拍，并向下一次和弦变化解决。每次按键只记一次实际触发，自动乐句音符不额外计分。')}</p>}<div className="performance-feedback" role="status"><span className={activePad >= 0 ? 'pulse' : ''}/>{t(feedback.key, feedback.params)}</div><div className="challenge-row"><div><strong>{t("8 小节节拍挑战")}</strong><span>{challenge ? t('第 {beat} / 32 拍 · {hits} 次合拍', { beat: Math.min(32, challengeBeat), hits: hitCount }) : t("以 ±120 ms 为入门节拍窗口；可降速、重试，不扣分。")}</span></div><button className="primary-button" onClick={challenge ? stop : startChallenge}>{challenge ? t("结束练习") : t("开始挑战")}<ArrowRight size={15}/></button></div>{challenge && <div className="progress-track"><i style={{ width: Math.min(challengeBeat / 32, 1) * 100 + '%' }}/></div>}<p className="small-note">{t("挑战只评价实际按键触发时机（±120 ms），受设备延迟影响，不评价进阶乐句正确性、音色、创造力或真实器乐能力。合成音色用于教学示范。")}</p></section>
   </>}
   {tab === 'microphone' && <MicrophoneLab locale={locale} bpm={bpm} chord={chord} role={player ?? 'piano'} onBeforeRecord={stop}/>}
   {tab === 'catalog' && <RepertoirePanel locale={locale} onPlay={playCatalogSong}/>}
   {tab === 'learn' && <div className="learning-page"><div className="learning-intro"><span className="pill">{t("60 MIN / BEGINNER")}</span><h2>{t("今天的目标：知道何时发声，也知道如何留白。")}</h2><p>{t("听辨旋律、和声、低音和节奏的分工；用一次 A/B 实验解释编制变化；完成节拍练习，并与同伴修订你的解释。")}</p></div>
    <section className="learning-step"><div className="step-no">01</div><div className="step-content"><span className="eyebrow">{t("起点 · 8 分钟")}</span><h2>{t("先说说，你现在的理解。")}</h2><p>{t("先完成小测，再进入实验。这里没有成绩压力，答案用于比较自己的变化。")}</p><Quiz locale={locale} questions={PRE_QUIZ} answers={saved.pre} done={saved.preDone} onChange={v => patch({ pre: v })} onSubmit={() => patch({ preDone: true })}/></div></section>
    <section className="learning-step"><div className="step-no">02</div><div className="step-content"><span className="eyebrow">{t("听辨与预测 · 15 分钟")}</span><h2>{t("少一个乐手，音乐会怎样？")}</h2><p>{t("先预测，播放 A 无贝斯，再播放 B 有贝斯。至少各听一个循环，只改变编制。注意钢琴低音、和弦位置及留给伙伴的空间。")}</p><div className="inline-actions"><button onClick={() => { experiment(false); setTab('studio'); }}>{t("去听 A 编制")}<ArrowUpRight size={14}/></button><button onClick={() => { experiment(true); setTab('studio'); }}>{t("去听 B 编制")}<ArrowUpRight size={14}/></button></div><label className="writing-label">{t("我的预测与听辨证据")}<textarea value={saved.observation} onChange={e => patch({ observation: e.target.value })} placeholder={t("我原先预测……A 中我听见……B 中变化是……所以我认为……")} rows={4}/></label><p className="small-note">{t("本游戏中贝斯与钢琴配音自动联动，A/B 比较整体编配，不能单独归因于一个因素。有贝斯也不代表钢琴绝不能弹根音。")}</p></div></section>
    <section className="learning-step"><div className="step-no">03</div><div className="step-content"><span className="eyebrow">{t("扮演与协作 · 25 分钟")}</span><h2>{t("做乐手，也做彼此的聆听者。")}</h2><p>{t("选择一个角色，慢速练习后完成 8 小节挑战。两人轮流操作和观察，然后交换角色。共同决定一处留白或编制调整，重听并修订解释。")}</p><button className="primary-button" onClick={() => setTab('studio')}>{t("进入合奏")}<ArrowRight size={15}/></button><label className="writing-label">{t("同伴反馈与共同修订")}<textarea rows={3} value={saved.partner} onChange={e => patch({ partner: e.target.value })} placeholder={t("同伴提出……我们比较后把原来的解释改为……依据是……")}/></label><p className="small-note">{t("这是同设备轮流合作活动；网站当前不支持多人在线同步合奏。")}</p></div></section>
    <section className="learning-step"><div className="step-no">04</div><div className="step-content"><span className="eyebrow">{t("迁移与反思 · 12 分钟")}</span><h2>{t("把发现带到下一次 jam。")}</h2><Quiz locale={locale} questions={POST_QUIZ} answers={saved.post} done={saved.postDone} onChange={v => patch({ post: v })} onSubmit={() => patch({ postDone: true })}/><label className="writing-label">{t("我的退出卡")}<textarea rows={4} value={saved.reflection} onChange={e => patch({ reflection: e.target.value })} placeholder={t("我对合奏分工的理解改变了什么？如果萨克斯离场，我会如何调整？下一次我想改进……")}/></label><button className="primary-button" onClick={exportRecord}><Download size={16}/>{t("导出学习证据")}</button></div></section>
    <section className="learning-extension"><Mic2 size={22}/><div><h2>{t("选修迁移：把练习带到真实乐器")}</h2><p>{t("用同一速度录下 20 秒单音乐句，对照音高与起音图，再比较一次伴奏与 Solo。先写自己的听感，再参考分析。录音不计入按键挑战分数。")}</p><button className="primary-button" onClick={()=>setTab("microphone")}>{t("打开真实演奏")}<ArrowRight size={15}/></button></div></section><section className="references"><h2>{t("设计背后的依据")}</h2><p>{t("TPACK 连接音乐内容、教学方法与技术；ICAP 用于区分聆听、操作、解释和共同修订。游戏提供练习情境与反馈，不把点击量当作学习成效。")}</p>{REFERENCES.map((r, i) => <a key={i} href={r.url} target="_blank" rel="noreferrer">{t(r.label)}<ArrowUpRight size={13}/></a>)}<a href={'/teaching-guide.html?lang=' + locale} target="_blank" rel="noreferrer">{t("完整教学设计、评价量规与小组展示指南")}<ArrowUpRight size={13}/></a></section>
   </div>}
   {tab === 'notes' && <div className="notes-page"><div className="notes-summary"><Disc3 size={48}/><div><span className="eyebrow">{t("YOUR SESSION BOOK")}</span><h2>{saved.results.length ? t('已经和乐队完成 {count} 次练习。', { count: saved.results.length }) : t("你的第一场 jam，正等着开始。")}</h2><p>{t("每一次认真聆听，都值得留下记录。")}</p></div><button className="primary-button" onClick={exportRecord}><Download size={16}/>{t("导出记录")}</button></div><div className="score-comparison">{(['pre', 'post'] as const).map(phase => <div key={phase}><small>{phase === 'pre' ? t("前测 · 初始理解") : t("后测 · 当前理解")}</small><strong>{saved[phase === 'pre' ? 'preDone' : 'postDone'] ? `${saved[phase].filter((v, i) => v === (phase === 'pre' ? PRE_QUIZ : POST_QUIZ)[i]?.answer).length} / 3` : t("尚未完成")}</strong></div>)}<p>{t("不同题目的同构概念测验，仅供课堂讨论。单次差异不能证明教学效果。")}</p></div><section className="record-list"><h2>{t("练习足迹")}</h2>{!saved.results.length ? <div className="empty-record"><Music2 size={30}/><p>{t("选择一个角色，完成 8 小节挑战，记录就会出现在这里。")}</p><button onClick={() => setTab('studio')}>{t("开始第一场合奏")}<ArrowRight size={14}/></button></div> : saved.results.slice().reverse().map((r, i) => <div className="record" key={i}><span className="record-disc">♫</span><div><strong>{t(names[r.role as Instrument] || r.role)} · {r.tempo}{t("BPM ·")}{t(r.song || t("练习"))} {r.difficulty && ' · ' + t(difficultyNames[r.difficulty])}</strong><small>{new Date(r.at).toLocaleString(locale)}</small></div><b>{r.coverage}<small>{t("/ 32 拍合拍")}</small></b><span>{t('{count} 次按键', { count: r.attempts })}</span></div>)}</section><section className="note-writing"><h2>{t("我的听辨与反思")}</h2><label className="writing-label">{t("A / B 编制听辨")}<textarea rows={3} value={saved.observation} onChange={e => patch({ observation: e.target.value })}/></label><label className="writing-label">{t("同伴反馈")}<textarea rows={3} value={saved.partner} onChange={e => patch({ partner: e.target.value })}/></label><label className="writing-label">{t("退出卡")}<textarea rows={4} value={saved.reflection} onChange={e => patch({ reflection: e.target.value })}/></label><p className="small-note">{t("学习记录仅保存在当前浏览器。只有点击 AI 发送时，问题、最近对话、当前编制和听辨记录才会发送给 DeepSeek。")}</p><button className="text-button" onClick={() => { if (window.confirm(t("清空此浏览器的全部学习记录？此操作无法撤销。"))) {
        setSaved({ ...empty });
        setNotice(t("本地学习记录已清空。"));
    } }}><RotateCcw size={13}/>{t("清空本地记录")}</button></section></div>}
   <footer className="page-footer"><span>{t("BLUE HOUR · 每个声部，都有被听见的位置。")}</span><span>{t("真实演奏与角色编配 · v3.0")}</span></footer>
   </main>
   {coachOpen && <aside className="coach-panel"><div className="coach-header"><div className="coach-avatar">✦</div><div><strong>{t("你的合奏教练")}</strong><span>{t("edushoegazers · AI 辅助")}</span></div><span className="coach-status" title={t("连接在发送时验证")}/></div><div className="coach-context"><span>{t("正在探索")}</span><strong>{player ? t('{instrument}的合奏角色', { instrument: t(names[player]) }) : t("乐器之间的对话")}</strong><p>{arrangement.summary}</p></div><div className="coach-chat">{chat.map((c, i) => <div key={i} className={`chat-message ${c.role}`}><small>{c.role === 'user' ? t("你") : c.offline ? t("练习提示 · 本地") : t("合奏教练 · DeepSeek")}</small><p>{c.offline ? c.content.split('\n').map(line => t(line)).join('\n') : c.content}</p>{c.action && <button disabled={challenge} onClick={() => applyAction(c.action!)}>{t("试试这个建议")}<ArrowRight size={12}/></button>}</div>)}{busy && <div className="thinking" role="status">{t("教练正在思考")}<span>…</span></div>}<div ref={chatEnd}/></div><div className="coach-suggestions"><button disabled={busy} onClick={() => ask(t("为什么贝斯加入后钢琴可以用去根音配音？"))}>{t("为什么要给低音留空间？")}<ArrowUpRight size={12}/></button><button disabled={busy} onClick={() => ask(t(difficulty==='beginner'?'根据当前编制，给我一个适合初学者的小实验。':'根据当前编制与进阶难度，给我一个关于导向音、趋近音或包围的练习。'))}>{t("给我一个小实验")}<ArrowUpRight size={12}/></button></div><form className="coach-form" onSubmit={e => { e.preventDefault(); ask(); }}><label htmlFor="coach-question" className="sr-only">{t("向教练提问")}</label><textarea id="coach-question" maxLength={1200} rows={2} value={question} onChange={e => setQuestion(e.target.value)} placeholder={t("聊聊你刚才听到了什么…")}/><button aria-label={t("发送给 AI 教练")} disabled={busy || !question.trim()}><Send size={17}/></button></form><p className="coach-disclosure">{t("发送将使用 DeepSeek。教练读取游戏状态与文字，不听取音频。AI 建议需要你判断。")}</p><div className="coach-tip"><span>♫</span><p>{t("“先听见别人，再找到自己。”")}<small>{t("今晚的 jam 提醒")}</small></p></div></aside>}
   </div>
  </div>
  {importOpen && <div className="modal-backdrop" onClick={() => setImportOpen(false)}><section className="import-modal" role="dialog" aria-modal="true" aria-labelledby="import-title" onClick={e => e.stopPropagation()}><button className="modal-close" aria-label={t("关闭导入")} onClick={() => setImportOpen(false)}>×</button><span className="eyebrow">{t("YOUR REPERTOIRE")}</span><h2 id="import-title">{t("带上你的曲目来 jam。")}</h2><p>{t("支持授权或自创的 JSON 和弦表。chords 按小节排列；可用 chordEvents 指定小节内变化（beat 从 0 开始，每小节 4 拍）。导入生成教学伴奏，不会还原原曲旋律。")}</p><div className="inline-actions"><button onClick={() => fileInput.current?.click()}><Upload size={15}/>{t("选择 JSON 文件")}</button><button onClick={() => download('jazz-song-template.json', JSON.stringify({ id: 'my-study', title: t("我的合奏练习"), subtitle: t("授权 / 自创曲目"), key: 'C', bpm: 88, chords: ['Dm7', 'G7', 'Cmaj7', 'Cmaj7'] }, null, 2), 'application/json')}>{t("下载模板")}</button></div><input ref={fileInput} type="file" accept="application/json,.json" hidden onChange={async (e) => { const f = e.target.files?.[0]; if (f) {
        if (f.size > 100000) {
            setNotice(t("文件应小于100KB"));
            return;
        }
        setImportText(await f.text());
    } }}/><textarea aria-label={t("曲目 JSON")} value={importText} onChange={e => setImportText(e.target.value)} placeholder={t("{\"title\":\"我的练习\",\"key\":\"C\",\"bpm\":88,\"chords\":[\"Dm7\",\"G7\",\"Cmaj7\",\"Cmaj7\"]}")} rows={8}/><label className="rights-check"><input type="checkbox" checked={rights} onChange={e => setRights(e.target.checked)}/>{t("我确认这是自创、获授权或可合法使用的素材。")}</label><button className="primary-button" disabled={!rights || !importText.trim()} onClick={importSong}>{t("导入并排练")}<ArrowRight size={15}/></button>{notice && <p role="status">{translateError(locale, notice)}</p>}</section></div>}
 </div>;
}
function Quiz({ locale, questions, answers, done, onChange, onSubmit }: {
    locale: Locale;
    questions: typeof PRE_QUIZ;
    answers: number[];
    done: boolean;
    onChange: (v: number[]) => void;
    onSubmit: () => void;
}) { const t = createTranslator(locale); return <div className="quiz">{questions.map((q, i) => <fieldset key={i}><legend>{i + 1}. {t(q.question)}</legend>{q.options.map((o, n) => <label key={n} className={`${answers[i] === n ? 'chosen' : ''} ${done && n === q.answer ? 'correct' : ''}`}><input type="radio" name={`quiz-${t(q.question)}`} disabled={done} checked={answers[i] === n} onChange={() => { const arr = [...answers]; arr[i] = n; onChange(arr); }}/><span>{t(o)}</span>{done && n === q.answer && <Check size={15}/>}</label>)}{done && <p className="quiz-explanation">{t(q.explanation)}</p>}</fieldset>)}{done ? <p className="quiz-result">{t('已记录 · {score} / {count}。把解释带回下一轮聆听。', { score: answers.filter((a, i) => a === questions[i]?.answer).length, count: questions.length })}</p> : <button className="primary-button" disabled={questions.some((_, i) => answers[i] === undefined)} onClick={onSubmit}>{t("记录我的理解")}<Check size={15}/></button>}</div>; }
