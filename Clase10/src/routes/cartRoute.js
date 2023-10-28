import express from "express";

import {
  addProductToCartById,
  createCart,
  getProductsOfCartById,
  deleteCart,
  deleteProductFromCart,
  updateProductOfCartById,
  updateProductsOfCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:cid", getProductsOfCartById);

router.post("/", createCart);

router.post("/:cid/products/:pid", addProductToCartById);

router.delete("/:cid/products/:pid", deleteProductFromCart);

router.put("/:cid/products/:pid", updateProductOfCartById);

router.put("/:cid", updateProductsOfCart);

router.delete("/:cid", deleteCart);

export default router;
