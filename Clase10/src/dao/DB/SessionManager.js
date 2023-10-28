import UserManager from "./UserManager.js";

class SessionManager extends UserManager {
  async login(email, password) {
    try {
      const foundUser = await this.getByFilter({ email: email });

      if (!foundUser) {
        throw new Error("El usuario no existe");
      }

      if (foundUser.password !== password) {
        throw new Error("Contraseña inválida");
      }

      return foundUser;
    } catch (error) {
      throw error;
    }
  }
}

export default new SessionManager();
