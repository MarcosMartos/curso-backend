import { Sequelize } from "sequelize";
import { errors } from "../utils/errorDictionary.js";
import logger from "../winston.config.js";
import config from "../config/config.js";

export class Database {
  static instanceDatabase;

  static getInstanceDatabase(database = Sequelize) {
    if (!this.instanceDatabase) {
      this.instanceDatabase = new database(
        config.db_name,
        config.db_user,
        config.db_password,
        {
          host: config.db_host,
          dialect: config.db_dialect,
        }
      );
    }

    return this.instanceDatabase;
  }

  static async databaseConnection() {
    try {
      await this.getInstanceDatabase().authenticate();
      logger.info("Conectado a DB");
    } catch (error) {
      logger.fatal("Fallo al conectar a DB:  " + error.message);
      throw new errors.DATABASE_CONNECTION_FAILED(error.message);
    }
  }
}
