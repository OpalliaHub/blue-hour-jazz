import type { RepertoireEntry, RepertoireText } from './repertoire';
import { STANDARD_CHART_DATA } from './standard-catalog-data';

export const STANDARD_CORPUS = {
  name: 'ChoCo · iReal Pro playlist annotations',
  creators: 'Jacopo de Berardinis, Albert Meroño-Peñuela, Andrea Poltronieri, Valentina Presutti; original iReal community annotators',
  commit: '5fe168fd55be5c84512abcfbc4e6f1b1f8f0092a',
  repository: 'https://github.com/smashub/choco',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  licenseStatement: 'https://github.com/smashub/choco/blob/5fe168fd55be5c84512abcfbc4e6f1b1f8f0092a/LICENSE.md',
  paper: 'https://doi.org/10.1038/s41597-023-02410-w',
  retrieved: '2026-10-12',
} as const;

const text = (cn: string, tw: string, en: string): RepertoireText => ({ 'zh-CN': cn, 'zh-TW': tw, en });
const styleNames: Record<string, RepertoireText> = {
  'Medium Swing': text('中速 Swing', '中速 Swing', 'Medium swing'),
  'Medium Up Swing': text('中快速 Swing', '中快速 Swing', 'Medium-up swing'),
  'Up Tempo Swing': text('快速 Swing', '快速 Swing', 'Up-tempo swing'),
  'Slow Swing': text('慢速 Swing', '慢速 Swing', 'Slow swing'),
  Ballad: text('抒情曲', '抒情曲', 'Ballad'),
  'Bossa Nova': text('Bossa Nova', 'Bossa Nova', 'Bossa nova'),
  Latin: text('拉丁爵士', '拉丁爵士', 'Latin'),
  'Even 8ths': text('平直八分音符', '平直八分音符', 'Even eighths'),
  'Rock Pop': text('Rock / Pop（谱源标签）', 'Rock / Pop（譜源標籤）', 'Rock / pop (source tag)'),
  Funk: text('Funk', 'Funk', 'Funk'),
};
const rights = text(
  '和弦标注改编自 de Berardinis 等人的 ChoCo（iReal 社区来源），数据按 CC BY 4.0 使用并保留署名。已转换音名格式与拍点；不含原曲旋律、歌词、乐谱图像或录音，也不宣称原作品为公版。',
  '和弦標註改編自 de Berardinis 等人的 ChoCo（iReal 社群來源），資料按 CC BY 4.0 使用並保留署名。已轉換音名格式與拍點；不含原曲旋律、歌詞、樂譜圖像或錄音，也不宣稱原作品為公版。',
  'Chord annotations adapted from ChoCo by de Berardinis et al., based on iReal community annotations, under CC BY 4.0. Chord spelling and beat encoding are converted. No original melody, lyrics, score image or recording is included; the composition is not claimed to be public domain.'
);

/** Treat an initial or trailing article and punctuation as title variants. */
export function standardTitleKey(title: string): string {
  return title.normalize('NFKD').toLowerCase().replace(/^the\s+|,\s*the$/g, '').replace(/[^a-z0-9]/g, '');
}

export const STANDARD_CHARTS: RepertoireEntry[] = STANDARD_CHART_DATA.map(record => ({
  id: `changes-${record.id}`,
  title: record.title,
  sourceCredit: record.sourceCredit,
  // The dataset does not give publication years. Do not fabricate one.
  kind: 'changes',
  style: styleNames[record.style] ?? text(record.style, record.style, record.style),
  song: {
    id: `standard-choco-${record.id.replace('_', '-')}`,
    title: record.title,
    subtitle: '授权和弦标注 · 自动示范非原曲旋律',
    key: record.key,
    // An approachable teaching tempo, not a claim about an original recording.
    bpm: record.style === 'Ballad' ? 76 : record.style === 'Slow Swing' ? 84 : 100,
    chords: record.chords,
    chordEvents: record.changes.map(([beat, chord]) => ({ beat, chord })),
  },
  description: text(
    `${record.bars} 小节的谱源编配顺序，保留每小节内的和弦变化；谱源可能展开反复、引子或尾声，并非唯一标准版本。自动萨克斯是和弦音示范，不是原曲主题。风格标签来自谱源，伴奏律动使用本游戏的练习编配。`,
    `${record.bars} 小節的譜源編配順序，保留每小節內的和弦變化；譜源可能展開反覆、引子或尾聲，並非唯一標準版本。自動薩克斯風是和弦音示範，不是原曲主題。風格標籤來自譜源，伴奏律動使用本遊戲的練習編配。`,
    `${record.bars} bars in the source chart's expanded order, preserving changes within each bar. The source may include repeats, introductions or endings; this is not the only standard version. Automatic saxophone plays a chord-tone demo, not the tune's melody. Style tags come from the source; the rhythm section uses the game's teaching arrangement.`
  ),
  rights,
  sourceUrl: `${STANDARD_CORPUS.repository}/blob/${STANDARD_CORPUS.commit}/partitions/ireal-pro/choco/playlists/jams/${record.id}.jams`,
  recordings: [],
}));
