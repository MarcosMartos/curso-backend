import express, { urlencoded } from "express";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});

// websocket - server
const socketServer = new Server(httpServer);
