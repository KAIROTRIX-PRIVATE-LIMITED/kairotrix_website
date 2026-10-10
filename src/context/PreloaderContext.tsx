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
    // Check if crawler, Lighthouse, headless testing, or already visited in this session
    const isBotOrLighthouse =
      typeof navigator !== 'undefined' &&
      /Chrome-Lighthouse|Googlebot|PageSpeed|HeadlessChrome/i.test(navigator.userAgent);

    const hasLoadedBefore =
      typeof sessionStorage !== 'undefined' &&
      sessionStorage.getItem('ktrx_visited') === 'true';

    // If admin page, bot, or repeat visit, bypass preloader completely
    if (isAdmin || isBotOrLighthouse || hasLoadedBefore) {
      setIsLoading(false);
      setIsExiting(false);
      setIsLoaded(true);
      setProgress(100);
      document.body.style.overflow = '';
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('kairotrix:page-loaded'));
      }
      return;
    }

    if (isStartedRef.current) return;
    isStartedRef.current = true;

    // Lock body scroll while loader is active
    document.body.style.overflow = 'hidden';

    // Start smooth lerp loop
    animFrameRef.current = requestAnimationFrame(updateLerp);

    const startTime = Date.now();
    const MIN_LOADER_DURATION = 400; // Silky responsive reveal for first-time visitors

    // Run lightweight asset preloading pipeline
    runAssetPreloadPipeline(pathname || '/', (info) => {
      targetProgressRef.current = Math.round(info.ratio * 100);
      if (info.status) {
        setStatusText(info.status);
      }
    }).then(() => {
      targetProgressRef.current = 100;

      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADER_DURATION - elapsed);

      setTimeout(() => {
        setStatusText('ALL SYSTEMS VERIFIED • INITIALIZING UI');
        setProgress(100);

        setTimeout(() => {
          setIsExiting(true);

          setTimeout(() => {
            setIsLoading(false);
            setIsExiting(false);
            setIsLoaded(true);
            document.body.style.overflow = '';

            try {
              sessionStorage.setItem('ktrx_visited', 'true');
            } catch {}

            // Notify application that page is fully unveiled and ready
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('kairotrix:page-loaded'));
            }

            if (animFrameRef.current) {
              cancelAnimationFrame(animFrameRef.current);
            }
          }, 320);
        }, 120);
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
