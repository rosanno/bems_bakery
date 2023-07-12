import express from "express";
import { login, register } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);

export default router;
