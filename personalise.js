const qaStyles=document.createElement('link');
qaStyles.rel='stylesheet';
qaStyles.href='personalise-qa-fixes.css?v=1';
qaStyles.dataset.personaliseQa='true';
if(!document.querySelector('[data-personalise-qa]'))document.head.appendChild(qaStyles);

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

const form=document.querySelector('#brief-form');
const fileInput=document.querySelector('#pet-photos');
const dropZone=document.querySelector('[data-drop-zone]');
const previewGrid=document.querySelector('#photo-previews');
const photoError=document.querySelector('#photo-error');
const sceneError=document.querySelector('#scene-error');
const productError=document.querySelector('#product-error');
const consentError=document.querySelector('#consent-error');
const memorial=document.querySelector('#memorial');
const memorialFields=document.querySelector('#memorial-fields');
const petName=document.querySelector('#pet-name');
const printName=document.querySelector('#print-name');
const animalType=document.querySelector('#animal-type');
const features=document.querySelector('#features');
const storyNotes=document.querySelector('#story-notes');
const featuresCount=document.querySelector('#features-count');
const storyCount=document.querySelector('#story-count');
const reviewSection=document.querySelector('#review');
const editBrief=document.querySelector('#edit-brief');
const clearBrief=document.querySelector('#clear-brief');
const reviewWide=document.querySelector('.review-wide');
if(reviewWide&&!document.querySelector('#review-memorial-dates')){
  reviewWide.insertAdjacentHTML('beforeend','<div><span>MEMORIAL DATES</span><p id="review-memorial-dates">Not applicable.</p></div><div><span>TRIBUTE LINE</span><p id="review-tribute-line">Not applicable.</p></div>');
}

const MAX_FILES=6;
const MAX_BYTES=15*1024*1024;
const ACCEPTED_TYPES=new Set(['image/jpeg','image/png','image/webp']);
let selectedFiles=[];
let previewUrls=[];
let reviewUrls=[];
let printNameEdited=false;

function formatBytes(bytes){
  if(bytes<1024*1024)return `${Math.max(1,Math.round(bytes/1024))} KB`;
  return `${(bytes/(1024*1024)).toFixed(1)} MB`;
}

function clearUrls(list){
  list.forEach(url=>URL.revokeObjectURL(url));
  list.length=0;
}

function syncInputFiles(){
  if(typeof DataTransfer==='undefined')return;
  const transfer=new DataTransfer();
  selectedFiles.forEach(file=>transfer.items.add(file));
  fileInput.files=transfer.files;
}

function validateIncomingFiles(files){
  const valid=[];
  const errors=[];

  for(const file of files){
    if(!ACCEPTED_TYPES.has(file.type)){
      errors.push(`${file.name}: use JPEG, PNG or WebP.`);
      continue;
    }
    if(file.size>MAX_BYTES){
      errors.push(`${file.name}: larger than 15 MB.`);
      continue;
    }
    valid.push(file);
  }

  const combined=[...selectedFiles];
  for(const file of valid){
    const duplicate=combined.some(existing=>existing.name===file.name&&existing.size===file.size&&existing.lastModified===file.lastModified);
    if(!duplicate)combined.push(file);
  }

  if(combined.length>MAX_FILES){
    errors.push(`Only the first ${MAX_FILES} valid photos were kept.`);
  }

  return {files:combined.slice(0,MAX_FILES),errors};
}

function renderPhotoPreviews(){
  clearUrls(previewUrls);
  previewGrid.innerHTML='';

  selectedFiles.forEach((file,index)=>{
    const url=URL.createObjectURL(file);
    previewUrls.push(url);

    const card=document.createElement('article');
    card.className='photo-card';

    const image=document.createElement('img');
    image.src=url;
    image.alt=`Selected pet photo ${index+1}: ${file.name}`;

    const remove=document.createElement('button');
    remove.type='button';
    remove.setAttribute('aria-label',`Remove ${file.name}`);
    remove.textContent='×';
    remove.addEventListener('click',()=>{
      selectedFiles.splice(index,1);
      syncInputFiles();
      renderPhotoPreviews();
      updateProgress();
    });

    const footer=document.createElement('footer');
    footer.textContent=`${file.name} • ${formatBytes(file.size)}`;

    card.append(image,remove,footer);
    previewGrid.append(card);
  });

  if(selectedFiles.length){
    photoError.textContent='';
  }
}

