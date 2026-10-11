import type { Song } from "./music";
import { STANDARD_CHARTS, standardTitleKey } from "./standard-catalog";

export type RepertoireText = { "zh-CN": string; "zh-TW": string; en: string };
export interface RepertoireEntry {
  id: string;
  title: string;
  composer?: string;
  /** Credit exactly as supplied by the chord annotation source; not separately verified. */
  sourceCredit?: string;
  /** Composition publication year (not the date of the linked recording). */
  year?: number;
  kind?: "score" | "changes" | "listening";
  style?: RepertoireText;
  song?: Song;
  description: RepertoireText;
  rights: RepertoireText;
  sourceUrl: string;
  recordings: {
    artist: string;
    album: string;
    /** Original album release year, except where the named item is a dated live performance or compilation. */
    year: number;
    url: string;
    focus: RepertoireText;
    moment?: RepertoireText;
  }[];
}

const text = (cn: string, tw: string, en: string): RepertoireText => ({ "zh-CN": cn, "zh-TW": tw, en });
const scoreRights = text(
  "无歌词旋律取自 Freed Jazz；该谱源声明其版本在美国为公版。伴奏已作教学简化，未使用商业录音或 Real Book 页面。其他地区须核对当地权利状态。",
  "無歌詞旋律取自 Freed Jazz；該譜源聲明其版本在美國為公版。伴奏已作教學簡化，未使用商業錄音或 Real Book 頁面。其他地區須核對當地權利狀態。",
  "Instrumental melody from Freed Jazz, whose edition is declared public domain in the US. Accompaniment is simplified for teaching. No commercial audio or Real Book pages are included. Check rights in other territories."
);
const listeningRights = text(
  "仅提供作品信息与官方聆听入口；不内置该曲旋律、乐谱或录音。流媒体可用性随地区及账号而异。",
  "僅提供作品資訊與官方聆聽入口；不內置該曲旋律、樂譜或錄音。串流媒體可用性隨地區及帳號而異。",
  "Information and official listening links only: no melody, score or recording is bundled. Streaming access depends on territory and account."
);

// Score-derived MIDI events, not a transcription of any recommended artist's recording.
// See /REPERTOIRE-LICENSES.txt for source files, checksums and adaptation notes.
const ohLadyBeGood: Song = {
  "id": "standard-oh-lady-be-good",
  "title": "Oh, Lady Be Good!",
  "subtitle": "32-bar teaching arrangement · melody + simplified harmony",
  "key": "G",
  "bpm": 100,
  "chords": [
    "Gmaj7",
    "C7",
    "Gmaj7",
    "Bm7",
    "Am7",
    "D7",
    "G6",
    "Am7",
    "Gmaj7",
    "C7",
    "Gmaj7",
    "Bm7",
    "Am7",
    "D7",
    "G6",
    "Am7",
    "Cmaj7",
    "C#dim7",
    "Gmaj7",
    "F#m7b5",
    "Em7",
    "A7",
    "Am7",
    "D7",
    "Gmaj7",
    "C7",
    "Gmaj7",
    "Bm7",
    "Am7",
    "D7",
    "G6",
    "Am7"
  ],
  "melodyEvents": [
    {
      "beat": 0.0,
      "midi": 74,
      "duration": 2.0
    },
    {
      "beat": 2.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 3.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 4.0,
      "midi": 74,
      "duration": 2.0
    },
    {
      "beat": 6.0,
      "midi": 74,
      "duration": 2.0
    },
    {
      "beat": 8.0,
      "midi": 74,
      "duration": 0.6666666666666666
    },
    {
      "beat": 8.666666666666666,
      "midi": 71,
      "duration": 0.6666666666666666
    },
    {
      "beat": 9.333333333333334,
      "midi": 67,
      "duration": 0.6666666666666666
    },
    {
      "beat": 10.0,
      "midi": 62,
      "duration": 4.0
    },
    {
      "beat": 14.0,
      "midi": 74,
      "duration": 2.0
    },
    {
      "beat": 16.0,
      "midi": 74,
      "duration": 0.6666666666666666
    },
    {
      "beat": 16.666666666666668,
      "midi": 72,
      "duration": 0.6666666666666666
    },
    {
      "beat": 17.333333333333332,
      "midi": 69,
      "duration": 0.6666666666666666
    },
    {
      "beat": 18.0,
      "midi": 62,
      "duration": 4.0
    },
    {
      "beat": 22.0,
      "midi": 71,
      "duration": 2.0
    },
    {
      "beat": 24.0,
      "midi": 67,
      "duration": 7.0
    },
    {
      "beat": 32.0,
      "midi": 74,
      "duration": 2.0
    },
    {
      "beat": 34.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 35.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 36.0,
      "midi": 74,
      "duration": 2.0
    },
    {
      "beat": 38.0,
      "midi": 74,
      "duration": 2.0
    },
    {
      "beat": 40.0,
      "midi": 74,
      "duration": 0.6666666666666666
    },
    {
      "beat": 40.666666666666664,
      "midi": 71,
      "duration": 0.6666666666666666
    },
    {
      "beat": 41.333333333333336,
      "midi": 67,
      "duration": 0.6666666666666666
    },
    {
      "beat": 42.0,
      "midi": 62,
      "duration": 4.0
    },
    {
      "beat": 46.0,
      "midi": 74,
      "duration": 2.0
    },
    {
      "beat": 48.0,
      "midi": 74,
      "duration": 0.6666666666666666
    },
    {
      "beat": 48.666666666666664,
      "midi": 72,
      "duration": 0.6666666666666666
    },
    {
      "beat": 49.333333333333336,
      "midi": 69,
      "duration": 0.6666666666666666
    },
    {
      "beat": 50.0,
      "midi": 62,
      "duration": 4.0
    },
    {
      "beat": 54.0,
      "midi": 71,
      "duration": 2.0
    },
    {
      "beat": 56.0,
      "midi": 67,
      "duration": 6.0
    },
    {
      "beat": 64.0,
      "midi": 76,
      "duration": 4.0
    },
    {
      "beat": 69.0,
      "midi": 76,
      "duration": 1.0
    },
    {
      "beat": 70.0,
      "midi": 76,
      "duration": 1.0
    },
    {
      "beat": 71.0,
      "midi": 76,
      "duration": 1.0
    },
    {
      "beat": 72.0,
      "midi": 76,
      "duration": 2.0
    },
    {
      "beat": 74.0,
      "midi": 74,
      "duration": 4.0
    },
    {
      "beat": 81.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 82.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 83.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 84.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 85.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 86.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 87.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 88.0,
      "midi": 71,
      "duration": 2.0
    },
    {
      "beat": 90.0,
      "midi": 69,
      "duration": 2.0
    },
    {
      "beat": 93.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 94.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 95.0,
      "midi": 73,
      "duration": 1.0
    },
    {
      "beat": 96.0,
      "midi": 74,
      "duration": 2.0
    },
    {
      "beat": 98.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 99.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 100.0,
      "midi": 74,
      "duration": 2.0
    },
    {
      "beat": 102.0,
      "midi": 74,
      "duration": 2.0
    },
    {
      "beat": 104.0,
      "midi": 74,
      "duration": 0.6666666666666666
    },
    {
      "beat": 104.66666666666667,
      "midi": 71,
      "duration": 0.6666666666666666
    },
    {
      "beat": 105.33333333333333,
      "midi": 67,
      "duration": 0.6666666666666666
    },
    {
      "beat": 106.0,
      "midi": 62,
      "duration": 4.0
    },
    {
      "beat": 110.0,
      "midi": 76,
      "duration": 2.0
    },
    {
      "beat": 112.0,
      "midi": 74,
      "duration": 0.6666666666666666
    },
    {
      "beat": 112.66666666666667,
      "midi": 72,
      "duration": 0.6666666666666666
    },
    {
      "beat": 113.33333333333333,
      "midi": 69,
      "duration": 0.6666666666666666
    },
    {
      "beat": 114.0,
      "midi": 62,
      "duration": 4.0
    },
    {
      "beat": 118.0,
      "midi": 71,
      "duration": 2.0
    },
    {
      "beat": 120.0,
      "midi": 67,
      "duration": 6.0
    }
  ]
};

