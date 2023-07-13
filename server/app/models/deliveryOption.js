import mongoose from "mongoose";

const deliveryOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const DeliveryOption = mongoose.model("DeliveryOption", deliveryOptionSchema);

export default DeliveryOption;
