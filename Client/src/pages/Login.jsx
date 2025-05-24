
import { useContext, useState} from 'react';
import { assets } from '../assets/assets';
import { data, useNavigate } from 'react-router-dom';
import { Appcontent } from '../context/appContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
 

 const {backendurl,setisLoggedIn,getuserData}=useContext(Appcontent);
  const navigate=useNavigate();
  const[state,setstate]=useState('sign up')
  const[name,setname]=useState('');
  const[email,setemail]=useState('');
  const[password,setpassword]=useState('');


  const handleSubmit=async(e)=>{
     try{
       e.preventDefault();
       axios.defaults.withCredentials=true;

       if(state==='sign up'){
         const {data}=await axios.post(backendurl+'/api/auth/register',{name,email,password});
        

         if(data.success){
          setisLoggedIn(true);
          getuserData();
          navigate('/');
          toast.success("Logged in successfully!" ,{style:{ backgroundColor: '#4caf50'}});
         }else{
          toast.error(data.message)
         }

       }else{
        const respond=await axios.post(backendurl+'/api/auth/login',{email,password});
        const data=respond.data;
        console.log(respond)
        
         
        
         if(data.success){
          console.log("success")
          setisLoggedIn(true);
          getuserData();
          navigate('/');
          toast.success("Logged in successfully!",{style:{ backgroundColor: '#4caf50', color:"white"}});
         }else{
          toast.error(data.message)
         }

       }
     }catch(error){
        toast.error(data.message)
     }
  }

  



  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to to-purple-400'>
      <img src={assets.logo} alt="logo" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-28 cursor-pointer'  onClick={()=>navigate('/')}/>
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-400 text-sm'>
        <h2 className='text-3xl text-white font-semibold text-center'>{state==='sign up'? 'Create account':'Login'}</h2>
        <p className='text-center text-sm mb-6'>{state==='sign up'? 'create your account':'login to your account'}</p>


        <form onSubmit={handleSubmit}>
          {state==='sign up'&&( <div className='mb-4  flex items-center gap-3 w-full px-5 py-2 rounded-full  bg-[#333A5C]'>
            <img src={assets.person_icon} alt="personicon" />
            <input type="text" placeholder='Full name' required 
             className='bg-transparent outline-none' 
             onChange={(e)=>setname(e.target.value) } 
             value={name}/>
          </div>)}
         
          <div className='mb-4  flex items-center gap-3 w-full px-5 py-2 rounded-full  bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="personicon" />
            <input type="email" placeholder='Email Id' required  
            className='bg-transparent outline-none'  
            onChange={(e)=>setemail(e.target.value)}  
            value={email}/>
          </div>
          <div className='mb-4  flex items-center gap-3 w-full px-5 py-2 rounded-full  bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="personicon" />
            <input type="password" placeholder='Password' 
            required  className='bg-transparent outline-none' 
            onChange={(e)=>setpassword(e.target.value)} 
            value={password}/>
          </div>
          <p className='mb-6 text-indigo-400 cursor-pointer hover:text-indigo-600  active:text-indigo-800' onClick={()=>navigate('/resetpassword')}>forget password</p>
          <button className='w-full py-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>{state}</button>
        </form>
        {state==='sign up'?(<p className='text-gray-400 text-center mt-4 text-xs'>Already have an account ?{' '}<span className='text-blue-400 underline cursor-pointer'  onClick={()=>setstate('log in')}>login here</span></p>):(<p className='text-gray-400 text-center mt-4 text-xs'>Dont have an account ?{' '}<span className='text-blue-400 underline cursor-pointer' onClick={()=>setstate('sign up')}>Sign up</span></p>)}
        
        
    
      </div>
    </div>
  )
}

export default Login