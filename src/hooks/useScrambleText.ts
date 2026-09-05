'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const DEFAULT_CHARS = '01#_/-X*+<>~';

interface UseScrambleOptions {
  duration?: number; // total duration in ms
  speed?: number; // interval between character updates in ms
  chars?: string;
  autoStart?: boolean;
}

export function useScrambleText(targetText: string, options: UseScrambleOptions = {}) {
  const {
    duration = 320,
    speed = 35,
    chars = DEFAULT_CHARS,
    autoStart = false,
  } = options;

  const prefersReduced = useReducedMotion();
  const [displayText, setDisplayText] = useState(targetText);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef<NodeJS.Timeout | null>(null);

  const trigger = useCallback(() => {
    if (prefersReduced) {
      setDisplayText(targetText);
      return;
    }

    if (frameRef.current) {
      clearInterval(frameRef.current);
    }

    setIsScrambling(true);
    const startTime = Date.now();
    const length = targetText.length;

    frameRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Number of characters resolved to their true target glyph
      const resolvedCount = Math.floor(progress * length);

      let scrambled = '';
      for (let i = 0; i < length; i++) {
        if (targetText[i] === ' ') {
          scrambled += ' ';
        } else if (i < resolvedCount) {
          scrambled += targetText[i];
        } else {
          scrambled += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(scrambled);

      if (progress >= 1) {
        if (frameRef.current) clearInterval(frameRef.current);
        setDisplayText(targetText);
        setIsScrambling(false);
      }
    }, speed);
  }, [chars, duration, prefersReduced, speed, targetText]);

  useEffect(() => {
    if (autoStart) {
      trigger();
    }
    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [autoStart, trigger]);

  // If targetText changes externally, update state
  useEffect(() => {
    setDisplayText(targetText);
  }, [targetText]);

  return { displayText, isScrambling, trigger };
}
