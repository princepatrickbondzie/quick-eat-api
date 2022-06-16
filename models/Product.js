const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, ""],
  },
});

module.exports = model("Product", productSchema);
