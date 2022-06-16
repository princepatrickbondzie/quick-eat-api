const { model, Schema } = require("mongoose");

const deliverySchema = new Schema({});

module.exports = model("Delivery", deliverySchema);
