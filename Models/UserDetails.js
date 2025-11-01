const mongoose=require("mongoose");
const userDetails= mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        maxlength:30,
    },
    gender:{
        type:String,
        // required:true,
        maxlength:10,
    },
    Dob:{
        type:String,
        default:"mm/dd/yyyy",
    },
    address:{
        type:Object,
        default:{line1:'',line2:''},
    },
    email:{
        type:String,
        required:true,
        maxlength:30,
    },
    phone:{
        type:String,
        default:"0000000000"
    },
    // myimage:{
    //     type:String,
    //     required:true
    // },
    password:{type:String,required:true}
})
module.exports= mongoose.model("User",userDetails);