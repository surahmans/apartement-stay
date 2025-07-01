'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Building, Menu, User, UserPlus, LogIn } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Apartments', href: '/apartments' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-sky-500" />
              <span className="text-xl font-bold text-gray-900">ApartmentStay</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-sky-500',
                  pathname === item.href
                    ? 'text-sky-500'
                    : 'text-gray-600'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/reseller/register">
              <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Become Reseller
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-sky-500 hover:bg-sky-600">
                <User className="h-4 w-4 mr-2" />
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'text-sm font-medium py-2 px-3 rounded-md transition-colors',
                        pathname === item.href
                          ? 'bg-sky-50 text-sky-500'
                          : 'text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t pt-4 space-y-2">
                    <Link href="/reseller/register" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-amber-600">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Become Reseller
                      </Button>
                    </Link>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full justify-start bg-sky-500 hover:bg-sky-600">
                        <User className="h-4 w-4 mr-2" />
                        Register
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}