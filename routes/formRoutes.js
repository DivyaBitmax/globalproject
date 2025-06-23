const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const formController = require("../controllers/formController");
const dashboardController = require("../controllers/dashboardController");
const visitorController = require("../controllers/visitorController");

// Ensure 'uploads/documents' directory exists
const uploadDir = path.join(__dirname, "../uploads/documents");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Routes
router.post("/submit-form", upload.single("profileFile"), formController.submitForm);
router.get("/get-forms", formController.getAllForms);

router.get("/form/:formId", formController.getFormById);
router.delete("/delete-form/:id", formController.deleteFormById);


//dashboard
router.get("/dashboard-summary", dashboardController.getDashboardSummary);
router.post("/track-visitor", visitorController.trackVisitor);

// In routes/formRoutes.js ya chartRoutes.js
const chartController = require("../controllers/chartController");

router.get("/chart/monthly-submissions", chartController.getMonthlySubmissions);

module.exports = router;

