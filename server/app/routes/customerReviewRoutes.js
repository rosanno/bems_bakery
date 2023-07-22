import express from "express";
import { addReviewToProduct } from "../controllers/customerReviewController.js";

const router = express.Router();

router.post("/:productId", addReviewToProduct);

export default router;
