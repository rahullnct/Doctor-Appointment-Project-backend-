const express= require('express');
const Dbconnect = require('./Config/Database');
const cors=require("cors");
const app=express();
require('dotenv').config();

const PORT=process.env.PORT;
app.use(express.json());
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})
app.use(cors({
  origin:"http://localhost:5173",
  methods:["POST", "GET"],
  credentials:true
}))
const router=require('./Routers/Routes');
const { get } = require('mongoose');
app.use('/api/v1/',router);

app.get("/",(req,res)=>{
  res.send('<h1>My homepage</h1>')
})

Dbconnect();