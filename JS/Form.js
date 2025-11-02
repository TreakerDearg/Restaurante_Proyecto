// ===============================
// formulario.js — Sistema de Reservas Black Comedor
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservaForm");
  const feedback = document.getElementById("feedback");

  // Botón para mostrar reservas
  const showBtn = document.createElement("button");
  showBtn.textContent = "Mostrar Reservas Guardadas";
  showBtn.className = "w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition mt-6";
  form.after(showBtn);

  const reservasContainer = document.createElement("div");
  reservasContainer.className = "mt-6 overflow-x-auto hidden";
  form.after(reservasContainer);

  const API_URL = "https://restaurante-proyecto.onrender.com/api/reservas";


  // Función para cargar reservas
  const cargarReservas = async () => {
    reservasContainer.innerHTML = `<p class="text-gray-400 text-center italic">Cargando reservas...</p>`;
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const reservas = await res.json();
      if (!reservas.length) {
        reservasContainer.innerHTML = `<p class="text-gray-400 text-center italic">No hay reservas registradas.</p>`;
        return;
      }

      const table = document.createElement("table");
      table.className = "w-full border-collapse border border-red-700 text-white";

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
          <td class="p-2 border border-red-700 text-center">${new Date(reserva.fecha).toLocaleDateString()}</td>
          <td class="p-2 border border-red-700 text-center">${reserva.sena || "-"}</td>
          <td class="p-2 border border-red-700">${reserva.comentarios || "-"}</td>
          <td class="p-2 border border-red-700 text-center">${reserva.vip ? "Sí" : "No"}</td>
        `;
        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      reservasContainer.innerHTML = "";
      reservasContainer.appendChild(table);
    } catch (err) {
      console.error(err);
      reservasContainer.innerHTML = `<p class="text-red-500 text-center italic">Error al cargar las reservas.</p>`;
    }
  };

  // Toggle reservas
  showBtn.addEventListener("click", () => {
    reservasContainer.classList.toggle("hidden");
    if (!reservasContainer.classList.contains("hidden")) cargarReservas();
  });

  // Envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      telefono: form.telefono.value.trim(),
      comensales: Number(form.comensales.value) || 1,
      fecha: form.fecha.value,
      sena: Number(form.sena.value) || 0,
      comentarios: form.comentarios.value.trim(),
      vip: form.vip.checked
    };

    feedback.textContent = "Enviando reserva...";
    feedback.className = "mt-4 text-center text-gray-400 font-mono opacity-100";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      const result = await res.json();

      if (res.ok) {
        feedback.textContent = "✅ Reserva guardada exitosamente.";
        feedback.className = "mt-4 text-center text-green-400 font-mono opacity-100";
        form.reset();

        if (!reservasContainer.classList.contains("hidden")) cargarReservas();
      } else {
        feedback.textContent = `❌ Error al guardar la reserva: ${result.error || "Desconocido"}`;
        feedback.className = "mt-4 text-center text-red-500 font-mono opacity-100";
      }
    } catch (err) {
      console.error(err);
      feedback.textContent = "❌ No se pudo conectar con el servidor.";
      feedback.className = "mt-4 text-center text-red-500 font-mono opacity-100";
    }
  });
});
