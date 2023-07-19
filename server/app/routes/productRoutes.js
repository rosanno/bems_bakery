import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add-product", userAuth, addProduct);
router.get("/", getProducts);
router.get("/:productId", getProduct);
router.patch("/:productId", userAuth, updateProduct);
router.delete("/:productId", userAuth, deleteProduct);

export default router;
