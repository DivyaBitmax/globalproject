// const mongoose = require("mongoose");

// const clientSchema = new mongoose.Schema({
//    name: { type: String },  // removed required
//   mobile: { type: String },  // removed required
//   email: { type: String },  // removed required
//   projectInterested: String,
//   projectCode: String,
//   location: String,
//   dateOfCall: Date,
//   attendedBy: String,
//   status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
//   remarks: String,
//   // ✅ Track which user created this
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
  

// }, { timestamps: true });

// module.exports = mongoose.model("Client", clientSchema);










const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  projectInterested: String,
  projectCode: String,
  location: String,
  dateOfCall: Date,
  attendedBy: String,
  status: String,
  remarks: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

// ✅ Pre-save hook to convert fields to uppercase
clientSchema.pre("save", function (next) {
  if (this.name) this.name = this.name.toUpperCase();
  if (this.email) this.email = this.email.toUpperCase();
  if (this.projectInterested) this.projectInterested = this.projectInterested.toUpperCase();
  if (this.projectCode) this.projectCode = this.projectCode.toUpperCase();
  if (this.location) this.location = this.location.toUpperCase();
  if (this.attendedBy) this.attendedBy = this.attendedBy.toUpperCase();
  if (this.remarks) this.remarks = this.remarks.toUpperCase();
  next();
});

module.exports = mongoose.model("Client", clientSchema);
