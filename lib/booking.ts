import { prisma } from './database'
import { addDays, isAfter, isBefore, isEqual } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

export async function generateBookingCode(): Promise<string> {
  const code = `APT-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
  
  // Ensure uniqueness
  const existing = await prisma.booking.findUnique({
    where: { bookingCode: code }
  })
  
  if (existing) {
    return generateBookingCode() // Recursively generate new code
  }
  
  return code
}

export async function checkAvailability(
  apartmentId: string,
  checkIn: Date,
  checkOut: Date
): Promise<boolean> {
  // Check for existing bookings
  const existingBookings = await prisma.booking.findMany({
    where: {
      apartmentId,
      status: { in: ['PENDING', 'CONFIRMED'] },
      OR: [
        {
          checkIn: { lte: checkIn },
          checkOut: { gt: checkIn }
        },
        {
          checkIn: { lt: checkOut },
          checkOut: { gte: checkOut }
        },
        {
          checkIn: { gte: checkIn },
          checkOut: { lte: checkOut }
        }
      ]
    }
  })

  // Check for availability blocks
  const blocks = await prisma.availabilityBlock.findMany({
    where: {
      apartmentId,
      OR: [
        {
          startDate: { lte: checkIn },
          endDate: { gt: checkIn }
        },
        {
          startDate: { lt: checkOut },
          endDate: { gte: checkOut }
        },
        {
          startDate: { gte: checkIn },
          endDate: { lte: checkOut }
        }
      ]
    }
  })

  return existingBookings.length === 0 && blocks.length === 0
}

export async function createBooking(data: {
  userId: string
  apartmentId: string
  checkIn: Date
  checkOut: Date
  guests: number
  guestName: string
  guestEmail: string
  guestPhone: string
  specialRequests?: string
  resellerId?: string
}) {
  const apartment = await prisma.apartment.findUnique({
    where: { id: data.apartmentId }
  })

  if (!apartment) {
    throw new Error('Apartment not found')
  }

  const isAvailable = await checkAvailability(data.apartmentId, data.checkIn, data.checkOut)
  if (!isAvailable) {
    throw new Error('Apartment not available for selected dates')
  }

  const totalNights = Math.ceil((data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 60 * 60 * 24))
  const totalAmount = totalNights * apartment.pricePerNight

  const bookingCode = await generateBookingCode()

  const booking = await prisma.booking.create({
    data: {
      bookingCode,
      userId: data.userId,
      apartmentId: data.apartmentId,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
      totalNights,
      totalAmount,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone,
      specialRequests: data.specialRequests,
      resellerId: data.resellerId,
    },
    include: {
      apartment: true,
      user: true,
      reseller: true,
    }
  })

  // Create commission if booked through reseller
  if (data.resellerId) {
    const reseller = await prisma.reseller.findUnique({
      where: { id: data.resellerId }
    })

    if (reseller) {
      const commissionAmount = (totalAmount * reseller.commissionRate) / 100

      await prisma.commission.create({
        data: {
          resellerId: data.resellerId,
          bookingId: booking.id,
          amount: commissionAmount,
          rate: reseller.commissionRate,
        }
      })
    }
  }

  return booking
}

export async function getBookingsByUser(userId: string) {
  return prisma.booking.findMany({
    where: { userId },
    include: {
      apartment: true,
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getBookingByCode(bookingCode: string) {
  return prisma.booking.findUnique({
    where: { bookingCode },
    include: {
      apartment: true,
      user: true,
      reseller: true,
    }
  })
}