import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextProvider, useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

const SocketContext = createContext();

export const useSocketContext = ()=>{
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children})=>{
    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const {auth} = useAuthContext();
    useEffect(()=>{
        if (auth) {
            const socket = io("https://mern-chat-app-production-pgqq.onrender.com", {
                query: {
                    userId: auth._id,
                }
            });

            
            setSocket(socket);
            socket.on("getOnlineUsers", (users)=>{
                console.log("🔌 Online users list:", users); 
                setOnlineUsers(users);
            })
            return ()=> socket.close()
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    },[auth]);
    return(
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}