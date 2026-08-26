(() => {
  try {
    const parts = window.__onionSpriteParts || [];
    if (parts.length !== 3) throw new Error(`Expected 3 Onion sprite parts, got ${parts.length}`);
    const binary = atob(parts.join(""));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    const blobUrl = URL.createObjectURL(new Blob([bytes], { type: "image/avif" }));
    document.documentElement.style.setProperty("--onion-sprite-image", `url("${blobUrl}")`);
    document.documentElement.classList.add("onion-sprite-ready");
    window.__onionSpriteParts = [];
  } catch (error) {
    console.error("Onion sprite failed to load", error);
    document.documentElement.classList.add("onion-sprite-error");
  }
})();
