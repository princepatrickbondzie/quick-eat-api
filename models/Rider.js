const { model, Schema } = require("mongoose");

const riderSchema = new Schema({});

module.exports = model("Rider", riderSchema);
