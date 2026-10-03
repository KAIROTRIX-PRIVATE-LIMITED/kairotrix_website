'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { runAssetPreloadPipeline } from '@/lib/assetPreloader';

interface PreloaderContextValue {
  isLoading: boolean;
  isExiting: boolean;
  isLoaded: boolean;
  progress: number;
  statusText: string;
}

const PreloaderContext = createContext<PreloaderContextValue>({
  isLoading: true,
  isExiting: false,
  isLoaded: false,
  progress: 0,
  statusText: 'INITIALIZING ARCHITECTURE KERNEL',
});

export function usePreloader() {
  return useContext(PreloaderContext);
}

interface PreloaderProviderProps {
  children: React.ReactNode;
}

export function PreloaderProvider({ children }: PreloaderProviderProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  const [isLoading, setIsLoading] = useState<boolean>(!isAdmin);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(isAdmin);
  const [progress, setProgress] = useState<number>(isAdmin ? 100 : 0);
  const [statusText, setStatusText] = useState<string>('INITIALIZING ARCHITECTURE KERNEL');

  const targetProgressRef = useRef<number>(isAdmin ? 100 : 0);
  const animFrameRef = useRef<number | null>(null);
  const isStartedRef = useRef<boolean>(false);

  // Smooth lerp loop for the progress counter
  const updateLerp = useCallback(() => {
    setProgress((prev) => {
      const target = targetProgressRef.current;
      if (Math.abs(target - prev) < 0.5) {
        return target;
      }
      // Smooth logarithmic easing towards target
      const step = Math.max(0.5, (target - prev) * 0.12);
      return Math.min(100, prev + step);
    });

    animFrameRef.current = requestAnimationFrame(updateLerp);
  }, []);

  useEffect(() => {
    // If admin page, bypass preloader completely
    if (isAdmin) {
      setIsLoading(false);
      setIsExiting(false);
      setIsLoaded(true);
      setProgress(100);
      document.body.style.overflow = '';
      return;
    }

    if (isStartedRef.current) return;
    isStartedRef.current = true;

    // Lock body scroll while loader is active
    document.body.style.overflow = 'hidden';

    // Start smooth lerp loop
    animFrameRef.current = requestAnimationFrame(updateLerp);

    const startTime = Date.now();
    const MIN_LOADER_DURATION = 1400; // Minimum 1.4s to showcase the kinetic brand animation

    // Run the comprehensive asset preloading pipeline
    runAssetPreloadPipeline(pathname || '/', (info) => {
      targetProgressRef.current = Math.round(info.ratio * 100);
      if (info.status) {
        setStatusText(info.status);
      }
    }).then(() => {
      targetProgressRef.current = 100;

      // Ensure minimum duration so the animation is silky and unhurried
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADER_DURATION - elapsed);

      setTimeout(() => {
        setStatusText('ALL SYSTEMS VERIFIED • INITIALIZING UI');
        setProgress(100);

        // Brief hold at 100% before shutter triggers
        setTimeout(() => {
          setIsExiting(true);

          // Exit transition duration: 650ms
          setTimeout(() => {
            setIsLoading(false);
            setIsExiting(false);
            setIsLoaded(true);
            document.body.style.overflow = '';

            // Notify entire application that page is fully unveiled and ready
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('kairotrix:page-loaded'));
            }

            if (animFrameRef.current) {
              cancelAnimationFrame(animFrameRef.current);
            }
          }, 650);
        }, 220);
      }, remainingTime);
    });

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      document.body.style.overflow = '';
    };
  }, [isAdmin, pathname, updateLerp]);

  return (
    <PreloaderContext.Provider
      value={{
        isLoading,
        isExiting,
        isLoaded,
        progress: Math.floor(progress),
        statusText,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
}
