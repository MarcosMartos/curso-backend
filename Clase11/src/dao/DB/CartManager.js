import Manager from "./Manager.js";
import cart from "../models/cart.js";

class CartManager extends Manager {
  constructor() {
    super(cart);
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const foundCart = await this.model.findById(cartId);

      if (!foundCart) {
        throw new Error("Cart not found");
      }

      const foundProduct = foundCart.products.find(
        (product) => product.productId.toString() === productId
      );

      if (foundProduct) {
        foundProduct.quantity = foundProduct.quantity + +quantity;
      } else {
        foundCart.products = [
          ...foundCart.products,
          ...[{ productId: productId, quantity: quantity }],
        ];
      }

      await foundCart.save();

      return "Producto agregado";
    } catch (error) {
      throw error;
    }
  }

  async deleteProductFromCarts(productId) {
    try {
      const carts = await this.getAll();

      carts.forEach(async (cart) => {
        await this.deleteProductFromCart(cart._id, productId);
      });

      return "Producto eliminado";
    } catch (error) {
      throw error;
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const foundCart = await this.model.findById(cartId);

      if (!foundCart) {
        throw new Error("Carrito no funciona");
      }

      foundCart.products = foundCart.products.filter(
        (product) => product.productId.toString() !== productId
      );

      await foundCart.save();

      return "Producto eliminado";
    } catch (error) {
      throw error;
    }
  }

  async deleteProductsFromCart(cartId) {
    try {
      const foundCart = await this.model.findById(cartId);

      if (!foundCart) {
        throw new Error("Carrito no funciona");
      }

      foundCart.products = [];

      await foundCart.save();

      return "Producto eliminado";
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const foundObject = await this.model
        .findById(id)
        .populate({ path: "products.productId" });
      return foundObject;
    } catch (error) {
      throw error;
    }
  }

  async updateProductOfCartById(cartId, productId, quantity) {
    try {
      const foundCart = await this.model.findById(cartId);

      if (!foundCart) {
        throw new Error("Carrito no funciona");
      }

      const foundProduct = foundCart.products.find(
        (product) => product.productId.toString() === productId
      );

      if (foundProduct) {
        foundProduct.quantity = quantity;
      } else {
        throw new Error("Producto no funciona");
      }

      await foundCart.save();

      return "Producto actualizado";
    } catch (error) {
      throw error;
    }
  }
}

export default new CartManager();
