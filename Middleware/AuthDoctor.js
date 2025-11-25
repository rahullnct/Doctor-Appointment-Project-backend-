const jwt=require("jsonwebtoken");
require("dotenv").config();
const AuthDoctor= async(req,res,next)=>{
    try{
      const {dtoken}=req?.headers;
       
      if(!dtoken){
        return res.status(404).json({
            success:false,
            message:"token is missing"
        })
      }
      const verify_dtoken = jwt.verify(dtoken,process.env.JWT_SECRET);
      req.doctor= { docId: verify_dtoken.id}
     next();
  
     
    }catch(error){
      console.log(error);
       res.status(400).json({
        success:false,
        message:"userDoctor is not correct"
       })
    }
};
module.exports=AuthDoctor;