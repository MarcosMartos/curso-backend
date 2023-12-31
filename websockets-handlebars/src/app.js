import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import { productsManager } from "./products.manager.js";

// Levantar servidor
const app = express();

// Configurar express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/", viewsRouter);
const httpServer = app.listen(8080, () => {
  console.log("Escuchando al puerto 8080");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("createProduct", async (product) => {
    const newProduct = await productsManager.createProduct(product);
    socket.emit("productCreated", newProduct);
    console.log(newProduct);
  });

  socket.on("deleteProduct", async (idProduct) => {
    const products = await productsManager.getProducts();
    const newProducts = products.filter((p) => p.id !== idProduct);
    socket.emit("productDeleted", newProducts);
  });
});
