// vhsFilter.js
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay-vhs");
  const glitchScreen = document.querySelector(".glitch-screen");

  function generateNoise() {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(canvas.width, canvas.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.random() * 255;
      imageData.data[i] = v;
      imageData.data[i + 1] = v;
      imageData.data[i + 2] = v;
      imageData.data[i + 3] = 20; // alpha leve
    }
    ctx.putImageData(imageData, 0, 0);
    overlay.style.backgroundImage = `url(${canvas.toDataURL()})`;
  }

  function glitchEffect() {
    glitchScreen.style.opacity = Math.random() > 0.8 ? Math.random() * 0.3 : 0;
  }

  function loop() {
    generateNoise();
    glitchEffect();
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", generateNoise);
  loop();
});
