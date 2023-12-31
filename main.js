//Crear clase constructora ProductManager
class ProductManager {
  constructor() {
    this.products = [];
  }

  //Crear método addProducts

  addProducts(title, description, price, thumbnail, code, stock) {
    //Hacer obligatorios todos los campos

    if (title && description && price && thumbnail && code && stock) {
      //Validar que code sea único

      if (this.products.some((e) => e.code === code)) {
        console.log("Ya existe un producto con ese código.");
        return;
      }

      //Identificador incrementable

      const idUnico = this.products.length
        ? this.products[this.products.length - 1].id + 1
        : 1;

      const product = {
        id: idUnico,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      //Cargar producto al array

      this.products.push(product);
    }
    console.log("Todos los campos son obligatorios.");
    return;
  }

  //Crear método getProducts que retorna array con productos

  getProducts() {
    return this.products;
  }

  //Crear método getProductById que busca producto por id

  getProductById(idProduct) {
    const exist = this.products.find((e) => e.id === idProduct);
    if (exist) {
      return exist;
    } else {
      console.log("Not Found");
    }
  }
}

//************************************Testing*******************************************

//Creamos instancia de ProductManager
const productManager = new ProductManager();

//Llamamos método addProducts
productManager.addProducts(
  "producto 1",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc123",
  25
);
productManager.addProducts(
  "producto 2",
  "este es otro producto",
  300,
  "sin imagen tambien",
  "aaa111",
  30
);
productManager.addProducts(
  "producto 3",
  "este es otro producto",
  400,
  "sin imagen tambien",
  "yup555",
  20
);
productManager.addProducts(
  "producto 4",
  "este es otro producto",
  500,
  "sin imagen tambien",
  "aea143",
  40
);

// //Llamamos método getProducts
const todosLosProductos = productManager.getProducts();
console.log(todosLosProductos);

//Llamamos al método getProductById
console.log(productManager.getProductById(1));

//Forzamos errores
console.log("------------ERRORES--------------");
//Id que no existe - Return esperado: "Not found"
console.log(productManager.getProductById(10));

//Addproduct con menos parámetros - Return esperado: "Todos los campos son obligatorios."
productManager.addProducts(
  "Producto falla",
  "este va a fallar",
  400,
  "no hay imagen",
  "dadasda"
);

//Addproduct con código que ya existe - Return esperado: "Ya existe un producto con ese código."
productManager.addProducts(
  "producto 4",
  "este es otro producto",
  500,
  "sin imagen tambien",
  "aea143",
  40
);

//Valido que no se hayan guardado:
console.log(productManager.getProducts());
