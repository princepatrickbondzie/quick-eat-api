const { model, Schema } = require("mongoose");

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    amount: { type: Number, required: [true, ""] },
    status: { type: String, required: [true, ""] },
    note: { type: String, required: [true, ""] },
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);