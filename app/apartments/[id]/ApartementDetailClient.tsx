'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { BookingCalendar } from '@/components/booking-calendar'
import {
  MapPin,
  Users,
  Square,
  Star,
  Wifi,
  Car,
  Coffee,
  Tv,
  Wind,
  UtensilsCrossed,
  ArrowLeft,
  Calendar,
  CreditCard
} from 'lucide-react'
import Link from 'next/link'
import { on } from 'events'

// Mock apartment data
const mockApartment = {
  id: '1',
  name: 'Modern Studio Downtown',
  type: 'Studio',
  pricePerNight: 850000,
  maxGuests: 2,
  area: 35,
  floor: 15,
  description: 'Experience luxury living in this beautifully designed modern studio apartment located in the heart of downtown. Perfect for business travelers and couples seeking comfort and convenience.',
  images: [
    'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
    'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg'
  ],
  amenities: [
    { name: 'High-Speed WiFi', icon: Wifi },
    { name: 'Air Conditioning', icon: Wind },
    { name: 'Full Kitchen', icon: UtensilsCrossed },
    { name: 'Smart TV', icon: Tv },
    { name: 'Free Parking', icon: Car },
    { name: 'Coffee Machine', icon: Coffee }
  ],
  location: 'Central Jakarta, Indonesia',
  rating: 4.8,
  reviews: 127,
  checkInTime: '15:00',
  checkOutTime: '11:00'
}

// Komponen detail apartemen kamu taruh di sini
export default function ApartmentDetailClient({ apartmentId }: { apartmentId: string }) {
  // lanjutkan semua logic useState, useEffect, dan rendering UI di sini...
  const searchParams = useSearchParams()
  const referralCode = searchParams?.get('ref')

  const [selectedImage, setSelectedImage] = useState(0)
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [totalNights, setTotalNights] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const apartment = mockApartment // In real app, fetch by apartmentId

  const handleDateSelect = (checkInDate: Date, checkOutDate: Date) => {
    setCheckIn(checkInDate)
    setCheckOut(checkOutDate)

    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    setTotalNights(nights)
    setTotalAmount(nights * apartment.pricePerNight)
  }

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates')
      return
    }

    const bookingUrl = `/booking/${apartmentId}?checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}${referralCode ? `&ref=${referralCode}` : ''}`
    window.location.href = bookingUrl
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/apartments" className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Apartments
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative h-96">
                <Image
                  src={apartment.images[selectedImage]}
                  alt={apartment.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {apartment.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${selectedImage === index ? 'ring-2 ring-sky-500' : ''
                        }`}
                    >
                      <Image
                        src={image}
                        alt={`${apartment.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Apartment Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-gray-900">
                      {apartment.name}
                    </CardTitle>
                    <div className="flex items-center space-x-4 mt-2 text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {apartment.location}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-amber-400" />
                        {apartment.rating} ({apartment.reviews} reviews)
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    {apartment.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm text-gray-600">Max Guests</div>
                    <div className="font-semibold">{apartment.maxGuests}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Square className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm text-gray-600">Area</div>
                    <div className="font-semibold">{apartment.area}m²</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <MapPin className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <div className="text-sm text-gray-600">Floor</div>
                    <div className="font-semibold">{apartment.floor}</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {apartment.description}
                  </p>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {apartment.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <amenity.icon className="h-5 w-5 text-emerald-500" />
                        <span className="text-sm font-medium">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Check-in Time</h4>
                    <p className="text-gray-600">{apartment.checkInTime}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Check-out Time</h4>
                    <p className="text-gray-600">{apartment.checkOutTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      Rp {apartment.pricePerNight.toLocaleString('id-ID')}
                    </span>
                    <span className="text-gray-600">/night</span>
                  </CardTitle>
                  {referralCode && (
                    <Badge variant="secondary" className="w-fit">
                      Referred by: {referralCode}
                    </Badge>
                  )}
                </CardHeader>
              </Card>

              {/* Calendar */}
              <BookingCalendar
                onDateSelect={handleDateSelect}
                minStay={1}
              />

              {/* Booking Summary */}
              {checkIn && checkOut && (
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Rp {apartment.pricePerNight.toLocaleString('id-ID')} × {totalNights} night{totalNights > 1 ? 's' : ''}
                        </span>
                        <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Book Button */}
              <Button
                onClick={handleBooking}
                className="w-full bg-sky-500 hover:bg-sky-600 text-lg py-6"
                disabled={!checkIn || !checkOut}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Book Now
              </Button>

              <div className="text-center text-sm text-gray-500">
                You won't be charged yet. Complete your booking to confirm.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

