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
const allowRoles = require("../middlewares/roleCheck");
const auth = require("../middlewares/auth");
// --- BLOG ROUTES ---
const blogController = require("../controllers/blogController");
router.use(auth);

router.post("/blogs", allowRoles("admin"), blogController.createBlog);
router.get("/blogs", allowRoles("admin", "viewer"), blogController.getAllBlogs);
router.get("/blogs/:id", allowRoles("admin", "viewer"), blogController.getBlogById);
router.put("/blogs/:id", allowRoles("admin"), blogController.updateBlog);
router.delete("/blogs/:id", allowRoles("admin"), blogController.deleteBlog);