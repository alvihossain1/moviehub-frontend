'use client'
import React from 'react'
import { useAuth } from '../providers/AuthProvider'
import { Button } from '../ui/button'
import { Card, CardContent, } from '../ui/card'
import Link from 'next/link'
import { deleteCookie } from 'cookies-next/client'
import { useRouter } from 'next/navigation'

export default function Navbar() {

    const router = useRouter()
    const { user } = useAuth()

    function signOut() {
        deleteCookie('refreshToken')
        deleteCookie('accessToken')
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }

    return (
        <Card className='rounded-none'>
            <CardContent className='container mx-auto flex justify-between' >
                <Link href='/'>
                    <h1 className='text-xl font-bold'>Moviehub</h1>
                </Link>
                {!user && !user?.email ? (

                    <Link href={'/login'}>
                        <Button>Login</Button>
                    </Link>
                ) : (
                    <div className='flex gap-2 justify-center items-center'>
                        <p className='font-medium'>{user.name}</p>
                        <Button onClick={() => { signOut() }} variant='outline'>Logout</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
