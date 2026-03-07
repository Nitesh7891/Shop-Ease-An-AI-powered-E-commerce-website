import React, { useContext } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/shopContext'

const BestSeller = () => {
    let{products}=useContext(shopDataContext)
    const[bestSeller,setBestSeller]=useState([])

    useEffect(()=>{
       let filterProducts=products.filter((item)=>item.bestseller)
       setBestSeller(filterProducts.slice(0,4))
    },[products])
  return (
    <div>
      <div className='h-[8%] w-[100%] text-center mt-[50px]'>
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100'>
          Discover Our Top Selling Products!
        </p>
      </div>
      <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
        {bestSeller.map((item,index) => (
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
  )
}

export default BestSeller
