import Joi from "joi";

// Definición de la clase Item
class Item {
  // Constructor de la clase que toma un objeto item como argumento
  constructor(item) {
    // Asigna el objeto item al objeto Item
    this.item = item;
  }

  // Método estático para verificar la validez de un objeto item
  static check(item) {
    // Define el esquema de validación para un objeto item usando Joi
    const ItemSchema = Joi.object({
      // El ítem debe tener un nombre (name) que es una cadena y es obligatorio
      name: Joi.string().required(),
      // El ítem debe tener detalles (details) que es una cadena y es obligatorio
      details: Joi.string().required(),
      // El ítem debe tener un costo (cost) que es un número y es obligatorio
      cost: Joi.number().required(),
      // El ítem puede tener un enlace de imagen (imageLink) que es una cadena
      imageLink: Joi.string(),
      // El ítem debe tener una disponibilidad (availability) que es un número y es obligatorio
      availability: Joi.number().required(),
      // El ítem debe tener un tipo (type) que es una cadena y es obligatorio
      type: Joi.string().required(),
      // El ítem puede tener una fecha de agregado (addedDate) que es una fecha
      addedDate: Joi.date(),
    });

    // Valida el objeto item proporcionado contra el esquema definido anteriormente
    const { error } = ItemSchema.validate(item);
    // Si hay un error en la validación, lanza el error
    if (error) throw error;
  }
}

// Exporta la clase Item para que pueda ser utilizada en otros módulos
export default Item;
