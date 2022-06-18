const { model, Schema } = require("mongoose");

const orderSchema = new Schema(
  {
    orderNumber: {},
    user: { type: Schema.Types.ObjectId, ref: "User" },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      phone: { type: Number, required: [true, ""] },
      city: { type: String, required: true },
      locality: { type: String, required: true },
      address: { type: String, required: true },
    },
    // paymentMethod: {
    //   type: String,
    //   required: true,
    // },
    // paymentResult: {
    //   id: { type: String },
    //   status: { type: String },
    //   update_time: { type: String },
    //   email_address: { type: String },
    // },
    deliveryFee: { type: Number, required: [true, ""] },
    totalPrice: { type: Number, required: [true, ""] },
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
