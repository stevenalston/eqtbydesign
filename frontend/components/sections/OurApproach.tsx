'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

const principles = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Human-Centered',
    description: 'We start with people—understanding their needs, experiences, and aspirations. Every design decision is guided by real human stories.',
    color: 'terracotta',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Accessibility First',
    description: 'Beautiful design should be available to everyone. We build with WCAG standards and inclusive design principles from day one.',
    color: 'sage',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Impact Driven',
    description: 'We measure success by outcomes. From increased engagement to community growth, we track what matters for your mission.',
    color: 'teal',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Collaborative',
    description: 'Your expertise + our design skills = powerful solutions. We co-create with your team, ensuring the final product truly serves your community.',
    color: 'coral',
  },
]

export default function OurApproach() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute top-1/4 left-0 w-64 h-64 bg-sage/10 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

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
            Our Approach
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            We combine design expertise with deep commitment to equity,
            creating solutions that are both stunning and purposeful.
          </p>
        </motion.div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((principle, index) => (
            <Card key={principle.title} className="group">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-xl bg-${principle.color}/10 flex items-center justify-center mb-6 text-${principle.color}`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {principle.icon}
                </motion.div>

                {/* Title */}
                <h3 className="font-serif text-2xl text-teal mb-4 group-hover:text-terracotta transition-colors">
                  {principle.title}
                </h3>

                {/* Description */}
                <p className="text-teal-700 leading-relaxed">
                  {principle.description}
                </p>

                {/* Hover indicator */}
                <motion.div
                  className="mt-6 flex items-center text-terracotta text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ x: 5 }}
                >
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>
              </motion.div>
            </Card>
          ))}
        </div>

        {/* Connecting lines visualization */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-4 text-teal-600">
            <div className="w-3 h-3 bg-terracotta rounded-full animate-pulse-slow" />
            <div className="h-0.5 w-16 bg-gradient-to-r from-terracotta to-sage" />
            <div className="w-3 h-3 bg-sage rounded-full animate-pulse-slow" />
            <div className="h-0.5 w-16 bg-gradient-to-r from-sage to-teal" />
            <div className="w-3 h-3 bg-teal rounded-full animate-pulse-slow" />
          </div>
          <p className="mt-4 text-teal-600 text-sm">
            Integrated thinking for holistic solutions
          </p>
        </motion.div>
      </div>
    </section>
  )
}
