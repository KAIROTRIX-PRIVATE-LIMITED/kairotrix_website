'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// KAIROTRIX Global Component 1.2 — "Footer" (Compact Architectural Edition)
//
// Sleek, compact obsidian footer (#08080C) anchoring every page.
// Transparent vector wordmark, tight vertical rhythm, 4-column taxonomy,
// and live telemetry status.
// ─────────────────────────────────────────────────────────────────────────────

interface FooterLink {
  label: string;
  href: string;
  badge?: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'SOLUTIONS',
    links: [
      { label: 'AI & Intelligent Systems', href: '/solutions/ai-intelligent-systems' },
      { label: 'Software & Product Engineering', href: '/solutions/software-product-engineering' },
      { label: 'Automation & Digital Operations', href: '/solutions/automation-digital-operations' },
      { label: 'Digital Transformation', href: '/solutions/digital-transformation' },
      { label: 'Data & Business Intelligence', href: '/solutions/data-business-intelligence' },
      { label: 'Technology Integration', href: '/solutions/technology-integration' },
    ],
  },
  {
    title: 'WORK',
    links: [
      { label: 'Featured Projects', href: '/work#projects' },
      { label: 'Engineering Experiments', href: '/work#experiments' },
      { label: 'Technical Demonstrations', href: '/work#demos' },
      { label: 'Capabilities & Architecture', href: '/work#capabilities' },
    ],
  },
  {
    title: 'INSIGHTS',
    links: [
      { label: 'Articles & Perspectives', href: '/insights#articles' },
      { label: 'Case Studies', href: '/insights#case-studies' },
      { label: 'System Blueprints', href: '/insights#blueprints' },
      { label: 'Research & Whitepapers', href: '/insights#research' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About KAIROTRIX', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Security & Compliance', href: '/security' },
    ],
  },
];

export function Footer() {
  return (
    <footer
      role="contentinfo"
      aria-label="Site Footer"
      className="relative w-full bg-[#08080C] text-neutral-300 border-t border-neutral-800/80 overflow-hidden"
    >
      {/* Subtle Purple Top Accent Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[80px] bg-purple-600/10 blur-[80px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Main Grid: Left Brand Block + 4 Taxonomy Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 border-b border-neutral-800/70">
          
          {/* Brand Col (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Logo with transparent vector background */}
              <Link href="/" className="inline-block transition-opacity hover:opacity-90" aria-label="KAIROTRIX Home">
                <Image
                  src="/assets/brand/PRIMARY_LOGO_WIDE/KAIROTRIX_Logo_White_Wide.svg"
                  alt="KAIROTRIX"
                  width={160}
                  height={34}
                  className="h-7 w-auto object-contain"
                />
              </Link>
              <p className="mt-2.5 font-mono text-[11px] uppercase tracking-widest text-purple-400 font-medium">
                Built to evolve.
              </p>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed max-w-sm">
                AI Technology & Software Solutions. Engineering deterministic systems, custom platforms,
                and digital operations designed to solve real-world problems.
              </p>
            </div>

            {/* Compact Direct Contact */}
            <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center gap-3">
              <a
                href="mailto:connect@kairotrix.com"
                className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-purple-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>connect@kairotrix.com</span>
              </a>
              <span className="text-neutral-700">•</span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Right Navigation Columns (lg:col-span-8: 4 Columns) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
            {FOOTER_COLUMNS.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col">
                <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-neutral-200 mb-3">
                  {column.title}
                </h3>
                <ul className="space-y-2" role="list">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors duration-150"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-purple-400 transition-all duration-150 group-hover:w-full" />
                        </span>
                        {link.badge && (
                          <span className="px-1.5 py-0.5 text-[9px] font-mono font-medium text-purple-300 bg-purple-950/80 border border-purple-800 rounded">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright, Telemetry, and Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} KAIROTRIX. All rights reserved.</span>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">
              Terms
            </Link>
            <Link href="/security" className="hover:text-neutral-300 transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
