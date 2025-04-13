import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import { app, server } from './socket/socket.js';

// const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // for fetching data from req.body
app.use(cookieParser());



await connectDB();

// app.get('/', (req,res)=>{
//     res.send("hi");
// })

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);


server.listen(PORT,()=>{
    console.log(`server connected successfully ${PORT}`);
})