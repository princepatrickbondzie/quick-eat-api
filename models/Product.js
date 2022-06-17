const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: [true, ""] },
    description: { type: String, required: [true, ""] },
    durationFrom: { type: Number, required: [true, ""] },
    durationTo: { type: Number, required: [true, ""] },
    price: { type: Number, required: [true, ""] },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
