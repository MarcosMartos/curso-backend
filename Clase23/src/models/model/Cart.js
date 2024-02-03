import Joi from "joi";

// Definición de la clase Cart
class Cart {
  // Constructor de la clase que toma un objeto cart como argumento
  constructor(cart) {
    // Asigna el objeto cart al objeto Cart
    this.cart = cart;
  }

  // Método estático para verificar la validez de un objeto cart
  static verify(cart) {
    // Define el esquema de validación para un objeto cart usando Joi
    const CartSchema = Joi.object({
      // El cart debe tener un array de items
      items: Joi.array().items(
        Joi.object({
          // Cada item debe tener un _id que es una cadena y es obligatorio
          _id: Joi.string().required(),
          // Cada item debe tener una cantidad que es un número y es obligatorio
          quantity: Joi.number().required(),
        })
      ),
      // El cart puede tener un shopperId que es una cadena
      shopperId: Joi.string(),
      // El cart puede tener una marca de tiempo (timestamp) de creación que es una fecha
      creationTime: Joi.date(),
    });

    // Valida el objeto cart proporcionado contra el esquema definido anteriormente
    const { error } = CartSchema.validate(cart);
    // Si hay un error en la validación, lanza el error
    if (error) throw error;
  }
}

// Exporta la clase Cart para que pueda ser utilizada en otros módulos
export default Cart;
