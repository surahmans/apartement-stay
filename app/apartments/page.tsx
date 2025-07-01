'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ApartmentCard } from '@/components/apartment-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, MapPin, SlidersHorizontal } from 'lucide-react'

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
  },
  {
    id: '4',
    name: 'Executive Studio',
    type: 'Studio',
    pricePerNight: 950000,
    maxGuests: 2,
    area: 40,
    images: JSON.stringify([
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ]),
    amenities: JSON.stringify(['WiFi', 'AC', 'Kitchen', 'TV', 'Gym', 'Pool'])
  },
  {
    id: '5',
    name: 'Cozy 1BR Near Mall',
    type: '1 Bedroom',
    pricePerNight: 1100000,
    maxGuests: 4,
    area: 50,
    images: JSON.stringify([
      'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg'
    ]),
    amenities: JSON.stringify(['WiFi', 'AC', 'Kitchen', 'TV', 'Parking', 'Pool'])
  },
  {
    id: '6',
    name: 'Premium 3BR Penthouse',
    type: '3 Bedrooms',
    pricePerNight: 2500000,
    maxGuests: 8,
    area: 120,
    images: JSON.stringify([
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg'
    ]),
    amenities: JSON.stringify(['WiFi', 'AC', 'Kitchen', 'TV', 'Balcony', 'Gym', 'Pool', 'Parking'])
  }
]

export default function ApartmentsPage() {
  const searchParams = useSearchParams()
  const referralCode = searchParams?.get('ref')
  
  const [filteredApartments, setFilteredApartments] = useState(mockApartments)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [priceRange, setPriceRange] = useState([500000, 3000000])
  const [guestFilter, setGuestFilter] = useState('all')
  const [sortBy, setSortBy] = useState('price-asc')

  const apartmentTypes = ['all', 'Studio', '1 Bedroom', '2 Bedrooms', '3 Bedrooms']
  const guestOptions = ['all', '1-2', '3-4', '5+']

  useEffect(() => {
    let filtered = mockApartments.filter(apartment => {
      // Search query filter
      if (searchQuery && !apartment.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !apartment.type.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Type filter
      if (selectedType !== 'all' && apartment.type !== selectedType) {
        return false
      }

      // Price range filter
      if (apartment.pricePerNight < priceRange[0] || apartment.pricePerNight > priceRange[1]) {
        return false
      }

      // Guest filter
      if (guestFilter !== 'all') {
        if (guestFilter === '1-2' && apartment.maxGuests > 2) return false
        if (guestFilter === '3-4' && (apartment.maxGuests < 3 || apartment.maxGuests > 4)) return false
        if (guestFilter === '5+' && apartment.maxGuests < 5) return false
      }

      return true
    })

    // Sort apartments
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.pricePerNight - b.pricePerNight
        case 'price-desc':
          return b.pricePerNight - a.pricePerNight
        case 'guests-asc':
          return a.maxGuests - b.maxGuests
        case 'guests-desc':
          return b.maxGuests - a.maxGuests
        case 'area-asc':
          return a.area - b.area
        case 'area-desc':
          return b.area - a.area
        default:
          return 0
      }
    })

    setFilteredApartments(filtered)
  }, [searchQuery, selectedType, priceRange, guestFilter, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedType('all')
    setPriceRange([500000, 3000000])
    setGuestFilter('all')
    setSortBy('price-asc')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Available Apartments</h1>
              <p className="text-gray-600 mt-2">
                {filteredApartments.length} apartments found
                {referralCode && (
                  <Badge variant="secondary" className="ml-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    Referred by: {referralCode}
                  </Badge>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <SlidersHorizontal className="h-5 w-5 mr-2" />
                    Filters
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label htmlFor="search">Search</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="search"
                      placeholder="Search apartments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <Label>Apartment Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {apartmentTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type === 'all' ? 'All Types' : type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <Label>Price Range (per night)</Label>
                  <div className="mt-4 mb-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={3000000}
                      min={500000}
                      step={50000}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Rp {priceRange[0].toLocaleString('id-ID')}</span>
                    <span>Rp {priceRange[1].toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Guests Filter */}
                <div>
                  <Label>Number of Guests</Label>
                  <Select value={guestFilter} onValueChange={setGuestFilter}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {guestOptions.map(option => (
                        <SelectItem key={option} value={option}>
                          {option === 'all' ? 'Any Number' : `${option} guests`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div>
                  <Label>Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="guests-asc">Guests: Few to Many</SelectItem>
                      <SelectItem value="guests-desc">Guests: Many to Few</SelectItem>
                      <SelectItem value="area-asc">Area: Small to Large</SelectItem>
                      <SelectItem value="area-desc">Area: Large to Small</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Apartments Grid */}
          <div className="lg:col-span-3">
            {filteredApartments.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-gray-500">
                  <Filter className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No apartments found</h3>
                  <p>Try adjusting your filters to see more options.</p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4">
                    Clear All Filters
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredApartments.map((apartment) => (
                  <ApartmentCard 
                    key={apartment.id} 
                    apartment={apartment} 
                    referralCode={referralCode || undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}