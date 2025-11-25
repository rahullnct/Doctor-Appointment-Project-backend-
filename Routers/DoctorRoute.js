
const express=require("express");
const router=express.Router();
const AuthDoctor=require("../Middleware/AuthDoctor");

const {allDoctors,allDoctordata,checkAvailability,doctorList,DoctorLogins,DoctorAppointment}=require("../Controller/DoctorController");
router.post("/login",DoctorLogins);
router.get("/appointment",AuthDoctor,DoctorAppointment);
module.exports=router;