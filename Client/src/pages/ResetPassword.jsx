import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useContext } from 'react';
import { Appcontent } from '../context/appContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate=useNavigate();
  const [email,setemail]=useState('')
  const [newpassword,setnewpassword]=useState('');
  const [isEmailsent,setisEmailsent]=useState('');
  const [otp,setopt]=useState(0);
  const [isOtpsubmitted,setOtpsubmitted]=useState(false);

  const {backendurl}=useContext(Appcontent);
  axios.defaults.withCredentials=true;
  
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


    const Emailsubmit=async(e)=>{
      e.preventDefault()
      try{

        const {data}=await axios.post(backendurl+'/api/auth/reset-otp',{email})
        data.success?toast.success(data.message):toast.error(data.message);
        data.success && setisEmailsent(true);

      }catch(error){
        toast.error(data.message)
      }
    }


    const Otpsubmit=async(e)=>{
      e.preventDefault();
      try{
          const otpArray=inputRef.current.map(e=>e.value);
        setopt(otpArray.join(''))
        setOtpsubmitted(true);

      }catch(error){
       
      }
    }


    const passwordsubmit=async(e)=>{
      e.preventDefault()
       const {data}=await axios.post(backendurl+'/api/auth/reset-password',{email,otp,newpassword});
      try{
      
       data.success ? toast.success(data.message):toast.error(data.message)
       data.success && navigate('/login');
      }catch(error){
        toast.error(data.message);
      }
    }
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to to-purple-400'>
      <img src={assets.logo} alt="logo" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-28 cursor-pointer'  onClick={()=>navigate('/')}/>
      {!isEmailsent && 
        <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' onSubmit={Emailsubmit}>
             <h1 className='text-white font-semibold text-2xl text-center mb-4'>Reset Password</h1>
             <p className='text-indigo-500 font-semibold text-lg text-center mb-6'>Enter your email</p>
             <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
              <img src={assets.mail_icon} alt='mailicon' className='w-3 h-3'/>
              <input type='email' placeholder='Email Id' className='bg-transparent outline-none text-white' value={email} onChange={e=>setemail(e.target.value)} required/>
             </div>
             <button className='w-full py-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>Submit</button>
        </form>
      }

      {!isOtpsubmitted && isEmailsent && 
         <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'  onSubmit={Otpsubmit}>
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
        <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full text-white'>Submit</button>
       </form>
        }
        {isOtpsubmitted && isEmailsent  &&
        <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' onSubmit={passwordsubmit}>
             <h1 className='text-white font-semibold text-2xl text-center mb-4'>Reset Password</h1>
             <p className='text-indigo-500 font-semibold text-lg text-center mb-6'>Enter your new password</p>
             <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
              <img src={assets.lock_icon} alt='mailicon' className='w-3 h-3'/>
              <input type='password' placeholder='password' className='bg-transparent outline-none text-white' value={newpassword} onChange={e=>setnewpassword(e.target.value)} required/>
             </div>
             <button className='w-full py-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>Submit</button>
        </form>
}
       
    </div>
  )
}

export default ResetPassword
