const jwt=require("jsonwebtoken");
require("dotenv").config();
const userAuth= async(req,res,next)=>{
    try{
      const {token}=req?.headers;
       
      if(!token){
        return res.status(404).json({
            success:false,
            message:"token is missing"
        })
      }
      const verify_atoken = jwt.verify(token,process.env.JWT_SECRET);
      req.user= { id: verify_atoken.id}
     next();
  
     
    }catch(error){
      console.log(error);
       res.status(400).json({
        success:false,
        message:"userAuth is not correct"
       })
    }
};
module.exports=userAuth;