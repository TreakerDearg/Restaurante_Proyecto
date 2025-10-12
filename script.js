// === Audio locales ===
const staticSound = new Howl({ src: ['./Assets/Audio/TvEstatica.mp3'], volume: 0.2, loop: true });
const shutdownHum = new Howl({ src: ['./Assets/Audio/ShutDown.mp3'], volume: 0.5 });
const susurros = [
  new Howl({ src: ['./Assets/Audio/Susurros.mp3'], volume: 0.8 }),
  new Howl({ src: ['./Assets/Audio/SusurrosYGritos.mp3'], volume: 0.8 }),
  new Howl({ src: ['./Assets/Audio/DemonioSusurrando.mp3'], volume: 0.8 })
];
const tecleado = new Howl({ src: ['./Assets/Audio/Tecleado.mp3'], volume: 0.5 });

// === Frases más variadas ===
const frases = [
  "Grabando... ¿o mirando?", "El chef no olvida.", "La cinta respira...",
  "No abras la puerta trasera.", "El menú cambia cada noche...", "Escucha.", 
  "Demasiado tarde...", "Algo se mueve en la cocina...", 
  "Las luces parpadean sin razón.", "No mires detrás de ti.", 
  "El sabor del miedo es intenso.", "Ellos siempre vigilan..."
];

// === Texto corrupto estilo glitch ===
function textoCorrupto(txt) {
  return txt.split('').map(ch => Math.random() < 0.15 ? "░▒▓█"[Math.floor(Math.random()*4)] : ch).join('');
}

// === Función de frases y susurros ===
function lanzarFrase() {
  if (Math.random() < 0.85) { // 85% de probabilidad
    const el = document.createElement('div');
    el.className = 'phrase';
    el.textContent = textoCorrupto(frases[Math.floor(Math.random() * frases.length)]);
    el.style.top = (Math.random() * 70 + 10) + '%';
    el.style.left = (Math.random() * 80 + 5) + '%';
    document.querySelector('.screen').appendChild(el);

    gsap.to(el, { opacity: 1, duration: 0.2 });
    setTimeout(() => gsap.to(el, { opacity: 0, duration: 0.5, onComplete: () => el.remove() }), 1200);

    // Susurros: reproducir solo si no está sonando
    const susurro = susurros[Math.floor(Math.random() * susurros.length)];
    if (!susurro.playing()) {
      susurro.play();
      // Stutter aleatorio para efecto espectral
      setTimeout(() => { if (!susurro.playing()) susurro.play(); }, Math.random()*500);
    }
  }
}

// === Estática VHS mejorada ===
function randomStatic() {
  if (staticSound.playing()) {
    const vol = 0.15 + Math.random() * 0.1; // 0.15 ~ 0.25
    staticSound.volume(vol);
    if (Math.random() < 0.07) staticSound.rate(0.8 + Math.random()*0.4);
    else staticSound.rate(1);
  }
}
setInterval(randomStatic, 150);

// === Click para desbloquear audio ===
document.getElementById('clickStart').addEventListener('click', () => {
  staticSound.play();
  document.getElementById('clickStart').style.display = 'none';
  iniciarAnimaciones();
}, { once: true });

// === Animaciones principales ===
function iniciarAnimaciones() {
  setInterval(lanzarFrase, 600); // más frecuentes

  // Secuencia inicial
  gsap.to("#mainText", { opacity: 1, delay: 2, duration: 1 });
  gsap.to("#mainText", { opacity: 0, delay: 5, duration: 1 });
  gsap.to("#logo", { opacity: 1, scale: 1.1, delay: 6, duration: 1 });
  gsap.to("#subtitle", { opacity: 1, delay: 8, duration: 1 });

  // Apagado y frase final
  setTimeout(() => {
    staticSound.fade(staticSound.volume(), 0, 1.5);
    gsap.to(".content, .vhs-overlay, .tracking-lines, .bg-text", { opacity: 0, duration: 1 });

    const finalEl = document.getElementById("finalText");
    finalEl.style.opacity = 1;
    const phrase = "Los mortales jamás salen...";
    let i = 0;

    const typeInterval = setInterval(() => {
      finalEl.textContent += phrase[i++];
      if (i % 3 === 0) tecleado.play(); // efecto tecleado natural
      if (i >= phrase.length) {
        clearInterval(typeInterval);
        setTimeout(() => { shutdownHum.play(); window.location.href = "restaurante.html"; }, 1500);
      }
    }, 120);
  }, 12000);
}
