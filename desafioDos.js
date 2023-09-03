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
      const products = await this.getProducts();
      let id;
      if (!products.length) {
        id = 1;
      } else {
        id = products[products.length - 1].id + 1;
      }
      products.push({ id, ...obj });
      await fs.promises.writeFile(this.path, JSON.stringify(products));
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
      let product = products.findIndex((p) => p.id === idProduct);
      if (product !== -1) {
        obj.id = idProduct;
        products[product] = obj;
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

const objeto = {
  title: "objeto",
  description: "este es un objeto",
  price: 1000,
  thumbnail: "sin imagen",
  code: "nan007",
  stock: 5,
};

//Pruebas

async function test() {
  //Crear instancia
  const producto1 = new ProductManager("Products.json");

  // Crear productos
  //   await producto1.addProduct(elemento4);

  // Mostrar productos
  //   const products = await producto1.getProducts();
  //   console.log(products);

  // Mostrar producto por ID
  //   const product = await producto1.getProductById(2);

  // Borrar producto
  //   const product = await producto1.deleteProduct(3);

  // Actualizar producto
  //   const product = await producto1.updateProduct(1, objeto);
  //   console.log(product);
}

test();
