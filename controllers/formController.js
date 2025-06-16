const Form = require("../models/form");

exports.submitForm = async (req, res) => {
  try {
    const {
      prefix, firstName, lastName, email, phoneNumber, website,
      address, addressLine2, city, state, zip, country,
      companyName, companyIntro, companyType, seatsAvailable,
      interestedProjects, preferredCity, preferredContact
    } = req.body;

    const profileFilePath = req.file ? req.file.path : null;

    const newForm = new Form({
      prefix, firstName, lastName, email, phoneNumber, website,
      address, addressLine2, city, state, zip, country,
      companyName, companyIntro, companyType, seatsAvailable,
      interestedProjects, preferredCity, preferredContact, profileFilePath
    });

    await newForm.save();
    res.status(200).json({ success: true, message: "Form submitted successfully" });
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