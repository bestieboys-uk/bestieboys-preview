/* BESTIEBOYS: LAST WALK — offline shell cache */
const CACHE = 'bestieboys-last-walk-3d-1.4.3';
const ASSETS = [
  './',
  './index.html',
  './css/style.css?v=1.4.3',
  './js/game.js?v=1.4.3',
  './js/constants.js',
  './js/characters.js',
  './js/audio.js?v=1.4.3',
  './js/soundtrack.js?v=1.4.3',
  './js/save.js',
  './js/world3d.js?v=1.4.3',
  './js/dog3d.js?v=1.4.3',
  './js/vendor/three.module.js',
  './js/vendor/three.core.js',
  './js/upgrades.js',
  './js/ui.js?v=1.4.3',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './assets/pets/gerrard.png',
  './assets/pets/onion.png',
  './assets/pets/sylvester.png',
  './assets/pets/vega.png',
  './assets/pets/ben.png',
  './assets/pets/kysa.png',
  './assets/pets/portraits/gerrard.png',
  './assets/pets/portraits/onion.png',
  './assets/pets/portraits/sylvester.png',
  './assets/pets/portraits/vega.png',
  './assets/pets/portraits/ben.png',
  './assets/pets/portraits/kysa.png',
  './assets/pets/faces/gerrard.webp',
  './assets/pets/faces/onion.webp',
  './assets/pets/faces/sylvester.webp',
  './assets/pets/faces/vega.webp',
  './assets/pets/faces/ben.webp',
  './assets/pets/faces/kysa.webp',
  './assets/cards/gerrard.webp',
  './assets/cards/onion.webp',
  './assets/cards/sylvester.webp',
  './assets/cards/vega.webp',
  './assets/cards/ben.webp',
  './assets/cards/kysa.webp',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetched = fetch(e.request)
        .then((res) => {
          if (res && res.ok && new URL(e.request.url).origin === self.location.origin) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetched;
    })
  );
});
