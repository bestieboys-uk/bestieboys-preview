(() => {
  const genres = [
    {code:'01 / BLACK METAL',name:'Black Metal',desc:'Raw xerox, ritual artefact and atmospheric minimalism. Three deliberately different systems.',items:[
      ['BM-A / LAUNCH PICK','Frostbite Portrait','assets/concepts/black-metal-frostbite-portrait','Tee / Longsleeve','Black + Bone','Most wearable / launch candidate'],
      ['BM-B','Ritual Hound','assets/concepts/black-metal-ritual-hound','Longsleeve / Hoodie','Bone + Oxblood','Collector / enthusiast'],
      ['BM-C','Northern Apparition','assets/concepts/black-metal-northern-apparition','Oversized / Hoodie','Cool Grey','Fashion crossover']]},
    {code:'02 / GRINDCORE',name:'Grindcore',desc:'Photocopy density, brutal information overload, frantic scale shifts and flyer-grade reproduction damage.',items:[
      ['GR-A / LAUNCH PICK','Blast Portrait','assets/concepts/grindcore-blast-portrait','Short Sleeve','Dirty White','DIY launch'],
      ['GR-B','Noise Wall','assets/concepts/grindcore-noise-wall','Heavy Tee / Hoodie','White + Grey','Scene credibility'],
      ['GR-C','One Second Legend','assets/concepts/grindcore-one-second-legend','Longsleeve','Bone White','Memorable / wearable']]},
    {code:'03 / GOREGRIND',name:'Goregrind',desc:'Pathology, clinical annotation, medical collage and grotesque-but-wearable print language.',items:[
      ['GG-A / LAUNCH PICK','Canine Pathology','assets/concepts/goregrind-canine-pathology','Longsleeve','Bone + Red','Credibility + wearability'],
      ['GG-B','Dissection Club','assets/concepts/goregrind-dissection-club','Oversized Tee','Red + Green','Visual / social'],
      ['GG-C','Terminal Good Boy','assets/concepts/goregrind-terminal-good-boy','Tee / Zip Hoodie','Black + Bone','Extreme underground']]},
    {code:'04 / CRUST PUNK',name:'Crust Punk',desc:'Stencil propaganda, D-beat abrasion, xerox war-collage logic and one-colour DIY energy.',items:[
      ['CR-A / LAUNCH PICK','No Masters / Only Gerrard','assets/concepts/crust-no-masters-only-gerrard','Short Sleeve','Dirty White','Crossover crust'],
      ['CR-B','Total Canine Collapse','assets/concepts/crust-total-canine-collapse','Long / Zip','Bone + Red','D-beat / scene'],
      ['CR-C','System Failure: Gerrard','assets/concepts/crust-system-failure-gerrard','Fitted / Tee','White + Acid','Lighter visual weight']]},
    {code:'05 / POWERVIOLENCE',name:'Powerviolence',desc:'Brutal reduction, giant typography, sudden scale shifts and deliberate confrontation.',items:[
      ['PV-A / LAUNCH PICK','Gerrard // No Peace','assets/concepts/powerviolence-gerrard-no-peace','Heavy Tee','Dirty White','Overall launch'],
      ['PV-B','Ten Second Icon','assets/concepts/powerviolence-ten-second-icon','Longsleeve','Bone','Fashion-forward'],
      ['PV-C','Gerrard vs. Everything','assets/concepts/powerviolence-gerrard-vs-everything','Tee / Hoodie / Sticker','White + Red','Content / social']]},
    {code:'06 / GORE NOISE',name:'Gore Noise',desc:'Broken reproduction, scan damage, anti-design, illegibility and corrupted visual information.',items:[
      ['GN-A / LAUNCH PICK','Signal Rot: Gerrard','assets/concepts/gore-noise-signal-rot-gerrard','Oversized Tee','Filthy Grey','Fashion / design'],
      ['GN-B','Gurgle Transmission','assets/concepts/gore-noise-gurgle-transmission','Longsleeve','White + Dark Red','Scene-authentic'],
      ['GN-C','Unlistenable Good Boy','assets/concepts/gore-noise-unlistenable-good-boy','Tee / Sticker','Black + White','Social / viral']]},
    {code:'07 / DEATH + DOOM',name:'Death / Doom',desc:'Gothic weight, monumental illustration, mournful space and slower, heavier composition.',items:[
      ['DD-A / LAUNCH PICK','Eternal Weight','assets/concepts/death-doom-eternal-weight','Heavy Tee / Hoodie','Bone + Bronze','Death/Doom launch'],
      ['DD-B','The Good Boy Never Dies','assets/concepts/death-doom-good-boy-never-dies','Zip Hoodie','Bone + Oxblood','Memorial crossover'],
      ['DD-C','Crypt Hound','assets/concepts/death-doom-crypt-hound','Longsleeve','Grey + Moss','Collector']]}
  ];

  const root = document.querySelector('[data-legacy-matrix]');
  if (!root) return;

  genres.forEach((genre, genreIndex) => {
    const section = document.createElement('details');
    section.className = 'legacy-matrix-genre';
    if (genreIndex === 0) section.open = true;
    section.innerHTML = `<summary><div class="legacy-matrix-meta"><small>${genre.code}</small><h3>${genre.name}</h3><p>${genre.desc}</p></div><div class="legacy-matrix-count">3 concepts</div></summary><div class="legacy-matrix-grid"></div>`;
    const grid = section.querySelector('.legacy-matrix-grid');

    genre.items.forEach(([code,name,base,format,palette,role]) => {
      const concept = document.createElement('details');
      concept.className = 'legacy-matrix-concept';
      concept.innerHTML = `<summary><div class="legacy-concept-top"><span class="legacy-concept-code">${code}</span><span class="legacy-concept-status">CHECKING ARTWORK</span></div><h4>${name}</h4><div class="legacy-concept-chips"><span>${format}</span><span>${palette}</span></div></summary><div class="legacy-concept-body"><div class="legacy-art-slot"><img src="${base}.webp?v=designlab2" alt="${name} Bestie Boys development artwork" loading="lazy"><div class="legacy-art-placeholder" hidden><strong>Brief only</strong><small>No saved artwork file: ${base}</small></div></div><div class="legacy-specs"><div class="legacy-spec"><b>Format</b><span>${format}</span></div><div class="legacy-spec"><b>Palette</b><span>${palette}</span></div><div class="legacy-spec"><b>Role</b><span>${role}</span></div></div></div>`;
      const img = concept.querySelector('img');
      const status = concept.querySelector('.legacy-concept-status');
      const placeholder = concept.querySelector('.legacy-art-placeholder');
      img.addEventListener('load', () => { status.textContent = 'SAVED ARTWORK'; img.hidden = false; placeholder.hidden = true; }, {once:true});
      img.addEventListener('error', () => { status.textContent = 'BRIEF ONLY'; img.hidden = true; placeholder.hidden = false; }, {once:true});
      grid.appendChild(concept);
    });
    root.appendChild(section);
  });
})();