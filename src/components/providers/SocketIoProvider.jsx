"use client"
import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthProvider'
import io from "socket.io-client";

const { createContext, useContext } = require("react")
const SocketIoContext = createContext()
export const useSocketIo = () => useContext(SocketIoContext)

const socketio = io.connect(`${process.env.SERVER_URL}`);

export default function SocketIoProvider({ children }) {

    const [socket, setSocket] = useState(socketio)
    const {user} = useAuth()

    useEffect(() => {
        connectionToMovies()
    }, [])

    async function connectionToMovies(){
        socket.emit('movie_connection')

    }

    return (
        <SocketIoContext.Provider value={{ socket, setSocket }}>           
                {children}    
        </SocketIoContext.Provider>
    )
}
