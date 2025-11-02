import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  comensales: { type: Number, required: true },
  fecha: { type: Date, required: true },
  sena: { type: Number, default: 0 },
  comentarios: { type: String, default: "" },
  vip: { type: Boolean, default: false },
  fechaRegistro: { type: Date, default: Date.now }
});

export default mongoose.model("Reserva", reservaSchema);
