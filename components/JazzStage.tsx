"use client";

import { useId, type KeyboardEvent } from "react";
import { createTranslator, type Locale } from "../lib/i18n";
import "../app/stage.css";

type Instrument = "piano" | "bass" | "drums" | "sax" | "guitar";

type JazzStageProps = {
  locale?: Locale;
  band: Instrument[];
  playing: boolean;
  beat: number;
  scene: "club" | "rooftop" | "studio";
  player: string | null;
  onSelect: (instrument: Instrument) => void;
};

const musicians: { id: Instrument; name: string; role: string; x: number; y: number }[] = [
  { id: "piano", name: "钢琴", role: "PIANO", x: 169, y: 307 },
  { id: "guitar", name: "吉他", role: "GUITAR", x: 350, y: 317 },
  { id: "drums", name: "爵士鼓", role: "DRUMS", x: 500, y: 285 },
  { id: "sax", name: "萨克斯", role: "SAXOPHONE", x: 657, y: 313 },
  { id: "bass", name: "低音提琴", role: "BASS", x: 831, y: 307 },
];

function Face({ skin = "#edbb90", eyes = "#302622", smile = true }: { skin?: string; eyes?: string; smile?: boolean }) {
  return <>
    <ellipse cx="0" cy="-67" rx="28" ry="30" fill={skin} />
    <ellipse cx="-27" cy="-64" rx="5" ry="8" fill={skin} />
    <ellipse cx="27" cy="-64" rx="5" ry="8" fill={skin} />
    <path d="M-15-66q5-5 10 0M7-66q5-5 10 0" fill="none" stroke={eyes} strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="-17" cy="-58" rx="6" ry="3" fill="#b36c5d" opacity=".36" />
    <ellipse cx="17" cy="-58" rx="6" ry="3" fill="#b36c5d" opacity=".36" />
    <path d={smile ? "M-5-50q6 6 12-1" : "M-4-50q5 2 10-1"} fill="none" stroke="#80533d" strokeWidth="1.8" strokeLinecap="round" />
    <path d="m1-64-2 8 4 1" fill="none" stroke="#bd8765" strokeWidth="1.5" strokeLinecap="round" />
  </>;
}

