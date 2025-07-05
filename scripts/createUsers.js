// scripts/createUsers.js
const mongoose = require("mongoose");
const User = require("../models/User");
const connectDB = require("../config/db");

(async () => {
  await connectDB();

  await User.deleteMany({});
  await User.create([
    {
      username: "Abhishek@123",
      password: "Abhishek@Bitmax2020",
      role: "admin",
    },
    {
      username: "Divya",
      password: "Divya@Viewer123",
      role: "viewer",
    },
  ]);

  console.log("Users created");
  process.exit();
})();
