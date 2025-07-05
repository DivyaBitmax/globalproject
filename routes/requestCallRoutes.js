// const express = require("express");
// const router = express.Router();
// const requestCallController = require("../controllers/requestCallController");

// router.post("/", requestCallController.createRequest);
// router.get("/", requestCallController.getAllRequests);
// // ✅ DELETE
// router.delete("/:id", requestCallController.deleteRequest);

// module.exports = router;











// --- CALLBACK ROUTES ---
const requestCallController = require("../controllers/requestCallController");

router.post("/callback", allowRoles("admin"), requestCallController.createRequest);
router.get("/callback", allowRoles("admin", "viewer"), requestCallController.getAllRequests);
router.delete("/callback/:id", allowRoles("admin"), requestCallController.deleteRequest);

module.exports = router;