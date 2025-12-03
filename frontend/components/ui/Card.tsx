'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  hoverable?: boolean
  className?: string
  animateOnScroll?: boolean
}

export default function Card({
  children,
  hoverable = true,
  className = '',
  animateOnScroll = true,
  ...props
}: CardProps) {
  // When animateOnScroll is false, the parent controls the animation
  const scrollAnimationProps = animateOnScroll ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, ease: 'easeOut' as const },
  } : {}

  return (
    <motion.div
      className={`bg-white dark:bg-teal-700/50 rounded-xl p-6 shadow-soft dark:shadow-none dark:border dark:border-teal-600 ${className}`}
      {...scrollAnimationProps}
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
