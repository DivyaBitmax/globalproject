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
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const formController = require("../controllers/formController");
const dashboardController = require("../controllers/dashboardController");
const chartController = require("../controllers/chartController");

// ✅ Cloudinary Storage Config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "global-projects/profiles",
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
    resource_type: "auto",
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

// ✅ Multer with 5MB limit + allowed types
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, and PDF files are allowed"));
    }
  }
});

// ✅ Routes
router.post("/submit-form", upload.single("profileFile"), formController.submitForm);
router.get("/get-forms", formController.getAllForms);
router.get("/form/:formId", formController.getFormById);
router.delete("/delete-form/:id", formController.deleteFormById);

// ✅ Dashboard & Chart
router.get("/dashboard-summary", dashboardController.getDashboardSummary);
router.get("/chart/monthly-submissions", chartController.getMonthlySubmissions);

module.exports = router;
