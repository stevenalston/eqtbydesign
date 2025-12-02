'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

const articles = [
  {
    title: 'Building Trust in Diverse Communities',
    excerpt: 'Strategies for establishing authentic relationships that transcend cultural and linguistic barriers.',
    category: 'Community Engagement',
    readTime: '5 min read',
    date: 'November 2024',
  },
  {
    title: 'Equity vs. Equality: Understanding the Difference',
    excerpt: 'Why treating everyone the same isn\'t always fair, and how to design systems that address root causes.',
    category: 'Equity Fundamentals',
    readTime: '6 min read',
    date: 'October 2024',
  },
  {
    title: 'The Role of Data in Equitable Design',
    excerpt: 'How to collect, analyze, and use data without perpetuating existing biases and inequities.',
    category: 'Systems Change',
    readTime: '7 min read',
    date: 'October 2024',
  },
  {
    title: 'Culturally Responsive Survey Design',
    excerpt: 'Best practices for creating surveys that reach across language and cultural barriers.',
    category: 'Community Engagement',
    readTime: '4 min read',
    date: 'September 2024',
  },
  {
    title: 'Leading Change from Within',
    excerpt: 'How internal champions can drive organizational transformation toward equity and inclusion.',
    category: 'Organizational Change',
    readTime: '6 min read',
    date: 'September 2024',
  },
  {
    title: 'The Intersectionality Imperative',
    excerpt: 'Why considering multiple identity dimensions is essential for effective engagement.',
    category: 'Equity Fundamentals',
    readTime: '5 min read',
    date: 'August 2024',
  },
]

const categories = [
  'All',
  'Community Engagement',
  'Systems Change',
  'Equity Fundamentals',
  'Organizational Change',
]

export default function ArticleGrid() {
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
                  index === 0
                    ? 'bg-teal text-white'
                    : 'bg-cream text-teal-700 hover:bg-teal/10'
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card key={article.title} className="group h-full cursor-pointer">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="h-full flex flex-col"
              >
                {/* Image placeholder */}
                <div className="aspect-[16/9] bg-gradient-to-br from-sage/10 to-terracotta/10 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-teal/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>

                {/* Category badge */}
                <span className="inline-flex self-start items-center px-3 py-1 rounded-full text-xs font-medium bg-sage/10 text-sage mb-3">
                  {article.category}
                </span>

                {/* Title */}
                <h3 className="font-serif text-lg text-teal dark:text-cream-100 mb-2 group-hover:text-terracotta transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-teal-700 dark:text-cream-300 text-sm leading-relaxed mb-4 flex-grow">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-teal-600 dark:text-cream-400 pt-4 border-t border-sage/20 dark:border-teal-600">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 bg-teal-400 rounded-full" />
                  <span>{article.readTime}</span>
                </div>
              </motion.div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-3 rounded-full border-2 border-teal text-teal font-medium hover:bg-teal hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Articles
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
