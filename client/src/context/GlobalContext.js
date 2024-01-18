import React,{useContext,createContext, useState} from "react";

const userDetail = {
    fname: '',
    email: '',
    username: '',
    role: null 
}

export const GlobalContext=createContext(null);

const ContextProvider=({children})=>{
    const [authUser,setAuthUser] =useState(userDetail)

    return(
        <GlobalContext.Provider value={{
             authUser,
             setAuthUser
        }}>
            {children}
            </GlobalContext.Provider>
    )
}

export default ContextProvider