
const DoctorDetails=require("../Models/DoctorDetails");
const appointment_model=require("../Models/Appointment_Model");

const fs=require("fs");
const path=require("path");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const allDoctordata= async(req,res)=>{
    try{
        const{fullname,gender,Dob,available,adress,email,phone,password,speciality,experience,degree,fees,about}=req.body;

        const doctorimg=req.files?.myimage;
        if(!doctorimg){
            res.status(400).json({
                success:false,
                message:"doctor image is not valid",
            })
        }
        const doctorimg_upload=path.join(__dirname,'../doctor_profileimg')
        if(!fs.existsSync(doctorimg_upload)){
            fs.mkdirSync(doctorimg_upload,{recursive:true})
        }
       const doctor_file=Date.now()+"_"+ doctorimg.name;
       const doctorPath=path.join(doctorimg_upload,doctor_file);

       await doctorimg.mv(doctorPath);
     
       let hashpassword;
              try{
                  hashpassword= await bcrypt.hash(password,10);
              }
              catch(error){
                  res.status(402).json({
                      success:false,
                      message:" password not hashed"
                  })
              }

       const doctor_info= await DoctorDetails.create({fullname,gender,Dob,available,adress,email,phone,password:hashpassword,speciality,experience,degree,fees,about,myimage:`/doctor_profileimg/${doctor_file}`});

       res.status(200).json({
        success:true,
        data:doctor_info,
        message:"doctor details successfully stored",
       })
    }catch(err){
        console.log(err);
        res.status(401).json({
            success:false,
            message:"doctor data is not stored",            
        })
    }
};
const allDoctors= async(req,res)=>{
   try{
     const doctors= await DoctorDetails.find({}).select('-password');
     res.status(200).json({
        success:true,
        data:doctors,
        message:"all doctors here"
     })
   }catch(error){
    console.log(error);
     res.status(404).json({
       success:false,
       message:"doctors data is not found",
     })
   }
};
const checkAvailability=async(req,res)=>{
    try{
       const{docId}=req.body;
       
       const docData= await DoctorDetails.findById(docId);
       await DoctorDetails.findByIdAndUpdate(docId,{available:!docData.available},
        // {new:true}
       );

       res.status(200).json({
        success:true,
        data:docData,
        message:"availablity is working fine"
       })
       
    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"availablity is not working"
        })
    }
};
const doctorList=async(req,res)=>{
    try{
        const doctorlist =await DoctorDetails.find({}).select(['-password','-email']);
        res.status(200).json({
            success:true,
            doctorlist,
            message:"doctor list in frontend is working fine"
        })


    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"doctor list in frontend is not working"
        })
    }
}
const DoctorLogins=async(req,res)=>{
    try{
        const{email,password}=req.body;

        const doctor= await DoctorDetails.findOne({email});
        if(!doctor){
            res.status(404).json({
                success:false,
                message:"doctor not found"
            })
        }
        
        const Ismatch= await bcrypt.compare(password,doctor.password);
        if(Ismatch){

            const token=jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.status(200).json({
                success:true,
                token,
                message:"doctor's token is created successfully"
            })
        }
        else{
          res.status(400).json({
            success:false,
            message:"password is not matched"
          })
        }


    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Doctor is not logged In", 
        })
    }
}

const DoctorAppointment=async(req,res)=>{
    try{
        const{docId}=req.doctor;
        // console.log(docId);
        const appointment= await appointment_model.find({docId});
        res.status(200).json({
            success:true,
            appointment,
            message:"Doctor appointment is here"
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"doctorappointment has some fault"
        })
    }
}
const appointmentComplete=async(req,res)=>{
    try{
     const{docId}=req.doctor;
     const{appointmentId}=req.body;
     
     const appointment_Data=await appointment_model.findById(appointmentId);
     if(appointment_Data && appointment_Data.docId === docId){
        await appointment_Data.findByIdAndUpdate(appointmentId,{isCompleted:true});
        return res.status(200).json({
            success:true,
            message:"appointment Submitted"
        })
     }
     else{
        return res.status(401).json({
            success:false,
            message:"marked failed"
        })
     }
    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"appointment complete failed"
        }) 
    }
}
const appointmentCancel=async(req,res)=>{
    try{
     const{docId}=req.doctor;
     const{appointmentId}=req.body;
     
     const appointment_Data=await appointment_model.findById(appointmentId);
     if(appointment_Data && appointment_Data.docId === docId){
        await appointment_Data.findByIdAndUpdate(appointmentId,{cancelled:true});
        return res.status(200).json({
            success:true,
            message:"appointement Canceled"
        })
     }
     else{
        return res.status(401).json({
            success:false,
            message:"marked failed"
        })
     }
    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"appointment cancel failed"
        }) 
    }
}

module.exports={allDoctordata,allDoctors,checkAvailability,doctorList,DoctorLogins,DoctorAppointment,appointmentComplete,appointmentCancel};

