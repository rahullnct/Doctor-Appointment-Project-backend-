
const Signin = require('../Models/AuthSignin');
 
const SigninController= async(req,res)=>{
    try{
    const{fullname,email,password}=req.body;
    const signindata= await Signin.create({fullname,email,password});
    res.status(200).json({
        success:true,
        data:signindata,
        message:"sigin data is successfully stored",
    });
}catch(error){
  console.error(error);
  console.log("signin data is not stored");
}}
module.exports=SigninController;