import mongoose from "mongoose";

const specialOfferSchema = new mongoose.Schema({
  discount: {
    type: Number,
    required: true,
  },
  validity: {
    type: Date,
    required: true,
  },
});

const SpecialOffer = mongoose.model("SpecialOffer", specialOfferSchema);

export default SpecialOffer;
