// animacion.js
document.addEventListener("DOMContentLoaded", () => {

  // === Texto distorsionado aleatorio ===
  function distortText() {
    const elements = document.querySelectorAll(".distorted, .chromatic");
    elements.forEach(el => {
      if (Math.random() < 0.25) {
        const original = el.dataset.text || el.textContent;
        el.dataset.text = original;
        const chars = original.split("");
        const glitchChars = ["#", "█", "░", "▓", "¿", "ø", "∆", "@", "&"];
        const idx = Math.floor(Math.random() * chars.length);
        chars[idx] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        el.textContent = chars.join("");
      } else if (el.dataset.text) {
        el.textContent = el.dataset.text;
      }
    });
  }
  setInterval(distortText, 200);

  // === Títulos Chromatic jitter ===
  function jitterChromatic() {
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

});
