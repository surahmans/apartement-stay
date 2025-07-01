'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  UserPlus,
  DollarSign,
  TrendingUp,
  Users,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function ResellerRegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    website: '',
    experience: '',
    motivation: '',
    agreeToTerms: false,
    agreeToCommission: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (!formData.agreeToTerms || !formData.agreeToCommission) {
      setError('Please agree to all terms and conditions')
      setIsLoading(false)
      return
    }

    try {
      // In real app, make API call to register reseller
      console.log('Reseller registration data:', formData)

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      setSuccess(true)

      // Redirect after success
      setTimeout(() => {
        router.push('/reseller/dashboard')
      }, 2000)
    } catch (error) {
      console.error('Registration error:', error)
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Registration Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              Your reseller application has been submitted. We'll review it and get back to you within 24 hours.
            </p>
            <Button onClick={() => router.push('/reseller/dashboard')} className="w-full">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-sky-600 hover:text-sky-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserPlus className="h-12 w-12 text-amber-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Become a Reseller Partner
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our affiliate program and start earning attractive commissions by promoting premium apartment rentals.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <DollarSign className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Up to 15% Commission</h3>
              <p className="text-gray-600 text-sm">
                Earn competitive commissions on every successful booking
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <TrendingUp className="h-12 w-12 text-sky-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Marketing Support</h3>
              <p className="text-gray-600 text-sm">
                Get promotional materials and marketing resources
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Dedicated Support</h3>
              <p className="text-gray-600 text-sm">
                Personal account manager and 24/7 partner support
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>Reseller Application Form</CardTitle>
            <CardDescription>
              Fill out the form below to apply for our reseller program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+62 XXX XXXX XXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyName">Company/Business Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website/Social Media</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com or social media profile"
                  />
                </div>
              </div>

              {/* Account Security */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Account Security</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Minimum 8 characters"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              </div>

              {/* Background Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Background Information</h3>

                <div>
                  <Label htmlFor="experience">Relevant Experience</Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Tell us about your experience in sales, marketing, or hospitality..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="motivation">Why do you want to become a reseller?</Label>
                  <Textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    placeholder="Share your motivation and how you plan to promote our apartments..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Terms & Conditions</h3>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleCheckboxChange('agreeToTerms', checked as boolean)}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                      I agree to the <Link href="/terms" className="text-sky-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-sky-600 hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>


                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToCommission"
                      checked={formData.agreeToCommission}
                      onCheckedChange={(checked) => handleCheckboxChange('agreeToCommission', checked as boolean)}
                    />
                    <Label htmlFor="agreeToCommission" className="text-sm leading-relaxed">
                      I understand the commission structure and agree to the reseller program terms
                    </Label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-lg py-6"
                >
                  {isLoading ? 'Processing Application...' : 'Submit Application'}
                </Button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Already have an account? <Link href="/reseller/login" className="text-sky-600 hover:underline">Sign in here</Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div >
  )
}
