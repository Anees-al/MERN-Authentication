import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      <img src={assets.header_img} alt="header_image"  className='h-36 w-35 rounded-full mb-8' />
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey Programmer <img src={assets.hand_wave} alt="handwave" className='w-8 aspect-square' /></h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-8'>Welcome to our service</h2>
      <p className='text-lg mb-8 max-w-md'>Lets start with a quick product tour and we will you up and running into the time</p>
      <button className='border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>Quick start</button>
    </div>
  )
}

export default Header
