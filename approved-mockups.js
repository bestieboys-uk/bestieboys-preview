(() => {
  const mockups = [
    ['assets/concepts/grindcore-blast-portrait.avif?v=hires3','assets/concepts/grindcore-blast-portrait','Grindcore — Blast Portrait Gerrard mockup'],
    ['assets/concepts/grindcore-noise-wall.avif?v=hires3','assets/concepts/grindcore-noise-wall','Grindcore — Noise Wall Gerrard mockup'],
    ['assets/concepts/grindcore-one-second-legend.avif?v=hires3','assets/concepts/grindcore-one-second-legend','Grindcore — One Second Legend Gerrard mockup'],
    ['assets/concepts/goregrind-canine-pathology.webp?v=direct1','assets/concepts/goregrind-canine-pathology','Goregrind — Canine Pathology Gerrard mockup'],
    ['assets/concepts/goregrind-dissection-club.webp?v=direct1','assets/concepts/goregrind-dissection-club','Goregrind — Dissection Club Gerrard mockup'],
    ['assets/concepts/goregrind-terminal-good-boy.webp?v=direct1','assets/concepts/goregrind-terminal-good-boy','Goregrind — Terminal Good Boy Gerrard mockup'],
    ['assets/concepts/crust-no-masters-only-gerrard.webp?v=direct1','assets/concepts/crust-no-masters-only-gerrard','Crust Punk — No Masters / Only Gerrard mockup'],
    ['assets/concepts/powerviolence-gerrard-no-peace.webp?v=direct1','assets/concepts/powerviolence-gerrard-no-peace','Powerviolence — Gerrard / No Peace mockup'],
    ['assets/concepts/gore-noise-signal-rot-gerrard.webp?v=direct1','assets/concepts/gore-noise-signal-rot-gerrard','Gore Noise — Signal Rot: Gerrard mockup'],
    ['assets/concepts/death-doom-eternal-weight.webp?v=direct1','assets/concepts/death-doom-eternal-weight','Death / Doom — Eternal Weight Gerrard mockup']
  ];

  function imageBlock(className,src,alt){
    const wrap=document.createElement('div');
    wrap.className=className;
    const img=document.createElement('img');
    img.src=src;
    img.alt=alt;
    img.loading='lazy';
    img.decoding='async';
    wrap.appendChild(img);
    return wrap;
  }

  function install(){
    mockups.forEach(([src,base,alt])=>{
      const slot=document.querySelector(`.art-slot[data-art-base="${base}"]`);
      if(!slot)return;
      const concept=slot.closest('details.concept');
      if(!concept||concept.dataset.approvedMockup==='done')return;

      concept.dataset.approvedMockup='done';
      concept.classList.add('approved-mockup-card');
      slot.dataset.loaded='done';

      const legacyImg=slot.querySelector('.concept-art');
      const placeholder=slot.querySelector('.art-placeholder');
      if(legacyImg)legacyImg.hidden=true;
      if(placeholder)placeholder.hidden=true;

      const status=concept.querySelector('.status');
      if(status)status.textContent='EARLY VISUAL MOCKUP';

      const summary=concept.firstElementChild;
      if(summary?.tagName==='SUMMARY'&&!summary.querySelector('.approved-mockup-thumb')){
        const thumb=imageBlock('approved-mockup-thumb',src,alt);
        const quick=summary.querySelector('.quick');
        quick?summary.insertBefore(thumb,quick):summary.appendChild(thumb);
      }

      const body=concept.querySelector('.concept-body');
      if(body&&!body.querySelector('.approved-mockup-full')){
        body.insertBefore(imageBlock('approved-mockup-full',src,alt),body.firstChild);
      }
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
