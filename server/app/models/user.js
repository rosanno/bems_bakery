import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
});

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    addresses: [addressSchema],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshToken: [refreshTokenSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