function PianoPlayer() {
  return <>
    <ellipse cx="25" cy="69" rx="120" ry="14" fill="#181a16" opacity=".24" />
    <path d="M-35 36h62v9h-62zM-30 43l-5 28M21 43l4 28" fill="#5b332b" stroke="#302825" strokeWidth="6" />
    <g className="jazz-body-bob">
      <path d="M-14 20v27l35 11 21-3-22-20 3-18M9 23l15 25 35 9 14-5-36-20-2-16" fill="#303837" stroke="#232b2c" strokeWidth="3" strokeLinejoin="round" />
      <path d="m23 48-5 11 33 6q7-1 4-7l-16-5M57 46l-6 11 30 5q8-3 2-8l-15-4" fill="#292522" />
      <path d="M-20-38q-14 12-15 40l11 25 43 3 13-13-9-53z" fill="#814e3a" stroke="#492f2a" strokeWidth="2" />
      <path d="m-8-37 9 43 12-40" fill="#ebd8b7" />
      <path d="m-12-37-5 13 12 9-6 11 15 23M15-37l7 14-9 8 10 6-13 27" fill="none" stroke="#ae7957" strokeWidth="3" />
      <path d="M-6-43v12q8 7 16-1v-15" fill="#daa17a" />
      <g transform="rotate(8 0 -65)">
        <Face />
        <path d="M-30-63q-10-37 14-45 27-14 46 13l-1 29-10-12-1-12q-3 12-18 15l3-15q-13 17-26 15l2 16z" fill="#663d30" />
        <path d="M-27-96q15-17 33-9M-19-91q17-16 33-9" fill="none" stroke="#955b3d" strokeWidth="4" strokeLinecap="round" />
      </g>
      <path className="jazz-piano-arm" d="m-21-25 2 29 42 9 5-11-29-11 1-14" fill="#814e3a" stroke="#492f2a" strokeWidth="2" />
      <path className="jazz-piano-arm jazz-delay" d="m18-28 20 25 36 5-1 10-47-6-23-20" fill="#956447" stroke="#492f2a" strokeWidth="2" />
      <path d="m21 3 10 1 10 7-18 4M71 1l11 3 9 8-20-1" fill="#edbb90" />
    </g>
    <path d="M33 12v65M147 12l8 65" stroke="#272a26" strokeWidth="8" />
    <path d="M28 15h130V-5H28z" fill="#4b4433" />
    <path d="M37 1h116v10H37z" fill="#e5d2ac" />
    <path d="M40 11h119l-4 10H31z" fill="#302e26" />
    <path d="M56-48q21-53 72-22l36 65H38z" fill="#292d28" stroke="#1e251f" strokeWidth="3" />
    <path d="M60-46q22-37 62-20l35 57H42z" fill="#3e4335" />
    <path d="m56-46 103 37" stroke="#c2914f" strokeWidth="2" />
    <path d="M35-4h128v7H30z" fill="#be9051" />
    {Array.from({ length: 20 }, (_, i) => <path key={i} d={`M${40 + i * 5.5} 2v8`} stroke="#756b54" strokeWidth=".8" />)}
    {[0, 1, 3, 4, 5, 7, 8, 10, 11, 12, 14, 15, 17, 18].map(i => <path key={i} d={`M${44 + i * 5.5} 2v5`} stroke="#302d25" strokeWidth="2.6" />)}
    <path d="M120-60v54" stroke="#ab824c" strokeWidth="2" />
    <path d="m81 24 2 36h17M90 62h15" fill="none" stroke="#a58b58" strokeWidth="3" />
    <circle cx="40" cy="78" r="3" fill="#bda16c" /><circle cx="155" cy="78" r="3" fill="#bda16c" />
  </>;
}

function GuitarPlayer() {
  return <>
    <ellipse cx="1" cy="64" rx="54" ry="9" fill="#171d1a" opacity=".22" />
    <g className="jazz-body-bob">
      <path d="m-20 8-7 39 2 14 16-2 10-38 7 37 15 2 1-21-6-28" fill="#383b37" stroke="#282d2b" strokeWidth="2" />
      <path d="m-27 54-8 9q3 7 24 1l2-11M9 55l1 12h26q1-6-13-12" fill="#252c2b" />
      <path d="M-20-38q-11 8-16 43l14 14 42 1L33-1q-4-29-15-38" fill="#b89659" stroke="#735a3f" strokeWidth="2" />
      <path d="m-11-36 5 36 18-35" fill="#d8cfac" />
      <path d="M-7-46v14q7 8 15-1v-11" fill="#d29b75" />
      <path d="M-28-66q-10 27-10 43l17 4 16-38 23 37 19-5-9-48" fill="#33494b" />
      <Face skin="#e9b38c" />
      <path d="M-31-59q-8-41 18-47 37-9 45 25l-4 26-9-17-3-16q-11 15-27 10l-11 24z" fill="#344b4d" />
      <path d="M-24-92q13-12 26-9M-28-74l-1 18M22-81l7 19" fill="none" stroke="#68837b" strokeWidth="4" strokeLinecap="round" />
      <path d="m-17-96 27-7 10 9-28 8z" fill="#c6ad72" />
      <path d="m-18-35 36 52" stroke="#584738" strokeWidth="6" />
      <g transform="rotate(-27 0 0)">
        <path d="M-9-9q-12-7-19 6-3 6-1 13-15 7-11 22 7 20 33 17Q21 47 18 29q-1-10-10-14 6-9 2-15-5-8-19-9" fill="#ae6938" stroke="#6c422a" strokeWidth="2.5" />
        <path d="M-12-6q-9-4-12 5 6 14-9 17-8 20 14 27 24 7 33-8" fill="none" stroke="#d5a569" strokeWidth="3" />
        <path d="M-4 13 44-10l-5-8L-9 3z" fill="#563c2e" stroke="#b28a55" strokeWidth="2" />
        <path d="m38-18 16-9 4 7-15 11z" fill="#9b603a" stroke="#583d2d" strokeWidth="2" />
        {[0, 1, 2].map(i => <path key={i} d={`m${43+i*4}-${20+i*2} -2-3m${4} ${8} 2 3`} stroke="#cbbd8b" strokeWidth="2" />)}
        <ellipse cx="-6" cy="15" rx="7" ry="8" fill="#473426" />
        <path d="m-23 28 8 4M-19 25 64-51M-17 27 66-51M-15 29 68-51" fill="none" stroke="#dbc19a" strokeWidth=".8" opacity=".8" />
        <path d="M12 2v7M22-2v6M31-7v6" stroke="#b09b77" strokeWidth="1.4" />
      </g>
      <path d="m-23-25-10 17 21 14 8-8-14-12" fill="#b89659" stroke="#735a3f" strokeWidth="2" />
      <path className="jazz-guitar-hand" d="m-13-1 10-2 10 7-4 6-13-3z" fill="#e9b38c" />
      <path d="m23-24 14 1 9-11-5-8-13 9-9-1" fill="#b89659" stroke="#735a3f" strokeWidth="2" />
      <path d="m39-36 1-10 9-2 5 7-9 9" fill="#e9b38c" />
    </g>
  </>;
}

