import { prisma } from './database'
import { v4 as uuidv4 } from 'uuid'

export async function generateReferralCode(): Promise<string> {
  const code = uuidv4().substr(0, 8).toUpperCase()
  
  // Ensure uniqueness
  const existing = await prisma.reseller.findUnique({
    where: { referralCode: code }
  })
  
  if (existing) {
    return generateReferralCode()
  }
  
  return code
}

export async function createReseller(userId: string) {
  const referralCode = await generateReferralCode()
  
  return prisma.reseller.create({
    data: {
      userId,
      referralCode,
    },
    include: { user: true }
  })
}

export async function getResellerByCode(referralCode: string) {
  return prisma.reseller.findUnique({
    where: { referralCode },
    include: { user: true }
  })
}

export async function getResellerStats(resellerId: string) {
  const reseller = await prisma.reseller.findUnique({
    where: { id: resellerId },
    include: {
      referredBookings: {
        include: { apartment: true }
      },
      commissions: {
        include: { booking: { include: { apartment: true } } }
      }
    }
  })

  if (!reseller) return null

  const totalBookings = reseller.referredBookings.length
  const totalRevenue = reseller.referredBookings.reduce((sum, booking) => sum + booking.totalAmount, 0)
  const totalCommissions = reseller.commissions.reduce((sum, commission) => sum + commission.amount, 0)
  const paidCommissions = reseller.commissions
    .filter(c => c.status === 'PAID')
    .reduce((sum, commission) => sum + commission.amount, 0)

  return {
    reseller,
    stats: {
      totalBookings,
      totalRevenue,
      totalCommissions,
      paidCommissions,
      pendingCommissions: totalCommissions - paidCommissions,
    }
  }
}