// Importando módulos necesarios
import path from "path"; // Módulo para trabajar con rutas de archivos y directorios
import express from "express"; // Framework web para Node.js
import http from "http"; // Módulo HTTP de Node.js
import cors from "cors"; // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
import mongoose from "mongoose"; // Biblioteca para trabajar con MongoDB
import dotenv from "dotenv"; // Módulo para cargar variables de entorno desde un archivo .env
import multer from "multer"; // Middleware para manejar la carga de archivos
import fs from "fs"; // Módulo para trabajar con el sistema de archivos

// Cargando variables de entorno desde la ubicación correcta
dotenv.config(); // Asegúrate de que el archivo .env esté en la raíz de tu proyecto

import settings from "../config.js"; // Importando configuración personalizada

// Importando rutas
import authRoutes from "./router/auth.js"; // Rutas relacionadas con autenticación
import blogRoutes from "./router/blog.js"; // Rutas relacionadas con blogs
import cartRoutes from "./router/carts.js"; // Rutas relacionadas con carritos de compra
import productRoutes from "./router/products.js"; // Rutas relacionadas con productos

// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads"); // Ruta donde se guardarán los archivos cargados
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Crea el directorio si no existe
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Genera un nombre único para el archivo cargado
  },
});

const upload = multer({ storage: storage }); // Middleware de Multer para manejar la carga de archivos

// Creando una instancia de Express y un servidor HTTP
const app = express(); // Inicializa una instancia de Express
const server = http.createServer(app); // Crea un servidor HTTP utilizando Express

// Configuración de CORS (Cross-Origin Resource Sharing)
const allowedOrigins = [
  "http://localhost:3001",
  "http://127.0.0.1:5184",
  settings.WEB_APP_URL,
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Permite las solicitudes desde los orígenes permitidos
      } else {
        callback(new Error("CORS Issue Detected")); // Genera un error si se detecta un problema de CORS
      }
    },
  })
);

// Middlewares para parsear el cuerpo de las solicitudes
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar el cuerpo de las solicitudes URL-encoded

// Rutas de la API
app.use("/api/auth", authRoutes); // Usa las rutas de autenticación en /api/auth
app.use("/api/blog", blogRoutes); // Usa las rutas de blogs en /api/blog
app.use("/api/carts", cartRoutes); // Usa las rutas de carritos de compra en /api/carts
app.use("/api/products", productRoutes); // Usa las rutas de productos en /api/products

// Middleware para manejar errores
app.use((error, req, res, next) => {
  if (error) {
    res.status(500).send(`Encountered an issue: ${error.message}`); // Envía una respuesta de error si ocurre un error
  } else {
    next();
  }
});

// Conexión a MongoDB y arranque del servidor
const dbUri = process.env.MONGO_DATA_BASE_URL; // Asegúrate de que el nombre de la variable coincida con tu archivo .env
mongoose
  .connect(dbUri) // Conecta a la base de datos MongoDB utilizando la URL especificada en las variables de entorno
  .then(() => {
    console.log("Successfully connected to database");

    // Iniciando el servidor en el puerto 8080
    server.listen(8080, () => {
      console.log("Server active at http://localhost:8080"); // Muestra un mensaje cuando el servidor se inicia con éxito
    });
  })
  .catch((err) => {
    console.error(`Connection to database failed, ERROR: ${err.message}`);
    process.exit(1); // Detiene la ejecución del servidor en caso de error en la conexión a la base de datos
  });

// Exportando la aplicación Express
export default app;
