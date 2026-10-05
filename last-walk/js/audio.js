/* BESTIEBOYS: LAST WALK — restrained SFX over The Corpse soundtrack */
import { startSoundtrack, setSoundtrackMuted } from './soundtrack.js?v=1.3.1';
let ctx = null, master = null, muted = false;
const lastCue = new Map();
function cue(name, gap){const now=performance.now();if(now-(lastCue.get(name)||0)<gap)return false;lastCue.set(name,now);return true;}

export function initAudio() {
  if (ctx) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.28;
  master.connect(ctx.destination);
}

export function resumeAudio() {
  initAudio();
  if (ctx && ctx.state === 'suspended') ctx.resume();
  startSoundtrack();
}

export function setMuted(m) { muted = m; setSoundtrackMuted(m); }
export function isMuted() { return muted; }

function tone(freq, dur, type = 'sine', vol = 0.3, slide = 0) {
  if (!ctx || muted) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g); g.connect(master);
  o.start(t); o.stop(t + dur + 0.02);
}

function noise(dur, vol = 0.15, hp = 800) {
  if (!ctx || muted) return;
  const n = Math.ceil(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = 'highpass'; f.frequency.value = hp;
  const g = ctx.createGain();
  g.gain.value = vol;
  src.connect(f); f.connect(g); g.connect(master);
  src.start();
}

export const SFX = {
  shoot() { if(cue('shoot',380))tone(125,0.035,'triangle',0.12,-18); },
  hit() { if(cue('hit',170))tone(88,0.055,'sine',0.14,-14); },
  crit() { if(cue('crit',420))tone(285,0.075,'triangle',0.14,65); },
  kill() { if(cue('kill',220))tone(160,0.10,'triangle',0.16,-48); },
  xp() {},
  level() { tone(220,0.08,'sine',0.16);setTimeout(()=>tone(330,0.11,'sine',0.14),80); },
  hurt() { if(cue('hurt',300))tone(92,0.16,'triangle',0.20,-34); },
  nova() { tone(160, 0.16, 'sine', 0.08, -55); },
  lightning() { noise(0.05, 0.04, 1200); },
  missile() { tone(220, 0.09, 'triangle', 0.045, 80); },
  beam() {},
  boss() { if(cue('boss',700))tone(64,0.30,'triangle',0.22,-8); },
  evolve() { tone(392, 0.08, 'sine', 0.06); setTimeout(() => tone(587, 0.12, 'sine', 0.055), 90); },
  buy() { tone(380,0.07,'sine',0.13);tone(520,0.09,'sine',0.11); },
  ui() { if(cue('ui',100))tone(260,0.035,'sine',0.10); },
  death() { tone(110,0.38,'triangle',0.22,-60); },
};
