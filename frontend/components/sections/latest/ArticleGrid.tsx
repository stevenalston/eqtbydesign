'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '@/components/ui/Card'

// All 9 articles
const allArticles = [
  {
    id: 1,
    title: 'Building Trust in Diverse Communities',
    excerpt: 'Strategies for establishing authentic relationships that transcend cultural and linguistic barriers. Learn how community-centered approaches create lasting connections.',
    category: 'Community Engagement',
    readTime: '5 min read',
    date: 'November 2024',
    gradient: 'from-terracotta/20 to-coral/10',
  },
  {
    id: 2,
    title: 'Equity vs. Equality: Understanding the Difference',
    excerpt: 'Why treating everyone the same isn\'t always fair, and how to design systems that address root causes of disparity while promoting true inclusion.',
    category: 'Equity Fundamentals',
    readTime: '6 min read',
    date: 'October 2024',
    gradient: 'from-sage/20 to-teal/10',
  },
  {
    id: 3,
    title: 'The Role of Data in Equitable Design',
    excerpt: 'How to collect, analyze, and use data without perpetuating existing biases. A framework for ethical data practices in community work.',
    category: 'Systems Change',
    readTime: '7 min read',
    date: 'October 2024',
    gradient: 'from-teal/20 to-sage/10',
  },
  {
    id: 4,
    title: 'Culturally Responsive Survey Design',
    excerpt: 'Best practices for creating surveys that reach across language and cultural barriers. Includes templates and real-world examples from Madison communities.',
    category: 'Community Engagement',
    readTime: '4 min read',
    date: 'September 2024',
    gradient: 'from-coral/20 to-terracotta/10',
  },
  {
    id: 5,
    title: 'Leading Change from Within',
    excerpt: 'How internal champions can drive organizational transformation toward equity and inclusion. Stories of success from government and nonprofit sectors.',
    category: 'Organizational Change',
    readTime: '6 min read',
    date: 'September 2024',
    gradient: 'from-sage/15 to-coral/10',
  },
  {
    id: 6,
    title: 'The Intersectionality Imperative',
    excerpt: 'Why considering multiple identity dimensions is essential for effective engagement. A deep dive into Kimberlé Crenshaw\'s framework and its practical applications.',
    category: 'Equity Fundamentals',
    readTime: '5 min read',
    date: 'August 2024',
    gradient: 'from-terracotta/15 to-sage/10',
  },
  {
    id: 7,
    title: 'Community Canvassing Best Practices',
    excerpt: 'Going door-to-door and building relationships within neighborhoods. Learn techniques for reaching those often unheard in traditional outreach efforts.',
    category: 'Community Engagement',
    readTime: '8 min read',
    date: 'August 2024',
    gradient: 'from-teal/15 to-terracotta/10',
  },
  {
    id: 8,
    title: 'Designing Inclusive Public Meetings',
    excerpt: 'From timing to translation services: a comprehensive guide to making public forums accessible to all community members regardless of background.',
    category: 'Systems Change',
    readTime: '6 min read',
    date: 'July 2024',
    gradient: 'from-coral/15 to-sage/10',
  },
  {
    id: 9,
    title: 'Measuring What Matters: Equity Metrics',
    excerpt: 'Beyond traditional KPIs: developing meaningful metrics that capture progress toward equity goals. Includes sample dashboards and reporting frameworks.',
    category: 'Organizational Change',
    readTime: '7 min read',
    date: 'July 2024',
    gradient: 'from-sage/20 to-coral/10',
  },
]

// Initial 6 articles shown on page load
const initialArticles = allArticles.slice(0, 6)

const categories = [
  'All',
  'Community Engagement',
  'Systems Change',
  'Equity Fundamentals',
  'Organizational Change',
]

export default function ArticleGrid() {
  const [visibleArticles, setVisibleArticles] = useState(initialArticles)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  const handleLoadMore = async () => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Load all 9 articles
    setVisibleArticles(allArticles)
    setHasMore(false)
    setIsLoading(false)
  }

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category)
    if (category === 'All') {
      // Reset to initial 6 articles when switching back to "All"
      setVisibleArticles(initialArticles)
      setHasMore(true)
    } else {
      // Filter from all articles for category views
      setVisibleArticles(allArticles.filter(a => a.category === category))
      setHasMore(false)
    }
  }

  return (
    <section className="py-24 bg-white dark:bg-teal-800 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/3 right-0 w-1/3 h-64 bg-linear-to-l from-cream-500 dark:from-teal-700 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.35 }}
        viewport={{ once: true }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-display-sm text-teal dark:text-cream-100 mb-4 md:mb-0">
            All Articles
          </h2>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-teal text-white dark:bg-coral dark:text-teal-900'
                    : 'bg-cream dark:bg-teal-700 text-teal-700 dark:text-cream-200 hover:bg-teal/10 dark:hover:bg-teal-600'
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleArticles.map((article, index) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                  ease: 'easeOut',
                  layout: { duration: 0.3 }
                }}
              >
                <Card className="group h-full cursor-pointer" animateOnScroll={false}>
                  <div className="h-full flex flex-col">
                    {/* Image placeholder with gradient */}
                    <div className={`aspect-[16/9] bg-gradient-to-br ${article.gradient} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
                      {/* Decorative pattern */}
                      <div className="absolute inset-0 opacity-30">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <pattern id={`pattern-${article.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="1.5" fill="currentColor" className="text-teal/20" />
                          </pattern>
                          <rect x="0" y="0" width="100" height="100" fill={`url(#pattern-${article.id})`} />
                        </svg>
                      </div>

                      {/* Icon */}
                      <motion.div
                        className="relative z-10"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <svg className="w-10 h-10 text-teal/40 dark:text-cream/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Category badge */}
                    <span className="inline-flex self-start items-center px-3 py-1 rounded-full text-xs font-medium bg-sage/10 dark:bg-sage/20 text-sage dark:text-sage-300 mb-3">
                      {article.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-serif text-lg text-teal dark:text-cream-100 mb-2 group-hover:text-terracotta dark:group-hover:text-coral transition-colors">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-teal-700 dark:text-cream-300 text-sm leading-relaxed mb-4 flex-grow">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-teal-600 dark:text-cream-400 pt-4 border-t border-sage/20 dark:border-teal-600">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 bg-teal-400 dark:bg-coral rounded-full" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {hasMore && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="relative px-8 py-3 rounded-full border-2 border-teal dark:border-coral text-teal dark:text-coral font-medium hover:bg-teal hover:text-white dark:hover:bg-coral dark:hover:text-teal-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px]"
              whileHover={!isLoading ? { scale: 1.05 } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    {/* Spinning loader */}
                    <motion.span
                      className="w-5 h-5 border-2 border-teal/30 dark:border-coral/30 border-t-teal dark:border-t-coral rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* Animated dots */}
                    <span className="flex items-center">
                      Loading
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
                      >
                        .
                      </motion.span>
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1], delay: 0.2 }}
                      >
                        .
                      </motion.span>
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1], delay: 0.4 }}
                      >
                        .
                      </motion.span>
                    </span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Load More Articles
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}

        {/* All loaded message */}
        <AnimatePresence>
          {!hasMore && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-teal-600 dark:text-cream-400 text-sm flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                You&apos;ve reached the end! Check back soon for more articles.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
