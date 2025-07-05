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




const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const formController = require("../controllers/formController");
const dashboardController = require("../controllers/dashboardController");
const chartController = require("../controllers/chartController");
const authMiddleware = require("../middlewares/auth");
const allowRoles = require("../middlewares/roleCheck");

// Ensure uploads/documents directory exists
const uploadDir = path.join(__dirname, "../uploads/documents");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Routes

router.post("/submit-form", upload.single("profileFile"), formController.submitForm);
router.get("/get-forms", formController.getAllForms);

// 📄 Get all forms (Admin + Viewer)
router.get(
  "/get-forms",
  authMiddleware,
  allowRoles("admin", "viewer"),
  formController.getAllForms
);

// 📄 Get single form by ID
// router.get(
//   "/form/:formId",
//   authMiddleware,
//   allowRoles("admin", "viewer"),
//   formController.getFormById
// );

// ❌ Delete form (Admin only)
router.delete(
  "/delete-form/:id",
  authMiddleware,
  allowRoles("admin"),
  formController.deleteFormById
);

// 📊 Dashboard summary (Admin + Viewer)
router.get(
  "/dashboard-summary",
  authMiddleware,
  allowRoles("admin", "viewer"),
  dashboardController.getDashboardSummary
);

// 📈 Monthly submission chart (Admin + Viewer)
router.get(
  "/chart/monthly-submissions",
  authMiddleware,
  allowRoles("admin", "viewer"),
  chartController.getMonthlySubmissions
);

module.exports = router;
