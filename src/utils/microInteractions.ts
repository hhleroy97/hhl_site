import { Variants } from 'framer-motion'

// Micro-interaction animation variants for consistent UX

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
}

export const fadeInScale: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
}

export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
}

export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
}

export const hoverScale: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
  tap: {
    scale: 0.97,
    transition: {
      duration: 0.1,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
}

export const hoverGlow: Variants = {
  initial: {
    boxShadow: '0 0 0 rgba(0, 229, 255, 0)',
  },
  hover: {
    boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)',
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
}

export const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const pulseGlow: Variants = {
  initial: {
    opacity: 0.7,
    scale: 1,
  },
  animate: {
    opacity: [0.7, 1, 0.7],
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const typewriter: Variants = {
  initial: { width: 0 },
  animate: {
    width: '100%',
    transition: {
      duration: 2,
      ease: 'steps(40, end)',
    },
  },
}

export const morphShape: Variants = {
  initial: {
    borderRadius: '0.5rem',
    rotate: 0,
  },
  hover: {
    borderRadius: '1.5rem',
    rotate: 2,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
}

// Utility functions for reduced motion
export const createResponsiveVariant = (
  normalVariant: Variants,
  reducedVariant: Variants,
  prefersReducedMotion: boolean
): Variants => {
  return prefersReducedMotion ? reducedVariant : normalVariant
}

export const reducedMotionFadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
}

// Custom easing curves
export const easings = {
  smooth: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
  snappy: [0.4, 0.0, 0.1, 1] as [number, number, number, number],
  gentle: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  bouncy: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
}

// Interaction feedback
export const buttonPress: Variants = {
  initial: { scale: 1 },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
}

export const cardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    y: -4,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
    transition: {
      duration: 0.2,
      ease: easings.smooth,
    },
  },
}

export const glowOnHover: Variants = {
  initial: {
    filter: 'brightness(1) saturate(1)',
  },
  hover: {
    filter: 'brightness(1.1) saturate(1.2)',
    transition: {
      duration: 0.2,
      ease: easings.smooth,
    },
  },
}

// Loading states
export const spinnerRotate: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export const pulseOpacity: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Page transitions
export const pageSlideLeft: Variants = {
  initial: { x: '100%' },
  animate: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },
  exit: {
    x: '-100%',
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },
}

export const pageSlideUp: Variants = {
  initial: { y: '100%' },
  animate: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },
  exit: {
    y: '-100%',
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },
}

// Modal animations
export const modalBackdrop: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
}

export const modalContent: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easings.smooth,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: easings.smooth,
    },
  },
}
