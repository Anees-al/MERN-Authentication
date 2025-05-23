import { createContext, useState } from "react";

export const Appcontent=createContext();


export const AppContextProvider=(props)=>{


    const backendurl=import.meta.env.VITE_BACKEND_URL;
    const[isLoggedIn,setisLoggedIn]=useState(false);
    const[userData,setuserData]=useState(false);

    const value={
         backendurl,
         isLoggedIn,setisLoggedIn,
         userData,setuserData,
    }

    return( <Appcontent.Provider value={value}>
          {props.children}
    </Appcontent.Provider>
    )
}