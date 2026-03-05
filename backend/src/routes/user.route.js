import { Router } from "express";
import { getCurrentUser,getAdmin } from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/adminAuth.middleware.js";

export const userRouter=Router();

userRouter.get('/getuser',verifyUser,getCurrentUser);
userRouter.get('/getadmin',verifyAdmin,getAdmin)
