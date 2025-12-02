'use client'

import { motion } from 'framer-motion'

const consultingServices = [
  {
    title: 'Environmental Scans & Organizational Assessments',
    description: 'Comprehensive analysis of your organization\'s current state, culture, and equity landscape to identify opportunities for growth.',
  },
  {
    title: 'Stakeholder Analysis & Mapping',
    description: 'Identifying and understanding key stakeholders, their relationships, and influence to inform strategic decisions.',
  },
  {
    title: 'Strategic Recommendations Development',
    description: 'Data-driven, equity-centered recommendations tailored to your organizational context and goals.',
  },
  {
    title: 'Implementation Roadmapping',
    description: 'Clear, actionable plans with milestones and metrics to guide your equity and inclusion journey.',
  },
  {
    title: 'Leadership Coaching & Development',
    description: 'Building capacity in your leadership team to champion and sustain equity-centered change.',
  },
  {
    title: 'ERG Support & Development',
    description: 'Guidance for establishing and strengthening Employee Resource Groups as drivers of organizational culture.',
  },
]

export default function Consulting() {
  return (
    <section id="consulting" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/4 right-0 w-1/2 h-96 bg-gradient-to-l from-cream-100/50 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Service number badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-teal/10 text-teal px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center text-xs font-bold">2</span>
            Service Area
          </motion.div>

          <div className="max-w-3xl">
            <h2 className="font-serif text-display-md text-teal mb-6">
              Consulting
            </h2>
            <p className="text-xl text-teal-700 leading-relaxed">
              EQT By Design helps you better understand the context, challenges, and opportunities
              that set the stage for reaching your organizational impact goals for systems change
              that improve strategies for equitable and inclusive design.
            </p>
          </div>
        </motion.div>

        {/* Services list with alternating layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left column - Services list */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {consultingServices.map((service, index) => (
              <motion.div
                key={service.title}
                className="group bg-cream/50 hover:bg-cream rounded-xl p-6 transition-all duration-300 cursor-pointer border border-transparent hover:border-sage/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 8 }}
              >
                <div className="flex items-start gap-4">
                  {/* Number indicator */}
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center text-sm font-bold group-hover:bg-teal group-hover:text-white transition-colors">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-teal mb-2 group-hover:text-terracotta transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-teal-700 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right column - Visual/Stats */}
          <motion.div
            className="lg:sticky lg:top-32 self-start"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-teal to-teal-600 rounded-2xl p-8 text-white shadow-lg">
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-4"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </motion.div>
                <h3 className="font-serif text-2xl mb-2">Trusted Partnership</h3>
                <p className="text-cream-100 text-sm">
                  We work alongside you, not above you
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="bg-white/10 rounded-xl p-4 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <motion.span
                    className="block text-3xl font-bold"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    25+
                  </motion.span>
                  <span className="text-cream-100 text-sm">Years Experience</span>
                </motion.div>
                <motion.div
                  className="bg-white/10 rounded-xl p-4 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <motion.span
                    className="block text-3xl font-bold"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    4
                  </motion.span>
                  <span className="text-cream-100 text-sm">Sectors Served</span>
                </motion.div>
              </div>

              {/* Sectors */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-cream-100 mb-3">Sectors We Serve:</p>
                <div className="flex flex-wrap gap-2">
                  {['Government', 'Community', 'Corporate', 'Nonprofit'].map((sector) => (
                    <span
                      key={sector}
                      className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
