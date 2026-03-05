import React from 'react'
import back2 from "../assets/back2.png"
import back1 from "../assets/back1.png"
import back3 from "../assets/back3.png"
import back4 from "../assets/back4.png"

const wrapperClass = "w-full md:w-[50%] h-[60vh] md:h-full"
const imgClass = "w-full h-full object-cover"

const Background = ({ heroCount }) => {

  if (heroCount === 0) {
    return <div className={wrapperClass}><img src={back2} alt="" className={imgClass} /></div>
  }
  else if (heroCount === 1) {
    return <div className={wrapperClass}><img src={back1} alt="" className={imgClass} /></div>
  }
  else if (heroCount === 2) {
    return <div className={wrapperClass}><img src={back3} alt="" className={imgClass} /></div>
  }
  else if (heroCount === 3) {
    return <div className={wrapperClass}><img src={back4} alt="" className={imgClass} /></div>
  }
}

export default Background
