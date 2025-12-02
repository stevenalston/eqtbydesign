import { Metadata } from 'next'
import Navigation from '@/components/ui/Navigation'
import ContactHero from '@/components/sections/contact/ContactHero'
import ContactForm from '@/components/sections/contact/ContactForm'
import ContactInfo from '@/components/sections/contact/ContactInfo'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Contact Us | EQT By Design - Start a Conversation',
  description: 'Ready to create meaningful change? Contact EQT By Design to discuss your equity consulting, community engagement, or organizational transformation goals.',
  keywords: [
    'contact equity consultant',
    'community engagement inquiry',
    'DEI consulting contact',
    'strategic planning consultation',
    'Madison Wisconsin consulting',
  ],
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ContactHero />
      <div className="bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
