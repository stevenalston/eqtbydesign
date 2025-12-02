import { Metadata } from 'next'
import Navigation from '@/components/ui/Navigation'
import TeamHero from '@/components/sections/team/TeamHero'
import TeamMembers from '@/components/sections/team/TeamMembers'
import TeamValues from '@/components/sections/team/TeamValues'
import TeamCTA from '@/components/sections/team/TeamCTA'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Our Team | EQT By Design - Equity-Centered Strategic Planning',
  description: 'Meet the EQT By Design team. 25+ years of combined experience in equity-centered strategic planning, community engagement, and organizational change.',
  keywords: [
    'equity consulting team',
    'Annette Miller',
    'EQT By Design',
    'diversity consultants',
    'community engagement experts',
    'strategic planning team',
  ],
}

export default function TeamPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <TeamHero />
      <TeamMembers />
      <TeamValues />
      <TeamCTA />
      <Footer />
    </main>
  )
}
