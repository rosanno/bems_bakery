import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProductByCategory,
  getProductOverallRating,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add-product", userAuth, addProduct);
router.patch("/:productId", userAuth, updateProduct);
router.delete("/:productId", userAuth, deleteProduct);
router.get("/", getProducts);
router.get("/:productId", getProduct);
router.get("/rating/:productId", getProductOverallRating);
router.get("/category/:category", getProductByCategory);

export default router;
