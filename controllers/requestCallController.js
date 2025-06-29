const RequestCall = require("../models/requestCall");

exports.createRequest = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const newRequest = await RequestCall.create({ name, email, phone });
    res.status(201).json({ success: true, data: newRequest });
  } catch (err) {
    console.error("Request Call Error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await RequestCall.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};
