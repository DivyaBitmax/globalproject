const Center = require("../models/CenterDetails");

// ✅ Create a new center
exports.addCenter = async (req, res) => {
  try {
    // ✅ Ensure user is authenticated
 
    // if (!userId) {
    //   return res.status(401).json({ success: false, message: "Unauthorized" });
    // }

    // ✅ Prepare center data with userId
    const centerData = {...req.body };

    // ✅ Save center to DB
    const center = await new Center(centerData).save();

    res.status(201).json({ success: true, message: "Center added successfully", center });
  } catch (err) {
    console.error("Add center error:", err);
    res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
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
exports.getByCenterUser = async (req, res) => {
  const userId=req.user?.id;
  try {
    const centers = await Center.findOne({userId}).sort({ createdAt: -1 });
  res.status(200).json({message:"All center details by userId",status:true,data:centers});
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