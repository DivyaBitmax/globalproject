const express = require("express");
const router = express.Router();
const { 
  addProject, 
  getAllProjects, 
  getProject, 
  updateProject, 
  deleteProject 
} = require("../controllers/CenterProjectController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  upload.fields([
    { name: "ndaFile", maxCount: 1 },
    { name: "slaFile", maxCount: 1 },
    { name: "invoiceFile", maxCount: 1 },
  ]),
  addProject
);

// ✅ Read All
router.get("/", getAllProjects);

// ✅ Read One
router.get("/:id", getProject);

// ✅ Update
router.put(
  "/:id",   upload.fields([
    { name: "ndaFile", maxCount: 1 },
    { name: "slaFile", maxCount: 1 },
    { name: "invoiceFile", maxCount: 1 },
  ]), 
  updateProject
);

// ✅ Delete
router.delete("/:id", deleteProject);

module.exports = router;

