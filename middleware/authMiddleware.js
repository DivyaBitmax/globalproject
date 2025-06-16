const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied. No token." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};
