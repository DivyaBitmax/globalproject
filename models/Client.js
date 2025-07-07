const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  projectInterested: String,
  projectCode: String,
  location: String,
  dateOfCall: Date,
  attendedBy: String,
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  remarks: String,
});

module.exports = mongoose.model("Client", clientSchema);
