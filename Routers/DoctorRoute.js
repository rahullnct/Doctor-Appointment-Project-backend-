
const express=require("express");
const router=express.Router();
const AuthDoctor=require("../Middleware/AuthDoctor");

const {allDoctors,allDoctordata,checkAvailability,doctorList,DoctorLogins,DoctorAppointment,appointmentCancel,appointmentComplete}=require("../Controller/DoctorController");
router.post("/login",DoctorLogins);
router.get("/appointment",AuthDoctor,DoctorAppointment);
router.post("/appointment/cancel",AuthDoctor,appointmentCancel);
router.post("/appointment/Complete",AuthDoctor,appointmentComplete);
module.exports=router;