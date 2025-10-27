// ============================================================
// 🌊 BIOSHOCK CANVAS — Efecto Submarino Dinámico
// ============================================================

const canvas = document.getElementById("bioshockCanvas");
const ctx = canvas.getContext("2d");

let width, height, bubbles = [], lightAngle = 0;

// ====== Resize dinámico ======
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = document.getElementById("cocteles-desktop").offsetHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// ====== Clase Burbuja ======
class Bubble {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = height + Math.random() * height / 2;
    this.radius = Math.random() * 6 + 2;
    this.speed = Math.random() * 0.5 + 0.3;
    this.opacity = Math.random() * 0.3 + 0.2;
    this.shift = Math.random() * 2 * Math.PI;
  }

  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.y / 40 + this.shift) * 0.4;
    if (this.y < -this.radius * 2) this.reset();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }
}

// ====== Inicialización de burbujas ======
function initBubbles(count = 120) {
  bubbles = [];
  for (let i = 0; i < count; i++) {
    bubbles.push(new Bubble());
  }
}
initBubbles();

// ====== Luz oscilante simulando superficie marina ======
function drawLight() {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  const glow = Math.sin(lightAngle) * 0.1 + 0.3;
  gradient.addColorStop(0, `rgba(0, 150, 200, ${0.25 + glow})`);
  gradient.addColorStop(1, `rgba(0, 0, 0, 0.9)`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  lightAngle += 0.005;
}

// ====== Distorsión tipo “agua en movimiento” ======
let distortionOffset = 0;
function drawDistortion() {
  const waveCount = 25;
  ctx.save();
  ctx.globalAlpha = 0.05;
  ctx.beginPath();

  for (let i = 0; i < waveCount; i++) {
    const y = (i / waveCount) * height;
    const offset = Math.sin(distortionOffset + i * 0.5) * 10;
    ctx.moveTo(0, y + offset);
    ctx.lineTo(width, y - offset);
  }

  ctx.strokeStyle = "rgba(0, 100, 200, 0.25)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  distortionOffset += 0.03;
}

// ====== Render principal ======
function animate() {
  ctx.clearRect(0, 0, width, height);
  drawLight();
  drawDistortion();

  for (const b of bubbles) {
    b.update();
    b.draw();
  }

  requestAnimationFrame(animate);
}
animate();
