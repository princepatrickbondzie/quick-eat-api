const { model, Schema } = require("mongoose");

const orderSchema = new Schema(
  {
    orderNumber: {},
    user: { type: Schema.Types.ObjectId, ref: "User" },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    amount: { type: Number, required: [true, ""] },
    note: { type: String, required: [true, ""] },
    status: {
      type: String,
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Not processed",
    },
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);
