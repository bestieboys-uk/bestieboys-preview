(() => {
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

  const form=document.getElementById('personaliseForm');
  if(!form)return;

  const primaryInput=document.getElementById('primaryPhoto');
  const supportInput=document.getElementById('supportPhotos');
  const primaryPreview=document.getElementById('primaryPreview');
  const primaryPlaceholder=document.getElementById('primaryPlaceholder');
  const primaryMeta=document.getElementById('primaryMeta');
  const supportSummary=document.getElementById('supportSummary');
  const reviewButton=document.getElementById('reviewButton');
  const reviewErrors=document.getElementById('reviewErrors');
  const requestSummary=document.getElementById('requestSummary');

  let previewUrl=null;
  let routeArtwork='';
  const MAX_FILE_BYTES=15*1024*1024;
  const ACCEPTED_TYPES=new Set(['image/jpeg','image/png','image/webp','image/heic','image/heif']);
  const ACCEPTED_EXTENSIONS=new Set(['jpg','jpeg','png','webp','heic','heif']);

  function applyProductRoute(){
    const params=new URLSearchParams(window.location.search);
    const source=params.get('source');
    const requestedScene=params.get('scene');
    const garment=params.get('garment');
    const requestedArt=params.get('art');
    const catalog=window.BESTIEBOYS_ONION;
    if(!catalog||garment!=='Short-Sleeve T-shirt')return;

    let scene;
    let artId;
    let legacyRoute=false;
    if(source==='onion-black-metal'&&requestedScene==='Black Metal'&&['1','2','3'].includes(requestedArt)){
      scene=catalog.scenes['black-metal'];
      artId=String(requestedArt).padStart(2,'0');
      legacyRoute=true;
    }else if(source==='onion-product'){
      scene=catalog.scenes[requestedScene];
      artId=String(requestedArt||'').padStart(2,'0');
      if(!scene||!scene.artworks.some(item=>item.id===artId))return;
    }else return;

    const selectedArt=scene.artworks.find(item=>item.id===artId);
    if(!selectedArt)return;

    const sceneInput=[...form.querySelectorAll('input[name="scene"]')].find(input=>input.value===scene.name);
    const garmentInput=form.querySelector('input[name="garment"][value="Short-Sleeve T-shirt"]');
    if(!sceneInput||!garmentInput)return;

    routeArtwork=`${scene.code}–${artId}`;
    sceneInput.checked=true;
    garmentInput.checked=true;
    sceneInput.closest('.choice-card')?.classList.add('is-route-choice');
    garmentInput.closest('.choice-card')?.classList.add('is-route-choice');
    document.body.classList.add('product-route');

    const context=document.getElementById('selectedProduct');
    const artwork=document.getElementById('selectedProductArtwork');
    const spriteArtwork=document.getElementById('selectedProductSprite');
    const direction=document.getElementById('selectedProductDirection');
    const title=document.getElementById('selectedProductTitle');
    const back=document.getElementById('selectedProductBack');
    if(context)context.hidden=false;
    if(selectedArt.master&&artwork){
      artwork.hidden=false;
      artwork.src=selectedArt.master.src;
      artwork.width=selectedArt.master.width;
      artwork.height=selectedArt.master.height;
      artwork.alt=`Selected Onion ${scene.name} approved artwork ${artId}`;
      if(spriteArtwork)spriteArtwork.hidden=true;
    }else if(spriteArtwork){
      if(artwork)artwork.hidden=true;
      spriteArtwork.hidden=false;
      spriteArtwork.dataset.row=String(scene.row);
      spriteArtwork.dataset.col=String(selectedArt.col);
      spriteArtwork.setAttribute('aria-label',`Selected Onion ${scene.name} approved artwork ${artId}`);
    }
    if(direction)direction.textContent=`${routeArtwork} approved direction`;
    if(title)title.textContent=`${scene.name.toUpperCase()} / SHORT-SLEEVE TEE`;
    if(back)back.href=legacyRoute?`onion-black-metal.html?art=${Number(artId)}`:`onion-product.html?scene=${encodeURIComponent(scene.slug)}&art=${artId}`;

    const announcement=document.querySelector('.announcement');
    if(announcement)announcement.textContent=`${scene.name.toUpperCase()} BRIEF • ${routeArtwork} PRESELECTED • NOTHING IS UPLOADED OR SENT`;
  }

  function fileIssue(file){
    if(!file)return '';
    const extension=(file.name.split('.').pop()||'').toLowerCase();
    const accepted=ACCEPTED_TYPES.has(file.type)||(!file.type&&ACCEPTED_EXTENSIONS.has(extension));
    if(!accepted)return 'use JPEG, PNG, HEIC, HEIF or WebP.';
    if(file.size>MAX_FILE_BYTES)return 'file must be 15 MB or smaller.';
    return '';
  }

  applyProductRoute();

  function formatBytes(bytes){
    if(!Number.isFinite(bytes))return '';
    if(bytes<1024)return `${bytes} B`;
    const kb=bytes/1024;
    if(kb<1024)return `${kb.toFixed(1)} KB`;
    return `${(kb/1024).toFixed(1)} MB`;
  }

  function clearPreview(){
    if(previewUrl){URL.revokeObjectURL(previewUrl);previewUrl=null;}
    primaryPreview.hidden=true;
    primaryPreview.removeAttribute('src');
    primaryPlaceholder.hidden=false;
    primaryPlaceholder.textContent='No photo selected';
    primaryMeta.textContent='';
    delete primaryMeta.dataset.error;
  }

  function renderPrimary(){
    clearPreview();
    const file=primaryInput.files?.[0];
    if(!file)return;
    const issue=fileIssue(file);
    if(issue){
      primaryPlaceholder.textContent='Choose a supported image up to 15 MB.';
      primaryMeta.textContent=`Primary photo: ${issue}`;
      primaryMeta.dataset.error='true';
      return;
    }
    previewUrl=URL.createObjectURL(file);
    primaryPreview.src=previewUrl;
    primaryPreview.hidden=false;
    primaryPlaceholder.hidden=true;
    primaryMeta.textContent=`${file.name} • ${formatBytes(file.size)} • local preview only`;
    primaryPreview.onerror=()=>{
      primaryPreview.hidden=true;
      primaryPlaceholder.hidden=false;
      primaryPlaceholder.textContent='Selected file cannot be previewed in this browser, but remains selected locally.';
    };
  }

  function renderSupporting(){
    const files=[...(supportInput.files||[])];
    if(files.length>4){
      supportSummary.textContent='Choose no more than four supporting photos.';
      supportSummary.dataset.error='true';
      return;
    }
    const issue=files.map(fileIssue).find(Boolean);
    if(issue){
      supportSummary.textContent=`Supporting photo: ${issue}`;
      supportSummary.dataset.error='true';
      return;
    }
    delete supportSummary.dataset.error;
    if(!files.length){supportSummary.textContent='No supporting photos selected.';return;}
    const total=files.reduce((sum,file)=>sum+file.size,0);
    supportSummary.textContent=`${files.length} supporting photo${files.length===1?'':'s'} selected • ${formatBytes(total)} total • local only`;
  }

  primaryInput.addEventListener('change',renderPrimary);
  supportInput.addEventListener('change',renderSupporting);

  function markSummaryForReview(event){
    if(!requestSummary.hidden)requestSummary.hidden=true;
    const target=event.target;
    if(target.matches('input[name="scene"]'))setGroupError('scene',false);
    if(target.matches('input[name="garment"]'))setGroupError('garment',false);
    if(target.matches('#petName,#animalType,#permissionConsent,#prototypeConsent'))target.setAttribute('aria-invalid','false');
    if(target===primaryInput&&!fileIssue(primaryInput.files?.[0]))primaryInput.setAttribute('aria-invalid','false');
    if(target===supportInput&&supportInput.files.length<=4&&![...supportInput.files].some(fileIssue))supportInput.setAttribute('aria-invalid','false');
  }

  form.addEventListener('input',markSummaryForReview);
  form.addEventListener('change',markSummaryForReview);

  function checkedValue(name){
    return form.querySelector(`input[name="${name}"]:checked`)?.value||'';
  }

  function textValue(id){
    return (document.getElementById(id)?.value||'').trim();
  }

  function setGroupError(name,show){
    const el=form.querySelector(`[data-error-for="${name}"]`);
    if(el)el.hidden=!show;
    form.querySelectorAll(`input[name="${name}"]`).forEach(input=>input.setAttribute('aria-invalid',String(show)));
  }

  function validate(){
    const errors=[];
    const scene=checkedValue('scene');
    const garment=checkedValue('garment');
    const petName=textValue('petName');
    const animalType=textValue('animalType');
    const primary=primaryInput.files?.[0];
    const supportCount=supportInput.files?.length||0;
    const primaryIssue=primary?fileIssue(primary):'';
    const supportIssue=[...(supportInput.files||[])].map(fileIssue).find(Boolean)||'';
    const permission=document.getElementById('permissionConsent').checked;
    const prototype=document.getElementById('prototypeConsent').checked;

    setGroupError('scene',!scene);
    setGroupError('garment',!garment);

    if(!scene)errors.push('Choose a scene or “Help me choose”.');
    if(!petName)errors.push('Enter the pet name exactly as it should appear.');
    if(!animalType)errors.push('Enter the animal type.');
    if(!primary)errors.push('Choose one primary pet photo.');
    if(primaryIssue)errors.push(`Primary photo: ${primaryIssue}`);
    if(supportCount>4)errors.push('Use no more than four supporting photos.');
    if(supportIssue)errors.push(`Supporting photo: ${supportIssue}`);
    if(!garment)errors.push('Choose a garment or product format.');
    if(!permission)errors.push('Confirm you have permission to use the photographs.');
    if(!prototype)errors.push('Confirm you understand this is a non-submitting development prototype.');

    document.getElementById('petName').setAttribute('aria-invalid',String(!petName));
    document.getElementById('animalType').setAttribute('aria-invalid',String(!animalType));
    primaryInput.setAttribute('aria-invalid',String(!primary||Boolean(primaryIssue)));
    supportInput.setAttribute('aria-invalid',String(supportCount>4||Boolean(supportIssue)));
    document.getElementById('permissionConsent').setAttribute('aria-invalid',String(!permission));
    document.getElementById('prototypeConsent').setAttribute('aria-invalid',String(!prototype));

    return errors;
  }

  function renderSummary(){
    const primary=primaryInput.files?.[0];
    const supportCount=supportInput.files?.length||0;
    const optionalWording=[textValue('nickname'),textValue('dates'),textValue('shortLine')].filter(Boolean).join(' / ');
    document.getElementById('summaryPetName').textContent=textValue('petName')||'—';
    document.getElementById('summaryAnimalType').textContent=textValue('animalType')||'—';
    document.getElementById('summaryScene').textContent=checkedValue('scene')||'—';
    document.getElementById('summaryGarment').textContent=checkedValue('garment')||'—';
    document.getElementById('summaryArtwork').textContent=routeArtwork?`${routeArtwork} / approved Onion example`:'Not preselected';
    document.getElementById('summaryPrimary').textContent=primary?`${primary.name} (${formatBytes(primary.size)})`:'—';
    document.getElementById('summarySupport').textContent=String(supportCount);
    document.getElementById('summaryWording').textContent=optionalWording||'None';
    const notes=[textValue('personality'),textValue('creativeNotes')].filter(Boolean).join(' — ');
    document.getElementById('summaryNotes').textContent=notes||'None';
    requestSummary.hidden=false;
  }

  reviewButton.addEventListener('click',()=>{
    const errors=validate();
    if(errors.length){
      reviewErrors.hidden=false;
      reviewErrors.innerHTML=`<strong>Fix these before review:</strong><ul>${errors.map(error=>`<li>${error}</li>`).join('')}</ul>`;
      requestSummary.hidden=true;
      const firstInvalid=form.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus({preventScroll:true});
      firstInvalid?.scrollIntoView({behavior:'smooth',block:'center'});
      return;
    }
    reviewErrors.hidden=true;
    reviewErrors.textContent='';
    renderSummary();
    requestSummary.scrollIntoView({behavior:'smooth',block:'start'});
  });

  form.addEventListener('submit',event=>event.preventDefault());
  window.addEventListener('beforeunload',()=>{if(previewUrl)URL.revokeObjectURL(previewUrl);});
})();
