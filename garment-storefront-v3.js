(() => {
  function renderBoard(){
    const strip = document.querySelector('#formats .product-strip');
    if (!strip || !window.__BB_GARMENT_BOARD) return false;

    const src = 'data:image/webp;base64,' + window.__BB_GARMENT_BOARD;
    strip.innerHTML = `
      <article class="garment-board-card">
        <img class="garment-board-image" src="${src}" alt="Bestie Boys black garment development board showing short-sleeve tee, longsleeve with xBxBx sleeves and I LOVE MY GOOD BOY back, pullover hoodie, zip hoodie, fitted tee, cap and sticker">
        <div class="garment-board-caption">
          <strong>Temporary garment system</strong>
          <span>Black garments / Bestie Boys branding only / scene artwork still in development</span>
        </div>
      </article>`;

    const head = document.querySelector('#formats .section-head h2');
    const intro = document.querySelector('#formats .section-head p');
    if (head) head.innerHTML = 'BLACK GARMENTS.<br><em>REAL MOCKUPS.</em>';
    if (intro) intro.textContent = 'The line-drawn placeholders have been removed. This rendered development board is now the temporary format reference until final supplier blanks and scene-specific artwork are approved.';
    return true;
  }

  if (!renderBoard()) {
    window.addEventListener('load', renderBoard, {once:true});
  }
})();
