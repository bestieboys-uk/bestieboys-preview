(() => {
  const selector=document.querySelector('.bm-art-selector');
  if(!selector)return;

  const descriptions={
    '1':'Onion Black Metal approved artwork 01 shown on a digital T-shirt placement study',
    '2':'Onion Black Metal approved artwork 02 shown on a digital T-shirt placement study',
    '3':'Onion Black Metal approved artwork 03 shown on a digital T-shirt placement study'
  };
  const allowed=new Set(Object.keys(descriptions));
  const previews=[...document.querySelectorAll('[data-art-preview]')];
  const selectedDirection=document.getElementById('selectedDirection');
  const ctas=[document.getElementById('personaliseCta'),document.getElementById('processCta')].filter(Boolean);

  function briefUrl(art){
    const url=new URL('personalise.html',window.location.href);
    url.searchParams.set('scene','Black Metal');
    url.searchParams.set('garment','Short-Sleeve T-shirt');
    url.searchParams.set('art',art);
    url.searchParams.set('source','onion-black-metal');
    return url.href;
  }

  function selectArtwork(value){
    const art=allowed.has(String(value))?String(value):'1';
    const col=String(Number(art)-1);
    previews.forEach(preview=>{
      preview.dataset.row='0';
      preview.dataset.col=col;
      preview.setAttribute('aria-label',descriptions[art]);
    });
    if(selectedDirection)selectedDirection.textContent=`BLACK METAL / 0${art}`;
    ctas.forEach(cta=>cta.href=briefUrl(art));
  }

  selector.addEventListener('change',event=>{
    if(event.target.matches('input[name="blackMetalArtwork"]'))selectArtwork(event.target.value);
  });

  const requested=new URLSearchParams(window.location.search).get('art');
  const initial=allowed.has(requested)?requested:'1';
  const initialRadio=selector.querySelector(`input[value="${initial}"]`);
  if(initialRadio)initialRadio.checked=true;
  selectArtwork(initial);
})();