function addFiles(files){
  const result=validateIncomingFiles([...files]);
  selectedFiles=result.files;
  syncInputFiles();
  renderPhotoPreviews();
  photoError.textContent=result.errors.join(' ');
  updateProgress();
}

fileInput?.addEventListener('change',event=>addFiles(event.target.files));

if(dropZone){
  ['dragenter','dragover'].forEach(type=>dropZone.addEventListener(type,event=>{
    event.preventDefault();
    dropZone.classList.add('dragging');
  }));
  ['dragleave','drop'].forEach(type=>dropZone.addEventListener(type,event=>{
    event.preventDefault();
    dropZone.classList.remove('dragging');
  }));
  dropZone.addEventListener('drop',event=>addFiles(event.dataTransfer.files));
  dropZone.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){
      event.preventDefault();
      fileInput.click();
    }
  });
}

memorial?.addEventListener('change',()=>{
  memorialFields.hidden=!memorial.checked;
});

printName?.addEventListener('input',()=>{
  printNameEdited=printName.value.trim().length>0;
});

petName?.addEventListener('input',()=>{
  if(!printNameEdited)printName.value=petName.value;
  if(petName.value.trim())markInvalid(petName,false);
});
animalType?.addEventListener('change',()=>{
  if(animalType.value)markInvalid(animalType,false);
});

function updateCounter(field,output){
  if(field&&output)output.textContent=String(field.value.length);
}
features?.addEventListener('input',()=>updateCounter(features,featuresCount));
storyNotes?.addEventListener('input',()=>updateCounter(storyNotes,storyCount));

function checkedValue(name){
  return form.querySelector(`input[name="${name}"]:checked`)?.value||'';
}

function completionState(){
  return {
    photos:selectedFiles.length>0,
    pet:Boolean(petName.value.trim()&&animalType.value),
    scene:Boolean(checkedValue('scene')),
    product:Boolean(checkedValue('product')),
    consent:Boolean(document.querySelector('#rights').checked&&document.querySelector('#local-only').checked)
  };
}

function updateProgress(){
  const state=completionState();
  const entries=Object.entries(state);
  const completed=entries.filter(([,done])=>done).length;
  const progressText=document.querySelector('#progress-text');
  const progressBar=document.querySelector('#progress-bar');
  if(progressText)progressText.textContent=`${completed} / ${entries.length} essentials complete`;
  if(progressBar)progressBar.style.width=`${(completed/entries.length)*100}%`;

  entries.forEach(([key,done])=>{
    document.querySelector(`[data-progress-item="${key}"]`)?.classList.toggle('complete',done);
  });
}

form?.addEventListener('input',event=>{
  if(event.target.matches('input,select,textarea'))updateProgress();
  if(event.target.name==='scene')sceneError.textContent='';
  if(event.target.name==='product')productError.textContent='';
  if(event.target.id==='rights'||event.target.id==='local-only')consentError.textContent='';
});
form?.addEventListener('change',updateProgress);

function markInvalid(field,invalid){
  if(!field)return;
  field.setAttribute('aria-invalid',String(invalid));
}

function validateBrief(){
  let firstInvalid=null;
  let valid=true;

  if(!selectedFiles.length){
    photoError.textContent='Add at least one pet photo to review the brief.';
    firstInvalid=dropZone;
    valid=false;
  }

  [petName,animalType].forEach(field=>{
    const invalid=!field.value.trim();
    markInvalid(field,invalid);
    if(invalid&&!firstInvalid)firstInvalid=field;
    if(invalid)valid=false;
  });

  if(!checkedValue('scene')){
    sceneError.textContent='Choose a scene or select “Help me choose”.';
    if(!firstInvalid)firstInvalid=document.querySelector('input[name="scene"]');
    valid=false;
  }

  if(!checkedValue('product')){
    productError.textContent='Choose the first product format.';
    if(!firstInvalid)firstInvalid=document.querySelector('input[name="product"]');
    valid=false;
  }

  const rights=document.querySelector('#rights');
  const localOnly=document.querySelector('#local-only');
  if(!rights.checked||!localOnly.checked){
    consentError.textContent='Confirm both permission statements to review the brief.';
    if(!firstInvalid)firstInvalid=rights;
    valid=false;
  }

  return {valid,firstInvalid};
}

