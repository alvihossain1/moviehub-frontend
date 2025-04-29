"use client"
import { getCookie } from "cookies-next/client"
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react'

const { createContext, useContext } = require("react")
const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser()
    }, [])

    async function getUser() {
        const token = getCookie('accessToken')
        if (token) {
            const decoded = jwtDecode(token);
            setUser({ _id: decoded._id, name: decoded.name, email: decoded.email })
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>           
                {children}    
        </AuthContext.Provider>
    )
}
