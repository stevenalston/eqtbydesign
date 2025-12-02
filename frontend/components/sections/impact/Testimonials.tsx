'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "EQT By Design transformed how we engage with our community. Their culturally responsive approach helped us reach voices we'd never heard before.",
    author: 'Community Development Director',
    organization: 'City Government',
  },
  {
    quote: "Annette and her team don't just tell you what you want to hear—they tell you what you need to know. That honesty led to real, lasting change in our organization.",
    author: 'Executive Director',
    organization: 'Regional Nonprofit',
  },
  {
    quote: "The Listen, Reflect, Respond framework changed everything for us. We now have a sustainable model for community engagement that actually works.",
    author: 'Director of Equity & Inclusion',
    organization: 'Healthcare System',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-64 bg-gradient-to-l from-sage/10 to-transparent"
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
            What Our Partners Say
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            Hear from the organizations we've partnered with to create change.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-soft h-full flex flex-col"
                whileHover={{ y: -4 }}
              >
                {/* Quote icon */}
                <svg className="w-10 h-10 text-terracotta/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {/* Quote text */}
                <p className="text-teal-700 leading-relaxed mb-6 flex-grow italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-sage/20">
                  <p className="font-semibold text-teal">{testimonial.author}</p>
                  <p className="text-sm text-teal-600">{testimonial.organization}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
