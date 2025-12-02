import { Metadata } from 'next'
import Navigation from '@/components/ui/Navigation'
import ServiceHero from '@/components/sections/services/ServiceHero'
import CivicEngagement from '@/components/sections/services/CivicEngagement'
import Consulting from '@/components/sections/services/Consulting'
import SystemsChange from '@/components/sections/services/SystemsChange'
import ServicesApproach from '@/components/sections/services/ServicesApproach'
import ServicesCTA from '@/components/sections/services/ServicesCTA'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Services | EQT By Design - Equity-Centered Strategic Planning',
  description: 'Explore our three service areas: Civic & Public Engagement, Consulting, and Systems Change & Equitable Design. 25+ years of experience in equity-centered strategic planning.',
  keywords: [
    'civic engagement',
    'public engagement',
    'equity consulting',
    'systems change',
    'equitable design',
    'strategic planning',
    'change management',
    'organizational culture',
    'DEI consulting',
  ],
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ServiceHero />
      <CivicEngagement />
      <Consulting />
      <SystemsChange />
      <ServicesApproach />
      <ServicesCTA />
      <Footer />
    </main>
  )
}
