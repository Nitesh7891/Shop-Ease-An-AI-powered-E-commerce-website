import React from 'react'
import { FaCircle } from "react-icons/fa"

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className="relative w-full md:w-[50%] h-full">

      {/* TEXT */}
      <div
        className="
          absolute
          w-[92%] sm:w-[90%] md:w-[80%]
          left-[4%] sm:left-[5%] md:left-[10%]
          top-[20px] sm:top-[40px] md:top-[90px] lg:top-[130px]
          text-[#88d9ee]
          text-[22px] sm:text-[22px] md:text-[40px] lg:text-[55px]
        "
      >
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>

      {/* DOTS */}
      <div
        className="
          absolute
          w-[92%] sm:w-[90%] md:w-[80%]
          left-[4%] sm:left-[5%] md:left-[10%]
          top-[130px] sm:top-[190px] md:top-[400px] lg:top-[500px]
          flex gap-[10px]
        "
      >
        <FaCircle className={`w-[14px] ${heroCount === 0 ? 'fill-orange-400' : 'fill-white'}`} onClick={() => setHeroCount(0)} />
        <FaCircle className={`w-[14px] ${heroCount === 1 ? 'fill-orange-400' : 'fill-white'}`} onClick={() => setHeroCount(1)} />
        <FaCircle className={`w-[14px] ${heroCount === 2 ? 'fill-orange-400' : 'fill-white'}`} onClick={() => setHeroCount(2)} />
        <FaCircle className={`w-[14px] ${heroCount === 3 ? 'fill-orange-400' : 'fill-white'}`} onClick={() => setHeroCount(3)} />
      </div>

    </div>
  )
}

export default Hero
