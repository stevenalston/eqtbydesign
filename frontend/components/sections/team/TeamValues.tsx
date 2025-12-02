'use client'

import { motion } from 'framer-motion'

const values = [
  {
    title: 'Mission',
    content: 'EQT By Design exists to bring diverse voices into the center of decision-making. Diverse voices in decision-making builds the pathway to overall happiness, health and well-being.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'terracotta',
  },
  {
    title: 'Vision',
    content: 'Each person is inclusively welcomed in their community as they realize their own self-defined happiness and well-being, and actively participate, prosper, and reach their full potential with no limits!',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    color: 'sage',
  },
]

const impacts = [
  {
    title: 'Impact to EQT By Design',
    items: [
      'Representing diverse voices without marginalization, misappropriation or perpetuating oppressive systems',
      'Maintaining an awareness of its own bias and unconscious actions and beliefs when working with clients, community, and constituencies',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Impact to Clients',
    items: [
      'Co-creating solutions that are sustainable and root cause oriented',
      'Keeping diverse voices in the center of client solutions',
      'Offering advice and design that tells you what you need to know and not just "what you want to hear"',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Impact to Community',
    items: [
      'Collaborating and partnering with diverse groups to keep resources and solution-making in their hands',
      'Equity and inclusion as the means by which customers and community cultivate and curate a relationship together',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function TeamValues() {
  return (
    <section className="py-24 bg-white dark:bg-teal-800 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute bottom-0 left-0 w-1/2 h-64 bg-gradient-to-r from-cream-100 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
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
          <h2 className="font-serif text-display-md text-teal dark:text-cream-100 mb-6">
            Our Values
          </h2>
          <p className="text-xl text-teal-700 dark:text-cream-200 max-w-3xl mx-auto leading-relaxed">
            The principles that guide our work and define our commitment to equity.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className={`p-8 rounded-2xl ${
                value.color === 'terracotta'
                  ? 'bg-gradient-to-br from-terracotta/10 to-coral/5'
                  : 'bg-gradient-to-br from-sage/10 to-teal/5'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  value.color === 'terracotta'
                    ? 'bg-terracotta/20 text-terracotta'
                    : 'bg-sage/20 text-sage'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {value.icon}
              </motion.div>

              <h3 className="font-serif text-2xl text-teal dark:text-cream-100 mb-4">{value.title}</h3>
              <p className="text-teal-700 dark:text-cream-300 leading-relaxed">{value.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Impact Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-serif text-2xl text-teal dark:text-cream-100 mb-8 text-center">
            Our Commitment to Impact
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {impacts.map((impact, index) => (
              <motion.div
                key={impact.title}
                className="bg-cream dark:bg-teal-700/40 dark:border dark:border-teal-600 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal">
                    {impact.icon}
                  </div>
                  <h4 className="font-serif text-lg text-teal dark:text-cream-100">{impact.title}</h4>
                </div>

                <ul className="space-y-3">
                  {impact.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-teal-700 dark:text-cream-300">
                      <svg className="w-4 h-4 mr-2 text-sage mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
