(() => {
  const savedArtwork = new Set([
    'assets/concepts/black-metal-frostbite-portrait',
    'assets/concepts/black-metal-ritual-hound',
    'assets/concepts/black-metal-northern-apparition',
    'assets/concepts/grindcore-blast-portrait',
    'assets/concepts/grindcore-noise-wall',
    'assets/concepts/grindcore-one-second-legend',
    'assets/concepts/goregrind-canine-pathology',
    'assets/concepts/goregrind-dissection-club',
    'assets/concepts/goregrind-terminal-good-boy',
    'assets/concepts/crust-no-masters-only-gerrard',
    'assets/concepts/powerviolence-gerrard-no-peace',
    'assets/concepts/gore-noise-signal-rot-gerrard',
    'assets/concepts/death-doom-eternal-weight'
  ]);

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
    const savedCount = genre.items.filter(([, , base]) => savedArtwork.has(base)).length;
    const section = document.createElement('details');
    section.className = 'legacy-matrix-genre';
    if (genreIndex === 0) section.open = true;
    section.innerHTML = `
      <summary>
        <div class="legacy-matrix-meta">
          <small>${genre.code}</small>
          <h3>${genre.name}</h3>
          <p>${genre.desc}</p>
        </div>
        <div class="legacy-matrix-count"><b>${savedCount}/3 saved</b><span>3 concepts</span></div>
      </summary>
      <div class="legacy-matrix-grid"></div>`;

    const grid = section.querySelector('.legacy-matrix-grid');

    genre.items.forEach(([code,name,base,format,palette,role]) => {
      const hasArtwork = savedArtwork.has(base);
      const artworkUrl = `${base}.webp?v=designlab6`;
      const thumb = hasArtwork
        ? `<div class="legacy-concept-thumb"><img src="${artworkUrl}" alt="${name} Bestie Boys saved development artwork" loading="eager" decoding="async"></div>`
        : '';
      const detailMedia = hasArtwork
        ? `<div class="legacy-art-slot"><img src="${artworkUrl}" alt="${name} Bestie Boys development artwork" loading="lazy" decoding="async"></div>`
        : `<div class="legacy-missing-note"><strong>Artwork not saved</strong>This concept brief exists in the archive, but there is no artwork file for it in the repository yet.</div>`;

      const concept = document.createElement('details');
      concept.className = `legacy-matrix-concept${hasArtwork ? ' has-saved-artwork' : ' is-brief-only'}`;
      concept.innerHTML = `
        <summary>
          <div class="legacy-concept-top">
            <span class="legacy-concept-code">${code}</span>
            <span class="legacy-concept-status">${hasArtwork ? 'SAVED ARTWORK' : 'BRIEF ONLY'}</span>
          </div>
          <h4>${name}</h4>
          <div class="legacy-concept-chips"><span>${format}</span><span>${palette}</span></div>
          ${thumb}
        </summary>
        <div class="legacy-concept-body">
          ${detailMedia}
          <div class="legacy-specs">
            <div class="legacy-spec"><b>Format</b><span>${format}</span></div>
            <div class="legacy-spec"><b>Palette</b><span>${palette}</span></div>
            <div class="legacy-spec"><b>Role</b><span>${role}</span></div>
          </div>
        </div>`;
      grid.appendChild(concept);
    });

    root.appendChild(section);
  });
})();