function Drummer() {
  return <>
    <ellipse cx="0" cy="79" rx="110" ry="15" fill="#171d1a" opacity=".24" />
    <g className="jazz-body-bob">
      <path d="M-25-29q23-14 50 0l7 49h-64z" fill="#dbcfad" stroke="#a49172" strokeWidth="2" />
      <path d="m-18-28 9 43h19l10-43" fill="#525b51" />
      <path d="M-7-44v14q7 7 15 0v-16" fill="#b9815d" />
      <Face skin="#c58e66" />
      <path d="M-30-61q-6-7-2-16-10-13 2-19-1-16 14-15 8-15 21-6 15-6 20 7 16 3 11 15 8 10-2 21l-10 5-6-16q-10 5-20-3-10 10-19 5l-3 17z" fill="#342d27" />
      <path d="M-22-100q4-6 10-5M0-108q5-5 11 0M22-97q7 1 6 9" fill="none" stroke="#645042" strokeWidth="4" strokeLinecap="round" />
      <path d="M-29-74q0-29 27-29t28 29" fill="none" stroke="#bf9d65" strokeWidth="4" />
      <rect x="-32" y="-78" width="9" height="22" rx="4" fill="#a67f4f" /><rect x="24" y="-78" width="9" height="22" rx="4" fill="#a67f4f" />
      <g className="jazz-drum-arm-left">
        <path d="m-22-28-20 22-22-5-5 10 32 10 30-26" fill="#dbcfad" stroke="#a49172" strokeWidth="2" />
        <path d="m-66-11-7-4-9 7 7 9 9-2" fill="#c58e66" />
        <path d="m-75-9-16-36" stroke="#d8bb83" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g className="jazz-drum-arm-right">
        <path d="m24-27 12 27 28-12 6 10-38 23-23-30" fill="#dbcfad" stroke="#a49172" strokeWidth="2" />
        <path d="m63-13 5-8 11 3 1 11-12 4" fill="#c58e66" />
        <path d="m72-13 21-34" stroke="#d8bb83" strokeWidth="3" strokeLinecap="round" />
      </g>
    </g>
    <path d="M-81-3v75m0-12-19 17m19-17 17 17M88-6v78m0-12-19 17m19-17 17 17" stroke="#9b977b" strokeWidth="3" fill="none" strokeLinecap="round" />
    <g className="jazz-cymbal"><ellipse cx="-81" cy="-5" rx="38" ry="6" fill="#c7a267" stroke="#8d724b" strokeWidth="2" /><ellipse cx="-81" cy="-7" rx="8" ry="4" fill="#d7bd84" /><path d="M-81-15v9" stroke="#423e30" strokeWidth="2" /></g>
    <g className="jazz-cymbal jazz-delay"><ellipse cx="88" cy="-10" rx="37" ry="7" fill="#c7a267" stroke="#8d724b" strokeWidth="2" /><ellipse cx="88" cy="-12" rx="8" ry="4" fill="#d7bd84" /><path d="M88-20v9" stroke="#423e30" strokeWidth="2" /></g>
    <path d="M-70 29v32M-47 30v41M43 31v41M68 28v37" stroke="#b6b295" strokeWidth="3" />
    <path d="M-70 7v25q22 14 42 0V7M27 7v25q24 14 43-1V7" fill="#8e5b42" stroke="#b7966b" strokeWidth="2" />
    <ellipse cx="-49" cy="7" rx="22" ry="9" fill="#d2c6a4" stroke="#e2d5b0" strokeWidth="3" />
    <ellipse cx="49" cy="7" rx="22" ry="9" fill="#d2c6a4" stroke="#e2d5b0" strokeWidth="3" />
    <path d="M-65 16v16M-36 17v17M35 17v17M64 15v17" stroke="#d2c49f" strokeWidth="3" />
    <ellipse cx="0" cy="45" rx="48" ry="45" fill="#835338" stroke="#b99a69" strokeWidth="4" />
    <ellipse cx="0" cy="45" rx="41" ry="39" fill="#e0d2ae" stroke="#c9b78f" strokeWidth="3" />
    <text x="0" y="40" textAnchor="middle" fontSize="9" fontFamily="Georgia, serif" letterSpacing="2" fill="#75694d">BLUE</text>
    <text x="0" y="54" textAnchor="middle" fontSize="12" fontFamily="Georgia, serif" letterSpacing="1.6" fill="#75694d">HOUR</text>
    <circle cx="22" cy="62" r="8" fill="#464838" />
    <path d="m-37 70-11 19M37 70l11 19" stroke="#b2a98a" strokeWidth="3" />
  </>;
}

