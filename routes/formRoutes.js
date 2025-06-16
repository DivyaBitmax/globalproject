const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const formController = require("../controllers/formController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/get-forms", authMiddleware, formController.getAllForms);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.post("/submit-form", upload.single("profileFile"), formController.submitForm);
// router.get("/get-forms", formController.getAllForms);
router.get("/get-forms", authMiddleware, formController.getAllForms);
module.exports = router;