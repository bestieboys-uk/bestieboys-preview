document.body.classList.add('public-review');
if(!document.querySelector('link[data-review-qa]')){
  const qaStyles=document.createElement('link');
  qaStyles.rel='stylesheet';
  qaStyles.href='storefront-v3-mobile-fixes.css?v=8';
  qaStyles.dataset.reviewQa='true';
  document.head.appendChild(qaStyles);
}
if(!document.querySelector('link[data-scene-studies]')){
  const sceneStyles=document.createElement('link');
  sceneStyles.rel='stylesheet';
  sceneStyles.href='scene-study-cards-v1.css?v=1';
  sceneStyles.dataset.sceneStudies='true';
  document.head.appendChild(sceneStyles);
}

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
