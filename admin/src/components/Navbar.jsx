import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/Logo.png"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'

const Navbar = () => {
    let navigate=useNavigate();
    const {serverUrl}=useContext(authDataContext);
    let   {getAdmin}=useContext(adminDataContext);

    const logout=async()=>{
        try {
            const result=await axios.get(serverUrl+"/api/auth/logout",{withCredentials:true})
            if(result.data?.success){
                console.log(result.data?.message || "Logout successful");
                await getAdmin();
                navigate('/');
            }
        } catch (error) {
            console.log("Logout error:",error.response?.data || error.message);
             alert("Logout failed: "+(error.response?.data?.message || error.message));
        }
    };

    
  return (
    <div className='w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black '>
      <div 
      onClick={()=>navigate('/')}
      className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer'>
          <img src={logo} alt="" className='w-[30px] rounded-xl' />
          <h1 className='text-[25px] text-[black] font-sans'>ShopEase</h1>
      </div>
          <button 
          onClick={logout}
          className='text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white '>LogOut</button>
    </div>
  )
}

export default Navbar
