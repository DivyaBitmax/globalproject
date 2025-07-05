// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const formController = require("../controllers/formController");
// const dashboardController = require("../controllers/dashboardController");


// // Ensure 'uploads/documents' directory exists
// const uploadDir = path.join(__dirname, "../uploads/documents");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure Multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// });

// // Routes
// 4
// router.post("/submit-form", upload.single("profileFile"), formController.submitForm);
// router.get("/get-forms", formController.getAllForms);

// router.get("/form/:formId", formController.getFormById);
// router.delete("/delete-form/:id", formController.deleteFormById);


// //dashboard
// router.get("/dashboard-summary", dashboardController.getDashboardSummary);

// // In routes/formRoutes.js ya chartRoutes.js
// const chartController = require("../controllers/chartController");

// router.get("/chart/monthly-submissions", chartController.getMonthlySubmissions);

// module.exports = router;





// --- FORM ROUTES ---
const formController = require("../controllers/formController");
const dashboardController = require("../controllers/dashboardController");
const chartController = require("../controllers/chartController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads/documents");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.post("/submit-form", allowRoles("admin"), upload.single("profileFile"), formController.submitForm);
router.get("/get-forms", allowRoles("admin", "viewer"), formController.getAllForms);
router.get("/form/:formId", allowRoles("admin", "viewer"), formController.getFormById);
router.delete("/delete-form/:id", allowRoles("admin"), formController.deleteFormById);

router.get("/dashboard-summary", allowRoles("admin", "viewer"), dashboardController.getDashboardSummary);
router.get("/chart/monthly-submissions", allowRoles("admin", "viewer"), chartController.getMonthlySubmissions);