function SaxPlayer() {
  return <>
    <ellipse cx="4" cy="72" rx="51" ry="10" fill="#171d1a" opacity=".22" />
    <g className="jazz-body-bob">
      <path d="m-18 17-5 38-1 14 14 1 12-42 8 30 12 8 8-8-11-42" fill="#404540" stroke="#262f2c" strokeWidth="2" />
      <path d="m-23 63-9 8q2 8 23 3l1-11M18 58l-3 13 26 2q4-6-9-10" fill="#292d29" />
      <path d="M-23-34q-13 16-10 37l15 20 41-3 11-19q0-22-15-35" fill="#d5c29c" stroke="#96836a" strokeWidth="2" />
      <path d="m-16-34-3 54 17-3 20 3-4-54-13 15z" fill="#49483b" stroke="#343e34" strokeWidth="2" />
      <path d="M-7-42v12l8 11 8-12v-13" fill="#e1ad7d" />
      <path d="m-5-28 6 9 7-10M1-18l-3 25 7 5 3-9-5-21" fill="#985b3d" />
      <g transform="rotate(-9 0 -67)">
        <Face skin="#efc394" smile={false} />
        <path d="M-28-59q-13-27 7-40l28-2 22 19-3 24-9-11 1-14q-11 9-20 4l-3-9-15 16-1 15" fill="#b78b54" />
        <path d="M-33-86q-6-24 31-28 31-4 41 16l-7 10-49 4" fill="#9b5f44" stroke="#774932" strokeWidth="2" />
        <path d="m-28-86 52-4 4 7-54 5z" fill="#664932" />
        <path d="m8-112 6-6 6 3" fill="none" stroke="#7f4b35" strokeWidth="3" />
        <path d="M-8-97q14-8 30-2" stroke="#bd8260" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <path d="m-10-28 27 35 2-38" fill="none" stroke="#8a744f" strokeWidth="2" />
      <g className="jazz-sax-instrument">
        <path d="m11-50 14 5-3 22-13 41q-7 22 10 27 20 6 25-19l5-25" fill="none" stroke="#876d38" strokeWidth="13" strokeLinejoin="round" />
        <path d="m11-50 14 5-3 22-13 41q-7 22 10 27 20 6 25-19l5-25" fill="none" stroke="#c8a461" strokeWidth="9" strokeLinejoin="round" />
        <path d="M43 5 41-5q8-6 21-2l-9 17z" fill="#cba86a" stroke="#856b39" strokeWidth="2" />
        <ellipse cx="52" cy="-6" rx="11" ry="5" transform="rotate(-10 52 -6)" fill="#746140" stroke="#dfbd79" strokeWidth="2" />
        <path d="m17-27-14 43" stroke="#e1c486" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map(i => <circle key={i} cx={18-i*2} cy={-21+i*7} r="2.7" fill="#e0c583" stroke="#947741" strokeWidth="1" />)}
        <path d="m8-51 6 1" stroke="#33382e" strokeWidth="5" strokeLinecap="round" />
      </g>
      <path d="m-21-29-4 26 30 16 5-11-19-16 6-11M26-25l12 20-14 24-11-5L25-5 15-16" fill="#d5c29c" stroke="#96836a" strokeWidth="2" />
      <path d="m5 3 11 4-2 9-10-2M17 12l9 3-3 9-12-1" fill="#efc394" />
    </g>
  </>;
}

