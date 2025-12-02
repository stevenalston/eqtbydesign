'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const stats = [
  {
    value: 25,
    suffix: '+',
    label: 'Years of Experience',
    description: 'In equity-centered strategic planning',
  },
  {
    value: 100,
    suffix: '+',
    label: 'Organizations Served',
    description: 'Across government, nonprofit, and corporate sectors',
  },
  {
    value: 50,
    suffix: 'K+',
    label: 'Community Voices',
    description: 'Engaged through our inclusive processes',
  },
  {
    value: 15,
    suffix: '+',
    label: 'Languages',
    description: 'Supported in our engagement work',
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const duration = 2000
      const increment = value / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function ImpactStats() {
  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      {/* Background decoration - blurred shapes */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl translate-y-1/2" />
      </div>

      {/* Floating hexagon shapes */}
      <motion.svg
        className="absolute top-10 left-10 w-20 h-20 text-terracotta/10"
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

      <motion.svg
        className="absolute bottom-20 right-20 w-16 h-16 text-sage/10"
        viewBox="0 0 100 100"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ opacity: { delay: 0.7 }, y: { duration: 10, repeat: Infinity }, rotate: { duration: 12, repeat: Infinity } }}
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.svg>

      {/* Floating circle */}
      <motion.div
        className="absolute top-1/3 right-10 w-12 h-12 rounded-full border-2 border-coral/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: [1, 1.1, 1] }}
        transition={{ opacity: { delay: 0.6 }, scale: { duration: 6, repeat: Infinity } }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header with delayed fade-in */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="font-serif text-display-sm text-teal mb-4">
            Impact by the Numbers
          </h2>
          <p className="text-teal-700 max-w-2xl mx-auto">
            Our work speaks through measurable outcomes and lasting change.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.15 }}
            >
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-soft h-full relative"
                whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              >
                {/* Decorative hexagon accent for first stat */}
                {index === 0 && (
                  <motion.svg
                    className="absolute -top-2 -left-2 w-8 h-8 text-terracotta/20"
                    viewBox="0 0 100 100"
                    fill="none"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                  >
                    <polygon
                      points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </motion.svg>
                )}
                {/* Decorative circle accent for last stat */}
                {index === 3 && (
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-sage/30"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 }}
                  />
                )}
                <div className="font-serif text-display-sm text-terracotta mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="font-semibold text-teal mb-1">{stat.label}</h3>
                <p className="text-sm text-teal-600">{stat.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
