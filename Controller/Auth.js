
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.Auth= (req,res,next)=>{
     
    try{
        // console.log(req.cookies?.rahul_token);
        const token= req.cookies?.rahul_token;
        
        if(!token){
           return res.status(404).json({
                success:false,
                message:"token not found"
            })
        }
        console.log(req.user);
      try{
        const docoid= jwt.verify(token,process.env.JWT_SECRET);
        req.user=docoid;

       
      }catch(err){
        res.status(405).json({
            success:false,
            message:console.error(err),
        })
      }
       next();

    }catch(err){
        
        res.status(400).json({
            success:false,
            message:"Auth problem",
        })
    }
}
exports.IsAdmin=(req,res,next)=>{
     try{
        
         const {email,password}=req.body;
         if(email === process.env.ADMIN_LOGIN && password === process.env.ADMIN_PASSWORD){  
              const generateToken= jwt.sign(password,process.env.JWT_SECRET,
                {
                    expiresIn:"1d"
                }
              );
              res.status(200).json({
                success:true,
                generateToken,
                message:"Welcome to admin Portal"
              })
         }
         else{
            res.status(405).json({
                success:false,
                message:"you are not admin"
            })
         }

     }catch(err){
    
         res.status(400).json({
            success:false,
            message:console.log(err)
        })
     }
}