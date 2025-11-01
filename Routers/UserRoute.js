
const express=require("express");
const userRouter=express.Router();

const {AllUserData,LoginUser}= require("../Controller/UserController");

userRouter.post("/signin",AllUserData);
userRouter.post("/login",LoginUser);
module.exports= userRouter;
