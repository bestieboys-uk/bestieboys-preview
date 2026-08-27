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
