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
import cartRoutes from "./app/routes/cartRoute.js";
import customerReviewRoutes from "./app/routes/customerReviewRoutes.js";
import checkoutRoutes from "./app/routes/checkoutRoutes.js";
import messageRoutes from "./app/routes/messageRoutes.js";

dotenv.config();
const app = express();

const PORT = 3000 || process.env.PORT;

dbconnect();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cake-shop-admin.vercel.app",
      "https://cake-shop-delights.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use((req, res, next) => {
  // Set the Access-Control-Allow-Origin header to the origin of the request
  // when the request's credentials mode is 'include'.
  if (req.header("Access-Control-Allow-Credentials") === "include") {
    res.header("Access-Control-Allow-Origin", req.header("Origin"));
  } else {
    res.header("Access-Control-Allow-Origin", "*");
  }

  // Set the other CORS headers.
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use("/api/cart", cartRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/ingredient", ingredientRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/customer-review", customerReviewRoutes);
app.use("/api/message", messageRoutes);

app.use("/api/customer/checkout", checkoutRoutes);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
