(() => {
  const blackmetal = document.querySelector('.genre.blackmetal');
  if (!blackmetal) return;

  // Mobile QA fix: long scene names must stay inside their cards without ugly word splitting.
  if (!document.querySelector('#bb-mobile-scene-heading-fix')) {
    const style = document.createElement('style');
    style.id = 'bb-mobile-scene-heading-fix';
    style.textContent = `
      @media (max-width:620px){
        .genre>summary{grid-template-columns:70px minmax(0,1fr)!important}
        .genre-meta{min-width:0!important}
        .genre-meta h3{max-width:100%!important;word-break:normal!important}
        .genre.power .genre-meta h3{
          font-size:1.34rem!important;
          letter-spacing:-.065em!important;
          line-height:.92!important;
          white-space:nowrap!important;
          overflow-wrap:normal!important;
          word-break:keep-all!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  blackmetal.open = true;

  const captions = {
    'Frostbite Portrait': 'Raw xerox texture. One-colour portrait with dead-tree atmosphere and deliberately degraded print language.',
    'Ritual Hound': 'Ritual artefact approach. Ceremonial framing, sigil logic and a restrained blood/oxblood accent.',
    'Northern Apparition': 'Atmospheric minimalism. Mist, moonlight, negative space and a colder spectral presentation.'
  };

  blackmetal.querySelectorAll('.concept').forEach(card => {
    const summary = card.querySelector(':scope > summary');
    const title = summary?.querySelector('h4')?.textContent?.trim();
    const image = summary?.querySelector('.bm-early-thumb');
    if (!summary || !title || !image || !captions[title]) return;

    if (!summary.querySelector('.early-card-caption')) {
      const caption = document.createElement('p');
      caption.className = 'early-card-caption';
      caption.textContent = captions[title];
      image.insertAdjacentElement('afterend', caption);
    }
    if (!summary.querySelector('.early-card-link')) {
      const link = document.createElement('span');
      link.className = 'early-card-link';
      link.textContent = card.open ? 'Close brief ↑' : 'View brief →';
      summary.appendChild(link);
      card.addEventListener('toggle', () => {
        link.textContent = card.open ? 'Close brief ↑' : 'View brief →';
      });
    }
  });

  if (!document.querySelector('.blackmetal-dev-note')) {
    const note = document.createElement('div');
    note.className = 'blackmetal-dev-note';
    note.innerHTML = '<span class="note-icon">i</span><div><b>Development only: these are early art-direction mockups.</b><br>Final Gerrard likeness, typography, layout and print treatment will be rebuilt and checked before any production use.</div>';
    blackmetal.insertAdjacentElement('afterend', note);
  }

  // Replace the generic raw-photo garment placements with crops from the existing
  // Black Metal development boards. This is a presentation study only, not print-ready art.
  if (!document.querySelector('#bb-garment-art-study-style')) {
    const style = document.createElement('style');
    style.id = 'bb-garment-art-study-style';
    style.textContent = `
      #formats .g2-print-image{filter:contrast(1.08) saturate(.92)!important}
      #formats .garment-v2-stage:after{content:"DEVELOPMENT MOCKUP / EARLY ART STUDY"!important}
    `;
    document.head.appendChild(style);
  }

  const garmentArt = [
    null,
    'assets/concepts/black-metal-ritual-hound.webp',
    'assets/concepts/black-metal-northern-apparition.webp',
    'assets/concepts/black-metal-frostbite-portrait.webp',
    'assets/concepts/black-metal-frostbite-portrait.webp',
    null,
    'assets/concepts/black-metal-ritual-hound.webp'
  ];

  function applyGarmentArtStudy(){
    const cards = [...document.querySelectorAll('#formats .garment-v2-card')];
    if (cards.length < 7) return false;

    cards.forEach((card, index) => {
      const asset = garmentArt[index];
      if (!asset) return;
      const image = card.querySelector('image.g2-print-image');
      if (!image) return;
      image.setAttribute('href', asset);
      image.setAttribute('preserveAspectRatio', 'xMinYMid slice');
    });

    const notes = [
      null,
      'Ritual Hound artwork crop + independent sleeve treatment',
      'Northern Apparition artwork crop + larger back-art direction',
      'Frostbite artwork crop tested against split-front construction',
      'Frostbite artwork crop rescaled for the fitted silhouette',
      null,
      'Ritual Hound artwork fragment tested as a die-cut graphic'
    ];
    cards.forEach((card, index) => {
      if (!notes[index]) return;
      const note = card.querySelector('.garment-v2-note');
      if (note) note.innerHTML = `<b>Development logic:</b> ${notes[index]}`;
    });
    return true;
  }

  if (!applyGarmentArtStudy()) {
    const root = document.querySelector('#formats .product-strip') || document.body;
    const observer = new MutationObserver(() => {
      if (applyGarmentArtStudy()) observer.disconnect();
    });
    observer.observe(root, {childList:true, subtree:true});
    window.setTimeout(() => observer.disconnect(), 6000);
  }
})();
