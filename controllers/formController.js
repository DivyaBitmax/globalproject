const Form = require("../models/form");
const nodemailer = require("nodemailer");

exports.submitForm = async (req, res) => {
  try {
    console.log("Form body data:", req.body);
    console.log("Uploaded file:", req.file);

    const {
      prefix, firstName, lastName, email, phoneNumber, website,
      address, addressLine2, city, state, zip, country,
      companyName, companyIntro, companyType, seatsAvailable,
      interestedProjects, preferredCity, preferredContact
    } = req.body;

    const profileFilePath = req.file ? req.file.path : null;

    // STEP 1: Generate Form ID
    const formCount = await Form.countDocuments();
    const today = new Date();
    const datePart = today.toISOString().split("T")[0].replace(/-/g, "");
    const formId = `GLOB-${datePart}-${formCount + 1}`;

    // STEP 2: Save form
    const newForm = new Form({
      formId,
      prefix, firstName, lastName, email, phoneNumber, website,
      address, addressLine2, city, state, zip, country,
      companyName, companyIntro, companyType, seatsAvailable,
      interestedProjects, preferredCity, preferredContact,
      profileFilePath
    });

    await newForm.save();

    // STEP 3: Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,    
        pass: process.env.EMAIL_PASS     
      }
    });
    const mailOptions = {
      from: `GlobalProjects <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Form Submission Received - ID: ${formId}`,
      html: `
        <h2>Thank you for contacting GlobalProjects!</h2>
        <p>Your Form ID is: <strong>${formId}</strong></p>
        <p>We will review your submission and get back to you shortly.</p>
        <br/>
        <p>Regards,<br/>GlobalProjects Team</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Form submitted successfully", formId });
  } catch (error) {
    console.error("Submission error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//  Get all submitted forms
exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: forms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//  Get form by ID
exports.getFormById = async (req, res) => {
  try {
    const { formId } = req.params;
    const form = await Form.findOne({ formId });

    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    res.status(200).json({ success: true, data: form });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
