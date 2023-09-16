import fs from "fs";

// Crear clase constructora ProductManager
class ProductManager {
  constructor(path) {
    this.path = path;
  }

  // Crear método getProducts
  async getProducts(queryObj) {
    const { limit } = queryObj;
    try {
      if (fs.existsSync(this.path)) {
        const info = await fs.promises.readFile(this.path, "utf-8");
        const infoParsed = JSON.parse(info);

        // Comprobar si existe limit y si es menor a los productos del array

        if (limit) {
          if (limit > infoParsed.length) {
            return -1;
          } else {
            const newProducts = infoParsed.splice(0, limit);
            return newProducts;
          }
        } else {
          return infoParsed;
        }
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

            const newProduct = { id, ...obj };
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return newProduct;
          }
        } else {
          //Id único

          id = 1;

          //Cargar producto al array

          const newProduct = { id, ...obj };
          products.push(newProduct);
          await fs.promises.writeFile(this.path, JSON.stringify(products));
          return newProduct;
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
      const products = await this.getProducts({});
      const product = products.find((p) => p.id === idProduct);
      return product;
    } catch (error) {
      return error;
    }
  }

  // Crear método deleteProduct
  async deleteProduct(idProduct) {
    try {
      const product = products.find((p) => p.id === idProduct);
      if (!product) {
        return -1;
      }

      const products = await this.getProducts({});
      const newArrayProducts = products.filter((p) => p.id !== idProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts));
      return 1;
    } catch (error) {
      return error;
    }
  }

  // Crear método updateProduct

  async updateProduct(idProduct, obj) {
    try {
      let products = await this.getProducts();
      let index = products.findIndex((p) => p.id === idProduct);

      if (index === -1) {
        return -1;
      }

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
        return 1;
      } else {
        return "No se encontro el producto";
      }
    } catch (error) {
      return error;
    }
  }
}

//************************************DESAFIO TRES********************************* */

export const productsManager = new ProductManager("Products.json");
