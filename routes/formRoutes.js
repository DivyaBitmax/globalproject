// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const formController = require("../controllers/formController");
// // const authMiddleware = require("../middleware/authMiddleware");



// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
// });
// const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// router.post("/submit-form", upload.single("profileFile"), formController.submitForm);
// router.get("/get-forms", formController.getAllForms);
// // router.get("/get-forms", authMiddleware, formController.getAllForms);
// module.exports = router;






// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const formController = require("../controllers/formController");

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

// module.exports = router;



const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const formController = require("../controllers/formController");

// ✅ Use /tmp/documents for Render compatibility
const uploadDir = "/tmp/documents";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Configure Multer to save files to /tmp
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ✅ Routes
router.post("/submit-form", upload.single("profileFile"), formController.submitForm);
router.get("/get-forms", formController.getAllForms);

module.exports = router;
