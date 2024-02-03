// Definición de la clase ProductDTO (Data Transfer Object para Productos)
class ProductDTO {
  // Constructor de la clase que toma un objeto con propiedades específicas
  constructor({
    itemName,
    itemPrice,
    itemStock,
    itemURL,
    itemDescription,
    itemCategory,
    itemId,
  }) {
    // Asigna el ID del producto al objeto
    this.itemId = itemId;
    // Asigna el nombre del producto al objeto
    this.itemName = itemName;
    // Asigna el precio del producto al objeto
    this.itemPrice = itemPrice;
    // Asigna la cantidad en stock del producto al objeto
    this.itemStock = itemStock;
    // Asigna la categoría del producto al objeto
    this.itemCategory = itemCategory;
    // Asigna la URL del producto (probablemente una imagen o enlace) al objeto
    this.itemURL = itemURL;
    // Asigna la descripción del producto al objeto
    this.itemDescription = itemDescription;
  }
}

// Exporta la clase ProductDTO para que pueda ser utilizada en otros módulos
export default ProductDTO;
