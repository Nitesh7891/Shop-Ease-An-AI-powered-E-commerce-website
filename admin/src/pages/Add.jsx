
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import upload from "../assets/upload_image.png";
import axios from "axios";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";

const Add = () => {
  const{serverUrl}=useContext(authDataContext)

  const [images,setImages] = useState({
    image1:false,
    image2:false,
    image3:false,
    image4:false
  });

  const [product,setProduct] = useState({
    name:"",
    description:"",
    price:"",
    category:"",
    subCategory:"",
    sizes:[],
    bestseller:false
  });

  const handleChange = (e)=>{
    const {name,value,type,checked} = e.target

    setProduct(prev=>({
      ...prev,
      [name]: type==="checkbox" ? checked : value
    }))
  }

  const handleSize = (size)=>{
    if(product.sizes.includes(size)){
      setProduct(prev=>({
        ...prev,
        sizes:prev.sizes.filter(item=>item!==size)
      }))
    }else{
      setProduct(prev=>({
        ...prev,
        sizes:[...prev.sizes,size]
      }))
    }
  }

  const handleImage = (e)=>{
    const {id,files} = e.target
    setImages(prev=>({
      ...prev,
      [id]:files[0]
    }))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try{

      const formData = new FormData()

      Object.entries(product).forEach(([key,value])=>{
        if(key==="sizes"){
          formData.append(key,JSON.stringify(value))
        }else{
          formData.append(key,value)
        }
      })

      Object.entries(images).forEach(([key,value])=>{
        if(value){
          formData.append(key,value)
        }
      })

      const res = await axios.post(
      serverUrl+"/api/product/add-product",
        formData
      )

     if(res.data?.success) alert(res.data?.message);


    }catch(err){
      if(err.response.data || !err.response.data.success)
        console.log(err.response)
      console.log(err)
    }
  }


  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden">

      <Navbar/>
      <Sidebar/>

      <div className="w-[82%] ml-[18%] px-[20px] md:px-[60px] py-[70px]">

        <form onSubmit={handleSubmit} className="flex flex-col gap-[30px]">

          <h1 className="text-[30px] md:text-[40px] font-semibold">
            Add New Product
          </h1>


          {/* IMAGE UPLOAD */}

          <div>

            <p className="text-[22px] font-semibold mb-[10px]">
              Upload Images
            </p>

            <div className="flex flex-wrap gap-4">

              {["image1","image2","image3","image4"].map(img=>(
                <label key={img} htmlFor={img}>

                  <img
                  src={!images[img] ? upload : URL.createObjectURL(images[img])}
                  alt=""
                  className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-lg border-[2px] hover:border-[#46d1f7]"
                  />

                  <input
                  type="file"
                  id={img}
                  hidden
                  onChange={handleImage}
                  />

                </label>
              ))}

            </div>

          </div>


          {/* PRODUCT NAME */}

          <div className="flex flex-col gap-[10px]">

            <p className="text-[22px] font-semibold">
              Product Name
            </p>

            <input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Type here"
            className="w-full max-w-[600px] h-[40px] rounded-lg border-[2px] bg-slate-600 px-[20px]"
            />

          </div>


          {/* DESCRIPTION */}

          <div className="flex flex-col gap-[10px]">

            <p className="text-[22px] font-semibold">
              Product Description
            </p>

            <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full max-w-[600px] h-[100px] rounded-lg border-[2px] bg-slate-600 px-[20px] py-[10px]"
            />

          </div>


          {/* CATEGORY */}

          <div className="flex flex-wrap gap-[30px]">

            <div className="flex flex-col gap-[10px]">

              <p className="text-[22px] font-semibold">Category</p>

              <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="bg-slate-600 px-[10px] py-[7px] rounded-lg border-[2px]"
              >

                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>

              </select>

            </div>


            <div className="flex flex-col gap-[10px]">

              <p className="text-[22px] font-semibold">Sub Category</p>

              <select
              name="subCategory"
              value={product.subCategory}
              onChange={handleChange}
              className="bg-slate-600 px-[10px] py-[7px] rounded-lg border-[2px]"
              >

                <option value="">Select Sub Category</option>
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>

              </select>

            </div>

          </div>


          {/* PRICE */}

          <div className="flex flex-col gap-[10px]">

            <p className="text-[22px] font-semibold">Product Price</p>

            <input
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            className="w-[200px] h-[40px] rounded-lg border-[2px] bg-slate-600 px-[20px]"
            />

          </div>


          {/* SIZES */}

          <div>

            <p className="text-[22px] font-semibold mb-[10px]">Sizes</p>

            <div className="flex gap-3 flex-wrap">

              {["S","M","L","XL","XXL"].map(size=>(
                <button
                key={size}
                type="button"
                onClick={()=>handleSize(size)}
                className={`px-4 py-2 rounded-lg border ${
                  product.sizes.includes(size)
                  ? "bg-green-500"
                  : "bg-slate-700"
                }`}
                >
                  {size}
                </button>
              ))}

            </div>

          </div>


          {/* BESTSELLER */}

          <div className="flex items-center gap-3">

            <input
            name="bestseller"
            type="checkbox"
            checked={product.bestseller}
            onChange={handleChange}
            />

            <p>Add to Bestseller</p>

          </div>


          <button
          type="submit"
          className="w-[200px] py-3 bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            Add Product
          </button>

        </form>

      </div>

    </div>
  );
};

export default Add;
