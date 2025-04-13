import React, { useEffect, useState } from 'react'
import userConversation from '../Zustand/useConversation';
import { toast } from 'react-toastify';

const userGetMessages = () => {
  const [loading,setloading] = useState(false);
  const {messages,setMessages,selectedConversation} = userConversation();

  useEffect(()=>{
    const getmessages = async()=>{
        setloading(true);
        try {
            const res = await fetch(`/api/messages/${selectedConversation._id}`);
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setMessages(data);
        } catch (error) {
             toast.error(error.message);
        } finally {
            setloading(false);
        }
      }
     if (selectedConversation?._id) getmessages();
  },[selectedConversation?._id,setMessages])

 
  return {loading,messages};
}

export default userGetMessages