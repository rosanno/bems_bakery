import mongoose from "mongoose";

const productIngredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Ingredient = mongoose.model("Ingredient", productIngredientSchema);

export default Ingredient;
