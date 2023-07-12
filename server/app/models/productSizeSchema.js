import mongoose from "mongoose";

const productSizeSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
});

const Size = mongoose.model("Size", productSizeSchema);

export default Size;
