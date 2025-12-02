'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

const featuredArticle = {
  title: 'The Power of Listen, Reflect, Respond: A Framework for Community Engagement',
  excerpt: 'How our signature approach ensures community input leads to meaningful action. Learn the three-phase methodology that has transformed how organizations connect with their communities.',
  category: 'Community Engagement',
  readTime: '8 min read',
  date: 'November 2024',
  author: 'Annette Miller',
}

export default function FeaturedArticle() {
  return (
    <section className="py-16 bg-cream relative overflow-hidden">
      {/* Floating decorative shapes */}
      <motion.svg
        className="absolute top-10 right-10 w-16 h-16 text-terracotta/10"
        viewBox="0 0 100 100"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ opacity: { delay: 0.8 }, y: { duration: 8, repeat: Infinity }, rotate: { duration: 10, repeat: Infinity } }}
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.svg>

      <motion.div
        className="absolute bottom-20 left-10 w-10 h-10 rounded-full border-2 border-sage/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: [1, 1.1, 1] }}
        transition={{ opacity: { delay: 0.9 }, scale: { duration: 6, repeat: Infinity } }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-terracotta/20 to-sage/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-terracotta/30 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-sage/30 rounded-full blur-xl" />

                {/* Placeholder icon */}
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-white/50 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-10 h-10 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <p className="text-teal-600 text-sm">Featured Article</p>
                </div>
              </div>

              {/* Accent shape */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-sage/20 rounded-full -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-terracotta/10 text-terracotta">
                  Featured
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage/10 text-sage">
                  {featuredArticle.category}
                </span>
              </div>

              <h2 className="font-serif text-display-sm text-teal mb-4">
                {featuredArticle.title}
              </h2>

              <p className="text-teal-700 text-lg leading-relaxed mb-6">
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm text-teal-600 mb-6">
                <span>By {featuredArticle.author}</span>
                <span className="w-1 h-1 bg-teal-400 rounded-full" />
                <span>{featuredArticle.date}</span>
                <span className="w-1 h-1 bg-teal-400 rounded-full" />
                <span>{featuredArticle.readTime}</span>
              </div>

              <Button
                variant="primary"
                href="#"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                }
              >
                Read Article
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
