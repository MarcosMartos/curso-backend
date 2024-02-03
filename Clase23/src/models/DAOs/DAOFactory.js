// Importando módulos necesarios
import DAOFile from "./DAOFile.js";
import DAOMongo from "./DAOMongo.js";
import config from "../../../config.js";

class DAOFactory {
  // Método estático para obtener una instancia de DAO basada en la configuración de persistencia
  static get(collection, schema) {
    // Objeto que mapea los tipos de persistencia con sus respectivas clases DAO
    const DAOpersistence = {
      mongodb: DAOMongo, // Si la persistencia es 'mongodb', se usa DAOMongo
      file: DAOFile, // Si la persistencia es 'file', se usa DAOFile
    };

    // Retorna una nueva instancia del DAO correspondiente basado en la configuración de persistencia
    return new DAOpersistence[config.PERSISTENCE](collection, schema);
  }
}

// Exportando la fábrica DAO como un módulo ES6
export default DAOFactory;
