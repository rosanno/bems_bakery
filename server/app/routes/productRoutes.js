import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add-product", addProduct);
router.get("/", getProducts);
router.get("/:productId", getProduct);
router.patch("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

export default router;
