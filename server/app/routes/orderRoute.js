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
  updateDeliveryStatus,
  updateOrder,
} from "../controllers/orderController.js";
import { adminAuth, userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", userAuth, createOrder);
router.patch("/:orderId", adminAuth, updateOrder);
router.patch("/delivery-status/:orderId", adminAuth, updateDeliveryStatus);
router.delete("/:productId", adminAuth, deleteOrderList);
router.get("/", userAuth, getOrders);
router.get("/get-total-revenue", adminAuth, getTotalRevenue);
router.get("/get-sales-count", adminAuth, getSalesCount);
router.get("/get-monthly-revenue", adminAuth, getMonthlyRevenuePaidOrders);
router.get("/order-list", adminAuth, getOrderList);
router.get("/customer/orders", userAuth, getOrder);

export default router;
