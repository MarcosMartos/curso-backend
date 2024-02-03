// Importa módulos necesarios
import ProductDAOFactory from "../models/DAOs/DAOFactory.js";
import productSchema from "../models/schemas/products.js";
import Product from "../models/model/Product.js";

// Crea una instancia del servicio de producto
const productService = ProductDAOFactory.get("products", productSchema);

// Clase ProductService para manejar las operaciones relacionadas con los productos
class ProductService {
  // Método para obtener un producto por su ID
  static async getProductById(productId) {
    try {
      return await productService.getItem(productId);
    } catch (error) {
      throw new Error("Error fetching product by ID");
    }
  }

  // Método para obtener todos los productos
  static async getAllProducts() {
    try {
      return await productService.getItems();
    } catch (error) {
      throw Error("Error fetching all products");
    }
  }

  // Método para crear un nuevo producto
  static async createProduct(productData) {
    const newProduct = new Product(productData);
    try {
      return await productService.saveItem(newProduct);
    } catch (error) {
      throw new Error("Error creating product");
    }
  }

  // Método para actualizar un producto existente
  static async updateProduct(productId, updatedData) {
    try {
      return await productService.updateItem(productId, updatedData);
    } catch (error) {
      throw new Error("Error updating product");
    }
  }

  // Método para eliminar un producto por su ID
  static async deleteProduct(productId) {
    try {
      return await productService.deleteItem(productId);
    } catch (error) {
      throw new Error("Error deleting product");
    }
  }
}

// Exporta la clase ProductService para ser utilizada en otros módulos
export default ProductService;
