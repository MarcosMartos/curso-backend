// Definición de la clase Carts
class Carts {
  // Constructor de la clase que toma un objeto con propiedades específicas
  constructor({ itemList, userReference, cartId, cartTimestamp }) {
    // Asigna el ID del carrito al objeto
    this.cartId = cartId;
    // Asigna la lista de ítems (productos) en el carrito al objeto
    this.itemList = itemList;
    // Asigna la referencia del usuario (probablemente un ID o nombre de usuario) que posee el carrito al objeto
    this.userReference = userReference;
    // Asigna la marca de tiempo (cuando se creó o modificó el carrito) al objeto
    this.cartTimestamp = cartTimestamp;
  }
}

// Exporta la clase Carts para que pueda ser utilizada en otros módulos
export default Carts;
