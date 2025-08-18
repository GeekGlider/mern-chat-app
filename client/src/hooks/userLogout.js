import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/AuthContext';

const userLogout = () => {
    const {auth,setauth} = useAuthContext();
    const [loading,setloading] = useState(false);

    const logout = async()=>{
        setloading(true);

    try {

        const res = await fetch(`/api/auth/logout`, {
            method : "POST",
            headers : {"Content-Type": "application/json"},
        });
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        localStorage.removeItem("chat-user");
        setauth(null);

    } catch (error) {
        toast.error(error.message);
    } finally {
        setloading(false);
    }

    }
    
  return {loading,logout};
}

export default userLogout