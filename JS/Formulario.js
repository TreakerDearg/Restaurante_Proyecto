// ===============================
// formulario.js — Sistema de Reservas Black Comedor
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");

  // === Crear formulario dinámicamente ===
  const form = document.createElement("form");
  form.id = "reservaForm";
  form.classList.add(
    "space-y-6", "w-full", "max-w-lg", "mx-auto", "p-6",
    "rounded-xl", "backdrop-blur-md", "bg-black", "bg-opacity-60",
    "border", "border-red-700", "shadow-lg", "shadow-red-900"
  );

  const fields = [
    { label: "Nombre completo", name: "nombre", type: "text", placeholder: "Juan Pérez", required: true },
    { label: "Correo electrónico", name: "email", type: "email", placeholder: "correo@ejemplo.com", required: true },
    { label: "Teléfono", name: "telefono", type: "tel", placeholder: "+54 9 11 1234-5678", required: true },
    { label: "Número de comensales", name: "comensales", type: "number", placeholder: "2", required: true },
    { label: "Fecha de reserva", name: "fecha", type: "date", required: true },
    { label: "Seña (opcional)", name: "sena", type: "number", placeholder: "Ej: 5000", required: false },
    { label: "Comentarios adicionales", name: "comentarios", type: "textarea", placeholder: "Observaciones o alergias..." }
  ];

  // Render dinámico
  fields.forEach(f => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("flex", "flex-col");

    const label = document.createElement("label");
    label.htmlFor = f.name;
    label.textContent = f.label;
    label.classList.add("mb-2", "text-gray-300", "font-semibold");

    const input = f.type === "textarea"
      ? Object.assign(document.createElement("textarea"), { rows: 4 })
      : Object.assign(document.createElement("input"), { type: f.type });

    input.name = f.name;
    input.id = f.name;
    input.placeholder = f.placeholder || "";
    input.required = f.required || false;
    input.classList.add(
      "p-3", "rounded-lg", "bg-black", "bg-opacity-70",
      "border", "border-gray-600", "text-white",
      "focus:outline-none", "focus:ring-2", "focus:ring-red-500",
      "transition", "duration-300"
    );

    wrapper.append(label, input);
    form.appendChild(wrapper);
  });

  // Campo adicional — Cliente VIP
  const vipWrapper = document.createElement("div");
  vipWrapper.classList.add("flex", "items-center", "space-x-3");

  const vipInput = document.createElement("input");
  vipInput.type = "checkbox";
  vipInput.id = "vip";
  vipInput.name = "vip";
  vipInput.value = "Sí";
  vipInput.classList.add("h-5", "w-5", "text-red-600", "focus:ring-red-500");

  const vipLabel = document.createElement("label");
  vipLabel.htmlFor = "vip";
  vipLabel.textContent = "Cliente VIP";
  vipLabel.classList.add("text-gray-300", "font-semibold");

  vipWrapper.append(vipInput, vipLabel);
  form.appendChild(vipWrapper);

  // Botón de envío
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Enviar Reserva";
  submitBtn.classList.add(
    "w-full", "py-3", "bg-gradient-to-r", "from-red-700", "to-purple-700",
    "text-white", "font-bold", "rounded-lg", "hover:scale-105",
    "transition-transform", "hover:brightness-125", "tracking-wide", "uppercase"
  );
  form.appendChild(submitBtn);

  // Feedback visual
  const feedback = document.createElement("div");
  feedback.classList.add("mt-4", "text-center", "font-mono", "opacity-0", "transition", "duration-500");
  form.appendChild(feedback);

  formContainer.innerHTML = "";
  formContainer.appendChild(form);

  // === URL del Apps Script (Backend) ===
  const scriptURL = "https://script.google.com/macros/s/AKfycbxaT81D9tZB_rd7mnPIkUQCsvQg3XcXWuVx8wrpBojPWOrx1I3y-97a9bRy39lnS9Qf/exec";

  // === Envío del formulario ===
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(form);

    feedback.textContent = "Procesando reserva...";
    feedback.className = "mt-4 text-center text-blue-400 font-mono opacity-100 animate-pulse";
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });

      if (response.ok || response.type === "opaque") {
        feedback.textContent = " Reserva enviada correctamente.";
        feedback.className = "mt-4 text-center text-green-400 font-mono opacity-100 transition-all duration-700";
        form.reset();
      } else {
        throw new Error("Respuesta del servidor no válida");
      }

    } catch (error) {
      console.error("Error:", error);
      feedback.textContent = " Error al conectar con el servidor.";
      feedback.className = "mt-4 text-center text-red-400 font-mono opacity-100";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar Reserva";
      setTimeout(() => feedback.classList.add("opacity-0"), 5000);
    }
  });
});
