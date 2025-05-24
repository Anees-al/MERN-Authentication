import React from 'react'
import { assets } from '../assets/assets'

const EmailVerify = () => {
  return (
    <div className='flex items-center justify-center min-h-screen  bg-gradient-to-br from-blue-200 to to-purple-400'>
       <img src={assets.logo} alt="logo" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-28 cursor-pointer'  onClick={()=>navigate('/')}/>
       <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify Otp</h1>
        <p className='text-center text-indigo-400 mb-6 font-semibold'>Enter the 6 digit code sent to your email</p>
        <div className='flex justify-between mb-8'>
          {Array(6).fill(0).map((_,index)=>(
            <input type='text' maxLength='1' key={index} required className='w-12 h-12 text-white text-center text-xl bg-[#333A5C] rounded-lg'/>
          ))}
        </div>
        <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg text-white'>Verify email</button>
       </form>
    </div>
  )
}

export default EmailVerify
