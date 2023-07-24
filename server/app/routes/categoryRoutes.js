import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", adminAuth, createCategory);
router.put("/:id", adminAuth, updateCategory);
router.delete("/:id", adminAuth, deleteCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);

export default router;
