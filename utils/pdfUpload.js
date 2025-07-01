const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'global-projects',
    resource_type: 'raw',
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

module.exports = multer({ storage: pdfStorage });
