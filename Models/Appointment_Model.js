const mongoose=require("mongoose");

const appointment_model= new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    docId:{
        type:String,
        required:true,
    },
    slotDate:{
        type:String,
        // default:'dd_mm_yyyy',
        required:true,
    },
    slotTime:{
        type:String,
        required:true,
    },
    userData:{
        type:Object,
        required:true,
    },
    docData:{
        type:Object,
        required:true,
    },
    amount:{
        type:Number,
        default:10,
        // required:true,
    },
    date:{
        type:Number,
        default:Date.now(),
        required:true,
    },
    cancelled:{
        type:Boolean,
        default:false,
    },
    payment:{
        type:Boolean,
        default:false,
    },
    IsCompleted:{
        type:Boolean,
        default:false,
    }
})
module.exports= mongoose.model("Appointment",appointment_model);