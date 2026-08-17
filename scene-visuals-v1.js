(() => {
  const configs = {
    blackmetal:{html:'<div class="scene-visual"><img src="assets/concepts/black-metal-frostbite-portrait.webp" alt="Black Metal Gerrard development artwork"><span class="scene-visual__micro">EARLY ART DIRECTION</span></div>'},
    grindcore:{html:'<div class="scene-visual"><img src="assets/gerrard-source.webp" alt=""><img src="assets/gerrard-source.webp" alt=""><img src="assets/gerrard-source.webp" alt=""><span class="scene-visual__type">00:01<br>BLAST</span><span class="scene-visual__micro">XEROX / CUT / REPEAT</span></div>'},
    goregrind:{html:'<div class="scene-visual"><img src="assets/gerrard-source.webp" alt=""><span class="scene-visual__type">CASE G-01</span><span class="scene-visual__micro">PATHOLOGY / SPECIMEN / DAMAGE</span></div>'},
    crust:{html:'<div class="scene-visual"><img src="assets/gerrard-source.webp" alt=""><span class="scene-visual__type">NO MASTERS</span><span class="scene-visual__micro">DIY / STENCIL / D-BEAT</span></div>'},
    power:{html:'<div class="scene-visual"><img src="assets/gerrard-source.webp" alt=""><span class="scene-visual__type">NO<br>PEACE</span><span class="scene-visual__micro">GERRARD / 00:10</span></div>'},
    noise:{html:'<div class="scene-visual"><img src="assets/gerrard-source.webp" alt=""><span class="scene-visual__type">SIGNAL<br>ROT</span><span class="scene-visual__micro">TRANSMISSION FAILED</span></div>'},
    death:{html:'<div class="scene-visual"><img src="assets/gerrard-source.webp" alt=""><span class="scene-visual__type">ETERNAL WEIGHT</span><span class="scene-visual__micro">STONE / RELIC / MOURNING</span></div>'}
  };
  function apply(){
    const sceneRoot=document.querySelector('#scenes'); if(!sceneRoot)return false;
    Object.entries(configs).forEach(([key,config])=>{const visual=sceneRoot.querySelector(`.scene-card--${key} .scene-card__visual`);if(!visual||visual.dataset.sceneVisualApplied==='1')return;const index=visual.querySelector('.scene-card__index')?.outerHTML||'';visual.innerHTML=config.html+index;visual.dataset.sceneVisualApplied='1';});
    const note=document.querySelector('.storefront-final-cta__actions small');if(note)note.remove();return true;
  }
  if(!apply()){const observer=new MutationObserver(()=>{if(apply())observer.disconnect();});observer.observe(document.body,{childList:true,subtree:true});window.setTimeout(()=>observer.disconnect(),7000);}

  const approved=[
    ['assets/concepts/goregrind-canine-pathology',0],
    ['assets/concepts/goregrind-dissection-club',1],
    ['assets/concepts/goregrind-terminal-good-boy',2],
    ['assets/concepts/crust-no-masters-only-gerrard',3],
    ['assets/concepts/powerviolence-gerrard-no-peace',4],
    ['assets/concepts/gore-noise-signal-rot-gerrard',5],
    ['assets/concepts/death-doom-eternal-weight',6]
  ];
  const style=document.createElement('style');
  style.textContent='.approved-mockup-slot{aspect-ratio:4/5!important;min-height:0!important;position:relative!important;overflow:hidden!important;background:#e9e2d6!important}.approved-mockup-slot .art-placeholder{display:none!important}.approved-mockup-slot .concept-art{display:block!important;position:absolute!important;left:0!important;width:100%!important;height:700%!important;max-height:none!important;object-fit:fill!important;background:transparent!important}';
  document.head.appendChild(style);
  approved.forEach(([base,index])=>{const slot=document.querySelector(`.art-slot[data-art-base="${base}"]`);if(!slot)return;slot.dataset.loaded='done';slot.classList.add('approved-mockup-slot');const img=slot.querySelector('.concept-art');const placeholder=slot.querySelector('.art-placeholder');if(placeholder)placeholder.hidden=true;if(img){img.onload=null;img.onerror=null;img.hidden=false;img.alt='Bestie Boys approved Gerrard development mockup';img.src='assets/concepts/approved-genre-mockups-sprite.webp?v=mobilefix1';img.style.top=`-${index*100}%`;}});
})();
