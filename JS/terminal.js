document.addEventListener("DOMContentLoaded", () => {
  const entries = document.querySelectorAll("#cocteles-mobile .terminal-entry");

  let index = 0;

  function showNextEntry() {
    if (index >= entries.length) return;
    const entry = entries[index];
    entry.classList.add("visible");

    // Activar tipeo
    const lines = entry.querySelectorAll(".terminal-line, .terminal-output");
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add("typing");
      }, i * 400);
    });

    index++;
    setTimeout(showNextEntry, 800); // tiempo antes de mostrar la siguiente entrada
  }

  showNextEntry();
});
