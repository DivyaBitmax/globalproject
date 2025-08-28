const Center = require("../models/CenterDetails");
const mongoose = require("mongoose")
// ✅ Create a new center
exports.addCenter = async (req, res) => {
try {
    const {userId, projectCode, projectType, projectApprovalDate } = req.body;

    const newProject = new Center({
      userId,  
      projectCode,
      projectType,
      projectApprovalDate
    });

    await newProject.save();

    res.status(201).json({ status: true, message: "Center project created", data: newProject });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
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



// get all center by center user Id
// exports.getByCenterUser = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const centers = await Center.findOne({ userId }).sort({ createdAt: -1 });

//     res.status(200).json({
//       message: "All center details by userId",
//       status: true,
//       data: centers
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// get all center by center user Id
exports.getByCenterUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "userId is required",
        status: false,
      });
    }

    const centers = await Center.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "All center details by userId",
      status: true,
      data: centers,   // [] return karega agar kuch nahi mila
    });
  } catch (err) {
    res.status(500).json({ message: err.message, status: false });
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