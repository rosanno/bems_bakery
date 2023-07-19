import express from "express";
import { getAuthUser, login, logout, register } from "../controllers/AuthController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.post("/logout", userAuth, logout);
router.get("/user", userAuth, getAuthUser);

export default router;
