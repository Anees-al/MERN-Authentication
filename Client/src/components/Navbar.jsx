import  { useContext } from 'react'
import {assets} from '../assets/assets'
import { data, useNavigate } from 'react-router-dom'
import { Appcontent } from '../context/appContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Navbar = () => {
   const navigate=useNavigate();

   const{userData,backendurl,setisLoggedIn,setuserData}=useContext(Appcontent);

   const logout=async()=>{
    try{
     axios.defaults.withCredentials=true;
     const {data}=await axios.post(backendurl+'/api/auth/logout')
     data.success&&setisLoggedIn(false)
     data.success&&setuserData(false)
     navigate('/')
    }catch(error){
     toast.error(data.message)
    }
   }


   const Verifyemail=async()=>{
    try{
         axios.defaults.withCredentials=true;
         const {data}=await axios.post(backendurl+'/api/auth/send-verify-otp');

         if(data.success){
          navigate('/emailverify');
          toast.success(data.message)
         }else{
          toast.error(data.message)
         }
    }catch(error){
      toast.error(data.message)
    }
   }

   
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img src={assets.logo}  alt='logo'  className='w-28 sm:w-32'/>
      {userData?
      <div className='w-8 h-8 flex justify-center items-center rounded-full text-white bg-black relative group'>{userData.name[0].toUpperCase()}
      <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
        <ul className='list-none m-0 p-2 bg-gray-200 text-sm'>
          {!userData.isAccountVerified&&<li className='py-1 px-2 hover:bg-gray-100 cursor-pointer' onClick={Verifyemail}>Verify Email</li>}
          
          <li className='py-1 px-2 hover:bg-gray-100 cursor-pointer pr-10' onClick={logout}>Logout</li>
        </ul>

      </div>

      </div>
      :<button className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'
       onClick={()=>navigate('/login')}>login <img src={assets.arrow_icon} alt="arro"  /></button>
}
          </div>
  )
}

export default Navbar
