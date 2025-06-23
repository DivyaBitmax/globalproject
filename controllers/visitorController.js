// controllers/visitorController.js
const Visitor = require("../models/Visitor");

exports.trackVisitor = async (req, res) => {
  try {
    await Visitor.create({ ip: req.ip });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
