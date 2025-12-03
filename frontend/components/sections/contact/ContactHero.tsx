'use client'

import { motion } from 'framer-motion'

export default function ContactHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-teal via-teal-600 to-sage">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-warm opacity-20 animate-gradient dark:opacity-10" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay opacity-40 dark:opacity-20" />

      {/* Floating shapes */}
      <motion.div
        className="absolute top-20 right-20 w-56 h-56 bg-terracotta/20 rounded-full blur-3xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-10 left-20 w-72 h-72 bg-sage/20 rounded-full blur-3xl"
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Eyebrow */}
          <motion.p
            className="text-cream-100 text-lg font-medium mb-6 tracking-wide uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Contact Us
          </motion.p>

          {/* Main headline */}
          <motion.h1
            className="font-serif text-display-lg text-white mb-6 leading-tight text-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Let's Create Change
            <br />
            <span className="gradient-text bg-linear-to-r from-coral via-cream to-sage bg-clip-text text-transparent">
              Together
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-cream-100 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Whether you're looking to amplify your mission, engage your community,
            or build something entirely new—we're here to help.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
