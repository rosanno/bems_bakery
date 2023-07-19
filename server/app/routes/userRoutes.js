import express from "express";
import { createUser, getUser, updateUser } from "../controllers/UserController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createUser);
router.patch("/", userAuth, updateUser);
router.get("/:userId", getUser);

export default router;
