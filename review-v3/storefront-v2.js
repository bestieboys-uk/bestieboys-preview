document.body.classList.add('public-review');
if(!document.querySelector('link[data-review-qa]')){
  const qaStyles=document.createElement('link');
  qaStyles.rel='stylesheet';
  qaStyles.href='storefront-v3-mobile-fixes.css?v=9';
  qaStyles.dataset.reviewQa='true';
  document.head.appendChild(qaStyles);
}
if(!document.querySelector('link[data-scene-studies]')){
  const sceneStyles=document.createElement('link');
  sceneStyles.rel='stylesheet';
  sceneStyles.href='scene-study-cards-v1.css?v=2';
  sceneStyles.dataset.sceneStudies='true';
  document.head.appendChild(sceneStyles);
}
if(!document.querySelector('link[data-drive-assets]')){
  const assetStyles=document.createElement('link');
  assetStyles.rel='stylesheet';
  assetStyles.href='drive-asset-gallery.css?v=2';
  assetStyles.dataset.driveAssets='true';
  document.head.appendChild(assetStyles);
}

function applyPresentationCleanup(){
  document.querySelectorAll('.scene-study-card:not(.scene-study-placeholder)').forEach(card=>{
    const media=card.querySelector('.scene-study-media');
    if(!media)return;
    const label=media.querySelector(':scope > span');
    if(label)label.textContent='DEVELOPMENT CONCEPT STUDY';
    let medium=media.querySelector('.study-medium');
    if(!medium){
      medium=document.createElement('b');
      medium.className='study-medium';
      media.appendChild(medium);
    }
    medium.textContent=card.classList.contains('crust')?'GARMENT + ARTWORK BOARD':'ARTWORK BOARD';
  });

  const studies=document.querySelector('.design-studies');
  if(studies){
    const kicker=studies.querySelector('.design-studies-head .kicker');
    if(kicker)kicker.textContent='DEVELOPMENT CONCEPT STUDIES';
    const heading=studies.querySelector('.design-studies-head h2');
    if(heading)heading.innerHTML='DIFFERENT SCENES.<br><em>DIFFERENT DIRECTIONS.</em>';
    const intro=studies.querySelector('.design-studies-head > p');
    if(intro)intro.textContent='These are existing early BestieBoys concept boards from the development library. They demonstrate genuinely different scene directions, but they are not clean product mockups and none is approved for production until it passes current logo, likeness, composition, print and IP checks.';

    studies.querySelectorAll('.design-study').forEach(study=>{
      const media=study.querySelector('.design-study-media');
      if(!media)return;
      let medium=media.querySelector('.study-medium');
      if(!medium){
        medium=document.createElement('b');
        medium.className='study-medium';
        media.appendChild(medium);
      }
      const scene=(study.querySelector('.design-study-copy small')?.textContent||'').trim();
      medium.textContent=scene==='CRUST PUNK'?'GARMENT + ARTWORK BOARD':'ARTWORK BOARD';
    });
  }
}

function isReviewHomepage(){
  return location.pathname.endsWith('/review-v3/')||location.pathname.endsWith('/review-v3/index.html');
}

function applyCustomerJourneyRoute(){
  if(!isReviewHomepage())return;
  const navPersonalise=[...document.querySelectorAll('[data-nav] a')].find(link=>link.getAttribute('href')==='#transformation');
  if(navPersonalise){
    navPersonalise.href='personalise.html?v=1';
    navPersonalise.textContent='Personalise';
  }
  const primary=document.querySelector('.hero-actions .button.primary');
  const secondary=document.querySelector('.hero-actions .button.ghost');
  if(primary){
    primary.href='personalise.html?v=1';
    primary.innerHTML='Start with your pet <span aria-hidden="true">→</span>';
  }
  if(secondary){
    secondary.href='#scenes';
    secondary.textContent='Explore the styles';
  }
}

