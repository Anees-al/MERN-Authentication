import jwt from 'jsonwebtoken';


const userAuth=(req,res,next)=>{
    const{token}=req.cookies;


    if(!token){
        return res.json({success:false,message:'token is not available'});
    }
    try{

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
    if (decoded.id) {
      // ✅ Safely attach the user ID
      req.user = { id: decoded.id };
     return next();
    }

        else{
            return res.json({success:false,message:'account not verivied login again'});
        }

        

    }catch(error){
       return res.json({sucess:false,message:error.message});
    }
}



export default userAuth;