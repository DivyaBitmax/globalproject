const ProjectDetail = require("../models/projectDetails");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectDetail.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// exports.createProject = async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });
//   try {
//     const newProject = new ProjectDetail(req.body);
//     await newProject.save();
//     res.status(201).json(newProject);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };


exports.createProject = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

  try {
    const projectData = req.body;

    if (req.file && req.file.path) {
      projectData.pdfLink = req.file.path; // ✅ Cloudinary PDF URL
    }

    const newProject = new ProjectDetail(projectData);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



exports.updateProject = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });
  try {
    const updated = await ProjectDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });
  try {
    await ProjectDetail.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};