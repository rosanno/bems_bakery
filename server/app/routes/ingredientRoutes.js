import express from "express";
import {
  createIngredient,
  deleteIngredient,
  getIngredient,
  getIngredients,
  updateIngredient,
} from "../controllers/ingredientController.js";

const router = express.Router();

router.post("/", createIngredient);
router.put("/:id", updateIngredient);
router.delete("/:id", deleteIngredient);
router.get("/", getIngredients);
router.get("/:id", getIngredient);

export default router;
