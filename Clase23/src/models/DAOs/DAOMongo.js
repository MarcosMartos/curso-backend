import crypto from "crypto";
import mongoose from "mongoose";
import config from "../../../config.js";
import { ObjectId } from "mongodb";
import { convertToDTO } from "../DTOs/DTO.js";

class DAOMongo {
  // Constructor de la clase DAOMongo
  constructor(dataCollection, schemaDefinition) {
    this.dataCollection = dataCollection;
    // Conexión a la base de datos MongoDB usando Mongoose
    (async () => {
      await mongoose.connect(config.MONGO_DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      this.dataModel = mongoose.model(dataCollection, schemaDefinition);
      console.log("Database connected");
    })();
  }

  // Método para crear un ID único
  createUniqueId = () => {
    try {
      const uniqueId = crypto.randomUUID();
      return uniqueId;
    } catch (errorInstance) {
      throw new Error(errorInstance);
    }
  };

  // Método para verificar si un elemento ya existe en la base de datos
  checkItemExistence = async (dataItem) => {
    const foundItem = await this.dataModel.findOne({ ...dataItem });
    return !!foundItem;
  };

  // Método para obtener todos los elementos de la base de datos
  retrieveAllItems = async () => {
    try {
      const items = await this.dataModel.find({});
      return convertToDTO(items, this.dataCollection);
    } catch (errorInstance) {
      console.error(errorInstance);
    }
  };

  // Método para obtener un elemento por su ID
  retrieveItemById = async (itemId) => {
    try {
      const item = await this.dataModel.findById(itemId);
      return convertToDTO(item, this.dataCollection);
    } catch (errorInstance) {
      console.error(errorInstance);
    }
  };

  // Método para almacenar un nuevo elemento en la base de datos
  storeNewItem = async (dataItem) => {
    try {
      await this.dataModel.create({ ...dataItem });
      const storedItem = await this.dataModel
        .find()
        .where("timestamp")
        .equals(dataItem.timestamp);
      return convertToDTO(storedItem[0], this.dataCollection);
    } catch (errorInstance) {
      console.error(errorInstance);
    }
  };

  // Método para actualizar un elemento existente en la base de datos
  updateExistingItem = async (itemId, dataItem) => {
    try {
      const objectId = new ObjectId(itemId);
      await this.dataModel.updateOne({ _id: objectId }, { ...dataItem });
      const updatedItem = await this.retrieveItemById(objectId);
      return convertToDTO(updatedItem, this.dataCollection);
    } catch (errorInstance) {
      console.error(errorInstance);
    }
  };

  // Método para eliminar un elemento de la base de datos
  removeItem = async (itemId) => {
    try {
      const itemToRemove = await this.retrieveItemById(itemId);
      if (itemToRemove) {
        const objectId = new ObjectId(itemId);
        await this.dataModel.findOneAndDelete({ _id: objectId });
        return convertToDTO(itemToRemove, this.dataCollection);
      }
      return undefined;
    } catch (errorInstance) {
      console.error(errorInstance);
    }
  };
}

// Exportando la clase DAOMongo para ser utilizada en otros módulos
export default DAOMongo;
