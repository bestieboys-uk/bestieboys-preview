(() => {
  const formats = [
    {
      code:'01',
      name:'Short-sleeve tee',
      role:'Primary launch format',
      note:'Main front/back canvas. Final print placement follows the approved genre logo and artwork system.',
      tags:['CORE','FRONT + BACK']
    },
    {
      code:'02',
      name:'Longsleeve',
      role:'Scene-heavy format',
      note:'Supports front, back and sleeve treatments. Sleeve graphics stay on hold until each genre system is locked.',
      tags:['CORE','SLEEVE PRINT']
    },
    {
      code:'03',
      name:'Pullover hoodie',
      role:'Heavyweight format',
      note:'Best for larger back compositions and restrained chest hits. Blank and print area still require supplier confirmation.',
      tags:['CORE','HEAVY']
    },
    {
      code:'04',
      name:'Zip hoodie',
      role:'Split-front format',
      note:'Front artwork must respect the zip. Back and sleeve placements remain the strongest scene-led applications.',
      tags:['CORE','ZIP SAFE']
    },
    {
      code:'05',
      name:'Fitted tee',
      role:'Reduced print canvas',
      note:'Uses simplified artwork hierarchy so the logo and Gerrard likeness remain strong at a smaller print size.',
      tags:['CORE','FITTED']
    },
    {
      code:'06',
      name:'Cap',
      role:'Logo-led accessory',
      note:'Reserved for approved standalone GERRARD marks and compact emblems. No temporary genre logo will be used.',
      tags:['ACCESSORY','LOGO FIRST']
    },
    {
      code:'07',
      name:'Sticker',
      role:'Low-cost art format',
      note:'Suitable for standalone logos, portraits and compact scene graphics once the artwork system is approved.',
      tags:['ACCESSORY','ART / LOGO']
    }
  ];

  function render(){
    const strip = document.querySelector('#formats .product-strip');
    if (!strip) return false;

    strip.className = 'format-library';
    strip.innerHTML = formats.map(item => `
      <article class="format-card">
        <div class="format-card__top">
          <span class="format-card__code">${item.code}</span>
          <span class="format-card__status">FORMAT IN SCOPE</span>
        </div>
        <h3>${item.name}</h3>
        <strong>${item.role}</strong>
        <p>${item.note}</p>
        <div class="format-card__tags">${item.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
      </article>`).join('');

    const head = document.querySelector('#formats .section-head h2');
    const intro = document.querySelector('#formats .section-head p');
    if (head) head.innerHTML = 'FORMAT LIBRARY.<br><em>ARTWORK HELD.</em>';
    if (intro) intro.innerHTML = 'Seven core product formats remain in scope. Temporary garment graphics have been removed while the <strong>GERRARD Logo Bible</strong> is being locked. Final supplier blanks, fit and print areas will be verified separately.';

    let status = document.querySelector('#formats .format-library-status');
    if (!status) {
      status = document.createElement('div');
      status.className = 'format-library-status';
      status.innerHTML = '<span>DEVELOPMENT STATUS</span><strong>LOGO BIBLE FIRST</strong><p>No genre artwork is being placed onto new garments until the standalone GERRARD logo language is approved.</p>';
      const headWrap = document.querySelector('#formats .section-head');
      if (headWrap) headWrap.insertAdjacentElement('afterend', status);
    }
    return true;
  }

  if (!render()) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, {once:true});
    else window.addEventListener('load', render, {once:true});
  }
})();
