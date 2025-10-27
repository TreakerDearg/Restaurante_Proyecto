document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const body = document.body;

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const isActive = navLinks.classList.contains("active");

    // Cambia icono
    menuToggle.innerHTML = isActive
      ? '<ion-icon name="close-outline" class="text-3xl"></ion-icon>'
      : '<ion-icon name="menu-outline" class="text-3xl"></ion-icon>';

    // Bloquea scroll del body cuando el menú está abierto
    body.style.overflow = isActive ? "hidden" : "";
  });

  // Cierra el menú si se redimensiona a desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      menuToggle.innerHTML = '<ion-icon name="menu-outline" class="text-3xl"></ion-icon>';
      body.style.overflow = "";
    }
  });
});
