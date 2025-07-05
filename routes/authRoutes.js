// // routes/authRoutes.js
// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (!user || !(await user.comparePassword(password)))
//     return res.status(401).json({ success: false, message: "Invalid credentials" });

//   const token = jwt.sign({ userId: user._id, role: user.role }, "secret123", { expiresIn: "1d" });
//   res.json({ success: true, token, role: user.role });
// });

// module.exports = router;
