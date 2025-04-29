'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import axios from 'axios'
import { useSocketIo } from '../providers/SocketIoProvider'
import { Button } from '../ui/button'
import Link from 'next/link'
import { toast } from 'sonner'

export default function MovieList() {

  const { socket } = useSocketIo()
  const [movies, setMovies] = useState({ success: false, data: [] })

  useEffect(() => {
    getMovies()
  }, [])

  useEffect(() => {

    socket.on("movies", (data) => {
      console.log("MOVIE DATA", data)
      setMovies((movies) => {
        return { ...movies, data: [...movies.data, data] }
      })
      toast(`${data.name} movie added!`)
    })

    socket.on("movie-ratings-update", (data) => {
      // getMovies()
      console.log("ASX", data)
      setMovies((movies) => {
        let newMovies = movies.data.map(movie => {
          console.log("AALL", movie)
          if (movie._id === data.movieId) movie.ratings += 1
          return movie
        })
        return { ...movies, data: newMovies }
      })
    })

    return (() => {
      socket.off("movies")
      socket.off("movie-ratings-update")
    })

  }, [socket])

  async function getMovies() {
    const response = await axios.get(`${process.env.SERVER_URL}/movies`)
    setMovies(response.data)
    console.log("Movies list", response.data)
  }

  return (
    <div className='my-2 container mx-auto'>
      {movies.success && (
        <div className='grid grid-cols-12 gap-2'>
          {movies.data.length > 0 && movies.data.map((movie, index) => (
            <div key={movie._id + index} className='col-span-6 md:col-span-3'>
              <Card className='p-2'>
                <CardTitle>Title: {movie.name}</CardTitle>
                <div>
                  <p>Genre: {movie.genre}</p>
                  <Link href={`/movie/${movie._id}`}>
                    <p>No. of people ratings: {`+${movie?.ratings}`}</p>
                    <Button variant='outline' className='mt-3'>View More</Button>
                  </Link>
                </div>
              </Card>
            </div>
          ))}
          {movies.data.length === 0 && (
            <div className='col-span-12 flex justify-center py-3'>
              <h2 className='font-medium text-lg'>No movies to show</h2>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
