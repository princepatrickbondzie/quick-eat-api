const { model, Schema } = require("mongoose");

const categorySchema = new Schema({}, { timestamps: true });

module.exports = model("Category", categorySchema);
