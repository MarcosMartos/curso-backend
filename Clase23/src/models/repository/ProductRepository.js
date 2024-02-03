// Importa la clase DAO que se utiliza en ProductRepository
import DAO from "./DAO";

// Define la clase ProductRepository
class ProductRepository {
  // Constructor de la clase que toma una instancia de DAO como argumento
  constructor(dao) {
    this.dao = dao;
  }

  // Método para obtener todos los productos
  async getAllProducts() {
    return await this.dao.getAllItems();
  }

  // Método para obtener un producto por su ID
  async getProductById(id) {
    return await this.dao.getItemById(id);
  }

  // Método para agregar un producto
  async addProduct(productData) {
    return await this.dao.storeItem(productData);
  }

  // Método para actualizar un producto por su ID
  async updateProduct(id, productData) {
    return await this.dao.updateStoredItem(id, productData);
  }

  // Método para eliminar un producto por su ID
  async deleteProduct(id) {
    return await this.dao.deleteStoredItem(id);
  }
}

// Exporta la clase ProductRepository
export default ProductRepository;
