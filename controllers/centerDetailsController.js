const Center = require("../models/CenterDetails");

// ✅ Create a new center
exports.addCenter = async (req, res) => {
  try {
    const center = new Center(req.body);
    await center.save();
    res.status(201).json(center);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// ✅ Get center by ID
exports.getCenter = async (req, res) => {
  try {
    const center = await Center.findById(req.params.id);
    res.json(center);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ✅ Get all centers
exports.getAllCenters = async (req, res) => {
  try {
    const centers = await Center.find().sort({ createdAt: -1 });
    res.json(centers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};




// ✅ Update center by ID
exports.updateCenter = async (req, res) => {
  try {
    const center = await Center.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!center) return res.status(404).json({ msg: "Center not found" });
    res.json(center);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ✅ Delete center by ID
exports.deleteCenter = async (req, res) => {
  try {
    const center = await Center.findByIdAndDelete(req.params.id);
    if (!center) return res.status(404).json({ msg: "Center not found" });
    res.json({ msg: "Center deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};