function applyDesignLabLink(){
  if(!isReviewHomepage())return;
  const primaryNav=document.querySelector('[data-nav]');
  if(!primaryNav||primaryNav.querySelector('[data-design-lab-link]'))return;
  const link=document.createElement('a');
  link.href='../design-lab.html?v=7';
  link.textContent='Design Lab';
  link.dataset.designLabLink='true';
  primaryNav.appendChild(link);
}

function applyAssetLibrary(){
  if(!isReviewHomepage()||document.querySelector('#asset-library'))return;
  const garments=document.querySelector('#garments');
  if(!garments)return;
  const section=document.createElement('section');
  section.className='section shell asset-library-slice reveal';
  section.id='asset-library';
  section.innerHTML=`
    <div class="section-head">
      <div><p class="kicker"><b></b>01B / SELECTED ARTWORK</p><h2 class="display">LOCKED ART.<br><em>UP CLOSE.</em></h2></div>
      <div><p>Three approved Onion directions shown at a larger scale. The full nine-scene, 27-artwork system remains above; these are selected details for composition, texture and scene credibility.</p><p class="section-note">Development artwork. Not yet production files.</p></div>
    </div>
    <div class="asset-library-grid">
      <figure class="asset-library-card"><div class="asset-library-media"><img src="assets/editorial/onion-black-doom-feature.webp" alt="Approved Onion gothic Black and Doom Metal artwork" loading="lazy"></div><figcaption><span>BLACK / DOOM</span><strong>Gothic icon study</strong></figcaption></figure>
      <figure class="asset-library-card"><div class="asset-library-media"><img src="assets/editorial/onion-goregrind-feature.webp" alt="Approved Onion Goregrind collage artwork" loading="lazy"></div><figcaption><span>GOREGRIND</span><strong>Pathology collage study</strong></figcaption></figure>
      <figure class="asset-library-card"><div class="asset-library-media"><img src="assets/editorial/onion-gorenoise-red-feature.webp" alt="Approved Onion Gore Noise red and black artwork" loading="lazy"></div><figcaption><span>GORE NOISE</span><strong>Red-noise artwork study</strong></figcaption></figure>
    </div>`;
  garments.before(section);
}

function applyGarmentEditorial(){
  if(!isReviewHomepage()||document.querySelector('.garment-editorial-grid'))return;
  const garments=document.querySelector('#garments');
  const rail=garments?.querySelector('.product-rail');
  if(!garments||!rail)return;
  const grid=document.createElement('div');
  grid.className='garment-editorial-grid reveal';
  grid.innerHTML=`
    <figure class="garment-editorial-card"><img src="assets/editorial/gerrard-transmissions-board.webp" alt="Gerrard extreme-metal merchandise development board" loading="lazy"><figcaption><span>GARMENT SYSTEM STUDY</span><strong>Gerrard / Transmissions board</strong></figcaption></figure>
    <figure class="garment-editorial-card"><img src="assets/editorial/gerrard-extreme-merch-grid.webp" alt="Gerrard extreme-metal T-shirt, longsleeve and hoodie development grid" loading="lazy"><figcaption><span>FORMAT RANGE STUDY</span><strong>Gerrard / Extreme merch grid</strong></figcaption></figure>`;
  rail.before(grid);
}

function applyReviewPresentation(){
  applyPresentationCleanup();
  applyCustomerJourneyRoute();
  applyDesignLabLink();
  applyAssetLibrary();
  applyGarmentEditorial();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyReviewPresentation,{once:true});
else applyReviewPresentation();

const header=document.querySelector('[data-header]');
const menu=document.querySelector('[data-menu]');
const nav=document.querySelector('[data-nav]');

if(menu&&nav){
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',String(open));
    menu.textContent=open?'Close':'Menu';
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
    menu.textContent='Menu';
  }));
}

window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>20),{passive:true});

const targets=[...document.querySelectorAll('.reveal')];
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  },{threshold:.1,rootMargin:'0px 0px -36px'});
  targets.forEach(el=>observer.observe(el));
}else{
  targets.forEach(el=>el.classList.add('visible'));
}
