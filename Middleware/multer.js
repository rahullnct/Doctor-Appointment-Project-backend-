// Middleware/multer.js
const multer = require("multer");

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create multer instance
const upload = multer({ storage });

// ✅ Export only the multer instance
module.exports = upload;
