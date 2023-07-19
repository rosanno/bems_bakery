import express from "express";
import {
  createIngredient,
  deleteIngredient,
  getIngredient,
  getIngredients,
  updateIngredient,
} from "../controllers/ingredientController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", userAuth, createIngredient);
router.put("/:id", userAuth, updateIngredient);
router.delete("/:id", userAuth, deleteIngredient);
router.get("/", getIngredients);
router.get("/:id", getIngredient);

export default router;
