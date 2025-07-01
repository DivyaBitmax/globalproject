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
  params: (req, file) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isPDF = ext === '.pdf';

    return {
      folder: 'global-projects',
      public_id: `${Date.now()}-${file.originalname}`,
      // resource_type: isPDF ? 'raw' : 'image', // ✅ Correct place
      resource_type: isPDF ? 'raw' : 'image'

    };
  }
});

module.exports = multer({ storage });
