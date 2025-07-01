import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ApartmentStay - Premium Apartment Rentals',
  description: 'Discover premium apartment rentals with modern amenities. Perfect for short stays, business trips, and extended vacations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}