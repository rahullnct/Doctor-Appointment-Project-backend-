
const {v2 :cloudinary} = require("cloudinary");
require("dotenv").config();
const cloudinaryConnect= ()=>{
    try{
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            secret_key:process.env.SECRET_KEY
        }); 
        console.log("cloudinary is connected");
    }catch(err){
        console.error(err);
        console.log("cloudinary not connected");
    }
};
module.exports = cloudinaryConnect;