'use client'

import { motion } from 'framer-motion'

const contactMethods = [
  {
    title: 'Email',
    value: 'info@eqtbydesign.com',
    href: 'mailto:info@eqtbydesign.com',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Location',
    value: 'Madison, Wisconsin',
    href: null,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

const faqs = [
  {
    question: 'What types of organizations do you work with?',
    answer: 'We partner with government agencies, nonprofits, corporations, healthcare systems, educational institutions, and community organizations across all sectors.',
  },
  {
    question: 'What is your typical engagement timeline?',
    answer: 'Projects range from short-term consultations (weeks) to comprehensive multi-year partnerships, depending on scope and goals.',
  },
  {
    question: 'Do you work outside of Wisconsin?',
    answer: 'Yes! While we\'re based in Madison, we serve organizations nationally and have experience with both in-person and virtual engagement.',
  },
]

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h3 className="font-serif text-xl text-teal mb-6">Get in Touch</h3>
        <div className="space-y-4">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center text-sage flex-shrink-0">
                {method.icon}
              </div>
              <div>
                <p className="text-sm text-teal-600">{method.title}</p>
                {method.href ? (
                  <a
                    href={method.href}
                    className="text-teal font-medium hover:text-terracotta transition-colors"
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className="text-teal font-medium">{method.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h3 className="font-serif text-xl text-teal mb-4">Connect With Us</h3>
        <div className="flex gap-4">
          <a
            href="#"
            className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center text-teal hover:bg-terracotta hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center text-teal hover:bg-terracotta hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
        </div>
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <h3 className="font-serif text-xl text-teal mb-6">Common Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              className="bg-white rounded-xl p-4 shadow-soft"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            >
              <h4 className="font-semibold text-teal text-sm mb-2">{faq.question}</h4>
              <p className="text-teal-600 text-sm">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
