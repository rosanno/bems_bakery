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
router.patch("/:productId", userAuth, updateOrder);
router.delete("/:productId", userAuth, deleteOrderList);
router.get("/", getOrders);
router.get("/get-total-revenue", userAuth, getTotalRevenue);
router.get("/get-sales-count", userAuth, getSalesCount);
router.get("/get-monthly-revenue", userAuth, getMonthlyRevenuePaidOrders);
router.get("/order-list", userAuth, getOrderList);
router.get("/customer/orders", userAuth, getOrder);

export default router;
