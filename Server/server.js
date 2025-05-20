
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDb from './config/database.js';
import authRouter from './Routes/authRoutes.js';
import userRouter from './Routes/userRouter.js';

dotenv.config();




const app = express();
console.log(process.env.PORT)
const port=process.env.PORT || 4005;
const DATABASE_URL=process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/auth';

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}));
console.log("📬 SMTP_USER:", process.env.SMTP_USER);
console.log("🔐 SMTP_PASS:", process.env.SMTP_PASS ? "✅ Present" : "❌ MISSING");



connectDb(DATABASE_URL)

app.get('/', (req, res) => {
  res.send('API is running');
});
app.use('/api/auth/',authRouter);
app.use('/api/user/',userRouter);





app.listen(port,()=>(console.log(`server is rinning in the port ${port}`)))


