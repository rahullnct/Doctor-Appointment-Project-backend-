const express= require("express");
const router=express.Router();
// const SigninController=require("../Controller/AuthController");
// const upload=require("../Middleware/multer");
// const userController=require("../Controller/UserController");
 const {allDoctors,allDoctordata,checkAvailability,doctorList}=require("../Controller/DoctorController");
 const {admin_appointment_backend,admin_appointment_cancellation,adminDashboard}=require("../Controller/AdminController");
// // const loginDoctor=require("../Routers/LoginDoctor");
// // const LoginDoctor = require("../Controller/LoginDoctor");
// const {Auth,IsAdmin}=require("../Controller/Auth");
 const AuthAdmin=require("../Middleware/AuthAdmin");
// // router.post("/signin",SigninController); 
// // router.post("/user_info",userController);
const AuthLogin= require("../Controller/LoginDoctor");
// const allDoctors = require("../Controller/DoctorController");

router.post('/admin/login',AuthLogin);
 router.post("/doctor_info",AuthAdmin,allDoctordata);
 router.post("/all-doctors",AuthAdmin,allDoctors)
 router.post("/availability",AuthAdmin,checkAvailability);
 router.get('/doctor/list',doctorList);
 router.get('/admin/appointments',AuthAdmin,admin_appointment_backend);
 router.post('admin/appointment_cancel',AuthAdmin,admin_appointment_cancellation);
 router.get('/admin/dashboard',AuthAdmin,adminDashboard)

// // router.post("/login_doc",LoginDoctor);
// const AuthLogin= require("../Controller/LoginDoctor");

// router.get('/test',Auth,(req,res)=>{
//     res.status(200).json({
//         success:true,
//         message:"this is test section"
//     })
// })
// router.post('/admin',Auth,IsAdmin)
// router.post('/auth_login',AuthLogin)
// module.exports=router;


module.exports=router;