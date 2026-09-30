'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// KAIROTRIX Reusable Motion System & Cinematic Primitives
// ─────────────────────────────────────────────────────────────────────────────

// Curated Cinematic & High-Precision Easing Curves
export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const; // Smooth power-deceleration curve
export const EASE_PRECISE = [0.16, 1, 0.3, 1] as const;    // Ultra-sharp architectural settle
export const EASE_GENTLE = [0.25, 0.1, 0.25, 1] as const;   // Atmospheric soft transitions
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;    // Smooth reciprocal transition

// Standardized Durations (in seconds)
export const DURATION = {
  micro: 0.35,
  eyebrow: 0.5,
  body: 0.65,
  headline: 0.8,
  card: 0.75,
  ambient: 1.2,
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. REUSABLE FRAMER MOTION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Cinematic Masked Headline Reveal
 * Rises vertically from a clipped bottom container with subtle blur resolving to sharp text
 */
export const revealHeadline: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.headline,
      ease: EASE_CINEMATIC,
    },
  },
};

/**
 * Architectural Eyebrow & Number Reveal
 * Tightens or expands character tracking while resolving opacity
 */
export const revealMeta: Variants = {
  hidden: {
    opacity: 0,
    letterSpacing: '0.35em',
    y: 8,
  },
  visible: {
    opacity: 1,
    letterSpacing: '0.25em',
    y: 0,
    transition: {
      duration: DURATION.eyebrow,
      ease: EASE_PRECISE,
    },
  },
};

/**
 * Calm Body Copy Reveal
 * Gentle vertical displacement and soft opacity, prioritizing immediate readability
 */
export const revealBody: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.body,
      ease: EASE_CINEMATIC,
    },
  },
};

/**
 * Precision Line Draw (Horizontal scaleX from 0 -> 1)
 */
export const drawLineHorizontal: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
    transformOrigin: 'left center',
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: EASE_CINEMATIC,
    },
  },
};

/**
 * Precision Line Draw (Vertical scaleY from 0 -> 1)
 */
export const drawLineVertical: Variants = {
  hidden: {
    scaleY: 0,
    opacity: 0,
    transformOrigin: 'top center',
  },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: EASE_CINEMATIC,
    },
  },
};

/**
 * Pill / Tag Micro-Animation
 * Precision scale settle (0.94 -> 1.0) with slight blur-to-sharp resolution
 */
export const revealTag: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    filter: 'blur(3px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.micro,
      ease: EASE_PRECISE,
    },
  },
};

/**
 * Stagger Container Orchestrator
 */
export const staggerContainer = (
  staggerChildren = 0.08,
  delayChildren = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * Directional Grid Card Reveal Variants
 * Produces cinematic spatial rhythm across a multi-column grid
 */
export const cardFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: DURATION.card,
      ease: EASE_CINEMATIC,
    },
  },
};

export const cardFromCenter: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION.card,
      ease: EASE_CINEMATIC,
    },
  },
};

export const cardFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 24,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: DURATION.card,
      ease: EASE_CINEMATIC,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. REUSABLE MOTION HELPER COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

interface MaskedRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

/**
 * MaskedReveal — Renders children rising gracefully from a clipped overflow-hidden container
 */
export function MaskedReveal({
  children,
  className = '',
  delay = 0,
  once = true,
}: MaskedRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-40px' }}
        variants={{
          hidden: {
            opacity: 0,
            y: '100%',
            filter: 'blur(4px)',
          },
          visible: {
            opacity: 1,
            y: '0%',
            filter: 'blur(0px)',
            transition: {
              duration: DURATION.headline,
              delay,
              ease: EASE_CINEMATIC,
            },
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface DrawLineProps {
  className?: string;
  delay?: number;
  origin?: 'left' | 'right' | 'center';
  once?: boolean;
}

/**
 * DrawLine — Draws a hairline separator line left-to-right when entering viewport
 */
export function DrawLine({
  className = 'h-px w-full bg-neutral-200/80',
  delay = 0,
  origin = 'left',
  once = true,
}: DrawLineProps) {
  const originMap = {
    left: 'left center',
    right: 'right center',
    center: 'center center',
  };

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once, margin: '-40px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: EASE_CINEMATIC,
      }}
      style={{ transformOrigin: originMap[origin] }}
      className={className}
      aria-hidden="true"
    />
  );
}
