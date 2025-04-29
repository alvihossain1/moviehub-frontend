import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from "@/components/providers/AuthProvider";
import SocketIoProvider from "@/components/providers/SocketIoProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Moviehub",
  description: "Your next level online movies collection store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <SocketIoProvider>
            <Toaster />
            <div className="min-h-screen dark:bg-neutral-900">
            {children}
            </div>
          </SocketIoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
