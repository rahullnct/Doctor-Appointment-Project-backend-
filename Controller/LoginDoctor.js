const jwt= require("jsonwebtoken");
require("dotenv").config();
const LoginAdmin=(req,res)=>{

  try{
    const{email,password}=req.body;
    
    if(email === process.env.ADMIN_LOGIN && password === process.env.ADMIN_PASSWORD){

       const admin_token= jwt.sign(password,process.env.JWT_SECRET)
       res.status(200).json({
        success:true,
         admin_token,
        message:"admin token created"
       })
    }else{
      res.status(401).json({
        success:false,
        message:"email and password not correct"
      })
    }

  }catch(err){
    res.status(400).json({
      success:false,
      message:"LoginAdmin is not working"
    })
  }
}
module.exports=LoginAdmin;