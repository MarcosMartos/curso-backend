import CartDAOFactory from "../models/DAOs/DAOFactory.js";
import cartSchema from "../models/schemas/carts.js";
import Cart from "../models/model/Cart.js";

const cartService = CartDAOFactory.get("carts", cartSchema);

class CartService {
  // Método para obtener un carrito por su ID
  static async getCartById(cartId) {
    try {
      return await cartService.getItem(cartId);
    } catch (error) {
      throw new Error("Error fetching cart by ID");
    }
  }

  // Método para obtener todos los carritos
  static async getAllCarts() {
    try {
      return await cartService.getItems();
    } catch (error) {
      throw new Error("Error fetching all carts");
    }
  }

  // Método para crear un nuevo carrito
  static async createCart(cartData) {
    const newCart = new Cart(cartData);
    try {
      return await cartService.saveItem(newCart);
    } catch (error) {
      throw new Error("Error creating cart");
    }
  }

  // Método para actualizar un carrito existente
  static async updateCart(cartId, updatedData) {
    try {
      return await cartService.updateItem(cartId, updatedData);
    } catch (error) {
      throw new Error("Error updating cart");
    }
  }

  // Método para eliminar un carrito por su ID
  static async deleteCart(cartId) {
    try {
      return await cartService.deleteItem(cartId);
    } catch (error) {
      throw new Error("Error deleting cart");
    }
  }
}

// Exporta la clase CartService para ser utilizada en otros módulos
export default CartService;
