const userDetails=require("../Models/UserDetails");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
// const {v2 :cloudinary} = require("cloudinary");
const path=require("path");
const fs= require("fs");
const AllUserData= async(req,res)=>{
 try{
  const{fullname,email,password}=req.body;

  if(!fullname || !email || !password){
    return res.status(404).json({
        success:false,
        message:"please fill all the details"
    })
  }
  const saltrounds= await bcrypt.genSalt(10);
  const hashpassword= await bcrypt.hash(password,saltrounds);
  const newuser={
     fullname,
     email,
     password:hashpassword,
  }

  const submitUser= new userDetails(newuser);
  const userData= await submitUser.save();
  
  const token= jwt.sign({id:userData._id},process.env.JWT_SECRET);
  res.status(200).json({
    success:true,
    token,
    data:userData,
    message:"user data save in database",
  })
}
catch(error){
    console.log(error);
   res.status(400).json({
    success:false,
    message:"problem in user data save in database",
   })
}
};
const LoginUser=async(req,res)=>{
    try{
       const{email,password}=req.body;

       const IsNewUser= await userDetails.findOne({email});
       if(!IsNewUser){
        res.status(401).json({
            success:false,
            message:"email is not present in database",
        })
       }

       const check_password= await bcrypt.compare(password,IsNewUser.password);

       if(check_password){
        const token= jwt.sign({id:IsNewUser._id},process.env.JWT_SECRET);
        res.status(200).json({
            success:true,
            loginToken:token,
            message:"Login Token Is created"
        })
       }
       else{
        return res.status(402).json({
            success:false,
            message:"password  is incorrect",
        })
       }
    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"problem in UserLogin "
        })
    }
};
const getUserdata=async(req,res)=>{
     try{
      
        const IsNewUser=req.user.id;
        const user = await userDetails.findById(IsNewUser).select('-password');
        return res.status(200).json({
            success:true,
            user,
            message:"user Details is here"
        })
     }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"problem in get user data"
        })
     }
};
const UpdateProfile=async(req,res)=>{
    try{
        const IsNewUser= req.user.id;
        const {fullname,phone,address,Dob,gender}=req.body;
        const newuser_image=req.files.myimage;
        
        if(!fullname || !phone || !address || !Dob || !gender){
            return res.status(402).json({
                success:false,
                message:"complete all the details"
            })
        }

        const user_updated= await userDetails.findByIdAndUpdate(IsNewUser,{fullname,phone,address:JSON.parse(address),Dob,gender})
        
        if(newuser_image){
            const userImage_upload=path.join(__dirname,'../user_Images')
                    if(!fs.existsSync(userImage_upload)){
                        fs.mkdirSync(userImage_upload,{recursive:true})
                    }
                   const users_file=Date.now()+"_"+ newuser_image.name;
                   const userPath=path.join(userImage_upload,users_file);
            
                   await newuser_image.mv(userPath);
        }

          return  res.status(200).json({
                success:true,
                user_updated,
                message:" user information is updated",
            })
        }

    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"UpdateProfile Controller problem"
        })
    }
};
module.exports={AllUserData,LoginUser,getUserdata,UpdateProfile};