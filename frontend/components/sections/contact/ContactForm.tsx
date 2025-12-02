'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Button from '@/components/ui/Button'

const organizationTypes = [
  'Government / Public Sector',
  'Nonprofit Organization',
  'Corporate / Private Sector',
  'Healthcare',
  'Education',
  'Community Organization',
  'Other',
]

const serviceInterests = [
  'Civic & Public Engagement',
  'Consulting',
  'Systems Change & Equitable Design',
  'Not sure yet',
]

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    organization: '',
    organizationType: '',
    serviceInterest: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isSubmitted) {
    return (
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-soft text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="font-serif text-2xl text-teal mb-4">Thank You!</h3>
        <p className="text-teal-700 mb-6">
          We've received your message and will be in touch within 1-2 business days.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSubmitted(false)
            setFormState({
              name: '',
              email: '',
              organization: '',
              organizationType: '',
              serviceInterest: '',
              message: '',
            })
          }}
        >
          Send Another Message
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="bg-white rounded-2xl p-8 shadow-soft"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <h2 className="font-serif text-2xl text-teal mb-2">Project Inquiry</h2>
      <p className="text-teal-600 mb-8">
        Tell us about your goals and we'll reach out to discuss how we can help.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name & Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-teal mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formState.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-sage/30 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none transition-all text-teal-700"
              placeholder="Jane Smith"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-teal mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formState.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-sage/30 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none transition-all text-teal-700"
              placeholder="jane@organization.org"
            />
          </div>
        </div>

        {/* Organization */}
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-teal mb-2">
            Organization
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formState.organization}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-sage/30 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none transition-all text-teal-700"
            placeholder="Your organization name"
          />
        </div>

        {/* Organization Type & Service Interest */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="organizationType" className="block text-sm font-medium text-teal mb-2">
              Organization Type
            </label>
            <select
              id="organizationType"
              name="organizationType"
              value={formState.organizationType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-sage/30 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none transition-all text-teal-700 bg-white"
            >
              <option value="">Select type...</option>
              {organizationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="serviceInterest" className="block text-sm font-medium text-teal mb-2">
              Service Interest
            </label>
            <select
              id="serviceInterest"
              name="serviceInterest"
              value={formState.serviceInterest}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-sage/30 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none transition-all text-teal-700 bg-white"
            >
              <option value="">Select service...</option>
              {serviceInterests.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-teal mb-2">
            Tell us about your goals *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formState.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-sage/30 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none transition-all text-teal-700 resize-none"
            placeholder="What challenges are you facing? What outcomes are you hoping to achieve?"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
          icon={
            isSubmitting ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            )
          }
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>

        <p className="text-xs text-teal-600 text-center">
          We typically respond within 1-2 business days.
        </p>
      </form>
    </motion.div>
  )
}
