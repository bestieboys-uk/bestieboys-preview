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

  const studies = [
    {code:'01 / BLACK METAL',name:'Black Metal',desc:'Raw xerox, ritual artefact and atmospheric minimalism.',items:[
      {code:'BM-A / LAUNCH PICK',name:'Frostbite Portrait',base:'assets/concepts/black-metal-frostbite-portrait',format:'Tee / Longsleeve',palette:'Black + Bone',role:'Most wearable / launch candidate'},
      {code:'BM-B',name:'Ritual Hound',base:'assets/concepts/black-metal-ritual-hound',format:'Longsleeve / Hoodie',palette:'Bone + Oxblood',role:'Collector / enthusiast'},
      {code:'BM-C',name:'Northern Apparition',base:'assets/concepts/black-metal-northern-apparition',format:'Oversized / Hoodie',palette:'Cool Grey',role:'Fashion crossover'}
    ]},
    {code:'02 / GRINDCORE',name:'Grindcore',desc:'Photocopy density, brutal information overload and flyer-grade reproduction damage.',items:[
      {code:'GR-A / LAUNCH PICK',name:'Blast Portrait',base:'assets/concepts/grindcore-blast-portrait',format:'Short Sleeve',palette:'Dirty White',role:'DIY launch'},
      {code:'GR-B',name:'Noise Wall',base:'assets/concepts/grindcore-noise-wall',format:'Heavy Tee / Hoodie',palette:'White + Grey',role:'Scene credibility'},
      {code:'GR-C',name:'One Second Legend',base:'assets/concepts/grindcore-one-second-legend',format:'Longsleeve',palette:'Bone White',role:'Memorable / wearable'}
    ]},
    {code:'03 / GOREGRIND',name:'Goregrind',desc:'Pathology, clinical annotation, medical collage and grotesque-but-wearable print language.',items:[
      {code:'GG-A / LAUNCH PICK',name:'Canine Pathology',base:'assets/concepts/goregrind-canine-pathology',format:'Longsleeve',palette:'Bone + Red',role:'Credibility + wearability'},
      {code:'GG-B',name:'Dissection Club',base:'assets/concepts/goregrind-dissection-club',format:'Oversized Tee',palette:'Red + Green',role:'Visual / social'},
      {code:'GG-C',name:'Terminal Good Boy',base:'assets/concepts/goregrind-terminal-good-boy',format:'Tee / Zip Hoodie',palette:'Black + Bone',role:'Extreme underground'}
    ]},
    {code:'04 / CRUST PUNK',name:'Crust Punk',desc:'Stencil propaganda, D-beat abrasion, xerox war-collage logic and one-colour DIY energy.',items:[
      {code:'CR-A / LAUNCH PICK',name:'No Masters / Only Gerrard',base:'assets/concepts/crust-no-masters-only-gerrard',format:'Short Sleeve',palette:'Dirty White',role:'Crossover crust'},
      {code:'CR-B',name:'Total Canine Collapse',format:'Long / Zip',palette:'Bone + Red',role:'D-beat / scene'},
      {code:'CR-C',name:'System Failure: Gerrard',format:'Fitted / Tee',palette:'White + Acid',role:'Lighter visual weight'},
      {code:'CP-B / SOURCE PAGE',name:'Kennel State',render:{page:'crust-punk.html',selector:'.cp-system-card.cp-kennel'},format:'Longsleeve / Zip Hoodie',palette:'Black / Dirty White / Rust',role:'Rendered vertical layout study'},
      {code:'CP-C / SOURCE PAGE',name:'Scavenger Standard',render:{page:'crust-punk.html',selector:'.cp-system-card.cp-standard'},format:'Cap / Fitted Tee / Sticker',palette:'Single Ink / Off-register',role:'Rendered type-led patch study'}
    ]},
    {code:'05 / POWERVIOLENCE',name:'Powerviolence',desc:'Brutal reduction, giant typography, sudden scale shifts and deliberate confrontation.',items:[
      {code:'PV-A / LAUNCH PICK',name:'Gerrard // No Peace',base:'assets/concepts/powerviolence-gerrard-no-peace',format:'Heavy Tee',palette:'Dirty White',role:'Overall launch'},
      {code:'PV-B',name:'Ten Second Icon',format:'Longsleeve',palette:'Bone',role:'Fashion-forward'},
      {code:'PV-C',name:'Gerrard vs. Everything',format:'Tee / Hoodie / Sticker',palette:'White + Red',role:'Content / social'},
      {code:'PV-B / SOURCE PAGE',name:'Full Stop',render:{page:'powerviolence.html',selector:'.pv-system-card.pv-fullstop'},format:'Longsleeve / Zip Hoodie',palette:'Black / Dirty White / Orange',role:'Rendered severe crop layout study'},
      {code:'PV-C / SOURCE PAGE',name:'Pressure Block',render:{page:'powerviolence.html',selector:'.pv-system-card.pv-pressure'},format:'Cap / Fitted Tee / Sticker',palette:'Single / Two Ink',role:'Rendered type-led layout study'}
    ]},
    {code:'06 / GORE NOISE',name:'Gore Noise',desc:'Broken reproduction, scan damage, anti-design, illegibility and corrupted visual information.',items:[
      {code:'GN-A / LAUNCH PICK',name:'Signal Rot: Gerrard',base:'assets/concepts/gore-noise-signal-rot-gerrard',format:'Oversized Tee',palette:'Filthy Grey',role:'Fashion / design'},
      {code:'GN-B',name:'Gurgle Transmission',format:'Longsleeve',palette:'White + Dark Red',role:'Scene-authentic'},
      {code:'GN-C',name:'Unlistenable Good Boy',format:'Tee / Sticker',palette:'Black + White',role:'Social / viral'},
      {code:'GN-B / SOURCE PAGE',name:'Dead Channel',render:{page:'gore-noise.html',selector:'.gn-system-card.gn-dead'},format:'Longsleeve / Zip Hoodie',palette:'Black / Dirty White / Magenta',role:'Rendered scan-band layout study'},
      {code:'GN-C / SOURCE PAGE',name:'Carrier Loss',render:{page:'gore-noise.html',selector:'.gn-system-card.gn-carrier'},format:'Cap / Fitted Tee / Sticker',palette:'Single Ink / Dropout',role:'Rendered type / signal study'}
    ]},
    {code:'07 / RAP BOOTLEG',name:'Rap Bootleg',desc:'Oversized tribute-shirt composition, layered portrait hierarchy and original bootleg energy.',items:[
      {code:'RB-A / SOURCE PAGE',name:'Forever Headliner',render:{page:'rap-bootleg.html',selector:'.rb-system-card.rb-headliner'},format:'Tee / Pullover',palette:'Full Colour',role:'Rendered primary tribute layout'},
      {code:'RB-B / SOURCE PAGE',name:'Good Boy World Tour',render:{page:'rap-bootleg.html',selector:'.rb-system-card.rb-tour'},format:'Longsleeve / Zip Hoodie / Tee',palette:'Four-to-six Colour',role:'Rendered front + back tour layout'},
      {code:'RB-C / SOURCE PAGE',name:'Big Face Edition',render:{page:'rap-bootleg.html',selector:'.rb-system-card.rb-bigface'},format:'Fitted Tee / Tee / Sticker',palette:'Three-to-five Colour',role:'Rendered simplified bootleg layout'}
    ]},
    {code:'08 / DEATH + DOOM',name:'Death / Doom',desc:'Gothic weight, monumental illustration, mournful space and slower, heavier composition.',items:[
      {code:'DD-A / LAUNCH PICK',name:'Eternal Weight',base:'assets/concepts/death-doom-eternal-weight',format:'Heavy Tee / Hoodie',palette:'Bone + Bronze',role:'Death/Doom launch'},
      {code:'DD-B',name:'The Good Boy Never Dies',format:'Zip Hoodie',palette:'Bone + Oxblood',role:'Memorial crossover'},
      {code:'DD-C',name:'Crypt Hound',format:'Longsleeve',palette:'Grey + Moss',role:'Collector'}
    ]}
  ];

  const root = document.querySelector('[data-legacy-matrix]');
  if (!root) return;

  const typeOf = item => item.base && savedArtwork.has(item.base) ? 'saved' : item.render ? 'rendered' : 'brief';
  const slug = value => value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');

  function specs(item){
    return `<div class="legacy-specs">
      <div class="legacy-spec"><b>Format</b><span>${item.format}</span></div>
      <div class="legacy-spec"><b>Palette</b><span>${item.palette}</span></div>
      <div class="legacy-spec"><b>Role</b><span>${item.role}</span></div>
    </div>`;
  }

  function makeRenderedPreview(item){
    return `<div class="legacy-live-preview" data-live-preview data-page="${item.render.page}" data-selector="${item.render.selector}"><div class="legacy-live-preview__loading">Open this study to load its actual rendered source-page design.</div></div>`;
  }

  function loadRenderedStudy(concept){
    const host = concept.querySelector('[data-live-preview]');
    if (!host || host.dataset.loaded === 'true') return;
    host.dataset.loaded = 'true';
    const page = host.dataset.page;
    const selector = host.dataset.selector;
    host.innerHTML = '<div class="legacy-live-preview__loading">Loading rendered study…</div>';
    const frame = document.createElement('iframe');
    frame.title = `${concept.querySelector('h4')?.textContent || 'Genre'} rendered layout study`;
    frame.loading = 'lazy';
    frame.src = `${page}?design-lab-embed=1`;
    host.appendChild(frame);

    frame.addEventListener('load', () => {
      try {
        const doc = frame.contentDocument;
        const target = doc?.querySelector(selector);
        if (!doc || !target) throw new Error('Study target not found');

        doc.querySelectorAll('script').forEach(script => script.remove());
        doc.body.replaceChildren(target);
        doc.body.style.margin = '0';
        doc.body.style.padding = '0';
        doc.body.style.background = '#080808';
        doc.documentElement.style.background = '#080808';

        const embedStyle = doc.createElement('style');
        embedStyle.textContent = `
          html,body{width:100%!important;min-height:0!important;overflow:hidden!important;background:#080808!important}
          body>*{margin:0!important;max-width:none!important;width:100%!important}
          .reveal{opacity:1!important;transform:none!important;visibility:visible!important}
          header,.header,.announcement,.footer,footer{display:none!important}
        `;
        doc.head.appendChild(embedStyle);

        const resize = () => {
          const h = Math.max(target.scrollHeight, target.getBoundingClientRect().height, doc.body.scrollHeight);
          if (h > 0) frame.style.height = `${Math.ceil(h + 4)}px`;
        };
        doc.querySelectorAll('img').forEach(img => {
          if (!img.complete) img.addEventListener('load', resize, {once:true});
        });
        if ('ResizeObserver' in window) new ResizeObserver(resize).observe(target);
        requestAnimationFrame(() => requestAnimationFrame(resize));
        host.querySelector('.legacy-live-preview__loading')?.remove();
        host.classList.add('is-loaded');
      } catch (_) {
        host.classList.add('is-error');
        host.innerHTML = '<strong>Rendered study could not be embedded here.</strong>';
      }
    }, {once:true});
  }

  studies.forEach((genre, genreIndex) => {
    const counts = genre.items.reduce((acc,item) => { acc[typeOf(item)]++; return acc; }, {saved:0,rendered:0,brief:0});
    const section = document.createElement('details');
    section.className = 'legacy-matrix-genre';
    section.id = `archive-${slug(genre.name)}`;
    if (genreIndex === 0) section.open = true;
    section.innerHTML = `
      <summary>
        <div class="legacy-matrix-meta"><small>${genre.code}</small><h3>${genre.name}</h3><p>${genre.desc}</p></div>
        <div class="legacy-matrix-count"><b>${genre.items.length} studies</b><span>${counts.saved} saved • ${counts.rendered} rendered • ${counts.brief} brief</span></div>
      </summary>
      <div class="legacy-matrix-grid"></div>`;

    const grid = section.querySelector('.legacy-matrix-grid');

    genre.items.forEach(item => {
      const type = typeOf(item);
      const concept = document.createElement('details');
      concept.className = `legacy-matrix-concept ${type === 'saved' ? 'has-saved-artwork' : type === 'rendered' ? 'is-rendered-layout' : 'is-brief-only'}`;
      concept.id = `study-${slug(item.name)}`;

      let thumb = '';
      let bodyMedia = '';
      let status = 'BRIEF ONLY';
      if (type === 'saved') {
        const url = `${item.base}.webp?v=designlab7`;
        status = 'SAVED ARTWORK';
        thumb = `<div class="legacy-concept-thumb"><img src="${url}" alt="${item.name} Bestie Boys saved development artwork" loading="eager" decoding="async"></div>`;
        bodyMedia = `<div class="legacy-art-slot"><img src="${url}" alt="${item.name} Bestie Boys development artwork" loading="lazy" decoding="async"></div>`;
      } else if (type === 'rendered') {
        status = 'RENDERED LAYOUT';
        thumb = `<div class="legacy-rendered-thumb"><div><strong>Live source-page study</strong><span>${item.name} is implemented in HTML/CSS and can be viewed here without pretending it is a saved artwork file.</span></div><b>↗</b></div>`;
        bodyMedia = makeRenderedPreview(item);
      }

      concept.innerHTML = `
        <summary>
          <div class="legacy-concept-top"><span class="legacy-concept-code">${item.code}</span><span class="legacy-concept-status">${status}</span></div>
          <h4>${item.name}</h4>
          <div class="legacy-concept-chips"><span>${item.format}</span><span>${item.palette}</span></div>
          ${thumb}
        </summary>
        <div class="legacy-concept-body">${bodyMedia}${specs(item)}</div>`;

      if (type === 'rendered') concept.addEventListener('toggle', () => { if (concept.open) loadRenderedStudy(concept); });
      grid.appendChild(concept);
    });

    root.appendChild(section);
  });

  function openHashTarget(){
    if (!location.hash || location.hash === '#legacy-matrix') return;
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!target) return;
    if (target.classList.contains('legacy-matrix-genre')) target.open = true;
    if (target.classList.contains('legacy-matrix-concept')) {
      const genre = target.closest('.legacy-matrix-genre');
      if (genre) genre.open = true;
      target.open = true;
      if (target.classList.contains('is-rendered-layout')) loadRenderedStudy(target);
    }
    requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
  }

  requestAnimationFrame(openHashTarget);
  window.addEventListener('hashchange', openHashTarget);
})();
