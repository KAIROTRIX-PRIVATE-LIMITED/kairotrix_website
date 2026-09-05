"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StickyScrollItem {
  title: string;
  description: string;
  badge?: string;
  highlights?: string[];
  slug?: string;
  content?: React.ReactNode;
}

export const StickyScroll = ({
  content,
  contentClassName,
  className,
}: {
  content: StickyScrollItem[];
  contentClassName?: string;
  className?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track active card via page scroll IntersectionObserver (out of the box)
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveCard(index);
            }
          });
        },
        {
          rootMargin: "-30% 0px -40% 0px",
          threshold: 0.1,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [content.length]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16",
        className
      )}
    >
      {/* Left Column: Natural page scroll stream (100% out of the box) */}
      <div className="w-full lg:w-[55%] space-y-28 sm:space-y-36">
        {content.map((item, index) => {
          const isActive = activeCard === index;
          return (
            <div
              key={item.title + index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="transition-all duration-300"
            >
              {/* Index / Badge */}
              {item.badge && (
                <div
                  className={cn(
                    "mb-3 transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-35"
                  )}
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-purple-600">
                    {item.badge}
                  </span>
                </div>
              )}

              {/* Title */}
              <h2
                className={cn(
                  "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight transition-all duration-300",
                  isActive ? "text-neutral-900 opacity-100" : "text-neutral-900 opacity-25"
                )}
              >
                {item.title}
              </h2>

              {/* Description */}
              <p
                className={cn(
                  "mt-4 max-w-xl text-base sm:text-lg leading-relaxed font-normal transition-all duration-300",
                  isActive ? "text-neutral-600 opacity-100" : "text-neutral-500 opacity-25"
                )}
              >
                {item.description}
              </p>

              {/* Highlights Pills */}
              {item.highlights && item.highlights.length > 0 && (
                <div
                  className={cn(
                    "mt-6 flex flex-wrap gap-2 transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-25"
                  )}
                >
                  {item.highlights.map((h, hIdx) => (
                    <span
                      key={hIdx}
                      className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-white text-neutral-700 border border-neutral-200/90 shadow-2xs"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Link */}
              {item.slug && (
                <div
                  className={cn(
                    "mt-6 transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-25"
                  )}
                >
                  <Link
                    href={item.slug}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors group"
                  >
                    <span>Explore Architecture</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              )}

              {/* Mobile video display (< lg) */}
              <div className="block lg:hidden mt-8 rounded-2xl overflow-hidden shadow-xl border border-neutral-200 h-64 sm:h-72 w-full">
                {item.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Column: Sticky Video Frame pinned to viewport on desktop */}
      <div
        className={cn(
          "sticky top-32 hidden lg:block w-full lg:w-[45%] h-[340px] xl:h-[380px] rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-200/90 shadow-[0_20px_50px_rgba(147,51,234,0.14),0_6px_20px_rgba(0,0,0,0.06)] shrink-0 self-start",
          contentClassName
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="h-full w-full"
          >
            {content[activeCard]?.content ?? null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
