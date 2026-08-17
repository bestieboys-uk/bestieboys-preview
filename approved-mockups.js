(() => {
  const sprite = 'assets/concepts/approved-genre-mockups-sprite.webp?v=grind1';
  const spriteMockups = [
    ['assets/concepts/goregrind-canine-pathology',0,'Goregrind — Canine Pathology early visual mockup'],
    ['assets/concepts/goregrind-dissection-club',1,'Goregrind — Dissection Club early visual mockup'],
    ['assets/concepts/goregrind-terminal-good-boy',2,'Goregrind — Terminal Good Boy early visual mockup'],
    ['assets/concepts/crust-no-masters-only-gerrard',3,'Crust Punk — No Masters / Only Gerrard early visual mockup'],
    ['assets/concepts/powerviolence-gerrard-no-peace',4,'Powerviolence — Gerrard / No Peace early visual mockup'],
    ['assets/concepts/gore-noise-signal-rot-gerrard',5,'Gore Noise — Signal Rot: Gerrard early visual mockup'],
    ['assets/concepts/death-doom-eternal-weight',6,'Death / Doom — Eternal Weight early visual mockup']
  ];
  const standaloneMockups = [
    ['assets/concepts/grindcore-blast-portrait','assets/concepts/grindcore-blast-portrait.b64?v=grind1','Grindcore — Blast Portrait Gerrard mockup'],
    ['assets/concepts/grindcore-noise-wall','assets/concepts/grindcore-noise-wall.b64?v=grind1','Grindcore — Noise Wall Gerrard mockup'],
    ['assets/concepts/grindcore-one-second-legend','assets/concepts/grindcore-one-second-legend.b64?v=grind1','Grindcore — One Second Legend Gerrard mockup']
  ];

  function spriteCrop(className,index,alt){
    const wrap=document.createElement('div');
    wrap.className=className;
    const img=document.createElement('img');
    img.src=sprite;
    img.alt=alt;
    img.loading='lazy';
    img.decoding='async';
    img.style.top=`-${index*100}%`;
    wrap.appendChild(img);
    return wrap;
  }

  function standaloneImage(className,src,alt){
    const wrap=document.createElement('div');
    wrap.className=`${className} standalone`;
    const img=document.createElement('img');
    img.src=src;
    img.alt=alt;
    img.loading='lazy';
    img.decoding='async';
    wrap.appendChild(img);
    return wrap;
  }

  function markConcept(slot){
    const concept=slot.closest('details.concept');
    if(!concept)return null;
    concept.classList.add('approved-mockup-card');
    slot.dataset.loaded='done';
    const legacyImg=slot.querySelector('.concept-art');
    const placeholder=slot.querySelector('.art-placeholder');
    if(legacyImg)legacyImg.hidden=true;
    if(placeholder)placeholder.hidden=true;
    const status=concept.querySelector('.status');
    if(status)status.textContent='EARLY VISUAL MOCKUP';
    return concept;
  }

  function placeMockup(concept,thumb,full){
    const summary=concept.firstElementChild;
    if(summary?.tagName==='SUMMARY'&&!summary.querySelector('.approved-mockup-thumb')){
      const quick=summary.querySelector('.quick');
      quick?summary.insertBefore(thumb,quick):summary.appendChild(thumb);
    }
    const body=concept.querySelector('.concept-body');
    if(body&&!body.querySelector('.approved-mockup-full')) body.insertBefore(full,body.firstChild);
  }

  function installSpriteMockups(){
    spriteMockups.forEach(([base,index,alt])=>{
      const slot=document.querySelector(`.art-slot[data-art-base="${base}"]`);
      if(!slot)return;
      const concept=markConcept(slot);
      if(!concept||concept.dataset.approvedMockup==='done')return;
      concept.dataset.approvedMockup='done';
      placeMockup(concept,spriteCrop('approved-mockup-thumb',index,alt),spriteCrop('approved-mockup-full',index,alt));
    });
  }

  function installStandaloneMockups(){
    standaloneMockups.forEach(async ([base,b64Url,alt])=>{
      const slot=document.querySelector(`.art-slot[data-art-base="${base}"]`);
      if(!slot)return;
      const concept=markConcept(slot);
      if(!concept||concept.dataset.approvedMockup==='done')return;
      concept.dataset.approvedMockup='loading';
      try{
        const response=await fetch(b64Url,{cache:'no-store'});
        if(!response.ok)throw new Error(`HTTP ${response.status}`);
        const encoded=(await response.text()).trim();
        const src=`data:image/webp;base64,${encoded}`;
        placeMockup(concept,standaloneImage('approved-mockup-thumb',src,alt),standaloneImage('approved-mockup-full',src,alt));
        concept.dataset.approvedMockup='done';
      }catch(error){
        concept.dataset.approvedMockup='error';
        const summary=concept.firstElementChild;
        if(summary?.tagName==='SUMMARY'&&!summary.querySelector('.approved-mockup-error')){
          const note=document.createElement('div');
          note.className='approved-mockup-error';
          note.textContent='MOCKUP PREVIEW FAILED TO LOAD';
          summary.appendChild(note);
        }
      }
    });
  }

  function install(){
    installSpriteMockups();
    installStandaloneMockups();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
