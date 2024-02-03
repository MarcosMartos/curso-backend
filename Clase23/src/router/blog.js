// Importa los módulos necesarios
import { Router } from "express";
import {
  getPosts,
  getPostById,
  savePost,
  updatePost,
  deletePost,
} from "../controllers/blog.js";

// Crea una nueva instancia de Router
const router = Router();

// Ruta para obtener todos los posts del blog
// Esta ruta responde a solicitudes GET a la raíz del endpoint del blog
router.get("/", getPosts);

// Ruta para obtener un post específico del blog por su ID
// Esta ruta responde a solicitudes GET a un endpoint con un ID específico del post
router.get("/:id", getPostById);

// Ruta para guardar un nuevo post en el blog
// Esta ruta responde a solicitudes POST para crear un nuevo post
router.post("/", savePost);

// Ruta para actualizar un post existente en el blog por su ID
// Esta ruta responde a solicitudes PUT para actualizar un post existente
router.put("/:id", updatePost);

// Ruta para eliminar un post del blog por su ID
// Esta ruta responde a solicitudes DELETE para eliminar un post específico
router.delete("/:id", deletePost);

// Exporta el router para ser utilizado en otros módulos
export default router;