const lookForTheSilverLining: Song = {
  "id": "standard-look-for-the-silver-lining",
  "title": "Look for the Silver Lining",
  "subtitle": "32-bar teaching arrangement · melody + simplified harmony",
  "key": "Eb",
  "bpm": 88,
  "chords": [
    "Ebmaj7",
    "Fm7",
    "Ebmaj7",
    "Fm7",
    "Gm7",
    "Ab7",
    "Gm7",
    "Cm7",
    "Fm7",
    "Bb7",
    "Ebmaj7",
    "Ebmaj7",
    "Cm7",
    "F7",
    "Fm7",
    "Bb7",
    "Ebmaj7",
    "Fm7",
    "Ebmaj7",
    "Fm7",
    "Bbm7",
    "Eb7",
    "Abmaj7",
    "Abmaj7",
    "Cm7",
    "Am7b5",
    "Gm7",
    "C7",
    "Fm7",
    "Bb7",
    "Eb6",
    "Fm7"
  ],
  "melodyEvents": [
    {
      "beat": 0.0,
      "midi": 67,
      "duration": 2.0
    },
    {
      "beat": 2.0,
      "midi": 67,
      "duration": 3.0
    },
    {
      "beat": 5.0,
      "midi": 68,
      "duration": 1.0
    },
    {
      "beat": 6.0,
      "midi": 65,
      "duration": 1.0
    },
    {
      "beat": 7.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 8.0,
      "midi": 63,
      "duration": 2.0
    },
    {
      "beat": 10.0,
      "midi": 63,
      "duration": 3.0
    },
    {
      "beat": 13.0,
      "midi": 65,
      "duration": 1.0
    },
    {
      "beat": 14.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 15.0,
      "midi": 68,
      "duration": 1.0
    },
    {
      "beat": 16.0,
      "midi": 70,
      "duration": 2.0
    },
    {
      "beat": 18.0,
      "midi": 70,
      "duration": 2.0
    },
    {
      "beat": 20.0,
      "midi": 75,
      "duration": 1.0
    },
    {
      "beat": 21.0,
      "midi": 74,
      "duration": 2.0
    },
    {
      "beat": 23.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 24.0,
      "midi": 70,
      "duration": 5.0
    },
    {
      "beat": 29.0,
      "midi": 63,
      "duration": 1.0
    },
    {
      "beat": 30.0,
      "midi": 65,
      "duration": 1.0
    },
    {
      "beat": 31.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 32.0,
      "midi": 68,
      "duration": 2.0
    },
    {
      "beat": 34.0,
      "midi": 68,
      "duration": 3.0
    },
    {
      "beat": 37.0,
      "midi": 60,
      "duration": 1.0
    },
    {
      "beat": 38.0,
      "midi": 62,
      "duration": 1.0
    },
    {
      "beat": 39.0,
      "midi": 65,
      "duration": 1.0
    },
    {
      "beat": 40.0,
      "midi": 70,
      "duration": 2.0
    },
    {
      "beat": 42.0,
      "midi": 70,
      "duration": 3.0
    },
    {
      "beat": 45.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 46.0,
      "midi": 70,
      "duration": 1.0
    },
    {
      "beat": 47.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 48.0,
      "midi": 75,
      "duration": 1.5
    },
    {
      "beat": 50.0,
      "midi": 75,
      "duration": 4.0
    },
    {
      "beat": 54.0,
      "midi": 74,
      "duration": 2.0
    },
    {
      "beat": 56.0,
      "midi": 70,
      "duration": 1.5
    },
    {
      "beat": 57.5,
      "midi": 72,
      "duration": 0.5
    },
    {
      "beat": 58.0,
      "midi": 70,
      "duration": 1.5
    },
    {
      "beat": 59.5,
      "midi": 72,
      "duration": 0.5
    },
    {
      "beat": 60.0,
      "midi": 70,
      "duration": 1.5
    },
    {
      "beat": 61.5,
      "midi": 72,
      "duration": 0.5
    },
    {
      "beat": 62.0,
      "midi": 68,
      "duration": 1.5
    },
    {
      "beat": 63.5,
      "midi": 70,
      "duration": 0.5
    },
    {
      "beat": 64.0,
      "midi": 67,
      "duration": 2.0
    },
    {
      "beat": 66.0,
      "midi": 67,
      "duration": 3.0
    },
    {
      "beat": 69.0,
      "midi": 68,
      "duration": 1.0
    },
    {
      "beat": 70.0,
      "midi": 65,
      "duration": 1.0
    },
    {
      "beat": 71.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 72.0,
      "midi": 63,
      "duration": 2.0
    },
    {
      "beat": 74.0,
      "midi": 63,
      "duration": 3.0
    },
    {
      "beat": 77.0,
      "midi": 65,
      "duration": 1.0
    },
    {
      "beat": 78.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 79.0,
      "midi": 68,
      "duration": 1.0
    },
    {
      "beat": 80.0,
      "midi": 70,
      "duration": 2.0
    },
    {
      "beat": 82.0,
      "midi": 70,
      "duration": 2.0
    },
    {
      "beat": 84.0,
      "midi": 70,
      "duration": 1.0
    },
    {
      "beat": 85.0,
      "midi": 68,
      "duration": 2.0
    },
    {
      "beat": 87.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 88.0,
      "midi": 72,
      "duration": 5.0
    },
    {
      "beat": 93.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 94.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 95.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 96.0,
      "midi": 77,
      "duration": 2.0
    },
    {
      "beat": 98.0,
      "midi": 74,
      "duration": 3.0
    },
    {
      "beat": 101.0,
      "midi": 75,
      "duration": 1.0
    },
    {
      "beat": 102.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 103.0,
      "midi": 74,
      "duration": 1.0
    },
    {
      "beat": 104.0,
      "midi": 70,
      "duration": 2.0
    },
    {
      "beat": 106.0,
      "midi": 70,
      "duration": 3.0
    },
    {
      "beat": 109.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 110.0,
      "midi": 74,
      "duration": 1.0
    },
    {
      "beat": 111.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 112.0,
      "midi": 68,
      "duration": 2.0
    },
    {
      "beat": 114.0,
      "midi": 68,
      "duration": 2.0
    },
    {
      "beat": 116.0,
      "midi": 68,
      "duration": 0.5
    },
    {
      "beat": 116.5,
      "midi": 70,
      "duration": 0.5
    },
    {
      "beat": 117.0,
      "midi": 67,
      "duration": 2.0
    },
    {
      "beat": 119.0,
      "midi": 65,
      "duration": 1.0
    },
    {
      "beat": 120.0,
      "midi": 63,
      "duration": 5.0
    }
  ]
};

