import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import MenuProvider from '@/contexts/MenuContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ambisius Coding Challenge - by Yuda',
  description: 'Created for test interview at Ambisius Lab',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MenuProvider>
          {children}
          <Toaster />
        </MenuProvider>
      </body>
    </html>
  )
}
