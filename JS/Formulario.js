// ===============================
// formulario.js — Envío a Google Sheets + UX optimizado
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");

  // Crear formulario base
  const form = document.createElement("form");
  form.classList.add("space-y-6", "w-full", "distorted");

  // Campos del formulario
  const fields = [
    { label: "Nombre completo", name: "nombre", type: "text", placeholder: "Juan Pérez", required: true },
    { label: "Correo electrónico", name: "email", type: "email", placeholder: "correo@ejemplo.com", required: true },
    { label: "Teléfono", name: "telefono", type: "tel", placeholder: "+54 9 11 1234-5678", required: true },
    { label: "Número de comensales", name: "comensales", type: "number", placeholder: "2", required: true },
    { label: "Fecha de reserva", name: "fecha", type: "date", required: true },
    { label: "Comentarios adicionales", name: "comentarios", type: "textarea", placeholder: "Observaciones...", required: false }
  ];

  // Render dinámico de campos
  fields.forEach(f => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("flex", "flex-col");

    const label = document.createElement("label");
    label.setAttribute("for", f.name);
    label.textContent = f.label;
    label.classList.add("mb-2", "text-gray-300", "font-semibold");

    let input;
    if (f.type === "textarea") {
      input = document.createElement("textarea");
      input.rows = 4;
    } else {
      input = document.createElement("input");
      input.type = f.type;
    }

    input.name = f.name;
    input.id = f.name;
    input.placeholder = f.placeholder || "";
    input.required = f.required;
    input.classList.add(
      "p-3", "rounded-lg", "bg-black", "bg-opacity-60",
      "border", "border-gray-500", "text-white",
      "focus:outline-none", "focus:ring-2", "focus:ring-pink-500",
      "transition-colors", "duration-200"
    );

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    form.appendChild(wrapper);
  });

  // Botón de envío
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Enviar Reserva";
  submitBtn.classList.add(
    "w-full", "py-3", "bg-gradient-to-r", "from-red-700", "to-purple-700",
    "text-black", "font-bold", "rounded-lg",
    "hover:scale-105", "transition-transform", "hover:brightness-125", "distorted"
  );
  form.appendChild(submitBtn);

  // Feedback visual
  const feedback = document.createElement("p");
  feedback.classList.add("mt-2", "text-center", "font-mono", "text-sm");
  form.appendChild(feedback);

  formContainer.appendChild(form);

  // === URL de Apps Script (ajustá tu endpoint)
  const scriptURL = "https://script.google.com/macros/s/AKfycbyYl6RmpHJ5IH3C5dXSZKM9oRLGIkWOAkxNZXShSPp23KmMiDD3vrXzdETbmkND7B/exec";

  // === Envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validación básica
    if (!form.checkValidity()) {
      feedback.textContent = "Por favor, completá todos los campos obligatorios.";
      feedback.classList.add("text-red-500");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";
    feedback.textContent = "";

    const formData = new FormData(form);

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const result = await response.text();
        console.log("Respuesta Google:", result);

        feedback.textContent = "✅ Reserva enviada correctamente. ¡Gracias!";
        feedback.classList.remove("text-red-500");
        feedback.classList.add("text-green-400", "animate-pulse");

        // Reset y animación de éxito
        form.reset();
        setTimeout(() => {
          feedback.classList.remove("animate-pulse");
          feedback.textContent = "";
        }, 3000);
      } else {
        throw new Error("Error al enviar los datos al servidor.");
      }
    } catch (error) {
      console.error("Error en el envío:", error);
      feedback.textContent = "❌ Error de conexión o servidor. Intenta nuevamente.";
      feedback.classList.remove("text-green-400");
      feedback.classList.add("text-red-500");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar Reserva";
    }
  });
});
