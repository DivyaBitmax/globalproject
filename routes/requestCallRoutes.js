// const express = require("express");
// const router = express.Router();
// const requestCallController = require("../controllers/requestCallController");

// router.post("/", requestCallController.createRequest);
// router.get("/", requestCallController.getAllRequests);
// router.delete("/:id", requestCallController.deleteRequest);

// module.exports = router;


const express = require("express");
const router = express.Router();
const requestCallController = require("../controllers/requestCallController");

const authMiddleware = require("../middlewares/auth");
const allowRoles = require("../middlewares/roleCheck");

// 🛠️ Admin only - Create callback request
router.post(
  "/",
  authMiddleware,
  allowRoles("admin"),
  requestCallController.createRequest
);

// 👁️ Admin & Viewer - View all callback requests
router.get(
  "/",
  authMiddleware,
  allowRoles("admin", "viewer"),
  requestCallController.getAllRequests
);

// ❌ Admin only - Delete callback request
router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  requestCallController.deleteRequest
);

module.exports = router;



