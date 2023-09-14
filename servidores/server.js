import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Bienvenido a la raiz");
});

app.get("/home", (req, res) => {
  res.send("Bienvenido a la pagina principal");
});

app.get("/products", (req, res) => {
  res.send("Bienvenido a productos");
});

app.listen(8080, () => {
  console.log("Escuchando al puerto 8080");
});
