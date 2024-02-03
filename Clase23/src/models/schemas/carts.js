// Importa la biblioteca mongoose, que se utiliza para trabajar con MongoDB
import mongoose from "mongoose";

// Define la estructura del esquema de la cesta de compras (shopping basket)
const shoppingBasketSchemaStructure = {
  // La cesta de compras tiene una lista de artículos (itemsList)
  itemsList: [
    {
      // Cada artículo en la lista tiene un identificador (itemId) que es de tipo String
      itemId: String,
      // Cada artículo en la lista tiene una cantidad (itemQuantity) que es de tipo Number
      itemQuantity: Number,
    },
  ],
  // La cesta de compras tiene una referencia al comprador (shopperReference) que es de tipo String
  shopperReference: String,
  // La cesta de compras tiene una fecha/hora de creación (creationTime) que es de tipo String
  creationTime: String,
};

// Crea un nuevo esquema de mongoose utilizando la estructura definida anteriormente
const shoppingBasketSchema = new mongoose.Schema({
  ...shoppingBasketSchemaStructure,
});

// Exporta el esquema de la cesta de compras para que pueda ser utilizado en otros módulos
export default shoppingBasketSchema;
