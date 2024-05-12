import React from 'react'
import banner from "../../assets/images/banner.jpg"

const HeroBanner:React.FC=()=> {
  return (

    <div className='flex justify-center mt-10 lg:justify-between '>
        <div className=' flex flex-col text-center flex-wrap items-center gap-8  '>
        <h1  className="font-semibold text-red-600 text-4xl lg:text-6xl ">
            FitCraft Hub
        </h1>
        <em className='font-semibold text-40 lg:text-30 mb-23 mt-30 text-2xl lg:text-4xl' >
        Strive for progress,<br/> not perfection.
        </em>
        <p className='text-xl lg:text-2xl'>
            Check out the best muscle building excercises
        </p>
   
        <button className="bg-red-500 p-4 w-1/2 rounded-2xl text-white hover:bg-red-400">
        Explore Excercises
      </button>
      <h1 className="font-bold text-red-700 opacity-10   text-8xl lg:text-[180px] ">
        Exercise
      </h1>
      
    </div>
    <div className='hidden md:block '>
        <img src={banner} alt="hero-banner" className='hero-banner-img rounded-3xl '/>
    </div>
    </div>
  )
}

export default HeroBanner