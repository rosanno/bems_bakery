import express from "express";
import { addReviewToProduct } from "../controllers/customerReviewController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:productId", userAuth, addReviewToProduct);

export default router;
