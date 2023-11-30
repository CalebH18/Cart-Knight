import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './Navbar/Navbar';
import SessionProvider from "./SessionProvider";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lancelot',
  description: 'Guardians of the cart',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
            <main className="p-4 m-auto min-w-[350px]">
              {children}
            </main>
        </SessionProvider>
        </body>
    </html>
  )
}
