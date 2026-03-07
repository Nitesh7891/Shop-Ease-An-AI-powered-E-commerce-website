
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, name, image, price }) => {

  return (
    <Link
      to={`/product/${id}`}
      className="bg-[#1f2937] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1"
    >

      {/* Product Image */}
      <div className="w-full h-[220px] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2">

        <h3 className="text-white text-[16px] font-semibold line-clamp-1">
          {name}
        </h3>

        <p className="text-blue-400 font-bold text-[18px]">
          ₹{price}
        </p>

      </div>

    </Link>
  );
};

export default ProductCard;
