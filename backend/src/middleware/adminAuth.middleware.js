import jwt from "jsonwebtoken";

export const verifyAdmin=async(req, res, next)=>{
try {
    let {admintoken}=req.cookies
    if(!admintoken || admintoken=="" ||admintoken==undefined) return res.status(401).json({message:"Unauthorized", success:false})
    let decoded=jwt.verify(admintoken,process.env.JWT_SECRET)
   if(!decoded) return res.status(403).json({message:"Invalid token", success:false})
    req.adminEmail=process.env.ADMIN_EMAIL;
    next();
} catch (error) {
    console.log("Admin authentication error in verifyAdmin middleware:", error.message);
    return res.status(500).json({message:"Internal Server Error", success:false})
}
}