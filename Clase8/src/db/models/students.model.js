import mongoose from "mongoose";

// Crear el esquema
const studentsSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  curso: {
    type: String,
    required: true,
  },
  nota: {
    type: Number,
    required: true,
  },
});

// Crear el modelo/coleccion
export const studentsModel = mongoose.model("Students", studentsSchema);
