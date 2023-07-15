import express from "express";
import {
  createOrder,
  getOrder,
  getOrderList,
  getOrders,
  updateOrder,
} from "../controllers/orderController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", userAuth, createOrder);
router.get("/", getOrders);
router.get("/order-list", getOrderList);
router.get("/:userId", getOrder);
router.patch("/:productId", updateOrder);

export default router;
