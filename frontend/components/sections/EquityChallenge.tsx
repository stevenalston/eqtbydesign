'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function AnimatedStat({ end, label, suffix = '', delay = 0 }: { end: number; label: string; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = end / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, end])

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
    >
      <div className="text-5xl md:text-6xl font-bold text-terracotta mb-2">
        {count}{suffix}
      </div>
      <div className="text-teal-700 text-lg">{label}</div>
    </motion.div>
  )
}

export default function EquityChallenge() {
  return (
    <section className="py-24 bg-cream-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-sage/10 to-transparent" />

      {/* Floating decorative shapes */}
      <motion.svg
        className="absolute top-20 left-10 w-20 h-20 text-terracotta/10"
        viewBox="0 0 100 100"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ opacity: { delay: 0.5 }, y: { duration: 8, repeat: Infinity }, rotate: { duration: 10, repeat: Infinity } }}
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.svg>

      <motion.div
        className="absolute bottom-32 right-20 w-12 h-12 rounded-full border-2 border-sage/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: [1, 1.1, 1] }}
        transition={{ opacity: { delay: 0.6 }, scale: { duration: 6, repeat: Infinity } }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="font-serif text-display-md text-teal mb-6">
            The Equity Challenge
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            Communities and organizations face systemic barriers to opportunity, resources, and justice.
            Strategic change management has the power to break down these barriers and create pathways to equity.
          </p>
        </motion.div>

        {/* Statistics grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <AnimatedStat end={25} label="Years of equity-centered consulting" suffix="+" delay={0.2} />
          <AnimatedStat end={100} label="Communities engaged inclusively" suffix="s" delay={0.4} />
          <AnimatedStat end={3} label="Sectors served: Government, Nonprofit, Corporate" suffix="" delay={0.6} />
        </div>

        {/* Human story section */}
        <motion.div
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lift"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="w-16 h-1 bg-gradient-warm mb-6" />
              <h3 className="font-serif text-3xl text-teal mb-4">
                Strategic Change Can Transform This
              </h3>
              <p className="text-teal-700 text-lg leading-relaxed mb-6">
                Every day, organizations working for justice and equity struggle with
                processes that don't serve their mission. They need strategic partners who understand
                their values, amplify community voices, and create inclusive pathways to change.
              </p>
              <p className="text-teal-700 text-lg leading-relaxed">
                That's where we come in. We develop strategic solutions that are not just
                effective, but equitable—built to drive real, measurable systemic transformation.
              </p>
            </div>
            <div className="relative">
              {/* Placeholder for image/illustration */}
              <div className="aspect-square bg-gradient-to-br from-terracotta/20 to-sage/20 rounded-xl flex items-center justify-center">
                <svg className="w-32 h-32 text-teal/20" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              {/* Floating accent */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-coral/30 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
