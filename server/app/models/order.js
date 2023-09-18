import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Validate that quantity is a positive integer
  },
  paymentStatus: {
    type: String,
    enum: ["Unpaid", "Paid"],
    default: "Unpaid",
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  isReview: {
    type: Boolean,
    default: false,
  },
  total: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdatedDate: {
    type: Date,
    default: Date.now,
  },
});

// Order Schema
const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [orderItemSchema], // Array of order items
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
