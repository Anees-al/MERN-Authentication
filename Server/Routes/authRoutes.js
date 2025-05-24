import express from 'express';
import { isAutheticated, login, logout, register, resetOtp, resetpassword, sendVerifyOtp, verifyEmail } from '../controllers/authControllers.js';
import userAuth from '../Middleware/authmiddleware.js';


const authRouter=express.Router();


authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp);
authRouter.post('/verify-account',userAuth,verifyEmail);
authRouter.get('/is-auth',userAuth,isAutheticated);
authRouter.post('/reset-otp',resetOtp);
authRouter.post('/reset-password',resetpassword);


export default authRouter;