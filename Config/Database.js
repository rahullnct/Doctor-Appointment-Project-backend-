const mongoose= require('mongoose');
require("dotenv").config();
const Port=process.env.PORT;

const Dbconnect=()=>{
    mongoose.connect(process.env.MONGO_DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=> 
    console.log("DB is connected successfully"))
    .catch((error)=>{
      console.error(error);
      console.log("Db is not connected");
    })
}
module.exports=Dbconnect;
