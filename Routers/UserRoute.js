
const express=require("express");
const userRouter=express.Router();
// const {v2 :cloudinary} = require("cloudinary");

const {AllUserData,LoginUser,getUserdata,UpdateProfile}= require("../Controller/UserController");
const userAuth=require("../Middleware/userAuth");
userRouter.post("/signin",AllUserData);
userRouter.post("/login",LoginUser);
userRouter.get('/profile',userAuth,getUserdata);
userRouter.post('/update-profile',userAuth,UpdateProfile);
module.exports= userRouter;
