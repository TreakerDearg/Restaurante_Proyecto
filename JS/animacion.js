document.addEventListener("DOMContentLoaded", () => {

  // === Activar transición de carga ===
  setTimeout(() => {
    document.body.classList.add("loaded");
    const header = document.querySelector("header");
    if (header) header.classList.add("loaded");
  }, 100); // espera 100ms para suavizar la aparición

  // === Texto distorsionado aleatorio (solo después de load) ===
  function distortText() {
    if (!document.body.classList.contains("loaded")) return;
    const elements = document.querySelectorAll(".distorted, .chromatic");
    elements.forEach(el => {
      if (Math.random() < 0.25) {
        const original = el.dataset.text || el.textContent;
        el.dataset.text = original;
        const chars = original.split("");
        const glitchChars = ["#", "█", "░", "▓", "¿", "ø", "∆", "@", "&", "¥", "§"];
        const idx = Math.floor(Math.random() * chars.length);
        chars[idx] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        el.textContent = chars.join("");
      } else if (el.dataset.text) {
        el.textContent = el.dataset.text;
      }
    });
  }
  setInterval(distortText, 200);

  // === Jitter cromático ===
  function jitterChromatic() {
    if (!document.body.classList.contains("loaded")) return;
    const titles = document.querySelectorAll(".chromatic");
    titles.forEach(el => {
      const x = (Math.random() - 0.5) * 2;
      const y = (Math.random() - 0.5) * 2;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
  setInterval(jitterChromatic, 150);

  // === Scroll animation con GSAP ===
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("glow-vhs");
          gsap.fromTo(
            entry.target,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
          );
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll("section, .card").forEach(el => observer.observe(el));

  // === Flicker overlay sutil ===
  const flickerOverlay = document.createElement("div");
  flickerOverlay.classList.add("vhs-flicker");
  document.body.appendChild(flickerOverlay);
  gsap.to(flickerOverlay, {
    opacity: 0.08,
    repeat: -1,
    yoyo: true,
    duration: 0.05,
    ease: "sine.inOut"
  });

  // === Ruido estático tipo TV (canvas) ===
  const noiseCanvas = document.createElement("canvas");
  noiseCanvas.classList.add("noise-layer");
  document.body.appendChild(noiseCanvas);
  const ctx = noiseCanvas.getContext("2d");

  function resizeCanvas() {
    noiseCanvas.width = window.innerWidth;
    noiseCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function drawNoise() {
    if (!document.body.classList.contains("loaded")) return;
    const imageData = ctx.createImageData(noiseCanvas.width, noiseCanvas.height);
    const buffer = new Uint32Array(imageData.data.buffer);
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = Math.random() < 0.02 ? 0xffffffff : 0xff000000;
    }
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(drawNoise);
  }
  drawNoise();

  // === Vibración de videos ===
  function shakeVideos() {
    if (!document.body.classList.contains("loaded")) return;
    const videos = document.querySelectorAll("video");
    videos.forEach(v => {
      const offsetX = (Math.random() - 0.5) * 1.5;
      const offsetY = (Math.random() - 0.5) * 1.5;
      v.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  }
  setInterval(shakeVideos, 90);

  // === Ruido cromático sobre títulos ===
  const rgbTitles = document.querySelectorAll(".chromatic");
  rgbTitles.forEach(title => {
    const text = title.textContent;
    title.innerHTML = `<span class="r">${text}</span>
                       <span class="g">${text}</span>
                       <span class="b">${text}</span>`;
  });

});
