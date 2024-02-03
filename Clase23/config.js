import dotenv from "dotenv";
import path from "path";
import minimist from "minimist";

// Configuración de opciones para el parser de argumentos
const configOptions = {
  alias: { env: "envSetting" },
  default: { envSetting: "dev" },
};

// Parseando argumentos de la línea de comandos y extrayendo 'envSetting'
const { envSetting } = minimist(process.argv.slice(2), configOptions);

// Construyendo el nombre del archivo .env basado en el entorno
const envFile = `${envSetting}.env`;

// Configuramos 'dotenv' para usar ese archivo
if (envFile === "dev.env") {
  dotenv.config({
    path: path.resolve(process.cwd(), envFile),
  });
}

// Exportando variables de entorno y valores por defecto
export default {
  NODE_ENV: process.env.NODE_ENV || "dev",
  PORT: process.env.PORT || 8080,
  MONGO_DATA_BASE_URL: process.env.MONGO_DATA_BASE_URL,
  PERSISTENCE: process.env.PERSISTENCE || "file",
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || "3600s",
  CLOUDINARY_BASE_URL: process.env.CLOUDINARY_BASE_URL,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  MAIL_ADDRESS: process.env.MAIL_ADDRESS,
  MAIL_PASS: process.env.MAIL_PASS,
  FRONTEND_URL: process.env.FRONTEND_URL,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_USER: process.env.SENDGRID_USER,
};
