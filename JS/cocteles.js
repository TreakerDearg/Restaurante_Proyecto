/* ===============================
   LOGICA DESKTOP – COCTEL CARDS
=============================== */
function initDesktopCards() {
  // Seleccionamos solo las cards de desktop
  const desktopCards = document.querySelectorAll("#cocteles-desktop .coctel-card");

  desktopCards.forEach(card => {
    let hoverTimeout;

    // Mostrar info después de 3 segundos de hover
    card.addEventListener("mouseenter", () => {
      hoverTimeout = setTimeout(() => card.classList.add("show-info"), 3000);
    });

    // Ocultar info al salir del hover
    card.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimeout);
      card.classList.remove("show-info");
    });
  });
}

/* ===============================
   LOGICA MOVIL – CARTRIDGES
=============================== */
function initMobileCartridges() {
  const cartridges = document.querySelectorAll("#cocteles-mobile .cartridge");

  cartridges.forEach(cart => {
    cart.addEventListener("click", () => {
      cart.classList.toggle("active");
    });
  });
}

/* ===============================
   DETECCION DE DISPOSITIVO
=============================== */
function initCocktails() {
  if (window.innerWidth >= 768) {
    // Desktop
    initDesktopCards();
  } else {
    // Móvil
    initMobileCartridges();
  }
}

/* ===============================
   REINICIAR LOGICA AL REDIMENSIONAR
=============================== */
window.addEventListener("resize", () => {
  // Limpiar antes de reiniciar para evitar duplicados
  document.querySelectorAll(".coctel-card").forEach(card => card.classList.remove("show-info"));
  document.querySelectorAll(".cartridge").forEach(cart => cart.classList.remove("active"));

  initCocktails();
});

/* ===============================
   INICIALIZACION
=============================== */
document.addEventListener("DOMContentLoaded", initCocktails);
