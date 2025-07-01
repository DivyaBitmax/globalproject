// // utils/cloudinaryStorage.js
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../config/cloudinary');

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: 'global-projects',
//       resource_type: file.mimetype.startsWith('application') ? 'raw' : 'image',
//     };
//   },
// });

// module.exports = multer({ storage });


const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const path = require('path');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = path.extname(file.originalname).toLowerCase();

    let resourceType = 'image'; // default
    if (ext === '.pdf') {
      resourceType = 'raw'; // force raw for PDFs
    }

    return {
      folder: 'global-projects',
      resource_type: resourceType,
      public_id: `${Date.now()}-${file.originalname}`, // optional: unique file name
    };
  },
});

module.exports = multer({ storage });
