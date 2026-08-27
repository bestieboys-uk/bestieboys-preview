(() => {
  const selector=document.querySelector('.bm-art-selector');
  const preview=document.querySelector('[data-mockup-preview]');
  if(!selector||!preview)return;

  const radios=[...selector.querySelectorAll('input[name="blackMetalArtwork"]')];
  const allowed=new Set(radios.map(radio=>radio.value));
  const selectedDirection=document.getElementById('selectedDirection');
  const ctas=[document.getElementById('personaliseCta'),document.getElementById('processCta')].filter(Boolean);
  let swapToken=0;

  function briefUrl(art){
    const url=new URL('personalise.html',window.location.href);
    url.searchParams.set('scene','Black Metal');
    url.searchParams.set('garment','Short-Sleeve T-shirt');
    url.searchParams.set('art',art);
    url.searchParams.set('source','onion-black-metal');
    return url.href;
  }

  function loadMockup(radio){
    const src=radio.dataset.mockupSrc;
    const alt=radio.dataset.mockupAlt;
    const token=++swapToken;
    if(!src)return;

    if(preview.getAttribute('src')===src){
      preview.alt=alt||preview.alt;
      preview.classList.remove('is-loading');
      preview.parentElement?.removeAttribute('aria-busy');
      return;
    }

    preview.classList.add('is-loading');
    preview.parentElement?.setAttribute('aria-busy','true');
    const candidate=new Image();
    candidate.decoding='async';
    candidate.onload=async()=>{
      try{await candidate.decode();}catch(error){/* Decoded by onload in older browsers. */}
      if(token!==swapToken)return;
      preview.src=src;
      preview.alt=alt||preview.alt;
      preview.classList.remove('is-loading');
      preview.parentElement?.removeAttribute('aria-busy');
    };
    candidate.onerror=()=>{
      if(token!==swapToken)return;
      preview.classList.remove('is-loading');
      preview.parentElement?.removeAttribute('aria-busy');
    };
    candidate.src=src;
  }

  function selectArtwork(value){
    const art=allowed.has(String(value))?String(value):'1';
    const radio=radios.find(option=>option.value===art)||radios[0];
    if(!radio)return;
    if(selectedDirection)selectedDirection.textContent=`BLACK METAL / 0${art}`;
    ctas.forEach(cta=>cta.href=briefUrl(art));
    loadMockup(radio);
  }

  selector.addEventListener('change',event=>{
    if(event.target.matches('input[name="blackMetalArtwork"]'))selectArtwork(event.target.value);
  });

  const requested=new URLSearchParams(window.location.search).get('art');
  const initial=allowed.has(requested)?requested:'1';
  const initialRadio=radios.find(radio=>radio.value===initial);
  if(initialRadio)initialRadio.checked=true;
  selectArtwork(initial);

  const warmCache=()=>radios.forEach(radio=>{
    if(radio.dataset.mockupSrc===preview.getAttribute('src'))return;
    const image=new Image();
    image.src=radio.dataset.mockupSrc;
  });
  if('requestIdleCallback' in window)window.requestIdleCallback(warmCache,{timeout:1800});
  else window.setTimeout(warmCache,800);
})();
