import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();

export const useAuthContext = ()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children})=>{
    const [auth,setauth] = useState(JSON.parse(localStorage.getItem('chat-user')) || null);
    return(
        <AuthContext.Provider value={{auth,setauth}}>
            {children}
        </AuthContext.Provider>
    )
}