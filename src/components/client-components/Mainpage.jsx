'use client'
import React, { useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { getCookie } from 'cookies-next/client'
import MovieList from './MovieList'
import { useAuth } from '../providers/AuthProvider'
import PostMovies from './PostMovies'

export default function Mainpage() {

  const {user} = useAuth()

  useEffect(() => {
    homeInit()
  }, [])

  async function homeInit() {
    const response = await axios({
      method: 'get',
      url: `${process.env.SERVER_URL}/`,
    })
    console.log('home response', response.data)
  }



  return (
    <div>
      <Navbar />
      {user && user?.email && (
        <PostMovies />
      )}
      <MovieList />

    </div>
  )
}
