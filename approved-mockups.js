(() => {
  const sprite = 'assets/concepts/approved-genre-mockups-sprite.webp?v=approved2';
  const mockups = [
    ['assets/concepts/goregrind-canine-pathology',0,'Goregrind — Canine Pathology early visual mockup'],
    ['assets/concepts/goregrind-dissection-club',1,'Goregrind — Dissection Club early visual mockup'],
    ['assets/concepts/goregrind-terminal-good-boy',2,'Goregrind — Terminal Good Boy early visual mockup'],
    ['assets/concepts/crust-no-masters-only-gerrard',3,'Crust Punk — No Masters / Only Gerrard early visual mockup'],
    ['assets/concepts/powerviolence-gerrard-no-peace',4,'Powerviolence — Gerrard / No Peace early visual mockup'],
    ['assets/concepts/gore-noise-signal-rot-gerrard',5,'Gore Noise — Signal Rot: Gerrard early visual mockup'],
    ['assets/concepts/death-doom-eternal-weight',6,'Death / Doom — Eternal Weight early visual mockup']
  ];

  function makeCrop(className,index,alt){
    const wrap = document.createElement('div');
    wrap.className = className;
    const img = document.createElement('img');
    img.src = sprite;
    img.alt = alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.style.top = `-${index * 100}%`;
    wrap.appendChild(img);
    return wrap;
  }

  function install(){
    mockups.forEach(([base,index,alt]) => {
      const slot = document.querySelector(`.art-slot[data-art-base="${base}"]`);
      if (!slot) return;
      const concept = slot.closest('details.concept');
      if (!concept || concept.dataset.approvedMockup === 'done') return;
      concept.dataset.approvedMockup = 'done';
      concept.classList.add('approved-mockup-card');

      const summary = concept.firstElementChild;
      if (summary && summary.tagName === 'SUMMARY' && !summary.querySelector('.approved-mockup-thumb')) {
        const thumb = makeCrop('approved-mockup-thumb',index,alt);
        const quick = summary.querySelector('.quick');
        if (quick) summary.insertBefore(thumb,quick);
        else summary.appendChild(thumb);
      }

      const body = concept.querySelector('.concept-body');
      if (body && !body.querySelector('.approved-mockup-full')) {
        body.insertBefore(makeCrop('approved-mockup-full',index,alt),body.firstChild);
      }

      const status = concept.querySelector('.status');
      if (status) status.textContent = 'EARLY VISUAL MOCKUP';

      // Prevent the legacy lazy-loader from replacing this approved presentation.
      slot.dataset.loaded = 'done';
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
