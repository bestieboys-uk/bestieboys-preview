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
    primaryMeta.textContent='';
  }

  function renderPrimary(){
    clearPreview();
    const file=primaryInput.files?.[0];
    if(!file)return;
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
    delete supportSummary.dataset.error;
    if(!files.length){supportSummary.textContent='No supporting photos selected.';return;}
    const total=files.reduce((sum,file)=>sum+file.size,0);
    supportSummary.textContent=`${files.length} supporting photo${files.length===1?'':'s'} selected • ${formatBytes(total)} total • local only`;
  }

  primaryInput.addEventListener('change',renderPrimary);
  supportInput.addEventListener('change',renderSupporting);

  function checkedValue(name){
    return form.querySelector(`input[name="${name}"]:checked`)?.value||'';
  }

  function textValue(id){
    return (document.getElementById(id)?.value||'').trim();
  }

  function setGroupError(name,show){
    const el=form.querySelector(`[data-error-for="${name}"]`);
    if(el)el.hidden=!show;
  }

  function validate(){
    const errors=[];
    const scene=checkedValue('scene');
    const garment=checkedValue('garment');
    const petName=textValue('petName');
    const animalType=textValue('animalType');
    const primary=primaryInput.files?.[0];
    const supportCount=supportInput.files?.length||0;
    const permission=document.getElementById('permissionConsent').checked;
    const prototype=document.getElementById('prototypeConsent').checked;

    setGroupError('scene',!scene);
    setGroupError('garment',!garment);

    if(!scene)errors.push('Choose a scene or “Help me choose”.');
    if(!petName)errors.push('Enter the pet name exactly as it should appear.');
    if(!animalType)errors.push('Enter the animal type.');
    if(!primary)errors.push('Choose one primary pet photo.');
    if(supportCount>4)errors.push('Use no more than four supporting photos.');
    if(!garment)errors.push('Choose a garment or product format.');
    if(!permission)errors.push('Confirm you have permission to use the photographs.');
    if(!prototype)errors.push('Confirm you understand this is a non-submitting development prototype.');

    document.getElementById('petName').setAttribute('aria-invalid',String(!petName));
    document.getElementById('animalType').setAttribute('aria-invalid',String(!animalType));
    primaryInput.setAttribute('aria-invalid',String(!primary));
    supportInput.setAttribute('aria-invalid',String(supportCount>4));
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
