const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const email = "global@example.com";
    const plainPassword = "global123";

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    console.log("Admin created successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.error(" Error creating admin:", error);
  }
};

createAdmin();
