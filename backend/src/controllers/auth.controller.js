import { generateAdminToken, generateToken } from "../../config/token.js";
import { User } from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import axios from "axios";

//for signup
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });

    const existedUser = await User.findOne({ email });
    if (existedUser)
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid email", success: false });
    if (password.length < 8)
      return res.status(400).json({
        message: "Password must be at least 8 characters",
        success: false,
      });

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    const token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", success: true, user });
  } catch (error) {
    console.log("Registration error:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};


//for login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });

    const existedUser = await User.findOne({ email });
    if (!existedUser)
      return res
        .status(400)
        .json({ message: "Invalid Credentials ", success: false });

    const isPasswordMatch = await bcrypt.compare(
      password,
      existedUser.password,
    );
    if (!isPasswordMatch)
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });

    let token = await generateToken(existedUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });
    return res
      .status(200)
      .json({ message: "Login successful", success: true, user: existedUser });
  } catch (error) {
    console.log("Login error:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const googlelogin=async(req,res)=>{
  try {
    const{code}=req.body;
    const googleRes=await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);

    const userRes=await axios.get('https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' + googleRes.tokens.access_token);

    const {email,name}=userRes.data;
    let user=await User.findOne({email});
    if(!user){
      user=await User.create({
        name,
        email,
    })
  }
  const token =await generateToken(user._id);
  res.cookie("token",token,{
    httpOnly:true,
    secure:false,
    sameSite:"lax",
    maxAge:7*24*60*60*1000,//7 days
  })

  return res.status(200).json({message:"Google login successful",success:true,user});
  } catch (error) {
    console.log("Google Login error:",error.message);
    return res.status(500).json({message:"Internal server error Google login error",success:false} );
  }
}


//for logout
export const logout=async(req,res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({message:"Logout successful",success:true});
    } catch (error) {
        console.log("Logout error:", error.message);
        return res.status(500).json({message:"Internal server error Logout error",success:false});
    }
}


export const adminLogin = async (req,res) => {
  try {

    const {email,password} = req.body;

    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
        return res.status(401).json({
            success:false,
            message:"Invalid credentials"
        });
    }

    const token =await generateAdminToken(email);

    res.cookie("admintoken", token, {
        httpOnly:true,
        secure:false,
        sameSite:"Strict",
        maxAge: 24 * 60 * 60 * 1000, //1 day
    });

    return res.json({
        success:true,
        message:"Admin login successful"
    });

  } catch(error){
    console.log(error);
    res.status(500).json({
        success:false,
        message:"Server error"
    });
  }
}


