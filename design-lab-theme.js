(() => {
  const body = document.body;
  const themes = [
    ['slategrind','Slate Grind','Charcoal / dirty bone / rust / rough surface','#0f1112'],
    ['silvernoise','Silver Noise','Brushed steel / industrial plate / black','#b9bdbd'],
    ['xerox','Xerox','Dirty copier paper / toner / ripped flyer','#ded9cd']
  ];

  const header = document.querySelector('.header');
  if (header && !document.querySelector('.theme-lab')) {
    const lab = document.createElement('div');
    lab.className = 'theme-lab';
    lab.innerHTML = `
      <div class="theme-lab__label">
        <b>Design Lab</b>
        <span data-theme-note>Three selected website directions</span>
      </div>
      <div class="theme-lab__options" role="group" aria-label="Preview website themes">
        ${themes.map(([id,label]) => `<button type="button" data-theme-choice="${id}">${label}</button>`).join('')}
      </div>`;
    header.insertAdjacentElement('afterend', lab);
  }

  /* Final standalone mobile polish. Keep concept controls attached to their
     headings, remove redundant missing-artwork panels, and preserve whole
     artwork boards instead of decorative crops. */
  if (!document.querySelector('style[data-design-lab-polish]')) {
    const polish = document.createElement('style');
    polish.dataset.designLabPolish = 'true';
    polish.textContent = `
      body.design-lab-page .legacy-matrix-concept > summary:after{
        top:54px!important;
        right:12px!important;
        transform:none!important;
      }
      body.design-lab-page .legacy-matrix-concept h4{
        padding-right:44px!important;
      }
      body.design-lab-page .legacy-missing-note{
        display:none!important;
      }
      body.design-lab-page .legacy-matrix-concept.is-brief-only .legacy-concept-body{
        padding-top:10px!important;
      }
      body.design-lab-page .legacy-matrix-concept.is-brief-only .legacy-specs{
        margin-top:0!important;
      }
      body.design-lab-page .legacy-concept-thumb img,
      body.design-lab-page .legacy-art-slot img,
      body.design-lab-page .saved-asset-media img{
        object-fit:contain!important;
        background:#050505!important;
      }
      body.design-lab-page .header nav{
        scrollbar-width:none!important;
        -webkit-overflow-scrolling:touch;
      }
      body.design-lab-page .header nav::-webkit-scrollbar{display:none}
      @media(max-width:560px){
        body.design-lab-page .legacy-matrix-concept > summary:after{
          top:50px!important;
          width:28px!important;
          height:28px!important;
        }
        body.design-lab-page .legacy-matrix-concept h4{
          padding-right:42px!important;
        }
      }
    `;
    document.head.appendChild(polish);
  }

  function readSavedTheme(){
    try { return localStorage.getItem('bestieboys-preview-theme'); }
    catch (_) { return null; }
  }

  function saveTheme(id){
    try { localStorage.setItem('bestieboys-preview-theme', id); }
    catch (_) {}
  }

  function applyTheme(id){
    const active = themes.find(([themeId]) => themeId === id) || themes[0];
    body.dataset.theme = active[0];
    saveTheme(active[0]);

    const note = document.querySelector('[data-theme-note]');
    if (note) note.textContent = active[2];

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', active[3]);

    document.querySelectorAll('[data-theme-choice]').forEach(btn => {
      const selected = btn.dataset.themeChoice === active[0];
      btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
  }

  document.querySelectorAll('[data-theme-choice]').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.themeChoice));
  });

  const saved = readSavedTheme();
  applyTheme(themes.some(([id]) => id === saved) ? saved : body.dataset.theme || 'slategrind');
})();
