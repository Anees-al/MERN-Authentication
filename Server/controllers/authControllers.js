import bcrypt from 'bcryptjs'
import userModel from '../Models/userModel.js';
import jwt from 'jsonwebtoken';








export const register=async(req,res)=>{
  
  const{name,email,password}=req.body;
  const JWT_SECRET=process.env.JWT_SECRET||'mySuperSecretKey123';


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
        return res.json({sucess:true});


  }catch(error){
    res.json({sucess:false,message:error.message});
    
  }
}



export const login=async(req,res)=>{
  const{email,password}=req.body;
  if(!email || !password){
      return res.json({sucess:false,message:"user not existed"});
  }

  try{
    const user=   await userModel.findOne({email});
    if(!user){
      return res.json({sucess:false,message:"invalid email"});
    }

    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.json({sucess:false,message:"invalid password"});
    }

    const token=jwt.sign({id:user._id},`${process.env.JWT_SECRET}`,{expiresIn:'7d'});

       res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production'? 'none':'strict',
        maxAge:7*24*60*60*1000
       });


       return res.json({sucess:true});


  }catch(error){
    res.json({sucess:false,message:error.message});
  }
}



export const logout=async(req,res)=>{
  try{
      res.clearCookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production'? 'none':'strict',
        
       });

       return res.json({sucess:true,message:"logout sucessfully"});

  }catch(error){
    res.json({sucess:false,message:error.message});
  }
}




       