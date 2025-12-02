'use client'

import { motion } from 'framer-motion'

interface FloatingShapesProps {
  variant?: 'default' | 'subtle' | 'prominent'
  className?: string
}

export default function FloatingShapes({ variant = 'default', className = '' }: FloatingShapesProps) {
  const opacity = variant === 'subtle' ? 0.05 : variant === 'prominent' ? 0.15 : 0.1

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Hexagon 1 - Top right */}
      <motion.svg
        className="absolute top-20 right-10 w-32 h-32"
        viewBox="0 0 100 100"
        fill="none"
        style={{ opacity }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-terracotta"
          fill="none"
        />
      </motion.svg>

      {/* Hexagon 2 - Bottom left */}
      <motion.svg
        className="absolute bottom-32 left-20 w-24 h-24"
        viewBox="0 0 100 100"
        fill="none"
        style={{ opacity }}
        animate={{
          y: [0, 20, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-sage"
          fill="none"
        />
      </motion.svg>

      {/* Circle 1 - Top left */}
      <motion.div
        className="absolute top-40 left-10 w-20 h-20 rounded-full border-2 border-coral"
        style={{ opacity }}
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Circle 2 - Middle right */}
      <motion.div
        className="absolute top-1/2 right-20 w-16 h-16 rounded-full border-2 border-teal"
        style={{ opacity }}
        animate={{
          scale: [1, 0.9, 1],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Circle 3 - Bottom right */}
      <motion.div
        className="absolute bottom-20 right-1/4 w-12 h-12 rounded-full border border-sage"
        style={{ opacity }}
        animate={{
          y: [0, 15, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Small hexagon - Center left */}
      <motion.svg
        className="absolute top-1/3 left-1/4 w-16 h-16"
        viewBox="0 0 100 100"
        fill="none"
        style={{ opacity: opacity * 0.7 }}
        animate={{
          y: [0, 10, 0],
          x: [0, -5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="currentColor"
          strokeWidth="1"
          className="text-coral"
          fill="none"
        />
      </motion.svg>

      {/* Dotted circle - Bottom center */}
      <motion.div
        className="absolute bottom-40 left-1/2 w-28 h-28 rounded-full border-2 border-dashed border-terracotta"
        style={{ opacity: opacity * 0.5 }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
