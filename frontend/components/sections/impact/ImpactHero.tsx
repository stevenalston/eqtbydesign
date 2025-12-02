'use client'

import { motion } from 'framer-motion'

export default function ImpactHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-teal via-teal-600 to-sage">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-warm opacity-20 animate-gradient" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay opacity-30" />

      {/* Floating shapes */}
      <motion.div
        className="absolute top-32 left-10 w-72 h-72 bg-coral/20 rounded-full blur-3xl"
        animate={{
          y: [0, -25, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-64 h-64 bg-sage/30 rounded-full blur-3xl"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Eyebrow */}
          <motion.p
            className="text-cream-100 text-lg font-medium mb-6 tracking-wide uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Measurable Change, Lasting Results
          </motion.p>

          {/* Main headline */}
          <motion.h1
            className="font-serif text-display-lg text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Our Impact
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-cream-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            25+ years of creating systemic change across government, nonprofit,
            and corporate sectors. Here's how we've helped organizations transform.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-6 h-6 mx-auto text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
