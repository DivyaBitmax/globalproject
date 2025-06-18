const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { PORT } = require("./config/config");
const formRoutes = require("./routes/formRoutes");
//const authRoutes = require("./routes/authRoutes")
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

app.use("/api", formRoutes);
// app.use("/api/admin",authRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
