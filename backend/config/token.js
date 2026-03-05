import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET;

export const generateToken=async(userId)=>{
    try {
       let token=await jwt.sign({id:userId},JWT_SECRET,{expiresIn:'7d'})
       return token;
    } catch (error) {
        console.log("token error", error);
    }
}

export const generateAdminToken=async(email)=>{
    try {
       let token=await jwt.sign({email},JWT_SECRET,{expiresIn:'7d'})
       return token;
    } catch (error) {
        console.log("token error", error);
    }
}