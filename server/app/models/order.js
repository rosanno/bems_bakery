import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        orderItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
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
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
