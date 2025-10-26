document.querySelectorAll(".coctel-card").forEach(card => {
  let timeout;

  // Hover (desktop)
  card.addEventListener("mouseenter", () => {
    timeout = setTimeout(() => card.classList.add("show-info"), 3000);
  });

  card.addEventListener("mouseleave", () => {
    clearTimeout(timeout);
    card.classList.remove("show-info");
  });

  // Tap (móvil)
  card.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      card.classList.toggle("active");
    }
  });
});
