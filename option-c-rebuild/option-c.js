(() => {
  const menu = document.querySelector('.menu-button');
  const mobile = document.querySelector('#mobile-nav');
  if (menu && mobile) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!open));
      mobile.hidden = open;
    });
    mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.setAttribute('aria-expanded', 'false');
      mobile.hidden = true;
    }));
  }

  const tabs = document.querySelector('.house-tabs');
  const stage = document.querySelector('.house-stage');
  if (!tabs || !stage) return;

  const base = 'https://bestieboys.co.uk/option-c/assets/';
  const items = [
    ['tee','LOGO TEE', n => `house-${n}-tee.png`],
    ['cap','LOGO CAP', n => `house-${n}-cap.png`],
    ['hoodie','LOGO HOODIE', n => `house-${n}-logo-hoodie-approved-20261003.png`],
    ['longsleeve','LONGSLEEVE', n => `house-${n}-logo-longsleeve-approved-20261003.png`],
    ['sticker','STICKER SHEET', n => `house-${n}-logo-sticker-sheet-approved-20261003.png`]
  ];

  function render(index) {
    const n = String(index).padStart(2,'0');
    stage.innerHTML = '';
    items.forEach(([kind,label,file]) => {
      const figure = document.createElement('figure');
      figure.className = `house-item house-${kind}`;
      const img = document.createElement('img');
      img.src = base + file(n);
      img.alt = `Collection ${n} BestieBoys ${label.toLowerCase()}`;
      img.loading = 'lazy';
      const cap = document.createElement('span');
      cap.textContent = label;
      figure.append(img,cap);
      stage.appendChild(figure);
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