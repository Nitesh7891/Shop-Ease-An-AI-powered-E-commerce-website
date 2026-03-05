import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { adminDataContext } from "../context/AdminContext";


const Login = () => {

  let [showPassword, setShowPassword] = useState(false);
  let[error,setError]=useState("")
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let { serverUrl } = useContext(authDataContext);
  let { getAdmin } = useContext(adminDataContext);
  
  const navigate = useNavigate();
  
  const AdminLogin = async (e) => {
  e.preventDefault();

  try {

    const response = await axios.post(
      serverUrl + "/api/auth/admin-login",
      { email, password },
      { withCredentials: true }
    );

    if (response.data?.success) {
      alert("Login Successful");
      await getAdmin();
      navigate("/");
    }
  } catch (error) {
    console.log("Login error:", error);
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
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px]">
          Welcome to ShopEase, Apply to Admin Login{" "}
        </span>
      </div>

      <div className="max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          onSubmit={AdminLogin}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
        >
        
          <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative">
            <input
              type="text"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent  placeholder:[#ffffffc7] px-[20px] font-semibold "
              placeholder="Email"
              required
            />
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent  placeholder:[#ffffffc7] px-[20px] font-semibold "
              placeholder="Password"
              required
            />
            {showPassword ? (
              <IoEyeOutline
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <IoEyeOffOutline
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]"
                onClick={() => setShowPassword(true)}
              />
            )}
            <button 
            type="submit"
            className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold hover:bg-[#5050d4]">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
