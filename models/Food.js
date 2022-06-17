const { model, Schema } = require("mongoose");

const foodSchema = new Schema(
  {
    name: { type: String, required: [true, ""] },
    description: { type: String, required: [true, ""] },
    durationFrom: { type: Number, required: [true, ""] },
    durationTo: { type: Number, required: [true, ""] },
    price: { type: Number, required: [true, ""] },
    image: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

module.exports = model("Food", foodSchema);
