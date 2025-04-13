import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import userSignup from '../../hooks/userSignup';


function SignUp() {
  // fullname,username,password,confirmpassword,gender
  const [inputs,setinputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: ""
  });
  
  const {loading,signup} = userSignup();

  const HandleCheckBoxChange = (gender)=>{
    setinputs({...inputs, gender: gender})
  }

  const HandleSubmit = async(e)=>{
    e.preventDefault();
    // console.log(inputs);
    await signup(inputs);
  } 

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          SignUp 
          <span className='text-blue-500'> Chat-App</span>
        </h1>

        <form onSubmit={HandleSubmit} >
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input type="text" placeholder='Enter FullName' value={inputs.fullname} className='w-full input input-bordered h-10' onChange={(e)=>{setinputs({...inputs, fullname: e.target.value})}}/>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>User Name</span>
            </label>
            <input type="text" placeholder='Enter Username' value={inputs.username} className='w-full input input-bordered h-10' onChange={(e)=>{setinputs({...inputs, username: e.target.value})}} />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type='password' placeholder='Enter Password' value={inputs.password} className='w-full input input-bordered h-10' onChange={(e)=>{setinputs({...inputs, password: e.target.value})}} />
          </div>
          <div>
            <label className='label p-2'>
              <span className=''>Confirm Password</span>
            </label>
            <input type="password" placeholder='Confirm Password' value={inputs.confirmpassword} className='w-full input input-bordered h-10' onChange={(e)=>{setinputs({...inputs, confirmpassword: e.target.value})}}/>
          </div>

          {/* Gender Checkbox */}
          <GenderCheckbox onCheckboxChange={HandleCheckBoxChange} selectedGender={inputs.gender}  />

          <Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>Already have an account?</Link>
          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
             {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
              </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default SignUp