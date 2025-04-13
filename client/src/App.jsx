import React from 'react'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { useAuthContext } from './context/AuthContext'

function App() {
  const {auth} = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={ auth ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={ auth ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={ auth ? <Navigate to="/" /> : <SignUp/> } />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App