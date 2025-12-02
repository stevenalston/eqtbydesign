import { Metadata } from 'next'
import Navigation from '@/components/ui/Navigation'
import LatestHero from '@/components/sections/latest/LatestHero'
import FeaturedArticle from '@/components/sections/latest/FeaturedArticle'
import ArticleGrid from '@/components/sections/latest/ArticleGrid'
import NewsletterSignup from '@/components/sections/latest/NewsletterSignup'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Latest Insights | EQT By Design - Equity & Community Engagement Blog',
  description: 'Stay informed with the latest insights on equity, community engagement, systems change, and organizational transformation from EQT By Design.',
  keywords: [
    'equity insights',
    'community engagement blog',
    'DEI articles',
    'systems change resources',
    'organizational transformation',
    'equity consulting blog',
  ],
}

export default function LatestPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <LatestHero />
      <FeaturedArticle />
      <ArticleGrid />
      <NewsletterSignup />
      <Footer />
    </main>
  )
}
