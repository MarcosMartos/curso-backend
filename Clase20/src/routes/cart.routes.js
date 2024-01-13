import express from "express";

import {
  addProductToCart,
  deleteProductFromCart,
  getCartOfActiveUser,
  buyCart,
  getHistoryBuysOfCurrentUser,
  getCartById,
  productAddedToCart,
} from "../controllers/cart.controller.js";

import { body_must_contain_attributes } from "../middlewares/validationData.middleware.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  body_must_contain_attributes(["productId", "cartId"]),
  addProductToCart
);

router.delete("/:cid/product/:pid", isAuthenticated, deleteProductFromCart);

router.get("/", isAuthenticated, getCartOfActiveUser);

router.get("/history", isAuthenticated, getHistoryBuysOfCurrentUser);

router.get("/:cid", isAuthenticated, getCartById);

router.put("/:cid/buy", isAuthenticated, buyCart);

router.get("/:cid/product/:pid", isAuthenticated, productAddedToCart);

export default router;
