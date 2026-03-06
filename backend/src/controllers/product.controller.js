import Product from "../models/product.model.js";
import uploadOnCloudinary from "../../config/cloudinary.js";

/* =========================
   Add Product
========================= */

export const addProduct = async (req, res) => {
  try {
     console.log(req.files)
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const image1 = req.files?.image1
      ? await uploadOnCloudinary(req.files.image1[0].path)
      : null;

    const image2 = req.files?.image2
      ? await uploadOnCloudinary(req.files.image2[0].path)
      : null;

    const image3 = req.files?.image3
      ? await uploadOnCloudinary(req.files.image3[0].path)
      : null;

    const image4 = req.files?.image4
      ? await uploadOnCloudinary(req.files.image4[0].path)
      : null;


    const productData = new Product({
      name,
      description,
      price:Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller:bestseller==="true",
      date:Date.now(),
      image1,
      image2,
      image3,
      image4
    });

    const product= await Product.create(productData);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to add product"
    });
  }
};



/* =========================
   Get All Products
========================= */

export const getAllProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.json({
      success: true,
      products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products"
    });
  }
};



/* =========================
   Get Single Product
========================= */

export const getSingleProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product"
    });
  }
};



/* =========================
   Delete Product
========================= */

export const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product"
    });
  }
};