import express from "express";
import {
  createOrder,
  deleteOrderList,
  getMonthlyRevenuePaidOrders,
  getOrder,
  getOrderList,
  getOrders,
  getSalesCount,
  getTotalRevenue,
  updateOrder,
} from "../controllers/orderController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", userAuth, createOrder);
router.get("/", getOrders);
router.get("/get-total-revenue", getTotalRevenue);
router.get("/get-sales-count", getSalesCount);
router.get("/get-monthly-revenue", getMonthlyRevenuePaidOrders);
router.get("/order-list", getOrderList);
router.get("/:userId", getOrder);
router.patch("/:productId", updateOrder);
router.delete("/:productId", deleteOrderList);

export default router;
