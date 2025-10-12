// =======================
// ANIMACIÓN VHS / HORROR
// =======================
document.addEventListener("DOMContentLoaded", () => {
  // -------------------------
  // CONFIGURACIÓN DE AUDIO
  // -------------------------
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const sounds = {
    static: new Audio("./assets/sounds/vhs_static.mp3"),
    click: new Audio("./assets/sounds/click.mp3"),
    ambiance: new Audio("./assets/sounds/horror_ambience.mp3")
  };

  sounds.static.loop = true;
  sounds.ambiance.loop = true;
  sounds.static.volume = 0.05;
  sounds.ambiance.volume = 0.15;

  function startAudio() {
    if (audioCtx.state === "suspended") audioCtx.resume();
    sounds.static.play();
    sounds.ambiance.play();
  }

  document.body.addEventListener("click", startAudio, { once: true });

  // -------------------------
  // SCANLINES / NOISE ALEATORIO
  // -------------------------
  function createScanline() {
    const scanline = document.createElement("div");
    scanline.classList.add("scanlines");
    scanline.style.opacity = (Math.random() * 0.25 + 0.05).toString();
    document.body.appendChild(scanline);
    setTimeout(() => scanline.remove(), Math.random() * 200 + 100);
  }

  setInterval(createScanline, 300);

  // -------------------------
  // TEXTO DISTORSIONADO (GLITCH)
  // -------------------------
  function glitchText() {
    const elements = document.querySelectorAll(".distorted, .chromatic");
    elements.forEach(el => {
      if (Math.random() < 0.25) {
        const original = el.dataset.text || el.textContent;
        el.dataset.text = original;
        const chars = original.split("");
        const glitchChars = ["#", "█", "░", "▓", "¿", "ø", "∆", "@", "&", "%", "*"];
        const glitchCount = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < glitchCount; i++) {
          const idx = Math.floor(Math.random() * chars.length);
          chars[idx] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        el.textContent = chars.join("");
      } else if (el.dataset.text) {
        el.textContent = el.dataset.text;
      }
    });
  }

  setInterval(glitchText, 180);

  // -------------------------
  // JITTER DE TÍTULOS (CHROMATIC)
  // -------------------------
  function jitterText() {
    const titles = document.querySelectorAll(".chromatic");
    titles.forEach(el => {
      const x = (Math.random() - 0.5) * 2.5;
      const y = (Math.random() - 0.5) * 2.5;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  setInterval(jitterText, 120);

  // -------------------------
  // ANIMACIONES DE SCROLL CON GSAP
  // -------------------------
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target,
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
          );
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll("section, .card, .flip-card").forEach(el => observer.observe(el));

  // -------------------------
  // TRANSICIÓN DE APAGADO
  // -------------------------
  const apagado = document.createElement("div");
  apagado.id = "apagado-screen";
  Object.assign(apagado.style, {
    position: "fixed",
    inset: "0",
    background: "#000",
    color: "#ff0044",
    fontSize: "2rem",
    fontFamily: "'Share Tech Mono', monospace",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "9999",
    opacity: 0,
    transition: "opacity 1s"
  });
  apagado.textContent = "Apagando señal...";
  document.body.appendChild(apagado);

  const navLinks = document.querySelectorAll("nav a, .redirect-btn");
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const url = link.getAttribute("href");
      if (url && !url.startsWith("#")) {
        e.preventDefault();
        apagado.style.opacity = "1";
        sounds.static.volume = 0.02;
        sounds.click.play();

        const glitchFlash = document.createElement("div");
        glitchFlash.style.cssText = `
          position: fixed; inset: 0; background: rgba(255,0,0,0.1);
          z-index: 9998; animation: glitch-flash 0.15s;
        `;
        document.body.appendChild(glitchFlash);
        setTimeout(() => glitchFlash.remove(), 150);

        setTimeout(() => (window.location.href = url), 1800);
      }
    });
  });

  // Keyframes para el flash
  const styleSheet = document.createElement("style");
  styleSheet.innerHTML = `
    @keyframes glitch-flash {
      0% { opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0; }
    }
  `;
  document.head.appendChild(styleSheet);
});
