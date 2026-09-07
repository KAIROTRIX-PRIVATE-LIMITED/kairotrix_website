'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  Bot,
  Code2,
  Cpu,
  RefreshCw,
  BarChart3,
  Layers,
  FolderGit2,
  FlaskConical,
  Sparkles,
  Terminal,
  BookOpen,
  FileText,
  Video,
  Compass,
  Lightbulb,
  BrainCircuit,
  Database,
  Globe,
  Rocket,
  Palette,
  Workflow,
  FileCheck,
  Zap,
  TrendingUp,
  Network,
  ArrowLeftRight,
  CreditCard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubServiceItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SolutionCategory {
  id: string;
  title: string;
  shortTitle: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  subServices: SubServiceItem[];
  footerTags: string[];
}

// 6 Core Solutions & Exact Sub-Services Taxonomy with Custom 3D Icons
const SOLUTION_CATEGORIES: SolutionCategory[] = [
  {
    id: 'ai-intelligent-systems',
    title: 'AI & Intelligent Systems',
    shortTitle: 'AI & Intelligent Systems',
    href: '/solutions/ai-intelligent-systems',
    icon: Bot,
    badge: 'Popular',
    subServices: [
      {
        title: 'AI Application Development',
        href: '/solutions/ai-intelligent-systems#ai-apps',
        icon: Sparkles,
      },
      {
        title: 'AI Agent Development',
        href: '/solutions/ai-intelligent-systems#ai-agents',
        icon: Bot,
      },
      {
        title: 'Generative AI & Machine Learning',
        href: '/solutions/ai-intelligent-systems#genai-ml',
        icon: BrainCircuit,
      },
      {
        title: 'AI Knowledge Systems & RAG',
        href: '/solutions/ai-intelligent-systems#knowledge-systems',
        icon: Database,
      },
    ],
    footerTags: ['LLM Apps', 'AI Agents', 'GenAI', 'ML Models', 'RAG Knowledge'],
  },
  {
    id: 'software-product-engineering',
    title: 'Software & Product Engineering',
    shortTitle: 'Software & Product Engineering',
    href: '/solutions/software-product-engineering',
    icon: Code2,
    subServices: [
      {
        title: 'Custom Software Development',
        href: '/solutions/software-product-engineering#custom-software',
        icon: Terminal,
      },
      {
        title: 'Web Application Development',
        href: '/solutions/software-product-engineering#web-apps',
        icon: Globe,
      },
      {
        title: 'Product Development & Engineering',
        href: '/solutions/software-product-engineering#product-dev',
        icon: Rocket,
      },
      {
        title: 'Product Design & Design Systems',
        href: '/solutions/software-product-engineering#product-design',
        icon: Palette,
      },
    ],
    footerTags: ['Custom Software', 'SaaS Apps', 'MVP 0→1', 'Product UI/UX'],
  },
  {
    id: 'automation-digital-operations',
    title: 'Automation & Digital Operations',
    shortTitle: 'Automation & Digital Operations',
    href: '/solutions/automation-digital-operations',
    icon: Cpu,
    subServices: [
      {
        title: 'Business Process Automation',
        href: '/solutions/automation-digital-operations#process-automation',
        icon: Workflow,
      },
      {
        title: 'Workflow & Task Orchestration',
        href: '/solutions/automation-digital-operations#workflows',
        icon: Cpu,
      },
      {
        title: 'Document & Approval Automation',
        href: '/solutions/automation-digital-operations#document-automation',
        icon: FileCheck,
      },
      {
        title: 'Autonomous Digital Operations',
        href: '/solutions/automation-digital-operations#digital-ops',
        icon: Zap,
      },
    ],
    footerTags: ['Workflow Automation', 'Document AI', 'Approval Triggers', 'Ops Bots'],
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    shortTitle: 'Digital Transformation',
    href: '/solutions/digital-transformation',
    icon: RefreshCw,
    subServices: [
      {
        title: 'Website Development & Web Craft',
        href: '/solutions/digital-transformation#website-development',
        icon: Globe,
      },
      {
        title: 'Process Digitization & Modernization',
        href: '/solutions/digital-transformation#process-digitization',
        icon: RefreshCw,
      },
      {
        title: 'UI/UX Research & Interface Design',
        href: '/solutions/digital-transformation#ui-ux-design',
        icon: Palette,
      },
      {
        title: 'Headless CMS & Web Modernization',
        href: '/solutions/digital-transformation#cms-modernization',
        icon: Layers,
      },
    ],
    footerTags: ['Corporate Websites', 'Landing Pages', 'Process Digitization', 'UI/UX Craft'],
  },
  {
    id: 'data-business-intelligence',
    title: 'Data & Business Intelligence',
    shortTitle: 'Data & Business Intelligence',
    href: '/solutions/data-business-intelligence',
    icon: BarChart3,
    subServices: [
      {
        title: 'Business Data Analytics',
        href: '/solutions/data-business-intelligence#analytics',
        icon: BarChart3,
      },
      {
        title: 'Executive & KPI Dashboards',
        href: '/solutions/data-business-intelligence#dashboards',
        icon: TrendingUp,
      },
      {
        title: 'Predictive Modeling & Forecasting',
        href: '/solutions/data-business-intelligence#predictive',
        icon: BrainCircuit,
      },
      {
        title: 'Natural-Language Data Queries',
        href: '/solutions/data-business-intelligence#nl-queries',
        icon: Bot,
      },
    ],
    footerTags: ['Data Analytics', 'KPI Dashboards', 'Predictive AI', 'Self-Service BI'],
  },
  {
    id: 'technology-integration',
    title: 'Technology Integration',
    shortTitle: 'Technology Integration',
    href: '/solutions/technology-integration',
    icon: Layers,
    subServices: [
      {
        title: 'API & System Integration',
        href: '/solutions/technology-integration#api-integration',
        icon: Network,
      },
      {
        title: 'CRM & ERP Synchronization',
        href: '/solutions/technology-integration#crm-erp',
        icon: ArrowLeftRight,
      },
      {
        title: 'Payment & Billing Gateways',
        href: '/solutions/technology-integration#payments',
        icon: CreditCard,
      },
      {
        title: 'Cross-System Data Synchronization',
        href: '/solutions/technology-integration#data-sync',
        icon: Database,
      },
    ],
    footerTags: ['Custom APIs', 'CRM/ERP Sync', 'Stripe Billing', 'Real-Time Sync'],
  },
];

