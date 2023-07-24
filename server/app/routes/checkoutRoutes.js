import express from "express";

import { userAuth } from "../middleware/authMiddleware.js";
import { createOrder } from "../controllers/checkoutController.js";

const router = express.Router();

router.post("/", userAuth, createOrder);

export default router;
