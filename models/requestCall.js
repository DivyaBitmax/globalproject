const mongoose = require("mongoose");

const requestCallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("RequestCall", requestCallSchema);
