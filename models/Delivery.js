const { model, Schema } = require("mongoose");

const deliverySchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order" },
    rider: { type: Schema.Types.ObjectId, ref: "Rider" },
    status: {
      type: String,
      enum: ["delivered", "pending", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = model("Delivery", deliverySchema);
