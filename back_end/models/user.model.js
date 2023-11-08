const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    country: { type: String },
    phone: { type: String },
    about: { type: String, required: true },
    confirmed: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
const user = mongoose.model("users", userSchema);

module.exports = user;