const embraceableYou: Song = {
  "id": "standard-embraceable-you",
  "title": "Embraceable You",
  "subtitle": "32-bar teaching arrangement · melody + simplified harmony",
  "key": "G",
  "bpm": 76,
  "chords": [
    "Gmaj7",
    "Bbdim7",
    "Am7",
    "D7",
    "Am7",
    "Cm6",
    "Gmaj7",
    "F#m7b5",
    "Em",
    "C#m7b5",
    "Bm7",
    "Em7",
    "Dmaj7",
    "Em7",
    "Am7",
    "D7",
    "Gmaj7",
    "Bbdim7",
    "Am7",
    "D7",
    "Am7",
    "Cm6",
    "Gmaj7",
    "Dm7",
    "Cmaj7",
    "F#m7b5",
    "Em7",
    "C#m7b5",
    "Bm7",
    "Am7b5",
    "Gmaj7",
    "Am7"
  ],
  "melodyEvents": [
    {
      "beat": 1.0,
      "midi": 64,
      "duration": 1.0
    },
    {
      "beat": 2.0,
      "midi": 66,
      "duration": 1.0
    },
    {
      "beat": 3.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 5.0,
      "midi": 64,
      "duration": 1.0
    },
    {
      "beat": 6.0,
      "midi": 66,
      "duration": 1.0
    },
    {
      "beat": 7.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 8.0,
      "midi": 69,
      "duration": 0.5
    },
    {
      "beat": 9.5,
      "midi": 62,
      "duration": 0.5
    },
    {
      "beat": 10.0,
      "midi": 62,
      "duration": 1.0
    },
    {
      "beat": 11.0,
      "midi": 62,
      "duration": 5.0
    },
    {
      "beat": 17.0,
      "midi": 69,
      "duration": 1.0
    },
    {
      "beat": 18.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 19.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 21.0,
      "midi": 69,
      "duration": 1.0
    },
    {
      "beat": 22.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 23.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 24.0,
      "midi": 74,
      "duration": 0.5
    },
    {
      "beat": 25.5,
      "midi": 67,
      "duration": 0.5
    },
    {
      "beat": 26.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 27.0,
      "midi": 67,
      "duration": 5.0
    },
    {
      "beat": 32.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 33.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 34.0,
      "midi": 69,
      "duration": 1.0
    },
    {
      "beat": 35.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 36.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 37.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 38.0,
      "midi": 69,
      "duration": 1.0
    },
    {
      "beat": 39.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 40.0,
      "midi": 71,
      "duration": 0.5
    },
    {
      "beat": 41.5,
      "midi": 66,
      "duration": 0.5
    },
    {
      "beat": 42.0,
      "midi": 66,
      "duration": 1.0
    },
    {
      "beat": 43.0,
      "midi": 66,
      "duration": 5.0
    },
    {
      "beat": 48.0,
      "midi": 69,
      "duration": 1.0
    },
    {
      "beat": 49.0,
      "midi": 66,
      "duration": 1.0
    },
    {
      "beat": 50.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 51.0,
      "midi": 66,
      "duration": 1.0
    },
    {
      "beat": 52.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 53.0,
      "midi": 69,
      "duration": 1.0
    },
    {
      "beat": 54.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 55.0,
      "midi": 73,
      "duration": 1.0
    },
    {
      "beat": 56.0,
      "midi": 74,
      "duration": 0.5
    },
    {
      "beat": 57.5,
      "midi": 62,
      "duration": 0.5
    },
    {
      "beat": 58.0,
      "midi": 62,
      "duration": 1.0
    },
    {
      "beat": 59.0,
      "midi": 62,
      "duration": 5.0
    },
    {
      "beat": 65.0,
      "midi": 64,
      "duration": 1.0
    },
    {
      "beat": 66.0,
      "midi": 66,
      "duration": 1.0
    },
    {
      "beat": 67.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 69.0,
      "midi": 64,
      "duration": 1.0
    },
    {
      "beat": 70.0,
      "midi": 66,
      "duration": 1.0
    },
    {
      "beat": 71.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 72.0,
      "midi": 69,
      "duration": 0.5
    },
    {
      "beat": 73.5,
      "midi": 62,
      "duration": 0.5
    },
    {
      "beat": 74.0,
      "midi": 62,
      "duration": 1.0
    },
    {
      "beat": 75.0,
      "midi": 62,
      "duration": 1.0
    },
    {
      "beat": 76.0,
      "midi": 62,
      "duration": 4.0
    },
    {
      "beat": 81.0,
      "midi": 69,
      "duration": 1.0
    },
    {
      "beat": 82.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 83.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 85.0,
      "midi": 69,
      "duration": 1.0
    },
    {
      "beat": 86.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 87.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 88.0,
      "midi": 74,
      "duration": 0.5
    },
    {
      "beat": 89.5,
      "midi": 67,
      "duration": 0.5
    },
    {
      "beat": 90.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 91.0,
      "midi": 67,
      "duration": 1.0
    },
    {
      "beat": 92.0,
      "midi": 67,
      "duration": 4.0
    },
    {
      "beat": 97.0,
      "midi": 74,
      "duration": 1.0
    },
    {
      "beat": 98.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 99.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 100.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 101.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 102.0,
      "midi": 69,
      "duration": 1.0
    },
    {
      "beat": 103.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 105.0,
      "midi": 67,
      "duration": 0.5
    },
    {
      "beat": 105.5,
      "midi": 67,
      "duration": 0.5
    },
    {
      "beat": 106.0,
      "midi": 67,
      "duration": 0.5
    },
    {
      "beat": 106.5,
      "midi": 67,
      "duration": 0.5
    },
    {
      "beat": 107.0,
      "midi": 67,
      "duration": 0.5
    },
    {
      "beat": 107.5,
      "midi": 67,
      "duration": 0.5
    },
    {
      "beat": 108.0,
      "midi": 67,
      "duration": 0.5
    },
    {
      "beat": 108.5,
      "midi": 67,
      "duration": 0.5
    },
    {
      "beat": 109.0,
      "midi": 71,
      "duration": 3.0
    },
    {
      "beat": 113.0,
      "midi": 71,
      "duration": 1.0
    },
    {
      "beat": 114.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 115.0,
      "midi": 74,
      "duration": 1.0
    },
    {
      "beat": 116.0,
      "midi": 75,
      "duration": 0.5
    },
    {
      "beat": 117.5,
      "midi": 67,
      "duration": 0.5
    },
    {
      "beat": 118.0,
      "midi": 66,
      "duration": 2.0
    },
    {
      "beat": 120.0,
      "midi": 67,
      "duration": 4.0
    }
  ]
};

