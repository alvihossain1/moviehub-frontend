'use client'
import axios from 'axios'
import { getCookie } from 'cookies-next/client';
import React, { useEffect } from 'react'

export default function AxiosCookieSet({ children }) {
    useEffect(() => {
        axios.defaults.headers.common['authorization'] = getCookie('accessToken')
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}
