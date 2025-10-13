// ===============================
// formulario.js — Sistema de Reservas Black Comedor
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");

  // Crear formulario dinámicamente
  const form = document.createElement("form");
  form.id = "reservaForm";
  form.classList.add("space-y-6", "w-full", "max-w-lg", "mx-auto", "p-6", "rounded-xl", "backdrop-blur-md", "bg-black", "bg-opacity-60", "border", "border-red-700", "shadow-lg", "shadow-red-900", "chromatic");

  const fields = [
    { label: "Nombre completo", name: "nombre", type: "text", placeholder: "Juan Pérez", required: true },
    { label: "Correo electrónico", name: "email", type: "email", placeholder: "correo@ejemplo.com", required: true },
    { label: "Teléfono", name: "telefono", type: "tel", placeholder: "+54 9 11 1234-5678", required: true },
    { label: "Número de comensales", name: "comensales", type: "number", placeholder: "2", required: true },
    { label: "Fecha de reserva", name: "fecha", type: "date", required: true },
    { label: "Comentarios adicionales", name: "comentarios", type: "textarea", placeholder: "Observaciones o alergias..." }
  ];

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
    input.required = f.required || false;
    input.classList.add(
      "p-3", "rounded-lg", "bg-black", "bg-opacity-70",
      "border", "border-gray-600", "text-white",
      "focus:outline-none", "focus:ring-2", "focus:ring-red-500",
      "transition", "duration-300"
    );

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    form.appendChild(wrapper);
  });

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Enviar Reserva";
  submitBtn.classList.add(
    "w-full", "py-3", "bg-gradient-to-r", "from-red-700", "to-purple-700",
    "text-white", "font-bold", "rounded-lg", "hover:scale-105",
    "transition-transform", "hover:brightness-125", "tracking-wide", "uppercase"
  );
  form.appendChild(submitBtn);

  const feedback = document.createElement("p");
  feedback.classList.add("mt-3", "text-center", "font-mono", "text-sm");
  form.appendChild(feedback);

  formContainer.innerHTML = ""; // Limpia contenedor
  formContainer.appendChild(form);

  // URL de tu Web App Google Apps Script
  const scriptURL = "https://script.google.com/macros/s/AKfycbyYl6RmpHJ5IH3C5dXSZKM9oRLGIkWOAkUHxNZXShSPp23KmMiDD3vrXzdETbmkND7B/exec";

  // Envío del formulario
  form.addEventListener("submit", async e => {
    e.preventDefault();

    // Validación rápida
    const formData = Object.fromEntries(new FormData(form).entries());
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.fecha) {
      feedback.textContent = "⚠️ Completa todos los campos obligatorios.";
      feedback.className = "mt-3 text-center text-yellow-400 font-mono";
      return;
    }

    // Feedback visual
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";
    feedback.textContent = "";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.result === "success") {
        feedback.textContent = "✅ Reserva enviada correctamente. Pronto recibirás confirmación.";
        feedback.className = "mt-3 text-center text-green-400 font-mono animate-pulse";
        form.reset();
      } else {
        feedback.textContent = "❌ Error al enviar la reserva. Intenta nuevamente.";
        feedback.className = "mt-3 text-center text-red-400 font-mono";
      }
    } catch (err) {
      console.error("Error:", err);
      feedback.textContent = "🚫 Error de conexión. Verifica tu red o intenta más tarde.";
      feedback.className = "mt-3 text-center text-red-400 font-mono";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar Reserva";
    }
  });

  // === Efecto visual VHS leve ===
  const flickerOverlay = document.createElement("div");
  flickerOverlay.classList.add("vhs-flicker", "fixed", "inset-0", "pointer-events-none", "z-50");
  document.body.appendChild(flickerOverlay);

  const style = document.createElement("style");
  style.textContent = `
    .vhs-flicker {
      background: repeating-linear-gradient(
        rgba(255,255,255,0.02) 0px,
        rgba(255,255,255,0.02) 1px,
        rgba(0,0,0,0) 2px
      );
      animation: flicker 0.1s infinite;
    }
    @keyframes flicker {
      0%, 100% { opacity: 0.03; }
      50% { opacity: 0.07; }
    }
  `;
  document.head.appendChild(style);
});
