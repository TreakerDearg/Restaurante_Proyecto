// ===============================
// server.js — Backend Black Comedor (MongoDB Atlas / Render)
// ===============================

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

// === Middlewares ===
app.use(cors()); // Permite requests desde cualquier origen
app.use(express.json());

// === Conexión a MongoDB Atlas ===
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión:", err));

// === Modelo ===
import Reserva from "./models/Reserva.js";

// === Endpoints ===

// Guardar reserva
app.post("/api/reservas", async (req, res) => {
  try {
    const data = {
      ...req.body,
      fecha: new Date(req.body.fecha) // Convertimos la fecha a Date
    };

    const nuevaReserva = new Reserva(data);
    await nuevaReserva.save();

    console.log("✅ Reserva guardada:", nuevaReserva);
    res.status(201).json({ mensaje: "Reserva guardada exitosamente" });
  } catch (error) {
    console.error("❌ Error al guardar la reserva:", error);
    res.status(500).json({ error: "Error al guardar la reserva" });
  }
});

// Obtener todas las reservas
app.get("/api/reservas", async (req, res) => {
  try {
    const reservas = await Reserva.find().sort({ fechaRegistro: -1 }); // Orden descendente
    res.json(reservas);
  } catch (error) {
    console.error("❌ Error al obtener reservas:", error);
    res.status(500).json({ error: "Error al obtener reservas" });
  }
});

// Endpoint de test
app.get("/", (req, res) => res.send("Servidor activo 🚀"));

// === Puerto ===
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🧠 Servidor corriendo en http://localhost:${PORT}`));
