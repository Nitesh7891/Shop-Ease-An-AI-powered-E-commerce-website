import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import upload from "../assets/upload_image.png";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";

const Add = () => {

  const { serverUrl } = useContext(authDataContext);

  const [image1,setImage1] = useState(null);
  const [image2,setImage2] = useState(null);
  const [image3,setImage3] = useState(null);
  const [image4,setImage4] = useState(null);

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [category,setCategory] = useState("");
  const [subCategory,setSubCategory] = useState("");
  const [sizes,setSizes] = useState([]);
  const [bestseller,setBestseller] = useState(false);

  const [loading,setLoading] = useState(false);

  const handleSize = (size)=>{
    if(sizes.includes(size)){
      setSizes(sizes.filter(item => item !== size))
    }else{
      setSizes([...sizes,size])
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(loading) return;

    setLoading(true);

    try{

      const formData = new FormData();

      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("category",category);
      formData.append("subCategory",subCategory);
      formData.append("sizes",JSON.stringify(sizes));
      formData.append("bestseller",bestseller);

      formData.append("image1",image1);
      formData.append("image2",image2);
      formData.append("image3",image3);
      formData.append("image4",image4);

      const res = await axios.post(
        `${serverUrl}/api/product/add-product`,
        formData,
        { headers:{ "Content-Type":"multipart/form-data" } }
      );

      if(res.data?.success){
        alert("Product added successfully");

        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setSubCategory("");
        setSizes([]);
        setBestseller(false);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      }

    }catch(error){
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden">

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}

      <Navbar/>
      <Sidebar/>

      <div className="w-[82%] ml-[18%]">

        <form
        onSubmit={handleSubmit}
        className="mt-[70px] flex flex-col gap-[30px] py-[60px] px-[60px]"
        >

          <h1 className="text-[35px] font-semibold">
            Add New Product
          </h1>

          {/* IMAGE UPLOAD */}

          <div>

            <p className="text-[22px] mb-[10px]">
              Upload Images
            </p>

            <div className="flex gap-[15px]">

              {[image1,image2,image3,image4].map((img,index)=>{

                const setters=[setImage1,setImage2,setImage3,setImage4];
                const names=["image1","image2","image3","image4"];

                return(

                  <label
                  key={index}
                  htmlFor={names[index]}
                  className="cursor-pointer"
                  >

                    <img
                    src={!img ? upload : URL.createObjectURL(img)}
                    className="w-[90px] h-[90px] border rounded-lg"
                    />

                    <input
                    type="file"
                    id={names[index]}
                    name={names[index]}
                    hidden
                    onChange={(e)=>setters[index](e.target.files[0])}
                    />

                  </label>

                )

              })}

            </div>

          </div>

          {/* PRODUCT NAME */}

          <div>
            <p className="text-[20px] mb-[5px]">Product Name</p>

            <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            type="text"
            className="w-[500px] p-[8px] bg-slate-700 rounded"
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <p className="text-[20px] mb-[5px]">Product Description</p>

            <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-[500px] p-[8px] bg-slate-700 rounded"
            />
          </div>

          {/* CATEGORY */}

          <div className="flex gap-[40px]">

            <div>
              <p className="text-[20px] mb-[5px]">Category</p>

              <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              className="bg-slate-700 p-[8px] rounded"
              >
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <p className="text-[20px] mb-[5px]">Sub Category</p>

              <select
              value={subCategory}
              onChange={(e)=>setSubCategory(e.target.value)}
              className="bg-slate-700 p-[8px] rounded"
              >
                <option value="">Select Sub Category</option>
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>

          </div>

          {/* PRICE */}

          <div>
            <p className="text-[20px] mb-[5px]">Price</p>

            <input
            type="number"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            className="w-[200px] p-[8px] bg-slate-700 rounded"
            />
          </div>

          {/* SIZES */}

          <div>
            <p className="text-[20px] mb-[10px]">Sizes</p>

            <div className="flex gap-[10px]">

              {["S","M","L","XL","XXL"].map(size=>(
                <button
                type="button"
                key={size}
                onClick={()=>handleSize(size)}
                className={`px-[15px] py-[5px] border rounded ${
                  sizes.includes(size) ? "bg-green-500" : ""
                }`}
                >
                  {size}
                </button>
              ))}

            </div>
          </div>

          {/* BESTSELLER */}

          <div className="flex gap-[10px] items-center">

            <input
            type="checkbox"
            checked={bestseller}
            onChange={()=>setBestseller(!bestseller)}
            />

            <p>Add to Bestseller</p>

          </div>

          <button
          disabled={loading}
          className={`w-[200px] p-[10px] rounded ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
          }`}
          type="submit"
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Add;

