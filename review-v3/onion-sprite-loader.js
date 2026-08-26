(async () => {
  const root = document.documentElement;
  const urls = [
    "assets/styles/onion/onion-sprite-b64-01.txt?v=2",
    "assets/styles/onion/onion-sprite-b64-02.txt?v=2",
    "assets/styles/onion/onion-sprite-b64-03.txt?v=2",
    "assets/styles/onion/onion-sprite-b64-04.txt?v=2",
    "assets/styles/onion/onion-sprite-b64-05.txt?v=2",
    "assets/styles/onion/onion-sprite-b64-06.txt?v=2",
    "assets/styles/onion/onion-sprite-b64-07.txt?v=2"
  ];

  try {
    const responses = await Promise.all(urls.map((url) => fetch(url, { cache: "force-cache" })));
    for (const response of responses) {
      if (!response.ok) throw new Error(`Onion sprite chunk failed: ${response.status} ${response.url}`);
    }

    const parts = await Promise.all(responses.map((response) => response.text()));
    const base64 = parts.join("").replace(/\s+/g, "");
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);

    const blobUrl = URL.createObjectURL(new Blob([bytes], { type: "image/avif" }));
    await new Promise((resolve, reject) => {
      const probe = new Image();
      probe.onload = resolve;
      probe.onerror = () => reject(new Error("Rebuilt Onion sprite could not be decoded"));
      probe.src = blobUrl;
    });

    root.style.setProperty("--onion-sprite-image", `url("${blobUrl}")`);
    root.classList.remove("onion-sprite-error");
    root.classList.add("onion-sprite-ready");
  } catch (error) {
    console.error("Onion sprite failed to load", error);
    root.classList.add("onion-sprite-error");
  }
})();
