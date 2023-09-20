import express from "express";
import { getUser, updateUser } from "../controllers/UserController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.patch("/update-info", userAuth, updateUser);
router.get("/:userId", getUser);

export default router;
