(() => {
  const body = document.body;
  const themes = [
    ['atelier','Atelier','Dark editorial / oxblood / serif-led'],
    ['coldwave','Coldwave','Blue-black / steel / restrained editorial'],
    ['archive','Archive','Warm paper / rust / fashion editorial'],
    ['slategrind','Slate Grind','Washed black / rust / splatter logo'],
    ['silvernoise','Silver Noise','Brushed silver / black / spike logo'],
    ['xerox','Xerox','Dirty bone / oxblood / brush logo'],
    ['surgical','Surgical Rot','Black / surgical green / splatter logo'],
    ['bloodgrind','Blood Grind','Washed black / blood red / spike logo'],
    ['coldsteel','Cold Steel','Blue-black / icy silver / brush logo']
  ];

  if (!document.querySelector('link[data-design-lab-v3]')) {
    const designLabCss = document.createElement('link');
    designLabCss.rel = 'stylesheet';
    designLabCss.href = 'design-lab-v3.css?v=4';
    designLabCss.dataset.designLabV3 = 'true';
    document.head.appendChild(designLabCss);
  }
  if (!document.querySelector('link[data-design-lab-v4]')) {
    const designLabCss4 = document.createElement('link');
    designLabCss4.rel = 'stylesheet';
    designLabCss4.href = 'design-lab-v4.css?v=1';
    designLabCss4.dataset.designLabV4 = 'true';
    document.head.appendChild(designLabCss4);
  }

  const saved = localStorage.getItem('bestieboys-preview-theme');
  body.dataset.theme = themes.some(([id]) => id === saved) ? saved : 'slategrind';

  // Visible brand naming is now always spaced: Bestie Boys.
  const replaceBrandText = (root = document.body) => {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.nodeValue && node.nodeValue.includes('BestieBoys')) {
        node.nodeValue = node.nodeValue.replaceAll('BestieBoys','Bestie Boys');
      }
    });
    root.querySelectorAll?.('[aria-label],[alt],[title]').forEach(el => {
      ['aria-label','alt','title'].forEach(attr => {
        const val = el.getAttribute(attr);
        if (val && val.includes('BestieBoys')) el.setAttribute(attr, val.replaceAll('BestieBoys','Bestie Boys'));
      });
    });
  };
  replaceBrandText();
  new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.nodeValue?.includes('BestieBoys')) node.nodeValue = node.nodeValue.replaceAll('BestieBoys','Bestie Boys');
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        replaceBrandText(node);
      }
    }));
  }).observe(document.body,{childList:true,subtree:true});

  document.querySelectorAll('a.brand').forEach(link => {
    link.classList.remove('brand-image');
    link.classList.add('brand-wordmark');
    link.textContent = 'Bestie Boys';
    link.setAttribute('aria-label','Bestie Boys');
  });

  const header = document.querySelector('.header');
  if (header && !document.querySelector('.theme-lab')) {
    const lab = document.createElement('div');
    lab.className = 'theme-lab';
    lab.innerHTML = `
      <div class="theme-lab__label"><b>Design Lab</b><span data-theme-note>Live colour + logo trials</span></div>
      <div class="theme-lab__options" role="group" aria-label="Preview colour, type and logo themes">
        ${themes.map(([id,label]) => `<button type="button" data-theme-choice="${id}">${label}</button>`).join('')}
      </div>`;
    header.insertAdjacentElement('afterend', lab);
  }

  function applyTheme(id){
    body.dataset.theme = id;
    localStorage.setItem('bestieboys-preview-theme', id);
    const active = themes.find(([themeId]) => themeId === id);
    const note = document.querySelector('[data-theme-note]');
    if (note && active) note.textContent = active[2];
    document.querySelectorAll('[data-theme-choice]').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.themeChoice === id ? 'true' : 'false');
    });
  }
  document.querySelectorAll('[data-theme-choice]').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.themeChoice));
  });
  applyTheme(body.dataset.theme);

  const formats = document.querySelector('#formats');
  const strip = formats?.querySelector('.product-strip');
  if (formats && strip) {
    const head = formats.querySelector('.section-head h2');
    const intro = formats.querySelector('.section-head p');
    if (head) head.innerHTML = 'THE GARMENT<br><em>IS PART OF THE ART.</em>';
    if (intro) intro.textContent = 'These are presentation mockups, not final supplier blanks. Each format gets its own composition logic instead of the same T-shirt image pasted onto everything.';

    const img = 'assets/gerrard-source.webp';
    const tour = 'assets/gerrard-tour-issue.webp';
    strip.innerHTML = `
      <article class="product product-mockup">
        <div class="product-mockup__stage"><div class="garment garment-tee"><div class="print-zone"><img src="${tour}" alt=""></div></div></div>
        <div class="product-mockup__copy"><small>01 / HERO FORMAT</small><strong>Short-sleeve tee</strong><p>Large front composition. The strongest entry product and the cleanest canvas for scene artwork.</p><span class="mockup-note">Tour Issue shown as scale reference</span></div>
      </article>
      <article class="product product-mockup">
        <div class="product-mockup__stage"><div class="garment garment-long"><span class="sleeve-word left">BESTIE BOYS</span><span class="sleeve-word right">GERRARD</span><div class="print-zone"><img src="${img}" alt=""></div></div></div>
        <div class="product-mockup__copy"><small>02 / SCENE FORMAT</small><strong>Longsleeve</strong><p>Narrower front art plus asymmetric sleeve language. More credible for black metal, grind and gore-led drops.</p><span class="mockup-note">Sleeves treated as design space</span></div>
      </article>
      <article class="product product-mockup">
        <div class="product-mockup__stage"><div class="garment garment-hoodie"><span class="chest-mark">BB</span><div class="print-zone"><img src="${img}" alt=""></div><span class="hood-word">BESTIE BOYS</span></div></div>
        <div class="product-mockup__copy"><small>03 / HEAVY FORMAT</small><strong>Pullover hoodie</strong><p>Large tonal front or back work with a restrained chest mark. Designed to feel like merch, not POD placement.</p><span class="mockup-note">Front/back hierarchy trial</span></div>
      </article>
      <article class="product product-mockup">
        <div class="product-mockup__stage"><div class="garment garment-hoodie zip"><div class="zip-line"></div><div class="print-zone"><img src="${img}" alt=""></div><span class="hood-word">SPLIT / SLEEVE / BACK</span></div></div>
        <div class="product-mockup__copy"><small>04 / TECHNICAL FORMAT</small><strong>Zip hoodie</strong><p>Split-front artwork, sleeve treatments and a larger back graphic. Best reserved for concepts that benefit from the construction.</p><span class="mockup-note">Not every design belongs here</span></div>
      </article>
      <article class="product product-mockup">
        <div class="product-mockup__stage"><div class="garment garment-fitted"><div class="print-zone"><img src="${img}" alt=""></div></div></div>
        <div class="product-mockup__copy"><small>05 / FITTED FORMAT</small><strong>Girlie / fitted tee</strong><p>Purpose-built vertical compositions rather than shrinking a unisex graphic. Cleaner scale, tighter hierarchy.</p><span class="mockup-note">Separate art adaptation</span></div>
      </article>
      <article class="product product-mockup">
        <div class="product-mockup__stage"><div class="garment garment-cap"><span class="cap-mark">BB</span></div></div>
        <div class="product-mockup__copy"><small>06 / MARK FORMAT</small><strong>Cap</strong><p>Embroidery-scale marks, initials and reduced pet iconography. No full rectangular T-shirt artwork on a cap.</p><span class="mockup-note">Small-format identity piece</span></div>
      </article>
      <article class="product product-mockup">
        <div class="product-mockup__stage"><div class="garment garment-sticker"><div class="print-zone"><img src="${img}" alt=""></div><span class="sticker-name">Bestie Boys</span></div></div>
        <div class="product-mockup__copy"><small>07 / ADD-ON FORMAT</small><strong>Sticker</strong><p>Scene logos, pet heads and compact art fragments. A low-ticket extension of the clothing system, not generic pet stationery.</p><span class="mockup-note">Die-cut visual trial</span></div>
      </article>`;
  }

  if (!document.querySelector('link[data-garment-v2]')) {
    const garmentCss = document.createElement('link');
    garmentCss.rel = 'stylesheet';
    garmentCss.href = 'garment-lab-v2.css?v=1';
    garmentCss.dataset.garmentV2 = 'true';
    document.head.appendChild(garmentCss);
  }
  if (!document.querySelector('script[data-garment-v2]')) {
    const garmentJs = document.createElement('script');
    garmentJs.src = 'garment-lab-v2.js?v=2';
    garmentJs.dataset.garmentV2 = 'true';
    document.body.appendChild(garmentJs);
  }

  if (!document.querySelector('link[data-archive-target]')) {
    const targetCss = document.createElement('link');
    targetCss.rel = 'stylesheet';
    targetCss.href = 'archive-target.css?v=1';
    targetCss.dataset.archiveTarget = 'true';
    document.head.appendChild(targetCss);
  }
  if (!document.querySelector('script[data-archive-target]')) {
    const targetJs = document.createElement('script');
    targetJs.src = 'archive-target.js?v=4';
    targetJs.dataset.archiveTarget = 'true';
    document.body.appendChild(targetJs);
  }
})();