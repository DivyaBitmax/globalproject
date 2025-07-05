// middlewares/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "secret123");
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
