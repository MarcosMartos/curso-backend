import productInstance from "../services/products.js";

class ProductsController {
  // Constructor de la clase
  constructor() {
    // Inicializamos la propiedad products con la instancia del servicio de productos
    this.products = productInstance;
  }

  // Método para obtener todos los productos
  async getProducts(req, res) {
    try {
      // Obtenemos todos los productos usando el servicio
      const products = await this.products.getProducts();
      // Enviamos una respuesta con estado 200 y la lista de productos
      res.status(200).json(products);
    } catch (err) {
      // En caso de error, lo mostramos en la consola
      console.error(err);
    }
  }

  // Método para obtener un producto específico por su ID
  async getProductById(req, res) {
    try {
      // Extraemos el ID del producto de los parámetros de la solicitud
      const { id } = req.params;
      // Obtenemos el producto usando el servicio
      const product = await this.products.getProductById(id);
      // Enviamos una respuesta con estado 200 y el producto
      res.status(200).json(product);
    } catch (err) {
      // En caso de error, enviamos una respuesta con estado 404 y el error
      res.status(404).json({ msg: "Producto no encontrado" });
    }
  }

  // Método para guardar un nuevo producto
  async saveProduct(req, res) {
    try {
      // Extraemos el producto del cuerpo de la solicitud
      const product = req.body;
      // Guardamos el producto usando el servicio
      const savedProduct = await this.products.saveProduct(product);
      // Enviamos una respuesta con estado 201 y el producto guardado
      res.status(201).json(savedProduct);
    } catch (err) {
      // En caso de error, lo mostramos en la consola
      console.error(err);
    }
  }

  // Método para actualizar un producto específico por su ID
  async updateProduct(req, res) {
    try {
      // Extraemos el ID del producto y el producto a actualizar de la solicitud
      const { id } = req.params;
      const product = req.body;
      // Actualizamos el producto usando el servicio
      const updatedProduct = await this.products.updateProduct(id, product);
      // Enviamos una respuesta con estado 200 y el producto actualizado
      res.status(200).json(updatedProduct);
    } catch (err) {
      // En caso de error, lo mostramos en la consola
      console.error(err);
    }
  }

  // Método para eliminar un producto específico por su ID
  async deleteProduct(req, res) {
    try {
      // Extraemos el ID del producto de los parámetros de la solicitud
      const { id } = req.params;
      // Eliminamos el producto usando el servicio
      const product = await this.products.deleteProduct(id);
      // Enviamos una respuesta con estado 200 y el producto eliminado
      res.status(200).json(product);
    } catch (err) {
      // En caso de error, lo mostramos en la consola
      console.error(err);
    }
  }
}

// Exportamos una instancia de la clase ProductsController
export default new ProductsController();
