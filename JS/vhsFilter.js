// Efecto de ondas en pantalla (scanlines)
function initVHSOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'vhs-wave-overlay fixed inset-0 pointer-events-none z-50';
  document.body.appendChild(overlay);
}

document.addEventListener('DOMContentLoaded', initVHSOverlay);

// Efecto hover con sombras y brillo VHS
const menuItems = document.querySelectorAll('.menu-item, .flip-card');

menuItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.classList.add('shadow-[0_0_25px_rgba(255,0,0,0.7)]');
  });
  item.addEventListener('mouseleave', () => {
    item.classList.remove('shadow-[0_0_25px_rgba(255,0,0,0.7)]');
  });
});

const formContainer = document.getElementById('formContainer');

const formHTML = `
<form class="space-y-4 text-gray-300">
  <div>
    <label>Nombre</label>
    <input type="text" name="nombre" class="w-full p-2 rounded bg-black border border-red-700" required>
  </div>
  <div>
    <label>Email</label>
    <input type="email" name="email" class="w-full p-2 rounded bg-black border border-red-700" required>
  </div>
  <div>
    <label>Asistirás al ritual?</label>
    <select name="asistencia" class="w-full p-2 rounded bg-black border border-red-700" required>
      <option value="">Selecciona...</option>
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
  </div>
  <button type="submit" class="vhs-btn w-full">Enviar Convocatoria</button>
</form>
`;

formContainer.innerHTML = formHTML;

formContainer.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Convocatoria enviada. Pronto recibirás la invitación al ritual.');
});

