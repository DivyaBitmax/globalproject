const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  projectCode: { type: String, required: true, unique: true },
  clientCode: { type: String, required: true },
  pdfLink: { type: String },
  imageUrl: { type: String },
  status: { type: String, enum: ["LIVE", "HOLD"], default: "LIVE" },
  totalApplications: { type: Number, default: 0 },
  lastActivity: { type: Date, default: Date.now },
  country: { type: String }
}, { timestamps: true });
module.exports = mongoose.model("Project", projectSchema);