'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterForm({ className, ...props }) {

    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function submitForm(e){
        e.preventDefault()
        if(!name || !email || !password) return

        const data = {name, email, password}
        const response = await axios({
            method: 'post',
            url: `${process.env.SERVER_URL}/auth/register`,
            data: data,     
        }) 
        console.log(response.data)
        toast(response.data.data)
        const timeout = setTimeout(() => {
            router.push(`/login?email=${email}`)
            clearTimeout(timeout)
        }, 2000)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Registration</CardTitle>
                    <CardDescription>
                        Register with Name, Email and Password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={e => submitForm(e)}>
                        <div className="grid gap-6">
                            
                           
                            <div className="grid gap-6">
                            <div className="grid gap-2">
                                    <Label htmlFor="email">Name</Label>
                                    <Input
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                        id="name"
                                        type="text"
                                        placeholder="Alex..."
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input onChange={e => setPassword(e.target.value)} value={password} id="password" type="password" required />
                                </div>
                                <Button type="submit" className="w-full">
                                    Register
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                               Already have an account?{" "}
                                <Link href="/login" className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
