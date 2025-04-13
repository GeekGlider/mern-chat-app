import React, { useEffect, useRef } from 'react'
import Message from './Message'
import userGetMessages from '../../hooks/userGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import userListenMessages from '../../hooks/userListenMessages'

const Messages = () => {
  const {loading,messages} = userGetMessages();
  userListenMessages();
  const lastRefMessage = useRef(null);

  useEffect(()=>{
    setTimeout(() => {
			lastRefMessage.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
  },[messages])
  return (
    <div className='px-4 flex-1 overflow-auto'>

      { !loading && messages.length > 0 && 
      messages.map((message)=>(
        <div key={message._id} ref={lastRefMessage}>
           <Message 
        msg={message}
        />
        </div>
       
      ))
      }

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      { !loading && messages.length === 0 && 
      (<p className='text-center'>Send a Message to start Conversation</p>)
      }
    </div>
  )
}

export default Messages