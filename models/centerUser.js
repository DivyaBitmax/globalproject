

const mongoose = require("mongoose");

const centerUserSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Change "User" to "CenterUser"
module.exports = mongoose.models.CenterUser || mongoose.model("CenterUser", centerUserSchema);
