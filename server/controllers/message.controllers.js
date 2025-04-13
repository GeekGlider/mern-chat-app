import Conversation from '../models/Conversation.Model.js';
import Message from '../models/Message.Model.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

export const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants : { $all : [senderId,receiverId] },
        })

        if ( !conversation ) {
            conversation = await Conversation.create({
                participants : [senderId,receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        // await conversation.save(); // 1
        // await newMessage.save(); // 2

        await Promise.all([conversation.save(),newMessage.save()]);

        // send message to the receiver
        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage);
        
    } catch (error) {
         res.status(500).json({error:"Server error"});
    }
   
}

export const getMessages = async(req,res)=>{
    try {
        const senderId = req.user._id;
        const {id : receiverId} = req.params;
        
        const conversation = await Conversation.findOne({
            participants : { $all : [senderId,receiverId] },
        }).populate("messages"); 
    
        if ( !conversation ) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        return res.status(200).json(messages);

    } catch (error) {
        res.status(500).json({error:"Server error"});
    }
   
}