const express= require("express");
const router=express.Router();


const SigninController=require("../Controller/AuthController");
router.post("/signin",SigninController); 
module.exports=router;