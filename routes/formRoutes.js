const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const formController = require("../controllers/formController");

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

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const formController = require("../controllers/formController");

// //  Ensure 'uploads/documents' directory exists
// const uploadDir = path.join(__dirname, "../uploads/documents");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//   console.log(" Created folder:", uploadDir);
// }

// //  Multer storage setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log(" Uploading to folder:", uploadDir);
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + file.originalname;
//     console.log(" File saved as:", uniqueName);
//     cb(null, uniqueName);
//   }
// });

// //  Multer upload middleware
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
// });

// //  Routes
// router.post("/submit-form", upload.single("profileFile"), formController.submitForm);
// router.get("/get-forms", formController.getAllForms);

// module.exports = router;
