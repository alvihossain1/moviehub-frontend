import MoviePage from '@/components/client-components/MoviePage'
import Navbar from '@/components/client-components/Navbar'
import React from 'react'

export default async function page({ params }) {
    const { id } = await params
    
  return (
    <div>
        {id && <MoviePage id={id} />}
        
    </div>
  )
}
