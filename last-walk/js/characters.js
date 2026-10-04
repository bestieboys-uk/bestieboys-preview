/* Six BestieBoys pets — modest class differences. Art from locked V2 sources. */
export const CHARACTERS = [
  {
    id: 'gerrard',
    name: 'GERRARD',
    tagline: 'Balanced street survivor',
    color: '#c4b896',
    accent: '#8b1a1a',
    mods: {},
  },
  {
    id: 'onion',
    name: 'ONION',
    tagline: 'Faster on the pavement',
    color: '#d4a860',
    accent: '#6a5030',
    mods: { moveSpeed: 1.12 },
  },
  {
    id: 'sylvester',
    name: 'SYLVESTER',
    tagline: 'Hits harder, swings slower',
    color: '#9a8a78',
    accent: '#5a4030',
    mods: { damage: 1.18, fireRate: 0.88 },
  },
  {
    id: 'vega',
    name: 'VEGA',
    tagline: 'Quick attacks & projectiles',
    color: '#b0a090',
    accent: '#704040',
    mods: { fireRate: 1.14, projectileSpeed: 1.12 },
  },
  {
    id: 'ben',
    name: 'BEN',
    tagline: 'Tankier — more HP & armour',
    color: '#8a9080',
    accent: '#405040',
    mods: { maxHp: 1.2, armour: 0.06 },
  },
  {
    id: 'kysa',
    name: 'KYSA',
    tagline: 'Crits & close-range bite',
    color: '#c09070',
    accent: '#803020',
    mods: { critChance: 0.08, closeRangeDmg: 1.15 },
  },
];

export function getCharacter(id) {
  return CHARACTERS.find((c) => c.id === id) || CHARACTERS[0];
}
