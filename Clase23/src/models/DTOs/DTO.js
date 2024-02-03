// Importa las clases DTO necesarias
import ArticleDTO from "./blog.js";
import CartDTO from "./carts.js";
import ProductDTO from "./products.js";
import UserDTO from "./users.js";

// Función para obtener el DTO adecuado según la colección proporcionada
const getDTO = (data, collection) => {
  // Definición de los modelos DTO disponibles
  const models = {
    products: ProductDTO,
    users: UserDTO,
    carts: CartDTO,
    blog: ArticleDTO,
  };
  // Selecciona el DTO adecuado basado en la colección proporcionada
  const DTO = models[collection];
  // Retorna una nueva instancia del DTO con los datos proporcionados
  return new DTO(data);
};

// Función para convertir los datos en DTOs
const convertToDTO = (data, collection) => {
  // Si los datos son un array, mapea cada elemento a su DTO correspondiente
  if (Array.isArray(data)) return data.map((d) => getDTO(d, collection));
  // Si es un solo objeto, convierte ese objeto a su DTO correspondiente
  else return getDTO(data, collection);
};

// Exporta la función convertToDTO para ser utilizada en otros módulos
export { convertToDTO };
