// Importa la biblioteca mongoose, que se utiliza para trabajar con MongoDB
import mongoose from "mongoose";

// Define la estructura del esquema del artículo
const articleSchemaStructure = {
  // El artículo tiene un encabezado (heading) que es de tipo String
  heading: String,
  // El artículo tiene un cuerpo de texto (bodyText) que es de tipo String
  bodyText: String,
  // El artículo puede tener un enlace (link) que es de tipo String
  link: String,
  // El artículo tiene una fecha de creación (creationDate) que es de tipo String
  creationDate: String,
};

// Crea un nuevo esquema de mongoose utilizando la estructura definida anteriormente
const articleSchema = new mongoose.Schema({ ...articleSchemaStructure });

// Exporta el esquema del artículo para que pueda ser utilizado en otros módulos
export default articleSchema;
