import bcrypt from 'bcryptjs'
import userModel from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import transporter from '../config/nodemailer.js';
import dotenv from 'dotenv';
import {promisify} from 'util'

dotenv.config();







export const register=async(req,res)=>{
  
  const{name,email,password}=req.body;
  const JWT_SECRET=process.env.JWT_SECRET;


  if(!name || !email||!password){
    return res.json({sucess:false,message:'missing details'});


  }
  try{
         
       const existingUser=await userModel.findOne({email});

       if(existingUser)
        {

        return res.json({success:false,message:"user already existing"});

        }
        const hashedpassword=await bcrypt.hash(password,10);

       const user=new userModel({name,email,password:hashedpassword});
       await user.save();

const token=jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'7d'});

       res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production'? 'none':'strict',
        maxAge:7*24*60*60*1000,
       });
       // sending email
       
transporter.sendMail({
  from: process.env.SENDERS_EMAIL_ID,
  to: email,
  subject: 'sSign In Email',
  text: 'This is a tet message from Nodemailer + Brevo.'
}, (err, info) => {
  if (err) return console.error("❌ Error:", err.message);
  console.log("✅ Email sent:", info.response);
});

    return res.json({sucess:true});


  }catch(error){
   return res.json({sucess:false,message:error.message});
    
  }
}



export const login=async(req,res)=>{
  const{email,password}=req.body;
  if(!email || !password){
      return res.json({success:false,message:"user not existed"});
  }

  try{
    const user=   await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"invalid email"});
    }

    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.json({success:false,message:"invalid password"});
    }

    const token=jwt.sign({id:user._id},`${process.env.JWT_SECRET}`,{expiresIn:'7d'});

       res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production'? 'none':'strict',
        maxAge:7*24*60*60*1000
       });


       return res.json({success:true});


  }catch(error){
   return res.json({success:false,message:error.message});
  }
}



export const logout=async(req,res)=>{
  try{
      res.clearCookie('token',{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production'? 'none':'strict',
        
       });

       return res.json({sucess:true,message:"logout sucessfully"});

  }catch(error){
   return res.json({sucess:false,message:error.message});
  }
}




export const sendVerifyOtp=async(req,res)=>{
  try{
     const userId=req.user?.id ;

     const user=await userModel.findById(userId);

     if(user.isAccountVerified){
      return res.json({sucess:false,message:'your account is already verified'});
     }
    const otp=String( Math.floor(100000+Math.random()*90000));
    user.verifyOTP=otp;
    user.verifyOTPexpiry= Date.now()+24*60*60*1000;

    await user.save();
    console.log(user);


 const sendMail = promisify(transporter.sendMail).bind(transporter);

    await sendMail({
      from: process.env.SENDERS_EMAIL_ID,
      to: user.email,
      subject: 'Verify OTP',
      text: `Your verification OTP is: ${otp}`
    });

    return res.json({success:true,message:'verify otp correctly'});

  }catch(error){
   return res.json({sucess:false,message:error.message})
  }
}




export const verifyEmail=async(req,res)=>{
  const {otp}=req.body;
   const userId=req.user?.id;


  if(!userId || !otp ){
    return res.json({sucess:false,message:'missing details'});
  }

  try{
    const user =await userModel.findById(userId);
    if(!user){
       return res.json({sucess:false,message:'user not fount'});
    }

    if(user.verifyOTP===''||user.verifyOTP!==otp){
      return res.json({sucess:false,message:'invalid otp'});
    }

    if(user.verifyexpireOtp<Date.now()){
      return  res.json({sucess:false,message:'otp expired'});
    }

    user.isAccountVerified=true;
    user.verifyOTP='';
    user.verifyexpireOtp=0;

    await user.save()
    return res.json({sucess:true,message:'email verified sucessfully'});
  }catch(error){
    return res.json({sucess:false,message:error.message});
  }
}



export const isAutheticated=(req,res)=>{
     try{
       return res.json({success:true})
     }catch(error){
      return res.json({success:false,message:error.message})
     }
}



export const resetOtp=async(req,res)=>{
  const {email}=req.body;

  if(!email){
    return res.json({success:false,message:'email is required'});
  }

  try{
       const user= await userModel.findOne({email});

       if(!user){
        return res.json({success:false,message:'user not found'});
       }
       const otp=String( Math.floor(100000+Math.random()*90000));
    user.resetOtp=otp;
    user.resetotpExpiry= Date.now()+24*60*60*1000;

    await user.save();


 const sendMail = promisify(transporter.sendMail).bind(transporter);

    await sendMail({
      from: process.env.SENDERS_EMAIL_ID,
      to: user.email,
      subject: 'Verify OTP',
      text: `Your verification OTP is: ${otp}`
    });

    return res.json({success:true,message:'verify otp correctly'});

  }catch(error){
    return res.json({sucess:false,message:error.message})
  }
}

export const resetpassword=async(req,res)=>{
  const {email,otp,newpassword}=req.body;
  if(!email || !otp || !password){
    return res.json({success:false,message:'not valid'})
  }

  try{
     const user =await userModel.findOne(email);

     if(!user){
      return res.json({success:'false',message:'invalid user'});
     }


     if(user.resetOtp === '' || user.resetOtp !== otp){
      return res.json({success:'false',message:'invalid otp'});
     }

     if(user.resetotpExpiry< date.now()){
      return res.json({success:'false',message:'otp expired'});
     }

     const hashpassword= await bcrypt.hash(newpassword,10);


     user.password= hashpassword;
     user.resetOtp='';
     user.resetotpExpiry=0;


     await user.save();

     return res.json({success:true,message:'password has successfully reseted'});
  }catch(error){
    return res.json({successs:false,message:error.message})
  }
}
       