// Importando módulos necesarios
import crypto from "crypto";
import bcrypt from "bcrypt";
import UserDAOFactory from "../models/DAOs/DAOFactory.js";
import userSchema from "../models/schemas/users.js";
import { dispatchVerificationEmail } from "../utils/sendgrid.js";

// Creando una instancia del servicio de usuario
const userService = UserDAOFactory.get("users", userSchema);

class AuthService {
  // Método para obtener un usuario por su correo electrónico
  static async getUserByEmail(email) {
    try {
      return await userService.getItem({ email });
    } catch (error) {
      throw new Error("Error fetching user by email: " + error.message);
    }
  }

  // Método para obtener todos los usuarios
  static async getAllUsers() {
    try {
      return await userService.getItems();
    } catch (error) {
      throw new Error("Error fetching all users: " + error.message);
    }
  }

  // Método para registrar un nuevo usuario
  static async registerUser(userData) {
    const { email, password } = userData;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      ...userData,
      password: hashedPassword,
      timestamp: new Date(),
      token: this.generateToken(),
      confirmed: false,
    };
    try {
      const savedUser = await userService.saveItem(newUser);
      dispatchVerificationEmail(
        savedUser.email,
        savedUser.username,
        savedUser.token
      );
      return savedUser;
    } catch (error) {
      throw new Error("Error registering user: " + error.message);
    }
  }

  // Método para generar un token aleatorio
  static generateToken() {
    return crypto.randomBytes(16).toString("hex");
  }

  // Método para verificar un token y confirmar un usuario
  static async verifyToken(token) {
    const user = await userService.getItem({ token });
    if (user) {
      user.confirmed = true;
      user.token = null;
      return await userService.updateItem(user._id, user);
    } else {
      throw new Error("Invalid token");
    }
  }

  // Método para eliminar un usuario por su ID
  static async deleteUserById(userId) {
    try {
      return await userService.deleteItem(userId);
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }

  // Método para verificar si existe un usuario
  static async existUser(query) {
    try {
      const user = await userService.getItem(query);
      return user != null;
    } catch (error) {
      throw new Error("Error checking if user exists: " + error.message);
    }
  }

  // Método para verificar un token y confirmar un usuario
  static async checkUserAccountToken(token) {
    const user = await userService.getItem({ token });
    if (user) {
      user.confirmed = true;
      user.token = null;
      return await userService.updateItem(user._id, user);
    } else {
      throw new Error("Invalid token");
    }
  }
}

// Exportando la clase AuthService y los métodos estáticos
export default AuthService;
export { AuthService };
export const checkUserNameToken = () => {
  // Implementación de la función
};
