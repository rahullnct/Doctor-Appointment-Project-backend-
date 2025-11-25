
const express=require("express");
const router=express.Router();


const {allDoctors,allDoctordata,checkAvailability,doctorList,DoctorLogins}=require("../Controller/DoctorController");
router.post("/login",DoctorLogins);
module.exports=router;