'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ApartmentCard } from '@/components/apartment-card'
import { 
  Search, 
  Calendar, 
  Users, 
  Shield, 
  Clock, 
  Award,
  Building2,
  Wifi,
  Car,
  Coffee,
  ArrowRight
} from 'lucide-react'

// Mock data for demo
const mockApartments = [
  {
    id: '1',
    name: 'Modern Studio Downtown',
    type: 'Studio',
    pricePerNight: 850000,
    maxGuests: 2,
    area: 35,
    images: JSON.stringify([
      'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ]),
    amenities: JSON.stringify(['WiFi', 'AC', 'Kitchen', 'TV', 'Parking'])
  },
  {
    id: '2',
    name: 'Luxury 1BR with City View',
    type: '1 Bedroom',
    pricePerNight: 1200000,
    maxGuests: 3,
    area: 55,
    images: JSON.stringify([
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg'
    ]),
    amenities: JSON.stringify(['WiFi', 'AC', 'Kitchen', 'TV', 'Balcony', 'Gym'])
  },
  {
    id: '3',
    name: 'Spacious 2BR Family Suite',
    type: '2 Bedrooms',
    pricePerNight: 1800000,
    maxGuests: 6,
    area: 85,
    images: JSON.stringify([
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
      'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg'
    ]),
    amenities: JSON.stringify(['WiFi', 'AC', 'Kitchen', 'TV', 'Balcony', 'Washing Machine'])
  }
]

const features = [
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Your reservations are protected with our secure payment system and booking guarantee.'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer service to assist you with any questions or concerns.'
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'All apartments are carefully selected and maintained to the highest standards.'
  },
  {
    icon: Building2,
    title: 'Prime Locations',
    description: 'Strategic locations in the heart of the city with easy access to attractions.'
  }
]

const amenities = [
  { icon: Wifi, name: 'High-Speed WiFi' },
  { icon: Car, name: 'Free Parking' },
  { icon: Coffee, name: 'Coffee & Tea' },
  { icon: Users, name: 'Concierge Service' }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-500 via-sky-600 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Perfect Home 
              <span className="block text-sky-200">Away From Home</span>
            </h1>
            <p className="text-xl md:text-2xl text-sky-100 mb-8 max-w-2xl mx-auto">
              Discover premium apartment rentals with modern amenities and exceptional service. 
              Perfect for business trips, vacations, or extended stays.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-full p-2 max-w-2xl mx-auto flex items-center shadow-2xl">
              <div className="flex-1 px-4">
                <input
                  type="text"
                  placeholder="Search apartments, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
                />
              </div>
              <Button size="lg" className="rounded-full bg-emerald-500 hover:bg-emerald-600 px-8">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sky-200">Premium Units</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">10k+</div>
                <div className="text-sky-200">Happy Guests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">25+</div>
                <div className="text-sky-200">Locations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sky-200">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Apartments */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Apartments
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked premium accommodations offering the perfect blend of comfort, 
              style, and convenience for your stay.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {mockApartments.map((apartment) => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/apartments">
              <Button size="lg" variant="outline" className="px-8">
                View All Apartments
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ApartmentStay?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide exceptional service and premium accommodations to make your stay memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-sky-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium Amenities
            </h2>
            <p className="text-xl text-gray-600">
              Every apartment comes equipped with modern amenities for your comfort.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <amenity.icon className="h-10 w-10 text-emerald-500" />
                </div>
                <h3 className="font-semibold text-gray-900">{amenity.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reseller CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Earn Money as Our Partner
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Join our reseller program and earn attractive commissions by referring guests 
            to our premium apartments. It's free to join and start earning today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reseller/register">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 px-8">
                Become a Reseller
              </Button>
            </Link>
            <Link href="/reseller/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Reseller Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Book Your Stay?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Browse our collection of premium apartments and find the perfect place for your next trip.
          </p>
          <Link href="/apartments">
            <Button size="lg" className="bg-sky-500 hover:bg-sky-600 px-12">
              <Calendar className="h-5 w-5 mr-2" />
              Start Booking
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}