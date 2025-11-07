
const express=require("express");
const userRouter=express.Router();
// const {v2 :cloudinary} = require("cloudinary");
const {AllUserData,LoginUser,getUserdata,UpdateProfile,user_appointment}= require("../Controller/UserController");
const userAuth=require("../Middleware/userAuth");
userRouter.post("/signin",AllUserData);
userRouter.post("/login",LoginUser);
userRouter.get('/profile',userAuth,getUserdata);
userRouter.post('/update-profile',userAuth,UpdateProfile);
userRouter.post('/myappointment',userAuth, user_appointment);

module.exports= userRouter;
