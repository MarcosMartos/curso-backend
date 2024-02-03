import mongoose from "mongoose";

// Define el esquema del ticket utilizando Mongoose
const ticketSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

// Exporta el modelo de Ticket utilizando Mongoose
export default mongoose.model("Ticket", ticketSchema);
