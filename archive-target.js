(() => {
  const blackmetal = document.querySelector('.genre.blackmetal');
  if (!blackmetal) return;

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
})();
