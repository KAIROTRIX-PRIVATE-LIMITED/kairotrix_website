'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderGit2,
  BookOpen,
  MessageSquare,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  Bot,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Projects & Work',
    href: '/admin/projects',
    icon: FolderGit2,
  },
  {
    label: 'Articles & Insights',
    href: '/admin/insights',
    icon: BookOpen,
  },
  {
    label: 'Team & About',
    href: '/admin/team',
    icon: Users,
  },
  {
    label: 'AI Assistant & Chats',
    href: '/admin/ai-assistant',
    icon: Bot,
  },
  {
    label: 'Contact Inquiries',
    href: '/admin/inquiries',
    icon: MessageSquare,
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  // Check auth session
  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setAdminUser(data.user);
          } else {
            router.push('/admin/login');
          }
        } else {
          router.push('/admin/login');
        }
      } catch (err) {
        console.warn('Auth check failed:', err);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (e) {
      console.error(e);
    }
  };

  // If viewing the login page, render children directly without the dashboard sidebar
  if (isLoginPage) {
    return <div className="min-h-screen bg-neutral-50 text-neutral-900">{children}</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center text-neutral-600 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          Verifying Security Telemetry...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col antialiased selection:bg-brand-500 selection:text-white">
      {/* Top Header Bar */}
      <header className="h-16 border-b border-neutral-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="text-sm font-bold tracking-tight text-neutral-950 font-mono">
              KAIROTRIX
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-brand-50 text-brand-700 border border-brand-200 uppercase tracking-widest">
              Admin
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Live DB Telemetry Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-[11px] font-mono text-neutral-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span>Database Connected</span>
          </div>

          {/* View Public Website Link */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 px-2.5 py-1 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors shadow-xs"
          >
            <span>View Website</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 px-2.5 py-1 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 transition-colors shadow-xs cursor-pointer"
            title="Sign out of Admin"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-neutral-200/80 bg-white p-4 space-y-6 shrink-0 shadow-xs sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 px-3 block mb-2 font-semibold">
              Manage
            </span>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group',
                      isActive
                        ? 'bg-brand-50 text-brand-700 border border-brand-200/90 font-semibold shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/80'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-4 h-4 transition-colors',
                        isActive ? 'text-brand-600' : 'text-neutral-400 group-hover:text-neutral-600'
                      )}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto pt-4 border-t border-neutral-100">
            <div className="px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
              <span className="text-[10px] font-mono text-neutral-500 block uppercase tracking-wider">Logged In As</span>
              <span className="text-xs text-neutral-800 font-semibold truncate block mt-0.5">
                {adminUser?.email || 'admin@kairotrix.com'}
              </span>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div
            className="fixed inset-0 top-16 z-30 bg-neutral-900/40 backdrop-blur-sm md:hidden p-4"
            onClick={() => setMobileNavOpen(false)}
          >
            <div
              className="bg-white border border-neutral-200 rounded-2xl p-4 space-y-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-brand-50 text-brand-700 border border-brand-200 font-semibold'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 bg-neutral-50 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
