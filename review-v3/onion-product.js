(() => {
  const catalog=window.BESTIEBOYS_ONION;
  if(!catalog)return;

  const params=new URLSearchParams(window.location.search);
  const requestedScene=(params.get('scene')||'black-metal').toLowerCase();
  const scene=catalog.scenes[requestedScene]||catalog.scenes['black-metal'];
  const body=document.body;
  const selector=document.getElementById('artSelector');
  const preview=document.getElementById('productMockup');
  const selectedDirection=document.getElementById('selectedDirection');
  const ctas=[document.getElementById('personaliseCta'),document.getElementById('processCta')].filter(Boolean);
  let swapToken=0;

  function setText(id,value){
    const node=document.getElementById(id);
    if(node)node.textContent=value;
  }

  function artworkCode(item){return `${scene.code}–${item.id}`;}

  function visualNode(item,{thumbnail=false}={}){
    if(item.master){
      const image=document.createElement('img');
      image.src=item.master.src;
      image.width=item.master.width;
      image.height=item.master.height;
      image.alt=thumbnail?'':item.alt;
      image.loading=thumbnail?'eager':'lazy';
      return image;
    }
    const crop=document.createElement('div');
    crop.className='onion-art-crop';
    crop.dataset.row=String(item.row);
    crop.dataset.col=String(item.col);
    if(thumbnail){crop.setAttribute('aria-hidden','true');}
    else{crop.setAttribute('role','img');crop.setAttribute('aria-label',item.alt);}
    return crop;
  }

  function buildSelector(){
    scene.artworks.forEach((item,index)=>{
      const label=document.createElement('label');
      label.className='bm-art-option';
      const input=document.createElement('input');
      input.type='radio';
      input.name='onionArtwork';
      input.value=item.id;
      input.checked=index===0;
      input.setAttribute('aria-label',`${artworkCode(item)} — ${item.title}`);
      const image=document.createElement('span');
      image.className='bm-art-option__image';
      image.appendChild(visualNode(item,{thumbnail:true}));
      const copy=document.createElement('span');
      copy.className='bm-art-option__copy';
      const code=document.createElement('b');
      code.textContent=artworkCode(item);
      const title=document.createElement('small');
      title.textContent=item.title;
      copy.append(code,title);
      label.append(input,image,copy);
      selector.appendChild(label);
    });
  }

  function buildApprovedGrid(){
    const grid=document.getElementById('approvedGrid');
    if(!grid)return;
    scene.artworks.forEach(item=>{
      const card=document.createElement('article');
      card.className='bm-approved-card';
      const media=document.createElement('div');
      media.className='bm-master-art';
      media.appendChild(visualNode(item));
      const copy=document.createElement('div');
      const code=document.createElement('small');
      code.textContent=`${scene.name.toUpperCase()} / ${item.id}`;
      const title=document.createElement('strong');
      title.textContent=item.title;
      const summary=document.createElement('p');
      summary.textContent=item.summary;
      copy.append(code,title,summary);
      card.append(media,copy);
      grid.appendChild(card);
    });
  }

  function briefUrl(item){
    const url=new URL('personalise.html',window.location.href);
    url.searchParams.set('source','onion-product');
    url.searchParams.set('scene',scene.slug);
    url.searchParams.set('art',item.id);
    url.searchParams.set('garment','Short-Sleeve T-shirt');
    return url.href;
  }

  function loadMockup(item){
    const token=++swapToken;
    const alt=`Onion ${scene.name} ${artworkCode(item)} shown on a washed-black short-sleeve T-shirt visual placement study`;
    if(preview.getAttribute('src')===item.mockup){preview.alt=alt;return;}
    preview.classList.add('is-loading');
    preview.parentElement?.setAttribute('aria-busy','true');
    const candidate=new Image();
    candidate.decoding='async';
    candidate.onload=async()=>{
      try{await candidate.decode();}catch(error){/* onload is sufficient on older engines. */}
      if(token!==swapToken)return;
      preview.src=item.mockup;
      preview.alt=alt;
      preview.classList.remove('is-loading');
      preview.parentElement?.removeAttribute('aria-busy');
    };
    candidate.onerror=()=>{
      if(token!==swapToken)return;
      preview.classList.remove('is-loading');
      preview.parentElement?.removeAttribute('aria-busy');
    };
    candidate.src=item.mockup;
  }

  function selectArtwork(id){
    const normalized=String(id||'01').padStart(2,'0');
    const item=scene.artworks.find(candidate=>candidate.id===normalized)||scene.artworks[0];
    const radio=selector.querySelector(`input[value="${item.id}"]`);
    if(radio)radio.checked=true;
    if(selectedDirection)selectedDirection.textContent=`${scene.name.toUpperCase()} / ${item.id}`;
    ctas.forEach(cta=>cta.href=briefUrl(item));
    loadMockup(item);
  }

  function initialisePage(){
    body.dataset.scene=scene.slug;
    body.style.setProperty('--scene-accent',scene.accent);
    document.title=`Onion ${scene.name} Custom Tee — BestieBoys`;
    document.querySelector('meta[name="description"]')?.setAttribute('content',`BestieBoys Onion ${scene.name} custom T-shirt development page with three approved artwork directions.`);
    document.querySelector('[data-nav]')?.setAttribute('aria-label',`${scene.name} product navigation`);
    setText('sceneAnnouncement',`ONION / ${scene.name.toUpperCase()} • VISUAL REVIEW • ORDERING DISABLED`);
    setText('sceneEyebrow',`BESTIEBOYS / SCENE ${String(scene.order).padStart(2,'0')}`);
    setText('sceneName',scene.name.toUpperCase());
    setText('sceneTagline',scene.tagline);
    setText('sceneLead',scene.lead);
    setText('artworkIntro',scene.artworkIntro);
    setText('chooseDirectionCopy',`Choose ${scene.code}–01, 02 or 03`);
    setText('artworkSpec',`Three exact approved Onion ${scene.name} selections`);
    setText('standardLabel',`BESTIEBOYS ${scene.name.toUpperCase()} STANDARD`);
    setText('standardQuote',scene.standardQuote);
    setText('footerCopy',`Onion / ${scene.name} custom tee development prototype.`);
    const sourceNote=document.querySelector('.source-note');
    if(sourceNote&&!scene.artworks.some(item=>!item.master))sourceNote.hidden=true;
    buildSelector();
    buildApprovedGrid();
    selectArtwork(params.get('art'));
  }

  selector?.addEventListener('change',event=>{
    if(event.target.matches('input[name="onionArtwork"]'))selectArtwork(event.target.value);
  });

  initialisePage();

  const warmCache=()=>scene.artworks.forEach(item=>{const image=new Image();image.src=item.mockup;});
  if('requestIdleCallback' in window)window.requestIdleCallback(warmCache,{timeout:1800});
  else window.setTimeout(warmCache,800);
})();
