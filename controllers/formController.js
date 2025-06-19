const Form = require("../models/form");

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

    // store just “documents/filename.ext” so that clients can hit /uploads/…
  //  const profileFilePath = req.file ? `documents/${req.file.filename}` : null;


    const newForm = new Form({
      prefix, firstName, lastName, email, phoneNumber, website,
      address, addressLine2, city, state, zip, country,
      companyName, companyIntro, companyType, seatsAvailable,
      interestedProjects, preferredCity, preferredContact, profileFilePath
    });

    await newForm.save();
    res.status(200).json({ success: true, message: "Form submitted successfully", });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// all submissions
exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 }); 
    res.status(200).json({ success: true, data: forms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};