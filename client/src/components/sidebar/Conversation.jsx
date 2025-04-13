import React from 'react'
import userConversation from '../../Zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';

function Conversation({conversation,emoji,last_idx}) {
  const {selectedConversation,setSelectedConversation} = userConversation();

  const selected = selectedConversation?._id === conversation._id;
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id)

  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
     ${selected ? "bg-sky-500" : ""}
    `} 
    onClick={()=>setSelectedConversation(conversation)}
    >
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
            <div className='w-12 rounded-full'>
                <img src={conversation.profilePic} alt="user avatar" />
            </div>
        </div>

        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{conversation.fullname}</p>
            <span className='text-xl'>{emoji}</span>
            </div>      
        </div>

    </div>
    {!last_idx && <div className='divider my-0 py-0 h-1'/>}
    
    </>
  )
}

export default Conversation