// controllers/projectController.js
const Project = require("../models/Project");



// exports.createProject = async (req, res) => {
//   try {
//     const newProject = new Project(req.body);
//     const saved = await newProject.save();
//     res.status(201).json({ success: true, data: saved });
//   } catch (err) {
//     if (err.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         error: "Duplicate Project Code or Client Code is not allowed",
//       });
//     }
//     res.status(500).json({ success: false, error: err.message || "Server Error" });
//   }
// };





// exports.createProject = async (req, res) => {
//   try {
//     const { body, files } = req;

//     const newProject = new Project({
//       ...body,
//       imageUrl: files?.imageFile?.[0]?.path || body.imageUrl,
//       pdfLink: files?.pdfFile?.[0]?.path || body.pdfLink,
//     });

//     const saved = await newProject.save();
//     res.status(201).json({ success: true, data: saved });

//   } catch (err) {
//     if (err.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         error: "Duplicate Project Code or Client Code is not allowed",
//       });
//     }
//     res.status(500).json({ success: false, error: err.message });
//   }
// };


exports.createProject = async (req, res) => {
  try {
    const { body, files } = req;

    // Debug logs to verify file upload
    console.log("Image File Info:", files?.imageFile?.[0]);
    console.log("PDF File Info:", files?.pdfFile?.[0]);

    const newProject = new Project({
      ...body,
      imageUrl: files?.imageFile?.[0]?.secure_url || files?.imageFile?.[0]?.path || null,
      pdfLink: files?.pdfFile?.[0]?.secure_url || files?.pdfFile?.[0]?.path || null,
    });

    const saved = await newProject.save();
    res.status(201).json({ success: true, data: saved });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate Project Code or Client Code is not allowed",
      });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};



exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Project not found" });
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Project not found" });
    res.status(200).json({ success: true, message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.getLiveProjects = async (req, res) => {
  try {
    // const liveProjects = await Project.find({ status: "LIVE" });
    const liveProjects = await Project.find({ status: "AVAILABLE" });
    res.status(200).json({
      success: true,
      data: liveProjects,
      count: liveProjects.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};