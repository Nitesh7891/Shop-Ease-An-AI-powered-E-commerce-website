import { User } from "../models/user.model.js"


export const getCurrentUser=async(req,res)=>{
    try {
        let user=await User.findById(req.userId).select('-password');
        if(!user) return res.status(404).json({message:"User not found",success:false});
        return res.status(200).json({message:"User fetched successfully",success:true,user});
    } catch (error) {
        console.log("error in getCurrentUser:",error.message);
        return res.status(500).json({message:"Internal server error",success:false});
    }
}

export const getAdmin=async(req,res)=>{
    try {
        let adminEmail=req.adminEmail;
        if(!adminEmail) return res.status(404).json({message:"Admin not found",success:false});
        return res.status(200).json({message:"Admin fetched successfully",success:true,admin:{email:adminEmail,role:"admin"}});
    } catch (error) {
        console.log("error in getAdmin:",error.message);
        return res.status(500).json({message:"Internal server error",success:false});
    }
}