// Importa la biblioteca mongoose, que se utiliza para trabajar con MongoDB
import mongoose from "mongoose";

// Define la estructura del esquema de la mercancía (merchandise)
const merchandiseSchemaStructure = {
  // El nombre del artículo (itemName) que es de tipo String
  itemName: String,
  // Los detalles del artículo (itemDetails) que es de tipo String
  itemDetails: String,
  // El costo del artículo (itemCost) que es de tipo Number
  itemCost: Number,
  // El stock disponible del artículo (availableStock) que es de tipo Number
  availableStock: Number,
  // El enlace a la imagen del artículo (imageLink) que es de tipo String
  imageLink: String,
  // El tipo de artículo (itemType) que es de tipo String
  itemType: String,
  // La fecha de adición del artículo (additionDate) que es de tipo String
  additionDate: String,
};

// Crea un nuevo esquema de mongoose utilizando la estructura definida anteriormente
const merchandiseSchema = new mongoose.Schema({
  ...merchandiseSchemaStructure,
});

// Exporta el esquema de la mercancía para que pueda ser utilizado en otros módulos
export default merchandiseSchema;
