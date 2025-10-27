/* ===============================
   UTILIDAD: DEBOUNCE PARA RESIZE
=============================== */
function debounce(func, wait = 200) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/* ===============================
   LÓGICA DESKTOP – COCTEL CARDS
=============================== */
function initDesktopCards() {
  const desktopCards = document.querySelectorAll("#cocteles-desktop .coctel-card");

  desktopCards.forEach(card => {
    let hoverTimeout;

    const showInfo = () => card.classList.add("show-info");
    const hideInfo = () => {
      clearTimeout(hoverTimeout);
      card.classList.remove("show-info");
    };

    card.addEventListener("mouseenter", () => {
      hoverTimeout = setTimeout(showInfo, 3000); // esperar 3s antes de mostrar info
    });

    card.addEventListener("mouseleave", hideInfo);
  });
}

/* ===============================
   LÓGICA MÓVIL – CARTRIDGES
=============================== */
function initMobileCartridges() {
  const cartridges = document.querySelectorAll("#cocteles-mobile .cartridge");

  cartridges.forEach(cart => {
    cart.addEventListener("click", () => cart.classList.toggle("active"));
  });
}

/* ===============================
   LIMPIAR EVENTOS
=============================== */
function clearDesktopCards() {
  document.querySelectorAll("#cocteles-desktop .coctel-card").forEach(card => {
    card.classList.remove("show-info");
    card.replaceWith(card.cloneNode(true)); // eliminar eventos antiguos
  });
}

function clearMobileCartridges() {
  document.querySelectorAll("#cocteles-mobile .cartridge").forEach(cart => {
    cart.classList.remove("active");
    cart.replaceWith(cart.cloneNode(true)); // eliminar eventos antiguos
  });
}

/* ===============================
   DETECCIÓN DE DISPOSITIVO
=============================== */
function initCocktails() {
  if (window.innerWidth >= 768) {
    clearMobileCartridges();
    initDesktopCards();
  } else {
    clearDesktopCards();
    initMobileCartridges();
  }
}

/* ===============================
   REINICIAR LÓGICA AL REDIMENSIONAR
=============================== */
window.addEventListener("resize", debounce(initCocktails, 250));

/* ===============================
   INICIALIZACIÓN
=============================== */
document.addEventListener("DOMContentLoaded", initCocktails);
