import CartService from "../services/carts.js";
import productsInstance from "../services/products.js";
import AuthService from "../services/auth.js";

class CartsController {
  constructor() {
    this.products = productsInstance;
  }

  async createUserCart(req, res) {
    try {
      const { userId } = req.params;
      const newCart = await CartService.createCart({ userId: userId });
      res.json(newCart);
    } catch (error) {
      res.json({ msg: error.message });
    }
  }

  // Método para obtener todos los carritos
  async getAllCarts(req, res) {
    try {
      const carts = await getCarts();
      res.status(200).json(carts);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  }

  // Método para obtener el carrito de un usuario específico por ID
  async getByUserId(req, res) {
    try {
      const { userId } = req.params;
      const isValidUser = await AuthService.existUser({ _id: userId });

      if (!isValidUser) {
        return res.status(400).json({ msg: "El usuario no existe" });
      }

      const cart = await CartService.getCartByUserId(userId);
      res.status(200).json(cart);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  }

  // Método para guardar un producto en el carrito de un usuario
  async saveProduct(req, res) {
    try {
      const product = req.body;
      const { userId } = req.params;

      const savedCart = await saveProductOnCart(product, userId);
      res.status(201).json(savedCart);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  }

  // Método para actualizar un producto en el carrito de un usuario por ID de producto
  async updateProductOnCart(req, res) {
    try {
      const { userId, productId } = req.params;
      const product = req.body;

      let updatedCart;
      if (!Object.keys(product).length)
        updatedCart = await removeProductFromCart(userId, productId);
      else updatedCart = await updateProductOnCart(userId, productId, product);
      res.status(200).json(updatedCart);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  }

  // Método para eliminar todos los productos del carrito de un usuario
  async removeAllProducts(req, res) {
    try {
      const { userId } = req.params;
      const updatedCart = await removeAllProductsFromCart(userId);
      res.status(200).json(updatedCart);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  }

  // Método para eliminar un carrito de usuario por ID de usuario
  async deleteCart(req, res) {
    try {
      const { userId } = req.params;
      const cart = await deleteCart(userId);
      res.status(200).json(cart);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  }
}

// Exporta una instancia de la clase CartsController
export default new CartsController();
