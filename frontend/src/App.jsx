import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'
import {GoogleOAuthProvider} from "@react-oauth/google"
import Navbar from './components/Navbar'

function App() {
  

  return (
    <>
    <Navbar/>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Routes>
         <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<Registration/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </GoogleOAuthProvider>
    </>
  )
}

export default App
