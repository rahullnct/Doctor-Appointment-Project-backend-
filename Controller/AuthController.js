const path = require("path");
const fs = require("fs");
const Signin = require("../Models/AuthSignin");

const SigninController = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const imageFile = req.files?.myimage;

    if (!imageFile) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Ensure upload directory exists
    const uploadDir = path.join(__dirname, "../profile_images");
    if (!fs.existsSync(uploadDir)) { 
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Create unique file path
    const fileName = Date.now() + "_" + imageFile.name;
    const filePath = path.join(uploadDir, fileName);

    // Move file
    await imageFile.mv(filePath);

    console.log("File uploaded successfully:", filePath);

    // Save user data + file path in MongoDB
    const signindata = await Signin.create({
      fullname,
      email,
      password,
      myimage: `/profile_images/${fileName}` // store relative path
    });

    res.status(200).json({
      success: true,
      data: signindata,
      message: "Signin data successfully stored"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Signin data not stored",
      error: error.message
    });
  }
};

module.exports = SigninController;

