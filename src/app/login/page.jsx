import LoginForm from "@/components/client-components/LoginForm"
import Navbar from "@/components/client-components/Navbar"
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0">
      <Navbar />
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">

        <div className="flex w-full max-w-sm flex-col gap-6">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>

  )
}
