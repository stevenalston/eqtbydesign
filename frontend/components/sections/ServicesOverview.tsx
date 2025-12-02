'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Card from '@/components/ui/Card'

const services = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Civic & Public Engagement',
    description: 'EQT By Design leads in creating inclusive and representative engagement for the public and community at large. We listen, learn, and reach out to ensure voices are lifted regardless of language, culture, zip code, class, status, ability, and/or the intersectionality of identity.',
    features: ['Community Outreach', 'Inclusive Facilitation', 'Stakeholder Engagement'],
    href: '/services#civic-engagement',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Consulting',
    description: 'EQT By Design helps you better understand the context, challenges and opportunities that set the stage for reaching your organizational impact goals for systems change that improve strategies for equitable and inclusive design.',
    features: ['Strategic Assessment', 'Organizational Analysis', 'Impact Planning'],
    href: '/services#consulting',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Systems Change & Equitable Design',
    description: 'EQT By Design works with you to develop smart, inclusive processes that support your community and organizational goals. We partner with you to create lasting, systemic transformation.',
    features: ['Change Management', 'Process Design', 'Cultural Transformation'],
    href: '/services#systems-change',
  },
]

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/3 right-0 w-1/2 h-64 bg-gradient-to-l from-cream-100 to-transparent"
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
          <h2 className="font-serif text-display-md text-teal mb-6">
            Our Services
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            EQT By Design brings 25+ years of experience in equity-centered strategic planning,
            change management, and organizational cultural design within government, community,
            and the corporate and nonprofit sectors.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={service.title} href={service.href}>
              <Card className="group cursor-pointer h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-terracotta/10 to-sage/10 flex items-center justify-center mb-6 text-terracotta"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="font-serif text-xl text-teal mb-3 group-hover:text-terracotta transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-teal-700 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-teal-600">
                        <svg className="w-4 h-4 mr-2 text-sage" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Hover indicator */}
                  <motion.div
                    className="flex items-center text-terracotta text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ x: 5 }}
                  >
                    Learn more
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.div>
                </motion.div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
