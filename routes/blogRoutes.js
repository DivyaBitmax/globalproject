// const express = require("express");
// const router = express.Router();
// const blogController = require("../controllers/blogController");

// router.post("/", blogController.createBlog);         // POST /api/blogs
// router.get("/", blogController.getAllBlogs);         // GET /api/blogs
// router.get("/:id", blogController.getBlogById);      // GET /api/blogs/:id
// router.put("/:id", blogController.updateBlog);       // PUT /api/blogs/:id
// router.delete("/:id", blogController.deleteBlog);    // DELETE /api/blogs/:id

// module.exports = router;




// 🛡️ Role-based access middleware
const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");
const auth = require("../middlewares/auth");
const allowRoles = require("../middlewares/roleCheck");

// 📝 Create blog (Admin only)
router.post(
  "/",
  auth,
  allowRoles("admin"),
  blogController.createBlog
);

// 📄 Get all blogs (Admin & Viewer)
router.get(
  "/",
  auth,
  allowRoles("admin", "viewer"),
  blogController.getAllBlogs
);

// 📄 Get blog by ID (Admin & Viewer)
router.get(
  "/:id",
  auth,
  allowRoles("admin", "viewer"),
  blogController.getBlogById
);

// ✏️ Update blog (Admin only)
router.put(
  "/:id",
  auth,
  allowRoles("admin"),
  blogController.updateBlog
);

// ❌ Delete blog (Admin only)
router.delete(
  "/:id",
  auth,
  allowRoles("admin"),
  blogController.deleteBlog
);

module.exports = router;
