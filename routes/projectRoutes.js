// routes/projectRoutes.js ✅ CORRECTED
const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.post("/", projectController.createProject);        // POST /api/projects
router.get("/", projectController.getAllProjects);        // GET /api/projects
router.get("/:id", projectController.getProjectById);     // GET /api/projects/:id
router.put("/:id", projectController.updateProject);      // PUT /api/projects/:id
router.delete("/:id", projectController.deleteProject);   // DELETE /api/projects/:id

module.exports = router;
