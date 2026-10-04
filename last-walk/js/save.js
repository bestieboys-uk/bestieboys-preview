/* localStorage meta progression — BestieBoys: Last Walk */
const KEY = 'bestieboys_last_walk_v1';

const DEFAULT = {
  currency: 0,
  highScore: 0,
  bestTime: 0,
  bestCompletion: 0, // best successful victory time (lower is better; 0 = none)
  victories: 0,
  totalKills: 0,
  runs: 0,
  selectedCharacter: 'gerrard',
  unlockedCharacters: ['gerrard', 'onion', 'sylvester', 'vega', 'ben', 'kysa'],
  meta: {
    startHp: 0,
    damage: 0,
    xpGain: 0,
    moveSpeed: 0,
    startWeapon: 0,
    pickup: 0,
    armour: 0,
    regen: 0,
  },
  muted: false,
};

export function load() {
  try {
    let raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT);
    const d = JSON.parse(raw);
    return {
      ...structuredClone(DEFAULT),
      ...d,
      meta: { ...DEFAULT.meta, ...(d.meta || {}) },
      unlockedCharacters: d.unlockedCharacters || DEFAULT.unlockedCharacters,
    };
  } catch {
    return structuredClone(DEFAULT);
  }
}

export function save(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (_) {}
}

export function resetAll() {
  try {
    localStorage.removeItem(KEY);
  } catch (_) {}
  return structuredClone(DEFAULT);
}

export { DEFAULT, KEY };
