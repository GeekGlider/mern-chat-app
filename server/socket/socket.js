import {Server} from 'socket.io';
import http from 'http'
import express from 'express'

// initialize express application
const app = express();

// create http server on which Socket.io can be superimposed 
const server = http.createServer(app);

// create Socket.io server over http server allowing origin url to access routes and data which use get or post method
const io = new Server( server, {
    cors:{
        origin : ["http://localhost:3000"],
        methods : ["POST","GET"],
    }
});

 export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // userid : socketid

// listens for web socket connections
io.on('connection', (socket)=>{

    // logs socket id of client when connected to client
    console.log("a new user connected",socket.id);

    const userId = socket.handshake.query.userId;

    if (userId != "undefined") userSocketMap[userId] = socket.id

        // Broadcast updated online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    

    // log socket id when user disconnects 
    socket.on('disconnect', ()=>{
        console.log("a user disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export {app,io,server};

