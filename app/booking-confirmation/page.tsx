'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  CheckCircle, 
  Calendar, 
  Users, 
  MapPin, 
  Mail,
  Phone,
  Download,
  Share,
  Home
} from 'lucide-react'

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const bookingCode = searchParams?.get('code')
  
  const [booking, setBooking] = useState({
    code: bookingCode || 'APT-1234567-ABCD',
    apartment: {
      name: 'Modern Studio Downtown',
      type: 'Studio',
      location: 'Central Jakarta, Indonesia',
      image: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg'
    },
    guest: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+62 812 3456 7890'
    },
    dates: {
      checkIn: '2024-02-15',
      checkOut: '2024-02-18'
    },
    guests: 2,
    totalNights: 3,
    totalAmount: 2550000,
    paymentStatus: 'PENDING',
    status: 'CONFIRMED'
  })

  useEffect(() => {
    // In real app, fetch booking details using the code
    // For demo, we'll use mock data
  }, [bookingCode])

  const handleDownloadReceipt = () => {
    // In real app, generate and download PDF receipt
    alert('Receipt download would start here')
  }

  const handleShareBooking = () => {
    // In real app, share booking details
    if (navigator.share) {
      navigator.share({
        title: 'My Apartment Booking',
        text: `Booking confirmed! Code: ${booking.code}`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(`Booking confirmed! Code: ${booking.code}`)
      alert('Booking details copied to clipboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Your reservation has been successfully created
          </p>
          <div className="mt-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Booking Code: {booking.code}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Apartment Info */}
            <Card>
              <CardHeader>
                <CardTitle>Apartment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200">
                    <img 
                      src={booking.apartment.image} 
                      alt={booking.apartment.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {booking.apartment.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {booking.apartment.location}
                    </div>
                    <Badge variant="outline">
                      {booking.apartment.type}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stay Details */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Check-in</span>
                      <div className="text-right">
                        <div className="font-semibold">{booking.dates.checkIn}</div>
                        <div className="text-sm text-gray-500">After 3:00 PM</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Check-out</span>
                      <div className="text-right">
                        <div className="font-semibold">{booking.dates.checkOut}</div>
                        <div className="text-sm text-gray-500">Before 11:00 AM</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold">{booking.totalNights} nights</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Guests</span>
                      <span className="font-semibold">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle>Guest Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Name</span>
                    <span className="font-semibold">{booking.guest.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </span>
                    <span className="font-semibold">{booking.guest.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone
                    </span>
                    <span className="font-semibold">{booking.guest.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {booking.totalNights} nights
                      </span>
                      <span>Rp {booking.totalAmount.toLocaleString('id-ID')}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>Rp {booking.totalAmount.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="mt-3">
                      <Badge 
                        variant={booking.paymentStatus === 'PAID' ? 'default' : 'secondary'}
                        className="w-full justify-center py-2"
                      >
                        Payment: {booking.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={handleDownloadReceipt}
                    variant="outline" 
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                  <Button 
                    onClick={handleShareBooking}
                    variant="outline" 
                    className="w-full"
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share Booking
                  </Button>
                  <Separator />
                  <Link href="/" className="block">
                    <Button className="w-full bg-sky-500 hover:bg-sky-600">
                      <Home className="h-4 w-4 mr-2" />
                      Back to Home
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Important Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Important Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Please arrive after 3:00 PM for check-in</p>
                    <p>• Bring a valid ID for verification</p>
                    <p>• Contact us 24 hours before arrival</p>
                    <p>• Check-out is before 11:00 AM</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="h-6 w-6 text-sky-500" />
                </div>
                <h3 className="font-semibold mb-2">Check Your Email</h3>
                <p className="text-sm text-gray-600">
                  We've sent a confirmation email with all the details
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="font-semibold mb-2">Prepare for Your Stay</h3>
                <p className="text-sm text-gray-600">
                  Pack your bags and get ready for a great experience
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600">
                  Contact our 24/7 support team anytime
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}