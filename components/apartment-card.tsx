'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Users, Square, Star } from 'lucide-react'

interface ApartmentCardProps {
  apartment: {
    id: string
    name: string
    type: string
    pricePerNight: number
    maxGuests: number
    area: number
    images: string
    amenities: string
  }
  referralCode?: string
}

export function ApartmentCard({ apartment, referralCode }: ApartmentCardProps) {
  const images = JSON.parse(apartment.images)
  const amenities = JSON.parse(apartment.amenities)
  
  const bookingUrl = referralCode 
    ? `/apartments/${apartment.id}?ref=${referralCode}`
    : `/apartments/${apartment.id}`

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64">
        <Image
          src={images[0] || 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg'}
          alt={apartment.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-900">
            {apartment.type}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-emerald-500">
            <Star className="h-3 w-3 mr-1" />
            4.8
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {apartment.name}
        </h3>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {apartment.maxGuests} guests
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            {apartment.area}m²
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 3).map((amenity: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">+{amenities.length - 3} more</Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              Rp {apartment.pricePerNight.toLocaleString('id-ID')}
            </span>
            <span className="text-gray-500 ml-1">/night</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6">
        <Link href={bookingUrl} className="w-full">
          <Button className="w-full bg-sky-500 hover:bg-sky-600">
            View Details & Book
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}