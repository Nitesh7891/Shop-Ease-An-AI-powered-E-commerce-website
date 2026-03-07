import React, { useContext } from "react";
import Title from "./Title";
import ProductCard from "./ProductCard";
import  ShopContext  from "../context/shopContext";

const LatestCollection = () => {

  const { products } = useContext(ShopContext);

  return (
    <div className="w-full px-[20px] md:px-[60px] py-[60px]">

      {/* Title Section */}
      <div className="text-center mb-[40px]">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />

        <p className="w-full m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100 mt-[10px]">
          Step Into Style - New Collections Dropping This Season!
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[20px]">

        {products.slice(0,10).map((item) => (
          
          <ProductCard
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image1}
            price={item.price}
          />

        ))}

      </div>

    </div>
  );
};

export default LatestCollection;
