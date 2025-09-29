 const mongoose= require("mongoose");
 const AuthSignin= new mongoose.Schema({
    fullname:{
      type:String,
      required:true,
      maxlength:20,
    },    
    email:{
        type:String,
        required:true,
        maxlength:40,
    },
    password:{
        type:String,
        required:true,
        maxlength:30,
    }
 })
module.exports= mongoose.model("login",AuthSignin);