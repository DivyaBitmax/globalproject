const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Visitor', visitorSchema);
