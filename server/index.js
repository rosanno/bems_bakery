import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import { dbconnect } from "./config/database.js";
import userRoutes from "./app/routes/userRoutes.js";
import authRoutes from "./app/routes/authRoutes.js";
import productRoutes from "./app/routes/productRoutes.js";
import categoryRoutes from "./app/routes/categoryRoutes.js";
import ingredientRoutes from "./app/routes/ingredientRoutes.js";
import orderRoutes from "./app/routes/orderRoute.js";

dotenv.config();
const app = express();

const PORT = 3000 || process.env.PORT;

dbconnect();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://cake-shop-admin.vercel.app"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/ingredient", ingredientRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
