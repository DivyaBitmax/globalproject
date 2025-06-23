// models/Visitor.js
const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  ip: String,
  visitedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Visitor", visitorSchema);
