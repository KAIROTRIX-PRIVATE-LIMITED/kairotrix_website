"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export function CustomCursor() {
  const { cursorType, cursorText, isEnabled } = useCursor();
  const [isPressed, setIsPressed] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Exact 1:1 hardware coordinates (zero latency)
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Tuned spring physics for smooth, high-fidelity trailing ring
  const springConfig = { damping: 24, stiffness: 380, mass: 0.45 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!hasMoved) setHasMoved(true);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsPressed(true);
      // Spawn tactical click ripple at click position
      setRipples((prev) => [
        ...prev.slice(-3),
        { id: Date.now(), x: e.clientX, y: e.clientY },
      ]);
    };

    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isEnabled, hasMoved, rawX, rawY]);

  // Clean up ripples after animation
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  // If disabled (touch screen / reduced motion) or not moved yet, don't render
  if (!isEnabled || !hasMoved) {
    return null;
  }

  const isHidden = cursorType === "hidden";
  const isProject = cursorType === "project";
  const isDrag = cursorType === "drag";
  const isHover = cursorType === "hover";
  const isText = cursorType === "text";

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Ambient Surface Spotlight Glow (Soft Spatial Atmosphere) */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isHidden ? 0 : isProject || isDrag ? 0.35 : isHover ? 0.28 : 0.18,
          scale: isPressed ? 0.8 : isHover ? 1.3 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="absolute w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.22)_0%,rgba(147,51,234,0)_70%)] blur-lg"
      />

      {/* 2. Tactical Click Shockwaves / Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.4, opacity: 0.9 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
            }}
            className="absolute w-8 h-8 rounded-full border border-brand-400/80 shadow-[0_0_12px_rgba(147,51,234,0.6)]"
          />
        ))}
      </AnimatePresence>

      {/* 3. Kinetic Telemetry Follower Ring & Morphing Badge */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHidden ? 0 : isPressed ? 0.84 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 480, damping: 28 }}
        className="absolute flex items-center justify-center"
      >
        {isProject || isDrag ? (
          /* Contextual Action Pill (High-Contrast Obsidian + Holographic Edge) */
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 26 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-950/95 text-white border border-brand-400/80 shadow-[0_8px_32px_rgba(0,0,0,0.65),0_0_16px_rgba(147,51,234,0.5),0_0_0_1px_rgba(255,255,255,0.15)] backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-wider uppercase whitespace-nowrap text-neutral-100">
              {cursorText || (isProject ? "VIEW ↗" : "← DRAG →")}
            </span>
          </motion.div>
        ) : isText ? (
          /* High-Contrast Dual-Tone Caret Indicator */
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 24 }}
            exit={{ opacity: 0, height: 0 }}
            className="w-1 bg-brand-500 rounded-full shadow-[0_0_8px_rgba(147,51,234,0.9),0_0_0_1px_rgba(255,255,255,0.8)]"
          />
        ) : (
          /* Default & Enhanced Hover Follower Ring */
          <motion.div
            animate={{
              width: isHover ? 44 : 34,
              height: isHover ? 44 : 34,
              backgroundColor: isHover ? "rgba(147, 51, 234, 0.16)" : "rgba(147, 51, 234, 0.03)",
              borderColor: isHover ? "rgba(168, 85, 247, 0.95)" : "rgba(147, 51, 234, 0.7)",
              borderWidth: isHover ? "1.5px" : "1.25px",
            }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            /* High-contrast multi-layer shadow: visible against dark, white, and purple! */
            className="relative rounded-full border flex items-center justify-center shadow-[0_0_0_1px_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.35),0_0_14px_rgba(147,51,234,0.35)] backdrop-blur-[1px]"
          >
            {/* 4 CAD Architectural Corner Brackets / Reticle Notches */}
            <motion.div
              animate={{ rotate: isHover ? 45 : 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {/* Top notch */}
              <span className="absolute top-[-3.5px] left-1/2 -translate-x-1/2 w-[2px] h-[4px] bg-brand-400 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
              {/* Bottom notch */}
              <span className="absolute bottom-[-3.5px] left-1/2 -translate-x-1/2 w-[2px] h-[4px] bg-brand-400 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
              {/* Left notch */}
              <span className="absolute left-[-3.5px] top-1/2 -translate-y-1/2 h-[2px] w-[4px] bg-brand-400 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
              {/* Right notch */}
              <span className="absolute right-[-3.5px] top-1/2 -translate-y-1/2 h-[2px] w-[4px] bg-brand-400 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
            </motion.div>

            {/* Hover Target Lock Ring: subtle spinning concentric radar */}
            {isHover && (
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                className="w-3.5 h-3.5 rounded-full border border-dashed border-white/80 animate-spin"
                style={{ animationDuration: "6s" }}
              />
            )}
          </motion.div>
        )}
      </motion.div>

      {/* 4. Precision Hardware Core Dot (1:1 Instant Tracking - Never Disappears) */}
      {!isProject && !isDrag && !isText && (
        <motion.div
          style={{
            x: rawX,
            y: rawY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isHidden ? 0 : isPressed ? 0.75 : isHover ? 1.3 : 1,
            opacity: isHidden ? 0 : 1,
          }}
          transition={{ duration: 0.1 }}
          /* DUAL-TONE LUMINANCE CORE:
             White center + 1.5px brand purple border + dark drop shadow.
             Guaranteed 100% visible against pure white, pure black, and brand purple buttons!
          */
          className="absolute w-2 h-2 rounded-full bg-white border border-brand-500 shadow-[0_0_0_1.5px_#9333EA,0_0_8px_rgba(147,51,234,0.9),0_1px_4px_rgba(0,0,0,0.8)]"
        />
      )}
    </div>
  );
}
