document.addEventListener("DOMContentLoaded", () => {
  const entries = document.querySelectorAll("#cocteles-mobile .terminal-entry");
  let index = 0;

  function showNextEntry() {
    if (index >= entries.length) return;

    const entry = entries[index];
    entry.classList.add("visible");

    // Activar tipeo línea por línea
    const lines = entry.querySelectorAll(".terminal-line, .terminal-output");
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add("typing");
      }, i * 400); // Delay entre líneas
    });

    // Activar imagen si existe
    const img = entry.querySelector(".terminal-img");
    if (img) {
      setTimeout(() => {
        img.style.opacity = "1";
        img.style.transform = "scale(1)";
      }, lines.length * 400); // Después de tipeo
    }

    index++;
    // Tiempo antes de mostrar la siguiente entrada
    setTimeout(showNextEntry, lines.length * 400 + 600);
  }

  showNextEntry();
});
