(() => {
  const configs = {
    blackmetal: {
      html: '<div class="scene-visual"><img src="assets/concepts/black-metal-frostbite-portrait.webp" alt="Black Metal Gerrard development artwork"><span class="scene-visual__micro">EARLY ART DIRECTION</span></div>'
    },
    grindcore: {
      html: '<div class="scene-visual"><img src="assets/gerrard-source.webp" alt=""><img src="assets/gerrard-source.webp" alt=""><img src="assets/gerrard-source.webp" alt=""><span class="scene-visual__type">00:01<br>BLAST</span><span class="scene-visual__micro">XEROX / CUT / REPEAT</span></div>'
    },
    goregrind: {
      html: '<div class="scene-visual"><img src="assets/gerrard-source.webp" alt=""><span class="scene-visual__type">CASE G-01</span><span class="scene-visual__micro">PATHOLOGY / SPECIMEN / DAMAGE</span></div>'
    },
    crust: {
      html: '<div class="scene-visual"><img src="assets/gerrard-source.webp" alt=""><span class="scene-visual__type">NO MASTERS</span><span class="scene-visual__micro">DIY / STENCIL / D-BEAT</span></div>'
    },
    power: {
      html: '<div class="scene-visual"><img src="assets/gerrard-source.webp" alt=""><span class="scene-visual__type">NO<br>PEACE</span><span class="scene-visual__micro">GERRARD / 00:10</span></div>'
    },
    noise: {
      html: '<div class="scene-visual"><img src="assets/gerrard-source.webp" alt=""><span class="scene-visual__type">SIGNAL<br>ROT</span><span class="scene-visual__micro">TRANSMISSION FAILED</span></div>'
    },
    death: {
      html: '<div class="scene-visual"><img src="assets/gerrard-source.webp" alt=""><span class="scene-visual__type">ETERNAL WEIGHT</span><span class="scene-visual__micro">STONE / RELIC / MOURNING</span></div>'
    }
  };

  function apply(){
    const sceneRoot = document.querySelector('#scenes');
    if (!sceneRoot) return false;

    Object.entries(configs).forEach(([key,config]) => {
      const visual = sceneRoot.querySelector(`.scene-card--${key} .scene-card__visual`);
      if (!visual || visual.dataset.sceneVisualApplied === '1') return;
      const index = visual.querySelector('.scene-card__index')?.outerHTML || '';
      visual.innerHTML = config.html + index;
      visual.dataset.sceneVisualApplied = '1';
    });

    // The footer already states that this is not for sale; avoid repeating that message in the final CTA.
    const note = document.querySelector('.storefront-final-cta__actions small');
    if (note) note.remove();
    return true;
  }

  if (!apply()) {
    const observer = new MutationObserver(() => {
      if (apply()) observer.disconnect();
    });
    observer.observe(document.body,{childList:true,subtree:true});
    window.setTimeout(() => observer.disconnect(),7000);
  }
})();
