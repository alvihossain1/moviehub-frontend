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

  // useEffect(() => {
  //   dosome()
  // }, [])

  // async function dosome() {
  //   const response = await axios({
  //     method: 'post',
  //     url: `${process.env.SERVER_URL}/movies`,
  //     data: {},
  //     headers: {
  //       'authorization': getCookie('accessToken')
  //     }
  //   })
  //   console.log(response)
  // }



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
