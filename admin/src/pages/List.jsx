
import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { FaTrash } from "react-icons/fa";

const List = () => {

  const { serverUrl } = useContext(authDataContext);

  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(false);

  const fetchProducts = async ()=>{
    try{
      setLoading(true);

      const res = await axios.get(
        `${serverUrl}/api/product/list-products`,
        { withCredentials:true }
      );

      if(res.data.success){
        setProducts(res.data.products);
      }

    }catch(error){
      console.log(error);
    }

    setLoading(false);
  };


  const deleteProduct = async (id)=>{

    const confirmDelete = window.confirm("Delete this product?");
    if(!confirmDelete) return;

    try{

      const res = await axios.delete(
        `${serverUrl}/api/product/delete-product/${id}`,
        { withCredentials:true }
      );

      if(res.data.success){
        fetchProducts();
      }

    }catch(error){
      console.log(error);
    }

  };


  useEffect(()=>{
    fetchProducts();
  },[]);


  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">

      <Navbar/>
      <Sidebar/>

      <div className="w-[82%] ml-[18%] mt-[70px] p-[40px]">

        <h1 className="text-[35px] font-semibold mb-[30px]">
          Product List
        </h1>

        {loading ? (
          <p>Loading products...</p>
        ) : (

          <div className="flex flex-col gap-[20px]">

            {products.map((item)=>(

              <div
              key={item._id}
              className="flex items-center justify-between bg-slate-800 p-[20px] rounded-xl shadow-lg hover:bg-slate-700 transition"
              >

                {/* LEFT SIDE */}

                <div className="flex items-center gap-[20px]">

                  <img
                  src={item.image1}
                  alt={item.name}
                  className="w-[120px] h-[120px] object-cover rounded-lg"
                  />

                  <div className="flex flex-col gap-[6px]">

                    <h2 className="text-[20px] font-semibold">
                      {item.name}
                    </h2>

                    <p className="text-gray-400 text-[14px]">
                      {item.category} / {item.subCategory}
                    </p>

                    <p className="text-blue-400 font-semibold">
                      ₹{item.price}
                    </p>

                    {item.bestseller && (
                      <span className="bg-green-500 text-white text-[12px] px-[8px] py-[3px] rounded w-fit">
                        Bestseller
                      </span>
                    )}

                  </div>

                </div>


                {/* DELETE ICON */}

                <FaTrash
                onClick={()=>deleteProduct(item._id)}
                className="cursor-pointer text-red-500 text-[22px] hover:text-red-600"
                />

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default List;