function BassPlayer() {
  return <>
    <ellipse cx="16" cy="77" rx="70" ry="11" fill="#171d1a" opacity=".22" />
    <g className="jazz-body-bob">
      <path d="m-17 12-8 42-4 18 14 1L1 33l6 38 15 3 1-22-3-36" fill="#b3a684" stroke="#7f7961" strokeWidth="2" />
      <path d="m-28 67-8 8q2 9 22 3l1-11M7 68l-1 11h25q4-5-12-10" fill="#34372e" />
      <path d="M-21-41q-19 14-17 40l17 23 43-2 9-22q-4-27-14-40" fill="#667563" stroke="#3e5146" strokeWidth="2" />
      <path d="m-10-40 2 56 14 3 7-57" fill="#c7b28a" />
      <path d="m-15-40-7 13 9 10-5 13M18-40l7 13-10 8 6 12" stroke="#86947a" strokeWidth="3" fill="none" />
      <path d="M-7-47v13q8 7 16-1v-11" fill="#b57c58" />
      <Face skin="#ce966c" />
      <path d="M-29-64q-12-33 9-41 30-14 48 12l3 23-9 7-4-21q-25 10-39-1l-2 24" fill="#3e352b" />
      <path d="M-22-51q19 13 41-2l-4 15q-16 12-32-1z" fill="#49392e" />
      <path d="M-5-44q7 3 12-2" stroke="#dfb18a" strokeWidth="2" fill="none" />
      <g stroke="#5f5a43" strokeWidth="2" fill="#dfd5a3" fillOpacity=".15"><circle cx="-12" cy="-66" r="10" /><circle cx="13" cy="-66" r="10" /><path d="M-2-67h5M-22-69h-7M23-69h6" /></g>
      <path d="m-32-90 64-1q4-5-5-8l-6-18-41 1-5 18q-11 2-7 8" fill="#a0916a" stroke="#77694c" strokeWidth="2" />
      <path d="m-24-103 50-1 3 7-57 2z" fill="#4e594a" />
    </g>
    <g className="jazz-bass-instrument">
      <path d="M51 57v22" stroke="#c3b087" strokeWidth="3" />
      <path d="M52-31q-15-13-25 2-7 12 2 24-16 8-14 24-1 27 33 35 35 5 44-21 6-18-13-31 13-11 7-26-9-18-27-10" fill="#9c603c" stroke="#5b412c" strokeWidth="3" />
      <path d="M47-25q-12-8-17 4 8 20-3 22-15 14-2 32 9 16 29 15 31 2 32-23" fill="none" stroke="#c78b53" strokeWidth="3" />
      <path d="m48 19 8-111 10 1-7 111" fill="#493a2b" stroke="#c4a06c" strokeWidth="2" />
      <path d="m55-95 2-29q11-13 20-5 8 10-7 13l-4 23z" fill="#a76d40" stroke="#5b412c" strokeWidth="2.5" />
      <path d="m60-127 9-1-4 7" fill="none" stroke="#d1a56c" strokeWidth="2" />
      <path d="M51-112h9M68-115h10M50-102h9M68-104h9" stroke="#c8af7c" strokeWidth="3" strokeLinecap="round" />
      <path d="m46 22 15 1-2 5-15-1z" fill="#dcbb80" />
      <path d="m45 43 15 1-5 9-7-1z" fill="#382e26" />
      {[0,1,2,3].map(i => <path key={i} d={`m${49+i*2} 46 ${9} -147`} stroke="#e3cfa0" strokeWidth=".6" opacity=".8" />)}
      <path d="M34 11q-8-3-4 6l-3 11q-5 6-9 1M74 11q7-1 3 6l-2 13q1 6 7 5" fill="none" stroke="#4d3728" strokeWidth="2.5" strokeLinecap="round" />
    </g>
    <path d="m-24-31-5 30L34 9l6-11-47-12 4-11" fill="#667563" stroke="#3e5146" strokeWidth="2" />
    <path className="jazz-bass-hand" d="m32-3 11 0 10 7-2 7-20-3" fill="#ce966c" />
    <path d="m22-33 24-10 9-22-9-4-12 17-18 6" fill="#667563" stroke="#3e5146" strokeWidth="2" />
    <path d="m46-65 7-14 10 2-3 15-10 6" fill="#ce966c" />
  </>;
}

