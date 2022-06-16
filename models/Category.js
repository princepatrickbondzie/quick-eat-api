const { model, Schema } = require("mongoose");

const categorySchema = new Schema({});

module.exports = model("Category", categorySchema);
