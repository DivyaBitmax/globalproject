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
  // email: { type: String, unique: true },
  username: { type: String, unique: true, required: true }, // ✅ Changed to username
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  resetToken: String,
  resetTokenExpire: Date,
});

const User = mongoose.model("User", userSchema);

// Sample Users
const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user1", password: "user123", role: "user" },
  { username: "user2", password: "user123", role: "user" },
];

// Insert Users
const seedUsers = async () => {
  try {
    await User.deleteMany(); // Optional: clear previous users

    // for (const u of users) {
    //   const hashedPassword = await bcrypt.hash(u.password, 10);
    //   await User.create({ email: u.email, password: hashedPassword, role: u.role });
    // }

     for (const u of users) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      await User.create({
        username: u.username,
        password: hashedPassword,
        role: u.role,
      });
    }
    console.log("🎉 Users seeded successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    mongoose.disconnect();
  }
};

seedUsers();
