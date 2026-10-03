'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';

interface PageEntranceWrapperProps {
  children: React.ReactNode;
}

/**
 * PageEntranceWrapper prevents unstyled flashes or partial pop-in before the preloader
 * completes its exit transition. When the loader vanishes, the page smoothly manifests.
 */
export function PageEntranceWrapper({ children }: PageEntranceWrapperProps) {
  const { isLoaded } = usePreloader();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 w-full flex flex-col"
    >
      {children}
    </motion.div>
  );
}
