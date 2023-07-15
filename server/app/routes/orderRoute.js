import express from "express";
import { createOrder, getOrder, getOrderList, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/order-list", getOrderList);
router.get("/:userId", getOrder);

export default router;
