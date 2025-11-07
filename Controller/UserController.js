const userDetails=require("../Models/UserDetails");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
// const {v2 :cloudinary} = require("cloudinary");
const path=require("path");
const fs= require("fs");
const DocDetails=require("../Models/DoctorDetails");
const DoctorDetails = require("../Models/DoctorDetails");
const appointment_model=require("../Models/Appointment_Model");


const AllUserData= async(req,res)=>{
 try{
  const{fullname,email,password}=req.body;

  if(!fullname || !email || !password){
    return res.status(404).json({
        success:false,
        message:"please fill all the details"
    })
  }
  const saltrounds= await bcrypt.genSalt(10);
  const hashpassword= await bcrypt.hash(password,saltrounds);
  const newuser={
     fullname,
     email,
     password:hashpassword,
  }

  const submitUser= new userDetails(newuser);
  const userData= await submitUser.save();
  
  const token= jwt.sign({id:userData._id},process.env.JWT_SECRET);
  res.status(200).json({
    success:true,
    token,
    data:userData,
    message:"user data save in database",
  })
}
catch(error){
    console.log(error);
   res.status(400).json({
    success:false,
    message:"problem in user data save in database",
   })
}
};
const LoginUser=async(req,res)=>{
    try{
       const{email,password}=req.body;

       const IsNewUser= await userDetails.findOne({email});
       if(!IsNewUser){
        res.status(401).json({
            success:false,
            message:"email is not present in database",
        })
       }

       const check_password= await bcrypt.compare(password,IsNewUser.password);

       if(check_password){
        const token= jwt.sign({id:IsNewUser._id},process.env.JWT_SECRET);
        res.status(200).json({
            success:true,
            loginToken:token,
            message:"Login Token Is created"
        })
       }
       else{
        return res.status(402).json({
            success:false,
            message:"password  is incorrect",
        })
       }
    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"problem in UserLogin "
        })
    }
};
const getUserdata=async(req,res)=>{
     try{
      
        const IsNewUser=req.user.id;
        const user = await userDetails.findById(IsNewUser).select('-password');
        return res.status(200).json({
            success:true,
            user,
            message:"user Details is here"
        })
     }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"problem in get user data"
        })
     }
};
const UpdateProfile=async(req,res)=>{
    try{
        const IsNewUser= req.user.id;
        const {fullname,phone,address,Dob}=req.body;
        const newuser_image=req.files?.myimage;
        
        if(!fullname || !phone || !address || !Dob){
            return res.status(402).json({
                success:false,
                message:"complete all the details"
            })
        }

        const user_updated= await userDetails.findByIdAndUpdate(IsNewUser,{fullname,phone,address:JSON.parse(address),Dob})
        
        if(newuser_image){
            const userImage_upload=path.join(__dirname,'../user_Images')
                    if(!fs.existsSync(userImage_upload)){
                        fs.mkdirSync(userImage_upload,{recursive:true})
                    }
                   const users_file=Date.now()+"_"+ newuser_image.name;
                   const userPath=path.join(userImage_upload,users_file);
            
                   await newuser_image.mv(userPath);
                   user_updated.myimage=`/profile_image/${users_file}`;
                   await user_updated.save();
        }

          return  res.status(200).json({
                success:true,
                user_updated,
                message:" user information is updated",
            })
        }

    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"UpdateProfile Controller problem"
        })
    }
};
const user_appointment=async(req,res)=>{
   try{
     const{userId,docId,slotDate,slotTime}=req.body;

     const doctor_id= await DoctorDetails.findById(docId).select('-password');
     if(!doctor_id.available){
       return res.status(401).json({
            success:false,
            message:"doctor is not available",
        })
     }

     let slot_booked= DocDetails.slots_booked

     if(slot_booked[slotDate]){
        if(slot_booked[slotDate].includes(slot_booked[slotTime])){
            return res.status(402).json({
                success:false,
                message:"slot already booked"
            })
        }
        else{
            slot_booked[slotDate].push(slotTime);
        }
     }else{
        slot_booked[slotDate]=[]
        slot_booked[slotDate].push(slotTime)
     }
     
     const user_id= await userDetails.findById({userId}).select('-password');

     delete DocDetails.slot_booked;

     const appointment_data={
        userId,
        docId,
        slotDate,
        slotTime,
        userData:userDetails,
        docData:DocDetails,
        amount:DocDetails.fees,
        date:Date.now(),
     }

     const newappointment= new appointment_model(appointment_data);
     await appointment_data.save();

      res.status(200).json({
        success:true,
        data:newappointment,
        message:"all Appointment Details are here"
      })
    

   }catch(error){
    console.log(error);
    res.status(400).json({
        success:false,
        message:"Problem in user_appointment",
    })
   }
}
module.exports={AllUserData,LoginUser,getUserdata,UpdateProfile,user_appointment};