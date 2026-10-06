(() => {
  const isPreview = location.hostname.endsWith('github.io');

  const form = document.querySelector('.custom-form');
  if (form && isPreview) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      window.alert('Visual-lock preview only. On cPanel this exact form will use the existing BestieBoys custom-enquiry endpoint.');
    });
  }

  if (isPreview) {
    document.querySelectorAll('.house-product').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        window.alert('This House Merch product is linked to its real Shopify handle but is still DRAFT. It will open normally after the product is approved and published.');
      });
    });
  }
})();