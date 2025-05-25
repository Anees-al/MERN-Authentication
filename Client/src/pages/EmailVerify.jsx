import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react';
import { Appcontent } from '../context/appContext';
import { toast } from 'react-toastify';
import { data, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


const EmailVerify = () => {

  const {userData,backendurl, getuserData,   isLoggedIn}=useContext(Appcontent);
  const navigate=useNavigate();


  const inputRef=React.useRef([]);

  const handleInput=(e,index)=>{
    if(e.target.value.length > 0 && index< inputRef.current.length -1 ){
      inputRef.current[index+1].focus();
    }
  }

  const handledown=(e,index)=>{
    if(e.key==='Backspace' && e.target.value === '' && index>0){
      inputRef.current[index-1].focus();
    }
  }

  const handlePaste=(e)=>{
   const paste=e.clipboardData.getData('text');
   const pasteArray=paste.split('');
   pasteArray.forEach((char,index) => {
        if(inputRef.current[index]){
          inputRef.current[index].value=char;
        }
   });
  }



  const handleSubmit=async(e)=>{
     try{
      e.preventDefault();
      const otpArray=inputRef.current.map(e=>e.value)
      const otp=otpArray.join('');

     const {data}=await axios.post(backendurl+'/api/auth/verify-account',{otp})

     if(data.success){
      toast.success(data.message);
      getuserData()
      navigate('/');
     }else{
      toast.error(data.message)
     }

     }catch(error){
       toast.error(data.message)
     }
  }



  useEffect(()=>{
    isLoggedIn && userData && userData.isAccountVerified && navigate('')
  },[isLoggedIn,userData])
  return (
    <div className='flex items-center justify-center min-h-screen  bg-gradient-to-br from-blue-200 to to-purple-400'>
       <img src={assets.logo} alt="logo" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-28 cursor-pointer'  onClick={()=>navigate('/')}/>
       <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' onSubmit={handleSubmit}>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify Otp</h1>
        <p className='text-center text-indigo-400 mb-6 font-semibold'>Enter the 6 digit code sent to your email</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_,index)=>(
            <input type='text' maxLength='1' key={index} required className='w-12 h-12 text-white text-center text-xl bg-[#333A5C] rounded-lg'
            ref={e=>inputRef.current[index]=e}
            onInput={(e)=>handleInput(e,index)}
            onKeyDown={(e)=>handledown(e,index)}/>
            
          ))}
        </div>
        <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg text-white'>Verify email</button>
       </form>
    </div>
  )
}

export default EmailVerify
