import  express from 'express';
import userAuth from '../Middleware/authmiddleware.js';
import { getUserdata } from '../controllers/userControllers.js';

const userRouter=express.Router();


userRouter.get('/data',userAuth,getUserdata);



export default userRouter;