const qaStyles=document.createElement('link');
qaStyles.rel='stylesheet';
qaStyles.href='storefront-mobile-fixes.css?v=4';
document.head.appendChild(qaStyles);

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

function registerSceneCard(selector,url,label){
  const card=document.querySelector(selector);
  if(!card)return null;
  card.tabIndex=0;
  card.setAttribute('role','link');
  card.setAttribute('aria-label',label);
  card.style.cursor='pointer';
  const open=()=>{window.location.href=url};
  card.addEventListener('click',open);
  card.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){
      event.preventDefault();
      open();
    }
  });
  return card;
}

function markDirectionBuilt(card){
  if(!card)return;
  card.classList.add('active');
  const status=card.querySelector('small');
  if(status)status.innerHTML='<i></i>Direction built';
}

registerSceneCard('.scene-card.blackmetal','black-metal.html','Open the BestieBoys Black Metal collection page');
markDirectionBuilt(registerSceneCard('.scene-card.grindcore','grindcore.html','Open the BestieBoys Grindcore collection page'));
markDirectionBuilt(registerSceneCard('.scene-card.goregrind','goregrind.html','Open the BestieBoys Goregrind collection page'));
markDirectionBuilt(registerSceneCard('.scene-card.crust','crust-punk.html','Open the BestieBoys Crust Punk collection page'));
markDirectionBuilt(registerSceneCard('.scene-card.power','powerviolence.html','Open the BestieBoys Powerviolence collection page'));
markDirectionBuilt(registerSceneCard('.scene-card.noise','gore-noise.html','Open the BestieBoys Gore Noise collection page'));
markDirectionBuilt(registerSceneCard('.scene-card.rap','rap-bootleg.html','Open the BestieBoys Rap Bootleg collection page'));

const homepage=document.querySelector('.hero');
if(homepage){
  const tallyUrl='https://tally.so/r/pbY28J?origin=bestieboys-public-preview&build_version=BB-CYB-PHASE-B-01';

  if(nav&&!nav.querySelector('a[data-create-bestie]')){
    const startLink=document.createElement('a');
    startLink.href=tallyUrl;
    startLink.textContent='Create';
    startLink.dataset.createBestie='true';
    nav.appendChild(startLink);
  }

  const heroPrimary=document.querySelector('.hero-actions .primary');
  const heroSecondary=document.querySelector('.hero-actions .ghost');
  if(heroPrimary){
    heroPrimary.href=tallyUrl;
    heroPrimary.innerHTML='Create your Bestie <span aria-hidden="true">→</span>';
    heroPrimary.setAttribute('aria-label','Open the private BestieBoys Phase B intake test');
  }
  if(heroSecondary){
    heroSecondary.href='#scenes';
    heroSecondary.textContent='Explore the scenes';
  }

  const uploadStep=document.querySelector('.process-step:first-child');
  if(uploadStep){
    uploadStep.tabIndex=0;
    uploadStep.setAttribute('role','link');
    uploadStep.setAttribute('aria-label','Open the private BestieBoys Phase B intake test');
    uploadStep.style.cursor='pointer';
    const openBrief=()=>{window.location.href=tallyUrl};
    uploadStep.addEventListener('click',openBrief);
    uploadStep.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){
        event.preventDefault();
        openBrief();
      }
    });
  }

  const announcement=document.querySelector('.announcement');
  if(announcement)announcement.textContent='BESTIEBOYS / PRIVATE PHASE B INTAKE TEST • PASSWORD REQUIRED • NO PAYMENT';

  const headerStatus=document.querySelector('.header-status');
  if(headerStatus)headerStatus.innerHTML='<i aria-hidden="true"></i>Phase B test';

  const statusCopy=document.querySelector('#status .status-copy > p:not(.kicker)');
  if(statusCopy)statusCopy.textContent='The public preview remains a development build. The private Phase B intake is now available for controlled testing; no payment, checkout or production order is created.';

  const disabledStatusButton=document.querySelector('#status .button.disabled');
  if(disabledStatusButton){
    const intakeLink=document.createElement('a');
    intakeLink.className='button primary';
    intakeLink.href=tallyUrl;
    intakeLink.innerHTML='Create your Bestie <span aria-hidden="true">→</span>';
    intakeLink.setAttribute('aria-label','Open the private BestieBoys Phase B intake test');
    disabledStatusButton.replaceWith(intakeLink);
  }
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

// Approved BestieBoys wordmark used consistently in the site header and footer.
const approvedBrandLogo='assets/brand/bestieboys-logo-custom.webp?v=1';
const brandLogoStyle=document.createElement('style');
brandLogoStyle.textContent=`
  .brand.brand--image{display:inline-flex;align-items:center;width:clamp(170px,16vw,235px);height:auto;font-size:0;line-height:0;flex:0 0 auto}
  .brand.brand--image img{display:block;width:100%;height:auto;max-width:none}
  .footer .brand.brand--image{width:min(260px,72vw)}
  @media (max-width:760px){
    .brand.brand--image{width:168px}
    .footer .brand.brand--image{width:210px}
  }
`;
document.head.appendChild(brandLogoStyle);

document.querySelectorAll('a.brand').forEach((brand,index)=>{
  const logo=document.createElement('img');
  logo.src=approvedBrandLogo;
  logo.alt='BestieBoys';
  logo.width=700;
  logo.height=113;
  logo.decoding='async';
  if(index===0)logo.fetchPriority='high';
  brand.replaceChildren(logo);
  brand.classList.add('brand--image');
});
