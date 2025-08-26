// controllers/centerAuthController.js
const User = require("../models/centerUser");  // New model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==================== Signup ====================
exports.signup = async (req, res) => {
  try {
    const { userId, name,email, password, phone } = req.body;

    // ✅ check duplicate userId or email
    const existing = await User.findOne({ $or: [{ userId }, { email }] });
    if (existing) {
      return res.status(400).json({ msg: "User with this ID or email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      userId,
       name,   // ✅ add name here
      email,
      password: hashed,
      phone,
      status: "active",   // default
    });

    await user.save();
    res.status(201).json({ msg: "User created successfully", user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ==================== Login ====================
exports.login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // ✅ block inactive users
    if (user.status === "inactive") {
      return res.status(403).json({ msg: "Account is inactive. Contact admin." });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, userId: user.userId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        userId: user.userId,
          name: user.name,   // ✅ add name
        email: user.email,
        phone: user.phone,
        status: user.status
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
