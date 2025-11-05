const jwt=require("jsonwebtoken");
require("dotenv").config();
const Authadmin= async(req,res,next)=>{
    try{
      const{atoken}=req?.headers;
       
      if(!atoken){
        return res.status(404).json({
            success:false,
            message:"token is missing"
        })
      }

      const verify_atoken = jwt.verify(atoken,process.env.JWT_SECRET);
     console.log("auth token:",verify_atoken);
      if(verify_atoken !== process.env.ADMIN_PASSWORD)
      {
         return res.status(405).json({
            success:false,
            message:"token not verified"
        })
      }
      req.admin= verify_atoken;
       next();
    }catch(error){
       res.status(400).json({
        success:false,
        message:"AuthAdmin is not correct"
       })
    }
};
module.exports=Authadmin;