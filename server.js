const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { PORT } = require("./config/config");
const formRoutes = require("./routes/formRoutes");
const projectRoutes = require("./routes/projectRoutes");
const otpRoutes = require("./routes/otpRoutes")
const path = require("path");
const blogRoutes = require("./routes/blogRoutes"); // Add this


const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();


const trackVisitor = require('./middlewares/trackVisitor');
app.use(trackVisitor); // Register before your routes

app.use("/api", formRoutes);    //  All form APIs start with /api/forms
app.use("/api/projects", projectRoutes); //  All project APIs start with /api/projects
app.use("/api/otp", otpRoutes);   // Register OTP routes in server.js
app.use("/api/blogs", blogRoutes);            // Blog APIs
const analyticsRoutes = require('./routes/analyticsRoutes');
app.use('/api/analytics', analyticsRoutes);
// requtesCall
app.use("/api/request-call", require("./routes/requestCallRoutes"));
//adminlogin + viewr




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

