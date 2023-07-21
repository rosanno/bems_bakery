import mongoose from "mongoose";

const customerReviewSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    datePosted: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const CustomerReview = mongoose.model("CustomerReview", customerReviewSchema);

export default CustomerReview;
