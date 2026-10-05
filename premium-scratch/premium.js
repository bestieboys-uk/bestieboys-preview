(() => {
  const tabs = document.querySelector('.house-controls');
  const stage = document.querySelector('.house-lookbook');
  if (!tabs || !stage) return;

  const base = 'https://bestieboys.co.uk/option-c/assets/';
  const items = [
    ['LOGO TEE', n => `house-${n}-tee.png`],
    ['LOGO CAP', n => `house-${n}-cap.png`],
    ['LOGO HOODIE', n => `house-${n}-logo-hoodie-approved-20261003.png`],
    ['LONGSLEEVE', n => `house-${n}-logo-longsleeve-approved-20261003.png`],
    ['STICKER SHEET', n => `house-${n}-logo-sticker-sheet-approved-20261003.png`]
  ];

  function render(index) {
    const n = String(index).padStart(2,'0');
    stage.innerHTML = '';
    items.forEach(([label,file]) => {
      const fig = document.createElement('figure');
      const img = document.createElement('img');
      img.src = base + file(n);
      img.alt = `Collection ${n} BestieBoys ${label.toLowerCase()}`;
      img.loading = 'lazy';
      const cap = document.createElement('figcaption');
      cap.textContent = label;
      fig.append(img,cap);
      stage.appendChild(fig);
    });
    tabs.querySelectorAll('button').forEach((b,i) => {
      const selected = i + 1 === index;
      b.setAttribute('aria-selected', String(selected));
      b.tabIndex = selected ? 0 : -1;
    });
  }

  for (let i=1;i<=10;i++) {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role','tab');
    b.setAttribute('aria-selected', i === 1 ? 'true' : 'false');
    b.tabIndex = i === 1 ? 0 : -1;
    b.textContent = String(i).padStart(2,'0');
    b.addEventListener('click', () => render(i));
    tabs.appendChild(b);
  }

  render(1);
})();