const iGotRhythm: Song = {
  "id": "standard-i-got-rhythm",
  "title": "I Got Rhythm",
  "subtitle": "32-bar teaching arrangement · melody + simplified harmony",
  "key": "Bb",
  "bpm": 100,
  "chords": [
    "Bb6",
    "Cm7",
    "Dm7",
    "Cm7",
    "Bb7",
    "Eb7",
    "Bb6/F",
    "Bb6",
    "Bb6",
    "Cm7",
    "Dm7",
    "Cm7",
    "Bb7",
    "Eb7",
    "Bb6/F",
    "Bb6",
    "D7",
    "D7",
    "G7",
    "G7",
    "C7",
    "C7",
    "F7",
    "F7",
    "Bb6",
    "Cm7",
    "Dm7",
    "Cm7",
    "Bb7",
    "Eb7",
    "Bb6/F",
    "Bb6"
  ],
  "melodyEvents": [
    {
      "beat": 1.0,
      "midi": 65,
      "duration": 1.5
    },
    {
      "beat": 2.5,
      "midi": 67,
      "duration": 1.5
    },
    {
      "beat": 4.0,
      "midi": 70,
      "duration": 1.5
    },
    {
      "beat": 5.5,
      "midi": 72,
      "duration": 2.5
    },
    {
      "beat": 9.0,
      "midi": 72,
      "duration": 1.5
    },
    {
      "beat": 10.5,
      "midi": 70,
      "duration": 1.5
    },
    {
      "beat": 12.0,
      "midi": 67,
      "duration": 1.5
    },
    {
      "beat": 13.5,
      "midi": 65,
      "duration": 2.5
    },
    {
      "beat": 17.0,
      "midi": 65,
      "duration": 1.5
    },
    {
      "beat": 18.5,
      "midi": 67,
      "duration": 1.5
    },
    {
      "beat": 20.0,
      "midi": 70,
      "duration": 1.5
    },
    {
      "beat": 21.5,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 22.5,
      "midi": 75,
      "duration": 1.0
    },
    {
      "beat": 23.5,
      "midi": 72,
      "duration": 0.5
    },
    {
      "beat": 24.0,
      "midi": 74,
      "duration": 1.0
    },
    {
      "beat": 25.0,
      "midi": 74,
      "duration": 1.0
    },
    {
      "beat": 26.0,
      "midi": 72,
      "duration": 0.5
    },
    {
      "beat": 26.5,
      "midi": 74,
      "duration": 0.5
    },
    {
      "beat": 27.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 28.0,
      "midi": 70,
      "duration": 3.0
    },
    {
      "beat": 33.0,
      "midi": 65,
      "duration": 1.5
    },
    {
      "beat": 34.5,
      "midi": 67,
      "duration": 1.5
    },
    {
      "beat": 36.0,
      "midi": 70,
      "duration": 1.5
    },
    {
      "beat": 37.5,
      "midi": 72,
      "duration": 2.5
    },
    {
      "beat": 41.0,
      "midi": 72,
      "duration": 1.5
    },
    {
      "beat": 42.5,
      "midi": 70,
      "duration": 1.5
    },
    {
      "beat": 44.0,
      "midi": 67,
      "duration": 1.5
    },
    {
      "beat": 45.5,
      "midi": 65,
      "duration": 2.5
    },
    {
      "beat": 49.0,
      "midi": 65,
      "duration": 1.5
    },
    {
      "beat": 50.5,
      "midi": 67,
      "duration": 1.5
    },
    {
      "beat": 52.0,
      "midi": 70,
      "duration": 1.5
    },
    {
      "beat": 53.5,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 54.5,
      "midi": 75,
      "duration": 1.0
    },
    {
      "beat": 55.5,
      "midi": 72,
      "duration": 0.5
    },
    {
      "beat": 56.0,
      "midi": 74,
      "duration": 1.0
    },
    {
      "beat": 57.0,
      "midi": 74,
      "duration": 1.0
    },
    {
      "beat": 58.0,
      "midi": 72,
      "duration": 0.5
    },
    {
      "beat": 58.5,
      "midi": 74,
      "duration": 0.5
    },
    {
      "beat": 59.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 60.0,
      "midi": 70,
      "duration": 4.0
    },
    {
      "beat": 65.0,
      "midi": 74,
      "duration": 1.5
    },
    {
      "beat": 66.5,
      "midi": 74,
      "duration": 1.5
    },
    {
      "beat": 68.0,
      "midi": 74,
      "duration": 1.5
    },
    {
      "beat": 69.5,
      "midi": 76,
      "duration": 2.5
    },
    {
      "beat": 73.0,
      "midi": 74,
      "duration": 1.5
    },
    {
      "beat": 74.5,
      "midi": 74,
      "duration": 1.5
    },
    {
      "beat": 76.0,
      "midi": 74,
      "duration": 1.5
    },
    {
      "beat": 77.5,
      "midi": 67,
      "duration": 2.5
    },
    {
      "beat": 81.0,
      "midi": 72,
      "duration": 1.5
    },
    {
      "beat": 82.5,
      "midi": 72,
      "duration": 1.5
    },
    {
      "beat": 84.0,
      "midi": 72,
      "duration": 1.5
    },
    {
      "beat": 85.5,
      "midi": 74,
      "duration": 2.5
    },
    {
      "beat": 89.0,
      "midi": 72,
      "duration": 1.5
    },
    {
      "beat": 90.5,
      "midi": 72,
      "duration": 1.5
    },
    {
      "beat": 92.0,
      "midi": 72,
      "duration": 4.0
    },
    {
      "beat": 97.0,
      "midi": 65,
      "duration": 1.5
    },
    {
      "beat": 98.5,
      "midi": 67,
      "duration": 1.5
    },
    {
      "beat": 100.0,
      "midi": 70,
      "duration": 1.5
    },
    {
      "beat": 101.5,
      "midi": 72,
      "duration": 2.5
    },
    {
      "beat": 105.0,
      "midi": 72,
      "duration": 1.5
    },
    {
      "beat": 106.5,
      "midi": 70,
      "duration": 1.5
    },
    {
      "beat": 108.0,
      "midi": 67,
      "duration": 1.5
    },
    {
      "beat": 109.5,
      "midi": 65,
      "duration": 2.5
    },
    {
      "beat": 113.0,
      "midi": 65,
      "duration": 1.5
    },
    {
      "beat": 114.5,
      "midi": 67,
      "duration": 1.5
    },
    {
      "beat": 116.0,
      "midi": 70,
      "duration": 1.5
    },
    {
      "beat": 117.5,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 118.5,
      "midi": 75,
      "duration": 1.0
    },
    {
      "beat": 119.5,
      "midi": 72,
      "duration": 0.5
    },
    {
      "beat": 120.0,
      "midi": 74,
      "duration": 1.0
    },
    {
      "beat": 121.0,
      "midi": 74,
      "duration": 1.0
    },
    {
      "beat": 122.0,
      "midi": 72,
      "duration": 0.5
    },
    {
      "beat": 122.5,
      "midi": 74,
      "duration": 0.5
    },
    {
      "beat": 123.0,
      "midi": 72,
      "duration": 1.0
    },
    {
      "beat": 124.0,
      "midi": 70,
      "duration": 3.0
    }
  ]
};

