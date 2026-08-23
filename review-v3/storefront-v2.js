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

function applyApprovedGarmentMockups(){
  const isReviewHomepage=location.pathname.endsWith('/review-v3/')||location.pathname.endsWith('/review-v3/index.html');
  if(!isReviewHomepage)return;
  const cards=[...document.querySelectorAll('#garments .product-card--image')];
  const approved=[
    {src:'assets/mockups/gerrard-black-metal-tee.svg',alt:'Approved Gerrard Black Metal short-sleeve T-shirt development mockup',copy:'Approved Black Metal short-sleeve development mockup.'},
    {src:'assets/mockups/onion-grindcore-longsleeve.svg',alt:'Approved Onion Grindcore longsleeve development mockup',copy:'Approved Grindcore longsleeve development mockup.'},
    {src:'assets/mockups/sylvester-crust-punk-hoodie.svg',alt:'Approved Sylvester Crust Punk pullover hoodie development mockup',copy:'Approved Crust Punk pullover hoodie development mockup.'}
  ];
  cards.slice(0,3).forEach((card,index)=>{
    const item=approved[index];
    if(!item)return;
    card.classList.add('is-approved-garment');
    const image=card.querySelector('.product-visual img');
    if(image){image.src=item.src;image.alt=item.alt;}
    const status=card.querySelector('.image-status');
    if(status)status.textContent='Approved garment mockup';
    const copy=card.querySelector('.product-copy p');
    if(copy)copy.textContent=item.copy;
    const credit=card.querySelector('.art-credit');
    if(credit)credit.textContent='Approved development mockup';
  });
}

function applyReviewPresentation(){
  applyPresentationCleanup();
  applyApprovedGarmentMockups();
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
