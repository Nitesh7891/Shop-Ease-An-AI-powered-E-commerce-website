import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const uploadOnCloudinary = async (filePath) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (!filePath) return null;

    const response = await cloudinary.uploader.upload(filePath, {
      folder: "ShopEase_products",
    });

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    return response.secure_url;
  } catch (error) {
     if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    console.log("Cloudinary upload error:", error.message);
    return null;
  }
};

export default uploadOnCloudinary;