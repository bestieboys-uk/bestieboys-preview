/* BESTIEBOYS: LAST WALK — restrained SFX over The Corpse soundtrack */
import { startSoundtrack, setSoundtrackMuted } from './soundtrack.js?v=1.2.2';
let ctx = null, master = null, muted = false;

export function initAudio() {
  if (ctx) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.14;
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
  shoot() {},
  hit() {},
  crit() { tone(760, 0.06, 'triangle', 0.045, 100); },
  kill() { tone(180, 0.08, 'triangle', 0.055, -60); },
  xp() {},
  level() { tone(330, 0.08, 'sine', 0.07); setTimeout(() => tone(495, 0.10, 'sine', 0.065), 80); },
  hurt() { tone(92, 0.13, 'triangle', 0.09, -32); },
  nova() { tone(160, 0.16, 'sine', 0.08, -55); },
  lightning() { noise(0.05, 0.04, 1200); },
  missile() { tone(220, 0.09, 'triangle', 0.045, 80); },
  beam() {},
  boss() { tone(72, 0.28, 'triangle', 0.10, -12); },
  evolve() { tone(392, 0.08, 'sine', 0.06); setTimeout(() => tone(587, 0.12, 'sine', 0.055), 90); },
  buy() { tone(440, 0.06, 'sine', 0.06); tone(660, 0.07, 'sine', 0.05); },
  ui() { tone(360, 0.025, 'sine', 0.025); },
  death() { tone(110, 0.32, 'triangle', 0.10, -60); },
};
