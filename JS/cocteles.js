// ============================================================
// COCTELERÍA DEL CULTO — SCRIPT PRINCIPAL
// Autor: Treaker
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.innerWidth < 768;

  // =============================
  // DESKTOP MODE — VHS BEHAVIOR
  // =============================
  if (!isMobile) {
    const vhsCards = document.querySelectorAll(".vhs-tape");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.remove("hidden");

            // Glitch delay effect
            const title = entry.target.querySelector(".tape-title");
            title.classList.add("glitch-slow");
          }
        });
      },
      { threshold: 0.3 }
    );

    vhsCards.forEach((card) => {
      card.classList.add("hidden");
      observer.observe(card);
    });

    console.log("🎞️ VHS mode enabled: glitch + scroll reveal active");
  }

  // =============================
  // MOBILE MODE — TERMINAL EFFECT
  // =============================
  else {
    const terminalEntries = document.querySelectorAll(".terminal-entry");

    // Función para escribir texto tipo BIOSHOCK
    const typeEffect = (element, text, speed = 25, callback) => {
      element.textContent = "";
      let i = 0;
      const interval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          if (callback) callback();
        }
      }, speed);
    };

    // Secuencia de escritura automática con scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains("active")) {
            entry.target.classList.add("visible", "active");

            const lines = entry.target.querySelectorAll(".terminal-line, .terminal-output");
            let delay = 0;

            lines.forEach((line) => {
              const text = line.dataset.text;
              line.textContent = "";
              setTimeout(() => {
                line.classList.add("typing");
                typeEffect(line, text, 30);
              }, delay);
              delay += text.length * 25 + 400;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    terminalEntries.forEach((entry) => {
      entry.classList.add("hidden");
      observer.observe(entry);
    });

    console.log("🧬 Terminal mode enabled: BIOSHOCK typing active");
  }

  // =============================
  // GLOBAL UTILITY — Smooth Reveal for Shared Elements
  // =============================
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  const globalObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.remove("hidden");
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((el) => {
    el.classList.add("hidden");
    globalObserver.observe(el);
  });
});
