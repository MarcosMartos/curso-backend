import BlogService from "../services/blog.js"; // Importar BlogService

class BlogController {
  // Método para obtener todas las publicaciones
  static async getPosts(req, res) {
    try {
      const posts = await BlogService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  // Método para obtener una publicación por su ID
  static async getPostById(req, res) {
    try {
      const post = await BlogService.getPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  // Método para crear una nueva publicación
  static async savePost(req, res) {
    try {
      const newPost = await BlogService.createPost(req.body);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  // Método para actualizar una publicación
  static async updatePost(req, res) {
    try {
      const updatedPost = await BlogService.updatePost(req.params.id, req.body);
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  // Método para eliminar una publicación
  static async deletePost(req, res) {
    try {
      await BlogService.deletePost(req.params.id);
      res.status(200).json({ msg: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
}

// Exportando cada método individualmente
export const getPosts = BlogController.getPosts;
export const getPostById = BlogController.getPostById;
export const savePost = BlogController.savePost;
export const updatePost = BlogController.updatePost;
export const deletePost = BlogController.deletePost;
