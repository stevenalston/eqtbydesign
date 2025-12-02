import Navigation from '@/components/ui/Navigation'
import Hero from '@/components/sections/Hero'
import EquityChallenge from '@/components/sections/EquityChallenge'
import OurApproach from '@/components/sections/OurApproach'
import FeaturedImpact from '@/components/sections/FeaturedImpact'
import ServicesOverview from '@/components/sections/ServicesOverview'
import Footer from '@/components/sections/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <EquityChallenge />
      <OurApproach />
      <FeaturedImpact />
      <ServicesOverview />
      <Footer />
    </main>
  )
}
