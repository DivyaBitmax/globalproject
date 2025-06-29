const express = require("express");
const router = express.Router();
const requestCallController = require("../controllers/requestCallController");

router.post("/", requestCallController.createRequest);
router.get("/", requestCallController.getAllRequests);

module.exports = router;
