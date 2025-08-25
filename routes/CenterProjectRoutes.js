const express = require("express");
const { 
  addProject, 
  getAllProjects, 
  getProject, 
  updateProject, 
  deleteProject 
} = require("../controllers/CenterProjectController");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "global-projects/center-projects",
    resource_type: "raw",
    allowed_formats: ["pdf"],
  },
});
const upload = multer({ storage });

const router = express.Router();

// ✅ Create
router.post(
  "/", 
  upload.fields([
    { name: "ndaFile", maxCount: 1 },
    { name: "slaFile", maxCount: 1 },
    { name: "invoiceFile", maxCount: 1 }
  ]), 
  addProject
);

// ✅ Read All
router.get("/", getAllProjects);

// ✅ Read One
router.get("/:id", getProject);

// ✅ Update
router.put(
  "/:id", 
  upload.fields([
    { name: "ndaFile", maxCount: 1 },
    { name: "slaFile", maxCount: 1 },
    { name: "invoiceFile", maxCount: 1 }
  ]), 
  updateProject
);

// ✅ Delete
router.delete("/:id", deleteProject);

module.exports = router;

