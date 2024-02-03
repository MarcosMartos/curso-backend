// Importando módulos necesarios
import BlogDAOFactory from "../models/DAOs/DAOFactory.js";
import blogSchema from "../models/schemas/blog.js";
import Post from "../models/model/Post.js";

// Creando una instancia del servicio de blog
const blogService = BlogDAOFactory.get("blog", blogSchema);

// Clase BlogService para manejar las operaciones relacionadas con las publicaciones del blog
class BlogService {
  // Método para obtener una publicación por su ID
  static async getPostById(postId) {
    try {
      return await blogService.getItem(postId);
    } catch (error) {
      throw new Error("Error fetching post by ID");
    }
  }

  // Método para obtener todas las publicaciones
  static async getAllPosts() {
    try {
      return await blogService.getItems();
    } catch (error) {
      throw new Error("Error fetching all posts");
    }
  }

  // Método para crear una nueva publicación
  static async createPost(postData) {
    const newPost = new Post(postData);
    try {
      return await blogService.saveItem(newPost);
    } catch (error) {
      throw new Error("Error creating post");
    }
  }

  // Método para actualizar una publicación existente
  static async updatePost(postId, updatedData) {
    try {
      return await blogService.updateItem(postId, updatedData);
    } catch (error) {
      throw new Error("Error updating post");
    }
  }

  // Método para eliminar una publicación por su ID
  static async deletePost(postId) {
    try {
      return await blogService.deleteItem(postId);
    } catch (error) {
      throw new Error("Error deleting post");
    }
  }
}

// Exportando la clase BlogService para ser utilizada en otros módulos
export default BlogService;
