import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import { app, server } from './socket/socket.js';
import path from 'path';

// const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // static files

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

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get( "*", (req,res)=>{
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})


server.listen(PORT,()=>{
    console.log(`server connected successfully ${PORT}`);
})