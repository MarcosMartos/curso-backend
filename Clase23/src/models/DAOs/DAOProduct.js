import mongoose from "mongoose";
import ProductSchema from "../schemas/ProductSchema";

class ProductDAO {
  constructor() {
    // Crea una instancia del modelo 'Product' basado en el esquema 'ProductSchema'
    this.model = mongoose.model("Product", ProductSchema);
  }

  async getAllItems() {
    // Obtiene todos los elementos de la base de datos
    return await this.model.find({});
  }

  async getItemById(id) {
    // Obtiene un elemento por su ID
    return await this.model.findById(id);
  }

  async storeItem(productData) {
    // Crea un nuevo objeto 'Product' con los datos proporcionados y lo guarda en la base de datos
    const product = new this.model(productData);
    return await product.save();
  }

  async updateStoredItem(id, productData) {
    // Actualiza un elemento existente en la base de datos por su ID
    return await this.model.findByIdAndUpdate(id, productData, { new: true });
  }

  async deleteStoredItem(id) {
    // Elimina un elemento de la base de datos por su ID
    return await this.model.findByIdAndDelete(id);
  }
}

export default ProductDAO;
