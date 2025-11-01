const mongoose=require("mongoose");
const DoctorDetails= mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        maxlength:30,
    },
    gender:{
        type:String,
        default:"male",
        required:true,
        maxlength:6,
    },
    available:{
       type:Boolean,
       default:false,
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
    myimage:{
        type:String,
        default:"rahul.jpg",
        required:true
    },
    password:{type:String,required:true},
    speciality:{type:String,required:true,maxlength:20},
    experience:{type:String,required:true},
    degree:{type:String,required:true},
    fees:{type:Number,required:true},
    about:{type:String, required:true},
})
module.exports= mongoose.model("doctor",DoctorDetails);