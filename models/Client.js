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
  // ✅ Track which user created this
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

});

module.exports = mongoose.model("Client", clientSchema);
