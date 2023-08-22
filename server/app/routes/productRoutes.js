import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProductOverallRating,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add-product", adminAuth, addProduct);
router.patch("/:productId", adminAuth, updateProduct);
router.delete("/:productId", adminAuth, deleteProduct);
router.get("/", getProducts);
router.get("/:productId", getProduct);
router.get("/rating/:productId", getProductOverallRating);

export default router;
