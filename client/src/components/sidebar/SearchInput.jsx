import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import userConversation from '../../Zustand/useConversation';
import userGetConversations from '../../hooks/userGetConversations';
import { toast } from 'react-toastify';

function SearchInput() {
  const [searchInput,setSearchInput] = useState("");
  const {setSelectedConversation} = userConversation();
  const {conversations} = userGetConversations();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!searchInput) {
      return;
    }
    if (searchInput.length < 3 ) {
      toast.error("invalid input");
    }
   const conversation = conversations.find((c)=> c.fullname.toLowerCase().includes(searchInput.toLowerCase()));
   if (conversation) {
    setSelectedConversation(conversation);
    setSearchInput("");
   } else {
    toast.error("user not found");
   }
   
  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input type="text" placeholder='Search..' value={searchInput} className='input input-bordered rounded-full' onChange={(e)=>setSearchInput(e.target.value)}/>
        <button className='btn btn-circle bg-sky-500 text-white'>
            <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
    </form>
  )
}

export default SearchInput