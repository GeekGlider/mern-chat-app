import React, { useState } from 'react'
import { BsSend } from "react-icons/bs";
import userSendMessages from '../../hooks/userSendMessages';

function MessageInput() {
  const [mssgInp,setmssgInp] = useState("");
  const {loading,sendmessage} = userSendMessages();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (!mssgInp) {
      return;
    }
    await sendmessage(mssgInp);
    setmssgInp("");
  }


  return (
   <form className='px-4 my-3' onSubmit={handleSubmit}>
    <div className='w-full relative'>
        <input type="text" placeholder='Send a message' value={mssgInp} className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white' onChange={(e)=>setmssgInp(e.target.value)} />
        <button className='absolute inset-y-0 end-0 flex items-center pe-3'>
         {loading ? <span className='loading loading-spinner'></span> : <BsSend />}   
        </button>
    </div>
   </form>
  )
}

export default MessageInput