const characters = { piano: PianoPlayer, guitar: GuitarPlayer, drums: Drummer, sax: SaxPlayer, bass: BassPlayer };

export default function JazzStage({ band, playing, beat, scene, player, onSelect, locale = "zh-CN" }: JazzStageProps) {
  const t = createTranslator(locale);
  const id = useId().replace(/:/g, "");
  const keySelect = (event: KeyboardEvent<SVGGElement>, instrument: Instrument) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(instrument); }
  };
  return <div className={`jazz-stage jazz-scene-${scene} ${playing ? "jazz-is-playing" : ""}`} data-beat={beat % 4}>
    <svg viewBox="0 0 1000 440" role="group" aria-label={t("蓝调时刻爵士舞台。选择乐手，体验不同乐器的合奏角色。")} className="jazz-stage-svg">
      <defs>
        <linearGradient id={`${id}-wall`} x2="0" y2="1"><stop stopColor={scene === "rooftop" ? "#253c3e" : "#363a30"} /><stop offset="1" stopColor="#555440" /></linearGradient>
        <linearGradient id={`${id}-floor`} x2="0" y2="1"><stop stopColor="#807252" /><stop offset="1" stopColor="#aa8b61" /></linearGradient>
        <linearGradient id={`${id}-light`} x2="0" y2="1"><stop stopColor="#efd599" stopOpacity=".25" /><stop offset="1" stopColor="#efd599" stopOpacity="0" /></linearGradient>
        <radialGradient id={`${id}-glow`}><stop stopColor="#f4d597" stopOpacity=".24" /><stop offset="1" stopColor="#f4d597" stopOpacity="0" /></radialGradient>
        <pattern id={`${id}-grain`} width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".6" fill="#ece0bf" opacity=".09" /><circle cx="5" cy="5" r=".5" fill="#161f1b" opacity=".14" /></pattern>
        <pattern id={`${id}-panels`} width="68" height="200" patternUnits="userSpaceOnUse"><path d="M0 0v200M5 0v200" stroke="#161f1a" strokeOpacity=".15" strokeWidth="2" /></pattern>
      </defs>
      <rect width="1000" height="440" fill={`url(#${id}-wall)`} />
      {scene === "rooftop" ? <>
        <circle cx="800" cy="78" r="24" fill="#e5d2a4" opacity=".85" />
        <circle cx="809" cy="70" r="24" fill="#293f40" />
        {Array.from({length: 19}, (_, i) => <circle key={i} cx={60+i*49} cy={25+(i*37)%118} r={i%3 === 0 ? 1.5 : .8} fill="#d7d8bc" opacity=".7" />)}
        <path d="M0 254v-73h55v23h39v-75h41v21h22v55h48v-56h38v-29h35v106h60v-50h53v33h48v-100h44v-26h37v137h53v-52h33v-24h45v67h65v-65h53v-29h33v84h41v-113h60v65h29v-38h44v71h59v-43h53v111z" fill="#1b2b2a" opacity=".56" />
        <path d="M0 231h1000M0 255h1000" stroke="#88917a" strokeOpacity=".35" strokeWidth="3" />
        {Array.from({length: 14}, (_, i) => <path key={i} d={`M${i*79} 231v92`} stroke="#26382e" strokeWidth="7" />)}
      </> : <>
        <rect width="1000" height="335" fill={`url(#${id}-panels)`} />
        <path d="M53 326V123q0-69 69-69h756q69 0 69 69v203" fill="none" stroke="#bda36b" strokeOpacity=".36" strokeWidth="2" />
        <path d="M66 326V127q0-60 62-60h744q62 0 62 60v199" fill="none" stroke="#bda36b" strokeOpacity=".25" strokeWidth="1" />
        <path d="M77 0v325M87 0v325M914 0v325M924 0v325" stroke="#af9762" strokeOpacity=".15" strokeWidth="3" />
        {scene === "studio" && <g opacity=".38">{[95, 265, 665, 835].map(x => <g key={x}><rect x={x} y="118" width="60" height="143" rx="3" fill="#222d28" />{[0,1,2,3,4].map(i => <path key={i} d={`M${x+9+i*10} 126v126`} stroke="#8b8464" strokeWidth="3" />)}</g>)}</g>}
      </>}
      <ellipse cx="500" cy="160" rx="410" ry="230" fill={`url(#${id}-glow)`} />
      <g opacity=".9" aria-hidden="true">
        <text x="500" y="109" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="43" letterSpacing="12" fill="#d7bf8d">BLUE HOUR</text>
        <path d="M386 131h59m111 0h59" stroke="#c6aa72" strokeWidth="1" opacity=".6" />
        <text x="500" y="135" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" letterSpacing="4" fill="#bba77a">JAZZ CLUB</text>
        <path d="m492 149 8 5 8-5-8 11z" fill="#c3a36c" opacity=".8" />
      </g>
      <path d="M0 318q500 43 1000 0v122H0z" fill={`url(#${id}-floor)`} />
      <path d="M0 354q500 21 1000 0M0 390h1000M0 428h1000" stroke="#534d38" strokeOpacity=".23" strokeWidth="1.5" />
      {[25,170,315,460,605,750,895].map(x => <path key={x} d={`M${x+30} 339 ${x-30} 440`} stroke="#504b38" strokeOpacity=".2" />)}
      <ellipse cx="504" cy="350" rx="358" ry="48" fill="#584e39" opacity=".25" />
      <ellipse cx="500" cy="339" rx="168" ry="36" fill="#756648" stroke="#b39b67" strokeWidth="2" />
      <ellipse cx="500" cy="339" rx="151" ry="28" fill="none" stroke="#ab9463" strokeOpacity=".5" strokeWidth="2" strokeDasharray="2 5" />
      {[185, 500, 805].map((x, i) => <g key={x}>
        <path d={`M${x-14} 12 ${x-125} 336 ${x+130} 336 ${x+14} 12z`} fill={`url(#${id}-light)`} opacity={i===1 ? .8 : 1} />
        <path d={`M${x} 0v21`} stroke="#202b24" strokeWidth="3" />
        <path d={`m${x-18} 30 6-14h24l6 14z`} fill="#202b24" />
        <ellipse cx={x} cy="31" rx="18" ry="4" fill="#e8c588" />
      </g>)}
      <g aria-hidden="true" opacity=".85">
        <path d="M27 358v-80m-2 47q-35-22-18-50 22 7 20 36m3-3q-6-46 18-61 24 24-14 56m-4 17q29-38 43-21 8 22-42 36" fill="#4c5a3b" stroke="#3d4b34" strokeWidth="2" />
        <path d="M9 340h40l-6 38H16z" fill="#9c7752" /><path d="M11 347h36" stroke="#b5966d" strokeWidth="3" />
        <path d="M968 356v-69m0 26q-37-24-26-45 28-1 27 37m1 17q-2-54 24-51 10 26-23 54m-1 9q-33-10-27-30 26 1 27 22" fill="#4c5a3b" stroke="#3d4b34" strokeWidth="2" />
        <path d="M948 344h41l-7 36h-27z" fill="#9c7752" /><path d="M950 351h37" stroke="#b5966d" strokeWidth="3" />
      </g>
      {/* The drummer is drawn behind the front line, as on a real small stage. */}
      {[musicians[2], musicians[0], musicians[1], musicians[3], musicians[4]].map(m => {
        const Character = characters[m.id];
        const present = band.includes(m.id);
        const selected = player === m.id;
        return <g key={m.id} transform={`translate(${m.x} ${m.y})`}>
          <g className={`jazz-musician jazz-musician-${m.id} ${present ? "jazz-present" : "jazz-absent"} ${selected ? "jazz-selected" : ""}`} role="button" tabIndex={0} aria-label={t("{instrument}乐手，{status}", { instrument: t(m.name), status: [!present ? t("休息中") : "", t(selected ? "当前角色" : "点击选择角色")].filter(Boolean).join(" · ") })} aria-pressed={selected} onClick={() => onSelect(m.id)} onKeyDown={event => keySelect(event, m.id)}>
            <ellipse className="jazz-selection-ring" cx={m.id === "piano" ? 20 : 5} cy={m.id === "drums" ? 85 : 77} rx={m.id === "piano" ? 84 : m.id === "drums" ? 99 : 55} ry="12" fill="none" stroke="#f0d49a" strokeWidth="2" strokeDasharray="3 5" />
            <rect className="jazz-hit-area" x={m.id === "piano" ? -70 : m.id === "drums" ? -113 : -55} y="-130" width={m.id === "piano" ? 232 : m.id === "drums" ? 226 : 145} height="221" rx="30" fill="transparent" />
            <Character />
            {playing && present && <g className="jazz-notes" fill="#e4c994" aria-hidden="true"><text x={m.id === "piano" ? 60 : 33} y="-121" fontSize="20">♪</text><text className="jazz-note-second" x={m.id === "piano" ? 83 : 52} y="-140" fontSize="14">♫</text></g>}
          </g>
        </g>;
      })}
      <rect width="1000" height="440" fill={`url(#${id}-grain)`} pointerEvents="none" />
      <path d="M0 403h1000v37H0z" fill="#252f29" fillOpacity=".14" pointerEvents="none" />
      {musicians.map(m => <g key={m.id} transform={`translate(${m.x+(m.id === "piano" ? 28 : 0)} 418)`} className={`jazz-stage-label ${band.includes(m.id) ? "" : "jazz-label-muted"}`} pointerEvents="none">
        {player === m.id && <circle cx="-34" cy="-3" r="3" fill="#f5e2b8" />}
        <text x="0" y="0" textAnchor="middle" fontSize="10" letterSpacing="2" fill="#f0e1bd" fontFamily="Arial, sans-serif">{band.includes(m.id) ? t(m.name) : t("休息中")}</text>
        {player === m.id && <text x="0" y="14" textAnchor="middle" fontSize="8" letterSpacing="2" fill="#eed7a4">{t("你的角色")}</text>}
      </g>)}
    </svg>
    <span className="jazz-stage-caption"><span className={playing ? "jazz-live-dot jazz-live-dot-active" : "jazz-live-dot"} />{t(playing ? "LIVE SESSION" : "THE STAGE IS YOURS")}</span>
    <span className="jazz-scene-caption">{t(scene === "club" ? "01 / THE LIVING ROOM" : scene === "rooftop" ? "02 / UNDER THE STARS" : "03 / THE RECORDING ROOM")}</span>
  </div>;
}
