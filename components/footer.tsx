import Link from 'next/link'
import { Building, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Building className="h-8 w-8 text-sky-400" />
              <span className="text-xl font-bold">ApartmentStay</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Premium apartment rentals with modern amenities and exceptional service. 
              Find your perfect home away from home with our curated selection of properties.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@apartmentstay.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/apartments" className="block text-gray-300 hover:text-white transition-colors">
                Browse Apartments
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/terms" className="block text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="block text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Reseller Program */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Partner with Us</h3>
            <div className="space-y-2">
              <Link href="/reseller/register" className="block text-amber-400 hover:text-amber-300 transition-colors">
                Become a Reseller
              </Link>
              <Link href="/reseller/login" className="block text-gray-300 hover:text-white transition-colors">
                Reseller Login
              </Link>
              <Link href="/admin" className="block text-gray-300 hover:text-white transition-colors">
                Admin Portal
              </Link>
              <Link href="/help" className="block text-gray-300 hover:text-white transition-colors">
                Help Center
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ApartmentStay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}