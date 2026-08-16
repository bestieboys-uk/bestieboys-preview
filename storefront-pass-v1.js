(() => {
  const concepts = document.querySelector('#concepts');
  if (!concepts || document.querySelector('#scenes')) return;

  const genreMap = [
    {selector:'.genre.blackmetal', id:'scene-black-metal', card:'blackmetal', index:'01', name:'Black Metal', sub:'Raw / ritual / atmospheric', desc:'Cold, severe and image-led. From primitive xerox abrasion to ritual artefact and atmospheric fashion crossover.'},
    {selector:'.genre.grindcore', id:'scene-grindcore', card:'grindcore', index:'02', name:'Grindcore', sub:'Flyer / collage / reduction', desc:'Photocopy pressure, brutal type and DIY information overload — built to feel like real gig-table merchandise.'},
    {selector:'.genre.goregrind', id:'scene-goregrind', card:'goregrind', index:'03', name:'Goregrind', sub:'Pathology / contamination / damage', desc:'Clinical annotation, diseased print systems and grotesque collage without collapsing into generic horror graphics.'},
    {selector:'.genre.crust', id:'scene-crust-punk', card:'crust', index:'04', name:'Crust Punk', sub:'Stencil / D-beat / propaganda', desc:'One-colour urgency, ruined xerox surfaces, stencil hierarchy and battle-jacket visual language.'},
    {selector:'.genre.power', id:'scene-powerviolence', card:'power', index:'05', name:'Powerviolence', sub:'Reduction / scale / confrontation', desc:'Huge type, abrupt image crops and deliberately severe layout. Less decoration, more impact.'},
    {selector:'.genre.noise', id:'scene-gore-noise', card:'noise', index:'06', name:'Gore Noise', sub:'Signal failure / anti-design', desc:'Broken reproduction, corrupted information and hostile print texture — deliberately damaged, never randomly glitched.'},
    {selector:'.genre.death', id:'scene-death-doom', card:'death', index:'07', name:'Death / Doom', sub:'Monument / relic / mourning', desc:'Slower, heavier and more illustrative: gothic weight, stone, ritual space and collector-shirt detail.'}
  ];

  genreMap.forEach(item => {
    const genre = document.querySelector(item.selector);
    if (genre) genre.id = item.id;
  });

  const section = document.createElement('section');
  section.id = 'scenes';
  section.className = 'scene-storefront shell';
  section.innerHTML = `
    <div class="scene-storefront__head">
      <div>
        <div class="kicker">01 / CHOOSE YOUR SCENE</div>
        <h2>START WITH THE MUSIC.<br><span>THEN MAKE IT YOURS.</span></h2>
      </div>
      <p class="scene-storefront__copy">Pick the visual world first. Each scene has three genuinely different art directions, so the result starts from a culture and a garment language — not from a generic pet-product template.</p>
    </div>
    <div class="scene-storefront__grid">
      ${genreMap.map(item => `
        <a class="scene-card scene-card--${item.card}" href="#${item.id}" data-scene-target="${item.id}">
          <div class="scene-card__visual">
            <img src="assets/gerrard-source.webp" alt="Gerrard ${item.name} scene development reference" loading="lazy">
            <span class="scene-card__index">${item.index}</span>
          </div>
          <div class="scene-card__body">
            <span class="scene-card__eyebrow">${item.sub}</span>
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <div class="scene-card__foot"><span class="scene-card__meta">3 art directions</span><span class="scene-card__cta">Explore →</span></div>
          </div>
        </a>`).join('')}
    </div>
    <div class="scene-storefront__proof" aria-label="Bestie Boys development system">
      <div class="scene-proof"><b>7 scenes</b><span>Distinct visual worlds</span></div>
      <div class="scene-proof"><b>21 directions</b><span>Three per scene</span></div>
      <div class="scene-proof"><b>7 formats</b><span>Adapted to the garment</span></div>
      <div class="scene-proof"><b>Proof first</b><span>No production before artwork check</span></div>
    </div>`;

  concepts.insertAdjacentElement('beforebegin', section);

  // Make the rest of the homepage read like a storefront journey rather than an internal matrix.
  const heroIntro = document.querySelector('.hero .intro');
  if (heroIntro) heroIntro.textContent = 'Bestie Boys turns real pets into scene-authentic merchandise. Start with the music scene, choose the art direction, then build the garment around the artwork. Gerrard — a Shar Pei — is the development example.';

  const heroButtons = document.querySelectorAll('.hero .buttons .button');
  if (heroButtons[0]) { heroButtons[0].textContent = 'Choose your scene →'; heroButtons[0].setAttribute('href','#scenes'); }
  if (heroButtons[1]) { heroButtons[1].textContent = 'See product formats'; heroButtons[1].setAttribute('href','#formats'); }

  const nav = document.querySelector('.header nav');
  if (nav) nav.innerHTML = '<a href="#scenes">Scenes</a><a href="#concepts">Designs</a><a href="#formats">Formats</a><a href="#process">How it works</a>';
  const headerCta = document.querySelector('.header-cta');
  if (headerCta) { headerCta.textContent = 'Choose a scene →'; headerCta.setAttribute('href','#scenes'); }

  const conceptsKicker = concepts.querySelector('.section-head .kicker');
  const conceptsTitle = concepts.querySelector('.section-head h2');
  const conceptsCopy = concepts.querySelector('.section-head p');
  if (conceptsKicker) conceptsKicker.textContent = '02 / DESIGN DIRECTIONS';
  if (conceptsTitle) conceptsTitle.innerHTML = '21 DIRECTIONS.<br><em>BUILT FOR 7 SCENES.</em>';
  if (conceptsCopy) conceptsCopy.textContent = 'Open a scene when you want the deeper art-direction detail. Each one contains three intentionally different approaches rather than three recolours of the same template.';

  const formats = document.querySelector('#formats');
  const formatsKicker = formats?.querySelector('.section-head .kicker');
  if (formatsKicker) formatsKicker.textContent = '03 / PRODUCT FORMATS';

  const process = document.querySelector('#process');
  const processKicker = process?.querySelector('.section-head .kicker');
  if (processKicker) processKicker.textContent = '04 / HOW IT WORKS';

  // Clicking a scene card opens the matching detail group after navigating to it.
  section.querySelectorAll('[data-scene-target]').forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.dataset.sceneTarget);
      if (target?.tagName === 'DETAILS') target.open = true;
    });
  });
})();
