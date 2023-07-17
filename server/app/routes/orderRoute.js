import express from "express";
import {
  createOrder,
  deleteOrderList,
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
router.delete("/:productId", deleteOrderList);

export default router;
