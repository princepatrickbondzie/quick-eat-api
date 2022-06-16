const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    unique: true,
  },
  city: { type: String },
  locality: { type: String },
  address: { type: String },
  role: {
    type: String,
    required: [true, "User role is required"],
    enum: ["user", "merchant", "admin"],
    default: "user",
  },
});

module.exports = model("User", userSchema);