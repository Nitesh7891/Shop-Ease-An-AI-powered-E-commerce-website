import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {

    if (!filePath) return null;

    // Convert to absolute path (fixes Windows issues)
    const absolutePath = path.resolve(filePath);

    const response = await cloudinary.uploader.upload(absolutePath, {
      folder: "ShopEase_products",
      resource_type: "image"
    });

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    return response.secure_url;

  } catch (error) {

    console.log("Cloudinary upload error:", error);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return null;
  }
};

export default uploadOnCloudinary;