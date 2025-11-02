import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión:", err));

// Modelo
import Reserva from "./models/Reserva.js";

// Endpoint para guardar reservas
app.post("/api/reservas", async (req, res) => {
  try {
    const nuevaReserva = new Reserva(req.body);
    await nuevaReserva.save();
    res.status(201).json({ mensaje: "Reserva guardada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar la reserva" });
  }
});

// Endpoint de test
app.get("/", (req, res) => res.send("Servidor activo 🚀"));

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🧠 Servidor corriendo en http://localhost:${PORT}`));
