import mongoose from "mongoose";

const productReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Review = mongoose.model("Review", productReviewSchema);

export default Review;
