'use client'

import { motion } from 'framer-motion'

export default function ContactHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-teal via-teal-600 to-sage">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-warm opacity-20 animate-gradient dark:opacity-10" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay opacity-30 dark:opacity-15" />

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
            Let's Create Change Together
          </motion.p>

          {/* Main headline */}
          <motion.h1
            className="font-serif text-display-lg text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Start a Conversation
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-cream-100 mb-4 max-w-3xl mx-auto leading-relaxed"
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
