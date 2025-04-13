import React from 'react'
import Conversation from './Conversation'
import userGetConversations from '../../hooks/userGetConversations'
import { getRandomEmoji } from '../../utils/emoji';

function Conversations() {
  const {loading,conversations} = userGetConversations();
  console.log(conversations);
  return (
    <div className='py-2 flex flex-col overflow-auto'>
        {conversations.map((conversation,idx)=>(
          <Conversation 
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          last_idx={ idx === conversations.length-1 }
          />
        ))}
    </div>
  )
}

export default Conversations