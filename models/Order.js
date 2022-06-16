const { model, Schema } = require("mongoose");

const orderSchema = new Schema({});

module.exports = model("Order", orderSchema);
