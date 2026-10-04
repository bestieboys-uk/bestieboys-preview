/* BESTIEBOYS: LAST WALK — offline shell cache */
const CACHE = 'bestieboys-last-walk-3d-1.0.4';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/game.js',
  './js/constants.js',
  './js/characters.js',
  './js/audio.js',
  './js/save.js',
  './js/world3d.js',
  './js/dog3d.js',
  './js/vendor/three.module.js',
  './js/vendor/three.core.js',
  './js/upgrades.js',
  './js/ui.js',
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
