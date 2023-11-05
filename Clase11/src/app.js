//Imports
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import productRoute from "./routes/productsRoute.js";
import cartRoute from "./routes/cartRoute.js";
import sessionRoute from "./routes/sessionRoute.js";
import userRoute from "./routes/userRoute.js";
import viewsRoute from "./routes/viewsRoute.js";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { getAllProductsHandler, messagesHandler } from "./handlers/handlers.js";
import databaseConnection from "./config/configDB.js";
import passport from "passport";

//Variables
const app = express();
const secretKey = "MiClaveSecreta";

//Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://marcosmartos:Escandinava@cluster0.4uhpvlo.mongodb.net/clase11?retryWrites=true&w=majority",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 15,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/carts", cartRoute);
app.use("/api/products", productRoute);
app.use("/api/sessions", sessionRoute);
app.use("/api/users", userRoute);
app.use("/", viewsRoute);

const httpServer = app.listen(8080, () => {
  console.log(`Listening on port 8080`);
  databaseConnection();
});

const socketServer = new Server(httpServer);

const onConnection = async (socket) => {
  await getAllProductsHandler(socketServer, socket);
  await messagesHandler(socketServer, socket);
};

socketServer.on("connection", onConnection);
