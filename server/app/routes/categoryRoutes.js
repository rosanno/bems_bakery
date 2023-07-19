import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", userAuth, createCategory);
router.put("/:id", userAuth, updateCategory);
router.delete("/:id", userAuth, deleteCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);

export default router;
