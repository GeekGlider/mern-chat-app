import React from 'react'
import userConversation from '../../Zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
import { extractTime } from '../../utils/extractTime';

const Message = ({msg}) => {
  const {auth} = useAuthContext();
  const {selectedConversation} = userConversation();
  const time = extractTime(msg.createdAt)

  const fromme = msg.senderId === auth._id;

  const ClassName = fromme ? "chat-end" : "chat-start"
  const ProficPic = fromme ? auth.profilePic : selectedConversation?.profilePic
  const bubblebgcolour = fromme ? "bg-blue-500" : ""
 const shakeClass = msg.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${ClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={ProficPic} alt="Tailwind CSS chat bubble component" />
            </div>
        </div>
        
        <div className={`chat-bubble text-black ${bubblebgcolour} ${shakeClass} pb-2`}>
          {msg.message}

        </div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{time}</div>
    </div>
  )
}

export default Message