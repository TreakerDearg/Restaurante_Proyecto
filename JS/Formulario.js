// ===============================
// formulario.js — Sistema de Reservas Black Comedor (tabla estilo Excel)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservaForm");
  const feedback = document.getElementById("feedback");

  // === Botón para mostrar reservas en tabla ===
  const showBtn = document.createElement("button");
  showBtn.textContent = "Mostrar Reservas Guardadas";
  showBtn.className = "w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition mt-6";
  form.after(showBtn);

  const reservasContainer = document.createElement("div");
  reservasContainer.className = "mt-6 overflow-x-auto";
  form.after(reservasContainer);
  reservasContainer.classList.add("hidden"); // Oculto por defecto

  // Función para cargar reservas en formato tabla
  const cargarReservas = () => {
    reservasContainer.innerHTML = "";
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");

    if (reservas.length === 0) {
      reservasContainer.innerHTML = `<p class="text-gray-400 text-center italic">No hay reservas registradas.</p>`;
      return;
    }

    const table = document.createElement("table");
    table.className = "w-full border-collapse border border-red-700 text-white";

    // Cabecera
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr class="bg-black bg-opacity-70 border-b border-red-700">
        <th class="p-2 border border-red-700">#</th>
        <th class="p-2 border border-red-700">Nombre</th>
        <th class="p-2 border border-red-700">Email</th>
        <th class="p-2 border border-red-700">Teléfono</th>
        <th class="p-2 border border-red-700">Comensales</th>
        <th class="p-2 border border-red-700">Fecha</th>
        <th class="p-2 border border-red-700">Seña</th>
        <th class="p-2 border border-red-700">Comentarios</th>
        <th class="p-2 border border-red-700">VIP</th>
      </tr>
    `;
    table.appendChild(thead);

    // Cuerpo de la tabla
    const tbody = document.createElement("tbody");
    reservas.forEach((reserva, i) => {
      const tr = document.createElement("tr");
      tr.className = "hover:bg-red-900 hover:bg-opacity-30 transition";
      tr.innerHTML = `
        <td class="p-2 border border-red-700 text-center">${i + 1}</td>
        <td class="p-2 border border-red-700">${reserva.nombre}</td>
        <td class="p-2 border border-red-700">${reserva.email}</td>
        <td class="p-2 border border-red-700">${reserva.telefono}</td>
        <td class="p-2 border border-red-700 text-center">${reserva.comensales}</td>
        <td class="p-2 border border-red-700 text-center">${reserva.fecha}</td>
        <td class="p-2 border border-red-700 text-center">${reserva.sena || "-"}</td>
        <td class="p-2 border border-red-700">${reserva.comentarios || "-"}</td>
        <td class="p-2 border border-red-700 text-center">${reserva.vip ? "Sí" : "No"}</td>
      `;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    reservasContainer.appendChild(table);
  };

  // Mostrar/ocultar reservas al presionar el botón
  showBtn.addEventListener("click", () => {
    reservasContainer.classList.toggle("hidden");
    if (!reservasContainer.classList.contains("hidden")) {
      cargarReservas();
    }
  });

  // === Manejo de envío del formulario ===
  form.addEventListener("submit", e => {
    e.preventDefault();

    // Obtener datos del formulario
    const formData = Object.fromEntries(new FormData(form).entries());
    formData.vip = formData.vip === "Sí"; // Checkbox

    // Guardar en localStorage
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    reservas.push(formData);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    // Feedback visual
    feedback.textContent = "Reserva registrada correctamente.";
    feedback.className = "mt-4 text-center text-green-400 font-mono opacity-100 transition-all duration-700";

    form.reset(); // Limpiar formulario
    setTimeout(() => feedback.classList.add("opacity-0"), 5000);
  });
});
