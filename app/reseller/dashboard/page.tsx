'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Calendar,
  Copy,
  Share,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink
} from 'lucide-react'

// Mock data for demo
const mockResellerData = {
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    referralCode: 'JOHN2024',
    isApproved: true,
    commissionRate: 12.5,
    joinedDate: '2024-01-15'
  },
  stats: {
    totalClicks: 145,
    totalBookings: 8,
    totalCommissions: 2850000,
    paidCommissions: 1950000,
    pendingCommissions: 900000,
    thisMonthBookings: 3,
    thisMonthCommissions: 750000
  },
  recentBookings: [
    {
      id: 'APT-2024-001',
      apartmentName: 'Modern Studio Downtown',
      guestName: 'Alice Johnson',
      amount: 2550000,
      commission: 318750,
      status: 'CONFIRMED',
      createdAt: '2024-02-10'
    },
    {
      id: 'APT-2024-002',
      apartmentName: 'Luxury 1BR with City View',
      guestName: 'Bob Smith',
      amount: 3600000,
      commission: 450000,
      status: 'CONFIRMED',
      createdAt: '2024-02-08'
    },
    {
      id: 'APT-2024-003',
      apartmentName: 'Spacious 2BR Family Suite',
      guestName: 'Carol Wilson',
      amount: 5400000,
      commission: 675000,
      status: 'PENDING',
      createdAt: '2024-02-05'
    }
  ]
}

export default function ResellerDashboardPage() {
  const [reseller, setReseller] = useState(mockResellerData)
  const [referralUrl, setReferralUrl] = useState('')

  useEffect(() => {
    // Generate referral URL
    const baseUrl = window.location.origin
    setReferralUrl(`${baseUrl}/apartments?ref=${reseller.user.referralCode}`)
  }, [reseller.user.referralCode])

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralUrl)
    alert('Referral link copied to clipboard!')
  }

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Premium Apartment Rentals',
        text: 'Check out these amazing apartments!',
        url: referralUrl
      })
    } else {
      copyReferralLink()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-emerald-100 text-emerald-800'
      case 'PENDING':
        return 'bg-amber-100 text-amber-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <CheckCircle className="h-4 w-4" />
      case 'PENDING':
        return <Clock className="h-4 w-4" />
      case 'CANCELLED':
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  if (!reseller.user.isApproved) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Clock className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Application Under Review
            </h2>
            <p className="text-gray-600 mb-4">
              Your reseller application is being reviewed. We'll notify you once it's approved.
            </p>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {reseller.user.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your referrals and track your earnings
              </p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">
                Commission Rate: {reseller.user.commissionRate}%
              </Badge>
              <div className="text-sm text-gray-600">
                Member since {new Date(reseller.user.joinedDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                  <p className="text-2xl font-bold text-gray-900">{reseller.stats.totalClicks}</p>
                </div>
                <Eye className="h-8 w-8 text-sky-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{reseller.stats.totalBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Earned</p>
                  <p className="text-2xl font-bold text-gray-900">
                    Rp {reseller.stats.totalCommissions.toLocaleString('id-ID')}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Payout</p>
                  <p className="text-2xl font-bold text-gray-900">
                    Rp {reseller.stats.pendingCommissions.toLocaleString('id-ID')}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-6">
                  {/* This Month Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle>This Month Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-emerald-50 rounded-lg">
                          <div className="text-2xl font-bold text-emerald-600">
                            {reseller.stats.thisMonthBookings}
                          </div>
                          <div className="text-sm text-emerald-700">New Bookings</div>
                        </div>
                        <div className="text-center p-4 bg-amber-50 rounded-lg">
                          <div className="text-2xl font-bold text-amber-600">
                            Rp {reseller.stats.thisMonthCommissions.toLocaleString('id-ID')}
                          </div>
                          <div className="text-sm text-amber-700">Commissions Earned</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Marketing Tips */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Marketing Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-sky-500 rounded-full mt-2"></div>
                          <p className="text-sm text-gray-600">
                            Share your referral link on social media to reach more potential guests
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                          <p className="text-sm text-gray-600">
                            Target business travelers and families looking for extended stays
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                          <p className="text-sm text-gray-600">
                            Highlight unique amenities and prime locations in your promotions
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="bookings">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reseller.recentBookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(booking.status)}>
                                {getStatusIcon(booking.status)}
                                <span className="ml-1">{booking.status}</span>
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {new Date(booking.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">
                                +Rp {booking.commission.toLocaleString('id-ID')}
                              </div>
                              <div className="text-sm text-gray-500">Commission</div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium">{booking.apartmentName}</h4>
                            <p className="text-sm text-gray-600">
                              Guest: {booking.guestName} • Booking: {booking.id}
                            </p>
                            <p className="text-sm text-gray-600">
                              Total Amount: Rp {booking.amount.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="earnings">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Earnings Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Total Commissions Earned</span>
                          <span className="font-semibold">
                            Rp {reseller.stats.totalCommissions.toLocaleString('id-ID')}
                          </span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Paid Out</span>
                          <span className="font-semibold text-emerald-600">
                            Rp {reseller.stats.paidCommissions.toLocaleString('id-ID')}
                          </span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Pending Payout</span>
                          <span className="font-semibold text-amber-600">
                            Rp {reseller.stats.pendingCommissions.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Payouts are processed monthly. Your next payout is scheduled for the 1st of next month.
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Referral Link */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Referral Link</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <div className="text-sm font-mono break-all text-gray-600">
                        {referralUrl}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={copyReferralLink} variant="outline" size="sm" className="flex-1">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button onClick={shareReferralLink} variant="outline" size="sm" className="flex-1">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                    <Button className="w-full" asChild>
                      <a href={referralUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Preview Link
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View All Apartments
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Marketing Materials
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Booking History
                  </Button>
                </CardContent>
              </Card>

              {/* Support */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Contact our reseller support team for assistance with your account or marketing strategies.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}