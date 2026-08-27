(() => {
  const body = document.body;
  const themes = [
    ['slategrind','Slate Grind','Charcoal / dirty bone / rust / rough surface'],
    ['silvernoise','Silver Noise','Brushed steel / industrial plate / black'],
    ['xerox','Xerox','Dirty copier paper / toner / ripped flyer']
  ];

  const referenceSheets = [
    ['slate-reference','slate-reference-v1.css?v=1'],
    ['xerox-reference','xerox-reference-v1.css?v=1'],
    ['garment-formats','garment-storefront-v4.css?v=1'],
    ['approved-mockups','approved-mockups.css?v=direct1']
  ];
  referenceSheets.forEach(([key,href]) => {
    if (document.querySelector(`link[data-${key}]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute(`data-${key}`,'true');
    document.head.appendChild(link);
  });

  if (!document.querySelector('script[data-approved-mockups]')) {
    const approved = document.createElement('script');
    approved.src = 'approved-mockups.js?v=direct1';
    approved.dataset.approvedMockups = 'true';
    document.body.appendChild(approved);
  }

  const saved = localStorage.getItem('bestieboys-preview-theme');
  body.dataset.theme = themes.some(([id]) => id === saved) ? saved : 'slategrind';

  const replaceBrandText = (root = document.body) => {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.nodeValue?.includes('BestieBoys')) node.nodeValue = node.nodeValue.replaceAll('BestieBoys','Bestie Boys');
    });
    root.querySelectorAll?.('[aria-label],[alt],[title]').forEach(el => {
      ['aria-label','alt','title'].forEach(attr => {
        const val = el.getAttribute(attr);
        if (val?.includes('BestieBoys')) el.setAttribute(attr,val.replaceAll('BestieBoys','Bestie Boys'));
      });
    });
  };
  replaceBrandText();
  new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.nodeValue?.includes('BestieBoys')) node.nodeValue = node.nodeValue.replaceAll('BestieBoys','Bestie Boys');
      } else if (node.nodeType === Node.ELEMENT_NODE) replaceBrandText(node);
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
      <div class="theme-lab__label"><b>Design Lab</b><span data-theme-note>Three selected website directions</span></div>
      <div class="theme-lab__options" role="group" aria-label="Preview website themes">
        ${themes.map(([id,label]) => `<button type="button" data-theme-choice="${id}">${label}</button>`).join('')}
      </div>`;
    header.insertAdjacentElement('afterend',lab);
  }

  /* The standalone Design Lab reuses old reference themes, but must not inherit
     the storefront's sticky masthead or theme-dependent black text on its fixed
     dark Onion artwork cards. Keep these overrides scoped to design-lab.html. */
  if (document.querySelector('[data-legacy-matrix]')) {
    body.classList.add('design-lab-page');
    if (!document.querySelector('style[data-design-lab-guard]')) {
      const guard = document.createElement('style');
      guard.dataset.designLabGuard = 'true';
      guard.textContent = `
        body.design-lab-page[data-theme] .header{
          position:relative!important;
          top:auto!important;
          z-index:10!important;
        }
        body.design-lab-page .onion-scene-card{
          background:#070707!important;
          color:#f1ede6!important;
        }
        body.design-lab-page .onion-scene-card h3{
          color:#f1ede6!important;
          opacity:1!important;
        }
        body.design-lab-page .onion-scene-card__head span{
          color:#9b958b!important;
        }
        body.design-lab-page .onion-scene-card__head strong{
          color:#d9ff42!important;
        }
        body.design-lab-page .onion-scene-card__sheet{
          background-color:#020202!important;
        }
      `;
      document.head.appendChild(guard);
    }
  }

  function applyTheme(id){
    body.dataset.theme = id;
    localStorage.setItem('bestieboys-preview-theme',id);
    const active = themes.find(([themeId]) => themeId === id);
    const note = document.querySelector('[data-theme-note]');
    if (note && active) note.textContent = active[2];
    document.querySelectorAll('[data-theme-choice]').forEach(btn => {
      btn.setAttribute('aria-pressed',btn.dataset.themeChoice === id ? 'true' : 'false');
    });
  }

  document.querySelectorAll('[data-theme-choice]').forEach(btn => btn.addEventListener('click',() => applyTheme(btn.dataset.themeChoice)));
  applyTheme(body.dataset.theme);
})();
