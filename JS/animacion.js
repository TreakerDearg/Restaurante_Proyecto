document.addEventListener("DOMContentLoaded", () => {

  // =======================
  // ACTIVAR TRANSICIÓN DE CARGA
  // =======================
  setTimeout(() => {
    document.body.classList.add("loaded");
    const header = document.querySelector("header");
    if (header) header.classList.add("loaded");
  }, 100);

  // =======================
  // TEXTO DISTORSIONADO ALEATORIO
  // =======================
  function distortText() {
    if (!document.body.classList.contains("loaded")) return;
    const elements = document.querySelectorAll(".distorted, .chromatic");
    elements.forEach(el => {
      if (Math.random() < 0.2) {
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

  // =======================
  // JITTER CROMÁTICO SUAVE
  // =======================
  function jitterChromatic() {
    if (!document.body.classList.contains("loaded")) return;
    const titles = document.querySelectorAll(".chromatic span");
    titles.forEach(el => {
      const x = (Math.random() - 0.5) * 1.5;
      const y = (Math.random() - 0.5) * 1.5;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
  setInterval(jitterChromatic, 150);

  // =======================
  // SCROLL ANIMATION (GSAP)
  // =======================
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
  document.querySelectorAll("section, .card, .flip-card").forEach(el => observer.observe(el));

  // =======================
  // OVERLAY VHS / FLICKER SUAVE
  // =======================
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

  // =======================
  // NOISE ESTÁTICO (Canvas)
  // =======================
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
      buffer[i] = Math.random() < 0.015 ? 0xffffffff : 0xff000000;
    }
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(drawNoise);
  }
  drawNoise();

  // =======================
  // VIBRACIÓN DE VIDEOS
  // =======================
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

  // =======================
  // RGB CHROMATIC TEXT
  // =======================
  const rgbTitles = document.querySelectorAll(".chromatic");
  rgbTitles.forEach(title => {
    if (title.dataset.processed) return; // evita duplicar
    const text = title.textContent;
    title.dataset.processed = true;
    title.innerHTML = `<span class="r">${text}</span>
                       <span class="g">${text}</span>
                       <span class="b">${text}</span>`;
  });

  // =======================
  // VHS GLITCH RANDOM
  // =======================
  function glitchEffect() {
    if (!document.body.classList.contains("loaded")) return;
    const cards = document.querySelectorAll(".card, .flip-card");
    cards.forEach(card => {
      if (Math.random() < 0.02) {
        const x = (Math.random() - 0.5) * 8;
        const y = (Math.random() - 0.5) * 8;
        card.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
        setTimeout(() => { card.style.transform = ""; }, 100);
      }
    });
  }
  setInterval(glitchEffect, 400);

});

// JS: Filtro de menú
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Botón activo visual
      filterButtons.forEach(b => b.classList.remove('opacity-70'));
      btn.classList.add('opacity-70');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if(filter === 'todos' || category === filter) {
          card.classList.remove('hidden');
          card.classList.add('block');
        } else {
          card.classList.remove('block');
          card.classList.add('hidden');
        }
      });
    });
  });
});

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");

  // Cambia icono
  menuToggle.innerHTML = navLinks.classList.contains("show")
    ? '<ion-icon name="close-outline" class="text-3xl"></ion-icon>'
    : '<ion-icon name="menu-outline" class="text-3xl"></ion-icon>';
});
