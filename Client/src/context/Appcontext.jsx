import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const Appcontent=createContext();


export const AppContextProvider=(props)=>{
    axios.defaults.withCredentials=true;


    const backendurl=import.meta.env.VITE_BACKEND_URL;
    const[isLoggedIn,setisLoggedIn]=useState(false);
    const[userData,setuserData]=useState(false);

   const getAuthState=async()=>{
    try{
        const {data}=await axios.get(backendurl+'/api/auth/is-auth',{withCredentials: true})
        if(data.success){
            setisLoggedIn(true)
            await getuserData()
        }
    }catch(error){
        toast.error(data.message)
    }
   } 

   const getuserData=async()=>{
    try{

        const {data}=await axios.get(backendurl+'/api/user/data',{withCredentials: true,})
        data.success?setuserData(data.userData):toast.error(data.message)

    }catch(error){
       toast.error(data.message)
    }
   }

   useEffect(()=>{
     getAuthState();
   },[])


    const value={
         backendurl,
         isLoggedIn,setisLoggedIn,
         userData,setuserData,
         getuserData,
    }

    return( <Appcontent.Provider value={value}>
          {props.children}
    </Appcontent.Provider>
    )
}