import React, { useState } from "react";
import Logo from "../assets/logo.png";
import Google from "../assets/google.png";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authDataContext } from "../context/authContext.jsx";
import { userDataContext } from "../context/userContext.jsx";
import getCurrentUser from "../context/userContext.jsx";
import axios from "axios";

const Registration = () => {
  let [showPassword, setShowPassword] = useState(false);
  let [name,setName]=useState("")
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let[error,setError]=useState("")
  
  let { serverUrl } = useContext(authDataContext);
  let{getCurrentUser}=useContext(userDataContext)
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
       const response =await axios.post(serverUrl+"/api/auth/register",{name,email,password},{withCredentials:true})
       if(response.data?.success) getCurrentUser();
       navigate('/')
       console.log("Registration response:",response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      console.log("Registration error:", error.response?.data);
       
    }
  };


  return (
    
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      {error && (
    <div className="w-[100%] bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-center text-sm">
      {error}
    </div>
  )}
      <div
        onClick={() => navigate("/")}
        className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
      >
        <img className="w-[45px] rounded rounded-full" src={Logo} alt="" />
        <h1 className="text-[22px] font-sans">ShopEase</h1>
      </div>

      <div className="w-[100%] h-[100px] flex items-center justify-center flex flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Registration Page</span>
        <span className="text-[16px]">
          Welcome to ShopEase, Place your order{" "}
        </span>
      </div>

      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          action=""
          onSubmit={handleSignUp}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
        >
          <div className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer">
            <img className=" rounded-full w-[23px] " src={Google} alt="" />{" "}
            Signup with Google
          </div>

          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>Or
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative">
            <input
              type="text"
              onChange={(event)=>setName(event.target.value)}
              value={name}
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent  placeholder:[#ffffffc7] px-[20px] font-semibold "
              placeholder="User name"
              required
            />
            <input
              type="text"
              onChange={(event)=>setEmail(event.target.value)}
              value={email}
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent  placeholder:[#ffffffc7] px-[20px] font-semibold "
              placeholder="Email"
              required
            />
            <input
              type={showPassword ? "text" : "password"}
              onChange={(event)=>setPassword(event.target.value)}
              value={password}
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent  placeholder:[#ffffffc7] px-[20px] font-semibold "
              placeholder="Password"
              required
            />
            {showPassword ? (
              <IoEyeOutline
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%]"
                onClick={() => setShowPassword(prev=>!prev)}
              />
            ) : (
              <IoEyeOffOutline
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%]"
                onClick={() => setShowPassword(prev=>!prev)}
              />
            )}
            <button className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold hover:bg-[#5050d4]">
              Create Account
            </button>
            <p className="flex gap-[7px]">
              Already have an account?
              <span
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate("/login")}
              >
                {" "}
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
