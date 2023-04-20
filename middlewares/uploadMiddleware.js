const path = require('path');
const multer = require('multer');

const multerDestination = path.join(__dirname,'../', 'tmp');

const multerConfig = multer.diskStorage({
  destination: multerDestination,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadMiddleware = multer({ storage: multerConfig });

module.exports = uploadMiddleware;
