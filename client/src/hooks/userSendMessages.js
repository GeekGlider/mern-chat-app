import React, { useState } from 'react'
import { toast } from 'react-toastify';
import userConversation from '../Zustand/useConversation';

const userSendMessages = () => {
    const [loading,setloading] = useState(false);
    const {messages,setMessages,selectedConversation} = userConversation();

    const sendmessage = async(message) => {
        setloading(true);
        try {
            
            const res = await fetch( `/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({message})
            } );

            const data = await res.json(); // new message

            if ( data.error ) {
                throw new Error(data.error);
            }
            setMessages([...messages,data]);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setloading(false);
        }
        
    }
    return {loading,sendmessage};
}

export default userSendMessages