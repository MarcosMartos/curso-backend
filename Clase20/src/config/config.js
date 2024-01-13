import dotenv from "dotenv";

dotenv.config();

const obj = {
  mongo_uri: process.env.MONGO_URI,
  github_client_id: process.env.GITHUB_CLIENT_ID,
  github_client_secret: process.env.GITHUB_CLIENT_SECRET,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  cookie_secret: process.env.COOKIE_SECRET,
  jwt_secret: process.env.JWT_SECRET,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_host: process.env.DB_HOST,
  db_dialect: process.env.DB_DIALECT,
  environment: process.env.ENVIRONMENT,
  port: process.env.PORT,
  mail_user: process.env.MAIL_USER,
  mail_password: process.env.MAIL_PASSWORD,
};

export default obj;
