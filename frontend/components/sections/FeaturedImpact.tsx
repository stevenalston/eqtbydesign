'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const caseStudies = [
  {
    title: 'Inclusive Community Engagement',
    client: 'City of Metro Regional Planning',
    challenge: 'Ensuring all community voices are heard in urban development planning',
    impact: {
      stat: '250%',
      label: 'increase in diverse community participation',
    },
    tags: ['Civic Engagement', 'Public Outreach', 'Inclusive Facilitation'],
    gradient: 'from-terracotta to-coral',
  },
  {
    title: 'Organizational Equity Transformation',
    client: 'Statewide Nonprofit Alliance',
    challenge: 'Building equitable processes across a network of 50+ organizations',
    impact: {
      stat: '50+',
      label: 'organizations transformed',
    },
    tags: ['Systems Change', 'Strategic Planning', 'Change Management'],
    gradient: 'from-teal to-sage',
  },
  {
    title: 'Cultural Design Initiative',
    client: 'Corporate DEI Council',
    challenge: 'Creating lasting organizational culture change for equity',
    impact: {
      stat: '3x',
      label: 'improvement in inclusion metrics',
    },
    tags: ['Consulting', 'Cultural Design', 'DEI Strategy'],
    gradient: 'from-sage to-teal',
  },
]

export default function FeaturedImpact() {
  return (
    <section className="py-24 bg-cream-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sage/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-display-md text-teal mb-6">
            Featured Impact
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            Real engagements. Real results. Real systemic change for communities and organizations that matter.
          </p>
        </motion.div>

        {/* Case studies grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <Card key={study.title} className="flex flex-col h-full group cursor-pointer">
              <motion.div
                className="flex flex-col h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Gradient header */}
                <div className={`h-48 -m-6 mb-6 rounded-t-xl bg-gradient-to-br ${study.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="relative z-10 text-center text-white p-6">
                    <div className="text-5xl font-bold mb-2">{study.impact.stat}</div>
                    <div className="text-sm uppercase tracking-wider opacity-90">
                      {study.impact.label}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="text-sm text-terracotta font-medium mb-2">
                    {study.client}
                  </div>
                  <h3 className="font-serif text-2xl text-teal mb-3 group-hover:text-terracotta transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-teal-700 mb-4 leading-relaxed">
                    {study.challenge}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-cream-100 text-teal-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Read more link */}
                <motion.div
                  className="flex items-center text-terracotta font-medium mt-auto pt-4 border-t border-cream-200"
                  whileHover={{ x: 5 }}
                >
                  Read the story
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>
              </motion.div>
            </Card>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lift max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-6">
            <svg className="w-12 h-12 text-coral flex-shrink-0" fill="currentColor" viewBox="0 0 32 32">
              <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
            </svg>
            <div className="flex-grow">
              <p className="text-xl text-teal-700 leading-relaxed mb-6 italic">
                "Working with EQT By Design transformed not just our processes,
                but how we think about engaging our community. Their commitment to equity
                and inclusive facilitation matched our own values perfectly."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-warm" />
                <div>
                  <div className="font-semibold text-teal">Maria Rodriguez</div>
                  <div className="text-sm text-teal-600">Director of Community Engagement, City of Metro</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button
            size="lg"
            variant="primary"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          >
            Explore Our Impact
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
