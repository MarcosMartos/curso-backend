const fs = require("fs");

// Crear clase constructora ProductManager
class ProductManager {
  constructor(path) {
    this.path = path;
  }

  // Crear método getProducts
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const info = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(info);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  // Crear método addProduct
  async addProduct(obj) {
    try {
      if (
        obj.title &&
        obj.description &&
        obj.price &&
        obj.thumbnail &&
        obj.code &&
        obj.stock
      ) {
        // Llamar productos

        const products = await this.getProducts();
        let id;

        if (products.length) {
          // Verificar que code sea único

          if (products.some((p) => p.code === obj.code)) {
            console.log("Ya existe un producto con este Codigo");
          } else {
            //Id único

            id = products[products.length - 1].id + 1;

            //Cargar producto al array

            products.push({ id, ...obj });
            await fs.promises.writeFile(this.path, JSON.stringify(products));
          }
        } else {
          //Id único

          id = 1;

          //Cargar producto al array

          products.push({ id, ...obj });
          await fs.promises.writeFile(this.path, JSON.stringify(products));
        }
      } else {
        console.log("Todos los campos son obligatorios");
      }
    } catch (error) {
      return error;
    }
  }

  // Crear método getProductById
  async getProductById(idProduct) {
    try {
      const products = await this.getProducts();
      const product = products.find((p) => p.id === idProduct);
      if (product) {
        return product;
      } else {
        return "Producto no existe";
      }
    } catch (error) {
      return error;
    }
  }

  // Crear método deleteProduct
  async deleteProduct(idProduct) {
    try {
      const products = await this.getProducts();
      const newArrayProducts = products.filter((p) => p.id !== idProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts));
    } catch (error) {
      return error;
    }
  }

  // Crear método updateProduct

  async updateProduct(idProduct, obj) {
    try {
      let products = await this.getProducts();
      let index = products.findIndex((p) => p.id === idProduct);
      let product = products.find((p) => p.id === idProduct);
      if (product !== -1) {
        product = {
          id: idProduct,
          title: obj.title ? obj.title : product.title,
          description: obj.description ? obj.description : product.description,
          price: obj.price ? obj.price : product.price,
          thumbnail: obj.thumbnail ? obj.thumbnail : product.thumbnail,
          code: obj.code ? obj.code : product.code,
          stock: obj.stock ? obj.stock : product.stock,
        };
        products[index] = product;
        await fs.promises.writeFile(this.path, JSON.stringify(products));
      } else {
        return "No se encontro el producto";
      }
    } catch (error) {
      return error;
    }
  }
}

//************************************TESTING********************************* */

//Pruebas

//Productos

const elemento1 = {
  title: "producto 1",
  description: "este es un producto prueba 1",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 30,
};

const elemento2 = {
  title: "producto 2",
  description: "este es un producto prueba 2",
  price: 300,
  thumbnail: "sin imagen",
  code: "aaa111",
  stock: 15,
};

const elemento3 = {
  title: "producto 3",
  description: "este es un producto prueba 3",
  price: 400,
  thumbnail: "sin imagen",
  code: "abb345",
  stock: 20,
};

const elemento4 = {
  title: "producto 4",
  description: "este es un producto prueba 4",
  price: 500,
  thumbnail: "sin imagen",
  code: "cab999",
  stock: 25,
};

const elemento5 = {
  title: "producto 5",
  description: "este es un producto prueba 5",
  price: 500,
  thumbnail: "sin imagen",
  code: "cnn777",
  stock: 25,
};

const objeto = {
  title: "objeto",
  description: "este es un objeto",
  price: 1000,
  thumbnail: "sin imagen",
  code: "nan007",
  stock: 5,
};

async function test() {
  //Crear instancia
  const productManager = new ProductManager("Products.json");

  // Crear productos
  await productManager.addProduct(elemento4);

  // Mostrar productos
  // const products = await productManager.getProducts();
  // console.log(products);

  // Mostrar producto por ID
  //   const product = await productManager.getProductById(2);

  // Borrar producto
  //   const product = await productManager.deleteProduct(3);

  // Actualizar producto
  //   const product = await productManager.updateProduct(1, objeto);
  //   console.log(product);
}

test();
