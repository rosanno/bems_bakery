import express from "express";

import { userAuth } from "../middleware/authMiddleware.js";
import {
  addToCart,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/", userAuth, addToCart);
router.put("/update", userAuth, updateCartItem);
router.delete("/delete/:product_id", userAuth, deleteCartItem);
router.get("/", userAuth, getCartItems);

export default router;
