import express from "express";

import { body_must_contain_attributes } from "../middlewares/validationData.middleware.js";

import {
  rate,
  getRecentRatings,
  getRatingOfCurrentUser,
} from "../controllers/rating.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  body_must_contain_attributes(["rating"]),
  isAuthenticated,
  rate
);

router.get("/recent", getRecentRatings);

router.get("/", isAuthenticated, getRatingOfCurrentUser);

export default router;
