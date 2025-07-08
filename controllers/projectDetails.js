const ProjectDetail = require("../models/projectDetails");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectDetail.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.createProject = async (req, res) => {
if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

  console.log("✅ REQ BODY:", req.body);
  console.log("✅ FILE:", req.file);

  try {
    const projectData = req.body;

    if (req.file && req.file.path) {
      projectData.pdfLink = req.file.path; // ✅ Cloudinary PDF URL
    }

    const newProject = new ProjectDetail(projectData);
    console.log("📦 Ready to Save:", newProject); // 👈 ADD THIS

    await newProject.save();
    console.log("✅ Project saved to DB");

    res.status(201).json(newProject);
  } catch (err) {
    console.error("❌ Error while saving:", err);
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






























// const ProjectDetail = require("../models/projectDetails");

// //  GET all projects — Accessible to all logged-in users
// exports.getAllProjects = async (req, res) => {
//   try {
//     const projects = await ProjectDetail.find();
//     res.json(projects);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// //  CREATE project — Admin only
// exports.createProject = async (req, res) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: "Access denied" });
//   }

//   try {
//     const projectData = req.body;

//     if (req.file && req.file.path) {
//       projectData.pdfLink = req.file.path; // ✅ Cloudinary PDF URL
//     }

//     const newProject = new ProjectDetail(projectData);
//     await newProject.save();
//     res.status(201).json(newProject);
//   } catch (err) {
//     console.error("❌ Error while saving:", err);
//     res.status(400).json({ message: err.message });
//   }
// };

// //  UPDATE project — Admin only
// exports.updateProject = async (req, res) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: "Access denied" });
//   }

//   try {
//     const updated = await ProjectDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ message: "Project not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// //  DELETE project — Admin only
// exports.deleteProject = async (req, res) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: "Access denied" });
//   }

//   try {
//     const deleted = await ProjectDetail.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Project not found" });
//     res.json({ message: "Project deleted" });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
