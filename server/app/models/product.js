import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient", required: true }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    availableSizes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
        required: true,
      },
    ],
    customerReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomerReview",
      },
    ],
    specialOffers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SpecialOffer",
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    lastUpdatedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
