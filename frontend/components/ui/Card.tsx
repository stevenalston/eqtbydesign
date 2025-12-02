'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  hoverable?: boolean
  className?: string
}

export default function Card({
  children,
  hoverable = true,
  className = '',
  ...props
}: CardProps) {
  return (
    <motion.div
      className={`bg-white rounded-xl p-6 shadow-soft ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={hoverable ? {
        y: -8,
        boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
        transition: { duration: 0.3 }
      } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  )
}
