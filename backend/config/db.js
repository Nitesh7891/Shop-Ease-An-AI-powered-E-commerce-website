//Connect database with the server
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const mongo_url = process.env.MONGO_URI;
const db_name="onecart_db"

export const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${mongo_url}/${db_name}`)
        console.log("DB connected successfully:",connectionInstance.connection.host);
    } catch (error) {
        console.log("DB connection error:",error.message);
    }
}