const WORK_ITEMS = [
  {
    title: 'Projects',
    description: 'Production software builds & deployed systems',
    href: '/work#projects',
    icon: FolderGit2,
  },
  {
    title: 'Experiments',
    description: 'R&D exploratory prototypes & advanced AI models',
    href: '/work#experiments',
    icon: FlaskConical,
  },
  {
    title: 'Technical Demonstrations',
    description: 'Interactive live proof of engineering & UI capability',
    href: '/work#demos',
    icon: Sparkles,
  },
  {
    title: 'Capabilities & Technology',
    description: 'Architectural standards, engineering depth & modern tech stack',
    href: '/work#capabilities',
    icon: Terminal,
  },
];

const INSIGHTS_ITEMS = [
  {
    title: 'Articles / Blog',
    description: 'Technical essays, AI insights & software engineering commentary',
    href: '/insights#articles',
    icon: FileText,
  },
  {
    title: 'Case Studies',
    description: 'System architecture breakdowns & technical implementation blueprints',
    href: '/insights#case-studies',
    icon: BookOpen,
  },
  {
    title: 'System Blueprints',
    description: 'Production-ready system architectures, data flows & reference designs',
    href: '/insights#blueprints',
    icon: Cpu,
  },
  {
    title: 'Research & Whitepapers',
    description: 'In-depth AI evaluations, performance benchmarks & tech reports',
    href: '/insights#research',
    icon: BrainCircuit,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const isDark = false;


  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [activeMenu, setActiveMenu] = useState<'solutions' | 'work' | 'insights' | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeSolutionId, setActiveSolutionId] = useState<string>(SOLUTION_CATEGORIES[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [mobileExpandedSolution, setMobileExpandedSolution] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Current active solution category for the right panel
  const activeSolution =
    SOLUTION_CATEGORIES.find((cat) => cat.id === activeSolutionId) || SOLUTION_CATEGORIES[0];
  const ActiveIcon = activeSolution.icon;

  // Handle scroll detection: hides ONLY during Hero video playback, sticks to top everywhere else
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Detect whether we are in the Hero video scroll region
      const whatIsSection = document.getElementById('what-is-kairotrix');
      const isHeroActive = whatIsSection
        ? currentScrollY < whatIsSection.offsetTop - 100
        : false;

      if (isHeroActive) {
        // Hero Section: Hide on scroll down to allow full cinematic video immersion
        if (currentScrollY <= 10) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY.current + 4 && currentScrollY > 20) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current - 4) {
          setIsVisible(true);
        }
      } else {
        // Everywhere else: Navbar remains firmly stuck to the top of the viewport
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle keyboard Escape to close menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth hover intent with debounce
  const handleMouseEnter = (menu: 'solutions' | 'work' | 'insights') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
    setHoveredNav(menu);
  };

  const handleMouseLeave = () => {
    setHoveredNav(null);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const handleSubServiceNavigate = (href: string) => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
    const hash = href.split('#')[1];
    if (hash && typeof window !== 'undefined') {
      const targetPath = href.split('#')[0];
      const currentPath = window.location.pathname;
      if (currentPath === targetPath) {
        window.history.pushState(null, '', `#${hash}`);
        window.dispatchEvent(
          new CustomEvent('kairotrix:navigate-service', { detail: { hash } })
        );
      }
    }
  };

  const handleWorkNavigate = (href: string) => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
    const hash = href.split('#')[1];
    if (hash && typeof window !== 'undefined') {
      const targetPath = href.split('#')[0] || '/work';
      const currentPath = window.location.pathname;
      if (currentPath === targetPath) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `#${hash}`);
        }
      }
    }
  };

  const handleInsightsNavigate = (href: string) => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
    const hash = href.split('#')[1];
    if (hash && typeof window !== 'undefined') {
      const targetPath = href.split('#')[0] || '/insights';
      const currentPath = window.location.pathname;
      if (currentPath === targetPath) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `#${hash}`);
        }
      }
    }
  };

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        isScrolled ? 'py-2.5 sm:py-3' : 'py-3.5 sm:py-4.5',
        !isVisible && !activeMenu && !mobileMenuOpen && '-translate-y-full pointer-events-none shadow-none'
      )}
    >
      {/* Silky-Smooth Animated Backdrop Layer with 3D Specular Highlight */}
      <div
        className={cn(
          'absolute inset-0 -z-10 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none',
          isScrolled
            ? isDark
              ? 'opacity-100 bg-[#08080C]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]'
              : 'opacity-100 bg-white/85 backdrop-blur-2xl border-b border-black/[0.08] shadow-[0_8px_32px_rgba(147,51,234,0.12),0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]'
            : 'opacity-0 bg-transparent backdrop-blur-none border-b border-transparent shadow-none'
        )}
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* === BRAND LOGO (LEFT CORNER) === */}
          <div className="flex-1 flex items-center justify-start">
            <Link
              href="/"
              className="group/logo flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-0.5"
              aria-label="KAIROTRIX Home"
            >
              <Image
                src={
                  isDark
                    ? '/assets/brand/PRIMARY_LOGO_WIDE/KAIROTRIX_Logo_White_Wide.svg'
                    : '/assets/brand/PRIMARY_LOGO_WIDE/KAIROTRIX_Logo_Black_Wide.svg'
                }
                alt="KAIROTRIX"
                width={200}
                height={46}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-all duration-300"
                priority
              />
            </Link>
          </div>

          {/* === DESKTOP NAVIGATION (CENTERED WITH FLOATING 3D GLASS PILLS) === */}
          <nav
            onMouseLeave={() => setHoveredNav(null)}
            className={cn(
              'relative hidden lg:flex items-center justify-center gap-1 p-1.5 rounded-2xl border transition-all duration-300',
              isDark
                ? 'bg-[#0E0E18]/60 backdrop-blur-xl border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]'
                : 'bg-white/70 backdrop-blur-xl border-black/[0.06] shadow-[0_6px_24px_rgba(147,51,234,0.12),0_2px_10px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]'
            )}
          >
            
            {/* 1. Solutions Mega Menu trigger (Static parent centers menu relative to <nav>) */}
            <div
              className="static"
              onMouseEnter={() => handleMouseEnter('solutions')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative">
                <Link
                  href="/solutions"
                  onClick={() => setActiveMenu(null)}
                  className={cn(
                    'relative z-10 flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                    activeMenu === 'solutions' || pathname.startsWith('/solutions')
                      ? isDark ? 'text-white font-medium' : 'text-neutral-900 font-medium'
                      : isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                  )}
                  aria-expanded={activeMenu === 'solutions'}
                  aria-haspopup="true"
                >
                  <span>Solutions</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200/80 leading-none">
                    AI
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-3.5 h-3.5 transition-transform duration-300',
                      isDark ? 'text-neutral-400' : 'text-neutral-400',
                      activeMenu === 'solutions' && 'rotate-180 text-brand-500'
                    )}
                  />
                </Link>

                {/* Smooth Floating Hover Pill */}
                {hoveredNav === 'solutions' && (
                  <motion.div
                    layoutId="navHoverPill"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className={cn(
                      'absolute inset-0 rounded-xl pointer-events-none -z-0',
                      isDark
                        ? 'bg-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]'
                        : 'bg-black/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]'
                    )}
                  />
                )}
              </div>

              {/* === TWO-COLUMN 3D SOLUTIONS MEGA MENU (PERFECTLY CENTERED, ZERO TONAL BLEED) === */}
              <AnimatePresence>
                {activeMenu === 'solutions' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                      setActiveMenu('solutions');
                    }}
                    onMouseLeave={handleMouseLeave}
                    className={cn(
                      'absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[1020px] xl:w-[1080px] rounded-3xl backdrop-blur-3xl border z-50 overflow-hidden before:absolute before:-top-3.5 before:left-0 before:right-0 before:h-3.5 before:content-[\'\']',
                      isDark
                        ? 'bg-[#0A0A14]/98 border-white/[0.14] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_25px_80px_rgba(0,0,0,0.98),0_0_50px_rgba(147,51,234,0.22),inset_0_1px_1px_rgba(255,255,255,0.18)]'
                        : 'bg-white/99 border-neutral-300/80 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_15px_35px_-5px_rgba(0,0,0,0.08),0_30px_70px_-10px_rgba(147,51,234,0.18),inset_0_1px_1px_rgba(255,255,255,1)]'
                    )}
                  >
                    <div className={cn('flex divide-x', isDark ? 'divide-white/[0.06]' : 'divide-neutral-200/80')}>
                      
                      {/* === LEFT COLUMN: 6 CORE SOLUTIONS (PRIMARY FOUNDATIONAL PILLARS) === */}
                      <div className={cn('w-[350px] xl:w-[370px] p-4 flex flex-col justify-between shrink-0', isDark ? 'bg-white/[0.015]' : 'bg-white')}>
                        <div>
                          {/* Commanding Section Header with Live Brand Dot & Badge */}
                          <div className={cn('px-2.5 py-2 mb-2.5 flex items-center justify-between border-b', isDark ? 'border-white/[0.08]' : 'border-neutral-200/80')}>
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(147,51,234,0.8)]" />
                              <span className={cn('text-xs font-bold tracking-widest uppercase', isDark ? 'text-neutral-200' : 'text-neutral-900')}>
                                Core Solutions
                              </span>
                            </div>
                            <span className={cn(
                              'text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider',
                              isDark
                                ? 'text-brand-300 bg-brand-500/15 border border-brand-500/30 shadow-[0_0_8px_rgba(147,51,234,0.2)]'
                                : 'text-brand-700 bg-brand-50 border border-brand-200 shadow-2xs'
                            )}>
                              6 Pillars
                            </span>
                          </div>

                          {/* 6 Core Solutions Interactive Pillar List */}
                          <div className="space-y-1 relative">
                            {SOLUTION_CATEGORIES.map((category) => {
                              const CategoryIcon = category.icon;
                              const isSelected = activeSolutionId === category.id;
                              return (
                                <Link
                                  key={category.id}
                                  href={category.href}
                                  onMouseEnter={() => setActiveSolutionId(category.id)}
                                  className={cn(
                                    'relative w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-200 group',
                                    isSelected
                                      ? isDark
                                        ? 'text-white font-semibold'
                                        : 'text-brand-600 font-semibold'
                                      : isDark
                                        ? 'text-neutral-300 hover:text-white font-medium'
                                        : 'text-neutral-700 hover:text-neutral-950 font-medium'
                                  )}
                                >
                                  {/* Authoritative Luminous Active Pill */}
                                  {isSelected && (
                                    <motion.div
                                      layoutId="activeCategoryPill"
                                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                                      className={cn(
                                        'absolute inset-0 rounded-xl border pointer-events-none',
                                        isDark
                                          ? 'bg-gradient-to-r from-brand-500/30 via-brand-500/15 to-transparent border-brand-500/70 shadow-[inset_0_0_24px_rgba(147,51,234,0.3),0_0_20px_rgba(147,51,234,0.2)]'
                                          : 'bg-gradient-to-r from-brand-500/8 via-brand-500/105 to-white/70 border-brand-500/55 shadow-[0_4px_18px_rgba(147,51,234,0.18),inset_0_1px_1px_rgba(255,255,255,1)]'
                                      )}
                                    />
                                  )}

                                  <div className="relative z-10 flex items-center gap-3">
                                    {/* UNIFIED TACTILE ICON TILE */}
                                    <div
                                      className={cn(
                                        'p-2 rounded-xl border transition-all duration-300 shrink-0',
                                        isSelected
                                          ? isDark
                                            ? 'bg-gradient-to-br from-brand-500 via-purple-600 to-indigo-600 border-brand-400/80 text-white shadow-[0_0_20px_rgba(147,51,234,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] scale-105'
                                            : 'bg-gradient-to-br from-brand-600 via-purple-600 to-indigo-600 border-brand-400 text-white shadow-[0_4px_16px_rgba(147,51,234,0.35),inset_0_1px_1px_rgba(255,255,255,0.5)] scale-105'
                                          : isDark
                                            ? 'bg-[#151526] border-white/[0.08] text-brand-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:via-purple-600 group-hover:to-indigo-600 group-hover:border-brand-400/80 group-hover:text-white group-hover:shadow-[0_0_18px_rgba(147,51,234,0.5)] group-hover:scale-105'
                                            : 'bg-purple-50/70 border-neutral-200/90 text-brand-600 shadow-[0_1px_4px_rgba(147,51,234,0.06),inset_0_1px_0_rgba(255,255,255,1)] group-hover:bg-gradient-to-br group-hover:from-brand-600 group-hover:via-purple-600 group-hover:to-indigo-600 group-hover:border-brand-400 group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(147,51,234,0.3)] group-hover:scale-105'
                                      )}
                                    >
                                      <CategoryIcon className="w-4 h-4" />
                                    </div>
                                    <span className="leading-snug whitespace-nowrap">{category.shortTitle}</span>
                                  </div>

                                  <div className="relative z-10 flex items-center gap-1.5 shrink-0 ml-1">
                                    {category.badge && (
                                      <span className={cn(
                                        'px-1.5 py-0.5 text-[10px] uppercase font-bold rounded',
                                        isDark
                                          ? 'text-brand-300 bg-brand-500/25 border border-brand-500/50 shadow-[0_0_8px_rgba(147,51,234,0.3)]'
                                          : 'text-brand-700 bg-brand-500/12 border border-brand-500/30'
                                      )}>
                                        {category.badge}
                                      </span>
                                    )}
                                    <ChevronRight
                                      className={cn(
                                        'w-4 h-4 transition-transform duration-300',
                                        isSelected
                                          ? isDark
                                            ? 'text-brand-300 translate-x-1 font-bold'
                                            : 'text-brand-600 translate-x-1 font-bold'
                                          : isDark
                                            ? 'text-neutral-500 group-hover:text-neutral-300 group-hover:translate-x-0.5'
                                            : 'text-neutral-400 group-hover:text-neutral-600 group-hover:translate-x-0.5'
                                      )}
                                    />
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* Featured: Find Your Solution (KAIROS AI Copilot) */}
                        <div className={cn('pt-3 mt-3 border-t px-1 space-y-2', isDark ? 'border-white/[0.08]' : 'border-neutral-200/80')}>
                          <Link
                            href="/solutions#find-solution"
                            onClick={() => setActiveMenu(null)}
                            className={cn(
                              'w-full flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 group',
                              isDark
                                ? 'bg-purple-950/40 hover:bg-purple-900/50 border-purple-500/30 text-white shadow-[0_0_15px_rgba(147,51,234,0.15)]'
                                : 'bg-purple-50/90 hover:bg-purple-100 border-purple-200/90 text-purple-900 shadow-2xs'
                            )}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="p-1.5 rounded-lg bg-purple-600 text-white shadow-xs">
                                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold leading-none">Find Your Solution</span>
                                  <span className="text-[9px] font-mono font-bold uppercase px-1 py-0.2 rounded bg-purple-600 text-white">AI</span>
                                </div>
                                <p className={cn('text-[11px] mt-0.5 leading-tight', isDark ? 'text-purple-300/80' : 'text-purple-700/80')}>
                                  Interactive architecture copilot
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-purple-600 transform group-hover:translate-x-1 transition-transform" />
                          </Link>

                          {/* All Solutions Quick Link with High Tactile Presence */}
                          <Link
                            href="/solutions"
                            onClick={() => setActiveMenu(null)}
                            className={cn(
                              'w-full flex items-center justify-between p-2 rounded-xl border text-xs font-semibold transition-all duration-300 group',
                              isDark
                                ? 'bg-[#12121E] hover:bg-white/[0.04] border-white/[0.08] text-neutral-300 hover:text-white'
                                : 'bg-white hover:bg-neutral-50 border-neutral-200/80 text-neutral-700 hover:text-neutral-900'
                            )}
                          >
                            <span>Browse All 6 Solution Areas</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>

                      {/* === RIGHT COLUMN: 3D ENHANCED SERVICE CARDS WITH ANTI-TONAL BLEED & ATMOSPHERIC GLOW === */}
                      <div className={cn(
                        'relative flex-1 p-6 flex flex-col justify-between overflow-hidden',
                        isDark
                          ? 'bg-gradient-to-br from-[#0C0C16]/98 via-[#090912]/98 to-[#06060A]/98'
                          : 'bg-white'
                      )}>
                        {/* Atmospheric Corner Ambient Mesh Glow */}
                        <div className={cn(
                          'absolute top-0 right-0 w-[420px] h-[280px] pointer-events-none rounded-tr-3xl -z-0 blur-3xl transition-opacity duration-500',
                          isDark
                            ? 'bg-[radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.16),transparent_70%)]'
                            : 'bg-[radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.08),transparent_70%)]'
                        )} />

                        <div className="relative z-10">
                          {/* Header of Active Category */}
                          <div className={cn('flex items-center justify-between gap-4 pb-3.5 border-b', isDark ? 'border-white/[0.08]' : 'border-neutral-200/80')}>
                            <Link
                              href={activeSolution.href}
                              onClick={() => setActiveMenu(null)}
                              className="group/head flex items-center gap-2.5"
                            >
                              <div className={cn(
                                'p-2 rounded-xl border transition-all duration-300 group-hover/head:scale-105',
                                isDark
                                  ? 'bg-gradient-to-br from-brand-500 via-purple-600 to-indigo-600 border-brand-400/80 text-white shadow-[0_0_20px_rgba(147,51,234,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)]'
                                  : 'bg-gradient-to-br from-brand-600 via-purple-600 to-indigo-600 border-brand-400 text-white shadow-[0_4px_16px_rgba(147,51,234,0.35),inset_0_1px_1px_rgba(255,255,255,0.5)]'
                              )}>
                                <ActiveIcon className="w-4 h-4" />
                              </div>
                              <span className={cn(
                                'text-sm sm:text-base font-medium tracking-wide transition-colors',
                                isDark ? 'text-white group-hover/head:text-brand-300' : 'text-neutral-800 group-hover/head:text-brand-700'
                              )}>
                                {activeSolution.title}
                              </span>
                            </Link>

                            <Link
                              href={activeSolution.href}
                              onClick={() => setActiveMenu(null)}
                              className={cn(
                                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all duration-300 group/btn',
                                isDark
                                  ? 'bg-brand-500/15 hover:bg-brand-500/30 border-brand-500/40 hover:border-brand-500/70 text-brand-300 hover:text-white shadow-[0_0_15px_rgba(147,51,234,0.2)]'
                                  : 'bg-brand-500/08 hover:bg-brand-500/20 border-brand-500/20 hover:border-brand-500/45 text-brand-600 hover:text-brand-700 shadow-2xs'
                              )}
                            >
                              <span>Explore Architecture</span>
                              <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </div>

                          {/* Sub-services 3D Cards with Refined Luminous Gradient Icons */}
                          <div className="grid grid-cols-2 gap-3.5 pt-5">
                            {activeSolution.subServices.map((service, index) => {
                              const SubIcon = service.icon;
                              return (
                                <Link
                                  key={index}
                                  href={service.href}
                                  onClick={() => handleSubServiceNavigate(service.href)}
                                  className={cn(
                                    'group/card relative flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 overflow-hidden hover:-translate-y-0.5',
                                    isDark
                                      ? 'bg-[#12121E]/90 border-white/[0.08] hover:border-brand-500/60 hover:bg-gradient-to-r hover:from-brand-500/25 hover:via-brand-500/10 hover:to-transparent shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_12px_30px_-8px_rgba(147,51,234,0.45),inset_0_1px_0_rgba(255,255,255,0.2)]'
                                      : 'bg-white border-neutral-200/90 hover:border-brand-500/50 hover:bg-gradient-to-r hover:from-brand-500/10 hover:via-purple-50/50 hover:to-white shadow-[0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_8px_24px_-4px_rgba(147,51,234,0.20)]'
                                  )}
                                >
                                  {/* Specular sheen animation on hover */}
                                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-700 pointer-events-none" />

                                  <div className="flex items-center gap-3 min-w-0 pr-2">
                                    {/* UNIFIED TACTILE ICON TILE */}
                                    <div className={cn(
                                      'p-2 rounded-xl border transition-all duration-300 shrink-0 group-hover/card:scale-105',
                                      isDark
                                        ? 'bg-[#151526] border-white/[0.08] text-brand-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] group-hover/card:bg-gradient-to-br group-hover/card:from-brand-500 group-hover/card:via-purple-600 group-hover/card:to-indigo-600 group-hover/card:border-brand-400/80 group-hover/card:text-white group-hover/card:shadow-[0_0_18px_rgba(147,51,234,0.5)]'
                                        : 'bg-purple-50/70 border-neutral-200/90 text-brand-600 shadow-[0_1px_4px_rgba(147,51,234,0.06),inset_0_1px_0_rgba(255,255,255,1)] group-hover/card:bg-gradient-to-br group-hover/card:from-brand-600 group-hover/card:via-purple-600 group-hover/card:to-indigo-600 group-hover/card:border-brand-400 group-hover/card:text-white group-hover/card:shadow-[0_4px_16px_rgba(147,51,234,0.3)]'
                                    )}>
                                      <SubIcon className="w-4 h-4" />
                                    </div>

                                    <span className={cn(
                                      'text-xs sm:text-sm font-medium transition-colors leading-snug',
                                      isDark
                                        ? 'text-neutral-200 group-hover/card:text-white'
                                        : 'text-neutral-700 group-hover/card:text-brand-700'
                                    )}>
                                      {service.title}
                                    </span>
                                  </div>

                                  <div className={cn(
                                    'w-7 h-7 rounded-xl flex items-center justify-center border transition-all duration-300 shrink-0 group-hover/card:translate-x-1',
                                    isDark
                                      ? 'bg-white/[0.03] border-white/[0.06] text-neutral-400 group-hover/card:text-brand-200 group-hover/card:bg-brand-500/30 group-hover/card:border-brand-500/50'
                                      : 'bg-black/[0.02] border-black/[0.04] text-neutral-400 group-hover/card:text-brand-600 group-hover/card:bg-brand-500/15 group-hover/card:border-brand-500/30'
                                  )}>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* Footer capabilities bar */}
                        <div className={cn('relative z-10 pt-4 mt-5 border-t flex items-center justify-between text-xs', isDark ? 'border-white/[0.08] text-neutral-400' : 'border-neutral-200/80 text-neutral-500')}>
                          <div className="flex items-center gap-2 overflow-hidden mr-3">
                            <span className={cn('font-medium uppercase tracking-wider text-[11px] shrink-0', isDark ? 'text-brand-400' : 'text-brand-600')}>
                              Capabilities:
                            </span>
                            <span className="truncate">
                              {activeSolution.footerTags.join('  •  ')}
                            </span>
                          </div>

                          <Link
                            href="/solutions#find-solution"
                            onClick={() => setActiveMenu(null)}
                            className={cn(
                              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 border group',
                              isDark
                                ? 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border-purple-500/40 shadow-[0_0_12px_rgba(147,51,234,0.2)]'
                                : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200/90 shadow-2xs'
                            )}
                          >
                            <Sparkles className="w-3.5 h-3.5 text-purple-600 group-hover:rotate-12 transition-transform" />
                            <span>Diagnose Architecture with AI</span>
                            <ArrowRight className="w-3 h-3 text-purple-600 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Work Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('work')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/work"
                onClick={() => setActiveMenu(null)}
                className={cn(
                  'relative z-10 flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                  activeMenu === 'work' || pathname.startsWith('/work')
                    ? isDark ? 'text-white font-medium' : 'text-neutral-900 font-medium'
                    : isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                )}
                aria-expanded={activeMenu === 'work'}
                aria-haspopup="true"
              >
                <span>Work</span>
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 transition-transform duration-300',
                    isDark ? 'text-neutral-400' : 'text-neutral-400',
                    activeMenu === 'work' && 'rotate-180 text-brand-500'
                  )}
                />
              </Link>

              {hoveredNav === 'work' && (
                <motion.div
                  layoutId="navHoverPill"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className={cn(
                    'absolute inset-0 rounded-xl pointer-events-none -z-0',
                    isDark
                      ? 'bg-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]'
                      : 'bg-black/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]'
                  )}
                />
              )}

              {/* Work Dropdown Menu with Refined Gradient Hover Icons */}
              <AnimatePresence>
                {activeMenu === 'work' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                      setActiveMenu('work');
                    }}
                    onMouseLeave={handleMouseLeave}
                    className={cn(
                      'absolute top-full left-0 mt-3 w-84 p-2.5 rounded-2xl backdrop-blur-3xl border z-50 overflow-hidden before:absolute before:-top-3.5 before:left-0 before:right-0 before:h-3.5 before:content-[\'\']',
                      isDark
                        ? 'bg-[#0A0A14]/98 border-white/[0.14] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_25px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(147,51,234,0.15)]'
                        : 'bg-white/99 border-neutral-300/80 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_12px_30px_-6px_rgba(0,0,0,0.08),0_25px_50px_-10px_rgba(147,51,234,0.18)]'
                    )}
                  >
                    <div className="space-y-1.5">
                      {WORK_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => handleWorkNavigate(item.href)}
                            className={cn(
                              'group/item relative flex items-start gap-3.5 p-3 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 overflow-hidden',
                              isDark
                                ? 'bg-white/[0.02] border-white/[0.04] hover:border-brand-500/50 hover:bg-gradient-to-r hover:from-brand-500/25 hover:via-brand-500/10 hover:to-transparent hover:shadow-[0_8px_25px_-6px_rgba(147,51,234,0.35)]'
                                : 'bg-black/[0.01] border-black/[0.04] hover:border-brand-500/35 hover:bg-gradient-to-r hover:from-brand-500/12 hover:via-brand-500/06 hover:to-transparent hover:shadow-[0_8px_20px_-6px_rgba(147,51,234,0.12)]'
                            )}
                          >
                            <div className={cn(
                              'mt-0.5 p-2 rounded-xl border transition-all duration-300 shrink-0 group-hover/item:scale-105',
                              isDark
                                ? 'bg-[#151526] border-white/[0.08] text-brand-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] group-hover/item:bg-gradient-to-br group-hover/item:from-brand-500 group-hover/item:via-purple-600 group-hover/item:to-indigo-600 group-hover/item:border-brand-400/80 group-hover/item:text-white group-hover/item:shadow-[0_0_18px_rgba(147,51,234,0.5)]'
                                : 'bg-purple-50/70 border-neutral-200/90 text-brand-600 shadow-[0_1px_4px_rgba(147,51,234,0.06),inset_0_1px_0_rgba(255,255,255,1)] group-hover/item:bg-gradient-to-br group-hover/item:from-brand-600 group-hover/item:via-purple-600 group-hover/item:to-indigo-600 group-hover/item:border-brand-400 group-hover/item:text-white group-hover/item:shadow-[0_4px_16px_rgba(147,51,234,0.3)]'
                            )}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className={cn(
                                'text-sm font-medium transition-colors',
                                isDark ? 'text-neutral-200 group-hover/item:text-white' : 'text-neutral-700 group-hover/item:text-brand-600'
                              )}>
                                {item.title}
                              </h5>
                              <p className={cn(
                                'text-xs mt-0.5 line-clamp-1 font-normal',
                                isDark ? 'text-neutral-400 group-hover/item:text-neutral-300' : 'text-neutral-500 group-hover/item:text-neutral-600'
                              )}>
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}

                      {/* Master Portfolio Link */}
                      <div className="pt-2 mt-1.5 border-t border-neutral-200/80">
                        <Link
                          href="/work"
                          onClick={() => setActiveMenu(null)}
                          className={cn(
                            'flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all group',
                            isDark
                              ? 'bg-brand-500/15 hover:bg-brand-500/25 text-brand-300 hover:text-white border border-brand-500/30'
                              : 'bg-brand-50 hover:bg-brand-100 text-brand-700 hover:text-brand-800 border border-brand-200/70 shadow-2xs'
                          )}
                        >
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                            <span>Explore All 12 Specimens & Proof</span>
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-brand-500 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Insights Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('insights')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/insights"
                onClick={() => setActiveMenu(null)}
                className={cn(
                  'relative z-10 flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                  activeMenu === 'insights' || pathname.startsWith('/insights')
                    ? isDark ? 'text-white font-medium' : 'text-neutral-900 font-medium'
                    : isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                )}
                aria-expanded={activeMenu === 'insights'}
                aria-haspopup="true"
              >
                <span>Insights</span>
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 transition-transform duration-300',
                    isDark ? 'text-neutral-400' : 'text-neutral-400',
                    activeMenu === 'insights' && 'rotate-180 text-brand-500'
                  )}
                />
              </Link>

              {hoveredNav === 'insights' && (
                <motion.div
                  layoutId="navHoverPill"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className={cn(
                    'absolute inset-0 rounded-xl pointer-events-none -z-0',
                    isDark
                      ? 'bg-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]'
                      : 'bg-black/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]'
                  )}
                />
              )}

              {/* Insights Dropdown Menu with Refined Gradient Hover Icons */}
              <AnimatePresence>
                {activeMenu === 'insights' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                      setActiveMenu('insights');
                    }}
                    onMouseLeave={handleMouseLeave}
                    className={cn(
                      'absolute top-full left-0 mt-3 w-84 p-2.5 rounded-2xl backdrop-blur-3xl border z-50 overflow-hidden before:absolute before:-top-3.5 before:left-0 before:right-0 before:h-3.5 before:content-[\'\']',
                      isDark
                        ? 'bg-[#0A0A14]/98 border-white/[0.14] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_25px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(147,51,234,0.15)]'
                        : 'bg-white/99 border-neutral-300/80 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_12px_30px_-6px_rgba(0,0,0,0.08),0_25px_50px_-10px_rgba(147,51,234,0.18)]'
                    )}
                  >
                    <div className="space-y-1.5">
                      {INSIGHTS_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => handleInsightsNavigate(item.href)}
                            className={cn(
                              'group/item relative flex items-start gap-3.5 p-3 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 overflow-hidden',
                              isDark
                                ? 'bg-white/[0.02] border-white/[0.04] hover:border-brand-500/50 hover:bg-gradient-to-r hover:from-brand-500/25 hover:via-brand-500/10 hover:to-transparent hover:shadow-[0_8px_25px_-6px_rgba(147,51,234,0.35)]'
                                : 'bg-black/[0.01] border-black/[0.04] hover:border-brand-500/35 hover:bg-gradient-to-r hover:from-brand-500/12 hover:via-brand-500/06 hover:to-transparent hover:shadow-[0_8px_20px_-6px_rgba(147,51,234,0.12)]'
                            )}
                          >
                            <div className={cn(
                              'mt-0.5 p-2 rounded-xl border transition-all duration-300 shrink-0 group-hover/item:scale-105',
                              isDark
                                ? 'bg-[#151526] border-white/[0.08] text-brand-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] group-hover/item:bg-gradient-to-br group-hover/item:from-brand-500 group-hover/item:via-purple-600 group-hover/item:to-indigo-600 group-hover/item:border-brand-400/80 group-hover/item:text-white group-hover/item:shadow-[0_0_18px_rgba(147,51,234,0.5)]'
                              : 'bg-purple-50/70 border-neutral-200/90 text-brand-600 shadow-[0_1px_4px_rgba(147,51,234,0.06),inset_0_1px_0_rgba(255,255,255,1)] group-hover/item:bg-gradient-to-br group-hover/item:from-brand-600 group-hover/item:via-purple-600 group-hover/item:to-indigo-600 group-hover/item:border-brand-400 group-hover/item:text-white group-hover/item:shadow-[0_4px_16px_rgba(147,51,234,0.3)]'
                            )}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className={cn(
                                'text-sm font-medium transition-colors',
                                isDark ? 'text-neutral-200 group-hover/item:text-white' : 'text-neutral-700 group-hover/item:text-brand-600'
                              )}>
                                {item.title}
                              </h5>
                              <p className={cn(
                                'text-xs mt-0.5 line-clamp-1 font-normal',
                                isDark ? 'text-neutral-400 group-hover/item:text-neutral-300' : 'text-neutral-500 group-hover/item:text-neutral-600'
                              )}>
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}

                      {/* Master Repository Link */}
                      <div className="pt-2 mt-1.5 border-t border-neutral-200/80">
                        <Link
                          href="/insights"
                          onClick={() => setActiveMenu(null)}
                          className={cn(
                            'flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all group',
                            isDark
                              ? 'bg-brand-500/15 hover:bg-brand-500/25 text-brand-300 hover:text-white border border-brand-500/30'
                              : 'bg-brand-50 hover:bg-brand-100 text-brand-700 hover:text-brand-800 border border-brand-200/70 shadow-2xs'
                          )}
                        >
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                            <span>Explore All 8 Schematics & Papers</span>
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-brand-500 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. About Direct Link */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredNav('about')}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <Link
                href="/about"
                className={cn(
                  'relative z-10 px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 block',
                  pathname === '/about'
                    ? isDark ? 'text-white font-medium' : 'text-neutral-900 font-medium'
                    : isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                )}
              >
                About
              </Link>
              {hoveredNav === 'about' && (
                <motion.div
                  layoutId="navHoverPill"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  className={cn(
                    'absolute inset-0 rounded-xl pointer-events-none -z-0',
                    isDark
                      ? 'bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
                      : 'bg-black/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]'
                  )}
                />
              )}
            </div>

          </nav>

          {/* === PERSISTENT PRIMARY CTA & MOBILE TOGGLE (RIGHT CORNER) === */}
          <div className="flex-1 flex items-center justify-end gap-2.5 sm:gap-3">
            {/* Primary CTA: Unique Luminous Pill with Subtle Ambient Glow & Glass Arrow Badge */}
            <Link
              href="/contact"
              className="relative group p-[1px] rounded-full transition-all duration-300 active:scale-[0.97]"
              aria-label="Let's Talk - Contact KAIROTRIX"
            >
              {/* Subtle Ambient Backlight Glow (Expands on Hover) */}
              <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-brand-500 via-purple-500 to-indigo-500 opacity-45 blur-sm group-hover:opacity-85 group-hover:blur-md transition-all duration-500 pointer-events-none" />

              {/* Main Button Body */}
              <span className="relative flex items-center gap-2.5 px-4 sm:px-4.5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-medium tracking-wide border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_12px_rgba(147,51,234,0.3)] overflow-hidden transition-all duration-300">
                {/* Light Sweep Shimmer on Hover */}
                <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 group-hover:left-[120%] transition-all duration-700 ease-out pointer-events-none" />

                {/* Subtle Live Availability Pulse Dot */}
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </span>

                <span className="leading-none">Let&apos;s Talk</span>

                {/* Interactive Glass Disc Arrow Badge */}
                <span className="w-5 sm:w-5.5 h-5 sm:h-5.5 rounded-full bg-white/15 border border-white/25 flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:scale-105 group-hover:translate-x-0.5 shrink-0">
                  <ArrowRight className="w-3 h-3 text-white transform group-hover:translate-x-0.5 transition-transform duration-200" />
                </span>
              </span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                'lg:hidden p-2.5 rounded-xl border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                isDark
                  ? 'text-neutral-300 hover:text-white bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08]'
                  : 'text-neutral-700 hover:text-black bg-black/[0.04] border-black/[0.08] hover:bg-black/[0.08]'
              )}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* === MOBILE DRAWER OVERLAY === */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              'lg:hidden overflow-hidden backdrop-blur-2xl border-b',
              isDark
                ? 'bg-[#08080C]/98 border-white/[0.09]'
                : 'bg-white/98 border-black/[0.09]'
            )}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              {/* Solutions Accordion */}
              <div className={cn('border rounded-xl overflow-hidden', isDark ? 'border-white/[0.06] bg-white/[0.02]' : 'border-black/[0.06] bg-black/[0.01]')}>
                <button
                  type="button"
                  onClick={() =>
                    setMobileExpandedSection(
                      mobileExpandedSection === 'solutions' ? null : 'solutions'
                    )
                  }
                  className={cn('w-full flex items-center justify-between p-4 text-left font-medium', isDark ? 'text-neutral-100' : 'text-neutral-800')}
                >
                  <span className="flex items-center gap-2.5">
                    <Bot className="w-4 h-4 text-brand-500" />
                    <span>Solutions</span>
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform duration-200',
                      isDark ? 'text-neutral-400' : 'text-neutral-500',
                      mobileExpandedSection === 'solutions' && 'rotate-180 text-brand-500'
                    )}
                  />
                </button>

                {mobileExpandedSection === 'solutions' && (
                  <div className={cn('px-3 pb-3 space-y-2 border-t pt-3', isDark ? 'border-white/[0.04]' : 'border-black/[0.04]')}>
                    {SOLUTION_CATEGORIES.map((category) => {
                      const CategoryIcon = category.icon;
                      const isExpanded = mobileExpandedSolution === category.id;
                      return (
                        <div
                          key={category.id}
                          className={cn('border rounded-lg overflow-hidden', isDark ? 'border-white/[0.04] bg-white/[0.02]' : 'border-black/[0.04] bg-black/[0.02]')}
                        >
                          <div className={cn('flex items-center justify-between p-2.5 text-xs font-medium', isDark ? 'text-neutral-200 hover:bg-white/[0.04]' : 'text-neutral-700 hover:bg-black/[0.04]')}>
                            <Link
                              href={category.href}
                              className="flex items-center gap-2 flex-1"
                            >
                              <CategoryIcon className="w-3.5 h-3.5 text-brand-500" />
                              <span>{category.title}</span>
                            </Link>
                            <button
                              type="button"
                              onClick={() =>
                                setMobileExpandedSolution(isExpanded ? null : category.id)
                              }
                              className="p-1"
                              aria-label="Toggle sub-services"
                            >
                              <ChevronDown
                                className={cn(
                                  'w-3.5 h-3.5 transition-transform',
                                  isDark ? 'text-neutral-500' : 'text-neutral-400',
                                  isExpanded && 'rotate-180 text-brand-500'
                                )}
                              />
                            </button>
                          </div>

                          {isExpanded && (
                            <div className={cn('px-3 pb-3 pt-1 space-y-1.5 border-t', isDark ? 'bg-black/40 border-white/[0.04]' : 'bg-neutral-100/60 border-black/[0.04]')}>
                              <div className="grid grid-cols-1 gap-1 pt-1">
                                {category.subServices.map((sub, sIdx) => {
                                  const SubIcon = sub.icon;
                                  return (
                                    <Link
                                      key={sIdx}
                                      href={sub.href}
                                      onClick={() => handleSubServiceNavigate(sub.href)}
                                      className={cn(
                                        'flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all duration-300',
                                        isDark
                                          ? 'bg-white/[0.03] hover:bg-gradient-to-r hover:from-brand-500/25 hover:via-brand-500/10 hover:to-transparent text-neutral-300 hover:text-white border border-transparent hover:border-brand-500/40'
                                          : 'bg-white hover:bg-gradient-to-r hover:from-brand-500/12 hover:via-brand-500/06 hover:to-transparent text-neutral-600 hover:text-brand-600 shadow-2xs border border-black/[0.04] hover:border-brand-500/30'
                                      )}
                                    >
                                      <div className="flex items-center gap-2">
                                        <SubIcon className="w-3.5 h-3.5 text-brand-500" />
                                        <span>{sub.title}</span>
                                      </div>
                                      <ArrowRight className="w-3 h-3 text-brand-500" />
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Featured Mobile Diagnostic Link */}
                    <Link
                      href="/solutions#find-solution"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all mt-2',
                        isDark
                          ? 'bg-purple-950/40 border-purple-500/40 text-purple-200 shadow-[0_0_12px_rgba(147,51,234,0.15)]'
                          : 'bg-purple-50 border-purple-200 text-purple-900 shadow-2xs'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-purple-600 text-white shadow-xs">
                          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        </div>
                        <div>
                          <span className="block font-bold">Find Your Solution</span>
                          <span className="text-[10px] text-purple-600 font-normal">KAIROS AI Architecture Copilot</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-purple-600 text-white">AI</span>
                    </Link>

                    <Link
                      href="/solutions"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 pt-2 px-2.5"
                    >
                      <span>Browse all 6 solution areas</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Work Accordion */}
              <div className={cn('border rounded-xl overflow-hidden', isDark ? 'border-white/[0.06] bg-white/[0.02]' : 'border-black/[0.06] bg-black/[0.01]')}>
                <button
                  type="button"
                  onClick={() =>
                    setMobileExpandedSection(
                      mobileExpandedSection === 'work' ? null : 'work'
                    )
                  }
                  className={cn('w-full flex items-center justify-between p-4 text-left font-medium', isDark ? 'text-neutral-100' : 'text-neutral-800')}
                >
                  <span className="flex items-center gap-2.5">
                    <FolderGit2 className="w-4 h-4 text-brand-500" />
                    <span>Work</span>
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform duration-200',
                      isDark ? 'text-neutral-400' : 'text-neutral-500',
                      mobileExpandedSection === 'work' && 'rotate-180 text-brand-500'
                    )}
                  />
                </button>

                {mobileExpandedSection === 'work' && (
                  <div className={cn('px-4 pb-4 space-y-2 border-t pt-3', isDark ? 'border-white/[0.04]' : 'border-black/[0.04]')}>
                    {WORK_ITEMS.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => handleWorkNavigate(item.href)}
                        className={cn(
                          'block p-2.5 rounded-xl transition-all duration-300',
                          isDark
                            ? 'hover:bg-gradient-to-r hover:from-brand-500/25 hover:via-brand-500/10 hover:to-transparent border border-transparent hover:border-brand-500/40'
                            : 'hover:bg-gradient-to-r hover:from-brand-500/12 hover:via-brand-500/06 hover:to-transparent border border-transparent hover:border-brand-500/30'
                        )}
                      >
                        <span className={cn('text-sm font-medium block', isDark ? 'text-neutral-200' : 'text-neutral-700')}>
                          {item.title}
                        </span>
                        <p className={cn('text-xs mt-0.5 line-clamp-1 font-normal', isDark ? 'text-neutral-400' : 'text-neutral-500')}>
                          {item.description}
                        </p>
                      </Link>
                    ))}

                    <Link
                      href="/work"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 pt-2 px-2.5"
                    >
                      <span>Browse all 12 work specimens & portfolio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Insights Accordion */}
              <div className={cn('border rounded-xl overflow-hidden', isDark ? 'border-white/[0.06] bg-white/[0.02]' : 'border-black/[0.06] bg-black/[0.01]')}>
                <button
                  type="button"
                  onClick={() =>
                    setMobileExpandedSection(
                      mobileExpandedSection === 'insights' ? null : 'insights'
                    )
                  }
                  className={cn('w-full flex items-center justify-between p-4 text-left font-medium', isDark ? 'text-neutral-100' : 'text-neutral-800')}
                >
                  <span className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-brand-500" />
                    <span>Insights</span>
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform duration-200',
                      isDark ? 'text-neutral-400' : 'text-neutral-500',
                      mobileExpandedSection === 'insights' && 'rotate-180 text-brand-500'
                    )}
                  />
                </button>

                {mobileExpandedSection === 'insights' && (
                  <div className={cn('px-4 pb-4 space-y-2 border-t pt-3', isDark ? 'border-white/[0.04]' : 'border-black/[0.04]')}>
                    {INSIGHTS_ITEMS.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => handleInsightsNavigate(item.href)}
                        className={cn(
                          'block p-2.5 rounded-xl transition-all duration-300',
                          isDark
                            ? 'hover:bg-gradient-to-r hover:from-brand-500/25 hover:via-brand-500/10 hover:to-transparent border border-transparent hover:border-brand-500/40'
                            : 'hover:bg-gradient-to-r hover:from-brand-500/12 hover:via-brand-500/06 hover:to-transparent border border-transparent hover:border-brand-500/30'
                        )}
                      >
                        <span className={cn('text-sm font-medium block', isDark ? 'text-neutral-200' : 'text-neutral-700')}>
                          {item.title}
                        </span>
                        <p className={cn('text-xs mt-0.5 line-clamp-1 font-normal', isDark ? 'text-neutral-400' : 'text-neutral-500')}>
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* About Direct Link */}
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={cn('block p-4 border rounded-xl text-sm font-medium transition-colors', isDark ? 'border-white/[0.06] bg-white/[0.02] text-neutral-100 hover:bg-white/[0.04]' : 'border-black/[0.06] bg-black/[0.01] text-neutral-700 hover:bg-black/[0.04]')}
              >
                About KAIROTRIX
              </Link>

              {/* Mobile CTA (Unified with Desktop "Let's Talk") */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full py-3 rounded-full gradient-brand-core text-white font-medium text-sm flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(147,51,234,0.4)]"
                  aria-label="Let's Talk - Contact KAIROTRIX"
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  </span>
                  <span>Let&apos;s Talk</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
