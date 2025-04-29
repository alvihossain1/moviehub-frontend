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
import { useSetCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useSearchParams } from 'next/navigation'


export default function LoginForm({ className, ...props }) {

    const searchParams = useSearchParams()
    const emailParam = searchParams.get('email')
    const router = useRouter()
    const setCookie = useSetCookie();
    const [email, setEmail] = useState(emailParam || "alex@gmail.com")
    const [password, setPassword] = useState("123")

    async function submitForm(e) {
        e.preventDefault()
        if (!email || !password) return

        const data = { email, password }
        const response = await axios({
            method: 'post',
            url: `${process.env.SERVER_URL}/auth/login`,
            data: data,
        })
        console.log(response.data.success)
        if (response.data.success) {
            setCookie('accessToken', response.data.accessToken);
            setCookie('refreshToken', response.data.refreshToken);
            // axios.defaults.headers.common['authorization'] =  response.data.token;
            // await router.push('/',)
            window.location.href = '/'
        }
        

    }

    return (
            <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Email and Password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={e => submitForm(e)}>
                        <div className="grid gap-6">


                            <div className="grid gap-6">
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
                                    Login
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="/register" className="underline underline-offset-4">
                                    Sign up
                                </a>
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
