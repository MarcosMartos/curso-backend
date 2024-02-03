import { Router } from "express";
import UsersController from "../controllers/users.js";
import multerMiddleware from "../middlewares/multerMiddleware.js";
const router = Router();
const usersController = new UsersController();

// Ruta para subir documentos de usuario
router.post(
  "/:uid/documents",
  multerMiddleware,
  usersController.uploadDocuments
);

// Ruta para actualizar a usuario premium
router.put("/premium/:uid", usersController.upgradeToPremium);

export default router;
