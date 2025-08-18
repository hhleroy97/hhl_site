import React from 'react'
import { motion } from 'framer-motion'

// Design System Components for Consistency

// Typography Components
interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
  gradient?: boolean
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = '',
  gradient = false,
}) => {
  const baseClasses = 'font-display font-bold text-tech-text-primary'
  const gradientClasses = gradient ? 'text-gradient-primary' : ''

  const levelClasses = {
    1: 'heading-primary',
    2: 'heading-secondary',
    3: 'heading-tertiary',
    4: 'text-lg font-semibold',
    5: 'text-base font-semibold',
    6: 'text-sm font-semibold uppercase tracking-wider',
  }

  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag
      className={`${baseClasses} ${levelClasses[level]} ${gradientClasses} ${className}`}
    >
      {children}
    </Tag>
  )
}

// Text Components
interface TextProps {
  variant?: 'body' | 'body-large' | 'body-small' | 'caption' | 'overline'
  children: React.ReactNode
  className?: string
  muted?: boolean
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  children,
  className = '',
  muted = false,
}) => {
  const variantClasses = {
    body: 'text-base leading-relaxed',
    'body-large': 'body-large',
    'body-small': 'body-small',
    caption: 'text-xs text-cyberpunk-text-muted',
    overline: 'text-xs uppercase tracking-wider font-medium',
  }

  const colorClass = muted
    ? 'text-cyberpunk-text-muted'
    : 'text-tech-text-secondary'

  return (
    <p className={`${variantClasses[variant]} ${colorClass} ${className}`}>
      {children}
    </p>
  )
}

// Button Components
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-display font-medium rounded-lg transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    outline:
      'border-2 border-tech-neon/40 text-tech-neon hover:bg-tech-neon/10',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      aria-label={ariaLabel}
    >
      {loading && (
        <div className='w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin' />
      )}
      {children}
    </motion.button>
  )
}

// Card Components
interface CardProps {
  variant?: 'surface' | 'elevated' | 'outline'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export const Card: React.FC<CardProps> = ({
  variant = 'surface',
  padding = 'md',
  children,
  className = '',
  hover = false,
}) => {
  const baseClasses = 'rounded-xl transition-all duration-200'

  const variantClasses = {
    surface: 'card-surface',
    elevated: 'card-elevated',
    outline: 'border border-tech-text-disabled/20 bg-transparent',
  }

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  }

  const hoverClasses = hover ? 'hover:scale-[1.02] hover:shadow-lg' : ''

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  )
}

// Badge Components
interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'

  const variantClasses = {
    primary: 'bg-primary-500/20 text-primary-300 border border-primary-500/30',
    secondary:
      'bg-tech-text-disabled/20 text-tech-text-secondary border border-tech-text-disabled/30',
    success: 'bg-success/20 text-success border border-success/30',
    warning: 'bg-warning/20 text-warning border border-warning/30',
    error: 'bg-error/20 text-error border border-error/30',
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  )
}

// Status Indicator
interface StatusProps {
  status: 'online' | 'busy' | 'offline'
  showText?: boolean
  className?: string
}

export const Status: React.FC<StatusProps> = ({
  status,
  showText = false,
  className = '',
}) => {
  const statusConfig = {
    online: { class: 'status-online', text: 'Available' },
    busy: { class: 'status-busy', text: 'Busy' },
    offline: { class: 'status-offline', text: 'Offline' },
  }

  const config = statusConfig[status]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={config.class} aria-label={`Status: ${config.text}`} />
      {showText && (
        <Text variant='caption' className='text-cyberpunk-text-muted'>
          {config.text}
        </Text>
      )}
    </div>
  )
}

// Divider Component
interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
  variant?: 'solid' | 'dashed' | 'gradient'
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className = '',
  variant = 'solid',
}) => {
  const baseClasses =
    orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px'

  const variantClasses = {
    solid: 'bg-tech-text-disabled/20',
    dashed: 'border-dashed border-tech-text-disabled/20',
    gradient:
      'bg-gradient-to-r from-transparent via-tech-neon/30 to-transparent',
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      role='separator'
      aria-orientation={orientation}
    />
  )
}

// Container Components
interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: boolean
  children: React.ReactNode
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  size = 'lg',
  padding = true,
  children,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  }

  const paddingClasses = padding ? 'px-6 lg:px-8' : ''

  return (
    <div
      className={`mx-auto ${sizeClasses[size]} ${paddingClasses} ${className}`}
    >
      {children}
    </div>
  )
}

// Section Component
interface SectionProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  id?: string
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  padding = 'lg',
  id,
}) => {
  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20',
  }

  return (
    <section id={id} className={`${paddingClasses[padding]} ${className}`}>
      {children}
    </section>
  )
}
