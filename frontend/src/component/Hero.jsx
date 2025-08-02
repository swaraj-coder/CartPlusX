import React from 'react'
import {FaCircle} from "react-icons/fa";

function Hero({heroData,heroCount,setHeroCount}) {
  return (
    <div className='w-full h-full relative px-4 pt-8 md:pt-[90px] md:pl-[10%] '>
      <div className='text-[#88d9ee] text-[20px] md:text-[35px] lg:text-[45px]'>
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>

      </div>
      <div className='mt-6 flex items-center gap-[10px]'>
      <FaCircle className={`w-[14px] h-[14px] cursor-pointer ${heroCount===0 ? "fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(0)}/>
       <FaCircle className={`w-[14px] h-[14px] cursor-pointer ${heroCount===1 ? "fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(1)}/>
        <FaCircle className={`w-[14px] h-[14px] cursor-pointer  ${heroCount===2 ? "fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(2)}/>
         <FaCircle className={`w-[14px] h-[14px] cursor-pointer  ${heroCount===3 ? "fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(3)}/>
             <FaCircle className={`w-[14px] h-[14px] cursor-pointer  ${heroCount===4 ? "fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(4)}/>
      </div>

    </div>
  )
}

export default Hero