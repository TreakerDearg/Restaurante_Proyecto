document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");

  // Crear formulario
  const form = document.createElement("form");
  form.classList.add("space-y-6", "w-full", "distorted"); // "distorted" para glitch

  // Configuración de campos
  const fields = [
    { label: "Nombre completo", name: "nombre", type: "text", placeholder: "Juan Pérez", required: true },
    { label: "Correo electrónico", name: "email", type: "email", placeholder: "correo@ejemplo.com", required: true },
    { label: "Teléfono", name: "telefono", type: "tel", placeholder: "+54 9 11 1234-5678", required: true },
    { label: "Número de comensales", name: "comensales", type: "number", placeholder: "2", required: true },
    { label: "Fecha de reserva", name: "fecha", type: "date", required: true },
    { label: "Comentarios adicionales", name: "comentarios", type: "textarea", placeholder: "Observaciones...", required: false }
  ];

  // Crear campos dinámicamente
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

  // Botón de envío con efecto VHS
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Enviar Reserva";
  submitBtn.classList.add(
    "w-full", "py-3", "bg-gradient-to-r", "from-red-700", "to-purple-700",
    "text-black", "font-bold", "rounded-lg",
    "hover:scale-105", "transition-transform", "hover:brightness-125", "distorted"
  );
  form.appendChild(submitBtn);

  // Feedback
  const feedback = document.createElement("p");
  feedback.classList.add("mt-2", "text-center", "text-green-400", "font-mono");
  form.appendChild(feedback);

  formContainer.appendChild(form);

  // URL de tu Web App Google Apps Script
  const scriptURL = "https://script.google.com/macros/s/AKfycbyYl6RmpHJ5IH3C5dXSZKM9oRLGIkWOAkxNZXShSPp23KmMiDD3vrXzdETbmkND7B/exec";

  // Envío del formulario
  form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(scriptURL, { method: "POST", body: formData })
      .then(response => {
        if (response.ok) {
          feedback.textContent = "¡Reserva enviada correctamente! Gracias.";
          feedback.classList.add("animate-pulse"); // pequeño parpadeo VHS
          setTimeout(() => feedback.classList.remove("animate-pulse"), 800);
          form.reset();

          // Efecto glitch rápido en botón
          const originalBg = submitBtn.style.background;
          submitBtn.style.background = "#ff0044";
          setTimeout(() => submitBtn.style.background = originalBg, 400);
        } else {
          feedback.textContent = "Error al enviar la reserva. Intenta nuevamente.";
        }
      })
      .catch(err => {
        feedback.textContent = "Error de conexión. Intenta más tarde.";
        console.error(err);
      });
  });
});
