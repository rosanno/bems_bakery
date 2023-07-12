import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

export const dbconnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("[⚡] connected to database sucessfully"))
    .catch((err) => console.log(err));
};

