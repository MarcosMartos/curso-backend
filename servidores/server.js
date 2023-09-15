import express, { json } from "express";

// Levantar servidor con express
const app = express();
// Instancia de productsManager
import { productsManager } from "./productsManager";

// Params - Query - Body

// SIN PRODUCTSMANAGER

// // Todos los usuarios
// app.get("/users", (req, res) => {
//   const { name } = req.query;

//   if (name) {
//     const user = users.find((u) => u.name === name);
//     return res.json({ menssage: "User", user });
//   }

//   res.json({ menssage: "All users", users });
// });

// // Usuario por id (Params)
// app.get("/users/:idUser", (req, res) => {
//   const { idUser } = req.params;
//   const user = users.find((u) => u.id === parseInt(idUser));
//   res.json({ message: "User", user });
// });

// DESAFIO TRES

app.get("/products", async (req, res) => {
  try {
    const products = await productsManager.getProducts;

    if (!products.length) {
      res.status(200).json({ menssage: "No products found" });
    } else {
      res.status(200).json({ menssage: "Products found", products });
    }
  } catch (error) {
    res.status(500).json({ menssage: error });
  }
});

// Escuchar al servidor 8080

app.listen(8080, () => {
  console.log("Escuchando al puerto 8080");
});
