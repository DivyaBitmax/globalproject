const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { PORT } = require("./config/config");
const formRoutes = require("./routes/formRoutes");

// In server.js or app.js (add after other routes)
const projectRoutes = require("./routes/projectRoutes");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();


app.use("/api", formRoutes);    //  All form APIs start with /api/forms
app.use("/api/projects", projectRoutes); //  All project APIs start with /api/projects
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
