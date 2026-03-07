import { createContext, useContext, useEffect, useState } from "react";
import {authDataContext} from "./authContext"

export const shopDataContext=createContext();

const ShopContext = ({children}) => {
    let [products,setProducts]=useState([])
    let {serverUrl}=useContext(autDataContext)
    let currency="₹"
    let delivery_fee=50;

    const getProducts=async()=>{
      try {
        const response=await axios.get(serverUrl+'/api/product/list-products')
        
        if(response.data?.success){
          setProducts(response.data.products)
        }
        else{
          setProducts([])
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(()=>{
      getProducts();
    },[])
  
    let value={
      getProducts,
      products,
      currency,
      delivery_fee
    }
  return (
    <div>
      
    </div>
  )
}

export default ShopContext
