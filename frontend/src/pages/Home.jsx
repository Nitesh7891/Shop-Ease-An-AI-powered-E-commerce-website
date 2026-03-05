import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar'
import Background from '../components/Background'
import Hero from '../components/Hero'

const Home = () => {
  const heroData = [
    { text1: "30% off Limited Offer", text2: "Style that defines you" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" }
  ]

  const [heroCount, setHeroCount] = useState(0)

    useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev + 1) % heroData.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] overflow-y-hidden
">
      
      {/* FIXED NAVBAR */}
      <Navbar />

      {/* CONTENT BELOW NAVBAR */}
      <div className="
        flex flex-col md:flex-row
        h-[calc(100vh-70px)]
        mt-[60px]
      ">
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
        <Background heroCount={heroCount} />
      </div>

    </div>
  )
}

export default Home
