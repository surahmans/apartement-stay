'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CalendarDays } from 'lucide-react'
import { addDays, format } from 'date-fns'

interface BookingCalendarProps {
  onDateSelect: (checkIn: Date, checkOut: Date) => void
  unavailableDates?: Date[]
  minStay?: number
}

export function BookingCalendar({ 
  onDateSelect, 
  unavailableDates = [], 
  minStay = 1 
}: BookingCalendarProps) {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [selectingCheckOut, setSelectingCheckOut] = useState(false)

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return

    if (!checkIn || (!selectingCheckOut && date <= checkIn)) {
      setCheckIn(date)
      setCheckOut(undefined)
      setSelectingCheckOut(true)
    } else if (selectingCheckOut) {
      if (date > checkIn) {
        setCheckOut(date)
        setSelectingCheckOut(false)
        onDateSelect(checkIn, date)
      }
    } else {
      setCheckIn(date)
      setCheckOut(undefined)
      setSelectingCheckOut(true)
    }
  }

  const isDateDisabled = (date: Date) => {
    // Disable past dates
    if (date < new Date()) return true
    
    // Disable unavailable dates
    if (unavailableDates.some(unavailableDate => 
      date.toDateString() === unavailableDate.toDateString()
    )) return true

    // If selecting checkout, disable dates before checkin + minStay
    if (selectingCheckOut && checkIn) {
      return date <= addDays(checkIn, minStay - 1)
    }

    return false
  }

  const clearSelection = () => {
    setCheckIn(undefined)
    setCheckOut(undefined)
    setSelectingCheckOut(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CalendarDays className="h-5 w-5" />
          <span>Select Dates</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={selectingCheckOut ? checkOut : checkIn}
            onSelect={handleDateSelect}
            disabled={isDateDisabled}
            className="rounded-md border"
          />
          
          {checkIn && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Check-in:</span>
                <span className="font-medium">{format(checkIn, 'PPP')}</span>
              </div>
              {checkOut && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Check-out:</span>
                  <span className="font-medium">{format(checkOut, 'PPP')}</span>
                </div>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearSelection}
                className="w-full"
              >
                Clear Selection
              </Button>
            </div>
          )}
          
          {selectingCheckOut && checkIn && (
            <div className="p-3 bg-sky-50 rounded-lg text-sm text-sky-700">
              Now select your check-out date (minimum {minStay} night{minStay > 1 ? 's' : ''})
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}