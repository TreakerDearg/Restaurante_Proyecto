// lantern.js
document.addEventListener("DOMContentLoaded", () => {
  const mask = document.getElementById("light-mask");

  mask.style.position = "fixed";
  mask.style.top = "0";
  mask.style.left = "0";
  mask.style.width = "100vw";
  mask.style.height = "100vh";
  mask.style.pointerEvents = "none";
  mask.style.mixBlendMode = "multiply";

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let targetX = mouseX;
  let targetY = mouseY;

  function updateGradient() {
    const radius = Math.max(window.innerWidth, window.innerHeight) * 0.15;
    mask.style.background = `radial-gradient(circle ${radius}px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.95) 70%)`;
  }

  function animateLight() {
    mouseX += (targetX - mouseX) * 0.15;
    mouseY += (targetY - mouseY) * 0.15;
    updateGradient();
    requestAnimationFrame(animateLight);
  }

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  window.addEventListener("resize", updateGradient);
  animateLight();
});
