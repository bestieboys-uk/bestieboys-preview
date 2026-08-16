(() => {
  const ART = {
    logo:'assets/brand/bestie-boys-spike.png'
  };

  const defs = id => `<defs>
    <linearGradient id="${id}-fabric" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#202124"/><stop offset=".3" stop-color="#0d0e10"/><stop offset=".72" stop-color="#020304"/><stop offset="1" stop-color="#151619"/></linearGradient>
    <linearGradient id="${id}-fabric2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#191a1d"/><stop offset="1" stop-color="#020304"/></linearGradient>
  </defs>`;

  const logo = (x,y,w,h,cls='logo-img') => `<image href="${ART.logo}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" class="${cls}"/>`;

  const teeSvg = id => `<svg class="garment-v3-svg" viewBox="0 0 360 430" role="img" aria-label="Black short-sleeve Bestie Boys logo study">${defs(id)}
    <path class="fabric" fill="url(#${id}-fabric)" d="M110 61 148 42h64l38 19 74 67-48 65-39-26v220H123V167l-39 26-48-65 74-67Z"/>
    <path class="rib" d="M152 45c4 25 14 39 28 39s24-14 28-39"/><path class="seam" d="M123 167 110 61M237 167l13-106M124 374h112"/>
    ${logo(112,118,136,74)}
  </svg>`;

  const longSvg = (id, back=false) => `<svg class="garment-v3-svg" viewBox="0 0 360 480" role="img" aria-label="Black longsleeve ${back?'back':'front'} Bestie Boys study">${defs(id)}
    <path class="fabric" fill="url(#${id}-fabric)" d="M112 57 147 40h66l35 17 58 31 40 316-47 8-43-240-10 15v240H114V187l-10-15-43 240-47-8L54 88l58-31Z"/>
    <path class="rib" d="M151 43c3 25 13 39 29 39s26-14 29-39"/><path class="seam" d="M114 187 112 57M246 187l2-130M115 414h130"/>
    ${back ? `<text x="180" y="156" text-anchor="middle" class="back-slogan">I LOVE</text><text x="180" y="205" text-anchor="middle" class="back-slogan">MY GOOD</text><text x="180" y="254" text-anchor="middle" class="back-slogan">BOY</text>` : `${logo(142,112,76,42)}<text x="78" y="188" transform="rotate(-82 78 188)" class="sleeve-x">xBxBx</text><text x="70" y="267" transform="rotate(-82 70 267)" class="sleeve-x">xBxBx</text><text x="282" y="188" transform="rotate(82 282 188)" class="sleeve-x">xBxBx</text><text x="290" y="267" transform="rotate(82 290 267)" class="sleeve-x">xBxBx</text>`}
  </svg>`;

  const hoodieSvg = (id, type='pullover', back=false) => {
    const zip = type === 'zip';
    return `<svg class="garment-v3-svg" viewBox="0 0 370 490" role="img" aria-label="Black ${zip?'zip':'pullover'} hoodie ${back?'back':'front'} Bestie Boys study">${defs(id)}
      <path class="fabric2" fill="url(#${id}-fabric2)" d="M133 94c-17 8-34 20-49 38l-48 67 42 51 32-29v221h150V221l32 29 42-51-48-67c-15-18-32-30-49-38H133Z"/>
      <path class="fabric" fill="url(#${id}-fabric)" d="M137 97c-4-55 14-82 48-82s52 27 48 82c-17-18-33-27-48-27s-31 9-48 27Z"/>
      <path class="rib" d="M145 93c9 11 22 17 40 17s31-6 40-17"/><path class="seam" d="M110 221 133 94M260 221l-23-127M111 428h148"/>
      ${zip?'<line x1="185" y1="105" x2="185" y2="442" class="zipline"/>':''}
      ${back ? logo(112,154,146,86) : `${logo(zip?118:142,zip?144:146,zip?58:86,zip?34:48)}${zip?'<text x="76" y="260" transform="rotate(-79 76 260)" class="sleeve-x">xBxBx</text><text x="294" y="260" transform="rotate(79 294 260)" class="sleeve-x">xBxBx</text>':''}`}
    </svg>`;
  };

  const fittedSvg = id => `<svg class="garment-v3-svg" viewBox="0 0 340 450" role="img" aria-label="Black fitted T-shirt Bestie Boys logo study">${defs(id)}
    <path class="fabric" fill="url(#${id}-fabric)" d="M96 64 132 44h76l36 20 64 62-42 65-34-24-15 240H123l-15-240-34 24-42-65 64-62Z"/>
    <path class="rib" d="M137 48c4 25 15 39 33 39s29-14 33-39"/><path class="seam" d="M123 394h94M108 167 96 64M232 167l12-103"/>
    ${logo(117,126,106,62)}
  </svg>`;

  const capSvg = id => `<svg class="garment-v3-svg" viewBox="0 0 380 300" role="img" aria-label="Black cap Bestie Boys logo study">${defs(id)}
    <path class="fabric" fill="url(#${id}-fabric)" d="M60 160C70 74 119 37 190 37s120 37 130 123c-41 25-87 38-130 38S101 185 60 160Z"/>
    <path class="fabric2" fill="url(#${id}-fabric2)" d="M190 192c70-1 120 12 158 42-57 20-125 27-198 16 19-25 33-43 40-58Z"/><path class="seam" d="M190 38v154M76 144c74 25 155 25 228 0M190 38c-35 23-59 59-69 118M190 38c35 23 59 59 69 118"/>
    ${logo(132,94,116,52)}
  </svg>`;

  const stickerSvg = id => `<svg class="garment-v3-svg" viewBox="0 0 330 250" role="img" aria-label="Bestie Boys die-cut logo sticker study">${defs(id)}
    <path d="M34 67 65 45 97 51 124 28 157 43 190 25 217 49 252 43 275 70 305 83 291 111 307 140 277 157 266 190 229 188 202 215 168 202 136 220 109 197 72 202 56 171 24 157 38 128 23 98Z" fill="#f4f1ea" stroke="#fff" stroke-width="9"/>
    ${logo(48,70,234,104,'logo-dark')}
  </svg>`;

  const pair = (front,back) => `<div class="garment-v3-views"><div class="garment-v3-view">${front}<span>Front</span></div><div class="garment-v3-view">${back}<span>Back</span></div></div>`;
  const card = (num,kicker,title,copy,tags,note,visual) => `<article class="product garment-v3-card"><div class="garment-v3-stage">${visual}</div><div class="garment-v3-copy"><small>${num} / ${kicker}</small><strong>${title}</strong><p>${copy}</p><div class="garment-v3-tags">${tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="garment-v3-note"><b>Development logic:</b> ${note}</div></div></article>`;

  const markup = () => [
    card('01','HERO FORMAT','Short-sleeve tee','Temporary brand-only study: black tee with the Bestie Boys logo centred as a clean front hit.',['black garment','logo only','front print'],'No scene artwork is assigned yet; the Bestie Boys mark is being used only to test scale and placement.',`<div class="garment-v3-views" style="grid-template-columns:1fr"><div class="garment-v3-view">${teeSvg('tee4')}<span>Front</span></div></div>`),
    card('02','SCENE FORMAT','Longsleeve','Black longsleeve with a small Bestie Boys front mark, xBxBx running down both sleeves, and a bold I LOVE MY GOOD BOY back.',['front + back','xBxBx sleeves','statement back'],'This is the approved temporary brand study while scene-specific artwork is still being developed.',pair(longSvg('lsf4',false),longSvg('lsb4',true))),
    card('03','HEAVY FORMAT','Pullover hoodie','Black pullover with a restrained Bestie Boys chest mark and a much larger logo across the back.',['front + back','small chest','large rear logo'],'Brand mark only for now; this tests the quieter-front / dominant-back hierarchy.',pair(hoodieSvg('phf4','pullover',false),hoodieSvg('phb4','pullover',true))),
    card('04','TECHNICAL FORMAT','Zip hoodie','Black zip hoodie with the logo kept clear of the zip, xBxBx sleeve marks and a full Bestie Boys logo on the back.',['zip-aware','xBxBx sleeves','large back'],'The construction stays visible and the temporary branding does not cut through the centre zip.',pair(hoodieSvg('zhf4','zip',false),hoodieSvg('zhb4','zip',true))),
    card('05','FITTED FORMAT','Girlie / fitted tee','Black fitted tee with a proportionally smaller Bestie Boys logo centred high on the chest.',['black garment','logo only','fitted scale'],'The logo is scaled for the fitted silhouette rather than copied at unisex size.',`<div class="garment-v3-views" style="grid-template-columns:1fr"><div class="garment-v3-view">${fittedSvg('fit4')}<span>Front</span></div></div>`),
    card('06','MARK FORMAT','Cap','Black cap using the same Bestie Boys logo as a compact embroidery-scale front mark.',['black cap','reduced logo','embroidery scale'],'Logo treatment only; final cap blank and embroidery method remain to be sourced.',`<div class="garment-v3-views" style="grid-template-columns:1fr"><div class="garment-v3-view">${capSvg('cap4')}<span>Front</span></div></div>`),
    card('07','ADD-ON FORMAT','Sticker','Die-cut Bestie Boys logo sticker matching the temporary brand system used across the garments.',['die-cut','logo only','add-on'],'No pet artwork is used here yet; this is the clean brand-mark accessory study.',`<div class="garment-v3-views" style="grid-template-columns:1fr"><div class="garment-v3-view">${stickerSvg('stk4')}<span>Die-cut</span></div></div>`)
  ].join('');

  function render(){
    const strip = document.querySelector('#formats .product-strip');
    if (!strip) return false;
    strip.innerHTML = markup();
    strip.dataset.garmentV3 = 'logo-only';
    const head = document.querySelector('#formats .section-head h2');
    const intro = document.querySelector('#formats .section-head p');
    if (head) head.innerHTML = 'BLACK GARMENTS.<br><em>BRAND MARK FIRST.</em>';
    if (intro) intro.textContent = 'Until the final scene artwork is approved, the format section uses the Bestie Boys identity only. This keeps the garment studies clean and lets us judge placement, front/back hierarchy and sleeve logic without pretending unfinished artwork is final.';
    return true;
  }

  render();
})();