function setText(selector,value,fallback='—'){
  const node=document.querySelector(selector);
  if(node)node.textContent=value||fallback;
}

function renderReviewPhotos(){
  clearUrls(reviewUrls);
  const container=document.querySelector('#review-photos');
  container.innerHTML='';

  selectedFiles.slice(0,6).forEach((file,index)=>{
    const url=URL.createObjectURL(file);
    reviewUrls.push(url);
    const image=document.createElement('img');
    image.src=url;
    image.alt=`Brief reference photo ${index+1}`;
    container.append(image);
  });
  setText('#review-photo-copy',`${selectedFiles.length} local photo reference${selectedFiles.length===1?'':'s'} selected. Nothing has been uploaded.`);
}

function renderReview(){
  const name=petName.value.trim();
  const printValue=printName.value.trim()||name;
  const animal=[animalType.value,document.querySelector('#breed').value.trim()].filter(Boolean).join(' / ');
  const scene=checkedValue('scene');
  const product=checkedValue('product');
  const size=document.querySelector('#size').value.trim();
  const fit=document.querySelector('#fit').value;
  const productDetail=[product,size,fit].filter(Boolean).join(' / ');

  setText('#review-name',name);
  setText('#review-animal',animal);
  setText('#review-scene',scene);
  setText('#review-product',productDetail);
  setText('#review-memorial',memorial.checked?'Yes':'No');
  setText('#review-features',features.value.trim(),'No additional likeness notes.');
  setText('#review-story',storyNotes.value.trim(),'No additional story or art-direction notes.');
  setText('#review-print-name',printValue);
  const memorialDates=document.querySelector('#memorial-dates').value.trim();
  const tributeLine=document.querySelector('#tribute-line').value.trim();
  setText('#review-memorial-dates',memorial.checked?memorialDates:'Not applicable.',memorial.checked?'Not supplied.':'Not applicable.');
  setText('#review-tribute-line',memorial.checked?tributeLine:'Not applicable.',memorial.checked?'Not supplied.':'Not applicable.');
  renderReviewPhotos();

  reviewSection.hidden=false;
  reviewSection.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
}

form?.addEventListener('submit',event=>{
  event.preventDefault();
  const result=validateBrief();
  if(!result.valid){
    result.firstInvalid?.scrollIntoView({behavior:'smooth',block:'center'});
    result.firstInvalid?.focus?.({preventScroll:true});
    return;
  }
  renderReview();
});

editBrief?.addEventListener('click',()=>{
  document.querySelector('#photos')?.scrollIntoView({behavior:'smooth',block:'start'});
});

clearBrief?.addEventListener('click',()=>{
  form.reset();
  selectedFiles=[];
  syncInputFiles();
  clearUrls(previewUrls);
  clearUrls(reviewUrls);
  previewGrid.innerHTML='';
  document.querySelector('#review-photos').innerHTML='';
  reviewSection.hidden=true;
  memorialFields.hidden=true;
  printNameEdited=false;
  photoError.textContent='';
  sceneError.textContent='';
  productError.textContent='';
  consentError.textContent='';
  updateCounter(features,featuresCount);
  updateCounter(storyNotes,storyCount);
  updateProgress();
  document.querySelector('#top')?.scrollIntoView({behavior:'smooth',block:'start'});
});

window.addEventListener('beforeunload',()=>{
  clearUrls(previewUrls);
  clearUrls(reviewUrls);
});

updateCounter(features,featuresCount);
updateCounter(storyNotes,storyCount);
updateProgress();