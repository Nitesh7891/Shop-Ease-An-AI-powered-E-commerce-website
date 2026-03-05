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

    // remove file from local storage after upload
    fs.unlinkSync(filePath);

    return response.secure_url;
  } catch (error) {
    console.log("Cloudinary upload error:", error.message);

    if (filePath) {
      fs.unlinkSync(filePath);
    }

    return null;
  }
};

export default uploadOnCloudinary;