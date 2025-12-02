'use client'

import { motion } from 'framer-motion'

const approachPillars = [
  {
    title: 'Community-Centered Process',
    description: 'Centering the voices of those most impacted by decisions and outcomes.',
    color: 'terracotta',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Equity-First Design',
    description: 'Building equity into every step, not treating it as an afterthought.',
    color: 'teal',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    title: 'Systems Thinking',
    description: 'Understanding interconnections and addressing root causes, not just symptoms.',
    color: 'sage',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: 'Collaborative Partnership',
    description: 'Working alongside you as true partners, sharing power and expertise.',
    color: 'coral',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    ),
  },
]

export default function ServicesApproach() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #3D5A80 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
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
            Our Approach
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            At the core of all our services is a commitment to principles that guide
            everything we do — ensuring that equity isn't just a goal, but a practice.
          </p>
        </motion.div>

        {/* Approach pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {approachPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`bg-gradient-to-br from-${pillar.color}/5 to-transparent rounded-2xl p-8 border border-${pillar.color}/10 h-full`}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.1)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-${pillar.color}/10 flex items-center justify-center mb-6 text-${pillar.color}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {pillar.icon}
                </motion.div>

                {/* Content */}
                <h3 className="font-serif text-2xl text-teal mb-3 group-hover:text-terracotta transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-teal-700 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Decorative corner */}
                <div className={`absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-${pillar.color}/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity`} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Tagline */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <blockquote className="relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-6xl text-terracotta/20 font-serif">"</div>
            <p className="font-serif text-2xl md:text-3xl text-teal italic max-w-4xl mx-auto leading-relaxed">
              Design thinking for inclusive, equitable, people-centered outcomes
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
