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


document.addEventListener("DOMContentLoaded", () => {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const desktopSection = document.getElementById("cocteles-desktop");
  const mobileSection = document.getElementById("cocteles-mobile");

  if (isMobile) {
    desktopSection.style.display = "none";
    mobileSection.style.display = "block";
  } else {
    desktopSection.style.display = "block";
    mobileSection.style.display = "none";
  }
});


const cartridges = document.querySelectorAll('.cartridge');
const popup = document.getElementById('ingredientes-popup');
const popupText = popup.querySelector('p');

cartridges.forEach(cart => {
  cart.addEventListener('click', () => {
    const ingredientes = cart.getAttribute('data-ingredientes');
    popupText.textContent = ingredientes;
    popup.classList.remove('hidden');

    // Efecto de “disparo” / vibración breve
    cart.classList.add('shake');
    setTimeout(() => cart.classList.remove('shake'), 400);

    // Ocultar después de 3s
    setTimeout(() => popup.classList.add('hidden'), 3000);
  });
});
