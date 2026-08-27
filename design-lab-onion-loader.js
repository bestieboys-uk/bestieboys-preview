(async () => {
  const root = document.documentElement;
  const directWebp = 'review-v3/assets/styles/onion/onion-all-locked-sprite.webp?v=designlab2';

  async function useDirectImage(url) {
    await new Promise((resolve, reject) => {
      const probe = new Image();
      probe.onload = resolve;
      probe.onerror = reject;
      probe.src = url;
    });
    root.style.setProperty('--onion-sprite-image', `url("${url}")`);
    root.classList.remove('onion-sprite-error');
    root.classList.add('onion-sprite-ready');
  }

  try {
    await useDirectImage(directWebp);
    return;
  } catch (_) {
    // The current review branch still carries the temporary transfer fallback.
    // Keep Design Lab functional until the verified binary WebP replaces it.
  }

  const urls = [1,2,3,4,5,6,7].map(n =>
    `review-v3/assets/styles/onion/onion-sprite-b64-0${n}.txt?v=2`
  );

  try {
    const responses = await Promise.all(urls.map(url => fetch(url, {cache:'force-cache'})));
    for (const response of responses) {
      if (!response.ok) throw new Error(`Onion sprite chunk failed: ${response.status} ${response.url}`);
    }
    const parts = await Promise.all(responses.map(response => response.text()));
    const base64 = parts.join('').replace(/\s+/g,'');
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i=0;i<binary.length;i+=1) bytes[i]=binary.charCodeAt(i);
    const blobUrl = URL.createObjectURL(new Blob([bytes], {type:'image/avif'}));
    await useDirectImage(blobUrl);
  } catch (error) {
    console.error('Design Lab Onion sprite failed to load', error);
    root.classList.add('onion-sprite-error');
  }
})();