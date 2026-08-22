const mobileFixes=document.createElement('link');
mobileFixes.rel='stylesheet';
mobileFixes.href='storefront-mobile-fixes.css?v=3';
document.head.appendChild(mobileFixes);

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

const blackMetalCard=document.querySelector('.scene-card.blackmetal');
if(blackMetalCard){
  blackMetalCard.tabIndex=0;
  blackMetalCard.setAttribute('role','link');
  blackMetalCard.setAttribute('aria-label','Open the BestieBoys Black Metal collection page');
  blackMetalCard.style.cursor='pointer';
  const openBlackMetal=()=>{window.location.href='black-metal.html'};
  blackMetalCard.addEventListener('click',openBlackMetal);
  blackMetalCard.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){
      event.preventDefault();
      openBlackMetal();
    }
  });
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