const FEATURED_REPERTOIRE: RepertoireEntry[] = [
  {
    id: "oh-lady-be-good", title: "Oh, Lady Be Good!", composer: "George Gershwin", year: 1924,
    song: ohLadyBeGood,
    description: text(
      "先跟着清楚的主题哼唱，再关掉贝斯听钢琴如何接手低音。内置完整 32 小节主题循环；每小节只保留谱源的第一个和弦，便于观察合奏分工。",
      "先跟著清楚的主題哼唱，再關掉貝斯聽鋼琴如何接手低音。內置完整 32 小節主題循環；每小節只保留譜源的第一個和弦，便於觀察合奏分工。",
      "Hum the theme, then remove the bass and notice the piano's lower register. The 32-bar theme is included; only the first chord in each source bar is retained to make ensemble roles easier to follow."
    ),
    rights: scoreRights, sourceUrl: "https://freedjazz.org/tunes/oh-lady-be-good/",
    recordings: [
      {
        artist: "Ella Fitzgerald · Nelson Riddle", album: "Ella Fitzgerald Sings the George and Ira Gershwin Song Book", year: 1959,
        url: "https://music.apple.com/us/song/oh-lady-be-good/1469619401",
        focus: text("跟着第一遍人声主题轻哼；她停下来换气时，伴奏怎样延续乐句？", "跟著第一遍人聲主題輕哼；她停下來換氣時，伴奏怎樣延續樂句？", "Hum along with the first vocal theme. How does the accompaniment carry the phrase when she takes a breath?"),
        moment: text("经典时刻：1959 年 Gershwin Song Book，把歌曲旋律与爵士措辞放在同一张画面里。", "經典時刻：1959 年 Gershwin Song Book，把歌曲旋律與爵士措辭放在同一張畫面裡。", "A classic starting point: the 1959 Gershwin Song Book brings the song's melody and jazz phrasing together.")
      },
      {
        artist: "Oscar Peterson", album: "Oscar Peterson Plays the George Gershwin Song Book", year: 1959,
        url: "https://music.apple.com/us/song/oh-lady-be-good/1443906033",
        focus: text("比较同一个主题在人声与钢琴上的长短句；先跟住低音脉搏，不必数清每个快速音。", "比較同一個主題在人聲與鋼琴上的長短句；先跟住低音脈搏，不必數清每個快速音。", "Compare the lengths of the vocal and piano phrases. Follow the bass pulse before trying to catch every fast note.")
      }
    ]
  },
  {
    id: "look-for-the-silver-lining", title: "Look for the Silver Lining", composer: "Jerome Kern", year: 1920,
    song: lookForTheSilverLining,
    description: text(
      "用会唱的短句感受旋律、和弦与低音的分工。内置谱源的 32 小节主题；伴奏简化为每小节一个和弦。先听主题，再用留白回应。",
      "用會唱的短句感受旋律、和弦與低音的分工。內置譜源的 32 小節主題；伴奏簡化為每小節一個和弦。先聽主題，再用留白回應。",
      "Use a singable phrase to hear melody, harmony and bass as different jobs. The source's 32-bar theme is included with one chord per bar. Listen first, then answer with space."
    ),
    rights: scoreRights, sourceUrl: "https://freedjazz.org/tunes/look-for-the-silver-lining/",
    recordings: [
      {
        artist: "Chet Baker", album: "Chet Baker Sings", year: 1954,
        url: "https://www.youtube.com/watch?v=mrf_zmVhACI",
        focus: text("聆听人声乐句的结尾：小号手的呼吸感怎样进入歌声？伴奏有没有填满所有空隙？", "聆聽人聲樂句的結尾：小號手的呼吸感怎樣進入歌聲？伴奏有沒有填滿所有空隙？", "Listen to the ends of the vocal phrases. How does a trumpeter's sense of breath shape the singing? Does the band fill every gap?"),
        moment: text("经典时刻：1954 年的早期歌唱录音，适合把注意力放在旋律和呼吸上。", "經典時刻：1954 年的早期歌唱錄音，適合把注意力放在旋律和呼吸上。", "A classic moment: Baker's early 1954 vocal recording invites attention to melody and breath.")
      },
      {
        artist: "Tony Bennett · Bill Charlap", album: "Live in New York · August 2015", year: 2015,
        url: "https://www.youtube.com/watch?v=2Bjs0n29qTY",
        focus: text("人声与钢琴二重奏里，钢琴怎样同时照顾低音、和声与回应？与 Chet 的版本比较伴奏空间。", "人聲與鋼琴二重奏裡，鋼琴怎樣同時照顧低音、和聲與回應？與 Chet 的版本比較伴奏空間。", "In a voice-and-piano duo, how does the piano provide bass, harmony and responses? Compare its use of space with Baker's version.")
      }
    ]
  },
  {
    id: "embraceable-you", title: "Embraceable You", composer: "George Gershwin", year: 1930,
    song: embraceableYou,
    description: text(
      "慢速抒情曲适合练习等待、长音与呼吸。内置 32 小节主题，以每小节一个和弦简化伴奏；原谱的连音保留为长音，不要求初学者追逐复杂独奏。",
      "慢速抒情曲適合練習等待、長音與呼吸。內置 32 小節主題，以每小節一個和弦簡化伴奏；原譜的連音保留為長音，不要求初學者追逐複雜獨奏。",
      "A ballad for practising patience, sustained notes and breath. Its 32-bar theme keeps the source's ties, with one accompaniment chord per bar. Beginners can explore space without copying a complex solo."
    ),
    rights: scoreRights, sourceUrl: "https://freedjazz.org/tunes/embraceable-you/",
    recordings: [
      {
        artist: "Ella Fitzgerald · Nelson Riddle", album: "Ella Fitzgerald Sings the George and Ira Gershwin Song Book", year: 1959,
        url: "https://music.apple.com/us/song/embraceable-you/1469620608",
        focus: text("先记住第一句的旋律轮廓；听长音如何跨过伴奏的变化，再回到游戏留下同样长的呼吸。", "先記住第一句的旋律輪廓；聽長音如何跨過伴奏的變化，再回到遊戲留下同樣長的呼吸。", "Remember the contour of the opening phrase. Hear a held note over changing accompaniment, then leave a similarly long breath in the game.")
      },
      {
        artist: "Charlie Parker", album: "The Complete Savoy & Dial Master Takes", year: 2002,
        url: "https://www.youtube.com/watch?v=nbT4JlDmjxg",
        focus: text("先听 Ella 熟悉主题，再听 Parker 的新旋律线。目标是辨认乐句与留白，不是立即照弹他的音符。", "先聽 Ella 熟悉主題，再聽 Parker 的新旋律線。目標是辨認樂句與留白，不是立即照彈他的音符。", "Learn the theme from Ella, then hear Parker's new melodic line. Identify phrases and space; there is no need to reproduce his notes."),
        moment: text("经典时刻：1947 年 Dial 录音中的即兴重塑；入口为 2002 年发行的合辑。", "經典時刻：1947 年 Dial 錄音中的即興重塑；入口為 2002 年發行的合輯。", "A classic moment: melodic reinvention in Parker's 1947 Dial recording, linked here through the compilation released in 2002.")
      }
    ]
  },
  {
    id: "i-got-rhythm", title: "I Got Rhythm", composer: "George Gershwin", year: 1930,
    song: iGotRhythm,
    description: text(
      "从 AABA 的重复与转折入门 rhythm changes。内置谱源前 32 小节循环，省略反复与结尾 coda；每小节只取第一个和弦，并非原谱完整结尾。",
      "從 AABA 的重複與轉折入門 rhythm changes。內置譜源前 32 小節循環，省略反覆與結尾 coda；每小節只取第一個和弦，並非原譜完整結尾。",
      "Meet rhythm changes through the repetition and contrast of AABA. This loop uses the first 32 source bars, omits repeats and the coda, and keeps the first chord per bar; it is not the complete original ending."
    ),
    rights: scoreRights, sourceUrl: "https://freedjazz.org/tunes/i-got-rhythm/",
    recordings: [
      {
        artist: "Ella Fitzgerald · Nelson Riddle", album: "Ella Fitzgerald Sings the George and Ira Gershwin Song Book", year: 1959,
        url: "https://music.apple.com/us/song/i-got-rhythm/1469620864",
        focus: text("跟着主题拍手，听中段何时带来新的方向。再次回到熟悉旋律时，试着举手标记，不必读谱。", "跟著主題拍手，聽中段何時帶來新的方向。再次回到熟悉旋律時，試著舉手標記，不必讀譜。", "Clap along and notice when the middle section changes direction. Raise a hand when the familiar melody returns; no notation needed.")
      },
      {
        artist: "Oscar Peterson", album: "Oscar Peterson Plays George Gershwin", year: 1953,
        url: "https://open.spotify.com/album/0KFgCHlZfsDrremrORQ3PP",
        focus: text("打开专辑中的 I Got Rhythm：钢琴更忙时，试着继续跟住底下的稳定脉搏。比较主题重复时每一遍的细节。", "打開專輯中的 I Got Rhythm：鋼琴更忙時，試著繼續跟住底下的穩定脈搏。比較主題重複時每一遍的細節。", "Choose I Got Rhythm on this album. Keep following the underlying pulse as the piano becomes busier, and compare details when the theme repeats."),
        moment: text("版本提示：这是 1953 年发行的 Plays George Gershwin，和 1959 年的 Gershwin Song Book 是不同专辑。", "版本提示：這是 1953 年發行的 Plays George Gershwin，和 1959 年的 Gershwin Song Book 是不同專輯。", "Version note: this is Plays George Gershwin, released in 1953, a different album from the 1959 Gershwin Song Book.")
      }
    ]
  },
  {
    id: "autumn-leaves", title: "Autumn Leaves", composer: "Joseph Kosma", year: 1945,
    description: text("从两个编制聆听熟悉的旋律：管乐合奏与钢琴三重奏。只做聆听比较，不载入游戏。", "從兩個編制聆聽熟悉的旋律：管樂合奏與鋼琴三重奏。只做聆聽比較，不載入遊戲。", "Compare a horn-led ensemble with a piano trio through the same melody. A listening study only; it is not loaded into the game."),
    rights: listeningRights, sourceUrl: "https://www.bluenote.com/spotlight/cannonball-adderley-somethin-else/",
    recordings: [
      {
        artist: "Cannonball Adderley · Miles Davis", album: "Somethin’ Else", year: 1958,
        url: "https://www.bluenote.com/spotlight/cannonball-adderley-somethin-else/",
        focus: text("从开场进入主题，分辨小号与中音萨克斯的音色；留意一句话结束以后，其他乐器怎样回应。官方专辑页提供聆听入口。", "從開場進入主題，分辨小號與中音薩克斯的音色；留意一句話結束以後，其他樂器怎樣回應。官方專輯頁提供聆聽入口。", "As the opening leads into the theme, distinguish trumpet from alto saxophone. Notice what the other instruments do after a phrase. Listening links are on the official album page."),
        moment: text("经典时刻：1958 年 Somethin’ Else 的开场曲，听 Miles 与 Cannonball 的不同措辞。", "經典時刻：1958 年 Somethin’ Else 的開場曲，聽 Miles 與 Cannonball 的不同措辭。", "A classic moment: the opening track of Somethin’ Else (1958), with the contrasting phrasing of Miles and Cannonball.")
      },
      {
        artist: "Bill Evans Trio", album: "Portrait in Jazz", year: 1960,
        url: "https://billevans.bandcamp.com/album/portrait-in-jazz?t=2",
        focus: text("听低音与钢琴的对话：低音是否只在重复根音？在两次旋律之间，谁把音乐继续向前带？", "聽低音與鋼琴的對話：低音是否只在重複根音？在兩次旋律之間，誰把音樂繼續向前帶？", "Listen to the conversation between bass and piano. Is the bass only repeating roots? Who moves the music forward between melodic phrases?")
      }
    ]
  },
  {
    id: "so-what", title: "So What", composer: "Miles Davis", year: 1959,
    description: text("用短小的问答主题听懂合奏互动，再比较同曲录音室与现场的速度和密度。只提供聆听入口。", "用短小的問答主題聽懂合奏互動，再比較同曲錄音室與現場的速度和密度。只提供聆聽入口。", "Hear ensemble interaction in a short call-and-response theme, then compare tempo and density in studio and live versions. Listening links only."),
    rights: listeningRights, sourceUrl: "https://www.milesdavis.com/albums/kind-of-blue/",
    recordings: [
      {
        artist: "Miles Davis", album: "Kind of Blue", year: 1959,
        url: "https://www.milesdavis.com/albums/kind-of-blue/",
        focus: text("先听引子，再找到低音提出的短句与乐队的回答。尝试用两个拍手声代替回答，感受等待也是演奏。", "先聽引子，再找到低音提出的短句與樂隊的回答。嘗試用兩個拍手聲代替回答，感受等待也是演奏。", "After the introduction, find the bass call and the band's reply. Replace the reply with two claps and notice that waiting is part of playing."),
        moment: text("经典时刻：1959 年 Kind of Blue 的开场，低音也可以站到旋律前台。", "經典時刻：1959 年 Kind of Blue 的開場，低音也可以站到旋律前台。", "A classic moment: the opening of Kind of Blue (1959), where the bass comes to the melodic foreground.")
      },
      {
        artist: "Miles Davis", album: "‘Four’ & More: Recorded Live in Concert", year: 1966,
        url: "https://www.milesdavis.com/track/so-what-live-at-philharmonic-hall-new-york-ny-february-1964/",
        focus: text("这是 1964 年现场、1966 年发行的版本。比较相同主题怎样在更快的速度下改变能量；只跟住脉搏，不追每个音。", "這是 1964 年現場、1966 年發行的版本。比較相同主題怎樣在更快的速度下改變能量；只跟住脈搏，不追每個音。", "Recorded live in 1964 and released in 1966. Compare how the same theme changes energy at a faster tempo; follow the pulse rather than every note.")
      }
    ]
  },
  {
    id: "take-five", title: "Take Five", composer: "Paul Desmond", year: 1959,
    description: text("把 5/4 拍感受为 3＋2，比较萨克斯与吉他版本。本游戏伴奏引擎为 4/4，因此这首保留为聆听活动。", "把 5/4 拍感受為 3＋2，比較薩克斯與吉他版本。本遊戲伴奏引擎為 4/4，因此這首保留為聆聽活動。", "Feel 5/4 as 3 + 2 and compare saxophone and guitar versions. The game's accompaniment engine uses 4/4, so this is a listening activity."),
    rights: listeningRights, sourceUrl: "https://www.davebrubeck.com/dave-brubecks-time-out",
    recordings: [
      {
        artist: "The Dave Brubeck Quartet", album: "Time Out", year: 1959,
        url: "https://www.youtube.com/watch?v=ryA6eHZNnXY",
        focus: text("对着重复伴奏轻数 1–2–3、1–2。萨克斯暂停时，拍子是否仍然继续？听鼓如何成为主角。", "對著重複伴奏輕數 1–2–3、1–2。薩克斯暫停時，拍子是否仍然繼續？聽鼓如何成為主角。", "Count 1–2–3, 1–2 over the repeating accompaniment. Does the pulse continue when the saxophone stops? Hear the drums take the spotlight."),
        moment: text("经典时刻：1959 年 Time Out，把不寻常的五拍子带进一段容易记住的旋律。", "經典時刻：1959 年 Time Out，把不尋常的五拍子帶進一段容易記住的旋律。", "A classic moment: Time Out (1959) pairs an unusual five-beat metre with a memorable tune.")
      },
      {
        artist: "George Benson", album: "Bad Benson", year: 1974,
        url: "https://www.youtube.com/watch?v=dV3N-jisAoY",
        focus: text("换成吉他主奏后，旋律的起音与尾音有什么不同？比较两个版本的律动与留白，用三个形容词记录感觉。", "換成吉他主奏後，旋律的起音與尾音有什麼不同？比較兩個版本的律動與留白，用三個形容詞記錄感覺。", "With guitar leading, how do notes begin and end differently? Compare groove and space in the two versions and describe the difference in three words.")
      }
    ]
  }
];

// Preserve verified recordings and dates for the original featured entries.
// Autumn Leaves and So What gain licensed changes without duplicate tune cards.
const featuredKeys = new Set(FEATURED_REPERTOIRE.map(entry => standardTitleKey(entry.title)));
export const REPERTOIRE: RepertoireEntry[] = [
  ...FEATURED_REPERTOIRE.map((entry): RepertoireEntry => {
    if (entry.song) return { ...entry, kind: 'score' };
    const chart = STANDARD_CHARTS.find(candidate => standardTitleKey(candidate.title) === standardTitleKey(entry.title));
    if (!chart) return { ...entry, kind: 'listening' };
    return { ...chart, id: entry.id, title: entry.title, composer: entry.composer, year: entry.year, recordings: entry.recordings };
  }),
  ...STANDARD_CHARTS.filter(entry => !featuredKeys.has(standardTitleKey(entry.title))),
];
