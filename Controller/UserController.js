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
// const user_appointment=async(req,res)=>{
//    try{
//      const{userId,docId,slotDate,slotTime}=req.body;

//      const doctor_id= await DoctorDetails.findById(docId).select('-password');
//      if(!doctor_id.available){
//        return res.status(401).json({
//             success:false,
//             message:"doctor is not available",
//         })
//      }

//     let slot_booked = doctor_id.slot_booked;
   
//     //  let slot_booked= doctor_id.slot_booked;
//      console.log("slot booked date:",slot_booked[slotDate]);
    
//     console.log("slotDate from frontend:", slotDate);
// console.log("All keys in slot_booked:", Object.keys(slot_booked));



//      if(slot_booked[slotDate]){
//         if(slot_booked[slotDate].includes(slotTime)){
//             console.log("this slot is already booked");
//             return res.status(402).json({
//                 success:false,
//                 message:"slot already booked"
//             })
//         }
//         else{
//             slot_booked[slotDate].push(slotTime);
//         }
//      }else{
//         // slot_booked[slotDate]=[]
//         slot_booked[slotDate].push(slotTime)
//      }
//      console.log("slot booked:",slot_booked);

     
//      const userdata= await userDetails.findById(userId).select('-password');

//      delete DocDetails.slot_booked;

//      const appointment_data={
//         userId,
//         docId,
//         slotDate,
//         slotTime,
//         userdata,
//         doctor_id,
//         amount:doctor_id.fees,
//         date:Date.now(),
//      }

//      const newappointment= new appointment_model(appointment_data);
//      await newappointment.save();

//      await DoctorDetails.findByIdAndUpdate(docId,{slot_booked});

//       res.status(200).json({
//         success:true,
//         data:newappointment,
//         message:"all Appointment Details are here"
//       })
    

//    }catch(error){
//     console.log(error);
//     res.status(400).json({
//         success:false,
//         message:"Problem in user_appointment",
//     })
//    }
// }
const user_appointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const doctor = await DoctorDetails.findById(docId).select('-password');
    if (!doctor.available) {
      return res.status(401).json({
        success: false,
        message: "Doctor is not available",
      });
    }

    let slot_booked = doctor.slot_booked || {};

    console.log("slotDate from frontend:", slotDate);
    console.log("All keys in slot_booked:", Object.keys(slot_booked));

    if (slot_booked[slotDate]) {
      if (slot_booked[slotDate].includes(slotTime)) {
        console.log("this slot is already booked");
        return res.status(402).json({
          success: false,
          message: "Slot already booked",
        });
      } else {
        slot_booked[slotDate].push(slotTime);
      }
    } else {
      // ✅ Initialize the date array properly
      slot_booked[slotDate] = [slotTime];
    }

    console.log("slot booked:", slot_booked);

    // ✅ Save updated slots to doctor
    await DoctorDetails.findByIdAndUpdate(
      docId,
      { slot_booked },
      { new: true }
    );

    const user = await userDetails.findById(userId).select('-password');

    const appointment_data = {
      userId,
      docId,
      slotDate,
      slotTime,
      userData: user,
      docData: doctor,
      amount: doctor.fees,
      date: Date.now(),
    };

    const newAppointment = new appointment_model(appointment_data);
    await newAppointment.save();

    res.status(200).json({
      success: true,
      data: newAppointment,
      message: "Appointment booked successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Problem in user_appointment",
    });
  }
};
const myappintment=async(req,res)=>{
     try{
          const {userid}=req.user.id;
          const appointment= await appointment_model.find({userid});
          res.status(200).json({
            success:true,
            data:appointment,
            message:"appointment details are here"
          })
     }catch(error){
      res.status(400).json({
        success:false,
        message:"myappointment backend is not working"
      })     }

};

module.exports={AllUserData,LoginUser,getUserdata,UpdateProfile,user_appointment,myappintment};