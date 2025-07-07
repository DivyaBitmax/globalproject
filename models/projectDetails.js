const mongoose = require("mongoose");

const projectDetailsSchema = new mongoose.Schema({
  projectCode: { type: String, required: true },
  projectType: { type: String, required: true },
  projectDetails: { type: String },
  moneyPayout: { type: String },
  securityDeposit: { type: String },
  country: { type: String },
  softwareRequirement: { type: String },
  closedCenter: { type: String },
  projectStatus: { type: String },
  tatGoLive: { type: String },
  pdfLink: { type: String },

  
}, { timestamps: true });

module.exports = mongoose.model("ProjectDetail", projectDetailsSchema);