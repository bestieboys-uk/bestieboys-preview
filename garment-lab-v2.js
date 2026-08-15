(() => {
  const strip = document.querySelector('#formats .product-strip');
  if (!strip || strip.dataset.garmentV2 === 'done') return;
  strip.dataset.garmentV2 = 'done';

  const source = 'assets/gerrard-source.webp';
  const tour = 'assets/gerrard-tour-issue.webp';

  const defs = (id) => `
    <defs>
      <linearGradient id="${id}-fabric" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#303136"/><stop offset=".42" stop-color="#17181c"/><stop offset="1" stop-color="#090a0c"/></linearGradient>
      <linearGradient id="${id}-fabric2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#26272b"/><stop offset="1" stop-color="#0b0c0f"/></linearGradient>
      <clipPath id="${id}-print"><rect x="0" y="0" width="100" height="100" rx="2"/></clipPath>
    </defs>`;

  const tee = () => `<svg class="garment-v2-svg" viewBox="0 0 420 450" role="img" aria-label="Short-sleeve T-shirt development mockup">${defs('tee')}
    <path fill="url(#tee-fabric)" stroke="#4c4d51" stroke-width="1.2" d="M113 65 163 43h94l50 22 82 75-54 73-42-29v218H127V184l-42 29-54-73 82-75Z"/>
    <path class="g2-rib" d="M169 47c4 30 17 46 41 46s37-16 41-46"/>
    <path class="g2-seam" d="M127 184 113 65M293 184l14-119M128 388h164"/>
    <rect class="g2-print-frame" x="132" y="123" width="156" height="220" rx="2"/>
    <image href="${tour}" x="132" y="123" width="156" height="220" preserveAspectRatio="xMidYMid slice" class="g2-print-image"/>
    <text x="210" y="373" text-anchor="middle" class="g2-micro" font-size="9">BESTIEBOYS / TOUR ISSUE</text>
  </svg>`;

  const long = () => `<svg class="garment-v2-svg" viewBox="0 0 430 470" role="img" aria-label="Longsleeve development mockup">${defs('long')}
    <path fill="url(#long-fabric)" stroke="#4c4d51" stroke-width="1.2" d="M130 58 171 40h88l41 18 66 35 45 307-55 11-47-244-12 18v243H133V185l-12-18-47 244-55-11L64 93l66-35Z"/>
    <path class="g2-rib" d="M177 43c4 28 17 42 38 42s34-14 38-42"/>
    <path class="g2-seam" d="M133 185 130 58M297 185l3-127M134 414h162"/>
    <rect class="g2-print-frame" x="164" y="126" width="102" height="185" rx="2"/>
    <image href="${source}" x="164" y="126" width="102" height="185" preserveAspectRatio="xMidYMid slice" class="g2-print-image"/>
    <text x="78" y="252" transform="rotate(-82 78 252)" class="g2-micro" font-size="10">BESTIEBOYS</text>
    <text x="352" y="248" transform="rotate(82 352 248)" class="g2-micro" font-size="10">GERRARD</text>
  </svg>`;

  const hoodie = (zip=false) => `<svg class="garment-v2-svg" viewBox="0 0 440 480" role="img" aria-label="${zip?'Zip':'Pullover'} hoodie development mockup">${defs(zip?'zip':'hood')}
    <path fill="url(#${zip?'zip':'hood'}-fabric2)" stroke="#4c4d51" stroke-width="1.2" d="M155 91c-17 8-40 23-57 42l-57 70 48 53 38-34v218h186V222l38 34 48-53-57-70c-17-19-40-34-57-42H155Z"/>
    <path fill="url(#${zip?'zip':'hood'}-fabric)" stroke="#55565a" stroke-width="1.2" d="M164 95c-4-56 18-83 56-83s60 27 56 83c-20-18-39-27-56-27s-36 9-56 27Z"/>
    <path class="g2-rib" d="M174 91c11 11 27 18 46 18s35-7 46-18"/>
    <path class="g2-seam" d="M127 222 155 91M313 222l-28-131M128 426h184"/>
    ${zip?'<line x1="220" y1="103" x2="220" y2="438" class="g2-zip"/><circle cx="220" cy="163" r="4" class="g2-metal"/>':''}
    <rect class="g2-print-frame" x="157" y="162" width="126" height="173" rx="3"/>
    <image href="${source}" x="157" y="162" width="126" height="173" preserveAspectRatio="xMidYMid slice" class="g2-print-image"/>
    ${zip?'<path class="g2-seam" d="M159 361h122"/><text x="220" y="389" text-anchor="middle" class="g2-micro" font-size="9">SPLIT / SLEEVE / BACK</text>':'<path class="g2-seam" d="M166 357q54 31 108 0"/><text x="220" y="392" text-anchor="middle" class="g2-micro" font-size="9">BESTIEBOYS</text>'}
  </svg>`;

  const fitted = () => `<svg class="garment-v2-svg" viewBox="0 0 380 450" role="img" aria-label="Fitted T-shirt development mockup">${defs('fit')}
    <path fill="url(#fit-fabric)" stroke="#4c4d51" stroke-width="1.2" d="M105 64 146 44h88l41 20 72 64-47 67-39-25-16 238H135l-16-238-39 25-47-67 72-64Z"/>
    <path class="g2-rib" d="M151 48c4 27 17 41 39 41s35-14 39-41"/>
    <path class="g2-seam" d="M135 394h110M119 170 105 64M261 170l14-106"/>
    <rect class="g2-print-frame" x="145" y="133" width="90" height="176" rx="2"/>
    <image href="${source}" x="145" y="133" width="90" height="176" preserveAspectRatio="xMidYMid slice" class="g2-print-image"/>
  </svg>`;

  const cap = () => `<svg class="garment-v2-svg" viewBox="0 0 430 330" role="img" aria-label="Cap development mockup">${defs('cap')}
    <path fill="url(#cap-fabric)" stroke="#4c4d51" stroke-width="1.2" d="M72 172C83 77 140 38 220 38s137 39 148 134c-46 27-98 41-148 41S118 199 72 172Z"/>
    <path fill="url(#cap-fabric2)" stroke="#4c4d51" stroke-width="1.2" d="M220 205c79-1 135 14 177 47-64 22-140 30-222 17 22-27 37-47 45-64Z"/>
    <path class="g2-seam" d="M220 39v166M89 154c83 28 177 28 262 0"/>
    <path class="g2-seam" d="M220 39c-39 25-67 66-78 131M220 39c39 25 67 66 78 131"/>
    <text x="220" y="143" text-anchor="middle" class="g2-micro" font-size="28" letter-spacing="-2">BB</text>
    <text x="220" y="168" text-anchor="middle" class="g2-micro" font-size="8">BESTIEBOYS</text>
  </svg>`;

  const sticker = () => `<svg class="garment-v2-svg" viewBox="0 0 380 380" role="img" aria-label="Sticker development mockup">${defs('stk')}
    <path fill="#f1ece3" stroke="#ffffff" stroke-width="13" d="m190 20 31 34 46-16 17 45 48 2-3 48 41 25-25 41 24 41-41 24 3 48-48 2-18 45-46-16-30 35-31-35-46 16-17-45-48-2 3-48-41-24 25-41-24-41 41-25-3-48 48-2 18-45 46 16 30-34Z"/>
    <rect x="111" y="82" width="158" height="194" fill="#ded8cf"/>
    <image href="${source}" x="111" y="82" width="158" height="194" preserveAspectRatio="xMidYMid slice" class="g2-print-image"/>
    <rect x="104" y="271" width="172" height="35" fill="#101114"/>
    <text x="190" y="294" text-anchor="middle" class="g2-micro" font-size="12">BESTIEBOYS</text>
  </svg>`;

  const card = (num, kicker, title, copy, note, art) => `<article class="product garment-v2-card">
    <div class="garment-v2-stage">${art}</div>
    <div class="garment-v2-copy"><small>${num} / ${kicker}</small><strong>${title}</strong><p>${copy}</p><div class="garment-v2-note"><b>Development logic:</b> ${note}</div></div>
  </article>`;

  strip.innerHTML = [
    card('01','HERO FORMAT','Short-sleeve tee','The primary canvas: generous front artwork with enough breathing room to feel like actual band merchandise.','large front art, restrained secondary marks',tee()),
    card('02','SCENE FORMAT','Longsleeve','Built around the sleeves as much as the chest. Narrow front composition, asymmetric arm typography and real scene credibility.','front + independent left/right sleeve treatments',long()),
    card('03','HEAVY FORMAT','Pullover hoodie','A heavier silhouette with a controlled front graphic and room for a much larger back treatment later.','small identity system plus one dominant artwork zone',hoodie(false)),
    card('04','TECHNICAL FORMAT','Zip hoodie','The zip becomes part of the composition instead of cutting randomly through an ordinary T-shirt graphic.','split-front logic, sleeve work, larger back art',hoodie(true)),
    card('05','FITTED FORMAT','Girlie / fitted tee','A narrower vertical composition designed for the silhouette rather than a shrunken unisex print.','separate crop and scale, not a resized men’s tee',fitted()),
    card('06','MARK FORMAT','Cap','A reduced identity piece: embroidery-scale lettering or iconography rather than attempting to force full artwork onto a cap.','compact mark only; embroidery-first thinking',cap()),
    card('07','ADD-ON FORMAT','Sticker','A deliberately graphic die-cut object for scene marks, pet portraits and compact artwork fragments.','standalone graphic object, not generic stationery',sticker())
  ].join('');
})();
