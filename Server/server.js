import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import cookieParser from 'cookie-parser';
import connectDb from './config/database.js';

const app = express();
const port=process.env.PORT || 4005;
const DATABASE_URL=process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/auth';

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}))

connectDb(DATABASE_URL)

app.get('/', (req, res) => {
  res.send('API is running');
});


app.listen(port,()=>(console.log(`server is rinning in the port ${port}`)))


