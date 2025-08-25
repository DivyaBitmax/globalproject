const mongoose = require("mongoose");

const centerSchema = new mongoose.Schema({
  // name: { type: String, required: true },
  address: String,
  phone: String,
  email: String,
  authorizedPerson: String,
  directorAadharPan: String,
  gst: String,
  bankAccount: String,
  cin: String,
  pan: String,
  mocMoa: String,
  partnershipDeed: String,
  boardResolution: String
}, { timestamps: true });

//✅ Safe export
module.exports = mongoose.models.Center || mongoose.model("Center", centerSchema);