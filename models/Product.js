const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: [true, ""] },
    description: { type: String, required: [true, ""] },
    price: { type: Number, required: [true, ""] },
    quantity: { type: Number, required: [true, ""] },
    image: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
