
const Project = require("../models/CenterProject");

exports.addProject = async (req, res) => {
  try {
    const data = { ...req.body };

    // ✅ Save file paths instead of whole file objects
    if (req.files?.ndaFile) {
      data.ndaFile = req.files.ndaFile[0].path;
    }
    if (req.files?.slaFile) {
      data.slaFile = req.files.slaFile[0].path;
    }
    if (req.files?.invoiceFile) {
      data.invoiceFile = req.files.invoiceFile[0].path;
    }

    const project = new Project(data);
    const savedProject = await project.save();

    console.log("data", savedProject);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: savedProject,
    });
  } catch (err) {
    console.error("Add project error:", err);
    res
      .status(500)
      .json({ error: err.message || "Internal Server Error", status: false });
  }
};


// ✅ Get All Projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Get Project by ID
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "Not Found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Update Project
exports.updateProject = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.files?.ndaFile) data.ndaFile = req.files.ndaFile[0].path;
    if (req.files?.slaFile) data.slaFile = req.files.slaFile[0].path;
    if (req.files?.invoiceFile) data.invoiceFile = req.files.invoiceFile[0].path;

    const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!project) return res.status(404).json({ msg: "Not Found" });

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ msg: "Not Found" });

    res.json({ msg: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
