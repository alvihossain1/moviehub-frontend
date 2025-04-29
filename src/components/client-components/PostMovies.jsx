import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import axios from 'axios'
import { getCookie } from 'cookies-next/client'

export default function PostMovies() {

    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [description, setDescription] = useState('')

    async function formSubmit(){
        if(!name || !genre || !description) return

        const data = {name, genre, description}
        const response = await axios({
            url: `${process.env.SERVER_URL}/movies`,
            method: 'post',
            data: data,
            headers: {
                'authorization': getCookie('accessToken')
            }
        })
        console.log("RES", response)
        setName(""); setGenre(""); setDescription("")
        

    }

    return (
        <div className='container mx-auto my-5'>
            <Card>
                <CardTitle>
                    <CardHeader>Add a Movie</CardHeader>
                </CardTitle>
                <CardContent>
                    <div className='my-2'>
                        <Label className='mb-1'>Movie Name</Label>
                        <Input onChange={e => setName(e.target.value)} value={name} />
                    </div>
                    <div className='my-2'>
                        <Label className='mb-1'>Movie Genre</Label>
                        <Input onChange={e => setGenre(e.target.value)} value={genre} />
                    </div>
                    <div className='my-2'>
                        <Label className='mb-1'>Movie Description</Label>
                        <Textarea onChange={e => setDescription(e.target.value)} value={description} />
                    </div>
                    <div className='mt-5'>
                        <Button onClick={formSubmit}>Add Movie</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
