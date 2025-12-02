'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

const systemsChangeServices = [
  {
    title: 'Change Management Strategy',
    description: 'Comprehensive frameworks for navigating organizational transitions with equity at the center.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Process Design & Improvement',
    description: 'Redesigning workflows and systems to embed equity and inclusion into daily operations.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Cultural Transformation',
    description: 'Guiding organizations through deep cultural shifts that create lasting, inclusive environments.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Policy & Systems Analysis',
    description: 'Critical examination of existing policies to identify and address systemic barriers to equity.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Equity-Centered Design Facilitation',
    description: 'Expert facilitation of design thinking sessions that center diverse perspectives and voices.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
  },
  {
    title: 'Team Building & Professional Development',
    description: 'Workshops and training programs that build capacity for equity-centered work across teams.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
]

const processSteps = [
  { step: 1, title: 'Assess', description: 'Understanding your current systems and challenges' },
  { step: 2, title: 'Design', description: 'Co-creating equitable solutions with stakeholders' },
  { step: 3, title: 'Implement', description: 'Guided execution with ongoing support' },
  { step: 4, title: 'Sustain', description: 'Building capacity for lasting transformation' },
]

export default function SystemsChange() {
  return (
    <section id="systems-change" className="py-24 bg-cream relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute bottom-0 left-0 w-1/2 h-96 bg-gradient-to-t from-sage/10 to-transparent"
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
          transition={{ duration: 0.8 }}
        >
          {/* Service number badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-sage/20 text-sage-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="w-6 h-6 rounded-full bg-sage text-white flex items-center justify-center text-xs font-bold">3</span>
            Service Area
          </motion.div>

          <div className="max-w-3xl">
            <h2 className="font-serif text-display-md text-teal mb-6">
              Systems Change & Equitable Design
            </h2>
            <p className="text-xl text-teal-700 leading-relaxed">
              EQT By Design works with you to develop smart, inclusive processes that support your
              community and organizational goals. We partner with you to create lasting, systemic
              transformation that centers equity in every decision.
            </p>
          </div>
        </motion.div>

        {/* Process timeline */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-serif text-2xl text-teal mb-8 text-center">Our Process</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-terracotta via-coral to-sage transform -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Step circle */}
                  <motion.div
                    className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-md flex items-center justify-center border-4 border-terracotta"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <span className="text-2xl font-bold text-terracotta">{step.step}</span>
                  </motion.div>
                  <h4 className="font-serif text-lg text-teal mb-2">{step.title}</h4>
                  <p className="text-teal-700 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Services grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-serif text-2xl text-teal mb-8 text-center">
            Systems Change Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemsChangeServices.map((service, index) => (
              <Card key={service.title} className="group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-sage/20 to-teal/10 flex items-center justify-center mb-4 text-sage"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Title */}
                  <h4 className="font-serif text-lg text-teal mb-2 group-hover:text-terracotta transition-colors">
                    {service.title}
                  </h4>

                  {/* Description */}
                  <p className="text-teal-700 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
