document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");

  // Crear dinámicamente el formulario
  const form = document.createElement("form");
  form.classList.add("space-y-4", "w-full", "distorted"); // "distorted" para efecto VHS

  // Campos del formulario
  const fields = [
    { label: "Nombre completo", name: "nombre", type: "text", required: true },
    { label: "Correo electrónico", name: "email", type: "email", required: true },
    { label: "Teléfono", name: "telefono", type: "tel", required: true },
    { label: "Número de comensales", name: "comensales", type: "number", required: true },
    { label: "Fecha de reserva", name: "fecha", type: "date", required: true },
    { label: "Comentarios adicionales", name: "comentarios", type: "textarea", required: false }
  ];

  fields.forEach(f => {
    const fieldWrapper = document.createElement("div");
    fieldWrapper.classList.add("flex", "flex-col");

    const label = document.createElement("label");
    label.textContent = f.label;
    label.classList.add("mb-1");
    label.setAttribute("for", f.name);

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
    input.required = f.required;
    input.classList.add(
      "p-2", "rounded", "bg-black", "bg-opacity-60",
      "border", "border-gray-500", "text-white",
      "focus:outline-none", "focus:border-pink-500"
    );

    fieldWrapper.appendChild(label);
    fieldWrapper.appendChild(input);
    form.appendChild(fieldWrapper);
  });

  // Botón de envío
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Enviar Reserva";
  submitBtn.classList.add("button");
  form.appendChild(submitBtn);

  // Feedback
  const feedback = document.createElement("p");
  feedback.classList.add("mt-2", "text-center", "text-green-400");
  form.appendChild(feedback);

  formContainer.appendChild(form);

  // URL de tu Web App en Google Apps Script
  const scriptURL = "https://script.google.com/macros/s/AKfycbyYl6RmpHJ5IH3C5dXSZKM9oRLGIkWOAkxNZXShSPp23KmMiDD3vrXzdETbmkND7B/exec";

  // Manejar envío
  form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(scriptURL, {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (response.ok) {
        feedback.textContent = "¡Reserva enviada correctamente! Gracias.";
        form.reset();

        // Pequeño glitch visual de confirmación
        const originalColor = submitBtn.style.backgroundColor;
        submitBtn.style.backgroundColor = "#ff0044";
        setTimeout(() => submitBtn.style.backgroundColor = originalColor, 400);
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
