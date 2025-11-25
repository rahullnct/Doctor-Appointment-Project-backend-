const appointment_model=require("../Models/Appointment_Model");
const DoctorDetails=require("../Models/DoctorDetails");
const user_model=require("../Models/UserDetails");
const admin_appointment_backend= async(req,res)=>{
  try{
   const appointment_data=await appointment_model.find({});
   res.status(200).json({
    success:true,
    appointment_data,
    message:"here is admin appointment details"
   }) 
  }catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"error in admin appointment backend"
    })
  }
};


const admin_appointment_cancellation=async(req,res)=>{
  try{
     const {appointment_id}=req.body;
     const appointment_Data=await appointment_model.findById(appointment_id);
     await appointment_model.findByIdAndUpdate(appointment_id,{cancelled:true})

     const{docId,slotDate,slotTime}=appointment_Data

     const DoctorData=await DoctorDetails.findById(docId);
     let slots_booked= DoctorData.slot_booked;
     slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!=slotTime)
     
     await DoctorDetails.findByIdAndUpdate(docId,{slots_booked});
     res.status(200).json({
      success:true,
      message:"admin appointment cancellation worked",
     })
  }catch(err){
    console.log(err);
    res.status(400).json({
      success:false,
      message:"admin appointment cancellation"
    })
  }
} 
const adminDashboard=async(req,res)=>{
  try{
    const doctors= await DoctorDetails.find({});
    const user= await user_model.find({});
    const appointment=await appointment_model.find({});

    const dashdata={
      doctors:doctors.length,
      users:user.length,
      appointments:appointment.length,
      latest_appointment:appointment.reverse().slice(0,6)
    }
    res.status(200).json({
      success:true,
      dashdata,
      message:"here is the dashboard datas"
    })

  }catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"problem to find the dashboard data in backend"
    })
  }
}

module.exports={admin_appointment_backend,admin_appointment_cancellation,adminDashboard};