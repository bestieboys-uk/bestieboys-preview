(() => {
  const ART = {
    frost:'assets/concepts/black-metal-frostbite-portrait.webp',
    ritual:'assets/concepts/black-metal-ritual-hound.webp',
    northern:'assets/concepts/black-metal-northern-apparition.webp',
    tour:'assets/gerrard-tour-issue.webp',
    spike:'assets/brand/bestie-boys-spike.png'
  };

  const defs = id => `<defs>
    <linearGradient id="${id}-fabric" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3b3f"/><stop offset=".28" stop-color="#1e1f23"/><stop offset=".72" stop-color="#0d0e10"/><stop offset="1" stop-color="#292a2e"/></linearGradient>
    <linearGradient id="${id}-fabric2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#343539"/><stop offset="1" stop-color="#0b0c0e"/></linearGradient>
  </defs>`;

  const longSvg = (id, back=false) => `<svg class="garment-v3-svg" viewBox="0 0 360 480" role="img" aria-label="Longsleeve ${back?'back':'front'} development study">${defs(id)}
    <path class="fabric" fill="url(#${id}-fabric)" d="M112 57 147 40h66l35 17 58 31 40 316-47 8-43-240-10 15v240H114V187l-10-15-43 240-47-8L54 88l58-31Z"/>
    <path class="rib" d="M151 43c3 25 13 39 29 39s26-14 29-39"/>
    <path class="seam" d="M114 187 112 57M246 187l2-130M115 414h130"/>
    ${back ? `<rect x="112" y="115" width="136" height="230" class="print-bg"/><image href="${ART.ritual}" x="112" y="115" width="136" height="230" preserveAspectRatio="xMidYMid slice" class="print-img"/>` : `<rect x="137" y="135" width="86" height="150" class="print-bg"/><image href="${ART.ritual}" x="137" y="135" width="86" height="150" preserveAspectRatio="xMidYMid slice" class="print-img"/><text x="76" y="255" transform="rotate(-82 76 255)" class="sleeve-type">BESTIE BOYS</text><text x="286" y="250" transform="rotate(82 286 250)" class="sleeve-type">GERRARD</text>`}
  </svg>`;

  const hoodieSvg = (id, type='pullover', back=false) => {
    const zip = type === 'zip';
    return `<svg class="garment-v3-svg" viewBox="0 0 370 490" role="img" aria-label="${zip?'Zip':'Pullover'} hoodie ${back?'back':'front'} development study">${defs(id)}
      <path class="fabric2" fill="url(#${id}-fabric2)" d="M133 94c-17 8-34 20-49 38l-48 67 42 51 32-29v221h150V221l32 29 42-51-48-67c-15-18-32-30-49-38H133Z"/>
      <path class="fabric" fill="url(#${id}-fabric)" d="M137 97c-4-55 14-82 48-82s52 27 48 82c-17-18-33-27-48-27s-31 9-48 27Z"/>
      <path class="rib" d="M145 93c9 11 22 17 40 17s31-6 40-17"/><path class="seam" d="M110 221 133 94M260 221l-23-127M111 428h148"/>
      ${zip?'<line x1="185" y1="105" x2="185" y2="442" class="zipline"/>':''}
      ${back ? `<rect x="119" y="146" width="132" height="214" class="print-bg"/><image href="${zip?ART.frost:ART.northern}" x="119" y="146" width="132" height="214" preserveAspectRatio="xMidYMid slice" class="print-img"/>` : zip ? `<rect x="126" y="155" width="48" height="75" class="print-bg"/><image href="${ART.frost}" x="126" y="155" width="48" height="75" preserveAspectRatio="xMidYMid slice" class="print-img"/><text x="76" y="268" transform="rotate(-79 76 268)" class="sleeve-type">BESTIE BOYS</text><text x="296" y="264" transform="rotate(79 296 264)" class="sleeve-type">GERRARD</text>` : `<rect x="145" y="150" width="80" height="116" class="print-bg"/><image href="${ART.northern}" x="145" y="150" width="80" height="116" preserveAspectRatio="xMidYMid slice" class="print-img"/><path class="seam" d="M143 354q42 25 84 0"/>`}
    </svg>`;
  };

  const fittedSvg = id => `<svg class="garment-v3-svg" viewBox="0 0 340 450" role="img" aria-label="Fitted T-shirt development study">${defs(id)}
    <path class="fabric" fill="url(#${id}-fabric)" d="M96 64 132 44h76l36 20 64 62-42 65-34-24-15 240H123l-15-240-34 24-42-65 64-62Z"/>
    <path class="rib" d="M137 48c4 25 15 39 33 39s29-14 33-39"/><path class="seam" d="M123 394h94M108 167 96 64M232 167l12-103"/>
    <rect x="130" y="126" width="80" height="184" class="print-bg"/><image href="${ART.frost}" x="130" y="126" width="80" height="184" preserveAspectRatio="xMidYMid slice" class="print-img"/>
  </svg>`;

  const capSvg = id => `<svg class="garment-v3-svg" viewBox="0 0 380 300" role="img" aria-label="Cap development study">${defs(id)}
    <path class="fabric" fill="url(#${id}-fabric)" d="M60 160C70 74 119 37 190 37s120 37 130 123c-41 25-87 38-130 38S101 185 60 160Z"/>
    <path class="fabric2" fill="url(#${id}-fabric2)" d="M190 192c70-1 120 12 158 42-57 20-125 27-198 16 19-25 33-43 40-58Z"/><path class="seam" d="M190 38v154M76 144c74 25 155 25 228 0M190 38c-35 23-59 59-69 118M190 38c35 23 59 59 69 118"/>
    <rect x="134" y="93" width="112" height="48" rx="4" fill="#e9e5dc" opacity=".93"/><image href="${ART.spike}" x="139" y="99" width="102" height="36" preserveAspectRatio="xMidYMid meet"/>
  </svg>`;

  const stickerSvg = id => `<svg class="garment-v3-svg" viewBox="0 0 330 330" role="img" aria-label="Sticker development study">${defs(id)}
    <path d="m165 18 27 31 41-14 15 40 42 2-3 42 36 22-22 36 21 36-36 21 3 42-42 2-16 40-40-14-26 31-27-31-40 14-15-40-42-2 3-42-36-21 22-36-21-36 36-22-3-42 42-2 16-40 40 14 26-31Z" fill="#ece8df" stroke="#fff" stroke-width="10"/>
    <image href="${ART.ritual}" x="87" y="70" width="156" height="180" preserveAspectRatio="xMidYMid slice" class="print-img"/><rect x="79" y="243" width="172" height="38" fill="#0d0d0e"/><text x="165" y="267" text-anchor="middle" class="micro">BESTIE BOYS</text>
  </svg>`;

  const pair = (front,back) => `<div class="garment-v3-views"><div class="garment-v3-view">${front}<span>Front</span></div><div class="garment-v3-view">${back}<span>Back</span></div></div>`;
  const card = (num,kicker,title,copy,tags,note,visual) => `<article class="product garment-v3-card"><div class="garment-v3-stage">${visual}</div><div class="garment-v3-copy"><small>${num} / ${kicker}</small><strong>${title}</strong><p>${copy}</p><div class="garment-v3-tags">${tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="garment-v3-note"><b>Development logic:</b> ${note}</div></div></article>`;

  const markup = () => [
    card('01','HERO FORMAT','Short-sleeve tee','The strongest entry format. This uses the existing Tour Issue mockup so the complete garment is visible rather than reducing the product to a print rectangle.',['full garment','large front print','hero product'],'Existing Tour Issue used only as a scale/presentation reference.',`<img class="garment-v3-photo" src="${ART.tour}" alt="Full Gerrard Tour Issue T-shirt development mockup">`),
    card('02','SCENE FORMAT','Longsleeve','Built like actual extreme-music merch: complete front and back views, a narrower chest composition and independent sleeve typography.',['front + back','both sleeves','black metal study'],'Ritual Hound is being used as an early art-direction crop; final artwork and blank remain unapproved.',pair(longSvg('lsf',false),longSvg('lsb',true))),
    card('03','HEAVY FORMAT','Pullover hoodie','A restrained front and a dominant back treatment give the hoodie its own hierarchy instead of copying a T-shirt placement.',['front + back','large rear print','heavy format'],'Northern Apparition tests a quieter front with a much stronger rear artwork zone.',pair(hoodieSvg('phf','pullover',false),hoodieSvg('phb','pullover',true))),
    card('04','TECHNICAL FORMAT','Zip hoodie','The zipper stays clear of the main image. Identity sits on chest and sleeves while the complete artwork moves to the back.',['zip-aware','sleeve print','large back'],'Frostbite is deliberately kept off the centre zip; this tests construction-aware merch logic.',pair(hoodieSvg('zhf','zip',false),hoodieSvg('zhb','zip',true))),
    card('05','FITTED FORMAT','Girlie / fitted tee','A purpose-built narrow vertical print keeps the fitted silhouette intentional instead of looking like a shrunken unisex tee.',['full garment','vertical art','separate adaptation'],'Frostbite is recropped specifically for the fitted body shape.',`<div class="garment-v3-views" style="grid-template-columns:1fr"><div class="garment-v3-view">${fittedSvg('fit3')}<span>Front study</span></div></div>`),
    card('06','MARK FORMAT','Cap','A cap needs a reduced mark rather than full shirt artwork. This uses the spiked Bestie Boys identity as a small patch/embroidery-scale study.',['reduced logo','embroidery scale','accessory'],'Logo treatment only; final cap blank and embroidery method remain to be sourced.',`<div class="garment-v3-views" style="grid-template-columns:1fr"><div class="garment-v3-view">${capSvg('cap3')}<span>Front study</span></div></div>`),
    card('07','ADD-ON FORMAT','Sticker','A compact piece built from the artwork system rather than a generic pet sticker.',['die-cut','art fragment','low-ticket add-on'],'Ritual Hound is reduced into a standalone merch-table object.',`<div class="garment-v3-views" style="grid-template-columns:1fr"><div class="garment-v3-view">${stickerSvg('stk3')}<span>Die-cut study</span></div></div>`)
  ].join('');

  function render(){
    const strip = document.querySelector('#formats .product-strip');
    if (!strip) return false;
    if (strip.querySelector('.garment-v3-card')) return true;
    strip.innerHTML = markup();
    strip.dataset.garmentV3 = 'done';
    const head = document.querySelector('#formats .section-head h2');
    const intro = document.querySelector('#formats .section-head p');
    if (head) head.innerHTML = 'FULL GARMENT.<br><em>REAL MERCH LOGIC.</em>';
    if (intro) intro.textContent = 'Each format is treated as a garment first: full product visible, believable print scale, and separate front, back or sleeve logic where the construction demands it.';
    return true;
  }

  render();
  const observer = new MutationObserver(() => render());
  const target = document.querySelector('#formats') || document.body;
  observer.observe(target,{childList:true,subtree:true});
  window.setTimeout(()=>observer.disconnect(),5000);
})();
