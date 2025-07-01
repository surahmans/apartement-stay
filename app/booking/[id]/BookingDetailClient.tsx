'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  ArrowLeft,
  Calendar,
  Users,
  CreditCard,
  Building,
  MapPin,
  Clock,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

// Mock apartment data
const mockApartment = {
  id: '1',
  name: 'Modern Studio Downtown',
  type: 'Studio',
  pricePerNight: 850000,
  maxGuests: 2,
  area: 35,
  location: 'Central Jakarta, Indonesia',
  image: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg'
}

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function BookingPage({ apartmentId }: { apartmentId: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const checkInParam = searchParams?.get('checkIn')
  const checkOutParam = searchParams?.get('checkOut')
  const referralCode = searchParams?.get('ref')

  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [totalNights, setTotalNights] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Form data
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [guests, setGuests] = useState('1')
  const [specialRequests, setSpecialRequests] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const apartment = mockApartment // In real app, fetch by apartmentId

  useEffect(() => {
    if (checkInParam && checkOutParam) {
      const checkInDate = new Date(checkInParam)
      const checkOutDate = new Date(checkOutParam)

      setCheckIn(checkInDate)
      setCheckOut(checkOutDate)

      const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
      setTotalNights(nights)
      setTotalAmount(nights * apartment.pricePerNight)
    }
  }, [checkInParam, checkOutParam, apartment.pricePerNight])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate booking process
    try {
      // In real app, make API call to create booking
      const bookingData = {
        apartmentId,
        checkIn: checkIn?.toISOString(),
        checkOut: checkOut?.toISOString(),
        guests: parseInt(guests),
        guestName,
        guestEmail,
        guestPhone,
        specialRequests,
        paymentMethod,
        referralCode,
        totalAmount
      }

      console.log('Booking data:', bookingData)

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Generate booking code
      const bookingCode = `APT-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

      // Redirect to confirmation page
      router.push(`/booking-confirmation?code=${bookingCode}`)
    } catch (error) {
      console.error('Booking error:', error)
      alert('Booking failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!checkIn || !checkOut) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Booking Request</h2>
          <p className="text-gray-600 mb-4">Please select dates first.</p>
          <Link href={`/apartments/${apartmentId}`}>
            <Button>Go Back</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href={`/apartments/${apartmentId}`} className="inline-flex items-center text-sky-600 hover:text-sky-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Apartment
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">Just a few more details and you're all set!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Guest Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Guest Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="guestName">Full Name *</Label>
                    <Input
                      id="guestName"
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="guestEmail">Email Address *</Label>
                    <Input
                      id="guestEmail"
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="guestPhone">Phone Number *</Label>
                    <Input
                      id="guestPhone"
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+62 XXX XXXX XXXX"
                    />
                  </div>

                  <div>
                    <Label htmlFor="guests">Number of Guests *</Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger id="guests">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: apartment.maxGuests }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1} guest{i > 0 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Any special requests or notes..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Label>Select Payment Method *</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: 'bank-transfer', name: 'Bank Transfer', desc: 'Direct bank transfer' },
                        { id: 'credit-card', name: 'Credit/Debit Card', desc: 'Visa, Mastercard' },
                        { id: 'gopay', name: 'GoPay', desc: 'Digital wallet' },
                        { id: 'ovo', name: 'OVO', desc: 'Digital wallet' },
                        { id: 'dana', name: 'DANA', desc: 'Digital wallet' }
                      ].map((method) => (
                        <label key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="text-sky-500"
                            required
                          />
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-gray-500">{method.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-sky-500 hover:bg-sky-600 text-lg py-6"
              >
                {isLoading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Complete Booking
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Apartment Info */}
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
                      <img
                        src={apartment.image}
                        alt={apartment.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{apartment.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {apartment.location}
                      </div>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {apartment.type}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Dates */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        Check-in
                      </div>
                      <div className="font-medium">
                        {format(checkIn, 'MMM dd, yyyy')}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        Check-out
                      </div>
                      <div className="font-medium">
                        {format(checkOut, 'MMM dd, yyyy')}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        Guests
                      </div>
                      <div className="font-medium">
                        {guests} guest{parseInt(guests) > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Rp {apartment.pricePerNight.toLocaleString('id-ID')} × {totalNights} night{totalNights > 1 ? 's' : ''}
                      </span>
                      <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
                    </div>
                    {referralCode && (
                      <div className="flex justify-between text-sm text-emerald-600">
                        <span>Referral Code: {referralCode}</span>
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
