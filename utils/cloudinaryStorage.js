// utils/cloudinaryStorage.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'global-projects',
      resource_type: file.mimetype.startsWith('application') ? 'raw' : 'image',
    };
  },
});

module.exports = multer({ storage });
