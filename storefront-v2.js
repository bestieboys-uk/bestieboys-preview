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
  if(nav&&!nav.querySelector('a[href="personalise.html"]')){
    const startLink=document.createElement('a');
    startLink.href='personalise.html';
    startLink.textContent='Start';
    nav.appendChild(startLink);
  }

  const heroPrimary=document.querySelector('.hero-actions .primary');
  const heroSecondary=document.querySelector('.hero-actions .ghost');
  if(heroPrimary){
    heroPrimary.href='personalise.html';
    heroPrimary.innerHTML='Start with your photos <span aria-hidden="true">→</span>';
  }
  if(heroSecondary){
    heroSecondary.href='#scenes';
    heroSecondary.textContent='Explore the scenes';
  }

  const uploadStep=document.querySelector('.process-step:first-child');
  if(uploadStep){
    uploadStep.tabIndex=0;
    uploadStep.setAttribute('role','link');
    uploadStep.setAttribute('aria-label','Open the BestieBoys personalisation brief prototype');
    uploadStep.style.cursor='pointer';
    const openBrief=()=>{window.location.href='personalise.html'};
    uploadStep.addEventListener('click',openBrief);
    uploadStep.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){
        event.preventDefault();
        openBrief();
      }
    });
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
