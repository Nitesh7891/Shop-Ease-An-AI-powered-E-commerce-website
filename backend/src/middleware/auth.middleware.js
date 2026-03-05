import jwt from 'jsonwebtoken'

export const verifyUser=async(req,res,next)=>{
    try {
        const {token}=req.cookies;
        
        if(!token||token===""||token===undefined){
            return res.status(401).json({message:"Unauthorized token access",success:false});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({message:"Unauthorized access",success:false});
        if(!decoded.id) return res.status(401).json({message:"Unauthorized access",success:false});
        req.userId=decoded.id;
        
        next();
    } catch (error) {
        console.log("Authentication error in verifyUser:",error.message);
        return res.status(500).json({message:"Internal server error",success:false});
    }
}