// soundscape.js
document.addEventListener("DOMContentLoaded", () => {
  const sound = new Howl({
    src: ["./assets/audio/hum_loop.mp3"],
    loop: true,
    volume: 0.25
  });

  const toggleBtn = document.getElementById("sound-toggle");

  toggleBtn.addEventListener("click", () => {
    if (sound.playing()) {
      sound.pause();
      toggleBtn.innerHTML = '<ion-icon name="volume-mute-outline" size="large"></ion-icon>';
    } else {
      sound.play();
      toggleBtn.innerHTML = '<ion-icon name="volume-high-outline" size="large"></ion-icon>';
    }
  });

  // Hover sobre secciones clave
  const vhsSections = document.querySelectorAll("section");
  vhsSections.forEach(sec => {
    sec.addEventListener("mouseenter", () => {
      sound.volume(0.35);
    });
    sec.addEventListener("mouseleave", () => {
      sound.volume(0.25);
    });
  });
});
