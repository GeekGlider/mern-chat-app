import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/AuthContext';

const userSignup = () => {
    const {auth,setauth} = useAuthContext();
 const [loading,setloading] = useState(false);
 
 const signup = async({fullname,username,password,confirmpassword,gender})=>{
    const success = HandleInputErrors({fullname,username,password,confirmpassword,gender});

    if ( !success ) {
        return; 
    }

    setloading(true);
    try {
        const res = await fetch( `/api/auth/signup`, {
            method : "POST",
            headers : { "Content-Type": "application/json" },
            body : JSON.stringify({fullname,username,password,confirmpassword,gender})
        })
    
        const data = await res.json();
        console.log(data);
        localStorage.setItem( 'chat-app', JSON.stringify(data) );
        setauth(data);

    } catch (error) {
        toast.error(error.message);
    } finally {
        setloading(false);
    }
    
    

 }
 return {loading,signup};
}

export default userSignup

const HandleInputErrors = async({fullname,username,password,confirmpassword,gender})=>{
    if ( !fullname || !username || !password || !confirmpassword || !gender ) {
        toast.error('Please fill in all the fields');
        return false;
    }

    if ( confirmpassword !== password ) {
        toast.error('Password donot match');
        return false;
    }

    if ( password.length < 6 ) {
        toast.error('Password must contain atleast 6 characters');
        return false;
    }

    return true;
}