import mongoose from "mongoose";

// Define la estructura del esquema del usuario
const userSchema = new mongoose.Schema({
  // Propiedades existentes
  personName: String,
  secretCode: String,
  contactNumber: Number,
  emailAddress: String,
  accessKey: String,
  isVerified: Boolean,
  registrationTime: String,
  // Nuevas propiedades
  documents: [
    {
      name: String,
      reference: String,
    },
  ],
  last_connection: Date,
});

// Exporta el esquema del usuario como exportación por defecto
export default mongoose.model("User", userSchema);
