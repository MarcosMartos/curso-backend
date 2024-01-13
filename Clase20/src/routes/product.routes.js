import express from "express";

import {
  addProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from "../controllers/product.controller.js";

import {
  body_must_contain_attributes,
  body_must_not_contain_attributes,
} from "../middlewares/validationData.middleware.js";

import {
  multerUploads,
  processImage,
} from "../middlewares/uploadImages.middleware.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

import isAdmin from "../middlewares/checkRole.middleware.js";
import { generateProduct } from "../mocks/product.mock.js";
import { customResponse } from "../utils/utils.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/mockingproducts", (req, res, next) => {
  let products = [];
  for (let i = 0; i < 100; i++) {
    products.push(generateProduct());
  }
  return customResponse(res, 200, products);
});

router.get("/:pid", getProductById);

router.post(
  "/",
  isAuthenticated,
  isAdmin,
  body_must_contain_attributes([
    "title",
    "description",
    "price",
    "release_date",
    "developerId",
    "CPU",
    "RAM",
    "memory",
    "GPU",
  ]),
  addProduct
);

router.put(
  "/:pid",
  isAuthenticated,
  isAdmin,
  body_must_not_contain_attributes([
    "id",
    "url_front_page",
    "front_page_public_id",
  ]),
  multerUploads,
  processImage,
  updateProductById
);

router.delete("/:pid", isAuthenticated, isAdmin, deleteProductById);

export default router;
