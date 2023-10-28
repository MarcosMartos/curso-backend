import express from "express";

import {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:pid", getProductById);

router.post("/", addProduct);

router.put("/:pid", updateProductById);

router.delete("/:pid", deleteProductById);

export default router;
