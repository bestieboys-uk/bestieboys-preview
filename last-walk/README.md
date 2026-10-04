# BESTIEBOYS: LAST WALK

A portrait mobile bridge squad shooter built with bundled Three.js/WebGL. It runs from static files served over HTTP(S); there is no build step, account, external CDN, or online API.

## Play and install

Serve this folder over HTTPS, or use localhost for development. Open `index.html`, drag left/right to steer, and let the squad fire automatically. Pass pet and upgrade gates, shoot HP blockers and breed hordes, then defeat the Rottweiler, Pit Bull, and XL Bully bosses in that order. On iPhone Safari, use Share → Add to Home Screen to install the PWA.

For a local check: `python -m http.server 8080`, then visit `http://localhost:8080/`.

## Source and assets

The latest downloadable game source in the supplied conversation was V2.3 (`download.zip`). V5.1/V6/V6.1 appeared only as links from a temporary host and were unavailable. This build keeps the V2.3 BestieBoys save key and the approved Gerrard, Onion, Sylvester, Vega, Ben, and Kysa images, while implementing the later described stage architecture and 3D presentation. The pet images are unchanged. The app icon uses text because a canonical corporate logo was not resolved.

The offline renderer is Three.js 0.186.1. Its MIT licence is included in `js/vendor/THREE-LICENSE.txt`.

## Data

Progress, Distro upgrades, and character choice are stored locally in the browser under `bestieboys_last_walk_v1`. Clear Save Data in the Distro resets only this game key. The service worker caches the game and pet images for offline return visits after a successful online load.
