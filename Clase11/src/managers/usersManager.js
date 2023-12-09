import { usersModel } from "../db/models/users.model.js";

class UsersManager {
  async getById(id) {
    const response = await usersModel.findById(id);
    return response;
  }

  async createOne(obj) {
    const response = await usersModel.create(obj);
    return response;
  }
}

export const usersManager = new UsersManager();
