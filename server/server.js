// ===============================
// server.js — Backend Black Comedor (MongoDB Atlas / Render)
// ===============================

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

// ==============================
// MIDDLEWARES
// ==============================

// CORS: permitir tu front (GitHub Pages + localhost)
app.use(cors({
  origin: [
    "https://treakerdearg.github.io",
    "http://localhost:5500"
  ],
  credentials: true
}));

// Parse JSON
app.use(express.json());

// ==============================
// CONEXIÓN A MONGODB ATLAS
// ==============================

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://leandronicolas201402_db_user:Delta12@restaurante.vaqq5sn.mongodb.net/Restaurante?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.error("❌ Error de conexión:", err.message));

// ==============================
// MODELO DE RESERVA
// ==============================

import Reserva from "./models/Reserva.js";

// ==============================
// ENDPOINTS
// ==============================

// Guardar reserva
app.post("/api/reservas", async (req, res) => {
  try {
    const data = {
      ...req.body,
      fecha: new Date(req.body.fecha)
    };

    const nuevaReserva = new Reserva(data);
    await nuevaReserva.save();

    console.log("✅ Reserva guardada:", nuevaReserva);
    res.status(201).json({ mensaje: "Reserva guardada exitosamente" });
  } catch (error) {
    console.error("❌ Error al guardar la reserva:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las reservas
app.get("/api/reservas", async (req, res) => {
  try {
    const reservas = await Reserva.find().sort({ fechaRegistro: -1 });
    res.json(reservas);
  } catch (error) {
    console.error("❌ Error al obtener reservas:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint de test
app.get("/", (req, res) => res.send("Servidor activo 🚀"));

// ==============================
// PUERTO
// ==============================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🧠 Servidor corriendo en http://localhost:${PORT}`));
