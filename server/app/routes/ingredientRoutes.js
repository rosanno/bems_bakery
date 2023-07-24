import express from "express";
import {
  createIngredient,
  deleteIngredient,
  getIngredient,
  getIngredients,
  updateIngredient,
} from "../controllers/ingredientController.js";
import { adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", adminAuth, createIngredient);
router.put("/:id", adminAuth, updateIngredient);
router.delete("/:id", adminAuth, deleteIngredient);
router.get("/", getIngredients);
router.get("/:id", getIngredient);

export default router;
