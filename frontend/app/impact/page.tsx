import { Metadata } from 'next'
import Navigation from '@/components/ui/Navigation'
import ImpactHero from '@/components/sections/impact/ImpactHero'
import ImpactStats from '@/components/sections/impact/ImpactStats'
import CaseStudies from '@/components/sections/impact/CaseStudies'
import Testimonials from '@/components/sections/impact/Testimonials'
import ImpactCTA from '@/components/sections/impact/ImpactCTA'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Our Impact | EQT By Design - Results & Case Studies',
  description: 'See how EQT By Design has helped organizations create meaningful systemic change. Explore our case studies, impact metrics, and client success stories.',
  keywords: [
    'equity consulting results',
    'community engagement case studies',
    'organizational change success',
    'DEI impact',
    'systems change outcomes',
    'client testimonials',
  ],
}

export default function ImpactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ImpactHero />
      <ImpactStats />
      <CaseStudies />
      <Testimonials />
      <ImpactCTA />
      <Footer />
    </main>
  )
}
