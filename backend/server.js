import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { authrouter } from "./src/routes/auth.route.js";
import cors from "cors";
import { userRouter } from "./src/routes/user.route.js";
import { productRouter } from "./src/routes/product.route.js";

const app=express()
dotenv.config({
    path:".env"
});

const port=process.env.PORT||5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
origin:["http://localhost:5173","http://localhost:5174"],
credentials:true,
}))


//routes
app.use('/api/auth',authrouter)
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

connectDB()
.then(()=>{
    app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
    })
})
.catch((error)=>{
    console.log("Failed to connect to DB:",error.message);
})