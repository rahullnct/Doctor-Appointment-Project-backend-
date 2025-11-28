
const express=require("express");
const router=express.Router();
const AuthDoctor=require("../Middleware/AuthDoctor");

const {allDoctors,allDoctordata,checkAvailability,doctorList,DoctorLogins,DoctorAppointment,appointmentCancel,appointmentComplete,doctorDashboard,
    docProfile,updateDocProfile
}=require("../Controller/DoctorController");
router.post("/login",DoctorLogins);
router.get("/appointment",AuthDoctor,DoctorAppointment);
router.post("/appointment/cancel",AuthDoctor,appointmentCancel);
router.post("/appointment/Complete",AuthDoctor,appointmentComplete);
router.get("/dashboard",AuthDoctor,doctorDashboard);
router.get("/profile",AuthDoctor,docProfile);
router.post("/update/doctor-profile",AuthDoctor,updateDocProfile);
module.exports=router;