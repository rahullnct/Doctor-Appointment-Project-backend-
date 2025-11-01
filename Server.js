const express= require('express');
const Dbconnect = require('./Config/Database');
const cors=require("cors");
const cloudinary=require("./Config/Cloudinary");
const cookie_parser=require("cookie-parser");
const fileupload=require("express-fileupload");
const path =require("path");
const app=express();
require('dotenv').config();
const PORT=process.env.PORT;
app.use(cors());
app.use(cors({
  origin:["http://localhost:5174","http://localhost:5173"],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie_parser());


app.use(fileupload({
  useTempFiles:true,
  tempFileDir:"/tmp/",
}))
app.use('/doctor_profileimg', express.static(path.join(__dirname, 'doctor_profileimg')));

app.post("/api/admin/login",(req,res)=>{
  res.json({
    success:true,
    token:"sample_token"
  });
});



app.listen(PORT,"0.0.0.0",()=>{
    console.log(`server started at ${PORT}`);
})

const router=require('./Routers/Routes');
const userRouter=require('./Routers/UserRoute');

app.use('/api/v1/',router);
app.use('/api/v1/user',userRouter);


app.get("/",(req,res)=>{
  res.send('<h1>My homepage</h1>')
})

Dbconnect();
cloudinary();