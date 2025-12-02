'use client'

import { motion } from 'framer-motion'

interface DecorativeShapeProps {
  type: 'hexagon' | 'circle' | 'hexagon-filled' | 'circle-filled'
  size?: 'sm' | 'md' | 'lg'
  color?: 'terracotta' | 'sage' | 'teal' | 'coral' | 'cream'
  className?: string
  animate?: boolean
  dashed?: boolean
}

const sizeMap = {
  sm: { width: 40, stroke: 1 },
  md: { width: 60, stroke: 1.5 },
  lg: { width: 80, stroke: 2 },
}

const colorMap = {
  terracotta: 'text-terracotta',
  sage: 'text-sage',
  teal: 'text-teal',
  coral: 'text-coral',
  cream: 'text-cream',
}

export function HexagonOutline({
  size = 'md',
  color = 'terracotta',
  className = '',
  animate = true,
  dashed = false,
}: Omit<DecorativeShapeProps, 'type'>) {
  const { width, stroke } = sizeMap[size]

  return (
    <motion.svg
      className={`${colorMap[color]} ${className}`}
      width={width}
      height={width}
      viewBox="0 0 100 100"
      fill="none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <polygon
        points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeDasharray={dashed ? '8 4' : undefined}
        fill="none"
      />
    </motion.svg>
  )
}

export function CircleOutline({
  size = 'md',
  color = 'sage',
  className = '',
  animate = true,
  dashed = false,
}: Omit<DecorativeShapeProps, 'type'>) {
  const { width, stroke } = sizeMap[size]

  return (
    <motion.div
      className={`rounded-full border-${stroke === 1 ? '' : '2'} ${dashed ? 'border-dashed' : 'border-solid'} ${className}`}
      style={{
        width,
        height: width,
        borderWidth: stroke,
        borderColor: `var(--color-${color})`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    />
  )
}

export function DecorativeAccent({
  position = 'top-right',
  type = 'hexagon',
}: {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  type?: 'hexagon' | 'circle'
}) {
  const positionClasses = {
    'top-left': '-top-3 -left-3',
    'top-right': '-top-3 -right-3',
    'bottom-left': '-bottom-3 -left-3',
    'bottom-right': '-bottom-3 -right-3',
  }

  return (
    <div className={`absolute ${positionClasses[position]} opacity-30 pointer-events-none`}>
      {type === 'hexagon' ? (
        <HexagonOutline size="sm" color="terracotta" dashed />
      ) : (
        <CircleOutline size="sm" color="sage" dashed />
      )}
    </div>
  )
}

export function ButtonDecoration({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Hexagon accent behind button */}
      <motion.svg
        className="absolute -top-2 -left-2 w-8 h-8 text-terracotta/20 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
        initial={{ opacity: 0, rotate: -30 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </motion.svg>
      {/* Circle accent */}
      <motion.div
        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-sage/20 pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      />
      {children}
    </div>
  )
}
