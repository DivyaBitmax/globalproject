const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// Define same User schema used in your app
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  resetToken: String,
  resetTokenExpire: Date,
});

const User = mongoose.model("User", userSchema);

// Sample Users
const users = [
  { email: "admin@example.com", password: "admin123", role: "admin" },
  { email: "user1@example.com", password: "user123", role: "user" },
  { email: "user2@example.com", password: "user123", role: "user" },
];

// Insert Users
const seedUsers = async () => {
  try {
    await User.deleteMany(); // Optional: clear previous users

    for (const u of users) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      await User.create({ email: u.email, password: hashedPassword, role: u.role });
    }

    console.log("🎉 Users seeded successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    mongoose.disconnect();
  }
};

seedUsers();
