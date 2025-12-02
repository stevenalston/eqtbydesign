'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import Link from 'next/link'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  href?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  href,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = {
    primary: 'bg-terracotta text-white hover:bg-terracotta-600 focus-visible:ring-terracotta shadow-soft hover:shadow-lift',
    secondary: 'bg-sage text-white hover:bg-sage-600 focus-visible:ring-sage shadow-soft hover:shadow-lift',
    outline: 'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white focus-visible:ring-terracotta',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: -3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {icon}
        </motion.span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {icon}
        </motion.span>
      )}
    </>
  )

  // Render as Link if href is provided
  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    )
  }

  // Render as button otherwise
  return (
    <motion.button
      className={combinedClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {content}
    </motion.button>
  )
}
