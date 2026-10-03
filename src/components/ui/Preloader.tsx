'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ─────────────────────────────────────────────────────────────
   KAIROTRIX Premium Preloader — Light Theme
   
   Loading animation:
   1. Full-screen #FAFAFC canvas split into top + bottom panels
   2. Brand SVG wordmark slides up into view (0.7s)
   3. Prominent centered progress bar with glow + shimmer
   4. Live percentage counter (driven by PreloaderContext lerp)
   
   Exit animation (isExiting = true):
   - Center content: scale(1→1.06) + opacity(1→0) — 0.3s easeIn
   - Top panel:      y(0 → -100%) — 0.72s vault ease, 0.12s delay
   - Bottom panel:   y(0 → +100%) — 0.72s vault ease, 0.12s delay
   → The site is dramatically revealed from the split center
───────────────────────────────────────────────────────────── */

const SPLIT_EASE    = [0.87, 0, 0.13, 1] as const;
const PANEL_DUR     = 0.72;
const PANEL_DELAY   = 0.12;
const CONTENT_DUR   = 0.3;

export function Preloader() {
  const { isLoading, isExiting, progress } = usePreloader();
  const prefersReduced = useReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);

  /* Keep bar width in sync with context progress (lerp-smoothed 0→100) */
  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${progress / 100})`;
    }
  }, [progress]);

  if (!isLoading) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading KAIROTRIX"
      className="fixed inset-0 z-[999999] pointer-events-auto select-none overflow-hidden"
    >
      {/* ── Embedded keyframes ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ktrx-wm-in {
          0%   { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        @keyframes ktrx-bar-in {
          0%   { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        @keyframes ktrx-shimmer {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(500%); }
        }
        @keyframes ktrx-beat {
          0%, 100% { opacity: 1;   transform: scale(1);   }
          50%       { opacity: 0.3; transform: scale(0.5); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ktrx-wm  { animation: none !important; opacity: 1 !important; transform: none !important; }
          .ktrx-bar { animation: none !important; opacity: 1 !important; transform: none !important; }
          .ktrx-sh  { animation: none !important; }
          .ktrx-bt  { animation: none !important; }
        }
      `}} />

      {/* ════════════════════════════════════════
          SPLIT BACKGROUND PANELS
          Top flies to -100%, bottom flies to +100% on exit
      ════════════════════════════════════════ */}

      {/* TOP PANEL */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden"
        style={{ backgroundColor: '#FAFAFC' }}
        animate={{ y: isExiting && !prefersReduced ? '-100%' : 0 }}
        transition={{
          duration: prefersReduced ? 0.12 : PANEL_DUR,
          delay:    prefersReduced ? 0     : PANEL_DELAY,
          ease: SPLIT_EASE,
        }}
      >
        {/* Subtle architectural grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right,rgba(0,0,0,0.035) 1px,transparent 1px),' +
              'linear-gradient(to bottom,rgba(0,0,0,0.035) 1px,transparent 1px)',
            backgroundSize: '5rem 5rem',
          }}
        />
        {/* Brand radial glow at very top */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: 720,
            height: 360,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(147,51,234,0.11) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* BOTTOM PANEL */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden"
        style={{ backgroundColor: '#FAFAFC' }}
        animate={{ y: isExiting && !prefersReduced ? '100%' : 0 }}
        transition={{
          duration: prefersReduced ? 0.12 : PANEL_DUR,
          delay:    prefersReduced ? 0     : PANEL_DELAY,
          ease: SPLIT_EASE,
        }}
      >
        {/* Subtle architectural grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right,rgba(0,0,0,0.035) 1px,transparent 1px),' +
              'linear-gradient(to bottom,rgba(0,0,0,0.035) 1px,transparent 1px)',
            backgroundSize: '5rem 5rem',
          }}
        />
      </motion.div>

      {/* ════════════════════════════════════════
          CENTER CONTENT
          Fades out + scales up on exit (before panels fly off)
      ════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 sm:px-10"
        animate={{
          opacity: isExiting ? 0 : 1,
          scale:   isExiting && !prefersReduced ? 1.07 : 1,
        }}
        transition={{
          duration: prefersReduced ? 0.08 : CONTENT_DUR,
          ease: 'easeIn',
        }}
      >

        {/* ── Official KAIROTRIX brand SVG wordmark ── */}
        <div
          className="ktrx-wm w-full"
          style={{
            maxWidth: 'clamp(240px, 58vw, 600px)',
            animation: prefersReduced
              ? 'none'
              : 'ktrx-wm-in 0.72s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both',
            opacity: prefersReduced ? 1 : 0,
          }}
          aria-label="KAIROTRIX"
          role="img"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 846.8 122.74"
            className="w-full h-auto"
            aria-hidden="true"
          >
            <defs>
              <style>{`.kp{fill:#9333ea}.kd{fill:#08080c}`}</style>
            </defs>
            <g><g>
              {/* Main letterforms */}
              <path className="kd" d="M457.64,58.82l-50.08-.25c-6.52-.03-11.18-7.05-11.17-13.12l.06-31.99c.01-7.59,6.19-12.9,13.62-12.89h44.85c6.29.01,13.06,4.75,13.07,11.39l.05,35.78c0,5.37-5.31,9.41-10.4,11.09ZM450.24,46.66c3.01,0,4.88-1.91,4.88-4.75l-.03-24.18c0-2.56-1.56-4.34-4.05-4.74l-37.2-.03c-2.35,0-4.41,1.6-4.4,4.07l.04,25.56c0,2.21,1.77,3.96,4.02,3.96l36.74.11Z"/>
              <path className="kd" d="M297.23,39.77l-.37,19-12.81-.02.05-30.61,51.75-.26c4.97-.03,4.37-14.58.92-14.6l-52.69-.34.07-12.4,56.16.19c6.91.02,11.95,6.08,11.83,12.65l-.3,16.2c-1.23,7.06-7.86,10.65-15.43,10.25l17.26,18.78-16.68.22-17.16-19-22.59-.04Z"/>
              <path className="kd" d="M628.52,39.76l-.37,18.95h-12.88s0-30.54,0-30.54l51.9-.26c5.48-.03,4.82-14.63,1.01-14.65l-52.91-.34-.03-12.34h55.62c5.68.02,11.56,3.89,12.29,9.63.82,6.43.87,13.02,0,19.44-.96,7.07-7.95,10.44-15.47,10.24l17.23,18.75-16.76.23-16.45-18.96-23.19-.15Z"/>
              <path className="kd" d="M145.49,15.78l-25.81,42.91-14.68-.06L138.6,2.73c2.59-4.3,10.67-2.86,13.8-.19l33.5,56.01-14.99.24-25.41-43.02Z"/>
              <polygon className="kd" points="809.28 38.6 788.33 58.71 771.24 58.55 800.36 29.55 771.56 .78 789.34 .8 846.8 58.5 829.49 58.8 809.28 38.6"/>
              <polygon className="kd" points="548.37 58.7 535.74 58.8 535.75 13.12 507.39 13 507.44 .56 576.84 .58 576.85 12.97 548.41 13.08 548.37 58.7"/>
              <polygon className="kd" points="68.18 58.44 49.63 58.79 14.68 29.36 49.34 .53 67.8 .73 33.6 29.47 68.18 58.44"/>
              <rect className="kd" x="724.52" y=".57" width="12.96" height="58.22" transform="translate(-.06 1.46)"/>
              <rect className="kd" x="-22.64" y="23.22" width="58.23" height="12.93" transform="translate(-23.22 36.15) rotate(-89.98)"/>
              <rect className="kd" x="226.98" y=".57" width="12.89" height="58.21"/>
              {/* Brand accent images (A and X marks) */}
              <image width="28" height="24" transform="translate(131.4 34.69)" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAAACXBIWXMAAAsSAAALEgHS3X78AAABEUlEQVRIiWNgIANMNn71f7Lxq//k6GUixzJyLCLbQkotZyTJAhPsFuSeESPaHKJ9iMsyUgHRFjIy4cZTzIh3DAsxiqZYvKaK7xgYiPQhPt/B8FQr4hxF0IfT7KjnOwYGInzIxMJINJ7h9Iag4/Am51nub8nyXdpOYZzm4gzSOX7vqBqUMIAzSJnZGcnG80Pf43QsVh8uiv1AE98xMOCIw2WpH6liYdRsfgzzMXy4Ov8zzXzHwIDmww1VX6huWUAbD4odKJzt7d9o4jvPSi64PfAg3TflB02DEgbgNh9b/IumFlrFsjEyMEB9eGHzH7r4joEB6sNbR/7SxUI1G2ZGlmc3/tHNdwwMDAyMX97+p6uFAO+YUn5L1otCAAAAAElFTkSuQmCC"/>
              <image width="34" height="25" transform="translate(813.4 .69)" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAZCAYAAABU+vysAAAACXBIWXMAAAsSAAALEgHS3X78AAABZklEQVRIibXWO0sDQRSG4e9Mdvaq63pFLK0EOy+RICiCaWwULARREBGDwRTWtpZ22UTEzsrGxsbCQhCs1D+i+Q+xWAkue8nu7MkLp5hmeDgwMASFbqudLmkEIQlCAkISSjqhZASjmQTNFJAWQdoE3RbQHYIxFIzlCpguYHsExwOkSSTyIm42Ol0VfFLSJAKAXJD22g8rwpsOELkg7VVexMycoP/nTJBWhRcxWw4jMkH8FV7E/KYWQfSF+OVvVsTCjoxFpEL8ZV5E5UBPRCRCmku8iPWakYpIhHBWvbD6ImIhnNvYurQzISKQ5iIfYvvKyYwIQTgRu9fDuRA9CCdiz3dzIwBAcCL270aUEADjqzm895QRbJCjh9FCCAAQja+pQpccP44VRgB/G1HFnDzxIHoQFczp8zgbIgTJg6m9TLAiIhAAaHymY85e+RGxkDRM/W1yIIhECACcf4Qx9ffBITLF/VVM6he4GEZcFO8mjwAAAABJRU5ErkJggg=="/>
              {/* Subtitle bars */}
              <image width="116" height="7" transform="translate(-.6 109.69)" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAHCAYAAADZLGlIAAAACXBIWXMAAAsSAAALEgHS3X78AAAA0UlEQVRIie2VsQ3CMBRE7yNmyCbMwSSpWYSSHWhYIxJzUFBBAfH/R2E7sbAgCEUoRH7S1z+fT2kuSgQTZr+50AygEjSEyTVSnwgeEw2QIUufiR5iJvrRo/dyzU4DyR2evO7M/j7NJDrjlf+GuqkEACQatyupDtA2jPNjLf2OZweoIyxqDVoBcwwbMPWa2mtThrMvqdvmc7TgJSWWQj+nbipZkKS788tHFKbGUkRkODbM8eDKSzEBRinz39itz5zbJzf7hxZ+x3Z14liFxiILM+UBL3tEjfj3CbgAAAAASUVORK5CYII="/>
              <image width="116" height="7" transform="translate(731.4 107.69)" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAHCAYAAADZLGlIAAAACXBIWXMAAAsSAAALEgHS3X78AAAA5UlEQVRIie1VO27CQBScmffWZaQcAImDpE1JmYI+d+AcqZFyAG7CMXKHKEUgMsXbNZsIFBmBsMDTvPm8wrsjeQkAr5NVi77gEZtVWO+wzivCHDG8fQ6QOWReL3mVkQQUs9spWn/1AS6CJKTfnqzoyIpevD8dOfkwwJPKBO62UImghS6+TBWvPCPMg5sRcsJM4XnMos0FSzE985iCO+Ep8yR4IrwRUhK8ER4em+6mdVKZIwaFr89tu/n+aQHAr/0xI4Dn+fRsv3ECt/eGvq1ng37nLonu4L1L/afQ5cfL3V7qiBFnww7BfRig6ncS0wAAAABJRU5ErkJggg=="/>
              {/* Subtitle letterforms (purple) */}
              <path className="kp" d="M175.1,112.38c2.06,2.81,2.38,9.54-1.18,9.65l-17.22.55v-19.59s16.63.37,16.63.37c3.6.08,4.1,5.8,1.76,9.02ZM171.61,110.82c1.77-.29,1.89-4.23.17-4.44-3.78-.46-7.59-.51-11.4-.04-1.18.15-1.23,4.17-.11,4.76,3.5.25,7.69.32,11.35-.29ZM171.98,119.19c1.93-.56,1.39-4.96-.15-4.98l-11.93-.13c-.62,1.81-.65,4.66.49,5.56,3.58.13,7.86.64,11.6-.45Z"/>
              <path className="kp" d="M569.32,122.6l-11.18.03c-2.91,0-4.75-2.18-4.71-5.03l.16-10.74c.04-2.44,2.11-3.84,4.47-3.84l11.27.02c2.6,0,4.72,1.7,4.71,4.35l-.06,10.95c-.01,2.63-2.09,4.26-4.66,4.27ZM556.85,106v13.79h13.98v-13.79h-13.98Z"/>
              <path className="kp" d="M685.86,113.93l-12.51.39c-.96.8-.91,4.26.04,5.11l14.2.34c.29.5.54,1.35.32,2.73l-18.15-.12-.04-19.28,18.18-.09c.27,1.31.19,2.2-.02,3.14l-14.84.1c-.37,1.67-.36,3.09.06,4.84l12.87.15-.11,2.69Z"/>
              <path className="kp" d="M491.85,113.95l-12.13.38c-.98.68-.95,4.34.02,5.08l13.86.39c.65.06,1.01,1.95.41,2.79l-17.9-.08-.12-19.44,18.03-.02-.08,3.06-14.29.21c-1.21.02-1.2,4.69.02,4.71l12.43.19c.11.91.17,1.73-.25,2.73Z"/>
              <path className="kp" d="M425.03,122.49l-12.36.1c-2.27.02-4.23-1.78-4.21-4.07l.08-12c.01-1.88,1.33-3.42,3.28-3.42h12.88c2.58,0,4.26,1.66,4.24,4.2l-.07,11.21c-.01,2.07-1.32,3.97-3.84,3.99ZM425.71,119.36l-.02-13.18-13.89.12v13.12c4.74.61,9.06.55,13.92-.06Z"/>
              <path className="kp" d="M217.19,103.24l-.04,15.26c0,2.42-1.77,4.09-4.17,4.09l-11.96-.02c-2.8,0-4.07-2.21-4.04-4.9l.15-14.25c.16-.71,2.82-.59,2.84.38l.35,15.37c4.52,1.05,8.94.84,13.7.18l.22-15.94c.24-.3,1.72-.64,2.94-.17Z"/>
              <path className="kp" d="M531.08,103.86c.52-1.03,2.78-1.16,3.78-.58l-8.99,19c-.63.67-3.61.55-3.99-.24l-8.62-18.68c1.55-.81,3.4-.33,3.98.86l6.66,13.86,7.17-14.22Z"/>
              <path className="kp" d="M647.16,103.69c.45-.92,2.99-.86,3.68-.51l-8.8,18.5c-.53,1.12-2.26,1.08-3.2.8-1.06-.32-1.32-1.32-1.92-2.62l-7.43-16.12c-.29-.62,2.07-1.17,2.89-.55.59.44.83,1.2,1.4,2.34l6.29,12.6,7.1-14.44Z"/>
              <path className="kp" d="M312.39,122.5c-1.05.15-2.06.15-3.31-.22l-.02-15.94-7.91-.27c-.23-.93-.3-1.75-.09-2.78l19.82-.1c.33.97.18,2.85-.41,2.87l-7.97.27-.1,16.16Z"/>
              <path className="kp" d="M379.83,121.84c0,.94-2.18,1.19-3.04.56l-.18-16.01-8.09-.34c-.13-1.13-.13-2.07.03-2.8l19.78-.09.09,2.87-8.46.32-.13,15.5Z"/>
              <path className="kp" d="M281.79,119.75c.16.89.17,1.79-.08,2.87l-17.12-.45-.22-18.21c-.01-1.1,3.18-1.25,3.19-.18l.1,15.88,14.14.09Z"/>
              <path className="kp" d="M611.19,119.75c.1.94.1,1.73-.1,2.81l-16.32-.24-.34-18.97c1.13-.38,1.97-.39,3.1-.03l.07,16.33,13.59.1Z"/>
              <rect className="kp" x="230.54" y="111.26" width="19.5" height="3.18" transform="translate(127.35 353.1) rotate(-89.98)"/>
            </g></g>
          </svg>
        </div>

        {/* ════════════════════════════════════════
            PREMIUM PROGRESS BAR
            Centered, same width as wordmark, 6px tall
        ════════════════════════════════════════ */}
        <div
          className="ktrx-bar mt-9 sm:mt-11 w-full flex flex-col gap-[10px]"
          style={{
            maxWidth: 'clamp(240px, 58vw, 600px)',
            animation: prefersReduced
              ? 'none'
              : 'ktrx-bar-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both',
            opacity: prefersReduced ? 1 : 0,
          }}
        >
          {/* Label row */}
          <div className="flex items-center justify-between w-full">
            <span
              style={{
                fontFamily: 'var(--font-tech, "Orbitron", sans-serif)',
                fontSize: '0.6rem',
                letterSpacing: '0.26em',
                fontWeight: 600,
                color: 'rgba(26,26,46,0.32)',
              }}
            >
              LOADING
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.03em',
                color: '#9333EA',
                minWidth: '3.2ch',
                textAlign: 'right',
              }}
            >
              {prefersReduced ? '100%' : `${progress}%`}
            </span>
          </div>

          {/* Track */}
          <div
            className="w-full relative overflow-hidden"
            style={{
              height: 6,
              borderRadius: 99,
              backgroundColor: 'rgba(147,51,234,0.10)',
            }}
          >
            {/* Fill — scaleX driven by useEffect above */}
            <div
              ref={barRef}
              className="absolute inset-y-0 left-0 right-0 origin-left overflow-hidden"
              style={{
                transform: `scaleX(${progress / 100})`,
                willChange: 'transform',
                borderRadius: 99,
                background: 'linear-gradient(90deg, #9333EA 0%, #7C3AED 55%, #6366F1 100%)',
                boxShadow: '0 0 14px rgba(147,51,234,0.65), 0 0 32px rgba(147,51,234,0.25)',
              }}
            >
              {/* Shimmer sweep */}
              <span
                className="ktrx-sh absolute inset-y-0 w-1/3"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)',
                  animation: prefersReduced ? 'none' : 'ktrx-shimmer 1.5s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </div>

      </motion.div>

      {/* ── Top-left: pulsing status dot ── */}
      <div
        aria-hidden="true"
        className="absolute top-5 left-5 sm:top-7 sm:left-8 z-20"
      >
        <span
          className="ktrx-bt block w-[5px] h-[5px] rounded-full"
          style={{
            backgroundColor: '#9333EA',
            boxShadow: '0 0 6px rgba(147,51,234,0.65)',
            animation: prefersReduced ? 'none' : 'ktrx-beat 1.3s ease-in-out infinite',
          }}
        />
      </div>

      {/* ── Bottom-right: KTRX® badge ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-4 right-5 sm:bottom-6 sm:right-8 z-20"
      >
        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: 'rgba(26,26,46,0.20)',
          }}
        >
          KTRX®
        </span>
      </div>
    </div>
  );
}
