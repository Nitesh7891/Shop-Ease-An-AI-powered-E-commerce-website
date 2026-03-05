import { Router } from "express";
import { register,login, logout, googlelogin, adminLogin } from "../controllers/auth.controller.js";


export const authrouter=Router();

authrouter.post('/register',register)
authrouter.post('/login',login);
authrouter.get('/logout',logout);
authrouter.post('/google',googlelogin);
authrouter.post('/admin-login',adminLogin);