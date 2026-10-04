/* BESTIEBOYS: LAST WALK — Web Audio SFX */
let ctx = null, master = null, muted = false;

export function initAudio() {
  if (ctx) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.35;
  master.connect(ctx.destination);
}

export function resumeAudio() {
  initAudio();
  if (ctx && ctx.state === 'suspended') ctx.resume();
}

export function setMuted(m) { muted = m; }
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
  shoot() { tone(660, 0.06, 'square', 0.08, -200); },
  hit() { tone(180, 0.08, 'triangle', 0.2, -80); noise(0.04, 0.08, 400); },
  crit() { tone(880, 0.1, 'sawtooth', 0.15, 200); tone(1320, 0.08, 'sine', 0.1); },
  kill() { tone(320, 0.12, 'triangle', 0.18, -250); },
  xp() { tone(920, 0.05, 'sine', 0.1, 400); },
  level() { tone(440, 0.1, 'sine', 0.2); setTimeout(() => tone(660, 0.12, 'sine', 0.2), 80); setTimeout(() => tone(880, 0.18, 'sine', 0.22), 160); },
  hurt() { tone(120, 0.2, 'sawtooth', 0.25, -60); noise(0.15, 0.2, 200); },
  nova() { tone(200, 0.25, 'sine', 0.25, -100); noise(0.2, 0.15, 100); },
  lightning() { noise(0.08, 0.2, 1500); tone(1400, 0.05, 'square', 0.1); },
  missile() { tone(280, 0.15, 'sawtooth', 0.12, 180); },
  beam() { tone(520, 0.04, 'sine', 0.06); },
  boss() { tone(80, 0.4, 'sawtooth', 0.3, -20); tone(160, 0.35, 'triangle', 0.2); },
  evolve() { tone(523, 0.15, 'sine', 0.25); setTimeout(() => tone(784, 0.2, 'sine', 0.25), 100); setTimeout(() => tone(1046, 0.3, 'sine', 0.28), 220); },
  buy() { tone(600, 0.08, 'sine', 0.15); tone(900, 0.1, 'sine', 0.12); },
  ui() { tone(500, 0.04, 'sine', 0.08); },
  death() { tone(200, 0.5, 'sawtooth', 0.3, -150); noise(0.4, 0.25, 80); },
};
