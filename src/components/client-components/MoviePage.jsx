'use client'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useRouter } from 'next/navigation'
import { useAuth } from '../providers/AuthProvider'
import Link from 'next/link'
import { Button } from '../ui/button'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { useSocketIo } from '../providers/SocketIoProvider'
import { getCookie } from 'cookies-next/client'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { toast } from 'sonner'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function MoviePage({ id }) {

    const { user } = useAuth()
    const { socket } = useSocketIo()
    const router = useRouter()
    const [movie, setMovie] = useState({ success: false, data: {} })
    const [rate, setRate] = useState(1)
    const [description, setDescription] = useState("")

    useEffect(() => {
        id && getMovieById()
    }, [])

    async function getMovieById() {
        const response = await axios.get(`${process.env.SERVER_URL}/movies/${id}`)
        setMovie(response.data)
    }

    async function postMovieRating() {
        if (!rate) return
        if (rate >= 1 && rate <= 5) {
            const data = { rate, description, email: user.email }
            const response = await axios({
                method: 'post',
                url: `${process.env.SERVER_URL}/movies/${id}/rate`,
                data: data,
                headers: {
                    'authorization': getCookie('accessToken')
                }
            })
        }
        else {
            toast('Ratings must be between 1-5')
        }
    }

    useEffect(() => {
        socket.on("movies-ratings", (data) => {
            console.log("Rating Data", data)
            setMovie((movies) => {
                return { ...movies, data: { ...movies.data, ratings: [...movies.data.ratings, data] } }
            })
        })

        return (() => {
            socket.off("movies-ratings")
        })

    }, [socket])

    return (
        <div>
            <Navbar />
            {user && user.email && id ? (
                <div>
                    {movie.success && movie.data && (
                        <div className='container mx-auto'>
                            {id && movie.success && (
                                <div className='mt-5'>
                                    <Card>
                                        <CardTitle>
                                            <CardHeader>{movie.data.name}</CardHeader>
                                        </CardTitle>
                                        <CardContent>
                                            <CardDescription>
                                                <p>Genre: {movie.data.genre}</p>
                                                <p>Description: {movie.data.description}</p>
                                                <div className='py-3'>

                                                    <Dialog>
                                                        <DialogTrigger className='p-2 border border-neutral-300 rounded-lg shadow-sm shadow-neutral-300'>Rate</DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Rate this movie {user && user.name}</DialogTitle>
                                                                <div className='mb-2'>
                                                                    <Label className='mb-1'>Rating 1-5</Label>
                                                                    {/* <Input onChange={e => setRate(e.target.value)} value={rate} min={1} max={5} /> */}
                                                                    <Select onValueChange={setRate}>
                                                                        <SelectTrigger className="w-full">
                                                                            <SelectValue placeholder="Rate this movie" />
                                                                        </SelectTrigger>
                                                                        <SelectContent >
                                                                            <SelectGroup >
                                                                                <SelectItem value={1}>1</SelectItem>
                                                                                <SelectItem value={2}>2</SelectItem>
                                                                                <SelectItem value={3}>3</SelectItem>
                                                                                <SelectItem value={4}>4</SelectItem>
                                                                                <SelectItem value={5}>5</SelectItem>
                                                                            </SelectGroup>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <div className='mb-2'>
                                                                    <Label className='mb-1'>Description</Label>
                                                                    <Textarea onChange={e => setDescription(e.target.value)} value={description} />
                                                                </div>
                                                            </DialogHeader>
                                                            <DialogFooter className="sm:justify-start">
                                                                <DialogClose>
                                                                    <div onClick={postMovieRating} className='px-4 py-2 bg-neutral-900 text-neutral-200 dark:bg-neutral-200 dark:text-neutral-900 rounded-sm text-sm'>Rate</div>
                                                                </DialogClose>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>

                                                </div>
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                    <div className='p-2 flex flex-col gap-2'>
                                        {movie.data.ratings && movie.data.ratings.map((rating, index) => (
                                            <Card key={index + "-" + rating._id}>
                                                <CardTitle>
                                                    <CardHeader>{rating.username}</CardHeader>
                                                </CardTitle>
                                                <CardContent>
                                                    <CardDescription>
                                                        <p className='font-semibold text-base'>Rated: {rating.rate}</p>
                                                        <p>{rating.description}</p>
                                                    </CardDescription>
                                                </CardContent>
                                            </Card>
                                        ))}

                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            ) : (
                <div className='my-5 flex flex-col items-center gap-2'>
                    <h1>Looks like you do not have an account</h1>
                    <Link href='/login'>
                        <Button>Login to continue</Button>
                    </Link>

                </div>
            )}
        </div>
    )
}
