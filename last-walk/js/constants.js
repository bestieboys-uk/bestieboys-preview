/* BESTIEBOYS: LAST WALK — V2.3 Evony-style bridge wave */
export const W = { logic: 390, maxDPR: 2 };

export const COLORS = {
  bg: '#4ec4f0',
  bgDeep: '#2a9fd4',
  ground: '#8a8e96',
  groundLight: '#b0b4bc',
  water: '#3eb4e8',
  waterDeep: '#1e8fc4',
  cream: '#ffffff',
  creamDim: '#e8f4ff',
  charcoal: '#1a3040',
  ink: '#0a2030',
  blood: '#e02060',
  bloodBright: '#ff2a6a',
  paper: '#ffffff',
  white: '#ffffff',
  muted: '#5a7080',
  xp: '#4cff8a',
  armour: '#60c0ff',
  gold: '#ffd040',
  danger: '#ff3040',
  cyan: '#00e8ff',
  cyanDim: '#40c8f0',
  magenta: '#ff40a0',
  violet: '#c040ff',
  enemyRed: '#ff2858',
  enemyPink: '#ff50a0',
  enemyDark: '#c01848',
  gate: '#00e8ff',
};

export const PLAYER = {
  radius: 18,
  speed: 260,
  maxHp: 100,
  invulnMs: 700,
  pickupRadius: 80,
  xpMagnet: 180,
  // Locked to bottom ~15% of canvas
  bandTop: 0.82,
  bandBottom: 0.94,
};

export const DIFF = {
  spawnBase: 0.28,
  spawnMin: 0.05,
  spawnRamp: 0.0004,
  hpScale: 0.012,
  dmgScale: 0.008,
  eliteChanceBase: 0.02,
  eliteChanceMax: 0.18,
};

export const BOSS_TIMES = [180, 360, 600];
export const META_COST = [40, 80, 140, 220, 320, 450, 600, 800];
export const RARITY = {
  COMMON: { w: 60, color: '#70a0c0' },
  RARE:   { w: 30, color: '#40c8ff' },
  EPIC:   { w: 10, color: '#ff40a0' },
};
export const CURRENCY = 'SCRAPS';

export function bridgeGeom(w, h) {
  const topW = Math.min(w * 0.34, 140);
  const botW = Math.min(w * 0.88, 380);
  return {
    topW, botW,
    topL: (w - topW) / 2,
    topR: (w + topW) / 2,
    botL: (w - botW) / 2,
    botR: (w + botW) / 2,
  };
}

export function bridgeXAt(w, h, y) {
  const g = bridgeGeom(w, h);
  const t = Math.max(0, Math.min(1, y / Math.max(1, h)));
  const left = g.topL + (g.botL - g.topL) * t;
  const right = g.topR + (g.botR - g.topR) * t;
  return { left, right, mid: (left + right) / 2, width: right - left };
}
