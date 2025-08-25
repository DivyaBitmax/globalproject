const express = require("express");
const {
  addCenter,
  getCenter,
  getAllCenters,
  updateCenter,
  deleteCenter
} = require("../controllers/centerDetailsController");

const router = express.Router();

// Create center
router.post("/", addCenter);

// Get all centers
router.get("/", getAllCenters);

// Get single center
router.get("/:id", getCenter);

// Update center
router.put("/:id", updateCenter);

// Delete center
router.delete("/:id", deleteCenter);

module.exports = router;
